Ext.define('Erems.controller.Legalbelumaktappjbreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Legalbelumaktappjbreport',
    views: ['legalbelumaktappjbreport.Panel', 'legalbelumaktappjbreport.FormData', 'masterreport.Panel'],
    requires:[
        'Erems.library.template.component.Clustercombobox',
        'Erems.library.template.component.Productcategorycombobox'
    ],
    stores: ['Mastercluster','Masterproductcategory'],
    models: ['Mastercluster','Masterproductcategory'],
    refs: [
        {
            ref: 'panel',
            selector: 'legalbelumaktappjbreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'legalbelumaktappjbreportformdata'
        }

    ],
    controllerName: 'legalbelumaktappjbreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Legalbelumaktappjbreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'legalbelumaktappjbreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'legalbelumaktappjbreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'legalbelumaktappjbreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'legalbelumaktappjbreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'legalbelumaktappjbreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'legalbelumaktappjbreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'legalbelumaktappjbreportformdata [name=cbf_buildingclass]': {
                change: me.checkboxChange
            },
			'legalbelumaktappjbreportformdata [name=buildingclass]': {
                select: me.comboboxChange
            },
			'legalbelumaktappjbreportformdata [name=cbf_cluster_id]': {
                change: me.checkboxChange
            },
			'legalbelumaktappjbreportformdata [name=cluster_id]': {
                select: me.comboboxChange
            },
			'legalbelumaktappjbreportformdata [name=cbf_productcategory_id]': {
                change: me.checkboxChange
            },
			'legalbelumaktappjbreportformdata [name=productcategory_id]': {
                select: me.comboboxChange
            },
			'legalbelumaktappjbreportformdata [name=cbf_pricetype_id]': {
                change: me.checkboxChange
            },
			'legalbelumaktappjbreportformdata [name=pricetype_id]': {
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
			var reportFile = "Legalbelumaktappjb";
			
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
			
			/*params["radio_statusdp"] = me.getFormdata().down("[name=radiogroup_statusdp]").getValue().radio_statusdp;
			if(params["radio_statusdp"] == 'all'){
				params["statusdp_display"] = 'ALL'
			} else if(params["radio_statusdp"] == 'belum_lunas'){
				params["statusdp_display"] = 'Belum Lunas'
			} else if(params["radio_statusdp"] == 'sudah_lunas'){
				params["statusdp_display"] = 'Lunas'
			}*/
			
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
            url: 'erems/legalbelumaktappjbreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/legalbelumaktappjbreport/all');
    }

});