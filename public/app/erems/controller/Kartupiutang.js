Ext.define('Erems.controller.Kartupiutang', {
	extend: 'Erems.library.template.controller.Controller2',
	alias: 'controller.Kartupiutang',
	views: ['kartupiutang.Panel', 'kartupiutang.Grid', 'kartupiutang.FormSearch', 'kartupiutang.FormData', 'masterreport.Panel'],
	requires: ['Erems.library.XyReportB', 'Erems.library.XyReportJs',
		'Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.box.tools.EventSelector'],
	refs: [
		{
			ref: 'grid',
			selector: 'kartupiutanggrid'
		},
		{
			ref: 'formsearch',
			selector: 'kartupiutangformsearch'
		},
		{
			ref: 'formdata',
			selector: 'kartupiutangformdata'
		},
		{
			ref: 'gridbilling',
			selector: 'kartupiutangbillingschedulegrid'
		},
		{
			ref: 'gridpayment',
			selector: 'kartupiutanglistpaymentgrid'
		},
		{
			ref: 'panel',
			selector: 'kartupiutangpanel'
		}
	],
	controllerName: 'kartupiutang',
	fieldName: 'expense_no',
	bindPrefixName: 'Kartupiutang',
	formWidth: 800,
	nomMaster: 'list_kartupiutang',
	localStore: {
		selectedUnit: null,
		customer: null,
		price: null,
		detail: null
	},
	xyReport: null,
	tools: null,
	myConfig: null,
	cbf: null,
	mt: null,
	iwField: {
		title: 'Kartu Piutang'
	},
	formxWinId: 'win-kartupiutangwinId',
	reportFileName: null,
	// edited by Rizal 13-02-2019 //
	reportFileNameCustomer: null,
	reportFileView: null,

	// added by rico 19072022
	reportFileNameV2: null,
	DENDAALERT: false,
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
			'kartupiutangpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender
			},
			'kartupiutanggrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridKartuSelectionChange
			},
			'kartupiutanggrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'kartupiutanggrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'kartupiutanggrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'kartupiutanggrid toolbar button[action=print]': {
				click: this.mainPrint
			},
			'kartupiutanggrid toolbar button[action=excel]': {
				click: this.printExcel
			},
			// edited by Rizal 13-02-2019
			'kartupiutanggrid toolbar button[action=printcustomer]': {
				click: this.mainPrintCustomer
			},
			// added by Rizal 19072022
			'kartupiutanggrid toolbar button[action=printv2]': {
				click: this.mainPrintV2
			},
			//
			'kartupiutanggrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'kartupiutangformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'kartupiutangformsearch button[action=search]': {
				click: this.dataSearch
			},
			'kartupiutangformsearch button[action=reset]': {
				click: this.dataReset
			},
			'kartupiutangformdata': {
				afterrender: this.formDataAfterRender
			},
			'kartupiutangformdata button[action=save]': {
				click: this.dataSave
			},
			'kartupiutangformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'kartupiutanglistpaymentgrid': {
				itemdblclick: function () {
					me.gridPaymentItemDblClick();
				},
				itemclick: function () {
					//                    alert('woy');
					var g = me.getGridpayment();
					var rec = g.getSelectedRecord();
					var rec2 = g.getStore();
					// console.log(rec);
					var i;
					var payment = 0;
					for (i = rec.index; i >= 0; i--) {
						var total_payment = rec2.getAt(i);
						payment += Number(total_payment.get("total_payment"));
					}
					var form = me.getFormdata();
					form.down("[name=total_pembayaran]").setValue(me.currencyFormat(payment));
				}
			},
			'kartupiutanglistpaymentgrid actioncolumn': {
				click: this.insActionColumnClick
			},
			'kartupiutangbillingschedulegrid': {
				itemclick: function () {
					//                    alert('woy');
					var g = me.getGridbilling();
					var rec = g.getSelectedRecord();
					var rec2 = g.getStore();
					var i;
					var amount = 0;
					for (i = rec.index; i >= 0; i--) {
						var amount_data = rec2.getAt(i);
						amount += Number(amount_data.get("amount"));
					}
					var form = me.getFormdata();
					form.down("[name=total_piutang]").setValue(me.currencyFormat(amount));
					//                    console.log(rec.index);
					//                    console.log('===rec2====');
					//                    console.log(amount);
				}
			},
			'kartupiutangformsearch [name=unit_number]': {
				keypress: function (e, el) {
					var me = this;
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				}
			},
			'kartupiutangformsearch [name=customer_name]': {
				keypress: function (e, el) {
					var me = this;
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				}
			},
			'kartupiutangformsearch [name=unit_virtualaccount_bca]': {
				keypress: function (e, el) {
					var me = this;
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				}
			},
			'kartupiutangformsearch [name=unit_virtualaccount_mandiri]': {
				keypress: function (e, el) {
					var me = this;
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				}
			},

		});
	},

	currencyFormat: function (num) {
		return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	},
	insACC: function (view, action, row) {
		var me = this;
		var grid = view.up("grid");

		switch (grid.itemId) {
			case "KartupiutanglistpaymentgridID":
				if (action === "show") {
					me.gridPaymentItemDblClick(row);
				}
				break;
		}
	},
	gridPaymentItemDblClick: function (row) {
		var me = this;
		var rec = null;
		var r = typeof row === 'undefined' ? -1 : row;
		if (r > -1) {
			rec = me.getGridpayment().getStore().getAt(r);
		} else {
			rec = me.getGridpayment().getSelectedRecord();
		}

		if (rec) {
			var c = _myAppGlobal.getController('Installmentpayment');
			c.paymentId = rec.get("payment_id");
			c.formDataShow(c.getFormdata(), 'Payment Information', c.bindPrefixName + 'Update');
		}

	},
	gridItemDblClick: function (configs) {
		var me = this;
		// console.log(me.getGrid().getSelectedRecord());
		// console.log(me.getGrid().getSelectionModel().getLastSelected());

		me.formDataShow(me.getFormdata(), 'update');
	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);
		var me = this;
		var p = me.getPanel();
		// p.setLoading("Please wait");
		me.tools.ajax({
			params: {},
			success: function (data, model) {
				me.fillFormSearchComponents(data, me.getFormsearch());
				// p.setLoading(false);
				me.reportFileName = data['others'][0][0]['FILE_REPORT'];
				// edited by Rizal 13-02-2019 //
				me.reportFileNameCustomer = data['others'][0][0]['FILE_REPORT_CUSTOMER'];

				//added by rico 19072022
				me.reportFileNameV2 = data['others'][0][0]['FILE_REPORT_V2'];

				me.DENDAALERT = data['others'][0][0]['DENDAALERT'];
			}
		}).read('searchassets');

	},
	fillFormSearchComponents: function (data, f) {
		var me = this;

		me.tools.wesea(data.cluster, f.down("[name=cluster_id]")).comboBox(true);
		me.tools.wesea(data.block, f.down("[name=block_id]")).comboBox(true);
		me.tools.wesea(data.position, f.down("[name=position_id]")).comboBox(true);
		me.tools.wesea(data.productcategory, f.down("[name=productcategory_id]")).comboBox(true);
		me.tools.wesea(data.type, f.down("[name=type_id]")).comboBox(true);
		me.tools.wesea(data.purpose, f.down("[name=purpose_id]")).comboBox(true);
		me.tools.wesea(data.side, f.down("[name=side_id]")).comboBox(true);
		me.tools.wesea(data.unitstatus, f.down("[name=unitstatus_id]")).comboBox(true);
	},
	/*@implement this method for xyReport Class*/
	xyReportProcessParams: function (reportData) {
		var me = this;
		var groupBy = reportData.params["Groupby"];
		// edited by Rizal 13-02-2019
		var fn = me.reportFileView;
		//
		var plId = 0;
		/// added
		var g = me.getGrid();
		var rec = g.getSelectedRecord();

		if (rec) {
			plId = rec.get("purchaseletter_id");
		} else {

		}
		// console.log(plId);
		// end added
		// reportData.params['con_string'] = "server=NB-MIS06\SQLEXPRESS;database=erems;user=sa;password=password12345";
		reportData['file'] = fn;
		reportData.params["purchaseletter_id"] = plId;
		reportData.params["data"] = [];
		return reportData;
	},
	mainPrint: function () {
		var me = this;
		me.reportFileView = me.reportFileName;
		if (me.DENDAALERT) {
			var rec = me.getGrid().getSelectedRecord();
			if (rec) {
				var denda = me.tools.floatval(rec.get("schedule_remaining_denda"));
				var notes_batal = rec.get("notes_batal");
				var blokir = rec.get('is_blokir'); // added by rico 28112022

				if(blokir == 1){ // added by rico 28112022
					Ext.Msg.show({
						title: 'Info',
						msg: "Purchaseletter ini dalam proses Terblokir, tidak boleh Menerbitkan Tagihan, tidak boleh Dialih Hakkan dan tidak boleh Serah Terima",
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							me.mainPrintIntern();
						}
					});
				}else if (denda > 0.0 && notes_batal != 0) {
					Ext.Msg.show({
						title: 'Info',
						msg: "Masih Ada Denda Tidak bisa serah terima, masih ada denda berjalan konfirm collection<br>Notes Collection: " + notes_batal,
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							me.mainPrintIntern();
						}
					});
				} else if (denda == 0.0 && notes_batal != 0) {
					Ext.Msg.show({
						title: 'Info',
						msg: "Notes Collection: " + notes_batal,
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							me.mainPrintIntern();
						}
					});
				} else if (denda > 0.0 && notes_batal == 0) {
					Ext.Msg.show({
						title: 'Info',
						msg: "Masih Ada Denda Tidak bisa serah terima, masih ada denda berjalan konfirm collection",
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							me.mainPrintIntern();
						}
					});
				} else {
					me.mainPrintIntern();
				}
			}
		} else {
			me.mainPrintIntern();
		}
	},
	// edited by Rizal 13-02-2019
	mainPrintCustomer: function () {
		var me = this;
		me.reportFileView = me.reportFileNameCustomer;
		if (me.DENDAALERT) {
			var rec = me.getGrid().getSelectedRecord();
			if (rec) {
				var denda = me.tools.floatval(rec.get("schedule_remaining_denda"));
				var notes_batal = rec.get("notes_batal");
				var blokir = rec.get('is_blokir'); // added by rico 28112022

				if(blokir == 1){ // added by rico 28112022
					Ext.Msg.show({
						title: 'Info',
						msg: "Purchaseletter ini dalam proses Terblokir, tidak boleh Menerbitkan Tagihan, tidak boleh Dialih Hakkan dan tidak boleh Serah Terima",
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							me.mainPrintIntern();
						}
					});
				}else if (denda > 0.0 && (notes_batal != 0)) {
					Ext.Msg.show({
						title: 'Info',
						msg: "Masih Ada Denda Tidak bisa serah terima, masih ada denda berjalan konfirm collection<br>Notes Collection: " + notes_batal,
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							me.mainPrintIntern();
						}
					});
				} else if (denda == 0.0 && notes_batal != 0) {
					Ext.Msg.show({
						title: 'Info',
						msg: "Notes Collection: " + notes_batal,
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							me.mainPrintIntern();
						}
					});
				} else if (denda > 0.0 && notes_batal == 0) {
					Ext.Msg.show({
						title: 'Info',
						msg: "Masih Ada Denda Tidak bisa serah terima, masih ada denda berjalan konfirm collection",
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							me.mainPrintIntern();
						}
					});
				} else {
					me.mainPrintIntern();
				}
			}
		} else {
			me.mainPrintIntern();
		}
	},
	// added by Rico 19072022
	mainPrintV2: function () {
		var me = this;
		me.reportFileView = me.reportFileNameV2;
		if (me.DENDAALERT) {
			var rec = me.getGrid().getSelectedRecord();
			if (rec) {
				var denda = me.tools.floatval(rec.get("schedule_remaining_denda"));
				var notes_batal = rec.get("notes_batal");
				var blokir = rec.get('is_blokir'); // added by rico 28112022

				if(blokir == 1){ // added by rico 28112022
					Ext.Msg.show({
						title: 'Info',
						msg: "Purchaseletter ini dalam proses Terblokir, tidak boleh Menerbitkan Tagihan, tidak boleh Dialih Hakkan dan tidak boleh Serah Terima",
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							me.mainPrintIntern();
						}
					});
				}else if (denda > 0.0 && (notes_batal != 0)) {
					Ext.Msg.show({
						title: 'Info',
						msg: "Masih Ada Denda Tidak bisa serah terima, masih ada denda berjalan konfirm collection<br>Notes Collection: " + notes_batal,
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							me.mainPrintIntern();
						}
					});
				} else if (denda == 0.0 && notes_batal != 0) {
					Ext.Msg.show({
						title: 'Info',
						msg: "Notes Collection: " + notes_batal,
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							me.mainPrintIntern();
						}
					});
				} else if (denda > 0.0 && notes_batal == 0) {
					Ext.Msg.show({
						title: 'Info',
						msg: "Masih Ada Denda Tidak bisa serah terima, masih ada denda berjalan konfirm collection",
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							me.mainPrintIntern();
						}
					});
				} else {
					me.mainPrintIntern();
				}
			}
		} else {
			me.mainPrintIntern();
		}
	},
	//
	mainPrintIntern: function () {
		var me = this;
		if (!me.xyReport) {
			//me.xyReport = new Erems.library.XyReportB(); //FLASH
			me.xyReport = new Erems.library.XyReportJs(); //JS
			me.xyReport.init(me);
		}
		me.xyReport.processReport();
	},
	execAction: function (el, action, me) {
		if (!action) {
			action = '';
		}
		if (!me) {
			me = this;
		}

		switch (action) {

			case me.bindPrefixName + 'View':

				me.formDataShow(el, acts[action], action);
				break;
			case me.bindPrefixName + 'Print':
				//loadReport(el, 'tms/building/print');
				break;
		}
	},
	fdar: function () {
		var me = this;
		var f = me.getFormdata();
		var x = {
			init: function () {
				me.setActiveForm(f);
				f.up("window").maximizable = true;
				me.localStore.detail = me.instantStore({
					id: me.controllerName + 'KPDetailStore',
					extraParams: {
						mode_read: 'maindetail'
					},
					idProperty: 'purchaseletter_id'
				});


				f.setLoading("Please wait");
				var selectedRec = me.getGrid().getSelectedRecord();
				var lastselectedRec = me.getGrid().getSelectionModel().getLastSelected();
				var plId = null;
				//edit by dika 20221114
				//console.log(selectedRec);
				if (selectedRec != undefined) {
					plId = selectedRec.data.purchaseletter_id;
					f.down("[name=salesman_employee_name]").setValue(selectedRec.get("salesman_employee_name"));
				}else{
					plId = lastselectedRec.data.purchaseletter_id;
					f.down("[name=salesman_employee_name]").setValue(lastselectedRec.get("salesman_employee_name"));
				}
				// var selectedRec = me.getGrid().getSelectedRecord();
				// var plId = selectedRec.data.purchaseletter_id;
				var gp = me.getGridpayment();
				gp.doInit();
				var gb = me.getGridbilling();
				gb.doInit();
				// f.down("[name=salesman_employee_name]").setValue(selectedRec.get("salesman_employee_name"));
				f.setLoading("Loading kartu piutang information...");
				me.localStore.detail.load({
					params: {
						purchaseletter_id: plId
					},
					callback: function (rec, op) {
						me.attachModel(op, me.localStore.detail, false);
						var rec = me.localStore.detail.getAt(0);

						f.loadRecord(rec);
						//						console.log(rec);
						f.down("[name=total_payment]").setValue(me.tools.floatval(rec.raw.purchaseletter.total_payment));

						var ar = ['price_harga_neto', 'price_harga_bajb', 'price_harga_bbnsertifikat',
							'price_harga_bphtb', 'price_harga_jual', 'harga_admsubsidi', 'price_harga_ppntanah',
							'harga_paket_tambahan', 'harga_administrasi',
							'harga_total_jual', 'remaining_balance', 'total_payment', 'harga_salesdisc'];
						for (var x in ar) {
							me.sete(ar[x]).toMoney();
						}

						me.tools.ajax({
							params: {
								purchaseletter_id: plId
							},
							success: function (datap, modelp) {
								me.tools.wesea({
									data: datap,
									model: modelp
								}, gp).grid();
								f.setLoading("Loading billing schedule...");
								me.tools.ajax({
									params: {
										purchaseletter_id: plId
									},
									success: function (databs, modelbs) {
										me.tools.wesea({
											data: databs,
											model: modelbs
										}, gb).grid();
										f.setLoading(false);

										var totalPiutang = 0;
										for (var i = 0; i < databs.length; i++) {
											totalPiutang += me.tools.floatval(databs[i].schedule.amount);
										}
										f.down("[name=total_piutang]").setValue(totalPiutang);
										me.sete('total_piutang').toMoney();
									}
								}).read('schedule');

								// console.log(datap);
								var totalPay = 0;
								for (var i = 0; i < datap.length; i++) {
									totalPay += me.tools.floatval(datap[i].payment.total_payment);
								}
								f.down("[name=total_pembayaran]").setValue(totalPay);
								me.sete('total_pembayaran').toMoney();
							}
						}).read('paymentlist');
					}
				}
				);
			},
			create: function () {
				f.up("window").maximize(true);
			},
			update: function () {
				//me.getActiveForm().loadRecord(me.getGrid().getSelectedRecord());
				me.getActiveForm().loadRecord(me.getGrid().getSelectionModel().getLastSelected());
				f.up("window").maximize(true);
			},
			view: function () {
			},
		};
		return x;
	},
	gridKartuSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

		grid.down('#btnView').setDisabled(row.length != 1);
		grid.down('#btnExcel').setDisabled(row.length != 1);
		grid.down('#btnPrint').setDisabled(row.length != 1);
		grid.down('#btnPrintCustomer').setDisabled(row.length != 1);
		grid.down('#btnPrintV2').setDisabled(row.length != 1);
	},
	printExcel: function () {

		var me = this;
		var p = me.getPanel();
		p.setLoading("Please wait");
		var selectedRec = me.getGrid().getSelectedRecord();
		var plId = selectedRec.data.purchaseletter_id;


		Ext.Ajax.timeout = 60000 * 5;

		me.tools.ajax({
			params: {plid: plId},
			success: function (data, model) {


				p.setLoading(false);
				var url = data['others'][0][0]['URL'];
				if (url) {
					Ext.Msg.show({
						title: 'Info',
						msg: '<a href="' + url + '" target="blank">Download file</a>',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {

						}
					});
				}
			}
		}).read('excel');

	},
});