Ext.define('Erems.controller.Popupjatuhtempofilter', {
   extend: 'Erems.library.template.controller.Controller2',
    requires: ['Erems.library.Browse', 
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools', 
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    alias: 'controller.Popupjatuhtempofilter',
    views: ['popupjatuhtempofilter.Panel', 'popupjatuhtempofilter.Grid', 'popupjatuhtempofilter.FormSearch', 'popupjatuhtempofilter.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupjatuhtempofiltergrid'
        },
        {
            ref: 'formsearch',
            selector: 'popupjatuhtempofilterformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popupjatuhtempofilterformdata'
        }
    ],
    controllerName: 'popupjatuhtempofilter',
    fieldName: 'position',
    bindPrefixName:'Popupjatuhtempofilter',
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
            'popupjatuhtempofilterpanel': {
                afterrender: this.panelAfterRender,
                beforerender: me.mainPanelBeforeRender
             
            },
            'popupjatuhtempofiltergrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupjatuhtempofiltergrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'popupjatuhtempofiltergrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'popupjatuhtempofiltergrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupjatuhtempofiltergrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popupjatuhtempofiltergrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupjatuhtempofilterformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupjatuhtempofilterformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupjatuhtempofilterformdata': {
                afterrender: this.formDataAfterRender,
                beforerender:function(el){
                   
                }
            },
            'popupjatuhtempofilterformdata button[action=save]': {
                click: this.mainDataSave
            },
            'popupjatuhtempofilterformdata button[action=cancel]': {
                click: this.formDataClose
            },
             //added by semy 21-6-2017
             'popupjatuhtempofiltergrid toolbar button[action=excel_page]': {
                click: function(){
                   me.saveExcelPage();
                },
            },
             //added by semy 21-6-2017
             'popupjatuhtempofiltergrid toolbar button[action=excel_selected]': {
                click: function(){
                   me.saveExcelSelected();
                },
            },
             'popupjatuhtempofiltergrid toolbar button[action=excel_all]': {
                click: function(){
                   me.saveExcelAll();
                },
            },
             'popupjatuhtempofiltergrid toolbar button[action=export_excel]': {
                click: function(el) {
                    this.dataExport(el);
                }
            },
                  //ended
      

        });
    },
    fdar: function() {
        var me = this;
        return me.altFdar(me);      
    },
    panelAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;
        var f = me.getFormsearch();
    
        me.tools.ajax({
            params: {},
            success: function(data, model) {
               
                me.tools.wesea(data.scheduletype, f.down("[name=scheduletype]")).comboBox();
            }
        }).read('processinit');

    },
    mainDataSave: function() {
        var me = this;

        me.tools.iNeedYou(me).save();
    },
    //added by semy 21-6-2017
    gridSelectionChange: function() {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
        grid.down('#btnExportSelected').setDisabled(row.length < 1);
       
    },
    saveExcelPage: function() {
        var me = this;
        var p = me.getGrid();
        var params = me.getFormsearch().getValues();
        params["page"] = me.getGrid().getStore().currentPage;
        //params["schedule_id"] = me.getFormsearch().down("[name=schedule_id]").getValue();
       // p.setLoading("Please wait...");
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: params,
            success: function(data, model) {
                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {

                        }
                    });
                }
            }
        }).read('saveexcelpage');
    },
    saveExcelAll: function() {
        var me = this;
        var p = me.getGrid();
        var params = me.getFormsearch().getValues();
        params["page"] = me.getGrid().getStore().currentPage;
        //params["schedule_id"] = me.getFormsearch().down("[name=schedule_id]").getValue();
       // p.setLoading("Please wait...");
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: params,
            success: function(data, model) {
                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {
                        }
                    });
                }
            }
        }).read('saveexcelall');
    },
    saveExcelSelected: function () {
        var me = this;
        var p = me.getGrid();
        var selected =  me.getGrid().getSelectionModel().getSelection();
        var params = me.getFormsearch().getValues();
        params["page"] = me.getGrid().getStore().currentPage;
        
       
        var temp = [];
        
        for(var i in selected) {
            temp.push(selected[i].data);
        }

        //params["schedule_id"] = me.getFormsearch().down("[name=schedule_id]").getValue();
       p.setLoading("Please wait...");
        me.tools.ajax({
            params: {
                data:Ext.encode(temp)
            },
            success: function(data, model) {
                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
               if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {

                        }
                    });
                }

            }
        }).read('saveexcelselected');
    },
    dataSearch: function() {
        var me = this;

        var form = me.getFormsearch().getForm();
        var fields = me.getFormsearch().getValues();
        me.getGrid().doInit();
        var store = me.getGrid().getStore();
        for (var x in fields){
            store.getProxy().setExtraParam(x, fields[x]);
        }
        store.getProxy().setExtraParam("scheduletype", me.getFormsearch().down("[name=scheduletype]").getValue());
        me.loadPage(store);

    },
    
    //ended
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
        var params        = me.getFormsearch().getValues();
        params['scheduletype']  = me.getFormsearch().getForm().findField('scheduletype').getSubmitValue();
        params["page"]    = me.getGrid().getStore().currentPage;
        
        Ext.Ajax.timeout = 60000*30;
        Ext.Ajax.request({
            url: 'erems/popupjatuhtempofilter/export',
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