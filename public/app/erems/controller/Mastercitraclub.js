Ext.define('Erems.controller.Mastercitraclub', {
   extend: 'Erems.library.template.controller.Controller2',
    requires: ['Erems.library.Browse', 'Erems.library.box.Config',
        'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    alias: 'controller.Mastercitraclub',

    stores: ['Mastercitraclub'],
    models: ['Mastercitraclub'],
    views: ['mastercitraclub.Panel', 'mastercitraclub.Grid', 'mastercitraclub.FormSearch', 'mastercitraclub.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'mastercitraclubgrid'
        },
        {
            ref: 'formsearch',
            selector: 'mastercitraclubformsearch'
        },
        {
            ref: 'formdata',
            selector: 'mastercitraclubformdata'
        }
    ],
    controllerName: 'mastercitraclub',
    fieldName: 'clubname',
    bindPrefixName:'Mastercitraclub',
    localStore: {
        detail: null,
        selectedUnit: null,
        customer: null
    },
    browseHandler: null,
    cbf: null,
    mt: null,
    formxWinId: 'win-mastercitraclubwinId',
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
            'mastercitraclubpanel': {
                afterrender: this.panelAfterRender,
                beforerender: me.mainPanelBeforeRender
             
            },
            'mastercitraclubgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'mastercitraclubgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'mastercitraclubgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'mastercitraclubgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'mastercitraclubgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'mastercitraclubgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'mastercitraclubformsearch button[action=search]': {
                click: this.dataSearch
            },
            'mastercitraclubformsearch button[action=reset]': {
                click: this.dataReset
            },
            'mastercitraclubformdata': {
                afterrender: this.formDataAfterRender,
                beforerender:function(el){
                   
                }
            },
            'mastercitraclubformdata button[action=save]': {
                click: this.mainDataSave
            },
            'mastercitraclubformdata button[action=cancel]': {
                click: this.formDataClose
            }

        });
    },
    fdar: function() {
        return this.tools.fdar(this);
       
    },
    mainDataSave: function() {
        var me = this;
        
        me.tools.iNeedYou(me).save();
    }
});