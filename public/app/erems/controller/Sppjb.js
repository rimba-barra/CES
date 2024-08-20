Ext.define('Erems.controller.Sppjb', {
	extend : 'Erems.library.template.controller.Controlleralt',
	alias  : 'controller.Sppjb',
	views  : ['sppjb.Panel', 'sppjb.Grid', 'sppjb.FormSearch', 'sppjb.FormData', 'sppjb.GridDocumentUpload', 'sppjb.FormDataDocumentUpload'],
	stores : ['Sppjb', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masterparametersppjb', 'Masterblock', 'Purchaseletterv2', 'Mastercluster', 'Masterparameterglobal','Masternotaris', 'Documentupload'],
	models : ['Sppjb', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masterparametersppjb', 'Masterblock', 'Purchaseletter', 'Mastercluster', 'Masterparameterglobal'],
	refs   : [
		{
			ref      : 'grid',
			selector : 'sppjbgrid'
		},
		{
			ref      : 'formsearch',
			selector : 'sppjbformsearch'
		},
		{
			ref      : 'formdata',
			selector : 'sppjbformdata'
		},
		{ // added by rico 21022024
			ref      : 'griddocumentupload',
			selector : 'sppjbgriddocumentupload'
		},
		{ // added by rico 21022024
			ref      : 'formdatadocumentupload',
			selector : 'sppjbformdatadocumentupload'
		}
	],
	comboBoxIdEl    : ['fs_cluster_id', 'fs_block_id', 'fs_unit_id'],
	controllerName  : 'sppjb',
	fieldName       : 'sppjb_no',
	bindPrefixName  : 'Sppjb',
	validationItems : [
		{ name: 'purchaseletter_id', msg: 'You must select Kavling / Unit No. first' },
		{ name: 'parametersppjb_id', msg: 'You must select Paramter SPPJB first' }
	],
	formWidth        : 800,
	countLoadProcess : 0,
	ctrler           : '', //for get controller on browse item
	spcreq           : '', //for get param_spcreq on browse item
	veriappr         : 0, //for approval sh3b
	vericode         : '', //for approval sh3b
	validasiPrint    : '', // added by rico 15082023
	check_type 	 	 : false, // added by rico 21022024
	addon 		 	 : new Date(), // added by rico 23022024
	cutoffDate	 	 : '2024-01-01', // added by rico 23022024
	constructor : function (configs) {
		this.callParent(arguments);
		var me = this;
		
		me.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});
	},
	init             : function (application) {
		var me = this;
		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});

		this.control({
			test: me.eventMonthField,
			'sppjbpanel': {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : this.panelAfterRender

			},
			'sppjbgrid': {
				afterrender     : this.gridAfterRender,
				itemdblclick    : this.gridItemDblClick,
				itemcontextmenu : this.gridItemContextMenu,
				selectionchange : this.gridSelectionChange
			},
			'sppjbgrid toolbar button[action=create]': {
				click : function () {
					this.formDataShow('create');
				}
			},
			'sppjbgrid toolbar button[action=update]': {
				click : function () {
					this.formDataShow('update');
				}
			},
			'sppjbgrid toolbar button[action=destroy]': {
				click : this.dataDestroy
			},
			'sppjbgrid toolbar button[action=print]': {
				click : this.dataPrint
			},
			'sppjbgrid actioncolumn': {
				afterrender : this.gridActionColumnAfterRender,
				click       : this.gridActionColumnClick
			},
			'sppjbformsearch': {
				afterrender : this.formSearchAfterRender
			},
			'sppjbformsearch button[action=search]': {
				click : this.dataSearch
			},
			'sppjbformsearch button[action=reset]': {
				click : this.dataReset
			},
			'sppjbformdata': {
				afterrender: this.formDataAfterRender
			},
			'sppjbformdata button[action=save]': {
				click: this.dataSave
			},
			'sppjbformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'sppjbformdata button[action=prinout]': {
				click: this.formDataPrintout
			},
			'sppjbformdata button[action=browse_unit]': {
				click: me.selectUnitGridShow
			},
			'sppjbformdata button[action=browse_paramsppjb]': {
				click: me.selectParamsppjbGridShow
			},
			'sppjbformdata [name=serahterimaplan_month]': {
				change: me.fillSTDate
			},
			'sppjbformdata [name=tandatangan_date]': { // added by rico 21022024
				change: me.checkSignDate
			},

			/* BROWSE CONTROL */
			'sppjbbrowsepanel': {
				beforerender: me.browsepanelBeforeRender
			},
			'sppjbbrowsepanel button[action=select]': {
				click: me.browsegridSelection
			},
			'sppjbbrowsegrid': {
				afterrender: me.browsegridAfterRender
			},
			'sppjbbrowseformsearch': {
				afterrender: me.browseformSearchAfterRender
			},
			'sppjbbrowseformsearch button[action=search]': {
				click: me.browsedataSearch
			},
			'sppjbbrowseformsearch button[action=reset]': {
				click: me.browsedataReset
			},
			/* END BROWSE CONTROL */
			'sppjbformsearch [name=unit_number]': {
				keypress: function (e, el) {
					var me = this;
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				}
			},
			'sppjbformsearch [name=customer_name]': {
				keypress: function (e, el) {
					var me = this;
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				}
			},
			'sppjbgriddocumentupload toolbar button[action=create]': {
				click : function () {
					me.griddocumentButtonClick('create');
				}
			},
			'sppjbgriddocumentupload toolbar button[action=update]': {
				click : function () {
					me.griddocumentButtonClick('update');
				}
			},
			'sppjbgriddocumentupload toolbar button[action=destroy]': {
				click : function () {
					me.griddocumentButtonClick('destroy');
				}
			},
            'sppjbgriddocumentupload actioncolumn': {
                downloadaction: me.actionColumnDownload
            },
            'sppjbformdatadocumentupload #fd_file': {
                change: function(fld, a) {
                    me.formDataUploadFileDoc(fld, a, 'mode');
                }
            },
            'sppjbformdatadocumentupload button[action=save]': {
                click: function(fld, a) {
                    me.saveDocument();
                }
            },
		});
	},
    gridSelectionChange: function() {
        var me = this;
        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

        if(grid.down('#btnEdit') != null){ /// add by erwin.st 09112021 (pengecekan ada tombol edit atau tidak)
            grid.down('#btnEdit').setDisabled(row.length != 1);
        }

        if(grid.down('#btnDelete') != null){ /// add by erwin.st 09112021 (pengecekan ada tombol delete atau tidak)
            grid.down('#btnDelete').setDisabled(row.length < 1);
        }

        if(grid.down('#btnPrint') != null){ ///  (pengecekan ada tombol delete atau tidak)
            grid.down('#btnPrint').setDisabled(row.length != 1);
        }
    },
	dataSave: function () {
		var me = this;
		var form = me.getFormdata().getForm();
		var addingRecord = false;
		if (!me.finalValidation()) {
			return false;
		}

		// added 12 Nov 2013 
		var vp = me.validationProcess();
		var vps = false; // validation prosess status
		if (typeof vp === 'object') {
			vps = vp.status;
			if (!vps) {
				Ext.MessageBox.alert('Alert', vp.msg, function () {
					var x = me.getFormdata().down('[name=' + vp.field + ']');
					if (x !== null) {
						x.markInvalid(vp.msg);
						x.focus();
					}
				});
			}
		} else if (typeof vp === 'boolean') {
			vps = vp;
		}
		// end added 12 Nov 2013

		if (form.isValid() && vps) {
			resetTimer();
			var store = null;
			var fida = me.getFinalData(form.getValues());

			if (me.instantCreateMode) {
				store = _myAppGlobal.getController(me.callerId).getInstanCreateStorex(me.controllerName);
			} else {
				/* Mendefinisikan store sendiri pada saat proses simpan/edit 
				 * yang ada di me.storeProcess
				 * */
				if (!me.storeProcess) {
					store = me.getGrid().getStore();
				} else {
					store = me.storeProcess;
				}
			}

			var msg = function () {
				me.getFormdata().up('window').body.mask('Saving data, please wait ...');
			};
			switch (me.getFormdata().up('window').state.toLowerCase()) {
				case 'create':
					store.add(fida);
					addingRecord = true;
					break;
				case 'update':
					if(apps.subholdingId == 2 && me.addon >= Date.parse(me.cutoffDate)){ // added by rico 2102024
						var sign_date 	= me.getFormdata().down('[name=tandatangan_date]').getValue();
						var gridUpload 	= me.getGriddocumentupload();
						var storeUpload = gridUpload.getStore();
						var dataUpload 	= storeUpload.getRange();

						storeUpload.removeAll();
						storeUpload.load({
							params   : { purchaseletter_id: me.getFormdata().down('[name=purchaseletter_id]').getValue() },
							callback : function (rec) {
								me.check_type = false;

								rec.map((x, y) => {
									if(x.data.document_type == 'SPPJB'){ 
										me.check_type = true; 
										return;
									}
								});
							}
						});

						switch(true){
							case sign_date != null && (dataUpload.length <= 0 || !me.check_type):
								me.tools.alert.warning("Silahkan upload SPPJB yang sudah di Tanda tangan basah terlebih dahulu.");
								me.getFormdata().down('#btnSave').setDisabled(true);
								return;
							break;
							case sign_date == null && (dataUpload.length > 0 || me.check_type):
								me.tools.alert.warning("Silahkan isi sign date terlebih dahulu.");
								me.getFormdata().down('#btnSave').setDisabled(true);
								return;
							break;
							// case sign_date == null && (dataUpload.length <= 0 || (dataUpload.length > 0 || !me.check_type)):
							// 	me.tools.alert.warning("Silahkan upload SPPJB yang sudah di Tanda tangan basah dan isi sign date terlebih dahulu.");
							// 	me.getFormdata().down('#btnSave').setDisabled(true);
							// 	return;
							// break;
							default:
								// me.getFormdata().down('#btnSave').setDisabled(false);

								var idProperty = store.getProxy().getReader().getIdProperty();
								var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
								rec.beginEdit();
								rec.set(fida);
								rec.endEdit();
							break;
						}
					}else{
						var idProperty = store.getProxy().getReader().getIdProperty();
						var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
						rec.beginEdit();
						rec.set(fida);
						rec.endEdit();
					}
					break;
				default:
					return;
			}

			store.on('beforesync', msg);
			store.sync({
				success: function (s) {
					var res = Ext.decode(s.operations[0].response.responseText);

					if (!res) {
						Ext.Msg.show({
							title: 'Failure',
							msg: res.message,
							icon: Ext.Msg.ERROR,
							buttons: Ext.Msg.OK
						});
					} else {
						Ext.Msg.show({
							title: 'Success',
							msg: 'Data saved successfully.',
							icon: Ext.Msg.INFO,
							buttons: Ext.Msg.OK,
							fn: function () {
								me.formDataClose();
							}
						});
					}
				},
				failure: function () {
					me.getFormdata().up('window').body.unmask();
					store.un('beforesync', msg);
					if (store.getCount() > 0 && addingRecord) {
						store.removeAt(store.getCount() - 1);
					}
					store.reload();
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Unable to save data.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			});
		} else {
			Ext.Msg.show({
				title: 'Failure',
				msg: me.checkRequired(form) + ' is required.',
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK
			});
		}
	},
	// added by rico 21062021
	checkRequired: function (form) {
		var me = this;
		var items = form.getFields().items;
		var label = [];
		for (var i = 0; i < items.length; i++) {
			if (!items[i].allowBlank && (items[i].activeError != '' && typeof items[i].activeError !== 'undefined') && items[i].xtype != 'hiddenfield') {
				label.push(items[i].fieldLabel);
			}
		}
		return label.join();
	},
	selectUnitGridShow: function () {
		var me = this;

		me.ctrler = 'Sppjb';
		me.spcreq = 'plSppjb';
		me.instantWindow('browse.Panel', 800, 'Browse Item', 'read', 'myBrowseItemPanel');
	},
	selectParamsppjbGridShow: function () {
		var me = this;

		_myAppGlobal.getController('Masterparametersppjb').browseItem('Sppjb');
	},
	processRowFromItemSelection: function (rows, modul) {
		var me = this;

		switch (modul) {
			case 'purchaseletter':
				me.fillPurchaseletter(rows);
				break;
			case 'masterparametersppjb':
				me.fillMasterParametersppjb(rows);
				break;
		}
	},

	fillPurchaseletter: function (rows) {
		var me = this;

		var me = this;
		var plDetailStore = me.getPurchaseletterdetailStore();
		//me.getFormdata().up('window').body.mask('Loading data...');
		plDetailStore.load({
			params: { mode_read: 'detail', purchaseletter_id: rows[0].get('purchaseletter_id') },
			callback: function (rec) {
				/*if(rec[0].get('sppjb_no') && rec[0].get('sppjb_deleted') == false){
					Ext.Msg.alert('Info', 'This Kavling / Unit No. already have SPPJB');
				} else {*/

				// added by rico 23122022
				if(rec[0].data.is_blokir == 1){
					Ext.Msg.show({
						title: 'Info',
						msg: 'Purchaseletter Terblokir. SPPJB tidak dapat dibuat.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK,
						fn: function () {}
					});

					return;
				}

				me.getFormdata().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
				me.getFormdata().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
				me.getFormdata().down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));

				me.getFormdata().down('[name=sppjb_name]').setValue(rec[0].get('customer_name'));
				me.getFormdata().down('[name=sppjb_address]').setValue(rec[0].get('customer_address'));
				me.getFormdata().down('[name=atasnama]').setValue(rec[0].get('customer_name'));
				me.getFormdata().down('[name=customer_pendanaan]').setValue(rec[0].get('customer_pendanaan'));

				me.getFormdata().down('[name=unit_id]').setValue(rec[0].get('unit_id'));

				me.getFormdata().down('[name=unit_electricity]').setValue(rec[0].get('unit_electricity'));

				me.getFormdata().down('[name=serahterimaplan_month]').setValue(rec[0].get('rencana_serahterima'));
				me.getFormdata().down('[name=serahterimaplan_date]').setValue(rec[0].get('rencana_serahterima_date'));

				me.getFormdata().down('#rencana_st_bln').setValue(true);
				/*if(rec[0].get('rencana_serahterima')){
					me.getFormdata().down('#rencana_st_bln').setValue(true);
					me.getFormdata().down('#serahterimaplan_date').setDisabled(true);
				}
				else{
					me.getFormdata().down('#rencana_st_tgl').setValue(true);	
					me.getFormdata().down('#serahterimaplan_month').setDisabled(true);					
				}*/

				me.getFormdata().down('[name=akad_realisasiondate]').setValue(rec[0].get('akad_realisasiondate'));
				//					var akad_realisasiondate;
				//						akad_realisasiondate = rec[0].get('akad_realisasiondate');	
				//						if(akad_realisasiondate){
				//							akad_realisasiondate = akad_realisasiondate.replace(' 00:00:00.000','');
				//							akad_realisasiondate = akad_realisasiondate.split("-");
				//							akad_realisasiondate = akad_realisasiondate[2] + '-' + akad_realisasiondate[1] + '-' + akad_realisasiondate[0];	
				//							me.getFormdata().down('[name=akad_realisasiondate]').setValue(akad_realisasiondate);
				//						}

				me.fillUnitDataToForm(rec[0]);
				me.fillMasterCustomerData(rec[0], 'customer');

				me.fillSTDate();

				//add by TB on 2019-10-11
				me.getFormdata().down('[name=serahterimaplan_date]').setValue(rec[0].get('rencana_serahterima_date'));
				//}
				// added by rico 14072022
				me.getFormdata().down('[name=customer_address]').setValue(rec[0].get('alamat_koresponden'));
				me.getFormdata().down('[name=customer_ktp_address]').setValue(rec[0].get('alamat_ktp'));
			}
		});
	},
	fillMasterParametersppjb: function (rows) {
		var me = this;

		var me = this;
		var plMasterparametersppjbStore = me.getMasterparametersppjbStore();
		//me.getFormdata().up('window').body.mask('Loading data...');
		plMasterparametersppjbStore.load({
			params: { mode_read: 'detail', parametersppjb_id: rows[0].get('parametersppjb_id') },
			callback: function (rec) {
				me.getFormdata().down('[name=parametersppjb_id]').setValue(rec[0].get('parametersppjb_id'));
				me.fillMasterParametersppjbData(rec[0], 'm_param');
			}
		});
	},

	fillUnitDataToForm: function (data) {

		var me = this;
		var filledFields = ['productcategory', 'type_name', 'land_size', 'long', 'building_size', 'width', 'kelebihan', 'floor', 'block_id', 'cluster_id', 'unit_number', 'pt_name'];

		for (var x in filledFields) {
			if (me.getFormdata().down('[name=unit_' + filledFields[x] + ']') != null) {
				me.getFormdata().down('[name=unit_' + filledFields[x] + ']').setValue(data.data['unit_' + filledFields[x]]);
			}

		}
		me.getFormdata().down('[name=code]').setValue(data.data['cluster_code']);
		me.getFormdata().down('[name=block_code]').setValue(data.data['block_code']);
	},
	fillMasterCustomerData: function (records, prefix) {
		var pr = typeof prefix === 'undefined' ? 'customer' : prefix;
		var me = this;
		var filledFields = [
			'name', 'ktp', 'npwp'
		];

		for (var x in filledFields) {
			if (me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']') != null) {
				me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']').setValue(records.data[pr + '_' + filledFields[x]]);
			}

		}
	},

	fillMasterParametersppjbData: function (records, prefix) {
		var pr = typeof prefix === 'undefined' ? 'm_param' : prefix;
		var me = this;
		var filledFields = [
			'code', 'name_01', 'name_02', 'akta_no', 'akta_date'
		];
		console.log('RECORDS MASTER PARAMETER SPPJB...');
		console.log(records);

		for (var x in filledFields) {
			if (me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']') != null) {
				me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']').setValue(records.data[filledFields[x]]);
			}

		}
	},
	formDataAfterRender: function (el) {
		var me = this;
		me.loadComboBoxStore(el);
		var state = el.up('window').state;

		var form = me.getFormdata();
		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({
			params: { parametername: 'DISABLE_EDIT_SPPJBNAME' },
			callback: function (rec) {
				if (rec.length > 0) {
					var global = rec[0].get('value');
					if (global === '1') {
						form.down('[name=sppjb_name]').setReadOnly(true);
					} else {
						form.down('[name=sppjb_name]').setReadOnly(false);
					}
				} else {
					form.down('[name=sppjb_name]').setReadOnly(false);
				}
			}
		});

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({
			params: { parametername: 'PURCHASELETTER_STATUS_PROJECT' },
			callback: function (rec) {
				if (rec.length > 0) {
					var global = rec[0].get('value');
					if (global === 'APARTMENT') {
						form.down('[name=finish_constr_date]').setVisible(true);
					} else {
						form.down('[name=finish_constr_date]').setVisible(false);
					}
				} else {
					form.down('[name=finish_constr_date]').setVisible(false);
				}
			}
		});

		if (state == 'create') {
			// el.down('#active').setValue(1);
			//me.getFormdata().down('#btnSave').setDisabled(false);
			var form = me.getFormdata();
			var checked = form.down('#rencana_st_tgl').getValue();
			if (checked) {
				form.down('[name=serahterimaplan_month]').setDisabled(true);
				form.down('[name=serahterimaplan_date]').setDisabled(false);
			} else {
				form.down('[name=serahterimaplan_month]').setDisabled(false);
				form.down('[name=serahterimaplan_date]').setDisabled(true);
			}

			Ext.Ajax.request({
				url: 'erems/sppjb/read',
				params: {
					read_type_mode: 'citra_raya'
				},
				success: function (response) {
					if (response.responseText == 'true') {
						form.down('[name=atasnama]').setValue('DIRINYA SENDIRI');
					}
				}
			});

			me.fillDocumentUploadGrid(form.down('[name=purchaseletter_id]').getValue(), form.down('[name=sppjb_id]').getValue()); // added by rico 21022024
		} else {
			me.countLoadProcess = 0;
			me.getFormdata().up('window').body.mask('Loading data, please wait ...');

			var grid = me.getGrid();
			var store = grid.getStore();
			var form = me.getFormdata();

			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);

			me.getFormdata().down('#btnSave').setVisible(!record.data.is_cancel);

			form.down('[name=unit_electricity]').setValue(record.data.electricity);
			form.down('[name=customer_ktp]').setValue(record.data.sppjb_ktp);
			form.down('[name=customer_npwp]').setValue(record.data.sppjb_npwp);

			// load purchase letter data
			var purchaseletterdetailStore = me.getPurchaseletterdetailStore();
			purchaseletterdetailStore.removeAll();
			purchaseletterdetailStore.load({
				params: { purchaseletter_id: record.data.purchaseletter_id, mode_read: 'detail' },
				callback: function (purchaselettedetailrec) {
					console.log('UPDATE UNIT PURCHASE LETTER DATA...');
					console.log(purchaselettedetailrec[0]);
					form.down('[name=purchase_date]').setValue(purchaselettedetailrec[0].get('purchase_date'));
					form.down('[name=customer_name]').setValue(purchaselettedetailrec[0].get('customer_name'));
					form.down('[name=customer_pendanaan]').setValue(purchaselettedetailrec[0].get('customer_pendanaan'));
					form.down('[name=akad_realisasiondate]').setValue(purchaselettedetailrec[0].get('akad_realisasiondate'));
					
					form.down('[name=unit_floor_size]').setValue(purchaselettedetailrec[0].get('unit_floor_size')); // added by rico 20062023

					//					var akad_realisasiondate;
					//						akad_realisasiondate = purchaselettedetailrec[0].get('akad_realisasiondate');	
					//						if(akad_realisasiondate){
					//							akad_realisasiondate = akad_realisasiondate.replace(' 00:00:00.000','');
					//							akad_realisasiondate = akad_realisasiondate.split("-");
					//							akad_realisasiondate = akad_realisasiondate[2] + '-' + akad_realisasiondate[1] + '-' + akad_realisasiondate[0];	
					//							me.getFormdata().down('[name=akad_realisasiondate]').setValue(akad_realisasiondate);
					//						}
					me.fillUnitDataToForm(purchaselettedetailrec[0]);
					me.countLoadProcess += 1;
					//me.checkAllDetailLoadingProcess();
				}
			});

			// load Parameter SPPJB data
			if (record.data.parametersppjb_id > 0) {
				var masterparametersppjbStore = me.getMasterparametersppjbStore();
				masterparametersppjbStore.removeAll();
				masterparametersppjbStore.load({
					params: { mode_read: 'detail', parametersppjb_id: record.data.parametersppjb_id },
					callback: function (masterparametersppjbrec) {
						console.log('UPDATE PARAMETER SPPJB DATA...');
						console.log(masterparametersppjbrec[0]);
						me.fillMasterParametersppjbData(masterparametersppjbrec[0], 'm_param');
						me.countLoadProcess += 1;
						//me.checkAllDetailLoadingProcess();

					}
				});
			}

			///// disable button
			//me.disableFieldForm();
			form.down('#fd_browse_unit_btn').setDisabled(true);
			//// end disable button

			var serahterimaplan_date, serahterimaplan_month;

			serahterimaplan_date = record.data.serahterimaplan_date;
			serahterimaplan_month = record.data.serahterimaplan_month
			if (serahterimaplan_month != 0) {
				form.down('#rencana_st_bln').setValue(true);
				form.down('#serahterimaplan_date').setValue(new Date());
				form.down('#serahterimaplan_date').setDisabled(true);
			}
			else {
				form.down('#rencana_st_tgl').setValue(true);
				form.down('#serahterimaplan_month').setValue(0);
				form.down('#serahterimaplan_month').setDisabled(true);
			}

			if (state == 'update') {
				me.getFormdata().down('#btnPrintout').setDisabled(false);

				var globalparameterStore = me.getMasterparameterglobalStore();
				globalparameterStore.removeAll();
				globalparameterStore.load({
					params: { parametername: 'ENABLE_EDIT_SPPJBNO' },
					callback: function (rec) {
						if (rec.length > 0) {
							var global = rec[0].get('value');
							if (global === '1') {
								form.down('[name=sppjb_no]').setReadOnly(false);
							} else {
								form.down('[name=sppjb_no]').setReadOnly(true);
							}
						} else {
							form.down('[name=sppjb_no]').setReadOnly(true);
						}
					}
				});

			} else if (state == 'read') {
				me.getFormdata().getForm().getFields().each(function (field) { field.setReadOnly(true); });
				me.getFormdata().down('#btnSave').setDisabled(true);
				me.getFormdata().down('#fd_browse_paramsppjb_btn').setDisabled(true);
			}

			me.fillDocumentUploadGrid(form.down('[name=purchaseletter_id]').getValue(), form.down('[name=sppjb_id]').getValue()); // added by rico 21022024
		}

		Ext.Ajax.request({
			url: 'erems/sppjb/read',
			params: {
				read_type_mode: 'subholding_config'
			},
			success: function (response) {
				if (response.responseText == 1) {
					me.getFormdata().down('[name=serahterimaplan_date]').setVisible(true);
					me.getFormdata().down('[name=serahterimaplan_date]').setDisabled(false);
					me.getFormdata().down('[name=serahterimaplan_date]').setReadOnly(true);
					if (state == 'update') {
						me.getFormdata().down('[name=serahterimaplan_date]').setValue(record.data.serahterimaplan_date);
					}
				}
			}
		});
		if(state == 'update'){
			var grid = me.getGrid().getSelectionModel().getSelection()[0];
			me.addon = grid.data.addon;
		}
		
		if(state == 'update' && apps.subholdingId == 2 && me.addon >= Date.parse(me.cutoffDate)){
			var sign_date 	= me.getFormdata().down('[name=tandatangan_date]').getValue();
			var gridUpload 	= me.getGriddocumentupload();
			var storeUpload = gridUpload.getStore();
			var dataUpload 	= storeUpload.getRange();
			var items 		= form.getForm().getFields().items;
			var excludes 	= ['adendum_ke'];

			storeUpload.removeAll();
			storeUpload.load({
				params   : { purchaseletter_id: form.down('[name=purchaseletter_id]').getValue() },
				callback : function (rec) {
					me.check_type = false;

					rec.map((x, y) => {
						if(x.data.document_type == 'SPPJB'){ 
							me.check_type = true; 
							return;
						}
					});

					if(sign_date != null && (rec.length > 0 && me.check_type)){
						// form.down('#btnSave').setDisabled(true);
						form.down('#fd_browse_paramsppjb_btn').setDisabled(true);
						gridUpload.down('#btnNew').setDisabled(true);
						gridUpload.down('#btnDelete').setDisabled(true);

						items.map((rec, key) => {
							if(!excludes.includes(rec.name)){
								rec.setReadOnly(true);
							}else{
								rec.setReadOnly(false);
							}
						});
					}
				}
			});
		}
	},

	/*disableFieldForm: function() {
		var me = this;

		var dF = ['pricetype_id', 'purchase_date', 'formula', 'j_tanda_jadi', 'j_uang_muka', 'j_sisa', 'n_tanda_jadi', 'n_uang_muka', 'n_sisa',
			'_harga_tanah_a', '_harga_tanah_b', '_harga_kelebihan_a', '_harga_kelebihan_b', '_harga_bangunan', '_disc_harga_dasar',
			'_tot_disc_harga_dasar', '_disc_harga_tanah', '_tot_disc_harga_tanah', '_disc_harga_bangunan', '_tot_disc_harga_bangunan',
			'_ppn_tanah', '_tot_ppn_tanah', '_ppn_bangunan', '_tot_ppn_bangunan', '_harga_balik_nama', '_harga_bphtb', '_harga_bajtb',
			'_biaya_administrasi', '_biaya_administrasi_subsidi', '_biaya_p_mutu', '_biaya_paket_tambahan', '_disc_sales', '_tot_disc_sales'];
		var f = me.getFormdata();
		for (var i = 0; i < dF.length; i++) {
			f.down('[name=' + dF[i] + ']').setReadOnly(true);
		}


	},*/

	/*dataReset: function() {
		var me = this;
		me.getFormsearch().getForm().reset();
		
		var el = me.getFormsearch();
		el.down('#fs_cluster_id').setValue('');
		
		me.dataSearch();
	},*/

	dataPrint: function () {
		var me    = this;
		var grid  = me.getGrid();
		var store = grid.getStore();

		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
		var sppjb_id = record.get('sppjb_id');
		var arr = {unit_id : record.get('unit_id'), purchaseletter_id : record.get('purchaseletter_id')};

		//added by anas 08092021
		Ext.Ajax.request({
			url     : 'erems/sppjb/read',
			params  : { read_type_mode: 'sendwa' },
			success : function (response) {
				var obj = JSON.parse(response.responseText);
				me.getPurcheletterSendWaActive = obj[0][0]['getPurcheletterSendWa']['active'];
				me.getPurcheletterSendWaPhone  = obj[0][0]['getPurcheletterSendWa']['phone'];
				me.getPurcheletterSendWaText   = obj[0][0]['getPurcheletterSendWaText'];

				// arr.push(obj[0][0]['validasiPrintSPPJB']); // added by rico 15082023
				arr = Object.assign(arr, {validasiPrint : obj[0][0]['validasiPrintSPPJB'], adendum_ke : record.get('adendum_ke')});

				me.printOut(me, sppjb_id, 'PRINTOUT_SPPJB_DOC', 'erems/sppjb/prinout', arr);							
			}
		});
		//end added by anas 08092021
	},

	formDataPrintout: function () {
		var me   = this;
		var grid = me.getGrid().getSelectionModel().getSelection();

		var record   = grid[0].data; 
		var sppjb_id = me.getFormdata().down('#sppjb_id').getValue();
		var arr      = {unit_id : record.unit_id, purchaseletter_id : record.purchaseletter_id};

		//added by anas 08092021
		Ext.Ajax.request({
			url: 'erems/sppjb/read',
			params: {
				read_type_mode: 'sendwa'
			},
			success: function (response) {
				var obj = JSON.parse(response.responseText);
				me.getPurcheletterSendWaActive = obj[0][0]['getPurcheletterSendWa']['active'];
				me.getPurcheletterSendWaPhone  = obj[0][0]['getPurcheletterSendWa']['phone'];
				me.getPurcheletterSendWaText   = obj[0][0]['getPurcheletterSendWaText'];

				arr = Object.assign(arr, {validasiPrint : obj[0][0]['validasiPrintSPPJB'], adendum_ke : record.adendum_ke});
				
				me.printOut(me, sppjb_id, 'PRINTOUT_SPPJB_DOC', 'erems/sppjb/prinout', arr);
			}
		});
		//end added by anas 08092021

	},

	//================= BROWSE PANEL ================================
	instantWindow: function (panel, width, title, state, id) {
		var me = this;
		var formtitle, formicon;


		title = typeof title == 'undefined' ? 'My Window' : title;
		id = typeof id == 'undefined' ? 'myInstantWindow' : id;
		state = typeof state == 'undefined' ? 'create' : state;
		panel = typeof panel == 'undefined' ? 'Panel' : panel;
		width = typeof width == 'undefined' ? 600 : width;
		formtitle = title;
		formicon = 'icon-form-add';
		var winId = id;



		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: false,
				width: width,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: false,
				items: Ext.create('Erems.view.' + me.controllerName + '.' + panel),
				state: state
			});
		}
		win.show();
	},
	browsepanelBeforeRender: function (el, a, b) {
		var me = this;

		var gridView = Ext.create('Erems.view.sppjb.browse.Grid', {
			region: 'center'
		});
		var searchView = Ext.create('Erems.view.sppjb.browse.FormSearch', {
			region: 'west',
			split: true,
			maxWidth: 500,
			minWidth: 300,
			width: 300,
			collapsed: true,
			collapsible: true,
			iconCls: 'icon-search',
			title: 'Search'
		});
		el.removeAll();
		el.add(gridView);
		el.add(searchView);

		var items = el.items.items[1].items.items;
		var textfield = Ext.ComponentQuery.query('[xtype=textfield]', items);

        for (var i=0;i<textfield.length;i++) {
            textfield[i].on('keypress', function(e, el){
                if (el.getCharCode() === 13) {
                    me.browsedataSearch(e);
                }
            });
        }
	},
	browsegridSelection: function (el) {
		var me 			= this;
		var unitGrid 	= el.up('grid');
		var unitStore 	= el.up('grid').getStore();
		var rows 		= unitGrid.getSelectionModel().getSelection();

		if (rows.length == 1) {
			el.up('window').destroy();

			Ext.Ajax.request({
				url: 'erems/cancellation/read',
				params: {
					purchaseletter_id: rows[0].data.purchaseletter_id,
					read_type_mode: 'popupppjb'
				},
				success: function (response) {
					var json = JSON.parse(response.responseText);

					if(me.ctrler == 'Cancellation'){

						if(json.records.data[0].length > 0 && json.genco_popup == 1){
							Ext.Msg.show({
								title: 'Warning',
								msg: 'Unit ini sudah ttd PPJB, PPJB akan otomatis terhapus di system.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK,
								fn: function(){}
							});
						}
					}
					
					if (me.veriappr > 0 || me.writeoffappr > 0) { // added by rico 15082023
		               // var g = me.getSoldunitgrid();
		               // var gs = g.getStore();
		               // var p = g.getSelectedRow();
		               // var d = gs.getAt(p)
						var f = me.getFormdata();

						Ext.Ajax.request({
							url: 'erems/cancellation/read',
							params: {
								purchaseletter_id: rows[0].data.purchaseletter_id,
								verification_code: me.vericode,
								read_type_mode: 'verificationapproval'
							},
							success: function (response) {
								var obj = JSON.parse(response.responseText)

								if (obj.totalRow > 0) {
									if (obj.data[0]['is_approve'] > 0) {
										_myAppGlobal.getController(me.ctrler).processRowFromItemSelection(rows, 'purchaseletter');
										_myAppGlobal.getController(me.ctrler).isUsedVerification = 1;

										me.fillDocumentUploadGrid(rows[0].data.purchaseletter_id, rows[0].data.sppjb_id);
										//                                me.isUsedVerification = true
									} else {
										Ext.Msg.show({
											title: 'Info',
											msg: 'Verifikasi Belum Diapprove.',
											icon: Ext.Msg.ERROR,
											buttons: Ext.Msg.OK,
											fn: function () {
												//                                                me.getFormdata().up('window').close(); 
											}
										});
									}

								} else {
									Ext.Msg.show({
										title: 'Info',
										msg: 'Verifikasi Persetujuan Belum Dibuat.',
										icon: Ext.Msg.ERROR,
										buttons: Ext.Msg.OK,
										fn: function () {
											//                                                me.getFormdata().up('window').close(); 
										}
									});
								}
							}
						})

					} else {
						Ext.Ajax.request({
							url: 'erems/cancellation/read',
							params: {
								unit_id: rows[0].data.unit_id,
								read_type_mode: 'popupsubrogasi'
							},
							success: function (response) {
								var jsonS = JSON.parse(response.responseText);

								if(jsonS.records.data[0].length > 0){
									if(jsonS.records.data[0][0].is_unit_dikosongkan == 0 && jsonS.records.data[0][0].tanggal_akta_subrogasi > '1900-01-01 00:00:00.000'){
										Ext.Msg.show({
											title: 'Warning',
											msg: 'Unit tidak bisa dibatalkan, sudah di input nomor Akta Subrogasi, dan status unit belum di kosongkan, silahkan hubungi legal.',
											icon: Ext.Msg.ERROR,
											buttons: Ext.Msg.OK,
											fn: function(){}
										});

										return;
									}
								}
								_myAppGlobal.getController(me.ctrler).processRowFromItemSelection(rows, 'purchaseletter');

								me.fillDocumentUploadGrid(rows[0].data.purchaseletter_id, rows[0].data.sppjb_id);
							}
						});
					}
				}
			});
		} else {
			Ext.Msg.alert('Info', 'Require 1 unit!');
			return;
		}
	},
	browsegridAfterRender: function (el, a, b) {
		var me = this;

		me.browsedataReset(el.up('panel').up('panel').down('button[action=search]'));

		resetTimer();
		var store = el.getStore();
		store.removeAll();
		store.loadPage(1);
	},
	browseformSearchAfterRender: function (el) {
		var me = this;

		var ftStore = null;
		ftStore = el.form._fields.items[2].getStore();
		ftStore.load({ params: { start: 0, limit: 0 } });
	},
	browsedataSearch: function (el) {
		resetTimer();
		var me = this;

		var form = el.up('form');
		var store = el.up('panel').up('panel').down('grid').getStore();

		var srcform = form.getForm();
		srcform._fields.items[1].setValue(me.spcreq); //('[name=param_spcreq]')

		var fields = form.getValues();
		for (var x in fields) {
			store.getProxy().setExtraParam(x, fields[x]);
		}
		store.loadPage(1);
	},
	browsedataReset: function (el) {
		var me = this;
		var form = el.up('form');
		form.getForm().reset();

		var srcform = form.getForm();
		srcform._fields.items[1].setValue(me.spcreq); //('[name=param_spcreq]')

		me.browsedataSearch(el.up('panel').up('panel').down('button[action=search]'));
	},
	//===================== END BROWSE PANEL ===============================	

	printOut: function (me, id, parametername, urlAdd, arr) {
		// var me = this;
		var id = id;

		// added by rico 15082023
		if(me.id == 'Sppjb'){
			if(arr.validasiPrint != 1){
				Ext.Ajax.request({
					url: 'erems/sppjb/read',
					params: {
						read_type_mode 	  : 'validasiPrint',
						unit_id 		  : arr.unit_id,
						purchaseletter_id : arr.purchaseletter_id
					},
					success: function (response) {
						var objt = JSON.parse(response.responseText);

						if(objt.data.remaining_balance > 0){
							Ext.Msg.show({
								title   : 'Info',
								msg     : 'Tidak bisa print SPPJB karena Tanda Jadi belum Lunas.',
								icon    : Ext.Msg.ERROR,
								buttons : Ext.Msg.OK,
								fn      : function () {
									Ext.getCmp("printoutForm").close();
								}
							});

							return;
						}
					}
				});
			}
		}

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({ params: { parametername: parametername } });

		var combo = Ext.create('Ext.form.field.ComboBox', {
			editable     : false,
			queryMode    : 'local',
			valueField   : 'value',
			displayField : 'value',
			width        : '100%',
			store        : globalparameterStore
		});

		Ext.create('Ext.window.Window', {
			title   : 'Select Printout Document',
			height  : 100,
			width   : 400,
			id      :'printoutForm',
			layout  : 'hbox',
			padding : '10px 10px 10px 10px',
			modal   : true,
			items   : {  // Let's put an empty grid in just to illustrate fit layout
				xtype : combo,
				name  : 'printout_cb'
			},
			dockedItems : [
				{
					xtype  : 'toolbar',
					dock   : 'bottom',
					ui     : 'footer',
					layout : { type : 'hbox' },
					items  : [
						{
							xtype   : 'button',
							action  : 'processprintout',
							padding : 5,
							width   : 75,
							iconCls : 'icon-save',
							text    : 'Process',
							handler : function () {
								var win = this.up('window');
								var printout_cb = this.up('window').items.items[0].value;

								if (!printout_cb) {
									Ext.Msg.show({
										title: 'Alert',
										msg     : 'Please Select Printout Document First',
										icon    : Ext.Msg.WARNING,
										buttons : Ext.Msg.OK
									});
								}
								else{
									if(typeof arr !== 'undefined' && typeof arr.adendum_ke !== 'undefined' && arr.adendum_ke == '0'){
										var dataCombo = globalparameterStore.data.items;
										for(var i=0; i<dataCombo.length; i++){
											if(dataCombo[i].get('value') == printout_cb && dataCombo[i].get('description') == 'ADDENDUM_SPPJB_SH2'){
												Ext.Msg.show({
													title   : 'Warning',
													msg     : 'Silahkan isi kolom "<b>Adendum Ke</b>" terlebih dahulu.',
													icon    : Ext.Msg.ERROR,
													buttons : Ext.Msg.OK,
													fn      : function(){}
												});
												return false;
											}
										}
									}

									var rec          = globalparameterStore.findRecord('value', printout_cb);
									var parameter_id = rec.get('parameter_id');

									win.body.mask('Creating Document, Please Wait...');
									// me.getFormdata().up('window').body.mask('Creating Document, Please Wait...');

									Ext.Ajax.request({
										url    : urlAdd,
										params : {
											id            : id,
											document_name : printout_cb,
											parameter_id  : parameter_id
										},
										success : function (response) {
											try {
												var resp = response.responseText;
												if (resp) {
													var info = Ext.JSON.decode(resp);

													if (info.success == true) {
														var url = info.url;
														var plwa = '';
														//added by anas 08092021
														if (me.getPurcheletterSendWaActive == 1) {
															plwa = '<br><br><br><a href="https://api.whatsapp.com/send?phone=' + me.getPurcheletterSendWaPhone + '&text=' + me.getPurcheletterSendWaText + ' ' + window.location.href + url + '" target="blank">Send To WA</a>';
														}
														//end added by anas 08092021

														// me.getFormdata().up('window').body.unmask();
														win.body.unmask();
														Ext.Msg.show({
															title: 'Info',
															//updated by anas 08092021
															msg: '<a href="' + info.url + '" target="blank">Click Here For Download Document</a>' + plwa,
															icon: Ext.Msg.INFO,
															//buttons: [], //jika ingin tidak ada buttons
															buttons: Ext.Msg.CANCEL,
															buttonText:
															{
																cancel: 'Close',
															}
														});
													} else {
														win.body.unmask();
														// me.getFormdata().up('window').body.unmask();
														Ext.Msg.show({
															title: 'Failure',
															msg: 'Error: Create Document Failed.',
															icon: Ext.Msg.ERROR,
															buttons: Ext.Msg.OK
														});
													}
												}
											} catch (e) {
												//console.error(e);
												// me.getFormdata().up('window').body.unmask();
												win.body.unmask();
												Ext.Msg.show({
													title: 'Failure',
													msg: 'Error: Create Document Failed.',
													icon: Ext.Msg.ERROR,
													buttons: Ext.Msg.OK
												});
											}
										},
										failure: function (e) {
											//console.error(e);
											win.body.unmask();
											// me.getFormdata().up('window').body.unmask();
											Ext.Msg.show({
												title: 'Failure',
												msg: 'Error: Create Document Failed.',
												icon: Ext.Msg.ERROR,
												buttons: Ext.Msg.OK
											});
										}
									});
								}
							}
						},
						{
							xtype   : 'button',
							action  : 'cancel',
							itemId  : 'btnCancel',
							padding : 5,
							width   : 75,
							iconCls : 'icon-cancel',
							text    : 'Cancel',
							handler : function () {
								this.up('window').close();
							}
						}
					]
				}
			]
		}).show();
	},

	fillSTDate: function () {
		var me = this;
		var form = me.getFormdata();

		var purchaseDate = form.down('[name=purchase_date]').getValue();
		var rencanaSTBulan = form.down('[name=serahterimaplan_month]').getValue();

		var addDate = new Date(purchaseDate);

		addDate.setMonth(addDate.getMonth() + rencanaSTBulan);

		form.down('[name=serahterimaplan_date]').setValue(addDate);
	},
	mainPanelBeforeRender : function(){
		var me   = this;
		var grid = me.getGrid();

		Ext.Ajax.request({
				url    : 'erems/sppjb/read',
				params : { read_type_mode : 'configuration'},
				success: function (response) {
					var result = Ext.decode(response.responseText);

					grid.down('#td_more_customer').setVisible(result.ShowMoreCustomerOnGrid);
				}
			});
	},
	// added by rico 21022024
	fillDocumentUploadGrid: function (purchaseletter_id, sppjb_id){
		var me = this;
		var documentuploadgrid = me.getGriddocumentupload();

		if(typeof documentuploadgrid != 'undefined'){
	        documentuploadgrid.doInit();
	        documentuploadgrid.getStore().currentPage = 1;
	        documentuploadgrid.getSelectionModel().setSelectionMode('SINGLE');
	        documentuploadgrid.getStore().getProxy().setExtraParam("sppjb_id", sppjb_id);
	        documentuploadgrid.getStore().getProxy().setExtraParam("purchaseletter_id", purchaseletter_id);
	        documentuploadgrid.getStore().load({
	            callback: function(rec, op) {
	                documentuploadgrid.attachModel(op);

					var sppjb_doc_id = [];

					rec.map((rec, key) => {
						sppjb_doc_id.push(rec.data.sppjb_doc_id);
					});

					me.getFormdata().down('[name=sppjb_doc_id]').setValue(sppjb_doc_id.join('~'));
	            }
	        });
		}
	},
    griddocumentButtonClick: function(action) {
        var me = this;
        var g = me.getGriddocumentupload();
        var fm = me.getFormdata();

        var sppjb_id = fm.down("[name=sppjb_id]").getValue();
        var purchaseletter_id = fm.down("[name=purchaseletter_id]").getValue();

        if (action === "create") {
        	if(purchaseletter_id){
	            var w = me.instantWindow('FormDataDocumentUpload', 400, 'Document Upload', 'documents', 'myDocumentFormWindow');
	            var f = me.getFormdatadocumentupload();
	            f.editedRow = -1;
	            f.down("[name=sppjb_id]").setValue(sppjb_id);
	            f.down("[name=purchaseletter_id]").setValue(purchaseletter_id);
        	}else{
                me.tools.alert.warning("Pilih purchaseletter terlebih dahulu.");
        	}
        } else if (action === "update") {
            var row = g.getSelectedRow();
            if (row >= 0) {
            	var w = me.instantWindow('FormDataDocumentUpload', 400, 'Document Upload', 'documents', 'myDocumentFormWindow');

                var f = me.getFormdatadocumentupload();
                f.editedRow = row;
                f.loadRecord(g.getStore().getAt(row));
                me.refreshDocumentImageInfo(g.getStore().getAt(row).get('filename'));
            } else {
                me.tools.alert.warning("Tidak ada dokumen yang terpilih.");
            }
        } else if (action === "destroy") {
            var row = g.getSelectedRow();
            if (row >= 0) {
                Ext.Msg.show({
                    title: 'Konfirmasi',
                    msg: 'Are you sure to delete this document?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(clicked) {
                        if (clicked === "yes") {                            
                            g.up("window").setLoading("Sedang menghapus...");
                            me.tools.ajax({
                                params: {
                                    sppjb_doc_id: g.getStore().getAt(row).get("sppjb_doc_id"),
                                    read_type_mode: 'deletedocument'
                                },
                                success: function(data, model) {
                                    g.up("window").setLoading(false);

                                    g.getStore().loadPage(1);

                                    me.checkSignDate();
                                }
                            }).read('deletedocument');
                        }
                    }
                });
            } else {
                me.tools.alert.warning("Tidak ada dokumen yang terpilih.");
            }
        }
    },
    formDataUploadFileDoc: function(fld, a, mode) {
        var me = this;
        var form = fld.up("form");
        var doc_type = form.down("[name=doc_type]").getValue();

        if(doc_type != null){
	        me.uploadFile({
	            form: form,
	            doc_type:doc_type,
	            callback: {
	                success: function(imageName) {
	                    me.refreshDocumentImageInfo(imageName);
	                },
	                failure: function() {
	                }
	            }
	        });
        }else{
            me.tools.alert.warning("Pilih document type terlebih dahulu.");
            return;
        }
    },
    refreshDocumentImageInfo: function(imageName) {
        var me = this;

        var form = me.getFormdatadocumentupload();
        form.down("[name=filename]").setValue(imageName);
        new Erems.library.ModuleTools().customerPhoto(form.down("#file_image"), imageName, 'app/erems/uploads/sppjbdoc/','360px 170px');
    },
    saveDocument: function() {
        var me = this;
        var f = me.getFormdatadocumentupload();
        var g = me.getGriddocumentupload();
        var vs = f.getValues();

        var hasil = vs;
        if (!hasil.filename) {
            me.tools.alert.warning("Pilih document terlebih dahulu.");
            return;
        }else if(!hasil.doc_type){
            me.tools.alert.warning("Pilih document type terlebih dahulu.");
            return;
        }

        if (f.editedRow >= 0) { // update
            var rec = g.getStore().getAt(f.editedRow);
            var Messages = 'File Successfully Updated.';

            rec.beginEdit();
            rec.set(hasil);
            rec.endEdit();
        } else { // create
            g.getStore().add(hasil);

            var Messages = 'File Successfully Added.';
        }

        f.setLoading("Sedang menyimpan...");
        me.tools.ajax({
            params: {
                data: Ext.encode(hasil),
                read_type_mode: 'savedocument'
            },
            success: function(data, model) {
                f.setLoading(false);
                g.getStore().loadPage(1);
                
                Ext.Msg.show({
                    title: 'Success', 
                    msg: Messages,
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK,
                    fn: function(){ 
		                f.up("window").close();

		                me.checkSignDate();
                    }
                }); 
            }
        }).read('savedocument');
    },
    uploadFile: function(params) {
        var me 			 = this;
        var form 		 = params.form;
        var callback 	 = params.callback;
        var doc_type 	 = params.doc_type;
        var filesize 	 = 0;
        var filetype 	 = '';
        var filedoc 	 = document.getElementsByName("file_browse")[0];
        var acceptedType = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

        if(filedoc != null){
            filesize = filedoc.files[0].size;
            filetype = filedoc.files[0].type;
        }

        if(filesize > 0 && filesize <= 4000000){ //filesize max 5MB 
        	if(acceptedType.includes(filetype)){
	            form.submit({
	                clientValidation: false,
	                url: 'erems/documentupload/upload',
	                params:{
	                	'doc_type': doc_type
	                },
	                waitMsg: 'Uploading file...',
	                success: function(f, a) {
	                    var icon = Ext.Msg.INFO;
	                    var msg = 'File Uploaded';

	                    if (!a.result.success) {
	                        icon = Ext.Msg.ERROR;
	                        msg = a.result.msg;
	                    } else {
	                        callback.success(a.result.msg);
	                    }

	                    Ext.Msg.show({
	                        title: 'Info',
	                        msg: msg,
	                        icon: icon,
	                        buttons: Ext.Msg.OK
	                    });
	                },
	                failure: function(f, a) {
	                    callback.failure();
	                    var msg = "...";
	                    if(typeof a.result !=="undefined"){
	                        msg = a.result.msg;
	                    }else{
	                        msg = "Please complete all the required field";
	                    }
	                    Ext.Msg.show({
	                        title: 'Fail',
	                        msg: msg,
	                        icon: Ext.Msg.ERROR,
	                        buttons: Ext.Msg.OK
	                    });
	                }
	            });
        	}else{
	            var msg = "File upload extension must be pdf or image";
	            Ext.Msg.show({
	                title: 'Fail',
	                msg: msg,
	                icon: Ext.Msg.ERROR,
	                buttons: Ext.Msg.OK
	            });
        	}
        } else {
            var msg = "File upload maximum 2 MB";
            Ext.Msg.show({
                title: 'Fail',
                msg: msg,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }
    },
    checkSignDate: function(){
    	var me 		= this;
    	var bool 	= true;
    	var form 	= me.getFormdata();
    	var state 	= form.up('window').state.toLowerCase();

		if(state == 'update' && apps.subholdingId == 2 && me.addon >= Date.parse(me.cutoffDate)){ // added by rico 2102024
			var sign_date 	= form.down('[name=tandatangan_date]').getValue();
			var gridUpload 	= me.getGriddocumentupload();
			var store 		= gridUpload.getStore();
			
			store.removeAll();
			store.load({
				params   : {purchaseletter_id: form.down('[name=purchaseletter_id]').getValue()},
				callback : function (rec) {
					me.check_type = false;

					rec.map((x, y) => {
						if(x.data.document_type == 'SPPJB'){ 
							me.check_type = true; 
							return;
						}
					});

					switch(true){
						case (sign_date != null && me.addon >= Date.parse(me.cutoffDate)) && (rec.length <= 0 || !me.check_type):
							me.tools.alert.warning("Silahkan upload SPPJB yang sudah di Tanda tangan basah terlebih dahulu.");
							form.down('#btnSave').setDisabled(true);
							bool = false;
						break;
						case sign_date == null && (rec.length > 0 || me.check_type):
							me.tools.alert.warning("Silahkan isi sign date terlebih dahulu.");
							form.down('#btnSave').setDisabled(true);
							bool = false;
						break;
						case sign_date == null && !me.check_type:
							form.down('#btnSave').setDisabled(false);

							bool = true;
						break;
						case (sign_date != null && me.addon >= Date.parse(me.cutoffDate)) && (rec.length > 0 || me.check_type):
							form.down('#btnSave').setDisabled(false);

							bool = true;
						break;
					}
				}
			});
		}

		return bool;
    },
    actionColumnDownload: function(view, rowIndex, colIndex, item, e, record, row) {
		// var url = window.location.protocol+"//"+window.location.host+'/webapps/Ciputra/public/app/erems/uploads/sppjbdoc/'+view[5].data.doc_filename; //ceslive
		// var url = window.location.protocol+"//"+window.location.host+'/rico/Ciputra/public/app/erems/uploads/sppjbdoc/'+view[5].data.doc_filename;  //cestest

		var url = window.location.protocol + "//" + window.location.host + window.location.pathname + 'app/erems/uploads/sppjbdoc/' + view[5].data.doc_filename; //local
		window.open(url, '_blank');
	}
});