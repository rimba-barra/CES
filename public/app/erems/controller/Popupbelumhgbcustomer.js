Ext.define('Erems.controller.Popupbelumhgbcustomer', {
    extend: 'Erems.library.template.controller.Controllerpopup',
    alias: 'controller.Popupbelumhgbcustomer',
    views: ['popupbelumhgbcustomer.Panel', 'popupbelumhgbcustomer.Grid', 'popupbelumhgbcustomer.FormSearch'/*, 'popupbelumhgbcustomer.FormData'*/],
    stores: ['Popupbelumhgbcustomer'],
    models: ['Popupmaster'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupbelumhgbcustomergrid'
        },
        {
            ref: 'formsearch',
            selector: 'popupbelumhgbcustomerformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popupbelumhgbcustomerformdata'
        }
    ],
    controllerName: 'popupbelumhgbcustomer',
    fieldName: '',
    bindPrefixName: 'Popupbelumhgbcustomer',
    init: function(application) {
        var me = this;
        this.control({
            'popupbelumhgbcustomerpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popupbelumhgbcustomergrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupbelumhgbcustomergrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'popupbelumhgbcustomergrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'popupbelumhgbcustomergrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupbelumhgbcustomergrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popupbelumhgbcustomergrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupbelumhgbcustomerformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupbelumhgbcustomerformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupbelumhgbcustomerformdata': {
                afterrender: this.formDataAfterRender
            },
            'popupbelumhgbcustomerformdata button[action=save]': {
                click: this.dataSave
            },
            'popupbelumhgbcustomerformdata button[action=cancel]': {
                click: this.formDataClose
            },
			'popupbelumhgbcustomergrid toolbar button[action=export_excel]': {
                click: function(el) {
					this.dataExport(el, 'belumhgbcustomer');
                }
            }

        });
    }

});
