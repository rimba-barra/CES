Ext.define('Cashier.controller.Module', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Module',
    views: [
        'module.Panel',
        'module.Grid',
        'module.FormSearch',
        'module.FormData',
    ],
    stores: [
        'Module',
    ],
    models: [
        'Module',
    ],
    refs: [
        {ref: 'grid', selector: 'modulegrid'},
        {ref: 'formsearch', selector: 'moduleformsearch'},
        {ref: 'formdata', selector: 'moduleformdata'},
    ],
    controllerName: 'module',
    fieldName: 'modulename',
    bindPrefixName: 'Module',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'modulepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'modulegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'modulegrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'modulegrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'modulegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'modulegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'modulegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'moduleformsearch button[action=search]': {
                click: this.dataSearch
            },
            'moduleformsearch button[action=reset]': {
                click: this.dataReset
            },
            'moduleformdata': {
                afterrender: this.formDataAfterRender
            },
            'moduleformdata [name=module] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'moduleformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'moduleformdata button[action=save]': {
                click: this.dataSave
            },
            'moduleformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
});