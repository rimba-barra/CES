Ext.define('Erems.controller.Statuspembayaranreport', {
	extend : 'Erems.library.template.controller.Controllerreporttb', 
	alias  : 'controller.Statuspembayaranreport',
	views  : ['statuspembayaranreport.Panel', 'statuspembayaranreport.FormData', 'masterreport.Panel'],
	refs   : [
        {
			ref      : 'panel',
			selector : 'statuspembayaranreportpanel'
        },
        {
			ref      : 'formdata',
			selector : 'statuspembayaranreportformdata'
        }
    ],
	controllerName : 'statuspembayaranreport',
	formWidth      : 750,
	fieldName      : 'name',
	comboBoxIdEl   : [],
	bindPrefixName : 'Statuspembayaranreport',
	localStore     : { detail: null },
	project_name   : null,
	pt_name        : null,
	init           : function(application) {
        var me = this;
        me.control({
            'statuspembayaranreportpanel': {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : me.panelAfterRender

            },
            'statuspembayaranreportformdata': {
				afterrender : me.formDataAfterRender
            },
            'statuspembayaranreportformdata [name=radio_status_bayar]': {
                change : me.unable_angsuran
            },
			'statuspembayaranreportformdata button[action=reset]': {
				click : me.reset_data
            },
			'statuspembayaranreportformdata button[action=excel]': {
				click : me.export_excel
            },
        });
    },

    reset_data : function(){
		this.getFormdata().down("[itemId=sudah_bayar]").setValue(false);
		this.getFormdata().down("[itemId=belum_bayar]").setValue(false);
		this.getFormdata().down("[itemId=belum_jatuh_tempo]").setValue(false);
		this.getFormdata().down("[itemId=sudah_akad_kredit]").setValue(false);
		this.getFormdata().down("[itemId=sudah_lunas]").setValue(false);
		this.getFormdata().down("[itemId=belum_akad_kredit_sudah_lunas_dp]").setValue(false);
		this.getFormdata().down("[itemId=all]").setValue(true);
		this.getFormdata().down("[itemId=angsuran_ke]").setDisabled(true);
    },

    unable_angsuran : function(){
    	var boolean = true;
    	if(
    		this.getFormdata().down("[itemId=sudah_bayar]").getValue() || 
    		this.getFormdata().down("[itemId=belum_bayar]").getValue() || 
    		this.getFormdata().down("[itemId=belum_jatuh_tempo]").getValue()
    	){ boolean = false; }
		this.getFormdata().down("[itemId=angsuran_ke]").setDisabled(boolean);
    },

    panelAfterRender : function() { this.getFormdata().down("[itemId=all]").setValue(true); },

    export_excel : function(){
		var me       = this;
		var formData = me.getFormdata();
		formData.up('window').body.mask('Creating Report, Please Wait...');

		var status_bayar = 7;
		if(formData.down('[itemId=sudah_bayar]').getValue()){ status_bayar = 1; }
		else if(formData.down('[itemId=belum_bayar]').getValue()){ status_bayar = 2; }
		else if(formData.down('[itemId=belum_jatuh_tempo]').getValue()){ status_bayar = 3; }
		else if(formData.down('[itemId=sudah_akad_kredit]').getValue()){ status_bayar = 4; }
		else if(formData.down('[itemId=sudah_lunas]').getValue()){ status_bayar = 5; }
		else if(formData.down('[itemId=belum_akad_kredit_sudah_lunas_dp]').getValue()){ status_bayar = 6; }

		var angsuran_ke = 0;
		if(formData.down('[itemId=angsuran_ke]').isDisabled() == false){
			angsuran_ke = formData.down('[itemId=angsuran_ke]').getValue();
		}

		if((status_bayar == 1 || status_bayar == 2 || status_bayar == 3) && (angsuran_ke == 0 || angsuran_ke == '')){
			me.getFormdata().up('window').body.unmask();
			Ext.Msg.show({
				title   : 'Angsuran Failure',
				msg     : 'Error: Field angsuran harus di isi.',
				icon    : Ext.Msg.ERROR,
				buttons : Ext.Msg.OK
			});
		}
		else{
			Ext.Ajax.timeout = 60000 * 30;

			Ext.Ajax.request({
				url: 'erems/statuspembayaranreport/excel/?action=schema',
				params: {
					mode_read    : 'excel',
					angsuran_ke  : angsuran_ke,
					status_bayar : status_bayar
				},
				success: function (response) {
					me.getFormdata().up('window').body.unmask();
					try {
						var info = Ext.JSON.decode(response.responseText);

						me.getFormdata().up('window').body.unmask();
						if (info.success == true) {
							Ext.Msg.show({
								title      : 'Info',
								msg        : 'File generated successfully. <a href="' + info.url + '" target="blank"> Click Here For Download Report File</a>',
								icon       : Ext.Msg.INFO,
								buttons    : [], //[] jika ingin tidak ada buttons
							});
						} else {
							Ext.Msg.show({
								title   : 'Failure',
								msg     : 'Error: Create Report Status Pembayaran Failed.',
								icon    : Ext.Msg.ERROR,
								buttons : Ext.Msg.OK
							});
						}
					} catch (e) {
						Ext.Msg.show({
							title   : 'Failure',
							msg     : 'Error: Create Report Status Pembayaran Failed.',
							icon    : Ext.Msg.ERROR,
							buttons : Ext.Msg.OK
						});
					}
				},
				failure: function (e) {
					me.getFormdata().up('window').body.unmask();
					Ext.Msg.show({
						title   : 'Failure',
						msg     : 'Error: Create Report Status Pembayaran Failed.',
						icon    : Ext.Msg.ERROR,
						buttons : Ext.Msg.OK
					});
				}
			});
		}

    }
});