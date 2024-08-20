Ext.define('Erems.controller.Legalsudahajbreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Legalsudahajbreport',
    views: ['legalsudahajbreport.Panel', 'legalsudahajbreport.FormData', 'masterreport.Panel'],
    refs: [
        {
            ref: 'panel',
            selector: 'legalsudahajbreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'legalsudahajbreportformdata'
        }

    ],
    controllerName: 'legalsudahajbreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Legalsudahajbreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'legalsudahajbreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'legalsudahajbreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'legalsudahajbreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'legalsudahajbreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'legalsudahajbreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'legalsudahajbreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'legalsudahajbreportformdata [name=cbf_buildingclass]': {
                change: me.checkboxChange
            },
			'legalsudahajbreportformdata [name=buildingclass]': {
                select: me.comboboxChange
            },
			'legalsudahajbreportformdata [name=radiogroup_st]': {
                change: me.checkedRadio
            },
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
			var reportFile = "Legalsudahajb";
			
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
				params["radio_st_display"] = 'Belum Serah Terima';
				params["startdate_display"] = 'ALL';
				params["enddate_display"] = 'ALL';
                params["param_startdate"] = null;
                params["param_enddate"] = null;
			} else if(params["radio_st"] == 'sudah_st'){
				params["radio_st_display"] = 'Sudah Serah Terima';
				
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
            url: 'erems/legalsudahajbreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/legalsudahajbreport/all');
    }

});