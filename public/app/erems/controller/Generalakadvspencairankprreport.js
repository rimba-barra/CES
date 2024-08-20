Ext.define('Erems.controller.Generalakadvspencairankprreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Generalakadvspencairankprreport',
    views: ['generalakadvspencairankprreport.Panel', 'generalakadvspencairankprreport.FormData', 'masterreport.Panel'],
	stores: ['Masterdata.store.Bank'],
	models: ['Masterdata.model.Bank'],
    refs: [
        {
            ref: 'panel',
            selector: 'generalakadvspencairankprreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'generalakadvspencairankprreportformdata'
        }

    ],
    controllerName: 'generalakadvspencairankprreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Generalakadvspencairankprreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'generalakadvspencairankprreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'generalakadvspencairankprreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'generalakadvspencairankprreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'generalakadvspencairankprreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'generalakadvspencairankprreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'generalakadvspencairankprreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'generalakadvspencairankprreportformdata [name=cbf_bank_id]': {
                change: me.checkboxChange
            },
			'generalakadvspencairankprreportformdata [name=bank_id]': {
                select: me.comboboxChange
            },
			'generalakadvspencairankprreportformdata [name=cbf_kprstatusum_id]': {
                change: me.checkboxChange
            },
			'generalakadvspencairankprreportformdata [name=kprstatusum_id]': {
                select: me.comboboxChange
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
			var reportFile = "Generalakadvspencairankpr";
			
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
			
			var html = me.generateFakeForm2(params,reportFile);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
	
    panelAfterRender: function(el) {	
        var me = this;
       
        Ext.Ajax.request({
            url: 'erems/generalakadvspencairankprreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/generalakadvspencairankprreport/all');
    }

});