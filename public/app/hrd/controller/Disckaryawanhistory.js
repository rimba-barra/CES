Ext.define('Hrd.controller.Disckaryawanhistory', {
    extend: 'Hrd.library.template.controller.Controller',
    alias: 'controller.Disckaryawanhistory',
    views: ['disckaryawanhistory.Panel', 'disckaryawanhistory.Grid', 'disckaryawanhistory.FormSearch'],
    requires: [
        'Hrd.template.combobox.Projectcombobox',
        'Hrd.template.combobox.Ptcombobox'
    ],
    stores: ['Disckaryawanhistory'],
    models: ['Disckaryawanhistory'],
    formWidth: 500,
    refs: [
        {
            ref: 'grid',
            selector: 'disckaryawanhistorygrid'
        },
        {
            ref: 'formsearch',
            selector: 'disckaryawanhistoryformsearch'
        }
    ],
    controllerName: 'disckaryawanhistory',
    fieldName: 'employee_name',
    bindPrefixName:'Disckaryawanhistory',
    init: function(application) {
        var me = this;
        this.control({
            'disckaryawanhistorypanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
             
            },
            'disckaryawanhistorygrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'disckaryawanhistorygrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'disckaryawanhistoryformsearch button[action=search]': {
                click: this.dataSearch,
                afterrender: this.formSearchAfterRender
            },
            'disckaryawanhistoryformsearch button[action=reset]': {
                click:function (){
                    this.dataReset(this);                     
                }   
            },
            'disckaryawanhistorygrid button[action=export]': {
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
        
    },
    export: function (el) {
        var me = this;
        var g = me.getGrid();
        var f = me.getFormsearch();
        var formvalue = f.getForm().getValues();
        
        g.setLoading(true);
            
        Ext.Ajax.request({
            url: 'hrd/disckaryawanhistory/export',
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