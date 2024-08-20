Ext.define('Erems.controller.Popupkomisi', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popupkomisi',
	views: ['popupkomisi.Panel', 'popupkomisi.Grid', 'popupkomisi.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
	stores: ['', 'Popupkomisi', 'Mastercluster', 'Masterblock'],
	models: ['Popupkomisi'],
	refs: [
		{
			ref: 'grid',
			selector: 'popupkomisigrid'
		},
		{
			ref: 'formsearch',
			selector: 'popupkomisiformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popupkomisiformdata'
		}
	],
	controllerName: 'popupkomisi',
	fieldName: '',
	bindPrefixName: 'Popupkomisi',
	init: function (application) {
		var me = this;
		this.control({
			'popupkomisipanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popupkomisigrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popupkomisiformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popupkomisigrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popupkomisigrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popupkomisigrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popupkomisigrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popupkomisiformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popupkomisiformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popupkomisiformdata': {
				afterrender: this.formDataAfterRender
			},
			'popupkomisiformdata button[action=save]': {
				click: this.dataSave
			},
			'popupkomisiformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popupkomisigrid toolbar button[action=export_excel]': {
				click: function (el) {
					//console.log(this.getGrid().getStore())
					 this.dataExport(el, 'popupkomisi', me.getFormsearch().getValues());
				}
			}
		});
	}
});