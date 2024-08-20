Ext.define('Erems.controller.Constconstallreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Constconstallreport',
    views: ['constconstallreport.Panel', 'constconstallreport.FormData', 'masterreport.Panel'],
    requires:[
        'Erems.library.template.component.Unitstatuscombobox'
    ],
	stores: ['Mastercluster','Mastertype','Unitstatus'],
    models: ['Mastercluster','Mastertype'],
    refs: [
        {
            ref: 'panel',
            selector: 'constconstallreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'constconstallreportformdata'
        }

    ],
    controllerName: 'constconstallreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Constconstallreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'constconstallreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'constconstallreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'constconstallreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'constconstallreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'constconstallreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'constconstallreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'constconstallreportformdata [name=cbf_cluster_id]': {
                change: me.checkboxChange
            },
			'constconstallreportformdata [name=cluster_id]': {
                select: me.comboboxChange
            },
			'constconstallreportformdata [name=cbf_type_id]': {
                change: me.checkboxChange
            },
			'constconstallreportformdata [name=type_id]': {
                select: me.comboboxChange
            },
			'constconstallreportformdata [name=cbf_statusspk]': {
                change: me.checkboxChange
            },
			'constconstallreportformdata [name=spkstatus_id]': {
                select: me.comboboxChange
            },
			'constconstallreportformdata [name=cbf_statuslunas]': {
                change: me.checkboxChange
            },
			'constconstallreportformdata [name=lunasstatus_id]': {
                select: me.comboboxChange
            },
			'constconstallreportformdata [name=cbf_statusunit]': {
                change: me.checkboxChange
            },
			'constconstallreportformdata [name=unitstatus_id]': {
                select: me.comboboxChange
            },
            'constconstallreportformdata button[action=excel]': {
                click: function() {
                    me.processExcelReport();
                }
            },
        });
    },
    processExcelReport:function(){
        var me = this;
        var f = me.getFormdata();
        var params = f.getValues();
        params["mode_read"] = "excel";
        f.setLoading("Please wait...");
		Ext.Ajax.timeout = 60000 * 10;
        Ext.Ajax.request({
            url: 'erems/constconstallreport/read',
            params: params,
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
                f.setLoading(false);
		if (info.HASIL) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + info.URL + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {

                        }
                    });
                }else{
                    Ext.Msg.show({
                        title: 'Warning',
                        msg: info.MSG,
                        icon: Ext.Msg.WARNING,
                    
                        fn: function() {

                        }
        });
                }
    },
	
        });
    },
    /*processReport: function() {
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
			var reportFile = "Constconstall";
			
			params["cluster_id"] = me.getFormdata().down("[name=cluster_id]").getValue();
			var cbf_checked1 = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
			if(cbf_checked1 == '1' || !params["cluster_id"]){
				params["cluster_display"] = 'ALL';
			}
			else{
				params["cluster_display"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
			}
			
			params["type_id"] = me.getFormdata().down("[name=type_id]").getValue();
			var cbf_checked2 = me.getFormdata().down("[name=cbf_type_id]").getValue();
			if(cbf_checked2 == '1' || !params["type_id"]){
				params["type_display"] = 'ALL';
			}
			else{
				params["type_display"] = me.getFormdata().down("[name=type_id]").getRawValue();
			}
			
			params["spkstatus_id"] = me.getFormdata().down("[name=spkstatus_id]").getValue();
			var cbf_checked3 = me.getFormdata().down("[name=cbf_statusspk]").getValue();
			if(cbf_checked3 == '1' || !params["spkstatus_id"]){
				params["spkstatus_display"] = 'ALL';
			}
			else{
				params["spkstatus_display"] = me.getFormdata().down("[name=spkstatus_id]").getRawValue();
			}
			
			params["lunasstatus_id"] = me.getFormdata().down("[name=lunasstatus_id]").getValue();
			var cbf_checked4 = me.getFormdata().down("[name=cbf_statuslunas]").getValue();
			if(cbf_checked4 == '1' || !params["lunasstatus_id"]){
				params["lunasstatus_display"] = 'ALL';
			}
			else{
				params["lunasstatus_display"] = me.getFormdata().down("[name=lunasstatus_id]").getRawValue();
			}
			
			var cp_start = me.getFormdata().down("[name=cp_start]").getValue();
			var cp_end = me.getFormdata().down("[name=cp_end]").getValue();
			if(cp_start){
				params["cp_start_display"] = cp_start+'%';
				params["cp_start"] = cp_start;
			} else {
				params["cp_start_display"] = 'ALL';
				params["cp_start"] = null;
			}
			if(cp_end){
				params["cp_end_display"] = cp_end+'%';
				params["cp_end"] = cp_end;
			} else {
				params["cp_end_display"] = 'ALL';
				params["cp_end"] = null;
			}
			
			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;
			
			var html = me.generateFakeForm2(params,reportFile);
            win.down("#MyReportPanel").body.setHTML(html);
            $("#fakeReportFormID").submit();
        }
    },*/
	
	processReport: function() {
        var me = this;
		
		var params = me.getFormdata().getForm().getFieldValues();
				
		var dateNow = new Date();
		
		//header
		params["project_name"] = me.project_name;
		params["pt_name"] = me.pt_name;
		params["tgl_sekarang"] = dateNow.getDate()+"-"+(dateNow.getMonth()+1)+"-"+dateNow.getFullYear();
		params["time_sekarang"] = dateNow.getHours()+":"+dateNow.getMinutes()+":"+dateNow.getSeconds();
		var reportFile = "Constconstall";
		
		params["cluster_id"] = me.getFormdata().down("[name=cluster_id]").getValue();
		var cbf_checked1 = me.getFormdata().down("[name=cbf_cluster_id]").getValue();
		if(cbf_checked1 == '1' || !params["cluster_id"]){
			params["cluster_display"] = 'ALL';
		}
		else{
			params["cluster_display"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
		}
		
		params["type_id"] = me.getFormdata().down("[name=type_id]").getValue();
		var cbf_checked2 = me.getFormdata().down("[name=cbf_type_id]").getValue();
		if(cbf_checked2 == '1' || !params["type_id"]){
			params["type_display"] = 'ALL';
		}
		else{
			params["type_display"] = me.getFormdata().down("[name=type_id]").getRawValue();
		}
		
		params["spkstatus_id"] = me.getFormdata().down("[name=spkstatus_id]").getValue();
		var cbf_checked3 = me.getFormdata().down("[name=cbf_statusspk]").getValue();
		if(cbf_checked3 == '1' || !params["spkstatus_id"]){
			params["spkstatus_display"] = 'ALL';
		}
		else{
			params["spkstatus_display"] = me.getFormdata().down("[name=spkstatus_id]").getRawValue();
		}
		
		params["lunasstatus_id"] = me.getFormdata().down("[name=lunasstatus_id]").getValue();
		var cbf_checked4 = me.getFormdata().down("[name=cbf_statuslunas]").getValue();
		if(cbf_checked4 == '1' || !params["lunasstatus_id"]){
			params["lunasstatus_display"] = 'ALL';
		}
		else{
			params["lunasstatus_display"] = me.getFormdata().down("[name=lunasstatus_id]").getRawValue();
		}
		
		params["unitstatus_id"] = me.getFormdata().down("[name=unitstatus_id]").getValue();
		var cbf_checked5 = me.getFormdata().down("[name=cbf_statusunit]").getValue();
		if(cbf_checked5 == '1' || !params["unitstatus_id"]){
			params["unitstatus_display"] = 'ALL';
		}
		else{
			params["unitstatus_display"] = me.getFormdata().down("[name=unitstatus_id]").getRawValue();
		}
		
		var cp_start = me.getFormdata().down("[name=cp_start]").getValue();
		var cp_end = me.getFormdata().down("[name=cp_end]").getValue();
		if(cp_start){
			params["cp_start_display"] = cp_start;
			params["cp_start"] = cp_start;
		} else {
			params["cp_start_display"] = 'ALL';
			params["cp_start"] = null;
		}
		if(cp_end){
			params["cp_end_display"] = cp_end;
			params["cp_end"] = cp_end;
		} else {
			params["cp_end_display"] = 'ALL';
			params["cp_end"] = null;
		}
		
		params["project_id"] = apps.project;
		params["pt_id"] = apps.pt;
		
		var cbf_excel = me.getFormdata().down("[name=cbf_excel]").getValue();
		if(cbf_excel == '1'){
			me.exportData(params);
			//console.log('excel');
		} else {
			var winId = 'myReportWindow';
			me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
			var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
			var win = desktop.getWindow(winId);
			
			if (win) {
				var html = me.generateFakeForm2(params,reportFile);
				win.down("#MyReportPanel").body.setHTML(html);
				$("#fakeReportFormID").submit();
			}
		}
    },
	
	exportData: function(params){
		var me = this;
		//var cluster_id = params["cluster_id"];
		me.getFormdata().up('window').body.mask('Creating Report, Please Wait...');
		
		Ext.Ajax.timeout = 60000*30;
		
		Ext.Ajax.request({
			url: 'erems/constconstallreport/export/?action=schema',
			params:'data='+Ext.encode(params),
			success: function(response) {
				try{
					var resp = response.responseText;
					
					if(resp) {
						var info = Ext.JSON.decode(resp);
						
						if(info.success == true){
							me.getFormdata().up('window').body.unmask();
							Ext.Msg.show({
								title: 'Info',
								msg: '<a href="' + info.url + '" target="blank">Click Here For Download Report File</a>',
								icon: Ext.Msg.INFO,
								//buttons: [], //jika ingin tidak ada buttons
								buttons: Ext.Msg.CANCEL,
								buttonText : 
								{
									cancel : 'Close',
								}
							});
						} else {
							me.getFormdata().up('window').body.unmask();
							Ext.Msg.show({
								title: 'Failure',
								msg: 'Error: Create Report Stockme Failed.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					}
				}catch(e){
					//console.error(e);
					me.getFormdata().up('window').body.unmask();
					Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Create Report Stockme Failed.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
			  	}
			},
			failure: function(e){
				//console.error(e);
				me.getFormdata().up('window').body.unmask();
				Ext.Msg.show({
					title: 'Failure',
					msg: 'Error: Create Report Stockme Failed.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
	},
	
    panelAfterRender: function(el) {	
        var me = this;
       
        Ext.Ajax.request({
            url: 'erems/constconstallreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/constconstallreport/all');
    }

});