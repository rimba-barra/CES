Ext.define('Erems.controller.Qsreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Qsreport',
    views: ['qsreport.Panel', 'qsreport.FormData', 'masterreport.Panel'],
	stores: ['Mastercluster','Mastertype','Unitstatus'],
    models: ['Mastercluster','Mastertype'],
    refs: [
        {
            ref: 'panel',
            selector: 'qsreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'qsreportformdata'
        }

    ],
    controllerName: 'qsreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Qsreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'qsreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'qsreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'qsreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'qsreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'qsreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'qsreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'qsreportformdata [name=cbf_cluster_id]': {
                change: me.checkboxChange
            },
			'qsreportformdata [name=cluster_id]': {
                select: me.comboboxChange
            },
			'qsreportformdata [name=cbf_type_id]': {
                change: me.checkboxChange
            },
			'qsreportformdata [name=type_id]': {
                select: me.comboboxChange
            },
			'qsreportformdata [name=cbf_unitstatus_id]': {
                change: me.checkboxChange
            },
			'qsreportformdata [name=unitstatus_id]': {
                select: me.comboboxChange
            },
			'qsreportformdata [name=cbf_statuslunas]': {
                change: me.checkboxChange
            },
			'qsreportformdata [name=lunasstatus_id]': {
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
			
			var reportFile = "Qs";
			
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
			
			params["unitstatus_id"] = me.getFormdata().down("[name=unitstatus_id]").getValue();
			var cbf_checked3 = me.getFormdata().down("[name=cbf_unitstatus_id]").getValue();
			if(cbf_checked3 == '1' || !params["unitstatus_id"]){
				params["unitstatus_display"] = 'ALL';
			}
			else{
				params["unitstatus_display"] = me.getFormdata().down("[name=unitstatus_id]").getRawValue();
			}
			
			params["lunasstatus_id"] = me.getFormdata().down("[name=lunasstatus_id]").getValue();
			var cbf_checked4 = me.getFormdata().down("[name=cbf_statuslunas]").getValue();
			if(cbf_checked4 == '1' || !params["lunasstatus_id"]){
				params["lunasstatus_display"] = 'ALL';
			}
			else{
				params["lunasstatus_display"] = me.getFormdata().down("[name=lunasstatus_id]").getRawValue();
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
            url: 'erems/qsreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/qsreport/all');
    }

});