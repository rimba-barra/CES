Ext.define('Erems.controller.Popuppembatalan', {
    extend: 'Erems.library.template.controller.Controllerpopup',
    alias: 'controller.Popuppembatalan',
    views: ['popuppembatalan.Panel', 'popuppembatalan.Grid', 'popuppembatalan.FormSearch'/*, 'popuppembatalan.FormData'*/],
    stores: ['Popuppembatalan'],
    models: ['Popupmaster'],
    refs: [
        {
            ref: 'grid',
            selector: 'popuppembatalangrid'
        },
        {
            ref: 'formsearch',
            selector: 'popuppembatalanformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popuppembatalanformdata'
        }
    ],
    controllerName: 'popuppembatalan',
    fieldName: '',
    bindPrefixName: 'Popuppembatalan',
    init: function(application) {
        var me = this;
        this.control({
            'popuppembatalanpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popuppembatalangrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popuppembatalangrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'popuppembatalangrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'popuppembatalangrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popuppembatalangrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popuppembatalangrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popuppembatalanformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popuppembatalanformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popuppembatalanformdata': {
                afterrender: this.formDataAfterRender
            },
            'popuppembatalanformdata button[action=save]': {
                click: this.dataSave
            },
            'popuppembatalanformdata button[action=cancel]': {
                click: this.formDataClose
            },
			'popuppembatalangrid toolbar button[action=export_excel]': {
                click: function(el) {
					this.dataExport(el, 'pembatalan');
                }
            }

        });
    }

});
