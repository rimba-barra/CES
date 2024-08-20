Ext.define('Erems.controller.Cancellation', {
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Cancellation',
	views: ['cancellation.Panel', 'cancellation.Grid', 'cancellation.FormSearch', 'cancellation.FormData', 'cancellation.Schedulegrid', 'cancellation.Documentpembatalangrid','cancellation.FormDataDocument'],
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Citycombobox',
		'Erems.library.template.component.Pricetypecombobox',
		'Erems.library.template.component.Cancelreasoncombobox',
		'Erems.library.box.tools.Tools', 
		'Erems.library.ModuleTools'
	],
	stores: ['Cancellation', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masternotaris', 'Masterdata.store.City', 'Mastercluster', 'Masterblock', 'Mastercancelreason', 'Masterparameterglobal','CancellationSchedule', 'Documentpembatalan'],
	models: ['Cancellation', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masternotaris', 'Masterblock', 'Mastercancelreason', 'Masterparameterglobal','CancellationSchedule'],
	refs: [
		{
			ref: 'grid',
			selector: 'cancellationgrid'
		},
		{
			ref: 'formsearch',
			selector: 'cancellationformsearch'
		},
		{
			ref: 'formdata',
			selector: 'cancellationformdata'
		},
		{
			ref      : 'schedulegrid',
			selector : 'cancellationschedulegrid'
		},
		{
			ref      : 'documentpembatalangrid',
			selector : 'cancellationdocumentpembatalangrid'
		},
		{
			ref      : 'formdatadocument',
			selector : 'documentpembatalanformdatadocument'
		},
	],
	controllerName: 'cancellation',
	fieldName: 'cancellation_no',
	bindPrefixName: 'Cancellation',
	validationItems: [
		{name: 'purchaseletter_id', msg: 'You must select Kavling / Unit No. first'},
	],

	formWidth: 800,
	countLoadProcess: 0,
	verification_approval: 0,
	isUsedVerification: 0,
	isUserAnulir: 0,
	constructor : function (configs) {
		this.callParent(arguments);
		var me = this;
		
		me.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		me.cbf = new Erems.template.ComboBoxFields();
	},
	init: function (application) {
		var me = this;
		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});

		this.control({
			test: me.eventMonthField,
			'cancellationpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'cancellationgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'cancellationgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'cancellationgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'cancellationgrid toolbar button[action=view]': {
				click : function () {
					this.formDataShow('read');
				}
			},
			'cancellationgrid toolbar button[action=anulir_cancel]': {
				click : this.dataAnulir
			},
			'cancellationgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'cancellationgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'cancellationgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'cancellationformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'cancellationformsearch button[action=search]': {
				click: this.dataSearch
			},
			'cancellationformsearch button[action=reset]': {
				click: this.dataReset
			},
			'cancellationformdata': {
				afterrender: this.formDataAfterRender
			},
			'cancellationformdata button[action=save]': {
				click: this.dataSave
			},
			'cancellationformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'cancellationformdata button[action=browse_unit]': {
				click: me.selectUnitGridShow
			},
			/* formdata keyup function */
			'cancellationformdata [name=lostpayment]': {
				keyup: me.fillReturnpayment
			},
			'cancellationformdata [name=buyback_installment]': {
				keyup: me.fillBuybackinterest
			},
			'cancellationformdata [name=buyback_interest_persen]': {
				keyup: me.fillBuybackinterest
			},
			/* end formdata keyup function */
			'cancellationformdata button[action=printout]': {
				click: this.formDataPrintout
			},

			/* approve / reject Cancellation */
			'cancellationgrid toolbar button[action=approve_reject]': {
				click: function () {
					this.formDataShow('approve_reject');
				}
			},
			'cancellationformdata button[action=approve_reject]': {
				click: this.isApproveReject
			},
			/* end approve / reject Cancellation */
			'cancellationformsearch [name=unit_number]': {
				keypress: function (e, el) {
					var me = this;
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				}
			},
			'cancellationformsearch [name=customer_name]': {
				keypress: function (e, el) {
					var me = this;
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				}
			},

            'cancellationdocumentpembatalangrid button[action=create]': {
                click: function() {
                    me.griddocumentButtonClick('create');
                }
            },
            'cancellationdocumentpembatalangrid button[action=update]': {
                click: function() {
                    me.griddocumentButtonClick('update');
                }
            },
            'cancellationdocumentpembatalangrid button[action=destroy]': {
                click: function() {
                    me.griddocumentButtonClick('destroy');
                }
            },
            'cancellationdocumentpembatalangrid actioncolumn': {
                downloadaction: me.actionColumnDownload
            },
            'documentpembatalanformdatadocument #fd_file': {
                change: function(fld, a) {
                    me.formDataUploadFileDoc(fld, a, 'mode');
                }
            },
            'documentpembatalanformdatadocument button[action=save]': {
                click: function(fld, a) {
                    me.saveDocument();
                }
            },
		});
	},

	specialRequest: function (store) {
		store.load({params: {param_spcreq: 'plCancel'}});
	},
	selectUnitGridShow: function () {
		var me = this;

		_myAppGlobal.getController('Sppjb').ctrler = 'Cancellation';
		_myAppGlobal.getController('Sppjb').spcreq = 'plCancel';
		_myAppGlobal.getController('Sppjb').veriappr = me.verification_approval;
		_myAppGlobal.getController('Sppjb').vericode = 'PT';
		_myAppGlobal.getController('Sppjb').instantWindow('browse.Panel', 800, 'Browse Item', 'read', 'myBrowseItemPanel');
	},
	/*selectUnitGridShow: function() {
	 var me = this;
	 
	 _Apps.getController('Purchaseletter').browseItem('Cancellation');
	 },*/
	processRowFromItemSelection: function (rows, modul) {
		var me = this;

		switch (modul) {
			case 'purchaseletter':
				me.fillPurchaseletter(rows);
				break;
		}
	},

	fillPurchaseletter: function (rows) {
		var me = this;

		var me = this;
		var plDetailStore = me.getPurchaseletterdetailStore();
		//me.getFormdata().up('window').body.mask('Loading data...');
		plDetailStore.load({
			params: {mode_read: 'detail', purchaseletter_id: rows[0].get('purchaseletter_id')},
			callback: function (rec) {
				
				me.getFormdata().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
				me.getFormdata().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
				me.getFormdata().down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));
				me.getFormdata().down('[name=unit_id]').setValue(rec[0].get('unit_id'));
				me.getFormdata().down('[name=customer_id]').setValue(rec[0].get('customer_id'));
				me.getFormdata().down('[name=firstpurchase_date]').setValue(rec[0].get('firstpurchase_date'));
				me.getFormdata().down('#fd_city').setValue(rec[0].get('customer_city_id'));
				me.getFormdata().down('[name=pricetype_id]').setValue(rec[0].get('pricetype_id'));
				me.getFormdata().down('[name=bank_bank_name]').setValue(rec[0].get('bank_bank_name'));
				me.getFormdata().down('[name=notes]').setValue(rec[0].get('notes'));
				me.getFormdata().down('[name=salesman_name]').setValue(rec[0].get('salesman_name'));
				me.getFormdata().down('[name=akad_realisasiondate]').setValue(rec[0].get('akad_realisasiondate'));
				// var akad_realisasiondate;
				// akad_realisasiondate = rec[0].get('akad_realisasiondate');	
				// if(akad_realisasiondate){
				// 	akad_realisasiondate = akad_realisasiondate.replace(' 00:00:00.000','');
				// 	akad_realisasiondate = akad_realisasiondate.split("-");
				// 	akad_realisasiondate = akad_realisasiondate[2] + '-' + akad_realisasiondate[1] + '-' + akad_realisasiondate[0];	
				// 	me.getFormdata().down('[name=akad_realisasiondate]').setValue(akad_realisasiondate);
				// }

				var harga_jual = rec[0].get('harga_total_jual');
				var total_payment = rec[0].get('total_payment');
				me.getFormdata().down('[name=harga_jual]').setValue(me.fmb(harga_jual));
				me.getFormdata().down('[name=total_payment]').setValue(me.fmb(total_payment));
					
				// added by rico 18052022
				var harga_netto = rec[0].get('harga_netto');
				var downline = rec[0].get('downline');
				me.getFormdata().down('[name=harga_netto]').setValue(me.fmb(harga_netto));
				me.getFormdata().down('[name=downline]').setValue(downline);

				// added by rico 21072022
				me.getFormdata().down('[name=tanggal_akta_subrogasi]').setValue(rows[0].get('tanggal_akta_subrogasi'));
				me.getFormdata().down('[name=no_akta_subrogasi]').setValue(rows[0].get('no_akta_subrogasi'));
				me.getFormdata().down('[name=notaris_id]').setValue(rows[0].get('notaris_id'));

				//total pembayaran on detail cancellation
				me.getFormdata().down('[name=totalpayment]').setValue(me.fmb(total_payment));

				if (harga_jual && total_payment) {
					var payment_percentage = (total_payment / harga_jual) * 100;
					me.getFormdata().down('[name=payment_percentage]').setValue(me.fmb(payment_percentage));
				} else {
					me.getFormdata().down('[name=payment_percentage]').setValue('');
				}

				me.fillUnitDataToForm(rec[0]);
				me.fillMasterCustomerData(rec[0], 'customer');

				//fill default note
				/*var kawasan_name = me.getFormdata().down('[name=unit_cluster_id]').getRawValue();
				 var block_name = me.getFormdata().down('[name=unit_block_id]').getRawValue();
				 var unit_number = me.getFormdata().down('[name=unit_unit_number]').getRawValue();
				 var default_note = 'Kawasan Code: '+kawasan_name+', Block Code : '+block_name+'-'+unit_number;
				 me.getFormdata().down('[name=note]').setValue(default_note);*/

				me.getFormdata().down('[name=lostpayment]').setValue(0.00);
				me.getFormdata().down('[name=buyback_installment]').setValue(0.00);
				me.getFormdata().down('[name=buyback_interest_persen]').setValue(0);
				me.getFormdata().down('[name=buyback_interest]').setValue(0.00);
				me.getFormdata().down('[name=buyback_denda]').setValue(0.00);

				me.fillScheduleGrid(rec[0].get('purchaseletter_id')); // added by rico 01122022
				
				me.fillDocumentPembatalanGrid(rec[0].get('purchaseletter_id')); // added by rico 100722023

				me.tcb();
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
			'name', 'ktp', 'npwp', 'address', 'homephone', 'email', 'mobilephone'
		];

		for (var x in filledFields) {
			if (me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']') != null) {
				me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']').setValue(records.data[pr + '_' + filledFields[x]]);
			}

		}
	},

	//add by dika 202221208
	panelAfterRender: function (configs) {
		this.callParent(arguments);
		var me = this;
		me.mt = new Erems.library.ModuleTools();

		Ext.Ajax.request({
			url: 'erems/cancellation/read',
			params: {
				read_type_mode: 'others_config',
			},
			success: function (response) {
				me.others_config = Ext.decode(response.responseText);

				if (me.others_config.userAnulirCancel == 1) {
					me.getGrid().down("[action=anulir_cancel]").setVisible(true);
				}else{
					me.getGrid().down("[action=anulir_cancel]").setVisible(false);
				}

			},
		});
		
	},

	/*checkAllDetailLoadingProcess: function() {
	 var me = this;
	 if (me.countLoadProcess === 4) {
	 me.getFormdata().up('window').body.unmask();
	 }
	 },*/

	formDataAfterRender: function (el) {

		var me = this;
		me.loadComboBoxStore(el);
		var state = el.up('window').state;

		//city combobox
		var ftStore = null;
		ftStore = el.down('#fd_city').getStore();
		ftStore.load({params: {start: 0, limit: 0, country_id: 87}});
		Ext.Ajax.request({
			url: 'erems/cancellation/read',
			params: {
				read_type_mode: 'verification_approval',
			},
			success: function (response) {
				me.verification_approval = Ext.decode(response.responseText)
				//                            console.log(me.verification_approval)
			},
		});
		if (state == 'create') {
			// el.down('#active').setValue(1);
			//me.getFormdata().down('#btnSave').setDisabled(false);

			me.getDocumentpembatalangrid().getStore().removeAll(); // added by rico 10072023
			me.getSchedulegrid().getStore().removeAll(); // added by rico 10072023

		} else {

			me.countLoadProcess = 0;
			me.getFormdata().up('window').body.mask('Loading data, please wait ...');

			var grid = me.getGrid();
			var store = grid.getStore();
			var form = me.getFormdata();

			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);

			//set value for money
			form.down('[name=totalpayment]').setValue(me.fmb(record.data.totalpayment));
			form.down('[name=lostpayment]').setValue(me.fmb(record.data.lostpayment));
			form.down('[name=returnpayment]').setValue(me.fmb(record.data.returnpayment));

			form.down('[name=buyback_installment]').setValue(me.fmb(record.data.buyback_installment));
			form.down('[name=buyback_interest]').setValue(me.fmb(record.data.buyback_interest));
			form.down('[name=buyback_denda]').setValue(me.fmb(record.data.buyback_denda));


			// load purchase letter data
			var purchaseletterdetailStore = me.getPurchaseletterdetailStore();
			purchaseletterdetailStore.removeAll();
			purchaseletterdetailStore.load({
				params: {purchaseletter_id: record.data.purchaseletter_id, mode_read: 'detail'},
				callback: function (rec) {
					/*console.log('RECORDS PURCHASE LETTER...');
					 console.log(rec[0]);*/
					me.getFormdata().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
					me.getFormdata().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
					me.getFormdata().down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));
					me.getFormdata().down('[name=unit_id]').setValue(rec[0].get('unit_id'));
					me.getFormdata().down('[name=customer_id]').setValue(rec[0].get('customer_id'));
					me.getFormdata().down('#fd_city').setValue(rec[0].get('customer_city_id'));
					me.getFormdata().down('[name=pricetype_id]').setValue(rec[0].get('pricetype_id'));
					me.getFormdata().down('[name=bank_bank_name]').setValue(rec[0].get('bank_bank_name'));
					me.getFormdata().down('[name=salesman_name]').setValue(rec[0].get('salesman_name'));
					me.getFormdata().down('[name=akad_realisasiondate]').setValue(rec[0].get('akad_realisasiondate'));
					// var akad_realisasiondate;
					// akad_realisasiondate = rec[0].get('akad_realisasiondate');	
					// if(akad_realisasiondate){
					// 	akad_realisasiondate = akad_realisasiondate.replace(' 00:00:00.000','');
					// 	akad_realisasiondate = akad_realisasiondate.split("-");
					// 	akad_realisasiondate = akad_realisasiondate[2] + '-' + akad_realisasiondate[1] + '-' + akad_realisasiondate[0];	
					// 	me.getFormdata().down('[name=akad_realisasiondate]').setValue(akad_realisasiondate);
					// }

					var harga_jual = rec[0].get('harga_total_jual');
					var total_payment = rec[0].get('total_payment');
					
					// added by rico 18052022
					var harga_netto = rec[0].get('harga_netto');
					var downline = rec[0].get('downline');
					me.getFormdata().down('[name=harga_netto]').setValue(me.fmb(harga_netto));
					me.getFormdata().down('[name=downline]').setValue(downline);

					me.getFormdata().down('[name=harga_jual]').setValue(me.fmb(harga_jual));
					me.getFormdata().down('[name=total_payment]').setValue(me.fmb(total_payment));

					if (harga_jual && total_payment) {
						var payment_percentage = (total_payment / harga_jual) * 100;
						me.getFormdata().down('[name=payment_percentage]').setValue(me.fmb(payment_percentage));
					} else {
						me.getFormdata().down('[name=payment_percentage]').setValue('');
					}

					me.fillUnitDataToForm(rec[0]);
					me.fillMasterCustomerData(rec[0], 'customer');
				
					me.fillScheduleGrid(record.data.purchaseletter_id); // added by rico 01122022
					
					me.fillDocumentPembatalanGrid(record.data.purchaseletter_id); // added by rico 100722023

				}
			});

			// disable button
			form.down('#fd_browse_unit_btn').setDisabled(true);
			// end disable button

			if (state == 'update') {
				me.getFormdata().down('#btnPrintout').setDisabled(false);
			} else if (state == 'read' || state == 'approve_reject') {
				me.getFormdata().getForm().getFields().each(function (field) {
					field.setReadOnly(true);
				});
				me.getFormdata().down('#btnSave').setDisabled(true);
				me.getFormdata().down('#btnPrintout').setDisabled(false);

				if (record.data.is_approve || record.data.is_reject) {
					form.down('#btnApproveReject').setDisabled(true);

					// me.getDocumentpembatalangrid().down('#btnNew').setDisabled(true); // added by rico 10072023
					me.getDocumentpembatalangrid().down('#btnEdit').setDisabled(true); // added by rico 10072023
					me.getDocumentpembatalangrid().down('#btnDelete').setDisabled(true); // added by rico 10072023
				} else {
					var globalparameterStore = me.getMasterparameterglobalStore();
					globalparameterStore.removeAll();
					globalparameterStore.load({
						params: {parametername: 'APPROVAL_GROUP_ID_CANCELLATION'},
						callback: function (rec) {
							if (rec.length > 0) {
								var global = rec[0].get('value');
								var arrayListApproveGroup = global.split(',');
								//if(global === apps.gid){
								if (arrayListApproveGroup.indexOf(apps.gid) !== -1) {
									form.down('#btnApproveReject').setDisabled(false);
								} else {
									form.down('#btnApproveReject').setDisabled(true);
								}
							} else {
								form.down('#btnApproveReject').setDisabled(true);
							}
						}
					});
				}
			}
		}
	},

	//for callback (function in function)
	tcb: function () {
		var me = this;
		me.fillReturnpayment();
		me.fillBuybackinterest();
	},

	fillReturnpayment: function () {
		var me = this;
		var totalpayment = toFloat(me.getFormdata().down('[name=totalpayment]').getValue());
		var lostpayment = toFloat(me.getFormdata().down('[name=lostpayment]').getValue());

		if (totalpayment) {
			if (!lostpayment) {
				lostpayment = 0
			}
			var returnpayment = totalpayment - lostpayment;
		}

		if (lostpayment > totalpayment) {
			Ext.Msg.show({
				title: 'Failure',
				msg: 'Nilai uang ditahan tidak boleh lebih besar dari total pembayaran',
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK,
				fn: function () {
					me.getFormdata().down('[name=lostpayment]').setValue(0.00);
					me.fillReturnpayment();
				}
			});
		}

		me.getFormdata().down('[name=returnpayment]').setValue(me.fmb(returnpayment));
	},

	fillBuybackinterest: function () {
		var me = this;
		var buyback_installment = toFloat(me.getFormdata().down('[name=buyback_installment]').getValue());
		var buyback_interest_persen = me.getFormdata().down('[name=buyback_interest_persen]').getValue();

		if (buyback_installment) {
			if (!buyback_interest_persen) {
				buyback_interest_persen = 0
			}
			var buyback_interest = (buyback_installment * buyback_interest_persen) / 100;
		}

		me.getFormdata().down('[name=buyback_interest]').setValue(me.fmb(buyback_interest));
	},

	fmb: function (val) {
		return this.fm(val, 2, ',', '.');
	},
	fm: function (n, decPlaces, thouSeparator, decSeparator) {
		var decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
				decSeparator = decSeparator == undefined ? "." : decSeparator,
				thouSeparator = thouSeparator == undefined ? "." : thouSeparator,
				sign = n < 0 ? "-" : "",
				i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
				j = (j = i.length) > 3 ? j % 3 : 0;
		return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
	},

	formDataPrintout: function () {
		var me = this;
		var cancellation_id = me.getFormdata().down('#cancellation_id').getValue();

		//added by anas 09092021
		Ext.Ajax.request({
			url: 'erems/cancellation/read',
			params: {
				read_type_mode: 'sendwa'
			},
			success: function (response) {
				var obj = JSON.parse(response.responseText);
				me.getPurcheletterSendWaActive = obj[0][0]['getPurcheletterSendWa']['active'];
				me.getPurcheletterSendWaPhone = obj[0][0]['getPurcheletterSendWa']['phone'];
				me.getPurcheletterSendWaText = obj[0][0]['getPurcheletterSendWaText'];
			}
		});
		//end added by anas 08092021
		_myAppGlobal.getController('Sppjb').printOut(me, cancellation_id, 'PRINTOUT_PEMBATALAN_DOC', 'erems/cancellation/printout');
	},

	//add by dika 202221208
	dataAnulir: function () {
		var me = this;
		var grid = me.getGrid(),
		row = grid.getSelectionModel().getSelection();
		var cancel_id = grid.getSelectedRecord().get("cancellation_id");
		var pl_id = grid.getSelectedRecord().get("purchaseletter_id");
		var customer_id = grid.getSelectedRecord().get("customer_id");
		var unit_id = grid.getSelectedRecord().get("unit_id");

		//var cancellation_id = me.getFormdata().down('#cancellation_id').getValue();

		// //added by dika 20221208
		Ext.Ajax.request({
			url: 'erems/cancellation/anulir',
			params: {
				id: cancel_id,
				purchaseletter_id: pl_id,
				unit_id: unit_id,
				customer_id: customer_id
			},
			success: function (response) {
				if (Ext.decode(response.responseText).success == true) {
					Ext.Msg.show({
						title: 'Success',
						msg: 'Data anulir successfully.',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							var storeDepan = grid.getStore();
							storeDepan.reload();
						}
					});
				} else {
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Unable to anulir data.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			}
		});
	},

	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), 
		row = grid.getSelectionModel().getSelection();
		grid.down('#btnEdit').setDisabled(row.length != 1);
		grid.down('#btnDelete').setDisabled(row.length < 1);
		grid.down('#btnApproveReject').setDisabled(row.length != 1);
		grid.down('#btnView').setDisabled(row.length != 1);
		grid.down('#btnAnulirCancel').setDisabled(row.length != 1);

		//add by dika 202221208
		
		var btnAnulirCancel = grid.down('#btnAnulirCancel');
		if (grid.getSelectionModel().hasSelection()){

			var approve = grid.getSelectionModel().getSelection()[0].get('is_approve');
		
			if (approve == true && btnAnulirCancel.isHidden()==false && row.length == 1) {
				me.getGrid().down("[action=anulir_cancel]").setDisabled(false);
			}else{
			 	me.getGrid().down("[action=anulir_cancel]").setDisabled(true);
			}
		}
	},

	isApproveReject: function () {
		var me = this;
		var id = me.getFormdata().down('#cancellation_id').getValue();

		var purchaseletter_id = me.getFormdata().down('[name=purchaseletter_id]').getValue();
		var unit_id = me.getFormdata().down('[name=unit_id]').getValue();
		var customer_id = me.getFormdata().down('[name=customer_id]').getValue();
		var cancellation_date = me.getFormdata().down('[name=cancellation_date]').getValue();

		Ext.MessageBox.show({
			title: 'Approve or Reject?',
			msg: 'Please Choose One',
			buttons: Ext.MessageBox.YESNO,
			buttonText: {
				yes: "Approve",
				no: "Reject"
			},
			fn: function (btn) {
				me.getFormdata().up('window').body.mask('Updating, please wait ...');

				var isAppRej = '',
						txtMsg = '';
				if (btn == 'yes') {
					isAppRej = 'approve',
							txtMsg = 'Approved';
				} else if (btn == 'no') {
					isAppRej = 'reject',
							txtMsg = 'Rejected';
				} else {
					me.getFormdata().up('window').body.unmask();
					return false;
				}

				Ext.Ajax.request({
					url: 'erems/cancellation/approvereject',
					params: {
						id: id,
						status: isAppRej,
						purchaseletter_id: purchaseletter_id,
						unit_id: unit_id,
						customer_id: customer_id,
						cancellation_date: cancellation_date,
					},
					success: function (response) {
						me.getFormdata().up('window').body.unmask();
						if (Ext.decode(response.responseText).success == true) {
							Ext.Msg.show({
								title: 'Success',
								msg: 'Data ' + txtMsg + ' successfully.',
								icon: Ext.Msg.INFO,
								buttons: Ext.Msg.OK,
								fn: function () {
									me.getFormdata().up('window').close();
									var gridDepan = me.getGrid();
									var storeDepan = gridDepan.getStore();
									storeDepan.reload();
								}
							});
						} else if (Ext.decode(response.responseText).msg) {
							Ext.Msg.show({
								title: 'Info',
								msg: Ext.decode(response.responseText).msg,
								icon: Ext.Msg.WARNING,
								buttons: Ext.Msg.OK
							});
						} else {
							Ext.Msg.show({
								title: 'Failure',
								msg: 'Error: Unable to save data.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					},
				});
			}
		});
	},

	dataSave: function () {
		var me = this;
		var form = me.getFormdata().getForm();
		var formVal = form.getValues();

		if (formVal.purchaseletter_id == 0) {
			Ext.Msg.show({
				title: 'Info',
				msg: 'You must select Kavling / Unit No. first',
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK
			});
			return false;
		}else if(formVal.cancelreason_id == 61 && formVal.is_buyback != 1){
			Ext.Msg.show({
				title: 'Info',
				msg: 'Buyback harus di checklist',
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK
			});
			return false;
		}else if(formVal.is_buyback == 1 && formVal.cancelreason_id != 61 ){
			Ext.Msg.show({
				title: 'Info',
				msg: 'Cancel Reason Harus Buyback',
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK
			});
			return false;
		}

		if (form.isValid()) {
			me.getFormdata().up('window').body.mask('Saving data, please wait ...');

			// added by rico 12072023
			var gridDocument = me.getDocumentpembatalangrid();
			var storeDocument = gridDocument.getStore();
			var cancellationdocument_id = '';
			storeDocument.each(function(rec){
				cancellationdocument_id += rec.data.cancellationdocument_id + "~";
			});

			//var data = [];//me.getFinalData(form.getValues());
			var data = {
				purchaseletter_id: formVal.purchaseletter_id,
				unit_id: formVal.unit_id,
				customer_id: formVal.customer_id,
				cancelreason_id: formVal.cancelreason_id,
				cancellation_date: formVal.cancellation_date,
				totalpayment: formVal.totalpayment,
				lostpayment: formVal.lostpayment,
				returnpayment: formVal.returnpayment,
				is_buyback: formVal.is_buyback,
				buyback_installment: formVal.buyback_installment,
				buyback_interest_persen: formVal.buyback_interest_persen,
				buyback_interest: formVal.buyback_interest,
				buyback_denda: formVal.buyback_denda,
				note: formVal.note,
				firstpurchase_date: formVal.firstpurchase_date,
				is_recommended: 0,
				isUsedVerification: me.isUsedVerification,
				tanggal_akta_subrogasi: formVal.tanggal_akta_subrogasi,
				no_akta_subrogasi: formVal.no_akta_subrogasi,
				notaris_id: formVal.notaris_id,
				cancellationdocument_id: cancellationdocument_id // added by rico 12072023
			};

			//console.log(data);

			Ext.Ajax.request({
				url: 'erems/cancellation/create',
				params: 'data=' + Ext.encode(data),
				success: function (response) {
					me.getFormdata().up('window').body.unmask();
					if (Ext.decode(response.responseText).success == true) {
						Ext.Msg.show({
							title: 'Success',
							msg: 'Data saved successfully.',
							icon: Ext.Msg.INFO,
							buttons: Ext.Msg.OK,
							fn: function () {
								me.getFormdata().up('window').close();
								var gridDepan = me.getGrid();
								var storeDepan = gridDepan.getStore();
								storeDepan.reload();
							}
						});

					} else if (Ext.decode(response.responseText).msg != '') {
						Ext.Msg.show({
							title: 'Info',
							msg: Ext.decode(response.responseText).msg,
							icon: Ext.Msg.WARNING,
							buttons: Ext.Msg.OK
						});
					} else {
						Ext.Msg.show({
							title: 'Failure',
							msg: 'Error: Unable to save data.',
							icon: Ext.Msg.ERROR,
							buttons: Ext.Msg.OK
						});
					}
				},
			});
		}else{
			Ext.Msg.show({
				title: 'Failure',
				msg: 'Error: Required field is empty.',
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK
			});
		}
	},
	// added by rico 0112022
	fillScheduleGrid: function (purchaseletter_id){
		var me = this;
		var scheduleGrid = me.getSchedulegrid();

        scheduleGrid.doInit();
        scheduleGrid.getStore().currentPage = 1;
        scheduleGrid.getSelectionModel().setSelectionMode('SINGLE');
        scheduleGrid.getStore().getProxy().setExtraParam("purchaseletter_id", purchaseletter_id);
        scheduleGrid.getStore().getProxy().setExtraParam("read_type_mode", 'schedule');
        scheduleGrid.getStore().load({
            callback: function(rec, op) {
                scheduleGrid.attachModel(op);
            }
        });
	},
	// added by rico 10072023
	fillDocumentPembatalanGrid: function (purchaseletter_id){
		var me = this;
		var documentpembatalangrid = me.getDocumentpembatalangrid();

        documentpembatalangrid.doInit();
        documentpembatalangrid.getStore().currentPage = 1;
        documentpembatalangrid.getSelectionModel().setSelectionMode('SINGLE');
        documentpembatalangrid.getStore().getProxy().setExtraParam("purchaseletter_id", purchaseletter_id);
        // documentpembatalangrid.getStore().getProxy().setExtraParam("read_type_mode", 'schedule');
        documentpembatalangrid.getStore().load({
            callback: function(rec, op) {
                documentpembatalangrid.attachModel(op);
            }
        });
	},
    
    actionColumnDownload: function (view, rowIndex, colIndex, item, e, record, row)  {
        var me   = this;
        var url  = document.URL + me.imageFolder + view[5].data.filename;

        Ext.create('Ext.window.Window', {
          
            title: 'Download',
            height: 210,
            width: 380,
            
            padding: '10px 10px 10px 10px',
            modal: true,
                    items: 
                [
                    {
                        xtype: 'textareafield',
                        height: 60,
                        itemId: 'alasan',
                        name: 'alasan',
                        fieldLabel: 'Alasan',
                        padding: '10px 0 0 10px',
                        enforceMaxLength: true,
                        maskRe: /[^\`\"\']/,
                        maxLength: 255
                    }
                ],
                dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    layout: {
                        padding: 6,
                        type: 'hbox'
                    },
                    items: [
                    {
                        xtype: 'button',
                        action: 'saveReason',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process',
                        handler: function() {
                            var reason = this.up('window').items.items[0].value;

					        console.log("REASON");
					        console.log(reason);

                            if(!reason){
                                Ext.Msg.show({
                                    title: 'Alert',
                                    msg: 'Please Fill the alasan',
                                    icon: Ext.Msg.WARNING,
                                    buttons: Ext.Msg.OK
                                });
                                return false;
                            }
                            this.up('window').body.mask('Processing, Please Wait...');

                            var data = [
                                view[5].data.filename, 
                                view[5].data.description, 
                                view[5].data.cancellationdocument_id, 
                            ];

                            me.saveReason(data, reason, this.up('window'));
                       }
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
            ]
        }).show();
    },
    saveReason: function(data, reason, win){
        var me          = this;
        // var imgFolder   = (data[5]) ? (data[6] == 22) ? data[5]: 'unitdocuments': 'unitdocuments'; // added by rico 20032023
        var url         = document.URL + 'app/erems/uploads/documentpembatalan/' + data[0]; // added by rico 20032023

        var d = [data[0], data[1], data[2], reason];

        me.tools.ajax({
            params: {
                data : Ext.encode(d),
                read_type_mode: 'savedownload'
            },
            success: function(data, model) {
                win.body.unmask();

                var a = document.createElement('A');
                a.href = url;
                a.download = url.substr(url.lastIndexOf('/') + 1);
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                //get data for grid document customer
                // var gh = me.getGriddocumenthistory();
                // gh.doInit();
                // gh.getStore().getProxy().setExtraParam("unit_id", data.others[0][0].HASIL.unit_unit_id);
                // gh.getStore().load({
                //     callback: function(rec, op) {
                //         gh.attachModel(op);
                //     }
                // });  

                Ext.Msg.show({
                    title: 'Success', 
                    msg: 'Download successfully.',
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK,
                    fn: function(){ 
                        win.close();
                    }
                });  

            }
        }).read('saveDownload');
    },
    griddocumentButtonClick: function(action) {
        var me = this;
        var g = me.getDocumentpembatalangrid();
        var fm = me.getFormdata();

        var pId = fm.down("[name=purchaseletter_id]").getValue();
        var cId = fm.down("[name=cancellation_id]").getValue();

        if (action === "create") {
            var w = me.instantWindow('FormDataDocument', 400, 'Document Pembatalan', 'documents', 'myDocumentFormWindow');
            var f = me.getFormdatadocument();
            f.editedRow = -1;
            f.down("[name=purchaseletter_id]").setValue(pId);
            f.down("[name=cancellation_id]").setValue(cId);
        } else if (action === "update") {
            var row = g.getSelectedRow();
            if (row >= 0) {
                var w = me.instantWindow('FormDataDocument', 400, 'Document Pembatalan', 'documents', 'myDocumentFormWindow');

                var f = me.getFormdatadocument();
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
                                    cancellationdocument_id: g.getStore().getAt(row).get("cancellationdocument_id"),
                                    read_type_mode: 'deletedocument'
                                },
                                success: function(data, model) {
                                    g.up("window").setLoading(false);
                                    // if (!data.others[0][0]['HASIL']) {
                                    //     me.tools.alert.warning(data.others[0][0]['MSG']);
                                    //     return;
                                    // }
                                    g.getStore().loadPage(1);
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

        me.uploadFile({
            form: form,
            callback: {
                success: function(imageName) {
                    me.refreshDocumentImageInfo(imageName);
                },
                failure: function() {
                }
            }
        });
    },

    refreshDocumentImageInfo: function(imageName) {
        var me = this;

        var form = me.getFormdatadocument();
        form.down("[name=filename]").setValue(imageName);
        new Erems.library.ModuleTools().customerPhoto(form.down("#file_image"), imageName, 'app/erems/uploads/documentpembatalan/','360px 170px');
    },

    saveDocument: function() {
        var me = this;
        var f = me.getFormdatadocument();
        var g = me.getDocumentpembatalangrid();
        var vs = f.getValues();

        var hasil = vs;
        // if (!hasil.documenttype_documenttype_id) {
        //     me.tools.alert.warning("Tipe dokumen tidak valid.");
        //     return;
        // }
        if (!hasil.filename) {
            me.tools.alert.warning("Pilih file terlebih dahulu.");
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
                // if (!data.others[0][0]['HASIL']) {
                    // me.tools.alert.warning("Berhasil....");
//                     return;
//                 }

                g.getStore().loadPage(1);
                
                Ext.Msg.show({
                    title: 'Success', 
                    msg: Messages,
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK,
                    fn: function(){ 
		                f.up("window").close();
                    }
                }); 


            }
        }).read('savedocument');
    },

    uploadFile: function(params) {
        var me = this;
        var form = params.form;
        var callback = params.callback;
        var filesize = 0;
        var filedoc = document.getElementsByName("file_browse")[0];

        if(filedoc != null){
            filesize = filedoc.files[0].size;
        }

        if(filesize > 0 && filesize <= 5242880){ //filesize max 5MB 
            form.submit({
                clientValidation: false,
                url: 'erems/documentpembatalan/upload',
                // params:params.params,
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
                        msg= a.result.msg;
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
        } else {
            var msg = "File upload maximum 5 MB";
            Ext.Msg.show({
                title: 'Fail',
                msg: msg,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        }
    },

});