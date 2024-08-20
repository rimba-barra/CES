Ext.define('Erems.controller.Popupbelumajb', {
   extend: 'Erems.library.template.controller.Controller2',
    requires: ['Erems.library.Browse', 
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools', 
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    alias: 'controller.Popupbelumajb',
    views: ['popupbelumajb.Panel', 'popupbelumajb.Grid', 'popupbelumajb.FormSearch', 'popupbelumajb.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupbelumajbgrid'
        },
        {
            ref: 'formsearch',
            selector: 'popupbelumajbformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popupbelumajbformdata'
        }
    ],
    controllerName: 'popupbelumajb',
    fieldName: 'position',
    bindPrefixName:'Popupbelumajb',
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
            'popupbelumajbpanel': {
                afterrender: this.panelAfterRender,
                beforerender: me.mainPanelBeforeRender
             
            },
            'popupbelumajbgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupbelumajbgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'popupbelumajbgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'popupbelumajbgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupbelumajbgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popupbelumajbgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupbelumajbformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupbelumajbformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupbelumajbformdata': {
                afterrender: this.formDataAfterRender,
                beforerender:function(el){
                   
                }
            },
            'popupbelumajbformdata button[action=save]': {
                click: this.mainDataSave
            },
            'popupbelumajbformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'popupbelumajbgrid toolbar button[action=export_excel]':{
                click: function(el) {
                    this.dataExport(el);
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

    dataExport: function(el) {
        var me = this;
        el.up('window').body.mask('Creating Excel File, Please Wait...');
        var params              = me.getFormsearch().getValues();
        params["page"]          = me.getGrid().getStore().currentPage;
        
        Ext.Ajax.timeout = 60000*30;
        Ext.Ajax.request({
            url: 'erems/popupbelumajb/export',
            params:params,
            success: function(response) {
                try{
                    var resp = response.responseText;
                    
                    if(resp) {
                        var info = Ext.JSON.decode(resp);
                        
                        if(info.success == true){
                            el.up('window').body.unmask();
                            Ext.Msg.show({
                                title: 'Info',
                                msg: '<a href="' + info.url + '" target="blank">Click Here For Download Excel File</a>',
                                icon: Ext.Msg.INFO,
                                //buttons: [], //jika ingin tidak ada buttons
                                buttons: Ext.Msg.CANCEL,
                                buttonText : 
                                {
                                    cancel : 'Close',
                                }
                            });
                        } else {
                            el.up('window').body.unmask();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: 'Error: Export to Excel Failed.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    }
                }catch(e){
                    //console.error(e);
                    el.up('window').body.unmask();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Export to Excel Failed.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            },
            failure: function(e){
                //console.error(e);
                el.up('window').body.unmask();
                Ext.Msg.show({
                    title: 'Failure',
                    msg: 'Error: Export to Excel Failed.',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    }
});