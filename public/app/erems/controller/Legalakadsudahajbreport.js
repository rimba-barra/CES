Ext.define('Erems.controller.Legalakadsudahajbreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Legalakadsudahajbreport',
    views: ['legalakadsudahajbreport.Panel', 'legalakadsudahajbreport.FormData', 'masterreport.Panel'],
    requires:[
        'Erems.library.template.component.Clustercombobox'
    ],
    stores: ['Mastercluster'],
    models: ['Mastercluster'],
    refs: [
        {
            ref: 'panel',
            selector: 'legalakadsudahajbreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'legalakadsudahajbreportformdata'
        }

    ],
    controllerName: 'legalakadsudahajbreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Legalakadsudahajbreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'legalakadsudahajbreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'legalakadsudahajbreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'legalakadsudahajbreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'legalakadsudahajbreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'legalakadsudahajbreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'legalakadsudahajbreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'legalakadsudahajbreportformdata [name=cbf_buildingclass]': {
                change: me.checkboxChange
            },
			'legalakadsudahajbreportformdata [name=buildingclass]': {
                select: me.comboboxChange
            },
			'legalakadsudahajbreportformdata [name=cbf_cluster_id]': {
                change: me.checkboxChange
            },
			'legalakadsudahajbreportformdata [name=cluster_id]': {
                select: me.comboboxChange
            },
			'legalakadsudahajbreportformdata [name=cbf_pricetype_id]': {
                change: me.checkboxChange
            },
			'legalakadsudahajbreportformdata [name=pricetype_id]': {
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
			var reportFile = "Legalakadsudahajb";
			
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
			//var html = me.generateFakeForm(params,reportFile);
			var html = me.generateFakeForm2(params,reportFile);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
	
    panelAfterRender: function(el) {	
        var me = this;
       
        Ext.Ajax.request({
            url: 'erems/legalakadsudahajbreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/legalakadsudahajbreport/all');
    }

});