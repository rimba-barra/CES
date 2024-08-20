Ext.define('Cashier.controller.Mastergrouptype', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Mastergrouptype',
    views: [
        'mastergrouptype.Panel',
        'mastergrouptype.Grid',
        'mastergrouptype.FormSearch',
        'mastergrouptype.FormData',
    ],
    stores: [
        'Mastergrouptype',
    ],
    models: [
        'Mastergrouptype',
    ],
    refs: [
        {ref: 'grid', selector: 'mastergrouptypegrid'},
        {ref: 'formsearch', selector: 'mastergrouptypeformsearch'},
        {ref: 'formdata', selector: 'mastergrouptypeformdata'},
    ],
    controllerName: 'mastergrouptype',
    fieldName: 'mastergrouptype',
    bindPrefixName: 'Mastergrouptype',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'mastergrouptypepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'mastergrouptypegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'mastergrouptypegrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'mastergrouptypegrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'mastergrouptypegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'mastergrouptypegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'mastergrouptypegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'mastergrouptypeformsearch button[action=search]': {
                click: this.dataSearch
            },
            'mastergrouptypeformsearch button[action=reset]': {
                click: this.dataReset
            },
            'mastergrouptypeformdata': {
                afterrender: this.formDataAfterRender
            },
            'mastergrouptypeformdata [name=mastergrouptype] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'mastergrouptypeformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'mastergrouptypeformdata button[action=save]': {
                click: this.dataSave
            },
            'mastergrouptypeformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
});