Ext.define('Erems.controller.Popuppenundaanbiayalegalitas', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popuppenundaanbiayalegalitas',
	views: ['popuppenundaanbiayalegalitas.Panel', 'popuppenundaanbiayalegalitas.Grid', 'popuppenundaanbiayalegalitas.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
	stores: ['', 'Popuppenundaanbiayalegalitas', 'Mastercluster', 'Masterblock'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popuppenundaanbiayalegalitasgrid'
		},
		{
			ref: 'formsearch',
			selector: 'popuppenundaanbiayalegalitasformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popuppenundaanbiayalegalitasformdata'
		}
	],
	controllerName: 'popuppenundaanbiayalegalitas',
	fieldName: '',
	bindPrefixName: 'Popuppenundaanbiayalegalitas',
	init: function (application) {
		var me = this;
		this.control({
			'popuppenundaanbiayalegalitaspanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popuppenundaanbiayalegalitasgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popuppenundaanbiayalegalitasformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popuppenundaanbiayalegalitasgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popuppenundaanbiayalegalitasgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popuppenundaanbiayalegalitasgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popuppenundaanbiayalegalitasgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popuppenundaanbiayalegalitasformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popuppenundaanbiayalegalitasformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popuppenundaanbiayalegalitasformdata': {
				afterrender: this.formDataAfterRender
			},
			'popuppenundaanbiayalegalitasformdata button[action=save]': {
				click: this.dataSave
			},
			'popuppenundaanbiayalegalitasformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popuppenundaanbiayalegalitasgrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'popuppenundaanbiayalegalitas', me.getFormsearch().getValues());
				}
			}
		});
	}
});