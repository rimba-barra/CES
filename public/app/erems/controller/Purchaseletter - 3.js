Ext.define('Erems.controller.Purchaseletter', {
	extend   : 'Erems.library.template.controller.Controller2',
	alias    : 'controller.Purchaseletter',
	requires : [
		'Erems.library.Unitformula', 
		'Erems.library.Schedulegenerator', 
		'Erems.library.Browse', 
		'Erems.library.Purchaseletter', 
		'Erems.library.PurchaseletterCGCibubur', 
		'Erems.library.box.Config', 
		'Erems.library.box.tools.Tools', 
		'Erems.template.ComboBoxFields', 
		'Erems.library.box.tools.EventSelector', 
		'Erems.library.Calculator',  
		'Erems.library.CalculatorDiscount', 
		'Erems.library.CalculatorFields', 
		'Erems.library.box.tools.CryptoJs', 
		'Erems.library.box.tools.Date', 
		'Erems.library.box.tools.DateX', 
		'Erems.library.ModuleTools', 
		'Erems.library.DetailtoolAll',
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Pricetypecombobox',
		'Erems.library.ScheduleAddAdvance',
		'Erems.library.TypeRounding',
		'Erems.library.Ppndtp',
		'Erems.library.TigaSekawan', 
		'Erems.library.XyReportJs'
	],
	views : [
		'purchaseletter.Panel', 
		'purchaseletter.Grid', 
		'purchaseletter.FormSearch', 
		'purchaseletter.FormData', 
		'purchaseletter.FormDataMoreCustomer', 
		'purchaseletter.CGrid', 
		'purchaseletter.JBGrid', 
		'purchaseletter.FormDataSurvey', 
		'purchaseletter.FormDataTahanBatal', 
		'purchaseletterreward.RewardGrid', 
		'purchaseletterreward.FormDataDetail', 
		'purchaseletter.FormDataHargaNetto'
	],
	stores : ['Sourcemoney', 'Morecustomer', 'Purchaseletterrewarddetail', 'Mastercluster', 'Scheduletype', 'Jenisbiayapurchaseletter'],
	models : ['Sourcemoney', 'Morecustomer', 'Purchaseletterrewarddetail'],
	refs   : [
		{
			ref      : 'grid',
			selector : 'purchaselettergrid'
		},
		{
			ref      : 'panel',
			selector : 'purchaseletterpanel'
		},
		{
			ref      : 'formsearch',
			selector : 'purchaseletterformsearch'
		},
		{
			ref      : 'formdata',
			selector : 'purchaseletterformdata'
		},
		{
			ref      : 'formauth',
			selector : 'purchaseletterauthrozieform'
		},
		{
			ref      : 'formrschlist',
			selector : 'purchaseletterrschlistform'
		},
		{
			ref      : 'formrschform',
			selector : 'purchaseletterrschformdata'
		},
		{
			ref      : 'unitgrid',
			selector : 'purchaseletterunitgrid'
		},
		{
			ref      : 'rschlistgrid',
			selector : 'purchaseletterreschedulegrid'
		},
		{
			ref      : 'rschmaingrid',
			selector : 'purchaseletterreschmaingrid'
		},
		{
			ref      : 'schedulegrid',
			selector : 'purchaseletterschedulegrid'
		},
		{
			ref      : 'panel',
			selector : 'purchaseletterpanel'
		},
		{
			ref      : 'formprintout',
			selector : 'purchaseletterformprintout'
		},
		{
			ref      : 'formprintoutpayscheme',
			selector : 'purchaseletterformprintoutpayscheme'
		},
		{
			ref      : 'formdataadv',
			selector : 'purchaseletterformdataaddschedule'
		},
		{
			ref      : 'formsplittagihan',
			selector : 'purchaseletterformsplittagihan'
		},
		{
			ref      : 'customergrid',
			selector : 'purchaselettercustomergrid'
		},
		{
			ref      : 'formdatamorecustomer',
			selector : 'purchaseletterformdatamorecustomer'
		},
		{
			ref      : 'morecustomergrid',
			selector : 'morecustomergrid'
		},
		{
			ref      : 'formdatasurvey',
			selector : 'purchaseletterformdatasurvey'
		},
		{
			ref      : 'formdatatahanbatal',
			selector : 'purchaseletterformdatatahanbatal'
		},
		{
			ref      : 'rewarddetailgrid',
			selector : 'purchaseletterrewardgriddetail'
		},
		{
			ref      : 'rewardformdatadetail',
			selector : 'purchaseletterrewardformdatadetail'
		},
		{
			ref      : 'formdataharganetto',
			selector : 'purchaseletterformdataharganetto'
		},
		{
			ref      : 'jenisbiayagrid',
			selector : 'jenisbiayagrid'
		},
	],
	controllerName     : 'purchaseletter',
	fieldName          : 'purchaseletter_no',
	bindPrefixName     : 'Purchaseletter',
	formWidth          : 800,
	countLoadProcess   : 0,
	browseHandler      : null,
	browseHandlerMulti : {},
	unitFormula        : {}, /// unitFormula object,
	scheduleGen        : {}, //// schedule generator object
	localStore         : {
		selectedUnit : null,
		customer     : null,
		price        : null,
		detail       : null,
		schType      : null
	},
	tools          : null,
	myConfig       : null,
	mt             : null,
	cbf            : null,
	xyReport       : null,
	reportFileView : null,
	setParamPL     : {
		libPpndtp                           : null,
		calculator                          : null,
		calculatorDiscount                  : null,
		sourceMoneyList                     : null,
		currentPriceType                    : 0,
		globalParams                        : null,
		sourceMoneyDefault                  : { id : 0, name : '' },
		prolibs                             : null,
		prolibsFile                         : null,
		calculatorJs                        : null,
		purchaseletterJs                    : null,
		isRSCHApproveUser                   : false,
		templatePrintmrt                    : null,
		templatePrint                       : null,
		templatePrintSPTDraft               : null,
		templatePrintPayScheme              : null,
		verifikasiDiskonInfo                : null,
		puleLunasTandaJadi                  : false, // flag kalau purchaseletter ini lunas tanda jadi
		useLunasTandaJadi                   : false, // menggunakan paramter lunas tanda jadi
		validChangeName                     : false,
		validChangeNameMsg                  : false,
		isTestNewButtonBrowse               : true,
		purchaseAddon                       : null,
		approveNowRsch                      : null,
		isPurchaseprintktsim                : false,
		totalDocumentKtpSim                 : 0,
		isFlashPrint                        : false,
		mkProlibFile                        : null,
		checkCanSPTDraft                    : false,
		isDraft                             : false,
		checkDataCustomer                   : false,
		userkpraccdate                      : false,
		scheduleOld                         : [],
		scheduleStrict                      : false,
		groupuser                           : false,
		detailTool                          : null,
		detailTool2                         : null,
		globisAuthorizedUser                : false,
		verification_approval               : false,
		isUsedVerification                  : false,
		visible_insentif_pajak              : false,
		visible_tahan_batal                 : false,
		printoutsptmrt                      : false,
		flagprintoutspt                     : false,
		pricelist                           : null,
		pricelist_koefisien                 : null,
		param_generate_notes                : null,
		visible_vida                        : 0,
		visible_fest40                      : 0,
		flagFromprintout                    : null,
		visible_extend_schedule             : false,
		rencanaST_enddate                   : false,
		surveyConfig                        : null,
		visibleTahanBatal                   : false,
		getPurcheletterSendWaActive         : 0,
		getPurcheletterSendWaPhone          : null,
		getPurcheletterSendWaText           : null,
		activePricesource                   : 0,
		typeCalculaterounding               : 0,
		currentPriceType                    : 0,
		globalParams                        : null,
		sourceMoneyList                     : null,
		hargaNettoKomisi                    : null,
		firstPurchasedate                   : '',
		ShowMoreCustomerOnGrid              : false,
		master_salesgroup                   : null,
		ppn_value                           : 10,
		master_im                           : [],
		master_im_detail                    : [],
		visible_blokir                      : 0,
		visible_disc_karyawan               : 0,
		visible_promo                       : 0,
		paramPricelist                      : {},
		useJenisBiayaPurchaseletter         : 0,
		jenisBiayaPurchaseletter            : [],
		purchaseletterRencanaSerahTerimaNew : 0,
		showKuasaCustomerPurchaseletter     : 0,
		disablePromoPurchaseletter          : 0,
	},
	constructor : function (configs) {
		this.callParent(arguments);
		
		var me = this;

		me.myConfig             = new Erems.library.box.Config({ _controllerName : me.controllerName });
		me.cbf                  = new Erems.template.ComboBoxFields();
		me.tools                = new Erems.library.box.tools.Tools({config: me.myConfig});
		me.roundlib             = new Erems.library.TypeRounding();
		me.setParamPL.libPpndtp = new Erems.library.Ppndtp();

		if (typeof Mustache === "undefined") {
			Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () {

				if (typeof ApliJs === "undefined") {
					Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js?_dc=' + Ext.Date.now(), function () {
						// console.log("[INFO] ApliJs loaded.");
					}, function () {
						// error load file
					});
				}
			}, function () {
				//  me.tools.alert.warning("Error load Prolibs.js file.");
			});
		}
	},
	init : function (application) {
		var me = this;

		me.tools                         = new Erems.library.box.tools.Tools({ config: me.myConfig });
		var events                       = new Erems.library.box.tools.EventSelector();
		me.setParamPL.calculatorDiscount = new Erems.library.CalculatorDiscount();

		// if (typeof Mustache === "undefined") {
		// 	Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () {

		// 		if (typeof ApliJs === "undefined") {
		// 			Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js?_dc=' + Ext.Date.now(), function () {
		// 				// console.log("[INFO] ApliJs loaded.");
		// 			}, function () {
		// 				// error load file
		// 			});
		// 		}
		// 	}, function () {
		// 		//  me.tools.alert.warning("Error load Prolibs.js file.");
		// 	});
		// }

		this.control({
			'purchaseletterpanel' : {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : this.panelAfterRender
			},
			'purchaselettergrid' : {
				afterrender     : this.gridAfterRender,
				itemdblclick    : this.gridItemDblClick,
				itemcontextmenu : this.gridItemContextMenu,
				selectionchange : this.gridSelectionChange,
				listeners       : { //edited by Rizal 1 Maret 2019
					load : function () {
						me.jqueryBinding();
					}
				}
			},
			'purchaseletterreschedulegrid' : {
				itemdblclick : this.rschgridItemDblClick,
			},
			'purchaseletterformsearch' : {
				afterrender : this.formSearchAfterRender
			},
			'purchaseletterschedulegrid' : {
				afterrender : function () {
					me.getSchedulegrid().on('edit', function (editor, e) {
						// commit the changes right after editing finished
						me.schedulGridOnEdit(editor, e, me.getFormdata(), me.getSchedulegrid());
						e.record.commit();
					});

				},
				cellclick : function (el, td, cellIndex, record, tr, rowIndex, e, eOpts) {
					me.schGridCellClick(el, record, rowIndex); // gak dipakai
				}
			},
			'purchaseletterreschmaingrid' : {
				afterrender : function () {
					me.getRschmaingrid().on('edit', function (editor, e) {
						// commit the changes right after editing finished
						var rec = e.record;
						me.schedulGridOnEdit(editor, e, me.getFormrschform(), me.getRschmaingrid());
						e.record.commit();
					});
					me.getRschmaingrid().down('[itemId=colms_kpraccdate]').setVisible(false);
				},
				cellclick : function (el, td, cellIndex, record, tr, rowIndex, e, eOpts) {
					me.schGridCellClick2(el, record, rowIndex); // gak dipakai
				},
				beforeselect : function (sm, record) {
				},
				selectionchange : function (sm, selected) {
					if (selected.length > 0) {
						Ext.Array.each(selected, function (record) {
							if ((record.get('amount') > record.get('remaining_balance')) && (record.get('remaining_balance') <= 0.0)) {
								// deselect
								sm.deselect(record, true);
							}
						});

						var record = selected[0];
						if ((me.tools.floatval(record.get('amount')) > me.tools.floatval(record.get('remaining_balance'))) && (me.tools.floatval(record.get('remaining_balance')) > 0.0)) {
							me.getRschmaingrid().down("[action=split]").setDisabled(false);
						} else {
							me.getRschmaingrid().down("[action=split]").setDisabled(true);
						}
					}
				}
			},
			'purchaseletterschedulegrid #sourceMoneyColumnID' : {
				beforerender : function (el) {
					//   me.schGridColumnCBBeforRender(el);
				}
			},
			'purchaseletterschedulegrid #colms_sourcemoney' : {
				//  click: this.schedulegridItemClick
			},
			'purchaselettergrid toolbar button[action=create]' : {
				click : function () {
					//this.formDataShow('create');
				}
			},
			'purchaselettergrid toolbar button[action=update]' : {
				click : function () {
					// this.formDataShow('update');
				}
			},
			'purchaselettergrid toolbar button[action=editdraft]' : {
				click : function () {
					this.formDataShow('editdraftFunction', 'editdraft');
				}
			},
			'purchaselettergrid toolbar button[action=deletedraft]' : {
				click : this.dataDestroyDraft
			},
			'purchaselettergrid toolbar button[action=rescheduleMainGrid]' : {
				click : function () {
					me.rescheduleFrom = 'mainGrid';
					me.dataReschedule = me.getGrid().getSelectedRecord();
					
					me.setParamPL.firstPurchasedate = me.getGrid().getSelectedRecord().get('firstpurchase_date');

					me.cekApproval();
				}
			},
			'purchaselettergrid toolbar button[action=hargaNettoKomisiGrid]' : {
				click : function(){
					me.setParamPL.detailTool = new Erems.library.DetailtoolAll();
					me.setParamPL.detailTool.setConfig({
						viewPanel        : 'FormDataHargaNetto',
						parentFDWindowId : me.getGrid().up('window').id,
						controllerName   : me.controllerName
					});
					me.setParamPL.detailTool.form().show('create', 350, 'Harga Netto Komisi');
				}
			},
			'purchaselettergrid toolbar button[action=printsch]' : {
				click : this.printPaymentScheme
			},
			'purchaseletterschedulegrid toolbar button[action=create]' : {
				click : function () {
					me.addNewSchedule(me.getFormdata(), me.getSchedulegrid());
				}
			},
			'purchaseletterschedulegrid toolbar button[action=destroy]' : {
				click : function () {
					me.removeSchedule(me.getFormdata(), me.getSchedulegrid(), me.getGrid());
				}
			},
			'purchaseletterreschmaingrid toolbar button[action=create]' : {
				click : function () {
					me.addNewSchedule(me.getFormrschform(), me.getRschmaingrid());
				}
			},
			'purchaseletterreschmaingrid toolbar button[action=destroy]' : {
				click : function () {
					me.removeScheduleRsch(me.getFormrschform(), me.getRschmaingrid(), me.getRschlistgrid());
				}
			},
			'purchaseletterreschmaingrid toolbar button[action=split]' : {
				click : function () {
					me.splitSchedulePromptRsch();
				}
			},
			'purchaseletterreschmaingrid toolbar button[action=add_advance]' : {
				click : function () {
					me.addAdvancRschForm();
				}
			},
			'purchaseletterreschmaingrid toolbar button[action=genPPNDTP]' : {
				click : function () {
					me.addNewPPNDTP(me.getFormrschform(), me.getRschmaingrid());
				}
			},
			'purchaseletterreschmaingrid toolbar button[action=reset]' : {
				click : function () {
					me.getRschmaingrid().getStore().load();
				}
			},
			'purchaseletterschedulegrid toolbar button[action=reschedule]' : {
				click : function () {
					me.rescheduleFrom = 'formData';
					me.cekApproval();
				}
			},
			'purchaseletterreschedulegrid toolbar button[action=create]' : {
				click : function () {
					var openReschedule = true;
					if(me.getRschlistgrid().getStore().getCount() > 0){
						me.getRschlistgrid().getStore().each(function (rec) {
							if(me.empty(rec.get('is_approve'))){
								openReschedule = false;
							}
						});
					}

					if(openReschedule){
						me.showRescheduleFormData();
					}
					else{
						Ext.Msg.alert("Alert", "Ada Reschedule yang belum di Approve.");
						return;
					}
				}
			},
			'purchaseletterreschedulegrid toolbar button[action=edit]' : {
				click : function () {
					me.rschgridItemDblClick();
				}
			},
			'purchaselettergrid toolbar button[action=destroy]' : {
				click : this.dataDestroyMyPurchase
			},
			'purchaseletterreschedulegrid toolbar button[action=destroy]' : {
				click : this.dataDestroyRsch
			},
			/// add by Erwin.st 04112021
			'purchaselettergrid toolbar button[action=printout]': {
				click : function(){
					me.setParamPL.flagFromprintout = 'grid';
					me.printoutdocGrid(0);
				}
			},
			'purchaselettergrid toolbar button[action=printoutdraftspt]': {
				click : function(){
					me.setParamPL.flagFromprintout = 'grid';
					me.printoutdocGrid(1);
				}
			},
			'purchaselettergrid toolbar button[action=btnRegenerateva]': {
				click : function(){
					me.reGenerateVA();
				}
			},
			'purchaseletterreschedulegrid toolbar button[action=approve]' : {
				click : this.dataApproveRsch
			},
			// added by rico 17012022
			'purchaselettergrid toolbar button[action=send_survey]': {
				click : function () {
					me.sendsurveyGrid();
				}
			},
			// 'purchaseletterreschedulegrid toolbar button[action=destroy]': {
			// 	click : this.dataDestroyRsch
			// },
			'purchaselettergrid toolbar button[action=print]' : {
				click : this.dataPrint
			},
			'purchaselettergrid actioncolumn' : {
				afterrender : this.gridActionColumnAfterRender,
				click       : this.gridActionColumnClick
			},
			'purchaseletterformsearch button[action=search]' : {
				click : this.dataSearch
			},
			// 'purchaseletterreschedulegrid toolbar button[action=destroy]': {
			// 	click : this.dataDestroyRsch
			// },
			'purchaseletterformsearch button[action=reset]' : {
				click : function () {
					var me     = this;
					var form   = me.getFormsearch().getForm();
					var store  = me.getGrid().getStore();
					var fields = form.getValues();
					
					if (me.groupuser == 'NUP GROUP') {
						search = me.getFormsearch();
						search.down('#btnCheckDraft').setValue(true);
						search.down('#btnCheckDraft').setReadOnly(true);
					}
	   
					for (var x in fields){
						fields[x] = '';
						store.getProxy().setExtraParam(x, fields[x]);
					}
					form.reset();
					me.loadPage(store);
				}
			},
			'purchaseletterformdata button[action=create_new_customer]' : {
				click : this.addCustomer
			},
			//add by semy 8:48 21/6/17
			'purchaseletterformdata button[action=setaci]': {
				click : function () {
					var me;
					me = this;
					me.apiAci();
				}
			},
			//end semy
			'purchaseletterrschlistform' : {
				afterrender : this.fdarReschList
			},
			'purchaseletterrschformdata' : {
				afterrender : this.fdarReschForm
			},
			'purchaseletterrschformdata [name=tanggal_validasi]' : {
				change : function (el, val) {
					me.tanggalvalidasi(val);
				}
			},
			'purchaseletterformdata' : {
				afterrender : this.formDataAfterRender
			},
			'purchaseletterformdata combobox' : {
				change : function (el, val) {
					me.comboBoxOnChange(el, val);
				}
			},
			'purchaseletterrschformdata button[action=save]' : {
				click : this.mainDataSaveRsch
			},
			'purchaseletterformdata button[action=save]' : {
				click : this.mainDataSave
			},
			'purchaseletterformdata button[action=saveDraft]' : {
				click : this.mainDataSaveDraft
			},
			'purchaseletterformdata button[action=cancel]' : {
				click : this.formDataClose
			},
			'purchaseletterformdata button[action=printout]' : {
				click : function () {
					me.printoutdoc(0);
				}
			},
			'purchaseletterformdata button[action=printoutdraftspt]' : {
				click : function () {
					me.printoutdoc(1);
				}
			},
			'purchaseletterformdata button[action=printoutspt]' : {
				click : function () {
					me.setParamPL.flagFromprintout = 'formdata';
					me.setParamPL.flagprintoutspt = true;
					me.printoutdoc(0);
				}
			},
			'purchaseletterformdata button[action=printsch]' : {
				click : this.printPaymentScheme
			},
			'purchaseletterformdata button[action=browse_unit]' : {
				click : function () {
					ApliJs.showHtml(me, "browse_unit_modal", {}, 'browse_action');
				}
			},
			'purchaseletterunitgrid button[action=select]' : {
				click : this.unitSelect
			},
			'purchaseletterformdata button[action=browse_customer]' : {
				click : this.browseCustomer
			},
			'purchaselettercustomergrid button[action=select]' : {
				click : this.customerSelect
			},
			'purchaseletterformdata textfield[name=pricetype_pricetype_id]' : {
				select : this.priceTypeOnSelect
			},
			'purchaseletterformdata textfield[name=billingrules_billingrules_id]' : {
				select : this.billingRulesOnSelect
			},
			'purchaseletterformdata [name=upline_upline_id]' : {
				select : function () {
					me.uplineOnSelect();
				}
			},
			'purchaseletterformdata [name=cac_cac_id]': {
				select : function () {
					me.cacOnSelect();
				}
			},
			'purchaseletterformdata textfield[name=persen_salesdisc]': {
				keyup : function (el) {
					me.setParamPL.processor.calculate();
				}
			},
			'purchaseletterrschformdata textfield[name=rencanaserahterima_month]': {
				keyup : function () {
					me.rencanaSerahTerimaOnKeyUpRsch();
				}
			},
			// added 1/3/2015
			'purchaseletterformdata textfield[name=rencana_serahterima]': {
				keyup : function () {
					if(me.setParamPL.purchaseletterRencanaSerahTerimaNew && me.getSchedulegrid().getStore().getCount() == 0){
						me.getFormdata().down('[name=rencana_serahterima]').setValue(0);
						Ext.Msg.alert("Alert", "Silahkan generate schedule terlebih dahulu.");
						return;
					}
					me.rencanaSerahTerimaOnKeyUp();
				}
			},
			'purchaseletterformdata [name=rencana_serahterima_date]': {
				select : function () {
					me.rencanaSerahTerimaDateOnSelect();
				}
			},
			'purchaseletterformdata button[action=genschedule]': {
				click: function () {
					var totalPPN = 0;

					if (me.getFormdata().down("[name=is_ppndtp]").getValue() == 1) {
						var totPPN   = parseFloat(accounting.unformat(me.getFormdata().down("[name=price_harga_ppntanah]").getValue())) + parseFloat(accounting.unformat(me.getFormdata().down("[name=price_harga_ppnbangunan]").getValue()));
						var totalPPN = me.setParamPL.libPpndtp.calculate(accounting.unformat(me.getFormdata().down("[name=price_harga_neto]").getValue()), totPPN);

						if(totalPPN == 0){
							Ext.Msg.alert("Alert", "Netto Lebih dari 5 Miliar, silakan uncheck Schedule PPNDTP");
							return;
						}
					}

					if(me.getFormdata().down("[name=price_source]").getValue() == 2){ /// Add by Erwin.St 03082021
						me.generateSchedulekoefisiendetail();
					}
					else{
						me.setParamPL.processor.totalPPN  = Math.floor(totalPPN);
						me.setParamPL.processor.plDate    = me.getFormdata().down("[name=purchase_date]").getValue();
						me.setParamPL.processor.rencanaStDate    = me.getFormdata().down("[name=rencana_serahterima_date]").getValue();
						me.setParamPL.processor.is_ppndtp = me.getFormdata().down("[name=is_ppndtp]").getValue();
						me.setParamPL.processor.generateSchedule();
					}
					
					Ext.Msg.alert("Alert", "Tanggal Estimasi Serah Terima Wajib di isi untuk menentukan PPNDTP 50% atau 100%");
					
					me.generateSchedule();

					//// Generate notes add by Erwin.St 22/09/2021
					me.generateNotes();
				}
			},
			'purchaseletterformdata [name=utj_date]': {
				change : function (el) {
					me.checkUMDate(el);

					var totalData = me.getSchedulegrid().getStore().getCount(),
						price_source = me.getFormdata().down("[name=price_source]").getValue();

					if (totalData > 0) {
						if(price_source == 2){
							me.generateSchedulekoefisiendetail();
						}
						else{
							me.setParamPL.processor.generateSchedule();
						}
						me.generateSchedule();
					}
				}
			},
			'purchaseletterformdata [name=um1_date]': {
				change: function () {
					var totalData = me.getSchedulegrid().getStore().getCount(),
						price_source = me.getFormdata().down("[name=price_source]").getValue();

					if (totalData > 0) {
						if(price_source == 2){
							me.generateSchedulekoefisiendetail();
						}
						else{
							me.setParamPL.processor.generateSchedule();
						}
						me.generateSchedule();
					}
				}
			},
			'purchaseletterformdata [name=house_advisor]': {
				change : function () {
					alert('AOPSKJAIJSHIAJSKHAS');
				}
			},
			'purchaseletterformdata button[action=authorize]': {
				click : function () {
					me.showAuthorizeForm();
				}
			},
			'purchaseletterauthrozieform button[action=login]': {
				click : function () {
					me.authLogin();
				}
			},
			'purchaseletterformprintout button[action=print]': {
				click : function () {
					me.formTemplatePrint();
				}
			},
			//addby imaam on 20210327
			'purchaseletterformdata checkboxfield[name=is_ppndtp]': {
				change : function (el) {
					this.ppndtpSelected(el);
				}
			},
			'purchaseletterformprintoutpayscheme button[action=print]': {
				click : function () {
					me.formTemplatePrintPayScheme();
				}
			},
			'purchaseletterformdataaddschedule button[action=save]': {
				click : function () {
					me.plsaveFormAdvanceOnClick();
				}
			},
			'purchaseletterformsplittagihan button[action=process]': {
				click : function () {
					me.plProcessSplitTagihan();
				}
			},
			'purchaseletterformdata combobox[name=rewardsales_reward_id]': {
				select : function () {
					me.getFormdata().down("[name=rewardsales_code]").setValue(me.tools.comboHelper(me.getFormdata().down("[name=rewardsales_reward_id]")).getField('reward_id', 'code'));
				}
			},
			'purchaseletterformdata combobox[name=rewardcustomer_reward_id]': {
				select : function () {
					me.getFormdata().down("[name=rewardcustomer_code]").setValue(me.tools.comboHelper(me.getFormdata().down("[name=rewardcustomer_reward_id]")).getField('reward_id', 'code'));
				}
			},
			'purchaseletterformdata combobox[name=rewardtambahan_reward_id]': {
				select : function () {
					me.getFormdata().down("[name=rewardtambahan_code]").setValue(me.tools.comboHelper(me.getFormdata().down("[name=rewardtambahan_reward_id]")).getField('reward_id', 'code'));
				}
			},
			'purchaseletterformdata button[action=flashprint]': {
				click : function () {
					me.purchaseFlashprint();
				}
			},
			'purchaseletterformdata [name=purchase_date]': {
				change : function () {
					me.change_purchase_date();
				}
			},
			'purchaseletterformdata [name=internalmemo_id]': {
				select : function () {
					_myAppGlobal.getController('Purchaseletterreward').change_im(me.setParamPL.master_im_detail);
				}
			},
			'purchaseletterreschedulegrid button[action=approvenow]': {
				click : function () {
					me.purcApproveNowReschedule();
				}
			},
			'morecustomergrid button[action=add]': {
				click : function () {
					me.setParamPL.detailTool = new Erems.library.DetailtoolAll();
					me.setParamPL.detailTool.setConfig({
						viewPanel        : 'FormDataMoreCustomer',
						parentFDWindowId : me.getPanel().up('window').id,
						controllerName   : me.controllerName
					});
					me.setParamPL.detailTool.parentGridAlias = 'morecustomergrid';

					me.setParamPL.detailTool.form().show('create', 700, 'Add New More Customer');
				}
			},
			'morecustomergrid gridcolumn': {
				click : function (view, cell, row, col, e) {
					me.detailMoreCustomer.editingIndexRow = row;
				}
			},
			'morecustomergrid button[action=edit]': {
				click : function () {
					var grid = me.getMorecustomergrid();
					var row  = grid.getSelectionModel().getSelection();
					var rec  = me.getMorecustomergrid().getSelectedRecord();

					if (row.length > 0) {
						me.setParamPL.detailTool = new Erems.library.DetailtoolAll();
						me.setParamPL.detailTool.setConfig({
							viewPanel        : 'FormDataMoreCustomer',
							parentFDWindowId : me.getPanel().up('window').id,
							controllerName   : me.controllerName
						});
						me.setParamPL.detailTool.parentGridAlias = 'morecustomergrid';

						me.setParamPL.detailTool.form().show('update', 700, 'Update New More Customer');
						var f = me.getFormdatamorecustomer();

						if (me.setParamPL.globisAuthorizedUser == true || me.setParamPL.isDraft == true) {
							var arrEl = ['customer_address', 'city_city_name', 'customer_zipcode', 'customer_home_phone', 'customer_mobile_phone', 'customer_office_phone', 'customer_fax', 'customer_KTP_number', 'customer_KTP_address', 'customer_email', 'customer_NPWP', 'customer_NPWP_name', 'customer_NPWP_address'];
							me.setterReadonly(f, arrEl, false);
						}

						f.down('#fd_more_customer').setDisabled(true);
						f.down('[name=customer_code]').setValue(rec.data.customer_id);
						f.down('[name=customer_name]').setValue(rec.data.customer_name);
						f.down('[name=customer_address]').setValue(rec.data.customer_address);
						f.down('[name=city_city_name]').setValue(rec.data.customer_city_id);
						f.down('[name=customer_zipcode]').setValue(rec.data.customer_zipcode);
						f.down('[name=customer_home_phone]').setValue(rec.data.customer_homephone);
						f.down('[name=customer_mobile_phone]').setValue(rec.data.customer_mobilephone);
						f.down('[name=customer_office_phone]').setValue(rec.data.customer_officephone);
						f.down('[name=customer_fax]').setValue(rec.data.customer_fax);
						f.down('[name=customer_KTP_number]').setValue(rec.data.customer_ktp);
						f.down('[name=customer_KTP_address]').setValue(rec.data.customer_ktp_address);
						f.down('[name=customer_email]').setValue(rec.data.customer_email);
						f.down('[name=customer_NPWP]').setValue(rec.data.customer_npwp);
						f.down('[name=customer_NPWP_name]').setValue(rec.data.customer_npwp_name);
						f.down('[name=customer_NPWP_address]').setValue(rec.data.customer_npwp_address);
						f.down('[name=customer_porsi_kepemilikan_customer]').setValue(rec.data.customer_porsi_kepemilikan_customer);

						me.getFormdatamorecustomer().down("#btnSave").setDisabled(false);
						me.getFormdatamorecustomer().down("[name=customer_name]").setReadOnly(false);
					} 
					else {
						Ext.Msg.alert("Alert", "Please select data");
					}
				}
			},
			'purchaseletterformdata [name=is_more_customer]': {
				change : function () {
					var f = me.getFormdata();
					var val = f.down('[name=is_more_customer]').getValue()
					if (val == 1) {
						f.down('#CGrid').setVisible(true);
					} 
					else {
						f.down('#CGrid').setVisible(false);
					}
				}
			},
			'purchaseletterformdatamorecustomer button[action=browse_customer]': {
				click : this.browseCustomer
			},
			'purchaseletterformdatamorecustomer button[action=save]': {
				click : this.detailMoreCustomer.save
			},
			'morecustomergrid button[action=delete]': {
				click : this.detailMoreCustomer.delete
			},
			//addby anas 05012021
			'purchaselettergrid toolbar button[action=add_survey]': {
				click : function () {
					me.setParamPL.detailTool = new Erems.library.DetailtoolAll();
					me.setParamPL.detailTool.setConfig({
						viewPanel        : 'FormDataSurvey',
						parentFDWindowId : me.getGrid().up('window').id,
						controllerName   : me.controllerName
					});
					me.setParamPL.detailTool.form().show('create', 350, 'Hasil Survey');
				}
			},
			'purchaseletterformdatasurvey': {
				afterrender : this.formDataSurveyAfterRender
			},
			'purchaseletterformdatasurvey button[action=save]': {
				click : me.detailFormSurvey.save
			},
			////// add by Erwin 04/06/2021
			'purchaselettergrid toolbar button[action=tahan_batal]': {
				click: me.detailFormTahanBatal.showFormData
			},
			'purchaseletterformdatatahanbatal button[action=save]': {
				click: me.detailFormTahanBatal.save
			},
			'purchaseletterformdatatahanbatal [name=is_tahanbatal]': {
				change: me.detailFormTahanBatal.changeTahanBatal
			},
			'purchaseletterformdata [name=price_source]': {
				select : me.changePricesource
			},
			'purchaseletterformdata [name=pricelist_id]': {
				select : me.changePricelist
			},
			'purchaseletterformdata [name=pricelistdetail_koefisien_id]': {
				select : me.changePricelistdetailkoefisien
			},
			'purchaseletterformsearch [name=unit_unit_number]': {
				keypress: function (e, el) {
					var me = this;
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				}
			},
			'purchaseletterformsearch [name=purchaseletter_no]': {
				keypress: function (e, el) {
					var me = this;
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				}
			},
			'purchaseletterformsearch [name=customer_name]': {
				keypress: function (e, el) {
					var me = this;
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				}
			},
			'purchaseletterformsearch [name=unit_virtualaccount_bca]': {
				keypress: function (e, el) {
					var me = this;
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				}
			},
			'purchaseletterformsearch [name=unit_virtualaccount_mandiri]': {
				keypress: function (e, el) {
					var me = this;
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				}
			},
			'purchaseletterrewardformdatadetail [name=group_id]': {
				select : function () {
					if(typeof me.getFormdata() != 'undefined'){
						_myAppGlobal.getController('Purchaseletterreward').changeGroup();
					}
				}
			},
			'purchaseletterrewardformdatadetail [name=reward_id]': {
				select : function () {
					if(typeof me.getFormdata() != 'undefined'){
						_myAppGlobal.getController('Purchaseletterreward').changeRewardid();
					}
				}
			},
			'purchaseletterrewardgriddetail toolbar button[action=add]': {
				click : function(){
					if(typeof me.getFormdata() != 'undefined'){
						_myAppGlobal.getController('Purchaseletterreward').addreward();
					}
				}
			},
			'purchaseletterrewardgriddetail toolbar button[action=edit]': {
				click : function(){
					if(typeof me.getFormdata() != 'undefined'){
						_myAppGlobal.getController('Purchaseletterreward').formdatadetailactionEdit();
					}
				}
			},
			'purchaseletterrewardgriddetail toolbar button[action=delete]': {
				click : function(){
					if(typeof me.getFormdata() != 'undefined'){
						_myAppGlobal.getController('Purchaseletterreward').formdatadetailactionDelete();
					}
				}
			},
			'purchaseletterrewardformdatadetail button[action=save]': {
				click : function(){
					if(typeof me.getFormdata() != 'undefined'){
						_myAppGlobal.getController('Purchaseletterreward').formdatadetailSave();
					}
				}
			},
			'purchaseletterrewardgriddetail': {
				selectionchange : function(){
					if(typeof me.getFormdata() != 'undefined'){
						_myAppGlobal.getController('Purchaseletterreward').formdatadetailSelection();
					}
				}
			},
			'purchaseletterrewardgriddetail gridcolumn': {
				click: function () {
					if(typeof me.getFormdata() != 'undefined'){
						_myAppGlobal.getController('Purchaseletterreward').setVariableeditrow(me.getRewarddetailgrid().getSelectedRow());
					}
				}
			},
			'purchaseletterrewardgriddetail gridcolumn': {
				click: function () {
					if(typeof me.getFormdata() != 'undefined'){
						_myAppGlobal.getController('Purchaseletterreward').setVariableeditrow(me.getRewarddetailgrid().getSelectedRow());
					}
				}
			},
			'purchaseletterformdataharganetto' : {
				afterrender : this.formDataHargaNettoAfterRender
			},
			'purchaseletterformdataharganetto button[action=save]' : {
				click : this.saveNetto
			},
		});

		var cc = ["billingrules_uangmuka", "billingrules_tandajadi", "billingrules_term_angsuran"];
		for (var x in cc) {
			this.control('purchaseletterformdata textfield[name=' + cc[x] + ']', {
				keyup : function () {
					me.setParamPL.processor.calculate();
					me.getSchedulegrid().getStore().loadData([], false);
				}
			});
		}

		var arF = [
			'unit_land_size', 
			'unit_kelebihan', 
			'price_tanahpermeter',
			'price_harga_tanah', 
			'price_kelebihantanah', 
			'price_harga_kelebihantanah',
			'price_bangunanpermeter', 
			'price_harga_bangunan',
			'price_harga_ppntanah', 
			'price_persen_ppntanah', 
			'price_harga_ppnbangunan', 
			'price_persen_ppnbangunan', 
			'price_harga_ppnbm',
			'price_persen_ppnbm', 
			'price_harga_pph22', 
			'price_persen_pph22', 
			'price_harga_bbnsertifikat', 
			'price_harga_bphtb', 
			'price_harga_bajb',
			'harga_administrasi', 
			'harga_admsubsidi', 
			'harga_pmutu', 
			'harga_paket_tambahan', 
			'persen_salesdisc',
			'biaya_asuransi', 
			'harga_pembulatan'
		];

		for (var i in arF) {
			this.control('purchaseletterformdata [name=' + arF[i] + ']', {
				keyup : function (el) {
					me.setParamPL.calculator.editedFields[el.name] = 1;
					me.setParamPL.calculator.priceSourceid         = me.getFormdata().down("[name=price_source]").getValue(); /// Add by Erwin.St 30/07/2021
					me.setParamPL.calculator.typeCalculaterounding = me.setParamPL.typeCalculaterounding; /// Add by Erwin.St 09/12/2021
					me.setParamPL.calculator.calculate(el);

					me.billingRulesOnSelect();

					if(me.getFormdata().up('window').state == 'create'){
						me.getSchedulegrid().getStore().loadData([], false);
					}
				},
			});
		}

		if (typeof moment !== 'function') {
			Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/moment.min.js', function () {
			}, function () {
			});
		}

		this.control(events.comboBox('purchaseletterformdata', me.tools.inputComboCode('salesman_' + me.cbf.employee.v, me.cbf.employee, 'salesman', 'purchaseletterformdata')));
	},
	purcApproveNowReschedule: function () {
		var me  = this;
		var rec = me.getRschlistgrid().getSelectedRecord();

		if (me.setParamPL.purchaseAddon && rec) {
			if (!rec.get("is_approve")) {
				var pd      = moment(me.setParamPL.purchaseAddon);
				var rd      = moment(rec.get("Addon"));
				var selisih = Math.abs(pd.diff(rd, "days"));

				if (selisih === 0) {
					me.dataApproveRsch();
				} 
				else {
					me.tools.alert.warning("Tidak bisa approve sekarang. Tanggal pembuatan purchaseletter tidak sama dengan tanggal pembuatan reschedule. Silahkan menunggu approval dari Manager Markting Anda.");
				}
			}
		}
	},
	purchaseFlashprint : function () {
		var me = this;
		var f  = me.getFormdata();
		var vs = f.getValues();
		
		f.setLoading("Sedang memproses email flash print...");

		me.tools.ajax({
			params  : { unit_id : vs["unit_unit_id"] },
			success : function (data, model) {
				f.setLoading(false);
				var hasil = data.others[0][0]['HASIL'];
				if (hasil == 1) {
					me.tools.alert.info("Email sudah terkirim untuk flash print.");
				} 
				else if (hasil === 2) { /// approved
					me.showPrintSPTWindow();
				} 
				else {
					me.tools.alert.warning(data.others[0][0]['MSG']);
				}
			}
		}).read('flashprint');
	},
	plProcessSplitTagihan: function () {
		var me          = this;
		var f           = me.getFormsplittagihan();
		var tagihanBaru = accounting.unformat(f.down("[name=tagihan]").getValue());
		var selectedRow = me.getRschmaingrid().getSelectedRecord();
		var bayar       = accounting.unformat(selectedRow.get("amount")) - accounting.unformat(selectedRow.get("remaining_balance"));

		//modion by imaam 2019-04-01
		bayar = accounting.unformat(accounting.formatMoney(bayar));
		var remainingBalance = accounting.unformat(selectedRow.get("remaining_balance"));

		if (tagihanBaru >= bayar) {
			me.splitScheduleRsch(tagihanBaru, me.getFormrschform(), me.getRschmaingrid(), me.getRschlistgrid());
			f.up("window").close();
		} 
		else {
			me.tools.alert.warning("Nilai tagihan baru harus lebih besar atau sama dengan Rp. " + accounting.formatMoney(bayar));
		}
	},
	addAdvancRschForm : function () {
		var me = this;
		me.instantWindow('FormDataAddSchedule', 400, 'Schedule Advance', "create", 'myAddSchAdvWindow');

		me.tools.ajax({
			params  : {},
			success : function (data, model) {
				me.tools.wesea(data.scheduletype, me.getFormdataadv().down("[name=help_tipe]")).comboBox();
			}
		}).read('scheduleadvanceinit');
	},
	plsaveFormAdvanceOnClick: function () {
		var me = this;
		var f  = me.getFormdataadv();
		var vs = f.getValues();
		var g  = me.getRschmaingrid();

		var schAdvance = new Erems.library.ScheduleAddAdvance();
		schAdvance.proses(this, f, g);

		g.getSelectionModel().select((g.getStore().getCount()) - 1);
		f.up("window").close();
	},
	formTemplatePrintPayScheme: function () {
		var me  = this;
		var f   = me.getFormprintoutpayscheme();
		var vs  = f.getValues();
		var tpl = vs.template;

		if (!tpl) {
			me.tools.alert.warning("Invalid template printout.");
			return;
		}

		f.up("window").close();
		var p = me.getFormdata();
		p.setLoading("Please wait...");
		
		me.tools.ajax({
			params : {
				purchaseletter_id : p.down("[name=purchaseletter_id]").getValue(),
				template          : tpl
			},
			success : function (data, model) {
				p.setLoading(false);
				var url = data['others'][0][0]['URL'];
				if (url) {
					Ext.Msg.show({
						title   : 'Info',
						msg     : '<a href="' + url + '" target="blank">Download file</a>',
						icon    : Ext.Msg.INFO,
						buttons : Ext.Msg.OK,
						fn      : function () {}
					});
				}
			}
		}).read('paymentscheme');
	},
	formTemplatePrint: function () {
		var me  = this;
	
		var f   = me.getFormprintout();
		var vs  = f.getValues();
		var tpl = vs.template;

		if (!tpl) {
			me.tools.alert.warning("Invalid template printout.");
			return;
		}

		f.up("window").close();
		var me = this;

		if(me.setParamPL.flagFromprintout == 'grid'){
			var p    = me.getGrid();
			var plid = p.getSelectedRecord().get('purchaseletter_id');
		}
		else{
			var p    = me.getFormdata();
			var plid = p.down("[name=purchaseletter_id]").getValue();
		}

		p.setLoading("Please wait...");

		if (me.setParamPL.flagprintoutspt) {
			var rec = me.getGrid().getSelectedRecord();
			var me = this;

			var winId = 'myReportWindow';
			me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
			var win = desktop.getWindow(winId);

			if (win) {
				var params = [];
				params["purchaseletter_id"] = plid;
				var reportFile = tpl;

				var html = me.generateFakeForm2(params, reportFile);

				win.down("#MyReportPanel").body.setHTML(html);
				$("#fakeReportFormID").submit();
			}
		} 
		else {
			me.tools.ajax({
				params : {
					purchaseletter_id : plid,
					template          : tpl,
					is_draft          : vs.flag_draft == "1" ? true : me.setParamPL.isDraft
				},
				success : function (data, model) {
					p.setLoading(false);
					var url = data['others'][0][0]['URL'];

					var plwa = '';
					if(me.setParamPL.getPurcheletterSendWaActive == 1){
						plwa = '<br><br><br><a href="https://api.whatsapp.com/send?phone='+ me.setParamPL.getPurcheletterSendWaPhone + '&text='+ me.setParamPL.getPurcheletterSendWaText +' '+window.location.href+url+ '" target="blank">Send To WA</a>';
					}

					if (url) {
						Ext.Msg.show({
							title   : 'Info',
							msg     : '<a href="' + url + '" target="blank">Download file</a>' + plwa,
							icon    : Ext.Msg.INFO,
							buttons : Ext.Msg.OK,
							fn      : function () {}
						});
					} 
					else {
						me.tools.alert.warning(data['others'][0][0]['MSG']);
					}
				}
			}).read('printout');
		}

		me.setParamPL.flagprintoutspt = false;
	},
	uplineOnSelect: function () {
		var me = this;
		var f  = me.getFormdata();
		f.down("[name=upline_employee_name]").setValue(me.tools.comboHelper(f.down("[name=upline_upline_id]")).getField('employee_id', 'employee_name'));
	},
	cacOnSelect: function () {
		var me = this;
		var f  = me.getFormdata();
		f.down("[name=cac_cac_code]").setValue(me.tools.comboHelper(f.down("[name=cac_cac_id]")).getField('cac_id', 'cac_code'));
	},
	dataApproveRsch: function () {
		var me = this;
		var g  = me.getRschlistgrid();

		if (g.getSelectionModel().hasSelection()) {
			var f    = me.getFormrschlist();
			var recs = g.getSelectionModel().getSelection();
			recs     = recs[0];

			Ext.Msg.show({
				title   : 'Approve?',
				msg     : 'Are you sure to approve this reschedule?',
				buttons : Ext.Msg.YESNOCANCEL,
				icon    : Ext.Msg.QUESTION,
				fn      : function (clicked) {
					if (clicked === "yes") {
						f.setLoading("Please wait.. replace old schedule with the new one");
						me.tools.ajax({
							params : {
								reschedule_id        : recs.get('reschedule_id'),
								is_used_verification : me.setParamPL.isUsedVerification
							},
							success: function (schdata, schmodel) {
								var hasil = schdata['others'][0][0]['STATUS'];
								if (hasil) {
									me.tools.alert.info("Success");
									if (me.rescheduleFrom != 'mainGrid'){
										me.getFormdata().down("[name=rencana_serahterima]").setValue(recs.get('rencanaserahterima_month'));
										me.getFormdata().down("[name=rencana_serahterima_date]").setValue(recs.get('rencanaserahterima_date'));
									}
									g.getStore().loadPage(1);
								} 
								else {
									me.tools.alert.warning("Error when processing your request");
								}
								f.setLoading(false);
							}
						}).read('approvereschedule');
					}
				}
			});
		}
	},
	dataDestroyRsch: function () {
		var me = this;
		var g  = me.getRschlistgrid();

		if (g.getSelectionModel().hasSelection()) {
			var f    = me.getFormrschlist();
			var recs = g.getSelectionModel().getSelection();
			var ids  = '';

			var deleted = true;
			for (var i in recs) {
				if(recs[i].get('is_approve')){
					deleted = false;
				}
				ids += recs[i].get('reschedule_id') + '~';
			}

			if (deleted) {
				f.setLoading("Please wait...");
				me.tools.ajax({
					params : {
						data                 : ids,
						is_used_verification : me.setParamPL.isUsedVerification
					},
					success : function (schdata, schmodel) {
						var hasil = schdata['others'][0][0]['DATA'];
						if (hasil) {
							me.tools.alert.info("Deleted");
							g.getStore().loadPage(1);
						} 
						else {
							me.tools.alert.warning("Something error when deleting your data");
						}
						f.setLoading(false);
					}
				}).read('deletereschedule');
			}
			else{
				Ext.Msg.alert("Alert", "Reschedule yang sudah di Approve tidak boleh di hapus.");
				return;
			}
		}
	},
	rschgridItemDblClick: function () {
		var me = this;
		var g = me.getRschlistgrid();
		var rec = g.getSelectedRecord();
		if (rec) {
			me.showRescheduleFormData('update');
		}
	},
	fdarReschForm: function () {
		var me = this;
		var f = me.getFormrschform();
		var g = me.getRschmaingrid();
		var s = f.up('window').state;
		
		if (me.rescheduleFrom == 'mainGrid'){
			hargaTotalJual = me.dataReschedule.get('harga_total_jual');
			purchaseletter_id = me.dataReschedule.get('purchaseletter_id');
		} else{
			hargaTotalJual = me.getFormdata().down("[name=harga_total_jual]").getValue();
			purchaseletter_id = me.getFormdata().down("[name=purchaseletter_id]").getValue();
		}

		g.doInit();
		f.down("[name=harga_total_jual]").setValue(accounting.unformat(hargaTotalJual));

		/// khusus untuk yang sudah terbayar tidak bisa edit row
		g.addListener('beforeedit', function (a, b) {
			if (me.tools.floatval(b.record.data.amount) > me.tools.floatval(b.record.data.remaining_balance)) {
				return false;
			}
		});

		if (apps.subholdingSub.trim() == "sh3b") {
			me.getFormrschform().down('[name=tanggal_validasi]').setVisible(true);
		}

		if (s === 'update') {
			var pg  = me.getRschlistgrid();
			var rec = pg.getSelectedRecord();
			var id  = rec.get('reschedule_id');

			f.loadRecord(rec);
			f.editedRow = pg.getSelectedRow();
			f.down("[name=reschedule_id]").setValue(id);

			if (rec.get("is_approve")) {
				f.down("[action=save]").hide();
			}

			g.getStore().load({
				params : {
					data_type     : 'reschedule',
					reschedule_id : id
				},
				callback: function (rec, op) {
					g.attachModel(op);
					g.getStore().getProxy().setExtraParam('reschedule_id', id);
					g.getStore().getProxy().setExtraParam('data_type', 'reschedule');

					/// add is_pay flag
					g.getStore().each(function (rec) {
						if (rec != null) {
							if (rec.data.amount > rec.data.remaining_balance) {
								rec.beginEdit();
								rec.set({ is_pay: 1 });
							}
						}
					});
				}
			});
		} 
		else {
			g.getStore().load({
				params : {
					data_type         : 'purchaseletter',
					purchaseletter_id : purchaseletter_id
				},
				callback : function (rec, op) {
					g.attachModel(op);
					g.getStore().getProxy().setExtraParam('purchaseletter_id', purchaseletter_id);
					g.getStore().getProxy().setExtraParam('data_type', 'purchaseletter');

					/// add is_pay flag
					g.getStore().each(function (rec) {
						if (rec != null) {
							if (accounting.unformat(rec.data.amount) > accounting.unformat(rec.data.remaining_balance)) {
								rec.beginEdit();
								rec.set({ is_pay: 1 });
							}
						}
					});
				}
			});
		}
	},
	fdarReschList: function () {
		var me   = this;
		var plId = 0;
		if (me.rescheduleFrom == 'mainGrid'){
			plId = me.dataReschedule.get('purchaseletter_id');
		} else{
			plId = me.getFormdata().down("[name=purchaseletter_id]").getValue();
		}
		
		var f    = me.getFormrschlist();
		var g    = me.getRschlistgrid();
		
		f.down("[name=purchaseletter_purchaseletter_id]").setValue(plId);
		g.doInit();
		f.setLoading("Please wait...");
		g.getStore().load({
			params   : { purchaseletter_id : plId },
			callback : function (rec, op) {
				g.attachModel(op);
				f.setLoading(false);
				g.getStore().getProxy().setExtraParam('purchaseletter_id', plId);
			}
		});
	},
	showRescheduleFormData: function (state) {
		var me = this;
		var s  = state ? state : 'create';
		me.instantWindow('RescheduleFormData', 700, 'Reschedule', s, 'myReschFdWindow');

		var f  = me.getFormrschform();
		var fm = me.getFormdata();

		if (me.rescheduleFrom == 'mainGrid'){
			rencana_serahterima_date = me.dataReschedule.get('rencana_serahterima_date');
			rencana_serahterima = me.tools.intval(me.dataReschedule.get('rencana_serahterima'));
		} else{
			rencana_serahterima_date = fm.down("[name=rencana_serahterima_date]").getValue();
			rencana_serahterima = me.tools.intval(fm.down("[name=rencana_serahterima]").getValue());
		}

		f.down("[name=rencanaserahterima_date]").setValue(rencana_serahterima_date);
		f.down("[name=rencanaserahterima_month]").setValue(rencana_serahterima);
	},
	showRescheduleList : function () {
		var me = this;
		var s  = 'create';
		var g  = me.getRschlistgrid();
		me.instantWindow('RescheduleListForm', 700, 'Reschedule List', s, 'myReschWindow');

		var date = new Date();
		var dd   = String(date.getDate()).padStart(2, '0');
		var mm   = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = date.getFullYear();

		var nowDate = dd + '-' + mm + '-' + yyyy;

		if (me.setParamPL.isRSCHApproveUser) {
			me.getRschlistgrid().down("[action=approve]").setVisible(true);
		} 
		else {
			if (me.setParamPL.approveNowRsch) {
				if(me.setParamPL.firstPurchasedate == nowDate){
					me.getRschlistgrid().down("[action=approvenow]").setVisible(true);
				}
			}
		}
	},
	/* added 13 Maret 2015*/
	addNewSchedule: function (f, g) {
		var me = this;
		var s  = g.getStore();

		var totalRecord = s.getCount();
		var lastRec     = s.getAt(totalRecord - 1);
		if (me.rescheduleFrom == 'mainGrid'){
			purchase_date = me.dataReschedule.get('purchase_date');
		} else{
			purchase_date = me.getFormdata().down("[name=purchase_date]").getValue();
		}

		///////// count date
		var myDate = new Erems.library.box.tools.Date({
			date: lastRec ? lastRec.get('duedate') : purchase_date
		});

		var newDate = myDate.addMonth(1);
		////////// end count date

		s.add({
			duedate                   : newDate,
			scheduletype_scheduletype : lastRec ? lastRec.get('scheduletype_scheduletype') : null,
			termin                    : lastRec ? (me.tools.intval(lastRec.get('termin')) + 1) : 1,
			remaining_balance         : 0,
			sourcemoney_sourcemoney   : lastRec ? lastRec.get('sourcemoney_sourcemoney') : null,
			amount                    : 0,
			kpr_acc_date              : lastRec ? lastRec.get('kpr_acc_date') : null,
		});

		//addon 2018-12-17
		// bisa add schedule di antara tagihan2 lama
		var sm = g.getSelectionModel();
		if (sm.hasSelection()) {
			var selc              = sm.getSelection();
			var lastSelectedIndex = s.findExact('schedule_id', selc[selc.length - 1].get("schedule_id"));

			var count = 0;
			var totalRecord = s.getCount();
			for (var i = totalRecord - 1; i > 0; i--) {

				if (i > lastSelectedIndex && i !== totalRecord - 1) {
					var recNext = s.getAt(i + 1);  // copy schedule ke row berikutnya
					var rec     = s.getAt(i);

					var tmyDate = new Erems.library.box.tools.Date({
						date : rec.get("duedate")
					});

					var tnewDate = tmyDate.addMonth(1);
					var termin   = rec.get('scheduletype_scheduletype') == selc[selc.length - 1].get("scheduletype_scheduletype") ? me.tools.intval(rec.get('termin')) + 1 : rec.get('termin');

					recNext.beginEdit();
					recNext.set({
						duedate                   : tnewDate,
						scheduletype_scheduletype : rec.get('scheduletype_scheduletype'),
						termin                    : termin,
						remaining_balance         : rec.get('remaining_balance'),
						sourcemoney_sourcemoney   : rec.get('sourcemoney_sourcemoney'),
						amount                    : rec.get('amount'),
						kpr_acc_date              : rec.get('kpr_acc_date'),
					});
					recNext.endEdit();
				}
			}
			/// row baru
			var rec = s.getAt(lastSelectedIndex + 1);

			rec.beginEdit();
			rec.set({
				remaining_balance : 0,
				amount            : 0
			});
			rec.endEdit();

			g.getSelectionModel().select(lastSelectedIndex + 1);
		} 
		else {
			g.getSelectionModel().select((s.getCount()) - 1);
		}

		me.balanceCalculate(f, g);
	},

	addNewPPNDTP: function (f, g) {
		var me = this;
		var s  = g.getStore();
		var startDt  = new Date("2023-11-01");
		var endDt  = new Date("2024-12-31");
        Ext.Msg.alert("Alert", "Tanggal Estimasi Serah Terima Wajib di isi untuk menentukan PPNDTP 50% atau 100%");
					
		var totalRecord = s.getCount();
		var lastRec     = s.getAt(totalRecord - 1);
		
		var f     = me.getFormrschform();
		var rencanaStDate = f.down("[name=rencanaserahterima_date]").getValue();
		
		var vRencanaStDate  = new Date(rencanaStDate);
		
		var vRencanaStDate50  = new Date("2024-06-30");
		var nppndtp = 1;
			
		if (vRencanaStDate > vRencanaStDate50){
		   nppndtp  = 2;
		}
	
		
		if (me.rescheduleFrom == 'mainGrid'){
			purchase_date = me.dataReschedule.get('purchase_date');
		} else{
			purchase_date = me.getFormdata().down("[name=purchase_date]").getValue();
		}

		var ppndtp = 0;
		for (var i = 0; i < totalRecord; i++) {
			var rec = s.getAt(i);
			var duedate = new Date(rec.get("duedate"));
			var amount = rec.get("amount");
			var remaining_balance = rec.get("remaining_balance");
			// if (duedate >= startDt && duedate <= endDt && amount == remaining_balance) {
			if (duedate >= startDt && duedate <= endDt) {
				formula = me.tools.floatval((amount / 1.11) * 0.11).toFixed(2);
				ppndtp += me.tools.floatval(formula);
			}
		}

		var myDate = new Erems.library.box.tools.Date({
			date: lastRec ? lastRec.get('duedate') : purchase_date
		});

		var newDate = myDate.addMonth(1);
		if (ppndtp > 0) {
			lastRec.beginEdit();
			lastRec.set({
				remaining_balance: lastRec.get('remaining_balance') - Math.ceil((ppndtp/nppndtp)),
				amount: lastRec.get('amount') - Math.ceil((ppndtp/nppndtp)),
			});
			lastRec.endEdit();

			s.add({
				duedate: newDate,
				scheduletype_scheduletype: 'PPNDTP',
				termin: 1,
				remaining_balance: 0,
				sourcemoney_sourcemoney: lastRec ? lastRec.get('sourcemoney_sourcemoney') : null,
				amount: Math.ceil((ppndtp/nppndtp)),
				kpr_acc_date: lastRec ? lastRec.get('kpr_acc_date') : null,
			});
		}

		me.balanceCalculate(f, g);
	},
	removeSchedule : function (f, g, mainGrid) {
		var me = this;
		var sm = g.getSelectionModel();
		if (sm.hasSelection()) {
			var selc = sm.getSelection();
			for (var i in selc) {
				var id = me.tools.intval(selc[i].get("schedule_id"));
				if (id > 0) {
					me.tools.gridHelper(mainGrid).maindetailUpdateDeletedRows(f, selc[i].get("schedule_id"));
				}
				g.getStore().remove(selc[i]);
				me.balanceCalculate(f, g);
			}
		}
	},
	splitSchedulePromptRsch: function () {
		var me = this;
		var selectedRow = me.getRschmaingrid().getSelectedRecord();
		if (!selectedRow) {
			return false;
		}
		me.instantWindow('FormSplitTagihan', 300, 'Split Tagihan', "mysuperstate", 'myPLSplitTagihanWindow');
		var f     = me.getFormsplittagihan();
		var bayar = selectedRow.get("amount") - selectedRow.get("remaining_balance");
		f.down("[name=tagihan]").setValue(accounting.formatMoney(bayar));
	},
	splitScheduleRsch: function (newAmount, f, g, mainGrid) {
		var me = this;
		var sm = g.getSelectionModel();

		if (sm.hasSelection()) {
			var selc = sm.getSelection();
			// hanya 1 record saja
			selc = selc[0];
			if (me.tools.floatval(selc.get("remaining_balance")) > 0.0 && (me.tools.floatval(selc.get("amount")) > me.tools.floatval(selc.get("remaining_balance")))) {
				var s           = g.getStore();
				var totalRecord = s.getCount();
				var lastRec     = selc;
				var tempAmount  = lastRec.get('amount');
				var tempRb      = lastRec.get('remaining_balance');
				var tempBayar   = tempAmount - tempRb;

				selc.beginEdit();
				selc.set({
					amount            : newAmount,
					remaining_balance : newAmount - tempBayar
				});
				selc.endEdit();

				s.insert(g.getStore().indexOf(selc) + 1, {
					duedate                   : lastRec.get('duedate'),
					scheduletype_scheduletype : lastRec.get('scheduletype_scheduletype'),
					termin                    : lastRec.get('termin'),
					remaining_balance         : tempAmount - newAmount,
					sourcemoney_sourcemoney   : lastRec.get('sourcemoney_sourcemoney'),
					amount                    : tempAmount - newAmount
				});

				g.getSelectionModel().select((s.getCount()) - 1);
				me.balanceCalculate(f, g);

			} 
			else {
				console.log("[RSCHER] Remaining balance harus lebih besar dari nol dan amount harus lebih besar dari remaining balance");
			}
		} 
		else {
			console.log("[RSCHER] Tidak ada selection");
		}
	},
	removeScheduleRsch : function (f, g, mainGrid) {
		var me = this;
		var sm = g.getSelectionModel();
		if (sm.hasSelection()) {
			var selc = sm.getSelection();
			for (var i in selc) {
				var id = me.tools.intval(selc[i].get("schedule_id"));
				if (me.tools.intval(selc[i].get("is_pay")) === 0) {
					if (id > 0 && f.editedRow > -1) {
						me.tools.gridHelper(mainGrid).maindetailUpdateDeletedRows(f, selc[i].get("schedule_id"));
					}
					g.getStore().remove(selc[i]);
					me.balanceCalculate(f, g);
				}
			}
		}
	},
	generateSchedule: function () {
		var me            = this;
		var f             = me.getFormdata();
		var g             = me.getSchedulegrid();
		var s             = g.getStore();
		var totalSch      = 0;
		var schedulePaid  = 0;
		var amountChecker = 0;
		var utjDate       = f.down("[name=utj_date]").getValue();
		var um1Date       = f.down("[name=um1_date]").getValue();

		s.each(function (rec, idx) {
			rec.beginEdit();
			if (idx == 0 && utjDate != "" && utjDate != 0 && utjDate != null) {
				rec.set({
					duedate : utjDate,
				});
			} 
			else if (idx > 0 && um1Date != "" && um1Date != 0 && um1Date != null) {
				if (idx > 1) {
					um1Date = Ext.Date.add(um1Date, Ext.Date.MONTH, 1);
				}
				rec.set({
					duedate : um1Date,
				});
			}

			if (me.setParamPL.scheduleStrict && me.setParamPL.isDraft) {
				for (var i = 0; i < me.setParamPL.scheduleOld.length; i++) {
					if (me.setParamPL.scheduleOld[i]['schedule']['amount'] !== me.setParamPL.scheduleOld[i]['schedule']['remaining_balance'] && rec.data.scheduletype_scheduletype === me.setParamPL.scheduleOld[i]['scheduletype']['scheduletype']) {
						switch (me.setParamPL.scheduleOld[i]['scheduletype']['scheduletype']) {
							case 'UM':
								amountChecker = toFloat(f.down("[name=billingrules_uangmuka]").getValue());
								break;
							case 'TJ':
								amountChecker = toFloat(f.down("[name=billingrules_tandajadi]").getValue());
								break;
							default:
								amountChecker = toFloat(f.down("[name=billingrules_angsuran]").getValue());
								break;
						}
						schedulePaid = Math.floor(me.setParamPL.scheduleOld[i]['schedule']['amount']) - Math.floor(me.setParamPL.scheduleOld[i]['schedule']['remaining_balance']);
						if (amountChecker >= schedulePaid) {
							rec.set({
								remaining_balance : Math.floor(rec.data.remaining_balance) - Math.floor(schedulePaid),
								schedule_id       : me.setParamPL.scheduleOld[i]['schedule']['schedule_id']
							});
						} else {
							me.tools.alert.warning('Amount ' + me.setParamPL.scheduleOld[i]['scheduletype']['scheduletype'] + ' terbayar yang lebih besar dari yang di diajukan');
							rec.endEdit();
							s.loadData([], false);
							break;
						}
					}
				}
			}

			if (amountChecker < schedulePaid) {
				me.tools.alert.warning('Ada amount terbayar yang lebih besar dari yang di diajukan');
				rec.endEdit();
				return;
			}
			rec.set({
				sourcemoney_sourcemoney : 'CUSTOMER'
			});
			rec.endEdit();
		});

		if (amountChecker < schedulePaid) {
			s.loadData([], false);
		}
	},
	panelAfterRender: function () {
		var me = this;
		ApliJs.gridSelect = {
			'browseUnit': {
				'loadData': function (page, limit, start) {
					me.apliJsFuncbrowse_unit_modal('purchaseletter_browse_unit_modal_ID').loadData(page, limit, start);
				}
			}
		};
	},
	rencanaSerahTerimaDateOnSelect: function () {
		var me = this;
	},
	balanceCalculate: function (f, g) {
		var me        = this;
		var s         = g.getStore();
		var totalJual = accounting.unformat(f.down("[name=harga_total_jual]").getValue());
		var totalSch  = 0;

		s.each(function (rec) {
			var x = me.tools.floatval(rec.get("amount")).toFixed(2);
			totalSch += me.tools.floatval(x);
		});

		var balance = (me.tools.floatval(totalJual).toFixed(2) - me.tools.floatval(totalSch).toFixed(2));
		f.down("[name=balance_value]").setValue(balance);
	},
	schedulGridOnEdit: function (editor, e, f, g) {
		var me = this;

		f = e.grid.up("form");
		g = e.grid;

		var currentRec = e.record;

		// for field amount
		if (e.field === 'amount') {
			if (me.tools.intval(currentRec.get('is_pay')) == 1) {
				return;
			}

			var totalJual = me.tools.money(f).removeKomaTitik(f.down("[name=harga_total_jual]").getValue());
			var s         = g.getStore();
			var totalSch  = 0;

			s.each(function (rec) {
				totalSch += me.tools.floatval(rec.get("amount"));
			});

			var balance = (totalJual - totalSch);

			if (f.down("[name=balance_value]")) {
				f.down("[name=balance_value]").setValue(balance);
			}

			currentRec.beginEdit();
			currentRec.set({ remaining_balance : e.value });
			currentRec.endEdit();

			/// added 4 Maret 2015
			/// update billing rules
			var currentScheduleType = currentRec.get("scheduletype_scheduletype");
			var totalAmountByST = 0;

			var totalAmountByTandaJadi = 0;
			s.each(function (rec) {
				if (rec.get("scheduletype_scheduletype") === currentScheduleType) {
					totalAmountByST += me.tools.floatval(rec.get("amount"));
				}
				if (rec.get("scheduletype_scheduletype") === "TJ") {
					totalAmountByTandaJadi += me.tools.floatval(rec.get("amount"));
				}
			});

			if (g.xtype === 'purchaseletterschedulegrid') {
				switch (currentScheduleType) {
					case 'UM':
						var temp = window[me.setParamPL.prolibsFile].getUangMukaSchGridToBilRules(totalAmountByST, totalAmountByTandaJadi);
						f.down("[name=billingrules_uangmuka]").setValue(accounting.formatMoney(temp));
						break;
					case 'TJ':
						f.down("[name=billingrules_tandajadi]").setValue(accounting.formatMoney(totalAmountByST));
						break;
					default:
						f.down("[name=billingrules_angsuran]").setValue(accounting.formatMoney(totalAmountByST));
						break;
				}
			}

			// add balance to last record in schedule
			var lastRec      = s.getAt(s.getCount() - 1);
			var lastRecValue = lastRec.get('amount');
			lastRecValue     = me.tools.floatval(lastRecValue) + me.tools.floatval(balance);
			if (lastRec) {
				lastRec.beginEdit();
				lastRec.set({
					amount            : lastRecValue,
					remaining_balance : lastRecValue
				});
				lastRec.endEdit();
			}

			me.balanceCalculate(f, g);
		} 
		else if (e.field === 'sourcemoney_sourcemoney') {
			var c = editor.editors.items[0].items.items[0];

			if (!c) {
				return;
			}

			var idx = c.getStore().findExact('sourcemoney', c.getValue());

			if (idx < 0) {
				return;
			}

			var rec = c.getStore().getAt(idx);
			if (rec) {
				currentRec.beginEdit();
				currentRec.set({ sourcemoney_sourcemoney_id : rec.get('sourcemoney_id') });
				currentRec.endEdit();
			}
		}

		/// add by Erwin.St 22/09/2021
		if (e.field == 'duedate' || e.field == 'scheduletype_scheduletype' || e.field == 'amount') {
			me.generateNotes();
		}
	},
	rencanaSerahTerimaOnKeyUp: function () {
		var me    = this;
		var f     = me.getFormdata();
		var bulan = me.tools.intval(f.down("[name=rencana_serahterima]").getValue());

		if (bulan <= 0) {
			f.down("[name=rencana_serahterima_date]").setValue(null);
			return;
		}

		var tanggal = f.down("[name=purchase_date]").getValue();

		if(me.setParamPL.purchaseletterRencanaSerahTerimaNew){
			var total_jual = parseFloat(accounting.unformat(f.down("[name=harga_total_jual]").getValue()));
			var t_inh = total_jual * (0.2);
					// console.log('total inh ', t_inh)

			var rStore = me.getSchedulegrid().getStore();
			var tlINH  = 0;

			var arr = new Array;
			for (var i = 0; i < rStore.getCount(); i++) {
				if(f.down('[name=pricetype_pricetype_id]').getValue() == 2){ // kpr
					if(rStore.getAt(i).get("scheduletype_scheduletype") == 'KPR'){
						tanggal = rStore.getAt(i).get('duedate');
					}
				}
				else if(f.down('[name=pricetype_pricetype_id]').getValue() == 3){ // inh
					var tlINH_S = tlINH;
					var amount = parseFloat(rStore.getAt(i).get('amount'));
					tlINH += amount;
					// tlINH = tlINH_S + amount;
						// console.log(i, indx, tlINH_S, tlINH, rStore.getAt(i).get('duedate'))
					if(t_inh >= tlINH_S && t_inh <= tlINH){
						tanggal = rStore.getAt(i).get('duedate');
					}
				}
				else{ // cash
					if(rStore.getAt(i).get("scheduletype_scheduletype") != 'PPNDTP'){
						tanggal = rStore.getAt(i).get('duedate');
					}
				}
			}

		}

		var date     = new Date(tanggal);
		var m        = me.tools.intval(date.getMonth());
		var y        = date.getFullYear();
		m            = (m + bulan) + 1;
		var newYear  = Math.floor(m / 12);
		var newMonth = m % 12;

		date.setFullYear(y + newYear);
		date.setMonth(newMonth - 1);

		if(me.setParamPL.rencanaST_enddate == 1){
			var tgl = new Date((y + newYear), (newMonth - 1) +1, 0).getDate();
			date.setDate(tgl);
		}

		f.down("[name=rencana_serahterima_date]").setValue(date);
	},
	rencanaSerahTerimaOnKeyUpRsch: function () {
		var me    = this;
		var f     = me.getFormrschform();
		var fm    = me.getFormdata();
		var bulan = me.tools.intval(f.down("[name=rencanaserahterima_month]").getValue());

		if (bulan <= 0) {
			f.down("[name=rencanaserahterima_date]").setValue(null);
			return;
		}
		
		if (me.rescheduleFrom == 'mainGrid'){
			purchase_date = me.dataReschedule.get('purchase_date');
		} else{
			purchase_date = fm.down("[name=purchase_date]").getValue();
		}

		var date     = purchase_date
		var m        = me.tools.intval(date.getMonth());
		var y        = date.getFullYear();
		m            = (m + bulan) + 1;
		var newYear  = Math.floor(m / 12);
		var newMonth = m % 12;

		date.setFullYear(y + newYear);
		date.setMonth(newMonth - 1);

		f.down("[name=rencanaserahterima_date]").setValue(date);
	},
	printPaymentScheme: function () {
		// var me = this;
		// var f  = me.getFormprintoutpayscheme();
		// var el = f.down("[name=template_name]");

		// me.instantWindow('FormPrintoutPayScheme', 500, 'Select Template', "mysuperstate", 'myPrintoutPaySchemeWindow');

		// for (var i in me.setParamPL.templatePrintPayScheme) {
		// 	el.add({
		// 		xtype      : 'radiofield',
		// 		boxLabel   : me.setParamPL.templatePrintPayScheme[i].text,
		// 		name       : 'template',
		// 		inputValue : me.setParamPL.templatePrintPayScheme[i].value,
		// 		checked    : i == 0 ? true : false
		// 	});
		// }

		var me = this;
		if (!me.xyReport) {
			me.xyReport = new Erems.library.XyReportJs(); //JS
			me.xyReport.init(me);
		}
		me.xyReport.processReport();
	},
	//// add by erwin.st 05112021
	printoutdocGrid : function(flagDraft=0){
		var me   = this;
		var grid = me.getGrid();
		var plid = grid.getSelectedRecord().get('purchaseletter_id');

		grid.setLoading("Request purchase letter information...");

		me.tools.ajax({
			params  : { purchaseletter_id: plid },
			success : function (data, model) {
				me.setParamPL.useLunasTandaJadi      = me.tools.intval(data['others'][0][0]['GLOBALPARAMSPARAMS'].PURCHASELETTER_PRINT_LUNASTANDAJADI);
				me.setParamPL.validChangeName        = data['others'][0][0]['DATACHANGENAME'];
				me.setParamPL.validChangeNameMsg     = data['others'][0][0]['DATACHANGENAME_ERR_MSG'];
				me.setParamPL.templatePrintSPTDraft  = data['others'][0][0]['TEMPLATEPRINTOUTSPTDRAFT'];
				me.setParamPL.templatePrint          = data['others'][0][0]['TEMPLATEPRINTOUT'];
				me.setParamPL.templatePrintmrt       = data['others'][0][0]['TEMPLATEPRINTOUTMRT'];
				me.setParamPL.templatePrintPayScheme = data['others'][0][0]['TEMPLATEPRINTOUTPAYSCHEME'];
				me.setParamPL.approveNowRsch         = data['others'][0][0]['APPROVENOW_RSCH'];
				me.setParamPL.isFlashPrint           = data['others'][0][0]['IS_FLASHPRINT'];
				me.setParamPL.globisAuthorizedUser   = data.others[0][0]['ISAUTHORIZEDUSER'];

				var resSch = Ext.Ajax.request({
					url     : 'erems/purchaseletter/read',
					method  : 'POST',
					timeout : 45000000,
					async   : false,
					params  : { purchaseletter_id : plid, mode_read   : 'schedule' }
				}).responseText;
				resSch = Ext.decode(resSch);


				if (me.setParamPL.useLunasTandaJadi === 1) {
					me.check_pelunasan_tj_um_return_value(resSch.data);
				}

				setTimeout(function(){ 
					grid.setLoading(false);
					me.printoutdoc(flagDraft); 
				}, 100);
			}
		}).read('detail');
	},
	printoutdoc : function (flagDraft=0) {
		var me = this;

		if(flagDraft == 0){
			if (me.setParamPL.isDraft) {
				if (me.checkPaymentDraft() == false) {
					me.showPrintSPTWindow();
					me.setParamPL.flagprintoutspt = false;
					return false;
				}
			}

			/// cek jika lunas tanda jadi
			if (me.setParamPL.isFlashPrint) {
				warningLunasTJ = "Tanda Jadi Belum Lunas ! [NB: Anda dapat menggunakan tombol Flash Print untuk ngeprint SPT/SPR]";
			} 
			else {
				warningLunasTJ = "Tanda Jadi Belum Lunas ! ";
			}

			if (me.setParamPL.useLunasTandaJadi) {
				if (!me.setParamPL.puleLunasTandaJadi) {
					me.tools.alert.warning(warningLunasTJ);
					me.setParamPL.flagprintoutspt = false;
					return false;
				}
			}

			if (!me.setParamPL.validChangeName) {
				//rizal 2 April 2019
				me.tools.alert.warning(me.setParamPL.validChangeNameMsg);
				me.setParamPL.flagprintoutspt = false;
				return false;
			}

			if (me.setParamPL.isPurchaseprintktsim) {
				if (me.tools.intval(me.setParamPL.totalDocumentKtpSim) <= 0) {
					me.tools.alert.warning("Dokumen KTP / SIM belum di upload.");
					me.setParamPL.flagprintoutspt = false;
					return false;
				}
			}

			//// Pengecekan data customer 
			//// Erwin 10/08/2020
			if (me.setParamPL.checkDataCustomer) {
				if (me.checkCustomer() == false) {
					me.setParamPL.flagprintoutspt = false;
					return false;
				}
			}
		}

		me.showPrintSPTWindow(flagDraft);
	},
	showPrintSPTWindow : function (flagDraft=0) {
		var me = this;
		me.instantWindow('FormPrintout', 500, 'Select Template', "mysuperstate", 'myPrintoutWindow');
		var f  = me.getFormprintout();
		var el = f.down("[name=template_name]");

		if(flagDraft == 0){
			var template = me.setParamPL.flagprintoutspt ? me.setParamPL.templatePrintmrt : me.setParamPL.templatePrint;
		}
		else{
			var template = me.setParamPL.templatePrintSPTDraft;
		}

		for (var i in template) {
			el.add({
				xtype      : 'radiofield',
				boxLabel   : template[i].text,
				name       : 'template',
				inputValue : template[i].value,
				checked    : i == 0 ? true : false
			});
		}

		el.add({
			xtype : 'hiddenfield',
			name  : 'flag_draft',
			value : flagDraft
		});
	},
	addCustomer : function () {
		var me = this;
		this.tools.iNeedYou(this).showWindow('Mastercustomer', { title : 'Add New Customer' });
		var tm = setTimeout(function() {
			_myAppGlobal.getController('Mastercustomer').fdar().init();
			_myAppGlobal.getController('Mastercustomer').fdar().create();
			clearTimeout(tm);
        }, 2000);
	},
	afterAddNewFromOutside : function (controllerId, info) {
		var me = this;
		var f  = me.getFormdata();

		/* get inserted id*/
		if (info) {
			if (info.others) { // check jika inserted id ada
				/// load customer information
				var insertedId = info.others;
				var f          = me.getFormdata();
				f.setLoading("Loading customer information...");

				me.tools.ajax({
					params  : { customer_id : insertedId },
					success : function (data, model) {
						var data = data[0];
						if (data) {
							for (var group in data) {
								for (var field in data[group]) {
									var el = f.down("[name=" + group + "_" + field + "]");
									if (el) {
										el.setValue(""); ///reset
										el.setValue(data[group][field]);
									}
								}
							}
							me.getFormdata().down("[name=city_city_name]").setValue(data.city.city_name);

							//added by anas 17062021
							//jadi kalo gk ada foto gk load image
							if (data.customer.photo != null) {
								me.mt.customerPhoto(me.getFormdata().down("#photo_image"), data.customer.photo, me.myConfig.IMG_FOLDER);
							}
						}
						f.setLoading(false);
					}
				}).read('selectedcustomer');
			}
		}

		var win = Ext.getCmp(_myAppGlobal.getController(controllerId).formxWinId);
		if (win) {
			win.close();
		}
	},
	schGridCellClick: function (el, record, rowIndex) {},
	schGridCellClick2: function (el, record, rowIndex) {
		var me         = this;
		var kpraccdate = record.data.kpr_acc_date;
		var datee      = new Date(moment(kpraccdate).add(14, 'days').format('YYYY-MM-DD'));

		if (me.setParamPL.userkpraccdate) {
			if (record.data.scheduletype_scheduletype == 'KPR') {
				if (kpraccdate) {
					me.getRschmaingrid().down("[dataIndex=duedate]").getEditor().setMaxValue(datee);
				} 
				else {
					me.getRschmaingrid().down("[dataIndex=duedate]").getEditor().setMaxValue(null);
				}
			} 
			else {
				me.getRschmaingrid().down("[dataIndex=duedate]").getEditor().setMaxValue(null);
			}
		}
	},
	authLogin : function () {
		var me = this;
		var f  = me.getFormauth();

		f.setLoading("Log in...");
		me.tools.ajax({
			params : {
				a : f.down("[name=username]").getValue(),
				b : f.down("[name=password]").getValue()
			},
			success : function (data, model) {
				var loginObj    = data['others'][0][0];
				var loginStatus = loginObj['LOGINSUCCESS'];
				me.afterDoAuth(loginStatus, f.up("window").state, loginObj['LOGINMSG']);
			}
		}).read('authlogin');
	},
	afterDoAuth : function (loginStatus, state, msg) {
		var me = this;
		var f  = me.getFormauth();
		switch (state) {
			case 'edit':
				if (!loginStatus) {
					f.setLoading(false);
					me.tools.alert.error(msg);
				} 
				else {
					f.up("window").close();
					me.getFormdata().down("button[action=authorize]").hide();
					me.getFormdata().down("#btnSave").setDisabled(false);

					/// add by erwin.st 09122021
					if (me.setParamPL.checkCanSPTDraft) { 
						me.getFormdata().down("#btnSaveDraft").setDisabled(false);
						me.getFormdata().down("#btnSaveDraft").setVisible(true);
					}

					f.setLoading(false);
				}
				break;
			case 'delete':
				if (!loginStatus) {
					f.setLoading(false);
					me.tools.alert.error(msg);
				} 
				else {
					f.setLoading(false);
					f.up("window").close();
					me.dataDestroyIntern();
				}
				break;
		}
	},
	comboBoxOnChange : function (el, val) {
		var me = this;
		me.tools.comboHelper(el).setCodeValue(me.cbf);
	},
	showAuthorizeForm : function (state) {
		var me = this;
		var s  = state ? state : 'edit';
		me.instantWindow('AuthorizeForm', 500, 'Authorize User Login', s, 'myAuthWindow');
	},
	mainDataSaveRsch : function () {
		var me = this;
		/// added 4 maret 2015
		// check nilai total editan di grid sama dengan total harga jual
		var f = me.getFormrschform();
		var g = me.getRschmaingrid();
		var s = g.getStore();

		var balanceValue = accounting.unformat(f.down("[name=balance_value]").getValue());

		if (balanceValue < 0 || balanceValue > 0) {
			me.tools.alert.warning("Sale price total must be equal to schedule amount total");
			return;
		}

		if (s.getCount() < 1) {
			me.tools.alert.warning("Please create schedule first");
			return;
		}
		
		if (me.rescheduleFrom == 'mainGrid'){
			purchaseletter_id = me.dataReschedule.get('purchaseletter_id');
			harga_total_jual  = me.dataReschedule.get('harga_total_jual');
		} 
		else{
			purchaseletter_id = me.getFormdata().down("[name=purchaseletter_id]").getValue();
			harga_total_jual  = me.getFormdata().down("[name=harga_total_jual]").getValue();
		}

		/// cek total schedule dengan total jual
		var totalSchedule = 0;
		for (var i = 0; i < s.getCount(); i++) {
			totalSchedule += accounting.unformat(s.getAt(i).get("amount"));
		}

		var tigaSekawan     = new Erems.library.TigaSekawan();
		var validasiTagihan = tigaSekawan.validasiDaftarTagihan(s);

		if (!validasiTagihan['hasil']) {
			me.tools.alert.warning(validasiTagihan['msg']);
			return;
		}


		balanceValue = totalSchedule - accounting.unformat(harga_total_jual);
		if (Math.abs(balanceValue) > 0) {
			me.tools.alert.warning("Sale price total must be equal to schedule amount total");
			f.down("[name=balance_value]").setValue(balanceValue);
			return;
		}
	
		var tglvalidasi = f.down("[name=tanggal_validasi]").getValue();

		var hsltglvalidasi = 0
		if (tglvalidasi > 0) {
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

		me.tools.insSave({
			form      : f,
			urlCreate : 'erems/purchaseletter/create',
			finalData : function (values) {
				values['is_used_verification']             = me.setParamPL.isUsedVerification;
				values['purchaseletter_purchaseletter_id'] = purchaseletter_id;

				values['detail'] = me.tools.gridHelper(g).getJsonWithEach(function (recEach) {
					recEach["amount"]            = Math.round(accounting.unformat(recEach["amount"]) * 100) / 100;
					recEach["remaining_balance"] = Math.round(accounting.unformat(recEach["remaining_balance"]) * 100) / 100;
					return recEach;
				});

				if (f.editedRow > -1) {
					values["deletedRows"] = me.getRschlistgrid().getStore().getAt(f.editedRow).get("deletedRows");
				}
				return values;
			},
			modeCreate : me.tools.intval(f.down("[name=reschedule_id]").getValue()) > 0 ? 'updatereschedule' : 'reschedule',
			success    : function () {
				me.getRschlistgrid().getStore().loadPage(1);
				f.up("window").close();
			}
		});
	},
	mainDataSave : function () {
		var me      = this;
		var f       = me.getFormdata();
		var vs      = f.getValues();
		var sg      = me.getSchedulegrid();
		var sgStore = sg.getStore();

		var balanceValue = me.tools.money(f).removeKomaTitik(f.down("[name=balance_value]").getValue());

		/*addon 20180629*/
		// request by SH1, cek jika club citra di pilih, maka member name harus di isi

		var citraClubId = me.tools.intval(vs['citraclub_citraclub_id']);
		if (citraClubId > 0 && vs['clubcitra_member'].length <= 0) {
			me.tools.alert.warning("Silahkan mengisi Member Name. ( Anda memilih salah satu Club Citra Group) ");
			return;
		}
		// end request by SH1, cek jika club citra di pilih, maka member name harus di isi
		if (balanceValue < 0 || balanceValue > 0) {
			me.tools.alert.warning("Total harga jual harus sama dengan total tagihan.");
			return;
		}

		if (sgStore.getCount() < 1) {
			me.tools.alert.warning("Silahkan generate tagihan terlebih dahulu.");
			return;
		}

		///// Added Erwin.St 18/09/2020
		var kelebihan_tanah       = me.tools.money(f).removeKomaTitik(vs['unit_kelebihan']);
		var kelebihan_harga_tanah = me.tools.money(f).removeKomaTitik(vs['price_kelebihantanah']);

		if (kelebihan_tanah > 0 && (vs['price_kelebihantanah'] == '' || kelebihan_harga_tanah == 0)) {
			me.tools.alert.warning("Silahkan mengisi harga kelebihan tanah, karena ada kelebihan tanah " + kelebihan_tanah + " m2.");
			return;
		}
		
		if(me.tools.intval(vs['salesgroup_salesgroup_id']) == 0){
			me.tools.alert.warning("Silahkan pilih sales group terlebih dahulu.");
			return;
		}

		var gridCustomer  = me.getMorecustomergrid().getStore();
		var porsiCustomer = parseFloat(accounting.unformat(f.down('[name=porsi_kepemilikan_customer]').getValue()));
		var jmlCustomer   = 0;
		
		if(gridCustomer.getCount() > 0){
			gridCustomer.each(function (rec) {
				if (rec != null) {
					if(rec.data.deleted == false){
						porsiCustomer = porsiCustomer + parseFloat(accounting.unformat(rec.data.customer_porsi_kepemilikan_customer));
						jmlCustomer   = jmlCustomer+1;
					}
				}
			});
		}

		if(jmlCustomer > 0 && f.down('[name=tanggal_surat_kepemilikan_bersama]').getValue() == null){
			me.tools.alert.warning("Tanggal surat kepemilikan bersama harus diisi.");
			return;
		}

		if(porsiCustomer != 100){
			me.tools.alert.warning("Total Porsi Kepemilikan Customer harus sama dengan 100%.");
			return;
		}

		var dtOld = '', warnSameduedate = '';
		sgStore.each(function (rec) {
			if (rec != null) {
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

		//////////////////////////////
		Ext.Msg.confirm('Information', 'This action will "ACTUALLY" save the data.<br />Continue ?', function (btn) {
			if (btn == 'yes') {
				me.insSave({
					form      : me.getFormdata(),
					grid      : me.getGrid(),
					store     : me.localStore.detail,
					finalData : function (data) {
						me.getMorecustomergrid().getStore().clearFilter();

						data["detail"]              = me.tools.gridHelper(me.getSchedulegrid()).getJson();
						data["jenisbiaya"]          = me.tools.gridHelper(me.getJenisbiayagrid()).getJson();
						data["morecustomer"]        = me.tools.gridHelper(me.getMorecustomergrid()).getJson();
						data["detailreward"]        = me.tools.gridHelper(me.getRewarddetailgrid()).getJson();
						data["pricetype_id"]        = data["pricetype_pricetype_id"];
						data["pricetype_pricetype"] = me.getFormdata().down("[name=pricetype_pricetype_id]").getRawValue();
						data["downline_id"]         = $("#plFormID select[name='downline_id']").val();
						data["keterangan_bayar"]    = $("#plFormID textarea[name='keterangan_bayar']").val();
						data["keterangan_1"]        = $("#plFormID textarea[name='keterangan_1']").val();
						data["keterangan_2"]        = $("#plFormID textarea[name='keterangan_2']").val();
						data["keterangan_3"]        = $("#plFormID textarea[name='keterangan_3']").val();
						data["house_advisor"]       = $("#plFormID input[name='house_advisor']").val();
						data["manager"]             = $("#plFormID input[name='manager']").val();
						data["hs_keuangan"]         = $("#plFormID input[name='hs_keuangan']").val();

						var npwp = me.getFormdata().down("[name=kuasa_npwp]").getValue();
						npwp = npwp.replaceAll(".", "");
						npwp = npwp.replaceAll("-", "");
						data["kuasa_npwp"] = npwp;

						if (me.getFormdata().editedRow > -1) {
							data["deletedRows"] = me.getGrid().getStore().getAt(me.getFormdata().editedRow).get("deletedRows");
						}

						data["addonparams"] = {
							isEditTanahpermeter          : me.setParamPL.calculator.isEditTanahpermeter,
							isEditTotaltanah             : me.setParamPL.calculator.isEditTotaltanah,
							isEditKelebihantanahpermeter : me.setParamPL.calculator.isEditKelebihantanahpermeter,
							isEditTotalkelebihantanah    : me.setParamPL.calculator.isEditTotalkelebihantanah,
							isEditBangunanpermeter       : me.setParamPL.calculator.isEditBangunanpermeter,
							isEditTotalbangunan          : me.setParamPL.calculator.isEditTotalbangunan,
							isEditPersenPPNTanah         : me.setParamPL.calculator.isEditPersenPPNTanah,
							isEditAmountPPNTanah         : me.setParamPL.calculator.isEditAmountPPNTanah,
							isEditPersenPPNBangunan      : me.setParamPL.calculator.isEditPersenPPNBangunan,
							isEditAmountPPNBangunan      : me.setParamPL.calculator.isEditAmountPPNBangunan,
							isEditPersenPPNBM            : me.setParamPL.calculator.isEditPersenPPNBM,
							isEditAmountPPNBM            : me.setParamPL.calculator.isEditAmountPPNBM,
							isEditPersenPPH22            : me.setParamPL.calculator.isEditPersenPPH22,
							isEditAmountPPH22            : me.setParamPL.calculator.isEditAmountPPH22,
							isEditAmountBBNSertifikat    : me.setParamPL.calculator.isEditAmountBBNSertifikat,
							isEditAmountBPHTB            : me.setParamPL.calculator.isEditAmountBPHTB,
							isEditAmountBAJB             : me.setParamPL.calculator.isEditAmountBAJB,
						}

						me.tools.money(me.getFormdata()).clearFields(data);
				
						data["price_harga_dischargabangunan"] = accounting.unformat(data["price_harga_dischargabangunan"]);
						data["price_harga_dischargatanah"]    = accounting.unformat(data["price_harga_dischargatanah"]);
						data["price_harga_dischargadasar"]    = accounting.unformat(data["price_harga_dischargadasar"]);

						return data;
					},
					sync     : true,
					callback : {
						create : function (store, form, grid) {}
					}
				});
			}
		});
	},

	mainDataSaveDraft : function () {
		var me = this;
		/// added 4 maret 2015
		// check nilai total editan di grid sama dengan total harga jual
		var f  = me.getFormdata();
		var vs = f.getValues();
		var balanceValue = me.tools.money(f).removeKomaTitik(f.down("[name=balance_value]").getValue());


		/*addon 20180629*/
		// request by SH1, cek jika club citra di pilih, maka member name harus di isi
		var citraClubId = me.tools.intval(vs['citraclub_citraclub_id']);
		if (citraClubId > 0 && vs['clubcitra_member'].length <= 0) {
			me.tools.alert.warning("Silahkan mengisi Member Name. ( Anda memilih salah satu Club Citra Group) ");
			return;
		}
		// end request by SH1, cek jika club citra di pilih, maka member name harus di isi

		if (balanceValue < 0 || balanceValue > 0) {
			me.tools.alert.warning("Total harga jual harus sama dengan total tagihan.");
			return;
		}

		if (me.getSchedulegrid().getStore().getCount() < 1) {
			me.tools.alert.warning("Silahkan generate tagihan terlebih dahulu.");
			return;
		}

		///// Added Erwin.St 18/09/2020
		var kelebihan_tanah = me.tools.money(f).removeKomaTitik(vs['unit_kelebihan']);
		var kelebihan_harga_tanah = me.tools.money(f).removeKomaTitik(vs['price_kelebihantanah']);

		if (kelebihan_tanah > 0 && (vs['price_kelebihantanah'] == '' || kelebihan_harga_tanah == 0)) {
			me.tools.alert.warning("Silahkan mengisi Harga Kelebihan Tanah, karena ada kelebihan tanah " + kelebihan_tanah + " m2.");
			return;
		}
		////////////////////////////////

		if(me.tools.intval(vs['salesgroup_salesgroup_id']) == 0){
			me.tools.alert.warning("Silahkan pilih sales group terlebih dahulu.");
			return;
		}

		var gridCustomer  = me.getMorecustomergrid().getStore();
		var porsiCustomer = parseFloat(accounting.unformat(f.down('[name=porsi_kepemilikan_customer]').getValue()));
		var jmlCustomer   = 0;
		
		if(gridCustomer.getCount() > 0){
			gridCustomer.each(function (rec) {
				if (rec != null) {
					if(rec.data.deleted == false){
						porsiCustomer = porsiCustomer + parseFloat(accounting.unformat(rec.data.customer_porsi_kepemilikan_customer));
						jmlCustomer   = jmlCustomer+1;
					}
				}
			});
		}

		if(jmlCustomer > 0 && f.down('[name=tanggal_surat_kepemilikan_bersama]').getValue() == ''){
			me.tools.alert.warning("Tanggal surat kepemilikan bersama harus diisi.");
			return;
		}

		if(porsiCustomer != 100){
			me.tools.alert.warning("Total Porsi Kepemilikan Customer harus sama dengan 100%.");
			return;
		}
		
		Ext.Msg.confirm('Information', 'This action will save as "DRAFT" data.<br />Continue ?', function (btn) {
			if (btn == 'yes') {
				me.insSave({
					// urlCreate: 'erems/purchaseletter/createDraft',
					form      : me.getFormdata(),
					grid      : me.getGrid(),
					store     : me.localStore.detail,
					finalData : function (data) {
						me.getMorecustomergrid().getStore().clearFilter();
				
						data["detail"]              = me.tools.gridHelper(me.getSchedulegrid()).getJson();
						data["jenisbiaya"]          = me.tools.gridHelper(me.getJenisbiayagrid()).getJson();
						data["morecustomer"]        = me.tools.gridHelper(me.getMorecustomergrid()).getJson();
						data["detailreward"]        = me.tools.gridHelper(me.getRewarddetailgrid()).getJson();
						data["pricetype_id"]        = data["pricetype_pricetype_id"];
						data["pricetype_pricetype"] = me.getFormdata().down("[name=pricetype_pricetype_id]").getRawValue();
						data["downline_id"]         = $("#plFormID select[name='downline_id']").val();
						data["keterangan_bayar"]    = $("#plFormID textarea[name='keterangan_bayar']").val();
						data["keterangan_1"]        = $("#plFormID textarea[name='keterangan_1']").val();
						data["keterangan_2"]        = $("#plFormID textarea[name='keterangan_2']").val();
						data["keterangan_3"]        = $("#plFormID textarea[name='keterangan_3']").val();
						data["house_advisor"]       = $("#plFormID input[name='house_advisor']").val();
						data["manager"]             = $("#plFormID input[name='manager']").val();
						data["hs_keuangan"]         = $("#plFormID input[name='hs_keuangan']").val();

						var npwp = me.getFormdata().down("[name=kuasa_npwp]").getValue();
						npwp = npwp.replaceAll(".", "");
						npwp = npwp.replaceAll("-", "");
						data["kuasa_npwp"] = npwp;

						if (me.getFormdata().editedRow > -1) {
							data["deletedRows"] = me.getGrid().getStore().getAt(me.getFormdata().editedRow).get("deletedRows");
						}
						
						data["addonparams"] = {
							isEditTanahpermeter          : me.setParamPL.calculator.isEditTanahpermeter,
							isEditTotaltanah             : me.setParamPL.calculator.isEditTotaltanah,
							isEditKelebihantanahpermeter : me.setParamPL.calculator.isEditKelebihantanahpermeter,
							isEditTotalkelebihantanah    : me.setParamPL.calculator.isEditTotalkelebihantanah,
							isEditBangunanpermeter       : me.setParamPL.calculator.isEditBangunanpermeter,
							isEditTotalbangunan          : me.setParamPL.calculator.isEditTotalbangunan,
							isEditPersenPPNTanah         : me.setParamPL.calculator.isEditPersenPPNTanah,
							isEditAmountPPNTanah         : me.setParamPL.calculator.isEditAmountPPNTanah,
							isEditPersenPPNBangunan      : me.setParamPL.calculator.isEditPersenPPNBangunan,
							isEditAmountPPNBangunan      : me.setParamPL.calculator.isEditAmountPPNBangunan,
							isEditPersenPPNBM            : me.setParamPL.calculator.isEditPersenPPNBM,
							isEditAmountPPNBM            : me.setParamPL.calculator.isEditAmountPPNBM,
							isEditPersenPPH22            : me.setParamPL.calculator.isEditPersenPPH22,
							isEditAmountPPH22            : me.setParamPL.calculator.isEditAmountPPH22,
							isEditAmountBBNSertifikat    : me.setParamPL.calculator.isEditAmountBBNSertifikat,
							isEditAmountBPHTB            : me.setParamPL.calculator.isEditAmountBPHTB,
							isEditAmountBAJB             : me.setParamPL.calculator.isEditAmountBAJB,
						}

						me.tools.money(me.getFormdata()).clearFields(data);

						data["price_harga_dischargabangunan"] = accounting.unformat(data["price_harga_dischargabangunan"]);
						data["price_harga_dischargatanah"]    = accounting.unformat(data["price_harga_dischargatanah"]);
						data["price_harga_dischargadasar"]    = accounting.unformat(data["price_harga_dischargadasar"]);
						data["is_draft"]                      = 1;

						return data;
					},
					sync     : true,
					callback : {
						create : function (store, form, grid) {
						}
					}
				});
			}
		});
	},
	billingRulesOnSelect: function () {
		var me  = this;
		var f   = me.getFormdata();
		var e   = f.down("[name=billingrules_billingrules_id]");
		var rec = e.getStore().findRecord("billingrules_id", e.getValue());

		if (!me.setParamPL.prolibs) {
			console.log("[BILLINGRULESONSELECT] PROBLIBS NULL");
			return;
		}

		if (rec) {
			me.setParamPL.processor.billingrules_id   = rec.get("billingrules_id");
			me.setParamPL.processor.is_balloon        = rec.get("is_balloon");
			me.setParamPL.processor.is_jeda           = rec.get("is_jeda");
			me.setParamPL.processor.periode_jeda      = rec.get("periode_jeda");
			me.setParamPL.processor.type_periode_jeda = rec.get("type_periode_jeda");
	  
			var readonlyBillingrules = rec.get("is_balloon") == 1 ? true : false;
			me.setterReadonly(f, ['billingrules_term_tandajadi', 'billingrules_term_uangmuka', 'billingrules_term_angsuran'], readonlyBillingrules);

			/// check for percent
			var pum = me.tools.floatval(rec.get("persen_uangmuka"));
			var ptj = me.tools.floatval(rec.get("persen_tandajadi"));
			var htj = f.down("[name=harga_total_jual]").getValuem();
			var um  = pum > 0 ? ((pum / 100) * htj) : me.tools.floatval(rec.get("uangmuka"));
			var tj  = ptj > 0 ? ((ptj / 100) * htj) : me.tools.floatval(rec.get("tandajadi"));

			me.setParamPL.prolibs.setDataBillingRules({
				um : um,
				tj : tj
			});

			// versi CEDAR
			var um = me.setParamPL.prolibs.getUangMukaBillingRules();
			um     = Math.floor(um);
			var a  = htj - um;
			var ttj = me.tools.intval(rec.get('term_tandajadi'));
			ttj     = ttj > 240 ? 240 : ttj;
			var tum = me.tools.intval(rec.get('term_uangmuka'));
			tum     = tum > 240 ? 240 : tum;
			var ta  = me.tools.intval(rec.get('term_angsuran'));
			ta      = ta > 240 ? 240 : ta;
			ta      = me.tools.intval(f.down("[name=pricetype_pricetype_id]").getValue()) == 2 ? 1 : ta;

			if (ttj == 0 && tj > 0){
				ttj = 1;
			}

			if (tum == 0 && um > 0){
				tum = 1;
			}

			f.down("[name=billingrules_term_tandajadi]").setValue(ttj);
			f.down("[name=billingrules_tandajadi]").setValuem(tj);
			f.down("[name=billingrules_term_uangmuka]").setValue(tum);
			f.down("[name=billingrules_uangmuka]").setValuem(um);
			f.down("[name=billingrules_term_angsuran]").setValue(ta);
			f.down("[name=billingrules_angsuran]").setValuem(a);
		}
		//billingrules_tandajadi
	},
	priceTypeOnSelect : function () {
		var me  = this;
		var f   = me.getFormdata();
		var pEl = f.down("[name=pricetype_pricetype_id]");
		var p   = pEl.getValue();

		var field_pricesource               = f.down("[name=price_source]");
		var price_source                    = field_pricesource.getValue();
		var field_pricelist                 = f.down("[name=pricelist_id]");
		var pricelist_id                    = field_pricelist.getValue();
		var field_pricelistdetail_koefisien = f.down("[name=pricelistdetail_koefisien_id]");
		var pricelistdetail_koefisien_id    = field_pricelistdetail_koefisien.getValue();

		var storeBill = f.down("[name=billingrules_billingrules_id]").getStore();
		var pricetype = f.down("[name=pricetype_pricetype_id]").getValue();

		storeBill.clearFilter();
		storeBill.filter('pricetype_id', pricetype, true, false);

		// reset field
		me.tools.resetPanel('priceInformationBoxId', me.getFormdata());
		me.tools.resetPanel('billingInformationBoxId', me.getFormdata());
		me.getSchedulegrid().getStore().loadData([], false);

		//// Set ulang nilai price source dan price type 
		field_pricesource.setValue(price_source);
		field_pricelist.setValue(pricelist_id);
		field_pricelistdetail_koefisien.setValue(pricelistdetail_koefisien_id);
		pEl.setValue(p);
    
		var s = me.localStore.price;
		var r = s.findRecord("pricetype_id", p);

		for (var i in r.data) {
			var e = f.down("[name=price_" + i + "]");
			if (e) {
				var valueNum = r.data[i];
				var valueNum = valueNum != '' ? valueNum : 0;
				e.setValue(accounting.formatMoney(valueNum, { precision : e.getDecPrecision() }));
			}
		}

		//// Jika Price Source = pricelist dan dipilih pricelist != ""
		if(price_source == 2 && pricelist_id != ''){
			var arrFieldreset = ['price_tanahpermeter', 'price_harga_tanah', 'price_kelebihantanah', 'price_harga_kelebihantanah', 'price_bangunanpermeter', 'price_harga_bangunan', 'price_harga_jualdasar', 'price_harga_bbnsertifikat', 'price_harga_bphtb', 'price_harga_bajb', 'biaya_asuransi'];
			for (var x in arrFieldreset) {
				f.down('[name=' + arrFieldreset[x] + ']').setValue(accounting.formatMoney(0, { precision : f.down('[name=' + arrFieldreset[x] + ']').getDecPrecision() }));
			}
		}

		/// added 1/3/2015
		// p = 2 --> KPR
		me.setterReadonly(f, ['bank_bank_id'], p === 2 ? false : true);

		me.setParamPL.currentPriceType = p;

		/// added 2/3/2015
		if (me.setParamPL.globalParams) {
			var descText = '';
			switch (p) {
				case 1:
					descText = me.setParamPL.globalParams.PURCHASELETTER_CASH_DESC;
					break;
				case 2:
					descText = me.setParamPL.globalParams.PURCHASELETTER_KPR_DESC;
					break;
				case 3:
					descText = me.setParamPL.globalParams.PURCHASELETTER_INHOUSE_DESC;
					break;
			}
			f.down("[name=notes]").setValue(descText);
		}

		// me.setterReadonly(f, ['billingrules_term_angsuran'], p === 2 ? false : true);
		f.down("[name=billingrules_term_angsuran]").setValue(p == 2 ? 1 : 0);
		f.down("[name=billingrules_angsuran]").setValue(accounting.formatMoney(f.down("[name=billingrules_angsuran]").getValue()));
		f.down("[name=kpp]").setVisible(p == 2 ? true : false);
		f.down("[name=kpp]").setValue(1);
		f.down("[name=promo]").setValue("");

		me.setParamPL.calculator.editedFields = [];

		//// Add by Erwin.St 16/07/2021
		if(price_source == 2){
			me.setterReadonly(f, ['billingrules_term_angsuran'], true);
			f.down("[name=billingrules_term_angsuran]").setValue(0);
			f.down("[name=billingrules_angsuran]").setValue(0);
			f.down("[name=kpp]").setVisible(false);

			me.loadPricelistkoefisien();
		}
		else{
			me.calculatorPrice('harga_administrasi');
		}
	},
	unitSelect : function () {
		var me       = this,
			formData = me.getFormdata(),
			unitId   = me.getUnitgrid().getSelectedRecord().get("unit_id");

		formData.down('[name=price_source]').setValue(1);
		formData.down('[name=pricelist_id]').setValue('');
		formData.down('[name=pricelist_id]').setVisible(false);
		formData.down('[name=pricelistdetail_koefisien_id]').setValue('');
		formData.down('[name=pricelistdetail_koefisien_id]').setVisible(false);
		formData.down('[name=pricetype_pricetype_id]').setValue('');
		formData.down("[name=kpp]").setVisible(false);

		me.setParamPL.paramPricelist = {};
		me.setParamPL.calculator.editedFields = [];

		//START: CHECK UNIT
		//by: David 18/8/17
		//check unit available not in booking state
		me.tools.interAjax({
			params  : { unitId : unitId },
			success : function (data) {
				if (data.length !== undefined) {
					if (me.browseHandler) {
						me.browseHandler.selectItem(function () {
							/*START*/
							me.localStore.price = me.instantStore({
								id          : me.controllerName + 'UnitPriceStore',
								extraParams : { mode_read: 'price' },
								idProperty  : 'price_id'
							});

							me.localStore.price.load({
								params   : { unit_id : unitId },
								callback : function (rec, op) {
									me.attachModel(op, me.localStore.price, true);
									formData.down("[name=pricetype_pricetype_id]").setDisabled(false);

									// reset price information
									me.tools.resetPanel('priceInformationBoxId', formData);
									me.tools.resetPanel('billingInformationBoxId', formData);
									me.getSchedulegrid().getStore().loadData([], false);
									//billingInformationBoxId
								}
							});

							// added 2 Maret 2015
							if (me.setParamPL.globalParams) {
								var gp = me.setParamPL.globalParams;
								formData.down("[name=price_harga_bajb]").setValue(me.tools.floatval(gp['PURCHASELETTER_BIAYA_AKTAJUALBELI']));
								formData.down("[name=price_harga_bbnsertifikat]").setValue(me.tools.floatval(gp['PURCHASELETTER_BIAYA_BALIKNAMA']));
								formData.down("[name=price_harga_bphtb]").setValue(me.tools.floatval(gp['PURCHASELETTER_BIAYA_PEROLEHANHAK']));
							}

							// added 2 February 2017
							me.setParamPL.verifikasiDiskonInfo = null;
							if (me.setParamPL.globalParams) {
								var gp = me.setParamPL.globalParams;

								me.tools.ajax({
									params  : { unit_id : unitId },
									success : function (avdata, avmodel) {
										if (avdata.others[0][0]['DISCOUNT_VERIFIED']) {
											me.setParamPL.verifikasiDiskonInfo = avdata.others[0][0]['DATA'];
										}

										me.discountInput().enable({
											globalParams : gp,
											isReadOnly   : !avdata.others[0][0]['DISCOUNT_VERIFIED']
										});
									}
								}).read('cekapprovalverification');
							}
						});
					}
				} 
				else {
					var dt                     = data['others'][0][0];
					var customer_name          = dt['customer_name'];
					var reservation_date       = dt['reservation_date'];
					var reservation_date_until = dt['reservation_date_until'];

					var msg = "Sudah di-<i>Boooking</i> !";
					msg     = msg + "<br>Nama Customer : " + customer_name;
					msg     = msg + "<br>Tanggal <i>Boooking</i> : " + reservation_date;
					msg     = msg + "<br>Sampai dengan : " + reservation_date_until;

					me.tools.alert.warning(msg);
					formData.setLoading(false);
					return false;
				}
			}
		}).read('reservation', 'checkAvailableUnit'); //controller name, action
		//END: CHECK UNIT
	},
	unitSelectviaApli : function (unitId) {
		var me       = this,
			formData = me.getFormdata();

		formData.down('[name=price_source]').setValue(1);
		formData.down('[name=pricelist_id]').setValue('');
		formData.down('[name=pricelist_id]').setVisible(false);
		formData.down('[name=pricelistdetail_koefisien_id]').setValue('');
		formData.down('[name=pricelistdetail_koefisien_id]').setVisible(false);
		formData.down('[name=pricetype_pricetype_id]').setValue('');
		formData.down("[name=kpp]").setVisible(false);

		me.setParamPL.paramPricelist = {};
		me.setParamPL.calculator.editedFields = [];

		//START: CHECK UNIT
		//by: David 18/8/17
		//check unit available not in booking state
		formData.setLoading("Please wait...");

		me.tools.interAjax({
			params  : { unitId : unitId },
			success : function (data) {
				if (data.length !== undefined) {

					/*START*/
					me.localStore.price = me.instantStore({
						id          : me.controllerName + 'UnitPriceStore',
						extraParams : { mode_read : 'price' },
						idProperty  : 'price_id'
					});

					me.localStore.price.load({
						params   : { unit_id : unitId },
						callback : function (rec, op) {
							me.attachModel(op, me.localStore.price, true);
							formData.down("[name=pricetype_pricetype_id]").setDisabled(false);

							// reset price information
							me.tools.resetPanel('priceInformationBoxId', formData);
							me.tools.resetPanel('billingInformationBoxId', formData);
							me.getSchedulegrid().getStore().loadData([], false);
							//billingInformationBoxId
						}
					});

					if (me.setParamPL.globalParams) {
						var gp = me.setParamPL.globalParams;
						formData.down("[name=price_harga_bajb]").setValue(me.tools.floatval(gp['PURCHASELETTER_BIAYA_AKTAJUALBELI']));
						formData.down("[name=price_harga_bbnsertifikat]").setValue(me.tools.floatval(gp['PURCHASELETTER_BIAYA_BALIKNAMA']));
						formData.down("[name=price_harga_bphtb]").setValue(me.tools.floatval(gp['PURCHASELETTER_BIAYA_PEROLEHANHAK']));
					}

					// added 2 February 2017
					me.setParamPL.verifikasiDiskonInfo = null;
					if (me.setParamPL.globalParams) {
						var gp = me.setParamPL.globalParams;

						me.tools.ajax({
							params  : { unit_id : unitId },
							success : function (avdata, avmodel) {
								if (avdata.others[0][0]['DISCOUNT_VERIFIED']) {
									me.setParamPL.verifikasiDiskonInfo = avdata.others[0][0]['DATA'];
								}

								me.discountInput().enable({
									globalParams : gp,
									isReadOnly   : !avdata.others[0][0]['DISCOUNT_VERIFIED']
								});
							}
						}).read('cekapprovalverification');
					}

					$.ajax({
						method : "POST",
						url    : "erems/purchaseletter/read/",
						data   : { mode_read : "unitdetail", unit_id : unitId }
					}).done(function (msg) {
						var unitInfo = msg.data.others[0][0]["DETAIL"][1][0];

						formData.down("[name=unit_unit_id]").setValue(unitInfo.unit_id);
						formData.down("[name=unitstatus_status]").setValue(unitInfo.unitstatus_status);
						formData.down("[name=unit_progress]").setValue(unitInfo.progress);
						formData.down("[name=cluster_code]").setValue(unitInfo.cluster_code);
						formData.down("[name=cluster_cluster]").setValue(unitInfo.cluster_cluster);
						formData.down("[name=block_code]").setValue(unitInfo.block_code);
						formData.down("[name=block_block]").setValue(unitInfo.block_block);
						formData.down("[name=productcategory_productcategory]").setValue(unitInfo.productcategory_productcategory);
						formData.down("[name=type_name]").setValue(unitInfo.type_name);
						formData.down("[name=unit_land_size]").setValue(unitInfo.land_size);
						formData.down("[name=unit_long]").setValue(unitInfo.long);
						formData.down("[name=unit_building_size]").setValue(unitInfo.building_size);
						formData.down("[name=unit_width]").setValue(unitInfo.width);
						formData.down("[name=unit_kelebihan]").setValue(unitInfo.kelebihan);
						formData.down("[name=unit_floor]").setValue(unitInfo.floor);
						formData.down("[name=unit_unit_number]").setValue(unitInfo.unit_number);
						formData.down("[name=unit_virtualaccount_bca]").setValue(unitInfo.vaobca);
						
						/*Add by RH 20220811*/
						formData.down("[name=unit_floor_size]").setValue(unitInfo.floor_size);
						if (unitInfo.purpose === 'APARTEMEN' || unitInfo.purpose === 'APARTMENT' || unitInfo.purpose.includes('OFFICE') || unitInfo.purpose.includes('SOHO')) {
							formData.down("[name=unit_building_size]").setFieldLabel('SGA Size');
							formData.down("[name=unit_floor_size]").setFieldLabel('Netto Size');
							formData.down("[name=unit_land_size]").setReadOnly(true);
							formData.down("[name=unit_land_size]").setValue(0);
						} else {
							formData.down("[name=unit_building_size]").setFieldLabel('Building Size');
							formData.down("[name=unit_floor_size]").setFieldLabel('Floor Size');
							formData.down("[name=unit_land_size]").setReadOnly(false);
						}

						//added by anas 18102021
						formData.down("[name=unit_electricity]").setValue(unitInfo.electricity);

						formData.setLoading(false);

						formData.down("[name=promo]").setValue("");
						formData.down("[name=notes]").setValue("");
						formData.down("[name=rewardsales_code]").setValue("");
						formData.down("[name=rewardcustomer_code]").setValue("");
						formData.down("[name=rewardtambahan_code]").setValue("");

						formData.down("[name=price_source]").setValue(1);

						me.setParamPL.pricelist = null;
						if(msg.data.others[0][0]["pricelist"].total > 0){
							me.setParamPL.pricelist = msg.data.others[0][0]["pricelist"].data;
						}

						me.setParamPL.pricelist_koefisien = null;
						if(msg.data.others[0][0]["pricelist_koefisien"].total > 0){
							me.setParamPL.pricelist_koefisien = msg.data.others[0][0]["pricelist_koefisien"].data;
						}

						me.generateJenisbiaya();
					});
				} 
				else {
					var dt                     = data['others'][0][0];
					var customer_name          = dt['customer_name'];
					var reservation_date       = dt['reservation_date'];
					var reservation_date_until = dt['reservation_date_until'];

					var msg = "Sudah di-<i>Boooking</i> !";
					msg     = msg + "<br>Nama Customer : " + customer_name;
					msg     = msg + "<br>Tanggal <i>Boooking</i> : " + reservation_date;
					msg     = msg + "<br>Sampai dengan : " + reservation_date_until;

					me.tools.alert.warning(msg);
					formData.setLoading(false);

					return false;
				}
			}
		}).read('reservation', 'checkAvailableUnit'); //controller name, action
		//END: CHECK UNIT
	},
	customerSelect : function (el) {
		var me    = this;
		var plRec = me.getCustomergrid().getSelectedRecord();
		var row   = me.getCustomergrid().getSelectionModel().getSelection();
		var win   = desktop.getWindow('browseDataWindow');

		if (row.length > 0) {
			var warn = [];
			if(me.empty(plRec.data.city_city_id) || plRec.data.city_city_id == 0) { warn.push('general city'); }
			if(me.empty(plRec.data.general_province_id) || plRec.data.general_province_id == 0) { warn.push('general province'); }
			if(me.empty(plRec.data.identitas_city_id) || plRec.data.identitas_city_id == 0) { warn.push('identitas city'); }
			if(me.empty(plRec.data.identitas_province_id) || plRec.data.identitas_province_id == 0) { warn.push('identitas province'); }

			if(warn.length){
				Ext.Msg.alert("Alert", "Field Customer [" + warn.join(', ') + "] belum diisi.");
			}
			else{
				if (el.text == 'select') {
					for (var x in plRec.data) {
						var field = me.getFormdatamorecustomer().down("[name=" + 'customer' + "_" + x + "]");
						if (field) {
							field.setValue(plRec.data[x]);
						}
					}

					me.getFormdatamorecustomer().down("[name=city_city_name]").setValue(plRec.data.city_city_id);
					me.getFormdatamorecustomer().down("#btnSave").setDisabled(false);

					win.destroy();
				}
				else{
					if (me.browseHandler) {
						me.browseHandler.selectItem(function (rec) {
							me.attachCustomerInfo(rec);
						});
					}
				}	
			}
		}
		else{
			Ext.Msg.alert("Alert", "Custumer belum dipilih.");
		}

		// if (el.text == 'select') {
		// 	if (row.length > 0) {
		// 		for (var x in plRec.data) {
		// 			var field = me.getFormdatamorecustomer().down("[name=" + 'customer' + "_" + x + "]");
		// 			if (field) {
		// 				field.setValue(plRec.data[x]);
		// 			}
		// 		}

		// 		me.getFormdatamorecustomer().down("[name=city_city_name]").setValue(plRec.data.city_city_id);
		// 		me.getFormdatamorecustomer().down("#btnSave").setDisabled(false);

		// 		win.destroy();
		// 	} 
		// 	else {
		// 		Ext.Msg.alert("Alert", "Record not found");
		// 	}
		// } 
		// else {
		// 	if (me.browseHandler) {
		// 		me.browseHandler.selectItem(function (rec) {
		// 			me.attachCustomerInfo(rec);
		// 		});
		// 	}
		// }
	},
	attachCustomerInfo : function (rec) {
		var me = this;
		me.getFormdata().down("[name=city_city_name]").setValue(rec.get("city_city_name"));

		//added by anas 17062021
		//set photo jadi kosong
		me.getFormdata().down("#photo_image").el.setStyle({ background: 'none' });

		//jadi kalo gk ada foto gk load image
		if (rec.get("photo").length > 0) {
			me.mt.customerPhoto(me.getFormdata().down("#photo_image"), rec.get("photo"), me.myConfig.IMG_FOLDER);
		}
	},
	browseCustomer : function (el) {
		var me     = this;
		var browse = new Erems.library.Browse();

		browse.init({
			controller       : me,
			view             : 'CustomerGrid',
			el               : el,
			localStore       : "customer",
			mode_read        : "selectedcustomer",
			loadRecordPrefix : "customer",
			browseId         : 'unitpl'
		});
		browse.showWindow();

		if (el.itemId == 'fd_more_customer') {
			me.getCustomergrid().down('button').setText('select');
		}
	},
	discountInput : function () {
		var me = this;
		var f  = me.getFormdata();
		var x  = {
			getFields : function () {
				var fields = ["price_persen_dischargadasar", "price_harga_dischargadasar", "price_persen_dischargatanah", "price_harga_dischargatanah", "price_persen_dischargabangunan", "price_harga_dischargabangunan"];
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
	isSh1Featured : function (params) {
		if (params.data['others'][0][0]['IS_SH1'] === 1) {
			// params.form.down("[name=promo]").setVisible(true);
		}
	},
	isRewardFeatured : function (params) {
		var me = this, visibleDetail = false, visibleCustomer = false, visibleSales = false, visibleTambahan = false;

		if (Boolean(params.data['others'][0][0]['SHOW_REWARD'])) {
			if(params.data['others'][0][0]['SHOW_REWARD'] === 1){ //// show Detail
				var detailReward = me.getRewarddetailgrid(); 
				var storeReward  = detailReward.getStore();
				
				storeReward.loadData([], false);

				visibleDetail = true;

				if(me.getFormdata().up('window').state != 'create'){
					detailReward.down('[action=add]').setVisible(false);
					detailReward.down('[action=edit]').setVisible(false);
					detailReward.down('[action=delete]').setVisible(false);

					////load data reward
					detailReward.body.mask('Loading Detail Reward, please wait ...');
					storeReward.load({
						params : {
							purchaseletter_id : me.getGrid().getSelectedRecord().get("purchaseletter_id"),
							mode_read         : 'detail_grid'
						},
						callback : function (pencairanrec) {
							detailReward.body.unmask();
						}
					});
				}
			}
			else{ //// show Single
				visibleCustomer = true;
				visibleSales    = true;
				visibleTambahan = true;

				params.form.down("[name=rewardtambahan_code]").setValue("");
				params.form.down("[name=rewardsales_code]").setValue("");
				params.form.down("[name=rewardcustomer_code]").setValue("");

				me.tools.wesea(params.data.rewardtambahan, params.form.down("[name=rewardtambahan_reward_id]")).comboBox();
				me.tools.wesea(params.data.rewardcustomer, params.form.down("[name=rewardcustomer_reward_id]")).comboBox();
				me.tools.wesea(params.data.rewardsales, params.form.down("[name=rewardsales_reward_id]")).comboBox();
			}
		}

		params.form.down("#detailrewardPanelID").setVisible(visibleDetail);
		params.form.down("#rewardcustomerPanelID").setVisible(visibleCustomer);
		params.form.down("#rewardsalesPanelID").setVisible(visibleSales);
		params.form.down("#rewardtambahanPanelID").setVisible(visibleTambahan);
	},
	fdar : function () {
		var me               = this;
		var f                = me.getFormdata();
		var sg               = me.getSchedulegrid();
		var isAuthorizedUser = false;

		me.mt  = new Erems.library.ModuleTools();
		f.down("#is_ppndtp").setVisible(me.setParamPL.visible_insentif_pajak);
		f.down("#is_extend_schedule").setVisible(me.setParamPL.visible_extend_schedule);

		var x = {
			init : function (state) {
				me.setParamPL.firstPurchasedate = '';
				me.setParamPL.isDraft           = false;
				me.setParamPL.scheduleStrict    = false;
				if (me.setParamPL.groupuser == 'NUP GROUP') {
					f.down("#btnSave").setVisible(false);
					f.down("#btnPrintout").setVisible(true);
					f.down("#btnPrintPaySch").setVisible(false);
					f.down("#btnAci").setVisible(false);
				}

				me.setActiveForm(me.getFormdata());

				me.setParamPL.calculatorDiscount.form   = f;
				me.setParamPL.calculatorDiscount.fields = {
					amount_harga_tanah           : 'price_harga_tanah',
					amount_harga_kelebihan_tanah : 'price_harga_kelebihantanah',
					amount_harga_bangunan        : 'price_harga_bangunan',
					amount_harga_jual_dasar      : 'price_harga_jualdasar',
					persen_disc_harga_dasar      : 'price_persen_dischargadasar',
					amount_disc_harga_dasar      : 'price_harga_dischargadasar',
					persen_disc_harga_tanah      : 'price_persen_dischargatanah',
					amount_disc_harga_tanah      : 'price_harga_dischargatanah',
					persen_disc_harga_bangunan   : 'price_persen_dischargabangunan',
					amount_disc_harga_bangunan   : 'price_harga_dischargabangunan',
					persen_ppn_tanah             : 'price_persen_ppntanah',
					amount_ppn_tanah             : 'price_harga_ppntanah',
					persen_ppn_bangunan          : 'price_persen_ppnbangunan',
					amount_ppn_bangunan          : 'price_harga_ppnbangunan',
					persen_ppnbm                 : 'price_persen_ppnbm',
					amount_ppnbm                 : 'price_harga_ppnbm',
					persen_pph22                 : 'price_persen_pph22',
					amount_pph22                 : 'price_harga_pph22'
				};

				var myStrFunc = 'me.setParamPL.processor = new Erems.library.' + me.setParamPL.purchaseletterJs + '()';
				eval(myStrFunc);

				me.setParamPL.processor.prolibsFile = me.setParamPL.prolibsFile;
				me.setParamPL.processor.setForm(me.getFormdata());
				me.setParamPL.processor.setC(me);
				me.setParamPL.processor.setScheduleGrid(me.getSchedulegrid());

				// TAMBAH FIELD DI SINI
				me.setParamPL.processor.fields.total                = 'harga_total_jual';
				me.setParamPL.processor.fields.jual                 = 'price_harga_jual';
				me.setParamPL.processor.fields.salesDiscountPercent = 'persen_salesdisc';
				me.setParamPL.processor.fields.salesDiscountAmount  = 'harga_salesdisc';
				me.setParamPL.processor.fields.biayaAdmin           = "harga_administrasi";
				me.setParamPL.processor.fields.biayaPaketTambahan   = "harga_paket_tambahan";
				me.setParamPL.processor.fields.biayaAdminSubsidi    = "harga_admsubsidi";
				me.setParamPL.processor.fields.biayaAsuransi        = "biaya_asuransi";
				me.setParamPL.processor.fields.hargaPembulatan      = "harga_pembulatan";
				me.setParamPL.processor.is_balloon                  = 0;
				me.setParamPL.processor.is_ppndtp                   = 0; //addby imaam on 20210327
				me.setParamPL.processor.typeCalculaterounding       = me.setParamPL.typeCalculaterounding;


				/* added 2 Oct 2014*/
				var cf = new Erems.library.CalculatorFields();
				cf.fields = {
					width                       : 'unit_width',
					long                        : 'unit_long',
					land_size                   : 'unit_land_size',
					building_size               : 'unit_building_size', /// Add by Erwin.St 30/07/2021
					kelebihan                   : 'unit_kelebihan',
					_harga_tanah_a              : 'price_tanahpermeter',
					_harga_tanah_b              : 'price_harga_tanah',
					_harga_kelebihan_a          : 'price_kelebihantanah',
					_harga_kelebihan_b          : 'price_harga_kelebihantanah',
					_harga_bangunan_a           : 'price_bangunanpermeter', /// Add by Erwin.St 30/07/2021
					_harga_bangunan             : 'price_harga_bangunan',
					_harga_jual_dasar           : 'price_harga_jualdasar',
					_disc_harga_dasar           : 'price_persen_dischargadasar',
					_tot_disc_harga_dasar       : 'price_harga_dischargadasar',
					_disc_harga_tanah           : 'price_persen_dischargatanah',
					_tot_disc_harga_tanah       : 'price_harga_dischargatanah',
					_disc_harga_bangunan        : 'price_persen_dischargabangunan',
					_tot_disc_harga_bangunan    : 'price_harga_dischargabangunan',
					_harga_netto                : 'price_harga_neto',
					_ppn_tanah                  : 'price_persen_ppntanah',
					_tot_ppn_tanah              : 'price_harga_ppntanah',
					_ppn_bangunan               : 'price_persen_ppnbangunan',
					_ppn_ppnbm                  : 'price_persen_ppnbm',
					_ppn_pph22                  : 'price_persen_pph22',
					_tot_ppn_bangunan           : 'price_harga_ppnbangunan',
					_tot_ppn_ppnbm              : 'price_harga_ppnbm',
					_tot_ppn_pph22              : 'price_harga_pph22',
					_harga_balik_nama           : 'price_harga_bbnsertifikat',
					_harga_bphtb                : 'price_harga_bphtb',
					_harga_bajtb                : 'price_harga_bajb',
					_biaya_administrasi         : 'harga_administrasi',
					_biaya_administrasi_subsidi : 'harga_admsubsidi',
					_biaya_p_mutu               : 'harga_pmutu',
					_biaya_paket_tambahan       : 'harga_paket_tambahan',
					_disc_sales                 : 'persen_salesdisc',
					_tot_disc_sales             : 'harga_salesdisc',
					_total                      : 'price_harga_jual',
					_total_jual                 : 'harga_total_jual',
					_biaya_asuransi             : 'biaya_asuransi'
				};

				// added by Rico 20042021
				me.getFormdata().el.dom.addEventListener('keyup', function (e) {
					var el_name = e.srcElement.name;

					if (el_name == 'house_advisor' || el_name == 'manager' || el_name == 'hs_keuangan') {
						var val   = e.srcElement.value;
						var RegEx = /[^A-Za-z0-9\s.,\d]/i;
						var valid = !(RegEx.test(val));
						if (!valid) {
							e.srcElement.value = val.slice(0, -1);
						}
					}
				});

				me.getFormdata().el.dom.addEventListener('change', function (e) {
					var el_name = e.srcElement.name;

					if (el_name == 'house_advisor' || el_name == 'manager' || el_name == 'hs_keuangan') {
						var val   = e.srcElement.value;
						var RegEx = /[^A-Za-z0-9\s.,\d]/i;
						var valid = !(RegEx.test(val));

						if (!valid) {
							e.srcElement.value = '';
							Ext.Msg.show({
								title   : 'Info',
								msg     : "Tidak boleh ada spesial karakter!",
								icon    : Ext.Msg.INFO,
								buttons : Ext.Msg.OK
							});
						}
					}
				});

				var myStrFunc = 'me.setParamPL.calculator = new Erems.library.' + me.setParamPL.calculatorJs + '({ fields: cf.fields, form: me.getFormdata() });';
				eval(myStrFunc);

				me.setParamPL.calculator.prolibsFile = me.setParamPL.prolibsFile;

				// set schedule Process
				me.setParamPL.calculator.setSP(me.setParamPL.processor);

				me.setParamPL.calculator.tools = me.tools;

				sg.doInit();
				f.setLoading(true, true);

				me.localStore.detail = me.instantStore({
					id          : me.controllerName + 'PLDetailStore',
					extraParams : { mode_read: 'maindetail' },
					idProperty  : 'purchaseletter_id'
				});

				me.tools.money(f).addCurrencyEvent();

				me.localStore.schType = me.instantStore({
					id          : me.controllerName + 'SchTypeStore',
					extraParams : { mode_read: 'schtype' },
					idProperty  : 'scheduletype_id'
				});

				var morecustomerStore = me.getMorecustomergrid().getStore();
				morecustomerStore.removeAll();

				if (apps.subholdingSub.trim() == "sh3b") {
					f.down("[name=utj_date]").setVisible(true);
					f.down("[name=um1_date]").setVisible(true);
				}

				if(me.setParamPL.activePricesource == 1){
					f.down("[name=price_source]").setVisible(true);
				}

				f.down("#kuasa_name_ID").setVisible(me.setParamPL.showKuasaCustomerPurchaseletter);
				f.down("#kuasa_nik_ID").setVisible(me.setParamPL.showKuasaCustomerPurchaseletter);
				f.down("#kuasa_npwp_ID").setVisible(me.setParamPL.showKuasaCustomerPurchaseletter);
				f.down("#kuasa_alamat_ID").setVisible(me.setParamPL.showKuasaCustomerPurchaseletter);
			},
			create: function (state) {
				f.down("[name=is_ppn]").setValue(me.setParamPL.ppn_value);
				
				f.down("[action=printsch]").setDisabled(true);
				f.down("[action=printout]").setDisabled(true);
				f.down("[action=setaci]").setDisabled(true);

				//rizal 2 April 2019
				if (apps.subholdingId == 1) {
					f.down("#is_auto_sms").setVisible(true);
					f.down("#is_not_allowed_sp").setVisible(true);
					// f.down("#is_nonppn").setVisible(true);
				}
				//

				//rizal 22 April 2019
				if (apps.subholdingId == 2) {
					console.log("Replace label");
					f.down("#labelbbn").setText("Biaya Balik Nama (TITIPAN)");
					f.down("#labelbphtb").setText("Biaya perolehan hak (TITIPAN)");
					f.down("#labelajb").setText("Biaya Akta Jual Beli (TITIPAN)");
				}

				//rizal 16 April 2019
				if (apps.subholdingId == 2) {
					// f.down("#promo").setVisible(true);
				}

				me.getMorecustomergrid().down("[action=add]").setDisabled(false);
				me.getMorecustomergrid().down("[action=edit]").setDisabled(false);
				me.getMorecustomergrid().down("[action=delete]").setDisabled(false);

				me.setParamPL.purchaseAddon = null;

				me.localStore.detail.load({
					params   : { purchaseletter_id : 0 },
					callback : function (rec, op) {
						me.attachModel(op, me.localStore.detail, false);
					}
				});

				f.down("[action=save]").setDisabled(false);

				me.tools.ajax({
					params  : { },
					success : function (data, model) {
						//// master im
						me.setParamPL.master_im                = data['others'][0][0]['MASTER_IM'].success ? data['others'][0][0]['MASTER_IM'].data : [];
						me.setParamPL.master_im_detail         = data['others'][0][0]['MASTER_IM_DETAIL'].success ? data['others'][0][0]['MASTER_IM_DETAIL'].data : [];
						me.setParamPL.jenisBiayaPurchaseletter = typeof(data['others'][0][0]['JENIS_BIAYA_PURCHASELETTER'][0]) != 'undefined' ? data['others'][0][0]['JENIS_BIAYA_PURCHASELETTER'][0] : [];


						//// SG ////
						me.setParamPL.master_salesgroup = data.salesgroup;
						me.generateFormsalesgroup();
						////////////

						if (me.setParamPL.checkCanSPTDraft == true) {
							f.down("[action=saveDraft]").setDisabled(false);
							f.down("#btnSaveDraft").setVisible(true);
							search = me.getFormsearch();
							search.down('#btnCheckDraft').setVisible(true);
							// f.down("[name=is_more_customer]").setVisible(false);
							if (me.setParamPL.groupuser == 'NUP GROUP') {
								f.down("#btnSaveDraft").setPosition(6, 6, 1);
								f.down("#btnCancel").setPosition(112, 6, 1);
								f.down("#btnPrintout").setVisible(false);
							}
						}

						me.registerOTHERParams(data);

						me.setParamPL.calculator.isGenerateValue   = me.getOTHERParams("USE_RUMUSBIAYAPROLIBSPURCHASELETTER");
						me.setParamPL.processor.detailBalloon      = data['others'][1];
						me.setParamPL.processor.schedulePembulatan = data['others'][0][0]['SCHEDULE_PEMBULATAN'];
						me.fillFormComponents(data, f);

						var gp = data['others'][0][0]['GLOBALPARAMSPARAMS'];
						if (gp) {
							me.setParamPL.globalParams = gp;
						}
						f.down("[name=pt_name]").setValue(data['others'][0][0]['PT_NAME']);

						/// get source money default text
						for (var i in data.sourcemoney.data) {
							if (me.tools.intval(data.sourcemoney.data[i].sourcemoney_id) == me.tools.intval(data['others'][0][0]['SOURCEMONEY_DEFAULT'])) {
								me.setParamPL.sourceMoneyDefault.id   = data.sourcemoney.data[i].sourcemoney_id;
								me.setParamPL.sourceMoneyDefault.name = data.sourcemoney.data[i].sourcemoney;
							}
						}

						me.setParamPL.processor.sourceMoney = me.setParamPL.sourceMoneyDefault;

						me.tools.ajax({
							params  : { purchaseletter_id: 0 },
							success : function (schdata, schmodel) {
								me.tools.wesea({
									data  : schdata,
									model : schmodel
								}, sg).grid();
								f.setLoading(false);
							}
						}).read('schedule');

						me.setParamPL.sourceMoneyList = data.sourcemoney;

						me.setterReadonly(f, ['purchaseletter_no', 'firstpurchase_date'], true);

						me.discountInput().enable({
							globalParams : gp,
							isReadOnly   : true
						});

						//addon 20171023
						//SURABAYA ADDON
						var downlineList = "<option value='0'> - </option>";
						var downlines = data["others"][0][0]["DOWNLINE"][1];
						for (var i in downlines) {
							downlineList += "<option value='" + downlines[i]["downline_id"] + "'>" + downlines[i]["name"] + "</option>";
						}

						var viewParams = {
							downline_id      : 0,
							keterangan_bayar : '',
							keterangan_1     : '',
							keterangan_2     : '',
							keterangan_3     : '',
							house_advisor    : '',
							manager          : '',
							hs_keuangan      : '',
							action           : 'create',
							downline_list    : downlineList
						};
						ApliJs.loadHtmlB(me, me.getFormdata().down("#PLCONotherInformationID"), 'sby_form_add', viewParams);

						var viewParams2 = { test : 0 };
						ApliJs.loadHtmlB(me, me.getFormdata().down("#PLCONstatusInformationID"), 'sby_form_add_status', viewParams2);

						me.isSh1Featured({ data: data, form: f });
						me.isRewardFeatured({ data: data, form: f });

						////// ad by erwin.st //////
						me.checkFormReadonly(f);

						////// combobox master im
						_myAppGlobal.getController('Purchaseletterreward').generateComboboxIM(me.setParamPL.master_im, f.down('[name=purchase_date]').getValue());

						me.setterReadonly(f, ['promo'], me.setParamPL.disablePromoPurchaseletter);
					}
				}).read('detail');
			},
			update : function () {
				//hadi 02092019
				f.down("button[action=saveDraft]").hide();

				//rizal 22 April 2019
				if (apps.subholdingId == 2) {
					// console.log("Replace label");
					f.down("#labelbbn").setText("Biaya Balik Nama (TITIPAN)");
					f.down("#labelbphtb").setText("Biaya perolehan hak (TITIPAN)");
					f.down("#labelajb").setText("Biaya Akta Jual Beli (TITIPAN)");
				}

				//rizal 2 April 2019
				if (apps.subholdingId == 1) {
					f.down("#is_auto_sms").setVisible(true);
					f.down("#is_not_allowed_sp").setVisible(true);
					// f.down("#is_nonppn").setVisible(true);
				}

				//rizal 16 April 2019
				if (apps.subholdingId == 2) {
					// f.down("#promo").setVisible(true);
					sg.down("[action=reschedule]").setVisible(false);
				}else{
				    sg.down("[action=reschedule]").setVisible(true);
				}

			
				f.down("[action=setaci]").setDisabled(false);
				var plId                 = me.getGrid().getSelectedRecord().get("purchaseletter_id");
				f.editedRow              = me.getGrid().getSelectedRow();
				var paymentAmount        = 0;
				var remainingBalanceTJ   = 0;
				var billingrulesuangmuka = 0;

				me.localStore.schType.load({
					callback : function (rec, op) {
						me.attachModel(op, me.localStore.schType, false);
					}
				});

				//IS_PURCHASEPRINTKTPSIM   
				// more customer
				var morecustomerStore = me.getMorecustomergrid().getStore();
				morecustomerStore.removeAll();
				morecustomerStore.load({
					params   : { purchaseletter_id: plId, mode_read: 'morecustomerlist' },
					callback : function (rec) {
						if (rec.length > 0) {
							f.down('[name= is_more_customer]').setValue(1);
						}
					}
				});

				f.down("[name=pricetype_pricetype_id]").setDisabled(false);
				me.setterReadonly(f, ['pricetype_pricetype_id', 'kpp', 'billingrules_billingrules_id', 'rencana_serahterima', 'rencana_serahterima_date', 'collector_employee_id'], true);

				me.tools.ajax({
					params  : { purchaseletter_id: plId },
					success : function (data, model) {
						//// master im
						me.setParamPL.master_im                = data['others'][0][0]['MASTER_IM'].success ? data['others'][0][0]['MASTER_IM'].data : [];
						me.setParamPL.master_im_detail         = data['others'][0][0]['MASTER_IM_DETAIL'].success ? data['others'][0][0]['MASTER_IM_DETAIL'].data : [];
						me.setParamPL.jenisBiayaPurchaseletter = typeof(data['others'][0][0]['JENIS_BIAYA_PURCHASELETTER'][0]) != 'undefined' ? data['others'][0][0]['JENIS_BIAYA_PURCHASELETTER'][0] : [];

						//// SG ////
						me.setParamPL.master_salesgroup = data.salesgroup;
						me.generateFormsalesgroup();
						////////////

						me.registerOTHERParams(data);

						me.setParamPL.isPurchaseprintktsim = data['others'][0][0]['IS_PURCHASEPRINTKTPSIM'];

						// added 20180718
						me.setParamPL.isFlashPrint = data['others'][0][0]['IS_FLASHPRINT'];
						if (data['others'][0][0]['IS_FLASHPRINT']) {
							f.down("[action=flashprint]").setVisible(true);
						}

						/// added 15 Maret 2015;
						var schG = me.getSchedulegrid();

						var gp = data['others'][0][0]['GLOBALPARAMSPARAMS'];
						if (gp) {
							me.setParamPL.globalParams = gp;
						}

						me.setParamPL.templatePrintSPTDraft  = data['others'][0][0]['TEMPLATEPRINTOUTSPTDRAFT'];
						me.setParamPL.templatePrint          = data['others'][0][0]['TEMPLATEPRINTOUT'];
						me.setParamPL.templatePrintmrt       = data['others'][0][0]['TEMPLATEPRINTOUTMRT'];
						me.setParamPL.templatePrintPayScheme = data['others'][0][0]['TEMPLATEPRINTOUTPAYSCHEME'];
						me.setParamPL.approveNowRsch         = data['others'][0][0]['APPROVENOW_RSCH'];

						f.down("[name=pt_name]").setValue(data['others'][0][0]['PT_NAME']);

						me.setParamPL.sourceMoneyList = data.sourcemoney;
						me.fillFormComponents(data, f);
						isAuthorizedUser = data.others[0][0]['ISAUTHORIZEDUSER'];
						me.setParamPL.globisAuthorizedUser = isAuthorizedUser;
						
						f.down("button[action=browse_unit]").setDisabled(true);
						f.down("button[action=browse_customer]").setDisabled(true);
						f.down("button[action=genschedule]").setDisabled(true);

						f.setLoading("Request purchase letter information...");

						me.localStore.detail.load({
							params   : { purchaseletter_id : plId },
							callback : function (rec, op) {
								////// combobox master im
								_myAppGlobal.getController('Purchaseletterreward').generateComboboxIM(me.setParamPL.master_im, f.down('[name=purchase_date]').getValue());

								me.attachModel(op, me.localStore.detail, false);

								var rec = me.localStore.detail.getAt(0);

								me.setParamPL.totalDocumentKtpSim = rec.get("customer_totaldocument_ktpsim");
								me.setParamPL.firstPurchasedate   = rec.get("firstpurchase_date");
								f.loadRecord(rec);

								/// Jika data lama dan tidak ada more customer
								var sCustomer  = me.getMorecustomergrid().getStore();
								var tMCustomer = sCustomer.getCount();

								var tPorsi = 100;
								var tPCustomer = 0;
								if(tMCustomer > 0){
									var bPorsi = accounting.toFixed(tPorsi/(tMCustomer+1), 2);
									tPCustomer = tPCustomer + bPorsi;
									sCustomer.each(function (rc) {
										if (rc != null) {
											var porsiMc = parseFloat(accounting.unformat(rc.get("customer_porsi_kepemilikan_customer")));
											if(porsiMc == 0){
												rc.beginEdit();
												rc.set({customer_porsi_kepemilikan_customer : bPorsi});
												rc.endEdit();
											}
											else{
												bPorsi = porsiMc;
											}
											tPorsi = tPorsi-bPorsi;
										}
									});
								}

								tPCustomer = tPCustomer+tPorsi;
								if(tPCustomer != 100 || f.down('[name=porsi_kepemilikan_customer]').getValue() == 0 || f.down('[name=porsi_kepemilikan_customer]').getValue() == ''){
									f.down('[name=porsi_kepemilikan_customer]').setValue(accounting.formatMoney(tPorsi));
								}

								f.down("[name=customer_customer_id]").setValue(rec.get("customer_id"));
								f.down("[name=customer_code]").setValue(rec.get("customer_id"));

								/*Add by RH 20220811*/
								if (rec.get("purpose") === 'APARTEMEN' || rec.get("purpose") === 'APARTMENT' || rec.get("purpose").includes('OFFICE') || rec.get("purpose").includes('SOHO')) {
									f.down("[name=unit_building_size]").setFieldLabel('SGA Size');
									f.down("[name=unit_floor_size]").setFieldLabel('Netto Size');
									f.down("[name=unit_land_size]").setReadOnly(true);
									f.down("[name=unit_land_size]").setValue(0);
								} else {
									f.down("[name=unit_building_size]").setFieldLabel('Building Size');
									f.down("[name=unit_floor_size]").setFieldLabel('Floor Size');
									f.down("[name=unit_land_size]").setReadOnly(false);
								}

								me.setParamPL.purchaseAddon = rec.get("Addon");

								// convert all money field
								// arrFieldro = [],
								var vs = f.getForm().getValues();
								for (var i in vs) {
									var elx = me.getFormdata().down("[name=" + i + "]");

									if (elx) {
										if (elx.getXType() === 'xmoneyfieldEST') { //// Edit by Erwin.St 03/08/2021
											elx.setRawValue(accounting.formatMoney(elx.getValue(), { precision : elx.getDecPrecision() }));
											// arrFieldro.push(elx.name);
											// $('input[name="' + elx.name + '"]').addClass('readonly');
										}
									}
								}

								if(me.setParamPL.useJenisBiayaPurchaseletter == 1){
									me.generateJenisbiaya();
								}

								// if(arrFieldro.length){
								// 	me.setterReadonly(f, arrFieldro, true);
								// }

								paymentAmount        = me.tools.floatval(rec.get("payment_payment"));
								billingrulesuangmuka = me.tools.floatval(rec.get("billingrules_uangmuka"));

								var el = null;
								for (var i in rec.data) {
									el = f.down("[name=" + i + "]");
									if (el) {
										// added by rico 09122021
										if(i != 'is_extend_schedule' && i != 'salesgroup_salesgroup_id' && i != 'kuasa_name' && i != 'kuasa_npwp' && i != 'kuasa_nik' && i != 'kuasa_alamat'){
											me.setterReadonly(f, [i], true);
										}
									}
									el = null;
								}

								if(me.getMorecustomergrid().getStore().getCount() > 0){
									me.setterReadonly(f, ['tanggal_surat_kepemilikan_bersama'], false);
								}
								else{
									me.setterReadonly(f, ['tanggal_surat_kepemilikan_bersama'], true);
								}

								f.setLoading("Request schedule information...");
								me.tools.ajax({
									params  : { purchaseletter_id : plId },
									success : function (schdata, schmodel) {
										me.tools.wesea({
											data  : schdata,
											model : schmodel
										}, sg).grid();

										if (me.getTotalPayment() > 0) {
											if (!isAuthorizedUser) {
												f.down("button[action=authorize]").setVisible(true);
												f.down("#btnSave").setDisabled(true);
												f.down("#btnSaveDraft").setDisabled(true);
											} else {
												f.down("#btnSave").setDisabled(false);
												if (me.setParamPL.checkCanSPTDraft && rec.get("is_draft")) {
													f.down("#btnSaveDraft").setDisabled(false);
													f.down("#btnSaveDraft").setVisible(true);
												}
												f.down("button[action=authorize]").hide();
											}
										} else {
											f.down("#btnSave").setDisabled(false);
											if (me.setParamPL.checkCanSPTDraft && rec.get("is_draft")) {
												f.down("#btnSaveDraft").setDisabled(false);
											}
											f.down("button[action=authorize]").hide();
										}
										/* authroize button*/

										/// added 13 November 2014
										// jika payment == 0 , maka bisa edit sebagian informasi
										if (paymentAmount === 0) {
											f.down("#btnSave").setDisabled(false);
											if (me.setParamPL.checkCanSPTDraft && rec.get("is_draft")) {
												f.down("#btnSaveDraft").setDisabled(false);
											}
											var ar = ['salesman_employee_id', 'clubcitra_member',
												'citraclub_citraclub_id', 'saleslocation_saleslocation_id',
												'mediapromotion_mediapromotion_id', 'upline_upline_id', 'cac_cac_id', 'is_upline_referall', 'is_cac_referall'];
											var si = f.down("#salesInformationID");
											for (var i in ar) {
												me.setterReadonly(f, [ar[i]], false);
											}
										}

										me.balanceCalculate(me.getFormdata(), me.getSchedulegrid());

										f.setLoading(false);

										/// masking jika statusnya cancel
										var isCancel = me.tools.intval(rec.get("is_cancel"));
										if (isCancel > 0) {
											f.down("[action=save]").setDisabled(true);
											f.down("[action=saveDraft]").setDisabled(true);
											f.down("[action=printout]").setDisabled(true);
											f.down("[action=printsch]").setDisabled(true);
											f.down("[name=unitstatus_status]").setValue("CANCEL");
										}

										/// enable edit number jika param = 1
										me.setterReadonly(f, ['purchaseletter_no'], me.tools.intval(me.setParamPL.globalParams.PURCHASELETTER_ENABLE_EDITNUMBER) === 1 ? false : true);

										var useLunasTandaJadi = me.tools.intval(me.setParamPL.globalParams.PURCHASELETTER_PRINT_LUNASTANDAJADI);
										me.setParamPL.useLunasTandaJadi = useLunasTandaJadi;

										var tempVs = me.getFormdata().getValues();

										if (useLunasTandaJadi === 1) {

											var remainingBalanceTJ = me.check_pelunasan_tj_um_return_value(schdata);

											if (remainingBalanceTJ > 0) {
												f.down("button[action=flashprint]").setDisabled(false);
											}

											f.down("[action=printout]").setDisabled(false);
										} 
										else {
											f.down("[action=printout]").setDisabled(false);
										}

										//addby imaam on 20200130
										var pl_revision = data['others'][0][0]['PLREVISION_SUPERVISOR'];
										if (pl_revision) {
											f.down("[action=save]").setDisabled(false);

											var arrEl = ['customer_KTP_address', 'salesman_employee_id', 'rewardsales_reward_id', 'rewardtambahan_reward_id', 'bank_bank_id', 'rencana_serahterima_date', 'unit_virtualaccount_bca', 'unit_virtualaccount_mandiri', 'rewardcustomer_reward_id', 'clubcitra_member', 'citraclub_citraclub_id', 'upline_upline_id', 'is_cac_referall', 'cac_cac_id', 'is_upline_referall', 'saleslocation_saleslocation_id', 'mediapromotion_mediapromotion_id', 'notes', 'rencana_serahterima', 'promo', 'collector_employee_id', 'nomor_im', 'customer_NPWP', 'customer_NPWP_name', 'customer_NPWP_address'];
											me.setterReadonly(f, arrEl, false);
										}

										var disable_printspt = data['others'][0][0]['DISABLE_PRINTSPT'];
										if (disable_printspt) {
											f.down("[action=printout]").setDisabled(true);
										}

										/// kalau supervisor, maka bisa edit sales information dan note -- addon 2017-03-09
										var isSupervisor = data['others'][0][0]['ISSUPERVISOR'];
										if (isSupervisor) {
											var arrEl2 = ['salesman_employee_id', 'clubcitra_member', 'citraclub_citraclub_id', 'upline_upline_id', 'is_cac_referall', 'cac_cac_id', 'is_upline_referall', 'saleslocation_saleslocation_id', 'mediapromotion_mediapromotion_id', 'notes', 'rencana_serahterima', 'promo', 'collector_employee_id', 'nomor_im', 'customer_NPWP', 'customer_NPWP_name', 'customer_NPWP_address'];
											me.setterReadonly(f, arrEl2, false);
										}

										// addon 2017 -04- 10
										me.getSchedulegrid().addListener('beforeedit', function () {
											return false;
										});

										// addon 20170608
										var arrEl3 = ['customer_address', 'city_city_name', 'customer_zipcode', 'customer_home_phone', 'customer_mobile_phone', 'customer_office_phone', 'customer_fax', 'customer_KTP_number', 'customer_email', 'is_repeat_order'];
										me.setterReadonly(f, arrEl3, false);

										// Add By RH 15/11/2019
										if (isAuthorizedUser) {
											me.setterReadonly(f, ['customer_KTP_address'], false);
											me.getMorecustomergrid().down("[action=edit]").setDisabled(false);
										}
										// END Add By RH 15/11/2019

										//addon 20170704
										me.setParamPL.validChangeName = data.others[0][0]['DATACHANGENAME'];

										//rizal 2 April 2019
										me.setParamPL.validChangeNameMsg = data.others[0][0]['DATACHANGENAME_ERR_MSG'];

										//iqbal 14 juni 2019
										if (apps.gid == 7) {
											f.down("#rewardcustomerPanelID").setVisible(true);
											me.setterReadonly(f, ['rewardcustomer_reward_id'], false);
										}

										me.setterReadonly(f, ['promo'], me.setParamPL.disablePromoPurchaseletter);

										////// ad by erwin.st //////
										me.checkFormReadonly(f);
									}
								}).read('schedule');

								//addon 20171023
								//SURABAYA ADDON
								var downlineList = "<option value='0'> - </option>";
								var downlines    = data["others"][0][0]["DOWNLINE"][1];
								for (var i in downlines) {
									downlineList += "<option value='" + downlines[i]["downline_id"] + "'>" + downlines[i]["name"] + "</option>";
								}

								var viewParams = {
									downline_id      : rec.get("downline_id"),
									keterangan_bayar : rec.get("keterangan_bayar"),
									keterangan_1     : rec.get("keterangan_1"),
									keterangan_2     : rec.get("keterangan_2"),
									keterangan_3     : rec.get("keterangan_3"),
									house_advisor    : rec.get("house_advisor"),
									manager          : rec.get("manager"),
									hs_keuangan      : rec.get("hs_keuangan"),
									downline_list    : downlineList,
									action           : 'update'
								};
								ApliJs.loadHtmlB(me, me.getFormdata().down("#PLCONotherInformationID"), 'sby_form_add', viewParams);
								// me.getFormdata().down("#PLCONotherInformationID").toggleCollapse(true);

								var viewParams2 = {
									aftersales_serahterima_date: rec.get("aftersales_serahterima_date"),
									buktipemilik_imb_date: rec.get("buktipemilik_imb_date"),
									total_ajb: rec.get("total_ajb")

								};
								viewParams2.aftersales_serahterima_date = viewParams2.aftersales_serahterima_date ? moment(viewParams2.aftersales_serahterima_date).format("DD-MM-YYYY") : '';
								viewParams2.buktipemilik_imb_date = viewParams2.buktipemilik_imb_date ? moment(viewParams2.buktipemilik_imb_date).format("DD-MM-YYYY") : '';
								ApliJs.loadHtmlB(me, me.getFormdata().down("#PLCONstatusInformationID"), 'sby_form_add_status', viewParams2);
								// me.getFormdata().down("#PLCONstatusInformationID").toggleCollapse(true);

								//END SURABAYA ADDON

								// TEST MODAL BOOTSTRAP
								var viewParams3 = { test : 0 };
								ApliJs.loadHtmlB(me, me.getFormdata().down("#testModalID"), 'browse_unit_modal', viewParams3);
								// END TEST MODAL BOOTSTRAP

								f.down("[name=price_harga_dischargabangunan]").setValue(accounting.formatMoney(f.down("[name=price_harga_dischargabangunan]").getValue()));
								f.down("[name=price_harga_dischargatanah]").setValue(accounting.formatMoney(f.down("[name=price_harga_dischargatanah]").getValue()));
								f.down("[name=price_harga_dischargadasar]").setValue(accounting.formatMoney(f.down("[name=price_harga_dischargadasar]").getValue()));

								//// Add by Erwin.St 03/08/2021
								if(rec.get("price_source") == 2){
									var newStorePricelist = Ext.create('Ext.data.Store', {
										fields : ['pricelist_id', 'keterangan'],
										data   : [{ pricelist_id : rec.get("pricelist_id"), keterangan : rec.get("pricelist_keterangan")}]
									});
									f.down("[name=pricelist_id]").bindStore(newStorePricelist);
									f.down("[name=pricelist_id]").setVisible(true);
									f.down("[name=pricelist_id]").setValue(rec.get("pricelist_id"));

									// $('input[name="price_harga_bangunan"]' ).addClass('readonly');
									$('.kelebihantanahBox').hide();

									f.down("#labelbbn").setText("Biaya Balik Nama (TITIPAN)");
									f.down("#labelbphtb").setText("Biaya perolehan hak (TITIPAN)");
									f.down("#labelajb").setText("Biaya Akta Jual Beli (TITIPAN)");

									f.down('#text_harga_bangunan').setText('Harga Bangunan /m2');
									f.down('[name=price_bangunanpermeter]').setVisible(true);
									f.down('#text_permeter_harga_bangunan').setVisible(true);

									f.down("[name=kpp]").setVisible(false);

									var newStorePricelistkoefisien = Ext.create('Ext.data.Store', {
										fields : ['pricelistdetail_koefisien_id', 'pricelist_name'],
										data   : [{ pricelistdetail_koefisien_id : rec.get("pricelistdetail_koefisien_id"), pricelist_name : rec.get("pricelist_name")}]
									});
									f.down("[name=pricelistdetail_koefisien_id]").bindStore(newStorePricelistkoefisien);
									f.down('[name=pricelistdetail_koefisien_id]').setVisible(true);
									f.down("[name=pricelistdetail_koefisien_id]").setValue(rec.get("pricelistdetail_koefisien_id"));

									me.getSchedulegrid().down('#colms_persentase_npv').setVisible(true);
								}
							}
						});

						me.discountInput().enable({
							globalParams : gp,
							isReadOnly   : true
						});

						var ada    = me.getGrid();
						var store  = ada.getStore();
						var record = store.getAt(store.indexOf(ada.getSelectionModel().getSelection()[0]));
						var row    = record.data;

						if (record.get('api_aci') === 1) {
							f.down("[name=apiaci]").setText("Non ACI");
						} 
						else {
							f.down("[name=apiaci]").setText("Set ACI");
						}

						me.isSh1Featured({ data : data, form : f });
						me.isRewardFeatured({ data : data, form : f });
					}
				}).read('detail');

				if (me.setParamPL.printoutsptmrt) {
					f.down("#btnPrintoutspt").setVisible(true);
				}
			},
			editdraftFunction : function () {
				f.down("[action=printsch]").hide();
				// f.down("[action=printout]").hide();
				if (me.checkPaymentDraft() == false) {
					f.down("[action=printout]").setDisabled(false);
				}

				me.setParamPL.isDraft = true;
				f.down("[action=setaci]").hide();
				//rizal 2 April 2019
				if (apps.subholdingId == 1) {
					f.down("#is_auto_sms").setVisible(true);
					f.down("#is_not_allowed_sp").setVisible(true);
					// f.down("#is_nonppn").setVisible(true);
				}

				//rizal 22 April 2019
				if (apps.subholdingId == 2) {
					// console.log("Replace label");
					f.down("#labelbbn").setText("Biaya Balik Nama (TITIPAN)");
					f.down("#labelbphtb").setText("Biaya perolehan hak (TITIPAN)");
					f.down("#labelajb").setText("Biaya Akta Jual Beli (TITIPAN)");
				}

				//rizal 16 April 2019
				if (apps.subholdingId == 2) {
					// f.down("#promo").setVisible(true);
				}

				f.down("[action=setaci]").setDisabled(true);

				if(typeof me.getGrid().getSelectedRecord() != 'undefined'){
					var plId = me.getGrid().getSelectedRecord().get("purchaseletter_id");
					f.editedRow = me.getGrid().getSelectedRow();
					var paymentAmount = 0;

					me.localStore.schType.load({
						callback : function (rec, op) {
							me.attachModel(op, me.localStore.schType, false);
						}
					});

					f.down("[action=save]").setDisabled(false);

					var morecustomerStore = me.getMorecustomergrid().getStore();
					morecustomerStore.removeAll();
					morecustomerStore.load({
						params   : { purchaseletter_id : plId, mode_read : 'morecustomerlist' },
						callback : function (rec) {
							// console.log(rec.length)
							if (rec.length > 0) {
								f.down('[name= is_more_customer]').setValue(1)
							}
						}
					});

					me.tools.ajax({
						params : {
							purchaseletter_id : plId,
							is_draft          : true
						},
						success : function (data, model) {
							//// master im
							me.setParamPL.master_im                = data['others'][0][0]['MASTER_IM'].success ? data['others'][0][0]['MASTER_IM'].data : [];
							me.setParamPL.master_im_detail         = data['others'][0][0]['MASTER_IM_DETAIL'].success ? data['others'][0][0]['MASTER_IM_DETAIL'].data : [];
							me.setParamPL.jenisBiayaPurchaseletter = typeof(data['others'][0][0]['JENIS_BIAYA_PURCHASELETTER'][0]) != 'undefined' ? data['others'][0][0]['JENIS_BIAYA_PURCHASELETTER'][0] : [];

							//// SG ////
							me.setParamPL.master_salesgroup = data.salesgroup;
							me.generateFormsalesgroup();
							////////////

							if (me.setParamPL.checkCanSPTDraft) {
								f.down("[action=saveDraft]").setDisabled(false);
								f.down("#btnSaveDraft").setVisible(true);
								search = me.getFormsearch();
								search.down('#btnCheckDraft').setVisible(true);
								me.getMorecustomergrid().down("[action=add]").setDisabled(false);
								me.getMorecustomergrid().down("[action=edit]").setDisabled(false);
								me.getMorecustomergrid().down("[action=delete]").setDisabled(false);
								if (me.setParamPL.groupuser == 'NUP GROUP') {
									f.down("#btnSaveDraft").setPosition(6, 6, 1);
									f.down("#btnCancel").setPosition(112, 6, 1);
									f.down("#btnPrintout").setPosition(194, 6, 1);
								}
							}
							me.registerOTHERParams(data);
							me.setParamPL.isPurchaseprintktsim = data['others'][0][0]['IS_PURCHASEPRINTKTPSIM'];

							/// added 15 Maret 2015;
							var schG = me.getSchedulegrid();

							var gp = data['others'][0][0]['GLOBALPARAMSPARAMS'];
							if (gp) {
								me.setParamPL.globalParams = gp;
							}

							me.setParamPL.templatePrintSPTDraft  = data['others'][0][0]['TEMPLATEPRINTOUTSPTDRAFT'];
							me.setParamPL.templatePrint          = data['others'][0][0]['TEMPLATEPRINTOUT'];
							me.setParamPL.templatePrintPayScheme = data['others'][0][0]['TEMPLATEPRINTOUTPAYSCHEME'];

							for (var i in me.setParamPL.templatePrint) {
								me.setParamPL.templatePrint[i].value = me.setParamPL.templatePrint[i].value.replace(/.docx/, "_draft.docx");
							}

							for (var i in me.setParamPL.templatePrintPayScheme) {
								me.setParamPL.templatePrintPayScheme[i].value = me.setParamPL.templatePrintPayScheme[i].value.replace(/.docx/, "_draft.docx");
							}

							me.setParamPL.approveNowRsch = data['others'][0][0]['APPROVENOW_RSCH'];

							f.down("[name=pt_name]").setValue(data['others'][0][0]['PT_NAME']);

							me.setParamPL.sourceMoneyList = data.sourcemoney;

							me.setParamPL.processor.schedulePembulatan = data['others'][0][0]['SCHEDULE_PEMBULATAN'];

							me.fillFormComponents(data, f);
							isAuthorizedUser = data.others[0][0]['ISAUTHORIZEDUSER'];

							f.setLoading("Request purchase letter information...");

							me.localStore.detail.load({
								params : {
									purchaseletter_id : plId,
									is_draft          : true
								},
								callback : function (rec, op) {
									////// combobox master im
									_myAppGlobal.getController('Purchaseletterreward').generateComboboxIM(me.setParamPL.master_im, f.down('[name=purchase_date]').getValue());

									me.attachModel(op, me.localStore.detail, false);
									var rec = me.localStore.detail.getAt(0);
									me.setParamPL.totalDocumentKtpSim = rec.get("customer_totaldocument_ktpsim");
									f.loadRecord(rec);

									/// Jika data lama dan tidak ada more customer
									var sCustomer  = me.getMorecustomergrid().getStore();
									var tMCustomer = sCustomer.getCount();

									var tPorsi = 100;
									var tPCustomer = 0;
									if(tMCustomer > 0){
										var bPorsi = accounting.toFixed(tPorsi/(tMCustomer+1), 2);
										tPCustomer = tPCustomer + bPorsi;
										sCustomer.each(function (rc) {
											if (rc != null) {
												var porsiMc = parseFloat(accounting.unformat(rc.get("customer_porsi_kepemilikan_customer")));
												if(porsiMc == 0){
													rc.beginEdit();
													rc.set({customer_porsi_kepemilikan_customer : bPorsi});
													rc.endEdit();
												}
												else{
													bPorsi = porsiMc;
												}
												tPorsi = tPorsi-bPorsi;
											}
										});
									}

									tPCustomer = tPCustomer+tPorsi;
									if(tPCustomer != 100 || f.down('[name=porsi_kepemilikan_customer]').getValue() == 0 || f.down('[name=porsi_kepemilikan_customer]').getValue() == ''){
										f.down('[name=porsi_kepemilikan_customer]').setValue(accounting.formatMoney(tPorsi));
									}

									me.setParamPL.purchaseAddon = rec.get("Addon");
									
									/*Add by RH 20220811*/
									if (rec.get("purpose") === 'APARTEMEN' || rec.get("purpose") === 'APARTMENT' || rec.get("purpose").includes('OFFICE') || rec.get("purpose").includes('SOHO')) {
										f.down("[name=unit_building_size]").setFieldLabel('SGA Size');
										f.down("[name=unit_floor_size]").setFieldLabel('Netto Size');
										f.down("[name=unit_land_size]").setReadOnly(true);
										f.down("[name=unit_land_size]").setValue(0);
									} else {
										f.down("[name=unit_building_size]").setFieldLabel('Building Size');
										f.down("[name=unit_floor_size]").setFieldLabel('Floor Size');
										f.down("[name=unit_land_size]").setReadOnly(false);
									}
									
									// convert all money field
									var vs = me.getFormdata().getForm().getValues();
									for (var i in vs) {
										var elx = me.getFormdata().down("[name=" + i + "]");
										if (elx) {
											if (elx.getXType() === 'xmoneyfield') {
												elx.setRawValue(accounting.formatMoney(elx.getValue(), { precision : elx.getDecPrecision() }));
											}
										}
									}

									if(me.setParamPL.useJenisBiayaPurchaseletter == 1){
										me.generateJenisbiaya();
									}

									paymentAmount = me.tools.floatval(rec.get("payment_payment"));

									var el = null;
									for (var i in rec.data) {

										el = f.down("[name=" + i + "]");

										if (el) { }
										el = null;
									}

									if(f.down("[name=tanggal_surat_kepemilikan_bersama]").getValue() != ''){
										me.setterReadonly(f, ['tanggal_surat_kepemilikan_bersama'], false);
									}

									f.down("[name=customer_customer_id]").setValue(rec.get("customer_id"));
									f.down("[name=customer_code]").setValue(rec.get("customer_id"));
									f.down("[name=pricetype_pricetype_id]").setDisabled(false);

									f.down("[name=kpp]").setVisible(me.tools.intval(f.down("[name=pricetype_pricetype_id]").getValue()) === 2 ? true : false);
									me.unitSelectviaApliDraft(rec.get("unit_unit_id"));

									me.setterReadonly(f, ['pricetype_pricetype_id', 'kpp'], false);

									me.tools.fillComboCode(f, me.cbf.employee, "salesman");
									me.tools.fillComboCode(f, me.cbf.clubcitra, "citraclub");
									me.tools.fillComboCode(f, me.cbf.mediapromotion, "mediapromotion");
									me.tools.fillComboCode(f, me.cbf.saleslocation, "saleslocation");
									me.tools.fillComboCode(f, me.cbf.bank, "bank");

									//added by anas 17062021
									//jadi kalo gk ada foto gk load image
									if (rec.get("customer_photo").length > 0) {
										me.mt.customerPhoto(f.down("#photo_image"), rec.get("customer_photo"), me.myConfig.IMG_FOLDER);
									}

									f.setLoading("Request schedule information...");
									me.tools.ajax({
										params : {
											purchaseletter_id : plId,
											is_draft          : me.setParamPL.isDraft
										},
										success : function (schdata, schmodel) {
											me.tools.wesea({
												data  : schdata,
												model : schmodel
											}, sg).grid();

											me.setParamPL.scheduleOld = schdata;
											for (var i = 0; i < schdata.length; i++) {
												if (schdata[i]['schedule']['amount'] !== schdata[i]['schedule']['remaining_balance']) {
													me.setParamPL.scheduleStrict = true;
													switch (schdata[i]['scheduletype']['scheduletype']) {
														case 'UM':
															me.setterReadonly(f, ['billingrules_term_uangmuka'], true);
															break;
														case 'TJ':
															me.setterReadonly(f, ['billingrules_term_tandajadi'], true);
															break;
														default:
															me.setterReadonly(f, ['billingrules_term_angsuran'], true);
															break;
													}
												}
											}
											f.setLoading(false);
										}
									}).read('schedule');

									//addon 20171023
									//SURABAYA ADDON
									var downlineList = "<option value='0'> - </option>";
									var downlines    = data["others"][0][0]["DOWNLINE"][1];
									for (var i in downlines) {
										downlineList += "<option value='" + downlines[i]["downline_id"] + "'>" + downlines[i]["name"] + "</option>";
									}

									var viewParams = {
										downline_id      : rec.get("downline_id"),
										keterangan_bayar : rec.get("keterangan_bayar"),
										keterangan_1     : rec.get("keterangan_1"),
										keterangan_2     : rec.get("keterangan_2"),
										keterangan_3     : rec.get("keterangan_3"),
										house_advisor    : rec.get("house_advisor"),
										manager          : rec.get("manager"),
										hs_keuangan      : rec.get("hs_keuangan"),
										downline_list    : downlineList,
										action           : 'updateDraft'
									};
									ApliJs.loadHtmlB(me, me.getFormdata().down("#PLCONotherInformationID"), 'sby_form_add', viewParams);
									// me.getFormdata().down("#PLCONotherInformationID").toggleCollapse(true);

									var viewParams2 = {
										aftersales_serahterima_date : rec.get("aftersales_serahterima_date"),
										buktipemilik_imb_date       : rec.get("buktipemilik_imb_date"),
										total_ajb                   : rec.get("total_ajb")
									};

									viewParams2.aftersales_serahterima_date = viewParams2.aftersales_serahterima_date ? moment(viewParams2.aftersales_serahterima_date).format("DD-MM-YYYY") : '';
									viewParams2.buktipemilik_imb_date       = viewParams2.buktipemilik_imb_date ? moment(viewParams2.buktipemilik_imb_date).format("DD-MM-YYYY") : '';

									ApliJs.loadHtmlB(me, me.getFormdata().down("#PLCONstatusInformationID"), 'sby_form_add_status', viewParams2);
									// me.getFormdata().down("#PLCONstatusInformationID").toggleCollapse(true);

									//END SURABAYA ADDON
									// TEST MODAL BOOTSTRAP
									var viewParams3 = { test : 0};
									ApliJs.loadHtmlB(me, me.getFormdata().down("#testModalID"), 'browse_unit_modal', viewParams3);
									// END TEST MODAL BOOTSTRAP

									f.down("[name=price_harga_dischargabangunan]").setValue(accounting.formatMoney(f.down("[name=price_harga_dischargabangunan]").getValue()));
									f.down("[name=price_harga_dischargatanah]").setValue(accounting.formatMoney(f.down("[name=price_harga_dischargatanah]").getValue()));
									f.down("[name=price_harga_dischargadasar]").setValue(accounting.formatMoney(f.down("[name=price_harga_dischargadasar]").getValue()));
								}
							});

							me.discountInput().enable({
								globalParams : gp,
								isReadOnly   : true
							});

							var ada    = me.getGrid();
							var store  = ada.getStore();
							var record = store.getAt(store.indexOf(ada.getSelectionModel().getSelection()[0]));
							var row    = record.data;

							if (record.get('api_aci') === 1) {
								f.down("[name=apiaci]").setText("Non ACI");
							} 
							else {
								f.down("[name=apiaci]").setText("Set ACI");
							}

							me.isSh1Featured({ data: data, form: f });
							me.isRewardFeatured({ data: data, form: f });

							me.setterReadonly(f, ['promo'], me.setParamPL.disablePromoPurchaseletter);

							////// ad by erwin.st //////
							me.checkFormReadonly(f);
						}
					}).read('detail');
					
					setTimeout(function(){ 
						f.down('#btnSave').setVisible(true);
						f.down('#btnSaveDraft').setVisible(true);
					}, 1000);
				}
				else{
					me.formDataClose();
				}
			}
		};
		return x;
	},
	getTotalPayment : function () {
		var pay   = 0;
		var me    = this;
		var plRec = me.getGrid().getSelectedRecord();
		var t     = me.tools;
		if (plRec) {
			pay = t.floatval(plRec.get("total_payment"));
		}
		return pay;
	},
	fillFormComponents : function (data, form) {
		var me = this;
		me.tools.wesea(data.bank, form.down("[name=bank_bank_id]")).comboBox();
		me.tools.wesea(data.billingrules, form.down("[name=billingrules_billingrules_id]")).comboBox('', function () {
			// var storeBill = form.down("[name=billingrules_billingrules_id]").getStore();
			// var pricetype = form.down("[name=pricetype_pricetype_id]").getValue();
			// storeBill.filter('pricetype_id', pricetype, true, false);
		});
		me.tools.wesea(data.collector, form.down("[name=collector_employee_id]")).comboBox();
		me.tools.wesea(data.mediapromotion, form.down("[name=mediapromotion_mediapromotion_id]")).comboBox();
		me.tools.wesea(data.saleslocation, form.down("[name=saleslocation_saleslocation_id]")).comboBox();
		me.tools.wesea(data.salesman, form.down("[name=salesman_employee_id]")).comboBox();
		me.tools.wesea(data.citraclub, form.down("[name=citraclub_citraclub_id]")).comboBox();
		me.tools.wesea(data.employee, form.down("[name=upline_upline_id]")).comboBox();
		me.tools.wesea(data.cac, form.down("[name=cac_cac_id]")).comboBox();
		me.tools.wesea(data.city, form.down("[name=city_city_name]")).comboBox();
		me.tools.wesea(data.purposebuy, form.down("[name=purposebuy_purposebuy_id]")).comboBox();
		//citraclub_id
	},
	/* overrider 08 March 2018 */
	dataDestroy : function () {
		/// doing nothing
	},
	dataDestroyMyPurchase : function () {
		var me  = this;
		var g   = me.getGrid();
		var rec = me.getGrid().getSelectedRecord();

		me.getGrid().setLoading('Please wait...');
		var validate_closing = me.validateClosing(rec.get("purchase_date"));
		var dataValidate     = validate_closing.data.others[0][0].VALIDASITGLCLOSING;
		var authorized       = validate_closing.data.others[0][0].ISAUTHORIZEDUSER;
		me.getGrid().setLoading(false);

		if(!dataValidate.HASIL){
			me.tools.alert.warning(dataValidate.MSG);
		}
		else{
			if (authorized) {
				me.dataDestroyIntern();
			} 
			else {
				var pay = me.getTotalPayment();
				if (pay === 0) {
					me.dataDestroyIntern();
				} 
				else {
					me.showAuthorizeForm('delete');
				}
			}
		}
	},
	//added by semy 21/6/17 
	apiAci: function () {
		var me = this, 
			panel  = me.getFormdata(), 
			grid   = me.getGrid(),
			store  = grid.getStore(),
			record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0])),
			row    = record.data;

		if (record.get('api_aci') === 1) {
			panel.setLoading("Menonaktifkan ACI");
			me.tools.ajax({
				params  : { purchaseletter_id: row.purchaseletter_id },
				success : function (data, model) {
					panel.setLoading(false);
					store.reload();
					panel.up('window').close();
				}
			}).read('apiaci');
		} 
		else {
			panel.setLoading("Mengaktifkan ACI");

			me.tools.ajax({
				params  : { purchaseletter_id : row.purchaseletter_id },
				success : function (data, model) {
					panel.setLoading(false);
					store.reload();
					panel.up('window').close();
				}
			}).read('apiacis');
		}
	},
	// ended semy
	dataDestroyIntern : function () {
		var me   = this;
		var rows = me.getGrid().getSelectionModel().getSelection();

		if (rows.length < 1) {
			Ext.Msg.alert('Info', 'No record selected !');
			return;
		} 
		else {
			var confirmmsg, successmsg, failmsg;
			var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
			var store           = me.getGrid().getStore();

			if (rows.length == 1) {
				var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
				if (store.getAt(store.indexOf(rows[0])).get('is_draft')) {
					selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('unit_unit_number') + ']';
				}
				confirmmsg = 'Delete ' + selectedRecord + ' ?';
				failmsg    = 'Error: Unable to delete ' + selectedRecord + '.';
			} 
			else {
				confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
				failmsg    = 'Error: Unable to delete data.';
			}

			Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
				if (btn == 'yes') {
					resetTimer();

					var msg = function () {
						me.getGrid().up('window').mask('Deleting data, please wait ...');
					};

					var selectedRecord = '';

					if (rows.length == 1) {
						selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
						if (store.getAt(store.indexOf(rows[0])).get('is_draft')) {
							selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('unit_unit_number') + ']';
						}
					}

					var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');

					for (var i = 0; i < rows.length; i++) {
						store.remove(rows[i]);
					}

					store.on('beforesync', msg);
					store.sync({
						success : function (s) {
							me.getGrid().up('window').unmask();
							var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
							var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
							store.un('beforesync', msg);
							store.reload();

							Ext.Msg.show({
								title   : 'Success',
								msg     : successmsg,
								icon    : Ext.Msg.INFO,
								buttons : Ext.Msg.OK
							});
						},
						failure : function () {
							me.getGrid().up('window').unmask();
							store.un('beforesync', msg);
							store.reload();
							Ext.Msg.show({
								title   : 'Failure',
								msg     : failmsg + ' The data may have been used.',
								icon    : Ext.Msg.ERROR,
								buttons : Ext.Msg.OK
							});
						}
					});
				}
			});
		}
	},
	apliJsFuncsby_form_add : function () {
		var me = this;
		var x = {
			afterRender: function (tpl, params) {
				if ($("#plFormID input[name='action']").val() === "update") {
					$("#plFormID select[name='downline_id']").val(params.downline_id);
				}
			}
		};
		return x;
	},
	apliJsFuncsby_form_add_status : function () {
		var me = this;
		var x = {
			afterRender : function (tpl, params) {}
		};
		return x;
	},
	apliJsFuncbrowse_unit_modal : function (modalId) {
		var me = this;
		var x = {
			init : function () {
				ApliJs.grid('#' + modalId).initEvent('browseUnit');
			},
			afterRender : function (tpl, params) {
				$('#' + modalId).on('shown.bs.modal', function () {
					me.apliJsFuncbrowse_unit_modal(modalId).loadData(1, 25, 0);
				});
			},
			loadData : function (page, limit, start) {
				$.ajax({
					method : "POST",
					url    : "erems/purchaseletter/read/",
					data   : { 
						start       : start, 
						page        : page, 
						limit       : limit, 
						mode_read   : "unitlist", 
						unit_number : $("#" + modalId + " input[name=unit_number]").val() 
					},
				}).done(function (msg) {
					$("#" + modalId + " button[name=submit_search]").prop('disabled', false);

					var units     = msg["data"];
					var totalData = msg["totalRow"];
					var totalPage = totalData > 0 ? Math.ceil(totalData / limit) : 0;

					var count = (page * limit) - limit + 1;
					var rows  = "";
		  
					for (var i in units) {
						rows += 
							"<tr unit_id='" + units[i]["unit"]["unit_id"] + "'>" +
								"<td class='general' style='width:30px;'>" + count + "</td>" +
								"<td style='width:70px;'>" + units[i]["unit"]["unit_number"] + "</td>" +
								"<td style='width:70px;'>" + units[i]["cluster"]["cluster"] + "</td>" +
								"<td style='width:70px;'>" + units[i]["type"]["name"] + "</td>" +
								"<td style='width:70px;'> " + 
									"<button class='btn btn-primary btn-sm select_unit' " + 
											"unit_id='" + units[i]["unit"]["unit_id"] + "' " + 
											"floor='" + (typeof units[i]["unit"]["floor"] != 'undefined' ? units[i]["unit"]["floor"] : 0) + "' " + 
											"productcategory_id='" + units[i]["productcategory"]["productcategory_id"] + "'>choose</button>" + 
								"</td>" +
							"</tr>";
						count++;
					}

					$("#plUnitListId tbody").html(rows);

					var cp = 0, tp = 0, tr = 0;
					/// update paging info
					if (units.length > 0) {
						cp = page, tp = totalPage, tr = totalData;
					}
					$("#" + modalId + " .mysuper_paging span.current_page").text(cp);
					$("#" + modalId + " .mysuper_paging span.total_page").text(tp);
					$("#" + modalId + " .mysuper_paging span.total_records").text("Total Record: " + tr);
					// end update paging info
		  
					$("#plUnitListId button.select_unit").click(function (event) {
						event.preventDefault();

						var unitId            = $(this).attr("unit_id");
						var floor             = $(this).attr("floor");
						var productcategoryId = $(this).attr("productcategory_id");

						if(productcategoryId == 1 && floor == 0){
							ApliJs.alert().error('<div style="text-align: center;">Produk kategori BANGUNAN, jumlah lantai harus lebih besar dari 0.</div>');
						}
						else if(productcategoryId == 2 && floor > 0){
							ApliJs.alert().error('<div style="text-align: center;">Produk kategori KAVLING, jumlah lantai harus sama dengan 0.</div>');
						}
						else{
							me.unitSelectviaApli(unitId);
							$('#' + modalId).modal('hide');
						}
					});
				});
			},
		};
		return x;
	},
	//edited by Rizal 1 Maret 2019
	//edited by hadi 05092019
	gridAfterRender : function (configs) {
		this.callParent(arguments);

		var me   = this;
		var grid = me.getGrid();

		grid.up('window').body.mask('Loading configuration ...');

		grid.store.on('load', function (store, records, options) {
			me.jqueryBinding();
		});

		grid.down('#btnEdit').setVisible(true);
		grid.down('#btnDelete').setVisible(true);
		grid.down('#btnEditdraft').setVisible(false);
		grid.down('#btnDeletedraft').setVisible(false);
		
		if (apps.subholdingId == 2) {
		    grid.down('#rescheduleMainGrid').setVisible(false);
		} else {
		     grid.down('#rescheduleMainGrid').setVisible(true);
		}

		//// add by erwin.st 09122021
		if (!me.setParamPL.checkCanSPTDraft) {
			search = me.getFormsearch();
			search.down('#btnCheckDraft').setVisible(false);
		}
		grid.down('#btnNew').setDisabled(false);
	
		////// add by Erwin 04/06/2021
		grid.down('#tahan_batal').setVisible(me.setParamPL.visibleTahanBatal);
		grid.down('#printoutdraftspt').setVisible(me.setParamPL.checkCanSPTDraft);

		grid.up('window').body.unmask();
	},
	jqueryBinding : function () {
		var me = this;
		//inlineEdit
		me.checkboxInlineEdit('is_auto_sms');
		me.checkboxInlineEdit('is_not_allowed_sp');
		me.checkboxInlineEdit('is_nonppn');
		me.checkboxInlineEdit('is_vida');
		me.checkboxInlineEdit('is_ciputrafest40');
		me.checkboxInlineEdit('is_blokir'); // added by rico 28112022
		me.checkboxInlineEdit('is_disc_karyawan'); // added by rico 19012023
	},
	checkboxInlineEdit : function (name) {
		var me = this;
		$("input[name='" + name + "']").change(function (event) {
			var val               = $(this).is(":checked") ? 1 : 0;
			var y                 = $(this);
			var purchaseletter_id = $(this).attr('data');
			var p                 = me.getPanel();

			if (name == 'is_vida' || name == 'is_ciputrafest40' || name == 'is_disc_karyawan') { /// Add by Erwin.St 27/09/2021
				// var pesan = (name == 'is_vida') ? 'Vida' : (name == 'is_ciputrafest40') ? 'Ciputra Fest 40' : 'Blokir Purchaseletter';
				var pesan = (name == 'is_vida') ? 'Vida' : (name == 'is_disc_karyawan') ? 'Discount Karyawan': 'Ciputra Fest 40';

				Ext.MessageBox.show({
					title   : pesan,
					msg     : 'Are you sure you want to proceed?',
					buttons : Ext.MessageBox.OKCANCEL,
					icon    : Ext.MessageBox.WARNING,
					fn      : function (btn) {
						if (btn == 'ok') {
							p.setLoading("Please wait");
							me.tools.ajax({
								params  : { id: purchaseletter_id, collumn: name, value: val },
								success : function (data) { p.setLoading(false); }
							}).read('inlineEdit');
						} 
						else {
							var chk = val > 0 ? false : true;
							y.prop("checked", chk);
						}
					}
				});
			} 
			else if(name == 'is_blokir'){
				if(val == 1){
					me.showAlasanBlokir(y); // added by rico 02012023
				}
				else{
					Ext.MessageBox.show({
						title   : 'Blokir Purchaseletter',
						msg     : 'Are you sure you want to proceed?',
						buttons : Ext.MessageBox.OKCANCEL,
						icon    : Ext.MessageBox.WARNING,
						fn      : function (btn) {
							if (btn == 'ok') {
								p.setLoading("Please wait");
								me.tools.ajax({
									params  : { id: purchaseletter_id, collumn: name, value: val },
									success : function (data) { p.setLoading(false); }
								}).read('inlineEdit');
							} 
							else {
								var chk = val > 0 ? false : true;
								y.prop("checked", chk);
							}
						}
					});
				}
			} 
			else {
				if (name == 'is_nonppn') {
					var chk = val > 0 ? false : true;

					me.getGrid().setLoading('Please wait...');
					var rec = me.getGrid().getSelectedRecord();
					var validate_closing = me.validateClosing(rec.get("purchase_date"));
					var dataValidate = validate_closing.data.others[0][0].VALIDASITGLCLOSING;
					me.getGrid().setLoading(false);

					if(!dataValidate.HASIL){
						me.tools.alert.warning(dataValidate.MSG_PPNDTP);
						y.prop("checked", chk);
					}
					else{
						me.tools.ajax({
							params  : { purchaseletter_id: purchaseletter_id },
							success : function (data, model) {
								if (!chk && data['jumlah'] == 0) {
									Ext.MessageBox.show({
										title   : 'Insentif Pajak',
										msg     : 'Purchaseletter tidak ada schedule PPNDTP, mohon reschedule terlebih dahulu',
										buttons : Ext.MessageBox.OK,
										icon    : Ext.MessageBox.ERROR
									});
									y.prop("checked", chk);
								} else {
									Ext.MessageBox.show({
										title   : 'Insentif Pajak',
										msg     : 'Are you sure you want to proceed?',
										buttons : Ext.MessageBox.OKCANCEL,
										icon    : Ext.MessageBox.WARNING,
										fn      : function (btn) {
											if (btn == 'ok') {
												p.setLoading("Please wait");
												me.tools.ajax({
													params  : { id : purchaseletter_id, collumn : name, value: val },
													success : function (data) {
														p.setLoading(false);
													}
												}).read('inlineEdit');
											} 
											else {
												y.prop("checked", chk);
											}
										}
									});
								}
							}
						}).read('ceknonppn');
					}
				} 
				else {
					Ext.MessageBox.show({
						title   : '',
						msg     : 'Are you sure you want to proceed?',
						buttons : Ext.MessageBox.OKCANCEL,
						icon    : Ext.MessageBox.WARNING,
						fn      : function (btn) {
							if (btn == 'ok') {
								p.setLoading("Please wait");
								me.tools.ajax({
									params  : { id : purchaseletter_id, collumn : name, value : val },
									success : function (data) {
										p.setLoading(false);
									}
								}).read('inlineEdit');
							} 
							else {
								var chk = val > 0 ? false : true;
								y.prop("checked", chk);
							}
						}
					});
				}
			}
		});
	}, 
	jqueryBinding2 : function () {
		var me = this;
		//inlineEdit
		me.checkboxInlineEdit2('is_use');
	},
	checkboxInlineEdit2 : function (name) {
		var me = this;
		$("input[name='" + name + "']").change(function (event) {
			var val  = $(this).is(":checked") ? 1 : 0;
			var y    = $(this);
			var data = $(this).attr('data');


			if(name == 'is_use'){
				var grid = me.getJenisbiayagrid();
				grid.getStore().each(function (recod) {
					if(recod.data.biaya_purchaseletter_id == data){
						recod.beginEdit();
						recod.set({is_use : val});
						recod.endEdit();
					}
				});
			}

			console.log(me.getJenisbiayagrid().getStore());
		});
	},
	showAlasanBlokir: function (checkkbox = ''){ // added by rico 02012023
		var me  				= this;
		var val 				= checkkbox.is(":checked") ? 1 : 0;
		var purchaseletter_id 	= checkkbox.attr('data');
		var grid 				= me.getGrid().getSelectionModel().getSelection();

		Ext.create('Ext.window.Window', {
			id: 'alasanBlokirWindow',
			title: 'Blokir Purchaseletter',
			height: 150,
			width: 500,
			layout: 'hbox',
			padding: '10px',
			modal: true,
			items: {
				xtype 			 : 'textareafield',
				fieldLabel 		 : 'Alasan',
				anchor 			 : '-5',
				name 			 : 'alasan_blokir',
				flex			 : 1,
				allowBlank       : false,
				enforceMaxLength : true,
				maxLength 		 : 500,
				maskRe 			 : /[A-Za-z0-9\@\.\,\_\/\-\s]/,
			},
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					ui: 'footer',
					layout: {
						type: 'hbox'
					},
					items: [
						{
							xtype: 'button',
							padding: 5,
							width: 75,
							iconCls: 'icon-save',
							text: 'Save',
							handler: function () {
								var alasan = this.up('window').items.items[0].value;

								if (!alasan) {
									Ext.Msg.show({
										title: 'Alert',
										msg: 'Alasan Blokir is required',
										icon: Ext.Msg.WARNING,
										buttons: Ext.Msg.OK
									});
								} else {
									me.dataSaveAlasan(purchaseletter_id, alasan, val);
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
			],
			listeners:{
				close: function(){
					var chk = val > 0 ? false : true;
					checkkbox.prop("checked", chk);
				}
			}
		}).show();

		Ext.ComponentQuery.query('#alasanBlokirWindow')[0].down("[name=alasan_blokir]").setValue(grid[0].data.alasan_blokir);
	},
	dataSaveAlasan: function (purchaseletter_id, alasan = '', blokir){ // added by rico 02012023
		var me 		= this;
		var grid 	= me.getGrid();
		var store 	= grid.getStore();

		me.tools.ajax({
			params  : { id: purchaseletter_id, value: alasan, blokir: blokir },
			success : function (data) { 
				Ext.MessageBox.show({
					title   : 'Success',
					msg     : 'Berhasil memblokir purchaseletter.',
					buttons : Ext.MessageBox.OK,
					icon    : Ext.MessageBox.INFO
				});
				Ext.ComponentQuery.query('#alasanBlokirWindow')[0].close();

				store.reload();
			}
		}).read('saveAlasan');
	},
	//endedited
	//edited by Hadi 21082019
	gridSelectionChange: function () {
		var me = this, 
			grid        		 = me.getGrid(), 
			row         		 = grid.getSelectionModel().getSelection(),
			edit        		 = grid.down('#btnEdit'),
			editDraft   		 = grid.down('#btnEditdraft'),
			deleteb     		 = grid.down('#btnDelete'),
			deleteDraft 		 = grid.down('#btnDeletedraft'),
			rescheduleMainGrid 	 = grid.down('#rescheduleMainGrid'),
			hargaNettoKomisiGrid = grid.down('#hargaNettoKomisiGrid'),
			is_draft    = 0;

		if (typeof row[0] !== 'undefined') {
			is_draft = row[0].data.is_draft;
		}

		if (rescheduleMainGrid !== null && is_draft == 0) {
			rescheduleMainGrid.setDisabled(row.length != 1);			
		}

		if (me.setParamPL.hargaNettoKomisi !== 0 && is_draft == 0) {
			hargaNettoKomisiGrid.setDisabled(row.length != 1);			
		}
		
		if (edit !== null) {
			if (is_draft && me.setParamPL.checkCanSPTDraft) {
				edit.setVisible(false);
				editDraft.setVisible(true);
				editDraft.setDisabled(row.length != 1);
			}
			else {
				editDraft.setVisible(false);
				edit.setVisible(true);
				edit.setDisabled(row.length != 1);
			}
		}
		if (deleteb !== null) {
			// deleteb.setDisabled(row.length < 1);
			if (is_draft && me.setParamPL.checkCanSPTDraft) {
				deleteb.setVisible(false);
				deleteDraft.setVisible(true);
				deleteDraft.setDisabled(row.length < 1);
			}
			else {
				deleteDraft.setVisible(false);
				deleteb.setVisible(true);
				deleteb.setDisabled(row.length < 1);
			}
		}

		grid.down('#survey').setDisabled(true);
		grid.down('#btnSurvey').setDisabled(true);
		grid.down('#tahan_batal').setDisabled(true);
		/// add by Erwin.st 04112021
		grid.down('#printout').setDisabled(true);
		grid.down('#btnPrintPaySch').setDisabled(true);
		/// add by Erwin.st 12122022
		grid.down('#printoutdraftspt').setDisabled(true);
		grid.down('#btnRegenerateva').setDisabled(true);

		if (row.length == 1) {
			if(is_draft){
				grid.down('#printoutdraftspt').setDisabled(false);	
				grid.down('#btnPrintPaySch').setDisabled(false); // added by rico 19122022
			}else{
				grid.down('#btnSurvey').setDisabled(false);

				if (grid.down('#tahan_batal').isVisible()) {
					grid.down('#tahan_batal').setDisabled(false);
				}
				/// add by Erwin.st 04112021
				grid.down('#printout').setDisabled(false);
				grid.down('#btnPrintPaySch').setDisabled(false);

				// added by rico 17012022
				grid.down('#survey').setDisabled(false);
			}
			grid.down('#btnRegenerateva').setDisabled(false);
		}
	},
	formDataAfterRender : function (el) {
		var me          = this;
		var state       = el.up('window').state;
		var state2      = el.up('window').state2;
		me.storeProcess = me.createSpProcessObj(me.storeProcess);
		me.fdar().init(state);

		me.loadComboBoxStore(el);

		me.setParamPL.pricelist           = null;
		me.setParamPL.pricelist_koefisien = null;

		me.getFormdata().down('#promo').setVisible(me.setParamPL.visible_promo); // added by rico 16022023
		me.getFormdata().down('#jenisbiayaPanelID').setVisible(me.setParamPL.useJenisBiayaPurchaseletter);

		if (state == 'create') {
			me.fdar().create(state, state2);
			if (state2 == 'table_stock') {
				var unitId = el.up('window').unit_id;
				me.unitSelectviaApli(unitId);
			}
		}
		else if (state == 'update') {
			me.fdar().update();
		}
		else {
			me.fdar().editdraftFunction();
		}
	},
	unitSelectviaApliDraft : function (unitId) {
		var me = this;

		me.setParamPL.calculator.paramPricelist = {};
		me.setParamPL.calculator.editedFields = [];

		//START: CHECK UNIT
		//by: David 18/8/17
		//check unit available not in booking state
		me.getFormdata().setLoading("Please wait... Loading Unit Draft");
		me.tools.interAjax({
			params  : { unitId : unitId },
			success : function (data) {
				if (data.length !== undefined) {
					var f = me.getFormdata();
					
					me.localStore.price = me.instantStore({
						id          : me.controllerName + 'UnitPriceStore',
						extraParams : { mode_read : 'price' },
						idProperty  : 'price_id'
					});

					me.localStore.price.load({
						params   : { unit_id : unitId },
						callback : function (rec, op) {
							var f = me.getFormdata();
							me.attachModel(op, me.localStore.price, true);
							f.down("[name=pricetype_pricetype_id]").setDisabled(false);
						}
					});

					// added 2 February 2017
					me.setParamPL.verifikasiDiskonInfo = null;
					if (me.setParamPL.globalParams) {
						var gp = me.setParamPL.globalParams;

						me.tools.ajax({
							params  : { unit_id : unitId },
							success : function (avdata, avmodel) {
								if (avdata.others[0][0]['DISCOUNT_VERIFIED']) {
									me.setParamPL.verifikasiDiskonInfo = avdata.others[0][0]['DATA'];
								}

								me.discountInput().enable({
									globalParams : gp,
									isReadOnly   : !avdata.others[0][0]['DISCOUNT_VERIFIED']
								});
							}
						}).read('cekapprovalverification');
					}

					$.ajax({
						method : "POST",
						url    : "erems/purchaseletter/read/",
						data   : { mode_read: "unitdetail", unit_id: unitId }
					}).done(function (msg) {
						var unitInfo = msg.data.others[0][0]["DETAIL"][1][0];
						f.down("[name=unit_unit_id]").setValue(unitInfo.unit_id);
						f.down("[name=unitstatus_status]").setValue(unitInfo.unitstatus_status);
						f.down("[name=unit_progress]").setValue(unitInfo.progress);
						f.down("[name=cluster_code]").setValue(unitInfo.cluster_code);
						f.down("[name=cluster_cluster]").setValue(unitInfo.cluster_cluster);
						f.down("[name=block_code]").setValue(unitInfo.block_code);
						f.down("[name=block_block]").setValue(unitInfo.block_block);
						f.down("[name=productcategory_productcategory]").setValue(unitInfo.productcategory_productcategory);
						f.down("[name=type_name]").setValue(unitInfo.type_name);
						f.down("[name=unit_land_size]").setValue(unitInfo.land_size);
						f.down("[name=unit_long]").setValue(unitInfo.long);
						f.down("[name=unit_building_size]").setValue(unitInfo.building_size);
						f.down("[name=unit_width]").setValue(unitInfo.width);
						f.down("[name=unit_kelebihan]").setValue(unitInfo.kelebihan);
						f.down("[name=unit_floor]").setValue(unitInfo.floor);
						f.down("[name=unit_unit_number]").setValue(unitInfo.unit_number);
						
						/*Add by RH 20220811*/
						f.down("[name=unit_floor_size]").setValue(unitInfo.floor_size);
						if (unitInfo.purpose === 'APARTEMEN' || unitInfo.purpose === 'APARTMENT' || unitInfo.purpose.includes('OFFICE') || unitInfo.purpose.includes('SOHO')) {
							f.down("[name=unit_building_size]").setFieldLabel('SGA Size');
							f.down("[name=unit_floor_size]").setFieldLabel('Netto Size');
							f.down("[name=unit_land_size]").setReadOnly(true);
							f.down("[name=unit_land_size]").setValue(0);
						} else {
							f.down("[name=unit_building_size]").setFieldLabel('Building Size');
							f.down("[name=unit_floor_size]").setFieldLabel('Floor Size');
							f.down("[name=unit_land_size]").setReadOnly(false);
						}

						me.getFormdata().setLoading(false);
					});
				}
			}
		}).read('reservation', 'checkAvailableUnit'); //controller name, action
	},
	//// Erwin 10082020
	checkCustomer : function () {
		var me = this;

		if(me.setParamPL.flagFromprintout == 'grid'){
			var f           = me.getGrid();
			var customer_id = me.getGrid().getSelectedRecord().get('customer_customer_id');
		}
		else{
			var f           = me.getFormdata();
			var customer_id = f.down("[name=customer_customer_id]").getValue();
		}

		f.setLoading("Sedang cek data customer...");

		var result = Ext.Ajax.request({
			url     : 'erems/purchaseletter/read',
			method  : 'POST',
			timeout : 45000000,
			async   : false,
			params  : {
				customer_id : customer_id,
				mode_read   : 'customerdetail',
				page        : 1,
				limit       : 1,
				start       : 0
			}
		}).responseText;

		var notif = 'Data customer tidak ditemukan.';
		if (result.length > 0) {
			result = Ext.JSON.decode(result);

			var warning = new Array;
			if (result.KTP_number == null || result.KTP_number == '') { warning.push('KTP Number'); }
			if (result.KTP_name == null || result.KTP_name == '') { warning.push('KTP Name'); }
			if (result.KTP_address == null || result.KTP_address == '') { warning.push('KTP Address'); }
			if (result.birthdate == null || result.birthdate == '') { warning.push('Birthdate'); }
			if (result.mobile_phone == null || result.mobile_phone == '') { warning.push('Mobile Phone'); }
			if (result.email == null || result.email == '') { warning.push('email'); }
			if (result.emergency_name == null || result.emergency_name == '') { warning.push('Emergency Name'); }
			if (result.emergency_mobilephone == null || result.emergency_mobilephone == '') { warning.push('Emergency Mobile Phone'); }
			if (result.emergency_address == null || result.emergency_address == '') { warning.push('Emergency Address'); }
			if (result.NPWP == null || result.NPWP == '') { warning.push('NPWP'); }

			notif = '';
			if (warning.length > 0) {
				notif = 'Data customer [ ' + warning.join(', ') + ' ] belum terisi. Silahkan lengkapi data tersebut sebelum melanjutkan proses ini.';
			}
		}

		f.setLoading(false);

		var boolean = true;
		if (notif != '') {
			boolean = false;
			me.tools.alert.warning(notif);
		}

		return boolean;
	}, 
	checkPaymentDraft : function () {
		var me        = this;
		var grid      = me.getGrid();
		var row       = grid.getSelectionModel().getSelection();
		var idDeleted = '';
		var boolean   = false;

		if (row.length > 1) {
			for (var i = 0; i < row.length; i++) {
				idDeleted += row[i].get('purchaseletter_id') + '~';
			}
			idDeleted = idDeleted.slice(0, -1);
		}
		else {
			if(typeof row[0] != 'undefined'){
				idDeleted = row[0].get('purchaseletter_id')
			}
		}

		var result = Ext.Ajax.request({
			url     : 'erems/purchaseletter/read',
			method  : 'POST',
			timeout : 45000000,
			async   : false,
			params  : {
				idDeleted : idDeleted,
				mode_read : 'checkpaymentdraft',
				page      : 1,
				limit     : 1,
				start     : 0
			}
		}).responseText;

		if (result.length > 0) {
			result = Ext.JSON.decode(result);
			if (result) {
				boolean = true;
			}
		}
		return boolean;
	}, 
	dataDestroyDraft : function () {
		var me              = this;
		var grid            = me.getGrid();
		var row             = grid.getSelectionModel().getSelection();
		var idDeleted       = '';
		var recordcounttext = row.length + ' record' + (row.length > 1 ? 's' : '');
		var store           = grid.getStore();

		grid.setLoading("Please wait...");

		if (me.checkPaymentDraft() == false) {
			me.tools.alert.warning('Ada schedule yang sudah terbayar');
			grid.setLoading(false);
			return false;
		}

		//NUP GROUP
		if (row.length == 1) {
			selectedRecord = '[' + row[0].get('unit_unit_number') + ']';
			confirmmsg     = 'Delete ' + selectedRecord + ' ?';
			failmsg        = 'Error: Unable to delete ' + selectedRecord + '.';
			idDeleted      = row[0].get('purchaseletter_id');
		} 
		else {
			confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
			failmsg    = 'Error: Unable to delete data.';
			for (var i = 0; i < row.length; i++) {
				idDeleted += row[i].get('purchaseletter_id') + '~';
			}
			idDeleted = idDeleted.slice(0, -1);
		}

		Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
			if (btn == 'yes') {
				var result = Ext.Ajax.request({
					url     : 'erems/purchaseletter/read',
					method  : 'POST',
					timeout : 45000000,
					async   : false,
					params  : {
						idDeleted : idDeleted,
						mode_read : 'deletedraft'
					}
				}).responseText;

				if (result.length > 0) {
					result = Ext.JSON.decode(result);
					if (result) {
						store.reload();
						Ext.Msg.show({
							title   : 'Success',
							msg     : (row.length == 1 ? selectedRecord : (recordcounttext != row.length ? recordcounttext + ' of ' : '') + recordcounttext) + ' deleted successfully.',
							icon    : Ext.Msg.INFO,
							buttons : Ext.Msg.OK
						});
					}
					else {
						store.reload();
						Ext.Msg.show({
							title   : 'Failure',
							msg     : failmsg + ' The data may have been used.',
							icon    : Ext.Msg.ERROR,
							buttons : Ext.Msg.OK
						});
					}
				}
			}
			grid.setLoading(false);
		});
	},
	detailMoreCustomer : {
		that            : this,
		editingIndexRow : 0,
		delete          : function () {
			var grid = this.getMorecustomergrid();
			var row  = grid.getSelectionModel().getSelection();
			if (row.length > 0) {
				var record 	  = grid.getStore().getAt(this.detailMoreCustomer.editingIndexRow);

				var tempPorsi           = parseFloat(accounting.unformat(record.get('customer_porsi_kepemilikan_customer')));
				var porsi_kepemilikan_1 = parseFloat(accounting.unformat(this.getFormdata().down('[name=porsi_kepemilikan_customer]').getValue()));
				this.getFormdata().down('[name=porsi_kepemilikan_customer]').setValue(accounting.formatMoney(porsi_kepemilikan_1+tempPorsi));

				record.set("deleted", true);
				grid.getStore().filterBy(function (recod) {
					return recod.data.deleted == false;
				});

				var cActive = 0;
				grid.getStore().each(function (recod) {
					if(recod.data.deleted == false){
						cActive++;
					}
				});

				if(cActive == 0){
					this.getFormdata().down('[name=tanggal_surat_kepemilikan_bersama]').setValue('');
					this.setterReadonly(this.getFormdata(), ['tanggal_surat_kepemilikan_bersama'], true);
				}
			} 
			else {
				Ext.Msg.alert("Alert", "Please select data");
			}
		},
		save : function () {
			var me      = this;
			var form    = me.getFormdatamorecustomer().getForm();
			var formVal = form.getValues();

			if (form.isValid()) {
				var win     = me.getFormdatamorecustomer().up('window');
				var dStore  = me.getMorecustomergrid().getStore();

				var tempPorsi = 0;
				if (win.state == 'update') {
					if(dStore.getCount() > 0){
						var recTemp = dStore.getAt(me.detailMoreCustomer.editingIndexRow);
						tempPorsi = parseFloat(accounting.unformat(recTemp.get('customer_porsi_kepemilikan_customer')));
					}
				}

				var valPorsi            = parseFloat(accounting.unformat(me.getFormdatamorecustomer().down('[name=customer_porsi_kepemilikan_customer]').getValue()));
				var porsi_kepemilikan_1 = parseFloat(accounting.unformat(me.getFormdata().down('[name=porsi_kepemilikan_customer]').getValue())) + tempPorsi; 

				if(valPorsi == 0){
					Ext.Msg.alert("Alert", "Porsi kepemilikan harus lebih dari 0.");
					return false;
				}
				else if(valPorsi >= porsi_kepemilikan_1){
					Ext.Msg.alert("Alert", "Porsi kepemilikan harus kurang dari sisa porsi kepemilikan customer utama (" + accounting.formatMoney(porsi_kepemilikan_1) + "%).");
					return false;
				}

				me.getFormdata().down('[name=porsi_kepemilikan_customer]').setValue(accounting.formatMoney(porsi_kepemilikan_1-valPorsi));		


				var val = {
					customer_id                         : formVal.customer_customer_id,
					customer_name                       : formVal.customer_name,
					customer_address                    : formVal.customer_address,
					customer_city_id                    : formVal.city_city_name,
					customer_zipcode                    : formVal.customer_zipcode,
					customer_officephone                : formVal.customer_office_phone,
					customer_fax                        : formVal.customer_fax,
					customer_npwp_address               : formVal.customer_NPWP_address,
					customer_ktp                        : formVal.customer_KTP_number,
					customer_ktp_address                : formVal.customer_KTP_address,
					customer_npwp                       : formVal.customer_NPWP,
					customer_homephone                  : formVal.customer_home_phone,
					customer_mobilephone                : formVal.customer_mobile_phone,
					customer_email                      : formVal.customer_email,
					customer_npwp_name                  : formVal.customer_NPWP_name,
					customer_porsi_kepemilikan_customer : formVal.customer_porsi_kepemilikan_customer,
				};

				if (win.state == 'create') {
					dStore.add(val);
				} 
				else {
					var rec = dStore.getAt(me.detailMoreCustomer.editingIndexRow);
					rec.beginEdit();
					rec.set(val);
					rec.endEdit();
				}
				win.close();

				me.setterReadonly(me.getFormdata(), ['tanggal_surat_kepemilikan_bersama'], false);
			}
		}
	},
	//addby anas 05012021
	mainPanelBeforeRender : function (el) {
		var me = this;
		
		var grid = me.getGrid()
		grid.down('#btnSurvey').setVisible(false);

		me.setParamPL.prolibs = null;

		me.tools.ajax({
			params  : {},
			success : function (data, model) {
				var prolibsFile = data['others'][0][0]['PROLIBFILE'];
				
				me.setParamPL.calculatorJs                        = data['others'][0][0]['CALCULATORJS'];
				me.setParamPL.purchaseletterJs                    = data['others'][0][0]['PURCHASELETTERJS'];
				me.setParamPL.isRSCHApproveUser                   = data['others'][0][0]['RESCHEDULEAPPROVEUSER'];
				me.setParamPL.groupuser                           = data['others'][0][0]['GROUPUSER'];
				me.setParamPL.param_generate_notes                = data['others'][0][0]['PARAM_GENERATE_NOTES'];
				me.setParamPL.checkDataCustomer                   = data['others'][0][0]['checkDataCustomer'] == 1 ? true : false;
				me.setParamPL.checkCanSPTDraft                    = data['others'][0][0]['checkCanSPTDraft'];
				me.setParamPL.userkpraccdate                      = data['others'][0][0]['userkpraccdate'];
				me.setParamPL.surveyConfig                        = data['others'][0][0]['surveyConfig'];
				me.setParamPL.verification_approval               = data['others'][0][0]['verification_approval'];
				me.setParamPL.visible_insentif_pajak              = data['others'][0][0]['visibleInsentifPajak'] == 1 ? true : false;
				me.setParamPL.visibleTahanBatal                   = data['others'][0][0]['visibleTahanBatal'];
				me.setParamPL.getPurcheletterSendWaActive         = data['others'][0][0]['getPurcheletterSendWa']['active'];
				me.setParamPL.getPurcheletterSendWaPhone          = data['others'][0][0]['getPurcheletterSendWa']['phone'];
				me.setParamPL.getPurcheletterSendWaText           = data['others'][0][0]['getPurcheletterSendWaText'];
				me.setParamPL.printoutsptmrt                      = data['others'][0][0]['printoutsptmrt'];
				me.setParamPL.visible_vida                        = data['others'][0][0]['visibleVida'] == 1 ? true : false;
				me.setParamPL.visible_fest40                      = data['others'][0][0]['visibleFest40'] == 1 ? true : false;
				me.setParamPL.activePricesource                   = data['others'][0][0]['activePricesource'];
				me.setParamPL.typeCalculaterounding               = data['others'][0][0]['typeCalculaterounding'];
				me.setParamPL.visible_extend_schedule             = data['others'][0][0]['visibleExtendSchedule'] == 1 ? true : false;/// Added Rico 07122021
				me.setParamPL.getPurcheletterSurveyOnlineText     = data['others'][0][0]['getPurcheletterSurveyOnline']['text']; // added by rico 17012022
				me.setParamPL.getPurcheletterSurveyOnlineLink     = data['others'][0][0]['getPurcheletterSurveyOnline']['link']; // added by rico 17012022
				me.setParamPL.rencanaST_enddate                   = data['others'][0][0]['rencanaST_enddate']; // added by rico 17012022
				me.setParamPL.hargaNettoKomisi                    = data['others'][0][0]['hargaNettoKomisi']; // added by rico 09032022
				me.setParamPL.ShowMoreCustomerOnGrid              = data['others'][0][0]['ShowMoreCustomerOnGrid']; // added by erwin.st 27072022
				me.setParamPL.ppn_value                           = data['others'][0][0]['ppn_value']; // added by erwin.st 27072022
				me.setParamPL.visible_blokir                      = data['others'][0][0]['visibleBlokir'] == 1 ? true : false; // added by rico 28112022
				me.setParamPL.visible_disc_karyawan               = data['others'][0][0]['visibleDiscKaryawan'] == 1 ? true : false; // added by rico 19012023
				me.setParamPL.visible_promo                       = data['others'][0][0]['showPromoPurchaseletter'] == 1 ? true : false; // added by rico 19012023
				me.setParamPL.useJenisBiayaPurchaseletter         = data['others'][0][0]['useJenisBiayaPurchaseletter'];
				me.setParamPL.purchaseletterRencanaSerahTerimaNew = data['others'][0][0]['purchaseletterRencanaSerahTerimaNew'];
				me.setParamPL.showKuasaCustomerPurchaseletter     = data['others'][0][0]['showKuasaCustomerPurchaseletter'];
				me.setParamPL.disablePromoPurchaseletter          = data['others'][0][0]['disablePromoPurchaseletter'];
				// me.setParamPL.filePaymentScheme               = data['others'][0][0]['filePaymentScheme']; // added by erwin.st 20042022
				me.reportFileView = data['others'][0][0]['filePaymentScheme']; // added by erwin.st 20042022

				var search = me.getFormsearch();
				if (me.setParamPL.groupuser == 'NUP GROUP') {
					search.down('#btnCheckDraft').setValue(true);
					search.down('#btnCheckDraft').setReadOnly(true);

					grid = me.getGrid();
					grid.setLoading('refresh grid');
					me.dataSearch();
					grid.setLoading(false);
				}

				var errorFile = "";
				if (prolibsFile) {
					Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/Prolibs.js?_dc=' + Ext.Date.now(), function () {
						Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/' + prolibsFile + '.js?_dc=' + Ext.Date.now(), function () {
							me.setParamPL.prolibs     = window[prolibsFile];
							me.setParamPL.prolibsFile = prolibsFile;
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

				if (!me.setParamPL.calculatorJs) {
					errorFile += "[JSERR02] File kalkulasi harga untuk purchaseletter tidak ditemukan.";
				}

				if (!me.setParamPL.purchaseletterJs) {
					errorFile += "[JSERR03] File purchaseletter tidak ditemukan.";
				}

				if (errorFile.length > 0) {
					me.tools.alert.error(errorFile);
				}

				if (me.setParamPL.surveyConfig == 1){ //menampilkan btnSurvey jika return 1
					grid.down('#btnSurvey').setVisible(true);
					grid.down('#nilai_survey').setVisible(true);
					grid.down('#nilai_survey_nps').setVisible(true);
				}

				/// Add by Erwin 10/03/2021
				grid.down('#is_nonppn').setVisible(me.setParamPL.visible_insentif_pajak);

				////// add by Erwin 04/06/2021
				grid.down('#tahan_batal').setVisible(me.setParamPL.visibleTahanBatal);

				/// Add by erwin 27/09/2021
				grid.down('#is_vida').setVisible(me.setParamPL.visible_vida);
				grid.down('#colms_price_source_name').setVisible(me.setParamPL.activePricesource);
				search.down('#btnPriceSource').setVisible(me.setParamPL.activePricesource);
				grid.down('#is_ciputrafest40').setVisible(me.setParamPL.visible_fest40);
				grid.down('#td_more_customer').setVisible(me.setParamPL.ShowMoreCustomerOnGrid);

				grid.down('#is_blokir').setVisible(me.setParamPL.visible_blokir); // added by rico 28112022
				
				grid.down('#is_disc_karyawan').setVisible(me.setParamPL.visible_disc_karyawan); // added by rico 28112022
				
				// added by rico 09032022
				var boolHargaNetto = (me.setParamPL.hargaNettoKomisi == 1) ? true: false;
				grid.down('#hargaNettoKomisiGrid').setVisible(boolHargaNetto);
			}
		}).read('othersconfig'); // purchaselettercontroller func othersconfigRead
	},
	//addby anas 05012021
	formDataSurveyAfterRender : function (el) {
		var me   = this;
		var grid = me.getGrid();
		var row  = grid.getSelectionModel().getSelection();

		var purchaseletter_id = row[0].data.purchaseletter_id;
		var nilai_survey      = row[0].data.nilai_survey;
		var nilai_survey_nps  = row[0].data.nilai_survey_nps;

		me.getFormdatasurvey().down("[name=purchaseletter_id]").setValue(purchaseletter_id);
		me.getFormdatasurvey().down("[name=nilai_survey]").setValue(nilai_survey);
		me.getFormdatasurvey().down("[name=nilai_survey_nps]").setValue(nilai_survey_nps);
	},
	//addby anas 05012021
	detailFormSurvey : {
		that            : this,
		editingIndexRow : 0,
		save            : function () {
			var me   = this;
			var form = me.getFormdatasurvey().getForm();

			if (form.isValid()) {
				var fields = me.getFormdatasurvey().getValues();

				resetTimer();
				me.getFormdatasurvey().up('window').body.mask('Saving, please wait ...');

				Ext.Ajax.request({
					url: 'erems/purchaseletter/read',
					params: {
						purchaseletter_id : fields.purchaseletter_id,
						nilai_survey      : fields.nilai_survey,
						nilai_survey_nps  : fields.nilai_survey_nps,
						modiby            : apps.uid,
						mode_read         : 'survey'
					},
					success: function (response) {
						me.getFormdatasurvey().up('window').body.unmask();
						if (Ext.decode(response.responseText).success == true) {
							Ext.Msg.show({
								title   : 'Success',
								msg     : 'Data saved successfully.',
								icon    : Ext.Msg.INFO,
								buttons : Ext.Msg.OK,
								fn      : function () {
									me.getFormdatasurvey().up('window').close();
									var gridDepan  = me.getGrid();
									var storeDepan = gridDepan.getStore();
									storeDepan.reload();
								}
							});
						}
						else {
							Ext.Msg.show({
								title   : 'Failure',
								msg     : 'Error: Unable to save data.',
								icon    : Ext.Msg.ERROR,
								buttons : Ext.Msg.OK
							});
						}
					},
				});
			}
		}
	},
	cekApproval : function () {
		var me = this;
		if (me.rescheduleFrom == 'mainGrid'){
			purchaseletter_id = me.dataReschedule.get('purchaseletter_id');
		} else{
			purchaseletter_id = me.getFormdata().down("[name=purchaseletter_id]").getValue();
		}
		Ext.Ajax.request({
			url: 'erems/purchaseletter/read',
			params: {
				purchaseletter_id: purchaseletter_id,
				mode_read: 'voucherPending'
			},
			success: function (vcrpend) {
				var vcrchk = JSON.parse(vcrpend.responseText)
				if (vcrchk.jumlah_voucher > 0) {
					me.tools.alert.warning("Perubahan tidak dapat di lakukan karena ada voucher gantung, mohon di hapus / di realisasi terlebih dahulu.");
				} else {
					if (me.setParamPL.verification_approval) {
						Ext.Ajax.request({
							url: 'erems/purchaseletter/read',
							params: {
								purchaseletter_id: purchaseletter_id,
								verification_code: 'XX',
								mode_read: 'verificationapproval'
							},
							success: function (response) {
								var obj = JSON.parse(response.responseText)
								if (obj.totalRow > 0) {
									if (obj.data[0]['is_approve'] > 0) {
										me.showRescheduleList(purchaseletter_id)
										me.setParamPL.isUsedVerification = true
									} else {
										me.tools.alert.warning("Verifikasi Belum Diapprove.");
									}

								} else {
									me.tools.alert.warning("Verifikasi Persetujuan Belum Dibuat.");
								}
							}
						});
					} else {
						me.showRescheduleList(purchaseletter_id)
					}
				}
			}
		});
	},
	checkUMDate : function (el) {
		if (el.getValue() != "" && el.getValue() != 0 && el.getValue() != null) {
			var me      = this;
			var dateMin = Ext.Date.add(el.getValue(), Ext.Date.DAY, 14);

			Ext.Ajax.request({
				url    : 'erems/purchaseletter/read',
				params : {
					date_min  : Ext.Date.format(dateMin, 'd'),
					mode_read : 'schemeschedule'
				},
				success : function (response) {
					response = Ext.decode(response.responseText);

					var optionsx = [];
					if(response.total.length > 0){

						var tanggal_awal = new Date(Ext.Date.format(dateMin, 'Y-m') + '-' + response.data.tanggal_awal);
						var dateMax = Ext.Date.add(dateMin, Ext.Date.MONTH, response.data.flag_month);
						if (Ext.Date.format(dateMin, 'd') > 25) {
							tanggal_awal = new Date(Ext.Date.format(dateMax, 'Y-m') + '-' + response.data.tanggal_awal);
						}
						var tanggal_akhir = new Date(Ext.Date.format(dateMax, 'Y-m') + '-' + response.data.tanggal_akhir);

						optionsx.push({ date_value : tanggal_awal, date_display : Ext.Date.format(tanggal_awal, 'd-m-Y') });
						optionsx.push({ date_value : tanggal_akhir, date_display : Ext.Date.format(tanggal_akhir, 'd-m-Y') });
					}

					me.getFormdata().down("[name=um1_date]").setValue("");
					var newStore = Ext.create('Ext.data.Store', {
						fields : ['date_value', 'date_display'],
						data   : optionsx
					});
					me.getFormdata().down("[name=um1_date]").bindStore(newStore);
				},
			});
		}
	},
	ppndtpSelected : function (el) {
		var me          = this;
		var val         = el.getValue();
		var f           = me.getFormdata();
		var netto       = accounting.unformat(f.down("[name=price_harga_neto]").getValue());
		var ppntanah    = accounting.unformat(me.getFormdata().down("[name=price_harga_ppntanah]").getValue());
		var ppnbangunan = accounting.unformat(me.getFormdata().down("[name=price_harga_ppnbangunan]").getValue());
		var totalPPN    = 0;

		// if (netto <= 2000000000) {
			// totalPPN = parseInt(ppntanah) + parseInt(ppnbangunan);
		// } 
		// else if (netto <= 5000000000) {
			// totalPPN = (parseInt(ppntanah) + parseInt(ppnbangunan)) / 2;
		// }

		// if (netto > 5000000000 && val == 1) {
			// f.down("[name=is_ppndtp]").setValue(0);
			// Ext.Msg.alert("Alert", "Netto Lebih dari 5 Miliar");
			// return;
		// }

		var tj   = accounting.unformat(f.down("[name=billingrules_tandajadi]").getValue());
		var um   = accounting.unformat(f.down("[name=billingrules_uangmuka]").getValue());
		var sisa = accounting.unformat(f.down("[name=billingrules_angsuran]").getValue());
		var htj  = accounting.unformat(f.down("[name=harga_total_jual]").getValue());

		if (val) {
			if (netto <= 2000000000) {
				um = Math.round(um / 1.11);
			} 
			else if (netto <= 5000000000) {
				um = (parseInt(Math.round(um / 1.11)) + parseInt(totalPPN));
			}
			// f.down('[name=billingrules_uangmuka]').setValue(accounting.formatMoney(um));
		} 
		else {
			if (netto <= 2000000000) {
				um = Math.round(um * 1.11);
			} 
			else if (netto <= 5000000000) {
				um = (parseInt(Math.round((um - parseInt(totalPPN)) * 1.11)));
			}
		}
		// sisa = htj - um;
		// f.down('[name=billingrules_uangmuka]').setValue(accounting.formatMoney(um));
		// f.down('[name=billingrules_angsuran]').setValue(accounting.formatMoney(sisa));
	},
	////// add by Erwin 04/06/2021
	detailFormTahanBatal : {
		showFormData : function () {
			var me                = this;
			var grid              = me.getGrid();
			var row               = grid.getSelectionModel().getSelection();
			var purchaseletter_id = row[0].data.purchaseletter_id;

			me.detailTool_tahan_batal = new Erems.library.DetailtoolAll();
			me.detailTool_tahan_batal.setConfig({
				viewPanel        : 'FormDataTahanBatal',
				parentFDWindowId : me.getGrid().up('window').id,
				controllerName   : me.controllerName
			});

			grid.setLoading("Sedang Load Form Tahan Batal...");

			var result = Ext.Ajax.request({
				url     : 'erems/purchaseletter/read',
				method  : 'POST',
				timeout : 45000000,
				async   : false,
				params  : {
					purchaseletter_id : purchaseletter_id,
					mode_read         : 'tahanbataldetail',
					mode              : 'detail'
				}
			}).responseText;

			var is_tahanbatal = false, lama_tahanbatal = '', notes_tahanbatal = '', disabled = true;
			if (result.length > 0) {
				result = Ext.JSON.decode(result);
				if (result.success) {
					if (result.data.is_tahanbatal == 1) { is_tahanbatal = true; }
					if (result.data.lama_tahanbatal) { lama_tahanbatal = result.data.lama_tahanbatal; }
					if (result.data.notes_tahanbatal) { notes_tahanbatal = result.data.notes_tahanbatal; }
				}
			}

			if (is_tahanbatal) {
				disabled = false;
			}

			grid.setLoading(false);

			me.detailTool_tahan_batal.form().show('create', 400, 'Tahan Batal');

			me.getFormdatatahanbatal().down("[name=purchaseletter_id]").setValue(purchaseletter_id);
			me.getFormdatatahanbatal().down("[name=is_tahanbatal]").setValue(is_tahanbatal);
			me.getFormdatatahanbatal().down("[name=lama_tahanbatal]").setValue(lama_tahanbatal);
			me.getFormdatatahanbatal().down("[name=notes_tahanbatal]").setValue(notes_tahanbatal);

			me.getFormdatatahanbatal().down("[name=lama_tahanbatal]").setDisabled(disabled);
			me.getFormdatatahanbatal().down("[name=notes_tahanbatal]").setDisabled(disabled);
		},
		save : function () {
			var me = this;
			Ext.Msg.confirm('Save Data Tahan Batal', 'Are you sure want to the save data tahan batal.<br />Continue ?', function (btn) {
				if (btn == 'yes') {
					resetTimer();
					me.getFormdatatahanbatal().up('window').body.mask('Saving, please wait ...');
					Ext.Ajax.request({
						url    : 'erems/purchaseletter/read',
						params : {
							purchaseletter_id : me.getFormdatatahanbatal().down("[name=purchaseletter_id]").getValue(),
							is_tahanbatal     : me.getFormdatatahanbatal().down("[name=is_tahanbatal]").getValue(),
							lama_tahanbatal   : me.getFormdatatahanbatal().down("[name=lama_tahanbatal]").getValue(),
							notes_tahanbatal  : me.getFormdatatahanbatal().down("[name=notes_tahanbatal]").getValue(),
							mode_read         : 'tahanbataldetail',
							mode              : 'save'
						},
						success: function (response) {
							me.getFormdatatahanbatal().up('window').body.unmask();
							if (Ext.decode(response.responseText).success == true) {
								Ext.Msg.show({
									title   : 'Success',
									msg     : 'Data saved successfully.',
									icon    : Ext.Msg.INFO,
									buttons : Ext.Msg.OK,
									fn: function () {
										me.getFormdatatahanbatal().up('window').close();
										var gridDepan  = me.getGrid();
										var storeDepan = gridDepan.getStore();
										storeDepan.reload();
									}
								});
							}
							else {
								Ext.Msg.show({
									title   : 'Failure',
									msg     : 'Error: Unable to save data.',
									icon    : Ext.Msg.ERROR,
									buttons : Ext.Msg.OK
								});
							}
						},
					});
				}
			});
		},
		changeTahanBatal : function () {
			var me = this;

			if (me.getFormdatatahanbatal().down("[name=is_tahanbatal]").getValue()) {
				me.getFormdatatahanbatal().down("[name=lama_tahanbatal]").setDisabled(false);
				me.getFormdatatahanbatal().down("[name=notes_tahanbatal]").setDisabled(false);
			}
			else {
				Ext.Msg.confirm('Uncheck Data Tahan Batal', 'This action will delete fields [Lama and Notes Tahan Batal].<br />Continue ?', function (btn) {
					if (btn == 'yes') {
						me.getFormdatatahanbatal().down("[name=lama_tahanbatal]").setValue('');
						me.getFormdatatahanbatal().down("[name=notes_tahanbatal]").setValue('');

						me.getFormdatatahanbatal().down("[name=lama_tahanbatal]").setDisabled(true);
						me.getFormdatatahanbatal().down("[name=notes_tahanbatal]").setDisabled(true);
					}
					else {
						me.getFormdatatahanbatal().down("[name=is_tahanbatal]").setValue(true);
					}
				});
			}
		}
	},
	generateFakeForm2 : function (paramList, reportFile) {
		var form = '<form id="fakeReportFormID" action=resources/stimulsoftjsv3/viewer.php?reportfilelocation=' + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
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
	/// Add by Erwin.St 14/07/2021
	changePricesource : function(){
		var me = this,
			formData            = me.getFormdata(),
			scheduleGrid        = me.getSchedulegrid(),
			purchase_date       = formData.down('[name=purchase_date]').getValue(),
			price_source        = formData.down('[name=price_source]').getValue(),
			text_harga_bangunan = 'Harga Bangunan', 
			show                = false,
			readOnly            = false,
			resetField          = true,
			style               = 'background:#ffffff;',
			storePricelist      = new Array();

		me.setParamPL.calculator.editedFields = [];

		formData.setLoading("Please wait... Loading Data Information");

		setTimeout(function(){ 
			// $('input[name="price_harga_bangunan"]' ).removeClass('readonly');
			$('.kelebihantanahBox').show();

			if(price_source == 2){ // Pricelist
				if(me.setParamPL.pricelist){ ///// Filtering Pricelist by periode
					me.setParamPL.pricelist.filter(function (rec) {
						if(new Date(Ext.Date.format(purchase_date, 'Y-m-d')) >= new Date(rec.pricelist_date) && new Date(Ext.Date.format(purchase_date, 'Y-m-d')) <= new Date(rec.pricelist_end_date)){
							storePricelist.push(rec);
	                    }
					});
				}

				if(me.setParamPL.pricelist == null || storePricelist.length == 0){ //
					resetField = false;
					Ext.Msg.alert("Alert", "Tidak ada PriceList dalam unit " + formData.down('[name=unit_unit_number]').getValue());
					formData.down('[name=price_source]').setValue(1);

					//// Label bbn, bphtb, ajb
					formData.down("#labelbbn").setText("Biaya Balik Nama");
					formData.down("#labelbphtb").setText("Biaya perolehan hak");
					formData.down("#labelajb").setText("Biaya Akta Jual Beli");
					if (apps.subholdingId == 2) {
						formData.down("#labelbbn").setText("Biaya Balik Nama (TITIPAN)");
						formData.down("#labelbphtb").setText("Biaya perolehan hak (TITIPAN)");
						formData.down("#labelajb").setText("Biaya Akta Jual Beli (TITIPAN)");
					}
				}
				else{
					show                = true;
					readOnly            = true;
					text_harga_bangunan += ' /m2';
					style               = 'background:none !important; background-color:#F2F2F2 !important;';

					// $('input[name="price_harga_bangunan"]' ).addClass('readonly');
					$('.kelebihantanahBox').hide();

					//// Label bbn, bphtb, ajb
					formData.down("#labelbbn").setText("Biaya Balik Nama (TITIPAN)");
					formData.down("#labelbphtb").setText("Biaya perolehan hak (TITIPAN)");
					formData.down("#labelajb").setText("Biaya Akta Jual Beli (TITIPAN)");
				}
			}

			if(resetField){
				// reset field
				me.tools.resetPanel('priceInformationBoxId', me.getFormdata());
				me.tools.resetPanel('billingInformationBoxId', me.getFormdata());
				me.getSchedulegrid().getStore().loadData([], false);

				//// Set ulang nilai price source dan price type 
				formData.down('[name=price_source]').setValue(price_source);
				formData.down('[name=pricelist_id]').setValue('');
				formData.down('[name=pricelistdetail_koefisien_id]').setValue('');
				formData.down('[name=pricelistdetail_koefisien_id]').setVisible(false);
				formData.down('[name=pricetype_pricetype_id]').setValue('');
				formData.down("[name=kpp]").setVisible(false);
			}

			var newStorePricelist = Ext.create('Ext.data.Store', {
				fields : ['pricelist_id', 'keterangan'],
				data   : storePricelist
			});
			formData.down("[name=pricelist_id]").bindStore(newStorePricelist);

			formData.down('[name=pricelist_id]').setVisible(show);
			formData.down('#text_harga_bangunan').setText(text_harga_bangunan);
			formData.down('[name=price_bangunanpermeter]').setVisible(show);
			formData.down('#text_permeter_harga_bangunan').setVisible(show);
			// me.setterReadonly(formData, ['price_harga_bangunan'], show);
			scheduleGrid.down('#colms_persentase_npv').setVisible(show);

			var arrReadonly = ['bank_bank_id', 'billingrules_billingrules_id', 'billingrules_term_tandajadi', 'billingrules_tandajadi', 'billingrules_term_uangmuka', 'billingrules_uangmuka', 'billingrules_term_angsuran', 'billingrules_angsuran'];
			for (var x in arrReadonly) {
				me.setterReadonly(formData, [arrReadonly[x]], readOnly);
			}

			formData.setLoading(false);
		}, 200);
	},
	changePricelist : function(){
		var me 			 = this,
			formData     = me.getFormdata(),
			price_source = formData.down('[name=price_source]').getValue(),
			pricelist_id = formData.down('[name=pricelist_id]').getValue();

		me.setParamPL.calculator.editedFields = [];

		// reset field
		me.tools.resetPanel('priceInformationBoxId', me.getFormdata());
		me.tools.resetPanel('billingInformationBoxId', me.getFormdata());
		me.getSchedulegrid().getStore().loadData([], false);

		//// Set ulang nilai price source dan price type 
		formData.down('[name=price_source]').setValue(price_source);
		formData.down('[name=pricelist_id]').setValue(pricelist_id);
		formData.down('[name=pricetype_pricetype_id]').setValue('');

		me.loadPricelistkoefisien();
	},
	loadPricelistkoefisien : function(){
		var me = this,
			formData                = me.getFormdata(),
			price_source            = formData.down('[name=price_source]').getValue(),
			pricelist_id            = formData.down('[name=pricelist_id]').getValue(),
			pricetype_id            = formData.down('[name=pricetype_pricetype_id]').getValue(),
			show                    = false,
			storePricelistkoefisien = [],
			fieldPricelistkoefisien = {};

		if(price_source == 2 && pricetype_id != ''){ // pricelist
			show = true;

			var dataKoefisien = me.setParamPL.pricelist_koefisien;
			for (var koef in dataKoefisien) {
				if(dataKoefisien[koef].pricelist_id == pricelist_id && dataKoefisien[koef].pricetype_id == pricetype_id){
					storePricelistkoefisien.push(dataKoefisien[koef]);
					fieldPricelistkoefisien = Object.keys(dataKoefisien[koef]);
				}
			}
		}

		formData.down("[name=pricelistdetail_koefisien_id]").setValue("");
		var newStorePricelistkoefisien = Ext.create('Ext.data.Store', {
			fields : fieldPricelistkoefisien,
			data   : storePricelistkoefisien
		});
		formData.down("[name=pricelistdetail_koefisien_id]").bindStore(newStorePricelistkoefisien);
		formData.down('[name=pricelistdetail_koefisien_id]').setVisible(show);

		//////////////////////////////////////////////////////////////////////
		me.calculatorPrice('price_tanahpermeter');
		me.calculatorPrice('price_bangunanpermeter');
		me.calculatorPrice('price_persen_ppntanah');
		me.calculatorPrice('price_persen_ppnbangunan');
		me.calculatorPrice('price_persen_ppnbm');
		me.calculatorPrice('price_persen_pph22');
		me.calculatorPrice('harga_administrasi');
	},
	changePricelistdetailkoefisien : function(){
		var me = this,
			formData                       = me.getFormdata(),
			pricesourceField               = formData.down('[name=price_source]'),
			price_source                   = pricesourceField.getValue(),
			pricelistField                 = formData.down('[name=pricelist_id]'),
			pricelist_id                   = pricelistField.getValue(),
			pricetypeField                 = formData.down('[name=pricetype_pricetype_id]'),
			pricetype_id                   = pricetypeField.getValue(),
			pricelistdetail_koefisienField = formData.down('[name=pricelistdetail_koefisien_id]');
			pricelistdetail_koefisien_id   = pricelistdetail_koefisienField.getValue();

		me.setParamPL.calculator.paramPricelist = {};
		me.setParamPL.calculator.editedFields = [];

		formData.setLoading("Please wait... Loading Price Information");

		setTimeout(function(){ 
			if(price_source == 2 && pricelist_id != '' && pricelistdetail_koefisien_id != ''){
				var storeKoef      	   = formData.down("[name=pricelistdetail_koefisien_id]").getStore(),
					dataKoef           = storeKoef.getAt(0),
					rec                = dataKoef.data,
					harga_jual         = accounting.unformat(formData.down("[name=price_harga_jual]").getValue()),
					harga_netto        = accounting.unformat(formData.down("[name=price_harga_neto]").getValue()),
					building_size      = accounting.unformat(formData.down("[name=unit_building_size]").getValue());

				formData.down("[name=pricelistdetail_id]").setValue(rec.pricelistdetail_id);

				///// Set data dari koefisien pricelist
				formData.down("[name=price_tanahpermeter]").setValue(accounting.formatMoney(rec.harga_tanahpermeter, { precision : formData.down("[name=price_tanahpermeter]").getDecPrecision() }));
				formData.down("[name=price_bangunanpermeter]").setValue(accounting.formatMoney(rec.harga_bangunanpermeter));

				//////////////////////////////////////////////////////////////////////////////Hitung ulang PPN
				me.calculatorPrice('price_tanahpermeter');
				me.calculatorPrice('price_bangunanpermeter');
				me.calculatorPrice('price_persen_ppntanah');
				me.calculatorPrice('price_persen_ppnbangunan');
				me.calculatorPrice('price_persen_ppnbm');
				me.calculatorPrice('price_persen_pph22');
				//////////////////////////////////////////////////////////////////////////////

				me.setParamPL.calculator.paramPricelist = {
					bbn_nominal_persen          : rec.bbn_nominal_persen,
					biaya_bbn                   : rec.biaya_bbn,
					bphtb_nominal_persen        : rec.bphtb_nominal_persen,
					biaya_bphtb                 : rec.biaya_bphtb,
					ajb_nominal_persen          : rec.ajb_nominal_persen,
					biaya_ajb                   : rec.biaya_ajb,
					asuransi_nominal_persen     : rec.asuransi_nominal_persen,
					biaya_asuransi              : rec.biaya_asuransi,
					administrasi_nominal_persen : rec.administrasi_nominal_persen,
					biaya_administrasi          : rec.biaya_administrasi,
					admsubsidi_nominal_persen   : rec.admsubsidi_nominal_persen,
					biaya_admsubsidi            : rec.biaya_admsubsidi,
				};
			}

			me.calculatorPrice('harga_administrasi');

			formData.setLoading(false);
		}, 1000);
	},
	calculatorPrice : function(elName='harga_administrasi'){
		var me = this, 
			formData = me.getFormdata();
			price_type_id = formData.down("[name=pricetype_pricetype_id]").getValue();

		if (me.setParamPL.verifikasiDiskonInfo != null) {
			var vdi = me.setParamPL.verifikasiDiskonInfo;

			me.setParamPL.calculator.discount = {
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

			me.setParamPL.calculatorDiscount.typeCalculaterounding = me.setParamPL.typeCalculaterounding;
			me.setParamPL.calculatorDiscount.discount              = me.setParamPL.calculator.discount;
			me.setParamPL.calculatorDiscount.calculate();
		}

		me.setParamPL.processor.priceSourceid = formData.down("[name=price_source]").getValue();
		me.setParamPL.processor.priceTypeId   = price_type_id;
		me.setParamPL.processor.calculate();

		// trigger salah satu field
		me.setParamPL.calculator.priceSourceid         = formData.down("[name=price_source]").getValue(); /// Add by Erwin.St 30/07/2021
		me.setParamPL.calculator.typeCalculaterounding = me.setParamPL.typeCalculaterounding; /// Add by Erwin.St 09/12/2021
		me.setParamPL.calculator.calculate(formData.down("[name=" + elName + "]"));
	},
	generateSchedulekoefisiendetail : function(){
		var me = this,
			formData  = me.getFormdata(),
			storeKoef = formData.down("[name=pricelistdetail_koefisien_id]").getStore(),
			dataKoef  = storeKoef.getAt(0),
			rec       = dataKoef.data;

		if(formData.down("[name=pricelist_id]").getValue() == ''){
			Ext.Msg.alert("Alert", "Silahkan pilih pricelist dahulu.");
			return;
		}
		else if(formData.down("[name=pricetype_pricetype_id]").getValue() == ''){
			Ext.Msg.alert("Alert", "Silahkan pilih price type dahulu.");
			return;
		}
		else if(formData.down("[name=pricelistdetail_koefisien_id]").getValue() == ''){
			Ext.Msg.alert("Alert", "Silahkan pilih pricelist koefisien dahulu.");
			return;
		}
		else{
			formData.setLoading("Please wait... Loading Schedule Information");

			var result = Ext.Ajax.request({
				url     : 'erems/purchaseletter/read',
				method  : 'POST',
				timeout : 45000000,
				async   : false,
				params  : {
					unit_id      : formData.down("[name=unit_unit_id]").getValue(),
					pricelist_id : rec.pricelist_id,
					pricetype_id : rec.pricetype_id,
					koefisien_id : rec.koefisien_id,
					mode_read    : 'pricelistkoefisiendetail'
				},
			}).responseText;

			result = Ext.JSON.decode(result);

			setTimeout(function(){ 
				if(result.success){
					me.loadScheduleGrid(result.data);
				}
				else{
					Ext.Msg.alert("Alert", "Data koefisien detail tidak ada.");
				}
				formData.setLoading(false);
			}, 1000);
		}
	},
	loadScheduleGrid: function (data) {
		var me = this,
			formData          = me.getFormdata(),
			storeScheduleGrid = me.getSchedulegrid().getStore(),
			totalAmountGrid   = 0;

		storeScheduleGrid.loadData([], false);

		var newDate =  me.getFormdata().down("[name=purchase_date]").getValue();

		var arrSourcemoney   = ['CUSTOMER'];
		var arrSourcemoneyId = [3];
		if(data[0].sourcemoney !== null){
			arrSourcemoney   = data[0].sourcemoney.split("|");
			arrSourcemoneyId = data[0].sourcemoney_id.split("|");
		}

		var harga_total_jual = parseFloat(me.tools.money(formData).removeKomaTitik(me.getFormdata().down("[name=harga_total_jual]").getValue()));
		var amountTandaJadi  = parseFloat(data[0].tandajadi);

		if(data[0].tandajadi_nominal_persen === "2"){
			amountTandaJadi = parseFloat(data[0].tandajadi/100)*harga_total_jual;
		}

		var val = {
			duedate                      : newDate,
			scheduletype_scheduletype    : "TJ",
			scheduletype_scheduletype_id : 4,
			termin                       : 1,
			remaining_balance            : amountTandaJadi,
			sourcemoney_sourcemoney      : arrSourcemoney[0],
			sourcemoney_sourcemoneyid    : arrSourcemoneyId[0],
			amount                       : amountTandaJadi,
			persentase_npv               : 0
		}
		storeScheduleGrid.add(val);
		
		//TJ in balancing
		totalAmountGrid += parseFloat(amountTandaJadi);
		var harga_total_jual_schedule = harga_total_jual-amountTandaJadi;

		if(data[0].list_koefisiendetail_id !== null){
			var arrKoefisienId               = data[0].list_koefisiendetail_id.split(",");
			var arrPersentaseAmount          = data[0].persentase_amount.split("|");
			var arrPersentaseNPV             = data[0].persentase_npv.split("|");
			var arrScheduletypeId            = data[0].scheduletype_id.split("|");
			var arrScheduletype              = data[0].scheduletype.split("|");
			var arrTermin                    = data[0].termin.split("|");
			var AmountSchedule               = 0;
			var AmountScheduleBeforeRounding = 0;
			var amountRounding               = 0;
			var terminScheduleArray          = arrScheduletypeId.reduce((a,b)=> (a[b]=0,a),{});
			terminScheduleArray[4]           = 1;

			for (var i = 0; i < arrKoefisienId.length; i++) {
				terminScheduleArray[parseInt(arrScheduletypeId[i])]++;

				//TJ in balancing
				AmountSchedule = parseFloat(arrPersentaseAmount[i]/100)*harga_total_jual_schedule;

				//rounding angka, buang di schedule terakhir
				AmountScheduleBeforeRounding = AmountSchedule;
				if(me.pembulatan1000){
					AmountSchedule = Math.round(AmountSchedule/1000)*1000;
				}
				else{
					AmountSchedule = me.tools.floatval(AmountSchedule).toFixed(0);              
				}
				amountRounding += parseFloat(AmountSchedule)-parseFloat(AmountScheduleBeforeRounding);  
				amountRounding.toFixed(0);
				if(i == arrKoefisienId.length-1){
					if(parseFloat(amountRounding) < 0){
						amountRounding = Math.floor(Math.abs(amountRounding) * 100) * -1 / 100;
						AmountSchedule = parseFloat(AmountSchedule)-parseFloat(amountRounding);
					}
					else{
						AmountSchedule = parseFloat(AmountSchedule)-parseFloat(amountRounding);
					}
				}

				newDate = me.nextDatemonths(newDate);

				storeScheduleGrid.add({
					duedate                      : newDate,
					scheduletype_scheduletype    : arrScheduletype[i],
					scheduletype_scheduletype_id : arrScheduletypeId[i],
					termin                       : terminScheduleArray[parseInt(arrScheduletypeId[i])],
					remaining_balance            : AmountSchedule,
					sourcemoney_sourcemoney      : arrSourcemoney[i],
					sourcemoney_sourcemoneyid    : arrSourcemoneyId[i],
					amount                       : AmountSchedule,
					persentase_npv               : arrPersentaseNPV[i]
				});
				totalAmountGrid += parseFloat(AmountSchedule);

			}
		}

		balanceValue = totalAmountGrid - harga_total_jual;
		if (Math.abs(balanceValue) !== 0) {
			me.tools.alert.warning("Sale price total must be equal to schedule amount total");
		}

		formData.down("[name=balance_value]").setValue(balanceValue);
	},
	tanggalvalidasi : function (v) {
		var me = this;
		var g  = me.getRschmaingrid();
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
	generateNotes : function () {
		var me = this;
		if (
			me.setParamPL.param_generate_notes != null &&
			me.setParamPL.param_generate_notes.active == 1 &&
			typeof me.getFormdata() != 'undefined' && me.getFormdata().up('window').state == 'create'
		) {
			var formData      = me.getFormdata();
			var schedulelData = me.getSchedulegrid();
			var param         = me.setParamPL.param_generate_notes;
			var pricetype     = formData.down('[name=pricetype_pricetype_id]').getValue();
			var notes         = param.template_cash;
			
			if (pricetype == 2) { /// KPR
				notes = param.template_kpr;
			}
			else if (pricetype == 3) { /// INHOUSE
				notes = param.template_inh;
			}

			// var sum_termin_inh = 0;
			var arr_inh = new Array();
			var arr_kpr = new Array();
			schedulelData.getStore().each(function (rec) {
				if (rec.get('scheduletype_scheduletype') != 'TJ') {
					arr_inh.push({
						'duedate' : rec.get('duedate'),
						'amount'  : rec.get('amount')
					});
				}

				if (rec.get('scheduletype_scheduletype') == 'KPR') {
					arr_kpr.push({
						'duedate' : rec.get('duedate'),
						'amount'  : rec.get('amount')
					});
				}
			});

			/// sort desc duedate
			arr_inh.sort(function (a, b) {
				return new Date(b.duedate) - new Date(a.duedate);
			});

			/// sort asc duedate
			arr_kpr.sort(function (a, b) {
				return new Date(a.duedate) - new Date(b.duedate);
			});

			for (var i = 0; i < param.variable_template.length; i++) {
				var str_replace = '';
				if (param.variable_template[i] == 'xpt_namex') {
					str_replace = formData.down('[name=pt_name]').getValue();
				}
				else if (param.variable_template[i] == 'xharga_total_jualx') {
					str_replace = formData.down("[name=harga_total_jual]").getValue();
				}
				else if (param.variable_template[i] == 'xcount_termin_inhx') {
					str_replace = arr_inh.length;
				}
				else if (param.variable_template[i] == 'xamount_inhx' && arr_inh.length > 0) {
					str_replace = accounting.formatMoney(arr_inh[0].amount);
				}
				else if (param.variable_template[i] == 'xduedate_inh_startx' && arr_inh.length > 0) {
					var date = new Date(arr_inh[arr_inh.length - 1].duedate);
					str_replace = ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();
				}
				else if (param.variable_template[i] == 'xduedate_inh_endx' && arr_inh.length > 0) {
					var date = new Date(arr_inh[0].duedate);
					str_replace = ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();
				}
				else if (param.variable_template[i] == 'xamount_kprx' && arr_kpr.length > 0) {
					str_replace = accounting.formatMoney(arr_kpr[0].amount);
				}
				else if (param.variable_template[i] == 'xduedate_kpr_plus14x' && arr_kpr.length > 0) {
					var date = new Date(moment(arr_kpr[0].duedate).add(14, 'days').format('YYYY-MM-DD')); /// tambah 14 hari kedepan
					str_replace = ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();
				}

				notes = notes.replace(param.variable_template[i], str_replace);
			}

			formData.down('[name=notes]').setValue(notes);
		}
	},
	//// add erwin.st 04112021
	check_pelunasan_tj_um_return_value : function(schdata){
		/// tanda jadi lunas atau belum
		var me = this;
		
		me.setParamPL.puleLunasTandaJadi = false;

		var lunasUM1                  = false;
		var totalTandaJadi            = 0;
		var remainingBalanceTandaJadi = 0;
		var selectRec                 = me.getGrid().getSelectedRecord();


		for (var i = 0; i < schdata.length; i++) {
			var scheduletype      = schdata[i]['scheduletype'].scheduletype;
			var remaining_balance = schdata[i]['schedule'].remaining_balance;

			if(scheduletype === "TJ"){
				remainingBalanceTandaJadi = remainingBalanceTandaJadi + me.tools.floatval(remaining_balance);
				totalTandaJadi++;

				if(me.tools.floatval(remaining_balance) === 0 && i === 0){
					me.setParamPL.puleLunasTandaJadi = true;
					break;
				}
			}
			else if(scheduletype === "INH"){
				if(me.tools.floatval(remaining_balance) === 0 && i === 0){
					me.setParamPL.puleLunasTandaJadi = true;
					break;
				}
			}

			if(scheduletype === "UM"){
				if(me.tools.floatval(remaining_balance) === 0 && i === 0){
					lunasUM1 = true;
				}
			}

			/// Kalau cara bayarnya CASH dan tidak ada tandajadi, maka dianggap lunas tanda jadi
			if (selectRec.get('pricetype_pricetype_id') === 1 && totalTandaJadi === 0) {
				me.setParamPL.puleLunasTandaJadi = true;
			}

			if (selectRec.get('pricetype_pricetype_id') === 3 && totalTandaJadi === 0 && lunasUM1) {
				me.setParamPL.puleLunasTandaJadi = true;
			}
		}

		return remainingBalanceTandaJadi;
	},
	// added by rico 17012022
	sendsurveyGrid: function(){
		var me 		= this;
		var grid 	= me.getGrid();
		var plid 	= grid.getSelectedRecord().get('purchaseletter_id');

		var res 	= [plid];

		grid.setLoading("Please wait...");

		me.tools.ajax({
			params  : { purchaseletter_id: plid },
			success : function (data, model) {
				grid.setLoading(false);
				
				var result = data['others'][0][0]['hasil'][1][0];
				var check  = data['others'][0][0]['check'];

				if(result['customer_whatsapp'] == '' || result['customer_whatsapp'] == null){
					var status = 0;
				}else{
					var status = 1;
				}

				Ext.create('Ext.window.Window', {
					title   : 'Send Survey',
					height  : 210,
					width   : 380,
					padding : '10px 10px 10px 10px',
					modal   : true,
					items   : [
						{
							xtype            : 'textfield',
							itemId           : 'no_whatsapp',
							name             : 'no_whatsapp',
							fieldLabel       : 'No Whatsapp',
							enforceMaxLength : true,
							maskRe           : /[0-9]/,
							maxLength        : 100,
							listeners        : {
								afterrender : function(){
									if(result['customer_whatsapp'] == '' || result['customer_whatsapp'] == null){
										this.setValue(result['customer_mobile_phone']);
									}
									else{
										this.setValue(result['customer_whatsapp']);
									}
								}
							}
						},
						{
							xtype  : 'container',
							layout : 'hbox',
							margin : '5px 0 5px 0',
							items  : [
								{
									xtype : 'splitter', width : 110,
								},
								{
									xtype      : 'label',
									text       : '* Masukkan Kode Negara+No.HP Contoh : 628131234567',
									fieldStyle : 'font-color:#ff0000',
									height     :200
								}
							]
						},
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
									action  : 'saveWhatsapp',
									padding : 5,
									width   : 75,
									iconCls : 'icon-save',
									text    : 'Send',
									handler : function() {
										var no_whatsapp = this.up('window').items.items[0].value;
										var win = this.up('window');

										if(res.length > 1){
											res.pop();
										}

										res.push(no_whatsapp);

										win.setLoading("Please wait...");

										me.tools.ajax({
											params: { data : Ext.encode(res) },
											success: function(data, model) {
												var success = data['others'][0][0][0].result;

												if(success == 1){
													var text 	= me.setParamPL.getPurcheletterSurveyOnlineText + me.setParamPL.getPurcheletterSurveyOnlineLink + 'purchase/' + plid + '/' + result['customer_id'];	
													window.open('https://api.whatsapp.com/send?phone=' + no_whatsapp + '&text=' + text, '_blank');
													
													Ext.Msg.show({
														title   : 'Info',
														msg     : 'Success',
														icon    : Ext.Msg.INFO,
														buttons : Ext.Msg.OK,
														fn      : function () { }
													});
												}
												else{
													Ext.Msg.show({
														title   : 'Failure',
														msg     : 'Error: Unable to save data.',
														icon    : Ext.Msg.ERROR,
														buttons : Ext.Msg.OK,
														handler : function(){
															this.up('window').close();
														}
													});
												}

												win.setLoading(false);
												win.close();	
											}
										}).read('savecustomer');
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
									handler : function() {
										this.up('window').close();
									}
								},
								{
									xtype     : 'button',
									itemId    : 'btnDeleteSurvey',
									padding   : 5,
									width     : 75,
									iconCls   : 'icon-cancel',
									text      : 'Delete',
									hidden    : true,
									listeners : {
										afterrender : function(el){
											if(check > 0){
												el.setVisible(true);
											}
											else{
												el.setVisible(false);
											}
										}
									},
									handler : function() {
										var win = this.up('window');

										Ext.Msg.confirm('Delete Data', 'Hapus survey?', function (btn) {
											if (btn == 'yes') {
												me.tools.ajax({
													params : { 
														purchaseletter_id : result['purchaseletter_id'], 
														customer_id       : result['customer_id']
													},
													success : function (data, model) {
														var others = data['others'][0][0].result;
														if(others == 1){
															Ext.Msg.show({
																title   : 'Info',
																msg     : "Berhasil menghapus survey.",
																icon    : Ext.Msg.INFO,
																buttons : Ext.Msg.OK,
																handler: function(){
																	this.up('window').close();
																}
															});
														}
														else{
															Ext.Msg.show({
																title   : 'Failure',
																msg     : 'Error: Gagal menghapus survey.',
																icon    : Ext.Msg.ERROR,
																buttons : Ext.Msg.OK,
																handler : function(){
																	this.up('window').close();
																}
															});
														}
														win.close();
													}
												}).read('surveyDelete');
											}
										});
									}
								}
							]
						}
					]
				}).show();
			}
		}).read('customer');
	},
	// added by rico 17012022
	formDataHargaNettoAfterRender: function(){
		var me 		= this;
		var grid 	= me.getGrid();
		var plid 	= grid.getSelectedRecord().get('purchaseletter_id');
		var form 	= me.getFormdataharganetto();

		grid.setLoading("Please wait...");

		me.tools.ajax({
			params  : { purchaseletter_id: plid },
			success : function (data, model) {
				grid.setLoading(false);
				
				var result  = data['others'][0][0]['hasil'][1][0];
				var check   = data['others'][0][0]['check'];
				var check_v = (result['check_voucher'] > 0) ? true: false;

				form.down("[name=purchaseletter_id]").setValue(plid);
				form.down("[name=harga_netto]").setValue(accounting.formatMoney(result['price_harga_neto']));
				form.down("[name=harga_netto_komisi]").setValue(accounting.formatMoney(result['harga_netto_komisi']));

				form.down("[name=harga_netto_komisi]").setReadOnly(check_v);
				form.down("#saveHargaNetto").setVisible(!check_v);
			}
		}).read('customer');
	},
	saveNetto: function(){
		var me 	 = this;
		var form = me.getFormdataharganetto();
		var rec  = [form.down("[name=purchaseletter_id]").getValue(), accounting.unformat(form.down("[name=harga_netto]").getValue()), accounting.unformat(form.down("[name=harga_netto_komisi]").getValue())];

		form.setLoading("Please wait...");

		me.tools.ajax({
			params: { data : Ext.encode(rec) },
			success: function(data, model) {
				var success = data['others'][0][0][0].result;

				if(success == 1){
					Ext.Msg.show({
						title   : 'Info',
						msg     : 'Success',
						icon    : Ext.Msg.INFO,
						buttons : Ext.Msg.OK,
						fn      : function () { }
					});
				}else{
					Ext.Msg.show({
						title   : 'Failure',
						msg     : 'Error: Unable to save data.',
						icon    : Ext.Msg.ERROR,
						buttons : Ext.Msg.OK,
						handler : function(){
							this.up('window').close();
						}
					});
				}

				form.setLoading(false);
				form.up('window').close();	
			}
		}).read('savehargaKomisi');
	},
	/*@implement this method for xyReport Class*/
	xyReportProcessParams: function (reportData) {
		var me = this;

		if(typeof me.getFormdata() != 'undefined'){
			var plId = me.getFormdata().down("[name=purchaseletter_id]").getValue();
		}
		else{
			var rec  = me.getGrid().getSelectedRecord();
			var plId = rec.get("purchaseletter_id");
		}

		reportData['file'] = me.reportFileView;
		reportData.params["purchaseletter_id"] = plId;
		return reportData;
	},
	generateFormsalesgroup : function(){
		var me = this;
		var formData = me.getFormdata();

		// var newItem = new Ext.form.TextField({fieldLabel: 'New Fields'});
		// var newItem = new Ext.form.field.Radio({boxLabel : 'New Fields', inputValue : 1, name : 'salesgroup_id', padding : '0 30px 0 0'});
        // formData.down('#salesgroup_item').insert(newItem);

		var fields = me.setParamPL.master_salesgroup.data;	
		for (var x in fields){
			var newItem = new Ext.form.field.Radio({
				boxLabel   : fields[x].salesgroup, 
				inputValue : fields[x].salesgroup_id, 
				name       : 'salesgroup_salesgroup_id', 
				padding    : '0 20px 0 0',
			});
        	formData.down('#salesgroup_item').insert(newItem);
		}
	},
	change_purchase_date : function(){
		var me   = this,
			form = me.getFormdata();

		if(form.up('window').state == 'create'){
			var storeReward = me.getRewarddetailgrid().getStore();

			if(form.down('[name=price_source]').getValue() == 2){ //// Price Source = pricelist
				// reset field
				me.tools.resetPanel('priceInformationBoxId', form);
				me.tools.resetPanel('billingInformationBoxId', form);
				me.getSchedulegrid().getStore().loadData([], false);

				//// Set ulang nilai price source dan price type 
				form.down('[name=price_source]').setValue(1);
				form.down('[name=pricelist_id]').setValue('');
				form.down('[name=pricelist_id]').setVisible(false);
				form.down('[name=pricelistdetail_koefisien_id]').setValue('');
				form.down('[name=pricelistdetail_koefisien_id]').setVisible(false);
				form.down('[name=pricetype_pricetype_id]').setValue('');
				form.down("[name=kpp]").setVisible(false);
			}

			storeReward.removeAll();
			form.down('[name=internalmemo_id]').setValue('');

			_myAppGlobal.getController('Purchaseletterreward').generateComboboxIM(me.setParamPL.master_im, form.down('[name=purchase_date]').getValue());
		}
	},
	reGenerateVA : function(){
		var me = this;

		var grid = me.getGrid(),
			rec = grid.getSelectedRecord();

		grid.setLoading("Please wait...");

		Ext.Ajax.request({
			url    : 'erems/purchaseletter/read',
			params : { cluster_id : rec.get('cluster_cluster_id'), purchaseletter_id : rec.get('purchaseletter_id'), mode_read : 'regenerateva' },
			success : function (response){
				grid.setLoading(false);

				if(Ext.decode(response.responseText).success){
					Ext.Msg.show({
						title   : 'Info',
						msg     : 'No VA Berhasil di generate.',
						icon    : Ext.Msg.INFO,
						buttons : Ext.Msg.OK,
						fn      : function () { }
					});
				}
				else{
					Ext.Msg.show({
						title   : 'Failure',
						msg     : 'No VA Gagal di generate, silahkan generate ulang.',
						icon    : Ext.Msg.ERROR,
						buttons : Ext.Msg.OK,
						handler : function(){
							this.up('window').close();
						}
					});
				}
			}
		});
	},
	genRangeSchedue : function(newDate,periode_angsuran,jenis_periode){
        switch(jenis_periode){
            case 'hari':
                newDate = Ext.Date.add(newDate, Ext.Date.DAY, periode_angsuran);
                break;
            case 'minggu':
                newDate = Ext.Date.add(newDate, Ext.Date.DAY, 7*periode_angsuran);
                break;
            case 'bulan':
                newDate = Ext.Date.add(newDate, Ext.Date.MONTH, periode_angsuran);
                break;
            default:
                newDate = Ext.Date.add(newDate, Ext.Date.MONTH, 1);
                break;
        }
        return newDate;
    },
    validateClosing : function(pl_date){
    	var me = this;
    	var validate = Ext.Ajax.request({
			url     : 'erems/purchaseletter/read',
			method  : 'POST',
			timeout : 45000000,
			async   : false,
			params  : { purchase_date : pl_date, mode_read   : 'checkauthorize' }
		}).responseText;
		return Ext.decode(validate);
    },
    generateJenisbiaya : function(){
    	var me = this,
    		dt = [],
    		a  = me.setParamPL.jenisBiayaPurchaseletter;

    	if(a.length > 0){
    		for (var i=0; i<a.length; i++) {
				var o = {};
				var t = a[i];
    			Object.keys(a[i]).forEach(key => {
    				var t = a[i][key];
    				if(key == 'jenis_biaya'){
    					t = t.replace(/{electricity}/g, (me.getFormdata().down('[name=unit_electricity]').getValue() ? me.getFormdata().down('[name=unit_electricity]').getValue() : '???'));
    				}
    				o = Object.assign(o, {[key] : t});
				});
			  	dt[i] = o;	
    		}
    	}	

    	if(me.setParamPL.useJenisBiayaPurchaseletter == 1){
    		setTimeout(function(){
    			me.getJenisbiayagrid().getStore().loadData(dt);
    		}, 500);

    	}
    }
});