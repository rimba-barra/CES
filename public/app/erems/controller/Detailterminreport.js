Ext.define('Erems.controller.Detailterminreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Detailterminreport',
    views: ['detailterminreport.Panel', 'detailterminreport.FormData', 'masterreport.Panel'],
    refs: [
        {
            ref: 'panel',
            selector: 'detailterminreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'detailterminreportformdata'
        }

    ],
    controllerName: 'detailterminreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Detailterminreport',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
	pt_address: null,
	pt_phone: null,
    init: function(application) {
        var me = this;
        this.control({
            'detailterminreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'detailterminreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'detailterminreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'detailterminreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'detailterminreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'detailterminreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'detailterminreportformdata [name=cbf_pricetype_id]': {
                change: me.checkboxChange
            },
			'detailterminreportformdata [name=pricetype_id]': {
                select: me.comboboxChange
            },
			'detailterminreportformdata [name=cbf_cluster_id]': {
                change: me.checkboxChange
            },
			'detailterminreportformdata [name=cluster_id]': {
                select: me.comboboxChange
            },
        });
    },
    
    processReport: function() {
        var me = this;
        /*var winId = 'myReportWindow';
        me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        var win = desktop.getWindow(winId);*/

        //if (win) {
			var params = me.getFormdata().getForm().getFieldValues();
			
			var dateNow = new Date();
			
			var tglStart = me.getFormdata().down("[name=purchase_startdate]").getValue();
			var tglEnd = me.getFormdata().down("[name=purchase_enddate]").getValue();
			if(tglStart){
				var startDate = new Date(tglStart);
				params["purchase_startdate_display"] = startDate.getDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
				params["purchase_startdate"] = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate(); //for sql query
			} else {
				params["purchase_startdate_display"] = 'ALL';
				params["purchase_startdate"] = null;
			}
			if(tglEnd){
				var endDate = new Date(tglEnd);
				params["purchase_enddate_display"] = endDate.getDate()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getFullYear();
				params["purchase_enddate"] = endDate.getFullYear()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getDate(); //for sql query
			} else {
				params["purchase_enddate_display"] = 'ALL';
				params["purchase_enddate"] = null;
			}
			
			params["pricetype_id"] = me.getFormdata().down("[name=pricetype_id]").getValue();
			var cbf_checked3 = me.getFormdata().down("[name=cbf_pricetype_id]").getValue();
			if(cbf_checked3 == '1' || !params["pricetype_id"]){
				params["pricetype_display"] = 'ALL';
			}
			else{
				params["pricetype_display"] = me.getFormdata().down("[name=pricetype_id]").getRawValue();
			}
			
			params["cluster_id"] = me.getFormdata().down("[name=cluster_id]").getValue();
			var cbf_checked4 = me.getFormdata().down("[name=cluster_id]").getValue();
			if(cbf_checked4 == '1' || !params["cluster_id"]){
				params["cluster_display"] = 'ALL';
			}
			else{
				params["cluster_display"] = me.getFormdata().down("[name=cluster_id]").getRawValue();
			}
			
			//header
			params["project_name"] = me.project_name;
			params["pt_name"] = me.pt_name;
			params["tgl_sekarang"] = dateNow.getDate()+"-"+(dateNow.getMonth()+1)+"-"+dateNow.getFullYear();
            params["time_sekarang"] = dateNow.getHours()+":"+dateNow.getMinutes()+":"+dateNow.getSeconds();
			var reportFile = "Detailtermin";
            
			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;		
			
			//var html = me.generateFakeForm(params,reportFile);
            //win.down("#MyReportPanel").body.setHTML(html);
            //$("#fakeReportFormID").submit();
			
			me.exportData(params);
			
        //}
    },
	
	exportData: function(params){
		var me = this;
		
		me.getFormdata().up('window').body.mask('Creating Report, Please Wait...');
		
		Ext.Ajax.timeout = 60000*30;
		
		Ext.Ajax.request({
			url: 'erems/detailterminreport/export/?action=schema',
			params: {
					cluster_id: params["cluster_id"],
					purchase_startdate: params["purchase_startdate"],
					purchase_enddate: params["purchase_enddate"],
					pricetype_id: params["pricetype_id"]
				},
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
								msg: 'Error: Create Report Detail Termin Schedule Failed.',
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
                        msg: 'Error: Create Report Detail Termin Schedule Failed.',
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
					msg: 'Error: Create Report Detail Termin Schedule Failed.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
	},
	
    panelAfterRender: function(el) {	
        var me = this;
       
        Ext.Ajax.request({
            url: 'erems/detailterminreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/detailterminreport/all');
    },
	

});