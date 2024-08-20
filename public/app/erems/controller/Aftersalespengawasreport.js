Ext.define('Erems.controller.Aftersalespengawasreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Aftersalespengawasreport',
    views: ['aftersalespengawasreport.Panel', 'aftersalespengawasreport.FormData', 'masterreport.Panel'],
    requires:[
        'Erems.library.template.component.Employeecombobox',
        'Erems.library.template.component.Complaintstatuscombobox'
    ],
    stores: ['Masteremployee','Mastercomplaintstatus'],
    models: ['Masteremployee','Mastercomplaintstatus'],
    refs: [
        {
            ref: 'panel',
            selector: 'aftersalespengawasreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'aftersalespengawasreportformdata'
        }

    ],
    controllerName: 'aftersalespengawasreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Aftersalespengawasreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'aftersalespengawasreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'aftersalespengawasreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'aftersalespengawasreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'aftersalespengawasreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'aftersalespengawasreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'aftersalespengawasreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'aftersalespengawasreportformdata [name=cbf_complaintstatus_id]': {
                change: me.checkboxChange
            },
			'aftersalespengawasreportformdata [name=complaintstatus_id]': {
                select: me.comboboxChange
            },
			'aftersalespengawasreportformdata [name=cbf_employee_id]': {
                change: me.checkboxChange
            },
			'aftersalespengawasreportformdata [name=employee_id]': {
                select: me.comboboxChange
            }
        });
    },
	
	formDataAfterRender: function(el) {
        var me = this;
		me.loadComboBoxStore(el);
        var state = el.up('window').state;
		
		//employee_code = PENGAWAS
		var ftStore = null;
		ftStore = el.down('#fd_employeecombobox').getStore();
		ftStore.removeAll();
		ftStore.load({params:{start:0,limit:0,jabatan_code:'PENGAWAS'}});
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
			
			var reportFile = "Aftersalespengawas";
			
			params["employee_id"] = me.getFormdata().down("[name=employee_id]").getValue();
			var cbf_checked = me.getFormdata().down("[name=cbf_employee_id]").getValue();
			if(cbf_checked == '1' || !params["employee_id"]){
				params["employee_id_display"] = 'ALL';
			}
			else{
				params["employee_id_display"] = me.getFormdata().down("[name=employee_id]").getRawValue();
			}
			
			params["complaintstatus_id"] = me.getFormdata().down("[name=complaintstatus_id]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_complaintstatus_id]").getValue();
			if(cbf_checked1 == '1' || !params["complaintstatus_id"]){
				params["complaintstatus_id_display"] = 'ALL';
			}
			else{
				params["complaintstatus_id_display"] = me.getFormdata().down("[name=complaintstatus_id]").getRawValue();
			}
			
			var tglStart = me.getFormdata().down("[name=periode_startdate]").getValue();
			if(tglStart){
				var startDate = new Date(tglStart);
				params["periode_startdate_display"] = startDate.getDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
				params["periode_startdate"] = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate(); //for sql query
			} else {
				params["periode_startdate_display"] = 'ALL';
				params["periode_startdate"] = null;
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
            url: 'erems/aftersalespengawasreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/aftersalespengawasreport/all');
    }

});