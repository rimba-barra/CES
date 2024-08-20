Ext.define('Erems.controller.Generalumvskpraccbelumakadreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Generalumvskpraccbelumakadreport',
    views: ['generalumvskpraccbelumakadreport.Panel', 'generalumvskpraccbelumakadreport.FormData', 'masterreport.Panel'],
	stores: ['Masterdata.store.Bank'],
	models: ['Masterdata.model.Bank'],
    refs: [
        {
            ref: 'panel',
            selector: 'generalumvskpraccbelumakadreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'generalumvskpraccbelumakadreportformdata'
        }

    ],
    controllerName: 'generalumvskpraccbelumakadreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Generalumvskpraccbelumakadreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'generalumvskpraccbelumakadreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'generalumvskpraccbelumakadreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'generalumvskpraccbelumakadreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'generalumvskpraccbelumakadreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'generalumvskpraccbelumakadreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'generalumvskpraccbelumakadreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'generalumvskpraccbelumakadreportformdata [name=cbf_bank_id]': {
                change: me.checkboxChange
            },
			'generalumvskpraccbelumakadreportformdata [name=bank_id]': {
                select: me.comboboxChange
            },
			'generalumvskpraccbelumakadreportformdata [name=cbf_kprstatusum_id]': {
                change: me.checkboxChange
            },
			'generalumvskpraccbelumakadreportformdata [name=kprstatusum_id]': {
                select: me.comboboxChange
            },
        });
    },
    
	formDataAfterRender: function(el) {
		//city combobox
		var ftStore = null;
      	ftStore = el.down("[name=bank_id]").getStore();
		ftStore.load({params:{start:0,limit:0}});
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
			var reportFile = "Generalumvskpraccbelumakad";
			
			var tglStart = me.getFormdata().down("[name=periode_startdate]").getValue();
			var tglEnd = me.getFormdata().down("[name=periode_enddate]").getValue();
			if(tglStart){
				var startDate = new Date(tglStart);
				params["startdate_display"] = startDate.getDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
				params["param_startdate"] = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate(); //for sql query
			} else {
				params["startdate_display"] = 'ALL';
				params["param_startdate"] = null;
			}
			if(tglEnd){
				var endDate = new Date(tglEnd);
				params["enddate_display"] = endDate.getDate()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getFullYear();
				params["param_enddate"] = endDate.getFullYear()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getDate(); //for sql query
			} else {
				params["enddate_display"] = 'ALL';
				params["param_enddate"] = null;
			}
			
			params["bank_id"] = me.getFormdata().down("[name=bank_id]").getValue();
			var cbf_checked = me.getFormdata().down("[name=cbf_bank_id]").getValue();
			if(cbf_checked == '1' || !params["bank_id"]){
				params["bank_name"] = 'ALL';
			}
			else{
				params["bank_name"] = me.getFormdata().down("[name=bank_id]").getRawValue();
			}
			
			params["kprstatusum_id"] = me.getFormdata().down("[name=kprstatusum_id]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_kprstatusum_id]").getValue();
			if(cbf_checked1 == '1' || !params["kprstatusum_id"]){
				params["kprstatusum_name"] = 'ALL';
			}
			else{
				params["kprstatusum_name"] = me.getFormdata().down("[name=kprstatusum_id]").getRawValue();
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
            url: 'erems/generalumvskpraccbelumakadreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/generalumvskpraccbelumakadreport/all');
    }

});