Ext.define('Erems.controller.Penjualanpersalesreport', {
	extend: 'Erems.library.template.controller.Controller2',
	alias: 'controller.Penjualanpersalesreport',
	views: ['penjualanpersalesreport.Panel', 'penjualanpersalesreport.FormData', 'masterreport.Panel'],
	required:[
		'Erems.library.box.tools.Tools','Erems.template.ComboBoxFields'
	],
	refs: [
		{
			ref: 'panel',
			selector: 'penjualanpersalesreportpanel'
		},
		{
			ref: 'formdata',
			selector: 'penjualanpersalesreportformdata'
		}

	],
	controllerName: 'penjualanpersalesreport',
	bindPrefixName: 'Penjualanpersalesreport',
	xyReport: null,
	printOutData: null,
	myConfig: null,
	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		me.cbf = new Erems.template.ComboBoxFields();
	},
	init: function (application) {
		var me = this;
		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
		this.control({
			'penjualanpersalesreportpanel': {
				beforerender: me.mainPanelBeforeRender
			},
			'penjualanpersalesreportformdata': {
				afterrender: this.formDataAfterRender
			},
			'penjualanpersalesreportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'penjualanpersalesreportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'penjualanpersalesreportformdata button[action=processexcel]': {
				click: function () {
					me.printExcel();
				}
			},
			'penjualanpersalesreportformdata button[action=reset]': {
				click: function () {
					me.getFormdata().getForm().reset();
				}
			},
			'penjualanpersalesreportformdata [name=cbf_salesgroup]': {
				change: me.checkboxChangeSalesGroup
			},
			'penjualanpersalesreportformdata [name=salesgroup_id]': {
				change: me.changeSalesGroup
			},
			'penjualanpersalesreportformdata [name=cbf_periode_id]': {
				change: me.checkboxChangePeriode
			},
			'penjualanpersalesreportformdata [name=periode_startdate]': {
				change: me.changeDate
			},
			'penjualanpersalesreportformdata [name=periode_enddate]': {
				change: me.changeDate
			},
			'penjualanpersalesreportformdata [name=cbf_employee_id]': {
				change: me.checkboxChangeSales
			},
			'penjualanpersalesreportformdata [name=employee_id]': {
				change: me.changeSales
			}
		});
	},
	formDataAfterRender: function (el) {
		var me = this;
		var f = me.getFormdata();
		var state = el.up('window').state;
		console.log("[WINDOW STATE] " + state);
		me.fdar().init();

		if (state == 'create') {
			me.fdar().create();
		} else if (state == 'update') {
			me.fdar().update();
		}

		me.tools.ajax({
			params: {
				// purchaseletter_id: plId
			},
			success: function (data, model) {
				me.tools.wesea(data.salesman, f.down("[name=employee_id]")).comboBox();
			}
		}).read('salesman');
	},
	checkboxChangeSalesGroup: function (el) {
		var me = this;
		if (el.getValue()) {
			me.getFormdata().down("[name=salesgroup_id]").setValue("");
			el.setValue(1);
		}
	},
	changeSalesGroup: function () {
		var me = this;
		me.getFormdata().down("[name=cbf_salesgroup]").setValue("0");
	},
	checkboxChangeSales: function (el) {
		var me = this;
		if (el.getValue()) {
			me.getFormdata().down("[name=employee_id]").setValue("");
			el.setValue(1);
		}
	},
	changeSales: function () {
		var me = this;
		me.getFormdata().down("[name=cbf_employee_id]").setValue("0");
	},
	checkboxChangePeriode: function (el) {
		var me = this;
		if (el.getValue()) {
			me.getFormdata().down("[name=periode_startdate]").setValue("");
			me.getFormdata().down("[name=periode_enddate]").setValue("");
			el.setValue(1);
		}
	},
	changeDate: function () {
		var me = this;
		me.getFormdata().down("[name=cbf_periode_id]").setValue("0");
	},
	printExcel: function () {

		var me = this;
		var p = me.getPanel();
		p.setLoading("Please wait");
		var f = me.getFormdata();
		var vs = f.getValues();


		Ext.Ajax.timeout = 60000 * 5;


		var tipeReport = "excel";


		me.tools.ajax({
			params: vs,
			success: function (data, model) {


				p.setLoading(false);
				var url = data['others'][0][0]['URL'];
				if (url) {
					Ext.Msg.show({
						title: 'Info',
						msg: '<a href="' + url + '" target="blank">Download file</a>',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {

						}
					});
				}
			}
		}).read(tipeReport);

	},

	/*@implement this method for xyReport Class*/
	xyReportProcessParams: function (reportData) {
		var me = this;
		var groupBy = reportData.params["Groupby"];
		var fn = "GeneralSales";
		var plId = 0;
		var f = me.getFormdata();
		var gb = f.down("#groupBy").getValue().Groupby;
		if (gb === 'club citra') {
			fn = "GeneralSalesClubCitra"
		} else if (gb === "cara bayar") {
			fn = "GeneralSalesCaraBayar"
		} else {
			fn = "GeneralSales"
		}

		reportData['file'] = fn;
		reportData.params = me.printOutData;
		return reportData;
	},

});