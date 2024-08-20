Ext.define('Erems.controller.Aftersalesstatushunianreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Aftersalesstatushunianreport',
    views: ['aftersalesstatushunianreport.Panel', 'aftersalesstatushunianreport.FormData', 'masterreport.Panel'],
    refs: [
        {
            ref: 'panel',
            selector: 'aftersalesstatushunianreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'aftersalesstatushunianreportformdata'
        }

    ],
    controllerName: 'aftersalesstatushunianreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Aftersalesstatushunianreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'aftersalesstatushunianreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'aftersalesstatushunianreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'aftersalesstatushunianreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'aftersalesstatushunianreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'aftersalesstatushunianreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'aftersalesstatushunianreportformdata button[action=reset]': {
				click: this.dataReset
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
			var reportFile = "Aftersalesstatushunian";
			
			params["radio_statushunian"] = me.getFormdata().down("[name=radiogroup_statushunian]").getValue().radio_statushunian;
			if(params["radio_statushunian"] == '1'){
				params["radio_statushunian_display"] = 'Sudah Dihuni';
			} else {
				params["radio_statushunian_display"] = 'Belum Dihuni';
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
            url: 'erems/aftersalesstatushunianreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/aftersalesstatushunianreport/all');
    }

});