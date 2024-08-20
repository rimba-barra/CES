Ext.define('Erems.controller.Cancelreport', {
	alias: 'controller.Cancelreport',
	extend: 'Erems.library.template.controller.Controllerreporttb',
	views: ['cancelreport.Panel', 'cancelreport.FormData', 'masterreport.Panel'],
	requires: [
		'Erems.library.template.component.Typecombobox',
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Productcategorycombobox',
		'Erems.library.template.component.Cancelreasoncombobox',
		'Erems.library.template.component.Projectptcombobox',
		'Erems.library.template.component.Buildingclasscombobox'
	],
	stores: ['Mastercluster', 'Mastertype', 'Mastercancelreason', 'Masterproductcategory','Masterdata.store.Projectpt'],
	refs: [
		{
			ref: 'panel',
			selector: 'cancelreportpanel'
		},
		{
			ref: 'formdata',
			selector: 'cancelreportformdata'
		}

	],
	xyReport: null,
	printOutData: null,
	myConfig: null,
	project_name: null,
	pt_name: null,
	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		me.cbf = new Erems.template.ComboBoxFields();
	},
	controllerName: 'cancelreport',
	bindPrefixName: 'Cancelreport',
	init: function (application) {
		var me = this;

		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});

		this.control({
			'cancelreportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'cancelreportformdata': {
				afterrender: this.formDataAfterRender
			},
			'cancelreportformdata button[action=reset]': {
				click: this.dataReset
			},
			'cancelreportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'cancelreportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'cancelreportformdata button[action=process]': {
				click: function () {
					me.mainPrint();
				}
			},
			'cancelreportformdata [name=cbf_buildingclass]': {
				change: me.checkboxChange
			},
			'cancelreportformdata [name=buildingclass]': {
				select: me.comboboxChange
			},
			'cancelreportformdata [name=cbf_cluster_id]': {
				change: me.checkboxChange
			},
			'cancelreportformdata [name=cluster_id]': {
				select: me.comboboxChange
			},
			'cancelreportformdata [name=cbf_type_id]': {
				change: me.checkboxChange
			},
			'cancelreportformdata [name=type_id]': {
				select: me.comboboxChange
			},
			'cancelreportformdata [name=cbf_cancelreason_id]': {
				change: me.checkboxChange
			},
			'cancelreportformdata [name=cancelreason_id]': {
				select: me.comboboxChange
			},
			'cancelreportformdata [name=cbf_productcategory_id]': {
				change: me.checkboxChange
			},
			'cancelreportformdata [name=productcategory_id]': {
				select: me.comboboxChange
			},
			'cancelreportformdata [name=cbf_pt_id]': {
				change: me.checkboxChange
			},
			'cancelreportformdata [name=pt_id]': {
				select: me.comboboxChange
			},
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
				me.project_name = data['others'][0][0]['DATA']['project_name'];
				me.pt_name = data['others'][0][0]['DATA']['pt_name'];
//				data['others'][]
				// global params
				//  me.globalParams = data['others'][0][0]['GLOBALPARAMSPARAMS'];

				// me.fillFormSearchComponents(data, me.getFormsearch());
				p.setLoading(false);
			}
		}).read('init');

		var storepp = configs.down('[name=pt_id]').getStore();
		storepp.clearFilter(true);
		storepp.filter({
			property: 'project_id',
			value: apps.project,
			exactMatch: true,
			caseSensitive: true
		});

	},
	checkboxChange: function (el) {
		name = el.name;
		name1 = name.substr(4);
		var me = this;
		if (el.getValue()) {
			me.getFormdata().down("[name=" + name1 + "]").setValue("");
			el.setValue(1);
		}
	},

	comboboxChange: function (el) {
		var me = this;
		me.getFormdata().down("[name=cbf_" + el.name + "]").setValue("0");
	},

	/*@implement this method for xyReport Class*/
	xyReportProcessParams: function (reportData) {
		var me = this;
		var groupBy = reportData.params["Groupby"];
		var fn = "SalesCancellation";
		var plId = 0;

		reportData['file'] = fn;
		reportData.params = me.printOutData;
		return reportData;
	},
	mainPrint: function () {
		var me = this;
		var winId = 'myReportWindow';
		me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		var win = desktop.getWindow(winId);

		if (win) {
//			var params = me.getFormdata().getForm().getFieldValues();
			var params = me.getFormdata().getValues();
			params["project_id"] = apps.project;
			params["Project"] = me.project_name;
			// params["pt_id"] = apps.pt;
			// params["Pt"] = me.pt_name;

			// added by rico 15022022
			params["pt_id"] = me.getFormdata().down("[name=pt_id]").getValue();
			var cbf_pt_id = me.getFormdata().down("[name=cbf_pt_id]").getValue();
			if (cbf_pt_id == '1' || !params["pt_id"]) {
				params["Pt"] = 'ALL';
			} else {
				params["Pt"] = me.getFormdata().down("[name=pt_id]").getRawValue();
			}

			var cbf_checked = me.getFormdata().down("[name=cbf_buildingclass]").getValue();
			if (cbf_checked == '1' || !params["buildingclass"]) {
				params["Building_class"] = 'ALL';
			} else {
				params["Building_class"] = me.getFormdata().down("[name=buildingclass]").getRawValue();
			}

			var cbf_checked = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
			if (cbf_checked == '1' || !params["cluster_id"]) {
				params["Cluster"] = 'ALL';
			} else {
				params["Cluster"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
			}

			var cbf_checked = me.getFormdata().down("[name=cbf_type_id]").getValue();
			if (cbf_checked == '1' || !params["type_id"]) {
				params["Type"] = 'ALL';
			} else {
				params["Type"] = me.getFormdata().down("[name=type_id]").getRawValue();
			}

			var cbf_checked = me.getFormdata().down("[name=cbf_productcategory_id]").getValue();
			if (cbf_checked == '1' || !params["productcategory_id"]) {
				params["Product_category"] = 'ALL';
			} else {
				params["Product_category"] = me.getFormdata().down("[name=productcategory_id]").getRawValue();
			}

			// added by rico 08082023
			params["radio_sort_by"] = me.getFormdata().down("[name=radiogroup_sort_by]").getValue().radio_sort_by;
			if(params["radio_sort_by"] == 'cancellation_date'){
				params["sort_by_display"] = 'Cancellation Date'
			} else if(params["radio_sort_by"] == 'unit_number'){
				params["sort_by_display"] = 'Unit Number'
			}

			var reportFile = "SalesCancellation";
			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},

	generateFakeForm2: function (paramList, reportFile) {
		//var form = '<form id="fakeReportFormID" action=resources/stimulsoftjs/viewer.php?reportfilelocation='+reportFile+'.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		var form = '<form id="fakeReportFormID" action=resources/stimulsoftjsv2/viewer.php?reportfilelocation=' + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		for (var x in paramList) {
			if (paramList[x] === null) {
				paramList[x] = '';
			}
			form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
		}
		form += '<input type="submit" value="post"></form>';
		form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
		return form;
	},
//	mainPrint: function () {
//		var me = this;
//		if (!me.xyReport) {
//			me.xyReport = new Erems.library.XyReport();
//			me.xyReport.init(me);
//		}
//
//		var p = me.getPanel();
//		p.setLoading("Please wait...");
//		me.tools.ajax({
//			params: me.getFormdata().getValues(),
//			success: function (data, model) {
//				p.setLoading(false);
//				console.log(data);
//				me.printOutData = data['others'][0][0]['DATA'];
//				me.xyReport.processReport();
//			}
//		}).read('printout');
//	},
});