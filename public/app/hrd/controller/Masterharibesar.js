Ext.define('Hrd.controller.Masterharibesar', {
    extend: 'Hrd.library.template.controller.Controller',
    alias: 'controller.Masterharibesar',
    requires: [
        'Hrd.library.box.tools.EventSelector1b',
        'Hrd.library.box.tools.Tools',
        'Hrd.library.template.combobox.Departmentcombobox',
    ],
    views: [
        'masterharibesar.Panel',
        'masterharibesar.FormData',
        'masterharibesar.FormSearch',
        'masterharibesar.Grid',
    ],
    stores: [
        'Masterharibesar',
        'Holidayname'
    ],
    models: [
        'Masterharibesar',
        'Holidayname'
    ],
    refs: [
        {ref: 'panel', selector: 'masterharibesarpanel'},
        {ref: 'grid', selector: 'masterharibesargrid'},
        {ref: 'formsearch', selector: 'masterharibesarformsearch'},
        {ref: 'formdata', selector: 'masterharibesarformdata'},
    ],
    controllerName: 'masterharibesar',
    fieldName: 'holiday_name',
    bindPrefixName: 'Masterharibesar',
    rowproject: null, storept: null, state: null,
    typedata: 0,
    formWidth: 400,
    urlrequest: null, senddata: null, info: null,
    rowdata: null,
    init: function (application) {
        var me = this;

        this.control({
            'masterharibesarpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'masterharibesargrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterharibesargrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterharibesarformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterharibesarformdata': {
                afterrender: this.formDataAfterRender,
            },
            'masterharibesarformdata button[action=save]': {
                click: this.dataSave

            },
            'masterharibesarformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'masterharibesarformsearch': {
                afterrender: this.formSearchAfterRender,

            },
            'masterharibesarformsearch button[action=search]': {
                click: function () {
                    this.dataSearch();
                }
            },

        });
    },

});