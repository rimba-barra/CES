Ext.define('Erems.controller.Popupkavlingsiapst', {
   extend: 'Erems.library.template.controller.Controller2',
    requires: ['Erems.library.Browse', 
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools', 
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    alias: 'controller.Popupkavlingsiapst',
    views: ['popupkavlingsiapst.Panel', 'popupkavlingsiapst.Grid', 'popupkavlingsiapst.FormSearch', 'popupkavlingsiapst.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupkavlingsiapstgrid'
        },
        {
            ref: 'formsearch',
            selector: 'popupkavlingsiapstformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popupkavlingsiapstformdata'
        }
    ],
    controllerName: 'popupkavlingsiapst',
    fieldName: 'position',
    bindPrefixName:'Popupkavlingsiapst',
    localStore: {
        detail: null,
        selectedUnit: null,
        customer: null
    },
    browseHandler: null,
    cbf: null,
    mt: null,
    formxWinId: 'win-posisiwinId',
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    init: function(application) {
        var me = this;
        
         me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        var events = new Erems.library.box.tools.EventSelector();
        
        this.control({
            'popupkavlingsiapstpanel': {
                afterrender: this.panelAfterRender,
                beforerender: me.mainPanelBeforeRender
             
            },
            'popupkavlingsiapstgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupkavlingsiapstgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'popupkavlingsiapstgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'popupkavlingsiapstgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupkavlingsiapstgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popupkavlingsiapstgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupkavlingsiapstformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupkavlingsiapstformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupkavlingsiapstformdata': {
                afterrender: this.formDataAfterRender,
                beforerender:function(el){
                   
                }
            },
            'popupkavlingsiapstformdata button[action=save]': {
                click: this.mainDataSave
            },
            'popupkavlingsiapstformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'popupkavlingsiapstgrid toolbar button[action=export_excel]': {
                click: function(el) {
                    me.showExcel(el);
                }
            }

        });
    },
    fdar: function() {
        var me = this;
        return me.altFdar(me);
       
    },
    mainDataSave: function() {
        var me = this;

        me.tools.iNeedYou(me).save();
    },
    altFdar: function(controller) {
        var me = this;
        var f = controller.getFormdata();
        var x = {
            init: function() {
                controller.setActiveForm(f);
            },
            create: function() {
                var that = this;
                f.editedRow = -1;
                f.setLoading("Loading components...");
                me.tools.ajax({
                    params: {},
                    success: function(data, model) {

                        
                        f.setLoading(false);
                        me.tools.wesea(data.employee, f.down("[name=upline_id]")).comboBox();
                        me.tools.wesea(data.bank, f.down("[name=bank_bank_id]")).comboBox();

                    }
                }).read('detail');

            },
            update: function() {
                var that = this;
                f.editedRow = controller.getGrid().getSelectedRow();
                var rec = controller.getGrid().getSelectedRecord();

                f.setLoading("Loading...");
                me.tools.ajax({
                    params: {},
                    success: function(data, model) {

                      me.tools.wesea(data.employee, f.down("[name=upline_id]")).comboBox();
                      me.tools.wesea(data.bank, f.down("[name=bank_bank_id]")).comboBox();
                        f.loadRecord(rec);
                        f.setLoading(false);
                        

                    }
                }).read('detail');
            }
            
        };
        return x;
    },
    showExcel:function(el){
        var me = this;
        var p = el.up('panel');
        var params = me.getFormsearch().getValues();

        params["page"] = me.getGrid().getStore().currentPage;
        params["limit"] = me.getGrid().getStore().lastOptions.limit;
        params["start"] = me.getGrid().getStore().lastOptions.start;

        p.setLoading("Please wait...");

        Ext.Ajax.request({
            url: 'erems/popupkavlingsiapst/export',
            params: params,
            success: function(response) {
                p.setLoading(false);
                var text = Ext.JSON.decode(response.responseText);

                if(text != null){
                    if (text.url) {
                        Ext.Msg.show({
                            title: 'Info',
                            msg: '<a href="' + text.url + '" target="blank">Download file</a>',
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK,
                            fn: function() {

                            }
                        });
                    }
                }else{
                    Ext.Msg.show({
                        title: 'Info',
                        msg: 'Records not exists',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                }
            }
        });
    },
});