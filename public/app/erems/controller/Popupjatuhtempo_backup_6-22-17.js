Ext.define('Erems.controller.Popupjatuhtempo', {
   extend: 'Erems.library.template.controller.Controller2',
    requires: ['Erems.library.Browse', 
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools', 
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
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
            'popupjatuhtempoformdata': {
                afterrender: this.formDataAfterRender,
                beforerender:function(el){
                   
                }
            },
            'popupjatuhtempoformdata button[action=save]': {
                click: this.mainDataSave
            },
            'popupjatuhtempoformdata button[action=cancel]': {
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