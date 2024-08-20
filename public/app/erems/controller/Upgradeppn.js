Ext.define('Erems.controller.Upgradeppn', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Upgradeppn',
	views: ['upgradeppn.Panel', 'upgradeppn.Grid', 'upgradeppn.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
	stores: ['', 'Upgradeppn', 'Mastercluster', 'Masterblock'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'upgradeppngrid'
		},
		{
			ref: 'formsearch',
			selector: 'upgradeppnformsearch'
		},
		{
			ref: 'formdata',
			selector: 'upgradeppnformdata'
		}
	],
	controllerName: 'upgradeppn',
	fieldName: '',
	bindPrefixName: 'Upgradeppn',
	init: function (application) {
		var me = this;
		this.control({
			'upgradeppnpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'upgradeppngrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'upgradeppnformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'upgradeppngrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'upgradeppngrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'upgradeppngrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'upgradeppngrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'upgradeppnformsearch button[action=search]': {
				click: this.dataSearch
			},
			'upgradeppnformsearch button[action=reset]': {
				click: this.dataReset
			},
			'upgradeppnformdata': {
				afterrender: this.formDataAfterRender
			},
			'upgradeppnformdata button[action=save]': {
				click: this.dataSave
			},
			'upgradeppnformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'upgradeppngrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'upgradeppn', me.getFormsearch().getValues());
				}
			}
		});
	}
});