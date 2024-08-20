Ext.define('Erems.controller.Popupdibiayaiinstansi', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popupdibiayaiinstansi',
	views: ['popupdibiayaiinstansi.Panel', 'popupdibiayaiinstansi.Grid', 'popupdibiayaiinstansi.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
	stores: ['', 'Popupdibiayaiinstansi', 'Mastercluster', 'Masterblock'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popupdibiayaiinstansigrid'
		},
		{
			ref: 'formsearch',
			selector: 'popupdibiayaiinstansiformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popupdibiayaiinstansiformdata'
		}
	],
	controllerName: 'popupdibiayaiinstansi',
	fieldName: '',
	bindPrefixName: 'Popupdibiayaiinstansi',
	init: function (application) {
		var me = this;
		this.control({
			'popupdibiayaiinstansipanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popupdibiayaiinstansigrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popupdibiayaiinstansiformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popupdibiayaiinstansigrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popupdibiayaiinstansigrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popupdibiayaiinstansigrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popupdibiayaiinstansigrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popupdibiayaiinstansiformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popupdibiayaiinstansiformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popupdibiayaiinstansiformdata': {
				afterrender: this.formDataAfterRender
			},
			'popupdibiayaiinstansiformdata button[action=save]': {
				click: this.dataSave
			},
			'popupdibiayaiinstansiformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popupdibiayaiinstansigrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'dibiayaiinstansi', me.getFormsearch().getValues());
				}
			}
		});
	}
});