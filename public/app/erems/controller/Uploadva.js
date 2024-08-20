Ext.define('Erems.controller.Uploadva', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Uploadva',
    views: ['uploadva.Panel', 'uploadva.FormData', 'masterreport.Panel'],
    refs: [
        {
            ref: 'panel',
            selector: 'uploadvapanel'
        },
        {
            ref: 'formdata',
            selector: 'uploadvaformdata'
        }

    ],
    controllerName: 'uploadva',
    // formWidth: 750,
    fieldName: 'name',
    bindPrefixName: 'Uploadva',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'uploadvapanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'uploadvaformdata': {
                afterrender: this.formDataAfterRender,
                printE: me.printExcel
            },
            'uploadvaformdata button[action=save]': {
                click: this.mainDataSave
            },
            'uploadvaformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'uploadvaformdata button[action=process]': {
                click: function() {
                    me.processUpload();
                }
            },
			'uploadvaformdata button[action=reset]': {
				click: this.dataReset
            },

        });
    },
	
	processUpload: function() {
		var me = this;
		var form = me.getFormdata().getForm();
		var formVal = form.getValues();

		var msg = '';

		if (form.isValid()) {
            
            var bankName = "";
            var formdata = me.getFormdata();
            var bankName = formdata.down("[name=cb_bank_va]").value;

            if(bankName == null || bankName == "")
            {
                Ext.Msg.show({
                    title: 'Failure',
                    msg: 'Invalid Bank VA',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            else
            {
    			//===== upload file
    			form.submit({
    				url: 'erems/' + me.controllerName + '/uploadfiles',
                    params: {
                        data: bankName,
                    },
                    timeout : 300,
    				waitMsg: 'Uploading file...',
    				success: function (f, a) {
    					Ext.Msg.show({
    						title: 'Success',
    						msg: 'File Uploaded',
    						icon: Ext.Msg.INFO,
    						buttons: Ext.Msg.OK,                        
                            fn: function() {
                                me.getFormdata().getForm().reset();
                            }
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
        }
	},

    printExcel: function(bankName) {

        var me = this;
        var f = me.getFormdata();

        me.getFormdata().setLoading("Creating Excel File, Please Wait...");

        Ext.Ajax.timeout = 60000 * 5;
        Ext.Ajax.request({
            url: 'erems/uploadva/read/?action=schema',
            params: {
                data : bankName,
                mode_read: 'excel'                            
            },
            success: function(response) {
                me.getFormdata().setLoading(false);

                try{
                    var url = Ext.decode(response.responseText).URL;
                    if (url) {
                        Ext.Msg.show({
                            title: 'Info',
                            msg: '<a href="' + url + '" target="blank">Download file</a>',
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK,
                            fn: function() {
                                me.getFormdata().getForm().reset();
                            }
                        });
                    }
                }catch(e){
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Export to Excel Failed.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            },
            failure: function(e){
                me.getFormdata().setLoading(false);
                Ext.Msg.show({
                    title: 'Failure',
                    msg: 'Error: Export to Excel Failed.',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },

});