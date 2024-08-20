Ext.define('Erems.controller.Adminfeekpr', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Adminfeekpr',
	views: ['adminfeekpr.Panel', 'adminfeekpr.Grid', 'adminfeekpr.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
	stores: ['', 'Adminfeekpr', 'Mastercluster', 'Masterblock'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'adminfeekprgrid'
		},
		{
			ref: 'formsearch',
			selector: 'adminfeekprformsearch'
		},
		{
			ref: 'formdata',
			selector: 'adminfeekprformdata'
		}
	],
	controllerName: 'adminfeekpr',
	fieldName: '',
	bindPrefixName: 'Adminfeekpr',
	init: function (application) {
		var me = this;
		this.control({
			'adminfeekprpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'adminfeekprgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'adminfeekprformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'adminfeekprgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'adminfeekprgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'adminfeekprgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'adminfeekprgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'adminfeekprformsearch button[action=search]': {
				click: this.dataSearch
			},
			'adminfeekprformsearch button[action=reset]': {
				click: this.dataReset
			},
			'adminfeekprformdata': {
				afterrender: this.formDataAfterRender
			},
			'adminfeekprformdata button[action=save]': {
				click: this.dataSave
			},
			'adminfeekprformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'adminfeekprgrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'adminfeekpr', me.getFormsearch().getValues());
				}
			}
		});
	}
});