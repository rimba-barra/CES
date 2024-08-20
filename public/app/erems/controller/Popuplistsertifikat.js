Ext.define('Erems.controller.Popuplistsertifikat', {
    extend: 'Erems.library.template.controller.Controllerpopup',
    alias: 'controller.Popuplistsertifikat',
    views: ['popuplistsertifikat.Panel', 'popuplistsertifikat.Grid', 'popuplistsertifikat.FormSearch'/*, 'popuplistsertifikat.FormData'*/],
    stores: ['Popuplistsertifikat'],
    models: ['Popupmaster'],
    refs: [
        {
            ref: 'grid',
            selector: 'popuplistsertifikatgrid'
        },
        {
            ref: 'formsearch',
            selector: 'popuplistsertifikatformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popuplistsertifikatformdata'
        }
    ],
    controllerName: 'popuplistsertifikat',
    fieldName: '',
    bindPrefixName: 'Popuplistsertifikat',
    init: function(application) {
        var me = this;
        this.control({
            'popuplistsertifikatpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popuplistsertifikatgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popuplistsertifikatgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'popuplistsertifikatgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'popuplistsertifikatgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popuplistsertifikatgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popuplistsertifikatgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popuplistsertifikatformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popuplistsertifikatformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popuplistsertifikatformdata': {
                afterrender: this.formDataAfterRender
            },
            'popuplistsertifikatformdata button[action=save]': {
                click: this.dataSave
            },
            'popuplistsertifikatformdata button[action=cancel]': {
                click: this.formDataClose
            },
			'popuplistsertifikatgrid toolbar button[action=export_excel]': {
                click: function(el) {
					this.dataExport(el, 'listsertifikat');
                }
            }

        });
    }

});
