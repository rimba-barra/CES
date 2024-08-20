Ext.define('Erems.controller.Aftersalesstrumahreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Aftersalesstrumahreport',
    views: ['aftersalesstrumahreport.Panel', 'aftersalesstrumahreport.FormData', 'masterreport.Panel'],
	stores: ['Mastercluster','Masterproductcategory'],
    models: ['Mastercluster','Masterproductcategory'],
    refs: [
        {
            ref: 'panel',
            selector: 'aftersalesstrumahreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'aftersalesstrumahreportformdata'
        }

    ],
    controllerName: 'aftersalesstrumahreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Aftersalesstrumahreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'aftersalesstrumahreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'aftersalesstrumahreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'aftersalesstrumahreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'aftersalesstrumahreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'aftersalesstrumahreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'aftersalesstrumahreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'aftersalesstrumahreportformdata [name=cbf_cluster_id]': {
                change: me.checkboxChange
            },
			'aftersalesstrumahreportformdata [name=cluster_id]': {
                select: me.comboboxChange
            },
			'aftersalesstrumahreportformdata [name=cbf_productcategory_id]': {
                change: me.checkboxChange
            },
			'aftersalesstrumahreportformdata [name=productcategory_id]': {
                select: me.comboboxChange
            },
			'aftersalesstrumahreportformdata [name=radiogroup_st]': {
                change: me.checkedRadio
            },
        });
    },
	
	checkedRadio: function(rg, sel){
		var me = this;
		var selection = sel['radio_st'];
		
		if(selection == 'sudah_st'){
			me.getFormdata().down('[name=periode_startdate]').setDisabled(false);
			me.getFormdata().down('[name=periode_enddate]').setDisabled(false);
		}else{
			me.getFormdata().down('[name=periode_startdate]').setDisabled(true);
			me.getFormdata().down('[name=periode_enddate]').setDisabled(true);
		}
	},
	
    processReport: function() {
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
			params["tgl_sekarang"] = dateNow.getDate()+"-"+(dateNow.getMonth()+1)+"-"+dateNow.getFullYear();
            params["time_sekarang"] = dateNow.getHours()+":"+dateNow.getMinutes()+":"+dateNow.getSeconds();
			var reportFile = "Aftersalesstrumah";
			
			params["cluster_id"] = me.getFormdata().down("[name=cluster_id]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
			if(cbf_checked1 == '1' || !params["cluster_id"]){
				params["cluster_display"] = 'ALL';
			}
			else{
				params["cluster_display"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
			}
			
			var cp_start = me.getFormdata().down("[name=cp_start]").getValue();
			var cp_end = me.getFormdata().down("[name=cp_end]").getValue();
			if(cp_start){
				params["cp_start_display"] = cp_start+'%';
				params["cp_start"] = cp_start;
			} else {
				params["cp_start_display"] = 'ALL';
				params["cp_start"] = null;
			}
			if(cp_end){
				params["cp_end_display"] = cp_end+'%';
				params["cp_end"] = cp_end;
			} else {
				params["cp_end_display"] = 'ALL';
				params["cp_end"] = null;
			}
			
			params["productcategory_id"] = me.getFormdata().down("[name=productcategory_id]").getValue();
			var cbf_checked2 = me.getFormdata().down("[name=cbf_productcategory_id]").getValue();
			if(cbf_checked2 == '1' || !params["productcategory_id"]){
				params["productcategory_display"] = 'ALL';
			}
			else{
				params["productcategory_display"] = me.getFormdata().down("[name=productcategory_id]").getRawValue();
			}
			
			params["radio_st"] = me.getFormdata().down("[name=radiogroup_st]").getValue().radio_st;
			if(params["radio_st"] == 'ALL'){
				params["radio_st_display"] = 'ALL';
				params["startdate_display"] = 'ALL';
				params["enddate_display"] = 'ALL';
			} else if(params["radio_st"] == 'belum_st'){
				params["radio_st_display"] = 'Belum Serah Terima';
				params["startdate_display"] = 'ALL';
				params["enddate_display"] = 'ALL';
			} else if(params["radio_st"] == 'sudah_st'){
				params["radio_st_display"] = 'Sudah Serah Terima';
				
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
			}
           
			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;
			
			var html = me.generateFakeForm2(params,reportFile);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
	
    panelAfterRender: function(el) {	
        var me = this;
       
        Ext.Ajax.request({
            url: 'erems/aftersalesstrumahreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/aftersalesstrumahreport/all');
    }

});