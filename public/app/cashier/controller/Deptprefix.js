Ext.define('Cashier.controller.Deptprefix', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Deptprefix',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Projectcombobox',
    ],
    views: [
        'deptprefix.Panel',
        'deptprefix.Grid',
        'deptprefix.Griddetail',
        'deptprefix.Griddept',
        'deptprefix.FormSearch',
        'deptprefix.FormData',
        'deptprefix.FormDataDetail',
        'deptprefix.FormDataDepartment',
    ],
    stores: [
        'Deptprefix',
        'Deptprefixdetail',
        'Department',
        'Project',
    ],
    models: [
        'Deptprefix',
        'Deptprefixdetail',
    ],
    refs: [
        {ref: 'grid', selector: 'deptprefixgrid'},
        {ref: 'griddetail', selector: 'deptprefixdetailgrid'},
        {ref: 'griddepartment', selector: 'deptprefixdepartmentgrid'},
        {ref: 'formsearch', selector: 'deptprefixformsearch'},
        {ref: 'formdata', selector: 'deptprefixformdata'},
        {ref: 'formdatadetail', selector: 'deptprefixdetailformdata'},
        {ref: 'formdatadepartment', selector: 'deptprefixformdatadepartment'},
    ],
    controllerName: 'deptprefix',
    fieldName: 'deptprefix',
    bindPrefixName: 'Deptprefix',
    panelwidth: 0, panelheight: 0, arraydata: null, counterimport: 0,
    rowproject: null, storept: null, state: null,
    urlcommon: 'cashier/common/create',
    urlrequest: 'cashier/deptprefix/create', senddata: null, info: null,
    arraycoa: null, countercoa: 0, pt_id: 0,
    idheaderfield: 'deptprefix_id', idheadervalue: 0, idheaderview: 0,
    messagedatadetail: null,
    rowhdata:null,
    init: function (application) {
        var me = this;
        this.control({
            'deptprefixpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    this.panelAfterRender();
                    panel.up('window').maximize();
                },
            },
            'deptprefixgrid': {
                afterrender: function (grid) {
                    this.gridAfterRender();
                },
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                select: this.gridSelect,
                boxready: function () {
                    var grid, store, counter;
                    grid = me.getGrid();
                    store = grid.getStore();
                    store.reload({
                        callback: function (records, operation, success) {
                            counter = store.getCount();
                            me.getDatadetail();
                            if (counter > 0) {
                                me.getGrid().getSelectionModel().select(0, true);
                            }
                        }
                    });

                },
            },
            'deptprefixgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'deptprefixdetailgrid': {
                itemdblclick: this.gridItemDblClickdetail,
                selectionchange: this.gridSelectionChangedetail,
            },
            'deptprefixdetailgrid toolbar button[action=create]': {
                click: function () {
                    me.paramdetail.stateform = 'create';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'deptprefixdetailgrid toolbar button[action=update]': {
                click: function () {
                    me.paramdetail.stateform = 'update';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'deptprefixdetailgrid toolbar button[action=destroy]': {
                click: function () {                  
                   this.dataDestroydetail();                   
                }
            },
            'deptprefixdetailformdata': {
                afterrender: function () {
                    var grid, store, record, form, stateform;
                    me.getStore('Project').load();
                    me.getStore('Projectpt').load();
                    me.getFormdatadetail().down("[name=deptprefix]").setValue(me.rowhdata.deptcode);
                    me.getFormdatadetail().down("[name=deptprefix_id]").setValue(me.idheadervalue);
                    form = me.getFormdatadetail();
                    stateform = form.up('window').state.toLowerCase();
                    if (stateform == 'update') {
                        grid = me.getGriddetail();
                        store = grid.getStore();
                        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                        me.getFormdatadetail().loadRecord(record);

                    }
                }
            },
            'deptprefixdetailformdata [name=project_id] ': {
                'select': function () {
                    var me, id;
                    me = this;
                    id = me.getFormdatadetail().down("[name=project_id]").getValue();
                    me.rowproject = {
                        "project_id": id
                    }
                    me.getPt();

                }
            },
            'deptprefixdetailformdata [name=pt_id] ': {
                'select': function () {
                    var me, id;
                    me = this;
                    id = me.getFormdatadetail().down("[name=pt_id]").getValue();
                    me.rowpt = {
                        "pt_id": id
                    }
                }
            },
            'deptprefixdetailformdata toolbar button[action=save]': {
                click: function () {
                    this.Savedetail();
                }
            },
            'deptprefixgrid toolbar button[action=import]': {
                click: function () {
                    me.state = 'import';
                    me.FormDepartment();
                }
            },
            'deptprefixgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'deptprefixgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'deptprefixgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'deptprefixgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'deptprefixdetailgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRenderdetail,
                click: this.gridActionColumnClickdetail
            },
            'deptprefixformsearch button[action=search]': {
                click: this.dataSearch
            },
            'deptprefixformsearch button[action=reset]': {
                click: this.dataReset
            },
            'deptprefixformdata': {
                afterrender: this.formDataAfterRender
            },
            'deptprefixformdata [name=deptprefix] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'deptprefixformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'deptprefixformdata button[action=save]': {
                click: this.dataSave
            },
            'deptprefixformdatadepartment button[action=save]': {
                click: function () {
                    me.Savedatadept();
                }
            },
            'deptprefixformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    paramdepartment: {
        //start formgeneate
        fromlocation: 'Cashier.view.deptprefix.FormDataDepartment',
        formtitle: 'Department Data', formicon: 'icon-form-add',
        formid: 'win-formdatadepartment', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 500, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null,
        //start properties form
    },
    paramdetail: {
        //start formgeneate
        fromlocation: 'Cashier.view.deptprefix.FormDataDetail',
        formtitle: 'Form Detail Data', formicon: 'icon-form-add',
        formid: 'win-formdatadeptprefixdetail', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 500, formtimeout: 0,
        stateform: null, formaction: null, formproperties: null, formwindows: null,
        //end formgeneate
        //start properties form
        iddetail: 0, store: null, data: null, record: null, grid: null, row: null, form: null,
        checkdata: false, object: null, rowdata: null, action: null,
        //start properties form
    },
    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(),
                row = grid.getSelectionModel().getSelection();
        grid.down('#btnDelete').setDisabled(row.length < 1);
        me.getGriddetail().down('#btnAdd').setDisabled(row.length < 1);
    },
    gridSelect: function () {
        var me, grid, counter, store, record, row;
        me = this;
        grid = me.getGrid();
        store = grid.getStore();
        counter = store.getCount();
        me.rowhdata = null;
        if (counter > 0) {
            record = grid.getSelectionModel().getSelection()[0];
            row = record['data'];
            me.rowhdata = row;
            me.idheadervalue = row.deptprefix_id;
            me.getDatadetail();
        }
    },
    getPt: function () {
        var me, store, form;
        me = this;
        store = me.getStore('Projectpt');
        form = me.getFormdatadetail();
        store.reload({
            params: {
                "hideparam": 'projectpt',
                "project_id": me.rowproject.project_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                form.down("[name=pt_id]").setValue(null);
                form.down("[name=pt_id]").setRawValue(null);
                me.storept = me.store;
                if (store.getCount() > 0) {
                    form.down("[name=pt_id]").setDisabled(false);
                } else {
                    form.down("[name=pt_id]").setDisabled(true);
                }
            }
        });


    },
    getDatadetail: function () {
        var me, pd, counter = '';
        me = this;
        var grid = me.getGriddetail();
        var store = me.getGriddetail().getStore();
        store.clearFilter(true);
        store.load({
            params: {
                "hideparam": 'default',
                "deptprefix_id": me.idheadervalue,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                store.sort('projectcode', 'ASC');
                store.sort('ptcode', 'ASC');
                counter = store.getCount();
                if (counter > 0) {
                    grid.getSelectionModel().select(0, true);
                }
            }
        });
    },
    FormDepartment: function () {
        var me, store, grid;
        me = this;
        store = me.getStore('Department');
        store.load();
        me.paramdepartment.stateform = 'importdata';
        me.GenerateFormdata(me.paramdepartment);
    },
    Savedatadept: function () {
        var me, form, value;
        me = this;
        me.SetArraydata();
        form = me.getFormdatadepartment();

        if (form.getForm().isValid()) {
            me.getFormdatadepartment().up('window').body.mask('Saving data, please wait ...');
            value = form.getForm().getValues();
            value['hideparam'] = 'importdata';
            if (me.counterimport > 0) {
                value['department_id'] = me.arraydata;
                me.senddata = value;
                me.AjaxRequest();
                me.getGrid().getStore().reload();
            }
            me.getFormdatadepartment().up('window').body.unmask();
        }

    },
    Savedetail: function () {
        var me, form, value, stateform;
        me = this;
        form = me.getFormdatadetail();
        stateform = form.up('window').state.toLowerCase();
        if (form.getForm().isValid()) {
            me.getFormdatadetail().up('window').body.mask('Saving data, please wait ...');
            value = form.getForm().getValues();
            value['hideparam'] = 'detail' + stateform;
            me.senddata = value;
            me.urlrequest = 'cashier/deptprefix/deptprefixdetail' + stateform;
            me.AjaxRequest();
            me.getGriddetail().getStore().reload();
            me.getFormdatadetail().up('window').body.unmask();
        }


    },
    SetArraydata: function () {
        var me, rows, recordcounttext, store, record;
        me = this;
        rows = me.getGriddepartment().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            store = me.getGriddepartment().getStore();
            resetTimer();
            me.arraydata = [];
            for (var i = 0; i < rows.length; i++) {
                me.arraydata.push(rows[i]['data'].department_id);
            }
            //console.log(me.arraydata);
            me.counterimport = 1;
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
        switch (me.info.parameter) {
            case 'default':
                break;
            case 'importdata':
                me.getFormdatadepartment().up('window').close();
                break;
            case 'detailcreate':
                if (me.info.success == 'true') {
                    me.messagedatadetail = me.info.msg;
                    me.alertFormdatadetailSuccess();
                } else {
                    me.messagedatadetail = me.info.msg;
                    me.alertFormdatadetailFailed();
                }
                break;
            case 'detailupdate':
                if (me.info.success == 'true') {
                    me.messagedatadetail = me.info.msg;
                    me.alertFormdatadetailSuccess();
                } else {
                    me.messagedatadetail = me.info.msg;
                    me.alertFormdatadetailFailed();
                }
                break;
        }
    },
    alertFormdatadetailSuccess: function () {
        var me, form, store;
        me = this;
        me.getGriddetail().getStore().reload();
        form = me.getFormdatadetail();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Success',
            msg: me.messagedatadetail,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK,
            fn: function () {
                me.formDatadetailClose();
            }
        });

    },
    alertFormdatadetailFailed: function () {
        var me, form, store;
        me = this;
        me.getGriddetail().getStore().reload();
        form = me.getFormdatadetail();
        form.up('window').body.unmask();
        Ext.Msg.show({
            title: 'Failure',
            msg: 'Error: ' + me.messagedatadetail,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
});