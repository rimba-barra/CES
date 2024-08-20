Ext.define('Erems.controller.Popupunitlunas', {
	extend   : 'Erems.library.template.controller.Controllerpopup',
	alias    : 'controller.Popupunitlunas',
	views    : ['popupunitlunas.Panel', 'popupunitlunas.Grid', 'popupunitlunas.FormSearch'],
	requires : ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
	stores   : ['', 'Popupunitlunas', 'Mastercluster', 'Masterblock'],
	models   : ['Popupmaster'],
	refs     : [
		{
			ref      : 'grid',
			selector : 'popupunitlunasgrid'
		},
		{
			ref      : 'formsearch',
			selector : 'popupunitlunasformsearch'
		},
		{
			ref      : 'formdata',
			selector : 'popupunitlunasformdata'
		}
	],
	controllerName: 'popupunitlunas',
	fieldName: '',
	bindPrefixName: 'Popupunitlunas',
	init: function (application) {
		var me = this;
		this.control({
			'popupunitlunaspanel': {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : this.panelAfterRender

			},
			'popupunitlunasgrid': {
				afterrender     : this.gridAfterRender,
				itemdblclick    : this.gridItemDblClick,
				itemcontextmenu : this.gridItemContextMenu,
				selectionchange : this.gridSelectionChange
			},
			'popupunitlunasformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popupunitlunasgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popupunitlunasgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popupunitlunasgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popupunitlunasgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popupunitlunasformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popupunitlunasformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popupunitlunasformdata': {
				afterrender: this.formDataAfterRender
			},
			'popupunitlunasformdata button[action=save]': {
				click: this.dataSave
			},
			'popupunitlunasformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popupunitlunasgrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'unitlunas', me.getFormsearch().getValues());
				}
			},
			'popupunitlunasgrid toolbar button[action=print]': {
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

			var reportFile = 'Unitlunas';

//			console.log(params);
			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},
});