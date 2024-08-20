Ext.define('Erems.controller.Stpembayaranreport', {
	extend: 'Erems.library.template.controller.Controllerreporttb',
	alias: 'controller.Stpembayaranreport',
	requires:[
        'Erems.library.template.component.Clustercombobox',
        'Erems.library.template.component.Productcategorycombobox'
	],
	stores:['Mastercluster','Masterproductcategory'],
	models:['Mastercluster','Masterproductcategory'],
	views: ['stpembayaranreport.Panel', 'stpembayaranreport.FormData', 'masterreport.Panel'],
	refs: [
		{
			ref: 'panel',
			selector: 'stpembayaranreportpanel'
		},
		{
			ref: 'formdata',
			selector: 'stpembayaranreportformdata'
		}

	],
	controllerName: 'stpembayaranreport',
	formWidth: 750,
	fieldName: 'name',
	comboBoxIdEl: [],
	bindPrefixName: 'Stpembayaranreport',
	localStore: {
		detail: null
	},
	project_name: null,
	pt_name: null,
	init: function (application) {
		var me = this;
		this.control({
			'stpembayaranreportpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'stpembayaranreportformdata': {
				afterrender: this.formDataAfterRender
			},
			'stpembayaranreportformdata button[action=reset]': {
				click: this.dataReset
			},
			'stpembayaranreportformdata [name=cbf_buildingclass]': {
				change: me.checkboxChange
			},
			'stpembayaranreportformdata [name=buildingclass]': {
				select: me.comboboxChange
			},
			'stpembayaranreportformdata [name=cbf_cluster_id]': {
				change: me.checkboxChange
			},
			'stpembayaranreportformdata [name=cluster_id]': {
				select: me.comboboxChange
			},
			'stpembayaranreportformdata [name=cbf_productcategory_id]': {
				change: me.checkboxChange
			},
			'stpembayaranreportformdata [name=productcategory_id]': {
				select: me.comboboxChange
			},
			'stpembayaranreportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'stpembayaranreportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'stpembayaranreportformdata button[action=process]': {
				click: function () {
					me.processReport();
				}
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
			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;

			var reportFile = "StatusTotalPembayaran";

			params["cluster_id"] = me.getFormdata().down("[name=cluster_id]").getValue();
			var cbf_checked = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
			if (cbf_checked == '1' || !params["cluster_id"]) {
				params["cluster_name"] = 'ALL';
			} else {
				params["cluster_name"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
			}

			params["buildingclass"] = me.getFormdata().down("[name=buildingclass]").getValue();
			var cbf_checked = me.getFormdata().down("[name=cbf_buildingclass]").getValue();
			if (cbf_checked == '1' || !params["buildingclass"]) {
				params["buildingclass"] = 'ALL';
//			} else {
//				params["cluster_name"] = me.getFormdata().down("[name=buildingclass]").getRawValue();
			}

			params["productcategory_id"] = me.getFormdata().down("[name=productcategory_id]").getValue();
			var cbf_checked = me.getFormdata().down("[name=cbf_productcategory_id]").getValue();
			if (cbf_checked == '1' || !params["productcategory_id"]) {
				params["productcategory_name"] = 'ALL';
			} else {
				params["productcategory_name"] = me.getFormdata().down("[name=productcategory_id]").getRawValue();
			}
			
			params["status_pembayaran"] = me.getFormdata().down("[name=status_pembayaran]").getValue().Statuspembayaran;
			if (params["status_pembayaran"] == 1) {
				params["status_pembayaran_name"] = "Lunas Total";
			} else if (params["status_pembayaran"] == 2) {
				params["status_pembayaran_name"] = "Lunas Uang Muka";
			} else {
				params["status_pembayaran_name"] = "Lunas KPR";
			}
			params["scheduletype"] = params["status_pembayaran"] == 2 ? 5 : 2;
			params["Statuslunas"] = me.getFormdata().down("[name=status_lunas]").getValue().Statuslunas;
			if (params["Statuslunas"] == 1) {
				params["status_name"] = "Lunas";
			} else {
				params["status_name"] = "Belum Lunas";
			}

			if (params["status_pembayaran"] == 1) {
				reportFile = "StatusTotalPembayaran";
			} else {
				reportFile = "StatusTotalPembayaranScheduleType";
			}

			console.log(params);
			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},
	panelAfterRender: function (el) {
		var me = this;
		var f = me.getFormdata();
		Ext.Ajax.request({
			url: 'erems/pakreditreport/read',
			success: function (response) {
				var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name;
				me.project_id = info.project_id;
				me.pt_id = info.pt_id;
				//   f.down("[name=Project]").setValue(info.project_name);
				//  f.down("[name=Pt]").setValue(info.pt_name);

			},

		});

	},
	formDataAfterRender: function (el) {
		var me = this;
		me.loadComboBoxStore(el);
	}



});