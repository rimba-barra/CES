Ext.define('Erems.controller.Changeprice', {
	extend   : 'Erems.library.template.controller.Controller2',
	alias    : 'controller.Changeprice',
	views    : ['changeprice.Panel', 'changeprice.Grid', 'changeprice.FormSearch', 'changeprice.FormData'],
	requires : [
		'Erems.library.ScheduleGrid',
		'Erems.library.Browse',
		'Erems.library.Price',
		'Erems.library.box.Config',
		'Erems.library.box.tools.Tools',
		'Erems.template.ComboBoxFields',
		'Erems.library.box.tools.EventSelector',
		'Erems.library.Unitformula',
		'Erems.library.Calculator',
		'Erems.library.CalculatorDiscount',
		'Erems.library.CalculatorFields',
		'Erems.library.Purchaseletter',
		'Erems.library.ScheduleAddAdvance',
		'Erems.library.TigaSekawan',
		'Erems.library.TypeRounding',
		'Erems.library.Ppndtp',
		'Erems.library.DetailtoolAll',
	],
	stores : ['Scheduletype'],
	models : ['Scheduletype'],
	refs   : [
		{
			ref      : 'grid',
			selector : 'changepricegrid'
		},
		{
			ref      : 'formsearch',
			selector : 'changepriceformsearch'
		},
		{
			ref      : 'formdata',
			selector : 'changepriceformdata'
		},
		{
			ref      : 'mainpanel',
			selector : 'changepricepanel'
		},
		{
			ref      : 'schedulegrid',
			selector : 'changepriceschedulegrid'
		},
		{
			ref      : 'panel',
			selector : 'changepricepanel'
		},
		{
			ref      : 'formdataadv',
			selector : 'changepriceformdataaddschedule'
		},
		{
			ref      : 'formprintout',
			selector : 'changepriceformprintout'
		},
		{
			ref      : 'unitgrid',
			selector : 'changepriceunitgrid'
		},
		{
			ref      : 'formdataviewdocument',
			selector : 'changepriceformdataviewdocument'
		},
	],
	browseHandler          : null,
	controllerName         : 'changeprice',
	fieldName              : 'changeprice_id',
	bindPrefixName         : 'Changeprice',
	cpScheduleGen          : null, /// scheduleGenerator object holder
	formWidth              : 800,
	unitFormula            : null,
	oldScheduleRecordCount : 0,
	addedRowSch            : false,
	fillForm               : null, //// object Fillform

	setParamCP : {
		roundSchedule               : 1,
		typeCalculaterounding       : 0,
		processor                   : null,
		calculator                  : null,
		calculatorDiscount          : null,
		typeRounding                : null,
		libPpndtp                   : null,
		priceTypeKPRId              : 0,
		isApprovalUser              : false,
		verifikasiDiskonInfo        : null,
		globalParams                : null,
		opsiPrintout                : null,
		verification_approval       : false,
		isUsedVerification          : false,
		purchaseletterJs            : null,
		prolibs                     : null,
		prolibsFile                 : null,
		getPurcheletterSendWaActive : null,
		getPurcheletterSendWaPhone  : null,
		getPurcheletterSendWaText   : null,
		ppnValueadditional          : 10,
		pengakuanPenjualadate       : null,
		folderDocument              : '',
		npvdoc                      : 0,
		isSH2                       : 0,
		cbType                      : []
	},
	localStore : {
		detail       : null,
		price        : null,
		selectedUnit : null
	},
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

		me.tools        = new Erems.library.box.tools.Tools({config: me.myConfig});
		me.scheduleGrid = new Erems.library.ScheduleGrid();

		var events = new Erems.library.box.tools.EventSelector();

		me.setParamCP.typeRounding       = new Erems.library.TypeRounding();
		me.setParamCP.libPpndtp          = new Erems.library.Ppndtp();
		me.setParamCP.calculatorDiscount = new Erems.library.CalculatorDiscount();

		this.control({
			'changepricepanel': {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : this.panelAfterRender
			},
			'changepricegrid': {
				afterrender     : this.gridAfterRender,
				itemdblclick    : this.gridItemDblClick,
				itemcontextmenu : this.gridItemContextMenu,
				selectionchange : this.gridSelectionChange
			},
			'changepricegrid toolbar button[action=create]': {
				click : function () {
					this.formDataShow('create');
				}
			},
			'changepricegrid toolbar button[action=update]': {
				click : function () {
					this.formDataShow('update');
				}
			},
			'changepricegrid toolbar button[action=view]': {
				click : function () {
					this.formDataShow('read');
				}
			},
			'changepricegrid toolbar button[action=printmsword]': {
				click : function () {
					this.printMsWord();
				}
			},
			'changepricegrid toolbar button[action=destroy]': {
				click : this.dataDestroy
			},
			'changepricegrid toolbar button[action=print]': {
				click : this.dataPrint
			},
			'changepricegrid actioncolumn': {
				afterrender : this.gridActionColumnAfterRender,
				click       : this.gridActionColumnClick
			},
			'changepriceformsearch button[action=search]': {
				click : this.dataSearch
			},
			'changepriceformsearch button[action=reset]': {
				click : this.dataReset
			},
			'changepriceformdata': {
				afterrender  : this.formDataAfterRender,
				beforerender : function () {
					//  alert(me.getMainpanel().up('window'));

					// me.getMainpanel().up('window').body.mask('Saving data, please wait ...');
				},
				afterlayout: function () {
					// alert('After layout..');
				}
			},
			'changepriceformdata button[action=save]': {
				click : function () {
					me.mainDataSave();
				}
			},
			'changepriceformdata button[action=approve]': {
				click : function () {
					me.mainDataSave(1); // 1 = approve
				}

			},
			'changepriceformdata button[action=approvecoll]': {
				click : function () {
					me.mainDataSave(3); // 1 = approvecoll
				}

			},
			'changepriceformdata button[action=reject]': {
				click : function () {
					me.mainDataSave(2); // 2 = reject
				}

			},
			'changepriceformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'changepriceformdata textfield[name=new_pricetype_id]': {
				select: me.pricetypeIdSelect
			},
			/* END MATH CONTROL*/


			/*ADDED 3 MARET 2014*/
			'changepriceformdata button[action=browse_unit]': {
				click: this.browseSoldUnit
			},
			'changepriceunitgrid button[action=select]': {
				//                click: this.unitSelect
				click: this.cekApproval
			},
			'changepriceformdata textfield[name=pricetype_id]': {
				select: this.priceTypeOnSelect
			},
			'changepriceformdata button[action=genschedule]': {
				click: function () {
					me.cpgenerateSchedule();
				}
			},
			'changepriceformdata textfield[name=type_id_new]': {
				change: this.typeIdNewOnChange
			},
			'changepriceformdata checkboxfield[name=purchaseletterrevision_is_approve]': {
				change: this.approveOnChange
			},
			'changepriceformdata checkboxfield[name=is_ppn_additional]': {
				change : function(i, x) {
					if(me.empty(me.setParamCP.pengakuanPenjualadate)){
						me.isPPNAdditional(i, x);
					}
					else{
						me.getFormdata().down('[name=is_ppn_additional]').setValue(false);
						me.tools.alert.warning("Sudah Pengakuan Penjualan, tidak bisa Upgrade PPN ke " + me.setParamCP.ppnValueadditional + "%");
					}
				}
			},
			'changepriceformdata checkboxfield[name=is_nonppn_new]': {
				change : function(i, x) {
					var s = me.getSchedulegrid();

					me.getFormdata().down('[name=pricenew_is_nonppn]').setValue(x == true ? 1 : 0);
					s.down('[action=genPPNDTP]').setDisabled(!x);

					if(x == false){
						var idxPPNDTP = s.getStore().find('scheduletype_scheduletype', 'PPNDTP');

						if(idxPPNDTP > -1){
							Ext.Msg.confirm('Alert', 'This action will "DELETE" data schedule PPNDTP.<br />Continue ?', function (btn) {
								if (btn == 'yes') {
									s.getSelectionModel().select(s.getStore().getAt(idxPPNDTP));
									setTimeout(function () {
										me.scheduleGrid.removeSchedule(me, {
											fieldHargaTotalJual : 'new_harga_total_jual'
										}, me.getFormdata(), me.getSchedulegrid(), me.getGrid());
									}, 500);
								}
							});
						}
					}
				}
			},
			/////// SCHEDULE GRID
			'changepriceschedulegrid': {
				afterrender: function () {
					me.getSchedulegrid().on('edit', function (editor, e) {
						// commit the changes right after editing finished
						me.scheduleGrid.schedulGridOnEdit(me, {
							fieldHargaTotalJual : 'new_harga_total_jual'
						}, editor, e, me.getFormdata(), me.getSchedulegrid());
						e.record.commit();
					});
					me.getSchedulegrid().on('beforeedit', function (editor, e) {
						return me.scheduleGrid.schedulGridOnBeforeEdit(editor, e);
					});
				},
				cellclick: function (el, td, cellIndex, record, tr, rowIndex, e, eOpts) {
					me.scheduleGrid.schGridCellClick(el, record, rowIndex); // gak dipakai
				}
			},
			'changepriceschedulegrid toolbar button[action=create]': {
				click: function () {
					me.scheduleGrid.addNewSchedule(me, {
						purchase_date       : me.getFormdata().down("[name=purchaseletter_purchase_date]").getValue(),
						fieldHargaTotalJual : 'new_harga_total_jual'
					}, me.getFormdata(), me.getSchedulegrid());
				}
			},
			'changepriceschedulegrid toolbar button[action=split]': {
				click: function () {
					var proses = me.scheduleGrid.splitSchedule(me, {
						purchase_date       : me.getFormdata().down("[name=purchaseletter_purchase_date]").getValue(),
						fieldHargaTotalJual : 'new_harga_total_jual'
					}, me.getFormdata(), me.getSchedulegrid());
					if (!proses.hasil) {
						me.tools.alert.warning(proses.pesan);
					}
				}
			},
			'changepriceschedulegrid toolbar button[action=destroy]': {
				click: function () {
					me.scheduleGrid.removeSchedule(me, {
						fieldHargaTotalJual : 'new_harga_total_jual'
					}, me.getFormdata(), me.getSchedulegrid(), me.getGrid());
				}
			},
			/////// /SCHEDULE GRID
			'changepriceformdata [name=rencana_termin]': {
				keyup: function () {
					me.rencanaTerminonKeyUp();
				}
			},
			'changepriceparametersppjbgrid button[action=select]': {
				click: this.paramsppjbSelect
			},
			'changepriceschedulegrid toolbar button[action=create_adv]': {
				click: function () {
					me.addnewScheduleAdv();
				}
			},
			'changepriceschedulegrid toolbar button[action=genPPNDTP]': {
				click: function () {
					me.addNewPPNDTP();
				}
			},
			'changepriceformdataaddschedule button[action=save]': {
				click: function () {
					me.saveFormAdvanceOnClick();
				}
			},
			'changepriceformdata textfield[name=rencana_serahterima]': {
				keyup: function () {
					me.cpRencanaSerahTerimaOnKeyUp();
				}
			},
			'changepriceformdata [name=rencana_serahterima_date]': {
				select: function () {
					me.cpRencanaSerahTerimaDateOnSelect();
				}
			},
			'changepriceformprintout button[action=print]': {
				click: this.cpSelectPrintAdendum
			},
			'changepriceformdata [name=tanggal_validasi] ': {
				change: function (el, val) {
					me.tanggalvalidasi(val);
					// me.comboBoxOnChange(el, val);
				}
			},
			'changepriceformdata #fd_npv_doc_approved' : {
				change : function(fld){
					me.formDataUploadFileDoc(fld);
				}
			},
			'changepriceformdata #view_document': {
				afterrender: function (el) {
					el.getEl().on( "click", function () {
						me.detailTool = new Erems.library.DetailtoolAll();
						me.detailTool.setConfig({
							viewPanel        : 'FormDataViewDocument',
							parentFDWindowId : me.getFormdata().up('window').id,
							controllerName   : me.controllerName,
						});
						me.detailTool.form().show('view', 800, 'View Document');
		           });
				}
			},
			'changepriceformdataviewdocument' : {
				afterrender : function(el){
					if(me.getFormdata().ownerCt.state == 'view' || me.getFormdata().ownerCt.state == 'read'){
						me.getFormdataviewdocument().down('#btnDelete').hide();
					}

					el.add({
						xtype  : 'component',
						itemId : 'iframeViewdocument',
						html   : '<iframe src="'+document.URL+'/'+me.setParamCP.folderDocument+me.getFormdata().down('[name=npv_doc_approved]').getValue()+'" width="100%" height="100%"></iframe>',
			    	});
				}
			},
			'changepriceformdataviewdocument #btnDelete' : {
				click : function(el){
					Ext.Msg.confirm('Alert', 'This action will "DELETE" NPV Doc Approved.<br />Continue ?', function (btn) {
						if (btn == 'yes') {
							me.tools.ajax({
								params  : { changeprice_id : me.getFormdata().down('[name=changeprice_id]').getValue(), filedoc : me.getFormdata().down('[name=npv_doc_approved]').getValue() },
								success : function (data, model) {
									me.getFormdata().down("#view_document").hide();
									el.up('window').close();
								}
							}).read('deletedoc');
						}
					});
				}
			}
		});

		var arF = [
			'landsize_new',
			'kelebihan_new',
			'pricenew_tanahpermeter',
			'pricenew_harga_tanah',
			'pricenew_kelebihantanah',
			'pricenew_harga_kelebihantanah',
			'pricenew_harga_bangunan',
			'pricenew_subsidi_dp',
			'pricenew_harga_interior',
			'pricenew_persen_dischargedasar',
			'pricenew_harga_dischargedasar',
			'pricenew_persen_dischargetanah',
			'pricenew_harga_dischargetanah',
			'pricenew_persen_dischargebangunan',
			'pricenew_harga_dischargebangunan',
			'pricenew_persen_ppntanah',
			'pricenew_harga_ppntanah',
			'pricenew_persen_ppnbangunan',
			'pricenew_harga_ppnbangunan',
			'pricenew_persen_ppnsubsidi_dp',
			'pricenew_harga_ppnsubsidi_dp',
			'pricenew_persen_ppninterior',
			'pricenew_harga_ppninterior',
			'pricenew_persen_ppnbm',
			'pricenew_harga_ppnbm',
			'pricenew_persen_pph22',
			'pricenew_harga_pph22',
			'pricenew_harga_bbnsertifikat',
			'pricenew_harga_bphtb',
			'pricenew_harga_bajb',
			'new_harga_administrasi',
			'new_harga_admsubsidi',
			'new_harga_pmutu',
			'new_harga_paket_tambahan',
			'new_persen_salesdisc',
			'new_biaya_asuransi',
			'harga_pembulatan_new'
		];

		for (var i in arF) {
			this.control('changepriceformdata [name=' + arF[i] + ']', {
				keyup : function (el) {
					me.setParamCP.calculator.typeCalculaterounding = me.setParamCP.typeCalculaterounding; /// Add by Erwin.St 25012022
					me.setParamCP.calculator.calculate(el);
				}
			});
		}
	},
	cpSelectPrintAdendum : function () {
		var me  = this;
		var f   = me.getFormprintout();
		var tpl = f.down("[name=template_name]").getValue();

		f.up("window").close();

		me.tools.printMsWord({
			purchaseletterrevision_id : f.down("[name=purchaseletterrevision_id]").getValue(),
			parametersppjb_id         : f.down("[name=parametersppjb_id]").getValue(),
			tpl                       : tpl
		}, me.getPanel()).grid(me.getGrid());
	},
	cpRencanaSerahTerimaOnKeyUp : function () {
		var me     = this;
		var plDate = me.getFormdata().down("[name=purchaseletter_purchase_date]").getValue();
		var bulan  = me.tools.intval(me.getFormdata().down("[name=rencana_serahterima]").getValue());

		if (bulan > 0 && plDate) {
			var currentDate = moment(plDate);
			var futureMonth = moment(currentDate).add(bulan, 'M');
			me.getFormdata().down("[name=rencana_serahterima_date]").setValue(futureMonth.format("YYYY-MM-DD"));
		}
	},
	cpRencanaSerahTerimaDateOnSelect : function () {
		var me      = this;
		var plDate  = me.getFormdata().down("[name=purchaseletter_purchase_date]").getValue();
		var rstDate = me.getFormdata().down("[name=rencana_serahterima_date]").getValue();
		rstDate     = moment(rstDate);

		if (plDate) {
			var month = moment(rstDate).diff(plDate, 'months', true);
			me.getFormdata().down("[name=rencana_serahterima]").setValue(Math.floor(month));
		}
	},
	saveFormAdvanceOnClick : function () {
		var me = this;
		var f  = me.getFormdataadv();
		var vs = f.getValues();
		var g  = me.getSchedulegrid();

		if (vs.help_amount != '' && vs.help_jml != '' && vs.help_termin != '') {
			var schAdvance = new Erems.library.ScheduleAddAdvance();
			schAdvance.proses(this, f, g);

			g.getSelectionModel().select((g.getStore().getCount()) - 1);
			f.up("window").close();
		} else {
			me.tools.alert.warning("Isi semua field...");
		}
	},
	addnewScheduleAdv : function () {
		var me = this;
		var w  = me.instantWindow('FormDataAddSchedule', 500, 'Add New Schedule Advance', 'my_state', 'myAddSchAdvWindow');

		me.tools.ajax({
			params  : {},
			success : function (data, model) {
				me.tools.wesea(data.scheduletype, me.getFormdataadv().down("[name=help_tipe]")).comboBox();
			}
		}).read('scheduleadvance');
	},
	cpShowPrintoutTpl : function (params) {
		var me = this;
		var w  = me.instantWindow('FormPrintout', 400, 'Select Template', 'print', 'cpAdendumPrintWindow');
		var f  = me.getFormprintout();

		f.down("[name=purchaseletterrevision_id]").setValue(params.purchaseletterrevision_id);
		f.down("[name=parametersppjb_id]").setValue(params.parametersppjb_id);

		var el = f.down("[name=template_name]");
		for (var i in me.setParamCP.opsiPrintout) {
			el.add({
				xtype      : 'radiofield',
				boxLabel   : me.setParamCP.opsiPrintout[i].text,
				name       : 'template',
				inputValue : me.setParamCP.opsiPrintout[i].value,
				checked    : i == 0 ? true : false
			});
		}
	},
	paramsppjbSelect : function () {
		var me = this;
		if (me.browseHandler) {
			me.browseHandler.selectItem(function (rec) {
				var f = me.getFormdata();
				var selectedCP = me.getGrid().getSelectedRecord();

				if (selectedCP) {
					if (me.setParamCP.opsiPrintout.length > 0) { // jika ada opsi tempalte printout adendum
						me.cpShowPrintoutTpl({
							purchaseletterrevision_id : selectedCP.get('purchaseletterrevision_purchaseletterrevision_id'),
							parametersppjb_id         : rec.get("parametersppjb_id")
						});
					}
					else {
						//updated by anas 09092021
						me.getPanel().setLoading("Please wait...");
						me.tools.ajax({
							params : {
								purchaseletterrevision_id : selectedCP.get('purchaseletterrevision_purchaseletterrevision_id'),
								parametersppjb_id         : rec.get("parametersppjb_id")
							},
							success : function (data, model) {
								me.getPanel().setLoading(false);
								var url = data['others'][0][0]['URL'];

								//added by anas 09092021
								var plwa = '';
								if (me.setParamCP.getPurcheletterSendWaActive == 1) {
									plwa = '<br><br><br><a href="https://api.whatsapp.com/send?phone=' + me.setParamCP.getPurcheletterSendWaPhone + '&text=' + me.setParamCP.getPurcheletterSendWaText + ' ' + window.location.href + url + '" target="blank">Send To WA</a>';
								}
								//end added by anas 09092021

								if (url) {
									//updated by anas 09092021
									Ext.Msg.show({
										title   : 'Info',
										msg     : '<a href="' + url + '" target="blank">Download file</a>' + plwa,
										icon    : Ext.Msg.INFO,
										buttons : Ext.Msg.OK,
										fn      : function () {}
									});
								}
							}
						}).read('printout');
					}
				}
			});
		}
	},
	browseParametersppjb : function (el) {
		var me     = this;
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
	rencanaTerminonKeyUp : function () {
		var me           = this;
		var f            = me.getFormdata();
		var gs           = me.getSchedulegrid();
		var totalRecord  = gs.getStore().getCount();
		var jumlahTermin = f.down("[name=rencana_termin]").getValue();

		if (totalRecord > 0) {
			// f.down("[name=rencana_termin]").setReadOnly(true);
			me.setterReadonly(f, ['rencana_termin'], true);
			/// hapus schedule yang tidak ada schedule_id
			for (var i = totalRecord - 1; i > 0; i--) {
				if (gs.getStore().getAt(i).get("schedule_id") == 0) {
					gs.getStore().removeAt(i);
				}
			}

			var selisih = me.scheduleGrid.getNilaiSelisih(me, {
				fieldHargaTotalJual : 'new_harga_total_jual'
			}, me.getFormdata(), me.getSchedulegrid());

			if (selisih > 0) {
				for (var i = 0; i < jumlahTermin; i++) {
					me.scheduleGrid.addNewScheduleDynamic(me, {
						scheduletype        : me.getTypeByPriceType(f.down("[name=pricetype_id]").getValue()),
						fieldHargaTotalJual : 'new_harga_total_jual',
						remaining_balance   : selisih / jumlahTermin,
						amount              : selisih / jumlahTermin
					}, me.getFormdata(), me.getSchedulegrid());
				}
			}
			// f.down("[name=rencana_termin]").setReadOnly(false);
			me.setterReadonly(f, ['rencana_termin'], false);
		}
	},
	panelAfterRender : function (configs) {
		this.callParent(arguments);
		var me = this;


		me.getGrid().getSelectionModel().setSelectionMode('SINGLE');
		me.getGrid().down("[action=create]").setDisabled(true);

		me.tools.ajax({
			params  : {},
			success : function (data, model) {
				me.fillFormSearchComponents(data, me.getFormsearch());

				// PROLIBS
				me.setParamCP.prolibs = null;
				me.tools.ajax({
					params  : {},
					success : function (data, model) {
						var cnfg = data.others[0][0];

						var prolibsFile                     = cnfg['PROLIBFILE'];
						me.setParamCP.purchaseletterJs      = cnfg['PURCHASELETTERJS'];
						me.setParamCP.verification_approval = cnfg['verification_approval']
						me.setParamCP.opsiPrintout          = cnfg['ADDENDUM_OPSI'];

						var errorFile = "";
						if (prolibsFile) {
							Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/Prolibs.js?_dc=' + Ext.Date.now(), function () {
								Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/' + prolibsFile + '.js?_dc=' + Ext.Date.now(), function () {
									me.setParamCP.prolibs     = window[prolibsFile];
									me.setParamCP.prolibsFile = prolibsFile;
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

						if (!me.setParamCP.purchaseletterJs) {
							errorFile += "[JSERR02] File purchaseletter tidak ditemukan.";
						}

						if (errorFile.length > 0) {
							me.tools.alert.error(errorFile);
						}

						me.getGrid().down("[action=create]").setDisabled(false);

						//added by anas 09092021
						me.setParamCP.getPurcheletterSendWaActive = cnfg['getPurcheletterSendWa']['active'];
						me.setParamCP.getPurcheletterSendWaPhone  = cnfg['getPurcheletterSendWa']['phone'];
						me.setParamCP.getPurcheletterSendWaText   = cnfg['getPurcheletterSendWaText'];

						me.setParamCP.typeCalculaterounding = cnfg['typeCalculaterounding']; /// add by erwin.st 25012022
						me.setParamCP.roundSchedule         = cnfg['roundSchedule']; /// add by erwin.st 25012022
						me.setParamCP.ppnValueadditional    = cnfg['ppnValueadditional']; /// add by erwin.st 14032022
						me.setParamCP.folderDocument        = cnfg['folderDocument']; /// add by erwin.st 14032022
						me.setParamCP.isSH2                 = cnfg['isSH2']; /// add by erwin.st 14032022
					}
				}).read('init');
			}
		}).read('searchassets');
	},
	fillFormSearchComponents : function (data, f) {
		var me = this;
		me.tools.wesea(data.cluster, f.down("[name=cluster_id]")).comboBox(true);
		me.tools.wesea(data.block, f.down("[name=block_id]")).comboBox(true);
	},
	printMsWord : function () {
		var me = this;
		var rec = me.getGrid().getSelectedRecord();
		if (rec) {
			me.browseParametersppjb();
		}
		else {
			me.tools.alert.warning("Silahkan pilih satu record terlebih dahulu.");
		}
	},
	approveOnChange : function () {
		var me      = this;
		var f       = me.getFormdata();
		var approve = f.down("[name=purchaseletterrevision_is_approve]").getValue();

		if (approve) {
			f.down("button[action=save]").setDisabled(!approve);
		}
	},
	cpgenerateSchedule : function () {
		var me = this;
		var f  = me.getFormdata();
		var sg = me.getSchedulegrid();

		var totalJualOld = accounting.unformat(f.down("[name=harga_total_jual]").getValue());
		var totalJualNew = accounting.unformat(f.down("[name=new_harga_total_jual]").getValue());
		var newRecords   = sg.getStore().getNewRecords();

		for (var x in newRecords) {
			sg.getStore().remove(newRecords[x]);
		}
		var amount = totalJualNew - totalJualOld;

		var x = '';
		var ptyId = me.tools.intval(f.down("[name=pricetype_id]").getValue());
		if (ptyId === 1)
			x = "SIP";
		else if (ptyId === 2)
			x = "KPR";
		else
			x = "INH";

		var lastDuedate = sg.getStore().getAt(sg.getStore().getCount() - 1).get("duedate");
		var date        = new Date(lastDuedate);
		var month       = date.getMonth() + 1;
		var year        = month == 1 ? date.getFullYear() + 1 : date.getFullYear();

		date.setMonth(month);
		date.setFullYear(year);
		sg.getStore().add({
			amount                     : amount,
			termin                     : 1,
			scheduletype_scheduletype  : x,
			remaining_balance          : amount,
			duedate                    : date,
			sourcemoney_sourcemoney    : 'CUSTOMER',
			sourcemoney_sourcemoney_id : 3
		});
	},
	mainDataSave: function (mode) {
		var me = this;
		var m = typeof mode !== "undefined" ? mode : "";

		var sg      = me.getSchedulegrid();
		var sgStore = sg.getStore();

		// cek jika ada schedule yangn nilai amountnya = 0
		var totalAmount = 0, dtOld = '', warnSameduedate = '';
		sgStore.each(function (rec) {
			if (rec != null) {
				totalAmount += parseFloat(accounting.toFixed(rec.get("amount"), 2));

				if(dtOld != '' && new Date(dtOld).getTime() == new Date(rec.get('duedate')).getTime()){
					warnSameduedate = "Silahkan ubah waktu (jam/menit/detik), karena tanggal schedule nya sama (" + moment(rec.get('duedate')).format("DD-MM-YYYY") + ").";
				}
				dtOld = rec.get('duedate');
			}
		});

		if(warnSameduedate != ''){
			me.tools.alert.warning(warnSameduedate);
			return;
		}

		// addon 20180629
		var totalHargaJual = accounting.unformat(me.getFormdata().down("[name=new_harga_total_jual]").getValue());
		var selisih        = parseFloat(totalHargaJual) - parseFloat(accounting.toFixed(totalAmount, 2));

		if (selisih != 0) { // cek jika ada perbedaan jumlah tagihan dengan total jual
			me.tools.alert.warning("Total amount tagihan tidak sesuai. Silahkan dicek kembali tagihan yang digenerate.");
			return;
		}
		// end ek jika ada schedule yangn nilai amountnya = 0

		// addon 20180709
		if (me.tools.intval(m) == 0) { // untuk prsoes simpan saja
			var tigaSekawan     = new Erems.library.TigaSekawan();
			var priceType       = me.tools.comboHelper(me.getFormdata().down("[name=pricetype_id]")).getText({d: 'pricetype', v: 'pricetype_id'});
			var validasiTagihan = tigaSekawan.validasiDaftarTagihan(sg.getStore(), priceType);

			if (!validasiTagihan['hasil']) {
				me.tools.alert.warning(validasiTagihan['msg']);
				return;
			}
		}
		//end addon 20180709

		////// Added Erwin.St 21/09/2020 /////
		if (m == '') {
			var kelebihan_tanah           = accounting.unformat(me.getFormdata().down("[name=kelebihan_new]").getValue());
			var mtr_harga_kelebihan_tanah = accounting.unformat(me.getFormdata().down("[name=pricenew_kelebihantanah]").getValue());
			var jml_harga_kelebihan_tanah = accounting.unformat(me.getFormdata().down("[name=pricenew_harga_kelebihantanah]").getValue());

			if ((kelebihan_tanah != '' && kelebihan_tanah > 0) && (mtr_harga_kelebihan_tanah == '' || mtr_harga_kelebihan_tanah == 0 || jml_harga_kelebihan_tanah == '' || jml_harga_kelebihan_tanah == 0)) {
				me.tools.alert.warning("Silahkan mengisi harga tanah , karena ada kelebihan tanah " + me.getFormdata().down("[name=kelebihan_new]").getValue() + " m2.");
				return;
			}
		}

		var tglvalidasi = me.getFormdata().down("[name=tanggal_validasi]").getValue();
		var hsltglvalidasi = 0
		if (tglvalidasi > 0) {
			sgStore.each(function (rec) {
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


		if(me.setParamCP.npvdoc){
			if(!me.getFormdata().down("[name=file_npv_doc_approved]").allowBlank && me.getFormdata().down("[name=npv_doc_approved]").getValue() == ''){
				me.tools.alert.warning("Harus upload NPV Doc Approved.");
				return;
			}
		}

		me.insSave({
			form      : me.getFormdata(),
			grid      : me.getGrid(),
			store     : me.localStore.detail,
			finalData : function (data) {
				var f = me.getFormdata();
				data["pricetype_id_new"]       = data["pricetype_id"];
				data["pricetype_pricetype_id"] = data["pricetype_id"];
				data["is_used_verification"]   = me.setParamCP.isUsedVerification;

				// format semua xmoneyfield
				for (var i in data) {
					var el = f.down("[name=" + i + "]");
					if (el) {
						if (el.getXType() === 'xmoneyfieldEST') {
							data[i] = accounting.unformat(data[i]);
						}
					}
				}

				if (m !== "") {
					data["approvemode"] = m;
				}

				data["detail"] = me.tools.gridHelper(me.getSchedulegrid()).getJson();

				if(f.down('[name=is_ppn_additional]').getValue() == true){
					data["addonparams"] = {
						isEditTanahpermeter          : false,
						isEditTotaltanah             : true,
						isEditKelebihantanahpermeter : false,
						isEditTotalkelebihantanah    : true,
						isEditPersenPPNTanah         : false,
						isEditAmountPPNTanah         : true,
						isEditPersenPPNBangunan      : false,
						isEditAmountPPNBangunan      : true,
						isEditPersenPPNBM            : false,
						isEditAmountPPNBM            : true,
						isEditPersenPPH22            : false,
						isEditAmountPPH22            : true,
						isEditAmountBBNSertifikat    : false,
						isEditAmountBPHTB            : false,
						isEditAmountBAJB             : false,
						isEditPersenPPNSubsididp     : false,
						isEditAmountPPNSubsididp     : true,
						isEditPersenPPNInterior      : false,
						isEditAmountPPNInterior      : true
					};
				}
				else{
					data["addonparams"] = {
						isEditTanahpermeter          : me.setParamCP.calculator.isEditTanahpermeter,
						isEditTotaltanah             : me.setParamCP.calculator.isEditTotaltanah,
						isEditKelebihantanahpermeter : me.setParamCP.calculator.isEditKelebihantanahpermeter,
						isEditTotalkelebihantanah    : me.setParamCP.calculator.isEditTotalkelebihantanah,
						isEditPersenPPNTanah         : me.setParamCP.calculator.isEditPersenPPNTanah,
						isEditAmountPPNTanah         : me.setParamCP.calculator.isEditAmountPPNTanah,
						isEditPersenPPNBangunan      : me.setParamCP.calculator.isEditPersenPPNBangunan,
						isEditAmountPPNBangunan      : me.setParamCP.calculator.isEditAmountPPNBangunan,
						isEditPersenPPNSubsididp     : me.setParamCP.calculator.isEditPersenPPNSubsididp,
						isEditAmountPPNSubsididp     : me.setParamCP.calculator.isEditAmountPPNSubsididp,
						isEditPersenPPNInterior      : me.setParamCP.calculator.isEditPersenPPNInterior,
						isEditAmountPPNInterior      : me.setParamCP.calculator.isEditAmountPPNInterior,
						isEditPersenPPNBM            : me.setParamCP.calculator.isEditPersenPPNBM,
						isEditAmountPPNBM            : me.setParamCP.calculator.isEditAmountPPNBM,
						isEditPersenPPH22            : me.setParamCP.calculator.isEditPersenPPH22,
						isEditAmountPPH22            : me.setParamCP.calculator.isEditAmountPPH22,
						isEditAmountBBNSertifikat    : me.setParamCP.calculator.isEditAmountBBNSertifikat,
						isEditAmountBPHTB            : me.setParamCP.calculator.isEditAmountBPHTB,
						isEditAmountBAJB             : me.setParamCP.calculator.isEditAmountBAJB
					};
				}
				data["purchaseletter_rencana_serahterima"]      = f.down("[name=rencana_serahterima]").getValue();
				data["purchaseletter_rencana_serahterima_date"] = f.down("[name=rencana_serahterima_date]").getValue();
				data["pricenew_harga_dischargedasar"]           = accounting.unformat(data["pricenew_harga_dischargedasar"]);
				data["pricenew_harga_dischargetanah"]           = accounting.unformat(data["pricenew_harga_dischargetanah"]);
				data["pricenew_harga_dischargebangunan"]        = accounting.unformat(data["pricenew_harga_dischargebangunan"]);
				data["pricenew_subsidi_dp"]                     = accounting.unformat(data["pricenew_subsidi_dp"]);
				data["pricenew_harga_interior"]                 = accounting.unformat(data["pricenew_harga_interior"]);

				return data;
			},
			sync     : true,
			callback : {
				create : function (store, form, grid) {
				}
			}
		});
	},
	typeIdNewOnChange: function (el, val) {
		var me  = this;
		var f   = me.getFormdata();
		var rec = el.getStore().getAt(el.getStore().findExact('type_id', val));

		if (rec) {
			f.down("[name=type2_code]").setValue(rec.get("code"));
			f.down("[name=landsize_new]").setValue(rec.get("land_size"));
			f.down("[name=kelebihan_new]").setValue(rec.get("kelebihan"));
			f.down("[name=buildingsize_new]").setValue(rec.get("building_size"));
		}
	},
	priceTypeOnSelect: function () {
		var me = this;
		var f  = me.getFormdata();
		var p  = f.down("[name=pricetype_id]").getValue();
		var s  = me.localStore.price;
		var r  = s.findRecord("pricetype_id", p);

		var e = null;
		for (var i in r.data) {
			e = f.down("[name=pricenew_" + i + "]");
			if (e) {
				if(i != 'is_nonppn'){ //// SELAIN NON PPN / PPNDTP
					e.setValue(r.data[i]);
				}
			}
		}

		if (me.setParamCP.verifikasiDiskonInfo != null) {
			var vdi = me.setParamCP.verifikasiDiskonInfo;

			me.setParamCP.calculator.discount = {
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
			me.setParamCP.calculatorDiscount.typeCalculaterounding = me.setParamCP.typeCalculaterounding;
			me.setParamCP.calculatorDiscount.discount              = me.setParamCP.calculator.discount;
			me.setParamCP.calculatorDiscount.calculate();
		}

		// me.setParamCP.processor.priceSourceid = formData.down("[name=price_source]").getValue();
		me.setParamCP.processor.priceTypeId = f.down("[name=pricetype_id]").getValue();
		me.setParamCP.processor.calculate();

		// me.setParamCP.calculator.priceSourceid         = formData.down("[name=price_source]").getValue();
		me.setParamCP.processor.is_ppndtp              = f.down('[name=pricenew_is_nonppn]').getValue() == true ? 1 : 0;
		me.setParamCP.calculator.typeCalculaterounding = me.setParamCP.typeCalculaterounding;
		me.setParamCP.calculator.calculate(f.down("[name=new_harga_administrasi]"));

		f.down("#btnSave").setDisabled(false);
		me.toggleBankElement();
		// me.cpgenerateSchedule();
		f.down("[name=rencana_termin]").setVisible(p === 3 ? true : false);

		/// add by erwin.st 14032022
		var old_ppn = f.down('[name=price_is_ppn]').getValue() == 0 ? '10' : f.down('[name=price_is_ppn]').getValue();
		f.down('[name=is_ppn_additional]').setDisabled(old_ppn == me.setParamCP.ppnValueadditional ? true : false);

		me.setAllformatmoney(me.getFormdata());
	},
	cekApproval: function () {
		var me = this;
		var g  = me.getUnitgrid();
		var gs = g.getStore();
		var p  = g.getSelectedRow();
		var d  = gs.getAt(p)
		var f  = me.getFormdata();

		if(p > -1){
			Ext.Ajax.request({
				url    : 'erems/changeprice/read',
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
						if (me.setParamCP.verification_approval) {
							Ext.Ajax.request({
								url    : 'erems/changeprice/read',
								params : {
									purchaseletter_id : d.data.purchaseletter_purchaseletter_id,
									verification_code : 'GH',
									mode_read         : 'verificationapproval'
								},
								success : function (response) {
									var obj = JSON.parse(response.responseText)
									if (obj.totalRow > 0) {
										if (obj.data[0]['is_approve'] > 0) {
											me.unitSelect()
											me.setParamCP.isUsedVerification = true
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
							me.unitSelect()
						}
					}
				}
			});
		}
	},
	unitSelect : function () {
		var me = this;
		var f  = me.getFormdata();
		if (me.browseHandler) {
			me.browseHandler.selectItem(function () {
				var unitId = f.down("[name=unit_unit_id]").getValue();
				var ps     = me.localStore.selectedUnit; // purchaseletter detail Store
				var psRec  = ps.getAt(0);

				if (psRec) {
					// check non approve revision
					f.setLoading("Check revision...");
					me.tools.ajax({
						params  : { purchaseletter_id : psRec.get("purchaseletter_id") },
						success : function (schdata, schmodel) {
							var tigaSekawanAnCancel = schdata['others'][0][0]['TIGASEKAWANANDCANCEL'];

							if (tigaSekawanAnCancel.length === 0) {
								// console.log(psRec)
								me.setParamCP.pengakuanPenjualadate = psRec.get("pengakuan_penjualan_date");

								f.down("[name=purchaseletter_purchaseletter_no]").setValue(psRec.get("purchaseletter_no"));
								f.down("[name=purchaseletter_purchase_date]").setValue(psRec.get("purchase_date"));
								f.down("[name=purchaseletter_purchaseletter_id]").setValue(psRec.get("purchaseletter_id"));
								f.down("[name=type_id_new]").setValue(psRec.get("type_type_id"));
								f.down("[name=landsize_new]").setValue(psRec.get("unit_land_size"));
								f.down("[name=kelebihan_new]").setValue(psRec.get("unit_kelebihan"));
								f.down("[name=buildingsize_new]").setValue(psRec.get("unit_building_size"));
								f.down("[name=type2_code]").setValue(psRec.get("type_code"));

								f.down("[name=price_persen_dischargedasar]").setValue(psRec.get("price_persen_dischargadasar"));
								f.down("[name=price_harga_dischargedasar]").setValue(psRec.get("price_harga_dischargadasar"));
								f.down("[name=price_persen_dischargetanah]").setValue(psRec.get("price_persen_dischargatanah"));
								f.down("[name=price_harga_dischargetanah]").setValue(psRec.get("price_harga_dischargatanah"));
								f.down("[name=price_persen_dischargebangunan]").setValue(psRec.get("price_persen_dischargabangunan"));
								f.down("[name=price_harga_dischargebangunan]").setValue(psRec.get("price_harga_dischargabangunan"));

								//semy
								f.down("[name=priceadmin_harga_administrasi]").setValue(psRec.get("harga_administrasi"));
								f.down("[name=priceadmin_harga_paket_tambahan]").setValue(psRec.get("harga_paket_tambahan"));
								f.down("[name=priceadmin_persen_salesdisc]").setValue(psRec.get("persen_salesdisc"));
								f.down("[name=priceadmin_harga_salesdisc]").setValue(psRec.get("harga_salesdisc"));
								f.down("[name=priceadmin_harga_admsubsidi]").setValue(psRec.get("harga_admsubsidi"));
								//semy

								f.down("[name=priceadmin_biaya_asuransi]").setValue(psRec.get("biaya_asuransi"));
								f.down("[name=notes_new]").setValue(psRec.get("notes"));
								//added by anas 25062021

								//set photo jadi kosong
								f.down("#photo_image").el.setStyle({background: 'none'});

								//jadi kalo gk ada foto gk load image
								if (psRec.get("customer_photo").length > 0) {
									me.mt.customerPhoto(f.down("#photo_image"), psRec.get("customer_photo"), me.myConfig.IMG_FOLDER);
								}
								//end added by anas 25062021

								me.localStore.price = me.instantStore({
									id          : me.controllerName + 'UnitPriceStore',
									extraParams : { mode_read : 'price' },
									idProperty  : 'price_id'
								});

								f.setLoading("Loading price..");
								me.localStore.price.load({
									params   : { unit_id : unitId },
									callback : function (rec, op) {
										me.attachModel(op, me.localStore.price, true);
										f.down("[name=pricetype_id]").setDisabled(false);
										f.setLoading(false);

										f.setLoading("Request schedule information...");
										me.tools.ajax({
											params  : { purchaseletter_id : f.down('[name=purchaseletter_purchaseletter_id]').getValue() },
											success : function (schdata, schmodel) {
												me.tools.wesea({
													data  : schdata,
													model : schmodel
												}, me.getSchedulegrid()).grid();
												f.setLoading(false);
											}
										}).read('schedule');
									}
								});

								me.setParamCP.verifikasiDiskonInfo = null;
								if (me.setParamCP.globalParams) {
									var gp = me.setParamCP.globalParams;

									me.tools.ajax({
										params  : { unit_id : unitId },
										success : function (avdata, avmodel) {
											if (avdata.others[0][0]['DISCOUNT_VERIFIED']) {
												me.setParamCP.verifikasiDiskonInfo = avdata.others[0][0]['DATA'];
											}

											me.discountInput().enable({
												globalParams : gp,
												isReadOnly   : !avdata.others[0][0]['DISCOUNT_VERIFIED']
											});
										}
									}).read('cekapprovalverification');
								}

								///// add by erwin.st 14032022
								f.down("[name=price_is_ppn]").setValue(psRec.get("is_ppn"));
								f.down("[name=pricenew_is_ppn]").setValue(psRec.get("is_ppn"));
								var old_ppn = psRec.get("is_ppn") == 0 ? '10' : psRec.get("is_ppn");
								old_ppn     = old_ppn.replace(/[^.\d]/g, '').toString();
								var spl     = old_ppn.split('.');
								var prec    = 0;
								if(typeof spl[1] != 'undefined' && spl[1] > 0){
									prec = 2;
								}
								f.down("[name=label_old_ppn]").setText('Current Price using PPN ' + accounting.formatMoney(old_ppn, { precision : prec }) + '%.');

								f.down("[name=pricetype_id]").setValue(false);
								f.down("[name=is_ppn_additional]").setValue(false);
								f.down("[name=is_ppn_additional]").setDisabled(true);

								////  reset value
								var arrNew = ['pricenew_tanahpermeter', 'pricenew_kelebihantanah', 'pricenew_harga_tanah', 'pricenew_harga_kelebihantanah', 'pricenew_harga_bangunan', 'pricenew_subsidi_dp', 'pricenew_harga_interior', 'pricenew_harga_jualdasar', 'pricenew_persen_dischargedasar', 'pricenew_harga_dischargedasar', 'pricenew_persen_dischargetanah', 'pricenew_harga_dischargetanah', 'pricenew_persen_dischargebangunan', 'pricenew_harga_dischargebangunan', 'pricenew_harga_neto', 'pricenew_persen_ppntanah', 'pricenew_harga_ppntanah', 'pricenew_persen_ppnbangunan', 'pricenew_harga_ppnbangunan', 'pricenew_persen_ppnsubsidi_dp', 'pricenew_harga_ppnsubsidi_dp', 'pricenew_persen_ppninterior', 'pricenew_harga_ppninterior', 'pricenew_persen_ppnbm', 'pricenew_harga_ppnbm', 'pricenew_persen_pph22', 'pricenew_harga_pph22', 'pricenew_harga_bbnsertifikat', 'pricenew_harga_bphtb', 'pricenew_harga_bajb', 'new_harga_pmutu', 'pricenew_harga_jual', 'new_harga_administrasi', 'new_harga_paket_tambahan', 'new_harga_admsubsidi', 'new_biaya_asuransi', 'new_persen_salesdisc', 'new_harga_salesdisc', 'harga_pembulatan_new', 'new_harga_total_jual', 'balance_value'];
								for(var i = 0; i < arrNew.length; i++){
						            if(f.down("[name=" + arrNew[i] + "]").getXType() == 'xmoneyfieldEST'){
						                var precision = f.down("[name=" + arrNew[i] + "]").getDecPrecision();
						                f.down("[name=" + arrNew[i] + "]").setValue(accounting.formatMoney(0, { precision : precision }));
						            }
						        }

								f.down("[name=price_is_nonppn]").setValue(psRec.get("is_nonppn"));
								f.down("[name=pricenew_is_nonppn]").setValue(psRec.get("is_nonppn"));
								f.down("[name=is_nonppn_new]").setValue(psRec.get("is_nonppn") == 1 ? true : false);
								f.down("[name=is_nonppn_old]").setValue(psRec.get("is_nonppn") == 1 ? true : false);

								me.setAllformatmoney(me.getFormdata());
							}
							else {
								f.getForm().reset();
								me.getSchedulegrid().getStore().loadData([], false);

								var teksWarning = "";
								var count       = 0;

								for (var i = 0; i < tigaSekawanAnCancel.length; i++) {
									teksWarning += "[" + (count + 1) + "] " + tigaSekawanAnCancel[i]["teks"] + " pada tanggal " + moment(tigaSekawanAnCancel[i]["change_date"]).format("DD-MM-YYYY") + " oleh " + tigaSekawanAnCancel[i]["user_fullname"]
									count++;
								}

								setTimeout(function () {
									me.tools.alert.warning("Terdapat revisi sebagai berikut : " + teksWarning + " . Silahkan di approve terlebih dahulu.");
								}, 500);
							}

							f.setLoading(false);
						}
					}).read('checkrevisi');

					f.down('[name=type_id_new]').setReadOnly(psRec.get('unit_is_orderbangun'));
					f.down('[name=landsize_new]').setReadOnly(psRec.get('unit_is_orderbangun'));
					f.down('[name=buildingsize_new]').setReadOnly(psRec.get('unit_is_orderbangun'));
					f.down('[name=kelebihan_new]').setReadOnly(psRec.get('unit_is_orderbangun'));
				}
				else {
					console.log("[Error] Tidak ada data purchaseletter");
				}
			});
		}
	},
	browseSoldUnit : function (el) {
		var me = this;

		var browse = new Erems.library.Browse();
		browse.init({
			controller : me,
			view       : 'UnitGrid',
			el         : el,
			localStore : "selectedUnit",
			mode_read  : "selectedsoldunit"
		});
		browse.showWindow();

        var textfield = browse.textfield;

        for (var i=0;i<textfield.length;i++) {
            textfield[i].on('keypress', function(e, el){
                if (el.getCharCode() === 13) {
                    me.doSearch(e);
                }
            });
        }
	},

    doSearch: function(el) {
        var g = el.up('window').down('grid');
        var s = g.getStore();
        var fields = el.up('form').getForm().getFieldValues();
        for (var x in fields) {
            s.getProxy().setExtraParam(x, fields[x]);
        }

        s.loadPage(1);
    },
	toggleBankElement : function () {
		var me = this;
		var f  = me.getFormdata();
		if (me.tools.intval(f.down("[name=pricetype_id]").getValue()) == me.setParamCP.priceTypeKPRId) {
			f.down("#bankKPRElementId").show();
		} else {
			f.down("#bankKPRElementId").hide();
		}
	},
	fdar : function () {
		var me = this;
		var f  = me.getFormdata();
		me.mt  = new Erems.library.ModuleTools();

		var x = {
			init: function () {
				me.setActiveForm(f);

				me.setParamCP.calculatorDiscount.form   = f;
				me.setParamCP.calculatorDiscount.fields = {
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
				var myStrFunc = 'me.setParamCP.processor = new Erems.library.' + me.setParamCP.purchaseletterJs + '()';
				eval(myStrFunc);

				/* added 1 Oct 2014 */
				me.setParamCP.processor.prolibsFile = me.setParamCP.prolibsFile;
				me.setParamCP.processor.setForm(me.getFormdata());
				me.setParamCP.processor.setC(me);
				me.setParamCP.processor.setScheduleGrid(me.getSchedulegrid());

				me.setParamCP.processor.fields.total                = 'new_harga_total_jual';
				me.setParamCP.processor.fields.jual                 = 'pricenew_harga_jual';
				me.setParamCP.processor.fields.salesDiscountPercent = 'new_persen_salesdisc';
				me.setParamCP.processor.fields.salesDiscountAmount  = 'new_harga_salesdisc';
				me.setParamCP.processor.fields.biayaAdmin           = "new_harga_administrasi";
				me.setParamCP.processor.fields.biayaPaketTambahan   = "new_harga_paket_tambahan";
				me.setParamCP.processor.fields.biayaAdminSubsidi    = "new_harga_admsubsidi";
				me.setParamCP.processor.fields.biayaAsuransi        = "new_biaya_asuransi";
				me.setParamCP.processor.fields.hargaPembulatan      = "harga_pembulatan_new";
				me.setParamCP.processor.is_balloon                  = 0;
				me.setParamCP.processor.is_ppndtp                   = 0;
				me.setParamCP.processor.typeCalculaterounding       = me.setParamCP.typeCalculaterounding;


				var cf = new Erems.library.CalculatorFields();
				cf.fields = {
					width                       : 'width',
					long                        : 'long',
					land_size                   : 'landsize_new',
					building_size               : 'buildingsize_new',
					kelebihan                   : 'kelebihan_new',
					_harga_tanah_a              : 'pricenew_tanahpermeter',
					_harga_tanah_b              : 'pricenew_harga_tanah',
					_harga_kelebihan_a          : 'pricenew_kelebihantanah',
					_harga_kelebihan_b          : 'pricenew_harga_kelebihantanah',
					_harga_bangunan_a           : 'pricenew_bangunanpermeter',
					_harga_bangunan             : 'pricenew_harga_bangunan',
					_subsidi_dp                 : 'pricenew_subsidi_dp',
					_harga_interior             : 'pricenew_harga_interior',
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
					_ppn_bangunan               : 'pricenew_persen_ppnbangunan',
					_tot_ppn_bangunan           : 'pricenew_harga_ppnbangunan',
					_ppn_subsidi_dp             : 'pricenew_persen_ppnsubsidi_dp',
					_tot_ppn_subsidi_dp         : 'pricenew_harga_ppnsubsidi_dp',
					_ppn_interior               : 'pricenew_persen_ppninterior',
					_tot_ppn_interior           : 'pricenew_harga_ppninterior',
					_ppn_ppnbm                  : 'pricenew_persen_ppnbm',
					_tot_ppn_ppnbm              : 'pricenew_harga_ppnbm',
					_ppn_pph22                  : 'pricenew_persen_pph22',
					_tot_ppn_pph22              : 'pricenew_harga_pph22',
					_harga_balik_nama           : 'pricenew_harga_bbnsertifikat',
					_harga_bphtb                : 'pricenew_harga_bphtb',
					_harga_bajtb                : 'pricenew_harga_bajb',
					_biaya_administrasi         : 'new_harga_administrasi',
					_biaya_administrasi_subsidi : 'new_harga_admsubsidi',
					_biaya_p_mutu               : 'new_harga_pmutu',
					_biaya_paket_tambahan       : 'new_harga_paket_tambahan',
					_disc_sales                 : 'new_persen_salesdisc',
					_biaya_asuransi             : 'new_biaya_asuransi',
					_tot_disc_sales             : 'new_harga_salesdisc',
					_total                      : 'pricenew_harga_jual',
					_total_jual                 : 'new_harga_total_jual',
					_harga_pembulatan           : 'harga_pembulatan_new'
				};

				me.setParamCP.calculator = new Erems.library.Calculator({ fields : cf.fields, form : me.getFormdata() });
				me.setParamCP.calculator.discountVerified = false;
				me.setParamCP.calculator.setSP(me.setParamCP.processor);

				var sg = me.getSchedulegrid();
				sg.down("[action=reschedule]").setVisible(false);
				sg.doInit();
				sg.getStore().load({
					params : {
						//state:"load_default_attribute"
					},
					callback : function (rec, op) {
						sg.attachModel(op);
					}
				});

				me.localStore.detail = me.instantStore({
					id          : me.controllerName + 'CPDetailStore',
					extraParams : { mode_read : 'maindetail' },
					idProperty  : 'changeprice_id'
				});

				// f.down('[name=is_ppn_additional]').ppnValue = me.setParamCP.ppnValueadditional
				f.down("[name=is_nonppn_new]").setValue(false);
				f.down("[name=is_nonppn_old]").setValue(false);
				f.down("[name=is_ppn_additional]").setValue(false);
				f.down("[name=is_ppn_additional]").setDisabled(true);
				f.down("[action=genschedule]").setVisible(false);
				f.down("[name=purchaseletterrevision_is_approve]").setVisible(false);

				if(me.setParamCP.isSH2 == 0){
					f.down("#boxSubsididp").setVisible(false);
					f.down("#boxInterior").setVisible(false);
					f.down("#boxPpnsubsididp").setVisible(false);
					f.down("#boxPpninterior").setVisible(false);
					f.down("#boxSubsididp_new").setVisible(false);
					f.down("#boxInterior_new").setVisible(false);
					f.down("#boxPpnsubsididp_new").setVisible(false);
					f.down("#boxPpninterior_new").setVisible(false);
				}

			},
			create : function () {
				f.down("button[action=reject]").hide();
				f.down("button[action=approve]").hide();

				f.down('[name=is_ppn_additional]').setBoxLabel('NEW PRICE Sync to PPN ' + me.setParamCP.ppnValueadditional + '%');

				me.tools.ajax({
					params : {},
					success: function (data, model) {
						var cnfg = data['others'][0][0];

						me.setParamCP.cbType = cnfg.type[0];
						me.setParamCP.npvdoc = cnfg['NPVDOC'];

						var gp = cnfg['GLOBALPARAMSPARAMS'];
						if (gp) {
							me.setParamCP.globalParams = gp;
						}

						var checkParams = me.checkGlobalParams(cnfg);
						if (!checkParams) {
							me.tools.alert.error("FAILED TO REQUEST PARAMETERS");
							f.up("window").close();
							return;
						}
						else {
							if (!checkParams['GLOBALPARAMSEXIST']) {
								me.tools.alert.error(checkParams['GLOBALPARAMSMSG']);
								f.up("window").close();
								return;
							}
						}

						me.setParamCP.priceTypeKPRId = me.tools.intval(cnfg["PRICETYPE_KPR"]);
						if (cnfg["APPROVALUSER"]) {
							me.setParamCP.isApprovalUser = true;
							me.setterReadonly(f, ['purchaseletterrevision_is_approve'], false);
						}

						f.down("[name=pt_name]").setValue(cnfg['PT_NAME']);

						me.fillFormComponents(data, f);

						me.localStore.detail.load({
							params   : { changeprice_id : 0 },
							callback : function (rec, op) {
								me.attachModel(op, me.localStore.detail, false);
							}
						});

						f.setLoading(false);

						if(me.setParamCP.npvdoc){
							f.down('#NPVDOC').show();
							f.down('[name=file_npv_doc_approved]').allowBlank = false;
					        f.down('#label_npv_doc').update(f.down('#label_npv_doc').getEl().getHTML() + ' <sup style="color:rgb(255,0,0);font-size:0.8em;" class="x-required">*</sup>');
						}
					}
				}).read('detail');

				if (apps.subholdingSub.trim() == "sh3b") {
					f.down('[name=tanggal_validasi]').show();
				}
			},
			update : function (state) {
				var plId = me.getGrid().getSelectedRecord().get("changeprice_id");

				f.editedRow = me.getGrid().getSelectedRow();
				f.down("button[action=save]").hide();
				f.down("button[action=reject]").hide();
				f.down("button[action=approve]").hide();

				var rejected = me.getGrid().getSelectedRecord().get("purchaseletterrevision_is_rejected");
				var approve  = me.getGrid().getSelectedRecord().get("purchaseletterrevision_is_approve");

				f.setLoading("Please wait..");

				me.showHideBtnSch();

				me.tools.ajax({
					params  : {changeprice_id: plId},
					success : function (data, model) {
						var cnfg = data['others'][0][0];

						me.setParamCP.cbType = cnfg.type;
						me.setParamCP.npvdoc = cnfg['NPVDOC'];

						var gp = cnfg['GLOBALPARAMSPARAMS'];
						if (gp) {
							me.setParamCP.globalParams = gp;
						}

						var checkParams = me.checkGlobalParams(cnfg);
						if (!checkParams) {
							me.tools.alert.error("FAILED TO REQUEST PARAMETERS");
							f.up("window").close();
							return;
						}
						else {
							if (!checkParams['GLOBALPARAMSEXIST']) {
								me.tools.alert.error(checkParams['GLOBALPARAMSMSG']);
								f.up("window").close();
								return;
							}
						}

						if (cnfg["APPROVALUSER"]) {
							me.setParamCP.isApprovalUser = true;
							if (approve) {
								f.down("button[action=reject]").show();

							}
							else if (rejected) {
								f.down("button[action=approve]").show();
							}
							else {
								f.down("button[action=reject]").show();
								f.down("button[action=approve]").show();
							}
							me.setterReadonly(f, ['purchaseletterrevision_is_approve'], false);
						}

						f.down("[name=pt_name]").setValue(cnfg['PT_NAME']);

						me.fillFormComponents(data, f);

						me.localStore.detail.load({
							params   : { purchaseletterrevision_id : me.getGrid().getSelectedRecord().get("purchaseletterrevision_purchaseletterrevision_id") },
							callback : function (rec, op) {
								me.attachModel(op, me.localStore.detail, false);
								var oneRec = me.localStore.detail.getAt(0);

								f.down("[name=pricetype_id]").setDisabled(false);
								f.loadRecord(oneRec);
								f.down("[name=new_harga_total_jual]").setValue(oneRec.get("harga_total_jual_new"));
								f.down("[name=pricetype_id]").setValue(oneRec.get("pricetype_id_new"));

								f.down("[name=changeprice_date]").setValue(oneRec.get("changeprice_date"));

								//added by anas 25062021
								//jadi kalo gk ada foto gk load image
								if (oneRec.get("customer_photo").length > 0) {
									me.mt.customerPhoto(f.down("#photo_image"), oneRec.get("customer_photo"), me.myConfig.IMG_FOLDER);
								}
								//end added by anas 25062021

								var data = oneRec.data;

								f.down("button[action=genschedule]").setDisabled(true);
								f.down("button[action=browse_unit]").setDisabled(true);
								me.toggleBankElement();

								var sg = me.getSchedulegrid();

								sg.down("[action=reschedule]").setVisible(false);

								f.down("[name=rencana_serahterima_date]").setValue(moment(oneRec.get("rencana_serahterima_date")).format("YYYY-MM-DD"));

								/* load schedule */
								me.tools.ajax({
									params : {
										// purchaseletter_id: oneRec.get("purchaseletter_id")
										revisi_id : oneRec.get("purchaseletterrevision_purchaseletterrevision_id")
									},
									success : function (schdata, schmodel) {
										me.tools.wesea({
											data  : schdata,
											model : schmodel
										}, sg).grid();

										f.setLoading(false);
									}
								}).read('schedulerevisi');

								// disable elements;
								var vs   = f.getValues();
								var aDis = [];
								for (var x in vs) {
									var el = f.down("#newPriceBox").down("[name=" + x + "]");
									if (el) {
										aDis.push(x);
									}
								}

								aDis.push('pricetype_id');
								aDis.push('type_id_new');
								aDis.push('rencana_serahterima_date');
								aDis.push('rencana_serahterima');

								me.setterReadonly(f, aDis, true);

								me.citraGardenFeatured(cnfg, f, oneRec);

								f.down("[name=pricenew_harga_dischargedasar]").setValue(oneRec.get("pricenew_harga_dischargedasar"));
								f.down("[name=pricenew_harga_dischargetanah]").setValue(oneRec.get("pricenew_harga_dischargetanah"));
								f.down("[name=pricenew_harga_dischargebangunan]").setValue(oneRec.get("pricenew_harga_dischargebangunan"));

								///// add by erwin.st 14032022
								var old_ppn = f.down('[name=price_is_ppn]').getValue();
								old_ppn     = old_ppn == 0 ? '10' : old_ppn;
								old_ppn     = old_ppn.replace(/[^.\d]/g, '').toString();
								var spl     = old_ppn.split('.');
								var prec    = 0;
								if(typeof spl[1] != 'undefined' && spl[1] > 0){
									prec = 2;
								}
								f.down("[name=label_old_ppn]").setText('CURRENT PRICE using PPN ' + accounting.formatMoney(old_ppn, { precision : prec }) + '%.');

								var new_ppn = f.down('[name=pricenew_is_ppn]').getValue();
								new_ppn     = new_ppn == 0 ? '10' : new_ppn;
								new_ppn     = new_ppn.replace(/[^.\d]/g, '').toString();
								var spl     = new_ppn.split('.');
								var prec    = 0;
								if(typeof spl[1] != 'undefined' && spl[1] > 0){
									prec = 2;
								}
								f.down("[name=label_new_ppn]").setText('NEW PRICE using PPN ' + accounting.formatMoney(new_ppn, { precision : prec }) + '%.');
								f.down("[name=label_new_ppn]").setVisible(true);
								f.down("[name=is_ppn_additional]").setVisible(false);

								me.setAllformatmoney(me.getFormdata());

								f.down("[name=is_nonppn_old]").setValue(f.down("[name=price_is_nonppn]").getValue() == 1 ? true : false);
								f.down("[name=is_nonppn_new]").setValue(f.down("[name=pricenew_is_nonppn]").getValue() == 1 ? true : false);

								if(f.down('[name=npv_doc_approved]').getValue()){
									f.down("#view_document").show();
								}
							}
						});

						if(me.setParamCP.npvdoc){
							f.down('#NPVDOC').show();
						}

						if (state == 'view' || state == 'read') {
							me.getFormdata().getForm().getFields().each(function (field) {
								me.setterReadonly(f, [field.name], true);
							});

							f.down("[name=is_nonppn_old]").setValue(f.down("[name=price_is_nonppn]").getValue() == 1 ? true : false);
							f.down("[name=is_nonppn_new]").setValue(f.down("[name=pricenew_is_nonppn]").getValue() == 1 ? true : false);

							Ext.Array.each(me.getFormdata().query("[xtype=button]"), function (field) {
								field.setVisible(false);
							});
							f.down('#btnCancel').show();

							f.down('[name=file_npv_doc_approved]').hide();
						}

						me.getSchedulegrid().down('[action=create]').setVisible(false);
						me.getSchedulegrid().down('[action=destroy]').setVisible(false);
						me.getSchedulegrid().down('[action=reschedule]').setVisible(false);
						me.getSchedulegrid().down('[action=split]').setVisible(false);
						me.getSchedulegrid().down('[action=create_adv]').setVisible(false);
						me.getSchedulegrid().down('[action=genPPNDTP]').setVisible(false);
					}
				}).read('detail');
			}
		};
		return x;
	},
	getTypeByPriceType: function (priceTypeId) {
		var x = '';
		if (priceTypeId === 1)
			x = "SIP";
		else if (priceTypeId === 2)
			x = "KPR";
		else
			x = "INH";
		return x;
	},
	checkGlobalParams: function (data) {
		var result = false;
		if (data) { /// global parameter list
			result = data;
		}
		return result;
	},
	fillFormComponents: function (data, form) {
		var me = this;
		me.tools.wesea(data.bank, form.down("[name=bank_bank_id]")).comboBox();
		me.tools.wesea(data.billingrules, form.down("[name=billingrules_billingrules_id]")).comboBox();
		me.tools.wesea(data.collector, form.down("[name=collector_employee_id]")).comboBox();
		// me.tools.wesea(data.type, form.down("[name=type_id_new]")).comboBox();
		me.bindStoreComboboxNonModel(me.setParamCP.cbType, form.down("[name=type_id_new]"));
	},
	balanceCalculate: function (f, g) {
		var me = this;
		var totalJual = accounting.unformat(f.down("[name=new_harga_total_jual]").getValue());
		var s = g.getStore();
		var totalSch = 0;
		s.each(function (rec) {
			var x = me.tools.floatval(rec.get("amount")).toFixed(2);
			totalSch += me.tools.floatval(x);
		});

		var balance = (me.tools.floatval(totalJual).toFixed(2) - me.tools.floatval(totalSch).toFixed(2));
		f.down("[name=balance_value]").setValue(balance);
	},
	discountInput: function () {
		var me = this;
		var f = me.getFormdata();
		var x = {
			getFields: function () {
				var fields = ["price_persen_dischargadasar", "price_harga_dischargadasar",
					"price_persen_dischargatanah", "price_harga_dischargatanah",
					"price_persen_dischargabangunan", "price_harga_dischargabangunan"];
				return fields;
			},
			enable: function (params) {
				var isEnable = me.tools.intval(params.globalParams.PURCHASELETTER_ENABLE_DISCOUNT_APPROVAL);
				var fields = this.getFields();
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
	citraGardenFeatured: function (data, form, record) {
		var me = this;
		if (data["ISCOLLECTIONAPPROVE"]) {

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

			if (data["ISCOLLECTIONUSER"]) {
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
	showHideBtnSch : function(){
		var me        = this;
		var chk       = me.getFormdata().down('[name=is_ppn_additional]').checked;
		var hiddenBtn = chk ? false : true;
		me.getSchedulegrid().down('[action=create]').setVisible(hiddenBtn);
		me.getSchedulegrid().down('[action=destroy]').setVisible(hiddenBtn);
		me.getSchedulegrid().down('[action=reschedule]').setVisible(hiddenBtn);
		me.getSchedulegrid().down('[action=split]').setVisible(hiddenBtn);
		me.getSchedulegrid().down('[action=create_adv]').setVisible(hiddenBtn);
	},
	isPPNAdditional : function(i, x){
		var me = this;
		var f  = me.getFormdata();

		var newPPN = x == true ? parseFloat(me.setParamCP.ppnValueadditional) : f.down('[name=price_is_ppn]').getValue();

		f.down('[name=pricenew_is_ppn]').setValue(newPPN);

		me.showHideBtnSch();

		f.down('[name=pricetype_id]').setValue(me.localStore.selectedUnit.data.items[0].get('pricetype_pricetype_id'));

		var arr = ['pricetype_id', 'pricenew_tanahpermeter', 'pricenew_kelebihantanah', 'pricenew_harga_tanah', 'pricenew_harga_kelebihantanah', 'pricenew_harga_bangunan', 'pricenew_subsidi_dp', 'pricenew_harga_interior', 'pricenew_persen_ppntanah', 'pricenew_harga_ppntanah', 'pricenew_persen_ppnbangunan', 'pricenew_harga_ppnbangunan', 'pricenew_persen_ppnsubsidi_dp', 'pricenew_harga_ppnsubsidi_dp', 'pricenew_persen_ppninterior', 'pricenew_harga_ppninterior', 'pricenew_persen_ppnbm', 'pricenew_harga_ppnbm', 'pricenew_persen_pph22', 'pricenew_harga_pph22', 'pricenew_harga_bbnsertifikat', 'pricenew_harga_bphtb', 'pricenew_harga_bajb', 'new_harga_pmutu', 'new_harga_administrasi', 'new_harga_paket_tambahan', 'new_harga_admsubsidi', 'new_biaya_asuransi', 'harga_pembulatan_new'];
		me.setterReadonly(f, arr, x);

		if(x){
			f.down('[name=pricenew_tanahpermeter]').setValue(f.down('[name=price_tanahpermeter]').getValue());
			f.down('[name=pricenew_kelebihantanah]').setValue(f.down('[name=price_kelebihantanah]').getValue());
			f.down('[name=pricenew_harga_tanah]').setValue(f.down('[name=price_harga_tanah]').getValue());
			f.down('[name=pricenew_harga_kelebihantanah]').setValue(f.down('[name=price_harga_kelebihantanah]').getValue());
			f.down('[name=pricenew_harga_bangunan]').setValue(f.down('[name=price_harga_bangunan]').getValue());
			f.down('[name=pricenew_subsidi_dp]').setValue(f.down('[name=price_subsidi_dp]').getValue());
			f.down('[name=pricenew_harga_interior]').setValue(f.down('[name=price_harga_interior]').getValue());
			f.down('[name=pricenew_harga_jualdasar]').setValue(f.down('[name=price_harga_jualdasar]').getValue());
			f.down('[name=pricenew_persen_dischargedasar]').setValue(f.down('[name=price_persen_dischargedasar]').getValue());
			f.down('[name=pricenew_harga_dischargedasar]').setValue(f.down('[name=price_harga_dischargedasar]').getValue());
			f.down('[name=pricenew_persen_dischargetanah]').setValue(f.down('[name=price_persen_dischargetanah]').getValue());
			f.down('[name=pricenew_harga_dischargetanah]').setValue(f.down('[name=price_harga_dischargetanah]').getValue());
			f.down('[name=pricenew_persen_dischargebangunan]').setValue(f.down('[name=price_persen_dischargebangunan]').getValue());
			f.down('[name=pricenew_harga_dischargebangunan]').setValue(f.down('[name=price_harga_dischargebangunan]').getValue());
			f.down('[name=pricenew_harga_neto]').setValue(f.down('[name=price_harga_neto]').getValue());
			f.down('[name=pricenew_persen_ppntanah]').setValue(f.down('[name=price_persen_ppntanah]').getValue());
			f.down('[name=pricenew_harga_ppntanah]').setValue(f.down('[name=price_harga_ppntanah]').getValue());
			f.down('[name=pricenew_persen_ppnbangunan]').setValue(f.down('[name=price_persen_ppnbangunan]').getValue());
			f.down('[name=pricenew_harga_ppnbangunan]').setValue(f.down('[name=price_harga_ppnbangunan]').getValue());
			f.down('[name=pricenew_persen_ppnsubsidi_dp]').setValue(f.down('[name=price_persen_ppnsubsidi_dp]').getValue());
			f.down('[name=pricenew_harga_ppnsubsidi_dp]').setValue(f.down('[name=price_harga_ppnsubsidi_dp]').getValue());
			f.down('[name=pricenew_persen_ppninterior]').setValue(f.down('[name=price_persen_ppninterior]').getValue());
			f.down('[name=pricenew_harga_ppninterior]').setValue(f.down('[name=price_harga_ppninterior]').getValue());
			f.down('[name=pricenew_persen_ppnbm]').setValue(f.down('[name=price_persen_ppnbm]').getValue());
			f.down('[name=pricenew_harga_ppnbm]').setValue(f.down('[name=price_harga_ppnbm]').getValue());
			f.down('[name=pricenew_persen_pph22]').setValue(f.down('[name=price_persen_pph22]').getValue());
			f.down('[name=pricenew_harga_pph22]').setValue(f.down('[name=price_harga_pph22]').getValue());
			f.down('[name=pricenew_harga_bbnsertifikat]').setValue(f.down('[name=price_harga_bbnsertifikat]').getValue());
			f.down('[name=pricenew_harga_bphtb]').setValue(f.down('[name=price_harga_bphtb]').getValue());
			f.down('[name=pricenew_harga_bajb]').setValue(f.down('[name=price_harga_bajb]').getValue());
			f.down('[name=new_harga_pmutu]').setValue(f.down('[name=harga_pmutu]').getValue());
			f.down('[name=pricenew_harga_jual]').setValue(f.down('[name=price_harga_jual]').getValue());
			f.down('[name=new_harga_administrasi]').setValue(f.down('[name=priceadmin_harga_administrasi]').getValue());
			f.down('[name=new_harga_paket_tambahan]').setValue(f.down('[name=priceadmin_harga_paket_tambahan]').getValue());
			f.down('[name=new_harga_admsubsidi]').setValue(f.down('[name=priceadmin_harga_admsubsidi]').getValue());
			f.down('[name=new_biaya_asuransi]').setValue(f.down('[name=priceadmin_biaya_asuransi]').getValue());
			f.down('[name=new_persen_salesdisc]').setValue(f.down('[name=priceadmin_persen_salesdisc]').getValue());
			f.down('[name=new_harga_salesdisc]').setValue(f.down('[name=priceadmin_harga_salesdisc]').getValue());
			f.down('[name=harga_pembulatan_new]').setValue(f.down('[name=harga_pembulatan]').getValue());
			f.down('[name=new_harga_total_jual]').setValue(f.down('[name=harga_total_jual]').getValue());

			var sg = me.getSchedulegrid();
			var newRecords = sg.getStore().getNewRecords();
			for (var x in newRecords) {
				sg.getStore().remove(newRecords[x]);
			}

			me.calculateNewPPN();
		}
		else{
			f.down('[name=pricenew_tanahpermeter]').setValue(0);
			f.down('[name=pricenew_kelebihantanah]').setValue(0);
			f.down('[name=pricenew_harga_tanah]').setValue(0);
			f.down('[name=pricenew_harga_kelebihantanah]').setValue(0);
			f.down('[name=pricenew_harga_bangunan]').setValue(0);
			f.down('[name=pricenew_subsidi_dp]').setValue(0);
			f.down('[name=pricenew_harga_interior]').setValue(0);
			f.down('[name=pricenew_harga_jualdasar]').setValue(0);
			f.down('[name=pricenew_persen_dischargedasar]').setValue(0);
			f.down('[name=pricenew_harga_dischargedasar]').setValue(0);
			f.down('[name=pricenew_persen_dischargetanah]').setValue(0);
			f.down('[name=pricenew_harga_dischargetanah]').setValue(0);
			f.down('[name=pricenew_persen_dischargebangunan]').setValue(0);
			f.down('[name=pricenew_harga_dischargebangunan]').setValue(0);
			f.down('[name=pricenew_harga_neto]').setValue(0);
			f.down('[name=pricenew_persen_ppntanah]').setValue(0);
			f.down('[name=pricenew_harga_ppntanah]').setValue(0);
			f.down('[name=pricenew_persen_ppnbangunan]').setValue(0);
			f.down('[name=pricenew_harga_ppnbangunan]').setValue(0);
			f.down('[name=pricenew_persen_ppnsubsidi_dp]').setValue(0);
			f.down('[name=pricenew_harga_ppnsubsidi_dp]').setValue(0);
			f.down('[name=pricenew_persen_ppninterior]').setValue(0);
			f.down('[name=pricenew_harga_ppninterior]').setValue(0);
			f.down('[name=pricenew_persen_ppnbm]').setValue(0);
			f.down('[name=pricenew_harga_ppnbm]').setValue(0);
			f.down('[name=pricenew_persen_pph22]').setValue(0);
			f.down('[name=pricenew_harga_pph22]').setValue(0);
			f.down('[name=pricenew_harga_bbnsertifikat]').setValue(0);
			f.down('[name=pricenew_harga_bphtb]').setValue(0);
			f.down('[name=pricenew_harga_bajb]').setValue(0);
			f.down('[name=new_harga_pmutu]').setValue(0);
			f.down('[name=pricenew_harga_jual]').setValue(0);
			f.down('[name=new_harga_administrasi]').setValue(0);
			f.down('[name=new_harga_paket_tambahan]').setValue(0);
			f.down('[name=new_harga_admsubsidi]').setValue(0);
			f.down('[name=new_biaya_asuransi]').setValue(0);
			f.down('[name=new_persen_salesdisc]').setValue(0);
			f.down('[name=new_harga_salesdisc]').setValue(0);
			f.down('[name=harga_pembulatan_new]').setValue(0);
			f.down('[name=new_harga_total_jual]').setValue(0);

			f.setLoading("Request schedule information...");

			me.getSchedulegrid().getStore().loadData([], false);

			me.tools.ajax({
				params  : { purchaseletter_id : f.down('[name=purchaseletter_purchaseletter_id]').getValue() },
				success : function (schdata, schmodel) {
					me.tools.wesea({
						data  : schdata,
						model : schmodel
					}, me.getSchedulegrid()).grid();
					f.setLoading(false);

					me.priceTypeOnSelect();
				}
			}).read('schedule');
		}

		me.setAllformatmoney(me.getFormdata());
	},
	calculateNewPPN : function(){
		var me = this;
		var f  = me.getFormdata();


		var newPPN = f.down('[name=pricenew_is_ppn]').getValue();
		newPPN = newPPN == 0 ? 10 : newPPN;

		var oldPPN = f.down('[name=price_is_ppn]').getValue();
		oldPPN = oldPPN == 0 ? 10 : oldPPN;

		var isPpndtp         = false;
		var indexChangesplit = [];
		var store            = me.getSchedulegrid().getStore();

		store.each(function (rec, y) {
			if(rec != null){
				if(rec.get('scheduletype_scheduletype_id') == 25 || rec.get('remaining_balance') != 0 && rec.get('dpp') != 0 && rec.get('ppn') != 0){
					if(rec.get('scheduletype_scheduletype_id') == 25){
						isPpndtp = true;

						var ppnNew    = accounting.toFixed(parseFloat(rec.get('dpp')) * (parseFloat(newPPN) / 100), 4);
						var amountNew = accounting.toFixed(parseFloat(rec.get('dpp')) + parseFloat(ppnNew) + parseFloat(rec.get('asuransi')) + parseFloat(rec.get('bphtb_bbn_ajb')) + parseFloat(rec.get('biaya_lain_lain')), 2);

						rec.beginEdit();
						rec.set({ ppn : ppnNew, amount : amountNew });
						rec.endEdit();
					}
					else if(rec.get('remaining_balance') != rec.get('amount')){
						indexChangesplit.push(y);

						var storeDuplicate = store.add(rec.copy());
						var sDuplicate     = storeDuplicate[0];

						sDuplicate.beginEdit();
						sDuplicate.set({ schedule_id : '', is_split : true, termin : sDuplicate.get('termin') });
						sDuplicate.endEdit();
					}
					else{
						var ppnNew    = accounting.toFixed(parseFloat(rec.get('dpp')) * (parseFloat(newPPN) / 100), 4);
						var amountNew = accounting.toFixed(parseFloat(rec.get('dpp')) + parseFloat(ppnNew) + parseFloat(rec.get('asuransi')) + parseFloat(rec.get('bphtb_bbn_ajb')) + parseFloat(rec.get('biaya_lain_lain')), 2);

						rec.beginEdit();
						rec.set({ ppn : ppnNew, amount : amountNew, remaining_balance : amountNew });
						rec.endEdit();
					}
				}
			}
		});

		if(indexChangesplit.length){
			me.getSchedulegrid().getStore().sort([
			    { property : 'duedate',  direction : 'ASC' },
			    { property : 'scheduletype_id',  direction : 'ASC' },
			    { property : 'termin', direction : 'ASc' }
			]);
		}

		var hargaNetto  = accounting.unformat(f.down('[name=pricenew_harga_neto]').getValue());
		var totalAmount = 0;
		var totalPPN    = 0;
		var tempSch     = '';
		var arrTemp     = [];

		me.getSchedulegrid().getStore().each(function (rcd, p) {
			if(rcd != null){
				tempSch = rcd.get('scheduletype_scheduletype') + '_' + rcd.get('termin');
				if(arrTemp.includes(tempSch)){
					var terminNew = rcd.get('termin') + 1;
					tempSch = rcd.get('scheduletype_scheduletype') + '_' + terminNew;

					rcd.beginEdit();
					rcd.set({ termin : terminNew});
					rcd.endEdit();
				}
				arrTemp.push(tempSch);

				if(indexChangesplit.includes(p)){ /// edit nilai lama jadi o remaining balance nya
					////// yg sudah di bayar////
					var dppNew    = accounting.toFixed(parseFloat(rcd.get('dpp')) - parseFloat(rcd.get('remaining_dpp')), 4);
					var ppnNew    = accounting.toFixed(parseFloat(dppNew) * (parseFloat(oldPPN) / 100), 4);
					var amountNew = accounting.toFixed(parseFloat(rcd.get('amount')), 2) - accounting.toFixed(rcd.get('remaining_balance'), 2);

					rcd.beginEdit();
					rcd.set({ ppn : ppnNew, amount : amountNew, remaining_balance : 0, dpp : dppNew });
					rcd.endEdit();
				}

				if(typeof (rcd.get('is_split')) != 'undefined' && rcd.get('is_split') == true){
					var dppDup    = accounting.toFixed(parseFloat(rcd.get('remaining_dpp')), 4);
					var ppnDup    = accounting.toFixed(parseFloat(dppDup) * (parseFloat(newPPN) / 100), 4);
					var amountDup = accounting.toFixed(parseFloat(dppDup) + parseFloat(ppnDup), 2);

					rcd.beginEdit();
					rcd.set({ dpp : dppDup, ppn : ppnDup, amount : amountDup, remaining_balance : amountDup });
					rcd.endEdit();
				}

				/////////////////////////////////////////////////////
				if(isPpndtp){ //// perhitungan khusus jika ada ppndtp
					if(rcd.get('scheduletype_scheduletype_id') != 25 && rcd.get('remaining_balance') == rcd.get('amount')){
						var ppnFin = accounting.toFixed(parseFloat(rcd.get('dpp')) * (parseFloat(newPPN) / 100), 4);
						if (parseFloat(hargaNetto) <= 2000000000) {
							ppnFin = ppnFin * (1-(50/100));
						}
						else{
							ppnFin = ppnFin * (1-(25/100));
						}
						var amountFin = accounting.toFixed(parseFloat(rcd.get('dpp')) + parseFloat(ppnFin) + parseFloat(rcd.get('asuransi')) + parseFloat(rcd.get('bphtb_bbn_ajb')) + parseFloat(rcd.get('biaya_lain_lain')), 2);

						rcd.beginEdit();
						rcd.set({ amount : Math.floor(amountFin), remaining_balance : Math.floor(amountFin) });
						rcd.endEdit();
					}
				}

				var amountBaru = accounting.toFixed(parseFloat(accounting.unformat(rcd.get('amount'))), 2);
				var ppnBaru    = accounting.toFixed(parseFloat(accounting.unformat(rcd.get('ppn'))), 2);

				totalPPN    += parseFloat(ppnBaru);
				totalAmount += parseFloat(amountBaru);
			}
		});

		////////////////////////////////-----------------------------------//////////////////////////////////

		totalAmount = accounting.toFixed(totalAmount, 2);
		totalAmount = me.setParamCP.typeRounding.rounding(me.setParamCP.typeCalculaterounding, totalAmount);

		totalPPN = accounting.toFixed(totalPPN, 2);
		totalPPN = me.setParamCP.typeRounding.rounding(me.setParamCP.typeCalculaterounding, totalPPN);

		var hargaPPNtanah      = accounting.unformat(f.down('[name=price_harga_ppntanah]').getValue());
		var hargaPPNbangunan   = accounting.unformat(f.down('[name=price_harga_ppnbangunan]').getValue());
		var totalTanahBangunan = parseFloat(hargaPPNtanah) + parseFloat(hargaPPNbangunan);

		// var hargaPPNsubsididp  = accounting.unformat(f.down('[name=price_harga_ppnsubsidi_dp]').getValue());
		// var hargaPPNinterior   = accounting.unformat(f.down('[name=price_harga_ppninterior]').getValue());

		var hargaPPNtanahBaru = accounting.toFixed((parseFloat(hargaPPNtanah) / parseFloat(totalTanahBangunan)) * parseFloat(totalPPN), 2);
		hargaPPNtanahBaru     = me.setParamCP.typeRounding.rounding(me.setParamCP.typeCalculaterounding, hargaPPNtanahBaru);


		var hargaPPNbangunanBaru = accounting.toFixed((parseFloat(hargaPPNbangunan) / parseFloat(totalTanahBangunan)) * parseFloat(totalPPN), 2);
		hargaPPNbangunanBaru     = me.setParamCP.typeRounding.rounding(me.setParamCP.typeCalculaterounding, hargaPPNbangunanBaru);

		var hargaTanah          = accounting.unformat(f.down('[name=pricenew_harga_tanah]').getValue());
		var hargaKelebihanTanah = accounting.unformat(f.down('[name=pricenew_harga_kelebihantanah]').getValue());
		var hargaBangunan       = accounting.unformat(f.down('[name=pricenew_harga_bangunan]').getValue());

		// var subsidiDp           = accounting.unformat(f.down('[name=pricenew_subsidi_dp]').getValue());
		// var hargaInterior       = accounting.unformat(f.down('[name=pricenew_harga_interior]').getValue());

		var hargaDISCtanah    = accounting.unformat(f.down('[name=pricenew_harga_dischargetanah]').getValue());
		var hargaDISCbangunan = accounting.unformat(f.down('[name=pricenew_harga_dischargebangunan]').getValue());


		var persenPPNtanahBaru = (parseFloat(hargaPPNtanahBaru) / ( parseFloat(hargaTanah) + parseFloat(hargaKelebihanTanah) - parseFloat(hargaDISCtanah) )) * 100;
		persenPPNtanahBaru     = accounting.toFixed(persenPPNtanahBaru, 2);

		var persenPPNbangunanBaru = (parseFloat(hargaPPNbangunanBaru) / ( parseFloat(hargaBangunan) - parseFloat(hargaDISCbangunan) )) * 100;
		persenPPNbangunanBaru     = accounting.toFixed(persenPPNbangunanBaru, 2);

		var persenPPNbangunanBaru = (parseFloat(hargaPPNbangunanBaru) / ( parseFloat(hargaBangunan) - parseFloat(hargaDISCbangunan) )) * 100;
		persenPPNbangunanBaru     = accounting.toFixed(persenPPNbangunanBaru, 2);

		var persenPPNbangunanBaru = (parseFloat(hargaPPNbangunanBaru) / ( parseFloat(hargaBangunan) - parseFloat(hargaDISCbangunan) )) * 100;
		persenPPNbangunanBaru     = accounting.toFixed(persenPPNbangunanBaru, 2);

		f.down('[name=pricenew_harga_ppntanah]').setValue(accounting.formatMoney(hargaPPNtanahBaru));
		f.down('[name=pricenew_persen_ppntanah]').setValue(accounting.formatMoney(persenPPNtanahBaru));
		f.down('[name=pricenew_harga_ppnbangunan]').setValue(accounting.formatMoney(hargaPPNbangunanBaru));
		f.down('[name=pricenew_persen_ppnbangunan]').setValue(accounting.formatMoney(persenPPNbangunanBaru));

		var hargajual = parseFloat(hargaNetto) + parseFloat(accounting.unformat(f.down('[name=pricenew_harga_ppntanah]').getValue())) + parseFloat(accounting.unformat(f.down('[name=pricenew_harga_ppnbangunan]').getValue())) + parseFloat(accounting.unformat(f.down('[name=pricenew_harga_ppnsubsidi_dp]').getValue())) + parseFloat(accounting.unformat(f.down('[name=pricenew_harga_ppninterior]').getValue())) + parseFloat(accounting.unformat(f.down('[name=pricenew_harga_ppnbm]').getValue())) + parseFloat(accounting.unformat(f.down('[name=pricenew_harga_pph22]').getValue())) + parseFloat(accounting.unformat(f.down('[name=pricenew_harga_bbnsertifikat]').getValue())) + parseFloat(accounting.unformat(f.down('[name=pricenew_harga_bphtb]').getValue())) + parseFloat(accounting.unformat(f.down('[name=pricenew_harga_bajb]').getValue())) + parseFloat(accounting.unformat(f.down('[name=new_harga_pmutu]').getValue()));

		var hargajual = me.setParamCP.typeRounding.rounding(me.setParamCP.typeCalculaterounding, hargajual);

		f.down('[name=pricenew_harga_jual]').setValue(accounting.formatMoney(hargajual));

		var totalhargajual = (parseFloat(hargajual) + parseFloat(accounting.unformat(f.down('[name=new_harga_administrasi]').getValue())) + parseFloat(accounting.unformat(f.down('[name=new_harga_paket_tambahan]').getValue())) + parseFloat(accounting.unformat(f.down('[name=new_harga_admsubsidi]').getValue())) + parseFloat(accounting.unformat(f.down('[name=new_biaya_asuransi]').getValue()))) - parseFloat(accounting.unformat(f.down('[name=new_harga_salesdisc]').getValue()));

		totalhargajual = me.setParamCP.typeRounding.rounding(me.setParamCP.typeCalculaterounding, totalhargajual);
		totalhargajual = parseFloat(totalhargajual) + parseFloat(accounting.unformat(f.down('[name=harga_pembulatan_new]').getValue()));

		f.down('[name=new_harga_total_jual]').setValue(accounting.formatMoney(totalhargajual));

		////hilangkan koma di schedule
		var storePembulatan    = me.getSchedulegrid().getStore();
		var totstorePembulatan = storePembulatan.getCount();
		var totAmount          = 0;
		var lastIndex          = '';
		storePembulatan.each(function (rc, y) {
			if(rc != null){
				if(rc.get('scheduletype_scheduletype_id') == 25 || rc.get('remaining_balance') != 0 && rc.get('dpp') != 0 && rc.get('ppn') != 0){
					if(rc.get('scheduletype_scheduletype_id') == 25){
						var newAmountppndtp = me.setParamCP.libPpndtp.calculate(parseFloat(hargaNetto), parseFloat(hargaPPNtanahBaru) + parseFloat(hargaPPNbangunanBaru));
						newAmountppndtp     = newAmountppndtp == 0 ? newAmountppndtp = rc.get('amount') : newAmountppndtp;

						rc.beginEdit();
						rc.set({ amount : Math.floor(newAmountppndtp) });
						rc.endEdit();
					}
					else if(rc.get('remaining_balance') == rc.get('amount')){
						rc.beginEdit();
						rc.set({ amount : Math.floor(rc.get('amount')), remaining_balance : Math.floor(rc.get('remaining_balance')) });
						rc.endEdit();

						lastIndex = y;
					}
				}
				totAmount += parseFloat(accounting.toFixed(parseFloat(accounting.unformat(rc.get('amount'))), 2));
			}
		});

		if(totalhargajual != totAmount && lastIndex != ''){
			var selisih      = parseFloat(totalhargajual) - parseFloat(totAmount);
			var lastRecstore = storePembulatan.getAt(lastIndex);
			var lastAmount   = accounting.toFixed(parseFloat(lastRecstore.get('amount')) + parseFloat(selisih), 2);

			lastRecstore.beginEdit();
			lastRecstore.set({ amount : lastAmount, remaining_balance : lastAmount });
			lastRecstore.endEdit();
		}
	},
	addNewPPNDTP : function(){
		var me 		= this,
			f     	= me.getFormdata(),
			g 		= me.getSchedulegrid(),
			s       = g.getStore(),
			startDt = new Date("2023-11-01"),
			endDt   = new Date("2024-12-31");

		var cekPPNDTP = false;
		s.each(function (recod) {
			if(recod.data.scheduletype_scheduletype == 'PPNDTP'){
				cekPPNDTP = true;
			}
		});

		if(cekPPNDTP){
			Ext.Msg.alert("Alert", "Sudah terdapat tagihan PPNDTP.");
			return false;
		}


        Ext.Msg.alert("Info", "Tanggal Estimasi Serah Terima Wajib di isi untuk menentukan PPNDTP 50% atau 100%");

		var totalRecord = s.getCount();
		var lastRec     = s.getAt(totalRecord - 1);

		var purchase_date    = me.getFormdata().down("[name=purchaseletter_purchase_date]").getValue();
		var vRencanaStDate   = new Date(f.down("[name=rencana_serahterima_date]").getValue());
		var vRencanaStDate50 = new Date("2024-06-30");

		var nppndtp  = vRencanaStDate > vRencanaStDate50 ? 2 : 1;

		var ppndtp = 0;
		for (var i = 0; i < totalRecord; i++) {
			var rec = s.getAt(i);
			var duedate = new Date(rec.get("duedate"));
			var amount  = rec.get("amount");
			var remaining_balance = rec.get("remaining_balance");
			// // if (duedate >= startDt && duedate <= endDt && amount == remaining_balance) {
			if (duedate >= startDt && duedate <= endDt) {
				formula = me.tools.floatval((amount / 1.11) * 0.11).toFixed(2);
				ppndtp += me.tools.floatval(formula);
			}
		}

		var myDate = new Erems.library.box.tools.Date({
			date : lastRec ? lastRec.get('duedate') : purchase_date
		});

		var newDate = myDate.addMonth(1);
		if (ppndtp > 0) {
			var amountPPNDTP = Math.ceil((ppndtp/nppndtp));

			lastRec.beginEdit();
			lastRec.set({
				remaining_balance : lastRec.get('remaining_balance') - amountPPNDTP,
				amount            : lastRec.get('amount') - amountPPNDTP,
			});
			lastRec.endEdit();

			me.scheduleGrid.addNewSchedule(me, {
				ppndtp 				: {duedate : newDate, amount : amountPPNDTP},
				purchase_date       : me.getFormdata().down("[name=purchaseletter_purchase_date]").getValue(),
				fieldHargaTotalJual : 'new_harga_total_jual'
			}, me.getFormdata(), me.getSchedulegrid());
		}
	},
	formDataUploadFileDoc: function(fld) {
		var me = this;
		var form = fld.up("form");

		me.uploadFile({
			form     : form,
			params   : {
				tipe : 'document',
				mode_read      : 'upload',
				filedoc        : me.getFormdata().down('[name=npv_doc_approved]').getValue(),
				changeprice_id : me.getFormdata().down('[name=changeprice_id]').getValue()
			},
			callback : {
				success: function(imageName) {
					form.down("[name=npv_doc_approved]").setValue(imageName);
					form.down("#view_document").show();
				},
				failure: function() {
					console.log('Upload Document Failed.')
				}
			}
		});
	},
	uploadFile: function(params) {
		var me = this;
		var form     = params.form;
		var callback = params.callback;

		var filesize = 0;
		var filedoc = document.getElementsByName("file_npv_doc_approved")[0];
		if(filedoc != null){
			filesize = filedoc.files[0].size;
		}

        var allowedExtensions = /(\.pdf)$/i;
        if(!allowedExtensions.exec(filedoc.files[0].name)){
			var msg = "Only PDF formats are accepted.";
			Ext.Msg.show({
				title   : 'Fail',
				msg     : msg,
				icon    : Ext.Msg.ERROR,
				buttons : Ext.Msg.OK
			});
        }
		else if(filesize > 0 && filesize <= 4194304){ //filesize max 4MB 4194304
			form.submit({
				clientValidation : false,
				url              : 'erems/' + me.controllerName + '/read',
				params           : params.params,
				waitMsg          : 'Uploading file...',
				success          : function(f, a) {
					var icon = Ext.Msg.INFO;
					var msg = 'File Uploaded';

					if (!a.result.success) {
						icon = Ext.Msg.ERROR;
						msg = a.result.msg;
					} else {
						callback.success(a.result.msg);
					}

					Ext.Msg.show({
						title   : 'Info',
						msg     : msg,
						icon    : icon,
						buttons : Ext.Msg.OK
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
						title   : 'Fail',
						msg     : msg,
						icon    : Ext.Msg.ERROR,
						buttons : Ext.Msg.OK
					});
				}
			});
		} else {
			var msg = "File upload maximum 4 MB";
			Ext.Msg.show({
				title   : 'Fail',
				msg     : msg,
				icon    : Ext.Msg.ERROR,
				buttons : Ext.Msg.OK
			});
		}
	},
});
