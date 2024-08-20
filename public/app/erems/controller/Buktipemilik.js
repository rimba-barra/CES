Ext.define('Erems.controller.Buktipemilik', {
	extend: 'Erems.library.template.controller.Controller',
	alias: 'controller.Buktipemilik',
	requires: [
		'Erems.library.DetailtoolAll',
		'Erems.library.template.component.Girikcombobox',
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Projectptcombobox',
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Positioncombobox',
		'Erems.library.template.component.Productcategorycombobox',
		'Erems.library.template.component.Typecombobox',
		'Erems.library.template.component.Unitstatuscombobox',
		'Erems.library.template.component.Notariscombobox',
		
	],
	views: ['buktipemilik.Panel', 'buktipemilik.Grid', 'buktipemilik.FormSearch', 'buktipemilik.FormData', 'buktipemilik.Hgbajbgrid', 'buktipemilik.HgbajbFormData', 'pphpayment.FormData', 'buktipemilik.Customerdocumentgrid', 'buktipemilik.BankGridAkad', 'buktipemilik.BankAkadFormDataDetail', 'buktipemilik.GridHistory', 'buktipemilik.BankGrid', 'buktipemilik.GridNjop'],
	stores: [
		'Buktipemilik',
		'Unit',
		'Mastercustomer',
		'Purchaseletterdetail',
		'Sppjb',
		'Aktappjb',
		'Masterpbbinduk',
		'Masterhgbinduk',
		'Hgbajb',
		'Mastercustomerdocument',
		'Bankkprakad',
		'Masterakadconfirmationstatus',
		'Masterparameterglobal',
		'Unitstatus',
		'Mastergirik',
		'Buktipemilikhistory', // added by rico 21072022
		'Bankkpr', // added by rico 03072023
		'Buktipemiliknjop' // added by rico 10082023
	],
	models: [
		'Buktipemilik',
		'Unit',
		'Mastercustomer',
		'Purchaseletterdetail',
		'Sppjb',
		'Aktappjb',
		'Masterpbbinduk',
		'Masterhgbinduk',
		'Hgbajb',
		'Mastercustomerdocument',
		'Bankkprakad',
		'Masterakadconfirmationstatus',
		'Buktipemilikhistory', // added by rico 21072022
		'Bankkpr', // added by rico 03072023
		'Buktipemiliknjop' // added by rico 10082023
	],
	detailTool2: null,
	refs: [
		{
			ref: 'grid',
			selector: 'buktipemilikgrid'
		},
		{
			ref: 'formsearch',
			selector: 'buktipemilikformsearch'
		},
		{
			ref: 'formdata',
			selector: 'buktipemilikformdata'
		},
		{
			ref: 'hgbajbgrid',
			selector: 'buktipemilikhgbajbgrid'
		},
		{
			ref: 'hgbajbformdata',
			selector: 'buktipemilikhgbajbformdata'
		},
		{
			ref: 'pphpaymentformdata',
			selector: 'PphpaymentFormData'
		},
		{
			ref: 'customerdocumentgrid',
			selector: 'buktipemilikcustomerdocumentgrid'
		},
		{
			ref: 'bankgridakad',
			selector: 'buktipemilikbankgridakad'
		},
		{
			ref: 'bankakadformdatadetail',
			selector: 'buktipemilikbankakadformdatadetail'
		},
		{
			ref: 'bankakadformdatadetail',
			selector: 'buktipemilikbankakadformdatadetail'
		},
		{
			ref: 'gridhistory',
			selector: 'buktipemilikgridhistory'
		},
		{
			ref      : 'bankgrid',
			selector : 'buktipemilikbankgrid'
		},
		// added by rico 10082023
		{
			ref: 'gridnjop',
			selector: 'buktipemilikgridnjop'
		},
		{
			ref: 'njopformdata',
			selector: 'buktipemiliknjopformdata'
		},

	],
	comboBoxIdEl: ['fs_cluster_id', 'fs_pt_id', 'fs_block_id', 'fs_position_id', 'fs_productcategory_id', 'fs_type_id', 'fs_unitstatus_id', 'fd_hgbajb_pt_id', 'fd_hgbajb_notaris_id','fd_notaris_akta_id','fd_notaris_ajb_id'],
	controllerName: 'buktipemilik',
	fieldName: 'buktipemilik_no',
	bindPrefixName: 'Buktipemilik',
	gridID: '',
	validationItems: [{name: 'purchaseletter_id', msg: 'You must select Kavling / Unit No. first'}],
	validationItemsHgbajb: [{name: 'hgbinduk_id', msg: 'You must select HGB Induk first'}],
	formWidth: 800,
	countLoadProcess: 0,
	genco_um: 0,
	///////////////// COMBOBOX /////////////// add by erwin.st 30122021
	getData : {
		cek_um                   : null,
		validasium_config        : null,
		subholding_config        : null,
		get_subholding           : null,
		combobox_block           : null,
		combobox_cluster         : null,
		combobox_notaris         : null,
		combobox_posisi          : null,
		combobox_productcategory : null,
		combobox_projectpt       : null,
		combobox_type            : null,
		imb_pecahan_readonly     : 0,
	},

	init: function (application) {
		var me = this;

		this.control({
			test: me.eventMonthField,
			'buktipemilikpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender
			},
			'buktipemilikgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'buktipemilikgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'buktipemilikgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'buktipemilikgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'buktipemilikgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			//===== view
			'buktipemilikgrid toolbar button[action=view]': {
				click: function () {
					this.formDataShow('view');
				}
			},
			//===== end view
			'buktipemilikgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'buktipemilikformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'buktipemilikformsearch button[action=search]': {
				click: this.dataSearch
			},
			'buktipemilikformsearch button[action=reset]': {
				click: this.dataReset
			},
			'buktipemilikformdata': {
				afterrender: this.formDataAfterRender
			},
			'buktipemilikformdata button[action=save]': {
				click: this.dataSave
			},
			'buktipemilikformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'buktipemilikformdata button[action=browse_unit]': {
				click: me.selectUnitGridShow
			},
			'buktipemilikformdata button[action=browse_pbbinduk]': {
				click: me.selectPbbindukGridShow
			},

			// GRID HGB / AJB -- START --
			'buktipemilikhgbajbgrid': {
				itemdblclick: me.hgbajbgridItemDblClick,
				selectionchange: me.hgbajbgridSelectionChange
			},
			'buktipemilikhgbajbgrid button[action=add_hgbajb]': {
				click: function () {
					me.formDataHgbajbShow('create');
				}
			},
			'buktipemilikhgbajbgrid button[action=edit_hgbajb]': {
				click: function () {
					me.formDataHgbajbShow('update');
				}
			},
			'buktipemilikhgbajbgrid button[action=view_hgbajb]': {
				click: function () {
					me.formDataHgbajbShow('view');
				}
			},
			'buktipemilikhgbajbformdata': {
				afterrender: me.hjbagbformDataAfterRender
			},
			'buktipemilikhgbajbformdata button[action=browse_hgbinduk]': {
				click: me.selectHgbindukGridShow
			},
			'buktipemilikhgbajbformdata button[action=save]': {
				click: me.dataSaveHgbajb
			},
			'buktipemilikhgbajbformdata button[action=print]': {
				click: me.printHgbajb
			},
			'buktipemilikhgbajbgrid toolbar button[action=delete_hgbajb]': {
				click: me.dataDestroyHgbajb
			},
			// GRID HGB / AJB -- END --

			//add on 3 nov 2016
			//button view pphpayment
			'buktipemilikgrid toolbar button[action=viewpphpayment]': {
				click: function () {
					me.gridID = 'buktipemilikgrid';
					me.formDataPphPaymentShow('view');
				}
			},
			'buktipemilikgrid toolbar button[action=printcovernotes]': {
				click: function () {
					me.printCoverNotes();
				}
			},
			'PphpaymentFormData': {
				afterrender: me.phppaymentformDataAfterRender
			},
			'PphpaymentFormData #btnCancel': {
				click: me.phppaymentFormDataClose
			},
			//end add 3 nov 2016
			// add on 3 juli 2018
			'buktipemilikcustomerdocumentgrid actioncolumn': {
				downloadaction: me.customerdocumentgridDownloadColumnClick
			},
			'buktipemilikbankgridakad toolbar button[action=create]': {
				click: me.cekBankkprakad
			},
			'buktipemilikbankakadformdatadetail': {
				beforerender: this.formDataBankAkadBeforeRender
			},
			'buktipemilikbankgridakad actioncolumn': {
				editaction: me.bankgridakadactionEditColumnClick,
				deleteaction: me.bankgridakadactionDeleteColumnClick
			},
			'buktipemilikbankakadformdatadetail button[action=save]': {
				click: me.detailBankAkadForm.save
			},

			'buktipemilikformdata [name=imb_no]': {
				change: function(e, val){
					if(me.getData.imb_pecahan_readonly){
						me.getFormdata().down('[name=imb_pecahan_no]').setValue(val);
					}
				}
			},

			'buktipemilikformdata [name=imb_date]': {
				change: function(e, val){
					if(me.getData.imb_pecahan_readonly){
						me.getFormdata().down('[name=imb_pecahan_date]').setValue(val);
					}
				}
			},

			// added by rico 28062022
			'buktipemilikformdata checkboxfield[name=is_holdlegal]': {
				change: function(e, el){
					var form = me.getFormdata();
					form.down('[name=notes_holdlegal]').setReadOnly(!el);
				}
			},

			// added by rico 22072022
			'buktipemilikformdata textfield[name=tanggal_akta_subrogasi]': {
				change: function(e, el){
					var form = me.getFormdata();
					form.down('[name=is_unit_dikosongkan]').setReadOnly(!el);
				}
			},
			// added by rico 10082023
			'buktipemilikgridnjop': {
				itemdblclick: me.njopgridItemDblClick,
				selectionchange: me.njopgridSelectionChange
			},
			'buktipemilikgridnjop button[action=create]': {
				click: function () {
					me.formDataNjopShow('create');
				}
			},
			'buktipemilikgridnjop button[action=update]': {
				click: function () {
					me.formDataNjopShow('update');
				}
			},
			'buktipemilikgridnjop toolbar button[action=destroy]': {
				click: me.dataDestroyNjop
			},
			'buktipemilikgridnjop button[action=view]': {
				click: function () {
					me.formDataNjopShow('view');
				}
			},
			'buktipemiliknjopformdata': {
				afterrender: me.njopformDataAfterRender
			},
			'buktipemiliknjopformdata button[action=save]': {
				click: me.dataSaveNjop
			},
			// added by rico 14082023
			'buktipemilikgrid toolbar button[action=printorderakta]': {
				click: function () {
					me.printOrderAkta();
				}
			},
			'buktipemilikgrid toolbar button[action=printsuratbiaya]': {
				click: function () {
					me.printSuratBiaya();
				}
			},
			'buktipemilikgrid toolbar button[action=printorderajb]': {
				click: function () {
					me.printOrderAJB();
				}
			},

		});
	},
	printHgbajb: function () {
		var me = this;

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'PRINTOUT_PENJADWALANAJB_DOC'}});

		var formhgbajb = me.getHgbajbformdata();
		var hgbajb_id = formhgbajb.down('[name=hgbajb_id]').getValue();
		var id = hgbajb_id;
		me.documentPrintout(id, 'erems/buktipemilik/read');

		var combo = Ext.getCmp('cbPrintoutID');
		combo.bindStore(globalparameterStore);
	},
	formDataPphPaymentShow: function (state) {
		var me = this, formtitle, formicon;

		switch (state) {
			case 'view':
				formtitle = 'View PPH Payment';
				formicon = 'icon-form';
				break;
		}
		var winId = 'win-phppaymentformdata';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id              : winId,
				title           : formtitle,
				iconCls         : formicon,
				resizable       : false,
				minimizable     : false,
				maximizable     : false,
				width           : me.formWidth,
				renderTo        : Ext.getBody(),
				constrain       : true,
				constrainHeader : false,
				modal           : true,
				layout          : 'fit',
				shadow          : 'frame',
				shadowOffset    : 10,
				border          : false,
				state           : state,
				listeners       : {
					boxready: function () {
						win.body.mask('Loading...');
						var tm = setTimeout(function () {
							win.add(Ext.create('Erems.view.pphpayment.FormData'));
							win.center();
							win.body.unmask();
							clearTimeout(tm);
						}, 1000);
					},
				}
			});
		}
		win.show();
	},
	phppaymentformDataAfterRender: function (el) {
		var me = this;
		var state = el.up('window').state;
		if (state == 'view') {
			var grid   = Ext.getCmp(me.gridID);
			var store  = grid.getStore();
			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);

			el.down('#btnSave').setVisible(false);

			var plId = record.data.purchaseletter_id;

			var phppaymentlistStore = el.down('#PphpaymentListGrid').getStore();
			phppaymentlistStore.removeAll();
			phppaymentlistStore.load({params: {datasearch: '{"purchaseletter_id":"' + plId + '"}', start: 0, limit: 0}});
		} else {
			el.down('#btnSave').setVisible(true);
		}
	},
	phppaymentFormDataClose: function (el) {
		el.up('window').close();
	},
	//end add 3 nov 2016
	panelAfterRender: function (el) {
		var me = this;
		setObject(el, function () {
			me.getGrid().down('#btnNew').setVisible(false);
			me.getGrid().down('#btnDelete').setVisible(false);
		});
	},
	specialRequest: function (store) {
		store.load({params: {param_spcreq: 'plBuktipemilik'}});
	},
	selectUnitGridShow: function () {
		var me = this;

		_myAppGlobal.getController('Purchaseletter').browseItemWR('Buktipemilik', 'pl_buktipemilik');
	},
	selectPbbindukGridShow: function () {
		var me = this;
		_myAppGlobal.getController('Masterpbbinduk').browseItem('Buktipemilik');
	},
	selectHgbindukGridShow: function () {
		var me = this;
		_myAppGlobal.getController('Masterhgbinduk').browseItem('Buktipemilik');
	},
	processRowFromItemSelection: function (rows, modul) {
		var me = this;

		switch (modul) {
			case 'masterpbbinduk':
				me.fillPbbinduk(rows);
				break;
			case 'masterhgbinduk':
				me.fillHgbinduk(rows);
				break;
		}
	},
	fillPbbinduk: function (rows) {
		var me = this;

		var me = this;
		var masterpbbindukStore = me.getMasterpbbindukStore();
		masterpbbindukStore.load({
			params: {mode_read: 'detail', pbbinduk_id: rows[0].get('pbbinduk_id')},
			callback: function (rec) {
				console.log('RECORDS PBB INDUK...');
				console.log(rec[0]);
				me.getFormdata().down('[name=pbbinduk_id]').setValue(rec[0].get('pbbinduk_id'));
				me.fillPbbindukDataToForm(rec[0]);
			}
		});
	},
	fillPbbindukDataToForm: function (data) {
		var me = this;
		if (me.getFormdata().down('[name=pbbinduk_code]') != null) {
			me.getFormdata().down('[name=pbbinduk_code]').setValue(data.data['code']);
			me.getFormdata().down('[name=pbbinduk_kecamatan_id]').setValue(data.data['kecamatan_id']);
			me.getFormdata().down('[name=nop]').setValue(data.data['nopinduk']);
		}
	},

	fillHgbinduk: function (rows) {
		var me = this;
		var masterhgbindukStore = me.getMasterhgbindukStore();
		masterhgbindukStore.load({
			params: {mode_read: 'detail', hgbinduk_id: rows[0].get('hgbinduk_id')},
			callback: function (rec) {
				console.log('RECORDS HGB INDUK...');
				console.log(rec[0]);
				me.getHgbajbformdata().down('[name=hgbinduk_id]').setValue(rec[0].get('hgbinduk_id'));
				me.fillHgbindukDataToForm(rec[0]);
			}
		});
	},
	fillHgbindukDataToForm: function (data) {
		var me = this;
		var filledFields = ['code', 'hgbinduk', 'gs', 'desa', 'date', 'gs_date', 'luas'];

		for (var x in filledFields) {
			if (me.getHgbajbformdata().down('[name=hgbinduk_' + filledFields[x] + ']') != null) {
				me.getHgbajbformdata().down('[name=hgbinduk_' + filledFields[x] + ']').setValue(data.data[filledFields[x]]);
			}
		}
	},
	fillSppjbDataToForm: function (data) {
		var me = this;
		var filledFields = ['sppjb_no', 'sppjb_date', 'sppjb_name', 'serahterima_date', 'tandatangan_date'];

		for (var x in filledFields) {
			//console.log(data.data['sppjb_' + filledFields[x]]);
			if (me.getFormdata().down('[name=sppjb_' + filledFields[x] + ']') != null) {
				me.getFormdata().down('[name=sppjb_' + filledFields[x] + ']').setValue(data.data[filledFields[x]]);
			}

		}
	},
	fillAktappjbDataToForm: function (data) {
		var me = this;
		var filledFields = ['aktappjb_no', 'aktappjb_date', 'aktappjb_name', 'handover_date'];

		for (var x in filledFields) {
			//console.log(data.data['sppjb_' + filledFields[x]]);
			if (me.getFormdata().down('[name=aktappjb_' + filledFields[x] + ']') != null) {
				me.getFormdata().down('[name=aktappjb_' + filledFields[x] + ']').setValue(data.data[filledFields[x]]);
			}
		}
	},
	formDataAfterRender: function (el) {
		var me = this;
		var state = el.up('window').state;

		me.countLoadProcess = 0;
		me.getFormdata().up('window').body.mask('Loading data, please wait ...');

		var grid = me.getGrid();
		var store = grid.getStore();
		var form = me.getFormdata();

		me.setCombobox(form.down('[name=unit_cluster_id]'), me.getData.combobox_cluster);
		me.setCombobox(form.down('[name=unit_block_id]'), me.getData.combobox_block);
		me.setCombobox(form.down('[name=notaris_id]'), me.getData.combobox_notaris);

		// added by rico 14082023
		me.setCombobox(form.down('[name=notaris_akta_id]'), me.getData.combobox_notaris);
		me.setCombobox(form.down('[name=notaris_ajb_id]'), me.getData.combobox_notaris);

		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
		el.loadRecord(record);

		if(record.data.unitstatus_id == 3 || record.data.unitstatus_id == 15){
			form.down('[name=is_holdlegal]').setReadOnly(false);
		}

		var temp_buktipemilik_id = me.randomString(20);

		var pbbIndukId = record.data.pbbinduk_id;

		var buktiPemilikId = record.data.buktipemilik_id;
		if (buktiPemilikId == 0) {
			form.down('[name=temp_buktipemilik_id]').setValue(temp_buktipemilik_id);
		}
		
		//load grid Bank KPR
		var bankkprStore = me.getBankkprStore();
		bankkprStore.removeAll();
		bankkprStore.load({params: {purchaseletter_id: record.data.purchaseletter_id}});

		form.down('#box_ppndptp').setVisible(record.get('is_nonppn'));
		form.down('#box_notariil').setVisible(record.get('is_nonppn'));
		form.down('#box_akta').setVisible(record.get('is_nonppn'));
		
		form.down('[name=buktipemilik_id]').setValue(buktiPemilikId);
		form.down('[name=imb_no]').setValue(record.data.imb_no);
		form.down('[name=imb_date]').setValue(record.data.imb_date);
		form.down('[name=imb_legal_date]').setValue(record.data.imb_legal_date);
		form.down('[name=imb_buy_date]').setValue(record.data.imb_buy_date);
		form.down('[name=nop]').setValue(record.data.nop);
		form.down('[name=reg_date]').setValue(record.data.reg_date);
		form.down('[name=imb_target_date]').setValue(record.data.imb_target_date);
		form.down('[name=ijin_tobpt_date]').setValue(record.data.ijin_tobpt_date);
		form.down('[name=bpt_toijin_date]').setValue(record.data.bpt_toijin_date);
		form.down('[name=imb_pecahan_no]').setValue(record.data.imb_pecahan_no);
		form.down('[name=reg_pecahan_date]').setValue(record.data.reg_pecahan_date);
		form.down('[name=imb_pecahan_date]').setValue(record.data.imb_pecahan_date);
		form.down('[name=ijin_tobpt_pecahan_date]').setValue(record.data.ijin_tobpt_pecahan_date);
		form.down('[name=bpt_toijin_pecahan_date]').setValue(record.data.bpt_toijin_pecahan_date);
		form.down('[name=imb_legal_pecahan_date]').setValue(record.data.imb_legal_pecahan_date);
		form.down('[name=pbb_ijin_topemda_date]').setValue(record.data.pbb_ijin_topemda_date);
		form.down('[name=pbb_pemda_toijin_date]').setValue(record.data.pbb_pemda_toijin_date);
		form.down('[name=ssp_terima_date]').setValue(record.data.ssp_terima_date);
		form.down('[name=aftersales_st_date]').setValue(record.data.aftersales_st_date);
		form.down('[name=pengurusan_ijin_topemda_date]').setValue(record.data.pengurusan_ijin_topemda_date);
		form.down('[name=pengurusan_pemda_toijin_date]').setValue(record.data.pengurusan_pemda_toijin_date);
		form.down('[name=pengukuran_ijin_tobpn_date]').setValue(record.data.pengukuran_ijin_tobpn_date);
		form.down('[name=pengukuran_bpn_toijin_date]').setValue(record.data.pengukuran_bpn_toijin_date);
		form.down('[name=note_bp]').setValue(record.data.note_bp);
		form.down('[name=akad_note_bp]').setValue(record.data.akad_note_bp);
		form.down('[name=imb_khusus_no]').setValue(record.data.imb_khusus_no);
		form.down('[name=reg_khusus_date]').setValue(record.data.reg_khusus_date);
		form.down('[name=ijin_tobpt_khusus_date]').setValue(record.data.ijin_tobpt_khusus_date);
		form.down('[name=bpt_toijin_khusus_date]').setValue(record.data.bpt_toijin_khusus_date);
		form.down('[name=imb_legal_khusus_date]').setValue(record.data.imb_legal_khusus_date);
		form.down('[name=imb_buy_khusus_date]').setValue(record.data.imb_buy_khusus_date);
		form.down('[name=is_lunas]').setValue(record.raw.is_lunas);

		// added by rico 02092022
		form.down('[name=is_tundapembayaran_legalitas]').setValue(record.data.is_tundapembayaran_legalitas);

		// added by rico 28062022
		form.down('[name=tanggal_akta_subrogasi]').setValue(record.data.tanggal_akta_subrogasi);
		form.down('[name=notes_holdlegal]').setValue(record.data.notes_holdlegal);
		form.down('[name=is_holdlegal]').setValue(record.raw.is_holdlegal);
		form.down('[name=unitstatus_id]').setValue(record.data.unitstatus_id);

		form.down('[name=notaris_id]').setValue(record.data.notaris_id ? record.data.notaris_id : '');
		form.down('[name=no_akta_subrogasi]').setValue(record.data.no_akta_subrogasi);

		// added by rico 14082023
		form.down('[name=notaris_akta_id]').setValue(record.data.notaris_akta_id ? record.data.notaris_akta_id : '');
		form.down('[name=notaris_ajb_id]').setValue(record.data.notaris_ajb_id ? record.data.notaris_ajb_id : '');

		// added by rico 21072022
		form.down('[name=is_unit_dikosongkan]').setValue(record.raw.is_unit_dikosongkan);
		var state_admistrative = (record.raw.state_admistrative == 5 || record.raw.state_admistrative == 8) ? false : true;

		form.down('[name=tanggal_akta_subrogasi]').setReadOnly(state_admistrative);
		form.down('[name=no_akta_subrogasi]').setReadOnly(state_admistrative);
		form.down('[name=notaris_id]').setReadOnly(state_admistrative);
		
		var akta = (form.down('[name=tanggal_akta_subrogasi]').value) ? (record.raw.state_admistrative == 5 || record.raw.state_admistrative == 8) ? false : true: true;		
		form.down('[name=is_unit_dikosongkan]').setReadOnly(akta);

		form.down('[name=debitur_name]').setValue(record.raw.debitur_name);

		var bankkprakadStore = me.getBankkprakadStore();
		bankkprakadStore.removeAll();

		if (typeof record.internalId == 'number') {
			var purchaseletterId = record.internalId;
			var detailStore = me.getPurchaseletterdetailStore();
			detailStore.removeAll();
			detailStore.load({
				params: {mode_read: 'detail', purchaseletter_id: purchaseletterId, param_scheduletype: 'UM', requestor_code: 'pl__tb'},
				callback: function (records) {
					var rec = null;
					if (records != null) {
						me.countLoadProcess += 1;
						//me.checkAllDetailLoadingProcess();
						rec = detailStore.getAt(0);
						el.loadRecord(rec);

						form.down('[name=harga_jual]').setValue(me.fmb(rec.data.harga_jual));
						form.down('[name=harga_netto]').setValue(me.fmb(rec.data.harga_netto));
						form.down('[name=totalpayment_detail]').setValue(me.fmb(rec.data.totalpayment_detail));
						form.down('[name=uangmuka_value]').setValue(me.fmb(rec.data.uangmuka_value));
						form.down('[name=sisacicilan_value]').setValue(me.fmb(rec.data.sisacicilan_value));

						form.down('[name=tunggakan_lbl]').setVisible(false);
						form.down('[name=catatan_lbl]').setVisible(false);
						if (rec.data.tunggakan_ipl > 0) {
							form.down('[name=tunggakan_lbl]').setVisible(true);
							form.down('[name=catatan_lbl]').setVisible(true);
							form.down('[name=tunggakan_lbl]').setText('Ada tunggakan IPL sebesar Rp ' + me.fmb(rec.data.tunggakan_ipl));
							form.down('[name=catatan_lbl]').setText('Catatan : ' + rec.data.tunggakan_ipl_note);
						}

						if (rec.data.is_use == 1 || rec.data.is_rencana_kpr == 1) {
							me.detailTool2 = new Erems.library.DetailtoolAll();
							me.detailTool2.setConfig({
								viewPanel: 'BankAkadFormDataDetail',
								parentFDWindowId: me.getFormdata().up('window').id,
								controllerName: me.controllerName
							});
							me.detailTool2.parentGridAlias = 'buktipemilikbankgridakad';
							bankkprakadStore.load({params: {purchaseletter_bankkpr_id: rec.data.purchaseletter_bankkpr_id}});

							me.getBankgridakad().down('#btnNew').setDisabled(false);

						}
						// load SPPJB data
						var sppjbStore = me.getSppjbStore();
						sppjbStore.removeAll();
						sppjbStore.load({
							params: {purchaseletter_id: rec.data.purchaseletter_id},
							callback: function (sppjbrec) {
								if (sppjbrec && sppjbrec[0]) {
									// console.log('UPDATE SPPJB DATA...');
									// console.log(sppjbrec[0]);
									me.fillSppjbDataToForm(sppjbrec[0]);
									me.countLoadProcess += 1;
									//me.checkAllDetailLoadingProcess();
								}
							}
						});

						// load Akta PPJB data
						var aktappjbStore = me.getAktappjbStore();
						aktappjbStore.removeAll();
						aktappjbStore.load({
							params: {purchaseletter_id: rec.data.purchaseletter_id},
							callback: function (aktappjbrec) {
								if (aktappjbrec[0]) {
									// console.log('UPDATE Akta PPJB DATA...');
									// console.log(aktappjbrec[0]);
									me.fillAktappjbDataToForm(aktappjbrec[0]);
									me.countLoadProcess += 1;
								}
							}
						});
					}
				}
			});
		}

		// load Master PBB Induk data
		if (pbbIndukId != 0) {
			form.down('[name=pbbinduk_id]').setValue(pbbIndukId);
			var masterpbbindukStore = me.getMasterpbbindukStore();
			masterpbbindukStore.removeAll();
			masterpbbindukStore.load({
				params: {mode_read: 'detail', pbbinduk_id: pbbIndukId},
				callback: function (pbbindukrec) {
					if (pbbindukrec[0]) {
						// console.log('UPDATE PBB INDUK DATA...');
						// console.log(pbbindukrec[0]);
						me.getFormdata().down('[name=pbbinduk_code]').setValue(pbbindukrec[0].data['code']);
						me.getFormdata().down('[name=pbbinduk_kecamatan_id]').setValue(pbbindukrec[0].data['kecamatan_id']);
						me.countLoadProcess += 1;
					}
				}
			});
		}

		//display detail HGB / AJB Grid on form data
		var hjbagbStore = me.getHgbajbStore();
		hjbagbStore.removeAll();
		hjbagbStore.load({params: {is_hgbajb: 'yes', buktipemilik_id: buktiPemilikId, temp_buktipemilik_id: temp_buktipemilik_id}});

		//display detail history subrogasi
		var buktipemilikhistoryStore = me.getBuktipemilikhistoryStore();
		buktipemilikhistoryStore.removeAll();
		buktipemilikhistoryStore.load({params: {unit_id: record.data.unit_id}});

		// added by rico 10082023
		//display detail NJOP
		var buktipemiliknjopStore = me.getBuktipemiliknjopStore();
		buktipemiliknjopStore.removeAll();
        buktipemiliknjopStore.proxy.extraParams = { unit_id: record.data.unit_id };
		buktipemiliknjopStore.sort('tahun','DESC');
		buktipemiliknjopStore.load();

		//load customer document
		var customerdocumentStore = me.getMastercustomerdocumentStore();
		customerdocumentStore.removeAll();
		if (record.data.customer_id > 0) {
			customerdocumentStore.load({params: {customer_id: record.data.customer_id}});
		}

		if (me.getData.get_subholding == 2) {
			me.getHgbajbgrid().down('#btnDelete').setVisible(false);
		}

		var visible_btn = true;
		if (state == 'view') {
			me.disableFieldForm();
			visible_btn = false;
		}

		var arr_btn = [form.down('#fd_browse_pbbinduk_btn'), form.down('#btnSave'), me.getHgbajbgrid().down('#btnNews'), me.getHgbajbgrid().down('#btnEdit'), me.getHgbajbgrid().down('#btnDelete')];
		for (var i = 0; i < arr_btn.length; i++) {
			arr_btn[i].setVisible(visible_btn);
		}

		if(me.getData.imb_pecahan_readonly){
			form.down('[name=imb_pecahan_no]').setReadOnly(true);
			form.down('[name=imb_pecahan_date]').setReadOnly(true);
		}
	},

	hgbajbgridItemDblClick: function () {
		var me = this;
		me.formDataHgbajbShow('view');
	},

	hgbajbgridSelectionChange: function () {
		var me = this;
		var grid = me.getHgbajbgrid(), row = grid.getSelectionModel().getSelection();
		grid.down('#btnEdit').setDisabled(row.length != 1);
		grid.down('#btnDelete').setDisabled(row.length < 1);
		grid.down('#btnView').setDisabled(row.length != 1);
	},

	// start added by rico 10082023
	njopgridItemDblClick: function () {
		var me = this;
		me.formDataNJOPShow('view');
		// me.formDataHgbajbShow('view');
	},
	njopgridSelectionChange: function () {
		var me = this;
		var grid = Ext.getCmp('buktipemiliknjopgrid'), row = grid.getSelectionModel().getSelection();

		grid.down('#btnEdit').setDisabled(row.length != 1);
		grid.down('#btnDelete').setDisabled(row.length < 1);
		grid.down('#btnView').setDisabled(row.length != 1);
	},
	// ended added by rico 10082023

	dataSave: function () {
		var me = this;
		var form = me.getFormdata().getForm();

		var addingRecord = false;
		if (!me.finalValidation()) {
			return false;
		}
		if (form.isValid()) {

			resetTimer();
			//var store = me.getGrid().getStore();
			var store = null;
			if (me.instantCreateMode) {

				store = _myAppGlobal.getController(me.callerId).getInstanCreateStorex(me.controllerName);
			} else {
				store = me.getGrid().getStore();
			}
			var fida = me.getFinalData(form.getValues());

			//detail akad store
			var bankkprakadStore = me.getBankkprakadStore();
			bankkprakadStore.clearFilter(true);
			var data_akad = [];
			for (var i = 0; i < bankkprakadStore.getCount(); i++) {
				bankkprakadStore.each(function (record, idx) {
					if (i == idx) {
						data_akad[i] = record.data;
					}
				});
			}

			fida['details_akad'] = data_akad;
			var msg = function () {
				me.getFormdata().up('window').body.mask('Saving data, please wait ...');
			};
			switch (me.getFormdata().up('window').state.toLowerCase()) {
				case 'create':

					store.add(fida);
					addingRecord = true;
					break;
				case 'update':
					var idProperty = 'buktipemilik_id';//store.getProxy().getReader().getIdProperty();
					var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
					if (rec) {
						rec.beginEdit();
						rec.set(fida);
						rec.endEdit();
					} else {
						store.add(fida);
						addingRecord = true;
					}
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
		}else{
			var msg = "";
			var invalidFields = me.getInvalidFields(form);

			for(var i = 0;i<invalidFields.length;i++){
				var errorMsg = invalidFields[i].fieldLabel + " : " + invalidFields[i].activeError + "<br/>";
				msg += errorMsg;
			}

			Ext.Msg.show({
				title: 'Failure',
				msg: msg,
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK
			});

		}
	},
	getInvalidFields: function(form) {
	    var invalidFields = [];
	    Ext.suspendLayouts();
	    form.getFields().filterBy(function(field) {
	        if (field.validate()) return;
	        invalidFields.push(field);
	    });
	    Ext.resumeLayouts(true);

	    return invalidFields;
	},

	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		grid.down('#btnEdit').setDisabled(row.length != 1);
		grid.down('#btnDelete').setDisabled(row.length < 1);
		grid.down('#btnView').setDisabled(row.length != 1);

		//add on 3 nov 2016
		grid.down('#btnViewPphPayment').setDisabled(row.length != 1);
		//end add 3 nov 2016

		if(row.length == 1){ // added by rico 06042023
			grid.down('#btnPrintCoverNotes').setDisabled(row[0].data.pricetype_id != 2); 

			// added by rico 14082023
			grid.down('#btnPrintOrderAkta').setDisabled(!row[0].data.purchaseletter_id > 0); 
			grid.down('#btnPrintSuratBiaya').setDisabled(!row[0].data.purchaseletter_id > 0); 
			grid.down('#btnPrintOrderAJB').setDisabled(!row[0].data.purchaseletter_id > 0); 
		}else{
			grid.down('#btnPrintCoverNotes').setDisabled(true); 

			// added by rico 14082023
			grid.down('#btnPrintOrderAkta').setDisabled(true); 
			grid.down('#btnPrintSuratBiaya').setDisabled(true); 
			grid.down('#btnPrintOrderAJB').setDisabled(true); 
		}
	},

	formDataShow: function (el, act, action) {
		var me = this;
		var formtitle, formicon;

		var state;
		if (action == me.bindPrefixName + 'Create') {
			state = 'create';
		} else if (action == me.bindPrefixName + 'Update') {
			state = 'update';
		} else {
			state = 'view';
		}

		switch (state) {
			case 'create':
				formtitle = 'Add New';
				formicon = 'icon-form-add';
				break;
			case 'update':
				formtitle = 'Edit';
				formicon = 'icon-form-edit';
				break;
			case 'view':
				formtitle = 'View';
				formicon = 'icon-form-edit';
				break;
		}

		var winId = 'win-holidayformdata';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id              : winId,
				title           : formtitle,
				iconCls         : formicon,
				resizable       : false,
				minimizable     : false,
				maximizable     : false,
				width           : me.formWidth,
				renderTo        : Ext.getBody(),
				constrain       : true,
				constrainHeader : false,
				modal           : true,
				layout          : 'fit',
				shadow          : 'frame',
				shadowOffset    : 10,
				border          : false,
				state           : state,
				listeners       : {
					boxready: function () {
						win.body.mask('Loading...');
						var tm = setTimeout(function () {
							win.add(Ext.create('Erems.view.' + me.controllerName + '.FormData'));
							win.center();
							win.body.unmask();
							clearTimeout(tm);
						}, 1000);
					}
				}

			});
		}
		win.show();
	},
	gridItemDblClick: function (el) {
		var me = this;
		me.formDataShow('view');
	},

	//============= GRID HGB AJB =====================

	formDataHgbajbShow: function (state) {
		var me = this;
		//var state = 'create';//action == me.bindPrefixName + 'Create' ? 'create' : 'update';
		switch (state) {
			case 'create':
				formtitle = 'Create HGB / AJB';
				formicon = 'icon-form-add';
				break;
			case 'update':
				formtitle = 'Edit HGB / AJB';
				formicon = 'icon-form-edit';
				break;
			case 'view':
				formtitle = 'View HGB / AJB';
				formicon = 'icon-form-edit';
				break;
		}
		var winId = 'win-hgbajbformdata';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id              : winId,
				title           : formtitle,
				iconCls         : formicon,
				resizable       : false,
				minimizable     : false,
				maximizable     : false,
				width           : me.formWidth,
				renderTo        : Ext.getBody(),
				constrain       : true,
				constrainHeader : false,
				modal           : true,
				layout          : 'fit',
				shadow          : 'frame',
				shadowOffset    : 10,
				border          : false,
				state           : state,
				listeners       : {
					boxready: function () {
						win.body.mask('Loading...');
						var tm = setTimeout(function () {
							win.add(Ext.create('Erems.view.' + me.controllerName + '.HgbajbFormData'));
							win.center();

							var formhgbajb = me.getHgbajbformdata();

							me.setCombobox(formhgbajb.down('[name=notaris_id]'), me.getData.combobox_notaris);
							me.setCombobox(formhgbajb.down('[name=notaris_id_sh1]'), me.getData.combobox_notaris);
							me.setCombobox(formhgbajb.down('[name=pt_id]'), me.getData.combobox_projectpt);


							win.body.unmask();
							clearTimeout(tm);
						}, 1000);
					},
				}
			});
		}
		win.show();
	},
	// added by rico 10082023
	formDataNjopShow: function (state) {
		var me = this;
		//var state = 'create';//action == me.bindPrefixName + 'Create' ? 'create' : 'update';
		switch (state) {
			case 'create':
				formtitle = 'Create NJOP';
				formicon = 'icon-form-add';
				break;
			case 'update':
				formtitle = 'Edit NJOP';
				formicon = 'icon-form-edit';
				break;
			case 'view':
				formtitle = 'View NJOP';
				formicon = 'icon-form-edit';
				break;
		}
		var winId = 'win-njopformdata';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id              : winId,
				title           : formtitle,
				iconCls         : formicon,
				resizable       : false,
				minimizable     : false,
				maximizable     : false,
				width           : 300,
				renderTo        : Ext.getBody(),
				constrain       : true,
				constrainHeader : false,
				modal           : true,
				layout          : 'fit',
				shadow          : 'frame',
				shadowOffset    : 10,
				border          : false,
				state           : state,
				listeners       : {
					boxready: function () {
						win.body.mask('Loading...');
						var tm = setTimeout(function () {
							win.add(Ext.create('Erems.view.' + me.controllerName + '.NjopFormData'));

							var formdata = me.getFormdata();
							var unit_id = formdata.down('[name=unit_id]').getValue();

							Ext.getCmp('buktipemiliknjopformdata').down('[name=unit_id]').setValue(unit_id);
							
							win.center();
							win.body.unmask();
							clearTimeout(tm);
						}, 1000);
					},
				}
			});
		}
		win.show();
	},
	njopformDataAfterRender: function (el) {
		var me = this;
		var state = el.up('window').state;

		var formdata = me.getFormdata();
		buktiPemilikId = formdata.down('[name=buktipemilik_id]').getValue();
		temp_buktipemilik_id = formdata.down('[name=temp_buktipemilik_id]').getValue();
		unit_id = formdata.down('[name=unit_id]').getValue();

		var formnjop = Ext.getCmp('buktipemiliknjopformdata');
		formnjop.down('[name=unit_id]').setValue(unit_id);
		formnjop.down('[name=buktipemilik_id]').setValue(buktiPemilikId);

		if (state == 'create') {
			// el.down('#active').setValue(1);
		} else if (state == 'update' || state == 'view') {
			var grid = Ext.getCmp('buktipemiliknjopgrid');
			var store = grid.getStore();

			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);

			formnjop.down('[name=tahun]').setReadOnly(true);	

			if (state == 'view') {
				formnjop.down('[name=njop]').setReadOnly(true);	
				formnjop.down('#btnSave').setDisabled(true);
			}
		}
	},
	hjbagbformDataAfterRender: function (el) {
		var me = this;
		var state = el.up('window').state;

		var formdata = me.getFormdata();
		buktiPemilikId = formdata.down('[name=buktipemilik_id]').getValue();
		temp_buktipemilik_id = formdata.down('[name=temp_buktipemilik_id]').getValue();
		unit_id = formdata.down('[name=unit_id]').getValue();

		var formhgbajb = me.getHgbajbformdata();
		formhgbajb.down('[name=hgbajb_buktipemilik_id]').setValue(buktiPemilikId);
		formhgbajb.down('[name=temp_buktipemilik_id]').setValue(temp_buktipemilik_id);
		formhgbajb.down('[name=hgbajb_unit_id]').setValue(unit_id);

		//city combobox
		var ftStore = null;
		ftStore = el.down('#fd_hgbajb_girik_id').getStore();
		ftStore.removeAll();
		ftStore.load({params: {datasearch: '{"code":"","girik_no":"","pemilik":""}', start: 0, limit: 0}});

		if (state == 'create') {
			// el.down('#active').setValue(1);
		} else if (state == 'update' || state == 'view') {
			var grid = me.getHgbajbgrid();
			var store = grid.getStore();

			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			if(record.data.notaris_id == 0){
				record.data.notaris_id = '';
			}
			if(record.data.notaris_id_sh1 == 0){
				record.data.notaris_id_sh1 = '';
			}
			console.log(record);
			el.loadRecord(record);

			if (record.data.hgbajb_id > 0 && buktiPemilikId > 0) {
				formhgbajb.down('#btnPrint').setDisabled(false);
			}

			var hgbindukID = record.data.hgbinduk_id;//console.log(hgbindukID);
			if (hgbindukID && hgbindukID != 0) {
				var masterhgbindukStore = me.getMasterhgbindukStore();
				masterhgbindukStore.removeAll();
				masterhgbindukStore.load({
					params: {mode_read: 'detail', hgbinduk_id: hgbindukID},
					callback: function (hgbindukrec) {
						if (hgbindukrec[0]) {
							formhgbajb.down('[name=hgbajb_unit_id]').setValue(unit_id);

							me.fillHgbindukDataToForm(hgbindukrec[0]);
							me.countLoadProcess += 1;
							//me.checkAllDetailLoadingProcess();
						}
					}
				});
			}

			if (state == 'view') {
				me.disableFieldHgbajbForm();
				formhgbajb.down('#fd_browse_unit_btn').setDisabled(true);
				formhgbajb.down('#btnSave').setDisabled(true);
			}

			console.log("FORM DATA AFTER RENDER");
			console.log(unit_id);
			console.log(formhgbajb.down('[name=hgbajb_unit_id]').getValue());
			console.log(formhgbajb.down('[name=hgbajb_unit_id]'));
		}

		if (me.getData.subholding_config == 1) {
			formhgbajb.down('#AdditionalInformationTabButton').setVisible(true);
		}
	},

	fillHgbindukDataToForm: function (data) {
		var me = this;
		var filledFields = ['code', 'hgbinduk', 'gs', 'desa', 'date', 'gs_date', 'luas'];

		for (var x in filledFields) {
			if (me.getHgbajbformdata().down('[name=hgbinduk_' + filledFields[x] + ']') != null) {
				me.getHgbajbformdata().down('[name=hgbinduk_' + filledFields[x] + ']').setValue(data.data[filledFields[x]]);
			}

		}
	},

	dataSaveNjop: function () {
		var me = this;
		var form = Ext.getCmp('buktipemiliknjopformdata').getForm();
		var addingRecord = false;
		
		// if (!me.finalValidationHgbajb()) {
		// 	return false;
		// }

		if (form.isValid()) {

			resetTimer();
			//var store = me.getGrid().getStore();
			var store = null;
			if (me.instantCreateMode) {
				store = _myAppGlobal.getController(me.callerId).getInstanCreateStorex(me.controllerName);
			} else {
				store = Ext.getCmp('buktipemiliknjopgrid').getStore();
			}
			var fida = me.getFinalData(form.getValues());

			var msg = function () {
				Ext.getCmp('buktipemiliknjopformdata').up('window').body.mask('Saving data, please wait ...');
			};

			switch (Ext.getCmp('buktipemiliknjopformdata').up('window').state.toLowerCase()) {
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
				success: function (s) {
                    var res = Ext.decode(s.operations[0].response.responseText);
					Ext.getCmp('buktipemiliknjopformdata').up('window').body.unmask();

					if(res.success[0].result == 0){
						Ext.Msg.show({
							title: 'Failure',
							msg: res.success[0].message,
							icon: Ext.Msg.ERROR,
							buttons: Ext.Msg.OK
						});
					}else{
						store.un('beforesync', msg);
						store.reload(
							{
								params: {
									unit_id: fida.unit_id
								}
							}
						);

						Ext.Msg.show({
							title: 'Success',
							msg: 'Data saved successfully.',
							icon: Ext.Msg.INFO,
							buttons: Ext.Msg.OK,
							fn: function () {
								Ext.getCmp('buktipemiliknjopformdata').up('window').close();
							}
						});
					}
				},
				failure: function () {
					Ext.getCmp('buktipemiliknjopformdata').up('window').body.unmask();
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
		}
	},
	dataSaveHgbajb: function () {
		var me = this;
		var form = me.getHgbajbformdata().getForm();
		var addingRecord = false;
		if (!me.finalValidationHgbajb()) {
			return false;
		}
		if (form.isValid()) {

			resetTimer();
			//var store = me.getGrid().getStore();
			var store = null;
			if (me.instantCreateMode) {
				store = _myAppGlobal.getController(me.callerId).getInstanCreateStorex(me.controllerName);
			} else {
				store = me.getHgbajbgrid().getStore();
			}
			var fida = me.getFinalData(form.getValues());

			var msg = function () {
				me.getHgbajbformdata().up('window').body.mask('Saving data, please wait ...');
			};

			switch (me.getHgbajbformdata().up('window').state.toLowerCase()) {
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
					me.getHgbajbformdata().up('window').body.unmask();
					store.un('beforesync', msg);
					store.reload({params: {is_hgbajb: 'yes', buktipemilik_id: fida.hgbajb_buktipemilik_id, temp_buktipemilik_id: fida.temp_buktipemilik_id}});

					Ext.Msg.show({
						title: 'Success',
						msg: 'Data saved successfully.',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							me.getHgbajbformdata().up('window').close();
						}
					});
				},
				failure: function () {
					me.getHgbajbformdata().up('window').body.unmask();
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
		}
	},

	finalValidationHgbajb: function () {
		var me = this;

		if (me.validationItemsHgbajb.length == 0)
			return true;
		var erMsg = '[ER00] Unable to save data';

		erMsg = me.checkingValidationItemHgbajb();
		if (erMsg == 'OK')
			return true;
		Ext.Msg.show({
			title: 'Failure',
			msg: 'Error: ' + erMsg + '.',
			icon: Ext.Msg.ERROR,
			buttons: Ext.Msg.OK
		});
		return false;
	},
	checkingValidationItemHgbajb: function () {
		var me = this;
		var msg = 'OK';
		/* FORMAT ERROR = [ER_type_Error][field_no] message */
		/* [ER01] name undefined **/
		/* [ER02] message undefined **/
		/* [ER03] field form data not found **/

		var vi = me.validationItemsHgbajb;
		var elField = null;
		for (var i = 0; i < vi.length; i++) {
			if (vi[i].name == undefined) {
				return '[VI01][' + i + '] Unable to save data';
			}
			if (vi[i].msg == undefined) {
				return '[VI02][' + i + '] Unable to save data';
			}
			elField = me.getHgbajbformdata().down('[name=' + vi[i].name + ']');
			if (elField == undefined) {
				return '[VI03][' + i + '] Unable to save data';
			}

			if (elField.getValue() == null) {
				return vi[i].msg;
				// return '[VI04][' + i + '] Unable to save data';
			} else if (elField.getValue().length == 0) {
				return vi[i].msg;
			}
			if (vi[i].f != undefined) {
				if (vi[i].f == 'number') {
					if (toFloat(elField.getValue()) < 1) {
						return vi[i].msg;
					}
				}
			}
		}
		return msg;
	},

	dataDestroyNjop: function () {
		var me = this;
		var grid = Ext.getCmp('buktipemiliknjopgrid');
		var rows = grid.getSelectionModel().getSelection();

		if (rows.length < 1) {
			Ext.Msg.alert('Info', 'No record selected !');
			return;
		} else {
			var confirmmsg, successmsg, failmsg;
			var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
			var store = grid.getStore();

			if (rows.length == 1) {
				var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('njop') + ']';
				confirmmsg = 'Delete ' + selectedRecord + ' ?';
				failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
			} else {
				confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
				failmsg = 'Error: Unable to delete data.';
			}
			Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
				if (btn == 'yes') {
					resetTimer();
					var msg = function () {
						grid.up('window').mask('Deleting data, please wait ...');
					};
					for (var i = 0; i < rows.length; i++) {
						store.remove(rows[i]);
					}

					store.on('beforesync', msg);
					store.sync({
						success: function (s) {
							grid.up('window').unmask();
							var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
							var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
							store.un('beforesync', msg);
							store.reload();

							Ext.Msg.show({
								title: 'Success',
								msg: successmsg,
								icon: Ext.Msg.INFO,
								buttons: Ext.Msg.OK
							});
						},
						failure: function () {
							grid.up('window').unmask();
							store.un('beforesync', msg);
							store.reload();
							Ext.Msg.show({
								title: 'Failure',
								msg: failmsg + ' The data may have been used.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					});
				}
			});
		}
	},
	dataDestroyHgbajb: function () {
		var me = this;
		var rows = me.getHgbajbgrid().getSelectionModel().getSelection();
		if (rows.length < 1) {
			Ext.Msg.alert('Info', 'No record selected !');
			return;
		} else {
			var confirmmsg, successmsg, failmsg;
			var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
			var store = me.getHgbajbgrid().getStore();

			if (rows.length == 1) {
				var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('ajb_number') + ']';
				confirmmsg = 'Delete ' + selectedRecord + ' ?';
				failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
			} else {
				confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
				failmsg = 'Error: Unable to delete data.';
			}
			Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
				if (btn == 'yes') {
					resetTimer();
					var msg = function () {
						me.getHgbajbgrid().up('window').mask('Deleting data, please wait ...');
					};
					for (var i = 0; i < rows.length; i++) {

						store.remove(rows[i]);
					}

					store.on('beforesync', msg);
					store.sync({
						success: function (s) {
							me.getHgbajbgrid().up('window').unmask();
							var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
							var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
							store.un('beforesync', msg);
							store.reload();

							Ext.Msg.show({
								title: 'Success',
								msg: successmsg,
								icon: Ext.Msg.INFO,
								buttons: Ext.Msg.OK
							});
						},
						failure: function () {
							me.getHgbajbgrid().up('window').unmask();
							store.un('beforesync', msg);
							store.reload();
							Ext.Msg.show({
								title: 'Failure',
								msg: failmsg + ' The data may have been used.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					});
				}
			});
		}
	},

	randomString: function (string_length) {
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var randomstring = '';
		var charCount = 0;
		var numCount = 0;

		for (var i = 0; i < string_length; i++) {
			// If random bit is 0, there are less than 3 digits already saved, and there are not already 5 characters saved, generate a numeric value. 
			if ((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
				var rnum = Math.floor(Math.random() * 10);
				randomstring += rnum;
				numCount += 1;
			} else {
				// If any of the above criteria fail, go ahead and generate an alpha character from the chars string
				var rnum = Math.floor(Math.random() * chars.length);
				randomstring += chars.substring(rnum, rnum + 1);
				charCount += 1;
			}
		}
		return randomstring;
	},

	disableFieldForm: function () {
		var me = this;

		var dF = ['imb_no', 'imb_date', 'imb_legal_date', 'imb_buy_date', 'nop',
			'reg_date', 'imb_target_date', 'ijin_tobpt_date', 'bpt_toijin_date',
			'imb_pecahan_no', 'reg_pecahan_date', 'ijin_tobpt_pecahan_date', 'bpt_toijin_pecahan_date', 'imb_legal_pecahan_date',
			'pbb_ijin_topemda_date', 'pbb_pemda_toijin_date', 'ssp_terima_date', 'aftersales_st_date',
			'pengurusan_ijin_topemda_date', 'pengurusan_pemda_toijin_date', 'pengukuran_ijin_tobpn_date', 'pengukuran_bpn_toijin_date',
			'note_bp', 'akad_note_bp', 'sk_terbit_date', 'status_sby', 'group_terbit_untuk_sby', 'keterangan_sby', 'girik', 'akta_notaril_no', 'notaris', 'tanggal_akta', 'tanggal_tanda_tangan'];
		var f = me.getFormdata();
		for (var i = 0; i < dF.length; i++) {
			f.down('[name=' + dF[i] + ']').setReadOnly(true);
		}
	},

	disableFieldHgbajbForm: function () {
		var me = this;

		var dF = ['hgb_number', 'hgb_date', 'hgb_gsgu_no', 'hgb_gsgu_date', 'hgb_gsgu_luas', 'hgb_gsgu_land_date', 'hgb_tocontractor_date', 'hgb_tocustomer_date',
			'ajb_number', 'ajb_date', 'ajb_name', 'ajb_sign_date', 'notaris_id', 'ajb_notaris_date', 'ajb_skmht_date', 'ajb_apht_date', 'ajb_tocontractor_date', 'ajb_tocustomer_date',
			'pt_id', 'pt_hgb_no', 'pt_hgb_date', 'pt_gsgu_no', 'pt_gsgu_date', 'pt_luas', 'pt_hgb_nib', 'note',
			'ajb_legal_tonotaris_date', 'ajb_notaris_tolegal_date', 'ajb_legal_toperijinan_date',
			'hgb_perijinan_tolegal_date', 'hgb_legal_toperijinan_date', 'hgb_shm_perijinan_tolegal_date',
			'hgb_notaris_tobank_date', 'hgb_target_date', 'hgb_hm_no', 'hgb_hm_tocustomer_date', 'hgb_nop',
			'ajb_is_status_balik_nama', 'ajb_balik_nama_date', 'girik_id', 'lunas_notaris'];
		var f = me.getHgbajbformdata();
		for (var i = 0; i < dF.length; i++) {
			f.down('[name=' + dF[i] + ']').setReadOnly(true);
		}
	},

	//== download customer document images == // add on 3 juli 2018
	customerdocumentgridDownloadColumnClick: function (view, rowIndex, colIndex, item, e, record, row) {
		var me = this;
		var gr = me.getCustomerdocumentgrid();

		var url = window.location.protocol + "//" + window.location.host + '/webapps/Ciputra/public/app/erems/uploads/customerdocuments/' + view[5].data.filename;
		//var url = window.location.protocol+"//"+window.location.host+'/cesgit/webapps/public/app/erems/uploads/customerdocuments/'+view[5].data.filename;

		var imgWin = new Ext.Window({
			width: 600,
			height: 420,
			id: 'theImgWin',
			autoScroll: true,
			title: view[5].data.documenttype_documenttype,
			resizable: false,
			modal: true,
			items: [
				{
					layout: 'hbox',
					bodyStyle: 'border:0px',
					itemId: 'image_place',
					items: [{
							xtype: 'image',
							shrinkWrap: true,
							name: 'image_filename',
							width: '100%',
							height: 360,
							src: url
						}]
				},
				{
					xtype: 'label',
					html: '<a href="' + url + '" target="blank">Click Here For Download Document</a>',
					flex: 1,
					margin: '0 0 0 10px'
				},
			]
		});
		imgWin.show();
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
	cekBankkprakad: function () {
		var me = this;
		var bankkprakadStore = me.getBankkprakadStore(),
				countStore = bankkprakadStore.getCount();
		me.detailTool2 = new Erems.library.DetailtoolAll();
		me.detailTool2.setConfig({
			viewPanel: 'BankAkadFormDataDetail',
			parentFDWindowId: me.getFormdata().up('window').id,
			controllerName: me.controllerName
		});
		me.detailTool2.parentGridAlias = 'buktipemilikbankgridakad';

		if (me.getData.validasium_config == 1) {
			me.genco_um = 1;
		}

		if (countStore == 0) {
			me.detailTool2.form().show('create', 500, 'Add New Confirmation', '');
			var form = me.getBankakadformdatadetail();
			form.down('[name=akadconfirmation_index]').setValue(1);
		} else {
			var record = bankkprakadStore.getAt(countStore - 1);
			var statusBefore = record.data.akadconfirmation_status;
			var indexBefore = record.data.akadconfirmation_index;

			if (statusBefore != 'Pending') {
				Ext.Msg.show({
					title: 'Failed',
					msg: 'Tidak bisa membuat konfirmasi baru, karena status sebelumnya tidak Pending',
					icon: Ext.Msg.INFO,
					buttons: Ext.Msg.OK
				});
			} else {
				me.detailTool2.form().show('create', 500, 'Add New Confirmation', '');
				var form = me.getBankakadformdatadetail();
				form.down('[name=akadconfirmation_index]').setValue(indexBefore + 1);
			}
		}
	},
	formDataBankAkadBeforeRender: function (el) {
		var me = this;
		var store = me.getMasterakadconfirmationstatusStore();
		el.down('[name=akadconfirmation_status_id]').bindStore(store);
	},
	detailBankAkadForm: {
		that: this,
		editingIndexRow: 0,
		save: function () {
			var me = this;
			//            alert('wowowowow');
			var form = me.getBankakadformdatadetail().getForm();
			var formVal = me.getBankakadformdatadetail().getForm().getValues();

			var purchaseletterId = me.getFormdata().down('[name=purchaseletter_id]').getValue();
			var plBankKprId = me.getFormdata().down('[name=purchaseletter_bankkpr_id]').getValue();
			//            var temp_id_detail = me.getBankformdatadetail().down('[name=temp_id_detail]').getValue();

			var msg = '';
			var win = me.getBankakadformdatadetail().up('window');

			if (form.isValid()) {
				var dStore = null;
				var win = me.getBankakadformdatadetail().up('window');

				dStore = me.getBankgridakad().getStore();

				var val = {
					purchaseletter_id: purchaseletterId,
					purchaseletter_bankkpr_id: plBankKprId,
					akadconfirmation_index: formVal.akadconfirmation_index,
					akadconfirmation_date: formVal.akadconfirmation_date,
					akadconfirmation_status_id: formVal.akadconfirmation_status_id,
					akadconfirmation_status: me.getBankakadformdatadetail().down('#fd_akadconfirmation_status_id').getRawValue(),
					akadconfirmation_note: formVal.akadconfirmation_note,
				};

				if (me.genco_um == 1) {
					var um = Number(me.getData.cek_um.data[0].um);

					if (um > 0) {
						Ext.Msg.show({
							title: 'Failure',
							msg: 'Error: Uang muka belum lunas.',
							icon: Ext.Msg.WARNING,
							buttons: Ext.Msg.OK
						});
					} else {
						if (win.state == 'create') {
							dStore.add(val);

							if (formVal.akadconfirmation_status_id == 1) { // OK
								var akadDate = formVal.akadconfirmation_date;
								me.getFormdata().down('[name=akad_realisasiondate]').setValue(new Date(akadDate));
							}

						} else {

							var rec = dStore.getAt(me.detailBankAkadForm.editingIndexRow);
							rec.beginEdit();
							rec.set(val);
							rec.endEdit();

							if (formVal.akadconfirmation_status_id == 1) { // OK
								var akadDate = formVal.akadconfirmation_date;
								me.getFormdata().down('[name=akad_realisasiondate]').setValue(new Date(akadDate));
							}
						}
					}
				} else {
					if (win.state == 'create') {
						dStore.add(val);
						if (formVal.akadconfirmation_status_id == 1) { // OK
							var akadDate = formVal.akadconfirmation_date;
							me.getFormdata().down('[name=akad_realisasiondate]').setValue(new Date(akadDate));
						}
					} else {
						var rec = dStore.getAt(me.detailBankAkadForm.editingIndexRow);
						rec.beginEdit();
						rec.set(val);
						rec.endEdit();

						if (formVal.akadconfirmation_status_id == 1) { // OK
							var akadDate = formVal.akadconfirmation_date;
							me.getFormdata().down('[name=akad_realisasiondate]').setValue(new Date(akadDate));
						}
					}
				}


				win.close();
			}
		}
	},
	bankgridakadactionEditColumnClick: function (view, rowIndex, colIndex, item, e, record, row) {
		var me = this;
		var gr = me.getBankgridakad();

		me.detailTool2.form().show('update', 500, 'Edit Confirmation', '');
		me.detailBankAkadForm.editingIndexRow = view[1];
		me.getBankakadformdatadetail().getForm().setValues({
			akadconfirmation_id: view[5].data.akadconfirmation_id,
			purchaseletter_id: view[5].data.purchaseletter_id,
			purchaseletter_bankkpr_id: view[5].data.purchaseletter_bankkpr_id,
			akadconfirmation_index: view[5].data.akadconfirmation_index,
			akadconfirmation_date: view[5].data.akadconfirmation_date,
			akadconfirmation_status_id: view[5].data.akadconfirmation_status_id,
			akadconfirmation_note: view[5].data.akadconfirmation_note,
			temp_id_akad: view[5].data.temp_id_akad
		});
	},
	bankgridakadactionDeleteColumnClick: function (view, rowIndex, colIndex, item, e, record, row) {
		var me = this;
		var gr = me.getBankgridakad();

		Ext.Msg.confirm('Delete Data', 'Delete record?', function (btn) {
			if (btn == 'yes') {
				view[5].set("deleted", true);
				gr.getStore().filterBy(function (recod) {
					return recod.data.deleted == false;
				});

				if (view[5].data.akadconfirmation_status_id == 1) { // OK
					me.getFormdata().down('[name=akad_realisasiondate]').setValue();
				}
			}
		});
	},
	/////// add by erwin.st 30122021
	mainPanelBeforeRender: function () {
		var me = this;

		Ext.Ajax.request({
			url: 'erems/buktipemilik/read',
			params: {read_type_mode: 'assets'},
			success: function (response) {
				var result = JSON.parse(response.responseText);
				
				me.getData = {
					cek_um                   : result.cek_um,
					validasium_config        : result.validasium_config,
					subholding_config        : result.subholding_config,
					get_subholding           : result.get_subholding,
					combobox_block           : result.block,
					combobox_cluster         : result.cluster,
					combobox_notaris         : result.notaris,
					combobox_posisi          : result.posisi,
					combobox_productcategory : result.productcategory,
					combobox_projectpt       : result.projectpt,
					combobox_type            : result.type,
					imb_pecahan_readonly     : result.imb_pecahan_readonly
				}

				var FormSearch = me.getFormsearch();

				me.setCombobox(FormSearch.down('[name=cluster_id]'), me.getData.combobox_cluster);
				me.setCombobox(FormSearch.down('[name=pt_id]'), me.getData.combobox_projectpt);
				me.setCombobox(FormSearch.down('[name=block_id]'), me.getData.combobox_block);
				me.setCombobox(FormSearch.down('[name=position_id]'), me.getData.combobox_posisi);
				me.setCombobox(FormSearch.down('[name=productcategory_id]'), me.getData.combobox_productcategory);
				me.setCombobox(FormSearch.down('[name=type_id]'), me.getData.combobox_type);
			}
		});
	},
	/////// add by erwin.st 30122021
	setCombobox: function (field, data) {
		var me = this;

		var store = Ext.create('Ext.data.Store', {
			fields : [field.valueField, field.displayField],
			data   : data ? data : new Array()
		});
		field.bindStore(store);

		if(Boolean(field.getValue())){
			field.setValue(field.getValue());
		}
	},
	printCoverNotes: function(){
		var me = this;

		var grid = me.getGrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

		var purchaseletter_bankkpr_id = record.data.purchaseletter_bankkpr_id;
		var purchaseletter_id = record.data.purchaseletter_id;
		// var is_alreadyakad = record.data.is_alreadyakad;
		// var count_kpr = record.data.count_kpr;

		var is_valid = record.data.is_valid; // added by rico 09052023

		if(is_valid == 0){ // added by rico 09052023
			Ext.Msg.show({
				title: 'Alert',
				msg: 'Customer Belum Memilih Bank, tidak bisa Print Cover Notes',
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK
			});
			return false;
		}

		// if(count_kpr == 0){
		// 	Ext.Msg.show({
		// 		title: 'Alert',
		// 		msg: 'Unit Belum Generate Schema Escrow, tidak bisa Print Cover Notes',
		// 		icon: Ext.Msg.WARNING,
		// 		buttons: Ext.Msg.OK
		// 	});
		// 	return false;
		// }

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'PRINTOUT_COVER_NOTES'}});

		var combo = Ext.create('Ext.form.field.ComboBox', {
			id: 'cbPrintoutID',
			editable: false,
			queryMode: 'local',
			valueField: 'value',
			displayField: 'value',
			width: '100%'
		});

		Ext.create('Ext.window.Window', {
			id: 'myCbDocWindow',
			title: 'Select Printout Type',
			height: 100,
			width: 400,
			layout: 'hbox',
			padding: '10px 10px 10px 10px',
			modal: true,
			items: {// Let's put an empty grid in just to illustrate fit layout
				xtype: combo,
				name: 'printout_combobox'
			},
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					ui: 'footer',
					layout: {
						//padding: 6,
						type: 'hbox'
					},
					items: [
						{
							xtype: 'button',
							action: 'processprintout',
							padding: 5,
							width: 75,
							iconCls: 'icon-save',
							text: 'Process',
							handler: function () {
								var me2 = this;

								var printout_cb = this.up('window').items.items[0].value;
								if (!printout_cb) {
									Ext.Msg.show({
										title: 'Alert',
										msg: 'Please Select Printout Type First',
										icon: Ext.Msg.WARNING,
										buttons: Ext.Msg.OK
									});
									return false;
								}

								// console.log(printout_cb);
								if (printout_cb == 'Stimulsoft') {

									var winId = me.detailTool.parentFDWindowId;
									var win = desktop.getWindow(winId);
									var formParent = win.down('form');

									var winId = 'myReportWindow';
									me.instantWindowReport('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
									var win = desktop.getWindow(winId);

									if (win) {
										var params = {};
										var reportFile = "FeeKPR";

										params["purchaseletter_id"] = purchaseletter_id;
										params["purchaseletter_bankkpr_id"] = purchaseletter_bankkpr_id;

										var html = me.generateFakeForm2(params, reportFile);
										win.down("#MyReportPanel").body.setHTML(html);
										$("#fakeReportFormID").submit();
									}

								} else {

									me2.up('window').body.mask('Creating Document, Please Wait...');

									Ext.Ajax.request({
										url: 'erems/admincollection/read',
										params: {
											document_name: printout_cb,
											read_type_mode: 'printout_covernotes',
											purchaseletter_id: purchaseletter_id,
											purchaseletter_bankkpr_id: purchaseletter_bankkpr_id,
											// is_print_cover_notes: is_print_fee_kpr
										},
										success: function (response) {
											try {
												var resp = response.responseText;

												if (resp) {
													var info = Ext.JSON.decode(resp);

													if (info.success == true) {
														me2.up('window').body.unmask();
														Ext.Msg.show({
															title: 'Info',
															msg: '<a href="' + info.url + '" target="blank">Click Here For Download Document</a>',
															icon: Ext.Msg.INFO,
															//buttons: [], //jika ingin tidak ada buttons
															buttons: Ext.Msg.CANCEL,
															buttonText: {
																cancel: 'Close',
															}
														});
													} else {
														me2.up('window').body.unmask();
														// Ext.Msg.show({
														// 	title: 'Failure',
														// 	msg: 'Error: Create Document Failed.',
														// 	icon: Ext.Msg.ERROR,
														// 	buttons: Ext.Msg.OK
														// });
														Ext.Msg.show({
															title: 'Failure',
															msg: 'Error: Silahkan Use Bank Terlebih Dahulu',
															icon: Ext.Msg.ERROR,
															buttons: Ext.Msg.OK
														});
													}
												}
											} catch (e) {
												//console.error(e);
												me2.up('window').body.unmask();
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
											me2.up('window').body.unmask();
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
							xtype: 'button',
							action: 'cancel',
							itemId: 'btnCancel',
							padding: 5,
							width: 75,
							iconCls: 'icon-cancel',
							text: 'Cancel',
							handler: function () {
								this.up('window').close();
							}
						}
					]
				}
			]
		}).show();

		combo.bindStore(globalparameterStore);
	},
	printOrderAkta: function(){
		var me = this;

		var grid = me.getGrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

		var purchaseletter_id = record.data.purchaseletter_id;

		if(purchaseletter_id == 0){ // added by rico 09052023
			Ext.Msg.show({
				title: 'Alert',
				msg: 'Purchaseletter belum ada.',
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK
			});
			return false;
		}

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'PRINTOUT_ORDER_AKTA'}});

		var combo = Ext.create('Ext.form.field.ComboBox', {
			id: 'cbPrintoutID',
			editable: false,
			queryMode: 'local',
			valueField: 'value',
			displayField: 'value',
			width: '100%'
		});

		Ext.create('Ext.window.Window', {
			id: 'myCbDocWindow',
			title: 'Select Printout Type',
			height: 100,
			width: 400,
			layout: 'hbox',
			padding: '10px 10px 10px 10px',
			modal: true,
			items: {// Let's put an empty grid in just to illustrate fit layout
				xtype: combo,
				name: 'printout_combobox'
			},
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					ui: 'footer',
					layout: {
						//padding: 6,
						type: 'hbox'
					},
					items: [
						{
							xtype: 'button',
							action: 'processprintout',
							padding: 5,
							width: 75,
							iconCls: 'icon-save',
							text: 'Process',
							handler: function () {
								var me2 = this;

								var printout_cb = this.up('window').items.items[0].value;
								if (!printout_cb) {
									Ext.Msg.show({
										title: 'Alert',
										msg: 'Please Select Printout Type First',
										icon: Ext.Msg.WARNING,
										buttons: Ext.Msg.OK
									});
									return false;
								}

								// console.log(printout_cb);
								if (printout_cb == 'Stimulsoft') {

									var winId = me.detailTool.parentFDWindowId;
									var win = desktop.getWindow(winId);
									var formParent = win.down('form');

									var winId = 'myReportWindow';
									me.instantWindowReport('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
									var win = desktop.getWindow(winId);

									if (win) {
										var params = {};
										var reportFile = "OrderAkta";

										params["purchaseletter_id"] = purchaseletter_id;

										var html = me.generateFakeForm2(params, reportFile);
										win.down("#MyReportPanel").body.setHTML(html);
										$("#fakeReportFormID").submit();
									}

								} else {

									me2.up('window').body.mask('Creating Document, Please Wait...');

									Ext.Ajax.request({
										url: 'erems/admincollection/read',
										params: {
											document_name: printout_cb,
											read_type_mode: 'printout_orderakta',
											purchaseletter_id: purchaseletter_id
										},
										success: function (response) {
											try {
												var resp = response.responseText;

												if (resp) {
													var info = Ext.JSON.decode(resp);

													if (info.success == true) {
														me2.up('window').body.unmask();
														Ext.Msg.show({
															title: 'Info',
															msg: '<a href="' + info.url + '" target="blank">Click Here For Download Document</a>',
															icon: Ext.Msg.INFO,
															//buttons: [], //jika ingin tidak ada buttons
															buttons: Ext.Msg.CANCEL,
															buttonText: {
																cancel: 'Close',
															}
														});
													} else {
														me2.up('window').body.unmask();
														Ext.Msg.show({
															title: 'Failure',
															msg: 'Error: Create Document Failed.',
															icon: Ext.Msg.ERROR,
															buttons: Ext.Msg.OK
														});
														// Ext.Msg.show({
														// 	title: 'Failure',
														// 	msg: 'Error: Silahkan Use Bank Terlebih Dahulu',
														// 	icon: Ext.Msg.ERROR,
														// 	buttons: Ext.Msg.OK
														// });
													}
												}
											} catch (e) {
												//console.error(e);
												me2.up('window').body.unmask();
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
											me2.up('window').body.unmask();
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
							xtype: 'button',
							action: 'cancel',
							itemId: 'btnCancel',
							padding: 5,
							width: 75,
							iconCls: 'icon-cancel',
							text: 'Cancel',
							handler: function () {
								this.up('window').close();
							}
						}
					]
				}
			]
		}).show();

		combo.bindStore(globalparameterStore);
	},
	printSuratBiaya: function(){
		var me = this;

		var grid = me.getGrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

		var purchaseletter_id = record.data.purchaseletter_id;

		if(purchaseletter_id == 0){ // added by rico 09052023
			Ext.Msg.show({
				title: 'Alert',
				msg: 'Purchaseletter belum ada.',
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK
			});
			return false;
		}

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'PRINTOUT_SURAT_BIAYA'}});

		var combo = Ext.create('Ext.form.field.ComboBox', {
			id: 'cbPrintoutID',
			editable: false,
			queryMode: 'local',
			valueField: 'value',
			displayField: 'value',
			width: '100%'
		});

		Ext.create('Ext.window.Window', {
			id: 'myCbDocWindow',
			title: 'Select Printout Type',
			height: 100,
			width: 400,
			layout: 'hbox',
			padding: '10px 10px 10px 10px',
			modal: true,
			items: {// Let's put an empty grid in just to illustrate fit layout
				xtype: combo,
				name: 'printout_combobox'
			},
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					ui: 'footer',
					layout: {
						//padding: 6,
						type: 'hbox'
					},
					items: [
						{
							xtype: 'button',
							action: 'processprintout',
							padding: 5,
							width: 75,
							iconCls: 'icon-save',
							text: 'Process',
							handler: function () {
								var me2 = this;

								var printout_cb = this.up('window').items.items[0].value;
								if (!printout_cb) {
									Ext.Msg.show({
										title: 'Alert',
										msg: 'Please Select Printout Type First',
										icon: Ext.Msg.WARNING,
										buttons: Ext.Msg.OK
									});
									return false;
								}

								// console.log(printout_cb);
								if (printout_cb == 'Stimulsoft') {

									var winId = me.detailTool.parentFDWindowId;
									var win = desktop.getWindow(winId);
									var formParent = win.down('form');

									var winId = 'myReportWindow';
									me.instantWindowReport('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
									var win = desktop.getWindow(winId);

									if (win) {
										var params = {};
										var reportFile = "OrderAkta";

										params["purchaseletter_id"] = purchaseletter_id;

										var html = me.generateFakeForm2(params, reportFile);
										win.down("#MyReportPanel").body.setHTML(html);
										$("#fakeReportFormID").submit();
									}

								} else {

									me2.up('window').body.mask('Creating Document, Please Wait...');

									Ext.Ajax.request({
										url: 'erems/admincollection/read',
										params: {
											document_name: printout_cb,
											read_type_mode: 'printout_suratbiaya',
											purchaseletter_id: purchaseletter_id
										},
										success: function (response) {
											try {
												var resp = response.responseText;

												if (resp) {
													var info = Ext.JSON.decode(resp);

													if (info.success == true) {
														me2.up('window').body.unmask();
														Ext.Msg.show({
															title: 'Info',
															msg: '<a href="' + info.url + '" target="blank">Click Here For Download Document</a>',
															icon: Ext.Msg.INFO,
															//buttons: [], //jika ingin tidak ada buttons
															buttons: Ext.Msg.CANCEL,
															buttonText: {
																cancel: 'Close',
															}
														});
													} else {
														me2.up('window').body.unmask();
														Ext.Msg.show({
															title: 'Failure',
															msg: 'Error: Create Document Failed.',
															icon: Ext.Msg.ERROR,
															buttons: Ext.Msg.OK
														});
														// Ext.Msg.show({
														// 	title: 'Failure',
														// 	msg: 'Error: Silahkan Use Bank Terlebih Dahulu',
														// 	icon: Ext.Msg.ERROR,
														// 	buttons: Ext.Msg.OK
														// });
													}
												}
											} catch (e) {
												//console.error(e);
												me2.up('window').body.unmask();
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
											me2.up('window').body.unmask();
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
							xtype: 'button',
							action: 'cancel',
							itemId: 'btnCancel',
							padding: 5,
							width: 75,
							iconCls: 'icon-cancel',
							text: 'Cancel',
							handler: function () {
								this.up('window').close();
							}
						}
					]
				}
			]
		}).show();

		combo.bindStore(globalparameterStore);
	},
	printOrderAJB: function(){
		var me = this;

		var grid = me.getGrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

		var purchaseletter_id = record.data.purchaseletter_id;

		if(purchaseletter_id == 0){ // added by rico 09052023
			Ext.Msg.show({
				title: 'Alert',
				msg: 'Purchaseletter belum ada.',
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK
			});
			return false;
		}

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'PRINTOUT_ORDER_AJB'}});

		var combo = Ext.create('Ext.form.field.ComboBox', {
			id: 'cbPrintoutID',
			editable: false,
			queryMode: 'local',
			valueField: 'value',
			displayField: 'value',
			width: '100%'
		});

		Ext.create('Ext.window.Window', {
			id: 'myCbDocWindow',
			title: 'Select Printout Type',
			height: 100,
			width: 400,
			layout: 'hbox',
			padding: '10px 10px 10px 10px',
			modal: true,
			items: {// Let's put an empty grid in just to illustrate fit layout
				xtype: combo,
				name: 'printout_combobox'
			},
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					ui: 'footer',
					layout: {
						//padding: 6,
						type: 'hbox'
					},
					items: [
						{
							xtype: 'button',
							action: 'processprintout',
							padding: 5,
							width: 75,
							iconCls: 'icon-save',
							text: 'Process',
							handler: function () {
								var me2 = this;

								var printout_cb = this.up('window').items.items[0].value;
								if (!printout_cb) {
									Ext.Msg.show({
										title: 'Alert',
										msg: 'Please Select Printout Type First',
										icon: Ext.Msg.WARNING,
										buttons: Ext.Msg.OK
									});
									return false;
								}

								// console.log(printout_cb);
								if (printout_cb == 'Stimulsoft') {

									var winId = me.detailTool.parentFDWindowId;
									var win = desktop.getWindow(winId);
									var formParent = win.down('form');

									var winId = 'myReportWindow';
									me.instantWindowReport('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
									var win = desktop.getWindow(winId);

									if (win) {
										var params = {};
										var reportFile = "OrderAkta";

										params["purchaseletter_id"] = purchaseletter_id;

										var html = me.generateFakeForm2(params, reportFile);
										win.down("#MyReportPanel").body.setHTML(html);
										$("#fakeReportFormID").submit();
									}

								} else {

									me2.up('window').body.mask('Creating Document, Please Wait...');

									Ext.Ajax.request({
										url: 'erems/admincollection/read',
										params: {
											document_name: printout_cb,
											read_type_mode: 'printout_orderajb',
											purchaseletter_id: purchaseletter_id
										},
										success: function (response) {
											try {
												var resp = response.responseText;

												if (resp) {
													var info = Ext.JSON.decode(resp);

													if (info.success == true) {
														me2.up('window').body.unmask();
														Ext.Msg.show({
															title: 'Info',
															msg: '<a href="' + info.url + '" target="blank">Click Here For Download Document</a>',
															icon: Ext.Msg.INFO,
															//buttons: [], //jika ingin tidak ada buttons
															buttons: Ext.Msg.CANCEL,
															buttonText: {
																cancel: 'Close',
															}
														});
													} else {
														me2.up('window').body.unmask();
														Ext.Msg.show({
															title: 'Failure',
															msg: 'Error: Create Document Failed.',
															icon: Ext.Msg.ERROR,
															buttons: Ext.Msg.OK
														});
														// Ext.Msg.show({
														// 	title: 'Failure',
														// 	msg: 'Error: Silahkan Use Bank Terlebih Dahulu',
														// 	icon: Ext.Msg.ERROR,
														// 	buttons: Ext.Msg.OK
														// });
													}
												}
											} catch (e) {
												//console.error(e);
												me2.up('window').body.unmask();
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
											me2.up('window').body.unmask();
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
							xtype: 'button',
							action: 'cancel',
							itemId: 'btnCancel',
							padding: 5,
							width: 75,
							iconCls: 'icon-cancel',
							text: 'Cancel',
							handler: function () {
								this.up('window').close();
							}
						}
					]
				}
			]
		}).show();

		combo.bindStore(globalparameterStore);
	},
});