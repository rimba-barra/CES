Ext.define('Hrd.controller.Sisadisckaryawan', {
    extend: 'Hrd.library.template.controller.Controller',
    alias: 'controller.Sisadisckaryawan',
    views: ['sisadisckaryawan.Panel', 'sisadisckaryawan.Grid', 'sisadisckaryawan.FormSearch', 'sisadisckaryawan.FormData'],
    requires: [
        'Hrd.template.combobox.Projectcombobox'
    ],
    stores: ['Sisadisckaryawan', 'Discstatus'],
    models: ['Sisadisckaryawan', 'Discstatus'],
    formWidth: 500,
    refs: [
        {
            ref: 'grid',
            selector: 'sisadisckaryawangrid'
        },
        {
            ref: 'formsearch',
            selector: 'sisadisckaryawanformsearch'
        },
        {
            ref: 'formdata',
            selector: 'sisadisckaryawanformdata'
        }
    ],
    controllerName: 'sisadisckaryawan',
    fieldName: 'employee_name',
    bindPrefixName:'Sisadisckaryawan',
    init: function(application) {
        var me = this;
        this.control({
            'sisadisckaryawanpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
             
            },
            'sisadisckaryawangrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'sisadisckaryawangrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'sisadisckaryawanformsearch button[action=search]': {
                click: this.dataSearch,
                afterrender: this.formSearchAfterRender
            },
            'sisadisckaryawanformsearch button[action=reset]': {
                click:function (){
                    this.dataReset(this);                     
                }   
            },
            'sisadisckaryawanformdata': {
                afterrender: this.formDataAfterRender
            },
            'sisadisckaryawanformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'sisadisckaryawangrid button[action=export]': {
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
        
        f.down("[name=discstatus]").getStore().reload();
        
    },
    export: function (el) {
        var me = this;
        var g = me.getGrid();
        var f = me.getFormsearch();
        var formvalue = f.getForm().getValues();
        
        g.setLoading(true);
            
        Ext.Ajax.request({
            url: 'hrd/sisadisckaryawan/export',
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
                me.getFormdata().up('window').close();
            }
        });
        
    },
    
});