Ext.define('Erems.controller.Mastercac', {
   extend: 'Erems.library.template.controller.Controller2',
    requires: ['Erems.library.Browse', 
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools', 
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    alias: 'controller.Mastercac',
    views: ['mastercac.Panel', 'mastercac.Grid', 'mastercac.FormSearch', 'mastercac.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'mastercacgrid'
        },
        {
            ref: 'formsearch',
            selector: 'mastercacformsearch'
        },
        {
            ref: 'formdata',
            selector: 'mastercacformdata'
        }
    ],
    controllerName: 'mastercac',
    fieldName: 'position',
    bindPrefixName:'Mastercac',
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
            'mastercacpanel': {
                afterrender: this.panelAfterRender,
                beforerender: me.mainPanelBeforeRender
             
            },
            'mastercacgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'mastercacgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'mastercacgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'mastercacgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'mastercacgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'mastercacgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'mastercacformsearch button[action=search]': {
                click: this.dataSearch
            },
            'mastercacformsearch button[action=reset]': {
                click: this.dataReset
            },
            'mastercacformdata': {
                afterrender: this.formDataAfterRender,
                beforerender:function(el){
                   
                }
            },
            'mastercacformdata button[action=save]': {
                click: this.mainDataSave
            },
            'mastercacformdata button[action=cancel]': {
                click: this.formDataClose
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
    }
    



});