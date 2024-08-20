Ext.define('Erems.controller.Sspssb', {
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Sspssb',
	views: ['sspssb.Panel', 'sspssb.Grid', 'sspssb.FormSearch', 'sspssb.FormData'],
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Projectptcombobox',
		'Erems.library.template.component.Typecombobox',
		'Erems.library.template.component.Citycombobox'
	],
	stores: ['Sspssb', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masternotaris', 'Mastertype', 'Mastercluster', 'Masterblock', 'Masterparameterglobal', 'Masterdata.store.Projectpt', 'Masterdata.store.City'],
	models: ['Sspssb', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masternotaris', 'Masterblock', 'Masterdata.model.Projectpt', 'Masterdata.model.City'],
	refs: [
		{
			ref: 'grid',
			selector: 'sspssbgrid'
		},
		{
			ref: 'formsearch',
			selector: 'sspssbformsearch'
		},
		{
			ref: 'formdata',
			selector: 'sspssbformdata'
		}
	],
	comboBoxIdEl: ['fs_cluster_id', 'fs_block_id', 'fs_pt_id', 'fs_type_id', 'fs_customer'/*'fs_unit_id','fd_notaris_id'*/],
	controllerName: 'sspssb',
	fieldName: 'unit_number', //sspssb_no
	bindPrefixName: 'Sspssb',
	validationItems: [
		{name: 'purchaseletter_id', msg: 'You must select Kavling / Unit No. first'},
	],

	formWidth: 800,
	countLoadProcess: 0,
	init: function (application) {
		var me = this;

		this.control({
			test: me.eventMonthField,
			'sspssbpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'sspssbgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'sspssbgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'sspssbgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'sspssbgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'sspssbgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'sspssbgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'sspssbformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'sspssbformsearch button[action=search]': {
				click: this.dataSearch
			},
			'sspssbformsearch button[action=reset]': {
				click: this.dataReset
			},
			'sspssbformdata': {
				afterrender: this.formDataAfterRender
			},
			'sspssbformdata button[action=save]': {
				click: this.dataSave
			},
			'sspssbformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'sspssbformdata button[action=browse_unit]': {
				click: me.selectUnitGridShow
			},
			/* formdata keyup function */
			'sspssbformdata [name=npoptkp]': {
				keyup: me.fillNPOPKP
			},
			'sspssbformdata [name=bphtb_persen]': {
				keyup: me.fillNPOPKP
			},
			'sspssbformdata [name=warishibah]': {
				keyup: me.fillNPOPKP
			},
			'sspssbformdata [name=totalbayar_persen]': {
				keyup: me.fillNPOPKP
			},
			'sspssbformdata [name=njop_landprice]': {
				keyup: me.fillNJOPPBB
			},
			'sspssbformdata [name=njop_buildingprice]': {
				keyup: me.fillNJOPPBB
			},
			/* end formdata keyup function */

			//add on 3 nov 2016
			//button view pphpayment
			'sspssbgrid toolbar button[action=viewpphpayment]': {
				click: function () {
					_myAppGlobal.getController('Buktipemilik').gridID = 'sspssbgrid';
					_myAppGlobal.getController('Buktipemilik').formDataPphPaymentShow('view');
				}
			}
			//end add 3 nov 2016
		});
	},

	//add on 3 nov 2016
	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		grid.down('#btnEdit').setDisabled(row.length != 1);
		grid.down('#btnDelete').setDisabled(row.length < 1);

		//add on 3 nov 2016
		grid.down('#btnViewPphPayment').setDisabled(row.length != 1);
		//end add 3 nov 2016
	},
	//end add 3 nov 2016

	specialRequest: function (store) {
		store.load({params: {param_spcreq: 'plSspssb'}});
	},
	selectUnitGridShow: function () {
		var me = this;

		//_Apps.getController('Purchaseletter').browseItem('Sspssb');
		//_Apps.getController('Purchaseletter').browseItemWR('Sspssb', 'pl_sspssb');
		// _Apps.getController('Sppjb').spcreq = 'plSspssb';

		_myAppGlobal.getController('Sppjb').ctrler = 'Sspssb';
		_myAppGlobal.getController('Sppjb').spcreq = 'all';

		_myAppGlobal.getController('Sppjb').instantWindow('browse.Panel', 800, 'Browse Item', 'read', 'myBrowseItemPanel');
		
	},
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
				console.log('RECORDS PURCHASE LETTER...');
				console.log(rec[0]);
				me.getFormdata().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
				me.getFormdata().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
				me.getFormdata().down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));
				me.getFormdata().down('[name=unit_id]').setValue(rec[0].get('unit_id'));
				me.getFormdata().down('#fd_city').setValue(rec[0].get('customer_city_id'));
				me.getFormdata().down('[name=nop_landaddress]').setValue(rec[0].get('unit_project_address'));

				me.getFormdata().down('[name=npop]').setValue(me.fmb(rec[0].get('harga_jual')));
				me.getFormdata().down('[name=warishibah]').setValue(0.00);

				me.getFormdata().down('[name=njop_landsize]').setValue(me.fmb(rec[0].get('unit_land_size')));
				me.getFormdata().down('[name=njop_buildingsize]').setValue(me.fmb(rec[0].get('unit_building_size')));
				me.getFormdata().down('[name=njop_hargajual]').setValue(me.fmb(rec[0].get('harga_jual')));
				me.getFormdata().down('[name=njop_landprice]').setValue(0.00);
				me.getFormdata().down('[name=njop_buildingprice]').setValue(0.00);
				//me.getFormdata().down('[name=unit_electricity]').setValue(rec[0].get('unit_electricity'));

				me.fillUnitDataToForm(rec[0]);
				me.fillMasterCustomerData(rec[0], 'customer');
				me.fillWajibPajakInformationData(rec[0], 'wajibpajak');

				me.tcb();

			}
		});

		//var aaa = me.getParameterGlobalValue('SSP_NPOPTKP');
		//console.log('c '+aaa);

		//load global parameter
		var masterparameterglobalStore = me.getMasterparameterglobalStore();
		masterparameterglobalStore.removeAll();
		masterparameterglobalStore.load({
			params: {parametername: 'SSP_NPOPTKP'},
			callback: function (rec) {
				me.getFormdata().down('[name=npoptkp]').setValue(me.fmb(rec[0].data.value));
				me.tcb();
			}
		});

		masterparameterglobalStore.removeAll();
		masterparameterglobalStore.load({
			params: {parametername: 'SSP_PERSEN_BEAHAK'},
			callback: function (rec) {
				me.getFormdata().down('[name=bphtb_persen]').setValue(me.fmb(rec[0].data.value));
				me.tcb();
			}
		});

		masterparameterglobalStore.removeAll();
		masterparameterglobalStore.load({
			params: {parametername: 'SSP_PERSEN_PAJAK'},
			callback: function (rec) {
				me.getFormdata().down('[name=totalbayar_persen]').setValue(me.fmb(rec[0].data.value));
				me.tcb();
			}
		});

		//me.tcb();
	},

	//for callback (function in function)
	tcb: function () {
		var me = this;
		me.fillNPOPKP();
	},

	fillNPOPKP: function () {
		var me = this;
		var npop = toFloat(me.getFormdata().down('[name=npop]').getValue());

		if (npop) {
			var npoptkp = toFloat(me.getFormdata().down('[name=npoptkp]').getValue());
			if (!npoptkp) {
				npoptkp = 0
			}
			var npopkp = npop - npoptkp;

			var bphtb_persen = toFloat(me.getFormdata().down('[name=bphtb_persen]').getValue());
			if (!bphtb_persen) {
				bphtb_persen = 0
			}
			var bphtb_value = (bphtb_persen * npopkp) / 100;

			var warishibah = toFloat(me.getFormdata().down('[name=warishibah]').getValue());
			if (!warishibah) {
				warishibah = 0
			}
			var bphtb_bayar = bphtb_value + warishibah;

			var totalbayar_persen = toFloat(me.getFormdata().down('[name=totalbayar_persen]').getValue());
			if (!totalbayar_persen) {
				totalbayar_persen = 0
			}
			var totalbayar_value = (totalbayar_persen * npop) / 100;
		}

		me.getFormdata().down('[name=npopkp]').setValue(me.fmb(npopkp));
		me.getFormdata().down('[name=bphtb_value]').setValue(me.fmb(bphtb_value));
		me.getFormdata().down('[name=bphtb_bayar]').setValue(me.fmb(bphtb_bayar));
		me.getFormdata().down('[name=totalbayar_value]').setValue(me.fmb(totalbayar_value));
	},

	fillNJOPPBB: function () {
		var me = this;
		var njop_landsize = toFloat(me.getFormdata().down('[name=njop_landsize]').getValue());
		var njop_buildingsize = toFloat(me.getFormdata().down('[name=njop_buildingsize]').getValue());

		var njop_landprice = toFloat(me.getFormdata().down('[name=njop_landprice]').getValue());
		if (!njop_landprice) {
			njop_landprice = 0
		}
		var njop_buildingprice = toFloat(me.getFormdata().down('[name=njop_buildingprice]').getValue());
		if (!njop_buildingprice) {
			njop_buildingprice = 0
		}

		var njop_landpbb = njop_landsize * njop_landprice;
		var njop_buildingpbb = njop_buildingsize * njop_buildingprice;
		var njop_totalpbb = njop_landpbb + njop_buildingpbb;

		me.getFormdata().down('[name=njop_landpbb]').setValue(me.fmb(njop_landpbb));
		me.getFormdata().down('[name=njop_buildingpbb]').setValue(me.fmb(njop_buildingpbb));
		me.getFormdata().down('[name=njop_totalpbb]').setValue(me.fmb(njop_totalpbb));
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
			'name', 'npwp', 'address'
		];

		for (var x in filledFields) {
			if (me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']') != null) {
				me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']').setValue(records.data[pr + '_' + filledFields[x]]);
			}

		}
	},

	fillWajibPajakInformationData: function (records, prefix) {
		var pr = typeof prefix === 'undefined' ? 'wajibpajak' : prefix;
		var me = this;
		var filledFields = [
			'name', 'npwp', 'address', 'zipcode', 'city_id'
		];

		for (var x in filledFields) {
			if (me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']') != null) {
				me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']').setValue(records.data['customer_' + filledFields[x]]);
			}

		}
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

		ftStore = el.down('#fd_city_wajibpajak').getStore();
		ftStore.load({params: {start: 0, limit: 0, country_id: 87}});

		ftStore = el.down('#fd_city_nop').getStore();
		ftStore.load({params: {start: 0, limit: 0, country_id: 87}});


		if (state == 'create') {
			// el.down('#active').setValue(1);
			//me.getFormdata().down('#btnSave').setDisabled(false);
		} else {

			me.countLoadProcess = 0;
			me.getFormdata().up('window').body.mask('Loading data, please wait ...');

			var grid = me.getGrid();
			var store = grid.getStore();
			var form = me.getFormdata();

			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);

			form.down('[name=npop]').setValue(me.fmb(record.data.npop));
			form.down('[name=npoptkp]').setValue(me.fmb(record.data.npoptkp));
			form.down('[name=warishibah]').setValue(me.fmb(record.data.warishibah));
			form.down('[name=npopkp]').setValue(me.fmb(record.data.npopkp));
			form.down('[name=bphtb_value]').setValue(me.fmb(record.data.bphtb_value));
			form.down('[name=bphtb_bayar]').setValue(me.fmb(record.data.bphtb_bayar));
			form.down('[name=totalbayar_value]').setValue(me.fmb(record.data.totalbayar_value));

			form.down('[name=njop_landprice]').setValue(me.fmb(record.data.njop_landprice));
			form.down('[name=njop_buildingprice]').setValue(me.fmb(record.data.njop_buildingprice));
			form.down('[name=njop_landpbb]').setValue(me.fmb(record.data.njop_landpbb));
			form.down('[name=njop_buildingpbb]').setValue(me.fmb(record.data.njop_buildingpbb));
			form.down('[name=njop_totalpbb]').setValue(me.fmb(record.data.njop_totalpbb));
			form.down('[name=njop_hargajual]').setValue(me.fmb(record.data.njop_hargajual));

			// load purchase letter data
			var purchaseletterdetailStore = me.getPurchaseletterdetailStore();
			purchaseletterdetailStore.removeAll();
			purchaseletterdetailStore.load({params: {purchaseletter_id: record.data.purchaseletter_id, mode_read: 'detail'},
				callback: function (purchaselettedetailrec) {
					console.log('UPDATE UNIT PURCHASE LETTER DATA...');
					console.log(purchaselettedetailrec[0]);
					form.down('[name=purchase_date]').setValue(purchaselettedetailrec[0].get('purchase_date'));
					form.down('#fd_city').setValue(purchaselettedetailrec[0].get('customer_city_id'));
					me.fillUnitDataToForm(purchaselettedetailrec[0]);
					me.fillMasterCustomerData(purchaselettedetailrec[0], 'customer');
					me.countLoadProcess += 1;
					//me.checkAllDetailLoadingProcess();

				}});

			///// disable button
			//me.disableFieldForm();
			form.down('#fd_browse_unit_btn').setDisabled(true);
			//// end disable button

			if (state == 'update') {

			} else if (state == 'read') {
				me.getFormdata().getForm().getFields().each(function (field) {
					field.setReadOnly(true);
				});
				me.getFormdata().down('#btnSave').setDisabled(true);
			}
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
	}

});