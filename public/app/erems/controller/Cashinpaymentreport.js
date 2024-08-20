Ext.define('Erems.controller.Cashinpaymentreport', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Cashinpaymentreport',
    views: ['cashinpaymentreport.Panel', 'cashinpaymentreport.FormData', 'masterreport.Panel'],
    refs: [
        {
            ref: 'panel',
            selector: 'cashinpaymentreportpanel'
        },
        {
            ref: 'formdata',
            selector: 'cashinpaymentreportformdata'
        }

    ],
    controllerName: 'cashinpaymentreport',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Cashinpaymentreport',
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
            'cashinpaymentreportpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'cashinpaymentreportformdata': {
                afterrender: this.formDataAfterRender
            },
            'cashinpaymentreportformdata button[action=save]': {
                click: this.mainDataSave
            },
            'cashinpaymentreportformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'cashinpaymentreportformdata button[action=process]': {
                click: function() {
                    me.processReport();
                }
            },
			'cashinpaymentreportformdata button[action=reset]': {
				click: this.dataReset
            },
			'cashinpaymentreportformdata [name=cbf_pricetype_id]': {
                change: me.checkboxChange
            },
			'cashinpaymentreportformdata [name=pricetype_id]': {
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
			
			var tglStart2 = me.getFormdata().down("[name=periode_startdate]").getValue();
			var tglEnd2 = me.getFormdata().down("[name=periode_enddate]").getValue();
			if(tglStart2){
				var startDate = new Date(tglStart2);
				params["periode_startdate_display"] = startDate.getDate()+"-"+(startDate.getMonth()+1)+"-"+startDate.getFullYear();
				params["periode_startdate"] = startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate(); //for sql query
			} else {
				params["periode_startdate_display"] = 'ALL';
				params["periode_startdate"] = null;
			}
			if(tglEnd2){
				var endDate = new Date(tglEnd2);
				params["periode_enddate_display"] = endDate.getDate()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getFullYear();
				params["periode_enddate"] = endDate.getFullYear()+"-"+(endDate.getMonth()+ 1)+"-"+endDate.getDate(); //for sql query
			} else {
				params["periode_enddate_display"] = 'ALL';
				params["periode_enddate"] = null;
			}
			
            params["pricetype_id"] = me.getFormdata().down("[name=pricetype_id]").getValue();
			var cbf_checked3 = me.getFormdata().down("[name=cbf_pricetype_id]").getValue();
			if(cbf_checked3 == '1' || !params["pricetype_id"]){
				params["pricetype_display"] = 'ALL';
			}
			else{
				params["pricetype_display"] = me.getFormdata().down("[name=pricetype_id]").getRawValue();
			}
			
			//header
			params["project_name"] = me.project_name;
			params["pt_name"] = me.pt_name;
			params["tgl_sekarang"] = dateNow.getDate()+"-"+(dateNow.getMonth()+1)+"-"+dateNow.getFullYear();
            params["time_sekarang"] = dateNow.getHours()+":"+dateNow.getMinutes()+":"+dateNow.getSeconds();
			var reportFile = "Cashin";
            
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
			url: 'erems/cashinpaymentreport/export/?action=schema',
			params: {
					purchase_startdate: params["purchase_startdate"],
					purchase_enddate: params["purchase_enddate"],
					periode_startdate: params["periode_startdate"],
					periode_enddate: params["periode_enddate"],
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
								msg: 'Error: Create Report Payment Cash In Failed.',
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
                        msg: 'Error: Create Report Payment Cash In Failed.',
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
					msg: 'Error: Create Report Payment Cash In Failed.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
	},
	
    panelAfterRender: function(el) {	
        var me = this;
       
        Ext.Ajax.request({
            url: 'erems/cashinpaymentreport/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/cashinpaymentreport/all');
    },
	

});