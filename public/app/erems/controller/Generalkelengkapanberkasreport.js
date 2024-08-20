Ext.define('Erems.controller.Generalkelengkapanberkasreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Generalkelengkapanberkasreport',
    views: ['generalkelengkapanberkasreport.Panel', 'generalkelengkapanberkasreport.FormData', 'masterreport.Panel'],
	stores: ['Masterdata.store.Bank'],
	models: ['Masterdata.model.Bank'],
    refs: [
        {
            ref: 'panel',
            selector: 'generalkelengkapanberkasreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'generalkelengkapanberkasreportformdata'
        }

    ],
    controllerName: 'generalkelengkapanberkasreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Generalkelengkapanberkasreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'generalkelengkapanberkasreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'generalkelengkapanberkasreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'generalkelengkapanberkasreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'generalkelengkapanberkasreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'generalkelengkapanberkasreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'generalkelengkapanberkasreportformdata button[action=reset]': {
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
			var reportFile = "Generalkelengkapanberkas";
			
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
            url: 'erems/generalkelengkapanberkasreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/generalkelengkapanberkasreport/all');
    }

});