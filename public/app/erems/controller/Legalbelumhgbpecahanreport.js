Ext.define('Erems.controller.Legalbelumhgbpecahanreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Legalbelumhgbpecahanreport',
    views: ['legalbelumhgbpecahanreport.Panel', 'legalbelumhgbpecahanreport.FormData', 'masterreport.Panel'],
    requires:[
        'Erems.library.template.component.Productcategorycombobox'
    ],
	stores: ['Masterdata.store.Bank','Masterproductcategory'],
	models: ['Masterdata.model.Bank','Masterproductcategory'],
    refs: [
        {
            ref: 'panel',
            selector: 'legalbelumhgbpecahanreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'legalbelumhgbpecahanreportformdata'
        }

    ],
    controllerName: 'legalbelumhgbpecahanreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Legalbelumhgbpecahanreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'legalbelumhgbpecahanreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'legalbelumhgbpecahanreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'legalbelumhgbpecahanreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'legalbelumhgbpecahanreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'legalbelumhgbpecahanreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'legalbelumhgbpecahanreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'legalbelumhgbpecahanreportformdata [name=cbf_buildingclass]': {
                change: me.checkboxChange
            },
			'legalbelumhgbpecahanreportformdata [name=buildingclass]': {
                select: me.comboboxChange
            },
			'legalbelumhgbpecahanreportformdata [name=cbf_bank_id]': {
                change: me.checkboxChange
            },
			'legalbelumhgbpecahanreportformdata [name=bank_id]': {
                select: me.comboboxChange
            },
			'legalbelumhgbpecahanreportformdata [name=cbf_productcategory_id]': {
                change: me.checkboxChange
            },
			'legalbelumhgbpecahanreportformdata [name=productcategory_id]': {
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
			var reportFile = "Legalbelumhgbpecahan";
			
			params["group_admin"] = me.getFormdata().down("[name=buildingclass]").getValue();
			var cbf_checked0 = me.getFormdata().down("[name=cbf_buildingclass]").getValue();
			if(cbf_checked0 == '1' || !params["group_admin"]){
				params["group_admin_display"] = 'ALL';
			}
			else{
				params["group_admin_display"] = me.getFormdata().down("[name=buildingclass]").getRawValue();
			}
			
			params["bank_id"] = me.getFormdata().down("[name=bank_id]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_bank_id]").getValue();
			if(cbf_checked1 == '1' || !params["bank_id"]){
				params["bank_name"] = 'ALL';
			}
			else{
				params["bank_name"] = me.getFormdata().down("[name=bank_id]").getRawValue();
			}
			
			params["productcategory_id"] = me.getFormdata().down("[name=productcategory_id]").getValue();
			var cbf_checked2 = me.getFormdata().down("[name=cbf_productcategory_id]").getValue();
			if(cbf_checked2 == '1' || !params["productcategory_id"]){
				params["productcategory_display"] = 'ALL';
			}
			else{
				params["productcategory_display"] = me.getFormdata().down("[name=productcategory_id]").getRawValue();
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
            url: 'erems/legalbelumhgbpecahanreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/legalbelumhgbpecahanreport/all');
    }

});