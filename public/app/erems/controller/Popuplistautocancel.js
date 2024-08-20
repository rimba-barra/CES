Ext.define('Erems.controller.Popuplistautocancel', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popuplistautocancel',
	views: ['popuplistautocancel.Panel', 'popuplistautocancel.Grid', 'popuplistautocancel.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
	stores: ['', 'Popuplistautocancel', 'Mastercluster'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popuplistautocancelgrid'
		},
		{
			ref: 'formsearch',
			selector: 'popuplistautocancelformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popuplistautocancelformdata'
		}
	],
	controllerName: 'popuplistautocancel',
	fieldName: '',
	bindPrefixName: 'Popuplistautocancel',
	init: function (application) {
		var me = this;
		this.control({
			'popuplistautocancelpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popuplistautocancelgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popuplistautocancelformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popuplistautocancelgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popuplistautocancelgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popuplistautocancelgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popuplistautocancelgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popuplistautocancelformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popuplistautocancelformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popuplistautocancelformdata': {
				afterrender: this.formDataAfterRender
			},
			'popuplistautocancelformdata button[action=save]': {
				click: this.dataSave
			},
			'popuplistautocancelformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popuplistautocancelgrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'popuplistautocancel', me.getFormsearch().getValues());
				}
			}
		});
	}
});