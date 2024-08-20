Ext.define('Cashier.controller.Subvouchersetup', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Subvouchersetup',
    views: [
        'subvouchersetup.Panel',
        'subvouchersetup.Grid',
        'subvouchersetup.FormSearch',
        'subvouchersetup.FormData',
    ],
    stores: [
        'Subvouchersetup',
    ],
    models: [
        'Subvouchersetup',
    ],
    refs: [
        {ref: 'grid', selector: 'subvouchersetupgrid'},
        {ref: 'formsearch', selector: 'subvouchersetupformsearch'},
        {ref: 'formdata', selector: 'subvouchersetupformdata'},
    ],
    controllerName: 'subvouchersetup',
    fieldName: 'subvoucher_code',
    bindPrefixName: 'Subvouchersetup',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'subvouchersetuppanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'subvouchersetupgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'subvouchersetupgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'subvouchersetupgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'subvouchersetupgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'subvouchersetupgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'subvouchersetupgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'subvouchersetupformsearch button[action=search]': {
                click: this.dataSearch
            },
            'subvouchersetupformsearch button[action=reset]': {
                click: this.dataReset
            },
            'subvouchersetupformdata': {
                afterrender: this.formDataAfterRender
            },
            'subvouchersetupformdata [name=subvouchersetup] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'subvouchersetupformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'subvouchersetupformdata button[action=save]': {
                click: this.dataSave
            },
            'subvouchersetupformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
});