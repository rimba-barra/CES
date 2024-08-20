Ext.define('Erems.controller.Opportunitycustomerreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Opportunitycustomerreport',
    views: ['opportunitycustomerreport.Panel', 'opportunitycustomerreport.FormData', 'masterreport.Panel'],
	stores: ['Mastercluster','Mastertype','Unitstatus'],
    models: ['Mastercluster','Mastertype'],
    refs: [
        {
            ref: 'panel',
            selector: 'opportunitycustomerreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'opportunitycustomerreportformdata'
        }

    ],
    controllerName: 'opportunitycustomerreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Opportunitycustomerreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'opportunitycustomerreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'opportunitycustomerreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'opportunitycustomerreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'opportunitycustomerreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'opportunitycustomerreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'opportunitycustomerreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'opportunitycustomerreportformdata [name=cbf_unitstatus_id]': {
                change: me.checkboxChange
            },
			'opportunitycustomerreportformdata [name=unitstatus_id]': {
                select: me.comboboxChange
            },
			'opportunitycustomerreportformdata [name=cbf_statuslunas]': {
                change: me.checkboxChange
            },
			'opportunitycustomerreportformdata [name=lunasstatus_id]': {
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
			
			var reportFile = "OpportunityCustomer";
			
			
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
			var html = me.generateFakeForm2(params,reportFile);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
    panelAfterRender: function(el) {	
        var me = this;
       
        Ext.Ajax.request({
            url: 'erems/opportunitycustomerreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/opportunitycustomerreport/all');
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