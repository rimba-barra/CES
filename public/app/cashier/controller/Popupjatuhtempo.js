Ext.define('Cashier.controller.Popupjatuhtempo', {
   extend: 'Cashier.library.template.controller.Controller2',
    requires: ['Cashier.library.Browse', 
        'Cashier.library.box.Config',
        'Cashier.library.box.tools.Tools', 
        'Cashier.template.ComboBoxFields',
        'Cashier.library.box.tools.EventSelector',
        'Cashier.library.ModuleTools'],
    alias: 'controller.Popupjatuhtempo',
    views: ['popupjatuhtempo.Panel', 'popupjatuhtempo.Grid', 'popupjatuhtempo.FormSearch', 'popupjatuhtempo.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupjatuhtempogrid'
        },
        {
            ref: 'formsearch',
            selector: 'popupjatuhtempoformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popupjatuhtempoformdata'
        }
    ],
    controllerName: 'popupjatuhtempo',
    fieldName: 'position',
    bindPrefixName:'Popupjatuhtempo',
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
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Cashier.template.ComboBoxFields();
    },
    init: function(application) {
        var me = this;
        
         me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});
        var events = new Cashier.library.box.tools.EventSelector();
        
        this.control({
            'popupjatuhtempopanel': {
                afterrender: this.panelAfterRender,
                beforerender: me.mainPanelBeforeRender
             
            },
            'popupjatuhtempogrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupjatuhtempogrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'popupjatuhtempogrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'popupjatuhtempogrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupjatuhtempogrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popupjatuhtempogrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupjatuhtempoformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupjatuhtempoformsearch button[action=reset]': {
                click: this.dataReset
            },
//            'popupjatuhtempoformdata': {
//                afterrender: this.formDataAfterRender,
//                beforerender:function(el){
//                   
//                }
//            },
//            'popupjatuhtempoformdata button[action=save]': {
//                click: this.mainDataSave
//            },
//            'popupjatuhtempoformdata button[action=cancel]': {
//                click: this.formDataClose
//            },
//             //added by semy 21-6-2017
//             'popupjatuhtempogrid toolbar button[action=excel_page]': {
//                click: function(){
//                   me.saveExcelPage();
//                },
//            },
//             //added by semy 21-6-2017
//             'popupjatuhtempogrid toolbar button[action=excel_selected]': {
//                click: function(){
//                   me.saveExcelSelected();
//                },
//            },
//             'popupjatuhtempogrid toolbar button[action=excel_all]': {
//                click: function(){
//                   me.saveExcelAll();
//                },
//            },
            
            
                 
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
    
//        me.tools.ajax({
//            params: {},
//            success: function(data, model) {
//               
//                me.tools.wesea(data.scheduletype, f.down("[name=scheduletype]")).comboBox();
//            }
//        }).read('processinit');

    },
    mainDataSave: function() {
        var me = this;

        me.tools.iNeedYou(me).save();
    },
//    //added by semy 21-6-2017
//    gridSelectionChange: function() {
//        var me = this;
//        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
//        grid.down('#btnExportSelected').setDisabled(row.length < 1);
//       
//    },
//    saveExcelPage: function() {
//        var me = this;
//        var p = me.getGrid();
//        var params = me.getFormsearch().getValues();
//        params["page"] = me.getGrid().getStore().currentPage;
//        //params["schedule_id"] = me.getFormsearch().down("[name=schedule_id]").getValue();
//       // p.setLoading("Please wait...");
//        p.setLoading("Please wait...");
//        me.tools.ajax({
//            params: params,
//            success: function(data, model) {
//                p.setLoading(false);
//                var url = data['others'][0][0]['URL'];
//                if (url) {
//                    Ext.Msg.show({
//                        title: 'Info',
//                        msg: '<a href="' + url + '" target="blank">Download file</a>',
//                        icon: Ext.Msg.INFO,
//                        buttons: Ext.Msg.OK,
//                        fn: function() {
//
//                        }
//                    });
//                }
//               
//
//            }
//        }).read('saveexcelpage');
//    },
//    saveExcelAll: function() {
//        var me = this;
//        var p = me.getGrid();
//        var params = me.getFormsearch().getValues();
//        params["page"] = me.getGrid().getStore().currentPage;
//        //params["schedule_id"] = me.getFormsearch().down("[name=schedule_id]").getValue();
//       // p.setLoading("Please wait...");
//        p.setLoading("Please wait...");
//        me.tools.ajax({
//            params: params,
//            success: function(data, model) {
//                p.setLoading(false);
//                var url = data['others'][0][0]['URL'];
//                if (url) {
//                    Ext.Msg.show({
//                        title: 'Info',
//                        msg: '<a href="' + url + '" target="blank">Download file</a>',
//                        icon: Ext.Msg.INFO,
//                        buttons: Ext.Msg.OK,
//                        fn: function() {
//
//                        }
//                    });
//                }
//               
//
//            }
//        }).read('saveexcelall');
//    },
//    saveExcelSelected: function () {
//        var me = this;
//        var p = me.getGrid();
//        var selected =  me.getGrid().getSelectionModel().getSelection();
//    var params = me.getFormsearch().getValues();
//        params["page"] = me.getGrid().getStore().currentPage;
//        
//       
//        var temp = [];
//        
//        for(var i in selected) {
//            temp.push(selected[i].data);
//        }
//
//        //params["schedule_id"] = me.getFormsearch().down("[name=schedule_id]").getValue();
//       p.setLoading("Please wait...");
//        me.tools.ajax({
//            params: {
//                data:Ext.encode(temp)
//            },
//            success: function(data, model) {
//                p.setLoading(false);
//                var url = data['others'][0][0]['URL'];
//               if (url) {
//                    Ext.Msg.show({
//                        title: 'Info',
//                        msg: '<a href="' + url + '" target="blank">Download file</a>',
//                        icon: Ext.Msg.INFO,
//                        buttons: Ext.Msg.OK,
//                        fn: function() {
//
//                        }
//                    });
//                }
//
//            }
//        }).read('saveexcelselected');
//    },
//    dataSearch: function() {
//        var me = this;
//
//        var form = me.getFormsearch().getForm();
//        var fields = me.getFormsearch().getValues();
//        me.getGrid().doInit();
//        var store = me.getGrid().getStore();
//        for (var x in fields)
//        {
//            
//            store.getProxy().setExtraParam(x, fields[x]);
//        }
//        store.getProxy().setExtraParam("scheduletype", me.getFormsearch().down("[name=scheduletype]").getValue());
//        me.loadPage(store);
//
//    },
//    
//    //ended
//    altFdar: function(controller) {
//        var me = this;
//        var f = controller.getFormdata();
//
//        
//
//        //
//        var x = {
//            init: function() {
//
//                controller.setActiveForm(f);
//
//
//
//
//            },
//            create: function() {
//                var that = this;
//                f.editedRow = -1;
//                f.setLoading("Loading components...");
//                me.tools.ajax({
//                    params: {},
//                    success: function(data, model) {
//
//                        
//                        f.setLoading(false);
//                        me.tools.wesea(data.employee, f.down("[name=upline_id]")).comboBox();
//                        me.tools.wesea(data.bank, f.down("[name=bank_bank_id]")).comboBox();
//
//                    }
//                }).read('detail');
//
//            },
//            update: function() {
//                var that = this;
//                f.editedRow = controller.getGrid().getSelectedRow();
//                var rec = controller.getGrid().getSelectedRecord();
//
//
//
//
//                f.setLoading("Loading...");
//                me.tools.ajax({
//                    params: {},
//                    success: function(data, model) {
//
//                      me.tools.wesea(data.employee, f.down("[name=upline_id]")).comboBox();
//                      me.tools.wesea(data.bank, f.down("[name=bank_bank_id]")).comboBox();
//                        f.loadRecord(rec);
//                        f.setLoading(false);
//                        
//
//                    }
//                }).read('detail');
//            }
//            
//        };
//        return x;
//    }
//    
    



});