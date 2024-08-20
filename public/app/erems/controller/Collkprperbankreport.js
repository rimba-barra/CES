Ext.define('Erems.controller.Collkprperbankreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Collkprperbankreport',
    views: ['collkprperbankreport.Panel', 'collkprperbankreport.FormData', 'masterreport.Panel'],
	stores: ['Masterdata.store.Bank'],
	models: ['Masterdata.model.Bank'],
    refs: [
        {
            ref: 'panel',
            selector: 'collkprperbankreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'collkprperbankreportformdata'
        }

    ],
    controllerName: 'collkprperbankreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Collkprperbankreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'collkprperbankreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'collkprperbankreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'collkprperbankreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'collkprperbankreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'collkprperbankreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'collkprperbankreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'collkprperbankreportformdata [name=cbf_bank_id]': {
                change: me.checkboxChange
            },
			'collkprperbankreportformdata [name=bank_id]': {
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
			var reportFile = "Collkprperbank";
			
			params["bank_id"] = me.getFormdata().down("[name=bank_id]").getValue();
			var cbf_checked = me.getFormdata().down("[name=cbf_bank_id]").getValue();
			if(cbf_checked == '1' || !params["bank_id"]){
				params["bank_name"] = 'ALL';
			}else{
				params["bank_name"] = me.getFormdata().down("[name=bank_id]").getRawValue();
			}
           
			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;

            // added by rico 20012023
            params["bot_date"] = me.getFormdata().down("[name=bot_date]").getValue();
            params["top_date"] = me.getFormdata().down("[name=top_date]").getValue();

            var bd = me.xFormatDate(params["bot_date"]);
            var td = me.xFormatDate(params["top_date"]);
          
            params["bot_date"] = bd;
            params["top_date"] = td;
            params["Bot_date"] = bd;
            params["Top_date"] = td;
			
			var html = me.generateFakeForm2(params,reportFile);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
	
    panelAfterRender: function(el) {	
        var me = this;
       
        Ext.Ajax.request({
            url: 'erems/collkprperbankreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/collkprperbankreport/all');
    },
    xFormatDate: function(date) {
        if (date) {
            var d = date.getDate();
            var m = (date.getMonth() + 1);
            var y = date.getFullYear();
            return y + "-" + m + "-" + d;
        }
        return "";
    },

});