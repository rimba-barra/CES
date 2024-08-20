Ext.define('Erems.controller.Openticket', {
    extend: 'Erems.library.template.controller.Controller2',
    requires: ['Erems.library.Browse', 'Erems.library.box.Config',
        'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    alias: 'controller.Openticket',
    views: ['openticket.Panel', 'openticket.Grid', 'openticket.FormSearch', 'openticket.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'openticketgrid'
        },
        {
            ref: 'formsearch',
            selector: 'openticketformsearch'
        },
        {
            ref: 'formdata',
            selector: 'openticketformdata'
        }
    ],
    controllerName: 'openticket',
    fieldName: 'ticket',
    bindPrefixName:'Openticket',
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
            'openticketpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: me.panelAfterRender
                
            },
            'openticketgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'openticketgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'openticketgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'openticketgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'openticketgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'openticketgrid actioncolumn': {
             //   afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'openticketformsearch button[action=search]': {
                click: this.dataSearch
            },
            'openticketformsearch button[action=reset]': {
                click: this.dataReset
            },
            'openticketformdata': {
                afterrender: this.formDataAfterRender
            },
            'openticketformdata button[action=save]': {
                click: this.mainDataSave
            },
            'openticketformdata button[action=cancel]': {
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