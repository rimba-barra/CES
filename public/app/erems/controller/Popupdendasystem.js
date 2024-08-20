Ext.define('Erems.controller.Popupdendasystem', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popupdendasystem',
	views: ['popupdendasystem.Panel', 'popupdendasystem.Grid', 'popupdendasystem.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
	stores: ['', 'Popupdendasystem', 'Mastercluster', 'Masterblock'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popupdendasystemgrid'
		},
		{
			ref: 'formsearch',
			selector: 'popupdendasystemformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popupdendasystemformdata'
		}
	],
	controllerName: 'popupdendasystem',
	fieldName: '',
	bindPrefixName: 'Popupdendasystem',
	init: function (application) {
		var me = this;
		this.control({
			'popupdendasystempanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popupdendasystemgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popupdendasystemformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popupdendasystemgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popupdendasystemgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popupdendasystemgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popupdendasystemgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popupdendasystemformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popupdendasystemformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popupdendasystemformdata': {
				afterrender: this.formDataAfterRender
			},
			'popupdendasystemformdata button[action=save]': {
				click: this.dataSave
			},
			'popupdendasystemformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popupdendasystemgrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'dendasystem', me.getFormsearch().getValues());
				}
			},
			'popupdendasystemgrid toolbar button[action=print]': {
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

			var reportFile = 'Vida';

//			console.log(params);
			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},
});