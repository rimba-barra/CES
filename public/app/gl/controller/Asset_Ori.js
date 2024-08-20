Ext.define('Gl.controller.Asset', {
    extend: 'Gl.library.template.controller.Controller',
    alias: 'controller.Asset',
    views: ['asset.Panel', 'asset.Grid', 'asset.FormSearch', 'asset.FormData'],
    stores: ['Asset'],
    models: ['Asset'],
    refs: [
        {
            ref: 'grid',
            selector: 'assetgrid'
        },
        {
            ref: 'formsearch',
            selector: 'assetformsearch'
        },
        {
            ref: 'formdata',
            selector: 'assetformdata'
        }
    ],
    controllerName: 'asset',
    fieldName: 'code',
    bindPrefixName:'Asset',
    init: function(application) {
        var me = this;
        this.control({
            'assetpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
             
            },
            'assetgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'assetgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'assetgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'assetgrid toolbar button[action=destroy]': {                
                click: this.dataDestroy
            },
            'assetgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'assetgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'assetformsearch button[action=search]': {
                click: this.dataSearch
            },
            'assetformsearch button[action=reset]': {
                click: this.dataReset
            },
            'assetformdata': {
                afterrender: this.formDataAfterRender
            },
            'assetformdata button[action=save]': {
                click: this.dataSave
            },
            'assetformdata button[action=cancel]': {
                click: this.formDataClose
            }

        });
    }
});