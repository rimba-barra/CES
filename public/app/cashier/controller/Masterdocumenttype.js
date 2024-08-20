Ext.define('Cashier.controller.Masterdocumenttype', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Masterdocumenttype',
    views: [
        'masterdocumenttype.Panel',
        'masterdocumenttype.Grid',
        'masterdocumenttype.FormSearch',
        'masterdocumenttype.FormData',
    ],
    stores: [
        'Masterdocumenttype',
        // 'Masterdocumenttypecombo'
    ],
    models: [
        'Masterdocumenttype'
    ],
    requires: [
        // 'Cashier.library.template.combobox.Masterdocumenttypecombobox'
    ],
    refs: [
        {ref: 'grid', selector: 'masterdocumenttypegrid'},
        {ref: 'formsearch', selector: 'masterdocumenttypeformsearch'},
        {ref: 'formdata', selector: 'masterdocumenttypeformdata'},
    ],
    controllerName: 'masterdocumenttype',
    fieldName: 'documenttype',
    bindPrefixName: 'Masterdocumenttype',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'masterdocumenttypepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'masterdocumenttypegrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterdocumenttypegrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'masterdocumenttypegrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'masterdocumenttypegrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masterdocumenttypegrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'masterdocumenttypegrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterdocumenttypeformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterdocumenttypeformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterdocumenttypeformdata': {
                afterrender: this.formDataAfterRender
            },
            'masterdocumenttypeformdata [name=masterdocumenttype] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'masterdocumenttypeformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'masterdocumenttypeformdata button[action=save]': {
                click: this.dataSave
            },
            'masterdocumenttypeformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
});