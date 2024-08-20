Ext.define('Erems.controller.Monitoringdendareport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Monitoringdendareport',
    views: ['monitoringdendareport.Panel', 'monitoringdendareport.FormData', 'masterreport.Panel'],
	stores: ['Mastercluster','Mastertype','Unitstatus'],
    models: ['Mastercluster','Mastertype'],
    refs: [
        {
            ref: 'panel',
            selector: 'monitoringdendareportpanel'
        },
        {
            ref: 'formdata',
            selector: 'monitoringdendareportformdata'
        }

    ],
    controllerName : 'monitoringdendareport',
    formWidth      : 750,
    fieldName      : 'name',
    comboBoxIdEl   : [],
    bindPrefixName : 'Monitoringdendareport',
    project_name   : null,
    pt_name        : null,
    reportFile     : 'Monitoringdenda',
    localStore     : {
        detail : null
    },
    init: function(application) {
        var me = this;
        this.control({
            'monitoringdendareportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'monitoringdendareportformdata': {
                afterrender: this.formDataAfterRender
            },
            'monitoringdendareportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'monitoringdendareportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'monitoringdendareportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'monitoringdendareportformdata button[action=reset]': {
				click: this.dataReset
            },
			'monitoringdendareportformdata [name=cbf_cluster_id]': {
                change: me.checkboxChange
            },
			'monitoringdendareportformdata [name=cluster_id]': {
                select: me.comboboxChange
            },
			'monitoringdendareportformdata [name=cbf_type_id]': {
                change: me.checkboxChange
            },
			'monitoringdendareportformdata [name=type_id]': {
                select: me.comboboxChange
            },
			'monitoringdendareportformdata [name=cbf_unitstatus_id]': {
                change: me.checkboxChange
            },
			'monitoringdendareportformdata [name=unitstatus_id]': {
                select: me.comboboxChange
            },
			'monitoringdendareportformdata [name=cbf_statuslunas]': {
                change: me.checkboxChange
            },
			'monitoringdendareportformdata [name=lunasstatus_id]': {
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
			
			// var reportFile = "Monitoringdenda";
			
			params["cluster_id"] = me.getFormdata().down("[name=cluster_id]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
			if(cbf_checked1 == '1' || !params["cluster_id"]){
				params["cluster_display"] = 'ALL';
			}
			else{
				params["cluster_display"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
			}
			
			params["type_id"] = me.getFormdata().down("[name=type_id]").getValue();
			var cbf_checked2 = me.getFormdata().down("[name=cbf_type_id]").getValue();
			if(cbf_checked2 == '1' || !params["type_id"]){
				params["type_display"] = 'ALL';
			}
			else{
				params["type_display"] = me.getFormdata().down("[name=type_id]").getRawValue();
			}
			
			
			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;


	        params["bot_date"] = me.getFormdata().down("[name=bot_date]").getValue();
	        params["top_date"] = me.getFormdata().down("[name=top_date]").getValue();

			var bd = me.xFormatDate(params["bot_date"]);
	        var td = me.xFormatDate(params["top_date"]);
	      
	        params["bot_date"] = bd;
	        params["top_date"] = td;
	        params["Bot_date"] = bd;
	        params["Top_date"] = td;

			//var html = me.generateFakeForm(params,reportFile);
			var html = me.generateFakeForm2(params, me.reportFile);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
    panelAfterRender: function(el) {	
        var me = this;
       
        Ext.Ajax.request({
            url: 'erems/monitoringdendareport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
                
                me.project_name = info.project_name;
                me.pt_name      = info.pt_name; 
                me.reportFile   = info.reportFile; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/monitoringdendareport/all');
    },
    xFormatDate: function(date) {
        if (date) {
            var d = date.getDate();
            var m = (date.getMonth() + 1);
            var y = date.getFullYear();
            return y + "-" + m + "-" + d;
        }
        return "";
    },

});