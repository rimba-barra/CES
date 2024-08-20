Ext.define('Erems.controller.Legalpecahsudahhgbajbreport', {
	extend: 'Erems.library.template.controller.Controllerreporttb',
	alias: 'controller.Legalpecahsudahhgbajbreport',
	views: ['legalpecahsudahhgbajbreport.Panel', 'legalpecahsudahhgbajbreport.FormData', 'masterreport.Panel'],
	requires:[
        'Erems.library.template.component.Productcategorycombobox'
	],
	stores: ['Masterdata.store.Bank','Masterproductcategory'],
	models: ['Masterdata.model.Bank','Masterproductcategory'],
	refs: [
		{
			ref: 'panel',
			selector: 'legalpecahsudahhgbajbreportpanel'
		},
		{
			ref: 'formdata',
			selector: 'legalpecahsudahhgbajbreportformdata'
		}

	],
	controllerName: 'legalpecahsudahhgbajbreport',
	formWidth: 750,
	fieldName: 'name',
	comboBoxIdEl: [],
	bindPrefixName: 'Legalpecahsudahhgbajbreport',
	localStore: {
		detail: null
	},
	project_name: null,
	pt_name: null,
	init: function (application) {
		var me = this;
		this.control({
			'legalpecahsudahhgbajbreportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'legalpecahsudahhgbajbreportformdata': {
				afterrender: this.formDataAfterRender
			},
			'legalpecahsudahhgbajbreportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'legalpecahsudahhgbajbreportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'legalpecahsudahhgbajbreportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
			},
			'legalpecahsudahhgbajbreportformdata button[action=reset]': {
				click: this.dataReset
			},
			'legalpecahsudahhgbajbreportformdata [name=cbf_buildingclass]': {
				change: me.checkboxChange
			},
			'legalpecahsudahhgbajbreportformdata [name=buildingclass]': {
				select: me.comboboxChange
			},
			'legalpecahsudahhgbajbreportformdata [name=cbf_bank_id]': {
				change: me.checkboxChange
			},
			'legalpecahsudahhgbajbreportformdata [name=bank_id]': {
				select: me.comboboxChange
			},
			'legalpecahsudahhgbajbreportformdata [name=cbf_productcategory_id]': {
				change: me.checkboxChange
			},
			'legalpecahsudahhgbajbreportformdata [name=productcategory_id]': {
				select: me.comboboxChange
			},
		});
	},

	formDataAfterRender: function (el) {
		var ftStore = null;
		ftStore = el.down("[name=bank_id]").getStore();
		ftStore.load({params: {start: 0, limit: 0}});

		ftStore = el.down("[name=productcategory_id]").getStore();
		ftStore.load({params: {start: 0, limit: 0}});
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
			var reportFile = "Legalpecahsudahhgbajb";

			params["group_admin"] = me.getFormdata().down("[name=buildingclass]").getValue();
			var cbf_checked0 = me.getFormdata().down("[name=cbf_buildingclass]").getValue();
			if (cbf_checked0 == '1' || !params["group_admin"]) {
				params["group_admin_display"] = 'ALL';
			} else {
				params["group_admin_display"] = me.getFormdata().down("[name=buildingclass]").getRawValue();
			}

			params["bank_id"] = me.getFormdata().down("[name=bank_id]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_bank_id]").getValue();
			if (cbf_checked1 == '1' || !params["bank_id"]) {
				params["bank_name"] = 'ALL';
			} else {
				params["bank_name"] = me.getFormdata().down("[name=bank_id]").getRawValue();
			}

			params["productcategory_id"] = me.getFormdata().down("[name=productcategory_id]").getValue();
			var cbf_checked2 = me.getFormdata().down("[name=cbf_productcategory_id]").getValue();
			if (cbf_checked2 == '1' || !params["productcategory_id"]) {
				params["productcategory_display"] = 'ALL';
			} else {
				params["productcategory_display"] = me.getFormdata().down("[name=productcategory_id]").getRawValue();
			}

			params["radio_pricetype"] = me.getFormdata().down("[name=radiogroup_pricetype]").getValue().radio_pricetype;
			if (params["radio_pricetype"] == 'cash_inhouse') {
				params["pricetype_display"] = 'Cash + Inhouse'
			} else if (params["radio_pricetype"] == 'bank') {
				params["pricetype_display"] = 'Bank'
			} else {
				params["pricetype_display"] = 'ALL';
			}

			params["status_bayar"] = me.getFormdata().down("[name=status_bayar]").getValue();
			if (params["status_bayar"] == '1') {
				params["status_bayar_display"] = 'Lunas 100%'
			} else {
				params["status_bayar_display"] = 'ALL'
			}

			var tglStart = me.getFormdata().down("[name=periode_startdate]").getValue();
			var tglEnd = me.getFormdata().down("[name=periode_enddate]").getValue();
			if (tglStart) {
				var startDate = new Date(tglStart);
				params["startdate_display"] = startDate.getDate() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getFullYear();
				params["param_startdate"] = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); //for sql query
			} else {
				params["startdate_display"] = 'ALL';
				params["param_startdate"] = null;
			}
			if (tglEnd) {
				var endDate = new Date(tglEnd);
				params["enddate_display"] = endDate.getDate() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getFullYear();
				params["param_enddate"] = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate(); //for sql query
			} else {
				params["enddate_display"] = 'ALL';
				params["param_enddate"] = null;
			}

			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;

			var html = me.generateFakeForm2(params, reportFile);

			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},

	panelAfterRender: function (el) {
		var me = this;

		Ext.Ajax.request({
			url: 'erems/legalpecahsudahhgbajbreport/read',
			success: function (response) {
				var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name;
			},
			//params: {mode_read: 'init'}
		});
		//   me.loadReport(el, 'erems/legalpecahsudahhgbajbreport/all');
	}

});