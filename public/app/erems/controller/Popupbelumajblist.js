Ext.define('Erems.controller.Popupbelumajblist', {
    extend: 'Erems.library.template.controller.Controllerpopup',
    alias: 'controller.Popupbelumajblist',
    views: ['popupbelumajblist.Panel', 'popupbelumajblist.Grid', 'popupbelumajblist.FormSearch'/*, 'popupbelumajblist.FormData'*/],
    stores: ['Popupbelumajblist'],
    models: ['Popupmaster'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupbelumajblistgrid'
        },
        {
            ref: 'formsearch',
            selector: 'popupbelumajblistformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popupbelumajblistformdata'
        }
    ],
    controllerName: 'popupbelumajblist',
    fieldName: '',
    bindPrefixName: 'Popupbelumajblist',
    init: function(application) {
        var me = this;
        this.control({
            'popupbelumajblistpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popupbelumajblistgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupbelumajblistgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'popupbelumajblistgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'popupbelumajblistgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupbelumajblistgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popupbelumajblistgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupbelumajblistformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupbelumajblistformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupbelumajblistformdata': {
                afterrender: this.formDataAfterRender
            },
            'popupbelumajblistformdata button[action=save]': {
                click: this.dataSave
            },
            'popupbelumajblistformdata button[action=cancel]': {
                click: this.formDataClose
            },
			'popupbelumajblistgrid toolbar button[action=export_excel]': {
                click: function(el) {
					this.dataExport(el, 'belumajb');
                }
            }

        });
    }

});
