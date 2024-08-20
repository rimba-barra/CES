Ext.define('Erems.controller.Batasplafon', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Batasplafon',
    requires: ['Erems.library.Browse', 'Erems.library.box.Config',
        'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    views: ['batasplafon.Panel', 'batasplafon.Grid', 'batasplafon.FormSearch', 'batasplafon.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'batasplafongrid'
        },
        {
            ref: 'formsearch',
            selector: 'batasplafonformsearch'
        },
        {
            ref: 'formdata',
            selector: 'batasplafonformdata'
        },
        {
            ref:'panel',
            selector:'batasplafonpanel'
        }
    ],
    controllerName: 'batasplafon',
    fieldName: 'plafon_plafon',
    bindPrefixName:'Batasplafon',
    localStore: {
        detail: null,
        selectedUnit: null,
        customer: null
    },
    dataHolder:{plafon:null},
    browseHandler: null,
    cbf: null,
    mt: null,
    formxWinId: 'win-batasplafonwinId',
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
            'batasplafonpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: me.panelAfterRender
                
            },
            'batasplafongrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'batasplafongrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'batasplafongrid toolbar button[action=generate]': {
                click: function() {
                    me.generateDefault();
                }
            },
            'batasplafongrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'batasplafongrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'batasplafongrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'batasplafongrid actioncolumn': {
             //   afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'batasplafonformsearch button[action=search]': {
                click: this.dataSearch
            },
            'batasplafonformsearch button[action=reset]': {
                click: this.dataReset
            },
            'batasplafonformdata': {
                afterrender: this.formDataAfterRender
            },
            'batasplafonformdata [name=persen_desc]': {
                change: function(el){
                    if(el.value > 100){
                        el.setValue(100);
                    }else if(el.value < 0){
                        el.setValue(0);
                    }
                }
            },
            'batasplafonformdata button[action=save]': {
                click: this.mainDataSave
            },
            'batasplafonformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'batasplafonformsearch':{
                afterrender: this.formSearchAfterRender
            },
            'batasplafonformsearch [name=persen_desc]': {
                change: function(el){
                    if(el.value > 100){
                        el.setValue(100);
                    }else if(el.value < 0){
                        el.setValue(0);
                    }
                }
            },

        });
    },
    generateDefault:function(){
        var me = this;
        
        var p = me.getPanel();
        p.setLoading("Get all plafons default");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.getGrid().getStore().loadPage(1);
                p.setLoading(false);
            }
        }).read('generate');   
    },
    formSearchAfterRender:function(){
        this.callParent(arguments);
        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait..");
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                me.dataHolder.plafon = data.plafon?data.plafon:0;
                me.fillFormComponents(me.getFormsearch());
                p.setLoading(false);
            }
        }).read('detail');  
    },
    fillFormComponents:function(f){
        var me = this;
        me.tools.wesea(me.dataHolder.plafon, f.down("[name=plafon_plafon_id]")).comboBox(true);
    },
    fdar: function() {
        return this.tools.fdar(this);
       
    },
    mainDataSave: function() {
        var me = this;
        
        me.tools.iNeedYou(me).save();
    }
});