Ext.define('Erems.controller.Masterlokasipenjualan', {
    extend: 'Erems.library.template.controller.Controller',
    alias: 'controller.Masterlokasipenjualan',
    views: ['masterlokasipenjualan.Panel', 'masterlokasipenjualan.Grid', 'masterlokasipenjualan.FormSearch', 'masterlokasipenjualan.FormData'],
    stores: ['Masterlokasipenjualan'],
    models: ['Masterlokasipenjualan'],
    refs: [
        {
            ref: 'grid',
            selector: 'masterlokasipenjualangrid'
        },
        {
            ref: 'formsearch',
            selector: 'masterlokasipenjualanformsearch'
        },
        {
            ref: 'formdata',
            selector: 'masterlokasipenjualanformdata'
        }
    ],
    controllerName: 'masterlokasipenjualan',
    fieldName: 'saleslocation',
    bindPrefixName: 'Masterlokasipenjualan',
    init: function(application) {
        var me = this;
        this.control({
            'masterlokasipenjualanpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'masterlokasipenjualangrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'masterlokasipenjualangrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'masterlokasipenjualangrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'masterlokasipenjualangrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'masterlokasipenjualangrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'masterlokasipenjualangrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'masterlokasipenjualanformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterlokasipenjualanformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterlokasipenjualanformdata': {
                afterrender: this.formDataAfterRender
            },
            'masterlokasipenjualanformdata button[action=save]': {
                click: this.dataSave
            },
            'masterlokasipenjualanformdata button[action=cancel]': {
                click: this.formDataClose
            }

        });
    }




});