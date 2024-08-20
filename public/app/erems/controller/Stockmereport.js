Ext.define('Erems.controller.Stockmereport', {
	extend: 'Erems.library.template.controller.Controllerreporttb',
	alias: 'controller.Stockmereport',
	views: ['stockmereport.Panel', 'stockmereport.FormData', 'masterreport.Panel'],
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Projectptcombobox',
	],
	stores: ['Masterdata.store.Projectpt', 'Masterdata.store.Bank', 'Mastercluster'],
	models: ['Masterdata.model.Bank', 'Mastercluster'],
	refs: [
		{
			ref: 'panel',
			selector: 'stockmereportpanel'
		},
		{
			ref: 'formdata',
			selector: 'stockmereportformdata'
		}

	],
	controllerName: 'stockmereport',
	formWidth: 750,
	fieldName: 'name',
	comboBoxIdEl: [],
	bindPrefixName: 'Stockmereport',
	localStore: {
		detail: null
	},
	project_name: null,
	pt_name: null,
	init: function (application) {
		var me = this;
		this.control({
			'stockmereportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'stockmereportformdata': {
				afterrender: this.formDataAfterRender
			},
			'stockmereportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'stockmereportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'stockmereportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			},
			'stockmereportformdata button[action=reset]': {
				click: this.dataReset
			},
			'stockmereportformdata [name=cbf_cluster_id]': {
				change: me.checkboxChange2
			},
			'stockmereportformdata [name=cluster_id]': {
				select: me.comboboxChange
			},
			'stockmereportformdata [name=cbf_pt_id]': {
				change: me.checkboxChange
			},
			'stockmereportformdata [name=pt_id]': {
				select: me.comboboxChange
			},
		});
	},

	processReport: function () {
		var me = this;

		var params = me.getFormdata().getForm().getFieldValues();

		var dateNow = new Date();

		//header
		params["project_name"] = me.project_name;
		params["pt_name"] = me.pt_name;
		params["tgl_sekarang"] = dateNow.getDate() + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getFullYear();
		params["time_sekarang"] = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
		var tglStart = me.getFormdata().down("[name=start_date]").getValue();
		if (tglStart) {
			var startDate = new Date(tglStart);
			params["start_date_display"] = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
			params["start_date"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
		} else {
			params["start_date_display"] = 'ALL';
			params["start_date"] = null;
		}

		var tglEnd = me.getFormdata().down("[name=end_date]").getValue();
		if (tglEnd) {
			var endDate = new Date(tglEnd);
			params["end_date_display"] = endDate.getDate() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getFullYear();
			params["end_date"] = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate(); //for sql query
		} else {
			params["end_date_display"] = 'ALL';
			params["end_date"] = null;
		}

		var reportFile = "Stockme";

		params["cluster_id"] = me.getFormdata().down("[name=cluster_id]").getValue();
		var cbf_checked1 = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
		if (cbf_checked1 == '1' || !params["cluster_id"]) {
			params["cluster_name"] = 'ALL';
		} else {
			params["cluster_name"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
		}

		params["pt_id"] = me.getFormdata().down("[name=pt_id]").getValue();
		var cbf_pt_id = me.getFormdata().down("[name=cbf_pt_id]").getValue();
		if (cbf_pt_id == '1' || !params["pt_id"]) {
			params["pt_name"] = 'ALL';
		} else {
			params["pt_name"] = me.getFormdata().down("[name=pt_id]").getRawValue();
		}

		params["project_id"] = apps.project;
		// params["pt_id"] = apps.pt;
//		console.log(params);
		var cbf_excel = me.getFormdata().down("[name=cbf_excel]").getValue();
		if (cbf_excel == '1') {
			me.exportData(params);
			//console.log('excel');
		} else {
			var winId = 'myReportWindow';
			me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
			var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
			var win = desktop.getWindow(winId);

			if (win) {
				var html = me.generateFakeForm2(params, reportFile);
				win.down("#MyReportPanel").body.setHTML(html);
				$("#fakeReportFormID").submit();
			}
		}
	},

	exportData: function (params) {
		var me = this;
		var cluster_id = params["cluster_id"];
		me.getFormdata().up('window').body.mask('Creating Report, Please Wait...');

		Ext.Ajax.timeout = 60000 * 30;

		Ext.Ajax.request({
			url: 'erems/stockmereport/export/?action=schema',
			params: {
				cluster_id: cluster_id.join(),
				pt_id: params['pt_id'],
				start_date: params['start_date'],
				end_date: params['end_date'],
			},
			success: function (response) {
				try {
					var resp = response.responseText;

					if (resp) {
						var info = Ext.JSON.decode(resp);

						if (info.success == true) {
							me.getFormdata().up('window').body.unmask();
							Ext.Msg.show({
								title: 'Info',
								msg: '<a href="' + info.url + '" target="blank">Click Here For Download Report File</a>',
								icon: Ext.Msg.INFO,
								//buttons: [], //jika ingin tidak ada buttons
								buttons: Ext.Msg.CANCEL,
								buttonText:
										{
											cancel: 'Close',
										}
							});
						} else {
							me.getFormdata().up('window').body.unmask();
							Ext.Msg.show({
								title: 'Failure',
								msg: 'Error: Create Report Stockme Failed. 1',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					}
				} catch (e) {
					//console.error(e);
					me.getFormdata().up('window').body.unmask();
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Create Report Stockme Failed. 2',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			},
			failure: function (e) {
				//console.error(e);
				me.getFormdata().up('window').body.unmask();
				Ext.Msg.show({
					title: 'Failure',
					msg: 'Error: Create Report Stockme Failed. 3',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
	},

	panelAfterRender: function (el) {
		var me = this;

		Ext.Ajax.request({
			url: 'erems/stockmereport/read',
			success: function (response) {
				var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name;
			},
			//params: {mode_read: 'init'}
		});
		//   me.loadReport(el, 'erems/stockmereport/all');

		var storepp = el.down('[name=pt_id]').getStore();
		storepp.clearFilter(true);
		storepp.filter({
			property: 'project_id',
			value: apps.project,
			exactMatch: true,
			caseSensitive: true
		});
	},

	checkboxChange2: function (el) {

		if (el.getValue()) {
			el.prev().setValue();
		}
	}

});