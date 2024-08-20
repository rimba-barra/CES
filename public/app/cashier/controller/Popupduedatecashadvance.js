Ext.define('Cashier.controller.Popupduedatecashadvance', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Popupduedatecashadvance',
    views: [
        'popupduedatecashadvance.Panel',
        'popupduedatecashadvance.Grid',
        'popupduedatecashadvance.FormSearch',
        'popupduedatecashadvance.FormData',
    ],
    stores: [
        'Popupduedatecashadvance',
    ],
    models: [
        'Tcashadvance',
    ],
    refs: [
        {ref: 'grid', selector: 'popupduedatecashadvancegrid'},
        {ref: 'formsearch', selector: 'popupduedatecashadvanceformsearch'},
        {ref: 'formdata', selector: 'popupduedatecashadvanceformdata'},
    ],
    controllerName: 'popupduedatecashadvance',
    fieldName: 'popupduedatecashadvance',
    bindPrefixName: 'Popupduedatecashadvance',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'popupduedatecashadvancepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popupduedatecashadvancegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupduedatecashadvancegrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'popupduedatecashadvancegrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'popupduedatecashadvancegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupduedatecashadvancegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popupduedatecashadvancegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupduedatecashadvanceformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupduedatecashadvanceformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupduedatecashadvanceformdata': {
                afterrender: this.formDataAfterRender
            },
            'popupduedatecashadvanceformdata [name=popupduedatecashadvance] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'popupduedatecashadvanceformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'popupduedatecashadvanceformdata button[action=save]': {
                click: this.dataSave
            },
            'popupduedatecashadvanceformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    gridSelectionChange: function () {
        var me, grid, row;
        me = this;
        grid = me.getGrid();
        row = grid.getSelectionModel().getSelection();
    },
});