Ext.define('Erems.controller.Popupdocumenthistorycustomer', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popupdocumenthistorycustomer',
	views: ['popupdocumenthistorycustomer.Panel', 'popupdocumenthistorycustomer.Grid', 'popupdocumenthistorycustomer.FormSearch'],
	requires: [],
	stores: ['', 'Popupdocumenthistorycustomer'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popupdocumenthistorycustomergrid'
		},
		{
			ref: 'formsearch',
			selector: 'popupdocumenthistorycustomerformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popupdocumenthistorycustomerformdata'
		}
	],
	controllerName: 'popupdocumenthistorycustomer',
	fieldName: '',
	bindPrefixName: 'Popupdocumenthistorycustomer',
	init: function (application) {
		var me = this;
		this.control({
			'popupdocumenthistorycustomerpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender
			},
			'popupdocumenthistorycustomergrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popupdocumenthistorycustomerformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popupdocumenthistorycustomergrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popupdocumenthistorycustomergrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popupdocumenthistorycustomergrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popupdocumenthistorycustomergrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popupdocumenthistorycustomerformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popupdocumenthistorycustomerformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popupdocumenthistorycustomerformdata': {
				afterrender: this.formDataAfterRender
			},
			'popupdocumenthistorycustomerformdata button[action=save]': {
				click: this.dataSave
			},
			'popupdocumenthistorycustomerformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popupdocumenthistorycustomergrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'documenthistorycustomer', me.getFormsearch().getValues());
				}
			},
			'popupdocumenthistorycustomergrid toolbar button[action=print]': {
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

			var reportFile = 'Documenthistorycustomer';

			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},
});