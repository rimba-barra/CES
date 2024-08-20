Ext.define('Cashier.controller.Mtest', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Mtest',
    requires: [       
    ],
    views: [
        'mtest.Panel',
        'mtest.Grid',
        'mtest.FormSearch',
        'mtest.FormData',
    ],
    stores: [
        'Mtest',
       
    ],
    models: [
        'Mtest',
    ],
    refs: [
        {ref: 'grid', selector: 'mtestgrid'},
        {ref: 'formsearch', selector: 'mtestformsearch'},
        {ref: 'formdata', selector: 'mtestformdata'},
    ],
    controllerName: 'mtest',
    fieldName: 'mtest',
    bindPrefixName: 'Mtest',
    rowproject: null, storept: null, state: null,
    init: function (application) {
        var me = this;
        this.control({
            'mtestpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'mtestgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'mtestgrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');                   
                }
            },
            'mtestgrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'update';
                    this.formDataShow('update');
                  
                }
            },
            'mtestgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'mtestgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'mtestgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'mtestformsearch button[action=search]': {
                click: this.dataSearch
            },
            'mtestformsearch button[action=reset]': {
                click: this.dataReset
            },
            'mtestformdata': {
                afterrender: this.formDataAfterRender
            },
            'mtestformdata [name=mtest] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'mtestformdata [name=objectname] ': {
                'keyup': function () {
                    var me, value;
                    me = this;
                },
            },
            'mtestformdata button[action=save]': {
                click: this.dataSave
            },
            'mtestformdata button[action=cancel]': {
                click: this.formDataClose
            },
        });
    },
});