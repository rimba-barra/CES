Ext.define('Cashier.controller.Typeloan', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Typeloan',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Projectcombobox',
        'Cashier.library.template.combobox.Flaginterestcombobox',
                
    ],
    views: [
        'typeloan.Panel',
        'typeloan.Grid',
        'typeloan.Griddetail',
        'typeloan.FormSearch',
        'typeloan.FormData',
        'typeloan.FormDataDetail',
    ],
    stores: [
        'Typeloan',
        'Typeloaninterest',
        'Project',
        'Projectpt',
        'Flaginterest',
    ],
    models: [
        'Typeloan',
        'Typeloaninterest',
    ],
    refs: [
        {ref: 'grid', selector: 'typeloangrid'},
        {ref: 'griddetail', selector: 'typeloandetailgrid'},       
        {ref: 'formsearch', selector: 'typeloanformsearch'},
        {ref: 'formdata', selector: 'typeloanformdata'},
        {ref: 'formdatadetail', selector: 'typeloandetailformdata'},
      
    ],
    controllerName: 'typeloan',
    fieldName: 'code',
    bindPrefixName: 'Typeloan',
    panelwidth: 1350, panelheight: 540, arraydata: null, counterimport: 0,
    rowproject: null, storept: null, state: null,
    urlcommon: 'cashier/common/create',
    urlrequest: 'cashier/typeloan/create', senddata: null, info: null,
    arraycoa: null, countercoa: 0, pt_id: 0,
    idheaderfield: 'typeloan_id', idheadervalue: 0, idheaderview: 0,
    messagedatadetail: null,
    init: function (application) {
        var me = this;
        this.control({
            'typeloanpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: function (panel) {
                    this.panelAfterRender();
                    panel.up('window').maximize();                    
                    //me.panelheight = panel.up('panel').getWidth();
                    //me.panelwidth = panel.up('panel').getHeight();                    
                },
                resize: function (that, width, height, oldWidth, oldHeight, eOpts) {                   
                    me.panelheight = height;
                    me.panelwidth = width;  
                    me.showGriddetail();
                },
                
            },
            'typeloangrid': {
                afterrender: function (grid) {
                    var me,griddetail;
                    me = this;
                    me.gridAfterRender();                   
                },
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                select: this.gridSelect,
                boxready: function () {
                    var grid,griddetail, store, counter;
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
                    me.showGriddetail();
                },
            },
            'typeloangrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'typeloandetailgrid': {
                afterrender: function(){
                    var me,griddetail;
                    me = this;                                      
                },
                itemdblclick: this.gridItemDblClickdetail,
                selectionchange: this.gridSelectionChangedetail,
            },
            'typeloandetailgrid toolbar button[action=create]': {
                click: function () {
                    me.paramdetail.stateform = 'create';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'typeloandetailgrid toolbar button[action=update]': {
                click: function () {
                    me.paramdetail.stateform = 'update';
                    me.GenerateFormdata(me.paramdetail);
                }
            },
            'typeloandetailgrid toolbar button[action=destroy]': {
                click: function () {                  
                   this.dataDestroydetail();                   
                }
            },           
            'typeloandetailformdata toolbar button[action=save]': {
                click: function () {
                    this.Savedetail();
                }
            },
                       
            'typeloandetailgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRenderdetail,
                click: this.gridActionColumnClickdetail
            },
            'typeloanformsearch button[action=search]': {
                click: this.dataSearch
            },
            'typeloanformsearch button[action=reset]': {
                click: this.dataReset
            },
            'typeloanformdata': {
                afterrender: this.formDataAfterRender
            },
            'typeloandetailformdata': {
                afterrender: function(){
                    var grid, store, record, form, stateform;
                    me.getFormdatadetail().down("[name=typeloan_id]").setValue(me.idheadervalue);
                    form = me.getFormdatadetail();
                    stateform = form.up('window').state.toLowerCase();
                    if (stateform == 'update') {
                        grid = me.getGriddetail();
                        store = grid.getStore();
                        record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
                        me.getFormdatadetail().loadRecord(record);
                    }
                },
            },
            'typeloanformdata [name=typeloan] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'typeloanformdata [name=project_id] ': {
                'select': function () {
                    var me, id;
                    me = this;
                    id = me.getFormdata().down("[name=project_id]").getValue();
                    me.rowproject = {
                        "project_id": id
                    }
                    me.getPt();

                }
            },
            'typeloanformdata [name=pt_id] ': {
                'select': function () {
                    var me, id;
                    me = this;
                    id = me.getFormdata().down("[name=pt_id]").getValue();
                    me.rowpt = {
                        "pt_id": id
                    }
                }
            },
            'typeloanformdata button[action=save]': {
                click: this.dataSave
            },
            'typeloanformdatadepartment button[action=save]': {
                click: function () {
                    me.Savedatadept();
                }
            },
            'typeloanformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
   
    paramdetail: {
        //start formgeneate
        fromlocation: 'Cashier.view.typeloan.FormDataDetail',
        formtitle: 'Form Detail Data', formicon: 'icon-form-add',
        formid: 'win-formdatatypeloandetail', formlayout: 'fit',
        formshadow: 'frame', formmask: 'Loading...',
        formwidth: 400, formtimeout: 0,
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
        grid.down('#btnEdit').setDisabled(row.length != 1);
        grid.down('#btnDelete').setDisabled(row.length < 1);
        me.getGriddetail().down('#btnAdd').setDisabled(row.length < 1);
        me.getGriddetail().down('#btnEdit').setDisabled(true);
        me.getGriddetail().down('#btnDelete').setDisabled(true);
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
            if(row.flag_interest==1){
                me.getGriddetail().hidden = true;
            }else{
                me.getGriddetail().hidden = false;
            }            
            me.showGriddetail();   
            me.idheadervalue = row.typeloan_id;
            me.getDatadetail();
        }
    },
    showGriddetail:function(){
        var me, grid,griddetail, counter, store, record, row;
        me = this;        
        griddetail = me.getGriddetail();
        if (griddetail.hidden == true) {
            me.getGrid().setHeight(me.panelheight);
            me.getGrid().setWidth(me.panelwidth);
        }else{
            me.getGrid().setHeight(me.panelheight-250);
            me.getGrid().setWidth(me.panelwidth);
        } 
    },
    getPt: function () {
        var me, store, form;
        me = this;
        store = me.getStore('Projectpt');
        form = me.getFormdata();
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
                "typeloan_id": me.idheadervalue,
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
            me.urlrequest = 'cashier/typeloan/typeloaninterest' + stateform;
            me.AjaxRequest();
            me.getGriddetail().getStore().reload();
            me.getFormdatadetail().up('window').body.unmask();
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