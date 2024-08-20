Ext.define('Erems.controller.Constrencanastreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Constrencanastreport',
    views: ['constrencanastreport.Panel', 'constrencanastreport.FormData', 'masterreport.Panel'],
	stores: ['Mastercluster'],
    models: ['Mastercluster'],
    refs: [
        {
            ref: 'panel',
            selector: 'constrencanastreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'constrencanastreportformdata'
        }

    ],
    controllerName: 'constrencanastreport',
    formWidth: 800,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Constrencanastreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'constrencanastreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'constrencanastreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'constrencanastreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'constrencanastreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'constrencanastreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'constrencanastreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'constrencanastreportformdata [name=cbf_buildingclass]': {
                change: me.checkboxChange
            },
			'constrencanastreportformdata [name=buildingclass]': {
                select: me.comboboxChange
            },
			'constrencanastreportformdata [name=cbf_cluster_id]': {
                change: me.checkboxChange
            },
			'constrencanastreportformdata [name=cluster_id]': {
                select: me.comboboxChange
            }
        });
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
			var reportFile = "Constrencanast";
			
			params["group_admin"] = me.getFormdata().down("[name=buildingclass]").getValue();
			var cbf_checked0 = me.getFormdata().down("[name=cbf_buildingclass]").getValue();
			if(cbf_checked0 == '1' || !params["group_admin"]){
				params["group_admin_display"] = 'ALL';
			}
			else{
				params["group_admin_display"] = me.getFormdata().down("[name=buildingclass]").getRawValue();
			}
			
			params["cluster_id"] = me.getFormdata().down("[name=cluster_id]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
			if(cbf_checked1 == '1' || !params["cluster_id"]){
				params["cluster_display"] = 'ALL';
			}
			else{
				params["cluster_display"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
			}
			
			var tglStart = me.getFormdata().down("[name=st_startdate]").getValue();
			var tglEnd = me.getFormdata().down("[name=st_enddate]").getValue();
			if(tglStart){
				var startDate = new Date(tglStart);
				params["st_startdate_display"] = startDate.getDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
				params["st_startdate"] = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate(); //for sql query
			} else {
				params["st_startdate_display"] = 'ALL';
				params["st_startdate"] = null;
			}
			if(tglEnd){
				var endDate = new Date(tglEnd);
				params["st_enddate_display"] = endDate.getDate()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getFullYear();
				params["st_enddate"] = endDate.getFullYear()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getDate(); //for sql query
			} else {
				params["st_enddate_display"] = 'ALL';
				params["st_enddate"] = null;
			}
			
			params["radio_orderby"] = me.getFormdata().down("[name=radiogroup_orderby]").getValue().radio_orderby;
			if(params["radio_orderby"] == 'cluster'){
				params["orderby_display"] = 'Cluster / Kawasan'
			} else if(params["radio_orderby"] == 'tanggal_rencana_st'){
				params["orderby_display"] = 'Tanggal rencana serah terima'
			} 
			
			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;
			
			//var html = me.generateFakeForm(params,reportFile);
			var html = me.generateFakeForm2(params,reportFile);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
	
    panelAfterRender: function(el) {	
        var me = this;
       
        Ext.Ajax.request({
            url: 'erems/constrencanastreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/constrencanastreport/all');
    }

});