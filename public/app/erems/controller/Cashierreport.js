Ext.define('Erems.controller.Cashierreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Cashierreport',
    views: ['cashierreport.Panel', 'cashierreport.FormData', 'masterreport.Panel'],
    requires: [,'Erems.library.template.component.Projectptcombobox','Erems.library.template.component.Clustercombobox'],
	stores: ['Masterpaymentflag', 'Paymenttype', 'Paymentmethod','Masterdata.store.Projectpt','Mastercluster'],
	models: ['Masterpaymentflag', 'Paymenttype', 'Paymentmethod','Masterdata.model.Projectpt','Mastercluster'],
    refs: [
        {
            ref: 'panel',
            selector: 'cashierreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'cashierreportformdata'
        }

    ],
    controllerName: 'cashierreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Cashierreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'cashierreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'cashierreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'cashierreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'cashierreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'cashierreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'cashierreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'cashierreportformdata [name=cbf_buildingclass]': {
                change: me.checkboxChange
            },
			'cashierreportformdata [name=buildingclass]': {
                select: me.comboboxChange
            },
			'cashierreportformdata [name=cbf_paymentflag_id]': {
                change: me.checkboxChange
            },
			'cashierreportformdata [name=paymentflag_id]': {
                select: me.comboboxChange
            },
			'cashierreportformdata [name=cbf_paymentmethod_id]': {
                change: me.checkboxChange
            },
			'cashierreportformdata [name=paymentmethod_id]': {
                select: me.comboboxChange
            },
			'cashierreportformdata [name=cbf_paymenttype_id]': {
                change: me.checkboxChange
            },
			'cashierreportformdata [name=paymenttype_id]': {
                select: me.comboboxChange
            },
			'cashierreportformdata [name=cbf_sales_period_date]': {
                change: me.checkboxChange2
            },
			'cashierreportformdata [name=sales_period_startdate]': {
                select: me.comboboxChange2
            },
			'cashierreportformdata [name=sales_period_enddate]': {
                select: me.comboboxChange2
            },
			'cashierreportformdata [name=cbf_cair_date]': {
                change: me.checkboxChange3
            },
			'cashierreportformdata [name=cair_startdate]': {
                select: me.comboboxChange3
            },
			'cashierreportformdata [name=cair_enddate]': {
                select: me.comboboxChange3
            },

            'cashierreportformdata [name=cbf_pt_id]': { ////// added by erwin.st 20052021
				change: me.checkboxChange
			},
			'cashierreportformdata [name=pt_id]': { ////// added by erwin.st 20052021
				select: me.comboboxChange
			}

			//added by anas 10062021
            , 'cashierreportformdata [name=cbf_cluster_id]': { 
				change: me.checkboxChange
			},
			'cashierreportformdata [name=cluster_id]': { 
				select: me.comboboxChange
			},
			
        });
    },
	
	checkboxChange2: function(el) {
		var me = this;
        if (me.getFormdata().down("[name=cbf_sales_period_date]").getValue()) {
            me.getFormdata().down("[name=sales_period_startdate]").setValue();
			me.getFormdata().down("[name=sales_period_enddate]").setValue();
        }
    },
	
	comboboxChange2: function(el) {
		var me = this;
		me.getFormdata().down("[name=cbf_sales_period_date]").setValue("0");
    },
	
	checkboxChange3: function(el) {
		var me = this;
        if (me.getFormdata().down("[name=cbf_cair_date]").getValue()) {
            me.getFormdata().down("[name=cair_startdate]").setValue();
			me.getFormdata().down("[name=cair_enddate]").setValue();
        }
    },
	
	comboboxChange3: function(el) {
		var me = this;
		me.getFormdata().down("[name=cbf_cair_date]").setValue("0");
    },
	
    processReport: function() {
        var me = this;
        
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
				var params = me.getFormdata().getForm().getFieldValues();
				
				var dateNow = new Date();
				
				//header
				params["project_name"] = me.project_name;
				params["pt_name"] = me.pt_name;
				params["tgl_sekarang"] = dateNow.getDate()+"-"+(dateNow.getMonth()+1)+"-"+dateNow.getFullYear();
	            params["time_sekarang"] = dateNow.getHours()+":"+dateNow.getMinutes()+":"+dateNow.getSeconds();
	                        
                var reportFile = null;
                var tipe_laporan = me.getFormdata().down("[name=radiogroup_grossnetto]").getValue().radio_grossnetto;
                if (tipe_laporan == 'gross') {
                    reportFile = 'Cashier';
                } else if (tipe_laporan == 'netto') {
                    reportFile = 'CashierNew';
                }
	                        
				params["group_admin"] = me.getFormdata().down("[name=buildingclass]").getValue();
				var cbf_checked0 = me.getFormdata().down("[name=cbf_buildingclass]").getValue();
				if(cbf_checked0 == '1' || !params["group_admin"]){
					params["group_admin_display"] = 'ALL';
				}
				else{
					params["group_admin_display"] = me.getFormdata().down("[name=buildingclass]").getRawValue();
				}
				
				params["paymentflag_id"] = me.getFormdata().down("[name=paymentflag_id]").getValue();
				var cbf_checked1 = me.getFormdata().down("[name=cbf_paymentflag_id]").getValue();
				if(cbf_checked1 == '1' || !params["paymentflag_id"]){
					params["paymentflag_display"] = 'ALL';
				}
				else{
					params["paymentflag_display"] = me.getFormdata().down("[name=paymentflag_id]").getRawValue();
				}
				
				params["paymentmethod_id"] = me.getFormdata().down("[name=paymentmethod_id]").getValue();
				var cbf_checked2 = me.getFormdata().down("[name=cbf_paymentmethod_id]").getValue();
				if(cbf_checked2 == '1' || !params["paymentmethod_id"]){
					params["paymentmethod_display"] = 'ALL';
				}
				else{
					params["paymentmethod_display"] = me.getFormdata().down("[name=paymentmethod_id]").getRawValue();
				}
				
				params["paymenttype_id"] = me.getFormdata().down("[name=paymenttype_id]").getValue();
				var cbf_checked3 = me.getFormdata().down("[name=cbf_paymenttype_id]").getValue();
				if(cbf_checked3 == '1' || !params["paymenttype_id"]){
					params["paymenttype_display"] = 'ALL';
				}
				else{
					params["paymenttype_display"] = me.getFormdata().down("[name=paymenttype_id]").getRawValue();
				}
				
				var tglStart = me.getFormdata().down("[name=payment_startdate]").getValue();
				var tglEnd = me.getFormdata().down("[name=payment_enddate]").getValue();
				if(tglStart){
					var startDate = new Date(tglStart);
					params["payment_startdate_display"] = startDate.getDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
					params["payment_startdate"] = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate(); //for sql query
				} else {
					params["payment_startdate_display"] = 'ALL';
					params["payment_startdate"] = null;
				}
				if(tglEnd){
					var endDate = new Date(tglEnd);
					params["payment_enddate_display"] = endDate.getDate()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getFullYear();
					params["payment_enddate"] = endDate.getFullYear()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getDate(); //for sql query
				} else {
					params["payment_enddate_display"] = 'ALL';
					params["payment_enddate"] = null;
				}
				
				var tglStart2 = me.getFormdata().down("[name=sales_period_startdate]").getValue();
				var tglEnd2 = me.getFormdata().down("[name=sales_period_enddate]").getValue();
				if(tglStart2){
					var startDate = new Date(tglStart2);
					params["sales_period_startdate_display"] = startDate.getDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
					params["sales_period_startdate"] = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate(); //for sql query
				} else {
					params["sales_period_startdate_display"] = 'ALL';
					params["sales_period_startdate"] = null;
				}
				if(tglEnd2){
					var endDate = new Date(tglEnd2);
					params["sales_period_enddate_display"] = endDate.getDate()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getFullYear();
					params["sales_period_enddate"] = endDate.getFullYear()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getDate(); //for sql query
				} else {
					params["sales_period_enddate_display"] = 'ALL';
					params["sales_period_enddate"] = null;
				}
				
				var tglStart3 = me.getFormdata().down("[name=cair_startdate]").getValue();
				var tglEnd3 = me.getFormdata().down("[name=cair_enddate]").getValue();
				if(tglStart3){
					var startDate = new Date(tglStart3);
					params["cair_startdate_display"] = startDate.getDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
					params["cair_startdate"] = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate(); //for sql query
				} else {
					params["cair_startdate_display"] = 'ALL';
					params["cair_startdate"] = null;
				}
				if(tglEnd3){
					var endDate = new Date(tglEnd3);
					params["cair_enddate_display"] = endDate.getDate()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getFullYear();
					params["cair_enddate"] = endDate.getFullYear()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getDate(); //for sql query
				} else {
					params["cair_enddate_display"] = 'ALL';
					params["cair_enddate"] = null;
				}
				
				params["radio_status_cair"] = me.getFormdata().down("[name=radiogroup_status_cair]").getValue().radio_status_cair;
				if(params["radio_status_cair"] == 'sudah_cair'){
					params["status_cair_display"] = 'Sudah Cair'
				} else if(params["radio_status_cair"] == 'belum_cair'){
					params["status_cair_display"] = 'Belum Cair'
				} else {
					params["status_cair_display"] = 'ALL'
				}
				
				params["radio_sort_by"] = me.getFormdata().down("[name=radiogroup_sort_by]").getValue().radio_sort_by;
				if(params["radio_sort_by"] == 'cluster'){
					params["sort_by_display"] = 'Cluster / Block'
				} else if(params["radio_sort_by"] == 'kwitansi_no'){
					params["sort_by_display"] = 'Kwitansi No'
				} 
				
				var kwitansi_no_start = me.getFormdata().down("[name=kwitansi_no_start]").getValue();
				var kwitansi_no_end = me.getFormdata().down("[name=kwitansi_no_end]").getValue();
				if(kwitansi_no_start){
					params["kwitansi_no_start_display"] = kwitansi_no_start;
					params["kwitansi_no_start"] = kwitansi_no_start;
				} else {
					params["kwitansi_no_start_display"] = 'ALL';
					params["kwitansi_no_start"] = null;
				}
				if(kwitansi_no_end){
					params["kwitansi_no_end_display"] = kwitansi_no_end;
					params["kwitansi_no_end"] = kwitansi_no_end;
				} else {
					params["kwitansi_no_end_display"] = 'ALL';
					params["kwitansi_no_end"] = null;
				}
				

				// added by rico 07092021
				// params["pt_id"] = me.getFormdata().down("[name=pt_id]").getValue();
				params["pt_id"] = me.getFormdata().down("[name=pt_id]").getValue();
				var cbf_checked = me.getFormdata().down("[name=cbf_pt_id]").getValue();
				if (cbf_checked == '1' || !params["pt_id"]) {
					params["pt_display"] = 'ALL';
				} else {
					params["pt_display"] = me.getFormdata().down("[name=pt_id]").getRawValue();
				}
				
				params["project_id"] = apps.project;
				// params["pt_id"] = apps.pt;

				//added by anas 10062021
				params["cluster_id_unit"] = me.getFormdata().down("[name=cluster_id]").getValue();
				var cbf_cluster = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
				if (cbf_cluster == '1' || !params["cluster_id"]) {
					params["cluster_display"] = 'ALL';
				} else {
					params["cluster_display"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
				}

				params["user_id"] = apps.uid;
				//end added by anas

				//console.log(params);
				//var html = me.generateFakeForm(params,reportFile);
				var html = me.generateFakeForm2(params,reportFile);
	            win.down("#MyReportPanel").body.setHTML(html);
	            $("#fakeReportFormID").submit();
	        }
        }
    },
	dataReset: function () {
		var me = this;

        var storepp = me.getFormdata().down('[name=pt_id]').getStore();
		storepp.clearFilter(true);
		storepp.filter({
			property      : 'project_id',
			value         : apps.project,
			exactMatch    : true,
			caseSensitive : true
		});

		me.getFormdata().getForm().reset();

	},
	
    panelAfterRender: function(el) {	
        var me = this;
       
        Ext.Ajax.request({
            url: 'erems/cashierreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/cashierreport/all');
        
        // filter pt sesuai dg project
        // added by erwin.st 20052021
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
    }

});