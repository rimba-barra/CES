Ext.define('Erems.controller.Pembayaranbcreport', {
	extend: 'Erems.library.template.controller.Controllerreporttb',
	alias: 'controller.Pembayaranbcreport',
	views: ['pembayaranbcreport.Panel', 'pembayaranbcreport.FormData', 'masterreport.Panel'],
	refs: [
		{
			ref: 'panel',
			selector: 'pembayaranbcreportpanel'
		},
		{
			ref: 'formdata',
			selector: 'pembayaranbcreportformdata'
		}

	],
	controllerName: 'pembayaranbcreport',
	bindPrefixName: 'Pembayaranbcreport',
	init: function (application) {
		var me = this;
		this.control({
			'pembayaranbcreportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'pembayaranbcreportformdata': {
				afterrender: this.formDataAfterRender
			},
			'pembayaranbcreportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'pembayaranbcreportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'pembayaranbcreportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			}
		});
	},
	/* must override */
	processReport: function () {
		var me = this;
		var winId = 'myReportWindow';
		me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
		var win = desktop.getWindow(winId);

		if (win) {
			var params = me.getFormdata().getForm().getFieldValues();

			var tglStart = me.getFormdata().down("[name=bot_date]").getValue();
			var tglEnd = me.getFormdata().down("[name=top_date]").getValue();

			if (tglStart) {
				var startDate = new Date(tglStart);
				params["Bot_date"] = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
				params["param_bot_date"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
			} else {
				params["Bot_date"] = 'ALL';
				params["param_bot_date"] = null;
			}
			if (tglEnd) {
				var endDate = new Date(tglEnd);
				params["Top_date"] = endDate.getDate() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getFullYear();
				params["param_top_date"] = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate(); //for sql query
			} else {
				params["Top_date"] = 'ALL';
				params["param_top_date"] = null;
			}

			params["Building_class"] = me.getFormdata().down("[name=buildingclass]").getValue() == null ? "ALL" : me.getFormdata().down("[name=buildingclass]").getDisplayValue();
			params["Project"] = me.project_name;
			params["Pt"] = me.pt_name;
			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;

			var html = me.generateFakeForm2(params, "PembayaranBelumCair");
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},
	panelAfterRender: function (el) {
		var me = this;

		Ext.Ajax.request({
			url: 'erems/stockmepurnajualreport/read',
			success: function (response) {
				var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name;
			},
			//params: {mode_read: 'init'}
		});
		//   me.loadReport(el, 'erems/stockmepurnajualreport/all');
	},
	loadedCbList: function () {
		var list = [];
		return list;
	}

});