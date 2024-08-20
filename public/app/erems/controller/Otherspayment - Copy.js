Ext.define('Erems.controller.Otherspayment', {
	extend: 'Erems.library.template.controller.Controller2',
	alias: 'controller.Otherspayment',
	requires: ['Erems.library.Unitformula',
		'Erems.library.form.Paymentformfunc',
		'Erems.library.Browse',
		'Erems.library.box.Config',
		'Erems.library.box.tools.Tools',
		'Erems.template.ComboBoxFields',
		'Erems.library.box.tools.EventSelector',
		'Erems.library.ModuleTools',
		'Erems.library.XyReport'],
	views: ['otherspayment.Panel', 'otherspayment.Grid', 'otherspayment.FormSearch', 'otherspayment.FormData', 'otherspayment.PaymentDetailGrid', 'masterreport.Panel'],
	comboBoxIdEl: [],
	controllerName: 'otherspayment',
	fieldName: 'payment_id',
	fillForm: null,
	formWidth: 800,
	refs: [
		{
			ref: 'grid',
			selector: 'otherspaymentgrid'
		},
		{
			ref: 'formsearch',
			selector: 'otherspaymentformsearch'
		},
		{
			ref: 'formdata',
			selector: 'otherspaymentformdata'
		},
		{
			ref: 'formdetail',
			selector: 'otherspaymentformdatadetail'
		},
		{
			ref: 'griddetail',
			selector: 'otherspaymentpaymentdetailgrid'
		},
		{
			ref: 'panel',
			selector: 'otherspaymentpanel'
		},
		{
			ref: 'gridschedule',
			selector: 'otherspaymentschedulegrid'
		},
			/* add by hadi 21/07/2020*/
		{
			ref: 'gridscheduleLegalitas',
			selector: 'otherspaymentschedulelegalitasgrid'
		},
			/* add by hadi 21/07/2020*/
		{
			ref: 'formdos',
			selector: 'otherspaymentdospreviewformdata'
		},
		{
			ref: 'formprintout',
			selector: 'otherspaymentformprintout'
		}
	],
	//unitFormula: null,
	//storeProcess: 'Otherspaymentdatadetail',
	bindPrefixName: 'Otherspayment',
	browseHandler: null,
	localStore: {
		selectedUnit: null,
		customer: null,
		price: null,
		detail: null
	},
	tools: null,
	myConfig: null,
	cbf: null,
	mt: null,
	paymentTypeList: null,
	xyReport: null,
	printOutData: null,
	globalParams: null,
	myParams: null,
	selectedPurchaseletter: null,
	printpdfOptions: [],
	printdosOptions: [],
	templateStimulsoft: null,
	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		me.cbf = new Erems.template.ComboBoxFields();
	},
	init: function () {
		var me = this;

		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});

		this.control({
			'otherspaymentpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'otherspaymentformdatadetail': {
				afterrender: this.detailPanelAfterRender
			},
			'otherspaymentgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'otherspaymentformsearch': {
				afterrender: this.formSearchAfterRender

			},
			'otherspaymentgrid toolbar button[action=create]': {
				click: function () {
					//this.formDataShow('create');
				}
			},
			'otherspaymentgrid toolbar button[action=update]': {
				click: function () {
					// this.formDataShow('update');
				}
			},
			'otherspaymentgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'otherspaymentgrid toolbar button[action=print]': {
				click: this.mainPrint
			},
			'otherspaymentgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'otherspaymentformsearch button[action=search]': {
				click: this.dataSearch
			},
			'otherspaymentformsearch button[action=reset]': {
				click: this.dataReset
			},
			'otherspaymentformdata': {
				afterrender: this.formDataAfterRender
			},
			'otherspaymentformdata button[action=save]': {
				click: this.mainDataSave
			},
			'otherspaymentformdata textfield[name=admin_fee]': {
				keyup: function () {
					me.hitungTotalPayment();
				}
			},
			'otherspaymentformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'otherspaymentformdata [name=paymentmethod_paymentmethod_id]': {
				select: function () {
					me.generateNote();
				}
			},
			'otherspaymentformdata [name=payment_date]': {
				select: function () {
					me.generateNote();
				}
			},
			'otherspaymentformdatadetail button[action=save]': {
				click: this.detailDataSave
			},
			'otherspaymentformdatadetail combobox[name=paymenttype_paymenttype_id]': {
				select: function () {
					me.paymentTypeOnSelect();
				}
			},
			'otherspaymentformdata button[action=browse_unit]': {
				click: me.selectUnitGridShow
			},
			'otherspaymentunitgrid button[action=select]': {
				click: this.unitSelect
			},
			'otherspaymentpaymentdetailgrid button[action=addNewDetail]': {
				click: function () {
					me.addNewDetail("create");
				}

			},
			'otherspaymentpaymentdetailgrid actioncolumn': {
				click: this.insActionColumnClick
			},
			'otherspaymentgrid button[action=printx]': {
				click: this.showPdf
			},
			'otherspaymentformdata textfield[name=reference_no]': {
				keyup: function () {
					me.receiptNoOnKeyUp();
				}
			},
			'otherspaymentschedulegrid button[action=bayar]': {
				click: function () {
					me.bayarDendaOnClick();
				}
			},
			'otherspaymentgrid button[action=printvoucher]': {
				click: this.showVoucherPdf
			},
			'otherspaymentformdata textfield[name=receipt_no]': {
				keyup: function () {
					me.receiptNo2OnKeyUp();
				}
			},
			'otherspaymentformsearch [name=cluster_id]': {
				select: function () {
					me.searchClusterOnSelect();
				}
			},
			'otherspaymentgrid button[action=printdos]': {
				click: this.showPrintDosPreview
			},
			'otherspaymentdospreviewformdata button[action=print]': {
				click: this.printDos
			},
			'otherspaymentformprintout button[action=print]': {
				click: this.othPayPrintPdfByTpl
			},
			//Rizal 6 Mei 2019
			'otherspaymentgrid toolbar button[action=printbuktipenerimaan]': {
				click: function () {
					me.processReportBuktiPenerimaan();
				}
			},
			// Add by RH 30/10/2019
			'otherspaymentgrid toolbar button[action=printtemplate]': {
				click: function () {
					me.processPrintTemplate();
				}
			},
			//
			/* add by hadi 21/07/2020*/
			'otherspaymentschedulelegalitasgrid button[action=bayar]': {
				click: function () {
					me.bayarLegalitasOnClick();
				}
			}
			/* add by hadi 21/07/2020*/
		});

	},
	othPayPrintPdfByTpl: function () {
		var me = this;
		var option = me.getFormprintout().down("[name=template_name]").getValue();
		me.getFormprintout().up("window").close();
		var mode = me.getFormprintout().down("[name=mode]").getValue();

		if (mode === "pdf") {
			me.othpayFinalShowPdf({
				option: option
			});
		} else {
			me.otpayShowPrintDosPreview({option: option});
		}


	},
	printDos: function () {
		var me = this;
		var f = me.getFormdos();
		var url = f.down("[name=url]").getValue();

		if (url) {

			window.open(url);

		}

	},
	showPrintDosPreview: function () {
		var me = this;


		var recs = me.getGrid().getSelectionModel().getSelection();

		if (recs.length == 0) {
			return;
		}


		if (me.printdosOptions.length > 0) {
			var w = me.instantWindow('FormPrintout', 400, 'Select template', 'print', 'inspayDosPrintSeletWindow');

			var el = me.getFormprintout().down("[name=template_name]");
			me.getFormprintout().down("[name=mode]").setValue("dos");
			for (var i in me.printdosOptions) {
				el.add({
					xtype: 'radiofield',
					boxLabel: me.printdosOptions[i].text,
					name: 'template',
					inputValue: me.printdosOptions[i].value,
					checked: me.printdosOptions[i].selected
				});
			}

		} else {

			me.otpayShowPrintDosPreview({option: 0});
		}







	},
	otpayShowPrintDosPreview: function (params) {
		var me = this;
		var ids = "";

		var recs = me.getGrid().getSelectionModel().getSelection();

		if (recs.length == 0) {
			return;
		}

		for (var i in recs) {
			ids += recs[i].get("payment_id") + "~";
		}


		var w = me.instantWindow('DosPreviewFormData', 700, 'Print Preview', 'print', 'myDowPreviewWindow');
		var text = 'Hello test';
		var f = me.getFormdos();
		f.setLoading("Please wait...");
		me.tools.ajax({
			params: {
				payment_id: ids,
				option: params.option
			},
			success: function (data, model) {

				f.setLoading(false);
				//console.log(f.down("#textDosPreviewID"));
				//f.down("#textDosPreviewID").html = text;
				var text = data['others'][0][0]['PREVIEW'];
				f.down("[name=url]").setValue(data['others'][0][0]['URL']);
				f.down("#textDosPreviewID").update(text);


			}
		}).read('printdos');
	},
	searchClusterOnSelect: function () {
		var me = this;
		var f = me.getFormsearch();
		var clusterId = me.tools.intval(f.down("[name=cluster_id]").getValue());
		f.down("[name=block_id]").getStore().filterBy(function (rec, id) {
			return true;

		});
		f.down("[name=block_id]").setValue("");


		if (clusterId != 999) {
			f.down("[name=block_id]").getStore().filterBy(function (rec, id) {


				if (rec.raw.cluster_cluster_id === clusterId) {
					return true;
				} else {
					return false;
				}

			});
		}

	},
	showVoucherPdf: function () {
		var me = this;
		var p = me.getPanel();
		var recs = me.getGrid().getSelectionModel().getSelection();
		if (recs.length == 0) {
			return;
		}

		p.setLoading("Please wait..");

		var ids = "";

		for (var i in recs) {
			ids += recs[i].get("payment_id") + "~";
		}

		me.tools.ajax({
			params: {
				payment_id: ids
			},
			success: function (data, model) {
				p.setLoading(false);
				var url = data['others'][0][0]['URL'];
				//   var display = data['others'][0][0]['DISPLAY'];
				if (url) {
					window.open(url);

				}
			}
		}).read('printvoucherpdf');

	},
	bayarDendaOnClick: function () {
		var me = this;
		var fd = me.getFormdetail();
		var gs = me.getGridschedule();
		var rec = gs.getSelectedRecord();
		if (rec) {
			fd.down("[name=payment]").setValue(accounting.format(rec.get("remaining_denda")));
			fd.down("[name=payment]").setReadOnly(false);
			fd.down("[name=schedule_id]").setValue(rec.get("schedule_id"));
			gs.up("window").close();
		}
	},
	paymentTypeOnSelect: function () {

		var me = this;
		var f = me.getFormdetail();
		var val = f.down("[name=paymenttype_paymenttype_id]").getValue();
		var s = f.down("[name=paymenttype_paymenttype_id]").getStore();
		var isDenda = false;
		var isBiayaLegalitas = false;
		f.down("[name=payment]").setReadOnly(false);
		s.each(function (rec) {

			if (rec != null) {
				if (rec.get("paymenttype_id") === val && rec.get("paymenttype") === "DENDA") {
					isDenda = true;
				}
				if (rec.get("paymenttype_id") === val && rec.get("paymenttype") === "BIAYA LEGALITAS") {
					isBiayaLegalitas = true
				}
			}

		});
		/// jika pembayaran denda
		if (isDenda) {
			me.instantWindow('Schedulegrid', 700, 'Denda', s, 'myDendaWindow');
			var gs = me.getGridschedule();
			gs.getSelectionModel().setSelectionMode('SINGLE');
			gs.doInit();

			gs.getStore().getProxy().setExtraParam('purchaseletter_id', me.getFormdata().down("[name=purchaseletter_id]").getValue());
			/* 
			 gs.doLoad({},function(){
			 
			 });
			 */

			gs.getStore().load({
				params: {},
				callback: function (rec, op) {
					gs.attachModel(op);
				}
			});
			f.down("[name=payment]").setReadOnly(true);
		}
		/// jika pembayaran biaya legalitas
		if (isBiayaLegalitas) {
			me.instantWindow('Schedulelegalitasgrid', 700, 'Biaya Legalitas', s, 'myDendaWindow');
			var gs = me.getGridscheduleLegalitas();
			gs.getSelectionModel().setSelectionMode('SINGLE');
			gs.doInit();
			gs.getStore().getProxy().setExtraParam('purchaseletter_id', me.getFormdata().down("[name=purchaseletter_id]").getValue());
			gs.getStore().load({
				params: {},
				callback: function (rec, op) {
					gs.attachModel(op);
				}
			});
			f.down("[name=payment]").setReadOnly(true);
		}
	},
	receiptNoOnKeyUp: function () {
		var me = this;
		var f = me.getFormdata();
		f.down("[name=payment_no]").setValue(f.down("[name=reference_no]").getValue());
	},
	receiptNo2OnKeyUp: function () {
		var me = this;
		var f = me.getFormdata();
		f.down("[name=payment_no]").setValue(f.down("[name=receipt_no]").getValue());
	},
	generateNote: function () {
		var me = this;

		var stText = '';
		/// get list schedule type yang dibayar
		var s = me.getGriddetail().getStore();
		for (var i = 0; i < s.getCount(); i++) {
			var rec = s.getAt(i);
			if (rec) {
				stText += rec.get("paymenttype_paymenttype") + ", ";
			}

		}

		var f = me.getFormdata();


		var str = ' ' + stText + ' ';
		// var str = '';
		str += ' ' + f.down("[name=type_name]").getValue();
		str += ' ' + me.tools.comboHelper(f.down("[name=paymentmethod_paymentmethod_id]")).getText(me.cbf.paymentmethod) + ' . ';

		str += ' ' + me.getDateString(f.down("[name=payment_date]").getValue()) + ' ';
		str += ' Rp. ' + accounting.formatMoney(f.down("[name=payment]").getValue()) + ',- ';
		str += ' ' + f.down("[name=cluster_cluster]").getValue();
		str += ' ' + f.down("[name=unit_unit_number]").getValue();
		// str += ' ' + me.myParams['ptname'];
		str += ' ' + me.selectedPurchaseletter.pt_name;


		f.down("[name=note]").setValue(str);

	},
	getDateString: function (date) {
		var d = new Date(date);
		var str = '';
		str += d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
		return str;
	},
	showPdf: function () {
		var me = this;





		if (me.printpdfOptions.length > 0) {
			var w = me.instantWindow('FormPrintout', 400, 'Select template', 'print', 'othpayPrintSeletWindow');

			var el = me.getFormprintout().down("[name=template_name]");

			for (var i in me.printpdfOptions) {
				el.add({
					xtype: 'radiofield',
					boxLabel: me.printpdfOptions[i].text,
					name: 'template',
					inputValue: me.printpdfOptions[i].value,
					checked: me.printpdfOptions[i].selected
				});
			}

		} else {

			me.othpayFinalShowPdf();
		}

		return;



	},
	othpayFinalShowPdf: function (printParams) {
		var me = this;
		var p = me.getPanel();



		var recs = me.getGrid().getSelectionModel().getSelection();


		if (recs.length == 0) {
			return;
		}



		p.setLoading("Please wait..");

		var ids = "";

		for (var i in recs) {
			ids += recs[i].get("payment_id") + "~";
		}


		var option = 0;

		if (typeof printParams !== 'undefined') {
			option = printParams["option"];
		}




		me.tools.ajax({
			params: {
				payment_id: ids,
				option: option
			},
			success: function (data, model) {




				p.setLoading(false);
				var url = data['others'][0][0]['URL'];
				//   var display = data['others'][0][0]['DISPLAY'];
				if (url) {

					var win = window.open(url, '_blank');
					win.focus();


				}


			}
		}).read('printpdf');
	},
	/*
	 showPdf: function() {
	 var me = this;
	 var p = me.getPanel();
	 
	 
	 
	 var recs = me.getGrid().getSelectionModel().getSelection();
	 
	 
	 
	 if (recs.length == 0) {
	 return;
	 }
	 
	 p.setLoading("Please wait..");
	 
	 var ids = "";
	 
	 for (var i in recs) {
	 ids += recs[i].get("payment_id") + "~";
	 }
	 
	 
	 
	 
	 me.tools.ajax({
	 params: {
	 payment_id: ids
	 },
	 success: function(data, model) {
	 
	 
	 
	 
	 p.setLoading(false);
	 var url = data['others'][0][0]['URL'];
	 //   var display = data['others'][0][0]['DISPLAY'];
	 if (url) {
	 
	 var win = window.open(url, '_blank');
	 win.focus();
	 
	 
	 }
	 
	 
	 }
	 }).read('printpdf');
	 
	 },
	 */
	/*@implement this method for xyReport Class*/
	xyReportProcessParams: function (reportData) {
		var me = this;
		//var groupBy = reportData.params["Groupby"];
		var fn = "Payment";
		var plId = 0;
		/// added
		var g = me.getGrid();
		var rec = g.getSelectedRecord();


		// end added
		// reportData.params['con_string'] = "server=NB-MIS06\SQLEXPRESS;database=erems;user=sa;password=password12345";
		reportData['file'] = fn;
		reportData.params = me.printOutData;
		return reportData;
	},
	mainPrint: function () {
		var me = this;
		if (!me.xyReport) {
			me.xyReport = new Erems.library.XyReport();
			me.xyReport.init(me);
		}

		//// 
		var rec = me.getGrid().getSelectedRecord();
		if (rec) {
			var p = me.getPanel();
			p.setLoading("Please wait...");
			me.tools.ajax({
				params: {
					payment_id: rec.get("payment_id")
				},
				success: function (data, model) {
					p.setLoading(false);

					me.printOutData = data['others'][0][0]['DATA']
					me.xyReport.processReport();

				}
			}).read('printout');

		}

	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);
		var me = this;
		var p = me.getPanel();
		//  p.setLoading("Please wait");
        Ext.Ajax.timeout = 60000*30;
		me.tools.ajax({
			params: {},
			success: function (data, model) {

				me.fillFormSearchComponents(data, me.getFormsearch());
				me.printpdfOptions = data['others'][0][0]['PRINTFDF_OPTIONS'];
				me.printdosOptions = data['others'][0][0]['PRINTDOS_OPTIONS'];
				me.templateStimulsoft = data['others'][0][0]['TEMPLATE_STIMULSOFT'];
				if (data['others'][0][0]['TEMPLATE_STIMULSOFT'] == '') {
					me.getGrid().down('[action=printtemplate]').setDisabled(true);
				}
				//  p.setLoading(false);
			}
		}).read('searchassets');

	},
	fillFormSearchComponents: function (data, f) {
		var me = this;
		me.tools.wesea(data.cluster, f.down("[name=cluster_id]")).comboBox(true);
		me.tools.wesea(data.paymentmethod, f.down("[name=paymentmethod_id]")).comboBox(true);
		me.tools.wesea(data.block, f.down("[name=block_id]")).comboBox(true);
	},
	mainDataSave: function () {
		var me = this;
		me.insSave({
			form: me.getFormdata(),
			grid: me.getGrid(),
			store: me.localStore.detail,
			finalData: function (data) {
				data["purchaseletter_purchaseletter_id"] = data["purchaseletter_id"];
				data["payment"] = toFloat(data["payment"]);
				data["admin_fee"] = toFloat(data["admin_fee"]);
				data["detail"] = me.getGriddetail().getJson();
				if (me.getFormdata().editedRow > -1) {
					data["deletedRows"] = me.getGrid().getStore().getAt(me.getFormdata().editedRow).get("deletedRows");
				}

				return data;
			},
			sync: true,
			callback: {
				create: function (store, form, grid) {

				}
			}
		});
	},
	insACC: function (view, action, row) {
		var me = this;
		var grid = view.up("grid");

		switch (grid.itemId) {
			case "PaymentDetailGridID":
				if (action == "destroy") {
					me.deleteUnitFromGrid(row);
				} else if (action == "update") {
					// me.editUnitFromGrid(row);
					me.addNewDetail("update");
					var f = me.getFormdetail();
					f.editedRow = row;
					f.loadRecord(grid.getStore().getAt(row));
					f.down("[name=payment]").toCurrency();
					;
				}
				break;
		}
	},
	deleteUnitFromGrid: function (row) {
		var me = this;
		var id = 0;
		var s = me.getGriddetail().getStore();
		id = me.tools.intval(s.getAt(row).get("paymentdetail_id"));
		if (id > 0) {
			me.tools.gridHelper(me.getGrid()).maindetailUpdateDeletedRows(me.getFormdata(), s.getAt(row).get("paymentdetail_id"));
		}
		s.removeAt(row);


		me.hitungPayment();
		me.hitungTotalPayment();
		/* var id = parseInt(record.get("spkdetail_id"));
		 var grid = me.getGrid();
		 
		 var rec = grid.getRecordById(me.getv("spk_id"));
		 
		 rec.beginEdit();
		 rec.set({
		 deletedRows: "" + id + "," + rec.get("deletedRows")
		 });
		 rec.endEdit();
		 */
	},
	hitungPayment: function () {
		var me = this;
		var s = me.getGriddetail().getStore();
		var jumlah = s.getCount();
		var f = me.getFormdata();
		var adm = toFloat(f.down("[name=admin_fee]").getValuem());
		var total = 0;
		for (var i = 0; i < jumlah; i++) {
			total += toFloat(s.getAt(i).get("payment"));
		}

		f.down("[name=payment]").setValuem(total);


	},
	hitungTotalPayment: function () {
		var me = this;
		var f = me.getFormdata();
		var total = 0;
		var adminFee = me.tools.floatval(f.down("[name=admin_fee]").getValuem());
		var totalPay = me.tools.floatval(f.down("[name=payment]").getValuem());
		total = adminFee + totalPay;
		f.down("[name=total_payment]").setValuem(total);
		me.generateNote();
	},
	detailDataSave: function () {
		var me = this;
		var f = me.getFormdetail();
		var s = me.getGriddetail().getStore();
		var v = me.getFormdetail().getValues();
		var ptId = parseInt(v["paymenttype_paymenttype_id"]); /// paymenttype id
		if (ptId > 0) {
			var data = {
				paymenttype_paymenttype_id: ptId,
				paymenttype_paymenttype: me.tools.comboHelper(f.down("[name=paymenttype_paymenttype_id]")).getText(me.cbf.paymenttype),
				payment: toFloat(v["payment"]),
				description: v["description"],
				schedule_id: f.down("[name=schedule_id]").getValue()
			};
			if (f.editedRow > -1) {

				var rec = s.getAt(f.editedRow);
				rec.beginEdit();
				rec.set(data);
				rec.endEdit();
			} else {
				s.add(data);
			}
			me.hitungPayment();
			me.hitungTotalPayment();
			f.up("window").close();
		}

	},
	detailPanelAfterRender: function () {
		/* var me = this;
		 var f = me.getFormdetail();
		 var cb = ["paymenttype_paymenttype_id"];
		 for (var c in cb) {
		 f.down("[name=" + cb[c] + "]").bindPrefixName = me.controllerName;
		 f.down("[name=" + cb[c] + "]").doInit(true, function() {
		 f.setLoading(false);
		 //console.log(me.getFormdata().down("[name="+cb[c]+"]").getStore());
		 });
		 }*/
	},
	addNewDetail: function (state) {
		var s = typeof state === "undefined" ? "create" : state;
		var me = this;
		me.instantWindow('FormDataDetail', 500, 'Add Detail', s, 'myWindow');
		var f = me.getFormdetail();
		f.editedRow = -1;
		me.tools.wesea(me.paymentTypeList, f.down("[name=paymenttype_paymenttype_id]")).comboBox();
		f.down("[name=schedule_id]").setValue(0);
	},
	unitSelect: function () {
		var me = this;
		var f = me.getFormdata();
		if (me.browseHandler) {
			me.selectedPurchaseletter = null;
			me.browseHandler.selectItem(function () {
				var ps = me.localStore.selectedUnit; // purchaseletter detail Store
				var psRec = ps.getAt(0);
				if (psRec) {
					me.selectedPurchaseletter = psRec.data;
					me.getFormdata().loadRecord(psRec);
					me.mt.customerPhoto(f.down("#photo_image"), psRec.get("customer_photo"), me.myConfig.IMG_FOLDER);
				} else {
					console.log("[Error] Tidak ada data purchaseletter");
				}


			});
		}
	},
	selectUnitGridShow: function (el) {
		var me = this;
		var browse = new Erems.library.Browse();
		browse.init({
			controller: me,
			view: 'UnitGrid',
			el: el,
			localStore: "selectedUnit",
			mode_read: "selectedsoldunit"
		});
		browse.showWindow();

	},
	fdar: function () {
		var me = this;
		var f = me.getFormdata();
		var gds = me.getGriddetail();
		var x = {
			init: function () {

				me.mt = new Erems.library.ModuleTools();

				me.setActiveForm(f);


				gds.doInit();

				me.localStore.detail = me.instantStore({
					id: me.controllerName + 'OPDetailStore',
					extraParams: {
						mode_read: 'maindetail'
					},
					idProperty: 'payment_id'
				});
			},
			create: function () {
				f.setLoading("Please wait...");
				me.tools.ajax({
					params: {
					},
					success: function (data, model) {

						me.myParams = {
							// 'cash': data['others'][0][0]['PAYMENTMETHOD_CASH'],
							'ptname': data['others'][0][0]['PT_NAME']
						};


						me.globalParams = data['others'][0][0]['GLOBALPARAMSPARAMS'];
						if (me.globalParams) {
							f.down("[name=note]").setValue(me.globalParams['OTHERPAYMENT_DESC']);
						}
						me.fillFormComponents(data, f);
						me.paymentTypeList = data.paymenttype;
						me.localStore.detail.load({
							params: {
								payment_id: 0
							},
							callback: function (rec, op) {
								me.attachModel(op, me.localStore.detail, false);

							}
						});
						gds.getStore().load({
							params: {
								//state:"load_default_attribute"
							},
							callback: function (rec, op) {
								gds.attachModel(op);
							}
						});

						f.setLoading(false);


					}
				}).read('detail');

			},
			update: function () {
				f.setLoading("Please wait...");
				me.tools.ajax({
					params: {
					},
					success: function (data, model) {

						me.myParams = {
							// 'cash': data['others'][0][0]['PAYMENTMETHOD_CASH'],
							'ptname': data['others'][0][0]['PT_NAME']
						};

						me.globalParams = data['others'][0][0]['GLOBALPARAMSPARAMS'];
						me.fillFormComponents(data, f);
						me.paymentTypeList = data.paymenttype;

						var paymentId = me.getGrid().getSelectedRecord().get("payment_id");
						f.editedRow = me.getGrid().getSelectedRow();
						f.setLoading("Loading payment detail...");
						me.localStore.detail.load({
							params: {
								payment_id: paymentId
							},
							callback: function (rec, op) {
								me.attachModel(op, me.localStore.detail, false);
								var rec = me.localStore.detail.getAt(0);
								me.getFormdata().loadRecord(rec);



								f.down("[name=harga_total_jual]").setValue(me.tools.notnull(rec.get("purchaseletter_harga_total_jual")));
								f.down("[name=purchase_date]").setValue(me.tools.notnull(rec.get("purchaseletter_purchase_date")));
								f.down("[name=rencana_serahterima_date]").setValue(me.tools.notnull(rec.get("purchaseletter_rencana_serahterima_date")));
								f.down("[name=purchaseletter_no]").setValue(me.tools.notnull(rec.get("purchaseletter_purchaseletter_no")));

								me.mt.customerPhoto(f.down("#photo_image"), rec.get("customer_photo"), me.myConfig.IMG_FOLDER);
								/* load payment detail*/
								var sg = me.getGriddetail();
								sg.getStore().load({
									params: {
										payment_id: paymentId
									},
									callback: function (rec, op) {
										sg.attachModel(op);
										me.paymentdetailgridActioncolumn();
									}
								});

								//// convert to currency
								var ar = ['payment', 'admin_fee', 'total_payment'];
								for (var i in ar) {
									f.down("[name=" + ar[i] + "]").toCurrency();
								}

								me.selectedPurchaseletter = rec.data;

							}
						});

						f.setLoading(false);


					}
				}).read('detail');


			}
		};
		return x;
	},
	fillFormComponents: function (data, form) {
		var me = this;
		me.tools.wesea(data.paymentmethod, form.down("[name=paymentmethod_paymentmethod_id]")).comboBox();
		//citraclub_id

	},

	//Rizal 6 Mei 2019

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
		//var form = '<form id="fakeReportFormID" action=resources/stimulsoftjs/viewer.php?reportfilelocation='+reportFile+'.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
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
	}
	,
	processReportBuktiPenerimaan: function () {
		var me = this;

//		var form = me.getFormdata().getForm();
//		if (form.isValid()) {
		var rec = me.getGrid().getSelectedRecord();
		if (rec) {

			var winId = 'myReportWindow';
			me.instantWindowRZL('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
			var win = desktop.getWindow(winId);

			if (win) {
				var params = [];

				params["payment_id"] = rec.get("payment_id");
				console.log(params["payment_id"]);
				var reportFile = 'BuktiPenerimaanUang';

				var html = me.generateFakeForm2RZL(params, reportFile);

				win.down("#MyReportPanel").body.setHTML(html);
				$("#fakeReportFormID").submit();
			}
		}
	},
	processPrintTemplate: function () {
		var me = this;
		var rec = me.getGrid().getSelectionModel().getSelection();
		if (rec.length < 1) {
			Ext.Msg.alert('Info', 'No record selected !');
			return;
		} else {
			var paymentId = "";
			for (var i = 0; i < rec.length; i++) {
				if (paymentId != "") {
					paymentId += "~";
				}
				paymentId += rec[i].get('payment_id');
			}
		}

		if (rec) {

			var winId = 'myReportWindow';
			me.instantWindowRZL('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
			var win = desktop.getWindow(winId);

			if (win) {
				var params = [];
				params["payment_id"] = paymentId;
				console.log(params);
				var reportFile = me.templateStimulsoft;
				var html = me.generateFakeForm2RZL(params, reportFile);
				win.down("#MyReportPanel").body.setHTML(html);
				$("#fakeReportFormID").submit();
			}
		}
	},
	/* add by hadi 21/07/2020*/
	bayarLegalitasOnClick: function () {
		var me = this;
		var fd = me.getFormdetail();
		var gs = me.getGridscheduleLegalitas();
		var rec = gs.getSelectedRecord();
		console.log(rec);
		if (rec) {
			fd.down("[name=payment]").setValue(accounting.format(rec.get("remaining_balance")));
			fd.down("[name=payment]").setReadOnly(false);
			fd.down("[name=schedule_id]").setValue(rec.get("schedule_id"));
			gs.up("window").close();
		}
	},
	paymentdetailgridActioncolumn: function () {
		
		var me = this;
		var sg = me.getGriddetail();
		var gridColumns = sg.columns;
        var gridColumn = gridColumns[5];
        gridColumn.hide();
	    var eColumn = Ext.create('Ext.grid.column.Action', { 
        	width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete',
                }
            ] 
        });
        sg.headerCt.insert(gridColumns.length,eColumn);

		// view = sg.view;
  //       nodes = view.getNodes();
  //       for (i = 0; i < nodes.length; i++) {
  //           node = nodes[i];
  //           record = view.getRecord(node);
  //           cells = Ext.get(node).query('td');
  //           actioncolumngrid = cells[cells.length-1];
  //           eventdata = Ext.get(actioncolumngrid).select("div")['elements'][0];
  //           action = eventdata.childNodes;
  //           acedit = action[0];
  //           acedit.remove();
  //       }
	}
	/* add by hadi 21/07/2020*/
});