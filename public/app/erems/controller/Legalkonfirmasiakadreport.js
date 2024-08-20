Ext.define('Erems.controller.Legalkonfirmasiakadreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Legalkonfirmasiakadreport',
    views: ['legalkonfirmasiakadreport.Panel', 'legalkonfirmasiakadreport.FormData', 'masterreport.Panel'],
    requires:[
        'Erems.library.template.component.Clustercombobox'
    ],
    stores: ['Mastercluster'],
    models: ['Mastercluster'],
    refs: [
        {
            ref: 'panel',
            selector: 'legalkonfirmasiakadreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'legalkonfirmasiakadreportformdata'
        }

    ],
    controllerName: 'legalkonfirmasiakadreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Legalkonfirmasiakadreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'legalkonfirmasiakadreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'legalkonfirmasiakadreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'legalkonfirmasiakadreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'legalkonfirmasiakadreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'legalkonfirmasiakadreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'legalkonfirmasiakadreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'legalkonfirmasiakadreportformdata [name=cbf_buildingclass]': {
                change: me.checkboxChange
            },
			'legalkonfirmasiakadreportformdata [name=buildingclass]': {
                select: me.comboboxChange
            },
			'legalkonfirmasiakadreportformdata [name=cbf_cluster_id]': {
                change: me.checkboxChange
            },
			'legalkonfirmasiakadreportformdata [name=cluster_id]': {
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
			var reportFile = "Legalkonfirmasiakad";
			
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
			
			var tglStart = me.getFormdata().down("[name=akad_startdate]").getValue();
			var tglEnd = me.getFormdata().down("[name=akad_enddate]").getValue();
			if(tglStart){
				var startDate = new Date(tglStart);
				params["akad_startdate_display"] = startDate.getDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
				params["akad_startdate"] = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate(); //for sql query
			} else {
				params["akad_startdate_display"] = 'ALL';
				params["akad_startdate"] = null;
			}
			if(tglEnd){
				var endDate = new Date(tglEnd);
				params["akad_enddate_display"] = endDate.getDate()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getFullYear();
				params["akad_enddate"] = endDate.getFullYear()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getDate(); //for sql query
			} else {
				params["akad_enddate_display"] = 'ALL';
				params["akad_enddate"] = null;
			}
			
			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;
			//console.log(params);
			var html = me.generateFakeForm2(params,reportFile);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
	
    panelAfterRender: function(el) {	
        var me = this;
       
        Ext.Ajax.request({
            url: 'erems/legalkonfirmasiakadreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/legalkonfirmasiakadreport/all');
    }

});