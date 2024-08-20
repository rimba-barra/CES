Ext.define('Erems.controller.Popupunitspk', {
   extend: 'Erems.library.template.controller.Controller2',
    requires: ['Erems.library.Browse', 
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools', 
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    alias: 'controller.Popupunitspk',
    views: ['popupunitspk.Panel', 'popupunitspk.Grid', 'popupunitspk.FormSearch', 'popupunitspk.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupunitspkgrid'
        },
        {
            ref: 'formsearch',
            selector: 'popupunitspkformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popupunitspkformdata'
        }
    ],
    controllerName: 'popupunitspk',
    fieldName: 'position',
    bindPrefixName:'Popupunitspk',
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
            'popupunitspkpanel': {
                //afterrender: this.panelAfterRender,
                afterrender:function(){
                    var me;
                    me=this;
                    me.windowsHeight(me.bindPrefixName, 430);
                    me.windowsWidht(me.bindPrefixName, 1000);                 
                    me.panelAfterRender();
                },
                beforerender: me.mainPanelBeforeRender
             
            },
            'popupunitspkgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupunitspkgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'popupunitspkgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'popupunitspkgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupunitspkgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popupunitspkgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupunitspkformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupunitspkformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupunitspkformdata': {
                afterrender: this.formDataAfterRender,
                beforerender:function(el){
                   
                }
            },
            'popupunitspkformdata button[action=save]': {
                click: this.mainDataSave
            },
            'popupunitspkformdata button[action=cancel]': {
                click: this.formDataClose
            },
             //added by semy 21-6-2017
             'popupunitspkgrid toolbar button[action=excel_page]': {
                click: function(){
                   me.saveExcelPage();
                },
            },
             //added by semy 21-6-2017
             'popupunitspkgrid toolbar button[action=excel_selected]': {
                click: function(){
                   me.saveExcelSelected();
                },
            },
             'popupunitspkgrid toolbar button[action=excel_all]': {
                click: function(){
                   me.saveExcelAll();
                },
            },

        });
    },
    gridSelectionChange: function() {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
        grid.down('#btnExportSelected').setDisabled(row.length < 1);
       
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

        

        //
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
    
    windowsHeight:function(menu,height){

        Ext.get('WINDOW-mnu' + menu).setHeight(height);

    },

    windowsWidht:function(menu,widht){

        Ext.get('WINDOW-mnu' + menu).setWidth(widht);

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
 
    



});