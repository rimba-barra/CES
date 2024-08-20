Ext.define('Cashier.controller.Grouptype', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Grouptype',
    views: [
        'grouptype.Panel',
        'grouptype.Grid',
        'grouptype.FormSearch',
        'grouptype.FormData',
    ],
    stores: [
        'Grouptype',
        'Grouptypecombo'
    ],
    models: [
        'Grouptype'
    ],
    requires: [
        'Cashier.library.template.combobox.Grouptypecombobox'
    ],
    refs: [
        {ref: 'grid', selector: 'grouptypegrid'},
        {ref: 'formsearch', selector: 'grouptypeformsearch'},
        {ref: 'formdata', selector: 'grouptypeformdata'},
    ],
    controllerName: 'grouptype',
    fieldName: 'grouptype',
    bindPrefixName: 'Grouptype',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'grouptypepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'grouptypegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'grouptypegrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'grouptypegrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'grouptypegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'grouptypegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'grouptypegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'grouptypeformsearch button[action=search]': {
                click: this.dataSearch
            },
            'grouptypeformsearch button[action=reset]': {
                click: this.dataReset
            },
            'grouptypeformdata': {
                afterrender: this.formDataAfterRender
            },
            'grouptypeformdata [name=grouptype] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'grouptypeformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'grouptypeformdata button[action=save]': {
                click: this.dataSave
            },
            'grouptypeformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
});