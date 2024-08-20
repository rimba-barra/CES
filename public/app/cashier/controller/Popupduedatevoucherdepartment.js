Ext.define('Cashier.controller.Popupduedatevoucherdepartment', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Popupduedatevoucherdepartment',
    views: [
        'popupduedatevoucherdepartment.Panel',
        'popupduedatevoucherdepartment.Grid',
        'popupduedatevoucherdepartment.FormSearch',
        'popupduedatevoucherdepartment.FormData',
    ],
    stores: [
        'Popupduedatevoucherdepartment',
    ],
    models: [
        'VDRequest',
    ],
    refs: [
        {ref: 'grid', selector: 'popupduedatevoucherdepartmentgrid'},
        {ref: 'formsearch', selector: 'popupduedatevoucherdepartmentformsearch'},
        {ref: 'formdata', selector: 'popupduedatevoucherdepartmentformdata'},
    ],
    controllerName: 'popupduedatevoucherdepartment',
    fieldName: 'popupduedatevoucherdepartment',
    bindPrefixName: 'Popupduedatevoucherdepartment',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'popupduedatevoucherdepartmentpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popupduedatevoucherdepartmentgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupduedatevoucherdepartmentgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'popupduedatevoucherdepartmentgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'popupduedatevoucherdepartmentgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupduedatevoucherdepartmentgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popupduedatevoucherdepartmentgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupduedatevoucherdepartmentformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupduedatevoucherdepartmentformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupduedatevoucherdepartmentformdata': {
                afterrender: this.formDataAfterRender
            },
            'popupduedatevoucherdepartmentformdata [name=popupduedatevoucherdepartment] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'popupduedatevoucherdepartmentformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'popupduedatevoucherdepartmentformdata button[action=save]': {
                click: this.dataSave
            },
            'popupduedatevoucherdepartmentformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
    gridSelectionChange: function () {
        var me, grid, row;
        me = this;
        grid = me.getGrid();
        row = grid.getSelectionModel().getSelection();
    },
});