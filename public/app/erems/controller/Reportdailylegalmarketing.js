Ext.define('Erems.controller.Reportdailylegalmarketing', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Reportdailylegalmarketing',
    views: ['reportdailylegalmarketing.Panel', 'reportdailylegalmarketing.FormData', 'masterreport.Panel'],
    requires:[
        'Erems.library.template.component.Clustercombobox'
    ],
    stores: ['Mastercluster'],
    models: ['Mastercluster'],
    refs: [
        {
            ref: 'panel',
            selector: 'reportdailylegalmarketingpanel'
        },
        {
            ref: 'formdata',
            selector: 'reportdailylegalmarketingformdata'
        }

    ],
    controllerName: 'reportdailylegalmarketing',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Reportdailylegalmarketing',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'reportdailylegalmarketingpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'reportdailylegalmarketingformdata': {
                afterrender: this.formDataAfterRender
            },
            'reportdailylegalmarketingformdata button[action=save]': {
                click: this.mainDataSave
            },
            'reportdailylegalmarketingformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'reportdailylegalmarketingformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'reportdailylegalmarketingformdata button[action=reset]': {
				click: this.dataReset
            },
			'reportdailylegalmarketingformdata [name=cbf_cluster_id]': {
                change: me.checkboxChange
            },
			'reportdailylegalmarketingformdata [name=cluster_id]': {
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
			var reportFile = "Reportdailylegalmarketing";
			
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

            var purchaseStart = me.getFormdata().down("[name=purchase_startdate]").getValue();
            var purchaseEnd = me.getFormdata().down("[name=purchase_enddate]").getValue();
            if(purchaseStart){
                var startDate = new Date(purchaseStart);
                params["purchase_startdate"] = startDate;
                params["param_purchasestart"] = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate(); //for sql query
            } else {
                params["purchase_startdate"] = null;
                params["param_purchasestart"] = null;
            }
            
            if(purchaseEnd){
                var endDate = new Date(purchaseEnd);
                params["purchase_enddate"] = endDate;
                params["param_purchaseend"] = endDate.getFullYear()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getDate(); //for sql query
            } else {
                params["purchase_enddate"] = null;
                params["param_purchaseend"] = null;
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
            url: 'erems/reportdailylegalmarketing/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/reportdailylegalmarketing/all');
    }

});