Ext.define('Erems.controller.Popupchangecancelrev', {
    extend: 'Erems.library.template.controller.Controllerpopup',
    alias: 'controller.Popupchangecancelrev',
    views: ['popupchangecancelrev.Panel', 'popupchangecancelrev.Grid', 'popupchangecancelrev.FormSearch', 'popupchangecancelrev.FormData'],
    stores: ['Popupchangecancelrev'],
    models: ['Popupmaster'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupchangecancelrevgrid'
        },
        {
            ref: 'formsearch',
            selector: 'popupchangecancelrevformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popupchangecancelrevformdata'
        }
    ],
    controllerName: 'popupchangecancelrev',
    fieldName: '',
    bindPrefixName: 'Popupchangecancelrev',
    init: function(application) {
        var me = this;
        this.control({
            'popupchangecancelrevpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popupchangecancelrevgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupchangecancelrevgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'popupchangecancelrevgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'popupchangecancelrevgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupchangecancelrevgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popupchangecancelrevgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupchangecancelrevformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupchangecancelrevformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupchangecancelrevformdata': {
                afterrender: this.formDataAfterRender
            },
            'popupchangecancelrevformdata button[action=save]': {
                click: this.dataSave
            },
            'popupchangecancelrevformdata button[action=cancel]': {
                click: this.formDataClose
            },
			'popupchangecancelrevgrid toolbar button[action=export_excel]': {
                click: function(el) {
					this.dataExport(el, 'popupchangecancelrev');
                }
            }

        });
    }

});
