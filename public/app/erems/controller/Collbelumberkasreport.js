Ext.define('Erems.controller.Collbelumberkasreport', {
	extend: 'Erems.library.template.controller.Controllerreporttb',
	alias: 'controller.Collbelumberkasreport',
	views: ['collbelumberkasreport.Panel', 'collbelumberkasreport.FormData', 'masterreport.Panel'],
	refs: [
		{
			ref: 'panel',
			selector: 'collbelumberkasreportpanel'
		},
		{
			ref: 'formdata',
			selector: 'collbelumberkasreportformdata'
		}

	],
	controllerName: 'collbelumberkasreport',
	formWidth: 750,
	fieldName: 'name',
	comboBoxIdEl: [],
	bindPrefixName: 'Collbelumberkasreport',
	localStore: {
		detail: null
	},
	project_name: null,
	pt_name: null,
	init: function (application) {
		var me = this;
		this.control({
			'collbelumberkasreportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'collbelumberkasreportformdata': {
				afterrender: this.formDataAfterRender
			},
			'collbelumberkasreportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'collbelumberkasreportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'collbelumberkasreportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			},
			'collbelumberkasreportformdata button[action=reset]': {
				click: this.dataReset
			}
		});
	},

	processReport: function () {
		var me = this;
		var winId = 'myReportWindow';
		me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
		var win = desktop.getWindow(winId);

		if (win) {
			var params = me.getFormdata().getForm().getFieldValues();

			var dateNow = new Date();

			//header
			params["project_name"] = me.project_name;
			params["pt_name"] = me.pt_name;
			params["tgl_sekarang"] = dateNow.getDate() + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getFullYear();
			params["time_sekarang"] = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
			var reportFile = "Collbelumberkas";

			params["radio_belum_berkas"] = me.getFormdata().down("[name=radiogroup_belum_berkas]").getValue().radio_belum_berkas;
			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;

			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},

	panelAfterRender: function (el) {
		var me = this;

		Ext.Ajax.request({
			url: 'erems/collbelumberkasreport/read',
			success: function (response) {
				var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name;
			},
			//params: {mode_read: 'init'}
		});
		//   me.loadReport(el, 'erems/collbelumberkasreport/all');
	}

});