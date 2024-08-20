Ext.define('Erems.controller.Popupbelumimb', {
    extend: 'Erems.library.template.controller.Controllerpopup',
    alias: 'controller.Popupbelumimb',
    views: ['popupbelumimb.Panel', 'popupbelumimb.Grid', 'popupbelumimb.FormSearch'/*, 'popupbelumimb.FormData'*/],
    stores: ['Popupbelumimb'],
    models: ['Popupmaster'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupbelumimbgrid'
        },
        {
            ref: 'formsearch',
            selector: 'popupbelumimbformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popupbelumimbformdata'
        }
    ],
    controllerName: 'popupbelumimb',
    fieldName: '',
    bindPrefixName: 'Popupbelumimb',
    init: function(application) {
        var me = this;
        this.control({
            'popupbelumimbpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popupbelumimbgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupbelumimbgrid toolbar button[action=create]': {
                click: function() {
                    this.formDataShow('create');
                }
            },
            'popupbelumimbgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'popupbelumimbgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupbelumimbgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'popupbelumimbgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupbelumimbformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupbelumimbformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupbelumimbformdata': {
                afterrender: this.formDataAfterRender
            },
            'popupbelumimbformdata button[action=save]': {
                click: this.dataSave
            },
            'popupbelumimbformdata button[action=cancel]': {
                click: this.formDataClose
            },
			'popupbelumimbgrid toolbar button[action=export_excel]': {
                click: function(el) {
					this.dataExport(el, 'belumimb');
                }
            }

        });
    }

});
