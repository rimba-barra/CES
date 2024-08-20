Ext.define('Erems.controller.Prediksikomisireport', {
	extend: 'Erems.library.template.controller.Controllerreporttb',
	alias: 'controller.Prediksikomisireport',
	views: ['prediksikomisireport.Panel', 'prediksikomisireport.FormData', 'masterreport.Panel'],
	requires: [
		'Erems.library.template.component.Clustercombobox'
	],
	stores: ['Mastercluster'],
	refs: [
		{
			ref: 'panel',
			selector: 'prediksikomisireportpanel'
		},
		{
			ref: 'formdata',
			selector: 'prediksikomisireportformdata'
		}

	],
	controllerName: 'prediksikomisireport',
	formWidth: 750,
	fieldName: 'name',
	comboBoxIdEl: [],
	bindPrefixName: 'prediksikomisireport',
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
			'prediksikomisireportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'prediksikomisireportformdata': {
				afterrender: this.formDataAfterRender
			},
			'prediksikomisireportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			},
			'prediksikomisireportformdata button[action=reset]': {
				click: this.dataReset
			},
			'prediksikomisireportformdata [name=cbf_cluster_id]': {
				change: me.checkboxChange
			},
			'prediksikomisireportformdata [name=cluster_id]': {
				select: me.comboboxChange
			}
		});
	},

	processReport: function () {
		var me = this;

		var params = me.getFormdata().getForm().getFieldValues();

		var dateNow = new Date();
		var tglStart = me.getFormdata().down("[name=period_cut_off]").getValue();
		var startDate = new Date(tglStart);

		params["period_cut_off"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
		params["cluster_id"] = me.getFormdata().down("[name=cluster_id]").getValue();
		var cbf_checked1 = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
		if (cbf_checked1 == '1' || !params["cluster_id"]) {
			params["cluster_display"] = 'ALL';
		} else {
			params["cluster_display"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
		}

		me.exportData(params);
	},

	exportData: function (params) {
		var me = this;

		me.getFormdata().up('window').body.mask('Creating Report, Please Wait...');

		Ext.Ajax.timeout = 60000 * 30;

		Ext.Ajax.request({
			url: 'erems/prediksikomisireport/export/?action=schema',
			params: {
				period_cut_off: params["period_cut_off"],
				cluster_id: params["cluster_id"]
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
								msg: 'Error: Create Report Prediksi Komisi Failed.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					}
				} catch (e) {
					me.getFormdata().up('window').body.unmask();
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Create Report Prediksi Komisi Failed.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			},
			failure: function (e) {
				me.getFormdata().up('window').body.unmask();
				Ext.Msg.show({
					title: 'Failure',
					msg: 'Error: Create Report Prediksi Komisi Failed.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
	},

});