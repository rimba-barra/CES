Ext.define('Erems.controller.Reportdailyadminestate', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Reportdailyadminestate',
    views: ['reportdailyadminestate.Panel', 'reportdailyadminestate.FormData', 'masterreport.Panel'],
    requires:[
        'Erems.library.template.component.Clustercombobox'
    ],
    stores: ['Mastercluster'],
    models: ['Mastercluster'],
    refs: [
        {
            ref: 'panel',
            selector: 'reportdailyadminestatepanel'
        },
        {
            ref: 'formdata',
            selector: 'reportdailyadminestateformdata'
        }

    ],
    controllerName: 'reportdailyadminestate',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Reportdailyadminestate',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'reportdailyadminestatepanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'reportdailyadminestateformdata': {
                afterrender: this.formDataAfterRender
            },
            'reportdailyadminestateformdata button[action=save]': {
                click: this.mainDataSave
            },
            'reportdailyadminestateformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'reportdailyadminestateformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'reportdailyadminestateformdata button[action=reset]': {
				click: this.dataReset
            },
			'reportdailyadminestateformdata [name=cbf_cluster_id]': {
                change: me.checkboxChange
            },
			'reportdailyadminestateformdata [name=cluster_id]': {
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
			var reportFile = "Reportdailyadminestate";
			
			params["cluster_id"] = me.getFormdata().down("[name=cluster_id]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
			if(cbf_checked1 == '1' || !params["cluster_id"]){
				params["cluster_display"] = 'ALL';
			}else{
				params["cluster_display"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
			}

            var tglStart = me.getFormdata().down("[name=periode_startdate]").getValue();
            var tglEnd = me.getFormdata().down("[name=periode_enddate]").getValue();
            if(tglStart){
                var startDate = new Date(tglStart);
                params["periode_startdate"] = startDate;
                params["param_startdate"] = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate(); //for sql query
            } else {
                params["periode_startdate"] = null;
                params["param_startdate"] = null;
            }
            if(tglEnd){
                var endDate = new Date(tglEnd);
                params["periode_enddate"] = endDate;
                params["param_enddate"] = endDate.getFullYear()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getDate(); //for sql query
            } else {
                params["periode_enddate"] = null;
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
            url: 'erems/reportdailyadminestate/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/reportdailyadminestate/all');
    }

});