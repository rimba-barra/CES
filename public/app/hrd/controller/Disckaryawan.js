Ext.define('Hrd.controller.Disckaryawan', {
    extend: 'Hrd.library.template.controller.Controller',
    alias: 'controller.Disckaryawan',
    views: ['disckaryawan.Panel', 'disckaryawan.Grid', 'disckaryawan.FormSearch'],
    requires: [
        'Hrd.template.combobox.Projectcombobox',
        'Hrd.template.combobox.Ptcombobox'
    ],
    stores: ['Disckaryawan', 'Discstatus'],
    models: ['Disckaryawan', 'Discstatus'],
    formWidth: 500,
    refs: [
        {
            ref: 'grid',
            selector: 'disckaryawangrid'
        },
        {
            ref: 'formsearch',
            selector: 'disckaryawanformsearch'
        }
    ],
    controllerName: 'disckaryawan',
    fieldName: 'employee_name',
    bindPrefixName:'Disckaryawan',
    init: function(application) {
        var me = this;
        this.control({
            'disckaryawanpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
             
            },
            'disckaryawangrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'disckaryawangrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'disckaryawanformsearch button[action=search]': {
                click: this.dataSearch,
                afterrender: this.formSearchAfterRender
            },
            'disckaryawanformsearch button[action=reset]': {
                click:function (){
                    this.dataReset(this);                     
                }   
            },
            'disckaryawangrid button[action=export]': {
                click: this.export
            },
        });
    },
    formDataAfterRender: function (el) {
        var me = this;
        me.storeProcess = me.createSpProcessObj(me.storeProcess);
        me.fdar().init();
        me.loadComboBoxStore(el);
        var state = el.up('window').state;
        if (state == 'read') {
            me.fdar().read();
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
    export: function (el) {
        var me = this;
        var g = me.getGrid();
        var f = me.getFormsearch();
        var formvalue = f.getForm().getValues();
        
        g.setLoading(true);
            
        Ext.Ajax.request({
            url: 'hrd/disckaryawan/export',
            method: 'POST',
            params: {
                data: Ext.encode(formvalue)
            },
            success: function (response) {
                g.setLoading(false);
                var data = Ext.JSON.decode(response.responseText);
                var url = data['directdata'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                        }
                    });
                }
                
            },
            failure: function (response) {
                g.setLoading(false);
            }
        });
        
    },
    
});