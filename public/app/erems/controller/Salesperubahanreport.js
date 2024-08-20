Ext.define('Erems.controller.Salesperubahanreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', //Controller2
    alias: 'controller.Salesperubahanreport',
    views: ['salesperubahanreport.Panel', 'salesperubahanreport.FormData', 'masterreport.Panel'],
    refs: [
        {
            ref: 'panel',
            selector: 'salesperubahanreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'salesperubahanreportformdata'
        }

    ],
    controllerName: 'salesperubahanreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Salesperubahanreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'salesperubahanreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'salesperubahanreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'salesperubahanreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'salesperubahanreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'salesperubahanreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'salesperubahanreportformdata button[action=reset]': {
				click: this.dataReset
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
			
			var tglStart = me.getFormdata().down("[name=purchase_startdate]").getValue();
			var tglEnd = me.getFormdata().down("[name=purchase_enddate]").getValue();
			if(tglStart){
				var startDate = new Date(tglStart);
				params["purchase_startdate"] = startDate.getDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
				params["param_startdate"] = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate(); //for sql query
			} else {
				params["purchase_startdate"] = null;
				params["param_startdate"] = null;
			}
			if(tglEnd){
				var endDate = new Date(tglEnd);
				params["purchase_enddate"] = endDate.getDate()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getFullYear();
				params["param_enddate"] = endDate.getFullYear()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getDate(); //for sql query
			} else {
				params["purchase_enddate"] = null;
				params["param_enddate"] = null;
			}
			
            
			//header
			params["project_name"] = me.project_name;
			params["pt_name"] = me.pt_name;
			params["tgl_sekarang"] = dateNow.getDate()+"-"+(dateNow.getMonth()+1)+"-"+dateNow.getFullYear();
            params["time_sekarang"] = dateNow.getHours()+":"+dateNow.getMinutes()+":"+dateNow.getSeconds();
			var reportFile = null;//params["Groupby"]==="cluster"?"TownPlanningCluster":"TownPlanningType";
			var select_perubahan = me.getFormdata().down("[name=radiogroup_perubahan]").getValue().radio_perubahan;
			if(select_perubahan == "perubahan_nama"){
				reportFile = 'Salesperubahannama';
			} else if(select_perubahan == "perubahan_harga"){
				reportFile = 'Salesperubahanharga';
			} else if(select_perubahan == "perubahan_block"){
				reportFile = 'Salesperubahanblock';
			} else if(select_perubahan == "perubahan_all"){
				reportFile = 'Salesperubahanall';
			}
			
			
            params["radio_sort_by"] = me.getFormdata().down("[name=radiogroup_sort_by]").getValue().radio_sort_by;
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
            url: 'erems/salesperubahanreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/salesperubahanreport/all');
    }

});