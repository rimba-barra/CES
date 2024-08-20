Ext.define('Erems.controller.Pindahkavling', {
	extend   : 'Erems.library.template.controller.Controller2',
	alias    : 'controller.Pindahkavling',
	views    : ['pindahkavling.Panel', 'pindahkavling.Grid', 'pindahkavling.FormSearch', 'pindahkavling.FormData'],
	requires : [
		'Erems.library.box.tools.Date',
		'Erems.library.template.view.combobox.Billingrules',
		'Erems.library.template.view.combobox.Bank',
		'Erems.library.template.view.combobox.Collector',
		'Erems.library.template.component.Pricetypecombobox',
		'Erems.view.pindahkavling.Schedulegrid',
		'Erems.library.template.view.combobox.Changekavlingreason',
		'Erems.library.template.component.Tanggalvalidasicombobox',
		'Erems.library.Purchaseletter',
		'Erems.library.ScheduleGrid',
		'Erems.library.Browse',
		'Erems.library.Calculator',
		'Erems.library.CalculatorDiscount', 
		'Erems.library.CalculatorFields',
		'Erems.library.ScheduleAddAdvance',
		'Erems.library.TigaSekawan',
		'Erems.library.TypeRounding'
	],
	stores : ['Scheduletype'],
	models : ['Scheduletype'],
	refs   : [
		{
			ref      : 'grid',
			selector : 'pindahkavlinggrid'
		},
		{
			ref      : 'formsearch',
			selector : 'pindahkavlingformsearch'
		},
		{
			ref      : 'formdata',
			selector : 'pindahkavlingformdata'
		},
		{
			ref      : 'schedulegrid',
			selector : 'pindahkavlingschedulegrid'
		},
		{
			ref      : 'panel',
			selector : 'pindahkavlingpanel'
		},
		{
			ref      : 'soldunitgrid',
			selector : 'pindahkavlingunitsoldgrid'
		},
		{
			ref      : 'formdataadv',
			selector : 'pindahkavlingformdataaddschedule'
		},
		{
			ref      : 'formsettings',
			selector : 'pindahkavlingformdatasettings'
		}
	],
	comboBoxIdEl   : ['fd_clustercb', 'fd_blockcb', 'bank_cb', 'collector_cb', 'pricetype_cb', 'billingrules_id', 'movereason_cb'],
	controllerName : 'pindahkavling',
	fieldName      : 'changekavling_id',
	bindPrefixName : 'Pindahkavling',
	pkScheduleGen  : null, /// scheduleGenerator object holder
	formWidth      : 800,
	fillForm       : null,
	cbf            : null,
	scheduleGrid   : null,
	setParamPK : {
		typeCalculaterounding   : 0,
		calculator              : null,
		calculatorDiscount      : null,
		typeRounding            : null,
		processor               : null,
		prolibs                 : null,
		currentPurchaseletterId : 0,
		purchaseletterJs        : null,
		verifikasiDiskonInfo    : null,
		globalParams            : null,
		bulat_ppn               : true,
		verification_approval   : false,
		isUsedVerification      : false,
	},
	localStore : {
		detail           : null,
		selectedNewUnit  : null,
		selectedSoldUnit : null,
		price            : null
	},
	constructor : function (configs) {
		this.callParent(arguments);
		
		var me = this;

		me.myConfig = new Erems.library.box.Config({ _controllerName: me.controllerName });
		me.cbf      = new Erems.template.ComboBoxFields();
	},
	init: function (application) {
		var me = this;

		me.tools                         = new Erems.library.box.tools.Tools({config: me.myConfig});
		me.scheduleGrid                  = new Erems.library.ScheduleGrid();
		me.setParamPK.typeRounding       = new Erems.library.TypeRounding();
		me.setParamPK.calculatorDiscount = new Erems.library.CalculatorDiscount();

		this.control({
			'pindahkavlingpanel' : {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : this.panelAfterRender
			},
			'pindahkavlinggrid' : {
				afterrender     : this.gridAfterRender,
				itemdblclick    : this.gridItemDblClick,
				itemcontextmenu : this.gridItemContextMenu,
				selectionchange : this.gridSelectionChange
			},
			'pindahkavlinggrid toolbar button[action=create]' : {
				click : function () {
					this.formDataShow('create');
				}
			},
			'pindahkavlinggrid toolbar button[action=update]' : {
				click : function () {
					this.formDataShow('update');
				}
			},
			'pindahkavlinggrid toolbar button[action=view]' : {
				click : function () {
					this.formDataShow('read');
				}
			},
			'pindahkavlinggrid toolbar button[action=destroy]' : {
				click : this.dataDestroy
			},
			'pindahkavlinggrid toolbar button[action=print]' : {
				click : this.dataPrint
			},
			'pindahkavlinggrid toolbar button[action=printmsword]' : {
				click : function () {
					this.printMsWord();
				}
			},
			'pindahkavlinggrid actioncolumn' : {
				afterrender : this.gridActionColumnAfterRender,
				click       : this.gridActionColumnClick
			},
			'pindahkavlingformsearch button[action=search]' : {
				click : this.dataSearch
			},
			'pindahkavlingformsearch button[action=reset]' : {
				click : this.dataReset
			},
			'pindahkavlingformdata' : {
				afterrender : this.formDataAfterRender
			},
			'pindahkavlingformdata button[action=browse_unit_pl]' : {
				click : function () {
					me.selectUnitGridShow('Purchaseletter');
				}
			},
			'pindahkavlingformdata button[action=browse_unit_ms]' : {
				click : function () {
					me.selectUnitGridShow('Marketingstock');
				}
			},
			'pindahkavlingformdata button[action=save]' : {
				click : function () {
					me.mainDataSave();
				}
			},
			'pindahkavlingformdata button[action=approve]' : {
				click : function () {
					me.mainDataSave(1); // 1 = approve
				}
			},
			'pindahkavlingformdata button[action=approvecoll]' : {
				click : function () {
					me.mainDataSave(3); // 1 = approvecoll
				}
			},
			'pindahkavlingformdata button[action=reject]' : {
				click : function () {
					me.mainDataSave(2); // 2 = reject
				}
			},
			'pindahkavlingformdata button[action=cancel]' : {
				click : this.formDataClose
			},
			'pindahkavlingformdata button[action=settings]' : {
				click : function () {
					me.showSettingsWin();
				}
			},
			'pindahkavlingformdata [name=movereason_id]' : {
				select : function (el, val) {
					me.seFi.cb('movereason_code', el, 'code', val);
				}
			},
			'pindahkavlingformdata [name=movereason_code]' : {
				keyup : function (el) {
					me.seFi.tf('movereason_id', el, {name: 'code', tipe: 'id'}, 'movereason_id');
				}
			},
			'pindahkavlingformdata button[action=browse_unit]' : {
				click : this.browseSoldUnit
			},
			'pindahkavlingformdata button[action=browse_unit_baru]' : {
				click : this.browseStockedUnit
			},
			'pindahkavlingunitsoldgrid button[action =select]': {
				click : this.cekApproval
			},
			'pindahkavlingunitstockgrid button[action=select]' : {
				click : this.unitStockSelect
			},
			'pindahkavlingformdata [name=pricetype_pricetype_id]' : {
				select : this.priceTypeOnSelect
			},
			'pindahkavlingformdata button[action=genschedule]' : {
				click : function () {
					me.generateSchedule();
				}
			},
			'pindahkavlingformdata [name=billingrules_billingrules_id]' : {
				select : this.billingRulesOnSelect
			},
			/////// SCHEDULE GRID
			'pindahkavlingschedulegrid' : {
				afterrender : function () {
					me.getSchedulegrid().on('edit', function (editor, e) {
						// commit the changes right after editing finished
						me.scheduleGrid.schedulGridOnEdit(me, {
							fieldHargaTotalJual : 'pricenew_harga_total_jual'
						}, editor, e, me.getFormdata(), me.getSchedulegrid());
						e.record.commit();
					});
					me.getSchedulegrid().on('beforeedit', function (editor, e) {
						return me.scheduleGrid.schedulGridOnBeforeEdit(editor, e);
					});
				},
				cellclick : function (el, td, cellIndex, record, tr, rowIndex, e, eOpts) {
					me.scheduleGrid.schGridCellClick(el, record, rowIndex); // gak dipakai
				}
			},
			'pindahkavlingschedulegrid toolbar button[action=create]' : {
				click : function () {
					me.scheduleGrid.addNewSchedule(me, {
						fieldHargaTotalJual : 'pricenew_harga_total_jual',
						purchase_date       : me.getFormdata().down("[name=purchaseletter_purchase_date]").getValue()
					}, me.getFormdata(), me.getSchedulegrid());
				}
			},
			'pindahkavlingschedulegrid toolbar button[action=destroy]' : {
				click : function () {
					me.scheduleGrid.removeSchedule(me, {
						fieldHargaTotalJual : 'pricenew_harga_total_jual'
					}, me.getFormdata(), me.getSchedulegrid(), me.getGrid());
				}
			},
			'pindahkavlingschedulegrid toolbar button[action=split]' : {
				click : function () {
					var proses = me.scheduleGrid.splitSchedule(me, {
						purchase_date       : me.getFormdata().down("[name=purchaseletter_purchase_date]").getValue(),
						fieldHargaTotalJual : 'pricenew_harga_total_jual'
					}, me.getFormdata(), me.getSchedulegrid());
					if (!proses.hasil) {
						me.tools.alert.warning(proses.pesan);
					}
				}
			},
			/////// /SCHEDULE GRID
			'pindahkavlingformdata textfield[name=rencana_serahterima]' : {
				keyup : function () {
					me.scheduleGrid.rencanaSerahTerimaOnKeyUp(me, {
						dateField : 'plnew_purchase_date'
					});
				}
			},
			'pindahkavlingformdata [name=rencana_serahterima_date]' : {
				select : function () {
					me.scheduleGrid.rencanaSerahTerimaDateOnSelect(me, {
						dateField     : 'plnew_purchase_date',
						dateFieldThen : 'plnew_purchase_date'
					});
				}
			},
			'pindahkavlingformdata [name=billingrules_tandajadi]' : {
				keyup : function () {
					me.billingRulesHitungSisa();
				}
			},
			'pindahkavlingformdata [name=billingrules_uangmuka]' : {
				keyup : function () {
					me.billingRulesHitungSisa();
				}
			},
			'pindahkavlingparametersppjbgrid button[action=select]' : {
				click : this.paramsppjbSelect
			},
			'pindahkavlingschedulegrid toolbar button[action=create_adv]' : {
				click : function () {
					me.kvaddnewScheduleAdv();
				}
			},
			'pindahkavlingformdataaddschedule button[action=save]' : {
				click : function () {
					me.kvsaveFormAdvanceOnClick();
				}
			},
			'pindahkavlingformdataaddschedule [name=help_tipe]' : {
				select : function () {
					me.addnewScheduleAdvTipeOnSelect();
				}
			},
			'pindahkavlingformdatasettings button[action=save]' : {
				click : function () {
					me.saveSettings();
				}
			},
			'pindahkavlingformdata [name=tanggal_validasi] ' : {
				change : function (el, val) {
					me.tanggalvalidasi(val);
				}
			},
		});

		var cc = [
			"baru_land_size",
			"baru_kelebihan",
			"pricenew_tanahpermeter", 
			"pricenew_harga_tanah",
			"pricenew_kelebihantanah", 
			"pricenew_harga_kelebihantanah",
			"pricenew_harga_bangunan", 
			"pricenew_persen_dischargedasar",
			"pricenew_persen_dischargetanah",
			"pricenew_persen_dischargebangunan",
			"pricenew_persen_ppntanah",
			"pricenew_harga_ppntanah", 
			"pricenew_persen_ppnbangunan",
			"pricenew_harga_ppnbangunan", 
			"pricenew_persen_ppnbm",
			"pricenew_harga_ppnbm",
			"pricenew_persen_pph22",
			"pricenew_harga_pph22",
			"pricenew_harga_bbnsertifikat", 
			"pricenew_harga_bphtb", 
			"pricenew_harga_bajb", 
			"plnew_harga_administrasi",
			"plnew_harga_admsubsidi", 
			"plnew_harga_pmutu", 
			"plnew_harga_paket_tambahan",
			"plnew_persen_salesdisc",
			"plnew_biaya_asuransi",
			"plnew_harga_pembulatan",
		];

		for (var x in cc) {
			this.control('pindahkavlingformdata [name=' + cc[x] + ']', {
				keyup : function (el) {
					me.setParamPK.calculator.typeCalculaterounding = me.setParamPK.typeCalculaterounding; /// Add by Erwin.St 25012022
					me.setParamPK.calculator.calculate(el);

					me.billingRulesOnSelect();

					if(me.getFormdata().up('window').state == 'create'){
						me.getSchedulegrid().getStore().loadData([], false);
					}
				}
			});
		}
	},
	showSettingsWin: function () {
		var me = this;
		var w = me.instantWindow('FormDataSettings', 300, 'Settings', 'my_state', 'mySettingsWindow');
		var f = me.getFormsettings();
		//bulat_ppn
		f.down("[name=bulat_ppn]").setValue(me.setParamPK.bulat_ppn);
	},
	saveSettings: function () {
		var me = this;
		var f  = me.getFormsettings();
		var vs = f.getForm().getValues();

		me.setParamPK.bulat_ppn = f.down("[name=bulat_ppn]").getValue();
		f.up("window").close();
	},
	addnewScheduleAdvTipeOnSelect: function () {
		var me           = this;
		var f            = me.getFormdataadv();
		var fm           = me.getFormdata();
		var tipe         = me.tools.comboHelper(f.down("[name=help_tipe]")).getText({d: 'scheduletype', v: 'scheduletype_id'});
		var isGanti      = false;
		var brJmlField   = "";
		var brTotalField = "";

		if (tipe === "UM") {
			isGanti      = true;
			brJmlField   = "billingrules_term_uangmuka";
			brTotalField = "billingrules_uangmuka";

		}
		if (tipe === "KPR" || tipe === "INH" || tipe === "SIP") {
			isGanti = true;
			brJmlField = "billingrules_term_angsuran";
			brTotalField = "billingrules_angsuran";
		}

		if (isGanti) {
			var jml = me.tools.intval(fm.down("[name=" + brJmlField + "]").getValue());
			var total  = accounting.unformat(fm.down("[name=" + brTotalField + "]").getValue());
			var amount = 0;
			isGanti    = true;
			amount     = jml > 0 ? total / jml : 0;

			f.down("[name=help_amount]").setValue(accounting.formatMoney(amount));
			f.down("[name=help_jml]").setValue(jml);
		}
	},
	kvsaveFormAdvanceOnClick: function () {
		var me = this;
		var f  = me.getFormdataadv();
		var vs = f.getValues();
		var g  = me.getSchedulegrid();

		var schAdvance = new Erems.library.ScheduleAddAdvance();
		schAdvance.proses(this, f, g);

		g.getSelectionModel().select((g.getStore().getCount()) - 1);
		f.up("window").close();
	},
	kvaddnewScheduleAdv: function () {
		var me = this;
		var w = me.instantWindow('FormDataAddSchedule', 500, 'Add New Schedule Advance', 'my_state', 'myAddSchAdvWindow');
		me.tools.ajax({
			params  : {},
			success : function (data, model) {
				me.tools.wesea(data.scheduletype, me.getFormdataadv().down("[name=help_tipe]")).comboBox();
			}
		}).read('scheduleadvanceinit');
	},
	billingRulesHitungSisa: function () {
		var me    = this;
		var f     = me.getFormdata();
		var total = accounting.unformat(f.down("[name=pricenew_harga_total_jual]").getValue());
		var tj    = accounting.unformat(f.down("[name=billingrules_tandajadi]").getValue());
		var um    = accounting.unformat(f.down("[name=billingrules_uangmuka]").getValue());
		var sisa  = 0.0;

		sisa = total - (tj + um);
		
		f.down("[name=billingrules_angsuran]").setValue(accounting.formatMoney(sisa));
	},
	generateSchedule: function () {
		var me = this;
		Ext.Msg.show({
			title   : 'Konfirmasi',
			msg     : 'Buat jadwal baru?',
			buttons : Ext.Msg.YESNO,
			icon    : Ext.Msg.QUESTION,
			fn      : function (clicked) {
				if (clicked === "yes") {
					var f  = me.getFormdata();
					var sg = me.getSchedulegrid();

					f.setLoading("Loading schedule ...");
					me.tools.ajax({
						params  : { purchaseletter_id: me.setParamPK.currentPurchaseletterId },
						success : function (schdata, schmodel) {
							f.setLoading(false);

							var countSchPay = 0;
							for (var i = 0; i < schdata.length; i++) {
								if (me.tools.floatval(schdata[i].schedule.amount) > me.tools.floatval(schdata[i].schedule.remaining_balance)) {
									countSchPay++;
								}
							}

							if (countSchPay > 0) { // jika ada payment
								me.tools.alert.warning("Purchaseletter ini sudah ada payment. Silahkan generate menggunakan schedule lama.");
								return;
							} 
							else {
								me.setParamPK.processor.totalPPN  = 0;
								me.setParamPK.processor.plDate    = me.getFormdata().down("[name=purchaseletter_purchase_date]").getValue();
								me.setParamPK.processor.is_ppndtp = 0;
								me.setParamPK.processor.generateSchedule();
							}
						}
					}).read('schedule');
				} 
				else { // ambil jadwal lama
					var f  = me.getFormdata();
					var sg = me.getSchedulegrid();

					f.setLoading("Loading schedule ...");
					me.tools.ajax({
						params  : { purchaseletter_id: me.setParamPK.currentPurchaseletterId },
						success : function (schdata, schmodel) {

							sg.getStore().loadData([], false);

							me.tools.wesea({
								data  : schdata,
								model : schmodel
							}, sg).grid();

							// cek selisih harga jual lama dan baru
							var jualLama = accounting.unformat(f.down("[name=harga_total_jual]").getValue());
							var jualBaru = accounting.unformat(f.down("[name=pricenew_harga_total_jual]").getValue());
							var selisihHarga = jualBaru - jualLama;

							if (selisihHarga > 0 || selisihHarga < 0) {
								sg.getStore().add({
									amount                     : selisihHarga,
									termin                     : 1,
									scheduletype_scheduletype  : selisihHarga > 0 ? 'SIP' : 'PU',
									sourcemoney_sourcemoney    : null,
									sourcemoney_sourcemoney_id : null,
									remaining_balance          : selisihHarga,
									duedate                    : sg.getStore().getAt(sg.getStore().getCount() - 1).get("duedate")
								});
							}

							//// hilangkan desimal
							var totalTJ         = 0;
							var countTJ         = 0;
							var totalAmountTJ   = 0;
							var totalFloorTJ    = 0;
							var totalUM         = 0;
							var countUM         = 0;
							var totalAmountUM   = 0;
							var totalFloorUM    = 0;
							var totalSISA       = 0;
							var countSISA       = 0;
							var totalAmountSISA = 0;
							var totalFloorSISA  = 0;
							sg.getStore().each(function (rec) {
								if (rec.get("scheduletype_scheduletype") === "TJ") {
									totalTJ++;
									totalAmountTJ += accounting.unformat(rec.get("amount"));
								} else if (rec.get("scheduletype_scheduletype") === "UM") {
									totalUM++;
									totalAmountUM += accounting.unformat(rec.get("amount"));
								} else {
									totalSISA++;
									totalAmountSISA += accounting.unformat(rec.get("amount"));
								}
							});

							sg.getStore().each(function (rec) {
								if (rec.get("scheduletype_scheduletype") === "UM") {
									var remainingBalance = accounting.unformat(rec.get("remaining_balance"));
									var amount           = accounting.unformat(rec.get("amount"));
									if ((amount - remainingBalance) <= 0) { /// berlaku untuk yang belum bayar
										var newAmount = Math.floor(amount);

										if (countUM == totalUM - 1) { // tagihan akhir 
											newAmount = totalAmountUM - totalFloorUM;
										}
										totalFloorUM += newAmount;

										rec.beginEdit();
										rec.set({
											amount            : newAmount,
											remaining_balance : newAmount
										});
										rec.endEdit();
									}
									countUM++;
								} 
								else if (rec.get("scheduletype_scheduletype") === "TJ") {
									var remainingBalance = accounting.unformat(rec.get("remaining_balance"));
									var amount           = accounting.unformat(rec.get("amount"));
									if ((amount - remainingBalance) <= 0) { /// berlaku untuk yang belTJ bayar
										var newAmount = Math.floor(amount);

										if (countTJ == totalTJ - 1) { // tagihan akhir 
											newAmount = totalAmountTJ - totalFloorTJ;
										}
										totalFloorTJ += newAmount;

										rec.beginEdit();
										rec.set({
											amount            : newAmount,
											remaining_balance : newAmount
										});
										rec.endEdit();
									}
									countTJ++;
								} 
								else {
									var remainingBalance = accounting.unformat(rec.get("remaining_balance"));
									var amount           = accounting.unformat(rec.get("amount"));

									if ((amount - remainingBalance) <= 0) { /// berlaku untuk yang belSISA bayar
										var newAmount = Math.floor(amount);
										if (countSISA == totalSISA - 1) { // tagihan akhir 
											newAmount = totalAmountSISA - totalFloorSISA;
										}
										totalFloorSISA += newAmount;

										rec.beginEdit();
										rec.set({
											amount            : newAmount,
											remaining_balance : newAmount
										});
										rec.endEdit();
									}
									countSISA++;
								}
							});
							////end hilangkan desimal

							f.setLoading(false);
						}
					}).read('schedule');
				}
			}
		});
	},
	billingRulesOnSelect: function () {
		var me  = this;
		var f   = me.getFormdata();
		var e   = f.down("[name=billingrules_billingrules_id]");
		var rec = e.getStore().findRecord("billingrules_id", e.getValue());

		if (!me.setParamPK.prolibs) {
			console.log("[BILLINGRULESONSELECT] PROBLIBS NULL");
			return;
		}
		
		if (rec) {
			var pum = me.tools.floatval(rec.get("persen_uangmuka"));
			var ptj = me.tools.floatval(rec.get("persen_tandajadi"));
			var htj = f.down("[name=pricenew_harga_total_jual]").getValuem();
			var um  = pum > 0 ? ((pum / 100) * htj) : me.tools.floatval(rec.get("uangmuka"));
			var tj  = ptj > 0 ? ((ptj / 100) * htj) : me.tools.floatval(rec.get("tandajadi"));

			me.setParamPK.prolibs.setDataBillingRules({
				um : um,
				tj : tj
			});
			um = me.setParamPK.prolibs.getUangMukaBillingRules();
			var a = htj - um;

			var ttj = me.tools.intval(rec.get('term_tandajadi'));
			ttj = ttj > 240 ? 240 : ttj;
			var tum = me.tools.intval(rec.get('term_uangmuka'));
			tum = tum > 240 ? 240 : tum;
			var ta = me.tools.intval(rec.get('term_angsuran'));
			ta = ta > 240 ? 240 : ta;
			ta = me.tools.intval(f.down("[name=pricetype_pricetype_id]").getValue()) == 2 ? 1 : ta;
			
			if (ttj == 0 && tj > 0)
				ttj = 1;
			
			if (tum == 0 && um > 0)
				tum = 1;
			
			f.down("[name=billingrules_term_tandajadi]").setValue(ttj);
			f.down("[name=billingrules_tandajadi]").setValuem(tj);
			f.down("[name=billingrules_term_uangmuka]").setValue(tum);
			f.down("[name=billingrules_uangmuka]").setValuem(um);
			f.down("[name=billingrules_term_angsuran]").setValue(ta);
			f.down("[name=billingrules_angsuran]").setValuem(a);
		}
	},
	paramsppjbSelect: function () {
		var me = this;
		if (me.browseHandler) {
			me.browseHandler.selectItem(function (rec) {
				var f = me.getFormdata();
				var selectedCK = me.getGrid().getSelectedRecord();
				if (selectedCK) {
					me.tools.printMsWord({
						changekavling_id  : selectedCK.get('changekavling_id'),
						parametersppjb_id : rec.get("parametersppjb_id")
					}, me.getPanel()).grid(me.getGrid());
				}
			});
		}
	},
	printMsWord: function () {
		var me = this;
		var rec = me.getGrid().getSelectedRecord();
		if (rec) {
			me.browseParametersppjb();
		} 
		else {
			me.tools.alert.warning("Silahkan pilih satu record terlebih dahulu.");
		}
	},
	browseParametersppjb: function (el) {
		var me = this;
		var browse = new Erems.library.Browse();
		browse.init({
			controller : me,
			view       : 'ParametersppjbGrid',
			el         : el,
			localStore : "selectedParametersppjb",
			mode_read  : "selectedparametersppjb"
		});
		browse.showWindow();
	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);

		var me = this;
		me.getGrid().getSelectionModel().setSelectionMode('SINGLE');

		me.tools.ajax({
			params  : {},
			success : function (dataci, modelci) {
				var active                          = dataci['others'][0][0]['ACTIVE'];
				me.setParamPK.verification_approval = dataci['others'][0][0]['verification_approval']

				if (!active) { /// jika changekavling di non aktfikan
					me.getGrid().up("window").close();
					alert("Untuk pindah unit, lakukan proses pembatalan dan pejualan baru.");
					return;
				} 
				else {
					me.setParamPK.prolibs          = null;
					me.setParamPK.purchaseletterJs = dataci['others'][0][0]['PURCHASELETTERJS'];
					var prolibsFile                = dataci['others'][0][0]['PROLIBFILE'];
					var errorFile                  = "";

					/// add by erwin.st 09022022
					me.setParamPK.typeCalculaterounding = dataci['others'][0][0]['typeCalculaterounding'];

					if (prolibsFile) {
						Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/Prolibs.js?_dc=' + Ext.Date.now(), function () {
							Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/' + prolibsFile + '.js?_dc=' + Ext.Date.now(), function () {
								me.setParamPK.prolibs     = window[prolibsFile];
								me.setParamPK.prolibsFile = prolibsFile;
							}, function () {
								me.tools.alert.warning("Error load prolibs file.");
							});
						}, function () {
							me.tools.alert.warning("Error load Prolibs.js file.");
						});
					} 
					else {
						errorFile += "[JSERR01] File perhitungan purchaseletter tidak ditemukan.";
					}

					if (!me.setParamPK.purchaseletterJs) {
						errorFile += "[JSERR02] File purchaseletter tidak ditemukan.";
					}

					if (errorFile.length > 0) {
						me.tools.alert.error(errorFile);
					}
				}
			}
		}).read('init');
	},
	mainDataSave: function (mode) {
		var me = this;
		var m = typeof mode !== "undefined" ? mode : "";

		if (me.tools.intval(m) == 0) { // untuk prsoes simpan saja
			var tigaSekawan     = new Erems.library.TigaSekawan();
			var priceType       = me.tools.comboHelper(me.getFormdata().down("[name=pricetype_pricetype_id]")).getText({d: 'pricetype', v: 'pricetype_id'});
			var validasiTagihan = tigaSekawan.validasiDaftarTagihan(me.getSchedulegrid().getStore(), priceType);
			if (!validasiTagihan['hasil']) {
				me.tools.alert.warning(validasiTagihan['msg']);
				return;
			}
		}

		// addon 20180709
		var totalAmount = 0;
		me.getSchedulegrid().getStore().each(function (rec) {
			if (rec != null) {
				var amn = parseFloat(accounting.toFixed(rec.get("amount"), 2));
				totalAmount += amn;
			}
		});
		var totalHargaJual = accounting.unformat(me.getFormdata().down("[name=pricenew_harga_total_jual]").getValue());

		if (Math.abs(parseFloat(accounting.toFixed(totalHargaJual, 2)) - parseFloat(accounting.toFixed(totalAmount, 2))) > 0) { // cek jika ada perbedaan jumlah tagihan dengan total jual
			me.tools.alert.warning("Total amount tagihan tidak sesuai. Silahkan dicek kembali tagihan yang digenerate.");
			return;
		}
		// end addon 20180709

		////// Added Erwin.St 21/09/2020 /////
		if (m == '') {
			var lebih_tanah               = me.getFormdata().down("[name=baru_kelebihan]").getValue();
			var kelebihan_tanah           = accounting.unformat(lebih_tanah);
			var mtr_harga_kelebihan_tanah = accounting.unformat(me.getFormdata().down("[name=pricenew_kelebihantanah]").getValue());
			var jml_harga_kelebihan_tanah = accounting.unformat(me.getFormdata().down("[name=pricenew_harga_kelebihantanah]").getValue());

			if ((kelebihan_tanah != '' && kelebihan_tanah > 0) && (mtr_harga_kelebihan_tanah == '' || mtr_harga_kelebihan_tanah == 0 || jml_harga_kelebihan_tanah == '' || jml_harga_kelebihan_tanah == 0)) {
				me.tools.alert.warning("Silahkan mengisi harga tanah , karena ada kelebihan tanah " + lebih_tanah + " m2.");
				return;
			}
		}
		////////////////////////////////////

		var tglvalidasi = me.getFormdata().down("[name=tanggal_validasi]").getValue();
		var hsltglvalidasi = 0
		if (tglvalidasi > 0) {
			var g = me.getSchedulegrid();
			var s = g.getStore();

			s.each(function (rec) {
				if (rec != null) {
					if (accounting.unformat(rec.data.amount) == accounting.unformat(rec.data.remaining_balance)) {
						var date = new Date(rec.data.duedate);
						date.getDate();
						if (date.getDate() !== tglvalidasi) {
							hsltglvalidasi += 1
						}
					}
				}
			});

			if (hsltglvalidasi > 0) {
				me.tools.alert.warning("tanggal di schedule tidak sesuai dengan tanggal yang di pilih");
				return;
			}
		}

		me.insSave({
			form      : me.getFormdata(),
			grid      : me.getGrid(),
			store     : me.localStore.detail,
			finalData : function (data) {
				var f = me.getFormdata();

				console.log(me.localStore.selectedSoldUnit)
				console.log(me.localStore.selectedNewUnit)

				if (m !== "") {
					data["approvemode"] = m;
				} 
				else { // save new record
					data["purchaseletter01_id"] = me.localStore.selectedSoldUnit.getAt(0).get("purchaseletter_id");
					data["purchaseletter02_id"] = me.localStore.selectedNewUnit.getAt(0).get("purchaseletter_id");
				}

				// format semua xmoneyfield
				for (var i in data) {
					var el = f.down("[name=" + i + "]");
					if (el) {
						if (el.getXType() === 'xmoneyfieldEST') {
							data[i] = accounting.unformat(data[i]);
						}
					}
				}

				data["detail"] = me.tools.gridHelper(me.getSchedulegrid()).getJson();

				data["purchaseletter_rencana_serahterima"]      = data["rencana_serahterima"];
				data["purchaseletter_rencana_serahterima_date"] = data["rencana_serahterima_date"];
				data["pricenew_harga_dischargedasar"]           = accounting.unformat(data["pricenew_harga_dischargedasar"]);
				data["pricenew_harga_dischargetanah"]           = accounting.unformat(data["pricenew_harga_dischargetanah"]);
				data["pricenew_harga_dischargebangunan"]        = accounting.unformat(data["pricenew_harga_dischargebangunan"]);
				data["is_used_verification"]                    = me.setParamPK.isUsedVerification;

				data["addonparams"] = {
					isEditTanahpermeter          : me.setParamPK.calculator.isEditTanahpermeter,
					isEditTotaltanah             : me.setParamPK.calculator.isEditTotaltanah,
					isEditKelebihantanahpermeter : me.setParamPK.calculator.isEditKelebihantanahpermeter,
					isEditTotalkelebihantanah    : me.setParamPK.calculator.isEditTotalkelebihantanah,
					isEditPersenPPNTanah         : me.setParamPK.calculator.isEditPersenPPNTanah,
					isEditAmountPPNTanah         : me.setParamPK.calculator.isEditAmountPPNTanah,
					isEditPersenPPNBangunan      : me.setParamPK.calculator.isEditPersenPPNBangunan,
					isEditAmountPPNBangunan      : me.setParamPK.calculator.isEditAmountPPNBangunan,
					isEditPersenPPNBM            : me.setParamPK.calculator.isEditPersenPPNBM,
					isEditAmountPPNBM            : me.setParamPK.calculator.isEditAmountPPNBM,
					isEditPersenPPH22            : me.setParamPK.calculator.isEditPersenPPH22,
					isEditAmountPPH22            : me.setParamPK.calculator.isEditAmountPPH22,
					isEditAmountBBNSertifikat    : me.setParamPK.calculator.isEditAmountBBNSertifikat,
					isEditAmountBPHTB            : me.setParamPK.calculator.isEditAmountBPHTB,
					isEditAmountBAJB             : me.setParamPK.calculator.isEditAmountBAJB,
				}

				return data;
			},
			sync     : true,
			callback : {
				create : function (store, form, grid) {
				}
			}
		});
	},
	priceTypeOnSelect: function () {
		var me = this;
		var f = me.getFormdata();
		var p = f.down("[name=pricetype_pricetype_id]").getValue();
		var s = me.localStore.price;
		var r = s.findRecord("pricetype_id", p);

		var e = null;
		for (var i in r.data) {
			e = f.down("[name=pricenew_" + i + "]");
			if (e) {
				e.setValue(r.data[i]);
			}
		}

		if (me.setParamPK.verifikasiDiskonInfo) {
			var vdi = me.setParamPK.verifikasiDiskonInfo;

			me.setParamPK.calculator.discount = {
				basic : {
					value  : vdi.diskonhargadasar_jenis == 1 ? vdi.diskonhargadasar_nilai : 0,
					amount : vdi.diskonhargadasar_jenis == 2 ? vdi.diskonhargadasar_nilai : 0,
					jenis  : vdi.diskonhargadasar_jenis
				},
				land : {
					value  : vdi.diskonhargatanah_jenis == 1 ? vdi.diskonhargatanah_nilai : 0,
					amount : vdi.diskonhargatanah_jenis == 2 ? vdi.diskonhargatanah_nilai : 0,
					jenis  : vdi.diskonhargatanah_jenis
				},
				building : {
					value  : vdi.diskonhargabangunan_jenis == 1 ? vdi.diskonhargabangunan_nilai : 0,
					amount : vdi.diskonhargabangunan_jenis == 2 ? vdi.diskonhargabangunan_nilai : 0,
					jenis  : vdi.diskonhargabangunan_jenis
				}
			};

			me.setParamPK.calculatorDiscount.discount = me.setParamPK.calculator.discount;
			me.setParamPK.calculatorDiscount.calculate();

			// var disc_hargadasar_nilai    = typeof vdi.diskonhargadasar_nilai != 'undefined' ? parseFloat(vdi.diskonhargadasar_nilai) : 0;
			// var disc_hargatanah_nilai    = typeof vdi.diskonhargatanah_nilai != 'undefined' ? parseFloat(vdi.diskonhargatanah_nilai) : 0;
			// var disc_hargabangunan_nilai = typeof vdi.diskonhargabangunan_nilai != 'undefined' ? parseFloat(vdi.diskonhargabangunan_nilai) : 0;

			// var harga_tanah          = parseFloat(accounting.toFixed(accounting.unformat(f.down("[name=pricenew_harga_tanah]").getValue()), 2));
			// var harga_kelebihantanah = parseFloat(accounting.toFixed(accounting.unformat(f.down("[name=pricenew_harga_kelebihantanah]").getValue()), 2));

			// var tot_harga_tanah      = harga_tanah + harga_kelebihantanah;
			// var tot_harga_bangunan   = parseFloat(accounting.toFixed(accounting.unformat(f.down("[name=pricenew_harga_bangunan]").getValue()), 2));
			// var tot_harga_jual_dasar = parseFloat(accounting.toFixed(accounting.unformat(f.down("[name=pricenew_harga_jualdasar]").getValue()), 2));

			// if(vdi.diskonhargadasar_jenis == 1){ /// tipe persen
			// 	var disc_amount_harga_dasar = me.setParamPK.typeRounding.rounding(me.setParamPK.typeCalculaterounding, ((disc_hargadasar_nilai / 100) * tot_harga_jual_dasar));
			// 	var disc_persen_harga_dasar = accounting.toFixed(disc_hargadasar_nilai, 2);
			// }
			// else{
			// 	var disc_amount_harga_dasar = me.setParamPK.typeRounding.rounding(me.setParamPK.typeCalculaterounding, disc_hargadasar_nilai);
			// 	var disc_persen_harga_dasar = accounting.toFixed((disc_hargadasar_nilai / tot_harga_jual_dasar) * 100, 2);
			// }
			// f.down("[name=pricenew_persen_dischargedasar]").setValue(accounting.formatMoney(disc_persen_harga_dasar));
			// f.down("[name=pricenew_harga_dischargedasar]").setValue(accounting.formatMoney(disc_amount_harga_dasar));


			// if(vdi.diskonhargatanah_jenis == 1){ /// tipe persen
			// 	var disc_amount_harga_tanah = me.setParamPK.typeRounding.rounding(me.setParamPK.typeCalculaterounding, ((disc_hargatanah_nilai / 100) * tot_harga_tanah));
			// 	var disc_persen_harga_tanah = accounting.toFixed(disc_hargatanah_nilai, 2);	
			// }
			// else{
			// 	var disc_amount_harga_tanah = me.setParamPK.typeRounding.rounding(me.setParamPL.typeCalculaterounding, disc_hargatanah_nilai);
			// 	var disc_persen_harga_tanah = accounting.toFixed((disc_hargatanah_nilai / tot_harga_tanah) * 100, 2);	
			// }
			// f.down("[name=pricenew_persen_dischargetanah]").setValue(accounting.formatMoney(disc_persen_harga_tanah));
			// f.down("[name=pricenew_harga_dischargetanah]").setValue(accounting.formatMoney(disc_amount_harga_tanah));


			// if(vdi.diskonhargabangunan_jenis == 1){ /// tipe persen
			// 	var disc_amount_harga_bangunan = me.setParamPK.typeRounding.rounding(me.setParamPK.typeCalculaterounding, ((disc_hargabangunan_nilai / 100) * tot_harga_bangunan));
			// 	var disc_persen_harga_bangunan = accounting.toFixed(disc_hargabangunan_nilai, 2);	
			// }
			// else{
			// 	var disc_amount_harga_bangunan = me.setParamPK.typeRounding.roundlib.rounding(me.setParamPK.typeCalculaterounding, disc_hargabangunan_nilai);
			// 	var disc_persen_harga_bangunan = accounting.toFixed((disc_hargabangunan_nilai / tot_harga_bangunan) * 100, 2);
			// }
			// f.down("[name=pricenew_persen_dischargebangunan]").setValue(accounting.formatMoney(disc_persen_harga_bangunan));
			// f.down("[name=pricenew_harga_dischargebangunan]").setValue(accounting.formatMoney(disc_amount_harga_bangunan));

			// //////////////////////////////////////////////////////

			// var harga_ppn_tanah = (parseFloat(accounting.toFixed(accounting.unformat(f.down("[name=pricenew_persen_ppntanah]").getValue()), 2)) / 100) * (parseFloat(tot_harga_tanah) - parseFloat(disc_amount_harga_tanah));
			// f.down('[name=pricenew_harga_ppntanah]').setValue(accounting.formatMoney(me.setParamPK.typeRounding.rounding(me.setParamPK.typeCalculaterounding, harga_ppn_tanah)));

			// var harga_ppn_bangunan = (parseFloat(accounting.toFixed(accounting.unformat(f.down("[name=pricenew_persen_ppnbangunan]").getValue()), 2)) / 100) * (parseFloat(tot_harga_bangunan) - parseFloat(disc_amount_harga_bangunan));
			// f.down('[name=pricenew_harga_ppnbangunan]').setValue(accounting.formatMoney(me.setParamPK.typeRounding.rounding(me.setParamPK.typeCalculaterounding, harga_ppn_bangunan)));

			// var netto = parseFloat(tot_harga_jual_dasar) - parseFloat(disc_amount_harga_dasar) - parseFloat(disc_amount_harga_tanah) - parseFloat(disc_amount_harga_bangunan);

			// var harga_ppnbm = (parseFloat(accounting.unformat(f.down("[name=pricenew_persen_ppnbm]").getValue())) / 100) * parseFloat(netto);
			// f.down("[name=pricenew_harga_ppnbm]").setValue(accounting.formatMoney(me.setParamPK.typeRounding.rounding(me.setParamPK.typeCalculaterounding, harga_ppnbm)));

			// var harga_pph22 = (parseFloat(accounting.unformat(f.down("[name=pricenew_persen_pph22]").getValue())) / 100) * parseFloat(netto);
			// f.down("[name=pricenew_harga_pph22]").setValue(accounting.formatMoney(me.setParamPK.typeRounding.rounding(me.setParamPK.typeCalculaterounding, harga_pph22)));

			// console.log(vdi)

			// if (vdi.diskonhargadasar_jenis === 2) {
			// 	f.down("[name=pricenew_harga_dischargedasar]").setValue(vdi.diskonhargadasar_nilai);
			// 	me.setParamPK.processor.discountAwal.basic.amount = vdi.diskonhargadasar_nilai;
			// } 
			// else {
			// 	var harga_jual_dasar = accounting.toFixed(accounting.unformat(f.down("[name=pricenew_harga_jualdasar]").getValue()), 2);

			// 	me.setParamPK.processor.discountAwal.basic.value = vdi.diskonhargadasar_nilai;
			// 	var persen = vdi.diskonhargadasar_nilai;
			// 	var hasil  = persen / 100 * parseFloat(harga_jual_dasar);

			// 	f.down("[name=pricenew_harga_dischargedasar]").setValue(accounting.formatMoney(hasil));
			// 	f.down("[name=pricenew_persen_dischargedasar]").setValue(accounting.formatMoney(vdi.diskonhargadasar_nilai));

			// 	me.setParamPK.processor.discountAwal.basic.amount = hasil;
			// }

			// if (vdi.diskonhargatanah_jenis === 2) {
			// 	me.setParamPK.processor.discountAwal.land.amount = vdi.diskonhargatanah_nilai;
			// 	f.down("[name=pricenew_harga_dischargetanah]").setValue(vdi.diskonhargatanah_nilai);
			// } 
			// else {
			// 	var harga_jual_dasar = accounting.toFixed(accounting.unformat(f.down("[name=pricenew_harga_tanah]").getValue()), 2);

			// 	me.setParamPK.processor.discountAwal.land.value = vdi.diskonhargatanah_nilai;
			// 	var persen = vdi.diskonhargatanah_nilai;
			// 	var hasil = persen / 100 * harga_jual_dasar;

			// 	f.down("[name=pricenew_harga_dischargetanah]").setValue(accounting.formatMoney(hasil));
			// 	f.down("[name=pricenew_persen_dischargetanah]").setValue(vdi.diskonhargatanah_nilai);
				
			// 	me.setParamPK.processor.discountAwal.land.amount = hasil;
			// }

			// if (vdi.diskonhargabangunan_jenis === 2) {
			// 	me.setParamPK.processor.discountAwal.building.amount = vdi.diskonhargadasar_nilai;
			// 	f.down("[name=pricenew_harga_dischargebangunan]").setValue(vdi.diskonhargabangunan_nilai);
			// } 
			// else {
			// 	var harga_jual_dasar = accounting.toFixed(accounting.unformat(f.down("[name=pricenew_harga_bangunan]").getValue()), 2);

			// 	me.setParamPK.processor.discountAwal.building.value = vdi.diskonhargabangunan_nilai;
			// 	var persen = vdi.diskonhargabangunan_nilai;
			// 	var hasil = persen / 100 * harga_jual_dasar;

			// 	f.down("[name=pricenew_harga_dischargebangunan]").setValue(accounting.formatMoney(hasil));
			// 	f.down("[name=pricenew_persen_dischargebangunan]").setValue(accounting.formatMoney(vdi.diskonhargabangunan_nilai));

			// 	me.setParamPK.processor.discountAwal.building.amount = hasil;
			// }
		}

		me.setParamPK.processor.priceTypeId = p;
		me.setParamPK.calculator.typeCalculaterounding = me.setParamPK.typeCalculaterounding; /// Add by Erwin.St 09022022
		me.setParamPK.calculator.calculate(f.down("[name=plnew_harga_administrasi]"));

		f.down("#btnSave").setDisabled(false);
		me.setAllformatmoney();
	},
	cekApproval: function () {
		var me = this;
		var g  = me.getSoldunitgrid();
		var gs = g.getStore();
		var p  = g.getSelectedRow();
		var d  = gs.getAt(p)
		var f  = me.getFormdata();

		if(p >= 0){
			Ext.Ajax.request({
				url    : 'erems/pindahkavling/read',
				params : {
					purchaseletter_id : d.data.purchaseletter_purchaseletter_id,
					mode_read         : 'voucherPending'
				},
				success: function (vcrpend) {
					var vcrchk = JSON.parse(vcrpend.responseText)
					if (vcrchk.jumlah_voucher > 0) {
						me.tools.alert.warning("Perubahan tidak dapat di lakukan karena ada voucher gantung, mohon di hapus / di realisasi terlebih dahulu.");
						f.setLoading(false);
					} 
					else {
						if (me.setParamPK.verification_approval) {
							Ext.Ajax.request({
								url    : 'erems/pindahkavling/read',
								params : {
									purchaseletter_id : d.data.purchaseletter_purchaseletter_id,
									verification_code : 'PB',
									mode_read         : 'verificationapproval'
								},
								success : function (response) {
									var obj = JSON.parse(response.responseText)
									if (obj.totalRow > 0) {
										if (obj.data[0]['is_approve'] > 0) {
											me.unitSoldSelect()
											me.setParamPK.isUsedVerification = true
										} 
										else {
											me.tools.alert.warning("Verifikasi Belum Diapprove.");
											f.setLoading(false);
										}
									} 
									else {
										me.tools.alert.warning("Verifikasi Persetujuan Belum Dibuat.");
										f.setLoading(false);
									}
								}
							})
						} 
						else {
							me.unitSoldSelect()
						}
					}
				}
			});
		}
	},
	unitSoldSelect: function () {
		var me = this;
		if (me.browseHandler) {
			me.browseHandler.selectItem(function (rec) {

				var f = me.getFormdata();

				f.down("[name=price_persen_dischargedasar]").setValue(rec.get("price_persen_dischargadasar"));
				f.down("[name=price_harga_dischargedasar]").setValue(rec.get("price_harga_dischargadasar"));
				f.down("[name=price_persen_dischargetanah]").setValue(rec.get("price_persen_dischargatanah"));
				f.down("[name=price_harga_dischargetanah]").setValue(rec.get("price_harga_dischargatanah"));
				f.down("[name=price_persen_dischargebangunan]").setValue(rec.get("price_persen_dischargabangunan"));
				f.down("[name=price_harga_dischargebangunan]").setValue(rec.get("price_harga_dischargabangunan"));


				var fs = me.getSoldunitgrid().up("form");
				//f.setLoading("Check revision...");
				me.tools.ajax({
					params  : { purchaseletter_id : rec.get("purchaseletter_id") },
					success : function (schdata, schmodel) {

						var tigaSekawanAnCancel = schdata['others'][0][0]['TIGASEKAWANANDCANCEL'];
						if (tigaSekawanAnCancel.length === 0) {
							f.down("[name=city_city_name]").setValue(rec.get("city_city_name"));
							me.mt.customerPhoto(f.down("#photo_image"), rec.get("customer_photo"), me.myConfig.IMG_FOLDER);
							f.down("[name=purchaseletter_purchase_date]").setValue(rec.get("purchase_date"));
							f.down("[name=purchaseletter_purchaseletter_no]").setValue(rec.get("purchaseletter_no"));
							f.down("[name=pt_name]").setValue(rec.get("pt_name"));
							me.setParamPK.processor.plDate = f.down("[name=purchaseletter_purchase_date]").getValue();
						} 
						else {
							var teksWarning = "";
							var count = 0;
							for (var i = 0; i < tigaSekawanAnCancel.length; i++) {
								teksWarning += "[" + (count + 1) + "] " + tigaSekawanAnCancel[i]["teks"] + " pada tanggal " + moment(tigaSekawanAnCancel[i]["change_date"]).format("DD-MM-YYYY") + " oleh " + tigaSekawanAnCancel[i]["user_fullname"]
								count++;
							}
							alert("Terdapat revisi sebagai berikut : " + teksWarning + " . Silahkan di approve terlebih dahulu.");

							f.getForm().reset();
							me.getSchedulegrid().getStore().loadData([], false);
						}
					}
				}).read("checkrevisi");

				f.down("[name=city_city_name]").setValue(rec.get("city_city_name"));
				me.mt.customerPhoto(f.down("#photo_image"), rec.get("customer_photo"), me.myConfig.IMG_FOLDER);
				f.down("[name=purchaseletter_purchaseletter_no]").setValue(rec.get("purchaseletter_no"));
				f.down("[name=plnew_notes]").setValue(rec.get("notes"));

				me.setParamPK.currentPurchaseletterId = 0;
				me.setParamPK.currentPurchaseletterId = rec.get("purchaseletter_id");
			});
		}
	},
	/*==unit new unit =*/
	unitStockSelect: function () {
		var me = this;

		if (me.browseHandler) {
			me.browseHandler.selectItem(function (rec) {

				//START: CHECK UNIT
				//by: David 19/12/17
				//check unit available not in booking state
				me.getFormdata().setLoading("Please wait...");

				var unitId = rec.get("unit_id");

				me.tools.interAjax({
					params  : {unitId: unitId},
					success : function (data) {
						if (data.length !== undefined) {
							var f      = me.getFormdata();
							var unitId = rec.get("unit_id");

							var e = null;
							for (var i in rec.data) {
								e = f.down("[name=baru_" + i + "]");
								if (e) {
									e.setValue(rec.data[i]);
								}
							}

							f.down("[name=unitbaru_unit_id]").setValue(unitId);

							me.localStore.price = me.instantStore({
								id          : me.controllerName + 'UnitPriceStore',
								extraParams : { mode_read : 'price' },
								idProperty  : 'price_id'
							});
							me.getFormdata().setLoading("Sedang mengambil informasi harga...");

							me.localStore.price.load({
								params   : { unit_id : unitId },
								callback : function (rec, op) {
									var f = me.getFormdata();
									me.attachModel(op, me.localStore.price, true);

									me.setterReadonly(f, ['pricetype_pricetype_id'], false);

									me.setParamPK.verifikasiDiskonInfo = null;
									if (me.setParamPK.globalParams) {
										var gp = me.setParamPK.globalParams;

										me.getFormdata().setLoading("Sedaing mengambil informasi diskon...");

										me.tools.ajax({
											params  : { unit_id : unitId },
											success : function (avdata, avmodel) {
												if (avdata.others[0][0]['DISCOUNT_VERIFIED']) {
													me.setParamPK.verifikasiDiskonInfo = avdata.others[0][0]['DATA'];
												}

												me.discountInput().enable({
													globalParams : gp,
													isReadOnly   : !avdata.others[0][0]['DISCOUNT_VERIFIED']
												});

												me.priceTypeOnSelect();
												me.getFormdata().setLoading(false);

												me.setAllformatmoney();
											}
										}).read('cekapprovalverification');
									}
								}
							});
						} 
						else {
							var dt = data['others'][0][0];
							var customer_name = dt['customer_name'];
							var reservation_date = dt['reservation_date'];
							var reservation_date_until = dt['reservation_date_until'];
							var msg = "Sudah di-<i>Boooking</i> !";
							msg = msg + "<br>Nama Customer : " + customer_name;
							msg = msg + "<br>Tanggal <i>Boooking</i> : " + reservation_date;
							msg = msg + "<br>Sampai dengan : " + reservation_date_until;
							me.tools.alert.warning(msg);
							me.getFormdata().setLoading(false);
							return false;
						}
					}
				}
				).read('reservation', 'checkAvailableUnit'); //controller name, action
				//END: CHECK UNIT
			});
		}
	},
	discountInput: function () {
		var me = this;
		var f  = me.getFormdata();

		var x = {
			getFields : function () {
				var fields = ["pricenew_persen_dischargedasar", "pricenew_harga_dischargedasar", "pricenew_persen_dischargetanah", "pricenew_harga_dischargetanah", "pricenew_persen_dischargebangunan", "pricenew_harga_dischargebangunan"];
				return fields;
			},
			enable : function (params) {
				var isEnable = me.tools.intval(params.globalParams.PURCHASELETTER_ENABLE_DISCOUNT_APPROVAL);
				var fields   = this.getFields();
				if (isEnable) {
					/// disable first
					for (var i in fields) {
						me.setterReadonly(f, [fields[i]], params.isReadOnly);
					}
				}
			}
		};

		return x;
	},
	browseStockedUnit: function (el) {
		var me = this;
		var browse = new Erems.library.Browse();
		browse.init({
			controller       : me,
			view             : 'UnitStockGrid',
			el               : el,
			localStore       : "selectedNewUnit",
			mode_read        : "selectedunit",
			loadRecordPrefix : "baru_"
		});
		browse.showWindow();
	},
	browseSoldUnit: function (el) {
		var me = this;
		var browse = new Erems.library.Browse();
		browse.init({
			controller : me,
			view       : 'UnitSoldGrid',
			el         : el,
			localStore : "selectedSoldUnit",
			mode_read  : "selectedsoldunit",
		});
		browse.selectItemFinalData = function (rec) {
			return {
				purchaseletter_id : rec.get("purchaseletter_purchaseletter_id")
			};
		};
		browse.showWindow();
	},
	fdar: function () {
		var me = this;
		var f  = me.getFormdata();
		var sg = me.getSchedulegrid();
		me.mt  = new Erems.library.ModuleTools();

		var x = {
			init: function () {

				me.setActiveForm(f);
				sg.doInit();

				me.setParamPK.calculatorDiscount.form   = f;
				me.setParamPK.calculatorDiscount.fields = {
					amount_harga_tanah           : 'pricenew_harga_tanah',
					amount_harga_kelebihan_tanah : 'pricenew_harga_kelebihantanah',
					amount_harga_bangunan        : 'pricenew_harga_bangunan',
					amount_harga_jual_dasar      : 'pricenew_harga_jualdasar',
					persen_disc_harga_dasar      : 'pricenew_persen_dischargedasar',
					amount_disc_harga_dasar      : 'pricenew_harga_dischargedasar',
					persen_disc_harga_tanah      : 'pricenew_persen_dischargetanah',
					amount_disc_harga_tanah      : 'pricenew_harga_dischargetanah',
					persen_disc_harga_bangunan   : 'pricenew_persen_dischargebangunan',
					amount_disc_harga_bangunan   : 'pricenew_harga_dischargebangunan',
					persen_ppn_tanah             : 'pricenew_persen_ppntanah',
					amount_ppn_tanah             : 'pricenew_harga_ppntanah',
					persen_ppn_bangunan          : 'pricenew_persen_ppnbangunan',
					amount_ppn_bangunan          : 'pricenew_harga_ppnbangunan',
					persen_ppnbm                 : 'pricenew_persen_ppnbm',
					amount_ppnbm                 : 'pricenew_harga_ppnbm',
					persen_pph22                 : 'pricenew_persen_pph22',
					amount_pph22                 : 'pricenew_harga_pph22'
				};

				/* added 16 March 2017*/
				var myStrFunc = 'me.setParamPK.processor = new Erems.library.' + me.setParamPK.purchaseletterJs + '()';
				eval(myStrFunc);

				me.setParamPK.processor.prolibsFile = me.setParamPK.prolibsFile;
				me.setParamPK.processor.setForm(me.getFormdata());
				me.setParamPK.processor.setC(me);
				me.setParamPK.processor.setScheduleGrid(me.getSchedulegrid());

				me.setParamPK.processor.fields.total                = 'pricenew_harga_total_jual';
				me.setParamPK.processor.fields.jual                 = 'pricenew_harga_jual';
				me.setParamPK.processor.fields.salesDiscountPercent = 'plnew_persen_salesdisc';
				me.setParamPK.processor.fields.salesDiscountAmount  = 'pricenew_harga_salesdisc';
				me.setParamPK.processor.fields.biayaAdmin           = "plnew_harga_administrasi";
				me.setParamPK.processor.fields.biayaPaketTambahan   = "plnew_harga_paket_tambahan";
				me.setParamPK.processor.fields.biayaAdminSubsidi    = "plnew_harga_admsubsidi";
				me.setParamPK.processor.fields.biayaAsuransi        = "plnew_biaya_asuransi";
				me.setParamPK.processor.fields.hargaPembulatan      = "plnew_harga_pembulatan";
				me.setParamPK.processor.is_balloon                  = 0;
				me.setParamPK.processor.is_ppndtp                   = 0;
				me.setParamPK.processor.typeCalculaterounding       = me.setParamPK.typeCalculaterounding;


				var cf = new Erems.library.CalculatorFields();
				cf.fields = {
					width                       : 'baru_width',
					long                        : 'baru_long',
					land_size                   : 'baru_land_size',
					kelebihan                   : 'baru_kelebihan',
					_harga_tanah_a              : 'pricenew_tanahpermeter',
					_harga_tanah_b              : 'pricenew_harga_tanah',
					_harga_kelebihan_a          : 'pricenew_kelebihantanah',
					_harga_kelebihan_b          : 'pricenew_harga_kelebihantanah',
					_harga_bangunan             : 'pricenew_harga_bangunan',
					_harga_jual_dasar           : 'pricenew_harga_jualdasar',
					_disc_harga_dasar           : 'pricenew_persen_dischargedasar',
					_tot_disc_harga_dasar       : 'pricenew_harga_dischargedasar',
					_disc_harga_tanah           : 'pricenew_persen_dischargetanah',
					_tot_disc_harga_tanah       : 'pricenew_harga_dischargetanah',
					_disc_harga_bangunan        : 'pricenew_persen_dischargebangunan',
					_tot_disc_harga_bangunan    : 'pricenew_harga_dischargebangunan',
					_harga_netto                : 'pricenew_harga_neto',
					_ppn_tanah                  : 'pricenew_persen_ppntanah',
					_tot_ppn_tanah              : 'pricenew_harga_ppntanah',
					_ppn_ppnbm                  : 'pricenew_persen_ppnbm',
					_ppn_pph22                  : 'pricenew_persen_pph22',
					_tot_ppn_ppnbm              : 'pricenew_harga_ppnbm',
					_tot_ppn_pph22              : 'pricenew_harga_pph22',
					_ppn_bangunan               : 'pricenew_persen_ppnbangunan',
					_tot_ppn_bangunan           : 'pricenew_harga_ppnbangunan',
					_harga_balik_nama           : 'pricenew_harga_bbnsertifikat',
					_harga_bphtb                : 'pricenew_harga_bphtb',
					_harga_bajtb                : 'pricenew_harga_bajb',
					_biaya_administrasi         : 'plnew_harga_administrasi',
					_biaya_administrasi_subsidi : 'plnew_harga_admsubsidi',
					_biaya_p_mutu               : 'plnew_harga_pmutu',
					_biaya_paket_tambahan       : 'plnew_harga_paket_tambahan',
					_disc_sales                 : 'plnew_persen_salesdisc',
					_biaya_asuransi             : 'plnew_biaya_asuransi',
					_tot_disc_sales             : 'pricenew_harga_salesdisc',
					_total                      : 'pricenew_harga_jual',
					_total_jual                 : 'pricenew_harga_total_jual',
					_harga_pembulatan           : 'plnew_harga_pembulatan'
				};

				me.setParamPK.calculator = new Erems.library.Calculator({ fields : cf.fields, form : me.getFormdata() });
				me.setParamPK.calculator.discountVerified = false;
				me.setParamPK.calculator.setSP(me.setParamPK.processor);

				me.localStore.detail = me.instantStore({
					id          : me.controllerName + 'CKDetailStore',
					extraParams : { mode_read : 'maindetail' },
					idProperty  : 'changekavling_id'
				});
			},
			create: function () {
				me.setParamPK.currentPurchaseletterId = 0;

				f.down("button[action=reject]").hide();
				f.down("button[action=approve]").hide();

				sg.down("[action=reschedule]").setVisible(false);

				me.tools.ajax({
					params  : {},
					success : function (data, model) {
						me.setParamPK.processor.schedulePembulatan = data['others'][0][0]['SCHEDULE_PEMBULATAN'];

						var gp = data['others'][0][0]['GLOBALPARAMSPARAMS'];
						if (gp) {
							me.setParamPK.globalParams = gp;
						}

						me.fillFormComponents(data, f);

						me.localStore.detail.load({
							params   : { changekavling_id : 0 },
							callback : function (rec, op) {
								me.attachModel(op, me.localStore.detail, false);
								me.tools.ajax({
									params  : { purchaseletter_id : 0 },
									success : function (schdata, schmodel) {
										me.tools.wesea({
											data  : schdata,
											model : schmodel
										}, sg).grid();
										f.setLoading(false);
									}
								}).read('schedule');
							}
						});
					}
				}).read('detail');

				if (apps.subholdingSub.trim() == "sh3b") {
					f.down('[name=tanggal_validasi]').show()
				}
			},
			update: function (state) {
				var plId     = me.getGrid().getSelectedRecord().get("changekavling_id");
				var rejected = me.getGrid().getSelectedRecord().get("purchaseletterrevision_is_rejected");
				var approve  = me.getGrid().getSelectedRecord().get("purchaseletterrevision_is_approve");

				sg.down("[action=reschedule]").setVisible(false);

				f.setLoading("Please wait ...");

				f.editedRow = me.getGrid().getSelectedRow();
				f.down("button[action=save]").hide();
				f.down("button[action=reject]").hide();
				f.down("button[action=approve]").hide();


				f.down("button[action=genschedule]").setDisabled(true);
				f.down("button[action=browse_unit]").setDisabled(true);
				f.down("button[action=browse_unit_baru]").setDisabled(true);
				// f.down("button[action=create_new_customer]").setDisabled(true);
				f.down("button[action=genschedule]").setDisabled(true);
				me.tools.ajax({
					params  : {},
					success : function (data, model) {
						me.setParamPK.processor.schedulePembulatan = data['others'][0][0]['SCHEDULE_PEMBULATAN'];

						var gp = data['others'][0][0]['GLOBALPARAMSPARAMS'];
						if (gp) {
							me.setParamPK.globalParams = gp;
						}

						f.down("[name=pt_name]").setValue(data['others'][0][0]['PT_NAME']);

						if (data['others'][0][0]["APPROVALUSER"] && me.tools.intval(data['others'][0][0]["GLOBALPARAMSPARAMS"]["CHANGEKAVLING_APPROVAL"]) == 1) {
							if (approve) {
							} 
							else if (rejected) {
							} 
							else {
								f.down("button[action=reject]").show();
								f.down("button[action=approve]").show();
							}
						}

						me.fillFormComponents(data, f);
						f.setLoading("Loading change kavling information ...");
						var detailData = data;
						me.localStore.detail.load({
							params   : { changekavling_id : plId },
							callback : function (rec, op) {
								me.attachModel(op, me.localStore.detail, false);
								var oneRec = me.localStore.detail.getAt(0);
								
								f.loadRecord(oneRec);

								var vs = f.getValues();
								for (var x in vs) {
									var el = f.down("#newPriceBoxId").down("[name=" + x + "]");
									if (el) {
										me.setterReadonly(f, [el.name], true);
									}

									el2 = f.down("#billingInformationBoxId").down("[name=" + x + "]");
									if (el2) {
										me.setterReadonly(f, [el2.name], true);
									}
								}

								me.setterReadonly(f, ['pricetype_pricetype_id'], true);

								f.down("[name=purchaseletter_purchase_date]").setValue(oneRec.get("purchaseletter_purchase_date"));
								f.down("[name=purchaseletter_no]").setValue(oneRec.get("purchaseletter_purchaseletter_no"));
								f.down("[name=baru_purchaseletter_no]").setValue(oneRec.get("plnew_purchaseletter_no"));

								f.down("[name=pricenew_harga_total_jual]").setValue(oneRec.get("plnew_harga_total_jual"));
								f.down("[name=harga_total_jual]").setValue(oneRec.get("purchaseletter_harga_total_jual"));
								f.down("[name=persen_salesdisc]").setValue(oneRec.get("priceadmin_persen_salesdisc"));
								f.down("[name=harga_salesdisc]").setValue(oneRec.get("priceadmin_harga_salesdisc"));
								f.down("[name=plnew_persen_salesdisc]").setValue(oneRec.get("priceadminbaru_persen_salesdisc"));
								f.down("[name=pricenew_harga_salesdisc]").setValue(oneRec.get("priceadminbaru_harga_salesdisc"));
								f.down("[name=plnew_harga_administrasi]").setValue(oneRec.get("priceadminbaru_harga_administrasi"));
								f.down("[name=plnew_harga_admsubsidi]").setValue(oneRec.get("priceadminbaru_harga_admsubsidi"));
								f.down("[name=plnew_harga_pmutu]").setValue(oneRec.get("priceadminbaru_harga_pmutu"));
								f.down("[name=plnew_harga_paket_tambahan]").setValue(oneRec.get("priceadminbaru_harga_paket_tambahan"));
								f.down("[name=harga_administrasi]").setValue(oneRec.get("priceadmin_harga_administrasi"));
								f.down("[name=harga_admsubsidi]").setValue(oneRec.get("priceadmin_harga_admsubsidi"));
								f.down("[name=harga_pmutu]").setValue(oneRec.get("priceadmin_harga_pmutu"));
								f.down("[name=harga_paket_tambahan]").setValue(oneRec.get("priceadmin_harga_paket_tambahan"));

								f.down("[name=rencana_serahterima]").setValue(oneRec.get("plnew_rencana_serahterima"));
								f.down("[name=rencana_serahterima_date]").setValue(oneRec.get("plnew_rencana_serahterima_date"));

								f.down("[name=biaya_asuransi]").setValue(oneRec.get("priceadmin_biaya_asuransi"));
								f.down("[name=plnew_biaya_asuransi]").setValue(oneRec.get("priceadminbaru_biaya_asuransi"));

								f.down("[name=pricenew_harga_dischargedasar]").setValue(accounting.formatMoney(oneRec.get("pricenew_harga_dischargedasar")));
								f.down("[name=pricenew_harga_dischargetanah]").setValue(accounting.formatMoney(oneRec.get("pricenew_harga_dischargetanah")));
								f.down("[name=pricenew_harga_dischargebangunan]").setValue(accounting.formatMoney(oneRec.get("pricenew_harga_dischargebangunan")));

								// unit baru 
								var data = oneRec.data;
								for (var x in data) {
									if (x.indexOf("unitbaru_") > -1) {
										var field = x.replace("unitbaru_", "baru_");
										var el = f.down("[name=" + field + "]");
										if (el) {
											el.setValue(data[x]);
										}
									}

									if (x.indexOf("clusterbaru_") > -1) {
										var field = x.replace("clusterbaru_", "baru_cluster_");
										var el = f.down("[name=" + field + "]");
										if (el) {
											el.setValue(data[x]);
										}
									}

									if (x.indexOf("typebaru_") > -1) {
										var field = x.replace("typebaru_", "baru_type_");
										var el = f.down("[name=" + field + "]");
										if (el) {
											el.setValue(data[x]);
										}
									}

									if (x.indexOf("productcategorybaru_") > -1) {
										var field = x.replace("productcategorybaru_", "baru_productcategory_");
										var el = f.down("[name=" + field + "]");
										if (el) {
											el.setValue(data[x]);
										}
									}

									if (x.indexOf("blockbaru_") > -1) {

										var field = x.replace("blockbaru_", "baru_block_");
										var el = f.down("[name=" + field + "]");
										if (el) {
											el.setValue(data[x]);
										}
									}
								}
								me.mt.customerPhoto(me.getFormdata().down("#photo_image"), oneRec.get("customer_photo"), me.myConfig.IMG_FOLDER);

								f.setLoading("Loading schedule ...");
								me.tools.ajax({
									params  : { purchaseletter_id : oneRec.get("purchaseletter02_id") },
									success : function (schdata, schmodel) {
										me.tools.wesea({
											data  : schdata,
											model : schmodel
										}, sg).grid();
										f.setLoading(false);
									}
								}).read('schedule');

								me.citraGardenFeatured(detailData, f, oneRec);

								me.setAllformatmoney();
							}
						});

						if (state == 'view') {
							me.getFormdata().getForm().getFields().each(function (field) {
								me.setterReadonly(f, [field.name], true);
							});

							Ext.Array.each(me.getFormdata().query("[xtype=button]"), function (field) {
								field.setVisible(false);
							});

							f.down('#btnCancel').show();
						}
					}
				}).read('detail');
			}
		};
		return x;
	},
	fillFormComponents: function (data, form) {
		var me = this;
		me.tools.wesea(data.bank, form.down("[name=bank_bank_id]")).comboBox();
		me.tools.wesea(data.billingrules, form.down("[name=billingrules_billingrules_id]")).comboBox();
		me.tools.wesea(data.collector, form.down("[name=collector_employee_id]")).comboBox();
		me.tools.wesea(data.movereason, form.down("[name=reasonchgkavling_id]")).comboBox();
	},
	citraGardenFeatured: function (data, form, record) {
		var me = this;
		if (data['others'][0][0]["ISCOLLECTIONAPPROVE"]) {
			if (record.get("purchaseletterrevision_is_approvecollection")) {
				form.down("button[action=approvecoll]").setText("Approved By Collection");
				form.down("button[action=approvecoll]").disable();
				form.down("button[action=approvecoll]").show();
			}

			if (record.get("purchaseletterrevision_is_approvemanager")) {
				form.down("button[action=approve]").setText("Approved By Manager");
				form.down("button[action=approve]").disable();
				form.down("button[action=approve]").show();
			}

			if (data['others'][0][0]["ISCOLLECTIONUSER"]) {
				form.down("button[action=approvecoll]").show();
				form.down("button[action=reject]").show();
			}
		}
	},
	tanggalvalidasi: function (v) {
		var me = this;
		var g  = me.getSchedulegrid();
		var s  = g.getStore();
	
		s.each(function (rec) {
			if (rec != null) {
				if (accounting.unformat(rec.data.amount) == accounting.unformat(rec.data.remaining_balance)) {
					var date = new Date(rec.data.duedate);
					date.setDate(v);

					rec.beginEdit();
					rec.set({ duedate : date });
					rec.endEdit();
				}
			}
		});
	},
	formDataAfterRender: function (el) {
		var state = el.up('window').state;
		var me = this;
		me.fdar().init();

		if (state == 'create') {
			me.fdar().create();
		} 
		else if (state == 'update') {
			me.fdar().update();
		} 
		else if (state == 'read') {
			me.fdar().update('view');
		}
	},
	setAllformatmoney : function(){
		var me     = this;
		var f      = me.getFormdata();
		var fields = f.getForm()._fields.items;
		for(var i = 0; i < fields.length; i++){
			if(fields[i].xtype == 'xmoneyfieldEST'){
				var precision = f.down("[name=" + fields[i].name + "]").getDecPrecision();
				f.down("[name=" + fields[i].name + "]").setValue(accounting.formatMoney(f.down("[name=" + fields[i].name + "]").getValue(), { precision : precision }));
			}
		}
	}
});