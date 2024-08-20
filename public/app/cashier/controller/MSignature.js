Ext.define('Cashier.controller.MSignature', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.MSignature',
    requires: [
        'Cashier.library.template.combobox.Mddircombobox',     
    ],
    views: [
        'msignature.Panel',
        'msignature.Grid',
        'msignature.FormSearch',
        'msignature.FormData',
    ],
    stores: [
        'Signature',
        'Mddir',
    ],
    models: [
        'Signature',
    ],
    refs: [
        {ref: 'grid', selector: 'msignaturegrid'},
        {ref: 'formsearch', selector: 'msignatureformsearch'},
        {ref: 'formdata', selector: 'msignatureformdata'},
    ],
    controllerName: 'msignature',
    fieldName: 'signature_name',
    bindPrefixName: 'MSignature',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'msignaturepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'msignaturegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'msignaturegrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    console.log(me.state);
                    this.formDataShow('create');
                }
            },
            'msignaturegrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'update';
                    this.formDataShow('update');
                }
            },
            'msignaturegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'msignaturegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'msignaturegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'msignatureformsearch button[action=search]': {
                click: this.dataSearch
            },
            'msignatureformsearch button[action=reset]': {
                click: this.dataReset
            },
            'msignatureformdata': {
                afterrender: this.formDataAfterRender
            },
            'msignatureformdata [name=msignature] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'msignatureformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'msignatureformdata button[action=save]': {
                click: this.dataSave
            },
            'msignatureformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
});