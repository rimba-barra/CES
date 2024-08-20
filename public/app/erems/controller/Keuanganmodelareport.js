Ext.define('Erems.controller.Keuanganmodelareport', {
	extend: 'Erems.library.template.controller.Controllerreporttb',
	alias: 'controller.Keuanganmodelareport',
	requires: [
		'Erems.library.template.component.Projectptcombobox'
	],
	stores: ['Masterdata.store.Projectpt'],
	models: ['Masterdata.model.Projectpt'],
	views: ['keuanganmodelareport.Panel', 'keuanganmodelareport.FormData', 'masterreport.Panel'],
	refs: [
		{
			ref: 'panel',
			selector: 'keuanganmodelareportpanel'
		},
		{
			ref: 'formdata',
			selector: 'keuanganmodelareportformdata'
		}

	],
	controllerName: 'keuanganmodelareport',
	formWidth: 750,
	fieldName: 'name',
	comboBoxIdEl: [],
	bindPrefixName: 'Keuanganmodelareport',
	localStore: {
		detail: null
	},
	project_name: null,
	pt_name: null,
	pt_address: null,
	pt_phone: null,
	init: function (application) {
		var me = this;
		this.control({
			'keuanganmodelareportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'keuanganmodelareportformdata': {
				afterrender: this.formDataAfterRender
			},
			'keuanganmodelareportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'keuanganmodelareportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'keuanganmodelareportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			},
			'keuanganmodelareportformdata button[action=reset]': {
				click: this.dataReset
			},
			'keuanganmodelareportformdata [name=radiogroup_version]': {
				change: function (el) {
					me.getFormdata().down("#conReportType").hide();
					if (el.getValue().version == 1) {
						me.getFormdata().down("#conReportType").show();
					}
				}
			},
			'keuanganmodelareportformdata [name=cbf_pt_id]': {
				change: me.checkboxChange
			},
			'keuanganmodelareportformdata [name=pt_id]': {
				select: me.comboboxChange
			},
		});
	},
	processReport: function () {
		var me = this;
		/*var winId = 'myReportWindow';
		 me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		 var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
		 var win = desktop.getWindow(winId);*/

		//if (win) {
		var params = me.getFormdata().getForm().getFieldValues();

		var dateNow = new Date();

		var tglStart = me.getFormdata().down("[name=purchase_startdate]").getValue();
		if (tglStart) {
			var startDate = new Date(tglStart);
			params["purchase_startdate_display"] = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
			params["purchase_startdate"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
		} else {
			params["purchase_startdate_display"] = 'ALL';
			params["purchase_startdate"] = null;
		}

		//header
		params["project_name"] = me.project_name;
		params["pt_name"] = me.pt_name;
		params["tgl_sekarang"] = dateNow.getDate() + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getFullYear();
		params["time_sekarang"] = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();

		params["pt_id"] = me.getFormdata().down("[name=pt_id]").getValue();
		var cbf_checked = me.getFormdata().down("[name=cbf_pt_id]").getValue();
		if (cbf_checked == '1' || !params["pt_id"]) {
			params["pt_display"] = 'ALL';
		} else {
			params["pt_display"] = me.getFormdata().down("[name=pt_id]").getRawValue();
		}
		params["project_id"] = apps.project;

		//var html = me.generateFakeForm(params,reportFile);
		//win.down("#MyReportPanel").body.setHTML(html);
		//$("#fakeReportFormID").submit();

		me.exportData(params);

		//}
	},

	exportData: function (params) {
		var me = this;

		me.getFormdata().up('window').body.mask('Creating Report, Please Wait...');

		Ext.Ajax.timeout = 60000 * 30;

		Ext.Ajax.request({
			url: 'erems/keuanganmodelareport/read/?action=schema',
			params: {
				read_type_mode: 'export_excel',
				purchase_startdate: params["purchase_startdate"],
				status: params['status'],
				version: params['version'],
				pt_id: params['pt_id'],
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
								msg: 'Data Not Found.',
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
						msg: 'Error: Create Report Keuangan Model 1 Failed.',
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
					msg: 'Error: Create Report Keuangan Model 1 Failed.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
	},

	panelAfterRender: function (el) {
		var me = this;

		Ext.Ajax.request({
			url: 'erems/keuanganmodelareport/read',
			success: function (response) {
				var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name;
			},
			//params: {mode_read: 'init'}
		});
		//   me.loadReport(el, 'erems/keuanganmodelareport/all');

		var storepp = el.down('[name=pt_id]').getStore();
		storepp.clearFilter(true);
		storepp.filter({
			property: 'project_id',
			value: apps.project,
			exactMatch: true,
			caseSensitive: true
		});
	},

});