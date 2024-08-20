Ext.define('Erems.controller.Popupperpanjanganschedule', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popupperpanjanganschedule',
	views: ['popupperpanjanganschedule.Panel', 'popupperpanjanganschedule.Grid', 'popupperpanjanganschedule.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
	stores: ['', 'Popupperpanjanganschedule', 'Mastercluster', 'Masterblock'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popupperpanjanganschedulegrid'
		},
		{
			ref: 'formsearch',
			selector: 'popupperpanjanganscheduleformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popupperpanjanganscheduleformdata'
		}
	],
	controllerName: 'popupperpanjanganschedule',
	fieldName: '',
	bindPrefixName: 'Popupperpanjanganschedule',
	init: function (application) {
		var me = this;
		this.control({
			'popupperpanjanganschedulepanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popupperpanjanganschedulegrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popupperpanjanganscheduleformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popupperpanjanganschedulegrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popupperpanjanganschedulegrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popupperpanjanganschedulegrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popupperpanjanganschedulegrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popupperpanjanganscheduleformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popupperpanjanganscheduleformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popupperpanjanganscheduleformdata': {
				afterrender: this.formDataAfterRender
			},
			'popupperpanjanganscheduleformdata button[action=save]': {
				click: this.dataSave
			},
			'popupperpanjanganscheduleformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popupperpanjanganschedulegrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'perpanjanganschedule', me.getFormsearch().getValues());
				}
			}
		});
	},
});