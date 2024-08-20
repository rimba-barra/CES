Ext.define('Erems.controller.Admincollectioncashier', {
	extend: 'Erems.library.template.controller.Controller2',
	alias: 'controller.Admincollectioncashier',
	requires: [
		'Erems.library.DetailtoolAll',
		'Erems.library.Browse',
		'Erems.library.XyReport',
		'Erems.library.template.combobox.Deptprefixcombobox',
		'Erems.library.template.combobox.Statuscombobox',
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
//		'Erems.library.template.component.Unitcombobox',
		'Erems.library.template.component.Pricetypecombobox'
	],
	views: ['admincollectioncashier.Panel', 'admincollectioncashier.Grid', 'admincollectioncashier.FormSearch', 'admincollectioncashier.FormData', 'admincollectioncashier.PencairanFormData', 'admincollectioncashier.PencairanGrid', 'admincollectioncashier.BankGrid', 'admincollectioncashier.BankFormDataDetail', 'admincollectioncashier.BankGridAkad', 'admincollectioncashier.BankAkadFormDataDetail', 'otherspayment.DosPreviewFormData'],
	stores: [
		'Mastercluster',
		'Deptprefixcombo',
		'Ptbyuser',
		'Grouptransaction',
		'Voucherprefixsetupcombo',
		'Statuscombo',
		'Grouptransaction',
		'Pencairankprcashier',
		'Admincollectioncashier', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masterblock', 'Pencairankprcashier', 'Bankkpr', 'Admincollectioncashierschedule', 'Masterbankkpr', 'Bankkprakad', 'Masterakadconfirmationstatus', 'Masterparameterglobal', 'Masterdata.store.City', 'Mastercitraclub', 'Masterplafon', 'Pencairankprduedateescrowcashier'],
	models: ['Admincollectioncashier', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masterblock', 'Pencairankprcashier', 'Bankkpr', 'Admincollectioncashierschedule', 'Masterbankkpr', 'Bankkprakad', 'Masterakadconfirmationstatus', 'Masterparameterglobal', 'Masterdata.model.City', 'Mastercitraclub', 'Masterplafon', 'Pencairankprduedateescrowcashier'],
	detailTool: null,
	detailTool2: null,
	refs: [
		{
			ref: 'grid',
			selector: 'admincollectioncashiergrid'
		},
		{
			ref: 'formsearch',
			selector: 'admincollectioncashierformsearch'
		},
		{
			ref: 'formdata',
			selector: 'admincollectioncashierformdata'
		},
		//pencairan
		{
			ref: 'pencairanformdata',
			selector: 'admincollectioncashierpencairanformdata'
		},
		{
			ref: 'pencairangrid',
			selector: 'admincollectioncashierpencairangrid'
		},
		{
			ref: 'pencairanformdatadetail',
			selector: 'admincollectioncashierpencairanformdatadetail'
		},
		//end pencairan

		//add bank KPR
		{
			ref: 'bankgrid',
			selector: 'admincollectioncashierbankgrid'
		},
		{
			ref: 'bankformdatadetail',
			selector: 'admincollectioncashierbankformdatadetail'
		},
		{
			ref: 'formdos',
			selector: 'otherspaymentdospreviewformdata'
		},
		//end bank KPR

		//add bank KPR Grid Akad
		{
			ref: 'bankgridakad',
			selector: 'admincollectioncashierbankgridakad'
		},
		{
			ref: 'bankakadformdatadetail',
			selector: 'admincollectioncashierbankakadformdatadetail'
		},
		{
			ref: 'detailcoagrid',
			selector: 'coadetailgrid'

		},
		{
			ref: 'formcoadetail',
			selector: 'admincollectioncashierformcoadetail'
		}
		//end bank KPR Grid Akad
	],
	controllerName: 'admincollectioncashier',
	fieldName: 'changeownership_no',
	bindPrefixName: 'Admincollectioncashier',
	validationItems: [
		{name: 'purchaseletter_id', msg: 'You must select Kavling / Unit No. first'}
	],

	formWidth: 800,
	dateNow: new Date(),
	prefix_id: 0,
	templateCoa: '4', //1 Pencairan kpr payment (1 = INSTALLMENT, 4 = Pencairan KPr, 5 = EXPENSE REQUEST, 
	templateModuleName: 'Pencairan KPR Payment',
	is_out: 0, //jika TRANSAKSI OUT 1. JIKA IN 0
	fillForm: null,
	unitFormula: null,
	paymentFunc: null,
	browseHandler: null,
	storeProcess: 'Admincollectiondetail',
	stData: {},
	pt_id: 0,
	total_temp: 0,
	sumTagihan: 0,
	plafon: [],
	localStore: {
		selectedUnit: null,
		customer: null,
		price: null,
		detail: null
	},
	urlcommon: 'erems/admincollectioncashier/create',
	tagihanDefaultValue: false,
	tools: null,
	myConfig: null,
	cbf: null,
	mt: null,
	stList: null, // list of schedule type
	effectedSch: [], // list schedule id yang dibayar
	formxWinId: 'win-admincollectioncashierId',
	paymentId: 0,
	prefix: null,
	prefix_voucher: null,
	state: null,
	accept_date: null,
	myParams: null,
	flaggeneratevoucherno: 0,
	countLoadProcess: 0,
	BankKPRRealisationDefault: 0,
	enableEditPencairanAmount: 0,
	enableAddNewSchema: 0,
	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		me.cbf = new Erems.template.ComboBoxFields();
	},
	init: function (application) {
		var me = this;


		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});

		this.control({
			test: me.eventMonthField,
			'admincollectioncashierpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'admincollectioncashiergrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'#admincollectioncashiergrid_ctxMenu menuitem' : {
				click : function(el){
					if(el.action == 'pencairan'){
						me.formDataPencairanShow();
					}
				}
			},
			'admincollectioncashiergrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'admincollectioncashiergrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'admincollectioncashiergrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'admincollectioncashiergrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'admincollectioncashierformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'admincollectioncashierformsearch button[action=search]': {
				click: this.dataSearch
			},
			'admincollectioncashierformsearch button[action=reset]': {
				click: this.dataReset
			},
			'admincollectioncashierformdata': {
				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataAfterRender
			},

			'admincollectioncashierformdata button[action=save]': {
				click: this.dataSave
			},
			'admincollectioncashierformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'admincollectioncashierformdata button[action=browse_paramadmincollectioncashier]': {
				click: me.selectParamadmincollectioncashierGridShow
			},
			// pencairan
			'admincollectioncashiergrid toolbar button[action=pencairan]': {
				click: this.formDataPencairanShow
			},
			'admincollectioncashierpencairanformdata': {
				beforerender: this.formDataPencairanBeforeRender,
				afterrender: this.formDataPencairanAfterRender
			},
			'admincollectioncashierpencairanformdata button[action=save]': {
				click: this.dataSavePencairan
			},
			'coadetailgrid toolbar [action=generate]': {
				click: function () {
					me.generateCoa(me.templateCoa);
				}

			},
			'coadetailgrid toolbar button[action=destroy]': {
				click: function (el, act) {
					me.destroydetail();
				}

			},
			'coadetailgrid toolbar [action=create]': {
				click: function (el, act) {
					me.formDataDetail('create');
				}

			},
			'coadetailgrid toolbar [id=btnEditCoa]': {
				click: function (el, act) {
					me.formDataDetail('update');
				}

			},
			'admincollectioncashierpencairangrid toolbar button[action=create]': {
				click: function () {
					me.detailTool.form().show('create', 500, 'New'); //'adddetailpencarian' petik terakhir bisa kosong atau tidak
				}
			},
			'admincollectioncashierpencairangrid button[action=generateschema]': {
				click: me.setGenerateSchema
			},
			'admincollectioncashierpencairanformdatadetail [name=persen_pencairan]': {
				keyup: me.detailForm.fillPencairanAmount
			},
			'admincollectioncashierpencairanformdatadetail button[action=save]': {
				click: me.detailForm.save
			},
			'admincollectioncashierpencairangrid actioncolumn': {
				click: me.detailGrid.actionColumnClick
			},
			'admincollectioncashierpencairanformdatadetail': {
				beforerender: this.formDataPencairanDetailBeforeRender,
			},
			'admincollectioncashierpencairangrid button[action=addschema]': {
				click: function () {
					me.detailTool.form().show('create', 500, 'New'); //'adddetailpencarian' petik terakhir bisa kosong atau tidak
				}
			},
			'admincollectioncashierpencairangrid button[action=printschema]': {
				click: function () {
					me.processReport();
				}
			},
			'admincollectioncashierpencairangrid button[action=synchduedate]': {
				click: me.setDueDateEscrow
			},
			'admincollectioncashierpencairangrid button[action=synchprogress]': {
				click: me.setProgressConst
			},
			// end pencairan

			//Add Bank KPR
			'admincollectioncashierbankgrid toolbar button[action=create]': {
				click: function () {
					me.detailTool.form().show('create', 700, 'New');
				}
			},
			'admincollectioncashierbankformdatadetail': {
				afterrender: this.formDataBankAfterRender
			},
			'admincollectioncashierbankformdatadetail button[action=save]': {
				click: me.detailBankForm.save
			},
			'admincollectioncashierbankgrid': {
				itemdblclick: me.detailBankGridItemDblClick
			},
			'admincollectioncashierbankgrid actioncolumn': {
				click: me.detailBankGrid.actionColumnClick
			},
			'admincollectioncashierbankformdatadetail [name=kpr_realisation]': {
				keyup: me.detailBankForm.fillCreatedby
			},
			'admincollectioncashierbankformdatadetail [name=kpr_cicilan]': {
				keyup: me.detailBankForm.fillCreatedby
			},
			'admincollectioncashierbankformdatadetail [name=kpr_tenor]': {
				keyup: me.detailBankForm.fillCreatedby
			},
			'admincollectioncashierbankformdatadetail [name=kpr_interest]': {
				keyup: me.detailBankForm.fillCreatedby
			},
			'admincollectioncashierbankgrid button[action=printkuitansi]': {
				click: function () {
					me.printKuitansi();
				}
			},
			//== akad kredit==
			'admincollectioncashierbankgridakad toolbar button[action=create]': {
				/*click: function() {
				 me.detailTool2.form().show('create', 500, 'Add New Confirmation', '');
				 }*/
				click: me.cekBankkprakad
			},
			'admincollectioncashierbankakadformdatadetail': {
				beforerender: this.formDataBankAkadBeforeRender,
				//afterrender: this.formDataBankAkadAfterRender
			},
			'admincollectioncashierbankakadformdatadetail button[action=save]': {
				click: me.detailBankAkadForm.save
			},
			'admincollectioncashierbankgridakad actioncolumn': {
				editaction: me.bankgridakadactionEditColumnClick,
				deleteaction: me.bankgridakadactionDeleteColumnClick
						//click: me.detailBankGridAkad.actionColumnClick
			},
			//== end akad kredit ==
			//end add Bank KPR

			//== tombol batal by ==
			'admincollectioncashierformdata button[action=savebatalbylegal]': {
				click: function () {
					me.dataSaveBatalBy('Legal');
				}
			},
			'admincollectioncashierformdata button[action=savebatalbycollection]': {
				click: function () {
					me.dataSaveBatalBy('Collection');
				}
			},
			'admincollectioncashierpencairanformdata [name=paymentcashier_prefix_id] ': {
				'select': function (g, record, item, index, e, eOpts) {//console.log(rowdata.coa_id);
					//me.tools.wesea(rowdata.coa_id, form.down("[name=thcoa_id]")).comboBox(true);
					//me.tools.wesea(rowdata.voucherprefix_id, form.down("[name=voucherprefix_id]")).comboBox(true);

					var me, rowdata, form, countlength;
					me = this;
					form = me.getPencairanformdata();
					rowdata = record[0]['data'];
					//console.log(rowdata);

					form.down("[name=paymentcashier_thcoa_id]").setValue(rowdata.coa_id);
					form.down("[name=paymentcashier_voucherprefix_id]").setValue(rowdata.voucherprefix_id);
					me.prefix_voucher = rowdata.prefix;
					me.prefix_id = rowdata.prefix_id;
//                    console.log(rowdata.voucherprefix_id);
					me.is_fixed = rowdata.is_fixed;
					me.fixed_coa_id = rowdata.fixed_coa_id;
					me.fixed_coa = rowdata.fixed_coa;
					me.fixed_account_desc = rowdata.fixed_account_desc;
					me.prefix = rowdata.prefix;
					countlength = me.fixed_coa.length;




					me.generateVoucherno();

				},
			},

			'admincollectioncashierpencairanformdata [name=paymentcashier_prefix_id_bank] ': {
				'select': function (g, record, item, index, e, eOpts) {

					var me, rowdata, form, countlength;
					me = this;
					form = me.getPencairanformdata();
					rowdata = record[0]['data'];
					form.down("[name=paymentcashier_thcoa_id]").setValue(rowdata.coa_id);
					form.down("[name=paymentcashier_voucherprefix_id]").setValue(rowdata.voucherprefix_id);
					//console.log(rowdata);
					me.is_fixed = rowdata.is_fixed;
					me.fixed_coa_id = rowdata.fixed_coa_id;
					me.fixed_coa = rowdata.fixed_coa;
					me.fixed_account_desc = rowdata.fixed_account_desc;
					me.prefix_voucher = rowdata.temp_prefix;
					me.prefix = rowdata.prefix;
					me.prefix_id = rowdata.prefix_id;
					countlength = me.fixed_coa.length;
					me.generateVouchernoBank();

				},
			},

			'admincollectioncashierpencairanformdata [name=paymentcashier_kasbank] ': {
				'select': function (g, record, item, index, e, eOpts) {
					var me, rowdata, form;
					me = this;
					form = me.getPencairanformdata();
					//if() {

					item = form.down("[name=paymentcashier_kasbank]").getValue();
					//jika payment selain cash
					if (item != 'K') { // jika tida pilih cash, ya bank munculin, hide cash
						me.setStorePrefixBank();
						me.fieldHide(me, 'paymentcashier_prefix_id', true);
						me.fieldShow(me, 'paymentcashier_prefix_id_bank', true);
						me.fieldShow(me, 'paymentcashier_chequegiro_no', true);
						me.fieldShow(me, 'paymentcashier_chequegiro_date', true);
						form.down("[name=paymentcashier_prefix_id_bank]").setReadOnly(false);
						form.down("[name=paymentcashier_grouptrans_id]").setReadOnly(false);
						form.down("[name=voucher_no]").setValue('');
						form.down("[name=paymentcashier_prefix_id]").clearValue();
					} else { //jika klik bank /etc, bank hide. cash muncul
						me.setStorePrefix();
						me.fieldShow(me, 'paymentcashier_prefix_id', true);
						me.fieldHide(me, 'paymentcashier_prefix_id_bank', true);
						me.fieldHide(me, 'paymentcashier_chequegiro_no', true);
						me.fieldHide(me, 'paymentcashier_chequegiro_date', true);
						form.down("[name=paymentcashier_prefix_id]").setReadOnly(false);
						form.down("[name=paymentcashier_grouptrans_id]").setReadOnly(false);
						form.down("[name=paymentcashier_prefix_id_bank]").clearValue();
					}


				},
			},

			'admincollectioncashierpencairanformdata [name=paymentcashier_accept_date] ': {
				'change': function (that, newValue, oldValue, eOpts) {
					var form = me.getPencairanformdata();
					me.accept_date = me.formatDate(form.down('[name=paymentcashier_accept_date]').getValue());
					// me.setValue(me, 'kasbank_date', me.accept_date);
					me.generateTransno();
					form.down("[name=paymentcashier_prefix_id]").reset();
					form.down("[name=paymentcashier_prefix_id_bank]").reset();
				},
			}, //

			'admincollectioncashierformcoadetail [name=coa_id]': {
				select: function () {
					me.coaChange();
				}

			},
			'admincollectioncashierformcoadetail textfield[name=persen]': {
				blur: function (el, act) {
					me.hitungAmount();
				}
			},
			'admincollectioncashierformcoadetail button[action=save]': {
				click: function (el, act) {
					me.savedetail();
				}
			},

			//
			//== end tombol batal by ==
		});
	},

	dataSearch: function () {
		resetTimer();
		var me = this;
		var form = me.getFormsearch().getForm();
		var store = me.getGrid().getStore();
		var grid = me.getGrid();

		var fields = me.getFormsearch().getValues();

		for (var x in fields)
		{
			store.getProxy().setExtraParam(x, fields[x]);
		}
		store.loadPage(1);

		grid.down('#btnPencairan').setDisabled(true);
	},

	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

		grid.down('#btnPencairan').setDisabled(true);

		if (row[0]) {
			var pricetype = row[0].data.pricetype;
			if (pricetype == 'KPR' && row.length == 1) {
				grid.down('#btnPencairan').setDisabled(false);
			}
		}

		grid.down('#btnEdit').setDisabled(row.length != 1);
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
				case 'AdmincollectioncashierpencairanCreate':
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

		var formtitle = 'Pencairan KPR';
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
		globalparameterStore.load({params: {parametername: 'COLLECTION_IS_EDIT_NILAIPENCAIRAN'},
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
		globalparameterStore.load({params: {parametername: 'COLLECTION_IS_ADD_NEWSCHEMA'},
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
		var f = me.getPencairanformdata();

		//semy

//                         var pencairanGrid = me.getPencairangrid();
//        var pencairanStore = pencairanGrid.getStore();
//        pencairanStore.removeAll();
//         pencairanStore.loadData([],false);
//  

		// console.log(state);
		me.state = state;
		//show form add pencarian 
		me.detailTool = new Erems.library.DetailtoolAll();
		me.detailTool.setConfig({
			viewPanel: 'PencairanFormDataDetail',
			parentFDWindowId: me.getPencairanformdata().up('window').id,
			controllerName: me.controllerName
		});
		me.detailTool.parentGridAlias = 'admincollectioncashierpencairangrid';

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
		form.down("[name=paymentcashier_accept_date]").setValue(me.dateNow);
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
		el.loadRecord(record);



		// load purchase letter data
		el.body.mask('Loading Purchaseletter & Pencairan data, please wait ...');
		var purchaseletterdetailStore = me.getPurchaseletterdetailStore();
		purchaseletterdetailStore.removeAll();
		purchaseletterdetailStore.loadData([], false);
		purchaseletterdetailStore.load({params: {purchaseletter_id: record.data.purchaseletter_id, mode_read: 'detail'},
			callback: function (purchaselettedetailrec) {
				//console.log('UPDATE UNIT PURCHASE LETTER DATA...');
				//console.log(purchaselettedetailrec[0]);
				form.down('[name=purchaseletter_id]').setValue(purchaselettedetailrec[0].get('purchaseletter_id'));
				form.down('[name=unit_id]').setValue(purchaselettedetailrec[0].get('unit_id'));
				form.down('[name=cluster_code]').setValue(purchaselettedetailrec[0].get('cluster_code'));
				form.down('[name=block_code]').setValue(purchaselettedetailrec[0].get('block_code'));
				form.down('[name=pricetype_id]').setValue(purchaselettedetailrec[0].get('pricetype_id'));
				form.down('[name=customer_city_id]').setValue(purchaselettedetailrec[0].get('customer_city_id'));
				form.down('[name=bankkpr_id]').setValue(purchaselettedetailrec[0].get('bankkpr_id'));
				form.down('[name=pt_pt_id]').setValue(purchaselettedetailrec[0].get('unit_pt_id'));
				me.pt_id = purchaselettedetailrec[0].get('unit_pt_id');
				var harga_netto = purchaselettedetailrec[0].get('harga_jual');
				form.down('[name=harga_netto]').setValue(me.fmb(harga_netto));

				var harga_jual = purchaselettedetailrec[0].get('harga_jual');
				var total_payment = purchaselettedetailrec[0].get('total_payment');
				form.down('[name=total_payment]').setValue(me.fmb(total_payment));

				if (harga_jual && total_payment) {
					var payment_percentage = (total_payment / harga_jual) * 100;
					form.down('[name=payment_percentage]').setValue(me.fmb(payment_percentage));
				} else {
					form.down('[name=payment_percentage]').setValue('');
				}

				var akad_realisasiondate;
				akad_realisasiondate = purchaselettedetailrec[0].get('akad_realisasiondate');
				if (akad_realisasiondate) {
					akad_realisasiondate = akad_realisasiondate.replace(' 00:00:00.000', '');
					akad_realisasiondate = akad_realisasiondate.split("-");
					akad_realisasiondate = akad_realisasiondate[2] + '-' + akad_realisasiondate[1] + '-' + akad_realisasiondate[0];
					form.down('[name=akad_realisasiondate]').setValue(akad_realisasiondate);
				}

				var kpr_value_approve = purchaselettedetailrec[0].get('kpr_value_approve');
				form.down('[name=kpr_value_approve]').setValue(me.fmb(kpr_value_approve));

				var kpapprove_date;
				kpapprove_date = purchaselettedetailrec[0].get('kpapprove_date');
				if (kpapprove_date) {
					kpapprove_date = kpapprove_date.replace(' 00:00:00.000', '');
					kpapprove_date = kpapprove_date.split("-");
					kpapprove_date = kpapprove_date[2] + '-' + kpapprove_date[1] + '-' + kpapprove_date[0];
					form.down('[name=kpapprove_date]').setValue(kpapprove_date);
				}

				me.fillUnitDataToFormPencairan(purchaselettedetailrec[0]);
				me.fillMasterCustomerDataToFormPencairan(purchaselettedetailrec[0], 'customer');



				//load grid Pencairan KPR
				var pencairankprStore = me.getPencairankprcashierStore();
				pencairankprStore.removeAll();

				pencairankprStore.load({
					params: {
						purchaseletter_id: record.data.purchaseletter_id
					},
					callback: function (rec, op) {
						me.sumTotalCairDateSaved();

					}
				});


				//cashier disini // semy
				me.setStoreGroup();
				me.setStorePrefix();
				me.generateTransno();
				me.setStoreDepartment();
				var gridCoaDetail = me.getDetailcoagrid();
				gridCoaDetail.getStore().clearFilter(true);
				gridCoaDetail.doInit();
				gridCoaDetail.getStore().load({
					params: {
						template_id: 0
					},
					callback: function (rec, op) {
						gridCoaDetail.attachModel(op);
					}
				});

				//ended semy cashier

				el.body.unmask();
			}});
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
			'name', 'ktp', 'npwp', 'address', 'homephone', 'email', 'mobilephone'
		];
		//console.log('RECORDS CUSTOMER...');
		//console.log(records);

		for (var x in filledFields) {
			if (me.getPencairanformdata().down('[name=' + pr + '_' + filledFields[x] + ']') != null) {
				me.getPencairanformdata().down('[name=' + pr + '_' + filledFields[x] + ']').setValue(records.data[pr + '_' + filledFields[x]]);
			}

		}
	},
	gridPencairanSelectionChange: function () {
		var me = this;
		var grid = me.getPencairangrid(), row = grid.getSelectionModel().getSelection();

		grid.down('#btnEdit').setDisabled(row.length != 1);
		grid.down('#btnDelete').setDisabled(row.length != 1);
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

	},

	detailForm: {
		that: this,
		editingIndexRow: 0,
		fillPencairanAmount: function () {
			var me = this;
			var persen_pencairan = toFloat(me.getPencairanformdatadetail().down('[name=persen_pencairan]').getValue());
			var kpr_value_approve = toFloat(me.getPencairanformdata().down('[name=kpr_value_approve]').getValue());
			var pencairan_amount = (persen_pencairan * kpr_value_approve) / 100;
			me.getPencairanformdatadetail().down('[name=pencairan_amount]').setValue(me.fmb(pencairan_amount));
		},
		save: function () {
			var me = this;

			var form = me.getPencairanformdatadetail().getForm();
			var formVal = me.getPencairanformdatadetail().getForm().getValues();
			var pencairanAmount = formVal.pencairan_amount;

			var purchaseletterId = me.getPencairanformdata().down('[name=purchaseletter_id]').getValue();
			var totalRealisasi = toFloat(me.getPencairanformdata().down('[name=kpr_value_approve]').getValue());

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

					var val = {purchaseletter_id: purchaseletterId,
						payment_id: formVal.payment_id,
						escrow_date: formVal.escrow_date,
						pencairan_date: formVal.pencairan_date,
						persen_pencairan: formVal.persen_pencairan,
						pencairan_amount: toFloat(formVal.pencairan_amount),
						pengajuan_berkas_date: formVal.pengajuan_berkas_date,
						plafon_id: formVal.plafon_id,
						keterangan: keterangan,
						duedate_escrow: formVal.duedate_escrow};

					//console.log(val);

					if (win.state == 'create') {
						if (listPlafonId.indexOf(formVal.plafon_id) == -1) {
							dStore.add(val);
							me.sumTotalCairDate();

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
						me.sumTotalCairDate();
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
					case 'PencairankprcashierUpdate':
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
							duedate_escrow: record.get('duedate_escrow')
						});

						if (record.get('pencairan_date') && !record.isModified('pencairan_date') && record.get('purchaseletter_pencairankpr_id')) {
							me.getPencairanformdatadetail().down('[name=escrow_date]').setReadOnly(true);
							me.getPencairanformdatadetail().down('[name=pengajuan_berkas_date]').setReadOnly(true);
							me.getPencairanformdatadetail().down('[name=pencairan_date]').setReadOnly(true);
							me.getPencairanformdatadetail().down('[name=persen_pencairan]').setReadOnly(true);
							me.getPencairanformdatadetail().down('[name=pencairan_amount]').setReadOnly(true);
							me.getPencairanformdatadetail().down('[name=duedate_escrow]').setReadOnly(true);
						} else {
							me.getPencairanformdatadetail().down('[name=escrow_date]').setReadOnly(false);
							me.getPencairanformdatadetail().down('[name=pengajuan_berkas_date]').setReadOnly(false);
							me.getPencairanformdatadetail().down('[name=pencairan_date]').setReadOnly(false);
							me.getPencairanformdatadetail().down('[name=persen_pencairan]').setReadOnly(false);
							me.getPencairanformdatadetail().down('[name=pencairan_amount]').setReadOnly(false);
							me.getPencairanformdatadetail().down('[name=duedate_escrow]').setReadOnly(false);
						}
						//}
						break;
					case 'PencairankprcashierDelete':
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
								record.set("deleted", true);
								gr.getStore().filterBy(function (recod) {
									return recod.data.deleted == false;
								});
								me.sumTotalCairDate();
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
	dataSavePencairan: function () {
		//semy
		var me = this;
		var store = me.getPencairangrid().getStore();
		var g = me.getDetailcoagrid();
		var f = me.getPencairanformdata();
		var totalpayment = f.down("[name=total_payment_selected]").getValue();

		if (store.getCount() == 0)
		{
			Ext.Msg.show({
				title: 'Alert',
				msg: 'Detail Pencairan Records cannot be empty.',
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK,
			});
			return false;
		}
		if (totalpayment !== '0.00') {
			if (g.getStore().getCount() == 0)
			{
				Ext.Msg.show({
					title: 'Warning',
					msg: 'Detail jurnal is empty. Please generate coa template.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK,
				});
				return false;
			}

			if (!f.down("[name=paymentcashier_kasbank]").getValue()) {
				Ext.Msg.show({
					title: 'Warning',
					msg: 'Please select payment type Cash / Bank.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK,
				});
				return false;
			}
			if (f.down("[name=paymentcashier_kasbank]").getValue()) {
				if (f.down("[name=paymentcashier_kasbank]").getValue() == 'K') {
					if (!f.down("[name=paymentcashier_prefix_id]").getValue()) {
						Ext.Msg.show({
							title: 'Warning',
							msg: 'Please select prefix Cash.',
							icon: Ext.Msg.ERROR,
							buttons: Ext.Msg.OK,
						});
						return false;
					}
				} else {
					if (!f.down("[name=paymentcashier_prefix_id_bank]").getValue()) {
						Ext.Msg.show({
							title: 'Warning',
							msg: 'Please select prefix Bank.',
							icon: Ext.Msg.ERROR,
							buttons: Ext.Msg.OK,
						});
						return false;
					}
				}
			}
			if (!f.down("[name=paymentcashier_department_id]").getValue()) {
				Ext.Msg.show({
					title: 'Warning',
					msg: 'Please select Departement.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK,
				});
				return false;
			}
			if (!f.down("[name=paymentcashier_grouptrans_id]").getValue()) {
				Ext.Msg.show({
					title: 'Warning',
					msg: 'Please select Group Trans.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK,
				});
				return false;
			}
			if (!f.down("[name=voucher_no]").getValue()) {
				Ext.Msg.show({
					title: 'Warning',
					msg: 'Failed generate voucher. Please reselect prefix',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK,
				});
				return false;
			}
			if (f.down("[name=balance]").getValue() !== '0.00') {
				Ext.Msg.show({
					title: 'Warning',
					msg: 'Total payment not balance with detail jurnal.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK,
				});
				return false;
			}

			if (f.down("[name=paymentcashier_kasbank]").getValue() == 'K') {
				me.flaggeneratevoucherno = 1;
				me.generateVoucherno(1);
			} else {
				me.flaggeneratevoucherno = 1;
				me.generateVouchernoBank(1);
			}

		}
		//generateVoucherno


		var totalPencairanAmountGrid = toFloat(me.detailGrid.hitungRealisasi(me));
		var totalRealisasi = toFloat(me.getPencairanformdata().down('[name=kpr_value_approve]').getValue());

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
			//console.log(totalPencairanAmountGrid);
			//console.log(totalRealisasi);
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
			var fa = me.getPencairanformdata();
			me.getPencairanformdata().up('window').body.mask('Saving, please wait ...');
			var data = [];
			for (var i = 0; i < store.getCount(); i++)
			{
				store.each(function (record, idx) {
					if (i == idx) {
						if (record.data.keterangan) {
							record.data.keterangan = '';
						}
						data[i] = record.data;
					}
				});
			}

//                        is_out : me.is_out,
//                               prefix_voucher :  me.prefix_voucher,
//                               accept_date :     fa.down("[name=paymentcashier_accept_date]").getValue(),
//                               payment_type:     fa.down("[name=paymentcashier_kasbank]").getValue(),
//                               departement_id:   fa.down("[name=paymentcashier_department_id]").getValue(),
//                               prefix_id :       me.prefix, 
//                               groutrans_id :    fa.down("[name=paymentcashier_grouptrans_id]").getValue(),
//                               trans_no:         fa.down("[name=paymentcashier_transno]").getValue(),
//                               voucherprefix_id : fa.down("[name=paymentcashier_voucherprefix_id]").getValue(),
//                               thcoa_id : fa.down("[name=paymentcashier_thcoa_id]").getValue(),


			var mydata2 = {
				is_out: me.is_out,
				prefix_voucher: me.prefix_voucher,
				accept_date: fa.down("[name=paymentcashier_accept_date]").getValue(),
				payment_type: fa.down("[name=paymentcashier_kasbank]").getValue(),
				departement_id: fa.down("[name=paymentcashier_department_id]").getValue(),
				prefix_id: me.prefix_id,
				groutrans_id: fa.down("[name=paymentcashier_grouptrans_id]").getValue(),
				trans_no: fa.down("[name=paymentcashier_transno]").getValue(),
				voucherprefix_id: fa.down("[name=paymentcashier_voucherprefix_id]").getValue(),
				thcoa_id: fa.down("[name=paymentcashier_thcoa_id]").getValue(),
				project_id: apps.project,
				pt_id: me.pt_id,
				payment: fa.down("[name=total_payment_selected]").getValue(),
				voucher_no: fa.down("[name=voucher_no]").getValue(),
				notes: fa.down("[name=notes]").getValue()
			};

			//=== get detail =====
			var suratStore = me.getDetailcoagrid().getStore();
			suratStore.clearFilter(true);
			var data_surat = [];
			for (var i = 0; i < suratStore.getCount(); i++)
			{
				suratStore.each(function (record, idx) {
					if (i == idx) {
						data_surat[i] = record.data;
					}
				});
			}
			//=== end ====

			var myObj = {

				detailcoa: data_surat,
				detailcashier: mydata2


			};

			Ext.Ajax.request({
				url: 'erems/pencairankprcashier/create',
				// params:'data='+Ext.encode(data),
				//semyedit
				params: {
					data: Ext.encode(data),
					other: Ext.encode(myObj),

				},
				success: function (response) {
					me.getPencairanformdata().up('window').body.unmask();
					if (Ext.decode(response.responseText).success == true)
					{
						Ext.Msg.show({
							title: 'Success',
							msg: 'Data saved successfully.',
							icon: Ext.Msg.INFO,
							buttons: Ext.Msg.OK,
							fn: function () {
								me.getPencairanformdata().up('window').close();
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
			'name', 'ktp', 'npwp', 'address', 'homephone', 'email', 'mobilephone'
		];
		//console.log('RECORDS CUSTOMER...');
		//console.log(records);

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
		me.loadComboBoxStore(el);
		var state = el.up('window').state;

		//show form add pencarian 
		me.detailTool = new Erems.library.DetailtoolAll();
		me.detailTool.setConfig({
			viewPanel: 'BankFormDataDetail',
			parentFDWindowId: me.getFormdata().up('window').id,
			controllerName: me.controllerName
		});
		me.detailTool.parentGridAlias = 'admincollectioncashierbankgrid';

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
			purchaseletterdetailStore.load({params: {purchaseletter_id: record.data.purchaseletter_id, mode_read: 'detail'},
				callback: function (purchaselettedetailrec) {
					//console.log('UPDATE UNIT PURCHASE LETTER DATA...');
					//console.log(purchaselettedetailrec[0]);
					form.down('[name=purchaseletter_id]').setValue(purchaselettedetailrec[0].get('purchaseletter_id'));
					form.down('[name=unit_id]').setValue(purchaselettedetailrec[0].get('unit_id'));
					form.down('[name=cluster_code]').setValue(purchaselettedetailrec[0].get('cluster_code'));
					form.down('[name=block_code]').setValue(purchaselettedetailrec[0].get('block_code'));
					form.down('[name=citraclub_id]').setValue(purchaselettedetailrec[0].get('clubcitra_id'));
					form.down('[name=pricetype_id]').setValue(purchaselettedetailrec[0].get('pricetype_id'));
					form.down('[name=customer_city_id]').setValue(purchaselettedetailrec[0].get('customer_city_id'));
					form.down('[name=harga_jual]').setValue(me.fmb(purchaselettedetailrec[0].get('harga_jual')));
					form.down('[name=kpr_plan]').setValue(me.fmb(purchaselettedetailrec[0].get('kpr_plan')));

					var akad_realisasiondate;
					akad_realisasiondate = purchaselettedetailrec[0].get('akad_realisasiondate');
					if (akad_realisasiondate) {
						akad_realisasiondate = akad_realisasiondate.replace(' 00:00:00.000', '');
						akad_realisasiondate = akad_realisasiondate.split("-");
						akad_realisasiondate = akad_realisasiondate[2] + '-' + akad_realisasiondate[1] + '-' + akad_realisasiondate[0];
						form.down('[name=akad_realisasiondate]').setValue(akad_realisasiondate);
					}

					me.fillUnitDataToForm(purchaselettedetailrec[0]);
					me.fillMasterCustomerData(purchaselettedetailrec[0], 'customer');

					//load grid Bank KPR
					var bankkprStore = me.getBankkprStore();
					bankkprStore.removeAll();
					bankkprStore.load({params: {purchaseletter_id: record.data.purchaseletter_id}});


					me.countLoadProcess += 1;
					//me.checkAllDetailLoadingProcess();
					el.body.unmask();
				}});

			el.body.mask('Loading Purchaseletter & List Bank KPR data, please wait ...');
			var admincollectioncashierscheduleStore = me.getAdmincollectioncashierscheduleStore();
			admincollectioncashierscheduleStore.removeAll();
			admincollectioncashierscheduleStore.load({params: {purchaseletter_id: record.data.purchaseletter_id},
				callback: function (purchaselettedetailrec) {
					var totalAmount = 0;
					for (var i = 0; i < admincollectioncashierscheduleStore.getCount(); i++)
					{
						admincollectioncashierscheduleStore.each(function (record, idx) {
							if (i == idx) {
								if (record.data.scheduletype == 'KPR')
								{
									totalAmount += parseFloat(record.data.amount);
								}
							}
						});
					}
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
		me.detailTool2.parentGridAlias = 'admincollectioncashierbankgridakad';

		if (state == 'create') {
			me.getBankformdatadetail().down('[name=kpr_realisation]').setValue(me.fmb(me.BankKPRRealisationDefault));
			var bankkprakadStore = me.getBankkprakadStore();
			bankkprakadStore.removeAll();

			el.down('[name=temp_id_detail]').setValue(me.randomString(10));
		}
		me.tcb();
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
				for (var i = 0; i < bankkprakadStore.getCount(); i++)
				{
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
					temp_id_detail: formVal.temp_id_detail
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
					if (clickIdxRow.indexOf(editIdxRow) == -1) // if isn't already in the array
					{
						clickIdxRow.push(editIdxRow);
					}


				}

				win.close();
				//}
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
				var gr = me.getBankgrid();
				var row = gr.getStore().indexOf(gr.getSelectionModel().getSelection()[0]);
				var record = gr.getStore().getAt(row);

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
						break;
				}
			}
		}
	},
	dataSave: function () {
		var me = this;
		var store = me.getBankgrid().getStore();

		store.clearFilter(true);

		//me.getFormdata().up('window').body.mask('Saving, please wait ...');
		var data = [];
		var detail_akad = [];
		for (var i = 0; i < store.getCount(); i++)
		{
			store.each(function (record, idx) {
				if (i == idx) {
					data[i] = record.data;
					if (data[i].data_akad.length > 0) {
						for (var u = 0; u < data[i].data_akad.length; u++) {
							detail_akad.push(data[i].data_akad[u]);
						}
					}
				}
			});
		}
		//console.log(store);

		var recordIndex = store.findBy(
				function (record, id) {
					if (record.get('is_use') === true && record.get('akad_date') === null) {
						return true;  // a record with this data exists
					}
					return false;  // there is no record in the store with this data
				}
		);

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

		var fields = me.getFormdata().getValues();

		var myObj = {
			purchaseletter_id_form: fields.purchaseletter_id,
			notes_batal: fields.notes_batal,
			data_detail: data,
			detail_akad: detail_akad,
		}

		/*if(recordIndex != -1){
		 Ext.Msg.confirm('Confirm', 'Bank KPR yang digunakan belum memiliki tanggal akad, lanjutkan?', function(btn) {
		 if (btn == 'yes') {
		 me.getFormdata().up('window').body.mask('Saving, please wait ...');
		 
		 Ext.Ajax.request({
		 url:'erems/bankkpr/create',
		 //params:'data='+Ext.encode(data),
		 params:{
		 data: Ext.encode(myObj)
		 },
		 success:function(response){ 
		 me.getFormdata().up('window').body.unmask();
		 if(Ext.decode(response.responseText).success == true)
		 {						
		 Ext.Msg.show({
		 title: 'Success', 
		 msg: 'Data saved successfully.',
		 icon: Ext.Msg.INFO,
		 buttons: Ext.Msg.OK,
		 fn: function(){ 
		 me.getFormdata().up('window').close(); 
		 var gridDepan = me.getGrid();
		 var storeDepan = gridDepan.getStore();	
		 storeDepan.reload();
		 }
		 });			
		 }
		 else {
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
		 } else {*/
		me.getFormdata().up('window').body.mask('Saving, please wait ...');

		Ext.Ajax.request({
			url: 'erems/bankkpr/create',
			//params:'data='+Ext.encode(data),
			params: {
				data: Ext.encode(myObj)
			},
			success: function (response) {
				me.getFormdata().up('window').body.unmask();
				if (Ext.decode(response.responseText).success == true)
				{
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
		//}
	},
	//==== end bank kpr ======


	//======== generate schema for pencairan KPR ============
	setGenerateSchema: function () {
		var me = this;

		var pencairanForm = me.getPencairanformdata();
		var pencairanGrid = me.getPencairangrid();
		var pencairanStore = pencairanGrid.getStore();

		var purchaseletterId = pencairanForm.down('[name=purchaseletter_id]').getValue();
		var bankId = 0;
		var kprRealisation = 0;

		var bankkprStore = me.getBankkprStore();
		bankkprStore.removeAll();
		bankkprStore.load({params: {purchaseletter_id: purchaseletterId},
			callback: function (purchaselettedetailrec) {
				for (var i = 0; i < bankkprStore.getCount(); i++)
				{
					bankkprStore.each(function (record, idx) {
						if (i == idx) {
							if (record.data.is_use == true)
							{
								bankId = record.data.bank_id
								kprRealisation = parseFloat(record.data.kpr_realisation);
							}
						}
					});
				}
				if (bankId != 0) {
					var masterbankkprStore = me.getMasterbankkprStore();
					masterbankkprStore.removeAll();
					masterbankkprStore.load({params: {bank_id: bankId},
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
						}});
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
		that: this,
		editingIndexRow: 0,
		save: function () {
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

				win.close();
				//}
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
		view[5].set("deleted", true);
		gr.getStore().filterBy(function (recod) {
			return recod.data.deleted == false;
		});

		if (view[5].data.akadconfirmation_status_id == 1) { // OK
			me.getBankformdatadetail().down('[name=akadplan_date]').setValue();
			me.getBankformdatadetail().down('[name=akad_date]').setValue();
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
	//============== END AKAD CONFIRMATION ======================

	//==== save batal by =====
	dataSaveBatalBy: function (batal_by) {
		var me = this;
		var text = '';

		if (batal_by == 'Legal') {
			text = me.getFormdata().down('#btnBatalByLegal').getText();
		} else if (batal_by == 'Collection') {
			text = me.getFormdata().down('#btnBatalByCollection').getText();
		}

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
						notes_batal: notes_batal
					},
					success: function (response) {
						me.getFormdata().up('window').body.unmask();
						if (Ext.decode(response.responseText).success == true)
						{
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
		var winId = 'myReportWindow';
		me.instantWindowReport('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		var win = desktop.getWindow(winId);

		if (win) {
			var params = {};
			var reportFile = "Pencairankpr";

			params["purchaseletter_id"] = me.getPencairanformdata().down('[name=purchaseletter_id]').getValue();
			params["unit_id"] = me.getPencairanformdata().down('[name=unit_id]').getValue();
			params["image_url"] = window.location.protocol + "//" + window.location.host + '/webapps/Ciputra/public/app/erems/uploads/progress_unit/';

			var html = me.generateFakeForm(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},

	panelAfterRender: function (el) {
		var me = this;

		//Ext.Ajax.request({
//            url: 'erems/pencairankpr/print',
//            success: function(response) {
//				
//            },
//        });
		//   me.loadReport(el, 'erems/cashierreport/all');
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
	/* end report needed */

	//======== generate duedate from construction ===========
	setDueDateEscrow: function () {
		var me = this;

		var pencairanForm = me.getPencairanformdata();
		var pencairanGrid = me.getPencairangrid();
		var pencairanStore = pencairanGrid.getStore();

		var unitId = pencairanForm.down('[name=unit_id]').getValue();
		var purchaseletterId = pencairanForm.down('[name=purchaseletter_id]').getValue();

		var pencairankprduedateescrowStore = me.getPencairankprduedateescrowcashierStore();
		pencairankprduedateescrowStore.removeAll();
		pencairankprduedateescrowStore.load({params: {unit_id: unitId, purchaseletter_id: purchaseletterId},
			callback: function (rec) {
				for (var i = 0; i < rec[0].raw.length; i++)
				{
					pencairanStore.each(function (record, idx) {
						if (record.data.plafon_id == rec[0].raw[i].plafon_id) {
							var recd = pencairanStore.getAt(idx);
							recd.set("duedate_escrow", rec[0].raw[i].duedate_escrow);
						}
					});
				}
			}
		});
	},
	//======== end generate duedate from construction ========

	//======== generate duedate from construction ===========
	setProgressConst: function () {
		var me = this;

		var pencairanForm = me.getPencairanformdata();
		var pencairanGrid = me.getPencairangrid();
		var pencairanStore = pencairanGrid.getStore();

		var unitId = pencairanForm.down('[name=unit_id]').getValue();
		var purchaseletterId = pencairanForm.down('[name=purchaseletter_id]').getValue();

		var pencairankprduedateescrowStore = me.getPencairankprduedateescrowcashierStore();
		pencairankprduedateescrowStore.removeAll();
		pencairankprduedateescrowStore.load({params: {unit_id: unitId, purchaseletter_id: purchaseletterId, get_data_type: 'progress_status'},
			callback: function (rec) {
				var list_progress = [];

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
				kpr_realisation = 0;


		var store = me.getBankgrid().getStore();
		store.each(function (record, idx) {
			var recd = store.getAt(idx);
			if (record.data.is_use == 1) {
				kpr_acc_date = record.data.kpr_acc_date;
				kpr_realisation = record.data.kpr_realisation;
			}
		});

		if (!kpr_acc_date || !kpr_realisation) {
			Ext.Msg.show({
				title: 'Failure',
				msg: 'Bank yang dipilih tidak memiliki KPR ACC Date atau KPR Realisation Amount',
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK
			});
			return false;
		}

		var combo = Ext.create('Ext.form.field.ComboBox', {
			editable: false,
			queryMode: 'local',
			valueField: 'id',
			displayField: 'name',
			width: '100%',
			store: {
				fields: ['id', 'name'],
				data: [
					{id: 'printpdf', name: 'PDF'},
					{id: 'printvoucherpdf', name: 'Voucher PDF'},
					{id: 'printdos', name: 'Print DOS'}
				]
			}
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
				//console.log(data);
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

	valueToRaw: function (value) {
		return value.toString().replace(/[^0-9.]/g, '');
	},
	setReadonly: function (form, selector, value) {
		var me, form;
		me = this;
		form = me.getPencairanformdata();
		form.down("[name=" + selector + "]").setReadOnly(value);
	},
	fieldReadonly: function (controller, selector, value) {
		var me, form;
		me = this;
		form = me.getPencairanformdata();
		controller.getPencairanformdata().down("[name=" + selector + "]").setReadOnly(value);
	},
	fieldDisable: function (controller, selector, value) {
		controller.getPencairanformdata().down("[name=" + selector + "]").setDisabled(value);
	},
	Fdisable: function (form, selector, value) {
		form.down("[name=" + selector + "]").setDisabled(value);
	},
	Fdisablebyid: function (form, selector, value) {
		form.down("[id=" + selector + "]").setDisabled(value);
	},
	fieldShow: function (form, selector) {
		var me, form;
		me = this;
		form = me.getPencairanformdata();
		form.down("[name=" + selector + "]").setVisible(true);
	},
	fieldHide: function (form, selector) {
		var me, form;
		me = this;
		form = me.getPencairanformdata();
		form.down("[name=" + selector + "]").setVisible(false);
	},
	containHide: function (form, selector) {
		form.down(selector).setVisible(false);
	},
	containShow: function (form, selector) {
		form.down(selector).setVisible(true);
	},
	setLabel: function (controller, selector, text, value) {
		controller.getPencairanformdata().down("[name=" + selector + "]").setText(text, true);
	},
	btnDisable: function (controller, selector, value) {
		controller.getPencairanformdata().down("[action=" + selector + "]").setDisabled(value);
	},
	disableBtn: function (form, selector, value) {
		form.down("[action=" + selector + "]").setDisabled(value);
	},

	generateCoa: function (template, state, kasbank_id, paymentId) {
		var me = this;
		var f = me.getPencairanformdata();
		var g = me.getDetailcoagrid();
		var totalpayment = f.down("[name=total_payment_selected]").getValue();


		if (state == 'update') {



			f.setLoading("Loading jurnal");
			me.tools.ajax({
				params: {
					template_id: me.templateCoa,
					amount: totalpayment,
					kasbank_id: kasbank_id,
					payment_id: paymentId

				},
				success: function (data, model) {

					g.getStore().load({
						params: {
							template_id: me.templateCoa,
							amount: totalpayment,
							kasbank_id: kasbank_id
						},
						callback: function (rec, op) {
							f.setLoading(false);
							g.attachModel(op);
							me.setSumdetail();
						}



					});


				}
			}).read('generatetemplatecoa');

		} else {

			if (totalpayment !== '0.00') {
				f.setLoading("Loading jurnal ");
				me.tools.ajax({
					params: {
						template_id: template,

					},
					success: function (data, model) {
						f.setLoading(false);
						g.getStore().load({
							params: {
								template_id: template,
								amount: totalpayment,
								kasbank_id: me.kasbank_id
							},
							callback: function (records, operation, success) {
								me.setSumdetail();

							}


						});

						if (!data) {
							me.tools.alert.warning("Template Installment Payment masih kosong");
						}

					}
				}).read('generatetemplatecoa');
				// g.getView().refresh();

			} else {
				me.tools.alert.warning("Payment masih kosong.");
			}
		}
	},

	destroydetail: function () {
		var me = this;
		var fa = me.getPencairanformdata();
		var g = me.getDetailcoagrid();
		//g.getStore().removeAll();
		var records = g.getSelectionModel().getSelection();
		for (var i = records.length - 1; i >= 0; i--) {
			var row = g.getStore().indexOf(records[i]);
			var id = records[i]['data']["coa_config_detail_id"];

			if (id) {
				fa.deletedCoa.push(id);
			}

			g.getStore().removeAt(row);

			me.setSumdetail();
		}
	},

	formDataDetail: function (param) {
		var me = this;
		var fa = me.getPencairanformdata();
		var fd = me.getFormcoadetail();
		var totalpayment = fa.down("[name=total_payment_selected]").getValue();
		if (totalpayment !== '0.00') {
			var w = me.instantWindow('FormCoadetail', 500, 'Add detail Coa Account ', param, 'coadetailaccwininstpayment');
			var f = me.getFormcoadetail();
			// f.down('[name=amount_hidden]').setValue(totalpayment);
			//f.down('[name=amount]').setValue(totalpayment);
			//f.down('[name=persen]').setValue(100);
			me.tools.ajax({
				params: {
					// mode_read : 'init'
				},
				success: function (data, model) {

					me.tools.wesea(data.glcoa, f.down("[name=coa_id]")).comboBox(false);
					me.afterDataDetailInit(param, f);
					f.setLoading(false);
				}
			}).read('init');
		} else {
			me.tools.alert.warning("Payment masih kosong.");
		}
	},

	afterDataDetailInit: function (param, f) {
		var me = this;
		if (param == 'update') {
			var g = me.getDetailcoagrid();
			f.kosongGa = g.getSelectedRow(); //getSelectedRow untuk ambil row yang di klik user ,hanya 1
			f.loadRecord(g.getSelectedRecord()); //getSelectedRecord fungsi extjs
		}
	},

	savedetail: function () {
		var me = this;
		var form = me.getPencairanformdata();
		var f = me.getFormcoadetail();
		var value = f.getValues();
		value['amount'] = parseFloat(value['amount']);
		var g = me.getDetailcoagrid();
		var persen = value["persen"];
		function sums(numbers) {
			return numbers.reduce(function (a, b) {
				return a + b
			});
		}
		if (f.kosongGa > -1) {
			var rec = g.getStore().getAt(f.kosongGa);
			if (isNaN(parseFloat(persen))) {
				me.tools.alert.warning("Persen Harus angka.");
				return true;
			} else {
				rec.beginEdit();
				rec.set(value);
				rec.endEdit();
				var data = [];
				g.getStore().data.each(function (record) {
					var recordArray = +parseFloat(record.get("amount"));
					data.push(recordArray);
				});
				//var sum = data.reduce(function(pv, cv) { return pv + cv; }, 0);
				var total = sums(data).toFixed(2);
				var total = Ext.util.Format.number(total, '0,000.00');

			}
		} else {
			if (isNaN(parseFloat(persen))) {
				me.tools.alert.warning("Persen Harus angka.");
				return true;
			} else {

//             console.log(g.getStore().data[0]['amount']);
				g.getStore().add(value);
				var sum = 0;
				var data = [];
				g.getStore().data.each(function (record) {
					var recordArray = +parseFloat(record.get("amount"));
					data.push(recordArray);
				});

				//var sum = data.reduce(function(pv, cv) { return pv + cv; }, 0);
				var total = sums(data).toFixed(2);
				var total = Ext.util.Format.number(total, '0,000.00');



			}

		}
		me.setSumdetail();
		f.up('window').close();
	},

	setSumIntransaction: function (store) {
		var me, form, amountheader, sum, total;
		me = this;
		form = me.getPencairanformdata();
		if (me.is_out == '0') {
			amountheader = accounting.unformat(form.down('[name=total_payment_selected]').getValue());
		} else {
			amountheader = 0;
		}
		sum = 0;
		store.each(function (record, index) {
			if (record.get('type') == 'I') {
				sum += record.get('amount');
			}
		});
		total = parseFloat(amountheader) + parseFloat(sum);
		return total;
	},
	setSumOuttransaction: function (store) {
		var me, form, amountheader, sum, total, store;
		me = this;
		form = me.getPencairanformdata();

		if (me.is_out == '0') {
			amountheader = accounting.unformat(form.down('[name=total_payment_selected]').getValue());
		} else {
			amountheader = 0;
		}

		sum = 0;
		store.each(function (record, index) {

			if (record.get('type') == 'O') {
				sum += record.get('amount');
			}
		});
		total = parseFloat(amountheader) + parseFloat(sum);
		return total;
	},
	setTotaldetail: function (store) {
		var me, form, amountheader, sum_in, sum_out, total;
		me = this;
		sum_in = sum_out = 0;
		store.each(function (record, index) {
			// console.log(record.get('amount'));
			if (record.get('type') == 'I') {
				sum_in += record.get('amount');
			}
			if (record.get('type') == 'O') {
				sum_out += record.get('amount');
			}
		});

		if (me.is_out == '0') {
			total = parseFloat(sum_out) - parseFloat(sum_in);
		} else {
			total = parseFloat(sum_in) - parseFloat(sum_out);
		}

		return total;

	},

	setSumdetail: function () {
		var me, store, form, totalheader, totaldetail, balance, msgdata, status, voucher_no, stateform = '';
		me = this;
		form = me.getPencairanformdata();
		store = me.getDetailcoagrid().getStore();
		//store.clearFilter(true);
		stateform = form.up('window').state.toLowerCase();
		totalheader = accounting.unformat(form.down('[name=total_payment_selected]').getValue());



		total_in = me.setSumIntransaction(store);
		total_out = me.setSumOuttransaction(store);



		totaldetail = me.setTotaldetail(store);


//        if (totaldetail < 1 && stateform == 'update') {
//            totaldetail = me.paramcoadetail.totaldetail;
//        }

		// voucher_no = (form.down('[name=voucher_no]').getValue() == 'undefined') ? 'test' : form.down('[name=voucher_no]').getValue();
		balance = totalheader - totaldetail;
//        if(me.is_out == '0') {
//             balance = (parseFloat(total_in)-parseFloat(total_out)); 
//        }
//        else {
//           balance = (parseFloat(total_out)-parseFloat(total_in));
//        }


		me.setValue(me, 'totaldetail', accounting.formatMoney(totaldetail));
		me.setValue(me, 'totalheader', accounting.formatMoney(totalheader));
		me.setValue(me, 'balance', accounting.formatMoney(balance));



		me.formatCurrencyFormdata(me, form);
	},

	unformatCurrencyFormdata: function (controller, form) {
		var me, form, itemform, xtypeform, widget, itemname, oldvalue, newvalue;
		me = controller;
		itemform = form.getForm().getFields().items;
		for (var index in itemform) {
			xtypeform = form.getForm().getFields().items[index].xtype;
			if (xtypeform == 'xmoneyfield') {
				itemname = form.getForm().getFields().items[index].name;
				oldvalue = form.down("[name=" + itemname + "]").getValue();
				newvalue = accounting.unformat(oldvalue);
				form.down("[name=" + itemname + "]").setValue(newvalue);
			}
		}
	},
	formatCurrencyFormdata: function (controller, form) {
		var me, form, itemform, xtypeform, widget, itemname, oldvalue, newvalue, paramform;
		me = controller;
		itemform = form.getForm().getFields().items;
		for (var index in itemform) {
			xtypeform = form.getForm().getFields().items[index].xtype;
			if (xtypeform == 'xmoneyfield') {
				itemname = form.getForm().getFields().items[index].name;
				oldvalue = form.down("[name=" + itemname + "]").getValue();
				newvalue = accounting.formatMoney(oldvalue);
				form.down("[name=" + itemname + "]").setValue(newvalue);
			}
		}
	},
	setLower: function (controller, selector) {
		var value = this.getValue(controller, selector, 'value');
		this.setValue(controller, selector, value.toLowerCase());
	},
	setValue: function (controller, selector, value) {
		controller.getPencairanformdata().down("[name=" + selector + "]").setValue(value);
	},
	sumTotalCairDate: function () {
		var sum_date;
		var me = this;
		var f = me.getPencairanformdata();
		var pencairanGrid = me.getPencairangrid();
		var pencairanStore = pencairanGrid.getStore();
		sum_date = 0;
		var total_sum_date = 0;
		var note = [];
		pencairanStore.each(function (record, index) {
			sumTotalCairDate:   if (record.get('pencairan_date')) {
				sum_date += parseFloat(record.get('pencairan_amount'));
				var notess = record.get("keterangan");
				note.push(notess);
			}
		});

		var result = $(note).not(me.plafon);
		var finalArray = result.get();


		total_sum_date = sum_date - me.total_temp;
		var unit = f.down("[name=unit_unit_number]").getValue();
		f.down("[name=notes]").setValue(unit.trim() + ' - Pencairan KPR  - ' + finalArray + ', Rp.' + accounting.formatMoney(total_sum_date));
		f.down("[name=total_payment_selected]").setValue(accounting.formatMoney(total_sum_date));
	},
	sumTotalCairDateSaved: function () {
		var sum_date;
		var me = this;
		me.total_temp = 0;
		var f = me.getPencairanformdata();
		var pencairanGrid = me.getPencairangrid();
		var pencairanStore = pencairanGrid.getStore();
		sum_date = 0;
		me.plafon = [];
		pencairanStore.each(function (record, index) {

			sumTotalCairDate:   if (record.get('pencairan_date')) {
				sum_date += parseFloat(record.get('pencairan_amount'));
				var pla = record.get('keterangan');
				me.plafon.push(pla);

			}
		});

		me.total_temp = sum_date;
	},

	setStoreDepartment: function () {
		var me, store, form;
		me = this;
		form = me.getPencairanformdata();
		store = me.getStore("Deptprefixcombo");
		store.load({
			params: {
				"hideparam": 'getdepartmentprefix',
				"mode_read": 'getdepartmentprefix',
				"project_id": apps.project,
				"pt_id": me.pt_id,
				"start": 0,
				"limit": 1000,
			},
			callback: function (records, operation, success) {

			}
		});
	},
	getVal: function (form, selector, type) {
		var result;
		if (type == 'value') {
			result = form.down("[name=" + selector + "]").getValue();
		} else if (type == 'raw') {
			result = form.down("[name=" + selector + "]").getRawValue();
		}
		return  result;
	},
	formatDate: function (param) {
		param = new Date(param);
		var monthval = [
			"01", "02", "03",
			"04", "05", "06", "07",
			"08", "09", "10",
			"11", "12"
		];

		var date = param.getFullYear() + "-" + monthval[param.getMonth()] + "-" + param.getDate();
		return date;
	},
	generateTransno: function () {
		var me, form, accept_date;
		me = this;
		form = me.getPencairanformdata();
		accept_date = me.formatDate(me.getVal(form, 'paymentcashier_accept_date', 'value'));
		switch (me.state) {
			case 'update':
				me.senddata = {
					"hideparam": 'gettransnocash',
					"mode_read": 'gettransnocash',
					"project_id": apps.project,
					"pt_id": me.pt_id,
					"accept_date": accept_date,
				}
				me.urlrequest = me.urlcommon;
				me.AjaxRequest();
				break;
		}
	},
	AjaxRequest: function () {
		var me;
		me = this;
		Ext.Ajax.request({
			url: me.urlrequest,
			method: 'POST',
			timeout: 45000000,
			params: {
				data: Ext.encode(me.senddata)
			},
			success: function (response) {
				me.info = Ext.JSON.decode(response.responseText);
				me.setSuccessEvent();
			},
			failure: function (response) {
				me.getPencairanformdata().up('window').close();
			}
		});
	},
	setSuccessEvent: function () {
		var me, data, form, tmp_prefix, countlength, flag_tmp, idheader, value;
		me = this;
		data = me.info.data;
		form = me.getPencairanformdata();
		//console.log(me.info.parameter);
		switch (me.info.parameter) {
			case 'gettransnocash':
				form.down("[name=paymentcashier_transno]").setValue(me.info.total);
				break;
			case 'generatevouchernocashv2':
				//form.down("[id=voucher_no_c]").setValue(data);
				form.down("[name=voucher_no]").setValue(data);
				break;
			case 'generatevouchernobank':
				//form.down("[id=voucher_no_c]").setValue(data);
				form.down("[name=voucher_no]").setValue(data);
				break;
			case 'getptbyuser':
				form.down("[name=pt_pt_id]").setValue(data[0]['pt_id']);
				break;
		}
	},
	generateVoucherno: function (flag) {
		var me, form, accept_date;
		me = this;
		form = me.getPencairanformdata();
		if (flag) {
			var flagg = 1;
		} else {
			var flagg = me.flaggeneratevoucherno;
		}
		accept_date = me.formatDate(me.getVal(form, 'paymentcashier_accept_date', 'value'));
		switch (me.state) {
			case 'update':
				me.senddata = {
					"hideparam": 'generatevouchernocashv2',
					"param_date": accept_date,
					"project_id": apps.project,
					"pt_id": me.pt_id,
					"module": 'KAS',
					"prefix": me.prefix,
					"flag": flagg,

				}
				me.urlrequest = me.urlcommon;
				me.AjaxRequest();
				break;
		}
	},
	generateVouchernoBank: function (flag) {
		var me, form, accept_date;
		me = this;
		if (flag) {
			var flagg = 1;
		} else {
			var flagg = me.flaggeneratevoucherno;
		}

		form = me.getPencairanformdata();
		accept_date = me.formatDate(me.getVal(form, 'paymentcashier_accept_date', 'value'));
		switch (me.state) {
			case 'update':
				me.senddata = {
					"hideparam": 'generatevouchernobank',
					"mode_read": 'generatevouchernobank',
					"param_date": accept_date,
					"project_id": apps.project,
					"pt_id": me.pt_id,
					"module": 'BANK',
					"prefix": me.prefix,
					"flag": flagg,

				}
				me.urlrequest = me.urlcommon;
				me.AjaxRequest();
				break;
		}
	},
	setStorePrefix: function (kasbank) {
		var me, store, form, in_out;
		me = this;
		form = me.getPencairanformdata();

		store = me.getStore("Voucherprefixsetupcombo");
		store.load({
			params: {
				"hideparam": 'getvoucherprefixsetupv2',
				"mode_read": 'getvoucherprefixsetupv2',
				"project_id": apps.project,
				"pt_id": me.pt_id,
				"start": 0,
				"limit": 1000,
			},
			callback: function (records, operation, success) {
				store.clearFilter(true);
				if (kasbank) {

					// me.tools.wesea(records, form.down("[name=paymentmethod_paymentmethod_id]")).comboBox();
//               var prefixselected = me.tools.comboHelper(form.down("[name=paymentcashier_prefix_id]")).getField('prefix_id','coa');
//               form.down("[name=paymentcashier_prefix_id]").setValue(prefixselected);
				}
				//form.down('[name=paymentcashier_prefix_id]').setValue();
			}
		});
	},
	setStorePrefixBank: function (bank) {
		var me, store, form, in_out;
		me = this;
		form = me.getPencairanformdata();

		store = me.getStore("Voucherprefixsetupcombo");
		store.load({
			params: {
				"hideparam": 'getvoucherprefixsetupv2bank',
				"mode_read": 'getvoucherprefixsetupv2bank',
				"project_id": apps.project,
				"pt_id": me.pt_id,
				"start": 0,
				"limit": 1000,
			},
			callback: function (records, operation, success) {

				store.clearFilter(true);
				if (bank) {

					var prefixselecteds = me.tools.comboHelper(form.down("[name=paymentcashier_prefix_id_bank]")).getField('prefix_id', 'coa');
					form.down("[name=paymentcashier_prefix_id_bank]").setValue(prefixselecteds);

				}

			}
		});



	},

	setStoreGroup: function () {
		var me, store, form;
		me = this;
		store = me.getStore("Grouptransaction");
		store.load({
			params: {
				"hideparam": 'default',
				"mode_read": 'grouptransaction',
				"project_id": apps.project,
				"pt_id": me.pt_id,
				"start": 0,
				"limit": 1000,
			},
			callback: function (records, operation, success) {

			}
		});
	},
	coaChange: function () {
		var me = this;
		var f = me.getFormcoadetail();
		var selected = me.tools.comboHelper(f.down("[name=coa_id]")).getField('coa_id', 'coa');
		var selectedName = me.tools.comboHelper(f.down("[name=coa_id]")).getField('coa_id', 'name');
		var selectedType = me.tools.comboHelper(f.down("[name=coa_id]")).getField('coa_id', 'type');
		f.down("[name=coa_name]").setValue(selectedName);
		f.down("[name=code]").setValue(selected);
		//f.down("[name=type]").setValue(selectedType);
	},

	hitungAmount: function () {
		var me = this;
		var fa = me.getPencairanformdata();
		var fd = me.getFormcoadetail();
		var totalpayment = fa.down("[name=total_payment_selected]").getValue();
		var persen = fd.down("[name=persen]").getValue();
		var tofix = parseFloat(totalpayment.replace(/,/g, "")).toFixed(2);
		var hasil = persen / 100 * tofix;
		var amount = fd.down("[name=amount]").setValue(hasil.toFixed(2));
	},
});