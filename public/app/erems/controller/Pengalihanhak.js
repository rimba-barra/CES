Ext.define('Erems.controller.Pengalihanhak', {
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Pengalihanhak',
	views: ['pengalihanhak.Panel', 'pengalihanhak.Grid', 'pengalihanhak.FormSearch', 'pengalihanhak.FormData'],
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Unitcombobox',
		'Erems.library.template.component.Changeownershipreasoncombobox'
	],
	stores: ['Pengalihanhak', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Mastercluster', 'Masterblock', 'Masterdata.store.City', 'Masterchangeownershipreason', 'Sppjb', 'Aktappjb', 'Buktipemilikpengalihanhak', 'Hgbajb', 'Masterparameterglobal', 'Masterparametersppjb', 'Masterpurposebuy'],
	models: ['Pengalihanhak', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masterblock', 'Masterdata.model.City', 'Masterchangeownershipreason', 'Sppjb', 'Aktappjb', 'Buktipemilik', 'Hgbajb', 'Masterparameterglobal', 'Masterparametersppjb', 'Masterpurposebuy'],
	refs: [
		{
			ref: 'grid',
			selector: 'pengalihanhakgrid'
		},
		{
			ref: 'formsearch',
			selector: 'pengalihanhakformsearch'
		},
		{
			ref: 'formdata',
			selector: 'pengalihanhakformdata'
		}
	],
	comboBoxIdEl: ['fs_cluster_id', 'fs_block_id', 'fs_changeownershipreason', 'fs_customer'],
	controllerName: 'pengalihanhak',
	fieldName: 'changeownership_no',
	bindPrefixName: 'Pengalihanhak',
	validationItems: [{name: 'purchaseletter_id', msg: 'You must select Kavling / Unit No. first'}],
	formWidth: 800,
	countLoadProcess: 0,
	mt: null,
	setParam: {storeData: new Object()},
	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});
		
		me.mt = new Erems.library.ModuleTools();

		if (typeof me.tools === 'undefined') {
			me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
		}
	},
	init: function (application) {
		var me = this;

		this.control({
			test: me.eventMonthField,
			'pengalihanhakpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender
			},
			'pengalihanhakgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'pengalihanhakgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'pengalihanhakgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'pengalihanhakgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'pengalihanhakgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'pengalihanhakgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'pengalihanhakformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'pengalihanhakformsearch button[action=search]': {
				click: this.dataSearch
			},
			'pengalihanhakformsearch button[action=reset]': {
				click: this.dataReset
			},
			'pengalihanhakformdata': {
				afterrender: this.formDataAfterRender
			},
			'pengalihanhakformdata button[action=save]': {
				click: this.dataSave
			},
			'pengalihanhakformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'pengalihanhakformdata button[action=browse_unit]': {
				click: me.selectUnitGridShow
			},
			'pengalihanhakformdata #fd_ktp': {
				change: function (fld, a) {
					me.formDataUploadImage(fld, a, 'uploadKTP');
				}
			},
			'pengalihanhakformdata button[action=browse_parampengalihanhak]': {
				click: me.selectParampengalihanhakGridShow
			},
			'pengalihanhakformdata button[action=prinout]': {
				click: this.formDataPrintout
			},
			//Rizal 6 Mei 2019
			'pengalihanhakformdata button[action=printoutphak]': {
				click: function () {
					me.processReportPengalihanHak();
				}
			},
			//
			// start Addby Fatkur Addon 6/8/19
			'pengalihanhakgrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el);
				}
			},
			// end

			'pengalihanhakformdata textfield[name=harga_real_transaksi]': {
				keyup: function () {
					this.biayaPengalihanHak();
				}
			},
			'pengalihanhakformdata combobox[name=changeownershipreason_id]': {
				change: function () {
					this.reasonChange();
				}
			},
			'pengalihanhakformdata checkbox[name=is_badan_hukum]': {
				change: function () {
					if (me.getFormdata().down("[name=is_badan_hukum]").getValue() == '0') {
						me.getFormdata().down("[name=customer_name_badan_hukum]").setDisabled(true);
						me.getFormdata().down("[name=customer_name_badan_hukum]").setValue('');
					} else {
						me.getFormdata().down("[name=customer_name_badan_hukum]").setDisabled(false);
					}
				}
			},

			//added by anas 02032021
			'pengalihanhakformdata button[action=browse_paramsppjb]': {
				click: me.selectParamsppjbGridShow
			},

		});
	},
	searchStringInArray: function (str, strArray, keySearch, keyId) {
		if (str) {
			str = str.trim();
			str = str.toLowerCase();
			str = str.replace("kabupaten", "");
			str = str.replace("kota", "");
			str = str.trim();
			for (var j = 0; j < strArray.length; j++) {
				strInArr = strArray[j][keySearch];
				strInArr = strInArr.toLowerCase();
				if (strInArr.match(str))
					return strArray[j][keyId];
			}
		}
		return "";
	},
	refreshPhotoKTP: function (imageName) {
		var me = this;
		var form = me.getFormdata();
		if (imageName.length > 0) {
			me.mt.customerPhoto(form.down("#photo_ktp"), imageName, me.myConfig.IMG_FOLDER_CD, '370px 250px');
			form.down("#photo_ktp").el.setStyle({'background-repeat': 'no-repeat', 'background-position': 'center'});
		}
	},
	formDataUploadImage: function (fld, a, mode) {

		var me = this;
		var form = fld.up("form");
		me.uploadImage({
			form: form,
			params: {read_type_mode: mode},
			callback: {
				success: function (response) {
					var form = me.getFormdata();
					var res = response;
					var hasil = JSON.parse(res.hasil)[0];
					if (res.error_msg != "") {
						var icon = Ext.Msg.WARNING;
						Ext.Msg.show({
							title: 'Info',
							msg: response.error_msg,
							icon: icon,
							buttons: Ext.Msg.OK
						});
					}
//						else if (hasil.identity_number != "" && hasil.fullname != "" && hasil.identity_number != null && hasil.fullname != null) {
					else {
						rt = "";
						rw = "";
						if (hasil.state == "rejected") {
							var icon = Ext.Msg.WARNING;
							var msg = 'Data KTP tidak bisa terbaca, Silakan menggunakan gambar yang lain!';
							Ext.Msg.show({
								title: 'Info',
								msg: msg,
								icon: icon,
								buttons: Ext.Msg.OK
							});
						} else {
							if (hasil.rt_rw != "" && hasil.rt_rw != null && typeof hasil.rt_rw != "undefined") {
								var rt_rw = hasil.rt_rw.split("/");
								rt = rt_rw[0].trim();
								rw = rt_rw[1].trim();
							}
							var icon = Ext.Msg.INFO;
							var msg = 'Data KTP berhasil di konversi OCR ke kolom yang berwarna hijau muda. Harap di cek kembali, apabila ada kesalahan silakan di koreksi dan pastikan data nya benar.';
							Ext.Msg.show({
								title: 'Info',
								msg: msg,
								icon: icon,
								buttons: Ext.Msg.OK
							});
							me.refreshPhotoKTP(res.imageName);
							me.getFormdata().down("#ktp_panel").show();
							me.getFormdata().down("#tab_panel").el.setStyle({'margin-top': 250});

							cityId = me.searchStringInArray(hasil.city, me.getFormdata().down('[name=city_id]').getStore().proxy.reader.rawData, 'city_name', 'city_id');

							form.down('[name=file_ktp_name]').setValue(res.imageName);
							form.down('[name=file_ktp_name]').setFieldStyle('background:#e1f5e6');
							form.down('[name=ktp]').setValue(hasil.identity_number);
							form.down('[name=ktp]').setFieldStyle('background:#e1f5e6');
							form.down('[name=name]').setValue(hasil.fullname);
							form.down('[name=name]').setFieldStyle('background:#e1f5e6');
							form.down('[name=birthplace]').setValue(hasil.birth_place);
							form.down('[name=birthplace]').setFieldStyle('background:#e1f5e6');
							form.down('[name=birthdate]').setValue(hasil.birth_date);
							form.down('[name=birthdate]').setFieldStyle('background:#e1f5e6');
							form.down('[name=address]').setValue(hasil.address + (rt != "" ? " RT/RW: " + rt + "/" + rw : "") + (hasil.kel_desa != "" ? " Kelurahan: " + hasil.kel_desa : "") + (hasil.kecamatan != "" ? " Kecamatan: " + hasil.kecamatan : ""));
							form.down('[name=address]').setFieldStyle('background:#e1f5e6');
							form.down('[name=ktp_address]').setValue(hasil.address + (rt != "" ? " RT/RW: " + rt + "/" + rw : "") + (hasil.kel_desa != "" ? " Kelurahan: " + hasil.kel_desa : "") + (hasil.kecamatan != "" ? " Kecamatan: " + hasil.kecamatan : ""));
							form.down('[name=ktp_address]').setFieldStyle('background:#e1f5e6');
							form.down('[name=pekerjaan]').setValue(hasil.occupation);
							form.down('[name=pekerjaan]').setFieldStyle('background:#e1f5e6');
							form.down('[name=city_id]').setValue(cityId);
							form.down('[name=city_id]').setFieldStyle('background:#e1f5e6');
						}
					}
//						}else {
//							var icon = Ext.Msg.WARNING;
//							var msg = 'Data NIK / Nama tidak bisa terbaca, Silakan menggunakan gambar yang lain!';
//							Ext.Msg.show({
//								title: 'Info',
//								msg: msg,
//								icon: icon,
//								buttons: Ext.Msg.OK
//							});
//						}
				},
				failure: function () {

				}
			}
		});


	},
	uploadImage: function (params) {
		var me = this;
		var form = params.form;
		var callback = params.callback;
		form.submit({
			clientValidation: false,
			url: 'erems/' + me.controllerName + '/read',
			params: params.params,
			waitMsg: 'Uploading image...',
			success: function (f, a) {
				if (!a.result.success) {
					icon = Ext.Msg.ERROR;
					msg = a.result.msg;
					Ext.Msg.show({
						title: 'Info',
						msg: msg,
						icon: icon,
						buttons: Ext.Msg.OK
					});
				} else {
					callback.success(a.result.data);
				}
			},
			failure: function (f, a) {
				//  me.dataSave(me,dataForm);
//				console.log(f);
//				console.log(a);
				callback.failure();
				var msg = "...";
				if (typeof a.result !== "undefined") {
					msg = a.result.msg;
				} else {
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
	},
	formSearchAfterRender: function (el) {
		var me = this;

		var param_data = ['cluster', 'block', 'reason_change', 'city', 'purposebuy', 'province'];

		Ext.Ajax.request({
			url: 'erems/bypass/general',
			async: true,
			params: {
				mode_read: 'get_store_data',
				param_data: JSON.stringify(param_data)
			},
			success: function (response) {
				me.setParam.storeData = Ext.JSON.decode(response.responseText);

				me.loadComboBoxStore(el);
			}
		});

		// var ftStore = null;
		// ftStore = el.down('#fs_changeownershipreason').getStore();
		// ftStore.load({params: {start: 0, limit: 0}});
	},
	selectUnitGridShow: function () {
		var me = this;

		_myAppGlobal.getController('Sppjb').ctrler = 'Pengalihanhak';
		_myAppGlobal.getController('Sppjb').spcreq = 'all';
		_myAppGlobal.getController('Sppjb').instantWindow('browse.Panel', 800, 'Browse Item', 'read', 'myBrowseItemPanel');
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
		var plDetailStore = me.getPurchaseletterdetailStore();

		plDetailStore.load({
			params: {mode_read: 'detail', purchaseletter_id: rows[0].get('purchaseletter_id')},
			callback: function (rec) {
				if(rec[0].raw.is_blokir == 1){
					Ext.Msg.show({
						title: 'Info',
						msg: "Purchaseletter Terblokir. Tidak Bisa di Alih Hak ke yang lain",
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK
					});
				}else{
					console.log('RECORDS PURCHASE LETTER...');
					// console.log(rec[0]);
					me.getFormdata().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
					me.getFormdata().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
					me.getFormdata().down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));

					me.getFormdata().down('[name=unit_id]').setValue(rec[0].get('unit_id'));

					me.getFormdata().down('[name=cluster_code]').setValue(rec[0].get('cluster_code'));
					me.getFormdata().down('[name=block_code]').setValue(rec[0].get('block_code'));
					me.getFormdata().down('[name=harga_jual]').setValue(rec[0].get('harga_jual'));
					me.getFormdata().down('[name=akad_realisasiondate]').setValue(rec[0].get('akad_realisasiondate'));

					me.fillUnitDataToForm(rec[0]);
					me.fillMasterCustomerData(rec[0], 'customer', '_ph');

					// load SPPJB data
					var sppjbStore = me.getSppjbStore();
					sppjbStore.removeAll();
					sppjbStore.load({
						params: {purchaseletter_id: rec[0].get('purchaseletter_id')},
						callback: function (sppjbrec) {
							if (sppjbrec[0]) {
								me.getFormdata().down('[name=sppjb_no]').setValue(sppjbrec[0].get('sppjb_no'));
								me.getFormdata().down('[name=sppjb_date]').setValue(sppjbrec[0].get('sppjb_date'));
							}
						}
					});

					// load Akta PPJB data
					var aktappjbStore = me.getAktappjbStore();
					aktappjbStore.removeAll();
					aktappjbStore.load({
						params: {purchaseletter_id: rec[0].get('purchaseletter_id')},
						callback: function (aktappjbrec) {
							if (aktappjbrec[0]) {
								me.getFormdata().down('[name=aktappjb_no]').setValue(aktappjbrec[0].get('aktappjb_no'));
								me.getFormdata().down('[name=aktappjb_date]').setValue(aktappjbrec[0].get('aktappjb_date'));
							}
						}
					});

					// get buktipemilik_id for load ajb and hgb data
					var buktipemilikStore = me.getBuktipemilikpengalihanhakStore();
					buktipemilikStore.removeAll();
					buktipemilikStore.load({
						params: {unit_id: rec[0].get('unit_id')},
						callback: function (buktipemilikrec) {
							if (buktipemilikrec[0]) {
								var buktipemilik_id = buktipemilikrec[0].get('buktipemilik_id');
								//display detail HGB / AJB Grid on form data
								var hjbagbStore = me.getHgbajbStore();
								hjbagbStore.removeAll();
								hjbagbStore.load({params: {is_hgbajb: 'yes', buktipemilik_id: buktipemilik_id}});
							}
						}
					});
				}
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
	},
	fillMasterCustomerData: function (records, prefix, suffix) {
		var pr = typeof prefix === 'undefined' ? 'customer' : prefix;
		var me = this;
		var filledFields = ['name', 'address', 'homephone', 'mobilephone', 'ktp', 'city_id', 'ktp_address'];
		console.log('RECORDS CUSTOMER...');
		// console.log(records);

		for (var x in filledFields) {
			if (me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']') != null) {
				//Rizal 2 Mei 2019
				var value = records.data[pr + '_' + filledFields[x] + suffix];
				if (pr + '_' + filledFields[x] == 'customer_city_id' && value == 0) {
					value = '';
				}
				me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']').setValue(value);
			}
		}
	},
	formDataAfterRender: function (el) {
		var me = this;
		me.loadComboBoxStore(el);

		// //city combobox
		// var ftStore = null;
		// ftStore = el.down('#fd_city').getStore();
		// ftStore.load({params: {start: 0, limit: 0, country_id: 87}});

		// var ftStore2 = null;
		// ftStore2 = el.down('#fd_city_old').getStore();
		// ftStore2.load({params: {start: 0, limit: 0, country_id: 87}});

		var state = el.up('window').state;

		if (state == 'create') {
			var hjbagbStore = me.getHgbajbStore();
			hjbagbStore.removeAll();
			me.getFormdata().down("#ktp_panel").el.setStyle({position: 'fixed', zIndex: 1000, padding: '0 0 0 0', background: 'none'});

			me.generateCombobox(me.getFormdata().down("[name=koresponden_province_id]"));
			me.generateCombobox(me.getFormdata().down("[name=ktp_province_id]"));
		} else {
			me.countLoadProcess = 0;
			me.getFormdata().up('window').body.mask('Loading data, please wait ...');

			var grid = me.getGrid();
			var store = grid.getStore();
			var form = me.getFormdata();

			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);

			// load purchase letter data
			var purchaseletterdetailStore = me.getPurchaseletterdetailStore();
			purchaseletterdetailStore.removeAll();
			purchaseletterdetailStore.load({
				params: {purchaseletter_id: record.data.purchaseletter_id, mode_read: 'detail'},
				callback: function (purchaselettedetailrec) {
					console.log('UPDATE UNIT PURCHASE LETTER DATA...');
					// console.log(purchaselettedetailrec[0]);
					form.down('[name=purchaseletter_id]').setValue(purchaselettedetailrec[0].get('purchaseletter_id'));
					form.down('[name=purchaseletter_no]').setValue(purchaselettedetailrec[0].get('purchaseletter_no'));
					form.down('[name=purchase_date]').setValue(purchaselettedetailrec[0].get('purchase_date'));
					form.down('[name=unit_id]').setValue(purchaselettedetailrec[0].get('unit_id'));
					form.down('[name=cluster_code]').setValue(purchaselettedetailrec[0].get('cluster_code'));
					form.down('[name=block_code]').setValue(purchaselettedetailrec[0].get('block_code'));
					form.down('[name=harga_jual]').setValue(purchaselettedetailrec[0].get('harga_jual'));

					me.fillUnitDataToForm(purchaselettedetailrec[0]);
					//Rizal 3 Mei 2019
					me.fillMasterCustomerData(record, 'customer', '_ph2');
					//

					// load SPPJB data
					var sppjbStore = me.getSppjbStore();
					sppjbStore.removeAll();
					sppjbStore.load({
						params: {purchaseletter_id: purchaselettedetailrec[0].get('purchaseletter_id')},
						callback: function (sppjbrec) {
							if (sppjbrec[0]) {
								form.down('[name=sppjb_no]').setValue(sppjbrec[0].get('sppjb_no'));
								form.down('[name=sppjb_date]').setValue(sppjbrec[0].get('sppjb_date'));
							}
						}
					});

					// load Akta PPJB data
					var aktappjbStore = me.getAktappjbStore();
					aktappjbStore.removeAll();
					aktappjbStore.load({
						params: {purchaseletter_id: purchaselettedetailrec[0].get('purchaseletter_id')},
						callback: function (aktappjbrec) {
							if (aktappjbrec[0]) {
								form.down('[name=aktappjb_no]').setValue(aktappjbrec[0].get('aktappjb_no'));
								form.down('[name=aktappjb_date]').setValue(aktappjbrec[0].get('aktappjb_date'));
							}
						}
					});

					// get buktipemilik_id for load ajb and hgb data
					var buktipemilikStore = me.getBuktipemilikpengalihanhakStore();
					buktipemilikStore.removeAll();
					buktipemilikStore.load({
						params: {unit_id: purchaselettedetailrec[0].get('unit_id')},
						callback: function (buktipemilikrec) {
							if (buktipemilikrec[0]) {
								var buktipemilik_id = buktipemilikrec[0].get('buktipemilik_id');
								//display detail HGB / AJB Grid on form data
								var hjbagbStore = me.getHgbajbStore();
								hjbagbStore.removeAll();
								hjbagbStore.load({params: {is_hgbajb: 'yes', buktipemilik_id: buktipemilik_id}});
							}
						}
					});

					me.countLoadProcess += 1;
				}
			});

			///// disable button
			//me.disableFieldForm();
			form.down('#fd_browse_unit_btn').setDisabled(true);
			//// end disable button

			if (state == 'update') {
				form.down("#formku3").setVisible(false);
				me.getFormdata().down('#btnPrintout').setDisabled(false);
				me.getFormdata().down('#btnPrintoutpHak').setDisabled(false);

				var globalparameterStore = me.getMasterparameterglobalStore();
				globalparameterStore.removeAll();
				globalparameterStore.load({
					params: {parametername: 'ENABLE_EDIT_CHGOWNERSHIPNO'},
					callback: function (rec) {
						if (rec.length > 0) {
							var global = rec[0].get('value');
							if (global === '1') {
								form.down('[name=changeownership_no]').setReadOnly(false);
							} else {
								form.down('[name=changeownership_no]').setReadOnly(true);
							}
						} else {
							form.down('[name=changeownership_no]').setReadOnly(true);
						}
					}
				});

			} else if (state == 'read') {
				me.getFormdata().getForm().getFields().each(function (field) {
					field.setReadOnly(true);
				});
				me.getFormdata().down('#btnSave').setDisabled(true);
			}
		}
	},
	formDataPrintout: function () {
		var me = this;
		var changeownership_id = me.getFormdata().down('#changeownership_id').getValue();
		_myAppGlobal.getController('Sppjb').printOut(me, changeownership_id, 'PRINTOUT_PENGALIHANHAK_DOC', 'erems/pengalihanhak/prinout');
	},
	instantWindowRZL: function (panel, width, title, state, id, controller) {
		var me = this;
		var formtitle, formicon;

		title = typeof title == 'undefined' ? 'My Window' : title;
		id = typeof id == 'undefined' ? 'myInstantWindow' : id;
		state = typeof state == 'undefined' ? 'create' : state;
		panel = typeof panel == 'undefined' ? 'Panel' : panel;
		width = typeof width == 'undefined' ? 600 : width;
		var controllerFolder = typeof controller === 'undefined' ? me.controllerName : controller;
		formtitle = title;
		formicon = 'icon-form-add';
		var winId = id;

		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: true,
				minimizable: false,
				maximizable: true,
				width: width,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: false,
				items: Ext.create('Erems.view.' + controllerFolder + '.' + panel),
				state: state
			});
		}
		win.show();
	},
	generateFakeForm2RZL: function (paramList, reportFile) {
		var form = '<form id="fakeReportFormID" action=resources/stimulsoftjsv2/viewer.php?reportfilelocation=' + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		for (var x in paramList) {
			if (paramList[x] === null) {
				paramList[x] = '';
			}
			form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
		}
		form += '<input type="submit" value="post"></form>';
		form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
		return form;
	},
	processReportPengalihanHak: function () {
		var me = this;

		var rec = me.getGrid().getSelectedRecord();
		if (rec) {

			var winId = 'myReportWindow';
			me.instantWindowRZL('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
			var win = desktop.getWindow(winId);

			if (win) {
				var params = [];

				params["changeownership_id"] = rec.get("changeownership_id");
				params["purchaseletter_id"] = rec.get("purchaseletter_id");
				// console.log(params["payment_id"]);
				var reportFile = 'PengalihanHak';

				var html = me.generateFakeForm2RZL(params, reportFile);

				win.down("#MyReportPanel").body.setHTML(html);
				$("#fakeReportFormID").submit();
			}
		}
	},
	dataExport: function (el) {
		var me = this;
		var export_type = 'excelpengalihanhak';
		el.up('window').body.mask('Creating Excel File, Please Wait...');

		Ext.Ajax.timeout = 60000 * 30;

		Ext.Ajax.request({
			url: 'erems/pengalihanhak/read/?action=schema',
			params: {
				popup_type: export_type,
				export_excel: 1
			},
			success: function (response) {
				try {
					var resp = response.responseText;

					if (resp) {
						var info = Ext.JSON.decode(resp);

						if (info.success == true) {
							el.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Info',
								msg: '<a href="' + info.url + '" target="blank">Click Here For Download Excel File</a>',
								icon: Ext.Msg.INFO,
								//buttons: [], //jika ingin tidak ada buttons
								buttons: Ext.Msg.CANCEL,
								buttonText:
										{
											cancel: 'Close',
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
				} catch (e) {
					//console.error(e);
					el.up('window').body.unmask();
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Export to Excel Failed.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			},
			failure: function (e) {
				//console.error(e);
				el.up('window').body.unmask();
				Ext.Msg.show({
					title: 'Failure',
					msg: 'Error: Export to Excel Failed.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
	},
	biayaPengalihanHak: function () {
		var me = this;
		var form = me.getFormdata();
		var harga_real = form.down('[name=harga_real_transaksi]').getValue();
		var harga_real_2 = Number(harga_real.replace(/,/g, ''));
		var person_id = form.down('[name=changeownershipreason_id]').getValue();
		var hasil = harga_real_2 * 0.025;

		Ext.Ajax.request({
			url: 'erems/pengalihanhak/read/?action=schema',
			params: {
				popup_type: 'access_bph_sby',
				param_person_id: person_id,

			},
			success: function (response) {
				try {
					var resp = response.responseText;
					// console.log(resp);
					if (resp == 'true' && hasil > 0) {
						form.down('[name=biaya]').setValue(hasil);
					}
				} catch (e) {
				}
			}
		});
	},
	reasonChange: function () {
		var me = this;
		var form = me.getFormdata();
		var person_id = form.down('[name=changeownershipreason_id]').getValue();

		Ext.Ajax.request({
			url: 'erems/pengalihanhak/read/?action=schema',
			params: {
				popup_type: 'change_reason',
				param_person_id: person_id,
			},
			success: function (response) {
				try {
					var resp = response.responseText;
					if (resp > 0) {
						form.down('[name=biaya]').setValue(resp);
					} else {
						$hsl = me.biayaPengalihanHak();
					}
				} catch (e) {
				}
			}
		});
	},
	//added by anas 02032021
	selectParamsppjbGridShow: function () {
		var me = this;
		_myAppGlobal.getController('Masterparametersppjb').browseItem('Pengalihanhak');
	},
	//added by anas 02032021
	fillMasterParametersppjb: function (rows) {
		var me = this;
		var plMasterparametersppjbStore = me.getMasterparametersppjbStore();
		plMasterparametersppjbStore.load({
			params: {mode_read: 'detail', parametersppjb_id: rows[0].get('parametersppjb_id')},
			callback: function (rec) {
				me.getFormdata().down('[name=parametersppjb_id]').setValue(rec[0].get('parametersppjb_id'));
				me.fillMasterParametersppjbData(rec[0], 'm_param');
			}
		});
	},
	//added by anas 02032021
	fillMasterParametersppjbData: function (records, prefix) {
		var pr = typeof prefix === 'undefined' ? 'm_param' : prefix;
		var me = this;
		var filledFields = ['code', 'name_01', 'name_02', 'akta_no', 'akta_date'];

		for (var x in filledFields) {
			if (me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']') != null) {
				me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']').setValue(records.data[filledFields[x]]);
			}
		}
	},
	//added by anas 02032021
	loadComboBoxStore: function (el) {
		var me = this;
		try {
			var itemForms = el.getForm().getFields().items;
			for (var x in itemForms) {
				/// make sure this component is combobox
				if (itemForms[x].getXTypes().indexOf("combobox") > -1) {
					// console.log(this)
					me.generateCombobox(itemForms[x]);
					// var field = itemForms[x];
					// console.log(field);
					// var store = Ext.create('Ext.data.Store', {
					// 	fields : [field.valueField, field.displayField],
					// 	data   : typeof field.source != 'undefined' && typeof me.setParam.storeData[field.source].data != 'undefined' ? me.setParam.storeData[field.source].data : new Array()
					// });
					// field.bindStore(store);

					// if (Boolean(field.getValue())) {
					// 	field.setValue(field.getValue());
					// }
				}

			}
		} catch (err) {
			console.log(err);
		}
	},
	generateCombobox : function(field){
		var me = this;
		var store = Ext.create('Ext.data.Store', {
			fields : [field.valueField, field.displayField],
			data   : typeof field.source != 'undefined' && typeof me.setParam.storeData[field.source].data != 'undefined' ? me.setParam.storeData[field.source].data : new Array()
		});
		field.bindStore(store);

		if (Boolean(field.getValue())) {
			field.setValue(field.getValue());
		}
	},
	//added by anas 12032021
	dataSave: function () {
		var me = this;
		var form = me.getFormdata().getForm();
		var addingRecord = false;
		if (!me.finalValidation()) {
			return false;
		}

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

		if (form.isValid() && vps) {

			resetTimer();
			//var store = me.getGrid().getStore();
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

					var idProperty = store.getProxy().getReader().getIdProperty();
					var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
					rec.beginEdit();
					rec.set(fida);
					rec.endEdit();
					break;
				default:
					return;
			}

			store.on('beforesync', msg);
			store.sync({
				success: function () {
					me.getFormdata().up('window').body.unmask();
					store.un('beforesync', msg);
					store.reload();

					if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
						Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
					}
					Ext.Msg.show({
						title: 'Success',
						msg: 'Data saved successfully.',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							me.formDataClose();
						}
					});
				},
				failure: function (batch, options) {
					var errMsg = (batch.proxy.getReader().jsonData.msg ? batch.proxy.getReader().jsonData.msg : 'Unable to save data.');

					me.getFormdata().up('window').body.unmask();
					store.un('beforesync', msg);
					if (store.getCount() > 0 && addingRecord) {
						store.removeAt(store.getCount() - 1);
					}
					store.reload();
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: ' + errMsg,
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			});
		}
	},
});