Ext.define('Hrd.controller.Popuphcms', {
    extend: 'Hrd.library.template.controller.Controllermanual',
    alias: 'controller.Popuphcms',
    requires: [

    ],
    views: [
        'popuphcms.Panel',
        'popuphcms.FormSearch',
        'popuphcms.Grid',
    ],
    stores: [
        'Popuphcms',
    ],
    models: [
        'Popuphcms',
    ],
    refs: [
        {ref: 'panel', selector: 'popuphcmspanel'},
        {ref: 'grid', selector: 'popuphcmsgrid'},
        {ref: 'formsearch', selector: 'popuphcmsformsearch'},
    ],
    controllerName: 'popuphcms',
    fieldName: 'popuphcms',
    bindPrefixName: 'Popuphcms',
    rowproject: null, storept: null, state: null,
    typedata: 0,
    formWidth: 1000,
    urlrequest: null, senddata: null, info: null,
    rowdata: null,
    init: function (application) {
        var me = this;
        this.control({
            'popuphcmspanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'popuphcmsgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popuphcmsgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popuphcmsformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popuphcmsformdata': {
                afterrender: this.formDataAfterRender
            },
            'popuphcmsformdata button[action=submit]': {
                click: this.DataSave
            },
            'popuphcmsformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'popuphcmsformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'popuphcmsformsearch button[action=search]': {
                click: function () {
                    var me, form, employee_name;
                    me = this;
                    me.dataSearch();
                }
            },

        });
    },
    gridSelectionChange: function () {
        var me = this;
        var grid = me.getGrid();
        var row = grid.getSelectionModel().getSelection();
    },

});