Ext.define('Erems.controller.Tagihanva', {
    extend: 'Erems.library.template.controller.Controllerreporttb', 
    alias: 'controller.Tagihanva',
    requires: [
        'Erems.library.box.tools.Tools',
        'Erems.library.template.component.Clustercombobox',
    ],
    stores:['Mastercluster'],
    models:['Mastercluster'],
    views: ['tagihanva.Panel', 'tagihanva.FormData', 'masterreport.Panel'],
    refs: [
        {
            ref: 'panel',
            selector: 'tagihanvapanel'
        },
        {
            ref: 'formdata',
            selector: 'tagihanvaformdata'
        }

    ],
    controllerName: 'tagihanva',
    // formWidth: 750,
    fieldName: 'name',
    bindPrefixName: 'Tagihanva',
    localStore: {
        detail: null
    },
	project_name: null,
	pt_name: null,
    init: function(application) {
        var me = this;
        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'tagihanvapanel': {
                afterrender: this.panelAfterRender

            },
            // 'tagihanvaformdata': {
            //     afterrender: this.formDataAfterRender,
            // },

            'tagihanvaformdata button[action=download]': {
                click: this.printExcel
            },


        });
    },
	
	processUpload: function() {
		var me = this;
		var form = me.getFormdata().getForm();
		var formVal = form.getValues();

		var msg = '';

		if (form.isValid()) {

			//===== upload file
			form.submit({
				url: 'erems/' + me.controllerName + '/uploadfiles',
                params: {
                    data: formVal['cb_bank_va'],
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
	},

    printExcel: function() {

        var me = this;
        var bankName = "";
        var formdata = me.getFormdata();
        var bankName = formdata.down("[name=cb_bank_va]").value;
        var cluster = formdata.down("[name=cluster_id]").value;
        
        if(bankName == null || bankName == ""){
            Ext.Msg.show({
                title: 'Failure',
                msg: 'Invalid Bank VA',
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        } else {

            me.getFormdata().setLoading("Creating Excel File, Please Wait...");

            Ext.Ajax.timeout = 60000 * 5;

            Ext.Ajax.request({
                url: 'erems/tagihanva/read/?action=schema',
                params: {
                    data : bankName,
                    //updated by anas 01092021
                    mode_read: 'download',
                    //added by anas 26082021
                    periode_cut_off : formdata.getValues().periode_cut_off,
                    cluster : cluster,
                },
                success: function(response) {
                    me.getFormdata().setLoading(false);

                    try{
                        var url = Ext.decode(response.responseText).URL;
                        if (url) {
                            Ext.Msg.show({
                                title: 'Info',
                                //updated by anas 01092021 - add download buat force download
                                msg: '<a href="' + url + '" target="blank" download=""' + bankName + '"">Download file</a>',
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
        }
    },

    panelAfterRender: function(){
        var me = this;
        var form = me.getFormdata();

        Ext.Ajax.request({
            url: 'erems/tagihanva/read/?action=schema',
            params: {
                mode_read: 'detail'
            },
            success: function(response) {
                var data = Ext.decode(response.responseText).data;
                data.sort();

                form.down("[name=cluster_id]").getStore().add(data);
            }
        });
    },

});