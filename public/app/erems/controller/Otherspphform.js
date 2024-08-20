Ext.define('Erems.controller.Otherspphform', {
    extend: 'Erems.library.template.controller.Controllerreporttb', //Controller2
    alias: 'controller.Otherspphform',
    views: ['otherspphform.Panel', 'otherspphform.FormData', 'masterreport.Panel'],
    refs: [
        {
            ref: 'panel',
            selector: 'otherspphformpanel'
        },
        {
            ref: 'formdata',
            selector: 'otherspphformformdata'
        }

    ],
    controllerName: 'otherspphform',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Otherspphform',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'otherspphformpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'otherspphformformdata': {
                afterrender: this.formDataAfterRender
            },
            'otherspphformformdata button[action=save]': {
                click: this.mainDataSave
            },
            'otherspphformformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'otherspphformformdata button[action=processexcel]': {
               click: function() {
                    me.printExcel();
                }
            },
             'otherspphformformdata button[action=upload]': {
               click: function() {
                    me.printExcel();
                }
            },
         	'otherspphformformdata [name=radio_formtype]': {
              change: function (field, newValue, oldValue, desc) {
                    me.processFormType(field,newValue);
                }
                
            },
            
            
			'otherspphformformdata button[action=reset]': {
				click: this.dataReset
            }
        });
    },

     printExcel: function() {

        var me = this;
        var p = me.getPanel();
        p.setLoading("Please wait");
        var f = me.getFormdata();
        var vs = f.getValues();


        Ext.Ajax.timeout = 60000 * 5;

     
        var tipeReport = "excel";


        me.tools.ajax({
            params: vs,
            success: function(data, model) {


                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {

                        }
                    });
                }
            }
        }).read(tipeReport);

    },
    
    processReport: function() {
        var me = this;
		
		var form = me.getFormdata().getForm();
		if (form.isValid()) {
		
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
				var reportFile = null;//params["Groupby"]==="cluster"?"TownPlanningCluster":"TownPlanningType";
				var select_report = me.getFormdata().down("[name=radiogroup_reporttype]").getValue().radio_reporttype;
				if(select_report == "detail"){
					reportFile = 'Salesdireksidetail';
				} else if(select_report == "summary"){
					reportFile = 'Salesdireksisummary';
				} else if(select_report == "summary2"){
					reportFile = 'Salesdireksisummarydailyformat';
				} else if(select_report == "summary_target"){
                    reportFile = 'Salesdireksitargetsummary';
                }
				
				// var tahun = me.getFormdata().down("[name=tahun]").getValue();
				// var bulan = me.getFormdata().down("[name=bulan]").getValue();
				// var tanggal = me.getFormdata().down("[name=tanggal]").getValue();
				
				// params["tahun"] = (!tahun) ? 0 : tahun;
				// params["bulan"] = (!bulan) ? 0 : bulan;
				// params["tanggal"] = (!tanggal) ? 0 : tanggal;
				
				var tglStart = me.getFormdata().down("[name=periode_startdate]").getValue();
				var tglEnd = me.getFormdata().down("[name=periode_enddate]").getValue();
				if(tglStart){
					var startDate = new Date(tglStart);
					params["periode_startdate"] = startDate.getDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
					params["param_startdate"] = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate(); //for sql query
				} else {
					params["periode_startdate"] = null;
					params["param_startdate"] = null;
				}
				if(tglEnd){
					var endDate = new Date(tglEnd);
					params["periode_enddate"] = endDate.getDate()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getFullYear();
					params["param_enddate"] = endDate.getFullYear()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getDate(); //for sql query
				} else {
					params["periode_enddate"] = null;
					params["param_enddate"] = null;
				}
				
				params["project_id"] = apps.project;
				params["pt_id"] = apps.pt;
				
				//var html = me.generateFakeForm(params,reportFile);
				var html = me.generateFakeForm2(params,reportFile);
				
				win.down("#MyReportPanel").body.setHTML(html);
				$("#fakeReportFormID").submit();
			}
		}
    },
	
    panelAfterRender: function(el) {	
        var me = this;
       
        Ext.Ajax.request({
            url: 'erems/salesdireksireport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/salesdireksireport/all');
    },

     processFormType: function (field,newValue) {
     	
        var me = this;
        var f = me.getFormdata();
        var value = field.inputValue;
        var status = newValue;

       
        if(value =='import' && status == true){
        
	           f.down("#periode_startdate").setVisible(false);
	           f.down("#periode_enddate").setVisible(false);
	            f.down("#process").setVisible(false);
	            f.down("#excel_filename").setVisible(true);
	             f.down("#upload").setVisible(true);
        }
         if(value =='download' && status == true){
        
	           f.down("#periode_startdate").setVisible(true);
	           f.down("#periode_enddate").setVisible(true);
	            f.down("#process").setVisible(true);
	           f.down("#excel_filename").setVisible(false);
	            f.down("#upload").setVisible(false);
        }
    },

});