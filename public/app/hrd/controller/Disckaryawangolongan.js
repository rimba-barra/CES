Ext.define('Hrd.controller.Disckaryawangolongan', {
    extend: 'Hrd.library.template.controller.Controller',
    alias: 'controller.Disckaryawangolongan',
    views: ['disckaryawangolongan.Panel', 'disckaryawangolongan.Grid', 'disckaryawangolongan.FormSearch', 'disckaryawangolongan.FormData'],
    requires: [
        'Hrd.template.combobox.Projectcombobox',
        'Hrd.template.combobox.Ptcombobox'
    ],
    stores: ['Disckaryawangolongan', 'Discstatus'],
    models: ['Disckaryawangolongan', 'Discstatus'],
    formWidth: 500,
    refs: [
        {
            ref: 'grid',
            selector: 'disckaryawangolongangrid'
        },
        {
            ref: 'formsearch',
            selector: 'disckaryawangolonganformsearch'
        },
        {
            ref: 'formdata',
            selector: 'disckaryawangolonganformdata'
        }
    ],
    controllerName: 'disckaryawangolongan',
    fieldName: 'employee_name',
    bindPrefixName:'Disckaryawangolongan',
    init: function(application) {
        var me = this;
        this.control({
            'disckaryawangolonganpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
             
            },
            'disckaryawangolongangrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'disckaryawangolongangrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'disckaryawangolonganformsearch button[action=search]': {
                click: this.dataSearch,
                afterrender: this.formSearchAfterRender
            },
            'disckaryawangolonganformsearch button[action=reset]': {
                click:function (){
                    this.dataReset(this);                     
                }   
            },
            'disckaryawangolonganformdata button[action=save]': {
                click: this.dataSave
            },
            'disckaryawangolonganformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    var me;
                    me = this;
                    me.formDataBoxready();
                },
            },
            'disckaryawangolonganformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    formDataAfterRender: function (el) {
        var me = this;
        me.storeProcess = me.createSpProcessObj(me.storeProcess);
        me.fdar().init();
        //me.loadComboBoxStore(el);
        var state = el.up('window').state;
        if (state == 'read') {
            me.fdar().read();
        } else if (state == 'update') {
            me.fdar().update();
        }
    },
    formDataBoxready: function () {
        var me, form, statedata, grid, store, record, raw;
        me = this;
        form = me.getFormdata();
        statedata = form.up('window').state.toLowerCase();  
        me.setGroupbyparam();
    },
    setGroupbyparam: function () {        
        var me, store, combodata, form, mode_read;
        me = this;
        form = me.getFormdata();
        store = form.down("[name='group_code']").getStore();
        if(store.getCount() == 0){
            combodata = form.down("[name='group_code']");

            store.load({
                url: me.urlcommon,
                params: {
                    "mode_read": 'getgroupbyprojectpt_wcac',
                    "project_id": 1,
                    "pt_id": 1,
                },
                callback: function (records, operation, success) {
                    var data = records;
                    store.loadData(data);
                }
            });
        }
    },
    formSearchAfterRender: function (el) {
        var me = this;
        var f = me.getFormsearch();
        
        var prj = f.down("[name=project_id]");
        var store = prj.getStore();        
        store.load({
            callback: function (records, operation, success) {
                var data = records[0].raw.others[0][0].data;
                store.loadData(data);
            }
        });
                
        var pt = f.down("[name=pt_id]");
        var storept = pt.getStore();        
        storept.load({
            callback: function (records, operation, success) {
                var data = records[0].raw.others[0][0].data;
                storept.loadData(data);
            }
        });        
        
        f.down("[name=discstatus]").getStore().reload();
        
    },
    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid(), 
          row = grid.getSelectionModel().getSelection();
        grid.down('#btnEdit').setDisabled(row.length != 1);
    },
    dataSave: function () {
        var me = this;
        var fields = me.getFormdata().getValues();
        
        var myObj = {
            disc_id: fields.disc_id,
            group_code: fields.group_code
        }
        var url;
        
        //if(parseInt(fields.cust_id) > 0){
        if(me.getFormdata().up('window').state == 'update'){
            url = 'hrd/disckaryawangolongan/update'
        }
        
        me.getFormdata().up('window').body.mask('Saving, please wait ...');
        Ext.Ajax.request({
            url: url,
            params: {
                data: Ext.encode(myObj)
            },
            success: function (response) {
                me.getFormdata().up('window').body.unmask();
                if (Ext.decode(response.responseText).success == true)
                {
                    Ext.Msg.show({
                        title: 'Success',
                        msg: 'Data saved successfully.',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                            me.getFormdata().up('window').close();
                            var gridDepan = me.getGrid();
                            var storeDepan = gridDepan.getStore();
                            storeDepan.reload();
                        }
                    });
                }
                else {
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Unable to save data.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            },
        });
    },
    
});