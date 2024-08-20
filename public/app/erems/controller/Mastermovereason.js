Ext.define('Erems.controller.Mastermovereason', {
    extend: 'Erems.library.template.controller.Controller',
    alias: 'controller.Mastermovereason',
    views: ['mastermovereason.Panel', 'mastermovereason.Grid', 'mastermovereason.FormSearch', 'mastermovereason.FormData'],
    stores: ['Mastermovereason'],
    models: ['Mastermovereason'],
    refs: [
        {
            ref: 'grid',
            selector: 'mastermovereasongrid'
        },
        {
            ref: 'formsearch',
            selector: 'mastermovereasonformsearch'
        },
        {
            ref: 'formdata',
            selector: 'mastermovereasonformdata'
        }
    ],
    controllerName: 'mastermovereason',
    fieldName: 'movereason',
    bindPrefixName: 'Mastermovereason',
    init: function(application) {
        var me = this;
        this.control({
            'mastermovereasonpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'mastermovereasongrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'mastermovereasongrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'mastermovereasongrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'mastermovereasongrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'mastermovereasongrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'mastermovereasongrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'mastermovereasonformsearch button[action=search]': {
                click: this.dataSearch
            },
            'mastermovereasonformsearch button[action=reset]': {
                click: this.dataReset
            },
            'mastermovereasonformdata': {
                afterrender: this.formDataAfterRender
            },
            'mastermovereasonformdata button[action=save]': {
                click: this.dataSave
            },
            'mastermovereasonformdata button[action=cancel]': {
                click: this.formDataClose
            }

        });
    }




});