Ext.define('Erems.controller.Popupbelumakadkredit', {
    extend: 'Erems.library.template.controller.Controllerpopup',
    alias: 'controller.Popupbelumakadkredit',
    views: ['popupbelumakadkredit.Panel', 'popupbelumakadkredit.Grid', 'popupbelumakadkredit.FormSearch', 'popupbelumakadkredit.FormData'],
    stores: ['Popupbelumakadkredit'],
    models: ['Popupmaster'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupbelumakadkreditgrid'
        },
        {
            ref: 'formsearch',
            selector: 'popupbelumakadkreditformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popupbelumakadkreditformdata'
        }
    ],
    controllerName: 'popupbelumakadkredit',
    fieldName: '',
    bindPrefixName: 'Popupbelumakadkredit',
    init: function(application) {
        var me = this;
        this.control({
            'popupbelumakadkreditpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popupbelumakadkreditgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupbelumakadkreditgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'popupbelumakadkreditgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'popupbelumakadkreditgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupbelumakadkreditgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popupbelumakadkreditgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupbelumakadkreditformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupbelumakadkreditformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupbelumakadkreditformdata': {
                afterrender: this.formDataAfterRender
            },
            'popupbelumakadkreditformdata button[action=save]': {
                click: this.dataSave
            },
            'popupbelumakadkreditformdata button[action=cancel]': {
                click: this.formDataClose
            },
			'popupbelumakadkreditgrid toolbar button[action=export_excel]': {
                click: function(el) {
					this.dataExport(el, 'belumakadkredit');
                }
            }

        });
    }

});
