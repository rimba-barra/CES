Ext.define('Erems.controller.Prosestagihanva', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Prosestagihanva',
    views: ['prosestagihanva.Panel', 'prosestagihanva.FormData', 'masterreport.Panel'],
    refs: [
        {
            ref: 'panel',
            selector: 'prosestagihanvapanel'
        },
        {
            ref: 'formdata',
            selector: 'prosestagihanvaformdata'
        }

    ],
    controllerName: 'prosestagihanva',
    // formWidth: 750,
    fieldName: 'name',
    bindPrefixName: 'Prosestagihanva',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        this.control({
            'prosestagihanvapanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'prosestagihanvaformdata': {
                afterrender: this.formDataAfterRender,
                printE: me.printExcel
            },
            'prosestagihanvaformdata button[action=save]': {
                click: this.mainDataSave
            },
            'prosestagihanvaformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'prosestagihanvaformdata button[action=process]': {
                click: function() {
                    me.processUpload();
                }
            },
			'prosestagihanvaformdata button[action=reset]': {
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
    						// msg: a.result.msg,
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
                            // msg: 'No data updated',
    						icon: Ext.Msg.INFO,
    						buttons: Ext.Msg.OK
    					});
    				}
    			});
    		}
        }
	},

});