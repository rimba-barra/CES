Ext.define('Erems.controller.Masterside', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Masterside',
    views: ['masterside.Panel', 'masterside.Grid', 'masterside.FormSearch', 'masterside.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'mastersidegrid'
        },
        {
            ref: 'formsearch',
            selector: 'mastersideformsearch'
        },
        {
            ref: 'formdata',
            selector: 'mastersideformdata'
        }
    ],
    controllerName: 'masterside',
    fieldName: 'side',
    bindPrefixName: 'Masterside',
    localStore: {
        detail: null,
        selectedUnit: null,
        customer: null
    },
    browseHandler: null,
    cbf: null,
    mt: null,
    formxWinId: 'win-sidewinId',
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    init: function (application) {
        var me = this;

        me.tools = new Erems.library.box.tools.Tools({ config: me.myConfig });

        this.control({
            'mastersidepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: me.panelAfterRender

            },
            'mastersidegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'mastersidegrid toolbar button[action=create]': {
                click: function () {
                    this.formDataShow('create');
                }
            },
            'mastersidegrid toolbar button[action=update]': {
                click: function () {
                    this.formDataShow('update');
                }
            },
            'mastersidegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'mastersidegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'mastersidegrid actioncolumn': {
                //   afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'mastersideformsearch button[action=search]': {
                click: this.dataSearch
            },
            'mastersideformsearch button[action=reset]': {
                click: this.dataReset
            },
            'mastersideformdata': {
                afterrender: this.formDataAfterRender
            },
            'mastersideformdata button[action=save]': {
                click: this.mainDataSave
            },
            'mastersideformdata button[action=cancel]': {
                click: this.formDataClose
            }

        });
    },
    fdar: function () {
        return this.tools.fdar(this);

    },
    mainDataSave: function () {
        var me = this;

        me.tools.iNeedYou(me).save();
        me.dataReset
    }




});