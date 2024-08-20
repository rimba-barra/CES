Ext.define('Cashier.controller.Rcash', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Rcash',
    requires: [
        'Ext.EventObject',
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Prefixcombobox',
        'Cashier.library.template.combobox.Departmentcombobox',
        'Cashier.library.template.combobox.Statusallcombobox',
        'Cashier.library.template.combobox.Inoutcombobox',
    ],
    views: [
        'rcash.Panel',
        'rcash.Grid',
        'rcash.Gridrev',
        'rcash.FormSearch',
        'rcash.FormData',
    ],
    stores: [
        'Rcash',
        'Rcashlog',
        'Rcashcoadetail',
        'Rcashcia',
        'Rcashvendor',
        'Ptbyuser',
        'Voucherprefixsetupcombo',
        'Department',
        'Statusall',
        'Inout',
    ],
    models: [
        'Rcash',
        'Rcashlog',
    ],
    refs: [
        {ref: 'grid', selector: 'rcashgrid'},
        {ref: 'gridrev', selector: 'rcashgridrev'},
        {ref: 'formsearch', selector: 'rcashformsearch'},
        {ref: 'formdata', selector: 'rcashformdata'},
    ],
    controllerName: 'rcash',
    fieldName: 'rcash',
    bindPrefixName: 'Rcash',
    formWidth: 750,
    rowproject: null, storept: null, state: null,
    urlrequest: null, senddata: null, info: null, messagedata: null,row:null,
    init: function (application) {
        var me = this;
        this.control({
            'rcashpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    this.panelAfterRender();
                    panel.up('window').maximize();
                },
            },
            'rcashgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                select: this.gridSelect,
            },
            'rcashgridrev': {
                afterrender: this.gridrevAfterrender,
                itemdblclick: this.gridItemDblClickRev,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChangeRev,
            },
            'rcashgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'rcashgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'rcashgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'rcashgrid toolbar button[action=save]': {
                click: function () {
                    me.saveAll();
                }
            },
            'rcashgrid toolbar button[action=applyallpt]': {
                click: function () {
                    me.applyAllpt();
                }
            },
            'rcashgrid toolbar button[action=applyalldate]': {
                click: function () {
                    me.applyAlldate();
                }
            },
            'rcashgrid toolbar button[action=applyallreason]': {
                click: function () {
                    me.applyAllreason();

                }
            },
            'rcashgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'rcashgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClickcustome
            },
            'rcashgridrev toolbar button[action=search]': {
                click: function () {
                    me.gridrevSearch();
                }
            },
            'rcashgridrev toolbar button[action=reset]': {
                click: function () {
                    me.gridrevAfterrender();
                }
            },
            'rcashformsearch button[action=search]': {
                click: this.dataSearch
            },
            'rcashformsearch button[action=reset]': {
                click: this.dataReset
            },
            'rcashformsearch': {
                afterrender: function () {
                    me.setStoreFormsearch();
                },
                boxready: function () {
                    me.setStorePrefix();
                }
            },
            'rcashformsearch [name=voucherprefix_id]': {
                'select': function (g, record, item, index, e, eOpts) {
                    var me, rowdata, form;
                    me = this;
                    form = me.getFormsearch();
                    rowdata = record[0]['data'];
                    me.setVal(form, 'prefix_id', rowdata.prefix_id);
                },
            },
            'rcashformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    me.Formdataready();
                }
            },
            'rcashformdata [name=rcash] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'rcashformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'rcashformdata button[action=save]': {
                click: this.dataSavetrevision
            },
            'rcashformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    setStorePrefix: function () {
        var me, store;
        me = this;
        store = me.getStore("Voucherprefixsetupcombo");
        store.reload({
            params: {
                "hideparam": 'getvoucherprefixsetup',
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                var counter = store.getCount();
                if (counter > 0) {
                    store.filter('is_posting', true);
                    var duplicatedata = {}; // using a map of already used finddata
                    store.filterBy(function (record) {
                        var finddata = record.get('prefix_id');
                        if (duplicatedata[finddata]) {
                            return false;
                        } else {
                            duplicatedata[finddata] = true;
                            return true;
                        }
                    });
                    // delete the filtered out records
                    delete store.snapshot;
                }
            }
        });
    },
    gridSelectionChange: function () {
        var me, grid, row;
        me = this;
        grid = me.getGrid();
        row = grid.getSelectionModel().getSelection();
    },
    gridItemDblClick: function (el) {
        var me, grid, record, row, status;
        me = this;
        grid = me.getGrid();
        record = grid.getSelectionModel().getSelection()[0];
        row = record['data'];
        if (row.kasbank == 'KAS' && row.is_posting == 0) {
            status = 1;
        } else if (row.kasbank == 'BANK' && row.is_posting == 0 && row.chequegiro_status !== 'PAID') {
            status = 1;
        } else {
            status = 0;
        }
        if (status > 0) {
            me.execAction(el, me.bindPrefixName + 'Update');
        } else {
            me.buildWarningAlert("The data cannot revision..!");
        }
    },
    gridActionColumnClickcustome: function (view, cell, row, col, e) {
        var me, m, grid, store, record, rowdata, status;
        me = this;
        grid = me.getGrid();
        record = grid.getStore().getAt(row);
        m = e.getTarget().className.match(/\bact-(\w+)\b/);
        grid.getSelectionModel().select(row);
        if (m) {
            switch (m[1]) {
                case me.bindPrefixName + 'Update':
                    rowdata = record['data'];
                    if (rowdata.kasbank == 'KAS' && rowdata.is_posting == 0) {
                        status = 1;
                    } else if (rowdata.kasbank == 'BANK' && rowdata.is_posting == 0 && rowdata.chequegiro_status !== 'PAID') {
                        status = 1;
                    } else {
                        status = 0;
                    }
                    if (status > 0) {
                        me.formDataShow('update');
                    } else {
                        me.buildWarningAlert("The data cannot revision..!");
                    }
                    break;
            }
        }
    },
    execAction: function (el, action, me) {
        var grid, record, row, status;
        if (!action) {
            action = '';
        }
        if (!me) {
            me = this;
        }
        grid = me.getGrid();
        record = grid.getSelectionModel().getSelection()[0];
        row = record['data'];
        if (row.kasbank == 'KAS' && row.is_posting == 0) {
            status = 1;
        } else if (row.kasbank == 'BANK' && row.is_posting == 0 && row.chequegiro_status !== 'PAID') {
            status = 1;
        } else {
            status = 0;
        }


        switch (action) {
            case me.bindPrefixName + 'Read':
                me.formDataShow(el, acts[action], action);
                break;
            case 'show':
                me.formDataShow(el, action);
                break;
            case me.bindPrefixName + 'Update':
                if (status > 0) {
                    me.formDataShow(el, acts[action], action);
                } else {
                    me.buildWarningAlert("The data cannot revision..!");
                }



                break;
        }
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
    Formdataready: function () {
        var me, form, grid, store, counter, record, row;
        me = this;
        form = me.getFormdata();

    },
    applyAllpt: function () {
        var me, form, grid, store, counter, record, rowdata, row, project_id, pt_id, ptname;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        if (grid.down("toolbar [name=pt_id]").valueModels[0] !== undefined) {
            project_id = grid.down("toolbar [name=pt_id]").valueModels[0]['raw'].project_id;
            pt_id = grid.down("toolbar [name=pt_id]").valueModels[0]['raw'].pt_id;
            ptname = grid.down("toolbar [name=pt_id]").valueModels[0]['raw'].ptname;
        } else {
            project_id = 0;
            pt_id = 0;
            ptname = '';
        }
        if (project_id == 0) {
            me.buildWarningAlert("Please Setup New Pt / Company first..!");
        } else {
            row = grid.getSelectionModel().getSelection();
            if (row.length < 1) {
                me.buildWarningAlert("No data selected...!");
            } else {
                counter = row.length + ' record' + (row.length > 1 ? 's' : '');
                for (var i = 0; i < row.length; i++) {
                    rowdata = row[i]['data'];
                    if (rowdata.kasbank == 'KAS' && rowdata.is_posting == 0) {
                        rowdata.pt_id_revision = pt_id;
                        rowdata.ptname_revision = ptname;
                    } else if (rowdata.kasbank == 'BANK' && rowdata.is_posting == 0 && rowdata.chequegiro_status !== 'PAID') {
                        rowdata.pt_id_revision = pt_id;
                        rowdata.ptname_revision = ptname;
                    }
                }
                grid.getView().refresh();
            }
        }
    },
    applyAlldate: function () {
        var me, form, grid, store, counter, record, rowdata, row, date;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        date = me.formatDate(grid.down("toolbar [name=revision_date]").getValue());
        if (date == '1970-01-1') {
            me.buildWarningAlert("Please Setup New Revision Date first..!");
        } else {
            row = grid.getSelectionModel().getSelection();
            if (row.length < 1) {
                me.buildWarningAlert("No data selected...!");
            } else {
                counter = row.length + ' record' + (row.length > 1 ? 's' : '');
                for (var i = 0; i < row.length; i++) {
                    rowdata = row[i]['data'];
                    if (rowdata.kasbank == 'KAS' && rowdata.is_posting == 0) {
                        rowdata.kasbank_date_revision = date;
                    } else if (rowdata.kasbank == 'BANK' && rowdata.is_posting == 0 && rowdata.chequegiro_status !== 'PAID') {
                        rowdata.kasbank_date_revision = date;
                    }
                }
                grid.getView().refresh();
            }
        }
    },
    applyAllreason: function () {
        var me, form, grid, store, counter, record, rowdata, row, note;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        note = grid.down("toolbar [name=reason]").getValue();
        if (note == '') {
            me.buildWarningAlert("Please Setup Revision note first..!");
        } else {
            row = grid.getSelectionModel().getSelection();
            if (row.length < 1) {
                me.buildWarningAlert("No data selected...!");
            } else {
                counter = row.length + ' record' + (row.length > 1 ? 's' : '');
                for (var i = 0; i < row.length; i++) {
                    rowdata = row[i]['data'];
                    if (rowdata.kasbank == 'KAS' && rowdata.is_posting == 0) {
                        rowdata.revision_note = note;
                    } else if (rowdata.kasbank == 'BANK' && rowdata.is_posting == 0 && rowdata.chequegiro_status !== 'PAID') {
                        rowdata.revision_note = note;
                    }
                }
                grid.getView().refresh();
            }
        }
    },
    dataSavetrevision: function () {
        var me, form, formdata, store,
                valuedata, idProperty, rec, state_submit,
                idProperty;
        me = this;
        form = me.getFormdata();
        formdata = form.getForm();

        if (formdata.isValid()) {
            resetTimer();
            store = me.getGrid().getStore();
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
                    valuedata['hideparam'] = "update";
                    me.senddata = valuedata;
                    me.urlrequest = 'cashier/rcash/update';
                    me.AjaxRequest();
                    store.commitChanges();
                    break;
                default:
                    return;
            }
        }
    },
    saveAll: function () {
        var me, form, grid, store, counter, record, rowdata, row, status;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        row = grid.getSelectionModel().getSelection();
        if (row.length < 1) {
            me.buildWarningAlert("No data selected...!");
        } else {
            counter = row.length + ' record' + (row.length > 1 ? 's' : '');
            for (var i = 0; i < row.length; i++) {
                rowdata = row[i]['data'];
                if (rowdata.kasbank == 'KAS' && rowdata.is_posting == 0) {
                    status = 1;
                } else if (rowdata.kasbank == 'BANK' && rowdata.is_posting == 0 && rowdata.chequegiro_status !== 'PAID') {
                    status = 1;
                } else {
                    status = 0;
                }
                if (status > 0) {
                    if (rowdata.dataflow_revision == '') {
                        rowdata['dataflow_revision'] = rowdata.dataflow;
                    }
                    if (rowdata.kasbank_date_revision == null) {
                        rowdata['kasbank_date_revision'] = rowdata.kasbank_date;
                    }
                    if (rowdata.pt_id_revision == 0) {
                        rowdata['pt_id_revision'] = rowdata.pt_id;
                        rowdata['ptname_revision'] = rowdata.ptname;
                    }
                    if (rowdata.voucher_no_revision == '') {
                        rowdata['voucher_no_revision'] = rowdata.voucher_no;
                    }
                    rowdata['hideparam'] = "update";
                    me.senddata = rowdata;
                    me.urlrequest = 'cashier/rcash/update';
                    me.AjaxRequest();
                }
            }
            grid.getView().refresh();
        }
    },
    AjaxRequest: function () {
        var me;
        me = this;
        Ext.Ajax.request({
            url: me.urlrequest,
             timeout:45000000,
            method: 'POST',
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
            case 'update':
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
        me.getGrid().getStore().reload();
        form = me.getFormdata();
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
        me.getGrid().getStore().reload();
        form = me.getFormdata();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: ' + me.messagedata,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
    gridrevAfterrender: function () {
        var me, grid, store, counter, rowh;
        me = this;
        grid = me.getGridrev();
        store = grid.getStore();
        store.load({
            params: {
                "hideparam": 'getkasbankrevision',
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
        grid.down("toolbar [name=status]").setValue('');
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
                "hideparam": 'getkasbankrevision',
                "project_id": apps.project,
                "pt_id": rowh.pt_id_revision,
                "kasbank_id": rowh.kasbank_id,
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
        rowstatus = grid.down("toolbar [name=status]").valueModels;
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
                "hideparam": 'getkasbankrevision',
                "project_id": project_id,
                "pt_id": pt_id,
                "department_id": department_id,
                "status": statusdata,
                "voucher_no": voucher_no,
                "start": 0,
                "limit": 100,
            },
            callback: function (records, operation, success) {
                counter = store.getCount();
            }
        });

    },
});