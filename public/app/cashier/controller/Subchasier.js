Ext.define('Cashier.controller.Subchasier', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Subchasier',
    views: [
        'subchasier.Panel',
        'subchasier.Grid',
        'subchasier.FormSearch',
        'subchasier.FormData',
    ],
    stores: [
        'Subchasier',
    ],
    models: [
        'Subchasier',
    ],
    refs: [
        {ref: 'grid', selector: 'subchasiergrid'},
        {ref: 'formsearch', selector: 'subchasierformsearch'},
        {ref: 'formdata', selector: 'subchasierformdata'},
    ],
    controllerName: 'subchasier',
    fieldName: 'description',
    bindPrefixName: 'Subchasier',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'subchasierpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'subchasiergrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'subchasiergrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'subchasiergrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'subchasiergrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'subchasiergrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'subchasiergrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'subchasierformsearch button[action=search]': {
                click: this.dataSearch
            },
            'subchasierformsearch button[action=reset]': {
                click: this.dataReset
            },
            'subchasierformdata': {
                afterrender: this.formDataAfterRender
            },
            'subchasierformdata [name=subchasier] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'subchasierformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'subchasierformdata button[action=save]': {
                click: this.dataSave
            },
            'subchasierformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
});