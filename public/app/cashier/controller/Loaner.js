Ext.define('Cashier.controller.Loaner', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Departmentcombobox',
    ],
    alias: 'controller.Loaner',
    views: [
        'loaner.Panel',
        'loaner.Grid',
        'loaner.FormSearch',
        'loaner.FormData',
    ],
    stores: [
        'Loaner',
        'Department',
    ],
    models: [
        'Loaner',
    ],
    refs: [
        {ref: 'grid', selector: 'loanergrid'},
        {ref: 'formsearch', selector: 'loanerformsearch'},
        {ref: 'formdata', selector: 'loanerformdata'},
    ],
    controllerName: 'loaner',
    fieldName: 'code',
    bindPrefixName: 'Loaner',
    formWidth: 700,
    rowproject: null, rowpt: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'loanerpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'loanergrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'loanergrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'loanergrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'loanergrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'loanergrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'loanergrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'loanerformsearch': {
                boxready: this.formSearchReady
            },
            'loanerformsearch button[action=search]': {
                click: this.dataSearch
            },
            'loanerformsearch button[action=reset]': {
                click: this.dataReset
            },
            'loanerformdata': {
                afterrender: this.formDataAfterRender
            },
            'loanerformdata button[action=save]': {
                click: this.dataSave
            },
            'loanerformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
});