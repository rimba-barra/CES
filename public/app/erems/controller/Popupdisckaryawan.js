Ext.define('Erems.controller.Popupdisckaryawan', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popupdisckaryawan',
	views: ['popupdisckaryawan.Panel', 'popupdisckaryawan.Grid', 'popupdisckaryawan.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
	stores: ['', 'Popupdisckaryawan', 'Mastercluster', 'Masterblock'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popupdisckaryawangrid'
		},
		{
			ref: 'formsearch',
			selector: 'popupdisckaryawanformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popupdisckaryawanformdata'
		}
	],
	controllerName: 'popupdisckaryawan',
	fieldName: '',
	bindPrefixName: 'Popupdisckaryawan',
	init: function (application) {
		var me = this;
		this.control({
			'popupdisckaryawanpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popupdisckaryawangrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popupdisckaryawanformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popupdisckaryawangrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popupdisckaryawangrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popupdisckaryawangrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popupdisckaryawangrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popupdisckaryawanformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popupdisckaryawanformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popupdisckaryawanformdata': {
				afterrender: this.formDataAfterRender
			},
			'popupdisckaryawanformdata button[action=save]': {
				click: this.dataSave
			},
			'popupdisckaryawanformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popupdisckaryawangrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'disckaryawan', me.getFormsearch().getValues());
				}
			},
			'popupdisckaryawangrid toolbar button[action=print]': {
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