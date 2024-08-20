Ext.define('Erems.controller.Masteruploadlivestock', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Masteruploadlivestock',
    views: ['masteruploadlivestock.Panel', 'masteruploadlivestock.FormData', 'masterreport.Panel'],
	stores: ['Masterdata.store.Bank'],
	models: ['Masterdata.model.Bank'],
    refs: [
        {
            ref: 'panel',
            selector: 'masteruploadlivestockpanel'
        },
        {
            ref: 'formdata',
            selector: 'masteruploadlivestockformdata'
        }

    ],
    controllerName: 'masteruploadlivestock',
    formWidth: 750,
    fieldName: 'name',
    comboBoxIdEl: [],
    bindPrefixName: 'Masteruploadlivestock',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'masteruploadlivestockpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'masteruploadlivestockformdata': {
                afterrender: this.formDataAfterRender
            },
            'masteruploadlivestockformdata button[action=save]': {
                click: this.mainDataSave
            },
            'masteruploadlivestockformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'masteruploadlivestockformdata button[action=process]': {
                click: function() {
                    me.processUpload();
                }
            },
			'masteruploadlivestockformdata button[action=reset]': {
				click: this.dataReset
            }
        });
    },
	
	processUpload: function() {
		var me = this;

		var form = me.getFormdata().getForm();
		var formVal = form.getValues();

		var msg = '';

		if (form.isValid()) {

			//===== upload images
			form.submit({
				url: 'erems/' + me.controllerName + '/uploadfiles',
				waitMsg: 'Uploading file...',
				success: function (f, a) {
					Ext.Msg.show({
						title: 'Success',
						msg: 'File Uploaded',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK
					});

				},
				failure: function (f, a) {
					Ext.Msg.show({
						title: 'Upload Failed',
						msg: a.result.msg,
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK
					});
				}
			});
			
		}
	},
	
    // processReport: function() {
        // var me = this;
        // var winId = 'myReportWindow';
        // me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        // var paramsStr = me.generateReportParams(me.getFormdata().getForm().getFieldValues());
        // var win = desktop.getWindow(winId);

        // if (win) {
			// var params = me.getFormdata().getForm().getFieldValues();
			
			// var dateNow = new Date();
			
			//// header
			// params["project_name"] = me.project_name;
			// params["pt_name"] = me.pt_name;
			// params["tgl_sekarang"] = dateNow.getDate()+"-"+(dateNow.getMonth()+1)+"-"+dateNow.getFullYear();
            // params["time_sekarang"] = dateNow.getHours()+":"+dateNow.getMinutes()+":"+dateNow.getSeconds();
			// var reportFile = "Stockmepurnajual";
           
			// params["project_id"] = apps.project;
			// params["pt_id"] = apps.pt;
			
			// var html = me.generateFakeForm(params,reportFile);
            // win.down("#MyReportPanel").body.setHTML(html);
            // $("#fakeReportFormID").submit();
        // }
    // },
	
    panelAfterRender: function(el) {	
        var me = this;
       
        Ext.Ajax.request({
            url: 'erems/masteruploadlivestock/read',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
				me.project_name = info.project_name;
				me.pt_name = info.pt_name; 
            },
            //params: {mode_read: 'init'}
        });
        //   me.loadReport(el, 'erems/masteruploadlivestock/all');
    }

});