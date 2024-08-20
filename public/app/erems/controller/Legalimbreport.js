Ext.define('Erems.controller.Legalimbreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Legalimbreport',
    views: ['legalimbreport.Panel', 'legalimbreport.FormData', 'masterreport.Panel'],
	requires:[
		'Erems.library.template.component.Productcategorycombobox'
	],
	stores: ['Masterproductcategory'],
	models: ['Masterproductcategory'],
    refs: [
        {
            ref: 'panel',
            selector: 'legalimbreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'legalimbreportformdata'
        }

    ],
    controllerName: 'legalimbreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Legalimbreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'legalimbreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'legalimbreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'legalimbreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'legalimbreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'legalimbreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'legalimbreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'legalimbreportformdata [name=cbf_buildingclass]': {
                change: me.checkboxChange
            },
			'legalimbreportformdata [name=buildingclass]': {
                select: me.comboboxChange
            },
			'legalimbreportformdata [name=radiogroup_st]': {
                change: me.checkedRadio
            },
			'legalimbreportformdata [name=cbf_productcategory_id]': {
                change: me.checkboxChange
            },
			'legalimbreportformdata [name=productcategory_id]': {
                select: me.comboboxChange
            },
			'legalimbreportformdata [name=cbf_pricetype_id]': {
                change: me.checkboxChange
            },
			'legalimbreportformdata [name=pricetype_id]': {
                select: me.comboboxChange
            }
        });
    },
	
	checkedRadio: function(rg, sel){
		var me = this;
		var selection = sel['radio_st'];
		
		if(selection == 'sudah_st'){
			me.getFormdata().down('[name=periode_startdate]').setDisabled(false);
			me.getFormdata().down('[name=periode_enddate]').setDisabled(false);
		}else{
			me.getFormdata().down('[name=periode_startdate]').setDisabled(true);
			me.getFormdata().down('[name=periode_enddate]').setDisabled(true);
		}
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
			var reportFile = "Legalimb";
			
			params["group_admin"] = me.getFormdata().down("[name=buildingclass]").getValue();
			var cbf_checked0 = me.getFormdata().down("[name=cbf_buildingclass]").getValue();
			if(cbf_checked0 == '1' || !params["group_admin"]){
				params["group_admin_display"] = 'ALL';
			}
			else{
				params["group_admin_display"] = me.getFormdata().down("[name=buildingclass]").getRawValue();
			}
			
			params["radio_st"] = me.getFormdata().down("[name=radiogroup_st]").getValue().radio_st;
			if(params["radio_st"] == 'ALL'){
				params["radio_st_display"] = 'ALL';
				params["startdate_display"] = 'ALL';
				params["enddate_display"] = 'ALL';
				params["param_startdate"] = null;
				params["param_enddate"] = null;
			} else if(params["radio_st"] == 'belum_st'){
				params["radio_st_display"] = 'Belum';
				params["startdate_display"] = 'ALL';
				params["enddate_display"] = 'ALL';
				params["param_startdate"] = null;
				params["param_enddate"] = null;
			} else if(params["radio_st"] == 'sudah_st'){
				params["radio_st_display"] = 'Sudah';
				
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
			}
			
			params["productcategory_id"] = me.getFormdata().down("[name=productcategory_id]").getValue();
			var cbf_checked2 = me.getFormdata().down("[name=cbf_productcategory_id]").getValue();
			if(cbf_checked2 == '1' || !params["productcategory_id"]){
				params["productcategory_display"] = 'ALL';
			}
			else{
				params["productcategory_display"] = me.getFormdata().down("[name=productcategory_id]").getRawValue();
			}
			
			params["radio_imb"] = me.getFormdata().down("[name=radiogroup_imb]").getValue().radio_imb;
			if(params["radio_imb"] == 'ALL'){
				params["imb_display"] = 'ALL'
			} else if(params["radio_imb"] == 'belum_imb'){
				params["imb_display"] = 'Belum'
			} else if(params["radio_imb"] == 'sudah_imb'){
				params["imb_display"] = 'Sudah'
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
            url: 'erems/legalimbreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/legalimbreport/all');
    }

});