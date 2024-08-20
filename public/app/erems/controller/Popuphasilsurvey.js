Ext.define('Erems.controller.Popuphasilsurvey', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popuphasilsurvey',
	views: ['popuphasilsurvey.Panel', 'popuphasilsurvey.Grid', 'popuphasilsurvey.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
	stores: ['', 'Popuphasilsurvey', 'Mastercluster', 'Masterblock'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popuphasilsurveygrid'
		},
		{
			ref: 'formsearch',
			selector: 'popuphasilsurveyformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popuphasilsurveyformdata'
		}
	],
	controllerName: 'popuphasilsurvey',
	fieldName: '',
	bindPrefixName: 'Popuphasilsurvey',
	init: function (application) {
		var me = this;
		this.control({
			'popuphasilsurveypanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popuphasilsurveygrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popuphasilsurveyformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popuphasilsurveygrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popuphasilsurveygrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popuphasilsurveygrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popuphasilsurveygrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popuphasilsurveyformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popuphasilsurveyformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popuphasilsurveyformdata': {
				afterrender: this.formDataAfterRender
			},
			'popuphasilsurveyformdata button[action=save]': {
				click: this.dataSave
			},
			'popuphasilsurveyformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popuphasilsurveygrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'hasilsurvey', me.getFormsearch().getValues());
				}
			}
		});
	}
});