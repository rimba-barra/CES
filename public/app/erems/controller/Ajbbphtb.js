Ext.define('Erems.controller.Ajbbphtb', {
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Ajbbphtb',
	views: ['ajbbphtb.Panel', 'ajbbphtb.Grid', 'ajbbphtb.FormSearch', 'ajbbphtb.FormData'],
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Citycombobox',
		'Erems.library.TypeRounding'
	],
	stores: ['Mastercluster', 'Masterblock', 'Ajbbphtb', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masternotaris', 'Masterblock', 'Masterparameterglobal', 'Masterdata.store.City'],
	models: ['Ajbbphtb', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masternotaris', 'Masterblock', 'Masterdata.model.City'],
	refs: [
		{
			ref: 'grid',
			selector: 'ajbbphtbgrid'
		},
		{
			ref: 'formsearch',
			selector: 'ajbbphtbformsearch'
		},
		{
			ref: 'formdata',
			selector: 'ajbbphtbformdata'
		}
	],
	comboBoxIdEl: ['fs_cluster_id', 'fs_block_id', 'fs_customer'],
	controllerName: 'ajbbphtb',
	fieldName: 'ajbbphtb_no',
	bindPrefixName: 'Ajbbphtb',
	validationItems: [
		{name: 'purchaseletter_id', msg: 'You must select Kavling / Unit No. first'},
	],

	formWidth: 800,
	countLoadProcess: 0,
	nonpajakConfig: 0,
	prolibfile : null,
	roundlib : null,
	typeCalculaterounding : 0,
	constructor           : function (configs) {
		this.callParent(arguments);
		var me = this;

		me.roundlib = new Erems.library.TypeRounding();
	},
	init: function (application) {
		var me = this;

		this.control({
			test: me.eventMonthField,
			'ajbbphtbpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'ajbbphtbgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'ajbbphtbgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'ajbbphtbgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'ajbbphtbgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'ajbbphtbgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'ajbbphtbgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'ajbbphtbformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'ajbbphtbformsearch button[action=search]': {
				click: this.dataSearch
			},
			'ajbbphtbformsearch button[action=reset]': {
				click: this.dataReset
			},
			'ajbbphtbformdata': {
				afterrender: this.formDataAfterRender
			},
			'ajbbphtbformdata button[action=save]': {
				click: this.dataSave
			},
			'ajbbphtbformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'ajbbphtbformdata button[action=browse_unit]': {
				click: me.selectUnitGridShow
			},
			/* formdata keyup function */
			'ajbbphtbformdata [name=npop]': {
				keyup: me.fillNPOPKP
			},
			'ajbbphtbformdata [name=npoptkp]': {
				keyup: me.fillNPOPKP
			},
			'ajbbphtbformdata [name=bphtb]': {
				keyup: me.fillNPOPKP
			},
			'ajbbphtbformdata [name=bajb]': {
				keyup: me.fillNPOPKP
			},
			'ajbbphtbformdata [name=nonpajak]': {
				keyup: me.fillNPOPKP
			},
			'ajbbphtbformdata [name=biaya_tanah_kosong]': {
				keyup: me.fillNPOPKP
			},

			'ajbbphtbformdata [name=biaya_selisih_pph]': {
				keyup: me.fillNPOPKP
			},

			'ajbbphtbformdata [name=biaya_lain_lain]': {
				keyup: me.fillNPOPKP
			},
			/*'ajbbphtbformdata [name=njop_landprice]': {
			 keyup: me.fillNJOPPBB
			 },
			 'ajbbphtbformdata [name=njop_buildingprice]': {
			 keyup: me.fillNJOPPBB
			 },*/
			/* end formdata keyup function */
			'ajbbphtbformdata button[action=prinout]': {
				click: this.formDataPrintout
			},
		});
	},
	/////// Add by Erwin.st 21062022
	panelAfterRender: function (configs) {
		this.callParent(arguments);
		var me = this;

		//autofill PNBP
		Ext.Ajax.request({
			url    : 'erems/ajbbphtb/read',
			params : {
				read_type_mode: 'others_config'
			},
			success : function (response) {
				var obj = JSON.parse(response.responseText);

				me.nonpajakConfig        = obj.nonpajak_config;
				me.prolibfile            = obj.prolibfile;
				me.typeCalculaterounding = obj.typeCalculaterounding;

				if (me.prolibfile) {
					Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/Prolibs.js?_dc=' + Ext.Date.now(), function () {
						Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/' + me.prolibfile + '.js?_dc=' + Ext.Date.now(), function () {
						}, function () {
							me.tools.alert.warning("Error load " + me.prolibfile + ".js file.");
						});
					}, function () {
						me.tools.alert.warning("Error load Prolibs.js file.");
					});
				} 
				else {
					me.tools.alert.warning("[JSERR01] File perhitungan tidak ditemukan.");
				}
			}
		});
	},
	specialRequest: function (store) {
		store.load({params: {param_spcreq: 'plAjbbphtb'}});
	},
	selectUnitGridShow: function () {
		var me = this;

		//_Apps.getController('Purchaseletter').browseItem('Ajbbphtb');
		//_Apps.getController('Purchaseletter').browseItemWR('Ajbbphtb', 'pl_ajbbphtb');
		_myAppGlobal.getController('Sppjb').ctrler = 'Ajbbphtb';
		_myAppGlobal.getController('Sppjb').spcreq = 'plAjbbphtb';
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
		var rec=''

		var plDetailStore = me.getPurchaseletterdetailStore();

		//me.getFormdata().up('window').body.mask('Loading data...');
		plDetailStore.load({
			params: {mode_read: 'detail', purchaseletter_id: rows[0].get('purchaseletter_id')},
			callback: function (rec) {
				// console.log('RECORDS PURCHASE LETTER...');
				// console.log(rec[0]);
				me.getFormdata().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
				me.getFormdata().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
				me.getFormdata().down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));
				me.getFormdata().down('[name=unit_id]').setValue(rec[0].get('unit_id'));
				me.getFormdata().down('#fd_city').setValue(rec[0].get('customer_city_id'));

				me.getFormdata().down('[name=npop]').setValue(me.fmb(rec[0].get('harga_netto')));

				me.getFormdata().down('[name=harga_jual]').setValue(me.fmb(rec[0].get('harga_netto')));

				var obj_count = {
					hrgNetto       : rec[0].get('harga_netto'),
				};

				var bajb = 0;
				if(obj_count.hrgNetto){
					bajb = window[me.prolibfile].getBiayaBAJB(obj_count);
					bajb = me.roundlib.rounding(me.typeCalculaterounding, bajb);
				}

				var bphtb = 0;
				if(obj_count.hrgNetto){
					bphtb = window[me.prolibfile].getBiayaBPHTB(obj_count);
					bphtb = me.roundlib.rounding(me.typeCalculaterounding, bphtb);
				}

				me.getFormdata().down('[name=bphtb]').setValue(me.fmb(bphtb));
				me.getFormdata().down('[name=bajb]').setValue(me.fmb(bajb));

				// me.getFormdata().down('[name=bphtb]').setValue(accounting.formatMoney(rec[0].get('harga_bphtb')));
				// me.getFormdata().down('[name=bajb]').setValue(accounting.formatMoney(rec[0].get('harga_bajb')));
				//me.getFormdata().down('[name=bajb]').setReadOnly(true);;
				
				me.getFormdata().down('[name=nonpajak]').setValue(0.00);


				me.fillUnitDataToForm(rec[0]);
				me.fillMasterCustomerData(rec[0], 'customer');
				//me.fillWajibPajakInformationData(rec[0], 'wajibpajak');

				me.tcb();

			}
		});

		//var aaa = me.getParameterGlobalValue('SSP_NPOPTKP');
		//console.log('c '+aaa);

		////load global parameter
		// var masterparameterglobalStore = me.getMasterparameterglobalStore();
		// masterparameterglobalStore.removeAll();
		// masterparameterglobalStore.load({
		// params:{parametername:'AJB_NPOPTKP'},
		// callback:function(rec){
		// me.getFormdata().down('[name=npoptkp]').setValue(me.fmb(rec[0].data.value));
		// me.tcb();
		// }
		// });

		// masterparameterglobalStore.removeAll();
		// masterparameterglobalStore.load({
		// params:{parametername:'SSP_PERSEN_BEAHAK'},
		// callback:function(rec){
		// me.getFormdata().down('[name=bphtb_persen]').setValue(me.fmb(rec[0].data.value));
		// me.tcb();
		// }
		// });

		// masterparameterglobalStore.removeAll();
		// masterparameterglobalStore.load({
		// params:{parametername:'SSP_PERSEN_BAJB'},
		// callback:function(rec){
		// me.getFormdata().down('[name=bajb_persen]').setValue(me.fmb(rec[0].data.value));
		// me.tcb();
		// }
		// });

		/*masterparameterglobalStore.removeAll();
		 masterparameterglobalStore.load({
		 params:{parametername:'SSP_PERSEN_PAJAK'},
		 callback:function(rec){
		 me.getFormdata().down('[name=totalbayar_persen]').setValue(me.fmb(rec[0].data.value));
		 me.tcb();
		 }
		 });*/
	},

	//for callback (function in function)
	tcb: function () {
		var me = this;
		me.fillNPOPKP();
	},

	fillNPOPKP: function () {
		var me = this;
		var npop = toFloat(me.getFormdata().down('[name=npop]').getValue());
		var bphtb_persen = toFloat(me.getFormdata().down('[name=bphtb_persen]').getValue());
		var bajb_persen = toFloat(me.getFormdata().down('[name=bajb_persen]').getValue());
		var btk = toFloat(me.getFormdata().down('[name=biaya_tanah_kosong]').getValue());
		var selpph = toFloat(me.getFormdata().down('[name=biaya_selisih_pph]').getValue());
		var bll = toFloat(me.getFormdata().down('[name=biaya_lain_lain]').getValue());

		if (npop) {
			//npopkp
			var npoptkp = toFloat(me.getFormdata().down('[name=npoptkp]').getValue());
			if (!npoptkp) {
				npoptkp = 0
			}
			var npopkp = npop - npoptkp;

			var bajb = toFloat(me.getFormdata().down('[name=bajb]').getValue());
			var bphtb = toFloat(me.getFormdata().down('[name=bphtb]').getValue());

			if (me.nonpajakConfig == 1) {
				var nonpajak = (npop / 1000) + 50000;
				if (!nonpajak) {
					nonpajak = 0
				}
				me.getFormdata().down('[name=nonpajak]').setValue(me.fmb(nonpajak));
			} else {
				var nonpajak = toFloat(me.getFormdata().down('[name=nonpajak]').getValue());
				if (!nonpajak) {
					nonpajak = 0
				}
			}
			var total = bphtb + bajb + nonpajak + btk + selpph + bll;
			
		}

		me.getFormdata().down('[name=npopkp]').setValue(me.fmb(npopkp));
		me.getFormdata().down('[name=total]').setValue(me.fmb(total));
	},

	// fillNPOPKP_old: function () {
	// 	var me = this;
	// 	var npop = toFloat(me.getFormdata().down('[name=npop]').getValue());
	// 	var bphtb_persen = toFloat(me.getFormdata().down('[name=bphtb_persen]').getValue());
	// 	var bajb_persen = toFloat(me.getFormdata().down('[name=bajb_persen]').getValue());

	// 	if (npop) {
	// 		//npopkp
	// 		var npoptkp = toFloat(me.getFormdata().down('[name=npoptkp]').getValue());
	// 		if (!npoptkp) {
	// 			npoptkp = 0
	// 		}
	// 		var npopkp = npop - npoptkp;


	// 		///////////////////////////////////////////////////////////////////
	// 		var plDetailStore = me.getPurchaseletterdetailStore();
	// 		var rec = plDetailStore.data.items[0].data;

	// 		var pricetype = '';
	// 		if(rec.pricetype.toUpperCase() == "CASH"){ pricetype = 't'; }
	// 		else if(rec.pricetype.toUpperCase() == "KPR"){ pricetype = 'k'; }
	// 		else if(rec.pricetype.toUpperCase() == "INH"){ pricetype = 'ih'; }

	// 		var obj_count = {
	// 			hrgNetto       : rec.harga_netto,
	// 			landSize       : rec.unit_land_size,                        
	// 			salesGroup     : rec.type_salesgroup,
	// 			ptId           : rec.unit_pt_id,
	// 			landOverSize   : rec.unit_kelebihan,
	// 			TypeCode       : rec.type_code,
	// 			PriceType      : pricetype,
	// 			peruntukanCode : rec.purpose_code
	// 		};

	// 		var bajb = 0;
	// 		if(obj_count.hrgNetto){
	// 			bajb = window[me.prolibfile].getBiayaBAJB(obj_count);
	// 			bajb = me.roundlib.rounding(me.typeCalculaterounding, bajb);
	// 		}

	// 		var bphtb = 0;
	// 		if(obj_count.hrgNetto){
	// 			bphtb = window[me.prolibfile].getBiayaBPHTB(obj_count);
	// 			bphtb = me.roundlib.rounding(me.typeCalculaterounding, bphtb);
	// 		}

	// 		me.getFormdata().down('[name=bphtb]').setValue(accounting.formatMoney(bphtb));
	// 		me.getFormdata().down('[name=bajb]').setValue(accounting.formatMoney(bajb));

	// 		//total biaya
	// 		// var bphtb = toFloat(me.getFormdata().down('[name=bphtb]').getValue());
	// 		// var bphtb = (npopkp * bphtb_persen) / 100;
	// 		// if (!bphtb) {
	// 		// 	bphtb = 0
	// 		// }
	// 		// me.getFormdata().down('[name=bphtb]').setValue(me.fmb(bphtb));

	// 		// var bajb = toFloat(me.getFormdata().down('[name=bajb]').getValue());
	// 		// var bajb = (npop * bajb_persen) / 100;
	// 		// if (!bajb) {
	// 		// 	bajb = 0
	// 		// }
	// 		// me.getFormdata().down('[name=bajb]').setValue(me.fmb(bajb));

	// 		//non pajak
	// 		if (me.nonpajakConfig == 1) {
	// 			var nonpajak = (npop / 1000) + 50000;
	// 			if (!nonpajak) {
	// 				nonpajak = 0
	// 			}
	// 			me.getFormdata().down('[name=nonpajak]').setValue(me.fmb(nonpajak));
	// 		} else {
	// 			var nonpajak = toFloat(me.getFormdata().down('[name=nonpajak]').getValue());
	// 			if (!nonpajak) {
	// 				nonpajak = 0
	// 			}
	// 		}

	// 		var total = bphtb + bajb + nonpajak;
	// 	}

	// 	me.getFormdata().down('[name=npopkp]').setValue(me.fmb(npopkp));
	// 	me.getFormdata().down('[name=total]').setValue(me.fmb(total));
	// },

	/*fillNJOPPBB: function(){
	 var me = this;
	 var njop_landsize = toFloat(me.getFormdata().down('[name=njop_landsize]').getValue());
	 var njop_buildingsize = toFloat(me.getFormdata().down('[name=njop_buildingsize]').getValue());
	 
	 var njop_landprice = toFloat(me.getFormdata().down('[name=njop_landprice]').getValue());
	 if(!njop_landprice){ njop_landprice = 0 }
	 var njop_buildingprice = toFloat(me.getFormdata().down('[name=njop_buildingprice]').getValue());
	 if(!njop_buildingprice){ njop_buildingprice = 0 }
	 
	 var njop_landpbb = njop_landsize * njop_landprice;
	 var njop_buildingpbb = njop_buildingsize * njop_buildingprice;
	 var njop_totalpbb = njop_landpbb + njop_buildingpbb;
	 
	 me.getFormdata().down('[name=njop_landpbb]').setValue(me.fmb(njop_landpbb));
	 me.getFormdata().down('[name=njop_buildingpbb]').setValue(me.fmb(njop_buildingpbb));
	 me.getFormdata().down('[name=njop_totalpbb]').setValue(me.fmb(njop_totalpbb));
	 },*/

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

	/*fillWajibPajakInformationData: function(records, prefix){
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
	 },*/

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

		//load global parameter
		var masterparameterglobalStore = me.getMasterparameterglobalStore();
		masterparameterglobalStore.removeAll();
		masterparameterglobalStore.load({
			params: {parametername: 'AJB_NPOPTKP'},
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
			params: {parametername: 'SSP_PERSEN_BAJB'},
			callback: function (rec) {
				me.getFormdata().down('[name=bajb_persen]').setValue(me.fmb(rec[0].data.value));
				me.tcb();
			}
		});

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
			form.down('[name=npopkp]').setValue(me.fmb(record.data.npopkp));
			form.down('[name=harga_jual]').setValue(me.fmb(record.data.harga_jual));
			form.down('[name=bphtb]').setValue(me.fmb(record.data.bphtb));
			form.down('[name=bajb]').setValue(me.fmb(record.data.bajb));
			form.down('[name=nonpajak]').setValue(me.fmb(record.data.nonpajak));
			form.down('[name=total]').setValue(me.fmb(record.data.total));
			form.down('[name=biaya_tanah_kosong]').setValue(me.fmb(record.data.biaya_tanah_kosong));
			form.down('[name=biaya_selisih_pph]').setValue(me.fmb(record.data.biaya_selisih_pph));
			form.down('[name=biaya_lain_lain]').setValue(me.fmb(record.data.biaya_lain_lain));

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
				me.getFormdata().down('#btnPrintout').setDisabled(false);
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

	formDataPrintout: function () {
		var me = this;
		var ajbbphtb_id = me.getFormdata().down('#ajbbphtb_id').getValue();
		_myAppGlobal.getController('Sppjb').printOut(me, ajbbphtb_id, 'PRINTOUT_AJBBPHTB_DOC', 'erems/ajbbphtb/prinout');
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
	}

});