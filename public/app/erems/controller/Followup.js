Ext.define('Erems.controller.Followup', {
	extend: 'Erems.library.template.controller.Controller2',
	alias: 'controller.Followup',
	views: ['followup.Panel', 'followup.Grid', 'followup.FormSearch', 'followup.FormData'],
	requires: [
		'Erems.library.Browse',
		'Erems.library.template.component.Clustercombobox',
	],
	stores: ['Mastercluster'],
	refs: [
		{
			ref: 'panel',
			selector: 'followuppanel'
		},
		{
			ref: 'grid',
			selector: 'followupgrid'
		},
		{
			ref: 'formsearch',
			selector: 'followupformsearch'
		},
		{
			ref: 'formdata',
			selector: 'followupformdata'
		},
		{
			ref: 'gridsp',
			selector: 'followupgridsp'
		},
		{
			ref: 'formdataview',
			selector: 'followupformdataview'
		},
		{
			ref: 'formdataprint',
			selector: 'followuppreviewformdata'
		}
	],
	controllerName: 'followup',
	fieldName: 'cac_cac_name',
	bindPrefixName: 'Followup',
	localStore: {
		detail: null,
		selectedUnit: null,
		customer: null
	},
	browseHandler: null,
	cbf: null,
	mt: null,
	formWidth: 800,
	formxWinId: 'win-posisiwinId',
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
			'followuppanel': {
				afterrender: this.panelAfterRender,
				beforerender: me.mainPanelBeforeRender

			},
			'followupgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'followupgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'followupgrid toolbar button[action=update]': {
				click: function () {
					// this.formDataShow('update');
				}
			},
			'followupgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'followupgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'followupgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				printaction: function (view) {
					//me.actionColumnClickEvPrint(view);
					me.selectTemplate(view, 'printaction');
				},
				mailaction: function (view, rowIndex, colIndex, item, e, record, row) {
					//me.actionColumnClickEvMail(view);
					me.selectTemplate(view, 'mailaction');
				},
				viewaction: function (view, rowIndex, colIndex, item, e, record, row) {
					me.selectTemplate(view, 'viewaction');
				},
				smsaction: function (view, rowIndex, colIndex, item, e, record, row) {
					me.actionColumnClickEvSms(view);
				},
				rollbackaction: function (view, rowIndex, colIndex, item, e, record, row) {
					me.actionColumnClickEvRollback(view);
				},
				wordaction: function (view, rowIndex, colIndex, item, e, record, row) {
					me.selectTemplate(view, 'wordaction');
				},
			},
			'followupformsearch button[action=search]': {
				click: function () {
					this.dataSearch(false);
				}
			},
			'followupformsearch button[action=reset]': {
				click: this.dataReset
			},
			'followupformsearch': {
				afterrender: me.formSearchAfterRender
			},
			'followupformdata': {
				afterrender: this.formDataAfterRender,
				beforerender: function (el) {

				}
			},
			'followupformdata button[action=process]': {
				click: this.mainDataSave
			},
			'followupformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'followuppreviewformdata button[action=print]': {
				click: this.printSP
			},
		});

		if (typeof moment !== 'function') {


			Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/moment.min.js', function () {
			}, function () {
			});
		}
	},
	printSP: function () {
		var me = this;
		var f = me.getFormdataprint();
		var konten = f.down("#textPreviewID").html;

		var mywindow = window.open('', 'PRINT', 'height=400,width=600');

		mywindow.document.write('<html><head><title>' + document.title + '</title>');
		mywindow.document.write('</head><body >');
		//  mywindow.document.write('<h1>' + document.title + '</h1>');
		//   mywindow.document.write(document.getElementById(elem).innerHTML);
		mywindow.document.write(konten);
		mywindow.document.write('</body></html>');

		mywindow.document.close(); // necessary for IE >= 10
		mywindow.focus(); // necessary for IE >= 10

		mywindow.print();
		mywindow.close();
	},
	actionColumnClickEvRollback: function (view) {
		var me = this;
		var row = view[1];
		//console.log( me.getGrid().getStore().getAt(row));
		var p = me.getPanel();

		me.tools.ajax({
			params: {
				purchaseletter_id: me.getGrid().getStore().getAt(row).get("purchaseletter_id")
			},
			success: function (data, model) {
				var spSuratKe = data['others'][0][0]['sp_surat_ke'];
				if (spSuratKe > 0) {
					Ext.MessageBox.confirm('Rollback SP', 'Anda yakin rollback sp ke ' + (spSuratKe - 1) + ' ?', function (btn) {
						if (btn === 'yes') {
							p.setLoading("Please wait...");
							me.tools.ajax({
								params: {
									unit_id: me.getGrid().getStore().getAt(row).get("unit_unit_id"),
									sp_ke: spSuratKe - 1
								},
								success: function (data, model) {
									p.setLoading(false);
									var hasil = data['others'][0][0]['hasil'];
									if (hasil) {
										me.tools.alert.info("SP sudah di roolback.");
									} else {
										me.tools.alert.warning(data['others'][0][0]['msg']);
									}

								}
							}).read('rollbacksp');
						} else {
							//some code
						}
					});
				} else {
					me.tools.alert.warning("Unit ini belum ada sp.");
				}


			}
		}).read('rollbackinfo');


	},
	actionColumnClickEvSms: function (view) {
		var me = this;
		var p = me.getPanel();

		var row = view[1];

		p.setLoading("Loading...");
		me.tools.ajax({
			params: {
				purchaseletter_id: me.getGrid().getStore().getAt(row).get("purchaseletter_id")
			},
			success: function (data, model) {
				p.setLoading(false);
				var hasil = data['others'][0][0]['hasil'];
				if (hasil) {
					me.tools.alert.info("SMS telah terdaftar di proses sms.");
				} else {
					me.tools.alert.warning(data['others'][0][0]['msg']);
				}

			}
		}).read('sms');


	},
	actionColumnClickEvMail: function (view, directory) {
		var me = this;
		var p = me.getPanel();

		var row = view[1];

		p.setLoading("Please wait...");
		me.tools.ajax({
			params: {
				purchaseletter_id: me.getGrid().getStore().getAt(row).get("purchaseletter_id"),
				directory: directory
			},
			success: function (data, model) {
				p.setLoading(false);
				var url = data['others'][0][0]['URL'];
				if (url) {
					me.prosesTemplate(data, {
						hasilPrint: function (output) {
							me.PrintEmail(output, view);
						}
					});

					//me.PrintElem(output);
					me.getPopup({}, false);
				} else {
					me.tools.alert.warning(data['others'][0][0]['MSG']);
				}


			}
		}).read('printout');
	},
	PrintEmail: function (content, view)
	{

		var me = this;
		var p = me.getPanel();

		var row = view[1];

		Ext.Msg.show({
			title: 'Konfirmasi',
			msg: 'Anda yakin kirim email ke : ' + me.getGrid().getStore().getAt(row).get("customer_email") + '?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function (clicked) {



				if (clicked === "yes") {



					p.setLoading("Please wait...");
					me.tools.ajax({
						params: {
							purchaseletter_id: me.getGrid().getStore().getAt(row).get("purchaseletter_id"),
							content: content,
							email: me.getGrid().getStore().getAt(row).get("customer_email"),
							nama: me.getGrid().getStore().getAt(row).get("customer_name")
						},
						success: function (data, model) {
							p.setLoading(false);
							var hasil = data['others'][0][0]['hasil'];
							if (hasil) {
								me.tools.alert.info("Email telah terkirim.");
							} else {
								me.tools.alert.warning(data['others'][0][0]['msg']);
							}


						}
					}).read('email');
				}
			}
		});


		return true;
	},
	/*
	 actionColumnClickEvMail: function(view) {
	 var me = this;
	 var p = me.getPanel();
	 
	 var row = view[1];
	 
	 Ext.Msg.show({
	 title: 'Konfirmasi',
	 msg: 'Anda yakin kirim email ke : ' + me.getGrid().getStore().getAt(row).get("customer_email") + '?',
	 buttons: Ext.Msg.YESNO,
	 icon: Ext.Msg.QUESTION,
	 fn: function(clicked) {
	 
	 if (clicked === "yes") {
	 p.setLoading("Please wait...");
	 me.tools.ajax({
	 params: {
	 purchaseletter_id: me.getGrid().getStore().getAt(row).get("purchaseletter_id"),
	 email: me.getGrid().getStore().getAt(row).get("customer_email"),
	 nama: me.getGrid().getStore().getAt(row).get("customer_name")
	 },
	 success: function(data, model) {
	 p.setLoading(false);
	 var hasil = data['others'][0][0]['hasil'];
	 if (hasil) {
	 me.tools.alert.info("Email telah terkirim.");
	 } else {
	 me.tools.alert.warning(data['others'][0][0]['msg']);
	 }
	 
	 
	 }
	 }).read('email');
	 }
	 }
	 });
	 
	 
	 },
	 */
	actionColumnClickEvView: function (view, directory) {
		var me = this;
		var w = me.instantWindow('FormDataView', 700, 'View Detail', 'viewdetail', 'myFollowupDetailWindow');
		var row = view[1];
		var f = me.getFormdataview();
		var fp = me.getFormdataprint();
		var p = me.getPanel();
		f.setLoading("Loading...");

		me.tools.ajax({
			params: {
				purchaseletter_id: me.getGrid().getStore().getAt(row).get("purchaseletter_id"),
				directory: directory
			},
			success: function (data, model) {
				var url = data['others'][0][0]['URL'];
				if (url) {
					me.prosesTemplate(data, {
						hasilPrint: function (output) {
							f.down("[name=print_preview]").update(output);
						}
					});
					me.getPopup({}, false);
				} else {
					me.tools.alert.warning(data['others'][0][0]['MSG']);
				}
			}
		}).read('printoutpreview'); //tanpa trigger sp_ke

		me.tools.ajax({
			params: {
				purchaseletter_id: me.getGrid().getStore().getAt(row).get("purchaseletter_id")
			},
			success: function (data, model) {
				f.setLoading(false);
				p.setLoading(false);
				var info = data.others[0][0]['data'];
				for (var i in info) {
					var el = f.down("[name=" + i + "]");
					if (el) {

						el.setValue(info[i]);
					}
				}
				f.down("[name=total_bayar]").setValue(accounting.formatMoney(f.down("[name=total_bayar]").getValue()));
				f.down("[name=harga_total_jual]").setValue(accounting.formatMoney(f.down("[name=harga_total_jual]").getValue()));
				f.down("[name=dp]").setValue(accounting.formatMoney(f.down("[name=dp]").getValue()));
			}
		}).read('viewdetail');
	},
	prosesTemplate: function (data, callback) {
		var content = "Content";

		var view = data['others'][0][0]['DATA'];
		var tagihan = data['others'][0][0]['DATASCH'];
		var tagihanTable = data['others'][0][0]['TAGIHAN_TABLE'];
		tagihan = tagihan[0];

		var tagihanString = "";

		//add by imaam 2019-03-25
		var pageBreak = "";
		var pageBreak2 = "";
		var pageBreak3 = "";
		var paramBreak = "<div style='page-break-before:always;'></div>";
		var pageHeader = "<br/><br/><br/><br/><br/><br/><br/><br/>";

		if (tagihanTable.length < 3) {
			tagihanString = "<table>";
			tagihanString += "<tr style='background-color: #e8e9ea;font-weight: bold;'><td>Tagihan</td><td>Tanggal Jatuh Tempo</td><td>Nilai Tagihan</td><td>Keterlambatan (hari) </td><td>Nomor SP - Tanggal SP</td><td>Denda Keterlambatan ( Sampai hari ini )*</td></tr>";
			if (tagihan.length > 0) {
//                remark by imaam 2019-03-26
//                for (var i in tagihan) {
//                    tagihanString += "<tr><td>" + tagihan[i]['scheduletype'] + "</td><td>" + moment(tagihan[i]['duedate'], "YYYY-MM-DD hh:mm:ss").format("DD-MM-YYYY") + "</td><td>Rp. " + accounting.formatMoney(tagihan[i]['remaining_balance']) + "</td><td>" + tagihan[i]['hari_terlambat'] + "</td><td>" + tagihan[i]['sp_no'] + " - " + moment(tagihan[i]['tanggal_sp'], "YYYY-MM-DD hh:mm:ss").format("DD-MM-YYYY") + "</td><td>Rp. " + accounting.formatMoney(tagihan[i]['denda_terlambat']) + "</td></tr>";
//                }
				//add by imaam 2019-03-26
				if (tagihan.length < 5) {
					for (var i = 0; i in tagihan && i < 5; i++) {
						tagihanString += "<tr><td>" + tagihan[i]['scheduletype'] + "</td><td>" + moment(tagihan[i]['duedate'], "YYYY-MM-DD hh:mm:ss").format("DD-MM-YYYY") + "</td><td>Rp. " + accounting.formatMoney(tagihan[i]['remaining_balance']) + "</td><td>" + tagihan[i]['hari_terlambat'] + "</td><td>" + tagihan[i]['sp_no'] + " - " + moment(tagihan[i]['tanggal_sp'], "YYYY-MM-DD hh:mm:ss").format("DD-MM-YYYY") + "</td><td>Rp. " + accounting.formatMoney(tagihan[i]['denda_terlambat']) + "</td></tr>";
					}
					pageBreak = "";
					pageBreak2 = "";
					pageBreak3 = "";
				} else if (tagihan.length < 10) {
					for (var i = 0; i in tagihan && i < 10; i++) {
						tagihanString += "<tr><td>" + tagihan[i]['scheduletype'] + "</td><td>" + moment(tagihan[i]['duedate'], "YYYY-MM-DD hh:mm:ss").format("DD-MM-YYYY") + "</td><td>Rp. " + accounting.formatMoney(tagihan[i]['remaining_balance']) + "</td><td>" + tagihan[i]['hari_terlambat'] + "</td><td>" + tagihan[i]['sp_no'] + " - " + moment(tagihan[i]['tanggal_sp'], "YYYY-MM-DD hh:mm:ss").format("DD-MM-YYYY") + "</td><td>Rp. " + accounting.formatMoney(tagihan[i]['denda_terlambat']) + "</td></tr>";
					}
					pageBreak = "";
					pageBreak2 = paramBreak + pageHeader;
					pageBreak3 = "";
				} else {
					for (var i = 0; i in tagihan; i++) {
						tagihanString += "<tr><td>" + tagihan[i]['scheduletype'] + "</td><td>" + moment(tagihan[i]['duedate'], "YYYY-MM-DD hh:mm:ss").format("DD-MM-YYYY") + "</td><td>Rp. " + accounting.formatMoney(tagihan[i]['remaining_balance']) + "</td><td>" + tagihan[i]['hari_terlambat'] + "</td><td>" + tagihan[i]['sp_no'] + " - " + moment(tagihan[i]['tanggal_sp'], "YYYY-MM-DD hh:mm:ss").format("DD-MM-YYYY") + "</td><td>Rp. " + accounting.formatMoney(tagihan[i]['denda_terlambat']) + "</td></tr>";
					}
					pageBreak = "";
					pageBreak2 = "";
					pageBreak3 = paramBreak + pageHeader;
				}
			}
			tagihanString += "</table>";

		} else {
			tagihanString = tagihanTable;
		}


		view["pageBreak"] = pageBreak;
		view["pageBreak2"] = pageBreak2;
		view["pageBreak3"] = pageBreak3;
		view["list_tagihan"] = tagihanString;

		//  console.log(data);

		var htmlTemplate = data["others"][0][0]["HTML_TEMPLATE"];

		if (htmlTemplate !== null) {
			if (htmlTemplate.length < 3) {
				$.get(document.URL + 'app/erems/uploads/html/' + data['others'][0][0]['TPLFILE'], function (datatpl) {

					var output = Mustache.render(datatpl, view);

					callback.hasilPrint(output);
					//me.PrintElem(output);
				});
			} else {
				// console.log(htmlTemplate);
				//  console.log(view);
				console.log("Template :" + htmlTemplate + " tidak valid ");
				var output = Mustache.render(htmlTemplate, view);
				callback.hasilPrint(output);
				//  this.tools.alert.error("Template :"+htmlTemplate+" tidak valid ");

			}
		} else {
			this.tools.alert.error("Template is Null");
		}


	},

	/* Modfied by - David */
	actionColumnClickEvPrint: function (view, directory) {
		var me = this;
		var p = me.getPanel();

		var row = view[1];

		p.setLoading("Please wait...");
		me.tools.ajax({
			params: {
				purchaseletter_id: me.getGrid().getStore().getAt(row).get("purchaseletter_id"),
				directory: directory
			},
			success: function (data, model) {
				p.setLoading(false);
				var url = data['others'][0][0]['URL'];
				if (url) {
					me.prosesTemplate(data, {
						hasilPrint: function (output) {
							me.PrintElem(output);
						}
					});

					//me.PrintElem(output);
					me.getPopup({}, false);
				} else {
					me.tools.alert.warning(data['others'][0][0]['MSG']);
				}


			}
		}).read('printout');
	},

	actionColumnClickEvWord: function (view, directory) {

		var me = this;
		var p = me.getPanel();

		var row = view[1];

		p.setLoading("Please wait...");
		me.tools.ajax({
			params: {
				purchaseletter_id: me.getGrid().getStore().getAt(row).get("purchaseletter_id"),
				is_word: 1,
				directory: directory
			},
			success: function (data, model) {
				p.setLoading(false);
				var url = data['others'][0][0]['URL'];
				if (url) {
					me.prosesTemplate(data, {
						hasilPrint: function (output) {
							me.PrintElem(output);
						}
					});

					//me.PrintElem(output);
					me.getPopup({}, false);
				} else {
					me.tools.alert.warning(data['others'][0][0]['MSG']);
				}


			}
		}).read('printoutpreview');
	},
	/*
	 PrintElem: function(content)
	 {
	 var me = this;
	 var w = me.instantWindow('PreviewFormData', 700, 'View Print', 'viewprint', 'myFollowupPrintWindow');
	 var f = me.getFormdataprint();
	 f.down("#textPreviewID").update(content);
	 
	 return true;
	 },
	 */
	// mark on 20170721
	PrintElem: function (content)
	{





		var mywindow = window.open('', 'PRINT', 'height=400,width=600');

		mywindow.document.write('<html><head><title>' + document.title + '</title>');
		mywindow.document.write('</head><body >');
		//  mywindow.document.write('<h1>' + document.title + '</h1>');
		//   mywindow.document.write(document.getElementById(elem).innerHTML);
		mywindow.document.write(content);
		mywindow.document.write('</body></html>');

		mywindow.document.close(); // necessary for IE >= 10
		mywindow.focus(); // necessary for IE >= 10

		//  mywindow.print();
		// mywindow.close();

		return true;
	},

	gridSelectionChange: function () {
		var me = this;
		var gd = me.getGridsp();
		var rec = me.getGrid().getSelectedRecord();
		if (!rec) {
			return false;
		}
		var p = me.getPanel();
		p.setLoading("Please wait...");
		gd.getStore().load({
			params: {
				purchaseletter_id: rec.get("purchaseletter_id")
						//state:"load_default_attribute"
			},
			callback: function (rec, op) {
				gd.attachModel(op);
				p.setLoading(false);
				me.jqueryBinding();
			}
		});
		gd.getStore().reload();
		me.jqueryBinding();
	},
	dataSearch: function (reset) {
		var me = this;
		var form = me.getFormsearch().getForm();
		var fields = me.getFormsearch().getValues();
		me.getGrid().doInit();
		var store = me.getGrid().getStore();

		if (reset) {
			fields.cluster_id = '';
		}

		for (var x in fields) {
			store.getProxy().setExtraParam(x, fields[x]);
		}
		//   store.getProxy().setExtraParam("smscategory_id", me.getFormsearch().down("[name=smscategory_id]").getValue());
		me.loadPage(store);
	},
	dataReset: function () {
		var me = this;

		me.getFormsearch().getForm().reset();
		me.dataSearch(true);
	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);
		var me = this;
		var f = me.getFormsearch();
		me.getPanel().up("window").maximize(true);
		me.getFormsearch().toggleCollapse(true);
		me.tools.ajax({
			params: {},
			success: function (data, model) {


				//  f.setLoading(false);
				me.tools.wesea(data.smscategory, f.down("[name=smscategory_id]")).comboBox();
				//  me.tools.wesea(data.bank, f.down("[name=bank_bank_id]")).comboBox();

				Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () {




				}, function () {
					//  me.tools.alert.warning("Error load Prolibs.js file.");
				});

			}
		}).read('processinit');

		var gd = me.getGridsp();
		gd.doInit();

		me.tools.ajax({
			params: {},
			success: function (data) {
				if (data.others[0][0].STATUS == 1) {
					for (i = 1; i < gd.getView().getGridColumns().length; i++) {
						gd.getView().getGridColumns()[i].setVisible(true);
					}
					me.jqueryBinding();
				}

			}
		}).read('isSh1Features');

		me.tools.ajax({
			params: {
			},
			success: function (data, model) {
				me.USEEXPORTWORD = data['others'][0][0]['USEEXPORTWORD'];
				if (me.USEEXPORTWORD === 1) {

				}
			}
		}).read('detail');
	},
	fdar: function () {
		var me = this;
		return me.altFdar(me);
	},
	mainDataSave: function () {
		var me = this;
		var f = me.getFormdata();
		f.setLoading("Sedang memproses...");
		me.tools.ajax({
			params: {
				proses_date: f.down("[name=proses_date]").getValue(),
				periode_start: f.down("[name=periode_start]").getValue(),
				periode_end: f.down("[name=periode_end]").getValue()
			},
			success: function (data, model) {
				console.log(data);
				if (data.others[0][0]['HASIL']) {
					f.up("window").close();
					me.getGrid().getStore().loadPage(1);
				} else {
					me.tools.alert.warning(data.others[0][0]['MSG']);
				}
				f.setLoading(false);
			}
		}).read('followup');
		//  me.tools.iNeedYou(me).save();
	},
	altFdar: function (controller) {
		var me = this;
		var f = controller.getFormdata();
		//
		var x = {
			init: function () {

				controller.setActiveForm(f);
			},
			create: function () {
				var that = this;
				f.editedRow = -1;
			},
			update: function () {
				var that = this;
				f.down("button[action=process]").hide();
				console.log(f.down("button[action=process]"));
				var g = me.getGrid();
				var rec = g.getSelectedRecord();
				if (!rec) {
					me.tools.alert.warning("Tidak ada record terpilih.");
					return;
				}

				//console.log(rec);
				f.down("[name=proses_date]").hide();
				f.down("[name=periode_start]").hide();
				f.down("[name=periode_end]").hide();
				var gd = me.getGriddetail();
				gd.doInit();
				var gn = me.getGridnomor();
				gn.doInit();
				gd.getStore().load({
					params: {
						followup_id: rec.get("followup_id")
					},
					callback: function (rec, op) {
						gd.attachModel(op);
					}
				});
				//  f.editedRow = controller.getGrid().getSelectedRow();

			}

		};
		return x;
	},

	/* David - MIS */
	selectTemplate: function (view, mode) {
		var me = this;
		var p = me.getPanel();
		var row = view[1];
		var popup;

		p.setLoading("Please wait...");

		me.tools.ajax({
			params: {},
			success: function (data, model) {
				p.setLoading(false);
				var tpl = data['others'][0][0];
				var i = 0;
				var obj = [];
				var prev = {};
				var templateValue;
				if (tpl) {
					var tplobjects = tpl.forEach(function (data) {
						prev = {
							xtype: 'checkboxfield',
							inputValue: data.value,
							boxLabel: data.text.replace(/\s/g, ''),
							name: data.text.replace(/\s/g, ''),
							inputValue: data.text,
							checked: false,
							value: false,
							handler: function () {
								p.setLoading("Please wait...");
								templateValue = data.value;
								if (mode == 'printaction') {
									me.actionColumnClickEvPrint(view, data.value);
								} else if (mode == 'mailaction') {
									me.actionColumnClickEvMail(view, data.value);
								} else if (mode == 'viewaction') {
									me.actionColumnClickEvView(view, data.value);
								} else if (mode == 'wordaction') {
									me.actionColumnClickEvWord(view, data.value);
								}
							}
						};
						obj[i] = prev;
						i++;
					});
					if (obj.length > 1) {
						me.getPopup(obj, true);
					} else {
						p.setLoading("Please wait...");
						if (mode == 'printaction') {
							me.actionColumnClickEvPrint(view, templateValue);
						} else if (mode == 'mailaction') {
							me.actionColumnClickEvMail(view, templateValue);
						} else if (mode == 'viewaction') {
							me.actionColumnClickEvView(view, templateValue);
						} else if (mode == 'wordaction') {
							me.actionColumnClickEvWord(view, templateValue);
						}
					}

				} else {
					me.tools.alert.warning(data['others'][0][0]['MSG']);
				}

			}
		}).read('printouttemplate');
	},
	getPopup: function (obj, show) {
		if (show) {
			var popup = Ext.create('Ext.window.Window', {
				xtype: 'container',
				itemId: 'templatePopup',
				title: 'Pilih Template',
				width: 300,
				items: obj,
			});
			Ext.ComponentQuery.query('#templatePopup')[0].show();
		} else {
			if(typeof Ext.ComponentQuery.query('#templatePopup')[0] != 'undefined'){
				Ext.ComponentQuery.query('#templatePopup')[0].destroy();
			}
		}
	},
	jqueryBinding: function () {
		var me = this;

		//inlineEdit
		me.datefieldInlineEdit('sp1_userdate');
		me.datefieldInlineEdit('sp2_userdate');
		me.datefieldInlineEdit('sp3_userdate');
		me.datefieldInlineEdit('sp4_userdate');
	},
	datefieldInlineEdit: function (name) {
		var me = this;

		$("input[name='" + name + "']").change(function (event) {
			val = $(this).val();

			if ((new Date(val) == "Invalid Date") && isNaN(new Date(val))) {
				var p = me.getPanel();
				p.setLoading(false);
				return 0;
			}

			unit_id = $(this).attr('data');
			var p = me.getPanel();
			p.setLoading("Please wait");
			me.tools.ajax({
				params: {id: unit_id, collumn: name, value: val},
				success: function (data) {
					p.setLoading("Success.");
					setTimeout(function () {
						p.setLoading(false)
					}, 2000);
				}
			}).read('inlineEdit');
		});
	}
	/* David - MIS */

});