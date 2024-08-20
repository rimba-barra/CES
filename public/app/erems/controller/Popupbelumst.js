Ext.define('Erems.controller.Popupbelumst', {
    extend: 'Erems.library.template.controller.Controllerpopup',
    alias: 'controller.Popupbelumst',
    views: ['popupbelumst.Panel', 'popupbelumst.Grid', 'popupbelumst.FormSearch'/*, 'popupbelumst.FormData'*/],
    stores: ['Popupbelumst'],
    models: ['Popupmaster'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupbelumstgrid'
        },
        {
            ref: 'formsearch',
            selector: 'popupbelumstformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popupbelumstformdata'
        }
    ],
    controllerName: 'popupbelumst',
    fieldName: '',
    bindPrefixName: 'Popupbelumst',
    init: function(application) {
        var me = this;
        this.control({
            'popupbelumstpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popupbelumstgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupbelumstgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'popupbelumstgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'popupbelumstgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupbelumstgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popupbelumstgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupbelumstformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupbelumstformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupbelumstformdata': {
                afterrender: this.formDataAfterRender
            },
            'popupbelumstformdata button[action=save]': {
                click: this.dataSave
            },
            'popupbelumstformdata button[action=cancel]': {
                click: this.formDataClose
            },
			'popupbelumstgrid toolbar button[action=export_excel]': {
                click: function(el) {
					this.dataExport(el, 'belumst');
                }
            }

        });
    }

});
