Ext.define('Cashier.controller.Cashflowtype', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Cashflowtype',
    views: [
        'cashflowtype.Panel',
        'cashflowtype.Grid',
        'cashflowtype.FormSearch',
        'cashflowtype.FormData',
    ],
    stores: [
        'Cashflowtype',
        'Grouptype',
        'Grouptypecombo'
    ],
    models: [
        'Cashflowtype',
        'Grouptype'
    ],
    requires: [
        'Cashier.library.template.combobox.Grouptypecombobox'
    ],
    refs: [
        {ref: 'grid', selector: 'cashflowtypegrid'},
        {ref: 'formsearch', selector: 'cashflowtypeformsearch'},
        {ref: 'formdata', selector: 'cashflowtypeformdata'},
    ],
    controllerName: 'cashflowtype',
    fieldName: 'cashflowtype',
    bindPrefixName: 'Cashflowtype',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'cashflowtypepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'cashflowtypegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'cashflowtypegrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'cashflowtypegrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'cashflowtypegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'cashflowtypegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'cashflowtypegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'cashflowtypeformsearch button[action=search]': {
                click: this.dataSearch
            },
            'cashflowtypeformsearch button[action=reset]': {
                click: this.dataReset
            },
            'cashflowtypeformdata': {
                afterrender: this.formDataAfterRender
            },
            'cashflowtypeformdata [name=cashflowtype] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'cashflowtypeformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'cashflowtypeformdata button[action=save]': {
                click: this.dataSave
            },
            'cashflowtypeformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
});