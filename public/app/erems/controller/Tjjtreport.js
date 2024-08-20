Ext.define('Erems.controller.Tjjtreport', {
	extend: 'Erems.library.template.controller.Controllerreporttb',
	alias: 'controller.Tjjtreport',
	views: ['tjjtreport.Panel', 'tjjtreport.FormData', 'masterreport.Panel'],
	refs: [
		{
			ref: 'panel',
			selector: 'tjjtreportpanel'
		},
		{
			ref: 'formdata',
			selector: 'tjjtreportformdata'
		}

	],
	controllerName: 'tjjtreport',
	bindPrefixName: 'Tjjtreport',
	init: function (application) {
		var me = this;
		this.control({
			'tjjtreportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'tjjtreportformdata': {
				afterrender: this.formDataAfterRender
			},
			'tjjtreportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'tjjtreportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'tjjtreportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			},
			'tjjtreportformdata button[action=reset]': {
                click: me.dataReset
            },
            'tjjtreportformdata [name=cbf_buildingclass]': {
                change: me.checkboxChange
            },
            'tjjtreportformdata [name=buildingclass]': {
                select: me.comboboxChange
            },
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

			var dateNow = new Date();

			var tglStart = me.getFormdata().down("[name=periode_startdate]").getValue();
			var tglEnd = me.getFormdata().down("[name=periode_enddate]").getValue();

			if (tglStart) {
				var startDate = new Date(tglStart);
				params["startdate_display"] = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
				params["param_startdate"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
			} else {
				params["startdate_display"] = 'ALL';
				params["param_startdate"] = null;
			}
			if (tglEnd) {
				var endDate = new Date(tglEnd);
				params["enddate_display"] = endDate.getDate() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getFullYear();
				params["param_enddate"] = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate(); //for sql query
			} else {
				params["enddate_display"] = 'ALL';
				params["param_enddate"] = null;
			}

			params["Building_class"] = me.getFormdata().down("[name=buildingclass]").getValue() == null ? "ALL" : me.getFormdata().down("[name=buildingclass]").getDisplayValue();
			params["Project"] = me.project_name;
			params["Pt"] = me.pt_name;
			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;

			var html = me.generateFakeForm2(params, "TandaJadiJatuhTempo");
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
	},

});