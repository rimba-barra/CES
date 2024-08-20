Ext.define('Cashier.controller.Rcashadvance', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Rcashadvance',
    requires: [
        'Ext.EventObject',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Prefixcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Statusciacombobox',
    ],
    views: [
        'rcashadvance.Panel',
        'rcashadvance.Grid',
        'rcashadvance.Gridrev',
        'rcashadvance.FormSearch',
        'rcashadvance.FormData',
        'rcashadvance.FormDatarevision',
    ],
    stores: [
        'Rcashadvance',
        'Rcashadvancelog',
        'Ptbyuser',
        'Voucherprefixsetupcombo',
        'Department',
        'Statuscia',
    ],
    models: [
        'Rcashadvance',
    ],
    refs: [
        {ref: 'grid', selector: 'rcashadvancegrid'},
        {ref: 'gridrev', selector: 'rcashadvancegridrev'},
        {ref: 'formsearch', selector: 'rcashadvanceformsearch'},
        {ref: 'formdata', selector: 'rcashadvanceformdata'},
        {ref: 'formdatarev', selector: 'rcashadvanceformdatarevision'},
    ],
    controllerName: 'rcashadvance',
    fieldName: 'rcashadvance',
    bindPrefixName: 'Rcashadvance',
    formWidth: 780,
    urlrequest: null, senddata: null, info: null, messagedata: null,
    rowproject: null, storept: null, state: null, row: null,
    init: function (application) {
        var me = this;
        this.control({
            'rcashadvancepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    this.panelAfterRender();
                    panel.up('window').maximize();
                },
            },
            'rcashadvancegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                //boxready: this.gridSelectedrow,
                selectionchange: this.gridSelectionChange,
                select: this.gridSelect,
            },
            'rcashadvancegridrev': {
                afterrender: this.gridrevAfterrender,
                itemdblclick: this.gridItemDblClickRev,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChangeRev,
            },
            'rcashadvancegrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'rcashadvancegrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'rcashadvancegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'rcashadvancegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'rcashadvancegridrev toolbar button[action=search]': {
                click: function () {
                    me.gridrevSearch();
                }
            },
            'rcashadvancegridrev toolbar button[action=reset]': {
                click: function () {
                    me.gridrevAfterrender();
                }
            },
            'rcashadvancegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'rcashadvancegridrev actioncolumn': {
                click: this.gridActionColumnClickrev
            },
            'rcashadvanceformsearch button[action=search]': {
                click: this.dataSearch
            },
            'rcashadvanceformsearch button[action=reset]': {
                click: this.dataReset
            },
            'rcashadvanceformsearch': {
                afterrender: function () {
                    me.setStoreFormsearch();
                }
            },
            'rcashadvanceformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    var me, form, paid;
                    me = this;
                    form = me.getFormdata();
                    paid = me.unMask(me.getVal(form, "paid", "value"));
                    me.setVal(form, "paid_revision", me.Mask(paid));
                }
            },
            'rcashadvanceformdatarevision': {
                afterrender: this.formDataAfterRenderrev,
            },
            'rcashadvanceformdata [name=amount_revision] ': {
                'blur': function () {
                    me.checkData();
                },
            },
            'rcashadvanceformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'rcashadvanceformdata button[action=save]': {
                click: this.dataSave
            },
            'rcashadvanceformdatarevision button[action=save]': {
                click: this.dataSavetrevision
            },
            'rcashadvanceformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    gridSelectionChange: function () {
        var me, grid, row;
        me = this;
        grid = me.getGrid();
        row = grid.getSelectionModel().getSelection();
    },
    gridItemDblClick: function (el) {
        var me = this;
        me.execAction(el, me.bindPrefixName + 'Update');
    },
    checkData: function () {
        var me, form, newamount, oldamunt, paid, newbalance, status, statusdata, labelstatus;
        me = this;
        form = me.getFormdata();
        status = me.getVal(form, "status", "value");

        newamount = me.unMask(me.getVal(form, "amount_revision", "value"));
        paid = me.unMask(me.getVal(form, "paid", "value"));
        oldamunt = me.unMask(me.getVal(form, "amount", "value"));
        newbalance = newamount - paid;
        me.setVal(form, "remaining_balance_revision", me.Mask(newbalance));

        if (newamount < paid) {
            me.setError(form, "amount_revision", true, "New amount must more than old realization");
            me.setError(form, "remaining_balance_revision", true, "New remaining balance cannot minus");
            me.disableBtn(form, "save", true);
        } else {
            me.setError(form, "amount_revision", false, "");
            me.setError(form, "remaining_balance_revision", false, "");
            me.disableBtn(form, "save", false);
        }
        if (status == "T" && newbalance == 0) {
            statusdata = "PROCESSED";
            status = "Y";
        } else if (status == "T" && paid > 0) {
            statusdata = "BEINGPROCESSED";
            status = "T";
        } else if (status == "T" && newbalance == newamount) {
            statusdata = "UNPROCESSED";
            status = "T";
        }
        me.setVal(form, "statusdata", statusdata);
        me.setVal(form, "status", status);
    },
    gridSelect: function () {
        var me, grid, counter, store, record, row;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        counter = store.getCount();
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            row = record['data'];
            me.row = row;
            me.getDatarevision();
        }
    },
    gridrevAfterrender: function () {
        var me, grid, store, counter, rowh;
        me = this;
        grid = me.getGridrev();
        store = grid.getStore();
        store.load({
            params: {
                "hideparam": 'getkasbonrevision',
                "project_id": apps.project,
                "pt_id": 0,
                "kasbon_id": 0,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                counter = store.getCount();
            }
        });
        grid.down("toolbar [name=department_id]").setValue('');
        grid.down("toolbar [name=pt_id]").setValue('');
        grid.down("toolbar [name=statusdata]").setValue('');
        grid.down("toolbar [name=voucher_no]").setValue('');
    },
    getDatarevision: function () {
        var me, grid, store, counter, rowh;
        me = this;
        grid = me.getGridrev();
        store = grid.getStore();
        rowh = me.row;
        store.load({
            params: {
                "hideparam": 'getkasbonrevision',
                "project_id": apps.project,
                "pt_id": rowh.pt_id,
                "kasbon_id": rowh.kasbon_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                counter = store.getCount();
            }
        });

    },
    gridrevSearch: function () {
        var me, grid, store, counter, rowh, rowpt, rowdept, rowstatus,
                project_id, pt_id, department_id, voucher_no, statusdata;
        me = this;
        grid = me.getGridrev();
        store = grid.getStore();
        rowpt = grid.down("toolbar [name=pt_id]").valueModels;
        rowdept = grid.down("toolbar [name=department_id]").valueModels;
        rowstatus = grid.down("toolbar [name=statusdata]").valueModels;
        voucher_no = grid.down("toolbar [name=voucher_no]").getValue();

        if (rowpt[0] !== undefined) {
            project_id = rowpt[0]['raw'].project_id;
            pt_id = rowpt[0]['raw'].pt_id;
        } else {
            project_id = 0;
            pt_id = 0;
        }

        if (rowdept[0] !== undefined) {
            department_id = rowdept[0]['raw'].department_id;
        } else {
            department_id = 0;
        }
        if (rowstatus[0] !== undefined) {
            statusdata = rowstatus[0]['raw'].statusdata;
        } else {
            statusdata = '';
        }

        store.load({
            params: {
                "hideparam": 'getkasbonrevision',
                "project_id": project_id,
                "pt_id": pt_id,
                "department_id": department_id,
                "statusdata": statusdata,
                "voucher_no": voucher_no,
                "start": 0,
                "limit": 100,
            },
            callback: function (records, operation, success) {
                counter = store.getCount();
            }
        });

    },
    paramrevision: {
        //start formgeneate
        fromlocation: 'Cashier.view.rcashadvance.FormDatarevision',
        formtitle: 'Form Log Revision', formicon: 'icon-form-add',
        formid: 'win-rcashadvanceformdatarevision', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 400, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null, counter: 0,
        //start properties form
    },
    gridActionColumnClickrev: function () {
        var me = this;
        me.paramrevision.stateform = 'update';
        me.GenerateFormdata(me.paramrevision);
    },
    gridItemDblClickRev: function (el) {
        var me = this;
        me.paramrevision.stateform = 'update';
        me.GenerateFormdata(me.paramrevision);
    },
    formDataAfterRenderrev: function () {
        var me, form, grid, store, record;
        me = this;
        form = me.getFormdatarev();
        grid = me.getGridrev();
        store = grid.getStore();
        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
        form.loadRecord(record);
    },
    gridSelectionChangeRev: function () {
        var me, grid, row;
        me = this;
        grid = me.getGrid();
        row = grid.getSelectionModel().getSelection();
    },
    dataSavetrevision: function () {
        var me, form, formdata, store,
                valuedata, idProperty, rec, state_submit,
                idProperty;
        me = this;
        form = me.getFormdatarev();
        formdata = form.getForm();

        if (formdata.isValid()) {
            resetTimer();
            store = me.getGridrev().getStore();
            valuedata = formdata.getValues();
            form.up('window').body.mask('Saving data, please wait ...');
            state_submit = form.up('window').state.toLowerCase();

            switch (state_submit) {
                case 'update':
                    idProperty = store.getProxy().getReader().getIdProperty();
                    rec = store.getById(parseInt(formdata.findField(idProperty).getValue(), 10));
                    rec.beginEdit();
                    rec.set(valuedata);
                    rec.endEdit();
                    valuedata['hideparam'] = "updaterevision";
                    me.senddata = valuedata;
                    me.urlrequest = 'cashier/rcashadvance/update';
                    me.AjaxRequest();
                    store.commitChanges();
                    break;
                default:
                    return;
            }

        }
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
            method: 'POST',
             timeout:45000000,
            params: {
                data: Ext.encode(me.senddata)
            },
            success: function (response) {
                me.info = Ext.JSON.decode(response.responseText);
                me.setSuccessEvent();
            },
            failure: function (response) {
                me.getFormdata().up('window').close();
            }
        });
    },
    setSuccessEvent: function () {
        var me = this;
        var data = me.info.data;
        var form = me.getFormdata();
        switch (me.info.parameter) {
            case 'default':
                break;
            case 'updaterevision':
                if (me.info.success == 'true') {
                    me.messagedata = me.info.msg;
                    me.alertFormdataSuccess();
                } else {
                    me.messagedata = me.info.msg;
                    me.alertFormdataFailed();
                }
                break;
        }
    },
    alertFormdataSuccess: function () {
        var me, form, store;
        me = this;
        me.getGridrev().getStore().reload();
        form = me.getFormdatarev();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Success',
            msg: me.messagedata,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn: function () {
                form.up('window').close();
            }
        });

    },
    alertFormdataFailed: function () {
        var me, form, store;
        me = this;
        me.getGridrev().getStore().reload();
        form = me.getFormdatarev();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: ' + me.messagedata,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
});