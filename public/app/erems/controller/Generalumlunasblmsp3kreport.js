Ext.define('Erems.controller.Generalumlunasblmsp3kreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Generalumlunasblmsp3kreport',
    views: ['generalumlunasblmsp3kreport.Panel', 'generalumlunasblmsp3kreport.FormData', 'masterreport.Panel'],
	stores: ['Masterdata.store.Bank'],
	models: ['Masterdata.model.Bank'],
    refs: [
        {
            ref: 'panel',
            selector: 'generalumlunasblmsp3kreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'generalumlunasblmsp3kreportformdata'
        }

    ],
    controllerName: 'generalumlunasblmsp3kreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Generalumlunasblmsp3kreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'generalumlunasblmsp3kreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'generalumlunasblmsp3kreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'generalumlunasblmsp3kreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'generalumlunasblmsp3kreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'generalumlunasblmsp3kreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'generalumlunasblmsp3kreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'generalumlunasblmsp3kreportformdata [name=cbf_bank_id]': {
                change: me.checkboxChange
            },
			'generalumlunasblmsp3kreportformdata [name=bank_id]': {
                select: me.comboboxChange
            }
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
			var reportFile = "Generalumlunasblmsp3k";
			
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
			
			params["radio_status_rekomendasi_batal"] = me.getFormdata().down("[name=radiogroup_status_rekomendasi_batal]").getValue().radio_status_rekomendasi_batal;
			if(params["radio_status_rekomendasi_batal"] == 'is_recommended'){
				params["status_display"] = 'Sedang Rekomendasi Batal'
			} else if(params["radio_status_rekomendasi_batal"] == 'is_not_recommended'){
				params["status_display"] = 'Tidak Sedang Rekomendasi Batal'
			} else {
				params["status_display"] = 'ALL'
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
            url: 'erems/generalumlunasblmsp3kreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/generalumlunasblmsp3kreport/all');
    }

});