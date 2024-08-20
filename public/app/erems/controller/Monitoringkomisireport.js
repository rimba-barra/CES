Ext.define('Erems.controller.Monitoringkomisireport', {
	extend: 'Erems.library.template.controller.Controllerreporttb',
	alias: 'controller.Monitoringkomisireport',
//	requires: ['Erems.template.ComboBoxFields', 'Erems.library.box.tools.Tools'],
	views: ['monitoringkomisireport.Panel', 'monitoringkomisireport.FormData', 'masterreport.Panel'],
	stores: ['Mastercitraclub', 'Mastercluster'],
	refs: [
		{
			ref: 'panel',
			selector: 'monitoringkomisireportpanel'
		},
		{
			ref: 'formdata',
			selector: 'monitoringkomisireportformdata'
		}

	],
	controllerName: 'monitoringkomisireport',
	formWidth: 100,
	fieldName: 'name',
	comboBoxIdEl: [],
	bindPrefixName: 'Monitoringkomisireport',
	localStore: {
		detail: null
	},
	project_name: null,
	pt_name: null,
//	constructor: function (configs) {
//		this.callParent(arguments);
//		var me = this;
//		this.myConfig = new Erems.library.box.Config({
//			_controllerName: me.controllerName
//		});
//
//		me.cbf = new Erems.template.ComboBoxFields();
//	},
	init: function (application) {
		var me = this;
//		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
		this.control({
			'monitoringkomisireportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'monitoringkomisireportformdata': {
				afterrender: this.formDataAfterRender
			},
			'monitoringkomisireportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'monitoringkomisireportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'monitoringkomisireportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			},
			'monitoringkomisireportformdata button[action=reset]': {
				click: this.dataReset
			},
			'monitoringkomisireportformdata [name=cbf_cluster_id]': {
				change: me.checkboxChange
			},
			'monitoringkomisireportformdata [name=cluster_id]': {
				select: me.comboboxChange
			},
			'monitoringkomisireportformdata [name=cbf_citraclub_id]': {
				change: me.checkboxChange
			},
			'monitoringkomisireportformdata [name=citraclub_id]': {
				select: me.comboboxChange
			},
			'monitoringkomisireportformdata [name=cbf_salesman_id]': {
				change: me.checkboxChange
			},
			'monitoringkomisireportformdata [name=salesman_id]': {
				select: me.comboboxChange
			},
			'monitoringkomisireportformdata [name=cbf_periodesppjb_id]': {
				change: me.checkboxChangePeriodeSppjb
			},
			'monitoringkomisireportformdata [name=sppjb_startdate]': {
				change: me.comboboxChangeStartSppjb
			},
			'monitoringkomisireportformdata [name=sppjb_enddate]': {
				change: me.comboboxChange
			},
			'monitoringkomisireportformdata [name=cbf_periodeakad_id]': {
				change: me.checkboxChangePeriodeAkad
			},
			'monitoringkomisireportformdata [name=akad_startdate]': {
				change: me.comboboxChangeStartAkad
			},
			'monitoringkomisireportformdata [name=akad_enddate]': {
				change: me.comboboxChange
			},

			'monitoringkomisireportformdata [name=cbf_input_periodesppjb]': {
				change: me.checkboxChangeInputPeriodeSppjb
			},
			'monitoringkomisireportformdata [name=input_sppjb_startdate]': {
				change: me.comboboxChangeInputStartSppjb
			},
			'monitoringkomisireportformdata [name=input_sppjb_enddate]': {
				change: me.comboboxChange
			},
			'monitoringkomisireportformdata [name=cbf_input_periodeakad]': {
				change: me.checkboxChangeInputPeriodeAkad
			},
			'monitoringkomisireportformdata [name=input_akad_startdate]': {
				change: me.comboboxChangeInputStartAkad
			},
			'monitoringkomisireportformdata [name=input_akad_enddate]': {
				change: me.comboboxChange
			},
			'monitoringkomisireportformdata [name=cbf_sudah_komisi]': {
				change: me.checkboxChangeSudahKomisi
			},
			'monitoringkomisireportformdata [name=sudah_komisi]': {
				change: me.comboboxChangeSudahKomisi
			},
			'monitoringkomisireportformdata [name=cbf_sudah_reward_customer]': {
				change: me.checkboxChangeSudahRewardCustomer
			},
			'monitoringkomisireportformdata [name=sudah_reward_customer]': {
				change: me.comboboxChangeSudahRewardCustomer
			},
			'monitoringkomisireportformdata [name=cbf_sudah_reward_tambahan]': {
				change: me.checkboxChangeSudahRewardTambahan
			},
			'monitoringkomisireportformdata [name=sudah_reward_tambahan]': {
				change: me.comboboxChangeSudahRewardTambahan
			},
			'monitoringkomisireportformdata [name=cbf_sudah_reward_sales]': {
				change: me.checkboxChangeSudahRewardSales
			},
			'monitoringkomisireportformdata [name=sudah_reward_sales]': {
				change: me.comboboxChangeSudahRewardSales
			},
			'monitoringkomisireportformdata [name=cbf_sudah_bgb]': {
				change: me.checkboxChangeSudahBGB
			},
			'monitoringkomisireportformdata [name=sudah_bgb]': {
				change: me.comboboxChangeSudahBGB
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
			var reportFile = "monitoringkomisi";

			params["cluster_id"] = me.getFormdata().down("[name=cluster_id]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
			if (cbf_checked1 == '1' || !params["cluster_id"]) {
				params["cluster_display"] = 'ALL';
			} else {
				params["cluster_display"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
			}

			params["citraclub_id"] = me.getFormdata().down("[name=citraclub_id]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_citraclub_id]").getValue();
			if (cbf_checked1 == '1' || !params["citraclub_id"]) {
				params["citraclub_display"] = 'ALL';
			} else {
				params["citraclub_display"] = me.getFormdata().down("[name=citraclub_id]").getRawValue();
			}

			params["salesman_id"] = me.getFormdata().down("[name=salesman_id]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_salesman_id]").getValue();
			if (cbf_checked1 == '1' || !params["salesman_id"]) {
				params["salesman_display"] = 'ALL';
			} else {
				params["salesman_display"] = me.getFormdata().down("[name=salesman_id]").getRawValue();
			}

			var tglSppjbStart = me.getFormdata().down("[name=sppjb_startdate]").getValue();
			var tglSppjbEnd = me.getFormdata().down("[name=sppjb_enddate]").getValue();

			if (tglSppjbStart) {
				var startDate = new Date(tglSppjbStart);
				params["sppjb_startdate_display"] = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
				params["sppjb_param_startdate"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
			} else {
				params["sppjb_startdate_display"] = 'ALL';
				params["sppjb_param_startdate"] = null;
			}

			if (tglSppjbEnd) {
				var endDate = new Date(tglSppjbEnd);
				params["sppjb_enddate_display"] = endDate.getDate() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getFullYear();
				params["sppjb_param_enddate"] = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate(); //for sql query
			} else {
				params["sppjb_enddate_display"] = 'ALL';
				params["sppjb_param_enddate"] = null;
			}

			var tglAkadStart = me.getFormdata().down("[name=akad_startdate]").getValue();
			var tglAkadEnd = me.getFormdata().down("[name=akad_enddate]").getValue();

			if (tglAkadStart) {
				var startDate = new Date(tglAkadStart);
				params["akad_startdate_display"] = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
				params["akad_param_startdate"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
			} else {
				params["akad_startdate_display"] = 'ALL';
				params["akad_param_startdate"] = null;
			}

			if (tglAkadEnd) {
				var endDate = new Date(tglAkadEnd);
				params["akad_enddate_display"] = endDate.getDate() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getFullYear();
				params["akad_param_enddate"] = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate(); //for sql query
			} else {
				params["akad_enddate_display"] = 'ALL';
				params["akad_param_enddate"] = null;
			}

			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;

			var tglInputSppjbStart = me.getFormdata().down("[name=input_sppjb_startdate]").getValue();
			var tglInputSppjbEnd = me.getFormdata().down("[name=input_sppjb_enddate]").getValue();

			if (tglInputSppjbStart) {
				var startDate = new Date(tglInputSppjbStart);
				params["input_sppjb_startdate_display"] = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
				params["input_sppjb_param_startdate"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
			} else {
				params["input_sppjb_startdate_display"] = 'ALL';
				params["input_sppjb_param_startdate"] = null;
			}

			if (tglInputSppjbEnd) {
				var endDate = new Date(tglInputSppjbEnd);
				params["input_sppjb_enddate_display"] = endDate.getDate() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getFullYear();
				params["input_sppjb_param_enddate"] = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate(); //for sql query
			} else {
				params["input_sppjb_enddate_display"] = 'ALL';
				params["input_sppjb_param_enddate"] = null;
			}

			var tglInputAkadStart = me.getFormdata().down("[name=input_akad_startdate]").getValue();
			var tglInputAkadEnd = me.getFormdata().down("[name=input_akad_enddate]").getValue();

			if (tglInputAkadStart) {
				var startDate = new Date(tglInputAkadStart);
				params["input_akad_startdate_display"] = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
				params["input_akad_param_startdate"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
			} else {
				params["input_akad_startdate_display"] = 'ALL';
				params["input_akad_param_startdate"] = null;
			}

			if (tglInputAkadEnd) {
				var endDate = new Date(tglInputAkadEnd);
				params["input_akad_enddate_display"] = endDate.getDate() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getFullYear();
				params["input_akad_param_enddate"] = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate(); //for sql query
			} else {
				params["input_akad_enddate_display"] = 'ALL';
				params["input_akad_param_enddate"] = null;
			}

			params["sudah_komisi"] = me.getFormdata().down("[name=sudah_komisi]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_sudah_komisi]").getValue();
			if (cbf_checked1 == '1' || !params["sudah_komisi"]) {
				params["sudah_komisi_display"] = 'ALL';
				params["sudah_komisi"] = '2';
			} else {
				params["sudah_komisi_display"] = me.getFormdata().down("[name=sudah_komisi]").getRawValue();
			}
			params["sudah_reward_customer"] = me.getFormdata().down("[name=sudah_reward_customer]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_sudah_reward_customer]").getValue();
			if (cbf_checked1 == '1' || !params["sudah_reward_customer"]) {
				params["sudah_reward_customer_display"] = 'ALL';
				params["sudah_reward_customer"] = '2';
			} else {
				params["sudah_reward_customer_display"] = me.getFormdata().down("[name=sudah_reward_customer]").getRawValue();
			}
			params["sudah_reward_tambahan"] = me.getFormdata().down("[name=sudah_reward_tambahan]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_sudah_reward_tambahan]").getValue();
			if (cbf_checked1 == '1' || !params["sudah_reward_tambahan"]) {
				params["sudah_reward_tambahan_display"] = 'ALL';
				params["sudah_reward_tambahan"] = '2';
			} else {
				params["sudah_reward_tambahan_display"] = me.getFormdata().down("[name=sudah_reward_tambahan]").getRawValue();
			}
			params["sudah_reward_sales"] = me.getFormdata().down("[name=sudah_reward_sales]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_sudah_reward_sales]").getValue();
			if (cbf_checked1 == '1' || !params["sudah_reward_sales"]) {
				params["sudah_reward_sales_display"] = 'ALL';
				params["sudah_reward_sales"] = '2';
			} else {
				params["sudah_reward_sales_display"] = me.getFormdata().down("[name=sudah_reward_sales]").getRawValue();
			}
			params["sudah_bgb"] = me.getFormdata().down("[name=sudah_bgb]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_sudah_bgb]").getValue();
			if (cbf_checked1 == '1' || !params["sudah_bgb"]) {
				params["sudah_bgb_display"] = 'ALL';
				params["sudah_bgb"] = '2';
			} else {
				params["sudah_bgb_display"] = me.getFormdata().down("[name=sudah_bgb]").getRawValue();
			}

			console.log(params);
			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},

	checkboxChangePeriodeSppjb: function (el) {
		var me = this;
		if (el.getValue()) {
			me.getFormdata().down("[name=sppjb_startdate]").setValue("");
			me.getFormdata().down("[name=sppjb_enddate]").setValue("");
			el.setValue(1);
		}
	},
	checkboxChangePeriodeAkad: function (el) {
		var me = this;
		if (el.getValue()) {
			me.getFormdata().down("[name=akad_startdate]").setValue("");
			me.getFormdata().down("[name=akad_enddate]").setValue("");
			el.setValue(1);
		}
	},
	comboboxChangeStartSppjb: function () {
		var me = this;
		me.getFormdata().down("[name=cbf_periodesppjb_id]").setValue("0");
	},
	comboboxChangeStartAkad: function () {
		var me = this;
		me.getFormdata().down("[name=cbf_periodeakad_id]").setValue("0");
	},

	checkboxChangeInputPeriodeSppjb: function (el) {
		var me = this;
		if (el.getValue()) {
			me.getFormdata().down("[name=input_sppjb_startdate]").setValue("");
			me.getFormdata().down("[name=input_sppjb_enddate]").setValue("");
			el.setValue(1);
		}
	},
	comboboxChangeInputStartSppjb: function () {
		var me = this;
		me.getFormdata().down("[name=cbf_input_periodesppjb]").setValue("0");
	},
	checkboxChangeInputPeriodeAkad: function (el) {
		var me = this;
		if (el.getValue()) {
			me.getFormdata().down("[name=input_akad_startdate]").setValue("");
			me.getFormdata().down("[name=input_akad_enddate]").setValue("");
			el.setValue(1);
		}
	},
	comboboxChangeInputStartAkad: function () {
		var me = this;
		me.getFormdata().down("[name=cbf_input_periodeakad]").setValue("0");
	},
	checkboxChangeSudahKomisi: function (el) {
		var me = this;
		if (el.getValue()) {
			me.getFormdata().down("[name=sudah_komisi]").setValue("");
			el.setValue(1);
		}
	},
	comboboxChangeSudahKomisi: function () {
		var me = this;
		me.getFormdata().down("[name=cbf_sudah_komisi]").setValue("0");
	},
	checkboxChangeSudahRewardCustomer: function (el) {
		var me = this;
		if (el.getValue()) {
			me.getFormdata().down("[name=sudah_reward_customer]").setValue("");
			el.setValue(1);
		}
	},
	comboboxChangeSudahRewardCustomer: function () {
		var me = this;
		me.getFormdata().down("[name=cbf_sudah_reward_customer]").setValue("0");
	},
	checkboxChangeSudahRewardTambahan: function (el) {
		var me = this;
		if (el.getValue()) {
			me.getFormdata().down("[name=sudah_reward_tambahan]").setValue("");
			el.setValue(1);
		}
	},
	comboboxChangeSudahRewardTambahan: function () {
		var me = this;
		me.getFormdata().down("[name=cbf_sudah_reward_tambahan]").setValue("0");
	},
	checkboxChangeSudahRewardSales: function (el) {
		var me = this;
		if (el.getValue()) {
			me.getFormdata().down("[name=sudah_reward_sales]").setValue("");
			el.setValue(1);
		}
	},
	comboboxChangeSudahRewardSales: function () {
		var me = this;
		me.getFormdata().down("[name=cbf_sudah_reward_sales]").setValue("0");
	},
	checkboxChangeSudahBGB: function (el) {
		var me = this;
		if (el.getValue()) {
			me.getFormdata().down("[name=sudah_bgb]").setValue("");
			el.setValue(1);
		}
	},
	comboboxChangeSudahBGB: function () {
		var me = this;
		me.getFormdata().down("[name=cbf_sudah_bgb]").setValue("0");
	},

	panelAfterRender: function (el) {
		var me = this;

		Ext.Ajax.request({
			url: 'erems/monitoringkomisireport/read',
			success: function (response) {
				var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name;
				var cc = info.salesman;
				var optionsx = [];
				for (var i in cc) {
					optionsx.push({employee_name: cc[i]["employee_name"], employee_id: cc[i]["employee_id"]});
				}

				var newStore = Ext.create('Ext.data.Store', {
					fields: ['employee_name', 'employee_id'],
					data: optionsx
				});
				me.getFormdata().down("[name=salesman_id]").bindStore(newStore);
			},
		});
	}

});