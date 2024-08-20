Ext.define('Erems.controller.Legalppjbajbreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Legalppjbajbreport',
    views: ['legalppjbajbreport.Panel', 'legalppjbajbreport.FormData', 'masterreport.Panel'],
    requires:[
        'Erems.library.template.component.Clustercombobox'
    ],
    stores: ['Mastercluster'],
    models: ['Mastercluster'],
    refs: [
        {
            ref: 'panel',
            selector: 'legalppjbajbreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'legalppjbajbreportformdata'
        }

    ],
    controllerName: 'legalppjbajbreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Legalppjbajbreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'legalppjbajbreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'legalppjbajbreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'legalppjbajbreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'legalppjbajbreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'legalppjbajbreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'legalppjbajbreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'legalppjbajbreportformdata [name=cbf_buildingclass]': {
                change: me.checkboxChange
            },
			'legalppjbajbreportformdata [name=buildingclass]': {
                select: me.comboboxChange
            },
			'legalppjbajbreportformdata [name=cbf_cluster_id]': {
                change: me.checkboxChange
            },
			'legalppjbajbreportformdata [name=cluster_id]': {
                select: me.comboboxChange
            },
			'legalppjbajbreportformdata [name=cbf_pricetype_id]': {
                change: me.checkboxChange
            },
			'legalppjbajbreportformdata [name=pricetype_id]': {
                select: me.comboboxChange
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
			var reportFile = "Legalppjbajb";
			
			params["group_admin"] = me.getFormdata().down("[name=buildingclass]").getValue();
			var cbf_checked0 = me.getFormdata().down("[name=cbf_buildingclass]").getValue();
			if(cbf_checked0 == '1' || !params["group_admin"]){
				params["group_admin_display"] = 'ALL';
			}
			else{
				params["group_admin_display"] = me.getFormdata().down("[name=buildingclass]").getRawValue();
			}
			
			params["cluster_id"] = me.getFormdata().down("[name=cluster_id]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
			if(cbf_checked1 == '1' || !params["cluster_id"]){
				params["cluster_display"] = 'ALL';
			}
			else{
				params["cluster_display"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
			}
			
			params["pricetype_id"] = me.getFormdata().down("[name=pricetype_id]").getValue();
			var cbf_checked3 = me.getFormdata().down("[name=cbf_pricetype_id]").getValue();
			if(cbf_checked3 == '1' || !params["pricetype_id"]){
				params["pricetype_display"] = 'ALL';
			}
			else{
				params["pricetype_display"] = me.getFormdata().down("[name=pricetype_id]").getRawValue();
			}
			
			var year_start = me.getFormdata().down("[name=year_start]").getValue();
			params["year_start"] = (year_start) ? year_start : 0;
			
			params["radio_reporttype"] = me.getFormdata().down("[name=radiogroup_reporttype]").getValue().radio_reporttype;
			if(params["radio_reporttype"] == 'ppjb_belum_ajb'){
				params["reporttype_display"] = 'Sudah PPJB belum AJB'
			} else if(params["radio_reporttype"] == 'ajb_belum_baliknama'){
				params["reporttype_display"] = 'Sudah AJB belum Balik Nama'
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
            url: 'erems/legalppjbajbreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/legalppjbajbreport/all');
    }

});