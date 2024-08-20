Ext.define('Erems.controller.Pwawancarareport', {
	extend: 'Erems.library.template.controller.Controllerreporttb',
	alias: 'controller.Pwawancarareport',
	views: ['pwawancarareport.Panel', 'pwawancarareport.FormData', 'masterreport.Panel'],
	stores: ['Masterdata.store.Bank'],
	refs: [
		{
			ref: 'panel',
			selector: 'pwawancarareportpanel'
		},
		{
			ref: 'formdata',
			selector: 'pwawancarareportformdata'
		}

	],
	controllerName: 'pwawancarareport',
	bindPrefixName: 'Pwawancarareport',
	init: function (application) {
		var me = this;
		this.control({
			'pwawancarareportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'pwawancarareportformdata': {
				afterrender: this.formDataAfterRender
			},
			'pwawancarareportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'pwawancarareportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'pwawancarareportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			},
			'pwawancarareportformdata [name=cbf_bank]': {
				change: me.checkboxChange
			},
			'pwawancarareportformdata [name=bank_id]': {
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

			params["bank"] = me.getFormdata().down("[name=bank_id]").getValue();
			if (params["bank"]) {
				params["bank_display"] = me.getFormdata().down("[name=bank_id]").getDisplayValue();
			} else {
				params["bank_display"] = "ALL";
			}
			
			params["status"] = me.getSelectedRadio("status").getValue();
			if (params["status"]) {
				params["status_display"] = me.getSelectedRadio("status").getText();
			} else {
				params["status_display"] = "ALL";
			}

			var tglStart = me.getFormdata().down("[name=bot_date]").getValue();
			var tglEnd = me.getFormdata().down("[name=top_date]").getValue();

			if (tglStart) {
				var startDate = new Date(tglStart);
				params["bot_date"] = startDate.getDate() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear();
				params["param_bot_date"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
			} else {
				params["bot_date"] = 'ALL';
				params["param_bot_date"] = null;
			}
			if (tglEnd) {
				var endDate = new Date(tglEnd);
				params["top_date"] = endDate.getDate() + "/" + (endDate.getMonth() + 1) + "/" + endDate.getFullYear();
				params["param_top_date"] = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate(); //for sql query
			} else {
				params["top_date"] = 'ALL';
				params["param_top_date"] = null;
			}

			params["Project"] = me.project_name;
			params["Pt"] = me.pt_name;
			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;
			console.log(params);

			var html = me.generateFakeForm2(params, "ProgressWawancara");
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
	formDataAfterRender: function (el) {
		//city combobox
//		alert("Asas");
		var ftStore = null;
		ftStore = el.down("[name=bank_id]").getStore();
		ftStore.load({params: {start: 0, limit: 0}});
	},
	zendAddParams: function (info) {
		var me = this;

	},

	loadedCbList: function () {
		var list = ["bank_id"];
		return list;
	}

});