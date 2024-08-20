Ext.define('Cashier.controller.Code', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Code',
    views: [
        'code.Panel',
        'code.Grid',
        'code.FormSearch',
        'code.FormData',
    ],
    stores: [
        'Code',
    ],
    models: [
        'Code',
    ],
    refs: [
        {ref: 'grid', selector: 'codegrid'},
        {ref: 'formsearch', selector: 'codeformsearch'},
        {ref: 'formdata', selector: 'codeformdata'},
    ],
    controllerName: 'code',
    fieldName: 'code',
    bindPrefixName: 'Code',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'codepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'codegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'codegrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'codegrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'codegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'codegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'codegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'codeformsearch button[action=search]': {
                click: this.dataSearch
            },
            'codeformsearch button[action=reset]': {
                click: this.dataReset
            },
            'codeformdata': {
                afterrender: this.formDataAfterRender
            },
            'codeformdata [name=code] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'codeformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'codeformdata button[action=save]': {
                click: this.dataSave
            },
            'codeformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
});