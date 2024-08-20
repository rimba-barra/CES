Ext.define('Erems.controller.Constprogressconstreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Constprogressconstreport',
    views: ['constprogressconstreport.Panel', 'constprogressconstreport.FormData', 'masterreport.Panel'],
	stores: ['Mastercluster','Mastertype'],
    models: ['Mastercluster','Mastertype'],
    refs: [
        {
            ref: 'panel',
            selector: 'constprogressconstreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'constprogressconstreportformdata'
        }

    ],
    controllerName: 'constprogressconstreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Constprogressconstreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'constprogressconstreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'constprogressconstreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'constprogressconstreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'constprogressconstreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'constprogressconstreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'constprogressconstreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'constprogressconstreportformdata [name=cbf_cluster_id]': {
                change: me.checkboxChange
            },
			'constprogressconstreportformdata [name=cluster_id]': {
                select: me.comboboxChange
            },
			'constprogressconstreportformdata [name=cbf_type_id]': {
                change: me.checkboxChange
            },
			'constprogressconstreportformdata [name=type_id]': {
                select: me.comboboxChange
            },
			'constprogressconstreportformdata [name=cbf_statusspk]': {
                change: me.checkboxChange
            },
			'constprogressconstreportformdata [name=spkstatus_id]': {
                select: me.comboboxChange
            },
			'constprogressconstreportformdata [name=cbf_statuslunas]': {
                change: me.checkboxChange
            },
			'constprogressconstreportformdata [name=lunasstatus_id]': {
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
			var reportFile = "Constprogressconst";
			
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
			
			params["spkstatus_id"] = me.getFormdata().down("[name=spkstatus_id]").getValue();
			var cbf_checked3 = me.getFormdata().down("[name=cbf_statusspk]").getValue();
			if(cbf_checked3 == '1' || !params["spkstatus_id"]){
				params["spkstatus_display"] = 'ALL';
			}
			else{
				params["spkstatus_display"] = me.getFormdata().down("[name=spkstatus_id]").getRawValue();
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
			
			var html = me.generateFakeForm2(params,reportFile);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
	
    panelAfterRender: function(el) {	
        var me = this;
       
        Ext.Ajax.request({
            url: 'erems/constprogressconstreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/constprogressconstreport/all');
    }

});