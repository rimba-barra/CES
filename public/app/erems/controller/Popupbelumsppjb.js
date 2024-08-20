Ext.define('Erems.controller.Popupbelumsppjb', {
    extend: 'Erems.library.template.controller.Controllerpopup',
    alias: 'controller.Popupbelumsppjb',
    views: ['popupbelumsppjb.Panel', 'popupbelumsppjb.Grid', 'popupbelumsppjb.FormSearch'/*, 'popupbelumsppjb.FormData'*/],
    stores: ['Popupbelumsppjb'],
    models: ['Popupmaster'],
    requires: [
        'Erems.library.template.component.Pricetypecombobox'
    ],
    refs: [
        {
            ref: 'grid',
            selector: 'popupbelumsppjbgrid'
        },
        {
            ref: 'formsearch',
            selector: 'popupbelumsppjbformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popupbelumsppjbformdata'
        }
    ],
    controllerName: 'popupbelumsppjb',
    fieldName: '',
    bindPrefixName: 'Popupbelumsppjb',
    init: function(application) {
        var me = this;
        this.control({
            'popupbelumsppjbpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popupbelumsppjbgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupbelumsppjbgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'popupbelumsppjbgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'popupbelumsppjbgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupbelumsppjbgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popupbelumsppjbgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupbelumsppjbformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupbelumsppjbformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupbelumsppjbformdata': {
                afterrender: this.formDataAfterRender
            },
            'popupbelumsppjbformdata button[action=save]': {
                click: this.dataSave
            },
            'popupbelumsppjbformdata button[action=cancel]': {
                click: this.formDataClose
            },
			'popupbelumsppjbgrid toolbar button[action=export_excel]': {
                click: function(el) {
					this.dataExport(el, 'belumsppjb');
                }
            }

        });
    }

});
