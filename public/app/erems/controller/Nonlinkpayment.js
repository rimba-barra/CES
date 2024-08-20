Ext.define('Erems.controller.Nonlinkpayment', {
	extend: 'Erems.library.template.controller.Controller2',
	alias: 'controller.Nonlinkpayment',
	requires: ['Erems.library.Unitformula', 'Erems.library.form.Paymentformfunc', 'Erems.library.Browse',
		'Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.box.tools.EventSelector', 'Erems.library.XyReport'],
	views: ['nonlinkpayment.Panel', 'nonlinkpayment.Grid', 'nonlinkpayment.FormSearch', 'nonlinkpayment.FormData', 'nonlinkpayment.PaymentDetailGrid', 'masterreport.Panel'],
	comboBoxIdEl: [],
	controllerName: 'nonlinkpayment',
	fieldName: 'payment_id',
	fillForm: null,
	formWidth: 800,
	refs: [
		{
			ref: 'grid',
			selector: 'nonlinkpaymentgrid'
		},
		{
			ref: 'formsearch',
			selector: 'nonlinkpaymentformsearch'
		},
		{
			ref: 'formdata',
			selector: 'nonlinkpaymentformdata'
		},
		{
			ref: 'formdetail',
			selector: 'nonlinkpaymentformdatadetail'
		},
		{
			ref: 'griddetail',
			selector: 'nonlinkpaymentdetailgrid'
		},
		{
			ref: 'panel',
			selector: 'nonlinkpaymentpanel'
		},
		{
			ref: 'formdos',
			selector: 'nonlinkpaymentdospreviewformdata'
		},
		{
			ref: 'formprintout',
			selector: 'nonlinkpaymentformprintout'
		}
	],
	//unitFormula: null,
	//storeProcess: 'Otherspaymentdatadetail',
	bindPrefixName: 'Nonlinkpayment',
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
			'nonlinkpaymentpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'nonlinkpaymentformdatadetail': {
				afterrender: this.detailPanelAfterRender
			},
			'nonlinkpaymentgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'nonlinkpaymentformsearch': {
				afterrender: this.formSearchAfterRender

			},
			'nonlinkpaymentgrid toolbar button[action=create]': {
				click: function () {
					//this.formDataShow('create');
				}
			},
			'nonlinkpaymentgrid toolbar button[action=update]': {
				click: function () {
					// this.formDataShow('update');
				}
			},
			'nonlinkpaymentgrid toolbar button[action=view]': {
				click: function () {
					this.formDataShow('view');
				}
			},
			'nonlinkpaymentgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'nonlinkpaymentgrid toolbar button[action=print]': {
				click: this.mainPrint
			},
			'nonlinkpaymentgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'nonlinkpaymentformsearch button[action=search]': {
				click: this.dataSearch
			},
			'nonlinkpaymentformsearch button[action=reset]': {
				click: this.dataReset
			},
			'nonlinkpaymentformdata': {
				afterrender: this.formDataAfterRender
			},
			'nonlinkpaymentformdata button[action=save]': {
				click: this.mainDataSave
			},
			'nonlinkpaymentformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'nonlinkpaymentformdatadetail button[action=save]': {
				click: this.detailDataSave
			},
			'nonlinkpaymentformdata button[action=browse_unit]': {
				click: me.selectUnitGridShow
			},
			'nonlinkpaymentunitgrid button[action=select]': {
				click: this.unitSelect
			},
			'nonlinkpaymentdetailgrid button[action=addNewDetail]': {
				click: function () {
					me.addNewDetail("create");
				}

			},
			'nonlinkpaymentdetailgrid actioncolumn': {
				click: this.insActionColumnClick
			},
			'nonlinkpaymentformdata textfield[name=admin_fee]': {
				keyup: function () {
					me.hitungTotalPayment();
				}
			},
			'nonlinkpaymentgrid button[action=printx]': {
				click: this.showPdf
			},
			'nonlinkpaymentformdata [name=paymentmethod_paymentmethod_id]': {
				select: function () {
					me.generateNote();
				}
			},
			'nonlinkpaymentformdata [name=payment_date]': {
				change: function () {
					me.generateNote();
				}
			},
			'nonlinkpaymentformdata textfield[name=reference_no]': {
				keyup: function () {
					me.referenceNoOnKeyUp();
				}
			},
			'nonlinkpaymentformdata textfield[name=receipt_no]': {
				keyup: function () {
					me.receiptNoOnKeyUp();
				}
			},
			'nonlinkpaymentgrid button[action=printvoucher]': {
				click: this.showVoucherPdf
			},
			'nonlinkpaymentgrid button[action=printdos]': {
				click: this.showPrintDosPreview
			},
			'nonlinkpaymentdospreviewformdata button[action=print]': {
				click: this.printDos
			},
			'nonlinkpaymentformprintout button[action=print]': {
				click: this.othPayPrintPdfByTpl
			},

			//Rizal 6 Mei 2019
			'nonlinkpaymentgrid toolbar button[action=printbuktipenerimaan]': {
				click: function () {
					me.processReportBuktiPenerimaan();
				}
			},
			// Add by RH 30/10/2019
			'nonlinkpaymentgrid toolbar button[action=printtemplate]': {
				click: function () {
					me.processPrintTemplate();
				}
			},
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
	receiptNoOnKeyUp: function () {
		var me = this;
		var f = me.getFormdata();
		f.down("[name=payment_no]").setValue(f.down("[name=receipt_no]").getValue());
	},
	referenceNoOnKeyUp: function () {
		var me = this;
		var f = me.getFormdata();
		f.down("[name=payment_no]").setValue(f.down("[name=reference_no]").getValue());
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
		//str += ' ' + f.down("[name=type_name]").getValue();
		str += ' ' + me.tools.comboHelper(f.down("[name=paymentmethod_paymentmethod_id]")).getText(me.cbf.paymentmethod) + ' . ';

		str += ' ' + me.getDateString(f.down("[name=payment_date]").getValue()) + ' ';
		str += ' Rp. ' + accounting.formatMoney(f.down("[name=payment]").getValue()) + ',- ';
		// str += ' ' + f.down("[name=cluster_cluster]").getValue();
		// str += ' ' + f.down("[name=unit_unit_number]").getValue();
		str += ' ' + me.myParams['ptname'];



		f.down("[name=note]").setValue(str);

	},
	getDateString: function (date) {
		var d = new Date(date);
		var str = '';
		str += d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
		return str;
	},
	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		var edit = grid.down('#btnEdit');
		var deleteb = grid.down('#btnDelete');
		var view = grid.down('#btnView');
		var print = grid.down('#btnPrint');

		if (edit !== null) {
			edit.setDisabled(row.length != 1);
		}
		if (print !== null) {
			print.setDisabled(row.length != 1);
		}
		if (deleteb !== null) {
			deleteb.setDisabled(row.length < 1);
		}
		if (view !== null) {
			view.setDisabled(row.length != 1);
		}
	},
	// showPdf: function() {
	// var me = this;
	// var p = me.getPanel();



	// var recs = me.getGrid().getSelectionModel().getSelection();



	// if(recs.length==0){
	// return;
	// }

	// p.setLoading("Please wait..");

	// var ids = "";

	// for(var i in recs){
	// ids += recs[i].get("payment_id")+"~";
	// }




	// me.tools.ajax({
	// params: {
	// payment_id: ids
	// },
	// success: function(data, model) {




	// p.setLoading(false);
	// var url = data['others'][0][0]['URL'];
	// //   var display = data['others'][0][0]['DISPLAY'];
	// if (url) {

	// var win = window.open(url, '_blank');
	// win.focus();

	// /*
	// Ext.Msg.show({
	// title: 'Info',
	// msg: '<a href="' + url + '" target="blank">Download file</a>',
	// icon: Ext.Msg.INFO,
	// buttons: Ext.Msg.OK,
	// fn: function() {

	// }
	// });
	// */
	// /*
	// var myWindow = window.open('', '', 'width=600,height=300');

	// myWindow.document.write("<a href='"+url+"' target='blank'>Download file</a><br/>");
	// myWindow.focus();
	// */
	// }


	// }
	// }).read('printpdf');

	// },

	showPdf: function () {
		var me = this;





		if (me.printpdfOptions.length > 0) {
			var w = me.instantWindow('FormPrintout', 400, 'Select template', 'print', 'nonpayPrintSeletWindow');

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
		p.setLoading("Please wait");
		me.tools.ajax({
			params: {},
			success: function (data, model) {

				me.fillFormSearchComponents(data, me.getFormsearch());
				me.printpdfOptions = data['others'][0][0]['PRINTFDF_OPTIONS'];
				me.templateStimulsoft = data['others'][0][0]['TEMPLATE_STIMULSOFT'];
				if (data['others'][0][0]['TEMPLATE_STIMULSOFT'] == '') {
					me.getGrid().down('[action=printtemplate]').setDisabled(true);
				}

				p.setLoading(false);
			}
		}).read('searchassets');

	},
	fillFormSearchComponents: function (data, f) {
		var me = this;

		me.tools.wesea(data.paymentmethod, f.down("[name=paymentmethod_id]")).comboBox(true);

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
	mainDataSave: function () {
		var me = this;
		me.insSave({
			form: me.getFormdata(),
			grid: me.getGrid(),
			store: me.localStore.detail,
			finalData: function (data) {

				data["purchaseletter_purchaseletter_id"] = data["purchaseletter_id"];
				data["payment"] = accounting.unformat(data["payment"]);
				data["admin_fee"] = accounting.unformat(data["admin_fee"]);
				data["total_payment"] = accounting.unformat(data["total_payment"]);
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
			case "MyDetailGrid":
				if (action == "destroy") {
					me.deleteUnitFromGrid(row);
				} else if (action == "update") {
					// me.editUnitFromGrid(row);
					me.addNewDetail("update");
					var f = me.getFormdetail();
					f.editedRow = row;
					f.loadRecord(grid.getStore().getAt(row));
				}
				break;
		}
	},
	deleteUnitFromGrid: function (row) {
		var me = this;
		var s = me.getGriddetail().getStore();
		var id = 0;
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
				description: v["description"]
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
	},
	unitSelect: function () {
		var me = this;
		var f = me.getFormdata();
		if (me.browseHandler) {
			me.browseHandler.selectItem(function () {
				var ps = me.localStore.selectedUnit; // purchaseletter detail Store
				var psRec = ps.getAt(0);
				if (psRec) {
					me.getFormdata().loadRecord(psRec);
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
			mode_read: "selected_unit"
		});
		browse.showWindow();

	},
	getFormProperties: function (action) {
		var me = this;
		var p = {
			state: 'view',
			formtitle: 'View',
			formicon: 'icon-form-add'
		};
		if (typeof action !== 'undefined') {
			p.state = action.replace(me.bindPrefixName, "").toLowerCase();

			var grid = me.getGrid();
			var actionColItems = grid.down('actioncolumn').items;
			var founded = false;
			for (var i in actionColItems) {
				if (actionColItems[i].bindAction === action) {
					p.formtitle = actionColItems[i].text;
					p.formicon = actionColItems[i].iconCls;
					founded = true;
				}

			}
			if (!founded) {
				p.formtitle = p.state;
			}
		}
		return p;
	},
	formDataShow: function (el, act, action) {
		var me = this;
		var formtitle, formicon;

		//  var state = action == me.bindPrefixName + 'Create' ? 'create' : 'update';
		var gfp = me.getFormProperties(action);
		var state = gfp.state;
		formtitle = gfp.formtitle;
		formicon = gfp.formicon;
		/*switch (state) {
		 case 'create':
		 formtitle = 'Add New';
		 formicon = 'icon-form-add';
		 break;
		 case 'update':
		 formtitle = 'Edit';
		 formicon = 'icon-form-edit';
		 break;
		 }*/

		var winId = 'win-holidayformdata';
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
				// height:Ext.getBody().getViewSize().height * 0.9,
				//height:200,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: false,
				//items: Ext.create('Erems.view.' + me.controllerName + '.FormData'),
				state: state,
				listeners: {
					boxready: function () {
						// win.setHeight(200);

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
	fdar: function () {



		var me = this;
		var f = me.getFormdata();
		var gds = me.getGriddetail();
		var x = {
			init: function () {

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
				f.setLoading("Please wait..");
				f.editedRow = -1;
				me.tools.ajax({
					params: {
						// purchaseletter_id: plId
					},
					success: function (data, model) {

						me.myParams = {
							// 'cash': data['others'][0][0]['PAYMENTMETHOD_CASH'],
							'ptname': data['others'][0][0]['PT_NAME']
						};

						me.globalParams = data['others'][0][0]['GLOBALPARAMSPARAMS'];
						if (me.globalParams) {
							f.down("[name=note]").setValue(me.globalParams['NONLINK_DESC']);
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

						//   f.down("[name=pt_name]").setValue(data['others'][0][0]['PT_NAME']);

						f.setLoading(false);

					}
				}).read('detail');


			},
			update: function () {
				var paymentId = me.getGrid().getSelectedRecord().get("payment_id");
				f.editedRow = me.getGrid().getSelectedRow();
				f.setLoading("Please wait..");
				me.tools.ajax({
					params: {
					},
					success: function (data, model) {

						me.myParams = {
							// 'cash': data['others'][0][0]['PAYMENTMETHOD_CASH'],
							'ptname': data['others'][0][0]['PT_NAME']
						};

						me.fillFormComponents(data, f);
						me.paymentTypeList = data.paymenttype;
						f.setLoading("Loading payment detail..");

						me.localStore.detail.load({
							params: {
								payment_id: paymentId
							},
							callback: function (rec, op) {
								me.attachModel(op, me.localStore.detail, false);
								var rec = me.localStore.detail.getAt(0);
								me.getFormdata().loadRecord(rec);
								f.down("[name=customer_city_city_id]").setValue(rec.get("city_city_id"));
								/* load payment detail*/
								var sg = me.getGriddetail();
								sg.getStore().load({
									params: {
										payment_id: paymentId
									},
									callback: function (rec, op) {
										sg.attachModel(op);
									}
								});

								//// convert to currency
								var ar = ['payment', 'admin_fee', 'total_payment'];
								for (var i in ar) {
									f.down("[name=" + ar[i] + "]").toCurrency();
								}

//								f.down("[name=pt_name]").setValue(data['others'][0][0]['PT_NAME']);
							}
						});





						f.setLoading(false);

					}
				}).read('detail');

			},
			view: function () {
				me.fdar().update();
				me.getFormdata().getForm().getFields().each(function (field) {
					field.setReadOnly(true);
				});
				Ext.Array.each(me.getFormdata().query("[xtype=button]"), function (field) {
					field.setVisible(false);
				});
				me.getFormdata().down('#btnCancel').show();
				me.getGriddetail().down('actioncolumn').hide();
			}
		};
		return x;
	},
	fillFormComponents: function (data, form) {
		var me = this;
		me.tools.wesea(data.paymentmethod, form.down("[name=paymentmethod_paymentmethod_id]")).comboBox();
		me.tools.wesea(data.city, form.down("[name=customer_city_city_id]")).comboBox();

		//citraclub_id

	},
	// showPrintDosPreview: function() {
	// var me = this;


	// var recs = me.getGrid().getSelectionModel().getSelection();

	// if (recs.length == 0) {
	// return;
	// }


	// var ids = "";
	// for (var i in recs) {
	// ids += recs[i].get("payment_id") + "~";
	// }


	// var w = me.instantWindow('DosPreviewFormData', 700, 'Print Preview', 'print', 'myDowPreviewWindow');
	// var text = 'Hello test';
	// var f = me.getFormdos();
	// f.setLoading("Please wait...");
	// me.tools.ajax({
	// params: {
	// payment_id: ids
	// },
	// success: function(data, model) {

	// f.setLoading(false);
	// //console.log(f.down("#textDosPreviewID"));
	// //f.down("#textDosPreviewID").html = text;
	// var text = data['others'][0][0]['PREVIEW'];
	// f.down("[name=url]").setValue(data['others'][0][0]['URL']);
	// f.down("#textDosPreviewID").update(text);


	// }
	// }).read('printdos');


	// },
	showPrintDosPreview: function () {
		var me = this;


		var recs = me.getGrid().getSelectionModel().getSelection();

		if (recs.length == 0) {
			return;
		}


		if (me.printdosOptions.length > 0) {
			var w = me.instantWindow('FormPrintout', 400, 'Select template', 'print', 'nonpayDosPrintSeletWindow');

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
	printDos: function () {
		var me = this;
		var f = me.getFormdos();
		var url = f.down("[name=url]").getValue();

		if (url) {

			window.open(url);

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
				var reportFile = me.templateStimulsoft;
				var html = me.generateFakeForm2RZL(params, reportFile);
				win.down("#MyReportPanel").body.setHTML(html);
				$("#fakeReportFormID").submit();
			}
		}
	},

	//

});