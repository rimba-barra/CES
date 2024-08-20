Ext.define('Erems.controller.Stockmepurnajualreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Stockmepurnajualreport',
    views: ['stockmepurnajualreport.Panel', 'stockmepurnajualreport.FormData', 'masterreport.Panel'],
	stores: ['Masterdata.store.Bank'],
	models: ['Masterdata.model.Bank'],
    refs: [
        {
            ref: 'panel',
            selector: 'stockmepurnajualreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'stockmepurnajualreportformdata'
        }

    ],
    controllerName: 'stockmepurnajualreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Stockmepurnajualreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'stockmepurnajualreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'stockmepurnajualreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'stockmepurnajualreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'stockmepurnajualreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'stockmepurnajualreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'stockmepurnajualreportformdata button[action=reset]': {
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
			var reportFile = "Stockmepurnajual";
           
			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;
			
			var html = me.generateFakeForm(params,reportFile);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },
	
	generateFakeForm: function(paramList, reportFile) {
        var form, x;
        var form = '<form id="fakeReportFormID" action=' + document.URL + 'resources/stimulsoftjsv3/viewer.php?reportfilelocation=' + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
        for (x in paramList) {
            if (paramList[x] === null) {
                paramList[x] = '';
            }
            form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
        }
        form += '<input type="submit" value="post"></form>';
        form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    },
	
    panelAfterRender: function(el) {	
        var me = this;
       
        Ext.Ajax.request({
            url: 'erems/stockmepurnajualreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/stockmepurnajualreport/all');
    }

});