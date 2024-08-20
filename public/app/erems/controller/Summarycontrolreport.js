Ext.define('Erems.controller.Summarycontrolreport', {
	extend: 'Erems.library.template.controller.Controllerreporttb',
	alias: 'controller.Summarycontrolreport',
	requires:[
        'Erems.library.template.component.Clustercombobox'
	],
	stores:['Mastercluster'],
	models:['Mastercluster'],
	views: ['summarycontrolreport.Panel', 'summarycontrolreport.FormData', 'masterreport.Panel'],
	refs: [
		{
			ref: 'panel',
			selector: 'summarycontrolreportpanel'
		},
		{
			ref: 'formdata',
			selector: 'summarycontrolreportformdata'
		}

	],
	controllerName: 'summarycontrolreport',
	formWidth: 750,
	fieldName: 'name',
	comboBoxIdEl: [],
	bindPrefixName: 'Summarycontrolreport',
	localStore: {
		detail: null
	},
	project_name: null,
	pt_name: null,
	init: function (application) {
		var me = this;
		this.control({
			'summarycontrolreportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'summarycontrolreportformdata': {
				afterrender: this.formDataAfterRender
			},
			'summarycontrolreportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'summarycontrolreportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'summarycontrolreportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			},
			'summarycontrolreportformdata button[action=reset]': {
				click: this.dataReset
			},
			'summarycontrolreportformdata [name=cbf_cluster_id]': {
				change: me.checkboxChange
			},
			'summarycontrolreportformdata [name=cluster_id]': {
				select: me.comboboxChange
			},
			'summarycontrolreportformdata [name=periode_startdate]': {
				change: me.comboboxChangeStart
			},
			'summarycontrolreportformdata [name=periode_enddate]': {
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
			var reportFile = "SummaryControl";

			params["cluster_id"] = me.getFormdata().down("[name=cluster_id]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
			if (cbf_checked1 == '1' || !params["cluster_id"]) {
				params["cluster_display"] = 'ALL';
			} else {
				params["cluster_display"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
			}

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

			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;

//			console.log(params);
			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},

	generateFakeForm2:function(paramList,reportFile){		
		//var form = '<form id="fakeReportFormID" action=resources/stimulsoftjs/viewer.php?reportfilelocation='+reportFile+'.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		var form = '<form id="fakeReportFormID" action=resources/stimulsoftjsv3/viewer.php?reportfilelocation='+reportFile+'.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		for(var x in paramList){
            if(paramList[x]===null){
                paramList[x]='';
            }
            form +='<input type="hidden" name="'+x+'" value="'+paramList[x]+'">';
        }
        form +='<input type="submit" value="post"></form>';
        form +='<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
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
			url: 'erems/summarycontrolreport/read',
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