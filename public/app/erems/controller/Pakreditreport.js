Ext.define('Erems.controller.Pakreditreport', {
	extend   : 'Erems.library.template.controller.Controllerreporttb',
	alias    : 'controller.Pakreditreport',
	requires : ['Erems.library.template.component.Bankcombobox'],
	stores   : ['Masterdata.store.Bank'],
	models   : ['Masterdata.model.Bank'],
	views    : ['pakreditreport.Panel', 'pakreditreport.FormData', 'masterreport.Panel'],
	refs     : [
		{
			ref      : 'panel',
			selector : 'pakreditreportpanel'
		},
		{
			ref      : 'formdata',
			selector : 'pakreditreportformdata'
		}

	],
	controllerName : 'pakreditreport',
	bindPrefixName : 'Pakreditreport',
	localStore     : { detail : null },
	project_name   : null,
	pt_name        : null,
	init           : function (application) {
		var me = this;
		this.control({
			'pakreditreportpanel': {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : this.panelAfterRender
			},
			'pakreditreportformdata': {
				afterrender : this.formDataAfterRender
			},
			'futurecollectionreportformdata [name=cbf_bank_id]': {
				change : me.checkboxChange
			},
			'futurecollectionreportformdata [name=bank_id]': {
				select : me.comboboxChange
			},
			'pakreditreportformdata button[action=save]': {
				click : this.mainDataSave
			},
			'pakreditreportformdata button[action=cancel]': {
				click : this.formDataClose
			},
			'pakreditreportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			}
		});
	},

	panelAfterRender: function (el) {
		var me = this;
		var f = me.getFormdata();
		Ext.Ajax.request({
			url: 'erems/pakreditreport/read',
			success: function (response) {
				var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name;
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

			var reportFile = "ProgressAkadKredit";

			//header
			params["project_name"] = me.project_name;
			params["pt_name"] = me.pt_name;
			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;

			params["bank_id"] = me.getFormdata().down("[name=bank_id]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_bank_id]").getValue();
			if (cbf_checked1 == '1' || !params["bank_id"]) {
				params["Bank_name"] = 'ALL';
			} else {
				params["Bank_name"] = me.getFormdata().down("[name=bank_id]").getRawValue();
			}

			params["status"] = me.getFormdata().down("[name=status]").getValue().Status;
			if (params["status"] == 1) {
				params["Status_name"] = 'Sudah Akad Kredit';
			} else if (params["status"] == 2) {
				params["Status_name"] = 'Belum Akad Kredit';
			} else if (params["status"] == 3) {
				params["Status_name"] = 'Rencana Akad Kredit';
			}

			params["status_lunas"] = me.getFormdata().down("[name=status_lunas]").getValue().Is_lunas;
			if (params["status_lunas"] == 2) {
				params["Status_lunas_name"] = 'ALL';
			} else if (params["Status_lunas_name"] == 0) {
				params["Status_lunas_name"] = 'Belum Lunas';
			} else if (params["status_lunas"] == 1) {
				params["Status_lunas_name"] = 'Sudah Lunas';
			}

			var tglStart = me.getFormdata().down("[name=bot_date]").getValue();
			var tglEnd   = me.getFormdata().down("[name=top_date]").getValue();

			if (tglStart) {
				var startDate = new Date(tglStart);
				params["bot_date_name"] = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
				params["bot_date"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
			} else {
				params["bot_date_name"] = 'ALL';
				params["bot_date"] = null;
			}

			if (tglEnd) {
				var endDate = new Date(tglEnd);
				params["top_date_name"] = endDate.getDate() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getFullYear();
				params["top_date"] = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate(); //for sql query
			} else {
				params["top_date_name"] = 'ALL';
				params["top_date"] = null;
			}


			console.log(params);
			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	}
});