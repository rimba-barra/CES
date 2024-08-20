Ext.define('Erems.controller.Topupwhatsapp', {
	extend: 'Erems.library.template.controller.Controller2',
	alias: 'controller.Topupwhatsapp',
	views: ['topupwhatsapp.Panel', 'topupwhatsapp.Grid', 'topupwhatsapp.FormSearch', 'topupwhatsapp.FormData'],
	requires: [
		'Erems.library.box.tools.GridForce', 
	],
	stores: ['Topupwhatsapp'],
    models: ['Topupwhatsapp'],
    
	refs: [
		{
			ref: 'mainpanel',
			selector: 'topupwhatsapppanel'
		},
		{
			ref: 'grid',
			selector: 'topupwhatsappgrid'
		},
		{
			ref: 'formsearch',
			selector: 'topupwhatsappformsearch'
		},
		{
			ref: 'formdata',
			selector: 'topupwhatsappformdata'
		}
	],
	myConfig: null,
	controllerName: 'topupwhatsapp',
	fieldName: 'user_fullname',
	bindPrefixName: 'Topupwhatsapp',
	masterData: null,
	tools: null,
	mt: null,
	approve_genco: null,
	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		me.cbf = new Erems.template.ComboBoxFields();
//		_Apps.getController('Mastercluster');
	},
	init: function (application) {
		var me = this;
		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});

		this.control({
			'topupwhatsapppanel': {
				afterrender: this.panelAfterRender,
				beforerender: me.mainPanelBeforeRender
			},
			'topupwhatsappgrid': {
				afterrender: this.gridAfterRender,
				// itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'topupwhatsappgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'topupwhatsappgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'topupwhatsappgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'topupwhatsappgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'topupwhatsappgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'topupwhatsappformsearch button[action=search]': {
				click: this.dataSearch
			},
			'topupwhatsappformsearch button[action=reset]': {
				click: this.dataReset
			},
			'topupwhatsappformdata': {
				afterrender: this.formDataAfterRender,
			},
			'topupwhatsappformdata button[action=save]': {
				click: this.mainDataSave
			},
			'topupwhatsappformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'topupwhatsappformdata #topupwhatsapp_layermap': {
				change: function (fld, a) {
					me.formDataUploadImage(fld, a, 'mode');
				}
			},
			'topupwhatsappformdata button[action=approve]': {
				click: function(){
					var form = me.getFormdata();
					this.approve_reject(1, form.down('#whatsapp_topup_id').getValue());	
				}
			},
			'topupwhatsappformdata button[action=reject]': {
				click: function(){
					var form = me.getFormdata();
					this.approve_reject(2, form.down('#whatsapp_topup_id').getValue());	
				}
			},
			'topupwhatsappgrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, me.getFormsearch().getValues());
				}
			},
		});
	},
	formDataUploadImage: function (fld, a, mode) {
		var me = this;
		var form = fld.up("form");
		me.uploadImage({
			form: form,
			callback: {
				success: function (imageName) {
					me.refreshPhotoInfo(imageName);
				},
				failure: function () {}
			}
		});
	},
	refreshPhotoInfo: function (imageName) {
		var me = this;
		
		var form = me.getFormdata();
		form.down("[name=layer_img]").setValue(imageName);
		me.mt.customerPhoto(form.down("#topupwhatsapp_layermapimage"), imageName, me.myConfig.IMG_FOLDER_TW);
	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);
		var me = this;
		me.mt = new Erems.library.ModuleTools();

		me.tools.ajax({
			params  : {},
			success : function (data, model) {
				me.approve_genco = data['others'][0][0];
			}
		}).read('getgenco'); 

        //get saldo
        this.getSaldo();
	},
	dataReset: function () {
		var me = this;
		me.getFormsearch().getForm().reset();
		me.dataSearch();
	},
	fdar: function () {
		var me = this;
		var f = me.getFormdata();
		var g = me.getGrid();
		var x = {
			init: function () {
				me.setActiveForm(f);
			},
			create: function () {
				f.down("#user_fullname").setValue(apps.username);
				f.down("#user_id").setValue(apps.uid);
			},
			update: function () {
				var rec = me.getGrid().getSelectedRecord();
				f.editedRow = me.getGrid().getSelectedRow();

				f.down('#downloadBtn').setVisible(true); // added by rico 21092022

				if(rec.get("is_approve") == '' && rec.get("is_reject") == ''){
					f.down("#btnSave").show();
					f.down("#topupwhatsapp_layermap").setDisabled(false);
					f.down("#nominal").setDisabled(false);
					f.down("#topup_date").setDisabled(false);
					if(me.approve_genco == 1){
						f.down("#btnApprove").show();
						f.down("#btnReject").show();
					}else{
						f.down("#btnApprove").hide();
						f.down("#btnReject").hide();
					}
				}else{
					f.down("#btnSave").hide();
					f.down("#topupwhatsapp_layermap").setDisabled(true);
					f.down("#nominal").setDisabled(true);
					f.down("#topup_date").setDisabled(true);
				}

				if (rec) {
					f.loadRecord(rec);

					var date = new Date(rec.get("topup_date"));

					f.down("#user_id").setValue(apps.uid);
					f.down("#layer_img").setValue(rec.get("bukti_topup"));
					f.down("#topup_date").setValue(date);
					f.down("#nominal").setValue(accounting.formatMoney(rec.get("nominal")));

					me.mt.customerPhoto(f.down("#topupwhatsapp_layermapimage"), rec.get("bukti_topup"), me.myConfig.IMG_FOLDER_TW);
				}
			}
		};
		return x;
	},
	mainDataSave: function () {
		var me = this;
		me.insSave({
			form: me.getFormdata(),
			grid: me.getGrid(),
			// store: me.localStore.detail,
			// finalData: function (data) {
				// data['detail'] = me.getGriddetail().getJson();
			// 	return data;
			// },
			sync: true,
			callback: {
				create: function (store, form, grid) {

				}
			}
		});
	},
	approve_reject: function (type, id){
		var me = this;

		Ext.MessageBox.show({
			title   : (type == 1) ? 'Approve': 'Reject',
			msg     : 'Are you sure you want to proceed?',
			buttons : Ext.MessageBox.OKCANCEL,
			icon    : Ext.MessageBox.WARNING,
			fn      : function (btn) {
				if (btn == 'ok') {
					me.getFormdata().setLoading("Please wait");
					me.tools.ajax({
						params  : { id: id, type: type },
						success : function (data) { 
							me.getFormdata().setLoading(false);
							me.getFormdata().up('window').close();
							me.getGrid().getStore().reload();
							me.getSaldo();
						}
					}).read('approve_reject');
				} 
			}
		});
	},
    gridSelectionChange: function () {
        var me 		= this;
        var grid 	= me.getGrid(), row = grid.getSelectionModel().getSelection();
        var edit 	= grid.down('#btnEdit');
        var deleteb = grid.down('#btnDelete');
        var view 	= grid.down('#btnView');
        var stat 	= false;

        if (edit !== null) {
            edit.setDisabled(row.length != 1);
        }
        
        if(row.length > 0){
	        for(var i=0;i<row.length;i++){
				if(row[i].get("is_approve") == '' && row[i].get("is_reject") == ''){
					stat = true;
				}else{
					stat = false;
					break;
				}
	        }
        }

        if (deleteb !== null) {
        	if(stat){
    			deleteb.setDisabled(row.length < 1);
        	}else{
    			deleteb.setDisabled(true);
        	}
        }
        
        if (view !== null) {
            view.setDisabled(row.length != 1);
        }
    },
    getSaldo: function () {
        var me = this;
        me.tools.ajax({
            params: {},
            success: function(data, model) {
                var hasil = data['others'][0][0]['HASIL'];
                var saldo = (hasil['saldo'] == null) ? 0: hasil['saldo'];
                Ext.ComponentQuery.query('#textSaldoTopup')[0].setValue('Saldo: '+accounting.formatMoney(saldo));
            }
        }).read('checksaldo');
       
    },
	dataExport: function (el, extra_param={}) {
		var me = this;
		
		el.up('window').body.mask('Creating Excel File, Please Wait...');
		
		Ext.Ajax.timeout = 60000*30;
		
        var obj_export = {
            export_excel : 1
        };

        if (Object.keys(extra_param).length > 0 && extra_param.constructor === Object) {
            obj_export = Object.assign(obj_export, extra_param);
        }

        me.tools.ajax({
            params  : obj_export,
            success: function(response) {
				try{
					var resp = response.others[0][0];
					
					if(resp) {
						if(resp.success == true){
							el.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Info',
								msg: '<a href="' + resp.url + '" target="blank">Click Here For Download Excel File</a>',
								icon: Ext.Msg.INFO,
								//buttons: [], //jika ingin tidak ada buttons
								buttons: Ext.Msg.CANCEL,
								buttonText : 
								{
									cancel : 'Close',
								}
							});
						} else {
							el.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Failure',
								msg: 'Error: Export to Excel Failed.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					}
				}catch(e){
					el.up('window').body.unmask();
					Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Export to Excel Failed.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
			  	}
            },
			failure: function(e){
				el.up('window').body.unmask();
				Ext.Msg.show({
					title: 'Failure',
					msg: 'Error: Export to Excel Failed.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
        }).read('export');
    },
	// added by rico 21092022
	downloadImg: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

		// lokal
		// var url = window.location.protocol + "//" + window.location.host + '/webapps/public/app/erems/uploads/topupwhatsapp/' + row[0].data.bukti_topup;
		
		// test
		// var url = window.location.protocol + "//" + window.location.host + '/webapps-erems2/rico/Ciputra/public/app/erems/uploads/topupwhatsapp/' + row[0].data.bukti_topup;

		// live
		var url = window.location.protocol + "//" + window.location.host + '/webapps/Ciputra/public/app/erems/uploads/topupwhatsapp/' + row[0].data.bukti_topup;
		
		var link = document.createElement('a');
		link.href = url;
		link.download = row[0].data.bukti_topup;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
});