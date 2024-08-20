Ext.define('Erems.controller.Salesmediapromosireport', {
	extend: 'Erems.library.template.controller.Controllerreporttb', //Controller2
	alias: 'controller.Salesmediapromosireport',
	views: ['salesmediapromosireport.Panel', 'salesmediapromosireport.FormData', 'masterreport.Panel'],
	refs: [
		{
			ref: 'panel',
			selector: 'salesmediapromosireportpanel'
		},
		{
			ref: 'formdata',
			selector: 'salesmediapromosireportformdata'
		}

	],
	controllerName: 'salesmediapromosireport',
	formWidth: 750,
	fieldName: 'name',
	comboBoxIdEl: [],
	bindPrefixName: 'Salesmediapromosireport',
	localStore: {
		detail: null
	},
	project_name: null,
	pt_name: null,
	init: function (application) {
		var me = this;
		this.control({
			'salesmediapromosireportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'salesmediapromosireportformdata': {
				afterrender: this.formDataAfterRender
			},
			'salesmediapromosireportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'salesmediapromosireportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'salesmediapromosireportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			},
			'salesmediapromosireportformdata button[action=reset]': {
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

			var tglStart = me.getFormdata().down("[name=purchase_startdate]").getValue();
			var tglEnd = me.getFormdata().down("[name=purchase_enddate]").getValue();
			if (tglStart) {
				var startDate = new Date(tglStart);
				params["purchase_startdate"] = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
				params["param_startdate"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
			} else {
				params["purchase_startdate"] = null;
				params["param_startdate"] = null;
			}
			if (tglEnd) {
				var endDate = new Date(tglEnd);
				params["purchase_enddate"] = endDate.getDate() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getFullYear();
				params["param_enddate"] = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate(); //for sql query
			} else {
				params["purchase_enddate"] = null;
				params["param_enddate"] = null;
			}


			//header
			params["project_name"] = me.project_name;
			params["pt_name"] = me.pt_name;
			params["tgl_sekarang"] = dateNow.getDate() + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getFullYear();
			params["time_sekarang"] = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
			var reportFile = "Salesmediapromosi";//params["Groupby"]==="cluster"?"TownPlanningCluster":"TownPlanningType";

			params["radio_sort_by"] = me.getFormdata().down("[name=radiogroup_sort_by]").getValue().radio_sort_by;
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
			url: 'erems/salesmediapromosireport/read',
			success: function (response) {
				var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name;
			},
			//params: {mode_read: 'init'}
		});
		//   me.loadReport(el, 'erems/salesmediapromosireport/all');
	}

});