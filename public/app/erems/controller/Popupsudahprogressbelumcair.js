Ext.define('Erems.controller.Popupsudahprogressbelumcair', {
    extend: 'Erems.library.template.controller.Controllerpopup',
    alias: 'controller.Popupsudahprogressbelumcair',
    views: ['popupsudahprogressbelumcair.Panel', 'popupsudahprogressbelumcair.Grid', 'popupsudahprogressbelumcair.FormSearch'/*, 'popupsudahprogressbelumcair.FormData'*/],
    stores: ['Popupsudahprogressbelumcair'],
    models: ['Popupmaster'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupsudahprogressbelumcairgrid'
        },
        {
            ref: 'formsearch',
            selector: 'popupsudahprogressbelumcairformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popupsudahprogressbelumcairformdata'
        }
    ],
    controllerName: 'popupsudahprogressbelumcair',
    fieldName: '',
    bindPrefixName: 'Popupsudahprogressbelumcair',
    init: function(application) {
        var me = this;
        this.control({
            'popupsudahprogressbelumcairpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popupsudahprogressbelumcairgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupsudahprogressbelumcairgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'popupsudahprogressbelumcairgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'popupsudahprogressbelumcairgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupsudahprogressbelumcairgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popupsudahprogressbelumcairgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupsudahprogressbelumcairformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupsudahprogressbelumcairformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupsudahprogressbelumcairformdata': {
                afterrender: this.formDataAfterRender
            },
            'popupsudahprogressbelumcairformdata button[action=save]': {
                click: this.dataSave
            },
            'popupsudahprogressbelumcairformdata button[action=cancel]': {
                click: this.formDataClose
            },
			'popupsudahprogressbelumcairgrid toolbar button[action=export_excel]': {
                click: function(el) {
					this.dataExport(el, 'sudahprogressbelumcair');
                }
            }

        });
    }

});
