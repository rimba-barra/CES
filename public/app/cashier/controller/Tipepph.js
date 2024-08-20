Ext.define('Cashier.controller.Tipepph', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Tipepph',
    views: [
        'tipepph.Panel',
        'tipepph.Grid',
        'tipepph.FormSearch',
        'tipepph.FormData',
    ],
    stores: [
        'Tipepph',
        'Tipepphcombo'
    ],
    models: [
        'Tipepph'
    ],
    requires: [
        //'Cashier.library.template.combobox.Tipepphcombobox'
    ],
    refs: [
        {ref: 'grid', selector: 'tipepphgrid'},
        {ref: 'formsearch', selector: 'tipepphformsearch'},
        {ref: 'formdata', selector: 'tipepphformdata'},
    ],
    controllerName: 'tipepph',
    fieldName: 'tipepph',
    bindPrefixName: 'Tipepph',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'tipepphpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'tipepphgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'tipepphgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'tipepphgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'tipepphgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'tipepphgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'tipepphgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'tipepphformsearch button[action=search]': {
                click: this.dataSearch
            },
            'tipepphformsearch button[action=reset]': {
                click: this.dataReset
            },
            'tipepphformdata': {
                afterrender: this.formDataAfterRender
            },
            'tipepphformdata [name=tipepph] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'tipepphformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'tipepphformdata button[action=save]': {
                click: this.dataSave
            },
            'tipepphformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
});