Ext.define('Erems.controller.Constorderpembangunanreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Constorderpembangunanreport',
    views: ['constorderpembangunanreport.Panel', 'constorderpembangunanreport.FormData', 'masterreport.Panel'],
	stores: ['Mastercluster','Masterproductcategory'],
    models: ['Mastercluster','Masterproductcategory'],
    refs: [
        {
            ref: 'panel',
            selector: 'constorderpembangunanreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'constorderpembangunanreportformdata'
        }

    ],
    controllerName: 'constorderpembangunanreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Constorderpembangunanreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'constorderpembangunanreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'constorderpembangunanreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'constorderpembangunanreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'constorderpembangunanreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'constorderpembangunanreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'constorderpembangunanreportformdata button[action=reset]': {
				click: this.dataReset
            },
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
			var reportFile = "Constorderpembangunan";
			
			var dp_inhouse = me.getFormdata().down("[name=dp_inhouse]").getValue();
			var dp_cash = me.getFormdata().down("[name=dp_cash]").getValue();
			if(dp_inhouse){
				params["dp_inhouse_display"] = dp_inhouse+'%';
				params["dp_inhouse"] = dp_inhouse;
			} else {
				params["dp_inhouse_display"] = 'ALL';
				params["dp_inhouse"] = 0;
			}
			if(dp_cash){
				params["dp_cash_display"] = dp_cash+'%';
				params["dp_cash"] = dp_cash;
			} else {
				params["dp_cash_display"] = 'ALL';
				params["dp_cash"] = 0;
			}
			
			params["radio_kpr"] = me.getFormdata().down("[name=radiogroup_kpr]").getValue().radio_kpr;
			if(params["radio_kpr"] == 'ALL'){
				params["radio_kpr_display"] = 'ALL';
			} else if(params["radio_kpr"] == 'belum_akad'){
				params["radio_kpr_display"] = 'Belum Akad';
			} else if(params["radio_kpr"] == 'sudah_akad'){
				params["radio_kpr_display"] = 'Sudah Akad';
			}
			
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
			
			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;
//			console.log(params);
			var html = me.generateFakeForm2(params,reportFile);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
	
    panelAfterRender: function(el) {	
        var me = this;
       
        Ext.Ajax.request({
            url: 'erems/constorderpembangunanreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/constorderpembangunanreport/all');
    }

});