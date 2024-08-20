Ext.define('Erems.controller.Popupvida', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popupvida',
	views: ['popupvida.Panel', 'popupvida.Grid', 'popupvida.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
	stores: ['', 'Popupvida', 'Mastercluster', 'Masterblock'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popupvidagrid'
		},
		{
			ref: 'formsearch',
			selector: 'popupvidaformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popupvidaformdata'
		}
	],
	controllerName: 'popupvida',
	fieldName: '',
	bindPrefixName: 'Popupvida',
	init: function (application) {
		var me = this;
		this.control({
			'popupvidapanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popupvidagrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popupvidaformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popupvidagrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popupvidagrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popupvidagrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popupvidagrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popupvidaformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popupvidaformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popupvidaformdata': {
				afterrender: this.formDataAfterRender
			},
			'popupvidaformdata button[action=save]': {
				click: this.dataSave
			},
			'popupvidaformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popupvidagrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'vida', me.getFormsearch().getValues());
				}
			},
			'popupvidagrid toolbar button[action=print]': {
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