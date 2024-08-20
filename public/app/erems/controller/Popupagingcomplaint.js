Ext.define('Erems.controller.Popupagingcomplaint', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popupagingcomplaint',
	views: ['popupagingcomplaint.Panel', 'popupagingcomplaint.Grid', 'popupagingcomplaint.FormSearch'/*, 'popupagingcomplaint.FormData'*/],
	stores: ['Popupagingcomplaint'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popupagingcomplaintgrid'
		},
		{
			ref: 'formsearch',
			selector: 'popupagingcomplaintformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popupagingcomplaintformdata'
		}
	],
	controllerName: 'popupagingcomplaint',
	fieldName: '',
	bindPrefixName: 'Popupagingcomplaint',
	init: function (application) {
		var me = this;
		this.control({
			'popupagingcomplaintpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popupagingcomplaintgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popupagingcomplaintgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popupagingcomplaintgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popupagingcomplaintgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popupagingcomplaintgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'popupagingcomplaintgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popupagingcomplaintformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popupagingcomplaintformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popupagingcomplaintformdata': {
				afterrender: this.formDataAfterRender
			},
			'popupagingcomplaintformdata button[action=save]': {
				click: this.dataSave
			},
			'popupagingcomplaintformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popupagingcomplaintgrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'agingcomplaint');
				}
			}

		});
	}

});
