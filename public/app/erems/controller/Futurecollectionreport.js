Ext.define('Erems.controller.Futurecollectionreport', {
	extend: 'Erems.library.template.controller.Controllerreporttb',
	alias: 'controller.Futurecollectionreport',
	requires:[
        'Erems.library.template.component.Clustercombobox'
	],
	stores:['Mastercluster'],
	models:['Mastercluster'],
	views: ['futurecollectionreport.Panel', 'futurecollectionreport.FormData', 'masterreport.Panel'],
	refs: [
		{
			ref: 'panel',
			selector: 'futurecollectionreportpanel'
		},
		{
			ref: 'formdata',
			selector: 'futurecollectionreportformdata'
		}

	],
	controllerName: 'futurecollectionreport', 
	formWidth: 750,
	fieldName: 'name',
	comboBoxIdEl: [],
	bindPrefixName: 'Futurecollectionreport',
	localStore: {
		detail: null
	},
	project_name: null,
	pt_name: null,
	init: function (application) {
		var me = this;
		this.control({
			'futurecollectionreportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'futurecollectionreportformdata': {
				afterrender: this.formDataAfterRender
			},
			'futurecollectionreportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'futurecollectionreportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'futurecollectionreportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			},
			'futurecollectionreportformdata button[action=reset]': {
				click: this.dataReset
			},
			'futurecollectionreportformdata [name=cbf_cluster_id]': {
				change: me.checkboxChange
			},
			'futurecollectionreportformdata [name=cluster_id]': {
				select: me.comboboxChange
			},
			'futurecollectionreportformdata [name=cbf_periode_id]': {
				change: me.checkboxChangePeriode
			},
			'futurecollectionreportformdata [name=periode_startdate]': {
				change: me.comboboxChangeStart
			},
			'futurecollectionreportformdata [name=periode_enddate]': {
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
			params["project_name"] = me.project_name+' ASASAS';
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

			var tglStart = me.getFormdata().down("[name=periode_startdate]").getValue();
			var tglEnd = me.getFormdata().down("[name=periode_enddate]").getValue();
			var tglJatuhTempo = me.getFormdata().down("[name=jatuh_tempo]").getValue();
			
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
			
			if (tglJatuhTempo) {
				var jatuhTempoDate = new Date(tglJatuhTempo);
				params["jatuhtempodate_display"] = jatuhTempoDate.getFullYear();
				params["param_jatuhtempodate"] = jatuhTempoDate.getFullYear(); //for sql query
			} else {
				params["jatuhtempodate_display"] = 'ALL';
				params["param_jatuhtempodate"] = null;
			}

			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;

			var select_laporan = me.getFormdata().down("[name=radiogroup_laporantype]").getValue().radio_laporantype;
        	if (select_laporan == "rekap") {
            	reportFile = 'FutureCollection';
            	//params["reporttype_display"] = 'Rekap';
        	} else if (select_laporan == "detail") {
            	reportFile = 'FutureCollectionDetail';
            	//params["reporttype_display"] = 'Detail';
        	}

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
			url: 'erems/futurecollectionreport/read',
			success: function (response) {
				var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name;
			},
			//params: {mode_read: 'init'}
		});
		//   me.loadReport(el, 'erems/futurecollectionreport/all');
	}

});