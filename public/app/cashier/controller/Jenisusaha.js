Ext.define('Cashier.controller.Jenisusaha', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Jenisusaha',
    views: [
        'jenisusaha.Panel',
        'jenisusaha.Grid',
        'jenisusaha.FormSearch',
        'jenisusaha.FormData',
    ],
    stores: [
        'Jenisusaha',
    ],
    models: [
        'Jenisusaha',
    ],
    refs: [
        {ref: 'grid', selector: 'jenisusahagrid'},
        {ref: 'formsearch', selector: 'jenisusahaformsearch'},
        {ref: 'formdata', selector: 'jenisusahaformdata'},
    ],
    controllerName: 'jenisusaha',
    fieldName: 'jenisusaha',
    bindPrefixName: 'Jenisusaha',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'jenisusahapanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'jenisusahagrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'jenisusahagrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'jenisusahagrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'jenisusahagrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'jenisusahagrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'jenisusahagrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'jenisusahaformsearch button[action=search]': {
                click: this.dataSearch
            },
            'jenisusahaformsearch button[action=reset]': {
                click: this.dataReset
            },
            'jenisusahaformdata': {
                afterrender: this.formDataAfterRender
            },
            'jenisusahaformdata [name=jenisusaha] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'jenisusahaformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'jenisusahaformdata button[action=save]': {
                click: this.dataSave
            },
            'jenisusahaformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
});