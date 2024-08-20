Ext.define('Erems.controller.Collgirojatuhtemporeport', {
	extend: 'Erems.library.template.controller.Controllerreporttb',
	alias: 'controller.Collgirojatuhtemporeport',
	views: ['collgirojatuhtemporeport.Panel', 'collgirojatuhtemporeport.FormData', 'masterreport.Panel'],
	refs: [
		{
			ref: 'panel',
			selector: 'collgirojatuhtemporeportpanel'
		},
		{
			ref: 'formdata',
			selector: 'collgirojatuhtemporeportformdata'
		}

	],
	controllerName: 'collgirojatuhtemporeport',
	formWidth: 750,
	fieldName: 'name',
	comboBoxIdEl: [],
	bindPrefixName: 'Collgirojatuhtemporeport',
	localStore: {
		detail: null
	},
	project_name: null,
	pt_name: null,
	init: function (application) {
		var me = this;
		this.control({
			'collgirojatuhtemporeportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'collgirojatuhtemporeportformdata': {
				afterrender: this.formDataAfterRender
			},
			'collgirojatuhtemporeportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'collgirojatuhtemporeportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'collgirojatuhtemporeportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			},
			'collgirojatuhtemporeportformdata button[action=reset]': {
				click: this.dataReset
			},
			'collgirojatuhtemporeportformdata [name=cbf_buildingclass]': {
				change: me.checkboxChange
			},
			'collgirojatuhtemporeportformdata [name=buildingclass]': {
				select: me.comboboxChange
			},
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
			var reportFile = "Collgirojatuhtempo";

			params["group_admin_display"] = me.getFormdata().down("[name=buildingclass]").getValue();
			params["radio_jenis_laporan"] = me.getFormdata().down("[name=radiogroup_jenis_laporan]").getValue().radio_jenis_laporan;
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
			url: 'erems/collgirojatuhtemporeport/read',
			success: function (response) {
				var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name;
			},
			//params: {mode_read: 'init'}
		});
		//   me.loadReport(el, 'erems/collgirojatuhtemporeport/all');
	}

});