Ext.define('Erems.controller.Popupbelumhgbpt', {
    extend: 'Erems.library.template.controller.Controllerpopup',
    alias: 'controller.Popupbelumhgbpt',
    views: ['popupbelumhgbpt.Panel', 'popupbelumhgbpt.Grid', 'popupbelumhgbpt.FormSearch'/*, 'popupbelumhgbpt.FormData'*/],
    stores: ['Popupbelumhgbpt'],
    models: ['Popupmaster'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupbelumhgbptgrid'
        },
        {
            ref: 'formsearch',
            selector: 'popupbelumhgbptformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popupbelumhgbptformdata'
        }
    ],
    controllerName: 'popupbelumhgbpt',
    fieldName: '',
    bindPrefixName: 'Popupbelumhgbpt',
    init: function(application) {
        var me = this;
        this.control({
            'popupbelumhgbptpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popupbelumhgbptgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupbelumhgbptgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'popupbelumhgbptgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'popupbelumhgbptgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupbelumhgbptgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popupbelumhgbptgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupbelumhgbptformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupbelumhgbptformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupbelumhgbptformdata': {
                afterrender: this.formDataAfterRender
            },
            'popupbelumhgbptformdata button[action=save]': {
                click: this.dataSave
            },
            'popupbelumhgbptformdata button[action=cancel]': {
                click: this.formDataClose
            },
			'popupbelumhgbptgrid toolbar button[action=export_excel]': {
                click: function(el) {
					this.dataExport(el, 'belumhgbpt');
                }
            }
        });
    }

});
