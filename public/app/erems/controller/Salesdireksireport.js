Ext.define('Erems.controller.Salesdireksireport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', //Controller2
    alias: 'controller.Salesdireksireport',
    views: ['salesdireksireport.Panel', 'salesdireksireport.FormData', 'masterreport.Panel'],
    ////// added by erwin.st 20052021
    stores: ['Masterdata.store.Projectpt', 'Mastercluster'],
    models: ['Sourcemoney', 'Masterdata.model.Projectpt'],
    ///////////
    refs: [
        {
            ref: 'panel',
            selector: 'salesdireksireportpanel'
        },
        {
            ref: 'formdata',
            selector: 'salesdireksireportformdata'
        }

    ],
    controllerName: 'salesdireksireport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Salesdireksireport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'salesdireksireportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'salesdireksireportformdata': {
                afterrender: this.formDataAfterRender
            },
            'salesdireksireportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'salesdireksireportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'salesdireksireportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'salesdireksireportformdata button[action=reset]': {
				click: this.dataReset
            },
            'salesdireksireportformdata [name=cbf_pt_id]': { ////// added by erwin.st 20052021
				change: me.checkboxChange
			},
			'salesdireksireportformdata [name=pt_id]': { ////// added by erwin.st 20052021
				select: me.comboboxChange
			},

			//added by anas 10062021
            'salesdireksireportformdata [name=cbf_cluster_id]': { 
				change: me.checkboxChange
			},
			'salesdireksireportformdata [name=cluster_id]': { 
				select: me.comboboxChange
			},

        });
    },
    processReport: function() {
        var me = this;
		
		var form = me.getFormdata().getForm();
		if (form.isValid()) {

			var params = me.getFormdata().getForm().getFieldValues();

			//added by anas 14062021
			var clusterid = me.getFormdata().down("[name=cluster_id]").getValue();
			var clust_cbf = me.getFormdata().down("[name=cbf_cluster_id]").getValue();

			if(clust_cbf == true)
			{
				me.getFormdata().down("[name=cluster_id]").setValue("");
			}
		
			if(clust_cbf == false && Number.isInteger(clusterid) == false)
			{
				Ext.Msg.show({
					title: 'Error',
					msg: 'Invalid cluster',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK,
				});
			}
			//end added by anas
			else {
		
				var winId = 'myReportWindow';
				me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
				var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
				var win = desktop.getWindow(winId);
		
				if (win) {
					
					var dateNow = new Date();
					
					//header
					params["project_name"] = me.project_name;
					params["pt_name"] = me.pt_name;
					params["tgl_sekarang"] = dateNow.getDate()+"-"+(dateNow.getMonth()+1)+"-"+dateNow.getFullYear();
					params["time_sekarang"] = dateNow.getHours()+":"+dateNow.getMinutes()+":"+dateNow.getSeconds();
					var reportFile = null;//params["Groupby"]==="cluster"?"TownPlanningCluster":"TownPlanningType";
					var select_report = me.getFormdata().down("[name=radiogroup_reporttype]").getValue().radio_reporttype;
					if(select_report == "detail"){
						reportFile = 'Salesdireksidetail';
					} else if(select_report == "summary"){
						reportFile = 'Salesdireksisummary';
					} else if(select_report == "summary2"){
						reportFile = 'Salesdireksisummarydailyformat';
					} else if(select_report == "summary_target"){
	                    reportFile = 'Salesdireksitargetsummary';
	                } else if(select_report == "penjualan_netto"){
	                    reportFile = 'Salesdireksidetailnetto';
	                }
					
					// var tahun = me.getFormdata().down("[name=tahun]").getValue();
					// var bulan = me.getFormdata().down("[name=bulan]").getValue();
					// var tanggal = me.getFormdata().down("[name=tanggal]").getValue();
					
					// params["tahun"] = (!tahun) ? 0 : tahun;
					// params["bulan"] = (!bulan) ? 0 : bulan;
					// params["tanggal"] = (!tanggal) ? 0 : tanggal;
					
					var tglStart = me.getFormdata().down("[name=periode_startdate]").getValue();
					var tglEnd = me.getFormdata().down("[name=periode_enddate]").getValue();
					if(tglStart){
						var startDate = new Date(tglStart);
						params["periode_startdate"] = startDate.getDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
						params["param_startdate"] = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate(); //for sql query
					} else {
						params["periode_startdate"] = null;
						params["param_startdate"] = null;
					}
					if(tglEnd){
						var endDate = new Date(tglEnd);
						params["periode_enddate"] = endDate.getDate()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getFullYear();
						params["param_enddate"] = endDate.getFullYear()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getDate(); //for sql query
					} else {
						params["periode_enddate"] = null;
						params["param_enddate"] = null;
					}

					////// added by erwin.st 20052021
					params["pt_id_unit"] = me.getFormdata().down("[name=pt_id]").getValue();
					var cbf_checked = me.getFormdata().down("[name=cbf_pt_id]").getValue();
					if (cbf_checked == '1' || !params["pt_id"]) {
						params["pt_display"] = 'ALL';
					} else {
						params["pt_display"] = me.getFormdata().down("[name=pt_id]").getRawValue();
					}
					
					params["project_id"] = apps.project;
					params["pt_id"] = apps.pt;

					//added by anas 09062021
					params["cluster_id_unit"] = me.getFormdata().down("[name=cluster_id]").getValue();
					var cbf_cluster = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
					if (cbf_cluster == '1' || !params["cluster_id"]) {
						params["cluster_display"] = 'ALL';
					} else {
						params["cluster_display"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
					}

					params["user_id"] = apps.uid;


					//var html = me.generateFakeForm(params,reportFile);
					var html = me.generateFakeForm2(params,reportFile);
					
					win.down("#MyReportPanel").body.setHTML(html);
					$("#fakeReportFormID").submit();
				}
			}
		}
    },
	
    panelAfterRender: function(el) {	
        var me = this;
       
        Ext.Ajax.request({
            url: 'erems/salesdireksireport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/salesdireksireport/all');

        //// filter pt sesuai dg project
        ////// added by erwin.st 20052021
        var storepp = el.down('[name=pt_id]').getStore();
		storepp.clearFilter(true);
		storepp.filter({
			property      : 'project_id',
			value         : apps.project,
			exactMatch    : true,
			caseSensitive : true
		});

		//added by anas 14062021
		//untuk clear filter, karena jika membuka menu lain yg ada clusternya filternya masih ada
		var storecluster = null;
		storecluster = el.down('[name=cluster_id]').getStore();
		storecluster.clearFilter(true);
		//end by added
    },
});