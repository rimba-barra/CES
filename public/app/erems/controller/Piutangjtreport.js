Ext.define('Erems.controller.Piutangjtreport', {
	extend: 'Erems.library.template.controller.Controller2',
	requires: ['Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.XyReport'],
	alias: 'controller.Piutangjtreport',
	views: ['piutangjtreport.Panel', 'piutangjtreport.FormData', 'masterreport.Panel'],
	refs: [
		{
			ref: 'panel',
			selector: 'piutangjtreportpanel'
		},
		{
			ref: 'formdata',
			selector: 'piutangjtreportformdata'
		}

	],
	controllerName: 'piutangjtreport',
	bindPrefixName: 'Piutangjtreport',
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
			'piutangjtreportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'piutangjtreportformdata': {
				afterrender: this.formDataAfterRender
			},
			'piutangjtreportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'piutangjtreportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'piutangjtreportformdata button[action=process]': {
				click: function () {
					me.mainPrint();
				}
			},
			'piutangjtreportformdata [name=cbf_buildingclass]': {
				change: function (checkbox, newVal, oldVal) {
//					console.log(newVal);
//					console.log(oldVal);
					if (newVal) {
						me.getFormdata().down("[name=buildingclass]").setValue("");
					} else {
						me.tools.comboHelper(me.getFormdata().down("[name=buildingclass]")).setFirstValue();

					}
				}
			},
			'piutangjtreportformdata [name=buildingclass]': {
				select: function () {
					me.getFormdata().down("[name=cbf_buildingclass]").setValue(false);

				}
			},
			//
			//




		});
	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);
		var me = this;
		var p = me.getPanel();
		p.setLoading("Please wait");
		me.tools.ajax({
			params: {},
			success: function (data, model) {
				// global params
				//  me.globalParams = data['others'][0][0]['GLOBALPARAMSPARAMS'];

				var form = me.getFormdata();

				p.setLoading(false);
			}
		}).read('init');

	},
	/*@implement this method for xyReport Class*/
	xyReportProcessParams: function (reportData) {
		var me = this;
		var groupBy = reportData.params["Groupby"];
		var fn = "PiutangJatuhTempo";


		reportData['file'] = fn;
		reportData.params = me.printOutData;
		reportData.params['show_only'] = me.getFormdata().down('[name=cbf_show]').getValue();
//		console.log(reportData);
		return reportData;
	},
	mainPrint: function () {
		var me = this;
		if (!me.xyReport) {
			me.xyReport = new Erems.library.XyReport();
			me.xyReport.init(me);
		}
//		console.log(me.getFormdata().getValues());
		var vs = me.getFormdata().getValues();
		vs["buildingclass_name"] = vs["buildingclass"];
		if (typeof vs.buildingclass === "undefined") {
			vs["buildingclass"] = "";
			vs["buildingclass_name"] = "ALL";
		}

		//added by Tirtha on 14-07-2017
//		console.log(vs.bot_date);
//		console.log(vs.top_date);
		var gotdate1 = vs.bot_date;
		var gotdate2 = vs.top_date;
		var year1 = gotdate1.substr(0, 4),
				month1 = gotdate1.substr(5, 2),
				year2 = gotdate2.substr(0, 4),
				month2 = gotdate2.substr(5, 2);

		if (year1 != year2 || month1 != month2) {
			Ext.Msg.show({
				title: 'Warning',
				msg: 'Bulan dan Tahun harus dalam periode yang sama',
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK
			});
			return false;
		}
		//end added

		var p = me.getPanel();
		p.setLoading("Please wait...");
		me.tools.ajax({
			params: vs,
			success: function (data, model) {
				p.setLoading(false);
				console.log(data);
				me.printOutData = data['others'][0][0]['DATA'];

				var f = me.getFormdata();
//				console.log(me.printOutData);
				me.xyReport.processReport();
				//me.xyReport.processReportjs();

			}
		}).read('printout');



	},
});