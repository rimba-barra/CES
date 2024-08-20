Ext.define('Erems.controller.Popuplogkomunikasicustomer', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popuplogkomunikasicustomer',
	views: ['popuplogkomunikasicustomer.Panel', 'popuplogkomunikasicustomer.Grid', 'popuplogkomunikasicustomer.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
	stores: ['', 'Popuplogkomunikasicustomer', 'Mastercluster', 'Masterblock'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popuplogkomunikasicustomergrid'
		},
		{
			ref: 'formsearch',
			selector: 'popuplogkomunikasicustomerformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popuplogkomunikasicustomerformdata'
		}
	],
	controllerName: 'popuplogkomunikasicustomer',
	fieldName: '',
	bindPrefixName: 'Popuplogkomunikasicustomer',
	init: function (application) {
		var me = this;
		this.control({
			'popuplogkomunikasicustomerpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popuplogkomunikasicustomergrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popuplogkomunikasicustomerformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popuplogkomunikasicustomergrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popuplogkomunikasicustomergrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popuplogkomunikasicustomergrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popuplogkomunikasicustomergrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popuplogkomunikasicustomerformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popuplogkomunikasicustomerformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popuplogkomunikasicustomerformdata': {
				afterrender: this.formDataAfterRender
			},
			'popuplogkomunikasicustomerformdata button[action=save]': {
				click: this.dataSave
			},
			'popuplogkomunikasicustomerformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popuplogkomunikasicustomergrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'logkomunikasicustomer', me.getFormsearch().getValues());
				}
			},
			'popuplogkomunikasicustomergrid toolbar button[action=print]': {
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

			var reportFile = 'Logkomunikasicustomer';

//			console.log(params);
			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},
});