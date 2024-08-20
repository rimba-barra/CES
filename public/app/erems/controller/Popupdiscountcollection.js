Ext.define('Erems.controller.Popupdiscountcollection', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popupdiscountcollection',
	views: ['popupdiscountcollection.Panel', 'popupdiscountcollection.Grid', 'popupdiscountcollection.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox','Erems.library.template.component.Clustercombobox'],
	stores: ['', 'Popupdiscountcollection', 'Mastercluster', 'Masterblock'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'grid',
			selector: 'popupdiscountcollectiongrid'
		},
		{
			ref: 'formsearch',
			selector: 'popupdiscountcollectionformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popupdiscountcollectionformdata'
		}
	],
	controllerName: 'popupdiscountcollection',
	fieldName: '',
	bindPrefixName: 'Popupdiscountcollection',
	init: function (application) {
		var me = this;
		this.control({
			'popupdiscountcollectionpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popupdiscountcollectiongrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'popupdiscountcollectionformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popupdiscountcollectiongrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popupdiscountcollectiongrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popupdiscountcollectiongrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'popupdiscountcollectiongrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'popupdiscountcollectionformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popupdiscountcollectionformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popupdiscountcollectionformdata': {
				afterrender: this.formDataAfterRender
			},
			'popupdiscountcollectionformdata button[action=save]': {
				click: this.dataSave
			},
			'popupdiscountcollectionformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popupdiscountcollectiongrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'discountcollection', me.getFormsearch().getValues());
				}
			},
			'popupdiscountcollectiongrid toolbar button[action=print]': {
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

			var reportFile = 'Discountcollection';

//			console.log(params);
			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},
});