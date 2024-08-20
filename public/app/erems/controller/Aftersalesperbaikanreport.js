Ext.define('Erems.controller.Aftersalesperbaikanreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Aftersalesperbaikanreport',
    views: ['aftersalesperbaikanreport.Panel', 'aftersalesperbaikanreport.FormData', 'masterreport.Panel'],
    requires:[
        'Erems.library.template.component.Clustercombobox',
        'Erems.library.template.component.Complaintstatuscombobox'
    ],
    stores: ['Mastercluster','Mastercomplaintstatus'],
    models: ['Mastercluster','Mastercomplaintstatus'],
    refs: [
        {
            ref: 'panel',
            selector: 'aftersalesperbaikanreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'aftersalesperbaikanreportformdata'
        }

    ],
    controllerName: 'aftersalesperbaikanreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Aftersalesperbaikanreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'aftersalesperbaikanreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'aftersalesperbaikanreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'aftersalesperbaikanreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'aftersalesperbaikanreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'aftersalesperbaikanreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'aftersalesperbaikanreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'aftersalesperbaikanreportformdata [name=cbf_cluster_id]': {
				change : me.checkboxChange
            },
			'aftersalesperbaikanreportformdata [name=cluster_id]': {
				select : me.comboboxChange
            },
			'aftersalesperbaikanreportformdata [name=cbf_complaintstatus_id]': {
                change: me.checkboxChange
            },
			'aftersalesperbaikanreportformdata [name=complaintstatus_id]': {
                select: me.comboboxChange
            },
			'aftersalesperbaikanreportformdata [name=cbf_periode_date]': {
                change: me.checkboxChange2
            },
			'aftersalesperbaikanreportformdata [name=periode_startdate]': {
                select: me.comboboxChange2
            },
			'aftersalesperbaikanreportformdata [name=periode_enddate]': {
                select: me.comboboxChange2
            },
			'aftersalesperbaikanreportformdata [name=radiogroup_laporantype]': {
                change: me.checkedRadio
            }
        });
    },
	
	checkboxChange2: function(el) {
		var me = this;
        if (me.getFormdata().down("[name=cbf_periode_date]").getValue() == '0') {
            me.getFormdata().down("[name=periode_startdate]").setDisabled(false);
			me.getFormdata().down("[name=periode_enddate]").setDisabled(false);
        } else {
			me.getFormdata().down("[name=periode_startdate]").setDisabled(true);
			me.getFormdata().down("[name=periode_enddate]").setDisabled(true);
		}
    },
	
	comboboxChange2: function(el) {
		var me = this;
		me.getFormdata().down("[name=cbf_periode_date]").setValue("0");
    },
	
	checkedRadio: function(el) {
		var me = this;
		var select_laporan = me.getFormdata().down("[name=radiogroup_laporantype]").getValue().radio_laporantype;
			if(select_laporan == "detail"){
       			me.getFormdata().down("[name=sort_by]").setDisabled(false);
			} else {
				me.getFormdata().down("[name=sort_by]").setDisabled(true);
			}
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
			
			var reportFile = null;
			var select_laporan = me.getFormdata().down("[name=radiogroup_laporantype]").getValue().radio_laporantype;
			if(select_laporan == "rekap"){
       			reportFile = 'Aftersalesperbaikansummary';
				params["laporantype_display"] = 'Rekap';
				params["sort_by_display"] = 'ALL';
			} else if(select_laporan == "detail") {
				var select_sortby = me.getFormdata().down("[name=sort_by]").getValue();
				params["laporantype_display"] = 'Detail';
				params["select_sortby"] = select_sortby;
				params["sort_by_display"] = me.getFormdata().down("[name=sort_by]").getRawValue();
				if(select_sortby == 'name'){
					reportFile = 'Aftersalesperbaikantype';
				} else if(select_sortby == 'complainttype') {
					reportFile = 'Aftersalesperbaikancomplaint';
				}
			}
			
			params["cluster_id"]    = me.getFormdata().down("[name=cluster_id]").getValue();
			var cbf_checked_cluster = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
			if(cbf_checked_cluster == '1' || !params["cluster_id"]){
				params["cluster_id_display"] = 'ALL';
			}
			else{
				params["cluster_id_display"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
			}
			
			params["complaintstatus_id"] = me.getFormdata().down("[name=complaintstatus_id]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_complaintstatus_id]").getValue();
			if(cbf_checked1 == '1' || !params["complaintstatus_id"]){
				params["complaintstatus_id_display"] = 'ALL';
			}
			else{
				params["complaintstatus_id_display"] = me.getFormdata().down("[name=complaintstatus_id]").getRawValue();
			}
			
			var cbf_checked2 = me.getFormdata().down("[name=cbf_periode_date]").getValue();
			if(cbf_checked2 == '1'){ //ALL
				params["periode_startdate_display"] = 'ALL';
				params["periode_startdate"] = null;
				params["periode_enddate_display"] = 'ALL';
				params["periode_enddate"] = null;
			} else {
				var tglStart = me.getFormdata().down("[name=periode_startdate]").getValue();
				var tglEnd = me.getFormdata().down("[name=periode_enddate]").getValue();
				if(tglStart){
					var startDate = new Date(tglStart);
					params["periode_startdate_display"] = startDate.getDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
					params["periode_startdate"] = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate(); //for sql query
				} else {
					params["periode_startdate_display"] = 'ALL';
					params["periode_startdate"] = null;
				}
				if(tglEnd){
					var endDate = new Date(tglEnd);
					params["periode_enddate_display"] = endDate.getDate()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getFullYear();
					params["periode_enddate"] = endDate.getFullYear()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getDate(); //for sql query
				} else {
					params["periode_enddate_display"] = 'ALL';
					params["periode_enddate"] = null;
				}
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
            url: 'erems/aftersalesperbaikanreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/aftersalesperbaikanreport/all');
    }

});