Ext.define('Cashier.controller.Globalparam', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Globalparam',
    views: [
        'globalparam.Panel',
        'globalparam.Grid',
        'globalparam.FormSearch',
        'globalparam.FormData',
    ],
    stores: [
        'Globalparam',
    ],
    models: [
        'Globalparam',
    ],
    refs: [
        {ref: 'grid', selector: 'globalparamgrid'},
        {ref: 'formsearch', selector: 'globalparamformsearch'},
        {ref: 'formdata', selector: 'globalparamformdata'},
    ],
    controllerName: 'globalparam',
    fieldName: 'name',
    bindPrefixName: 'Globalparam',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'globalparampanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'globalparamgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'globalparamgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'globalparamgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'globalparamgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'globalparamgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'globalparamgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'globalparamformsearch button[action=search]': {
                click: this.dataSearch
            },
            'globalparamformsearch button[action=reset]': {
                click: this.dataReset
            },
            'globalparamformdata': {
                afterrender: this.formDataAfterRender
            },
            'globalparamformdata [name=globalparam] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'globalparamformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'globalparamformdata button[action=save]': {
                click: this.dataSave
            },
            'globalparamformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
});