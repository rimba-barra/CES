Ext.define('Erems.controller.Penerimaancollectionreport', {
	extend   : 'Erems.library.template.controller.Controllerreporttb',
	alias    : 'controller.Penerimaancollectionreport',
	views    : ['penerimaancollectionreport.Panel', 'penerimaancollectionreport.FormData', 'masterreport.Panel'],
	requires : [
		'Erems.library.template.component.Clustercombobox'
	],
	stores : ['Mastercluster'],
	refs   : [
		{
			ref      : 'panel',
			selector : 'penerimaancollectionreportpanel'
		},
		{
			ref      : 'formdata',
			selector : 'penerimaancollectionreportformdata'
		}

	],
	controllerName : 'penerimaancollectionreport',
	formWidth      : 750,
	fieldName      : 'name',
	comboBoxIdEl   : [],
	bindPrefixName : 'penerimaancollectionreport',
	localStore     : {
		detail : null
	},
	project_name : null,
	pt_name      : null,
	pt_address   : null,
	pt_phone     : null,
	init         : function (application) {
		var me = this;
		this.control({
			'penerimaancollectionreportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'penerimaancollectionreportformdata': {
				afterrender: this.formDataAfterRender
			},
			'penerimaancollectionreportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			},
			'penerimaancollectionreportformdata button[action=reset]': {
				click: this.dataReset
			},
			'penerimaancollectionreportformdata [name=cbf_cluster_id]': {
				change: me.checkboxChange
			},
			'penerimaancollectionreportformdata [name=cluster_id]': {
				select: me.comboboxChange
			},
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

		params["radio_salestype"] = me.getFormdata().down("[name=radiogroup_salestype]").getValue().radio_salestype; // added by rico 29052023
		params["radio_filterdate"] = me.getFormdata().down("[name=radiogroup_filterdate]").getValue().radio_filterdate; // added by rico 03082023

		params["radio_filtertype"] = me.getFormdata().down("[name=radiogroup_filtertype]").getValue().radio_filtertype;
			
		var tglStart = me.getFormdata().down("[name=periode_startdate]").getValue();
		var tglEnd = me.getFormdata().down("[name=periode_enddate]").getValue();
		if(tglStart){
			var startDate = new Date(tglStart);
			params["startdate_display"] = startDate.getDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
			params["param_startdate"] = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate(); //for sql query
		} else {
			params["startdate_display"] = 'ALL';
			params["param_startdate"] = null;
		}
		if(tglEnd){
			var endDate = new Date(tglEnd);
			params["enddate_display"] = endDate.getDate()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getFullYear();
			params["param_enddate"] = endDate.getFullYear()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getDate(); //for sql query
		} else {
			params["enddate_display"] = 'ALL';
			params["param_enddate"] = null;
		}

		me.exportData(params);
	},

	exportData: function (params) {
		var me = this;

		me.getFormdata().up('window').body.mask('Creating Report, Please Wait...');

		Ext.Ajax.timeout = 60000 * 30;

		Ext.Ajax.request({
			url     : 'erems/penerimaancollectionreport/export/?action=schema',
			params  : params,
			success : function (response) {
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
								msg: 'Error: Create Report Penerimaan Collection Failed.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					}
				} catch (e) {
					me.getFormdata().up('window').body.unmask();
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Create Report Penerimaan Collection Failed.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			},
			failure: function (e) {
				me.getFormdata().up('window').body.unmask();
				Ext.Msg.show({
					title: 'Failure',
					msg: 'Error: Create Report Penerimaan Collection Failed.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
	},

});