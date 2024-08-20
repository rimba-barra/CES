Ext.define('Erems.controller.Collsh1crreport', {
	extend: 'Erems.library.template.controller.Controllerreporttb',
	alias: 'controller.Collsh1crreport',
	views: ['collsh1crreport.Panel', 'collsh1crreport.FormData', 'masterreport.Panel'],
	refs: [
		{
			ref: 'panel',
			selector: 'collsh1crreportpanel'
		},
		{
			ref: 'formdata',
			selector: 'collsh1crreportformdata'
		}

	],
	requires: [
		'Erems.library.template.component.Clustercombobox'
	],
	stores: ['Mastercluster'],
	models: ['Mastercluster'],
	controllerName: 'collsh1crreport', 
	formWidth: 750,
	fieldName: 'name',
	comboBoxIdEl: [],
	bindPrefixName: 'Collsh1crreport',
	localStore: {
		detail: null
	},
	project_name: null,
	pt_name: null,
	init: function (application) {
		var me = this;
		this.control({
			'collsh1crreportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'collsh1crreportformdata': {
				afterrender: this.formDataAfterRender
			},
			'collsh1crreportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'collsh1crreportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'collsh1crreportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			},
			'collsh1crreportformdata button[action=reset]': {
				click: this.dataReset
			},
			'collsh1crreportformdata [name=cbf_cluster_id]': {
				change: me.checkboxChange
			},
			'collsh1crreportformdata [name=cluster_id]': {
				select: me.comboboxChange
			},
			'collsh1crreportformdata [name=cbf_periode_id]': {
				change: me.checkboxChangePeriode
			},
			'collsh1crreportformdata [name=periode_startdate]': {
				change: me.comboboxChangeStart
			},
			'collsh1crreportformdata [name=periode_enddate]': {
				change: me.comboboxChange
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
			//var reportFile = "FutureCollection";
			var reportFile = null;

			params["cluster_id"] = me.getFormdata().down("[name=cluster_id]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
			if (cbf_checked1 == '1' || !params["cluster_id"]) {
				params["cluster_display"] = 'ALL';
			} else {
				params["cluster_display"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
			}

			var monthProcess = me.getFormdata().down("[name=month_process]").getValue();
			
			if (monthProcess) {
				var monthProcessDate = new Date(monthProcess);
				params["month_process_display"] = monthProcessDate.getFullYear();
				params["month_process"] = monthProcessDate.getFullYear() + "-" + (monthProcessDate.getMonth() + 1) + "-" + monthProcessDate.getDate(); //for sql query
			} else {
				params["month_process_display"] = 'ALL';
				params["month_process"] = null;
			}

			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;

//			var select_laporan = me.getFormdata().down("[name=radiogroup_laporantype]").getValue().radio_laporantype;
//        	if (select_laporan == "rekap") {
//            	reportFile = 'FutureCollection';
            	//params["reporttype_display"] = 'Rekap';
//        	} else if (select_laporan == "detail") {
            	reportFile = 'ReportCollection';
            	//params["reporttype_display"] = 'Detail';
//        	}

//			console.log(params);
			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},

	checkboxChangePeriode: function (el) {
		var me = this;
		if (el.getValue()) {
			me.getFormdata().down("[name=periode_startdate]").setValue("");
			me.getFormdata().down("[name=periode_enddate]").setValue("");
			el.setValue(1);
		}
	},

	comboboxChangeStart: function () {
		var me = this;
		me.getFormdata().down("[name=cbf_periode_id]").setValue("0");
	},

	panelAfterRender: function (el) {
		var me = this;

		Ext.Ajax.request({
			url: 'erems/collsh1crreport/read',
			success: function (response) {
				var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name;
			},
			//params: {mode_read: 'init'}
		});
		//   me.loadReport(el, 'erems/collsh1crreport/all');
	}

});