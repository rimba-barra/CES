Ext.define('Erems.controller.Admincollection', {
	extend   : 'Erems.library.template.controller.Controller',
	alias    : 'controller.Admincollection',
	views    : ['admincollection.Panel', 'admincollection.Grid', 'admincollection.FormSearch', 'admincollection.FormData', 'admincollection.PencairanFormData', 'admincollection.PencairanGrid', 'admincollection.BankGrid', 'admincollection.BankFormDataDetail', 'admincollection.BankGridAkad', 'admincollection.BankAkadFormDataDetail', 'otherspayment.DosPreviewFormData', 'admincollection.Customerdocumentgrid', 'admincollection.FullPaymentFormData', 'admincollection.FullPaymentGrid', 'admincollection.FormDataOpen', 'admincollection.SimulationPaymentGrid'],
	requires : [
		'Erems.library.DetailtoolAll',
		'Erems.library.template.component.Collectorcombobox',
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Citycombobox',
		'Erems.library.template.component.Citraclubcombobox',
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Unitcombobox',
		'Erems.library.template.component.Pricetypecombobox',
		'Erems.library.TypeRounding',
	],
	stores      : ['Admincollection', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Mastercluster', 'Masterblock', 'Pencairankpr', 'Bankkpr', 'Admincollectionschedule', 'Masterbankkpr', 'Bankkprakad', 'Masterakadconfirmationstatus', 'Masterparameterglobal', 'Masterdata.store.City', 'Mastercitraclub', 'Masterplafon', 'Pencairankprduedateescrow', 'Mastercustomerdocumentadmincollection', 'Pencairanfullpayment', 'Hgbajb', 'Mastercollector','Masterdata.store.Bank'],
	models      : ['Admincollection', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masterblock', 'Pencairankpr', 'Bankkpr', 'Admincollectionschedule', 'Masterbankkpr', 'Bankkprakad', 'Masterakadconfirmationstatus', 'Masterparameterglobal', 'Masterdata.model.City', 'Mastercitraclub', 'Masterplafon', 'Pencairankprduedateescrow', 'Mastercustomerdocument', 'Pencairanfullpayment', 'Hgbajb', 'Masteremployee'],
	detailTool  : null,
	detailTool2 : null,
	detailTool3 : null,
	detailTool4 : null,
	refs        : [
		{
			ref      : 'grid',
			selector : 'admincollectiongrid'
		},
		{
			ref      : 'formsearch',
			selector : 'admincollectionformsearch'
		},
		{
			ref      : 'formdata',
			selector : 'admincollectionformdata'
		},
		{
			ref      : 'pencairanformdata',
			selector : 'admincollectionpencairanformdata'
		},
		{
			ref      : 'pencairangrid',
			selector : 'admincollectionpencairangrid'
		},
		{
			ref      : 'pencairanformdatadetail',
			selector : 'admincollectionpencairanformdatadetail'
		},
		{
			ref      : 'bankgrid',
			selector : 'admincollectionbankgrid'
		},
		{
			ref      : 'bankformdatadetail',
			selector : 'admincollectionbankformdatadetail'
		},
		{
			ref      : 'formdos',
			selector : 'otherspaymentdospreviewformdata'
		},
		{
			ref      : 'bankgridakad',
			selector : 'admincollectionbankgridakad'
		},
		{
			ref      : 'bankakadformdatadetail',
			selector : 'admincollectionbankakadformdatadetail'
		},
		{
			ref      : 'customerdocumentgrid',
			selector : 'admincollectioncustomerdocumentgrid'
		},
		{
			ref      : 'fullpaymentformdata',
			selector : 'admincollectionfullpaymentformdata'
		},
		{ //added by anas 04062021
			ref: 'formdataopen',
			selector: 'admincollectionformdataopen'
		},
		{//added by erwin.st 050822
			ref      : 'simulationpaymentgrid',
			selector : 'admincollectionsimulationpaymentgrid'
		},
	],
	controllerName            : 'admincollection',
	fieldName                 : 'changeownership_no',
	bindPrefixName            : 'Admincollection',
	validationItems           : [{name: 'purchaseletter_id', msg: 'You must select Kavling / Unit No. first'}],
	formWidth                 : 800,
	countLoadProcess          : 0,
	BankKPRRealisationDefault : 0,
	enableEditPencairanAmount : 0,
	enableAddNewSchema        : 0,
	isAlreadyAkad             : 0,
	genco_um                  : 0,
	open_va                   : 0,
	subholding_config         : 0,
	button_openva             : 0,
	checklist_openva          : 0,
	batas_toleransi           : 0,
	denda_permil              : 0,
	active_check_akad         : 0,
	constructor               : function (configs) {
		this.callParent(arguments);
		
		var me = this;

		me.roundlib = new Erems.library.TypeRounding();
	},
	init : function (application) {
		var me = this;
		this.control({
			test                   : me.eventMonthField,
			'admincollectionpanel' : {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : this.panelAfterRender
			},
			'admincollectiongrid' : {
				afterrender     : this.gridAfterRender,
				itemdblclick    : this.gridItemDblClick,
				itemcontextmenu : this.gridItemContextMenu,
				selectionchange : this.gridSelectionChange
			},
			'#admincollectiongrid_ctxMenu menuitem' : {
				click : function(el){
					if(el.action == 'pencairan'){
						me.formDataPencairanShow();
					}
					else if(el.action == 'full_kpr_payment'){
						me.formDataFullPaymentShow();
					}
					else if(el.action == 'print'){
						me.dataPrint();
					}
					else if(el.action == 'pengakuan_penjualan'){
						me.showPengakuanPenjualan();
					}
					else if(el.action == 'full_payment'){
						me.formFullPayment();
					}
					else if(el.action == 'collector'){
						me.showCollector();
					}
					else if(el.action == 'add_open'){
						me.detailTool3.form().show('create', 350, 'Open Hari VA');
					}
					else if(el.action == 'simulation_payment'){
						me.view_simulation_payment();
					}
				}
			},
			'admincollectiongrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'admincollectiongrid toolbar button[action=destroy]': {
				click : this.dataDestroy
			},
			'admincollectiongrid toolbar button[action=print]': {
				click : this.dataPrint
			},
			'admincollectiongrid actioncolumn': {
				afterrender : this.gridActionColumnAfterRender,
				click       : this.gridActionColumnClick
			},
			'admincollectionformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'admincollectionformsearch button[action=search]': {
				click: this.dataSearch
			},
			'admincollectionformsearch button[action=reset]': {
				click: this.dataReset
			},
			'admincollectionformdata': {
				beforerender : this.formDataBeforeRender,
				afterrender  : this.formDataAfterRender
			},
			'admincollectionformdata button[action=save]': {
				click: this.dataSave
			},
			'admincollectionformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'admincollectionformdata button[action=browse_paramadmincollection]': {
				click: me.selectParamadmincollectionGridShow
			},
			'admincollectiongrid toolbar button[action=pencairan]': {
				click : this.formDataPencairanShow
			},
			'admincollectionpencairanformdata': {
				beforerender : this.formDataPencairanBeforeRender,
				afterrender  : this.formDataPencairanAfterRender
			},
			'admincollectionpencairanformdata button[action=save]': {
				click: this.dataSavePencairan
			},
			'admincollectionpencairangrid': {
				selectionchange: this.gridPencairanSelectionChange
			},
			'admincollectionpencairangrid toolbar button[action=create]': {
				click: function () {
					me.detailTool.form().show('create', 500, 'New'); //'adddetailpencarian' petik terakhir bisa kosong atau tidak
				}
			},
			'admincollectionpencairangrid button[action=generateschema]': {
				click: me.setGenerateSchema
			},
			'admincollectionpencairanformdatadetail [name=persen_pencairan]': {
				keypress: function (f, e) {
					me.validateDecimalPrecision(f, e, 2);
				},
				keyup: me.detailForm.fillPencairanAmount
			},
			'admincollectionpencairanformdatadetail button[action=save]': {
				click: me.detailForm.save
			},
			'admincollectionpencairangrid actioncolumn': {
				afterrender: this.pencairangridActionColumnAfterRender,
				click: me.detailGrid.actionColumnClick
			},
			'admincollectionpencairanformdatadetail': {
				beforerender: this.formDataPencairanDetailBeforeRender,
			},
			'admincollectionpencairangrid button[action=addschema]': {
				click: function () {
					me.detailTool.form().show('create', 500, 'New'); //'adddetailpencarian' petik terakhir bisa kosong atau tidak
				}
			},
			'admincollectionpencairangrid button[action=printschema]': {
				click: function () {
					me.processReport();
				}
			},
			'admincollectionpencairangrid button[action=printretensi]': { // added by rico 15122021
				click: function () {
					me.processRetensiReport();
				}
			},
			'admincollectionpencairangrid button[action=synchduedate]': {
				click: me.setDueDateEscrow
			},
			'admincollectionpencairangrid button[action=synchprogress]': {
				click: me.setProgressConst
			},
			'admincollectiongrid toolbar button[action=simulation_payment]': {
				click: function () {
					me.view_simulation_payment();
				}
			},
			'admincollectiongrid toolbar button[action=adjustkprdate]': {
				click: function () {
					me.formDataadjustkprdate();
				}
			},
			'admincollectionbankgrid toolbar button[action=create]': {
				click: function () {
					me.detailTool.form().show('create', 700, 'New');
				}
			},
			'admincollectionbankformdatadetail': {
				afterrender: this.formDataBankAfterRender
			},
			'admincollectionbankformdatadetail button[action=save]': {
				click: me.detailBankForm.save
			},
			'admincollectionbankgrid': {
				itemdblclick: me.detailBankGridItemDblClick,
				selectionchange: this.detailBankGridSelectionChange
			},
			'admincollectionbankgrid actioncolumn': {
				click: me.detailBankGrid.actionColumnClick
			},
			'admincollectionbankformdatadetail [name=kpr_realisation]': {
				keyup: me.detailBankForm.fillCreatedby
			},
			'admincollectionbankformdatadetail [name=kpr_cicilan]': {
				keyup: me.detailBankForm.fillCreatedby
			},
			'admincollectionbankformdatadetail [name=kpr_tenor]': {
				keyup: me.detailBankForm.fillCreatedby
			},
			'admincollectionbankformdatadetail [name=kpr_interest]': {
				keypress: function (f, e) {
					me.validateDecimalPrecision(f, e, 2);
				},
				keyup: me.detailBankForm.fillCreatedby
			},
			'admincollectionbankgrid button[action=printkuitansi]': {
				click: function () {
					me.printKuitansi();
				}
			},
			'admincollectionbankgrid button[action=printsuratlunasdp]': {
				click: function () {
					me.printSuratLunasDP();
				}
			},
			'admincollectionbankgrid button[action=printfeekpr]': {
				click: function () {
					me.printFeeKPR();
				}
			},
			'admincollectionbankgrid button[action=printcovernotes]': {
				click: function () {
					me.printCoverNotes();
				}
			},
			// added by rico 12022023
			'admincollectionbankgrid button[action=printsuratkuasa]': {
				click: function () {
					me.printSuratKuasa();
				}
			},
			// added by rico 12052023
			'admincollectionbankgrid button[action=printsubsidikpr]': {
				click: function () {
					me.printSubsidiKPR();
				}
			},
			'admincollectionbankgrid button[action=printbuyback]': {
				click: function () {
					me.printBuyBack();
				}
			},
			// added by rico 17072023
			'admincollectionbankgrid button[action=printkonfirmasi]': {
				click: function () {
					me.printKonfirmasi();
				}
			},
			'admincollectionbankgridakad toolbar button[action=create]': {
				click: me.cekBankkprakad
			},
			'admincollectionbankakadformdatadetail': {
				beforerender : this.formDataBankAkadBeforeRender,
			},
			'admincollectionbankakadformdatadetail button[action=save]': {
				click: me.detailBankAkadForm.save
			},
			'admincollectionbankgridakad actioncolumn': {
				editaction   : me.bankgridakadactionEditColumnClick,
				deleteaction : me.bankgridakadactionDeleteColumnClick
			},
			'admincollectionformdata button[action=savebatalbylegal]': {
				click: function () {
					me.dataSaveBatalBy('Legal');
				}
			},
			'admincollectionformdata button[action=savebatalbycollection]': {
				click: function () {
					me.dataSaveBatalBy('Collection');
				}
			},
			'admincollectiongrid toolbar button[action=collector]': {
				click: this.showCollector
			},
			'admincollectiongrid toolbar button[action=pengakuan_penjualan]': {
				click: this.showPengakuanPenjualan
			},
			//== end pengakuan penjualan ==
			// add on 3 juli 2018
			'admincollectioncustomerdocumentgrid actioncolumn': {
				downloadaction: me.customerdocumentgridDownloadColumnClick
			},

			//=== full payment ===
			'admincollectiongrid toolbar button[action=full_payment]': {
				//click: me.saveFullPayment
				click: me.formFullPayment
			},
			'admincollectiongrid toolbar button[action=full_kpr_payment]': {
				click: this.formDataFullPaymentShow
			},
			'admincollectionfullpaymentformdata': {
				//beforerender: this.formDataPencairanBeforeRender,
				afterrender: this.formDataFullPaymentAfterRender
			},
			'admincollectionfullpaymentformdata button[action=save]': {
				click: this.dataSavePencairan
			},
			//=== end full payment ===
			'admincollectiongrid toolbar [action=action0]': {
				click: function () {
					me.dataSearchFilterby('');
				}
			},
			'admincollectiongrid toolbar [action=action1]': {
				click: function () {
					me.dataSearchFilterby('1');
				}
			},
			'admincollectiongrid toolbar [action=action2]': {
				click: function () {
					me.dataSearchFilterby('2');
				}
			},
			'admincollectionformdata [name=customer_address]': {
				change: function () {
					me.limitedMaxchar(me.getFormdata().down('[name=customer_address]'), 255);
				}
			},
			//add by dika 20/19/2022
			'admincollectionformdata [name=customer_ktp_address]': {
				change: function () {
					me.limitedMaxchar(me.getFormdata().down('[name=customer_ktp_address]'), 255);
				}
			},
			//end add
			'admincollectionformdata [name=notes_batal]': {
				change: function () {
					me.limitedMaxchar(me.getFormdata().down('[name=notes_batal]'), 255);
				}
			},
			'admincollectionbankakadformdatadetail [name=akadconfirmation_note]': {
				change: function () {
					me.limitedMaxchar(me.getBankakadformdatadetail().down('[name=akadconfirmation_note]'), 255);
				}
			},
			//added by anas 04062021
			'admincollectiongrid toolbar button[action=add_open]': {
				click: function () {
					me.detailTool3.form().show('create', 350, 'Open Hari VA');
				}
			},
			'admincollectionformdataopen': {
				afterrender: this.formDataOpenHariVAAfterRender
			},
			'admincollectionformdataopen button[action=save]': {
				click : me.detailFormOpenHariVA.save
			},
			'admincollectionformsearch [name=unit_number]': {
				keypress: function (e, el) {
					var me = this;
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				}
			},
			'admincollectionformsearch [name=customer_name]': {
				keypress: function (e, el) {
					var me = this;
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				}
			},
			//added by erwin.st 050822
			'admincollectionsimulationpaymentgrid [name=rencana_tanggal_bayar]' : {
				select : function () {
					var me = this;
					me.calculate_simulation_payment();
				}
			},
			'admincollectionsimulationpaymentgrid [action=print_simulation_payment]' : {
				click : function () {
					var me = this;
					if(me.empty(me.getSimulationpaymentgrid().down('[name=rencana_tanggal_bayar]').getValue())){
						Ext.Msg.show({
							title   : 'Alert',
							msg     : me.getSimulationpaymentgrid().down('[name=rencana_tanggal_bayar]').getFieldLabel() + ' tidak boleh kosong.',
							icon    : Ext.Msg.WARNING,
							buttons : Ext.Msg.OK
						});
					}
					else{
						me.print_simulation_payment();
					}
				}
			}
		});
	},
	gridAfterRender: function () {
		var me = this;

		me.dataReset();

		var grid = me.getGrid();

		grid.down('#btnPengakuanPenjualan').setVisible(true);
		grid.getView().getHeaderCt().child('#colms_pengakuan_penjualan_date').show();
		
		// if (me.subholding_config == 1) {
		// 	grid.down('#btnPengakuanPenjualan').setVisible(true);
		// 	grid.getView().getHeaderCt().child('#colms_pengakuan_penjualan_date').show();
		// }

		// Ext.Ajax.request({
		// 	url: 'erems/admincollection/read',
		// 	params: {
		// 		read_type_mode: 'subholding_config'
		// 	},
		// 	success: function (response) {
		// 		if (response.responseText == 1) {
		// 			grid.down('#btnPengakuanPenjualan').setVisible(true);
		// 			grid.getView().getHeaderCt().child('#colms_pengakuan_penjualan_date').show();
		// 		}
		// 	}
		// });

		if (apps.subholdingId == 2) {
			// grid.down('#btnFullPayment').setVisible(true); //edit by fatkur 10/7/20
			//grid.down('#btnFullKPRPayment').setVisible(true);
		}
	},

	dataSearch: function () {
		resetTimer();
		var me = this;
		var form = me.getFormsearch().getForm();
		var store = me.getGrid().getStore();
		var grid = me.getGrid();

		var fields = me.getFormsearch().getValues();

		for (var x in fields) {
			store.getProxy().setExtraParam(x, fields[x]);
		}
		store.loadPage(1);

		grid.down('#btnPencairan').setDisabled(true);
	},

	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

		grid.down('#btnPencairan').setDisabled(true);
		grid.down('#btnFullPayment').setDisabled(true);
		grid.down('#btnFullKPRPayment').setDisabled(true);
		grid.down('#btnCollector').setDisabled(true);

		if (row[0]) {
			var pricetype = row[0].data.pricetype;
			if (pricetype == 'KPR' && row.length == 1) {
				grid.down('#btnPencairan').setDisabled(false);
			}
			grid.down('#btnCollector').setDisabled(false);
		}

		grid.down('#btnEdit').setDisabled(row.length != 1);
		grid.down('#btnPengakuanPenjualan').setDisabled(row.length != 1);

		//added by anas 04062021
		grid.down('#btnOpen').setDisabled(row.length != 1);
		//end added by anas
		grid.down('#btnSimulationPayment').setDisabled(row.length != 1);
		grid.down('#btnAdjustkprdate').setDisabled(row.length != 1);

		if (row[0]) {
			var is_use = row[0].data.is_use;
			var is_alreadyakad = row[0].data.is_alreadyakad;
			var is_cashier = row[0].data.is_cashier;
			var is_generatefullpayment = row[0].data.is_generatefullpayment;

			if (is_use == 1 && is_alreadyakad == 1 && row.length == 1) {
				grid.down('#btnFullPayment').setDisabled(false);
				grid.down('#btnFullKPRPayment').setDisabled(false);
			}

			if (is_generatefullpayment == 1) {
				grid.down('#btnPencairan').setVisible(false);
				grid.down('#btnFullKPRPayment').setVisible(true);
			} else {
				grid.down('#btnPencairan').setVisible(true);
				grid.down('#btnFullKPRPayment').setVisible(false);
			}

			if (is_cashier) {
				grid.down('#btnFullPayment').setDisabled(true);
			}
		}
	},

	detailBankGridSelectionChange: function () {
		var me = this;
		var grid = me.getBankgrid();
		var row = grid.getSelectionModel().getSelection();
		
		// added by rico 21042022
		var form = me.getFormdata().getForm();
		var is_alreadyakad = form._record.data.is_alreadyakad;
		
		grid.down('#btnPrintSuratLunasDP').setDisabled(true);
		grid.down('#btnPrintFeeKPR').setDisabled(true);

		grid.down('#btnPrintBuyBack').setDisabled(true); // added by rico 26062023
		
		grid.down('#btnPrintKonfirmasi').setDisabled(true); // added by rico 17072023

		// grid.down('#btnPrintCoverNotes').setDisabled(true); // added by rico 06042023

		grid.down('#btnPrintSuratKuasa').setDisabled(true); //added by rico 13022023

		grid.down('#btnPrintSubsidiKPR').setDisabled(true); //added by rico 12052023
		
		if (row[0]) {
			var purchaseletter_bankkpr_id = row[0].data.purchaseletter_bankkpr_id;
			// console.log(purchaseletter_bankkpr_id);
			
			// added by rico 21042022
			// grid.down('#btnPrintFeeKPR').setDisabled(!is_alreadyakad);
			grid.down('#btnPrintFeeKPR').setDisabled(row.length != 1);

			grid.down('#btnPrintBuyBack').setDisabled(row.length != 1); // added by rico 26062023

			grid.down('#btnPrintKonfirmasi').setDisabled(row.length != 1); // added by rico 17072023

			// grid.down('#btnPrintCoverNotes').setDisabled(row.length != 1); // added by rico 06042023

			grid.down('#btnPrintSuratKuasa').setDisabled(row.length != 1); //added by rico 13022023

			grid.down('#btnPrintSubsidiKPR').setDisabled(row.length != 1);  //added by rico 12052023

			if (purchaseletter_bankkpr_id > 0) {
				grid.down('#btnPrintSuratLunasDP').setDisabled(row.length != 1);
			} else {
				grid.down('#btnPrintSuratLunasDP').setDisabled(true);
			}
		}

	},

	gridActionColumnClick: function (view, cell, row, col, e) {
		var me = this;
		var record = me.getGrid().getStore().getAt(row);
		var m = e.getTarget().className.match(/\bact-(\w+)\b/);
		me.getGrid().getSelectionModel().select(row);

		//get disabled button
		if (m) {
			var btnPencairan = m.input.match(/x-item-disabled/gi);
		}

		if (m) {
			switch (m[1]) {
				case 'AdmincollectionpencairanCreate':
					if (!btnPencairan) {
						me.formDataPencairanShow();
						break;
					} else {
						break;
					}
				case 'update':
					me.formDataShow('update');
					break;
				case 'destroy':
					me.dataDestroy();
					break;
			}
		}
	},

	formSearchAfterRender: function (el) {
		var me = this;
		me.loadComboBoxStore(el);
	},

	// =================================== PENCAIRAN START ============================================
	//click pencairan
	formDataPencairanShow: function () {
		var me = this;

		var formtitle = 'Pencairan Escrow';
		var formicon = 'icon-form-edit';

		var winId = 'win-pencairanformdata';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: false,
				width: me.formWidth,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: false,
				state: 'update',
				//items: Ext.create('Erems.view.' + me.controllerName + '.HgbajbFormData'),
				listeners: {
					boxready: function () {
						win.body.mask('Loading...');
						var tm = setTimeout(function () {
							win.add(Ext.create('Erems.view.' + me.controllerName + '.PencairanFormData'));
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

	formDataPencairanBeforeRender: function (el) {
		var me = this;
		setupObject(el, me.execAction, me);

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({
			params: {parametername: 'COLLECTION_IS_EDIT_NILAIPENCAIRAN'},
			callback: function (rec) {
				if (rec.length > 0) {
					var global = rec[0].get('value');
					if (global === '1') {
						me.enableEditPencairanAmount = 1;
					} else {
						me.enableEditPencairanAmount = 0;
					}
				} else {
					me.enableEditPencairanAmount = 0;
				}
			}
		});

		var pencairanGrid = me.getPencairangrid();
		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({
			params: {parametername: 'COLLECTION_IS_ADD_NEWSCHEMA'},
			callback: function (rec) {
				if (rec.length > 0) {
					var global = rec[0].get('value');
					if (global === '1') {
						me.enableAddNewSchema = 1;
						pencairanGrid.down('#btnAddSchema').setDisabled(false);
					} else {
						me.enableAddNewSchema = 0;
						pencairanGrid.down('#btnAddSchema').setDisabled(true);
						pencairanGrid.down('#actioncolumn').items[1].disabled = true;
					}
				} else {
					me.enableAddNewSchema = 0;
					pencairanGrid.down('#btnAddSchema').setDisabled(true);
					pencairanGrid.down('#actioncolumn').items[1].disabled = true;
				}
			}
		});
	},

	formDataPencairanAfterRender: function (el) {
		var me = this;

		me.loadComboBoxStore(el);
		var state = el.up('window').state;

		//show form add pencarian 
		me.detailTool = new Erems.library.DetailtoolAll();
		me.detailTool.setConfig({
			viewPanel: 'PencairanFormDataDetail',
			parentFDWindowId: me.getPencairanformdata().up('window').id,
			controllerName: me.controllerName
		});
		me.detailTool.parentGridAlias = 'admincollectionpencairangrid';

		//city combobox
		var ftStore = null;
		ftStore = el.down('#fd_city').getStore();
		ftStore.removeAll();
		ftStore.load({params: {start: 0, limit: 0, country_id: 87}});


		/*if (state == 'create') {
		 // el.down('#active').setValue(1);
		 //me.getFormdata().down('#btnSave').setDisabled(false);
		 } else if (state == 'update') {*/
		me.countLoadProcess = 0;
		me.getPencairanformdata().up('window').body.mask('Loading data, please wait ...');

		var grid = me.getGrid();
		var store = grid.getStore();
		var form = me.getPencairanformdata();

		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
		el.loadRecord(record);

		form.down('[name=payment_id]').setValue(0);
		var hjbagbStore = me.getHgbajbStore();
		hjbagbStore.removeAll();
		if (record.data.buktipemilik_id > 0) {
			var buktipemilik_id = record.data.buktipemilik_id;
			hjbagbStore.load({params: {is_hgbajb: 'yes', buktipemilik_id: buktipemilik_id}});
		}
		// load purchase letter data
		el.body.mask('Loading Purchaseletter & Pencairan data, please wait ...');
		var purchaseletterdetailStore = me.getPurchaseletterdetailStore();
		purchaseletterdetailStore.removeAll();
		purchaseletterdetailStore.load({
			params: {purchaseletter_id: record.data.purchaseletter_id, mode_read: 'detail'},
			callback: function (purchaselettedetailrec) {
				console.log('UPDATE UNIT PURCHASE LETTER DATA...');
				// console.log(purchaselettedetailrec[0]);
				form.down('[name=purchaseletter_id]').setValue(purchaselettedetailrec[0].get('purchaseletter_id'));
				form.down('[name=unit_id]').setValue(purchaselettedetailrec[0].get('unit_id'));
				form.down('[name=cluster_code]').setValue(purchaselettedetailrec[0].get('cluster_code'));
				form.down('[name=block_code]').setValue(purchaselettedetailrec[0].get('block_code'));
				form.down('[name=pricetype_id]').setValue(purchaselettedetailrec[0].get('pricetype_id'));
				form.down('[name=customer_city_id]').setValue(purchaselettedetailrec[0].get('customer_city_id'));
				form.down('[name=bankkpr_id]').setValue(purchaselettedetailrec[0].get('bankkpr_id'));
				form.down('[name=akad_realisasiondate]').setValue(purchaselettedetailrec[0].get('akad_realisasiondate'));
				form.down('[name=kpapprove_date]').setValue(purchaselettedetailrec[0].get('kpapprove_date'));

				var harga_netto = purchaselettedetailrec[0].get('harga_total_jual');
				form.down('[name=harga_netto]').setValue(me.fmb(harga_netto));

				var harga_jual = purchaselettedetailrec[0].get('harga_total_jual');
				var total_payment = purchaselettedetailrec[0].get('total_payment');
				form.down('[name=total_payment]').setValue(me.fmb(total_payment));

				if (harga_jual && total_payment) {
					var payment_percentage = (total_payment / harga_jual) * 100;
					form.down('[name=payment_percentage]').setValue(me.fmb(payment_percentage));
				} else {
					form.down('[name=payment_percentage]').setValue('');
				}

				//					var akad_realisasiondate;
				//					akad_realisasiondate = purchaselettedetailrec[0].get('akad_realisasiondate');
				//					if(akad_realisasiondate){
				//						akad_realisasiondate = akad_realisasiondate.replace(' 00:00:00.000','');
				//						akad_realisasiondate = akad_realisasiondate.split("-");
				//						akad_realisasiondate = akad_realisasiondate[2] + '-' + akad_realisasiondate[1] + '-' + akad_realisasiondate[0];
				//						form.down('[name=akad_realisasiondate]').setValue(akad_realisasiondate);
				//					}

				var kpr_value_approve = purchaselettedetailrec[0].get('kpr_value_approve');
				form.down('[name=kpr_value_approve]').setValue(me.fmb(kpr_value_approve));

				//					var kpapprove_date;
				//					kpapprove_date = purchaselettedetailrec[0].get('kpapprove_date');
				//					if(kpapprove_date){
				//						kpapprove_date = kpapprove_date.replace(' 00:00:00.000','');
				//						kpapprove_date = kpapprove_date.split("-");
				//						kpapprove_date = kpapprove_date[2] + '-' + kpapprove_date[1] + '-' + kpapprove_date[0];
				//						form.down('[name=kpapprove_date]').setValue(kpapprove_date);
				//					}

				me.fillUnitDataToFormPencairan(purchaselettedetailrec[0]);
				me.fillMasterCustomerDataToFormPencairan(purchaselettedetailrec[0], 'customer');

				//load grid Pencairan KPR
				var pencairankprStore = me.getPencairankprStore();
				pencairankprStore.removeAll();
				pencairankprStore.load({
					params: {purchaseletter_id: record.data.purchaseletter_id},
					callback: function (pencairanrec) {
						me.tcb_synch();
					}
				});

				//load customer document
				var customerdocumentStore = me.getMastercustomerdocumentadmincollectionStore();
				customerdocumentStore.removeAll();
				if (purchaselettedetailrec[0].get('customer_id') > 0) {
					customerdocumentStore.load({params: {customer_id: purchaselettedetailrec[0].get('customer_id')}});
				}

				el.body.unmask();

				if (record.data.is_alreadyakad == 0) {
					Ext.Msg.show({
						title: 'Info',
						msg: 'Belum Akad Kredit, tidak bisa Generate Schema Pencairan',
						icon: Ext.Msg.WARNING,
						buttons: Ext.Msg.OK,
						fn: function () {
							var pencairanGrid = me.getPencairangrid();
							pencairanGrid.down('#btnAddSchema').setDisabled(true);
							pencairanGrid.down('#btnGenerateSchema').setDisabled(true);

							me.isAlreadyAkad = 0
						}
					});
				} else {
					me.isAlreadyAkad = 1
				}
			}
		});
		var pencairanGrid = me.getPencairangrid();
		pencairanGrid.getView().getHeaderCt().child('#colms_bilyet_no').show();
		pencairanGrid.getView().getHeaderCt().child('#colms_realisation_date').show();

		//}
	},
	fillUnitDataToFormPencairan: function (data) {

		var me = this;
		var filledFields = ['productcategory', 'type_name', 'land_size', 'long', 'building_size', 'width', 'kelebihan', 'floor', 'block_id', 'cluster_id', 'unit_number', 'pt_name', 'electricity'];

		for (var x in filledFields) {
			if (me.getPencairanformdata().down('[name=unit_' + filledFields[x] + ']') != null) {
				me.getPencairanformdata().down('[name=unit_' + filledFields[x] + ']').setValue(data.data['unit_' + filledFields[x]]);
			}

		}
	},
	fillMasterCustomerDataToFormPencairan: function (records, prefix) {
		var pr = typeof prefix === 'undefined' ? 'customer' : prefix;
		var me = this;
		var filledFields = [
			'name', 'ktp', 'npwp', 'address', 'homephone', 'email', 'mobilephone', 'officephone'
		];
		console.log('RECORDS CUSTOMER...');
		// console.log(records);

		for (var x in filledFields) {
			if (me.getPencairanformdata().down('[name=' + pr + '_' + filledFields[x] + ']') != null) {
				me.getPencairanformdata().down('[name=' + pr + '_' + filledFields[x] + ']').setValue(records.data[pr + '_' + filledFields[x]]);
			}

		}
	},
	gridPencairanSelectionChange: function () {
		var me = this;
		var grid = me.getPencairangrid(), row = grid.getSelectionModel().getSelection();

		grid.down('#btnPrintRetensi').setDisabled(row.length < 1);
	},
	formDataPencairanDetailBeforeRender: function (el) {
		var me = this;
		var txt = el.down('[name=pencairan_amount]');
		if (me.enableEditPencairanAmount === 1) {
			txt.setReadOnly(false);
		} else {
			txt.setReadOnly(true);
		}

		var ftStore = null;
		ftStore = el.down('[name=plafon_id]').getStore();
		ftStore.removeAll();
		ftStore.load({params: {start: 0, limit: 0}});

		var winId = me.detailTool.parentFDWindowId;
		//		if(winId == 'win-fullpaymentformdata'){
		//			el.down('[name=bilyet_no]').setVisible(true);
		//			el.down('[name=realisation_date]').setVisible(true);
		//		}

		el.down('[name=bilyet_no]').setVisible(true);
		el.down('[name=realisation_date]').setVisible(true);
	},
	detailForm: {
		that: this,
		editingIndexRow: 0,
		fillPencairanAmount: function (f, e) {
			var me = this;

			var winId = me.detailTool.parentFDWindowId;
			var win = desktop.getWindow(winId);
			var formParent = win.down('form');

			var persen_pencairan = toFloat(me.getPencairanformdatadetail().down('[name=persen_pencairan]').getValue());
			if (persen_pencairan > 100) {
				persen_pencairan = 100;
				me.getPencairanformdatadetail().down('[name=persen_pencairan]').setValue(persen_pencairan);
			}

			//var kpr_value_approve = toFloat(me.getPencairanformdata().down('[name=kpr_value_approve]').getValue());
			var kpr_value_approve = toFloat(formParent.down('[name=kpr_value_approve]').getValue());
			var pencairan_amount = (persen_pencairan * kpr_value_approve) / 100;
			me.getPencairanformdatadetail().down('[name=pencairan_amount]').setValue(me.fmb(pencairan_amount));
		},
		save: function () {
			var me = this;

			var winId = me.detailTool.parentFDWindowId;
			var win = desktop.getWindow(winId);
			var formParent = win.down('form');
			//console.log(formParent.down('[name=purchaseletter_id]').getValue());

			var form = me.getPencairanformdatadetail().getForm();
			var formVal = me.getPencairanformdatadetail().getForm().getValues();
			var pencairanAmount = formVal.pencairan_amount;

			//var purchaseletterId = me.getPencairanformdata().down('[name=purchaseletter_id]').getValue();
			//var totalRealisasi = toFloat(me.getPencairanformdata().down('[name=kpr_value_approve]').getValue());

			var purchaseletterId = formParent.down('[name=purchaseletter_id]').getValue();
			var totalRealisasi = toFloat(formParent.down('[name=kpr_value_approve]').getValue());

			var keterangan = me.getPencairanformdatadetail().down('[name=plafon_id]').getRawValue();

			var msg = '';
			var erR = 0;

			/*if (toFloat(pencairanAmount) <= 0) {
			 msg = 'Zero Amount';
			 erR++;
			 }*/
			if (erR++) {
				Ext.Msg.show({
					title: 'Alert',
					msg: msg,
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK,
					fn: function () {

					}
				});
			} else {
				if (form.isValid()) {

					var dStore = null;
					var win = me.getPencairanformdatadetail().up('window');

					dStore = me.getPencairangrid().getStore();
					var listPlafonId = [];
					dStore.each(function (rec) {
						if (rec != null) {
							listPlafonId.push(rec.get('plafon_id'));
						}
					});

					var val = {
						purchaseletter_id: purchaseletterId,
						payment_id: formVal.payment_id,
						escrow_date: formVal.escrow_date,
						pencairan_date: formVal.pencairan_date,
						persen_pencairan: formVal.persen_pencairan,
						pencairan_amount: toFloat(formVal.pencairan_amount),
						pengajuan_berkas_date: formVal.pengajuan_berkas_date,
						plafon_id: formVal.plafon_id,
						keterangan: keterangan,
						duedate_escrow: formVal.duedate_escrow,
						bilyet_no: formVal.bilyet_no,
						realisation_date: formVal.realisation_date
					};

					if (win.state == 'create') {
						if (listPlafonId.indexOf(formVal.plafon_id) == -1) {
							dStore.add(val);
						} else {
							Ext.Msg.show({
								title: 'Warning',
								msg: 'Plafon sudah terdaftar',
								icon: Ext.Msg.WARNING,
								buttons: Ext.Msg.OK
							});
						}
					} else {

						var rec = dStore.getAt(me.detailForm.editingIndexRow);
						rec.beginEdit();
						rec.set(val);
						rec.endEdit();
					}

					win.close();

				}
			}
		}
	},
	detailGrid: {
		that: this,
		actionColumnClick: function (view, cell, row, col, e) {
			var me = this;
			var gr = me.getPencairangrid();
			var record = gr.getStore().getAt(row);
			var m = e.getTarget().className.match(/\bact-(\w+)\b/);
			gr.getSelectionModel().select(row);

			if (m) {
				var btnDelPencairan = m.input.match(/x-item-disabled/gi);
			}

			if (m) {
				switch (m[1]) {
					case 'PencairankprUpdate':
						/*if (record.get('pencairan_date') && record.dirty == false) {
						 Ext.Msg.show({
						 title: 'Warning', 
						 msg: 'Pencairan yang sudah memiliki tanggal cair tidak dapat diubah.',
						 icon: Ext.Msg.WARNING,
						 buttons: Ext.Msg.OK
						 });	
						 } else {*/

						me.detailTool.form().show('update', 500, 'Edit');
						me.detailForm.editingIndexRow = row;
						me.getPencairanformdatadetail().getForm().setValues({
							purchaseletter_pencairankpr_id: record.get('purchaseletter_pencairankpr_id'),
							purchaseletter_id: record.get('purchaseletter_id'),
							payment_id: record.get('payment_id'),
							schedule_id: record.get('schedule_id'),
							escrow_date: record.get('escrow_date'),
							pencairan_date: record.get('pencairan_date'),
							persen_pencairan: (record.get('persen_pencairan')) ? me.fmb(record.get('persen_pencairan')) : 0, //record.get('persen_pencairan'),
							pencairan_amount: me.fmb(record.get('pencairan_amount')),
							plafon_id: record.get('plafon_id'),
							pengajuan_berkas_date: record.get('pengajuan_berkas_date'),
							duedate_escrow: record.get('duedate_escrow'),
							bilyet_no: record.get('bilyet_no'),
							realisation_date: record.get('realisation_date')
						});

						if (record.get('pencairan_date') && !record.isModified('pencairan_date') && record.get('purchaseletter_pencairankpr_id')) {
							// me.getPencairanformdatadetail().down('[name=escrow_date]').setReadOnly(true);
							// me.getPencairanformdatadetail().down('[name=pengajuan_berkas_date]').setReadOnly(true);
							// me.getPencairanformdatadetail().down('[name=duedate_escrow]').setReadOnly(true);
							me.getPencairanformdatadetail().down('[name=pencairan_date]').setReadOnly(true);
							me.getPencairanformdatadetail().down('[name=persen_pencairan]').setReadOnly(true);
							me.getPencairanformdatadetail().down('[name=pencairan_amount]').setReadOnly(true);
						} else {
							// me.getPencairanformdatadetail().down('[name=escrow_date]').setReadOnly(false);
							// me.getPencairanformdatadetail().down('[name=pengajuan_berkas_date]').setReadOnly(false);
							// me.getPencairanformdatadetail().down('[name=duedate_escrow]').setReadOnly(false);
							me.getPencairanformdatadetail().down('[name=pencairan_date]').setReadOnly(false);
							me.getPencairanformdatadetail().down('[name=persen_pencairan]').setReadOnly(false);
							me.getPencairanformdatadetail().down('[name=pencairan_amount]').setReadOnly(false);
						}
						//}
						break;
					case 'PencairankprDelete':
						if (!btnDelPencairan) {
							//if (record.get('pencairan_date') && record.dirty == false) {
							if (record.get('pencairan_date') && !record.isModified('pencairan_date') && record.get('purchaseletter_pencairankpr_id')) {
								Ext.Msg.show({
									title: 'Warning',
									msg: 'Pencairan yang sudah memiliki tanggal cair tidak dapat dihapus.',
									icon: Ext.Msg.WARNING,
									buttons: Ext.Msg.OK
								});
							} else {
								//added confirmation by anas 23062021
								Ext.Msg.confirm('Confirm', 'Are you sure want to delete ?', function (btn) {
									if (btn == "yes") {
										record.set("deleted", true);
										gr.getStore().filterBy(function (recod) {
											return recod.data.deleted == false;
										});
									}
								});
								break;
							}
						}
				}
			}
		},
		hitungRealisasi: function (ctrl) {
			var me = ctrl;
			var dStore = me.getPencairangrid().getStore();
			var total = 0;
			dStore.each(function (rec) {
				if (rec != null) {
					total += toFloat(rec.get('pencairan_amount'));
				}
			});
			return total;
		},
		hitungTotalPersenPencairan: function (ctrl) {
			var me = ctrl;
			var dStore = me.getPencairangrid().getStore();
			var total = 0;
			dStore.each(function (rec) {
				if (rec != null) {
					if (rec.get('persen_pencairan') != null) {
						total += toFloat(rec.get('persen_pencairan'));
					}
				}
			});
			return total;
		}
	},
	dataSearchFilterby: function (val) {
		var me = this;

		var form = me.getFormsearch().getForm();
		var fields = me.getFormsearch().getValues();
		//var store = me.getGrid().getStore();
		//var grid = me.getGrid();
		// me.getGrid().doInit();
		var store = me.getGrid().getStore();
		for (var x in fields) {
			store.getProxy().setExtraParam(x, fields[x]);
		}
		store.getProxy().setExtraParam('cancel_type', val);

		me.loadPage(store);

	},
	dataSavePencairan: function () {
		var me = this;
		var store = me.getPencairangrid().getStore();

		var winId = me.detailTool.parentFDWindowId;
		var win = desktop.getWindow(winId);
		var formParent = win.down('form');
		//console.log(winId); //win-pencairanformdata, win-fullpaymentformdata

		if (me.isAlreadyAkad == 1) {

			if (store.getCount() == 0) {
				Ext.Msg.show({
					title: 'Alert',
					msg: 'Detail Pencairan Records cannot be empty.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK,
				});
				return false;
			}

			var totalPencairanAmountGrid = toFloat(me.detailGrid.hitungRealisasi(me));
			//var totalRealisasi = toFloat(me.getPencairanformdata().down('[name=kpr_value_approve]').getValue());
			var totalRealisasi = toFloat(formParent.down('[name=kpr_value_approve]').getValue());

			if (isNaN(totalPencairanAmountGrid)) {
				totalPencairanAmountGrid = 0;
			}
			if (isNaN(totalRealisasi)) {
				totalRealisasi = 0;
			}

			totalPencairanAmountGrid = Math.round(totalPencairanAmountGrid * 100) / 100;
			totalRealisasi = Math.round(totalRealisasi * 100) / 100;

			var totalPersenPencairan = toFloat(me.detailGrid.hitungTotalPersenPencairan(me));
			if (totalPersenPencairan != 100) {
				Ext.Msg.show({
					title: 'Alert',
					msg: 'Total Persen Pencairan harus 100%',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
				return false;
			}
			//else if(totalPencairanAmountGrid > totalRealisasi){
			else if (totalPencairanAmountGrid != totalRealisasi) {
				// console.log(totalPencairanAmountGrid);
				// console.log(totalRealisasi);
				var msgText = 'Skema Pencairan harus sama dengan Total Realisasi<br />Total Realisasi: Rp. ' + me.fmb(totalRealisasi) + '<br />Skema Pencairan: Rp. ' + me.fmb(totalPencairanAmountGrid) + '<br />Selisih: Rp. ' + me.fmb((totalPencairanAmountGrid - totalRealisasi));

				Ext.Msg.show({
					title: 'Alert',
					//msg: 'Total Pencairan Amount\n\nlebih besar dari Total Realisasi',
					msg: msgText,
					icon: Ext.Msg.WARNING,
					buttons: Ext.Msg.OK
				});
				return false;

			} else {

				store.clearFilter(true);

				//me.getPencairanformdata().up('window').body.mask('Saving, please wait ...');
				formParent.up('window').body.mask('Saving, please wait ...');
				var data = [];
				for (var i = 0; i < store.getCount(); i++) {
					store.each(function (record, idx) {
						if (i == idx) {
							if (record.data.keterangan) {
								record.data.keterangan = '';
							}
							data[i] = record.data;
						}
					});
				}

				var myObj = {
					winId: winId,
					data_detail: data
				}

				Ext.Ajax.request({
					url: 'erems/pencairankpr/create',
					//params:'data='+Ext.encode(data),
					params: {
						data: Ext.encode(myObj)
					},
					success: function (response) {

						try {
							var resp = response.responseText;
							if (resp) {
								var info = Ext.JSON.decode(resp);
								//me.getPencairanformdata().up('window').body.unmask();
								//if(Ext.decode(response.responseText).success == true)
								if (info.success == true) {
									//me.getPencairanformdata().up('window').body.unmask();			
									formParent.up('window').body.unmask();
									Ext.Msg.show({
										title: 'Success',
										msg: 'Data saved successfully.',
										icon: Ext.Msg.INFO,
										buttons: Ext.Msg.OK,
										fn: function () {
											//me.getPencairanformdata().up('window').close(); 
											formParent.up('window').close();
											var gridDepan = me.getGrid();
											var storeDepan = gridDepan.getStore();
											storeDepan.reload();
										}
									});

								} else {
									//me.getPencairanformdata().up('window').body.unmask();
									formParent.up('window').body.unmask();
									Ext.Msg.show({
										title: 'Failure',
										msg: 'Error: Unable to save data.',
										icon: Ext.Msg.ERROR,
										buttons: Ext.Msg.OK
									});
								}
							}
						} catch (e) {
							//console.error(e);
							//me.getPencairanformdata().up('window').body.unmask();
							formParent.up('window').body.unmask();
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
		} else {
			store.clearFilter(true);

			//me.getPencairanformdata().up('window').body.mask('Saving, please wait ...');
			formParent.up('window').body.mask('Saving, please wait ...');
			var data = [];
			for (var i = 0; i < store.getCount(); i++) {
				store.each(function (record, idx) {
					if (i == idx) {
						if (record.data.keterangan) {
							record.data.keterangan = '';
						}
						data[i] = record.data;
					}
				});
			}

			var myObj = {
				winId: winId,
				data_detail: data
			}

			Ext.Ajax.request({
				url: 'erems/pencairankpr/create',
				//params:'data='+Ext.encode(data),
				params: {
					data: Ext.encode(myObj)
				},
				success: function (response) {

					try {
						var resp = response.responseText;
						if (resp) {
							var info = Ext.JSON.decode(resp);
							//me.getPencairanformdata().up('window').body.unmask();
							//if(Ext.decode(response.responseText).success == true)
							if (info.success == true) {
								//me.getPencairanformdata().up('window').body.unmask();			
								formParent.up('window').body.unmask();
								Ext.Msg.show({
									title: 'Success',
									msg: 'Data saved successfully.',
									icon: Ext.Msg.INFO,
									buttons: Ext.Msg.OK,
									fn: function () {
										//me.getPencairanformdata().up('window').close(); 
										formParent.up('window').close();
										var gridDepan = me.getGrid();
										var storeDepan = gridDepan.getStore();
										storeDepan.reload();
									}
								});

							} else {
								//me.getPencairanformdata().up('window').body.unmask();
								formParent.up('window').body.unmask();
								Ext.Msg.show({
									title: 'Failure',
									msg: 'Error: Unable to save data.',
									icon: Ext.Msg.ERROR,
									buttons: Ext.Msg.OK
								});
							}
						}
					} catch (e) {
						//console.error(e);
						//me.getPencairanformdata().up('window').body.unmask();
						formParent.up('window').body.unmask();
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
	},
	//end click pencairan
	//================================ END PENCAIRAN ===============================

	fillUnitDataToForm: function (data) {

		var me = this;
		var filledFields = ['productcategory', 'type_name', 'land_size', 'long', 'building_size', 'width', 'kelebihan', 'floor', 'block_id', 'cluster_id', 'unit_number', 'pt_name', 'electricity'];
		for (var x in filledFields) {
			if (me.getFormdata().down('[name=unit_' + filledFields[x] + ']') != null) {
				me.getFormdata().down('[name=unit_' + filledFields[x] + ']').setValue(data.data['unit_' + filledFields[x]]);
			}

		}
	},
	fillMasterCustomerData: function (records, prefix) {
		var pr = typeof prefix === 'undefined' ? 'customer' : prefix;
		var me = this;
		var filledFields = [
			'name', 'ktp', 'npwp', 'address', 'ktp_address', 'homephone', 'email', 'mobilephone', 'officephone'
		];
		// console.log('RECORDS CUSTOMER...');
		// console.log(filledFields);
		// console.log(records.data);

		for (var x in filledFields) {
			if (me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']') != null) {
				me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']').setValue(records.data[pr + '_' + filledFields[x]]);
			}
		}
	},

	/*checkAllDetailLoadingProcess: function() {
	 var me = this;
	 if (me.countLoadProcess === 4) {
	 me.getFormdata().up('window').body.unmask();
	 }
	 },*/

	formDataBeforeRender: function (el) {
		var me = this;
		setupObject(el, me.execAction, me);
	},
	formDataAfterRender: function (el) {

		var me = this;

		// var cbcolStore = null;
		// cbcolStore = el.down('#fd_collectorcb').getStore();
		// cbcolStore.proxy.extraParams = { mode_read: 'mastercollector', position: 8 };
		// cbcolStore.load();
		// cbcolStore.load({ params: { start: 0, limit: 0, mode_read: "mastercollector", position: 8 } });

		me.loadComboBoxStore(el);
		var state = el.up('window').state;

		//show form add pencarian 
		me.detailTool = new Erems.library.DetailtoolAll();
		me.detailTool.setConfig({
			viewPanel: 'BankFormDataDetail',
			parentFDWindowId: me.getFormdata().up('window').id,
			controllerName: me.controllerName
		});
		me.detailTool.parentGridAlias = 'admincollectionbankgrid';

		//city combobox
		var ftStore = null;
		ftStore = el.down('#fd_city').getStore();
		ftStore.load({params: {start: 0, limit: 0, country_id: 87}});

		//untuk mereset filter pada detail grid apabila pernah di edit
		me.detailBankForm.editingIndexRow = 0;
		me.detailBankForm.clickIndexRow = [];

		if (state == 'create') {
			// el.down('#active').setValue(1);
			//me.getFormdata().down('#btnSave').setDisabled(false);
		} else if (state == 'update') {
			me.countLoadProcess = 0;
			me.getFormdata().up('window').body.mask('Loading data, please wait ...');

			var grid = me.getGrid();
			var store = grid.getStore();
			var form = me.getFormdata();

			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);

			// load purchase letter data
			el.body.mask('Loading Purchaseletter & List Bank KPR data, please wait ...');
			var purchaseletterdetailStore = me.getPurchaseletterdetailStore();
			purchaseletterdetailStore.removeAll();
			purchaseletterdetailStore.load({
				params: {purchaseletter_id: record.data.purchaseletter_id, mode_read: 'detail'},
				callback: function (purchaselettedetailrec) {
					// console.log('UPDATE UNIT PURCHASE LETTER DATA...');
					// console.log(purchaselettedetailrec[0]);
					form.down('[name=purchaseletter_id]').setValue(purchaselettedetailrec[0].get('purchaseletter_id'));
					form.down('[name=unit_id]').setValue(purchaselettedetailrec[0].get('unit_id'));
					form.down('[name=cluster_code]').setValue(purchaselettedetailrec[0].get('cluster_code'));
					form.down('[name=block_code]').setValue(purchaselettedetailrec[0].get('block_code'));
					form.down('[name=citraclub_id]').setValue(purchaselettedetailrec[0].get('clubcitra_id'));
					form.down('[name=pricetype_id]').setValue(purchaselettedetailrec[0].get('pricetype_id'));
					form.down('[name=customer_city_id]').setValue(purchaselettedetailrec[0].get('customer_city_id'));
					form.down('[name=harga_jual]').setValue(me.fmb(purchaselettedetailrec[0].get('harga_total_jual')));
					form.down('[name=kpr_plan]').setValue(me.fmb(purchaselettedetailrec[0].get('kpr_plan_amount')));
					form.down('[name=akad_realisasiondate]').setValue(purchaselettedetailrec[0].get('akad_realisasiondate'));

					me.fillUnitDataToForm(purchaselettedetailrec[0]);
					me.fillMasterCustomerData(purchaselettedetailrec[0], 'customer');

					//load grid Bank KPR
					var bankkprStore = me.getBankkprStore();
					bankkprStore.removeAll();
					bankkprStore.load({params: {purchaseletter_id: record.data.purchaseletter_id}});

					//load customer document
					var customerdocumentStore = me.getMastercustomerdocumentadmincollectionStore();
					customerdocumentStore.removeAll();
					if (purchaselettedetailrec[0].get('customer_id') > 0) {
						customerdocumentStore.load({params: {customer_id: purchaselettedetailrec[0].get('customer_id')}});
					}

					me.countLoadProcess += 1;
					//me.checkAllDetailLoadingProcess();
					el.body.unmask();
				}
			});

			el.body.mask('Loading Purchaseletter & List Bank KPR data, please wait ...');
			var admincollectionscheduleStore = me.getAdmincollectionscheduleStore();
			admincollectionscheduleStore.removeAll();
			admincollectionscheduleStore.load({
				params: {purchaseletter_id: record.data.purchaseletter_id},
				callback: function (purchaselettedetailrec) {
					var totalAmount = 0;
					var total_balance = 0; // added by rico 10052023

					for (var i = 0; i < admincollectionscheduleStore.getCount(); i++) {
						admincollectionscheduleStore.each(function (record, idx) {
							if (i == idx) {
								if (record.data.scheduletype == 'KPR') {
									totalAmount += parseFloat(record.data.amount);
								}

								if(record.data.scheduletype_id == 4 || record.data.scheduletype_id == 5){
									total_balance += parseFloat(record.data.remaining_balance);
								}
							}
						});
					}

					me.getFormdata().down('[name=remaining_balance]').setValue(total_balance); // added by rico 10052023

					me.BankKPRRealisationDefault = totalAmount;
					el.body.unmask();
				}
			});

			if (record.data.is_recommended_tocancel) {
				if (record.data.recommended_tocancel == 'LEGAL') {
					form.down('#btnBatalByLegal').setText('Remove Batal By Legal');
					form.down('#btnBatalByCollection').setVisible(false);
				} else if (record.data.recommended_tocancel == 'COLLECTION') {
					form.down('#btnBatalByCollection').setText('Remove Batal By Collection');
					form.down('#btnBatalByLegal').setVisible(false);
				}
			}

			if (me.subholding_config == 1) {
				form.down('[name=customer_address]').setReadOnly(false);
				form.down('[name=customer_ktp_address]').setReadOnly(false); //add by dika 20/19/2022
				form.down('[name=customer_homephone]').setReadOnly(false);
				form.down('[name=customer_mobilephone]').setReadOnly(false);
				form.down('[name=customer_officephone]').setReadOnly(false);
				form.down('[name=customer_email]').setReadOnly(false);
				form.down('[name=notes_batal]').labelEl.update('Notes');
			}

			// Ext.Ajax.request({
			// 	url: 'erems/admincollection/read',
			// 	params: {
			// 		read_type_mode: 'subholding_config'
			// 	},
			// 	success: function (response) {
			// 		if (response.responseText == 1) {
			// 			form.down('[name=customer_address]').setReadOnly(false);
			// 			form.down('[name=customer_homephone]').setReadOnly(false);
			// 			form.down('[name=customer_mobilephone]').setReadOnly(false);
			// 			form.down('[name=customer_officephone]').setReadOnly(false);
			// 			form.down('[name=customer_email]').setReadOnly(false);
			// 			form.down('[name=notes_batal]').labelEl.update('Notes');
			// 		}
			// 	}
			// });
		}
	},
	//==== bank kpr ==========
	formDataBankAfterRender: function (el) {

		var me = this;
		//me.loadComboBoxStore(el);
		var state = el.up('window').state;

		//city combobox
		var ftStore = null;
		ftStore = el.down('#fd_bank').getStore();
		ftStore.load({params: {start: 0, limit: 0}});

		//load Master Akad Confirmation Status
		var akadStatusStore = me.getMasterakadconfirmationstatusStore();
		akadStatusStore.load();

		//show form akad kredit
		me.detailTool2 = new Erems.library.DetailtoolAll();
		me.detailTool2.setConfig({
			viewPanel: 'BankAkadFormDataDetail',
			parentFDWindowId: me.getBankformdatadetail().up('window').id,
			controllerName: me.controllerName
		});
		me.detailTool2.parentGridAlias = 'admincollectionbankgridakad';

		if (state == 'create') {
			me.getBankformdatadetail().down('[name=kpr_realisation]').setValue(me.fmb(me.BankKPRRealisationDefault));
			var bankkprakadStore = me.getBankkprakadStore();
			bankkprakadStore.removeAll();

			el.down('[name=temp_id_detail]').setValue(me.randomString(10));
		}
		me.tcb();

		if (me.subholding_config == 1) {
			var form = me.getBankformdatadetail();
			form.down('[name=is_cekberkas]').setVisible(true);
			form.down('[name=is_cekinterview]').setVisible(true);
			form.down('[name=is_cekkpr]').setVisible(true);
			form.down('[name=is_cekakad]').setVisible(true);
			form.down('[name=kpr_realisation]').setReadOnly(false);
		}

		//show is_cek.. if SH1
		// Ext.Ajax.request({
		// 	url: 'erems/admincollection/read',
		// 	params: {
		// 		read_type_mode: 'subholding_config'
		// 	},
		// 	success: function (response) {
		// 		if (response.responseText == 1) {
		// 			var form = me.getBankformdatadetail();
		// 			form.down('[name=is_cekberkas]').setVisible(true);
		// 			form.down('[name=is_cekinterview]').setVisible(true);
		// 			form.down('[name=is_cekkpr]').setVisible(true);
		// 			form.down('[name=is_cekakad]').setVisible(true);
		// 			form.down('[name=kpr_realisation]').setReadOnly(false);
		// 		}
		// 	}
		// });
	},

	//for callback (function in function)
	tcb: function () {
		var me = this;
		me.fillKPRCicilan();
	},
	fillKPRCicilan: function () {
		var me = this;
		var kpr_realisation = toFloat(me.getBankformdatadetail().down('[name=kpr_realisation]').getValue());
		var kpr_tenor = toFloat(me.getBankformdatadetail().down('[name=kpr_tenor]').getValue());
		var kpr_interest = toFloat(me.getBankformdatadetail().down('[name=kpr_interest]').getValue());

		var totalCicilan = me.PMT(kpr_interest / 1200, kpr_tenor, -kpr_realisation);

		me.getBankformdatadetail().down('[name=kpr_cicilan]').setValue(me.fmb(totalCicilan));
	},
	PMT: function (i, n, p) {
		return i * p * Math.pow((1 + i), n) / (1 - Math.pow((1 + i), n));
	},
	detailBankForm: {
		that: this,
		editingIndexRow: 0,
		clickIndexRow: [],
		fillCreatedby: function () {
			var me = this;
			var kpr_interest = toFloat(me.getBankformdatadetail().down('[name=kpr_interest]').getValue());
			if (kpr_interest > 100) {
				me.getBankformdatadetail().down('[name=kpr_interest]').setValue(100)
			}

			me.getBankformdatadetail().down('[name=kpr_createdby_name]').setValue(apps.loginname);
			me.tcb();
		},
		save: function () {
			var me = this;

			var form = me.getBankformdatadetail().getForm();
			var formVal = me.getBankformdatadetail().getForm().getValues();

			var purchaseletterId = me.getFormdata().down('[name=purchaseletter_id]').getValue();

			var msg = '';
			var win = me.getBankformdatadetail().up('window');

			if (form.isValid()) {
				//jika centang check di centang (req SH1)
				if (formVal.is_cekberkas == 1) {
					var date_1 = me.getFormdata().down('[name=firstpurchase_date]').getValue();
					var date_2 = formVal.berkasmasuk_date;
					var date_3 = formVal.berkasbank_date;
					var date1 = new Date(date_1);
					var date2 = new Date(date_2);
					var date3 = new Date(date_3);

					if (date2 < date1) {
						Ext.Msg.show({
							title: 'Info',
							msg: 'Tanggal berkas masuk tidak boleh lebih kecil dari Tanggal Purchaseletter',
							icon: Ext.Msg.WARNING,
							buttons: Ext.Msg.OK
						});
						return false;
					}
					if (date3 < date2) {
						Ext.Msg.show({
							title: 'Info',
							msg: 'Tanggal di Bank tidak boleh lebih kecil dari Tanggal berkas masuk',
							icon: Ext.Msg.WARNING,
							buttons: Ext.Msg.OK
						});
						return false;
					}
				}

				if (formVal.is_cekinterview == 1) {
					var date_1 = formVal.berkasbank_date;
					var date_2 = formVal.interviewplan_date;
					var date_3 = formVal.interview_date;
					var date1 = new Date(date_1);
					var date2 = new Date(date_2);
					var date3 = new Date(date_3);

					if (date2 < date1) {
						Ext.Msg.show({
							title: 'Info',
							msg: 'Interview plan date tidak boleh lebih kecil dari Tanggal di Bank',
							icon: Ext.Msg.WARNING,
							buttons: Ext.Msg.OK
						});
						return false;
					}
					if (date3 < date2) {
						Ext.Msg.show({
							title: 'Info',
							msg: 'Interview date tidak boleh lebih kecil dari Interview plan date',
							icon: Ext.Msg.WARNING,
							buttons: Ext.Msg.OK
						});
						return false;
					}
				}

				if (formVal.is_cekkpr == 1) {
					var date_1 = formVal.interview_date;
					var date_2 = formVal.kpr_acc_date;
					var date_3 = formVal.berkasbank_date;

					var date1 = new Date(date_1);
					var date2 = new Date(date_2);
					var date3 = new Date(date_3);

					if (date_1) {
						if (date2 < date1) {
							Ext.Msg.show({
								title: 'Info',
								msg: 'ACC Date tidak boleh lebih kecil dari Interview date',
								icon: Ext.Msg.WARNING,
								buttons: Ext.Msg.OK
							});
							return false;
						}
					} else {
						if (date2 < date3) {
							Ext.Msg.show({
								title: 'Info',
								msg: 'ACC Date tidak boleh lebih kecil dari Tanggal di Bank',
								icon: Ext.Msg.WARNING,
								buttons: Ext.Msg.OK
							});
							return false;
						}
					}
				}

				if (formVal.is_cekkpr == 1) {
					var date_1 = formVal.interview_date;
					var date_2 = formVal.rejected_date;
					var date_3 = formVal.berkasbank_date;

					var date1 = new Date(date_1);
					var date2 = new Date(date_2);
					var date3 = new Date(date_3);

					if (date_1) {
						if (date2 < date1) {
							Ext.Msg.show({
								title: 'Info',
								msg: 'Rejected date tidak boleh lebih kecil dari Interview date',
								icon: Ext.Msg.WARNING,
								buttons: Ext.Msg.OK
							});
							return false;
						}
					} else {
						if (date2 < date3) {
							Ext.Msg.show({
								title: 'Info',
								msg: 'Rejected date tidak boleh lebih kecil dari Tanggal di Bank',
								icon: Ext.Msg.WARNING,
								buttons: Ext.Msg.OK
							});
							return false;
						}
					}
				}

				if (formVal.is_cekakad == 1) {
					var date_1 = formVal.kpr_acc_date;
					var date_2 = formVal.akadplan_date;
					var date1 = new Date(date_1);
					var date2 = new Date(date_2);

					if (date2 < date1) {
						Ext.Msg.show({
							title: 'Info',
							msg: 'Akad plan date tidak boleh lebih kecil dari ACC Date',
							icon: Ext.Msg.WARNING,
							buttons: Ext.Msg.OK
						});
						return false;
					}
				}
				// end jika centang check di centang (req SH1)

				/*if(toFloat(formVal.kpr_realisation) > me.BankKPRRealisationDefault){
				 Ext.Msg.alert('Info', 'Nilai Realisasi KPR (KPR Realisation Amount) tidak boleh lebih besar dari Nilai Pengajuan KPR');
				 } else {*/
				var dStore = null;
				var win = me.getBankformdatadetail().up('window');

				dStore = me.getBankgrid().getStore();

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
				//end detail akad store
				var val = {
					purchaseletter_id: purchaseletterId,
					bank_id: formVal.bank_id,
					bank_name: me.getBankformdatadetail().down('#fd_bank').getRawValue(),
					bank_createdby_name: formVal.bank_createdby_name,
					appraisalplan_date: formVal.appraisalplan_date,
					appraisal_date: formVal.appraisal_date,
					appraisal_createdby_name: formVal.appraisal_createdby_name,
					berkasmasuk_date: formVal.berkasmasuk_date,
					berkasbank_date: formVal.berkasbank_date,
					berkasbank_createdby_name: formVal.berkasbank_createdby_name,
					interviewplan_date: formVal.interviewplan_date,
					interview_date: formVal.interview_date,
					interview_createdby_name: formVal.interview_createdby_name,
					interview_pic: formVal.interview_pic,
					kpr_acc_date: formVal.kpr_acc_date,
					kpr_realisation: toFloat(formVal.kpr_realisation),
					kpr_tenor: formVal.kpr_tenor,
					kpr_interest: toFloat(formVal.kpr_interest),
					kpr_cicilan: toFloat(formVal.kpr_cicilan),
					kpr_createdby_name: formVal.kpr_createdby_name,
					rejected_date: formVal.rejected_date,
					nextprocess_date: formVal.nextprocess_date,
					reject_createdby_name: formVal.reject_createdby_name,
					akadplan_date: formVal.akadplan_date,
					akad_date: formVal.akad_date,
					akad_createdby_name: formVal.akad_createdby_name,
					note: formVal.note,
					is_bayarpajak: formVal.is_bayarpajak,
					pajak_amount: toFloat(formVal.pajak_amount),
					data_akad: data_akad,
					temp_id_detail: formVal.temp_id_detail,
					debitur_name: formVal.debitur_name,

					//added by anas 21062021
					no_sppk: formVal.no_sppk,

					//added by rico 06042022
					admin_fee_kpr: toFloat(formVal.admin_fee_kpr),
					//added by rico 21042022
					is_cair_fee_kpr: formVal.is_cair_fee_kpr,
					tanggal_cair_fee_kpr: formVal.tanggal_cair_fee_kpr,
					notes_fee_kpr: formVal.notes_fee_kpr,
					// added by rico 12072023
					nomor_konfirmasi_tunggakan_bank: formVal.nomor_konfirmasi_tunggakan_bank,
					tanggal_konfirmasi_tunggakan: formVal.tanggal_konfirmasi_tunggakan,
					nomor_surat_pemberitahuan_buyback_bank: formVal.nomor_surat_pemberitahuan_buyback_bank,
					tanggal_surat_pemberitahuan_buyback: formVal.tanggal_surat_pemberitahuan_buyback,
					lama_tunggakan_konfirmasi_tunggakan: formVal.lama_tunggakan_konfirmasi_tunggakan,
					lama_tunggakan_surat_pemberitahuan_buyback: formVal.lama_tunggakan_surat_pemberitahuan_buyback,
					nomor_konfirmasi_tunggakan_bank_2: formVal.nomor_konfirmasi_tunggakan_bank_2,
					tanggal_konfirmasi_tunggakan_2: formVal.tanggal_konfirmasi_tunggakan_2,
					lama_tunggakan_konfirmasi_tunggakan_2: formVal.lama_tunggakan_konfirmasi_tunggakan_2,
					nomor_konfirmasi_tunggakan_bank_3: formVal.nomor_konfirmasi_tunggakan_bank_3,
					tanggal_konfirmasi_tunggakan_3: formVal.tanggal_konfirmasi_tunggakan_3,
					lama_tunggakan_konfirmasi_tunggakan_3: formVal.lama_tunggakan_konfirmasi_tunggakan_3,
					collector_buyback_id: formVal.collector_buyback_id,
					collector_phone: formVal.collector_phone,
					nama_pic_bank: formVal.nama_pic_bank,
					email_pic_bank: formVal.email_pic_bank,
					phone_pic_bank: formVal.phone_pic_bank,
					alamat_bank: formVal.alamat_bank
				};

				if (win.state == 'create') {
					dStore.add(val);
				} else {

					var rec = dStore.getAt(me.detailBankForm.editingIndexRow);
					rec.beginEdit();
					rec.set(val);
					rec.endEdit();

					//untuk ngecek bahwa baris ini sudah diklik edit atau belum
					var editIdxRow = me.detailBankForm.editingIndexRow;
					var clickIdxRow = me.detailBankForm.clickIndexRow;
					if (clickIdxRow.indexOf(editIdxRow) == -1){ // if isn't already in the array
						clickIdxRow.push(editIdxRow);
					}
				}

				win.close();
				//}
			} else {
				if (Ext.isEmpty(formVal.bank_id)) {
					Ext.Msg.show({
						title: 'Info',
						msg: 'Bank KPR harus dipilih',
						icon: Ext.Msg.WARNING,
						buttons: Ext.Msg.OK
					});
					return false;
				}
			}
		}
	},

	detailBankGridItemDblClick: function (el) {
		var me = this,
				state = ('BankkprUpdate');
		me.execActionBankGrid(el, state);
	},
	execActionBankGrid: function (el, action, me) {
		if (!action) {
			action = '';
		}
		if (!me) {
			me = this;
		}

		switch (action) {
			case 'BankkprUpdate':
				var gr     = me.getBankgrid();
				var row    = gr.getStore().indexOf(gr.getSelectionModel().getSelection()[0]);
				var record = gr.getStore().getAt(row);

				if(typeof record != 'undefined'){
					me.detailTool.form().show('update', 700, 'Edit');
					me.detailBankForm.editingIndexRow = row;
					me.getBankformdatadetail().getForm().setValues({
						purchaseletter_bankkpr_id: record.get('purchaseletter_bankkpr_id'),
						purchaseletter_id: record.get('purchaseletter_id'),
						bank_id: record.get('bank_id'),
						bank_createdby_name: record.get('bank_createdby_name'),
						appraisalplan_date: record.get('appraisalplan_date'),
						appraisal_date: record.get('appraisal_date'),
						appraisal_createdby_name: record.get('appraisal_createdby_name'),
						berkasmasuk_date: record.get('berkasmasuk_date'),
						berkasbank_date: record.get('berkasbank_date'),
						berkasbank_createdby_name: record.get('berkasbank_createdby_name'),
						interviewplan_date: record.get('interviewplan_date'),
						interview_date: record.get('interview_date'),
						interview_createdby_name: record.get('interview_createdby_name'),
						interview_pic: record.get('interview_pic'),
						kpr_acc_date: record.get('kpr_acc_date'),
						kpr_realisation: (record.get('kpr_realisation')) ? me.fmb(record.get('kpr_realisation')) : "",
						kpr_tenor: record.get('kpr_tenor'),
						kpr_interest: (record.get('kpr_interest')) ? toFloat(record.get('kpr_interest')) : "",
						kpr_cicilan: (record.get('kpr_cicilan')) ? me.fmb(record.get('kpr_cicilan')) : "",
						kpr_createdby_name: record.get('kpr_createdby_name'),
						rejected_date: record.get('rejected_date'),
						nextprocess_date: record.get('nextprocess_date'),
						reject_createdby_name: record.get('reject_createdby_name'),
						akadplan_date: record.get('akadplan_date'),
						akad_date: record.get('akad_date'),
						akad_createdby_name: record.get('akad_createdby_name'),
						note: record.get('note'),
						is_bayarpajak: record.get('is_bayarpajak'),
						pajak_amount: (record.get('pajak_amount')) ? me.fmb(record.get('pajak_amount')) : "",

						//added by anas 21062021
						no_sppk: record.get('no_sppk'),

						//added by rico 06042022
						admin_fee_kpr: (record.get('admin_fee_kpr')) ? me.fmb(record.get('admin_fee_kpr')) : "",
						//added by rico 21042022
						is_cair_fee_kpr: record.get('is_cair_fee_kpr'),
						tanggal_cair_fee_kpr: record.get('tanggal_cair_fee_kpr'),
						notes_fee_kpr: record.get('notes_fee_kpr'),
						// added by rico 12072023
						nomor_konfirmasi_tunggakan_bank: record.get('nomor_konfirmasi_tunggakan_bank'),
						tanggal_konfirmasi_tunggakan: record.get('tanggal_konfirmasi_tunggakan'),
						nomor_surat_pemberitahuan_buyback_bank: record.get('nomor_surat_pemberitahuan_buyback_bank'),
						tanggal_surat_pemberitahuan_buyback: record.get('tanggal_surat_pemberitahuan_buyback'),
						lama_tunggakan_konfirmasi_tunggakan: record.get('lama_tunggakan_konfirmasi_tunggakan'),
						lama_tunggakan_surat_pemberitahuan_buyback: record.get('lama_tunggakan_surat_pemberitahuan_buyback'),
						nomor_konfirmasi_tunggakan_bank_2: record.get('nomor_konfirmasi_tunggakan_bank_2'),
						tanggal_konfirmasi_tunggakan_2: record.get('tanggal_konfirmasi_tunggakan_2'),
						lama_tunggakan_konfirmasi_tunggakan_2: record.get('lama_tunggakan_konfirmasi_tunggakan_2'),
						nomor_konfirmasi_tunggakan_bank_3: record.get('nomor_konfirmasi_tunggakan_bank_3'),
						tanggal_konfirmasi_tunggakan_3: record.get('tanggal_konfirmasi_tunggakan_3'),
						lama_tunggakan_konfirmasi_tunggakan_3: record.get('lama_tunggakan_konfirmasi_tunggakan_3'),
						collector_buyback_id: record.get('collector_buyback_id'),
						collector_phone: record.get('collector_phone'),
						nama_pic_bank: record.get('nama_pic_bank'),
						email_pic_bank: record.get('email_pic_bank'),
						phone_pic_bank: record.get('phone_pic_bank'),
						alamat_bank: record.get('alamat_bank')
					});

					//load grid akad
					//me.loadBankkprAkad(record.get('purchaseletter_bankkpr_id'));

					//jika baris ini sudah pernah diklik edit maka tidak load ke DB, bila belum maka load ke DB
					var editIdxRow = me.detailBankForm.editingIndexRow;
					var clickIdxRow = me.detailBankForm.clickIndexRow;
					if (record.get('purchaseletter_bankkpr_id') && clickIdxRow.indexOf(editIdxRow) == -1) {
						var bankkprakadStore = me.getBankkprakadStore();
						bankkprakadStore.removeAll();
						bankkprakadStore.load({params: {purchaseletter_bankkpr_id: record.get('purchaseletter_bankkpr_id')}});
					} else {
						var bankkprakadStore = me.getBankkprakadStore();
						bankkprakadStore.loadData(record.data.data_akad);
						bankkprakadStore.filterBy(function (recod) {
							return recod.data.deleted == false;
						});
					}
				}

				break;
		}
	},
	detailBankGrid: {
		that: this,
		actionColumnClick: function (view, cell, row, col, e) {
			var me = this;
			var gr = me.getBankgrid();
			var record = gr.getStore().getAt(row);
			var m = e.getTarget().className.match(/\bact-(\w+)\b/);
			gr.getSelectionModel().select(row);

			if (m) {
				switch (m[1]) {
					case 'BankkprUpdate':
						me.detailTool.form().show('update', 700, 'Edit');
						me.detailBankForm.editingIndexRow = row;
						me.getBankformdatadetail().getForm().setValues({
							purchaseletter_bankkpr_id: record.get('purchaseletter_bankkpr_id'),
							purchaseletter_id: record.get('purchaseletter_id'),
							bank_id: record.get('bank_id'),
							bank_createdby_name: record.get('bank_createdby_name'),
							appraisalplan_date: record.get('appraisalplan_date'),
							appraisal_date: record.get('appraisal_date'),
							appraisal_createdby_name: record.get('appraisal_createdby_name'),
							berkasmasuk_date: record.get('berkasmasuk_date'),
							berkasbank_date: record.get('berkasbank_date'),
							berkasbank_createdby_name: record.get('berkasbank_createdby_name'),
							interviewplan_date: record.get('interviewplan_date'),
							interview_date: record.get('interview_date'),
							interview_createdby_name: record.get('interview_createdby_name'),
							interview_pic: record.get('interview_pic'),
							kpr_acc_date: record.get('kpr_acc_date'),
							kpr_realisation: (record.get('kpr_realisation')) ? me.fmb(record.get('kpr_realisation')) : "",
							kpr_tenor: record.get('kpr_tenor'),
							kpr_interest: (record.get('kpr_interest')) ? toFloat(record.get('kpr_interest')) : "",
							kpr_cicilan: (record.get('kpr_cicilan')) ? me.fmb(record.get('kpr_cicilan')) : "",
							kpr_createdby_name: record.get('kpr_createdby_name'),
							rejected_date: record.get('rejected_date'),
							nextprocess_date: record.get('nextprocess_date'),
							reject_createdby_name: record.get('reject_createdby_name'),
							akadplan_date: record.get('akadplan_date'),
							akad_date: record.get('akad_date'),
							akad_createdby_name: record.get('akad_createdby_name'),
							note: record.get('note'),
							is_bayarpajak: record.get('is_bayarpajak'),
							pajak_amount: (record.get('pajak_amount')) ? me.fmb(record.get('pajak_amount')) : "",
							debitur_name: record.get('debitur_name'),

							//added by anas 21062021
							no_sppk: record.get('no_sppk'),

							//added by rico 06042022
							admin_fee_kpr: (record.get('admin_fee_kpr')) ? me.fmb(record.get('admin_fee_kpr')) : "",
							//added by rico 21042022
							is_cair_fee_kpr: record.get('is_cair_fee_kpr'),
							tanggal_cair_fee_kpr: record.get('tanggal_cair_fee_kpr'),
							notes_fee_kpr: record.get('notes_fee_kpr'),
							// added by rico 12072023
							nomor_konfirmasi_tunggakan_bank: record.get('nomor_konfirmasi_tunggakan_bank'),
							tanggal_konfirmasi_tunggakan: record.get('tanggal_konfirmasi_tunggakan'),
							nomor_surat_pemberitahuan_buyback_bank: record.get('nomor_surat_pemberitahuan_buyback_bank'),
							tanggal_surat_pemberitahuan_buyback: record.get('tanggal_surat_pemberitahuan_buyback'),
							lama_tunggakan_konfirmasi_tunggakan: record.get('lama_tunggakan_konfirmasi_tunggakan'),
							lama_tunggakan_surat_pemberitahuan_buyback: record.get('lama_tunggakan_surat_pemberitahuan_buyback'),
							nomor_konfirmasi_tunggakan_bank_2: record.get('nomor_konfirmasi_tunggakan_bank_2'),
							tanggal_konfirmasi_tunggakan_2: record.get('tanggal_konfirmasi_tunggakan_2'),
							lama_tunggakan_konfirmasi_tunggakan_2: record.get('lama_tunggakan_konfirmasi_tunggakan_2'),
							nomor_konfirmasi_tunggakan_bank_3: record.get('nomor_konfirmasi_tunggakan_bank_3'),
							tanggal_konfirmasi_tunggakan_3: record.get('tanggal_konfirmasi_tunggakan_3'),
							lama_tunggakan_konfirmasi_tunggakan_3: record.get('lama_tunggakan_konfirmasi_tunggakan_3'),
							collector_buyback_id: record.get('collector_buyback_id'),
							collector_phone: record.get('collector_phone'),
							nama_pic_bank: record.get('nama_pic_bank'),
							email_pic_bank: record.get('email_pic_bank'),
							phone_pic_bank : record.get('phone_pic_bank'),
							alamat_bank: record.get('alamat_bank')
						});
						//load grid akad
						//me.loadBankkprAkad(record.get('purchaseletter_bankkpr_id'));

						//jika baris ini sudah pernah diklik edit maka tidak load ke DB, bila belum maka load ke DB
						var editIdxRow = me.detailBankForm.editingIndexRow;
						var clickIdxRow = me.detailBankForm.clickIndexRow;
						if (record.get('purchaseletter_bankkpr_id') && clickIdxRow.indexOf(editIdxRow) == -1) {
							var bankkprakadStore = me.getBankkprakadStore();
							bankkprakadStore.removeAll();
							bankkprakadStore.load({params: {purchaseletter_bankkpr_id: record.get('purchaseletter_bankkpr_id')}});
						} else {
							var bankkprakadStore = me.getBankkprakadStore();
							bankkprakadStore.loadData(record.data.data_akad);
							bankkprakadStore.filterBy(function (recod) {
								return recod.data.deleted == false;
							});
						}

						break;
					case 'BankkprDelete':

						var is_use = record.get('is_use');
						if (is_use) {
							Ext.Msg.show({
								title: 'Information',
								msg: 'Cannot delete data, data is used',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						} else {
							//added confirmation by anas 23062021
							Ext.Msg.confirm('Confirm', 'Are you sure want to delete ?', function (btn) {
								if (btn == "yes") {
									//hapus data baris yg sudah pernah di edit dalam array 
									var editIdxRow = me.detailBankForm.editingIndexRow;
									var clickIdxRow = me.detailBankForm.clickIndexRow;
									var arrIdx = clickIdxRow.indexOf(editIdxRow);
									if (arrIdx != -1) {
										clickIdxRow.splice(arrIdx, 1);
									}

									record.set("deleted", true);
									gr.getStore().filterBy(function (recod) {
										return recod.data.deleted == false;
									});
								}

							});
						}


						break;
				}
			}
		}
	},
	dataSave: function () {
		var me = this;
		var store = me.getBankgrid().getStore();

		store.clearFilter(true);

		var data = [];
		var detail_akad = [];
		var arrWarn = '';
		var countNotUse = 0;
		var countAkad = 0;
		for (var i = 0; i < store.getCount(); i++) {
			store.each(function (record, idx) {
				if (i == idx) {
					data[i] = record.data;
					if (data[i].data_akad.length > 0) {
						for (var u = 0; u < data[i].data_akad.length; u++) {
							detail_akad.push(data[i].data_akad[u]);
						}
					}

					if(data[i].is_use == false){
						countNotUse++;
					}

					if(data[i].akad_date != null){
						countAkad++;
					}

					if(data[i].is_use == true && data[i].akad_date == null){
						arrWarn = 'Bank ' + data[i].bank_name + ' tidak bisa dipilih, karena belum akad.';
					}
				}
			});
		}

		if(me.active_check_akad == 1){
			if(arrWarn != ''){
				Ext.Msg.show({
					title   : 'Information',
					msg     : arrWarn,
					icon    : Ext.Msg.WARNING,
					buttons : Ext.Msg.OK
				});
				return false;
			}

			if(countAkad > 0 && countNotUse == store.getCount()){
				Ext.Msg.show({
					title   : 'Information',
					msg     : 'Sudah ada yang akad, Use bank wajib dipilih.',
					icon    : Ext.Msg.WARNING,
					buttons : Ext.Msg.OK
				});
				return false;
			}
		}

		// var recordIndex = store.findBy(
		// 	function (record, id) {
		// 		if (record.get('is_use') === true && record.get('akad_date') === null) {
		// 			return true;  // a record with this data exists
		// 		}
		// 		return false;  // there is no record in the store with this data
		// 	}
		// );

		var recordIndex2 = store.findBy(
				function (record, id) {
					if (record.get('is_use') === true && record.get('kpr_realisation') > me.BankKPRRealisationDefault) {
						return true;  // a record with this data exists
					}
					return false;  // there is no record in the store with this data
				}
		);

		var recordIndex3 = -1;
		store.each(function (record, idx) {
			if (record.data.is_use === true && (record.data.kpr_realisation <= 0 || !record.data.kpr_realisation)) {
				recordIndex3 = 0;
			}
		});

		if (recordIndex2 != -1) {
			//Ext.Msg.alert('Info', 'Nilai Realisasi KPR (KPR Realisation Amount) tidak boleh lebih besar dari Nilai Pengajuan KPR pada Bank yang dipilih');
			var pricetype_id = me.getFormdata().down('[name=pricetype_id]').getValue();
			if (pricetype_id != 2) {
				Ext.Msg.show({
					title: 'Information',
					msg: 'Tidak bisa menggunakan Bank yang dipilih, karena cara bayar bukan KPR',
					icon: Ext.Msg.WARNING,
					buttons: Ext.Msg.OK
				});
			} else {
				Ext.Msg.show({
					title: 'Information',
					msg: 'Nilai Realisasi KPR (KPR Realisation Amount) tidak boleh lebih besar dari Nilai Pengajuan KPR pada Bank yang dipilih',
					icon: Ext.Msg.WARNING,
					buttons: Ext.Msg.OK
				});
			}
			return false;
		}

		if (recordIndex3 != -1) {
			//Ext.Msg.alert('Info', 'Tidak dapat menggunakan Bank yang dipilih, karena Nilai Realisasi KPR (KPR Realisation Amount) masih kosong (nol)');
			Ext.Msg.show({
				title: 'Information',
				msg: 'Tidak dapat menggunakan Bank yang dipilih, karena Nilai Realisasi KPR (KPR Realisation Amount) masih kosong (nol)',
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK
			});
			return false;
		}

		if (me.getFormdata().down('[name=customer_email]').readOnly == false && !Ext.isEmpty(me.getFormdata().down('[name=customer_email]').getValue()) && me.validateEmail(me.getFormdata().down('[name=customer_email]')) == false) {
			return false;
		}

		var fields = me.getFormdata().getValues();

		var myObj = {
			purchaseletter_id_form : fields.purchaseletter_id,
			notes_batal            : fields.notes_batal,
			customer_address       : fields.customer_address,
			customer_ktp_address   : fields.customer_ktp_address, //add by dika 20/19/2022
			customer_homephone     : fields.customer_homephone,
			customer_mobilephone   : fields.customer_mobilephone,
			customer_email         : fields.customer_email,
			customer_officephone   : fields.customer_officephone,
			collector_id           : fields.collector_id,
			data_detail            : data,
			detail_akad            : detail_akad,
			kpp                    : fields.kpp,
			dibiayai_instansi      : fields.dibiayai_instansi,
		}

		me.getFormdata().up('window').body.mask('Saving, please wait ...');

		Ext.Ajax.request({
			url: 'erems/bankkpr/create',
			//params:'data='+Ext.encode(data),
			params: {
				data: Ext.encode(myObj)
			},
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
	},
	//==== end bank kpr ======
	//======== generate schema for pencairan KPR ============
	setGenerateSchema: function () {
		var me = this;

		var winId = me.detailTool.parentFDWindowId;
		var win = desktop.getWindow(winId);

		//var pencairanForm = me.getPencairanformdata();
		var pencairanForm = win.down('form');
		var pencairanGrid = me.getPencairangrid();
		var pencairanStore = pencairanGrid.getStore();

		var purchaseletterId = pencairanForm.down('[name=purchaseletter_id]').getValue();
		var bankId = 0;
		var kprRealisation = 0;

		var bankkprStore = me.getBankkprStore();
		bankkprStore.removeAll();
		bankkprStore.load({
			params: {purchaseletter_id: purchaseletterId},
			callback: function (purchaselettedetailrec) {
				for (var i = 0; i < bankkprStore.getCount(); i++) {
					bankkprStore.each(function (record, idx) {
						if (i == idx) {
							if (record.data.is_use == true) {
								bankId = record.data.bank_id
								kprRealisation = parseFloat(record.data.kpr_realisation);
							}
						}
					});
				}
				if (bankId != 0) {
					var masterbankkprStore = me.getMasterbankkprStore();
					masterbankkprStore.removeAll();
					masterbankkprStore.load({
						params: {bank_id: bankId},
						callback: function (rec) {
							if (pencairanStore.getCount() > 0) {  //jika ada record cek dulu
								if (masterbankkprStore.getCount() > 0) {

									pencairanStore.each(function (record, idx) {
										if (!record.data.pencairan_date || record.data.pencairan_date == null || record.data.pencairan_date == '') {
											var recd = pencairanStore.getAt(idx);
											recd.set("deleted", true);
										}
									});
									pencairanStore.filterBy(function (recod) {
										return recod.data.deleted == false;
									});

									var tahap1ID = pencairanStore.find('plafon_id', rec[0].get('tahap1_id'));
									var tahap2ID = pencairanStore.find('plafon_id', rec[0].get('tahap2_id'));
									var tahap3ID = pencairanStore.find('plafon_id', rec[0].get('tahap3_id'));
									var tahap4ID = pencairanStore.find('plafon_id', rec[0].get('tahap4_id'));
									var tahap5ID = pencairanStore.find('plafon_id', rec[0].get('tahap5_id'));
									var tahap6ID = pencairanStore.find('plafon_id', rec[0].get('tahap6_id'));
									var tahap7ID = pencairanStore.find('plafon_id', rec[0].get('tahap7_id'));
									var tahap8ID = pencairanStore.find('plafon_id', rec[0].get('tahap8_id'));

									if (tahap1ID == -1 && rec[0].get('tahap1_id') != 0) {
										pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap1_persen') * kprRealisation) / 100, rec[0].get('tahap1_persen'), '', rec[0].get('tahap1_id'), rec[0].get('tahap1_name')));
									}
									if (tahap2ID == -1 && rec[0].get('tahap2_id') != 0) {
										pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap2_persen') * kprRealisation) / 100, rec[0].get('tahap2_persen'), '', rec[0].get('tahap2_id'), rec[0].get('tahap2_name')));
									}
									if (tahap3ID == -1 && rec[0].get('tahap3_id') != 0) {
										pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap3_persen') * kprRealisation) / 100, rec[0].get('tahap3_persen'), '', rec[0].get('tahap3_id'), rec[0].get('tahap3_name')));
									}
									if (tahap4ID == -1 && rec[0].get('tahap4_id') != 0) {
										pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap4_persen') * kprRealisation) / 100, rec[0].get('tahap4_persen'), '', rec[0].get('tahap4_id'), rec[0].get('tahap4_name')));
									}
									if (tahap5ID == -1 && rec[0].get('tahap5_id') != 0) {
										pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap5_persen') * kprRealisation) / 100, rec[0].get('tahap5_persen'), '', rec[0].get('tahap5_id'), rec[0].get('tahap5_name')));
									}
									if (tahap6ID == -1 && rec[0].get('tahap6_id') != 0) {
										pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap6_persen') * kprRealisation) / 100, rec[0].get('tahap6_persen'), '', rec[0].get('tahap6_id'), rec[0].get('tahap6_name')));
									}
									if (tahap7ID == -1 && rec[0].get('tahap7_id') != 0) {
										pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap7_persen') * kprRealisation) / 100, rec[0].get('tahap7_persen'), '', rec[0].get('tahap7_id'), rec[0].get('tahap7_name')));
									}
									if (tahap8ID == -1 && rec[0].get('tahap8_id') != 0) {
										pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap8_persen') * kprRealisation) / 100, rec[0].get('tahap8_persen'), '', rec[0].get('tahap8_id'), rec[0].get('tahap8_name')));
									}

									me.tcb_synch();

								} else {
									Ext.Msg.alert('Info', 'Bank KPR yang digunakan belum memiliki Schema Pencairan');
								}
							} else { //jika ga ada record lsg insert
								if (masterbankkprStore.getCount() > 0) {
									if (rec[0].get('tahap1_name') && rec[0].get('tahap1_persen')) {
										pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap1_persen') * kprRealisation) / 100, rec[0].get('tahap1_persen'), '', rec[0].get('tahap1_id'), rec[0].get('tahap1_name')));
									}

									if (rec[0].get('tahap2_name') && rec[0].get('tahap2_persen')) {
										pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap2_persen') * kprRealisation) / 100, rec[0].get('tahap2_persen'), '', rec[0].get('tahap2_id'), rec[0].get('tahap2_name')));
									}

									if (rec[0].get('tahap3_name') && rec[0].get('tahap3_persen')) {
										pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap3_persen') * kprRealisation) / 100, rec[0].get('tahap3_persen'), '', rec[0].get('tahap3_id'), rec[0].get('tahap3_name')));
									}

									if (rec[0].get('tahap4_name') && rec[0].get('tahap4_persen')) {
										pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap4_persen') * kprRealisation) / 100, rec[0].get('tahap4_persen'), '', rec[0].get('tahap4_id'), rec[0].get('tahap4_name')));
									}

									if (rec[0].get('tahap5_name') && rec[0].get('tahap5_persen')) {
										pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap5_persen') * kprRealisation) / 100, rec[0].get('tahap5_persen'), '', rec[0].get('tahap5_id'), rec[0].get('tahap5_name')));
									}

									if (rec[0].get('tahap6_name') && rec[0].get('tahap6_persen')) {
										pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap6_persen') * kprRealisation) / 100, rec[0].get('tahap6_persen'), '', rec[0].get('tahap6_id'), rec[0].get('tahap6_name')));
									}

									if (rec[0].get('tahap7_name') && rec[0].get('tahap7_persen')) {
										pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap7_persen') * kprRealisation) / 100, rec[0].get('tahap7_persen'), '', rec[0].get('tahap7_id'), rec[0].get('tahap7_name')));
									}

									if (rec[0].get('tahap8_name') && rec[0].get('tahap8_persen')) {
										pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap8_persen') * kprRealisation) / 100, rec[0].get('tahap8_persen'), '', rec[0].get('tahap8_id'), rec[0].get('tahap8_name')));
									}

									me.tcb_synch();

								} else {
									Ext.Msg.alert('Info', 'Bank KPR yang digunakan belum memiliki Schema Pencairan');
								}
							}
						}
					});
				} else {
					Ext.Msg.alert('Info', 'Belum Memilih Bank untuk KPR');
				}
			}
		});
	},
	//======== end generate schema for pencairan KPR ========
	valPencairan: function (purchaseletterId, paymentId, scheduleId, escrowDate, pencairanDate, pencairanAmount, persenPencairan, persenProgress, plafonId, Keterangan) {
		return {
			purchaseletter_id: purchaseletterId,
			payment_id: paymentId,
			schedule_id: scheduleId,
			escrow_date: escrowDate,
			pencairan_date: pencairanDate,
			pencairan_amount: pencairanAmount,
			persen_pencairan: persenPencairan,
			persen_progress: persenProgress,
			plafon_id: plafonId,
			keterangan: Keterangan
		}
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

	//============== AKAD CONFIRMATION ======================
	loadBankkprAkad: function (id) {
		var me = this;
		var bankkprakadStore = me.getBankkprakadStore();
		bankkprakadStore.removeAll();
		bankkprakadStore.load({params: {purchaseletter_bankkpr_id: id}});
	},
	formDataBankAkadBeforeRender: function (el) {
		var me = this;
		var store = me.getMasterakadconfirmationstatusStore();
		el.down('[name=akadconfirmation_status_id]').bindStore(store);
	},

	cekBankkprakad: function () {
		var me = this;
		var bankkprakadStore = me.getBankkprakadStore(),
				countStore = bankkprakadStore.getCount();


		Ext.Ajax.request({
			url: 'erems/admincollection/read',
			params: {
				read_type_mode: 'validasium_config'
			},
			success: function (response) {
				if (response.responseText == 1) {
					me.genco_um = 1;
				}
			}
		});

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
	detailBankAkadForm: {
		that            : this,
		editingIndexRow : 0,
		save            : function () {
			var me = this;

			var form = me.getBankakadformdatadetail().getForm();
			var formVal = me.getBankakadformdatadetail().getForm().getValues();

			var purchaseletterId = me.getFormdata().down('[name=purchaseletter_id]').getValue();
			var plBankKprId = me.getBankformdatadetail().down('[name=purchaseletter_bankkpr_id]').getValue();
			var temp_id_detail = me.getBankformdatadetail().down('[name=temp_id_detail]').getValue();

			var msg = '';
			var win = me.getBankakadformdatadetail().up('window');

			if (form.isValid()) {
				/*if(toFloat(formVal.kpr_realisation) > me.BankKPRRealisationDefault){
				 Ext.Msg.alert('Info', 'Nilai Realisasi KPR (KPR Realisation Amount) tidak boleh lebih besar dari Nilai Pengajuan KPR');
				 } else {*/
				var dStore = null;
				var win = me.getBankakadformdatadetail().up('window');

				dStore = me.getBankgridakad().getStore();

				var val = {
					purchaseletter_id: purchaseletterId,
					purchaseletter_bankkpr_id: plBankKprId,
					//bank_name: me.getBankformdatadetail().down('#fd_bank').getRawValue(),
					akadconfirmation_index: formVal.akadconfirmation_index,
					akadconfirmation_date: formVal.akadconfirmation_date,
					akadconfirmation_status_id: formVal.akadconfirmation_status_id,
					akadconfirmation_status: me.getBankakadformdatadetail().down('#fd_akadconfirmation_status_id').getRawValue(),
					akadconfirmation_note: formVal.akadconfirmation_note,
					temp_id_akad: temp_id_detail
				};


				if (me.genco_um == 1) {
					Ext.Ajax.request({
						url: 'erems/admincollection/read',
						params: {
							read_type_mode: 'cek_um', purchaseletter_id: purchaseletterId
						},
						success: function (response) {
							var result = JSON.parse(response.responseText);
							var um = Number(result.data[0].um);

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
										me.getBankformdatadetail().down('[name=akadplan_date]').setValue(new Date(akadDate));
										me.getBankformdatadetail().down('[name=akad_date]').setValue(new Date(akadDate));
									} else {
										me.getBankformdatadetail().down('[name=akadplan_date]').setValue();
										me.getBankformdatadetail().down('[name=akad_date]').setValue();
									}

								} else {

									var rec = dStore.getAt(me.detailBankAkadForm.editingIndexRow);
									rec.beginEdit();
									rec.set(val);
									rec.endEdit();

									if (formVal.akadconfirmation_status_id == 1) { // OK
										var akadDate = formVal.akadconfirmation_date;
										me.getBankformdatadetail().down('[name=akadplan_date]').setValue(new Date(akadDate));
										me.getBankformdatadetail().down('[name=akad_date]').setValue(new Date(akadDate));
									} else {
										me.getBankformdatadetail().down('[name=akadplan_date]').setValue();
										me.getBankformdatadetail().down('[name=akad_date]').setValue();
									}
								}
							}

						}
					});
				} else {
					if (win.state == 'create') {


						dStore.add(val);

						if (formVal.akadconfirmation_status_id == 1) { // OK
							var akadDate = formVal.akadconfirmation_date;
							me.getBankformdatadetail().down('[name=akadplan_date]').setValue(new Date(akadDate));
							me.getBankformdatadetail().down('[name=akad_date]').setValue(new Date(akadDate));
						} else {
							me.getBankformdatadetail().down('[name=akadplan_date]').setValue();
							me.getBankformdatadetail().down('[name=akad_date]').setValue();
						}

					} else {

						var rec = dStore.getAt(me.detailBankAkadForm.editingIndexRow);
						rec.beginEdit();
						rec.set(val);
						rec.endEdit();

						if (formVal.akadconfirmation_status_id == 1) { // OK
							var akadDate = formVal.akadconfirmation_date;
							me.getBankformdatadetail().down('[name=akadplan_date]').setValue(new Date(akadDate));
							me.getBankformdatadetail().down('[name=akad_date]').setValue(new Date(akadDate));
						} else {
							me.getBankformdatadetail().down('[name=akadplan_date]').setValue();
							me.getBankformdatadetail().down('[name=akad_date]').setValue();
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
			akadconfirmation_id        : view[5].data.akadconfirmation_id,
			purchaseletter_id          : view[5].data.purchaseletter_id,
			purchaseletter_bankkpr_id  : view[5].data.purchaseletter_bankkpr_id,
			akadconfirmation_index     : view[5].data.akadconfirmation_index,
			akadconfirmation_date      : view[5].data.akadconfirmation_date,
			akadconfirmation_status_id : view[5].data.akadconfirmation_status_id,
			akadconfirmation_note      : view[5].data.akadconfirmation_note,
			temp_id_akad               : view[5].data.temp_id_akad
		});
	},
	bankgridakadactionDeleteColumnClick: function (view, rowIndex, colIndex, item, e, record, row) {
		var me = this;
		var gr = me.getBankgridakad();

		//added confirmation by anas 23062021
		Ext.Msg.confirm('Confirm', 'Are you sure want to delete ?', function (btn) {
			if (btn == "yes") {
				view[5].set("deleted", true);
				gr.getStore().filterBy(function (recod) {
					return recod.data.deleted == false;
				});
				if (view[5].data.akadconfirmation_status_id == 1) { // OK
					me.getBankformdatadetail().down('[name=akadplan_date]').setValue();
					me.getBankformdatadetail().down('[name=akad_date]').setValue();
				}
			}
		});
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
	//============== END AKAD CONFIRMATION ======================
	//==== save batal by =====
	dataSaveBatalBy: function (batal_by) {
		var me = this;
		var text = '';
		var removeStatus = 0;

		if (batal_by == 'Legal') {
			text = me.getFormdata().down('#btnBatalByLegal').getText();
		} else if (batal_by == 'Collection') {
			text = me.getFormdata().down('#btnBatalByCollection').getText();
		}

		removeStatus = (text.indexOf('Remove') > -1) ? 1 : 0;

		var purchaseletter_id = me.getFormdata().down('[name=purchaseletter_id]').getValue();
		var notes_batal = me.getFormdata().down('[name=notes_batal]').getValue();

		Ext.Msg.confirm('Confirm', text + '?', function (btn) {
			if (btn == 'yes') {
				me.getFormdata().up('window').body.mask(text + ', please wait ...');

				Ext.Ajax.request({
					url: 'erems/bankkpr/batalby',
					params: {
						purchaseletter_id: purchaseletter_id,
						batal_by: batal_by,
						notes_batal: notes_batal,
						removeStatus: removeStatus
					},
					success: function (response) {
						me.getFormdata().up('window').body.unmask();
						if (Ext.decode(response.responseText).success == true) {
							Ext.Msg.show({
								title: 'Success',
								msg: text + ' successfully.',
								icon: Ext.Msg.INFO,
								buttons: Ext.Msg.OK,
								fn: function () {
									me.getFormdata().up('window').close();
									var gridDepan = me.getGrid();
									var storeDepan = gridDepan.getStore();
									storeDepan.reload();
								}
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
	//==== end save batal by=====
	/* report needed */
	processReport: function () {
		var me = this;

		var winId = me.detailTool.parentFDWindowId;
		var win = desktop.getWindow(winId);
		var formParent = win.down('form');

		var winId = 'myReportWindow';
		me.instantWindowReport('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		var win = desktop.getWindow(winId);

		if (win) {
			var params = {};
			var reportFile = "Pencairankpr";

			params["purchaseletter_id"] = formParent.down('[name=purchaseletter_id]').getValue();
			params["unit_id"]           = formParent.down('[name=unit_id]').getValue();
			params["image_url"]         = window.location.protocol + "//" + window.location.host + '/webapps/Ciputra/public/app/erems/uploads/progress_unit/';

			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},
	panelAfterRender: function (el) {
		var me = this;
	},
	generateFakeForm2: function (paramList, reportFile) {
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
	generateFakeForm: function (paramList, reportFile) {
		var form = '<form id="fakeReportFormID" action=resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key=' + reportFile + '.mrt" target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
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
	instantWindowReport: function (panel, width, title, state, id, controller) {
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
				id              : winId,
				title           : formtitle,
				iconCls         : formicon,
				resizable       : true,
				minimizable     : false,
				maximizable     : true,
				width           : width,
				renderTo        : Ext.getBody(),
				constrain       : true,
				constrainHeader : false,
				modal           : true,
				layout          : 'fit',
				shadow          : 'frame',
				shadowOffset    : 10,
				border          : false,
				items           : Ext.create('Erems.view.' + controllerFolder + '.' + panel),
				state           : state
			});
		}
		win.show();
	},
	/* end report needed */
	//======== generate duedate from construction ===========
	setDueDateEscrow: function () {
		var me = this;

		var winId = me.detailTool.parentFDWindowId;
		var win = desktop.getWindow(winId);

		//var pencairanForm = me.getPencairanformdata();
		var pencairanForm = win.down('form');
		var pencairanGrid = me.getPencairangrid();
		var pencairanStore = pencairanGrid.getStore();

		var unitId = pencairanForm.down('[name=unit_id]').getValue();
		var purchaseletterId = pencairanForm.down('[name=purchaseletter_id]').getValue();

		pencairanForm.up('window').body.mask('Synch Duedate, Please Wait...');

		var pencairankprduedateescrowStore = me.getPencairankprduedateescrowStore();
		pencairankprduedateescrowStore.removeAll();
		pencairankprduedateescrowStore.load({
			params: {unit_id: unitId, purchaseletter_id: purchaseletterId},
			callback: function (rec) {
				// if (rec[0].raw.length) {
				if (rec) { // added by rico 05042023
					for (var i = 0; i < rec[0].raw.length; i++) {
						pencairanStore.each(function (record, idx) {
							if (record.data.plafon_id == rec[0].raw[i].plafon_id) {
								var recd = pencairanStore.getAt(idx);
								recd.set("duedate_escrow", rec[0].raw[i].duedate_escrow);
							}
						});
					}
				}
				// else{
				// Ext.Msg.alert('Info', 'Synch Duedate kosong.');					
				// }

				pencairanForm.up('window').body.unmask();
			}
		});
	},
	//======== end generate duedate from construction ========
	//======== generate duedate from construction ===========
	setProgressConst: function () {
		var me = this;

		var winId = me.detailTool.parentFDWindowId;
		var win = desktop.getWindow(winId);

		//var pencairanForm = me.getPencairanformdata();
		var pencairanForm = win.down('form');
		var pencairanGrid = me.getPencairangrid();
		var pencairanStore = pencairanGrid.getStore();

		var unitId = pencairanForm.down('[name=unit_id]').getValue();
		var purchaseletterId = pencairanForm.down('[name=purchaseletter_id]').getValue();

		pencairanForm.up('window').body.mask('Synch Progress, Please Wait...');

		var pencairankprduedateescrowStore = me.getPencairankprduedateescrowStore();
		pencairankprduedateescrowStore.removeAll();
		pencairankprduedateescrowStore.load({
			params: {unit_id: unitId, purchaseletter_id: purchaseletterId, get_data_type: 'progress_status'},
			callback: function (rec) {
				var list_progress = [];

				if (rec[0].raw.length) {
					for (var i = 0; i < rec[0].raw.length; i++) {
						list_progress.push(rec[0].raw[i].plafon_id);
					}

					pencairanStore.each(function (record, idx) {
						var recd = pencairanStore.getAt(idx);
						if (list_progress.indexOf(record.data.plafon_id) == -1) {
							recd.set("persen_progress", 0);
						} else {
							recd.set("persen_progress", 100);
						}
					});
				}
				// else{
				// Ext.Msg.alert('Info', 'Synch Progress kosong.');		
				// }

				pencairanForm.up('window').body.unmask();
			}
		});
	},
	//======== end generate duedate from construction ========
	//======== synch DueDateEscrow and ProgressConst together ========
	tcb_synch: function () {
		var me = this;
		me.setDueDateEscrow();
		me.setProgressConst();
	},
	//======= end synch DueDateEscrow and ProgressConst together======
	//======================== print Kuitansi =========================
	printKuitansi: function () {
		var me = this;

		var purchaseletter_id = me.getFormdata().down("[name=purchaseletter_id]").getValue(),
				unit_id = me.getFormdata().down("[name=unit_id]").getValue(),
				kpr_acc_date,
				akad_date,
				kpr_realisation = 0;


		var store = me.getBankgrid().getStore();
		store.each(function (record, idx) {
			var recd = store.getAt(idx);
			if (record.data.is_use == 1) {
				kpr_acc_date = record.data.kpr_acc_date;
				akad_date = record.data.akad_date;
				kpr_realisation = record.data.kpr_realisation;
			}
		});

		//if(!kpr_acc_date || !kpr_realisation){
		if (!akad_date || !kpr_realisation) {
			Ext.Msg.show({
				title: 'Failure',
				//msg: 'Bank yang dipilih tidak memiliki KPR ACC Date atau KPR Realisation Amount',
				msg: 'Bank yang dipilih tidak memiliki Akad Date atau KPR Realisation Amount',
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK
			});
			return false;
		}

		//added by anas 23062021
		var printTypeStore = Ext.create('Ext.data.Store', {
			fields: ['id', 'name'],
			data: [{
					"id": "printpdf",
					"name": "PDF"
				}, {
					"id": "printvoucherpdf",
					"name": "Voucher PDF"
				},
				{
					"id": "printdos",
					"name": "Print DOS"
				}]
		});
		//end added by anas

		var combo = Ext.create('Ext.form.field.ComboBox', {
			editable: false,
			queryMode: 'local',
			valueField: 'id',
			displayField: 'name',
			width: '100%',
			// store: {
			// 	fields: ['id', 'name'],
			// 	data: [
			// 		{id: 'printpdf', name: 'PDF'},
			// 		{id: 'printvoucherpdf', name: 'Voucher PDF'},
			// 		{id: 'printdos', name: 'Print DOS'}
			// 	]
			// }

			//updated by anas 21062021
			store: printTypeStore
		});

		Ext.create('Ext.window.Window', {
			title: 'Select Print Type',
			height: 100,
			width: 400,
			layout: 'hbox',
			padding: '10px 10px 10px 10px',
			modal: true,
			items: {// Let's put an empty grid in just to illustrate fit layout
				xtype: combo,
				name: 'kuitansi_cb'
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
							//action: 'processprintout',
							padding: 5,
							width: 75,
							iconCls: 'icon-print',
							text: 'Print',
							handler: function () {

								var kuitansi_cb = this.up('window').items.items[0].value;
								if (!kuitansi_cb) {
									Ext.Msg.show({
										title: 'Alert',
										msg: 'Please Select Print Type First',
										icon: Ext.Msg.WARNING,
										buttons: Ext.Msg.OK
									});
									return false;
								}
								//console.log(kuitansi_cb);
								me.getFormdata().up('window').body.mask('Creating Voucher, Please Wait...');

								Ext.Ajax.request({
									url: 'erems/bankkpr/create',
									params: {
										save_mode_type: 'payment',
										purchaseletter_id: purchaseletter_id,
										unit_id: unit_id,
										kpr_acc_date: kpr_acc_date,
										akad_date: akad_date,
										kpr_realisation: kpr_realisation
									},
									success: function (response) {
										try {
											var resp = response.responseText;

											if (resp) {
												var info = Ext.JSON.decode(resp);

												if (info.success == true) {
													me.getFormdata().up('window').body.unmask();

													if (info.payment_id) {
														/*Ext.Msg.show({
														 title: 'Success',
														 msg: 'Success Save Kuitansi',
														 icon: Ext.Msg.INFO,
														 buttons: Ext.Msg.OK
														 });*/

														if (kuitansi_cb == 'printpdf' || kuitansi_cb == 'printvoucherpdf') {
															me.showPdf(info.payment_id, kuitansi_cb);
														} else if (kuitansi_cb == 'printdos') {
															me.showPrintDosPreview(info.payment_id, kuitansi_cb);
														}

													} else {
														me.getFormdata().up('window').body.unmask();
														Ext.Msg.show({
															title: 'Failure',
															msg: 'Error: Cetak Kuitansi Gagal.',
															icon: Ext.Msg.ERROR,
															buttons: Ext.Msg.OK
														});
													}
												} else {
													me.getFormdata().up('window').body.unmask();
													Ext.Msg.show({
														title: 'Failure',
														msg: 'Error: Cetak Kuitansi Gagal.',
														icon: Ext.Msg.ERROR,
														buttons: Ext.Msg.OK
													});
												}
											}
										} catch (e) {
											me.getFormdata().up('window').body.unmask();
											Ext.Msg.show({
												title: 'Failure',
												msg: 'Error: Cetak Kuitansi Gagal.',
												icon: Ext.Msg.ERROR,
												buttons: Ext.Msg.OK
											});
										}
									},
									failure: function (e) {
										me.getFormdata().up('window').body.unmask();
										Ext.Msg.show({
											title: 'Failure',
											msg: 'Error: Cetak Kuitansi Gagal.',
											icon: Ext.Msg.ERROR,
											buttons: Ext.Msg.OK
										});
									}
								});
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
	},
	//======================== print surat lunas dp =========================
	printSuratLunasDP: function () {
		var me = this;

		var grid = me.getBankgrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

		var remaining_balance = me.getFormdata().down('[name=remaining_balance]').getValue();

		purchaseletter_bankkpr_id = record.data.purchaseletter_bankkpr_id;
		purchaseletter_id = record.data.purchaseletter_id;
		is_print_lunas_dp = record.data.is_print_lunas_dp;
		// console.log(purchaseletter_bankkpr_id);
		// console.log(purchaseletter_id);

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'PRINTOUT_LUNASDP_DOC'}});

		if (remaining_balance > 0) {
			Ext.Msg.show({
				title: 'Alert',
				msg: 'DP Belum Lunas, tidak bisa Print Surat Lunas DP',
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK
			});
			return false;
		}

		var combo = Ext.create('Ext.form.field.ComboBox', {
			id: 'cbPrintoutID',
			editable: false,
			queryMode: 'local',
			valueField: 'value',
			displayField: 'description',
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
										var reportFile = "SuratLunasDP";

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
											read_type_mode: 'printout_lunasdp',
											purchaseletter_id: purchaseletter_id,
											purchaseletter_bankkpr_id: purchaseletter_bankkpr_id,
											is_print_lunas_dp: is_print_lunas_dp
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
															buttonText:
																	{
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

		// me.documentPrintout(purchaseletter_bankkpr_id, 'erems/complaint/read');

		// var combo = Ext.getCmp('cbPrintoutID');
		combo.bindStore(globalparameterStore);


		// var printType = Ext.create('Ext.data.Store', {
		// 	fields: ['id', 'name'],
		// 	data : [
		// 		{id: 'stimulsoft', name: 'Stimulsoft'},
		// 		{id: 'msword', name: 'Microsoft Word'}
		// 	]
		// });

		// var combo = Ext.create('Ext.form.ComboBox', {
		// 	editable: false,
		// 	store: printType,
		// 	queryMode: 'local',
		// 	displayField: 'name',
		// 	valueField: 'id',
		// 	width: '100%',
		// 	renderTo: Ext.getBody()
		// });

		// var combo = Ext.create('Ext.form.field.ComboBox', { 
		// 	id: 'cbPrintoutID',
		// 	editable: false, 
		// 	queryMode: 'local', 
		// 	valueField: 'value', 
		//  	displayField: 'value',
		// 	width: '100%'
		// }); 

		// Ext.create('Ext.window.Window', {
		// 	title: 'Select Print Type',
		// 	height: 100,
		// 	width: 400,
		// 	layout: 'hbox',
		// 	padding: '10px 10px 10px 10px',
		// 	modal: true,
		// 	items: {// Let's put an empty grid in just to illustrate fit layout
		// 		xtype: combo,
		// 		name: 'suratlunasdp'
		// 	},
		// 	dockedItems: [
		// 		{
		// 			xtype: 'toolbar',
		// 			dock: 'bottom',
		// 			ui: 'footer',
		// 			layout: {
		// 				//padding: 6,
		// 				type: 'hbox'
		// 			},
		// 			items: [
		// 				{
		// 					xtype: 'button',
		// 					//action: 'processprintout',
		// 					padding: 5,
		// 					width: 75,
		// 					iconCls: 'icon-print',
		// 					text: 'Print',
		// 					handler: function () {

		// 						var suratlunasdp = this.up('window').items.items[0].value;
		// 						if (!suratlunasdp) {
		// 							Ext.Msg.show({
		// 								title: 'Alert',
		// 								msg: 'Please Select Print Type First',
		// 								icon: Ext.Msg.WARNING,
		// 								buttons: Ext.Msg.OK
		// 							});
		// 							return false;
		// 						}
		// 						//console.log(kuitansi_cb);
		// 						me.getFormdata().up('window').body.mask('Creating Report, Please Wait...');

		// 						if (suratlunasdp == 'stimulsoft') {
		// 							me.showPdf(info.payment_id, suratlunasdp);
		// 						} else if (suratlunasdp == 'msword') {
		// 							me.showPrintDosPreview(info.payment_id, suratlunasdp);
		// 						}
		// 					}
		// 				},
		// 				{
		// 					xtype: 'button',
		// 					action: 'cancel',
		// 					itemId: 'btnCancel',
		// 					padding: 5,
		// 					width: 75,
		// 					iconCls: 'icon-cancel',
		// 					text: 'Cancel',
		// 					handler: function () {
		// 						this.up('window').close();
		// 					}
		// 				}
		// 			]
		// 		}
		// 	]
		// }).show();
	},
	showPdf: function (ids, mode_read) {
		var me = this;

		Ext.Ajax.request({
			url: 'erems/otherspayment/read',
			params: {
				payment_id: ids,
				mode_read: mode_read
			},
			success: function (response) {
				var result = response.responseText;
				var jsonRs = JSON.parse(result);
				var data = jsonRs.data;
				var url = data['others'][0][0]['URL'];

				if (url) {

					if (mode_read == 'printpdf') {
						var win = window.open(url, '_blank');
						win.focus();
					} else if (mode_read == 'printvoucherpdf') {
						window.open(url);
					}

				}
			},
			failure: function (e) {
				me.getFormdata().up('window').body.unmask();
				Ext.Msg.show({
					title: 'Failure',
					msg: 'Error: Cetak Kuitansi Gagal.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
	},
	showPrintDosPreview: function (ids, mode_read) {
		var me = this;

		var w = me.instantWindowReport('DosPreviewFormData', 700, 'Print Preview', 'print', 'myDowPreviewWindow', 'otherspayment');
		var text = 'Hello test';
		var f = me.getFormdos();
		//f.setLoading("Please wait...");

		Ext.Ajax.request({
			url: 'erems/otherspayment/read',
			params: {
				payment_id: ids,
				mode_read: mode_read
			},
			success: function (response) {
				var result = response.responseText;
				var jsonRs = JSON.parse(result);
				var data = jsonRs.data;

				var text = data['others'][0][0]['PREVIEW'];
				f.down("[name=url]").setValue(data['others'][0][0]['URL']);
				f.down("#textDosPreviewID").update(text);
			},
			failure: function (e) {
				me.getFormdata().up('window').body.unmask();
				Ext.Msg.show({
					title: 'Failure',
					msg: 'Error: Cetak Kuitansi Gagal.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
	},
	//===================== end print Kuitansi ===========================
	//====================== show collector ==========================
	showCollector: function () {
		var me = this;
		var grid = me.getGrid();
		var selection = grid.getSelectionModel().getSelection();
		var PLId = [];

		selection.forEach(function (record, idx) {
			PLId.push(record.data.purchaseletter_id);
		});

		Ext.create('Ext.window.Window', {
			title: 'Collector',
			height: 135,
			width: 380,
			//layout: 'hbox',
			padding: '10px 10px 10px 10px',
			modal: true,
			items: {// Let's put an empty grid in just to illustrate fit layout
				padding: '10px 0 0 10px',
				xtype: 'collectorcombobox',
				name: 'cb_collector'
			},
			listeners: {
				afterrender: function () {
					this.down('[name=cb_collector]').getStore().load();
				}
			},
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
							action: 'savecollector',
							padding: 5,
							width: 75,
							iconCls: 'icon-save',
							text: 'Save',
							handler: function () {

								var collector = this.up('window').down('[name=cb_collector]').getValue();
								if (!collector) {
									Ext.Msg.show({
										title: 'Warning',
										msg: 'Please Select Collector First!',
										icon: Ext.Msg.WARNING,
										buttons: Ext.Msg.OK
									});
									return false;
								}

								this.up('window').body.mask('Saving, Please Wait...');

								me.saveCollector(collector, PLId, this.up('window'));
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
	},
	saveCollector: function (collector, purchaseletterId, win) {
		var me = this;

		Ext.Ajax.request({
			url: 'erems/admincollection/read',
			params: {
				read_type_mode: 'update_collector',
				collector: collector,
				purchaseletter_id: Ext.encode(purchaseletterId)
			},
			success: function (response) {
				win.body.unmask();
				if (Ext.decode(response.responseText).success == true) {
					Ext.Msg.show({
						title: 'Success',
						msg: 'Save successfully.',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							win.close();
							var gridDepan = me.getGrid();
							var storeDepan = gridDepan.getStore();
							storeDepan.reload();
						}
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
	},
	//====================== show pengakuan penjualan ==========================
	showPengakuanPenjualan: function () {
		var me = this;
		var grid = me.getGrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
		var purchaseletterId = record.data.purchaseletter_id;
		var pengakuan_penjualan_date = record.data.pengakuan_penjualan_date;

		Ext.create('Ext.window.Window', {
			title: 'Pengakuan Penjualan',
			height: 135,
			width: 380,
			//layout: 'hbox',
			padding: '10px 10px 10px 10px',
			modal: true,
			items: {// Let's put an empty grid in just to illustrate fit layout
				padding: '10px 0 0 10px',
				xtype: 'datefield',
				fieldLabel: 'Tanggal Pengakuan Penjualan',
				labelWidth: '55%',
				name: 'pengakuan_penjualan_date',
				editable: false,
				allowBlank: false,
				value: pengakuan_penjualan_date,
				format: 'd-m-Y',
				altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
				submitFormat: 'Y-m-d H:i:s.u'
			},
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
							action: 'savepengakuanpenjualandate',
							padding: 5,
							width: 75,
							iconCls: 'icon-save',
							text: 'Save',
							handler: function () {

								var pengakuan_penjualan_date = this.up('window').items.items[0].value;
								if (!pengakuan_penjualan_date) {
									Ext.Msg.show({
										title: 'Alert',
										msg: 'Please Select Date First',
										icon: Ext.Msg.WARNING,
										buttons: Ext.Msg.OK
									});
									return false;
								}

								this.up('window').body.mask('Saving, Please Wait...');

								me.savePengakuanPenjualanDate(pengakuan_penjualan_date, purchaseletterId, this.up('window'));
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
	},
	savePengakuanPenjualanDate: function (text, purchaseletterId, win) {
		var me = this;

		Ext.Ajax.request({
			url: 'erems/admincollection/read',
			params: {
				read_type_mode: 'update_pengakuan_penjualan',
				pengakuan_penjualan_date: text,
				purchaseletter_id: purchaseletterId
			},
			success: function (response) {
				win.body.unmask();
				if (Ext.decode(response.responseText).success == true) {
					Ext.Msg.show({
						title: 'Success',
						msg: 'Save successfully.',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							win.close();
							var gridDepan = me.getGrid();
							var storeDepan = gridDepan.getStore();
							storeDepan.reload();
						}
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
	},
	//====================== end show pengakuan penjualan ======================
	//== download customer document images == // add on 9 juli 2018
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
					//  bodyPadding: 10,
					//padding: '10px 0 0 0',
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
	//==== Save Full Payment ====
	formFullPayment: function (view, rowIndex, colIndex, item, e, record, row) {
		var me = this;
		var grid = me.getGrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
		var purchaseletterId = record.data.purchaseletter_id;
		//var pengakuan_penjualan_date = record.data.pengakuan_penjualan_date;

		Ext.create('Ext.window.Window', {
			title: 'Generate Full Payment',
			height: 135,
			width: 380,
			//layout: 'hbox',
			padding: '10px 10px 10px 10px',
			modal: true,
			items: {// Let's put an empty grid in just to illustrate fit layout
				padding: '10px 0 0 10px',
				xtype: 'datefield',
				fieldLabel: 'Payment Date',
				labelWidth: '55%',
				name: 'payment_date',
				editable: false,
				allowBlank: false,
				//value: pengakuan_penjualan_date,
				maxValue: new Date(),
				format: 'd-m-Y',
				altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
				submitFormat: 'Y-m-d H:i:s.u'
			},
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
							action: 'saveFullPayment',
							padding: 5,
							width: 75,
							iconCls: 'icon-save',
							text: 'Save',
							handler: function () {

								var payment_date = this.up('window').items.items[0].value;
								if (!payment_date) {
									Ext.Msg.show({
										title: 'Alert',
										msg: 'Please Select Date First',
										icon: Ext.Msg.WARNING,
										buttons: Ext.Msg.OK
									});
									return false;
								}

								this.up('window').body.mask('Saving, Please Wait...');

								me.saveFullPayment(payment_date, this.up('window'));
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
	},
	saveFullPayment: function (payment_date, win) {
		var me = this;

		var grid = me.getGrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

		//var win = el.up('window');

		var purchaseletter_id = record.data.purchaseletter_id,
				unit_id = record.data.unit_id,
				kpr_acc_date = record.data.kpr_acc_date,
				akad_date = record.data.akad_date,
				kpr_realisation = record.data.kpr_realisation;

		Ext.Msg.confirm('Confirm', 'Generate Full Payment?', function (btn) {
			if (btn == 'yes') {
				win.body.mask('Generate Full Payment', 'please wait ...');

				Ext.Ajax.request({
					url: 'erems/bankkpr/create',
					params: {
						save_mode_type: 'full_payment',
						purchaseletter_id: purchaseletter_id,
						unit_id: unit_id,
						kpr_acc_date: kpr_acc_date,
						akad_date: akad_date,
						kpr_realisation: kpr_realisation,
						payment_date: payment_date
					},
					success: function (response) {
						try {
							var resp = response.responseText;

							if (resp) {
								var info = Ext.JSON.decode(resp);

								if (info.success == true) {
									win.body.unmask();

									if (info.payment_id != -99) {
										win.body.unmask();
										win.close();
										Ext.Msg.show({
											title: 'Success',
											msg: 'Success Generate Full Payment',
											icon: Ext.Msg.INFO,
											buttons: Ext.Msg.OK,
											fn: function () {
												store.reload();
											}
										});
									} else {
										win.body.unmask();
										Ext.Msg.show({
											title: 'Info',
											msg: 'Payment Already Generated',
											icon: Ext.Msg.WARNING,
											buttons: Ext.Msg.OK
										});
									}
								} else {
									win.body.unmask();
									Ext.Msg.show({
										title: 'Failure',
										msg: 'Error: Generate Full Payment Gagal.',
										icon: Ext.Msg.ERROR,
										buttons: Ext.Msg.OK
									});
								}
							}
						} catch (e) {
							win.body.unmask();
							Ext.Msg.show({
								title: 'Failure',
								msg: 'Error: Generate Full Payment Gagal.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					},
					failure: function (e) {
						win.body.unmask();
						Ext.Msg.show({
							title: 'Failure',
							msg: 'Error: Generate Full Payment Gagal.',
							icon: Ext.Msg.ERROR,
							buttons: Ext.Msg.OK
						});
					}
				});
			} else {
				win.body.unmask();
			}
		});
	},
	//==== end Save Full Payment ====
	//==== Full Payment - Start ====
	formDataFullPaymentShow: function () {
		var me = this;

		var formtitle = 'Payment Escrow';
		var formicon = 'icon-form-edit';

		var winId = 'win-fullpaymentformdata';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: false,
				width: me.formWidth,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: false,
				state: 'update',
				//items: Ext.create('Erems.view.' + me.controllerName + '.HgbajbFormData'),
				listeners: {
					boxready: function () {
						win.body.mask('Loading...');
						var tm = setTimeout(function () {
							win.add(Ext.create('Erems.view.' + me.controllerName + '.FullPaymentFormData'));
							win.center();
							win.body.unmask();
							clearTimeout(tm);
						}, 1000);
					},
				}
			});
		}
		win.show();

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({
			params: {parametername: 'COLLECTION_IS_EDIT_NILAIPENCAIRAN'},
			callback: function (rec) {
				if (rec.length > 0) {
					var global = rec[0].get('value');
					if (global === '1') {
						me.enableEditPencairanAmount = 1;
					} else {
						me.enableEditPencairanAmount = 0;
					}
				} else {
					me.enableEditPencairanAmount = 0;
				}
			}
		});
	},
	formDataFullPaymentAfterRender: function (el) {
		var me = this;

		// me.loadComboBoxStore(el);
		// var state = el.up('window').state;

		//show form add pencarian 
		me.detailTool = new Erems.library.DetailtoolAll();
		me.detailTool.setConfig({
			viewPanel: 'PencairanFormDataDetail',
			parentFDWindowId: me.getFullpaymentformdata().up('window').id,
			controllerName: me.controllerName
		});
		me.detailTool.parentGridAlias = 'admincollectionfullpaymentgrid';

		var grid = me.getGrid();
		var store = grid.getStore();
		var form = me.getFullpaymentformdata();

		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
		el.loadRecord(record);

		el.body.mask('Loading Information, please wait ...');

		form.down('[name=kpr_value_approve]').setValue(record.data.kpr_realisation);
		var hjbagbStore = me.getHgbajbStore();
		hjbagbStore.removeAll();
		if (record.data.buktipemilik_id > 0) {
			var buktipemilik_id = record.data.buktipemilik_id;
			hjbagbStore.load({params: {is_hgbajb: 'yes', buktipemilik_id: buktipemilik_id}});
		}
		//load grid full payment
		var fullpaymentStore = me.getPencairanfullpaymentStore();
		fullpaymentStore.removeAll();
		fullpaymentStore.load({
			params: {purchaseletter_id: record.data.purchaseletter_id},
			callback: function (rec) {
				if (rec[0]) {
					form.down('[name=payment_id]').setValue(rec[0].get('payment_id'));
					form.down('[name=payment_no]').setValue(rec[0].get('payment_no'));
					form.down('[name=receipt_no]').setValue(rec[0].get('receipt_no'));
					form.down('[name=payment_date]').setValue(rec[0].get('payment_date'));
					form.down('[name=duedate]').setValue(rec[0].get('duedate'));
					form.down('[name=payment]').setValue(me.fmb(rec[0].get('payment')));
				} else {
					form.down('#btnSave').setDisabled(true);
				}
			}
		});

		//load grid Pencairan KPR
		var pencairankprStore = me.getPencairankprStore();
		pencairankprStore.removeAll();
		pencairankprStore.load({
			params: {purchaseletter_id: record.data.purchaseletter_id},
			callback: function (pencairanrec) {
				me.tcb_synch();
			}
		});

		var pencairanGrid = me.getPencairangrid();
		pencairanGrid.down('#actioncolumn').setVisible(true);

		pencairanGrid.getView().getHeaderCt().child('#colms_bilyet_no').show();
		pencairanGrid.getView().getHeaderCt().child('#colms_realisation_date').show();

		if (record.data.is_alreadyakad == 0) {
			me.isAlreadyAkad = 0
		} else {
			me.isAlreadyAkad = 1
		}

		el.body.unmask();
	},
	pencairangridActionColumnAfterRender: function (el) {
		var me = this;
		var actitem = el.items;

		Ext.each(actitem, function (item, index) {
			item.getClass = function () {
				if (index == 0) {
					return 'ux-actioncolumn ' + 'icon-edit' + ' act-' + 'PencairankprUpdate';
				}
				if (index == 1) {
					return 'ux-actioncolumn ' + 'icon-delete' + ' act-' + 'PencairankprDelete';
				}
			};
		});
	},
	//==== Full Payment - End ====
	wesea: function (data, element) {
		//  console.log(data);
		var x = {
			comboBox: function (usingAll, callback) {
				if (!data) {
					return;
				}
				if (!data.model || !data.data) {
					return false;
				}


				var fi = [];
				for (var m in data.model) {
					fi.push(data.model[m]['name']);
				}

				var newData = [];
				var recordAll = {};
				if (usingAll) {
					recordAll[element.displayField] = 'ALL';
					recordAll[element.valueField] = '999';
					newData.push(recordAll);
				}

				for (var v in data.data) {
					newData.push(data.data[v]);
				}


				var newStore = Ext.create('Ext.data.Store', {
					fields: fi,
					data: newData
				});



				element.bindStore(newStore);

				if (usingAll) {
					element.setValue('999');
				}
				if (typeof callback === "function") {
					callback();
				}
			}
		}
		return x;
	},
	//added by anas 04062021
	mainPanelBeforeRender: function (el) {
		var me = this;

		me.detailTool3 = new Erems.library.DetailtoolAll();
		me.detailTool3.setConfig({
			viewPanel        : 'FormDataOpen',
			parentFDWindowId : me.getGrid().up('window').id,
			controllerName   : me.controllerName
		});

		// edited by rico 14092021
		// Ext.Ajax.request({
		// 	url    : 'erems/admincollection/read',
		// 	params : {
		// 		read_type_mode: 'open_hari_va'
		// 	},
		// 	success: function (response) {
		// 		var res = Ext.JSON.decode(response.responseText);
		// 		var grid = me.getGrid()
		// 		// grid.down('#btnOpen').setVisible(false);
		// 		if (res['button'] == "1") {
		// 			grid.down('#btnOpen').setVisible(true);
		// 		}
		// 	}
		// });
		Ext.Ajax.request({
			url     : 'erems/admincollection/read',
			params  : { read_type_mode : 'configuration' },
			success : function (response) {
				var res = Ext.JSON.decode(response.responseText);

				me.subholding_config = res['subholding_config'];
				me.button_openva     = res['button'];
				me.checklist_openva  = res['checklist'];
				me.denda_permil      = res['denda_permil'];
				me.batas_toleransi   = res['batas_toleransi'];
				me.active_check_akad = res['active_check_akad'];

				var grid = me.getGrid()
				grid.down('#btnOpen').setVisible(me.button_openva);
				// grid.down('#btnOpen').setVisible(me.checklist_openva);
			}
		});
	},
	formDataadjustkprdate : function(){
		var me     = this,
			grid   = me.getGrid(),
			store  = grid.getStore(),
			record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

		var formTools = new Erems.library.DetailtoolAll();
		formTools.setConfig({
			viewPanel        : 'FormDataOpen',
			parentFDWindowId : me.getGrid().up('window').id,
			controllerName   : me.controllerName
		});
		formTools.form().show('create', 350, 'Adjust KPR Date');

		var fData = formTools.form().getForm();

		fData.down('[name=open_hari_va]').destroy();
		fData.down('[name=include_denda_va]').destroy();
		fData.down('[name=purchaseletter_id]').setValue(record.data.purchaseletter_id);
		fData.down('[name=flag_form]').setValue('adjust_kpr');
        fData.add({
			xtype      : 'xdatefield',
			name       : 'kpr_date_adjust',
			editable   : false,
			allowBlank : false,
			width      : 255,
			fieldLabel : 'KPR Date',
			value      : record.data.kpr_date_adjust
        });
	},
	formDataOpenHariVAAfterRender: function (el) {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

		var purchaseletter_id = row[0].data.purchaseletter_id;
		var open_hari_va      = row[0].data.open_hari_va;
		var include_denda_va  = row[0].data.include_denda_va;

		me.getFormdataopen().down("[name=purchaseletter_id]").setValue(purchaseletter_id);
		me.getFormdataopen().down("[name=open_hari_va]").setValue(open_hari_va);
		me.getFormdataopen().down("[name=include_denda_va]").setValue(include_denda_va);

		me.getFormdataopen().down('[name=include_denda_va]').setVisible(me.checklist_openva);

		// added by rico 14092021
		// Ext.Ajax.request({
		// 	url: 'erems/admincollection/read',
		// 	params: {
		// 		read_type_mode: 'open_hari_va'
		// 	},
		// 	success: function (response) {
		// 		var res = Ext.JSON.decode(response.responseText);
		// 		var grid = me.getGrid()

		// 		if (res['checklist']) {
		// 			me.getFormdataopen().down('[name=include_denda_va]').setVisible(true);
		// 		}
		// 	}
		// });
	},
	detailFormOpenHariVA: {
		that            : this,
		editingIndexRow : 0,
		save            : function () {
			var me   = this;
			var form = me.getFormdataopen().getForm();

			if (form.isValid()) {
				var fields = me.getFormdataopen().getValues();
				
				resetTimer();
				me.getFormdataopen().up('window').body.mask('Saving, please wait ...');

				if(fields.flag_form == 'open_va'){
					if (fields.open_hari_va == null) {
						me.getFormdataopen().up('window').body.unmask();
						Ext.Msg.show({
							title   : 'Failure',
							msg     : 'Error: Please check field Open Hari VA.',
							icon    : Ext.Msg.ERROR,
							buttons : Ext.Msg.OK
						});
					} else {
						Ext.Ajax.request({
							url: 'erems/admincollection/read',
							params: {
								read_type_mode    : 'update_openhariva',
								open_hari_va      : fields.open_hari_va,
								include_denda_va  : fields.include_denda_va,
								purchaseletter_id : fields.purchaseletter_id
							},
							success: function (response) {
								try {
									var resp = response.responseText;
									if (resp) {
										var info = Ext.JSON.decode(resp);
										if (info.success == true) {
											me.getFormdataopen().up('window').body.unmask();
											Ext.Msg.show({
												title: 'Success',
												msg: 'Data saved successfully.',
												icon: Ext.Msg.INFO,
												buttons: Ext.Msg.OK,
												fn: function () {
													me.getFormdataopen().up('window').close();
													var gridDepan = me.getGrid();
													var storeDepan = gridDepan.getStore();
													storeDepan.reload();
												}
											});

										} else {
											me.getFormdataopen().up('window').body.unmask();
											Ext.Msg.show({
												title: 'Failure',
												msg: 'Error: Unable to save data.',
												icon: Ext.Msg.ERROR,
												buttons: Ext.Msg.OK
											});
										}
									}
								} catch (e) {
									me.getFormdataopen().up('window').body.unmask();
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
				}
				else{
					if (fields.kpr_date_adjust == null) {
						me.getFormdataopen().up('window').body.unmask();
						Ext.Msg.show({
							title   : 'Failure',
							msg     : 'Error: Please check field KPR Date.',
							icon    : Ext.Msg.ERROR,
							buttons : Ext.Msg.OK
						});
					} 
					else {
						Ext.Ajax.request({
							url    : 'erems/admincollection/read',
							params : {
								read_type_mode    : 'update_adjust_kpr',
								kpr_date_adjust   : fields.kpr_date_adjust,
								purchaseletter_id : fields.purchaseletter_id
							},
							success: function (response) {
								me.getFormdataopen().up('window').body.unmask();
								try {
									var resp = response.responseText;
									if(resp){
										var info = Ext.JSON.decode(resp);
										if (info.success == true) {
											Ext.Msg.show({
												title   : 'Success',
												msg     : 'Data saved successfully.',
												icon    : Ext.Msg.INFO,
												buttons : Ext.Msg.OK,
												fn      : function () {
													me.getFormdataopen().up('window').close();
													var gridDepan = me.getGrid();
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
									}
								} 
								catch (e) {
									Ext.Msg.show({
										title   : 'Failure',
										msg     : 'Error: Unable to save data.',
										icon    : Ext.Msg.ERROR,
										buttons : Ext.Msg.OK
									});
								}
							}
						});
					}
				}
			}
		}
	},
	/* added by rico 15122021 */
	/* report needed */
	processRetensiReport: function () {
		var me = this;
		var grid = me.getPencairangrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
		var param_store = record.data;
		var param_string = '';
		var row = grid.getSelectionModel().getSelection();

		for (var key in row) {
			param_string += row[key].data['purchaseletter_pencairankpr_id'] + '~';
		}

		var param_data = {'purchaseletter_pencairankpr_id': param_string, 'purchaseletter_id': param_store['purchaseletter_id']};
		me.printOut(me, param_store['purchaseletter_id'], 'PRINTOUT_PENCAIRAN_RETENSI', 'erems/admincollection/read', param_data);
	},
	printOut: function (me, id, parametername, urlAdd, param) {
		var id = id;

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: parametername}});

		var combo = Ext.create('Ext.form.field.ComboBox', {
			editable: false,
			queryMode: 'local',
			valueField: 'value',
			displayField: 'value',
			width: '100%',
			store: globalparameterStore
		});

		Ext.create('Ext.window.Window', {
			title: 'Select Printout Document',
			height: 100,
			width: 400,
			layout: 'hbox',
			padding: '10px 10px 10px 10px',
			modal: true,
			items: {// Let's put an empty grid in just to illustrate fit layout
				xtype: combo,
				name: 'printout_cb'
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
								var win = this.up('window');
								var printout_cb = win.items.items[0].value;

								if (!printout_cb) {
									Ext.Msg.show({
										title: 'Alert',
										msg: 'Please Select Printout Document First',
										icon: Ext.Msg.WARNING,
										buttons: Ext.Msg.OK
									});
									return false;
								}

								win.body.mask('Creating Document, Please Wait...');

								Ext.Ajax.request({
									url: urlAdd,
									params: {
										id: id,
										document_name: printout_cb,
										param_string: param['purchaseletter_pencairankpr_id'],
										read_type_mode: 'printout'
									},
									success: function (response) {
										try {
											var resp = response.responseText;

											if (resp) {
												var info = Ext.JSON.decode(resp);

												if (info.success == true) {
													var url = info.url;

													win.body.unmask();
													Ext.Msg.show({
														title: 'Info',
														//updated by anas 08092021
														msg: '<a href="' + info.url + '" target="blank">Click Here For Download Document</a>',
														icon: Ext.Msg.INFO,
														//buttons: [], //jika ingin tidak ada buttons
														buttons: Ext.Msg.CANCEL,
														buttonText: {
															cancel: 'Close',
														}
													});
												} else {
													win.body.unmask();
													Ext.Msg.show({
														title: 'Failure',
														msg: 'Error: Create Document Failed.',
														icon: Ext.Msg.ERROR,
														buttons: Ext.Msg.OK
													});
												}
											}
										} catch (e) {
											console.error(e);
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
										console.error(e);
										win.body.unmask();
										Ext.Msg.show({
											title: 'Failure',
											msg: 'Error: Create Document Failed.',
											icon: Ext.Msg.ERROR,
											buttons: Ext.Msg.OK
										});
									}
								});
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
	},
	printFeeKPR: function(){
		var me = this;

		var grid = me.getBankgrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

		purchaseletter_bankkpr_id = record.data.purchaseletter_bankkpr_id;
		purchaseletter_id = record.data.purchaseletter_id;
		is_print_fee_kpr = record.data.is_print_fee_kpr;

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'PRINTOUT_FEE_KPR'}});

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
											read_type_mode: 'printout_feekpr',
											purchaseletter_id: purchaseletter_id,
											purchaseletter_bankkpr_id: purchaseletter_bankkpr_id,
											is_print_fee_kpr: is_print_fee_kpr
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
	printSuratKuasa: function(){
		var me = this;

		var grid = me.getBankgrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

		purchaseletter_bankkpr_id = record.data.purchaseletter_bankkpr_id;
		purchaseletter_id = record.data.purchaseletter_id;

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'PRINTOUT_SURAT_KUASA'}});

		var combo = Ext.create('Ext.form.field.ComboBox', {
			id: 'cbPrintoutID',
			editable: false,
			queryMode: 'local',
			valueField: 'value',
			displayField: 'description',
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
											read_type_mode: 'printout_suratkuasa',
											purchaseletter_id: purchaseletter_id,
											purchaseletter_bankkpr_id: purchaseletter_bankkpr_id
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
	//////// added by erwin.st 090822 ////////
	getMinDate : function(arr){
		var me = this;
		return me.getMindate(arr);
	},
	view_simulation_payment : function(){
		var me = this, grid = me.getGrid(), row = grid.getSelectionModel().getSelection(), rec = row[0];

		me.detailTool4 = new Erems.library.DetailtoolAll();
		me.detailTool4.setConfig({
			viewPanel        : 'SimulationPaymentGrid',
			parentFDWindowId : me.getGrid().up('window').id,
			controllerName   : me.controllerName,
			winId            : 'myInstantWindow'
		});
		me.detailTool4.form().show('create', 970, 'Simulation Payment for Purchase Letter No. ' + rec.get('purchaseletter_no') + ' - Unit Number ' + rec.get('unit_number'));

		me.getSimulationpaymentgrid().setLoading("Request schedule information...");
		Ext.Ajax.request({
			// url    : 'erems/purchaseletter/read',
			// params : { mode_read : 'schedule', purchaseletter_id : rec.get('purchaseletter_id') },
			url    : 'erems/installmentpayment/read',
			params : { mode_read : 'tagihantagihan', purchaseletter_id : rec.get('purchaseletter_id'), is_draft : '' },
			success: function (response) {
				var res = Ext.JSON.decode(response.responseText);

				var model = res.model, l = model.length, newArr = ['no', 'simulasi_denda', 'simulasi_nunggak', 'simulasi_pokok', 'simulasi_total_bayar'];
				for (var x = 0; x < newArr.length; x++) {
					model[(l+x)] = { name : newArr[x], mapping : "schedule." + newArr[x] };
				}

				var newStore = Ext.create('Ext.data.Store', {
					fields : model,
					data   : res.data
                });
                me.getSimulationpaymentgrid().bindStore(newStore);

				me.getSimulationpaymentgrid().setLoading(false);

				var summaryRow = me.getSimulationpaymentgrid().getView().getFeature(0); 
                styleObj = { 'background-color' : '#dcdcdc' };
                summaryRow.view.el.setStyle(styleObj);
			}
		});
	},
	calculate_simulation_payment : function(){
		var me = this, 
			grid = me.getSimulationpaymentgrid(), 
			store = grid.getStore(),
			rencana_tanggal_bayar = grid.down('[name=rencana_tanggal_bayar]').getValue(),
			permil = accounting.unformat(me.denda_permil);

		store.each(function (rec, x, y) {
			if (rec != null) {
				var rb = accounting.unformat(accounting.toFixed(rec.get('remaining_balance'), 2));
				var rd = accounting.unformat(accounting.toFixed(rec.get('remaining_denda'), 2));
				
				var dayDiff     = 0;
				var denda       = parseFloat(rd);
				var pokok       = 0;
				var total_bayar = 0;

				if(rec.get('remaining_balance') > 0){
					if(rec.get('duedate') <= rencana_tanggal_bayar){
						pokok   = parseFloat(rb);	

						dayDiff = Math.abs(me.getDatediff.inDays(rencana_tanggal_bayar, rec.get('duedate')));

						if(me.batas_toleransi < dayDiff){
							denda = parseFloat(accounting.toFixed((denda + parseFloat(rb * dayDiff * (permil/1000))), 2)); 
							denda = me.roundlib.rounding(1, denda);
						}
					}
				}

				var total_bayar = parseFloat(accounting.toFixed((parseFloat(denda) + parseFloat(pokok)), 2));
				total_bayar = me.roundlib.rounding(1, total_bayar);

				rec.beginEdit();
				rec.set({ 'no' : `${(x+1)}` });
				rec.set({ 'amount' : accounting.unformat(rec.get('amount')) });
				rec.set({ 'remaining_balance' : rb });
				rec.set({ 'termin' : `${rec.get('termin')}` });
                rec.set({ 'simulasi_nunggak' : `${dayDiff}` });
                rec.set({ 'simulasi_pokok' : pokok });
                rec.set({ 'simulasi_denda' : denda });
                rec.set({ 'simulasi_total_bayar' : total_bayar });
                rec.endEdit();  
			}
		});
		me.getSimulationpaymentgrid().getView().refresh();
	},
	print_simulation_payment : function () {
		var me   = this, 
		grid     = me.getSimulationpaymentgrid(), 
		store    = grid.getStore(), 
		gridmain = me.getGrid(), 
		row      = gridmain.getSelectionModel().getSelection(), 
		rec      = row[0];

		var keys = [];
		var gridColumns = grid.headerCt.getGridColumns();
		for (var i = 0; i < gridColumns.length; i++) {
			keys.push({ 
				index : (gridColumns[i].dataIndex == '' ? 'no' : gridColumns[i].dataIndex), 
				text  : gridColumns[i].text
			});
		}

		var arrData = [];
		store.each(function(rec, i){
			var obj = {};
			for (var x = 0; x < keys.length; x++) {
				var valRec = rec.get(keys[x].index);

				if(keys[x].index.includes("date")){
					valRec = valRec ? Ext.Date.format(new Date(valRec), "d-m-Y") : '';
				}
				else if(typeof valRec === 'number'){
					valRec = parseFloat(valRec);
				}
				obj[keys[x].index] =  valRec;
			}
			arrData.push(obj);
		});

		// var finalData     = {};
		// finalData['key']  = keys;
		// finalData['data'] = arrData;

		var winId = 'myReportWindow';
		me.instantWindowReport('Panel', 950, 'Simulation Payment ', 'state-report', winId, 'masterreport');
		var win = desktop.getWindow(winId);

		if (win) {
			var params = {};
			var reportFile = "simulationpayment";

			var rc = rec.data;
			for (i in rc) {
				var value = rc[i];
				if(i.includes("date")){
					value = Ext.Date.format(new Date(value), "d-m-Y");
				}
				params[i] = value;
			}

			params['print_by']              = apps.loginname;
			params['project']               = apps.projectname;
			params['tanggal_rencana_bayar'] = Ext.Date.format(new Date(grid.down('[name=rencana_tanggal_bayar]').getValue()), "d-m-Y");
			params['data']                  = btoa(JSON.stringify(arrData));
			// params['data']                  = btoa(JSON.stringify(finalData));

			var html = me.generateFakeForm3(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},
	generateFakeForm3: function (paramList, reportFile) {
		var form = '<form id="fakeReportFormID" action=resources/stimulsoftjsv3/viewer_json.php?reportfilelocation=' + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
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
	printCoverNotes: function(){
		var me = this;

		var grid = me.getBankgrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

		purchaseletter_bankkpr_id = record.data.purchaseletter_bankkpr_id;
		purchaseletter_id = record.data.purchaseletter_id;
		// is_print_fee_kpr = record.data.is_print_fee_kpr;

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
	printSubsidiKPR: function(){
		var me = this;

		var grid = me.getBankgrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

		purchaseletter_bankkpr_id = record.data.purchaseletter_bankkpr_id;
		purchaseletter_id = record.data.purchaseletter_id;
		is_print_subsidi_kpr = record.data.is_print_subsidi_kpr;

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'PRINTOUT_SUBSIDI_KPR'}});

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
										var reportFile = "SubsidiKPR";

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
											read_type_mode: 'printout_subsidikpr',
											purchaseletter_id: purchaseletter_id,
											purchaseletter_bankkpr_id: purchaseletter_bankkpr_id,
											is_print_subsidi_kpr: is_print_subsidi_kpr
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
	printBuyBack: function(){
		var me = this;

		var grid = me.getBankgrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

		purchaseletter_bankkpr_id = record.data.purchaseletter_bankkpr_id;
		purchaseletter_id = record.data.purchaseletter_id;
		// is_print_buy_back = record.data.is_print_buy_back;

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'PRINTOUT_BUY_BACK'}});

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
			// height: 200,
			width: 400,
			layout: 'vbox',
			padding: '10px 10px 10px 10px',
					bodyPadding: 10, 
			modal: true,
			items: [
				{
					xtype: combo,
					name: 'printout_combobox'
				},
			],
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
										var reportFile = "BuyBack";

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
											read_type_mode: 'printout_buyback',
											purchaseletter_id: purchaseletter_id,
											purchaseletter_bankkpr_id: purchaseletter_bankkpr_id,
											// is_print_fee_kpr: is_print_fee_kpr
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
	printKonfirmasi: function(){
		var me = this;

		var grid = me.getBankgrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

		purchaseletter_bankkpr_id = record.data.purchaseletter_bankkpr_id;
		purchaseletter_id = record.data.purchaseletter_id;
		// is_print_buy_back = record.data.is_print_buy_back;

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'PRINTOUT_KONFIRMASI_TUNGGAKAN_BANK'}});

		var combo = Ext.create('Ext.form.field.ComboBox', {
			id: 'cbPrintoutID',
			editable: false,
			queryMode: 'local',
			fieldLabel: 'Type',
			valueField: 'value',
			displayField: 'value',
			width: '100%'
		});

		var radio = Ext.create('Ext.form.RadioGroup', {
			id: 'rdPrintoutID',
			fieldLabel: 'Tunggakan',
	        // columns: 2,
	        vertical: true,
			width: '100%',
	        items: [
	            { boxLabel: '1', name: 'rb', inputValue: '1', checked: true },
	            { boxLabel: '2', name: 'rb', inputValue: '2' },
	            { boxLabel: '3', name: 'rb', inputValue: '3' },
	        ]
		});

		Ext.create('Ext.window.Window', {
			id: 'myCbDocWindow',
			title: 'Select Printout Type',
			// height: 200,
			width: 400,
			layout: 'vbox',
			padding: '10px 10px 10px 10px',
					bodyPadding: 10, 
			modal: true,
			items: [
				{
					xtype: combo,
					name: 'printout_combobox'
				},
				{
					xtype: radio,
					name: 'printout_radio'
				},
			],
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
								var printout_rd = this.up('window').items.items[1].getChecked()[0].inputValue;

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
										var reportFile = "BuyBack";

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
											read_type_mode: 'printout_konfirmasi',
											purchaseletter_id: purchaseletter_id,
											purchaseletter_bankkpr_id: purchaseletter_bankkpr_id,
											tunggakan: printout_rd,
											// is_print_fee_kpr: is_print_fee_kpr
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