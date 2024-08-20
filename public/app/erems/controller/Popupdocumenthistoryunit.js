Ext.define('Erems.controller.Popupdocumenthistoryunit', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popupdocumenthistoryunit',
	views: ['popupdocumenthistoryunit.Panel', 'popupdocumenthistoryunit.Grid', 'popupdocumenthistoryunit.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox','Erems.library.template.component.Unitstatuscombobox'],
	stores: ['', 'Popupdocumenthistoryunit', 'Mastercluster', 'Masterblock', 'Unitstatus'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popupdocumenthistoryunitgrid'
		},
		{
			ref: 'formsearch',
			selector: 'popupdocumenthistoryunitformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popupdocumenthistoryunitformdata'
		}
	],
	controllerName: 'popupdocumenthistoryunit',
	fieldName: '',
	bindPrefixName: 'Popupdocumenthistoryunit',
	init: function (application) {
		var me = this;
		this.control({
			'popupdocumenthistoryunitpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popupdocumenthistoryunitgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popupdocumenthistoryunitformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popupdocumenthistoryunitgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popupdocumenthistoryunitgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popupdocumenthistoryunitgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popupdocumenthistoryunitgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popupdocumenthistoryunitformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popupdocumenthistoryunitformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popupdocumenthistoryunitformdata': {
				afterrender: this.formDataAfterRender
			},
			'popupdocumenthistoryunitformdata button[action=save]': {
				click: this.dataSave
			},
			'popupdocumenthistoryunitformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popupdocumenthistoryunitgrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'documenthistoryunit', me.getFormsearch().getValues());
				}
			},
			'popupdocumenthistoryunitgrid toolbar button[action=print]': {
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

			var reportFile = 'Documenthistoryunit';

//			console.log(params);
			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},
});