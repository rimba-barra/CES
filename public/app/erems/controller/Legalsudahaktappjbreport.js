Ext.define('Erems.controller.Legalsudahaktappjbreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Legalsudahaktappjbreport',
    views: ['legalsudahaktappjbreport.Panel', 'legalsudahaktappjbreport.FormData', 'masterreport.Panel'],
    requires:[
        'Erems.library.template.component.Clustercombobox',
        'Erems.library.template.component.Productcategorycombobox'
    ],
    stores: ['Mastercluster','Masterproductcategory'],
    models: ['Mastercluster','Masterproductcategory'],
    refs: [
        {
            ref: 'panel',
            selector: 'legalsudahaktappjbreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'legalsudahaktappjbreportformdata'
        }

    ],
    controllerName: 'legalsudahaktappjbreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Legalsudahaktappjbreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'legalsudahaktappjbreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'legalsudahaktappjbreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'legalsudahaktappjbreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'legalsudahaktappjbreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'legalsudahaktappjbreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'legalsudahaktappjbreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'legalsudahaktappjbreportformdata [name=cbf_buildingclass]': {
                change: me.checkboxChange
            },
			'legalsudahaktappjbreportformdata [name=buildingclass]': {
                select: me.comboboxChange
            },
			'legalsudahaktappjbreportformdata [name=cbf_cluster_id]': {
                change: me.checkboxChange
            },
			'legalsudahaktappjbreportformdata [name=cluster_id]': {
                select: me.comboboxChange
            },
			'legalsudahaktappjbreportformdata [name=cbf_productcategory_id]': {
                change: me.checkboxChange
            },
			'legalsudahaktappjbreportformdata [name=productcategory_id]': {
                select: me.comboboxChange
            },
			'legalsudahaktappjbreportformdata [name=cbf_pricetype_id]': {
                change: me.checkboxChange
            },
			'legalsudahaktappjbreportformdata [name=pricetype_id]': {
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
			var reportFile = "Legalsudahaktappjb";
			
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
			
			params["productcategory_id"] = me.getFormdata().down("[name=productcategory_id]").getValue();
			var cbf_checked2 = me.getFormdata().down("[name=cbf_productcategory_id]").getValue();
			if(cbf_checked2 == '1' || !params["productcategory_id"]){
				params["productcategory_display"] = 'ALL';
			}
			else{
				params["productcategory_display"] = me.getFormdata().down("[name=productcategory_id]").getRawValue();
			}
			
			params["pricetype_id"] = me.getFormdata().down("[name=pricetype_id]").getValue();
			var cbf_checked3 = me.getFormdata().down("[name=cbf_pricetype_id]").getValue();
			if(cbf_checked3 == '1' || !params["pricetype_id"]){
				params["pricetype_display"] = 'ALL';
			}
			else{
				params["pricetype_display"] = me.getFormdata().down("[name=pricetype_id]").getRawValue();
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
            url: 'erems/legalsudahaktappjbreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/legalsudahaktappjbreport/all');
    }

});