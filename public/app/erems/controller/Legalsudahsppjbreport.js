Ext.define('Erems.controller.Legalsudahsppjbreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Legalsudahsppjbreport',
    views: ['legalsudahsppjbreport.Panel', 'legalsudahsppjbreport.FormData', 'masterreport.Panel'],
	requires:[
		'Erems.library.template.component.Buildingclasscombobox',
		'Erems.library.template.component.Productcategorycombobox',
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Pricetypecombobox'
	],
	stores: ['Mastercluster','Masterproductcategory','Masterblock'],
	models: ['Mastercluster','Masterproductcategory','Masterblock'],
    refs: [
        {
            ref: 'panel',
            selector: 'legalsudahsppjbreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'legalsudahsppjbreportformdata'
        }

    ],
    controllerName: 'legalsudahsppjbreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Legalsudahsppjbreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'legalsudahsppjbreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'legalsudahsppjbreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'legalsudahsppjbreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'legalsudahsppjbreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'legalsudahsppjbreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'legalsudahsppjbreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'legalsudahsppjbreportformdata [name=cbf_buildingclass]': {
                change: me.checkboxChange
            },
			'legalsudahsppjbreportformdata [name=buildingclass]': {
                select: me.comboboxChange
            },
			'legalsudahsppjbreportformdata [name=cbf_cluster_id]': {
                change: me.checkboxChange
            },
			'legalsudahsppjbreportformdata [name=cluster_id]': {
                select: me.comboboxChange
            },
			'legalsudahsppjbreportformdata [name=cbf_productcategory_id]': {
                change: me.checkboxChange
            },
			'legalsudahsppjbreportformdata [name=productcategory_id]': {
                select: me.comboboxChange
            },
			'legalsudahsppjbreportformdata [name=cbf_pricetype_id]': {
                change: me.checkboxChange
            },
			'legalsudahsppjbreportformdata [name=pricetype_id]': {
                select: me.comboboxChange
            },
			'legalsudahsppjbreportformdata [name=cbf_sign_sppjb_date]': {
                change: me.checkboxChange2
            },
			'legalsudahsppjbreportformdata [name=sign_sppjb_startdate]': {
                select: me.comboboxChange2
            },
			'legalsudahsppjbreportformdata [name=sign_sppjb_enddate]': {
                select: me.comboboxChange2
            },
			'legalsudahsppjbreportformdata [name=radiogroup_status_ttd]': {
                change: me.checkedRadio
            },
            		'legalsudahsppjbreportformdata [name=cbf_block_id]': {
                change: me.checkboxChange
            },
			'legalsudahsppjbreportformdata [name=block_id]': {
                select: me.comboboxChange
            },
        });
    },
	
	checkedRadio: function(rg, sel){
		var me = this;
		var selection = sel['radio_status_ttd'];
		
		if(selection == 'belum_ttd'){
			me.getFormdata().down('[name=sign_sppjb_startdate]').setDisabled(true);
			me.getFormdata().down('[name=sign_sppjb_enddate]').setDisabled(true);
			me.getFormdata().down('[name=cbf_sign_sppjb_date]').setDisabled(true);
		}else{
			me.getFormdata().down('[name=sign_sppjb_startdate]').setDisabled(false);
			me.getFormdata().down('[name=sign_sppjb_enddate]').setDisabled(false);
			me.getFormdata().down('[name=cbf_sign_sppjb_date]').setDisabled(false);
		}
	},
	
	checkboxChange2: function(el) {
		var me = this;
        if (me.getFormdata().down("[name=cbf_sign_sppjb_date]").getValue()) {
            me.getFormdata().down("[name=sign_sppjb_startdate]").setValue();
			me.getFormdata().down("[name=sign_sppjb_enddate]").setValue();
        }
    },
	
	comboboxChange2: function(el) {
		var me = this;
		me.getFormdata().down("[name=cbf_sign_sppjb_date]").setValue("0");
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
                        
            var reportFile = "Legalsudahsppjb";
            params["radio_type_report"] = me.getFormdata().down("[name=radiogroup_type_report]").getValue().radio_type_report;
			if(params["radio_type_report"] == 'standart'){
				reportFile = "Legalsudahsppjb";
			} else if(params["radio_type_report"] == 'additional_sby'){
				reportFile = "Legalsudahsppjb_sby";
			}
			
			params["group_admin"] = me.getFormdata().down("[name=buildingclass]").getValue();
			var cbf_checked0 = me.getFormdata().down("[name=cbf_buildingclass]").getValue();
			if(cbf_checked0 == '1' || !params["group_admin"]){
				params["group_admin_display"] = 'ALL';
			}else{
				params["group_admin_display"] = me.getFormdata().down("[name=buildingclass]").getRawValue();
			}
			
			params["cluster_id"] = me.getFormdata().down("[name=cluster_id]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
			if(cbf_checked1 == '1' || !params["cluster_id"]){
				params["cluster_display"] = 'ALL';
			}else{
				params["cluster_display"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
			}
			
			params["productcategory_id"] = me.getFormdata().down("[name=productcategory_id]").getValue();
			var cbf_checked2 = me.getFormdata().down("[name=cbf_productcategory_id]").getValue();
			if(cbf_checked2 == '1' || !params["productcategory_id"]){
				params["productcategory_display"] = 'ALL';
			}else{
				params["productcategory_display"] = me.getFormdata().down("[name=productcategory_id]").getRawValue();
			}
			
			params["pricetype_id"] = me.getFormdata().down("[name=pricetype_id]").getValue();
			var cbf_checked3 = me.getFormdata().down("[name=cbf_pricetype_id]").getValue();
			if(cbf_checked3 == '1' || !params["pricetype_id"]){
				params["pricetype_display"] = 'ALL';
			}else{
				params["pricetype_display"] = me.getFormdata().down("[name=pricetype_id]").getRawValue();
			}
                        
        	params["block_id"] = me.getFormdata().down("[name=block_id]").getValue();
			var cbf_checked4 = me.getFormdata().down("[name=cbf_block_id]").getValue();
			if(cbf_checked4 == '1' || !params["block_id"]){
				params["block_display"] = 'ALL';
			}else{
				params["block_display"] = me.getFormdata().down("[name=block_id]").getRawValue();
			}
			
			var tglStart = me.getFormdata().down("[name=sppjb_startdate]").getValue();
			var tglEnd = me.getFormdata().down("[name=sppjb_enddate]").getValue();
			if(tglStart){
				var startDate = new Date(tglStart);
				params["sppjb_startdate_display"] = startDate.getDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
				params["sppjb_startdate"] = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate(); //for sql query
			} else {
				params["sppjb_startdate_display"] = 'ALL';
				params["sppjb_startdate"] = null;
			}
			if(tglEnd){
				var endDate = new Date(tglEnd);
				params["sppjb_enddate_display"] = endDate.getDate()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getFullYear();
				params["sppjb_enddate"] = endDate.getFullYear()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getDate(); //for sql query
			} else {
				params["sppjb_enddate_display"] = 'ALL';
				params["sppjb_enddate"] = null;
			}
			
			var tglStart2 = me.getFormdata().down("[name=sign_sppjb_startdate]").getValue();
			var tglEnd2 = me.getFormdata().down("[name=sign_sppjb_enddate]").getValue();
			if(tglStart2){
				var startDate = new Date(tglStart2);
				params["sign_sppjb_startdate_display"] = startDate.getDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
				params["sign_sppjb_startdate"] = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate(); //for sql query
			} else {
				params["sign_sppjb_startdate_display"] = 'ALL';
				params["sign_sppjb_startdate"] = null;
			}

			if(tglEnd2){
				var endDate = new Date(tglEnd2);
				params["sign_sppjb_enddate_display"] = endDate.getDate()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getFullYear();
				params["sign_sppjb_enddate"] = endDate.getFullYear()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getDate(); //for sql query
			} else {
				params["sign_sppjb_enddate_display"] = 'ALL';
				params["sign_sppjb_enddate"] = null;
			}
			
			params["radio_status_ttd"] = me.getFormdata().down("[name=radiogroup_status_ttd]").getValue().radio_status_ttd;
			if(params["radio_status_ttd"] == 'sudah_ttd'){
				params["status_ttd_display"] = 'Sudah Tanda Tangan';
			} else if(params["radio_status_ttd"] == 'belum_ttd'){
				params["status_ttd_display"] = 'Belum Tanda Tangan';
			} else {
				params["status_ttd_display"] = 'ALL';
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
            url: 'erems/legalsudahsppjbreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/legalsudahsppjbreport/all');
    }

});