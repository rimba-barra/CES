Ext.define('Erems.controller.Generalbelumstreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Generalbelumstreport',
    views: ['generalbelumstreport.Panel', 'generalbelumstreport.FormData', 'masterreport.Panel'],
	stores: ['Masterdata.store.Bank'],
	models: ['Masterdata.model.Bank'],
    refs: [
        {
            ref: 'panel',
            selector: 'generalbelumstreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'generalbelumstreportformdata'
        }

    ],
    controllerName: 'generalbelumstreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Generalbelumstreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'generalbelumstreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'generalbelumstreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'generalbelumstreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'generalbelumstreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'generalbelumstreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'generalbelumstreportformdata button[action=reset]': {
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
			
			//header
			params["project_name"] = me.project_name;
			params["pt_name"] = me.pt_name;
			params["tgl_sekarang"] = dateNow.getDate()+"-"+(dateNow.getMonth()+1)+"-"+dateNow.getFullYear();
            params["time_sekarang"] = dateNow.getHours()+":"+dateNow.getMinutes()+":"+dateNow.getSeconds();
			var reportFile = "Generalbelumst";
			
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
			
			var coll_start = me.getFormdata().down("[name=coll_start]").getValue();
			var coll_end = me.getFormdata().down("[name=coll_end]").getValue();
			if(coll_start){
				params["coll_start_display"] = coll_start+'%';
				params["coll_start"] = coll_start;
			} else {
				params["coll_start_display"] = 'ALL';
				params["coll_start"] = null;
			}
			if(coll_end){
				params["coll_end_display"] = coll_end+'%';
				params["coll_end"] = coll_end;
			} else {
				params["coll_end_display"] = 'ALL';
				params["coll_end"] = null;
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
            url: 'erems/generalbelumstreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/generalbelumstreport/all');
    }

});