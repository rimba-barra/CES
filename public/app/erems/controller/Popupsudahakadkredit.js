Ext.define('Erems.controller.Popupsudahakadkredit', {
    extend: 'Erems.library.template.controller.Controllerpopup',
    alias: 'controller.Popupsudahakadkredit',
    views: ['popupsudahakadkredit.Panel', 'popupsudahakadkredit.Grid', 'popupsudahakadkredit.FormSearch'/*, 'popupsudahakadkredit.FormData'*/],
    stores: ['Popupsudahakadkredit'],
    models: ['Popupmaster'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupsudahakadkreditgrid'
        },
        {
            ref: 'formsearch',
            selector: 'popupsudahakadkreditformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popupsudahakadkreditformdata'
        }
    ],
    controllerName: 'popupsudahakadkredit',
    fieldName: '',
    bindPrefixName: 'Popupsudahakadkredit',
    init: function(application) {
        var me = this;
        this.control({
            'popupsudahakadkreditpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popupsudahakadkreditgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupsudahakadkreditgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'popupsudahakadkreditgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'popupsudahakadkreditgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupsudahakadkreditgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popupsudahakadkreditgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupsudahakadkreditformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupsudahakadkreditformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupsudahakadkreditformdata': {
                afterrender: this.formDataAfterRender
            },
            'popupsudahakadkreditformdata button[action=save]': {
                click: this.dataSave
            },
            'popupsudahakadkreditformdata button[action=cancel]': {
                click: this.formDataClose
            },
			'popupsudahakadkreditgrid toolbar button[action=export_excel]': {
                click: function(el) {
					this.dataExport(el, 'sudahakadkredit');
                }
            }

        });
    }

});
