Ext.define('Erems.controller.Popupfakturtagihan', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popupfakturtagihan',
	views: ['popupfakturtagihan.Panel', 'popupfakturtagihan.Grid', 'popupfakturtagihan.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
	stores: ['', 'Popupfakturtagihan', 'Mastercluster', 'Masterblock'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popupfakturtagihangrid'
		},
		{
			ref: 'formsearch',
			selector: 'popupfakturtagihanformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popupfakturtagihanformdata'
		}
	],
	controllerName: 'popupfakturtagihan',
	fieldName: '',
	bindPrefixName: 'Popupfakturtagihan',
	init: function (application) {
		var me = this;
		this.control({
			'popupfakturtagihanpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popupfakturtagihangrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popupfakturtagihanformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popupfakturtagihangrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popupfakturtagihangrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popupfakturtagihangrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popupfakturtagihangrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popupfakturtagihanformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popupfakturtagihanformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popupfakturtagihanformdata': {
				afterrender: this.formDataAfterRender
			},
			'popupfakturtagihanformdata button[action=save]': {
				click: this.dataSave
			},
			'popupfakturtagihanformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popupfakturtagihangrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'popupfakturtagihan', me.getFormsearch().getValues());
				}
			}
		});
	}
});