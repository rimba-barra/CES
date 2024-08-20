Ext.define('Erems.controller.Popuppurchaseletterreward', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popuppurchaseletterreward',
	views: ['popuppurchaseletterreward.Panel', 'popuppurchaseletterreward.Grid', 'popuppurchaseletterreward.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
	stores: ['', 'Popuppurchaseletterreward', 'Mastercluster', 'Masterblock'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popuppurchaseletterrewardgrid'
		},
		{
			ref: 'formsearch',
			selector: 'popuppurchaseletterrewardformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popuppurchaseletterrewardformdata'
		}
	],
	controllerName: 'popuppurchaseletterreward',
	fieldName: '',
	bindPrefixName: 'Popuppurchaseletterreward',
	init: function (application) {
		var me = this;
		this.control({
			'popuppurchaseletterrewardpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popuppurchaseletterrewardgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popuppurchaseletterrewardformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popuppurchaseletterrewardgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popuppurchaseletterrewardgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popuppurchaseletterrewardgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popuppurchaseletterrewardgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popuppurchaseletterrewardformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popuppurchaseletterrewardformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popuppurchaseletterrewardformdata': {
				afterrender: this.formDataAfterRender
			},
			'popuppurchaseletterrewardformdata button[action=save]': {
				click: this.dataSave
			},
			'popuppurchaseletterrewardformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popuppurchaseletterrewardgrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'popuppurchaseletterreward', me.getFormsearch().getValues());
				}
			}
		});
	}
});