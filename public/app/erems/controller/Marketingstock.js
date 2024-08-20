Ext.define('Erems.controller.Marketingstock', {
	extend   : 'Erems.library.template.controller.Controller2',
	alias    : 'controller.Marketingstock',
	requires : ['Erems.library.TypeRounding'],
	views    : ['marketingstock.Panel', 'marketingstock.Grid', 'marketingstock.FormSearch', 'marketingstock.FormData', 'marketingstock.SelectUnitGrid', 'marketingstock.SelectUnitFormSearch', 'marketingstock.SelectUnitPanel'],
	stores   : ['Masterdeletereason'],
	refs     : [
		{
			ref      : 'grid',
			selector : 'marketingstockgrid'
		},
		{
			ref      : 'formsearch',
			selector : 'marketingstockformsearch'
		},
		{
			ref      : 'formdata',
			selector : 'marketingstockformdata'
		},
		{
			ref      : 'unitgrid',
			selector : 'selectunitgrid',
		},
		{
			ref      : 'panel',
			selector : 'marketingstockpanel'
		},
		{
			ref      : 'formsearchunit',
			selector : 'selectunitformsearch'
		},
		{
			ref      : 'formnetodua',
			selector : 'marketingstockformnettodua'
		}
	],
	controllerName : 'marketingstock',
	fieldName      : 'marketstock_id',
	bindPrefixName : 'Marketingstock',
	formWidth      : 800,
	localStore     : {
		detail       : null,
		selectedUnit : null,
		customer     : null
	},
	myConfig              : null,
	tools                 : null,
	browseHandler         : null,
	cbf                   : null,
	mt                    : null,
	priceTypeList         : null,
	myMasterData          : null,
	useRumusBiaya         : false,
	syncSalesForce        : false,
	mkProlibFile          : null,
	typeCalculaterounding : 0,
	tools                 : null,
	roundlib              : null,
	savetoAll             : "",
	isSH2                 : 0,
	constructor           : function (configs) {
		this.callParent(arguments);
		var me = this;

		me.myConfig = new Erems.library.box.Config({_controllerName: me.controllerName});
		me.cbf      = new Erems.template.ComboBoxFields();
		me.tools    = new Erems.library.box.tools.Tools({config: me.myConfig});
		me.roundlib = new Erems.library.TypeRounding();
	},
	init: function (application) {
		var me = this;

		this.control({
			'marketingstockpanel': {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : this.panelAfterRender
			},
			'marketingstockgrid': {
				afterrender     : this.gridAfterRender,
				itemdblclick    : this.gridItemDblClick,
				itemcontextmenu : this.gridItemContextMenu,
				selectionchange : this.gridSelectionChange
			},
			'marketingstockgrid toolbar button[action=create]': {
				click : function () {}
			},
			'marketingstockgrid toolbar button[action=update]': {
				click : function () {
					this.formDataShow('update');
				}
			},
			'marketingstockgrid toolbar button[action=delete]': {
				click : function () {
					this.showDeleteReason('delete');
				}
			},
			'marketingstockgrid toolbar button[action=sync]': {
				click : function () {
					this.syncSF();
				}
			},
			'marketingstockgrid toolbar button[action=print]': {
				click : this.dataPrint
			},
			'marketingstockgrid actioncolumn': {
				afterrender : this.gridActionColumnAfterRender,
				click       : this.gridActionColumnClick
			},
			'marketingstockformsearch button[action=search]': {
				click : this.dataSearch
			},
			'marketingstockformsearch button[action=reset]': {
				click : this.dataReset
			},
			'marketingstockformdata': {
				afterrender : this.formDataAfterRender
			},
			'marketingstockformdata button[action=save]': {
				click : function () {
					me.savetoAll = "";
					me.mainDataSave();
				}
			},
			'marketingstockformdata button[action=saveToAll]': {
				click : this.popupSaveToAll
			},
			'marketingstockformdata button[action=cancel]': {
				click : this.formDataClose
			},
			'marketingstockformsearch': {
				afterrender : me.formSearchAfterRender
			},
			'selectunitgrid': {
				afterrender : me.selectunitgridAfterRender
			},
			'selectunitgrid toolbar button[action=select]': {
				click : me.selectunitgridSelection
			},
			/* strat addby fatkur, addon 26-7-19*/
			'marketingstockformdata [name=type_type_id]': {
				select : function (el, val) {
					me.seFi.cb('type_code', el, 'code', val);
					var f = me.getFormdata();
					me.updateTypeInfo();

					var selector = Ext.ComponentQuery.query("[nameOrigin=harga_tanah_a]");
					for (i = 0; i < selector.length; i++) {
						me.flagSection = selector[i].namePrefix;
						me.changeHargaTanah(selector[i]);
					}
				},
				change : function () {
					var f = me.getFormdata();
					var t = f.down("[name=type_type_id]");
					var i = t.getStore().findExact('type_id', t.getValue());
					var rec = t.getStore().getAt(i);

					if (t.getValue() != 0 && typeof rec != 'undefined') {
						var prodCatId = me.tools.intval(rec.get("productcategory_id"));
						var c = f.down("[name=cluster_cluster_id]");
						var bs = t.getStore();
						bs.clearFilter(true);
						bs.filter("cluster_id", c.getValue());
						bs.filter("productcategory_id", prodCatId);
					}
				}
			},
			'marketingstockformdata [name=pt_pt_id]': {
				select : function (el, val) {
					me.seFi.cb('pt_code', el, 'code', val);
				}
			},
			'marketingstockformdata [name=is_holdmanagement]': {
				change : function (el, val) {
					var form = me.getFormdata();
					var notes = form.down('#notes_holdmanagement');
					notes.setDisabled(val ? false : true);
				}
			},
			'marketingstockformdata [nameOrigin=harga_tanah_a]': {
				keyup : function (el) {
					me.flagSection = el.namePrefix;
					me.changeHargaTanah(el);
				},
			},
			'marketingstockformdata [nameOrigin=harga_kelebihan_a]': {
				keyup : function (el) {
					me.flagSection = el.namePrefix;
					me.changeHargaKelebihan(el);
				}
			},
			'marketingstockformdata [nameOrigin=harga_bangunan]': {
				keyup : function (el) {
					me.flagSection = el.namePrefix;
					me.changeHargaBangunan();
				}
			},
			'marketingstockformdata [nameOrigin=subsidi_dp]': {
				keyup : function (el) {
					me.flagSection = el.namePrefix;
					me.changeSubsididp();
				}
			},
			'marketingstockformdata [nameOrigin=harga_interior]': {
				keyup : function (el) {
					me.flagSection = el.namePrefix;
					me.changeHargaInterior();
				}
			},
			'marketingstockformdata [nameOrigin=harga_jual_dasar]': {
				keyup : function (el) {
					me.flagSection = el.namePrefix;
					me.changeHargaBangunanbyJualDasar();
				},
				blur : function (el) {
					var me  = this,
						val = accounting.unformat(el.value);

					val = me.roundlib.rounding(me.typeCalculaterounding, val);
					el.setValue(accounting.formatMoney(val));
				}
			},

			'marketingstockformdata [nameGroup=disc]': {
				keyup : function (el) {
					me.flagSection = el.namePrefix;

					var f = me.getFormdata(), vSrc = 0, elDisc = '', elTotal = '';

					if (el.nameOrigin == 'ppn_tanah') {
						elDisc  = me.flagSection + '_ppn_tanah';
						elTotal = me.flagSection + '_tot_ppn_tanah';
						vSrc = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_tanah_b]').getValue())) + parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_kelebihan_b]').getValue())));
					}

					if (el.nameOrigin == 'ppn_bangunan') {
						elDisc  = me.flagSection + '_ppn_bangunan';
						elTotal = me.flagSection + '_tot_ppn_bangunan';
						vSrc = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_bangunan]').getValue())));
					}

					if (el.nameOrigin == 'ppnsubsidi_dp') {
						elDisc  = me.flagSection + '_ppnsubsidi_dp';
						elTotal = me.flagSection + '_tot_ppnsubsidi_dp';
						vSrc = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_subsidi_dp]').getValue())));
					}

					if (el.nameOrigin == 'ppninterior') {
						elDisc  = me.flagSection + '_ppninterior';
						elTotal = me.flagSection + '_tot_ppninterior';
						vSrc = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_interior]').getValue())));
					}

					if (el.nameOrigin == 'ppnbm') {
						elDisc  = me.flagSection + '_ppnbm';
						elTotal = me.flagSection + '_tot_ppnbm';
						vSrc = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_netto]').getValue())));
					}

					if (el.nameOrigin == 'pph22') {
						elDisc  = me.flagSection + '_pph22';
						elTotal = me.flagSection + '_tot_pph22';
						vSrc = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_netto]').getValue())));
					}

					if (el.nameOrigin == 'disc_harga_dasar') {
						f.down("[name=" + me.flagSection + "_disc_harga_tanah]").setValue(0);
						f.down("[name=" + me.flagSection + "_tot_disc_harga_tanah]").setValue(0);
						f.down("[name=" + me.flagSection + "_disc_harga_bangunan]").setValue(0);
						f.down("[name=" + me.flagSection + "_tot_disc_harga_bangunan]").setValue(0);

						elDisc  = me.flagSection + '_disc_harga_dasar';
						elTotal = me.flagSection + '_tot_disc_harga_dasar';
						vSrc    = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_jual_dasar]').getValue())));
					}

					if (el.nameOrigin == 'disc_harga_tanah') {
						f.down("[name=" + me.flagSection + "_disc_harga_dasar]").setValue(0);
						f.down("[name=" + me.flagSection + "_tot_disc_harga_dasar]").setValue(0);

						elDisc  = me.flagSection + '_disc_harga_tanah';
						elTotal = me.flagSection + '_tot_disc_harga_tanah';
						vSrc    = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_tanah_b]').getValue())) + parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_kelebihan_b]').getValue())));
					}

					if (el.nameOrigin == 'disc_harga_bangunan') {
						f.down("[name=" + me.flagSection + "_disc_harga_dasar]").setValue(0);
						f.down("[name=" + me.flagSection + "_tot_disc_harga_dasar]").setValue(0);

						elDisc  = me.flagSection + '_disc_harga_bangunan';
						elTotal = me.flagSection + '_tot_disc_harga_bangunan';
						vSrc    = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_bangunan]').getValue())));
					}

					if (elDisc != '') {
						me.formulaDiscount({
							elDisc        : elDisc,
							elTotal       : elTotal,
							valSource     : vSrc,
							calHargaNetto : false
						});
					}

				}
			},
			'marketingstockformdata [nameGroup=tot_disc]': {
				keyup: function (el) {
					me.flagSection = el.namePrefix;

					var f = me.getFormdata(), vSrc = 0, elDisc = '', elTotal = '';

					if (el.nameOrigin == 'tot_ppn_tanah') {
						elDisc  = me.flagSection + '_ppn_tanah';
						elTotal = me.flagSection + '_tot_ppn_tanah';
						vSrc    = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_tanah_b]').getValue())) + parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_kelebihan_b]').getValue())) - parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_tot_disc_harga_tanah]').getValue())));
					}

					if (el.nameOrigin == 'tot_ppn_bangunan') {
						elDisc  = me.flagSection + '_ppn_bangunan';
						elTotal = me.flagSection + '_tot_ppn_bangunan';
						vSrc    = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_bangunan]').getValue())) - parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_tot_disc_harga_bangunan]').getValue())));
					}

					if (el.nameOrigin == 'tot_ppnsubsidi_dp') {
						elDisc  = me.flagSection + '_ppnsubsidi_dp';
						elTotal = me.flagSection + '_tot_ppnsubsidi_dp';
						vSrc    = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_subsidi_dp]').getValue())));
					}

					if (el.nameOrigin == 'tot_ppninterior') {
						elDisc  = me.flagSection + '_ppninterior';
						elTotal = me.flagSection + '_tot_ppninterior';
						vSrc    = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_interior]').getValue())));
					}

					if (el.nameOrigin == 'tot_ppnbm') {
						elDisc  = me.flagSection + '_ppnbm';
						elTotal = me.flagSection + '_tot_ppnbm';
						vSrc    = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_netto]').getValue())));
					}

					if (el.nameOrigin == 'tot_pph22') {
						elDisc  = me.flagSection + '_pph22';
						elTotal = me.flagSection + '_tot_pph22';
						vSrc    = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_netto]').getValue())));
					}

					if (el.nameOrigin == 'tot_disc_harga_dasar') {
						elDisc  = me.flagSection + '_disc_harga_dasar';
						elTotal = me.flagSection + '_tot_disc_harga_dasar';
						vSrc    = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_jual_dasar]').getValue())));
					}

					if (el.nameOrigin == 'tot_disc_harga_tanah') {
						elDisc  = me.flagSection + '_disc_harga_tanah';
						elTotal = me.flagSection + '_tot_disc_harga_tanah';
						vSrc    = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_tanah_b]').getValue())));
					}

					if (el.nameOrigin == 'tot_disc_harga_bangunan') {
						elDisc  = me.flagSection + '_disc_harga_bangunan';
						elTotal = me.flagSection + '_tot_disc_harga_bangunan';
						vSrc    = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_bangunan]').getValue())));
					}

					if (elDisc != '') {
						me.formulaReverseDiscount({
							elDisc        : elDisc,
							elTotal       : elTotal,
							valSource     : vSrc,
							calHargaNetto : false
						});
					}

				}
			},
			'marketingstockformdata [nameGroup=biaya_lain]': {
				keyup : function (el) {
					me.flagSection = el.namePrefix;
					me.changeHargaTotal();
					me.mkUpdateStyle(el.namePrefix + '_' + el.nameOrigin);
				}
			},
			'marketingstockformdata [name=persen_copy]': {
				change : function () {
					me.changePersenCopy();
				}
			},
			'marketingstockformdata button[action=copy_data]': {
				click : function () {
					me.copyDataClick();
				}
			},
			'selectunitformsearch': {
				beforerender : me.selectunitdataBeforeRender
			},
			'selectunitformsearch button[action=search]': {
				click : me.selectunitdataSearch
			},
			'selectunitformsearch button[action=reset]': {
				click : me.selectunitdataReset
			},
			'marketingstockbrowsepanel': {
				beforerender : me.browsepanelBeforeRender
			},
			'marketingstockbrowsepanel button[action=select]': {
				click : me.browsegridSelection
			},
			'marketingstockbrowsegrid': {
				afterrender : me.browsegridAfterRender
			},
			'marketingstockformdata button[action=nettodua]': {
				click : function () {
					me.showFormNettoDua();
				}
			},
			'marketingstockformnettodua button[action=process]': {
				click : function () {
					me.processNettoDua();
				}
			},
			'marketingstockformnettodua [name=harga_jual]': {
				focus : function () {
					me.getFormnetodua().down("[name=harga_netto]").setValue(0);
				}
			},
			'marketingstockformnettodua [name=harga_jual]': {
				keyup : function () {
					me.hitungNettodua();
				}
			},
		});
	},
	gridSelectionChange: function () {
		var me      = this;
		var grid    = me.getGrid();
		var row     = grid.getSelectionModel().getSelection();
		var edit    = grid.down('#btnEdit');
		var deleteb = grid.down('#btnDelete');
		var syncb   = grid.down('#btnSync');
		var view    = grid.down('#btnView');

		if (edit !== null) {
			edit.setDisabled(row.length != 1);
		}
		if (deleteb !== null) {
			deleteb.setDisabled(row.length < 1);
		}

		syncDis = true;
		if (syncb !== null && row.length > 0) {
			syncDis = false;
			Ext.each(row, function (rec, idx) {
				if (rec.data.state_admistrative != 3) {
					syncDis = true;
					return;
				}
			});
		}
		syncb.setDisabled(syncDis);

		if (view !== null) {
			view.setDisabled(row.length != 1);
		}
	},
	mkUpdateStyle: function (field) {
		var me = this;
		var el = me.getFormdata().down("[name=" + field + "]");
		el.setFieldStyle('border:1px solid black');
		el.mkFlagEdit = true;
	},
	processNettoDua: function () {
		var me         = this;
		var fm         = me.getFormdata();
		var f          = me.getFormnetodua();
		var vs         = f.getValues();
		var isBiayaUse = me.tools.intval(vs.biaya) !== 1 ? true : false;

		var subsididp   = accounting.unformat(fm.down("[name=k_subsidi_dp]").getValue());
		var hrgInterior = accounting.unformat(fm.down("[name=k_harga_interior]").getValue());
		var hrgLebihTan = accounting.unformat(fm.down("[name=k_harga_kelebihan_b]").getValue());
		var hrgTan      = accounting.unformat(fm.down("[name=k_harga_tanah_b]").getValue()) + parseFloat(hrgLebihTan);
		var hrgBang     = f.down("[name=harga_netto]").nilaiAktual - parseFloat(hrgTan) - parseFloat(subsididp) - parseFloat(hrgInterior);

		var hrgJualDsr = parseFloat(hrgBang) + parseFloat(hrgTan) + parseFloat(subsididp) + parseFloat(hrgInterior);

		var disDsr = accounting.toFixed(accounting.unformat(fm.down("[name=k_disc_harga_dasar]").getValue()), 2);
		var disTan = accounting.toFixed(accounting.unformat(fm.down("[name=k_disc_harga_tanah]").getValue()), 2);
		var disBan = accounting.toFixed(accounting.unformat(fm.down("[name=k_disc_harga_bangunan]").getValue()), 2);

		var disDsrNil = disDsr > 0 ? (disDsr / 100) * hrgJualDsr : 0;
		var disTanNil = disTan > 0 ? (disTan / 100) * hrgTan : 0;
		var disBanNil = disBan > 0 ? (disBan / 100) * hrgBang : 0;

		disDsrNil = me.roundlib.rounding(me.typeCalculaterounding, disDsrNil);
		disTanNil = me.roundlib.rounding(me.typeCalculaterounding, disTanNil);
		disBanNil = me.roundlib.rounding(me.typeCalculaterounding, disBanNil);

		var net = parseFloat(hrgJualDsr) - (parseFloat(disDsrNil) + parseFloat(disTanNil) + parseFloat(disBanNil));

		net = me.roundlib.rounding(me.typeCalculaterounding, net);

		var pjTanNil = (accounting.unformat(fm.down("[name=k_ppn_tanah]").getValue()) / 100) * hrgTan;
			pjTanNil = me.roundlib.rounding(me.typeCalculaterounding, pjTanNil);

		var pjBanNil = (accounting.unformat(fm.down("[name=k_ppn_bangunan]").getValue()) / 100) * hrgBang;
			pjBanNil = me.roundlib.rounding(me.typeCalculaterounding, pjBanNil);

		var PPNSubsididp = (accounting.unformat(fm.down('[name=k_ppnsubsidi_dp]').getValue()) / 100) * net;
			PPNSubsididp = me.roundlib.rounding(me.typeCalculaterounding, PPNSubsididp);

		var PPNInterior = (accounting.unformat(fm.down('[name=k_ppninterior]').getValue()) / 100) * net;
			PPNInterior = me.roundlib.rounding(me.typeCalculaterounding, PPNInterior);

		var PPNBM = (accounting.unformat(fm.down('[name=k_ppnbm]').getValue()) / 100) * net;
			PPNBM = me.roundlib.rounding(me.typeCalculaterounding, PPNBM);

		var PPH22 = (accounting.unformat(fm.down('[name=k_pph22]').getValue()) / 100) * net;
			PPH22 = me.roundlib.rounding(me.typeCalculaterounding, PPH22);

		var bbn = isBiayaUse ? me.netto2Params(net).bbn() : 0;
			bbn = me.roundlib.rounding(me.typeCalculaterounding, bbn);

		var ajb = isBiayaUse ? me.netto2Params(net).ajb() : 0;
			ajb = me.roundlib.rounding(me.typeCalculaterounding, ajb);

		var bphtb = isBiayaUse ? me.netto2Params(net).bphtb() : 0;
			bphtb = me.roundlib.rounding(me.typeCalculaterounding, bphtb);

		var hrgJual = parseFloat(net) + parseFloat(pjTanNil) + parseFloat(pjBanNil) + parseFloat(PPNSubsididp) + parseFloat(PPNInterior) + parseFloat(PPNBM) + parseFloat(PPH22) + parseFloat(bbn) + parseFloat(ajb) + parseFloat(bphtb);
			hrgJual = me.roundlib.rounding(me.typeCalculaterounding, hrgJual);

		fm.down("[name=k_harga_bangunan]").setValue(accounting.formatMoney(hrgBang));
		fm.down("[name=k_harga_jual_dasar]").setValue(accounting.formatMoney(hrgJualDsr));
		fm.down("[name=k_tot_disc_harga_dasar]").setValue(accounting.formatMoney(disDsrNil));
		fm.down("[name=k_tot_disc_harga_tanah]").setValue(accounting.formatMoney(disTanNil));
		fm.down("[name=k_tot_disc_harga_bangunan]").setValue(accounting.formatMoney(disBanNil));
		fm.down("[name=k_harga_netto]").setValue(accounting.formatMoney(net));
		fm.down("[name=k_tot_ppn_tanah]").setValue(accounting.formatMoney(pjBanNil));
		fm.down("[name=k_tot_ppn_bangunan]").setValue(accounting.formatMoney(pjTanNil));
		fm.down("[name=k_tot_ppnsubsidi_dp]").setValue(accounting.formatMoney(PPNSubsididp));
		fm.down("[name=k_tot_ppninterior]").setValue(accounting.formatMoney(PPNInterior));
		fm.down("[name=k_tot_ppnbm]").setValue(accounting.formatMoney(PPNBM));
		fm.down("[name=k_tot_pph22]").setValue(accounting.formatMoney(PPH22));
		fm.down("[name=k_harga_balik_nama]").setValue(accounting.formatMoney(bbn));
		fm.down("[name=k_harga_bphtb]").setValue(accounting.formatMoney(bphtb));
		fm.down("[name=k_harga_bajtb]").setValue(accounting.formatMoney(ajb));
		fm.down("[name=k_total]").setValue(accounting.formatMoney(hrgJual));
	},
	showFormNettoDua: function () {
		var me = this;
		var w  = me.instantWindow('FormNettodua', 500, 'Nettodua', "mystate", 'myNettoDuaWindow');
	},
	hitungNettodua: function () {
		var me         = this;
		var fm         = me.getFormdata();
		var f          = me.getFormnetodua();
		var vs         = f.getValues();
		var isBiayaUse = me.tools.intval(vs.biaya) !== 1 ? true : false;

		var hargaJual = accounting.unformat(f.down("[name=harga_jual]").getValue());

		var netto = isBiayaUse ? me.netto2Params(0).netto(hargaJual) : me.netto2Params(0).nettoNoBiaya(hargaJual);
			netto = me.roundlib.rounding(me.typeCalculaterounding, netto);

		f.down("[name=harga_netto]").nilaiAktual = netto;
		f.down("[name=harga_netto]").setValue(accounting.formatMoney(netto));
	},
	netto2: function () {
		var x = {
			getBbnSertifikat: function (luasTanah, purposeCode) {
				var bbnSertifikat = 0;
				if (luasTanah <= 200) {
					bbnSertifikat = 2750000;
				} else if (luasTanah >= 300) {
					bbnSertifikat = 3250000;
				} else if (luasTanah >= 400) {
					bbnSertifikat = 3500000;
				} else if (luasTanah >= 500) {
					bbnSertifikat = 3750000;
				}

				if (purposeCode === "00") {
					bbnSertifikat = 4500000;
				}

				return bbnSertifikat;
			},
			getBajb: function (netto) {
				var bajb = 0;
				if (netto <= 500000000) {
					bajb = netto * 0.0075
				} else if (netto <= 1000000000) {
					bajb = netto * 0.0065
				} else if (netto <= 1500000000) {
					bajb = netto * 0.0060
				} else if (netto <= 2000000000) {
					bajb = netto * 0.0055
				} else if (netto <= 2000000000) {
					bajb = netto * 0.0050
				}
				bajb = (bajb * 1.1) + 25000;
				return bajb;

			},
			getBPHTB: function (netto) {
				var bphtb = 0;
				if (netto > 60000000) {
					bphtb = (netto - 60000000) * 0.05;
				} else {
					bphtb = 0;
				}

			}
		};
		return x;
	},
	netto2Params: function (netto) {
		var x = {
			ppn: function () {
				return netto * 0.1;
			},
			bbn: function () {
				return 4000000;
			},
			ajb: function () {
				return netto * 0.006;
			},
			bphtb: function () {
				return (netto - 60000000) * 0.05;
			},
			netto: function (jual) {
				/*rumus ini di dapat dari ===CARAHITUNG #1=== di method 'netto2Hitung' */
				return (jual - 1000000) / 1.156;
			},
			nettoNoBiaya: function (jual) {
				return jual / 1.1;
			}
		};
		return x;
	},
	netto2Hitung: function (jual) {
		/* ========== JANGAN DIHAPUS =========== */
		// SAMPLE #1
		/*
		 var ppn = netto * 0.1;
		 var bbn = 4000000;
		 var ajb = netto * 0.006;
		 var bphtb = (netto - 60000000) * 0.05;
		 */

		/* CARAHITUNG #1 */
		// CARA HITUNG NETTO DARI HARGA JUAL DARI PARAMATER DI SAMPLE #1
		// HARGA JUAL = HARGANETTO + PPN +              BBN +     AJB +                 BPHTB
		//HARGA JUAL = HARGANETTO + HARGANETTO x 0.1 + 4000000 + HARGANETTO x 0.006 + (HARGANETTO-60000000) x 0.05
		//HARGA JUAL = HARGANETTO + 0.1HARGANETTO + 4000000 + 0.006HARGANETTO + 0.05HARGANETTO-3000000
		// HARGA JUAL = HARGANETTO(1 + 0.1 + 0.006 + 0.05) + 1000000
		// HARGA JUAL - 1000000 = HARGANETTO(1 + 0.1 + 0.006 + 0.05)
		// HARGANETTO = (HARGA JUAL - 1000000) / 1.156
		/* CARAHITUNG #1 */
		/* ========== JANGAN DIHAPUS =========== */
		// return;
	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);

		var me = this;
		var p  = me.getPanel();

		me.tools.ajax({
			params  : {},
			success : function (data, model) {
				me.setData.myMasterData = data;
				me.fillFormSearchComponents(data, me.getFormsearch());

				me.priceTypeList         = data['others'][0][0];
				me.mkProlibFile          = data['others'][0][0]['PROLIBFILE'];
				me.typeCalculaterounding = data['others'][0][0]['typeCalculaterounding'];
				me.useRumusBiaya         = data['others'][0][0]['USE_RUMUSBIAYA'];
				me.syncSalesForce        = data['others'][0][0]['syncSalesForce'];
				me.isSH2                 = data['others'][0][0]['isSH2'];

				if (me.mkProlibFile) {
					Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/Prolibs.js?_dc=' + Ext.Date.now(), function () {
						Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/' + me.mkProlibFile + '.js?_dc=' + Ext.Date.now(), function () {
							me.getGrid().down("[action=create]").setDisabled(false);
							me.getGrid().down("[action=update]").setDisabled(false);
						}, function () {
							me.tools.alert.warning("Error load prolibs file.");
						});
					}, function () {
						me.tools.alert.warning("Error load Prolibs.js file.");
					});
				} else {
					me.tools.alert.error("[JSERR01] File perhitungan purchaseletter tidak ditemukan.");
				}

				if (me.syncSalesForce == 1) {
					me.getGrid().down("[action=sync]").setVisible(true);
				}
			}
		}).read('detail');
	},
	fillFormSearchComponents : function (data, f) {
		var me = this;

		var ar = ['cluster', 'block', 'type', 'position', 'productcategory', 'side', 'purpose', 'unitstatus'];
		for (var i in ar) {
			var el = f.down("[name=" + me.cbf[ar[i]]['v'] + "]");
			if (el) {
				var dataCB = data[ar[i]];
				if (ar[i] == 'purpose') {
					dataCB = new Array();
					dataCB['data']  = data['others'][0][0][ar[i]];
					dataCB['model'] = [{mapping: ar[i] + '.purpose_id', name: 'purpose_id'}, {mapping: ar[i] + '.code', name: 'code'}, {mapping: ar[i] + '.purpose', name: 'purpose'}];
				}
				me.tools.wesea(dataCB, el).comboBox(true);
			}
		}
	},
	setData : {
		myMasterData: null
	},
	realValue   : {t_harga_tanah_b: 0, t_harga_kelebihan_b: 0},
	flagSection : 't',
	selectunitdataReset: function (btn) {
		var me = this;

		var el = btn.up('form');
		el.getForm().reset();

		var ar = ['cluster', 'block', 'type', 'position', 'productcategory', 'side'];
		var fs = el;
		for (var i in ar) {
			var el = fs.down("[name=" + ar[i] + '_' + me.cbf[ar[i]]['v'] + "]");
			if (el) {
				el.setValue('999');
			}
		}
		me.selectunitdataSearch(btn);
	},
	selectunitdataSearch: function (el, a, b) {
		resetTimer();
		var form   = el.up('form').getForm();
		var grid   = el.up('window').down('grid');
		var store  = grid.getStore();
		var fields = form.getValues();
		for (var x in fields) {
			store.getProxy().setExtraParam(x, fields[x]);
		}
		store.loadPage(1);
	},
	copyDataClick: function () {
		var me = this;
		var jenisCopy = me.getFormdata().down('#copyRg').getValue();

		var srcData = 't';
		var dstData = 't';
		switch (jenisCopy.rb) {
			case 'kt':
				srcData = 'k';
				dstData = 't';
				break;
			case 'iht':
				srcData = 'ih';
				dstData = 't';
				break;
			case 'tk':
				srcData = 't';
				dstData = 'k';
				break;
			case 'ihk':
				srcData = 'ih';
				dstData = 'k';
				break;
			case 'tih':
				srcData = 't';
				dstData = 'ih';
				break;
			case 'kih':
				srcData = 'k';
				dstData = 'ih';
				break;
		}
		var fieldList = [
			'_harga_tanah_a',
			'_harga_kelebihan_a',
			'_harga_tanah_b',
			'_harga_kelebihan_b',
			'_harga_bangunan',
			'_subsidi_dp',
			'_harga_interior',
			'_harga_jual_dasar',
			'_disc_harga_dasar',
			'_tot_disc_harga_dasar',
			'_disc_harga_tanah',
			'_tot_disc_harga_tanah',
			'_disc_harga_bangunan',
			'_tot_disc_harga_bangunan',
			'_harga_netto',
			'_ppn_tanah',
			'_tot_ppn_tanah',
			'_ppn_bangunan',
			'_tot_ppn_bangunan',
			'_ppnbm',
			'_tot_ppnbm',
			'_ppnsubsidi_dp',
			'_tot_ppnsubsidi_dp',
			'_ppninterior',
			'_tot_ppninterior',
			'_pph22',
			'_tot_pph22',
			'_harga_balik_nama',
			'_harga_bphtb',
			'_harga_bajtb',
			'_total'
		];

		var notAddPersen = ['_disc_harga_dasar', '_disc_harga_tanah', '_disc_harga_bangunan', '_ppn_tanah', '_ppn_bangunan', '_ppnsubsidi_dp', '_ppninterior', '_ppnbm', '_pph22'];
		for (var i = 0; i < fieldList.length; i++) {
			var eLval = parseFloat(accounting.unformat(me.getFormdata().down('[name=' + srcData + '' + fieldList[i] + ']').getValue()));
			var addPersen = 0;
			if (Ext.Array.indexOf(notAddPersen, fieldList[i]) == -1) {
				addPersen = (eLval * (parseFloat(accounting.unformat(me.getFormdata().down('[name=persen_copy]').getValue())) / 100));
			}

			var total = addPersen + eLval;

			var fieldSelector = me.getFormdata().down('[name=' + dstData + '' + fieldList[i] + ']');
			fieldSelector.setValue(accounting.formatMoney(total, {precision: fieldSelector.getDecPrecision()}));
		}
	},
	changePersenCopy: function () {
		/*
		 var me = this;
		 if(accounting.unformat(me.getFormdata().down('[name=persen_copy]').getValue()) > 100.00){
		 me.getFormdata().down('[name=persen_copy]').setValue(100.00);
		 }
		 */
	},
	formulaReverseDiscount: function (obj) {
		var me = this;
		var f  = me.getFormdata();

		var elDisc        = obj.elDisc;
		var elTotal       = obj.elTotal;
		var valSource     = parseFloat(obj.valSource);
		var calHargaNetto = typeof obj.calHargaNetto == 'undefined' ? true : obj.calHargaNetto;

		var total = (accounting.unformat(f.down('[name=' + elTotal + ']').getValue()) * 100.00) / valSource;
		if (total > 100.00) {
			total = 100.00;
			f.down('[name=' + elTotal + ']').setValue(accounting.formatMoney(valSource));
		}
		total = accounting.toFixed(total, 2);

		f.down('[name=' + elDisc + ']').setValue(accounting.formatMoney(total));

		if (calHargaNetto) {
			me.changeHargaNetto();
		}
	},
	formulaDiscount: function (obj) {
		var me = this;
		var f  = me.getFormdata();

		var elDisc        = obj.elDisc;
		var elTotal       = obj.elTotal;
		var valSource     = parseFloat(obj.valSource);
		var calHargaNetto = typeof obj.calHargaNetto == 'undefined' ? true : obj.calHargaNetto;

		var val = parseFloat(accounting.unformat(f.down('[name=' + elDisc + ']').getValue()));
		if (val > 100.00) {
			val = 100.00;
			f.down('[name=' + elDisc + ']').setValue(val);
		}

		var total = valSource * (val / 100);
		total = me.roundlib.rounding(me.typeCalculaterounding, total);

		f.down('[name=' + elTotal + ']').setValue(accounting.formatMoney(total));

		if (calHargaNetto) {
			me.changeHargaNetto();
		}
		else{
			me.changeHargaTotal();
		}
	},
	// add on 20180723
	changeHargaTotal: function () {
		var me = this;
		var f  = me.getFormdata();

		var subEL          = f.down('[name=' + me.flagSection + '_subsidi_dp]');
		var intEL          = f.down('[name=' + me.flagSection + '_harga_interior]');
		var nettoEL        = f.down('[name=' + me.flagSection + '_harga_netto]');
		var persenppnTanEL = f.down('[name=' + me.flagSection + '_ppn_tanah]');
		var ppnTanEL       = f.down('[name=' + me.flagSection + '_tot_ppn_tanah]');
		var persenppnBanEL = f.down('[name=' + me.flagSection + '_ppn_bangunan]');
		var ppnBanEL       = f.down('[name=' + me.flagSection + '_tot_ppn_bangunan]');
		var persenppnSubEL = f.down('[name=' + me.flagSection + '_ppnsubsidi_dp]');
		var ppnSubEL       = f.down('[name=' + me.flagSection + '_tot_ppnsubsidi_dp]');
		var persenppnIntEL = f.down('[name=' + me.flagSection + '_ppninterior]');
		var ppnIntEL       = f.down('[name=' + me.flagSection + '_tot_ppninterior]');
		var persenppnbmEL  = f.down('[name=' + me.flagSection + '_ppnbm]');
		var ppnbmEL        = f.down('[name=' + me.flagSection + '_tot_ppnbm]');
		var persenpph22EL  = f.down('[name=' + me.flagSection + '_pph22]');
		var pph22EL        = f.down('[name=' + me.flagSection + '_tot_pph22]');
		var bbnEl          = f.down('[name=' + me.flagSection + '_harga_balik_nama]');
		var bajbEl         = f.down('[name=' + me.flagSection + '_harga_bajtb]');
		var bphtbEl        = f.down('[name=' + me.flagSection + '_harga_bphtb]');

		var valNetto = parseFloat(accounting.unformat(nettoEL.getValue()));
		var valSub   = parseFloat(accounting.unformat(subEL.getValue()));
		var valInt   = parseFloat(accounting.unformat(intEL.getValue()));

		// var totalppnsubsididp = valSub ? valSub * (parseFloat(accounting.unformat(persenppnSubEL.getValue())) / 100) : 0;
		// 	totalppnsubsididp = me.roundlib.rounding(me.typeCalculaterounding, totalppnsubsididp);
		// ppnSubEL.setValue(accounting.formatMoney(totalppnsubsididp));

		// var totalppninterior = valInt ? valInt * (parseFloat(accounting.unformat(persenppnIntEL.getValue())) / 100) : 0;
		// 	totalppninterior = me.roundlib.rounding(me.typeCalculaterounding, totalppninterior);
		// ppnIntEL.setValue(accounting.formatMoney(totalppninterior));

		// var totalppnbm = valNetto ? valNetto * (parseFloat(accounting.unformat(persenppnbmEL.getValue())) / 100) : 0;
		// 	totalppnbm = me.roundlib.rounding(me.typeCalculaterounding, totalppnbm);
		// ppnbmEL.setValue(accounting.formatMoney(totalppnbm));

		// var totalpph22 = valNetto ? valNetto * (parseFloat(accounting.unformat(persenpph22EL.getValue())) / 100) : 0;
		// 	totalpph22 = me.roundlib.rounding(me.typeCalculaterounding, totalpph22);
		// pph22EL.setValue(accounting.formatMoney(totalpph22));

		var discDasar = parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_disc_harga_dasar]').getValue())); // discount dasar
		var minTanah  = discDasar > 0 ? (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_tot_disc_harga_dasar]').getValue())) / 2) : parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_tot_disc_harga_tanah]').getValue()));
		var valTanah  = (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_tanah_b]').getValue())) + parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_kelebihan_b]').getValue())));
			valTanah  = valTanah - minTanah;

		// me.formulaDiscount({
		// 	elDisc        : me.flagSection + '_ppn_tanah',
		// 	elTotal       : me.flagSection + '_tot_ppn_tanah',
		// 	valSource     : valTanah,
		// 	calHargaNetto : false
		// });

		var minBangunan = discDasar > 0 ? (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_tot_disc_harga_dasar]').getValue())) / 2) : parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_tot_disc_harga_bangunan]').getValue()));
		var valBangunan = parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_bangunan]').getValue()));
			valBangunan = valBangunan - minBangunan;

		// me.formulaDiscount({
		// 	elDisc        : me.flagSection + '_ppn_bangunan',
		// 	elTotal       : me.flagSection + '_tot_ppn_bangunan',
		// 	valSource     : valBangunan,
		// 	calHargaNetto : false
		// });

		var total = 0;
		if (me.useRumusBiaya) {
			var bbn         = 0;
			var bajb        = 0;
			var bphtb       = 0;
			var bbnElEdit   = bbnEl.mkFlagEdit;
			var bajbElEdit  = bajbEl.mkFlagEdit;
			var bphtbElEdit = bphtbEl.mkFlagEdit;

			if (me.mkProlibFile) {
				var obj_count = {
					hrgNetto       : valNetto,
					landSize       : f.down("[name=land_size]").getValue(),
					salesGroup     : f.down("[name=type_salesgroup]").getValue(),
					ptId           : f.down("[name=pt_pt_id]").getValue(),
					landOverSize   : f.down("[name=kelebihan]").getValue(),
					TypeCode       : f.down("[name=type_code]").getValue(),
					PriceType      : me.flagSection,
					peruntukanCode : f.down("[name=purpose_code]").getValue()
				};

				if (!bajbElEdit) {
					if (obj_count.hrgNetto) {
						bajb = window[me.mkProlibFile].getBiayaBAJB(obj_count);
						bajb = me.roundlib.rounding(me.typeCalculaterounding, bajb);
					}
					bajbEl.setValue(accounting.formatMoney(bajb));
				}

				if (!bphtbElEdit) {
					if (obj_count.hrgNetto) {
						bphtb = window[me.mkProlibFile].getBiayaBPHTB(obj_count);
						bphtb = me.roundlib.rounding(me.typeCalculaterounding, bphtb);
					}
					bphtbEl.setValue(accounting.formatMoney(bphtb));
				}

				if (!bbnElEdit) {
					if (obj_count.hrgNetto) {
						bbn = window[me.mkProlibFile].getBiayaBBNSertifikat(obj_count);
						bbn = me.roundlib.rounding(me.typeCalculaterounding, bbn);
					}
					bbnEl.setValue(accounting.formatMoney(bbn));
				}
			} else {
				me.tools.alert.warning("Tidak ada konfigurasi perhitungan biaya.");
				return;
			}
		}

		total = valNetto + parseFloat(accounting.unformat(ppnTanEL.getValue())) + parseFloat(accounting.unformat(ppnBanEL.getValue())) + parseFloat(accounting.unformat(ppnSubEL.getValue())) + parseFloat(accounting.unformat(ppnIntEL.getValue())) + parseFloat(accounting.unformat(ppnbmEL.getValue())) + parseFloat(accounting.unformat(bbnEl.getValue())) + parseFloat(accounting.unformat(bphtbEl.getValue())) + parseFloat(accounting.unformat(bajbEl.getValue())) + parseFloat(accounting.unformat(pph22EL.getValue()));

		total = me.roundlib.rounding(me.typeCalculaterounding, total);
		f.down('[name=' + me.flagSection + '_total]').setValue(accounting.formatMoney(total));
	},
	changeHargaNetto: function () {
		var me = this;
		var f  = me.getFormdata();

		var total = parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_jual_dasar]').getValue())) - (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_tot_disc_harga_dasar]').getValue())) + parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_tot_disc_harga_tanah]').getValue())) + parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_tot_disc_harga_bangunan]').getValue())));
			total = me.roundlib.rounding(me.typeCalculaterounding, total);

		f.down('[name=' + me.flagSection + '_harga_netto]').setValue(accounting.formatMoney(total));

		me.changeHargaTotal();
	},
	changeHargaJualDasar: function () {
		var me = this;
		var f  = me.getFormdata();

		var hargaSubsididp = parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_subsidi_dp]').getValue()));
		var hargaInterior  = parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_interior]').getValue()));
		var hargaBangunan  = parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_bangunan]').getValue()));
		var hargaTanah     = me.realValue[me.flagSection + '_harga_tanah_b'];
		var hargaKelebihan = me.realValue[me.flagSection + '_harga_kelebihan_b'];

		if (!hargaKelebihan) {
			hargaKelebihan = 0;
		}
		if (!hargaTanah) {
			hargaTanah = 0;
		}

		var hasil = parseFloat(hargaSubsididp) + parseFloat(hargaInterior) + parseFloat(hargaBangunan) + parseFloat(hargaTanah) + parseFloat(hargaKelebihan);
			hasil = me.roundlib.rounding(me.typeCalculaterounding, hasil);

		f.down('[name=' + me.flagSection + '_harga_jual_dasar]').setValue(accounting.formatMoney(hasil));

		me.formulaDiscount({
			elDisc    : me.flagSection + '_disc_harga_dasar',
			elTotal   : me.flagSection + '_tot_disc_harga_dasar',
			valSource : (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_jual_dasar]').getValue())))
		});
	},
	changeHargaKelebihan: function (el) {
		var me = this;
		var f  = me.getFormdata();

		var harga      = parseFloat(accounting.unformat(el.getValue()));
		var lebihTanah = parseFloat(accounting.unformat(f.down('[name=kelebihan]').getValue()));
		var hasil      = accounting.toFixed(parseFloat(lebihTanah) * parseFloat(harga), 2);
			hasil 	   = me.roundlib.rounding(me.typeCalculaterounding, hasil);

		me.realValue[me.flagSection + '_harga_kelebihan_b'] = hasil;

		f.down('[name=' + me.flagSection + '_harga_kelebihan_b]').setValue(accounting.formatMoney(hasil));

		me.realValue[me.flagSection + '_harga_tanah_b'] = parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_tanah_b]').getValue()));

		me.changeHargaJualDasar();

		me.formulaDiscount({
			elDisc    : me.flagSection + '_ppn_tanah',
			elTotal   : me.flagSection + '_tot_ppn_tanah',
			valSource : (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_tanah_b]').getValue())) + parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_kelebihan_b]').getValue())))
		});
	},
	changeHargaTanah: function (el) {
		var me = this;
		var f  = me.getFormdata();

		var harga     = parseFloat(accounting.unformat(el.getValue()));
		var luasTanah = parseFloat(accounting.unformat(f.down('[name=land_size]').getValue()));
		var hasil     = accounting.toFixed(parseFloat(luasTanah) * parseFloat(harga), 2);
			hasil 	  = me.roundlib.rounding(me.typeCalculaterounding, hasil);

		me.realValue[me.flagSection + '_harga_tanah_b'] = hasil;

		f.down('[name=' + me.flagSection + '_harga_tanah_b]').setValue(accounting.formatMoney(hasil));

		me.realValue[me.flagSection + '_harga_kelebihan_b'] = parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_kelebihan_b]').getValue()));

		me.changeHargaJualDasar();

		me.formulaDiscount({
			elDisc    : me.flagSection + '_disc_harga_tanah',
			elTotal   : me.flagSection + '_tot_disc_harga_tanah',
			valSource : (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_tanah_b]').getValue())))
		});

		me.formulaDiscount({
			elDisc    : me.flagSection + '_ppn_tanah',
			elTotal   : me.flagSection + '_tot_ppn_tanah',
			valSource : (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_tanah_b]').getValue())) + parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_kelebihan_b]').getValue())))
		});
	},
	changeHargaBangunan: function () {
		var me = this;
		var f  = me.getFormdata();

		me.realValue[me.flagSection + '_harga_tanah_b'] = parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_tanah_b]').getValue()));
		me.realValue[me.flagSection + '_harga_kelebihan_b'] = parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_kelebihan_b]').getValue()));

		me.changeHargaJualDasar();

		me.formulaDiscount({
			elDisc    : me.flagSection + '_disc_harga_bangunan',
			elTotal   : me.flagSection + '_tot_disc_harga_bangunan',
			valSource : (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_bangunan]').getValue())))
		});

		me.formulaDiscount({
			elDisc    : me.flagSection + '_ppn_bangunan',
			elTotal   : me.flagSection + '_tot_ppn_bangunan',
			valSource : (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_bangunan]').getValue())))
		});
	},
	changeSubsididp: function () {
		var me = this;
		var f  = me.getFormdata();

		me.changeHargaJualDasar();

		me.formulaDiscount({
			elDisc    : me.flagSection + '_ppnsubsidi_dp',
			elTotal   : me.flagSection + '_tot_ppnsubsidi_dp',
			valSource : (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_subsidi_dp]').getValue())))
		});
	},
	changeHargaInterior: function () {
		var me = this;
		var f  = me.getFormdata();

		me.changeHargaJualDasar();

		me.formulaDiscount({
			elDisc    : me.flagSection + '_ppninterior',
			elTotal   : me.flagSection + '_tot_ppninterior',
			valSource : (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_interior]').getValue())))
		});
	},
	changeHargaBangunanbyJualDasar: function () {
		var me = this;
		var f  = me.getFormdata();

		var total = parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_jual_dasar]').getValue())) - (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_tanah_b]').getValue())) + parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_kelebihan_b]').getValue())) + parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_subsidi_dp]').getValue())) + parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_interior]').getValue())));
			total = me.roundlib.rounding(me.typeCalculaterounding, total);

		f.down('[name=' + me.flagSection + '_harga_bangunan]').setValue(accounting.formatMoney(total));

		me.formulaDiscount({
			elDisc    : me.flagSection + '_disc_harga_dasar',
			elTotal   : me.flagSection + '_tot_disc_harga_dasar',
			valSource : (parseFloat(accounting.unformat(f.down('[name=' + me.flagSection + '_harga_jual_dasar]').getValue())))
		});
	},
	selectunitgridSelection: function (el) {
		var me        = this;
		var unitGrid  = el.up('grid');
		var unitStore = el.up('grid').getStore();
		var rows      = unitGrid.getSelectionModel().getSelection();

		if (rows.length < 1) {
			Ext.Msg.alert('Info', 'No unit selected !');
			return;
		} else {
			var kavNumberAr = '';
			var unitIdAr    = '';
			var count       = 0;
			var pt_id       = false;

			for (var i = 0; i < rows.length; i++) {
				if (rows[i].data.pt_pt_id == 0) {
					pt_id = true;
					break;
				}
			}
			if (pt_id) { // added by rico 16032023
				Ext.Msg.show({
					title: 'Alert',
					msg: 'PT Unit belum di set, Silakan set PT Unit terlebih dahulu',
					icon: Ext.Msg.WARNING,
					buttons: Ext.Msg.OK
				});
			} else {
				for (var x in rows) {
					count++;
					kavNumberAr += rows[x].data.unit_number;
					unitIdAr += rows[x].data.unit_id;
					if (count < rows.length) {
						kavNumberAr += ',';
						unitIdAr += '~';
					}
				}
				el.up('window').destroy();

				me.instantWindow('FormData', 800, 'Add Marketing Stock', 'create', 'myMarketingStockFormData');

				me.getFormdata().down('[name=unit_number]').setValue(kavNumberAr);
				me.getFormdata().down('[name=list_unit_id]').setValue(unitIdAr);

				me.loadUnitData(rows[0].data.unit_id);

				//// check selected record in main grid
				var grid = me.getGrid();
				var slcData = grid.getSelectionModel().getSelection()[0];
				if (slcData != undefined) {
					me.loadPrice(slcData.data.unit_id);
				}
			}
		}
	},
	selectunitgridAfterRender: function (el, a, b) {
		var me = this;
		var p = el.up("panel");
		el.doInit();

		el.getStore().getProxy().setExtraParam('mode_read', 'unitlist');

		el.getStore().loadPage(1, {
			callback : function (rec, operation, success) {
				if (!el.getStore().modelExist) {
					el.attachModel(operation);
				}

				var pg = el.down("pagingtoolbar");
				if (pg) {
					pg.getStore().load();
				}
			}
		});
		return;

		me.tools.ajax({
			params  : {},
			success : function (data, model) {
				me.tools.wesea({
					data  : data,
					model : model
				}, el).grid();
				p.setLoading(false);
			}
		}).read('unitlist');
	},
	syncSF: function () {
		var me = this;
		Ext.Msg.confirm('Confirm', 'Are you sure want to sync ?', function (btn) {
			if (btn == "yes") {
				var data = [];
				row = me.getGrid().getSelectionModel().getSelection();
				Ext.each(row, function (rec, idx) {
					data.push(rec.data);
				});
				var myObj = {
					dataUnit : data
				}

				resetTimer();
				me.getGrid().up('window').body.mask('Synchronization, please wait ...');
				me.tools.ajax({
					params : {
						data : Ext.encode(myObj)
					},
					success: function (response) {
						me.getGrid().up('window').body.unmask();
						Ext.Msg.show({
							title   : 'Success',
							msg     : 'Data sync successfully.',
							icon    : Ext.Msg.INFO,
							buttons : Ext.Msg.OK,
						});
					}
				}).read('sync');
			}

		});
	},
	showDeleteReason: function () { // add by iqbal 17 april 2019
		var me                   = this;
		var grid                 = me.getGrid();
		var store                = grid.getStore();
		var record               = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
		var marketstock_id       = record.data.marketstock_id;
		var unit_status          = record.data.unitstatus_status;
		var globalparameterStore = me.getMasterdeletereasonStore();

		globalparameterStore.load();

		var combo = Ext.create('Ext.form.field.ComboBox', {
			editable     : false,
			queryMode    : 'local',
			valueField   : 'Deletereason_id',
			displayField : 'Deletereason',
			fieldLabel   : 'Select Reason',
			labelWidth   : '18%',
			width        : '100%',
			padding      : '10px 0 0 10px',
			store        : globalparameterStore
		});

		var confirmmsg, successmsg, failmsg;
		var rows = me.getGrid().getSelectionModel().getSelection();
		var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
		if (rows.length == 1) {
			var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
			confirmmsg = 'Delete ' + selectedRecord + ' ?';
			failmsg    = 'Error: Unable to delete ' + selectedRecord + '.';

			Ext.create('Ext.window.Window', {
				title   : confirmmsg,
				height  : 210,
				width   : 380,
				padding : '10px 10px 10px 10px',
				modal   : true,
				items   : [
					{// Let's put an empty grid in just to illustrate fit layout
						xtype : combo,
						name  : 'delete_reason',
					},
					{
						xtype            : 'textareafield',
						height           : 60,
						itemId           : 'description',
						name             : 'description',
						fieldLabel       : 'Description',
						padding          : '10px 0 0 10px',
						enforceMaxLength : true,
						maskRe           : /[^\`\"\']/,
						maxLength        : 255
					}
				],
				dockedItems : [
					{
						xtype  : 'toolbar',
						dock   : 'bottom',
						ui     : 'footer',
						layout : {
							padding : 6,
							type    : 'hbox'
						},
						items : [
							{
								xtype   : 'button',
								action  : 'saveDeleteReason',
								padding : 5,
								width   : 75,
								iconCls : 'icon-save',
								text    : 'Process',
								handler : function () {
									var delete_reason = this.up('window').items.items[0].value;
									var desc          = this.up('window').items.items[1].value;
									if (!delete_reason) {
										Ext.Msg.show({
											title   : 'Alert',
											msg     : 'Please Select Reason First',
											icon    : Ext.Msg.WARNING,
											buttons : Ext.Msg.OK
										});
										return false;
									}

									if (!desc) {
										Ext.Msg.show({
											title   : 'Alert',
											msg     : 'Please Fill the Description',
											icon    : Ext.Msg.WARNING,
											buttons : Ext.Msg.OK
										});
										return false;
									}

									if (unit_status != 'STOCK') {
										Ext.Msg.show({
											title   : 'Alert',
											msg     : 'This unit can not be deleted because the status not STOCK',
											icon    : Ext.Msg.WARNING,
											buttons : Ext.Msg.OK
										});
										return false;
									}
									this.up('window').body.mask('Processing, Please Wait...');

									me.saveDeleteReason(delete_reason, desc, marketstock_id, this.up('window'));
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
		} else { // if delete more than one selected

			confirmmsg = 'This action will delete ' + recordcounttext + '. Continue ?';
			failmsg = 'Error: Unable to delete data.';
			Ext.create('Ext.window.Window', {
				title   : confirmmsg,
				height  : 135,
				width   : 380,
				padding : '10px 10px 10px 10px',
				modal   : true,
				items   : {// Let's put an empty grid in just to illustrate fit layout
					xtype : combo,
					name  : 'delete_reason',
				},
				dockedItems : [
					{
						xtype  : 'toolbar',
						dock   : 'bottom',
						ui     : 'footer',
						layout : {
							padding : 6,
							type    : 'hbox'
						},
						items : [
							{
								xtype   : 'button',
								action  : 'saveDeleteReason',
								padding : 5,
								width   : 75,
								iconCls : 'icon-save',
								text    : 'Process',
								handler : function () {
									var delete_reason = this.up('window').items.items[0].value;
									if (!delete_reason) {
										Ext.Msg.show({
											title   : 'Alert',
											msg     : 'Please Select Reason First',
											icon    : Ext.Msg.WARNING,
											buttons : Ext.Msg.OK
										});
										return false;
									}

									if (unit_status != 'STOCK') {
										Ext.Msg.show({
											title   : 'Alert',
											msg     : 'This unit can not be deleted because the status not STOCK',
											icon    : Ext.Msg.WARNING,
											buttons : Ext.Msg.OK
										});
										return false;
									}

									this.up('window').body.mask('Processing, Please Wait...');

									me.saveDeleteReason(delete_reason, '', marketstock_id, this.up('window'));
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
		}
	},
	saveDeleteReason: function (text, desc, marketstock_id, win) { // add by iqbal 17 april 2019
		var me = this;

		Ext.Ajax.request({
			url    : 'erems/marketingstock/delete',
			params : {
				read_type_mode    : 'update_delete_reason',
				Deletereason_id   : text,
				Deletereason_desc : desc,
				marketstock_id    : marketstock_id
			},
			success: function (response) {
				win.body.unmask();
				Ext.Msg.show({
					title   : 'Success',
					msg     : 'Delete successfully.',
					icon    : Ext.Msg.INFO,
					buttons : Ext.Msg.OK,
					fn      : function () {
						win.close();
						var gridDepan = me.getGrid();
						var storeDepan = gridDepan.getStore();
						storeDepan.reload();
					}
				});
			},
			failure: function () {
				Ext.Msg.show({
					title   : 'Failure',
					msg     : 'Error: Unable to delete data.',
					icon    : Ext.Msg.ERROR,
					buttons : Ext.Msg.OK
				});
			},
		});
	},
	execAction: function (el, action, me) {
		if (!action) {
			action = '';
		}
		if (!me) {
			me = this;
		}

		switch (action) {
			case me.bindPrefixName + 'Create':
				me.selectUnitGridShow();
				break;
			case me.bindPrefixName + 'Update':
				me.formDataShow(el, acts[action], action);
				break;
			case 'show':
				me.formDataShow(el, action);
				break;
				// case me.bindPrefixName + 'Delete':
				// 	me.showDeleteReason(el, acts[action], action);
				// 	break;
			case me.bindPrefixName + 'Print':
				loadReport(el, 'tms/building/print');
				break;
		}
	},
	selectUnitGridShow: function () {
		var me = this;

		me.instantWindow('SelectUnitPanel', 800, 'Select Unit');

		// added 2 Maret 2015
		var fs   = me.getFormsearchunit();
		var data = me.setData.myMasterData;
		var ar   = ['cluster', 'block', 'type', 'position', 'productcategory', 'side'];
		for (var i in ar) {
			var el = fs.down("[name=" + ar[i] + '_' + me.cbf[ar[i]]['v'] + "]");
			if (el) {
				me.tools.wesea(data[ar[i]], el).comboBox(true);
			}
		}
	},
	getFinalData: function (formGetValues) {
		/// 1 -> TUNAI , 2 -> KPR , 3 -> INHOUSE <==== ID PRICETYPE
		var finalData = formGetValues;

		finalData['harga_KPR'] = {};
		var jenisHarga = [{name: 'harga_TUNAI', prefix: 't'}, {name: 'harga_KPR', prefix: 'k'}, {name: 'harga_INHOUSE', prefix: 'ih'}];
		var delimeter = '~';

		finalData['tanahpermeter']            = '';
		finalData['kelebihantanah']           = '';
		finalData['harga_tanah']              = '';
		finalData['harga_kelebihantanah']     = '';
		finalData['harga_bangunan']           = '';
		finalData['subsidi_dp']               = '';
		finalData['harga_interior']           = '';
		finalData['harga_jualdasar']          = '';
		finalData['persen_dischargedasar']    = '';
		finalData['harga_dischargedasar']     = '';
		finalData['persen_dischargetanah']    = '';
		finalData['harga_dischargetanah']     = '';
		finalData['persen_dischargebangunan'] = '';
		finalData['harga_dischargebangunan']  = '';
		finalData['harga_neto']               = '';
		finalData['persen_ppntanah']          = '';
		finalData['harga_ppntanah']           = '';
		finalData['persen_ppnbangunan']       = '';
		finalData['harga_ppnbangunan']        = '';
		finalData['persen_ppnsubsidi_dp']     = '';
		finalData['harga_ppnsubsidi_dp']      = '';
		finalData['persen_ppninterior']       = '';
		finalData['harga_ppninterior']        = '';
		finalData['persen_ppnbm']             = '';
		finalData['harga_ppnbm']              = '';
		finalData['persen_pph22']             = '';
		finalData['harga_pph22']              = '';
		finalData['harga_bbnsertifikat']      = '';
		finalData['harga_bphtb']              = '';
		finalData['harga_bajb']               = '';
		finalData['harga_jual']               = '';

		for (var x = 0; x < jenisHarga.length; x++) {

			delimeter = x < (jenisHarga.length - 1) ? '~' : '';
			finalData[jenisHarga[x]['name']] = {'total': accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_total'])};

			finalData['tanahpermeter']            += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_tanah_a']) + '' + delimeter;
			finalData['kelebihantanah']           += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_kelebihan_a']) + '' + delimeter;
			finalData['harga_tanah']              += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_tanah_b']) + '' + delimeter;
			finalData['harga_kelebihantanah']     += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_kelebihan_b']) + '' + delimeter;
			finalData['harga_bangunan']           += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_bangunan']) + '' + delimeter;
			finalData['subsidi_dp']               += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_subsidi_dp']) + '' + delimeter;
			finalData['harga_interior']           += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_interior']) + '' + delimeter;
			finalData['harga_jualdasar']          += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_jual_dasar']) + '' + delimeter;
			finalData['persen_dischargedasar']    += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_disc_harga_dasar']) + '' + delimeter;
			finalData['harga_dischargedasar']     += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_tot_disc_harga_dasar']) + '' + delimeter;
			finalData['persen_dischargetanah']    += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_disc_harga_tanah']) + '' + delimeter;
			finalData['harga_dischargetanah']     += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_tot_disc_harga_tanah']) + '' + delimeter;
			finalData['persen_dischargebangunan'] += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_disc_harga_bangunan']) + '' + delimeter;
			finalData['harga_dischargebangunan']  += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_tot_disc_harga_bangunan']) + '' + delimeter;
			finalData['harga_neto']               += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_netto']) + '' + delimeter;
			finalData['persen_ppntanah']          += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_ppn_tanah']) + '' + delimeter;
			finalData['harga_ppntanah']           += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_tot_ppn_tanah']) + '' + delimeter;
			finalData['persen_ppnbangunan']       += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_ppn_bangunan']) + '' + delimeter;
			finalData['harga_ppnbangunan']        += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_tot_ppn_bangunan']) + '' + delimeter;
			finalData['persen_ppnsubsidi_dp']     += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_ppnsubsidi_dp']) + '' + delimeter;
			finalData['harga_ppnsubsidi_dp']      += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_tot_ppnsubsidi_dp']) + '' + delimeter;
			finalData['persen_ppninterior']       += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_ppninterior']) + '' + delimeter;
			finalData['harga_ppninterior']        += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_tot_ppninterior']) + '' + delimeter;
			finalData['persen_ppnbm']             += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_ppnbm']) + '' + delimeter;
			finalData['harga_ppnbm']              += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_tot_ppnbm']) + '' + delimeter;
			finalData['persen_pph22']             += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_pph22']) + '' + delimeter;
			finalData['harga_pph22']              += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_tot_pph22']) + '' + delimeter;
			finalData['harga_bbnsertifikat']      += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_balik_nama']) + '' + delimeter;
			finalData['harga_bphtb']              += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_bphtb']) + '' + delimeter;
			finalData['harga_bajb']               += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_harga_bajtb']) + '' + delimeter;
			finalData['harga_jual']               += accounting.unformat(formGetValues[jenisHarga[x]['prefix'] + '_total']) + '' + delimeter;
		}

		return finalData;
	},
	formDataAfterRender: function (el) {
		var me = this;

		me.loadComboBoxStore(el);

		var state = el.up('window').state;
		var grid  = me.getGrid();
		var store = grid.getStore();
		var f     = me.getFormdata();
		var datas = me.setData.myMasterData;

		me.setActiveForm(me.getFormdata());


		me.tools.wesea(datas.type, f.down("[name=type_type_id]")).comboBox();
		me.tools.wesea(datas.pt, f.down("[name=pt_pt_id]")).comboBox();

		if (me.isSH2 == 0) {
			f.down('#box_subsidi_dp').setVisible(false);
			f.down('#box_harga_interior').setVisible(false);
			f.down('#box_ppn_subsidi_dp').setVisible(false);
			f.down('#box_ppn_interior').setVisible(false);
			f.down('#box_t_subsidi_dp').setVisible(false);
			f.down('#box_k_subsidi_dp').setVisible(false);
			f.down('#box_ih_subsidi_dp').setVisible(false);
			f.down('#box_t_harga_interior').setVisible(false);
			f.down('#box_k_harga_interior').setVisible(false);
			f.down('#box_ih_harga_interior').setVisible(false);
			f.down('#box_t_ppnsubsidi_dp').setVisible(false);
			f.down('#box_k_ppnsubsidi_dp').setVisible(false);
			f.down('#box_ih_ppnsubsidi_dp').setVisible(false);
			f.down('#box_t_ppninterior').setVisible(false);
			f.down('#box_k_ppninterior').setVisible(false);
			f.down('#box_ih_ppninterior').setVisible(false);
		}

		if (state == 'create') { /// USELESS
			f.editedRow = -1;
			f.setLoading("Please wait...");

			f.down("[name=t_ppnbm]").setValue(me.tools.floatval(me.priceTypeList['GLOBALPARAMSPARAMS']['GLOBAL_PPNBM']));
			f.down("[name=t_pph22]").setValue(me.tools.floatval(me.priceTypeList['GLOBALPARAMSPARAMS']['GLOBAL_PPH22']));
			f.down("[name=t_ppn_tanah]").setValue(me.tools.floatval(me.priceTypeList['GLOBALPARAMSPARAMS']['GLOBAL_PPN_PL']));
			f.down("[name=t_ppn_bangunan]").setValue(me.tools.floatval(me.priceTypeList['GLOBALPARAMSPARAMS']['GLOBAL_PPN_PL']));
			f.down("[name=k_ppn_tanah]").setValue(me.tools.floatval(me.priceTypeList['GLOBALPARAMSPARAMS']['GLOBAL_PPN_PL']));
			f.down("[name=k_ppn_bangunan]").setValue(me.tools.floatval(me.priceTypeList['GLOBALPARAMSPARAMS']['GLOBAL_PPN_PL']));
			f.down("[name=ih_ppn_tanah]").setValue(me.tools.floatval(me.priceTypeList['GLOBALPARAMSPARAMS']['GLOBAL_PPN_PL']));
			f.down("[name=ih_ppn_bangunan]").setValue(me.tools.floatval(me.priceTypeList['GLOBALPARAMSPARAMS']['GLOBAL_PPN_PL']));
			f.down("[name=serahterima_plan]").setValue(new Date());
			/// Added by erwin.st 31052021
			f.down("[name=type_type_id]").setReadOnly(me.priceTypeList['CHANGE_TYPE'] == 0 ? true : false);

			f.setLoading(false);
		} else if (state == 'update') {
			f.editedRow = me.getGrid().getSelectedRow();
			var rec = me.getGrid().getSelectedRecord();

			f.setLoading("Please wait...");
			me.tools.ajax({
				params: {},
				success: function (data, model) {
					me.useRumusBiaya = data['others'][0][0]['USE_RUMUSBIAYA'];
					// me.mkProlibFile = data['others'][0][0]['PROLIBFILE'];
					// get status unit stock bisa update

					if (rec.data["unitstatus_status"] === "STOCK" || rec.data["unitstatus_status"] === "HOLD MANAGEMENT") {
						f.down("[action=save]").show();
					} else {
						f.down("[action=save]").hide();
					}

					if (rec.data["state_admistrative"] === 3) {
						f.down("[action=saveToAll]").show();
					} else {
						f.down("[action=saveToAll]").hide();
					}
					me.priceTypeList = data['others'][0][0];
					f.setLoading(false);
					var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
					el.loadRecord(record);
					//Load data unit
					me.loadUnitData(record.get("unit_unit_id"));
					//status_text
					me.getFormdata().down('[name=status_text]').setValue(record.get("unitstatus_status"));

					//** SET DATA TO FORM*/
					me.loadPrice(record.get("unit_unit_id"));
					//** END SET DATA TO FORM*///
					// convert all money field
					var vs = me.getFormdata().getForm().getValues();
					for (var i in vs) {
						var elx = me.getFormdata().down("[name=" + i + "]");
						if (elx) {
							if (elx.getXType() === 'xmoneyfield') {
								elx.setRawValue(accounting.formatMoney(elx.getValue()));
							}
						}
					}
				}
			}).read('detail');

			var visible_btn_save = false;
			if (rec.data["unitstatus_status"] === "STOCK" || rec.data["unitstatus_status"] === "HOLD MANAGEMENT") {
				visible_btn_save = true;
			}
			f.down("[action=save]").setVisible(visible_btn_save);

			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);
			me.loadUnitData(record.get("unit_unit_id"));
			me.getFormdata().down('[name=status_text]').setValue(record.get("unitstatus_status"));
			me.loadPrice(record.get("unit_unit_id"));
			/// Added by erwin.st 31052021
			f.down("[name=type_type_id]").setReadOnly(me.priceTypeList['CHANGE_TYPE'] == 0 ? true : false);

			f.setLoading(false);
		}
	},
	loadUnitData: function (unitId) {
		var me = this;
		var f  = me.getFormdata();

		f.setLoading("Please wait...");
		me.tools.ajax({
			params  : {unit_id: unitId},
			success : function (data, model) {
				data = data[0];
				var prefix = '';
				var el = null;
				for (var x in data) {
					prefix = x === "unit" ? "" : x + "_";
					for (var y in data[x]) {
						if (y != "unit_number") {
							el = f.down("[name=" + prefix + "" + y + "]");

							if (el) {
								el.setValue(data[x][y]);
							}
						}
					}
				}

				var sp = data["unit"]["serahterima_plan"];
				f.down("[name=serahterima_plan]").setValue(sp);
				f.down("[name=purpose_code]").setValue(data["purpose"]["code"]);

				if (f.editedRow > -1) {
					f.down("[name=unit_number]").setValue(data.unit.unit_number);
					if (data.unit.is_readysell) {
						f.down("[name=unit_is_readysell]").setValue(data.unit.is_readysell);
					}
				}

				f.setLoading(false);
			}
		}).read('selectedunit');
	},
	mainDataSave: function (mode) {
		var me = this;
		var m  = typeof mode !== "undefined" ? mode : "";
		var f  = me.getFormdata();

		me.insSave({
			form      : f,
			grid      : me.getGrid(),
			finalData : function (data) {
				var temp  = '', tunai = {}, inhouse = {}, kpr = {};
				for (var i in data) {
					temp = i;
					temp = temp.split("_", 1);
					if (temp[0]) {
						if (temp[0] === "t") {
							for (var x in me.exchangeFields) {
								if (me.exchangeFields[x].b === i.substr(1)) {

									tunai[me.exchangeFields[x].a] = accounting.unformat(data[i]);
								}
							}
						} else if (temp[0] === "ih") {
							for (var x in me.exchangeFields) {
								if (me.exchangeFields[x].b === i.substr(2)) {
									inhouse[me.exchangeFields[x].a] = accounting.unformat(data[i]);
								}
							}
						} else if (temp[0] === "k") {
							for (var x in me.exchangeFields) {
								if (me.exchangeFields[x].b === i.substr(1)) {
									kpr[me.exchangeFields[x].a] = accounting.unformat(data[i]);
								}
							}
						}
					}
				}

				tunai['pricetype_id']   = me.priceTypeList['PT_TUNAI'];
				inhouse['pricetype_id'] = me.priceTypeList['PT_INH'];
				kpr['pricetype_id']     = me.priceTypeList['PT_KPR'];

				var detail = [];
				detail.push(tunai);
				detail.push(inhouse);
				detail.push(kpr);

				data["savetoAll"] = me.savetoAll;
				data["detail"]    = detail;

				return data;
			},
			sync     : true,
			callback : {
				create : function (store, form, grid) {}
			}
		});
	},
	loadPrice: function (unitId) {
		var me = this;
		var f = me.getFormdata();
		f.setLoading("Please wait...");
		me.tools.ajax({
			params: {unit_id: unitId},
			success: function (data, model) {
				var myData = null;
				var prefixName = '';
				var notIncField = ['price_id', 'pricetype_id', 'unit_id'];
				var x = null;

				me.getFormdata().down('[name=unit_id]').setValue(unitId);

				for (var i = 0; i < data.length; i++) {
					myData = data[i].price;
					if (myData['pricetype_id'] == me.priceTypeList.PT_TUNAI) {
						prefixName = 't';
					} else if (myData['pricetype_id'] == me.priceTypeList.PT_KPR) {
						prefixName = 'k';
					} else {
						prefixName = 'ih';
					}

					var el = null;
					for (var x in myData) {
						el = f.down('[name=' + prefixName + '' + me.exchangeFields[x].b + ']');
						// console.log(prefixName + '' + me.exchangeFields[x].b);
						if (el) {
							el.setValue(accounting.formatMoney(myData[x], {precision: el.getDecPrecision()}));
						} else {
							// console.log(prefixName + '_' + x);
						}
					}
				}

				f.setLoading(false);
			}
		}).read('price');
	},
	exchangeFields: {
		'harga_bajb'               : {a: 'harga_bajb', b: '_harga_bajtb'},
		'harga_bangunan'           : {a: 'harga_bangunan', b: '_harga_bangunan'},
		'subsidi_dp'               : {a: 'subsidi_dp', b: '_subsidi_dp'},
		'harga_interior'           : {a: 'harga_interior', b: '_harga_interior'},
		'harga_bbnsertifikat'      : {a: 'harga_bbnsertifikat', b: '_harga_balik_nama'},
		'harga_bphtb'              : {a: 'harga_bphtb', b: '_harga_bphtb'},
		'harga_dischargebangunan'  : {a: 'harga_dischargebangunan', b: '_tot_disc_harga_bangunan'},
		'harga_dischargedasar'     : {a: 'harga_dischargedasar', b: '_tot_disc_harga_dasar'},
		'harga_dischargetanah'     : {a: 'harga_dischargetanah', b: '_tot_disc_harga_tanah'},
		'harga_jual'               : {a: 'harga_jual', b: '_total'},
		'harga_jualdasar'          : {a: 'harga_jualdasar', b: '_harga_jual_dasar'},
		'harga_kelebihantanah'     : {a: 'harga_kelebihantanah', b: '_harga_kelebihan_b'},
		'harga_neto'               : {a: 'harga_neto', b: '_harga_netto'},
		'harga_ppnbangunan'        : {a: 'harga_ppnbangunan', b: '_tot_ppn_bangunan'},
		'harga_ppnsubsidi_dp'      : {a: 'harga_ppnsubsidi_dp', b: '_tot_ppnsubsidi_dp'},
		'harga_ppninterior'        : {a: 'harga_ppninterior', b: '_tot_ppninterior'},
		'harga_ppnbm'              : {a: 'harga_ppnbm', b: '_tot_ppnbm'},
		'harga_pph22'              : {a: 'harga_pph22', b: '_tot_pph22'},
		'harga_ppntanah'           : {a: 'harga_ppntanah', b: '_tot_ppn_tanah'},
		'harga_tanah'              : {a: 'harga_tanah', b: '_harga_tanah_b'},
		'kelebihantanah'           : {a: 'kelebihantanah', b: '_harga_kelebihan_a'},
		'persen_dischargebangunan' : {a: 'persen_dischargebangunan', b: '_disc_harga_bangunan'},
		'persen_dischargedasar'    : {a: 'persen_dischargedasar', b: '_disc_harga_dasar'},
		'persen_dischargetanah'    : {a: 'persen_dischargetanah', b: '_disc_harga_tanah'},
		'persen_ppnbangunan'       : {a: 'persen_ppnbangunan', b: '_ppn_bangunan'},
		'persen_ppnsubsidi_dp'     : {a: 'persen_ppnsubsidi_dp', b: '_ppnsubsidi_dp'},
		'persen_ppninterior'       : {a: 'persen_ppninterior', b: '_ppninterior'},
		'persen_ppnbm'             : {a: 'persen_ppnbm', b: '_ppnbm'},
		'persen_pph22'             : {a: 'persen_pph22', b: '_pph22'},
		'persen_ppntanah'          : {a: 'persen_ppntanah', b: '_ppn_tanah'},
		'price_id'                 : {a: 'price_id', b: ''},
		'pricetype_id'             : {a: 'pricetype_id', b: ''},
		'tanahpermeter'            : {a: 'tanahpermeter', b: '_harga_tanah_a'},
		'tanahpermeter_text'       : {a: 'tanahpermeter_text', b: 'tanahpermeter_text'},
		'unit_id'                  : {a: 'unit_id', b: ''}
	},
	updateTypeInfo: function () {
		var me = this;
		var f = me.getFormdata();
		var t = f.down("[name=type_type_id]");
		var i = t.getStore().findExact('type_id', t.getValue());

		var rec = t.getStore().getAt(i);
		if (rec) {
			for (var x in rec.data) {
				var el = f.down("[name=" + x + "]");
				if (el && x != 'kelebihan') {
					el.setValue(rec.data[x]);
				}
			}
			f.down("[name=type_code]").setValue(rec.get("code"));
		}
	},
	popupSaveToAll: function () {
		var me = this;
		Ext.create('Ext.window.Window', {
			id      : 'saveToAllWindow',
			title   : 'Save to All',
			height  : 200,
			width   : 250,
			layout  : 'hbox',
			padding : '10px 10px 10px 10px',
			modal   : true,
			items   : {
				xtype      : 'radiogroup',
				fieldLabel : '',
				allowBlank : false,
				labelWidth : '120px',
				name       : 'rgSaveToAll',
				anchor     : '50%',
				columns    : 1,
				items      : [
					{boxLabel: 'Update All By Cluster', name: 'updateAll', inputValue: 'byCluster', checked: true},
					{boxLabel: 'Update All By Block', name: 'updateAll', inputValue: 'byBlock'},
					{boxLabel: 'Update All By Type', name: 'updateAll', inputValue: 'byType'},
				]
			},
			dockedItems: [
				{
					xtype  : 'toolbar',
					dock   : 'bottom',
					ui     : 'footer',
					layout : {type: 'hbox'},
					items  : [
						{
							xtype   : 'button',
							padding : 5,
							width   : 75,
							iconCls : 'icon-save',
							text    : 'Process',
							handler : function () {
								var option       = this.up('window').down('[name=rgSaveToAll]').getChecked()[0].inputValue;
								var window       = this.up('window');
								var f            = me.getFormdata();
								var buildingSize = f.down('[name=building_size]').getValue();
								var msg          = buildingSize > 0 ? 'Unit' : 'Kavling';

								Ext.Msg.confirm('Confirm', 'Update Seluruh ' + msg + '?', function (btn) {
									if (btn == "yes") {
										me.savetoAll = option;
										window.close();
										me.mainDataSave();
									}
								});
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
	selectunitdataBeforeRender: function (el) {
		var me        = this;
		var items     = el.items.items;
		var textfield = Ext.ComponentQuery.query('[xtype=textfield]', items);

		for (var i = 0; i < textfield.length; i++) {
			textfield[i].on('keypress', function (e, el) {
				if (el.getCharCode() === 13) {
					me.selectunitdataSearch(e);
				}
			});
		}
	}
});
