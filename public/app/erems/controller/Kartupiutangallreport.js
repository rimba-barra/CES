Ext.define('Erems.controller.Kartupiutangallreport', {
	extend: 'Erems.library.template.controller.Controllerreporttb',
	alias: 'controller.Kartupiutangallreport',
	views: ['kartupiutangallreport.Panel', 'kartupiutangallreport.FormData', 'masterreport.Panel'],
	stores: ['Masterdata.store.Bank', 'Mastercluster'],
	models: ['Masterdata.model.Bank', 'Mastercluster'],
	refs: [
		{
			ref: 'panel',
			selector: 'kartupiutangallreportpanel'
		},
		{
			ref: 'formdata',
			selector: 'kartupiutangallreportformdata'
		}

	],
	controllerName: 'kartupiutangallreport',
	formWidth: 750,
	fieldName: 'name',
	comboBoxIdEl: [],
	bindPrefixName: 'Kartupiutangallreport',
	localStore: {
		detail: null
	},
	project_name: null,
	pt_name: null,
	init: function (application) {
		var me = this;
		this.control({
			'kartupiutangallreportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'kartupiutangallreportformdata': {
				afterrender: this.formDataAfterRender
			},
			'kartupiutangallreportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'kartupiutangallreportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'kartupiutangallreportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			},
			'kartupiutangallreportformdata button[action=reset]': {
				click: this.dataReset
			},
			'kartupiutangallreportformdata [name=cbf_cluster_id]': {
				change: me.checkboxChange2
			},
			'kartupiutangallreportformdata [name=cluster_id]': {
				select: me.comboboxChange
			}
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

		var reportFile = "Kartupiutangall";

		params["cluster_id"] = me.getFormdata().down("[name=cluster_id]").getValue();
		var cbf_checked1 = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
		if (cbf_checked1 == '1' || !params["cluster_id"]) {
			params["cluster_name"] = 'ALL';
		} else {
			params["cluster_name"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
		}

		params["project_id"] = apps.project;
		params["pt_id"] = apps.pt;
//		console.log(params);
		me.exportData(params);
	},

	exportData: function (params) {
		var me = this;
		var cluster_id = params["cluster_id"];
		me.getFormdata().up('window').body.mask('Creating Report, Please Wait...');

		Ext.Ajax.timeout = 600000 * 5;

		Ext.Ajax.request({
			url: 'erems/kartupiutangallreport/export/?action=schema',
			params: {
				// cluster_id: cluster_id.join()
				cluster_id: cluster_id
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
								msg: 'Error: Create Report Kartupiutangall Failed.',
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
						msg: 'Error: Create Report Kartupiutangall Failed.',
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
					msg: 'Error: Create Report Kartupiutangall Failed.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
	},

	panelAfterRender: function (el) {
		var me = this;

		Ext.Ajax.request({
			url: 'erems/kartupiutangallreport/read',
			success: function (response) {
				var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name;
			},
			//params: {mode_read: 'init'}
		});
		//   me.loadReport(el, 'erems/kartupiutangallreport/all');
	},

	checkboxChange2: function (el) {

		if (el.getValue()) {
			el.prev().setValue();
		}
	}

});