Ext.define('Hrd.controller.MSection', {
    extend: 'Hrd.library.template.controller.Controllermanual',
    alias: 'controller.MSection',
    requires: [
        'Hrd.library.box.tools.EventSelector1b',
        'Hrd.library.box.tools.Tools',
        'Hrd.library.template.combobox.Departmentcombobox',
    ],
    views: [
        'msection.Panel',
        'msection.FormData',
        'msection.FormSearch',
        'msection.Grid',
    ],
    stores: [
        'Department',
        'Sectiondepartment',
    ],
    models: [
        'Department',
        'Sectiondepartment',
    ],
    refs: [
        {ref: 'panel', selector: 'msectionpanel'},
        {ref: 'grid', selector: 'msectiongrid'},
        {ref: 'formsearch', selector: 'msectionformsearch'},
        {ref: 'formdata', selector: 'msectionformdata'},
    ],
    controllerName: 'msection',
    fieldName: 'section',
    bindPrefixName: 'MSection',
    rowproject: null, storept: null, state: null,
    typedata: 0,
    formWidth: 400,
    urlrequest: null, senddata: null, info: null,
    rowdata: null,
    init: function (application) {
        var me = this;

        this.control({
            'msectionpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'msectiongrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'msectiongrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'msectionformsearch button[action=reset]': {
                click: this.dataReset
            },
            'msectionformdata': {
                afterrender: this.formDataAfterRender,
                boxready: function () {
                    var me, form, state;
                    me = this;
                    form = me.getFormdata();
                    state = form.up('window').state.toLowerCase();
                    if (state == 'update') {
                        //me.setReadonly(form, 'department_id', true);
                    }
                }
            },
            'msectionformdata button[action=save]': {
                click: this.dataSave

            },
            'msectionformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'msectionformsearch': {
                afterrender: this.formSearchAfterRender,

            },
            'msectionformsearch button[action=search]': {
                click: function () {
                    var me;
                    me = this;
                    me.dataSearch();
                }
            },

        });
    },


});