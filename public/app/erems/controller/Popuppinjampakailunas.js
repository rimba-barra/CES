Ext.define('Erems.controller.Popuppinjampakailunas', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popuppinjampakailunas',
	views: ['popuppinjampakailunas.Panel', 'popuppinjampakailunas.Grid', 'popuppinjampakailunas.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
	stores: ['', 'Popuppinjampakailunas', 'Mastercluster', 'Masterblock'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popuppinjampakailunasgrid'
		},
		{
			ref: 'formsearch',
			selector: 'popuppinjampakailunasformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popuppinjampakailunasformdata'
		}
	],
	controllerName: 'popuppinjampakailunas',
	fieldName: '',
	bindPrefixName: 'Popuppinjampakailunas',
	init: function (application) {
		var me = this;
		this.control({
			'popuppinjampakailunaspanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popuppinjampakailunasgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popuppinjampakailunasformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popuppinjampakailunasgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popuppinjampakailunasgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popuppinjampakailunasgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popuppinjampakailunasgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popuppinjampakailunasformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popuppinjampakailunasformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popuppinjampakailunasformdata': {
				afterrender: this.formDataAfterRender
			},
			'popuppinjampakailunasformdata button[action=save]': {
				click: this.dataSave
			},
			'popuppinjampakailunasformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popuppinjampakailunasgrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'pinjampakailunas', me.getFormsearch().getValues());
				}
			},
			'popuppinjampakailunasgrid toolbar button[action=print]': {
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

			var reportFile = 'Pinjampakailunas';

//			console.log(params);
			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},
});