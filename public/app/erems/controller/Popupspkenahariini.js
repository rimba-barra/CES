Ext.define('Erems.controller.Popupspkenahariini', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popupspkenahariini',
	views: ['popupspkenahariini.Panel', 'popupspkenahariini.Grid', 'popupspkenahariini.FormSearch'/*, 'popupspkenahariini.FormData'*/],
	stores: ['Popupspkenahariini'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popupspkenahariinigrid'
		},
		{
			ref: 'formsearch',
			selector: 'popupspkenahariiniformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popupspkenahariiniformdata'
		}
	],
	controllerName: 'popupspkenahariini',
	fieldName: '',
	bindPrefixName: 'Popupspkenahariini',
	init: function (application) {
		var me = this;
		this.control({
			'popupspkenahariinipanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popupspkenahariinigrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popupspkenahariinigrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popupspkenahariinigrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popupspkenahariinigrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popupspkenahariinigrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'popupspkenahariinigrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popupspkenahariiniformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popupspkenahariiniformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popupspkenahariiniformdata': {
				afterrender: this.formDataAfterRender
			},
			'popupspkenahariiniformdata button[action=save]': {
				click: this.dataSave
			},
			'popupspkenahariiniformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popupspkenahariinigrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'spkenahariini');
				}
			}

		});
	}

});
