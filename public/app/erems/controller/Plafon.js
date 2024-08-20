Ext.define('Erems.controller.Plafon', {
    extend: 'Erems.library.template.controller.Controller2',
    requires: ['Erems.library.Browse', 'Erems.library.box.Config',
        'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    alias: 'controller.Plafon',
    views: ['plafon.Panel', 'plafon.Grid', 'plafon.FormSearch', 'plafon.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'plafongrid'
        },
        {
            ref: 'formsearch',
            selector: 'plafonformsearch'
        },
        {
            ref: 'formdata',
            selector: 'plafonformdata'
        }
    ],
    controllerName: 'plafon',
    fieldName: 'side',
    bindPrefixName:'Plafon',
    localStore: {
        detail: null,
        selectedUnit: null,
        customer: null
    },
    browseHandler: null,
    cbf: null,
    mt: null,
    formxWinId: 'win-sidewinId',
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
            'plafonpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: me.panelAfterRender
                
            },
            'plafongrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'plafongrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'plafongrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'plafongrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'plafongrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'plafongrid actioncolumn': {
             //   afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'plafonformsearch button[action=search]': {
                click: this.dataSearch
            },
            'plafonformsearch button[action=reset]': {
                click: this.dataReset
            },
            'plafonformdata': {
                afterrender: this.formDataAfterRender
            },
            'plafonformdata button[action=save]': {
                click: this.mainDataSave
            },
            'plafonformdata button[action=cancel]': {
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