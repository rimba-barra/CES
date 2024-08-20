Ext.define('Erems.controller.Popupinsentifpajak', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popupinsentifpajak',
	views: ['popupinsentifpajak.Panel', 'popupinsentifpajak.Grid', 'popupinsentifpajak.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
	stores: ['', 'Popupinsentifpajak', 'Mastercluster', 'Masterblock'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popupinsentifpajakgrid'
		},
		{
			ref: 'formsearch',
			selector: 'popupinsentifpajakformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popupinsentifpajakformdata'
		}
	],
	controllerName: 'popupinsentifpajak',
	fieldName: '',
	bindPrefixName: 'Popupinsentifpajak',
	init: function (application) {
		var me = this;
		this.control({
			'popupinsentifpajakpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popupinsentifpajakgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popupinsentifpajakformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popupinsentifpajakgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popupinsentifpajakgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popupinsentifpajakgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popupinsentifpajakgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popupinsentifpajakformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popupinsentifpajakformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popupinsentifpajakformdata': {
				afterrender: this.formDataAfterRender
			},
			'popupinsentifpajakformdata button[action=save]': {
				click: this.dataSave
			},
			'popupinsentifpajakformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popupinsentifpajakgrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'insentifpajak', me.getFormsearch().getValues());
				}
			},
			'popupinsentifpajakgrid toolbar button[action=print]': {
				click: function (el) {
					me.processReport();
				}
			}
		});
	},
	processReport: function () {
		var me = this;
		var winId = 'myReportWindow';
		me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		var win = desktop.getWindow(winId);

		if (win) {
			var params = [];

			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;

			var reportFile = 'InsentifPajak';

//			console.log(params);
			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},
});