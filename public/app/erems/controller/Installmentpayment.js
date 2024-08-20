Ext.define('Erems.controller.Installmentpayment', {
	extend   : 'Erems.library.template.controller.Controller2',
	alias    : 'controller.Installmentpayment',
	requires : ['Erems.library.XyReport', 'Erems.library.Browse'],
	views    : ['installmentpayment.Panel', 'installmentpayment.Grid', 'installmentpayment.FormSearch', 'installmentpayment.FormData', 'installmentpayment.PaymentDetailGrid', 'masterreport.Panel', 'installmentpayment.UnitGrid'],
	refs     : [
		{ ref : 'grid', selector : 'installmentpaymentgrid' },
		{ ref : 'unitgrid', selector : 'installmentpaymentunitgrid' },
		{ ref : 'formsearch', selector : 'installmentpaymentformsearch' },
		{ ref : 'formdata', selector : 'installmentpaymentformdata' },
		{ ref : 'tagihangrid', selector : 'installmentpaymentpaymentdetailgrid' },
		{ ref : 'panel', selector : 'installmentpaymentpanel' },
		{ ref : 'forminvi', selector : 'installmentpaymentformdatainvisible' },
		{ ref : 'formdos', selector : 'installmentpaymentdospreviewformdata' },
		{ ref : 'formprintout', selector : 'installmentpaymentformprintout' },
		{ ref : 'formtpleditor', selector : 'installmentpaymentformtpleditor' },
		{ ref : 'formtandatangan', selector : 'installmentpaymentformtandatangan' }
	],
	controllerName : 'installmentpayment',
	fieldName      : 'payment_id',
	formWidth      : 800,
	fillForm       : null,
	browseHandler  : null,
	storeProcess   : 'Installmentpaymentdetail',
	sumTagihan     : 0,
	state          : 0,
	bindPrefixName : 'Installmentpayment',
	localStore     : {
		selectedUnit : null,
		customer     : null,
		price        : null,
		detail       : null,
		defaultUnit  : null
	},
	tagihanDefaultValue : false,
	tools               : null,
	myConfig            : null,
	cbf                 : null,
	mt                  : null,
	stList              : null, // list of schedule type
	effectedSch         : [], // list schedule id yang dibayar
	formxWinId          : 'win-instalpaymentwinId',
	myParams            : null,
	templateStimulsoft  : null,
	constructor         : function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});
		me.cbf = new Erems.template.ComboBoxFields();
	},
	xyReport                : null,
	printOutData            : null,
	globalParams            : null,
	globalParamsForm        : null,
	buktiPenerimaanFilename : null,
	reportFileView          : null,
	selectedPurchaseletter  : null,
	printpdfOptions         : [],
	printdosOptions         : [],
	ttdKwitansi             : [],
	checkCanSPTDraft        : false,
	counterkwitansi         : 0,
	groupuser               : false,
	paymentId               : 0,
	plisdraft               : 0,
	isDraft                 : 0,
	isDraftpy               : 0,
	paymentDendaFrom        : '',
	fileprintmrt            : '',
	show_revenuesharing     : '',
	info                    : {
		window : {
			title : 'Browse Data',
			state : 'view',
			id    : 'browseDataWindow'
		}
	},
	init: function (application) {
		var me = this;

		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});

		if (typeof ApliJs === "undefined") {
			Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js', function () {
				//console.log("[INFO] ApliJs loaded.");
			}, function () {
				// error load file
			});
		}

		this.control({
			'installmentpaymentpanel' : {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : this.panelAfterRender
			},
			'installmentpaymentgrid': {
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
			'installmentpaymentgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'installmentpaymentgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'installmentpaymentgrid toolbar button[action=view]': {
				click: function () {
					this.formDataShow('view');
				}
			},
			'installmentpaymentgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'installmentpaymentgrid toolbar button[action=print]': {
				click: this.mainPrint
			},
			'installmentpaymentgrid toolbar button[action=printbuktipenerimaan]': {
				click: function () {
					me.processReportBuktiPenerimaan();
				}
			},
			'installmentpaymentgrid actioncolumn': {
				afterrender : this.gridActionColumnAfterRender,
				click       : this.gridActionColumnClick
			},
			'installmentpaymentformsearch button[action=search]': {
				click: this.dataSearch
			},
			'installmentpaymentformsearch button[action=reset]': {
				click: this.dataReset2
			},
			'installmentpaymentformdata': {
				afterrender: this.formDataAfterRender
			},
			'installmentpaymentformdata button[action=save]': {
				click: this.mainDataSave
			},
			'installmentpaymentformdata button[action=saveDraft]': {
				click: this.mainDataSaveDraft
			},
			'installmentpaymentformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'installmentpaymentformdata button[action=fullpayment]': {
				click: function () {
					me.fullPayment();
				}
			},
			'installmentpaymentformdata button[action=browse_unit]': {
				click: me.selectUnitGridShow
			},
			'installmentpaymentformdata textfield[name=admin_fee]': {
				keyup: function () {
					me.hitungTotalPayment();
				}
			},
			'installmentpaymentformdata textfield[name=receipt_no]': {
				keyup: function () {
					me.receiptNoOnKeyUp();
				}
			},
			'installmentpaymentformdata datefield[name=payment_date]': {
				select: function () {
					me.paymentDateOnChange();
				}
			},
			'installmentpaymentformdata datefield[name=cair_date]': {
				select: function () {
					me.paymentCairDateOnChange();
				}
			},
			'installmentpaymentformdata [name=paymentmethod_paymentmethod_id]': {
				select: function () {
					me.paymentmethodOnChange();
				}
			},
			'installmentpaymentformdata [name=payment]': {
				blur: function (el) {
					me.paymentTextFieldOnBlur();
				}
			},
			'installmentpaymentformdata [name=adm_fee]': {
				keyup: me.hitungTotalPayment
			},
			'installmentpaymentformdata [name=is_reference_rejected]': {
				change: me.checkReference
			},
			'installmentpaymentformdata [name=cdn]': {
				change: function () {
					me.paymentTextFieldOnBlur();
				}
			},
			'installmentpaymentunitgrid button[action=select]': {
				click: this.unitSelect
			},
			'installmentpaymentunitgrid': {
				selectionchange: function (el) {
					this.gridPaymentSelectionChange(el);
				}
			},
			'#MySuperBrowseWindow button[action=reset]': {
			},
			'installmentpaymentgrid button[action=printx]': {
				click: this.showPdf
			},
			'installmentpaymentgrid button[action=printvoucher]': {
				click: this.showVoucherPdf
			},
			'installmentpaymentformdata [name=reference_no]': {
				blur: function () {
					me.generateNote();
				}

			},
			'installmentpaymentgrid button[action=fontselect]': {
				click: this.showFontPdf
			},
			'installmentpaymentgrid button[action=printtemplate]': {
				click: function () {
					me.processPrintTemplate();
				}
			},
			'installmentpaymentgrid button[action=printhtml]': {
				click: this.showPrintHtml
			},
			'installmentpaymentgrid button[action=printdos]': {
				click: this.showPrintDosPreview
			},
			'installmentpaymentdospreviewformdata button[action=print]': {
				click: this.printDos
			},
			'installmentpaymentformsearch [name=cluster_id]': {
				select: function () {
					me.searchClusterOnSelect();
				}
			},
			'installmentpaymentformsearch [name=cbf_payment_date]': {
				change: me.checkboxChangePaymentDate				
			},
			'installmentpaymentformsearch [name=payment_startdate]': {
				change: me.changePaymentDate
			},
			'installmentpaymentformsearch [name=payment_enddate]': {
				change: me.changePaymentDate
			},
			'installmentpaymentformsearch [name=cbf_cair_date]': {
				change: me.checkboxChangeCairDate
			},
			'installmentpaymentformsearch [name=cair_startdate]': {
				change: me.changeCairDate
			},
			'installmentpaymentformsearch [name=cair_enddate]': {
				change: me.changeCairDate
			},
			'installmentpaymentformprintout button[action=print]': {
				click: this.insPayPrintPdfByTpl
			},
			'installmentpaymentgrid button[action=tpleditor]': {
				click: this.inpayKwTplEditor
			},
			'installmentpaymentformtandatangan button[action=print]': {
				click: this.inpayTandaTanganPrint
			},
			'installmentpaymentgrid button[action=printmodel2]': {
				click: function () {
					me.processReport2();
				}
			},
		});
	},
	inpayTandaTanganPrint: function () {
		var me = this;
		var ttd = me.getFormtandatangan().down("[name=template_name]").getValue();
		me.inpayFinalShowPdf({ ttd : ttd.template });
	},
	inpayKwTplEditor: function () {
		var me = this;
		var viewParams = { stringUnik : 'APLIKWITEDSTRINGUNIK_' };

		ApliKwitansiEditorJs.stringUnik     = 'APLIKWITEDSTRINGUNIK_';
		ApliKwitansiEditorJs.controllerName = me.controllerName;
		ApliKwitansiEditorJs.showHtml('FormTplEditor', viewParams);
	},
	searchClusterOnSelect: function () {
		var me        = this;
		var f         = me.getFormsearch();
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
	printDos: function () {
		var me  = this;
		var f   = me.getFormdos();
		var url = f.down("[name=url]").getValue();

		var modelPrint = f.down("#modelSelectId").getValue();
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
					xtype      : 'radiofield',
					boxLabel   : me.printdosOptions[i].text,
					name       : 'template',
					inputValue : me.printdosOptions[i].value,
					checked    : me.printdosOptions[i].selected
				});
			}
		} else {
			me.inpayShowPrintDosPreview({option: 0});
		}
	},

	inpayShowPrintDosPreview: function (params) {
		var me = this;
		var recs = me.getGrid().getSelectionModel().getSelection();

		if (recs.length == 0) {
			return;
		}

		var ids = "";
		for (var i in recs) {
			ids += recs[i].get("payment_id") + "~";
		}


		var w = me.instantWindow('DosPreviewFormData', 700, 'Print Preview', 'print', 'myDowPreviewWindow');
		var f = me.getFormdos();
		f.setLoading("Please wait...");
		me.tools.ajax({
			params: {
				payment_id : ids,
				option     : params.option
			},
			success: function (data, model) {
				f.setLoading(false);
				var text = data['others'][0][0]['PREVIEW'];
				f.down("[name=url]").setValue(data['others'][0][0]['URL']);
				f.down("#textDosPreviewID").update(text);
				if (data['others'][0][0]['MODELPRINT'] > 1) {
					f.down("#modelSelectId").show();
				}
			}
		}).read('printdos');
	},
	showPrintDos: function () {
		var me   = this;
		var p    = me.getPanel();
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
			params  : { payment_id : ids },
			success : function (data, model) {
				p.setLoading(false);
				var url = data['others'][0][0]['URL'];
				if (url) {
					window.open(url);
				}
			}
		}).read('printdos');
	},
	showPrintHtml: function () {
		var me = this;

		var data = {
			customer  : 'NAMA CUSTOMER',
			terbilang : 'CONTOH TERBILANG',
			note      : 'TEST NOTE',
			amount    : '',
		};

		var  html = '<table>' +
						'<tr>' +
							'<td>&nbsp;</td>' +
							'<td colspan="2" height="115">&nbsp;</td>' +
						'</tr>' +
						'<tr>' +
							'<td width="150">&nbsp;</td>' +
							'<td colspan="2" height="55" width="300">' + data['customer'] + '</td>' +
						'</tr>' +
						'<tr>' +
							'<td width="150">&nbsp;</td>' +
							'<td colspan="2" height="50"  width="400">' + data['terbilang'] + '</td>' +
						'</tr>' + 
						'<tr>' +
							'<td width="150">&nbsp;</td>' +
							'<td colspan="2" height="80" width="400">' + data['note'] + '</td>' +
						'</tr>' + 
						'<tr>' +
							'<td width="80">&nbsp;</td>' +
							'<td width="380" height="43">' + data['amount'] + '</td>' +
							'<td>' + data['date'] + '</td>' +
						'</tr>' +
					'</table>';

		var mywindow = window.open('', 'PRINT', 'height=400,width=600');

		mywindow.document.write('<html><head><title>Print Kwitansi</title>');
		mywindow.document.write('</head><body >');
		mywindow.document.write(html);
		mywindow.document.write('</body></html>');
		mywindow.document.close(); // necessary for IE >= 10
		mywindow.focus(); // necessary for IE >= 10*/
		setTimeout(window.close, 10);
	},
	showFontPdf: function () {
		var me = this;
		var p = me.getPanel();

		p.setLoading("Please wait..");

		me.tools.ajax({
			params  : {},
			success : function (data, model) {
				p.setLoading(false);
				var url = data['others'][0][0]['URL'];
				if (url) {
					window.open(url);
				}
			}
		}).read('fontpdf');
	},
	paymentCairDateOnChange: function () {
		var me = this;
		me.paymentTextFieldOnBlur();
	},
	directPrint: function () {
		var me = this;
		var p = me.getPanel();

		var rec = me.getGrid().getSelectedRecord();
		if (!rec) {
			return false;
		}

		var myWindow = window.open('', '', 'width=400,height=200');
		myWindow.document.write("<a href='" + document.URL + "app/erems/uploads/pdf/kwitansipayment/payment_1_1.pdf' target='blank'>Download file</a>");
		myWindow.focus();

		return true;

		p.setLoading("Please wait..");
		me.tools.ajax({
			params  : { payment_id : rec.get('payment_id') },
			success : function (data, model) {
				p.setLoading(false);
			}
		}).read('printpdf');
	},
	showPdfOld: function () {
		var me = this;
		var p = me.getPanel();
		p.setLoading("Please wait..");
		var rec = me.getGrid().getSelectedRecord();
		if (!rec) {
			return false;
		}

		me.tools.ajax({
			params  : { payment_id : rec.get('payment_id') },
			success : function (data, model) {
				p.setLoading(false);
				var url = data['others'][0][0]['URL'];
				var display = data['others'][0][0]['DISPLAY'];
				if (url) {

					var myWindow = window.open('', '', 'width=600,height=300');
					var html = "<div style='margin-bottom:10px;border:1px solid black;'>" + display['name'] + "</div>" + 
							"<div style='margin-bottom:10px;border:1px solid black;'>";
					for (var i in display['terbilang']) {
						html += "<div>" + display['terbilang'][i] + "</div>";
					}
					html += "</div>" + 
							"<div style='margin-bottom:10px;border:1px solid black;'>";
					for (var i in display['note']) {
						html += "<div >" + display['note'][i] + "</div>";
					}
					html += "</div>" + 
							"<div style='margin-bottom:10px;border:1px solid black;'>" + display['amount'] + "</div>" +
							"<div style='margin-bottom:10px;border:1px solid black;'>" + display['date'] + "</div>";
					myWindow.document.write("<a href='" + url + "' target='blank'>Download file</a><br/>" + html);
					myWindow.focus();
				}
			}
		}).read('printpdf');
	},
	showVoucherPdf: function () {
		var me   = this;
		var p    = me.getPanel();
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
			params  : { payment_id : ids },
			success : function (data, model) {
				p.setLoading(false);
				var url = data['others'][0][0]['URL'];
				if (url) {
					window.open(url);
				}
			}
		}).read('printvoucherpdf');
	},
	showPdf: function () {
		var me   = this;
		var p    = me.getPanel();
		var recs = me.getGrid().getSelectionModel().getSelection();

		if (recs.length == 0) {
			return;
		}

		if (me.printpdfOptions.length > 0) {
			var w = me.instantWindow('FormPrintout', 400, 'Select template', 'print', 'inspayPrintSeletWindow');
			var el = me.getFormprintout().down("[name=template_name]");

			for (var i in me.printpdfOptions) {
				el.add({
					xtype      : 'radiofield',
					boxLabel   : me.printpdfOptions[i].text,
					name       : 'template',
					inputValue : me.printpdfOptions[i].value,
					checked    : me.printpdfOptions[i].selected
				});
			}
		} else {
			var ttd = me.ttdKwitansi;

			if (ttd.length > 0) {
				me.inpayShowTTDKwitansiWindow(ttd);
			} else {
				me.inpayFinalShowPdf();
			}
		}
	},
	gridSelectionChange: function () {
		var me   	 = this,
			grid     = me.getGrid(),
			row      = grid.getSelectionModel().getSelection(),
			is_lunas = 0;

		if (row.length > 0) {
			is_lunas = row[0].data.purchaseletter_is_lunas;
		}

		grid.down('#btnEdit').setDisabled(row.length != 1 && is_lunas == 1);
		grid.down('#btnDelete').setDisabled(row.length != 1);
		grid.down('#btnEdit').setDisabled(row.length != 1);
		grid.down('#btnView').setDisabled(row.length != 1);
		grid.down('#btnPrint').setDisabled(row.length != 1);
		grid.down('[action=printx]').setDisabled(row.length != 1);
		grid.down('[action=printvoucher]').setDisabled(row.length != 1);
		grid.down('[action=fontselect]').setDisabled(row.length != 1);
		grid.down('[action=printdos]').setDisabled(row.length != 1);
		grid.down('[action=printbuktipenerimaan]').setDisabled(row.length != 1);
		grid.down('[action=printtemplate]').setDisabled(row.length != 1);
		grid.down('[action=tpleditor]').setDisabled(row.length != 1);
		grid.down('[action=printmodel2]').setDisabled(row.length == 0);
	},
	gridPaymentSelectionChange: function (el) {
		var me 	 = this,
			grid = me.getUnitgrid(),
			row  = grid.getSelectionModel().getSelection();

		if (row.length > 1 || row.length <= 0) {
			grid.down('#selectUnit').setDisabled(true);
			if (row.length > 1) {
				row[0].setValue(false);
			}
		} else {
			grid.down('#selectUnit').setDisabled(false);
		}
	},
	insPayPrintPdfByTpl: function () {
		var me = this;
		var option = me.getFormprintout().down("[name=template_name]").getValue();
		me.getFormprintout().up("window").close();

		if (me.getFormprintout().down("[name=mode]").getValue() === "dos") {
			me.inpayShowPrintDosPreview({ option : option });
		} else {
			me.inpayFinalShowPdf({ option: option });
		}
	},
	inpayShowTTDKwitansiWindow: function (params) {
		var me = this,
			el = me.getFormtandatangan().down("[name=template_name]");

		me.instantWindow('FormTandaTangan', 500, 'Select Penanda Tangan Kwitansi', "mysuperstate", 'myPrintoutINSPAYWindow');

		for (var i in params) {
			el.add({
				xtype      : 'radiofield',
				boxLabel   : params[i].text,
				name       : 'template',
				inputValue : params[i].value,
				checked    : i == 0 ? true : false
			});
		}
	},
	inpayFinalShowPdf: function (printParams) {
		var me 	 = this,
			p    = me.getPanel(),
			recs = me.getGrid().getSelectionModel().getSelection();

		if (recs.length == 0) {
			return;
		}
		var ids = "";

		for (var i in recs) {
			ids += recs[i].get("payment_id") + "~";
		}

		var option = 0;
		var ttd    = 0;
		if (typeof printParams !== 'undefined') {
			option = printParams["option"];
			ttd    = printParams["ttd"];
		}

		p.setLoading("Please wait..");
		me.tools.ajax({
			params : {
				payment_id : ids,
				option     : option,
				ttd        : ttd
			},
			success : function (data, model) {
				p.setLoading(false);
				var url = data['others'][0][0]['URL'];
				if (url) {
					window.open(url);
				}
			}
		}).read('printpdf');
	},
	receiptNoOnKeyUp: function () {
		var me = this,
			f  = me.getFormdata();
		f.down("[name=payment_no]").setValue(f.down("[name=receipt_no]").getValue());
	},
	paymentDateOnChange: function () {
		var me = this,
			f  = me.getFormdata(),
			v  = f.down("[name=payment_date]").getValue();

		f.down("[name=duedate]").setValue(v);
		f.down("[name=cair_date]").setValue(v);
		me.paymentTextFieldOnBlur();
	},
	tempTagihan : null,
	fullPayment : function () {
		var me = this,
			f  = me.getFormdata(), 
			s  = me.getTagihangrid().getStore();

		if (!me.tempTagihan) {
			me.tempTagihan = {};
			for (var i = 0; i < s.getCount(); i++) {
				me.tempTagihan[i] = s.getAt(i).data;
			}
		}

		for (var i = 0; i < s.getCount(); i++) {
			var rec = s.getAt(i);
			rec.reject();
		}

		var lastAmount = 0;
		for (var i = 0; i < s.getCount(); i++) {
			if (s.getAt(i).get('remaining_balance') > 0 && lastAmount === 0) {
				lastAmount = s.getAt(i).get('remaining_balance');
			}
		}
		f.down("[name=payment]").setValue(accounting.formatMoney(lastAmount));
		me.paymentTextFieldOnBlur();
	},
	paymentmethodOnChange: function () {
		var me 		 = this,
			f        = me.getFormdata(),
			selected = f.down("[name=paymentmethod_paymentmethod_id]").getValue(),
			pDate    = f.down("[name=payment_date]").getValue();

		if (selected == 5) {
			me.tools.alert.warning("Not allowed to choose `Pencairan`. ");
			f.down("[name=paymentmethod_paymentmethod_id]").setValue('');
		}

		f.down("[name=cair_date]").setValue(pDate);
		f.down("[name=duedate]").setValue(pDate);
	},
	xyReportProcessParams: function (reportData) {
		var me = this;

		reportData['file'] = me.reportFileView;
		reportData.params  = me.printOutData;

		return reportData;
	},
	mainPrint: function () {
		var me = this;

		me.reportFileView = 'Payment';

		if (!me.xyReport) {
			me.xyReport = new Erems.library.XyReport();
			me.xyReport.init(me);
		}

		var rec = me.getGrid().getSelectedRecord();
		if (rec) {
			var p = me.getPanel();
			p.setLoading("Please wait...");
			me.tools.ajax({
				params : { payment_id : rec.get("payment_id") },
				success: function (data, model) {
					p.setLoading(false);
					me.printOutData = data['others'][0][0]['DATA'];
					me.xyReport.processReport();
				}
			}).read('printout');
		}
	},
	isSh1CitraRayFeatured: function (params, form) {
		var me = this;

		if (params['others'][0][0]['IS_VACUSNO_SEARCH']) {
			form.down("[name=virtualaccount_bca]").show();
			form.down("[name=virtualaccount_mandiri]").show();
		}
	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);

		var me = this,
			p  = me.getPanel();

		p.up("window").maximize(true);
		me.insPayDisableGridButton(true);

		me.tools.ajax({
			params  : {},
			success : function (data, model) {
				me.globalParams            = data['others'][0][0]['GLOBALPARAMSPARAMS'];
				me.printpdfOptions         = data['others'][0][0]['PRINTFDF_OPTIONS'];
				me.printdosOptions         = data['others'][0][0]['PRINTDOS_OPTIONS'];
				me.ttdKwitansi             = data['others'][0][0]['TTD_KWITANSI'];
				me.buktiPenerimaanFilename = data['others'][0][0]['BUKTI_PENERIMAAN_FILENAME'];
				me.templateStimulsoft      = data['others'][0][0]['TEMPLATE_STIMULSOFT'];
				me.checkCanSPTDraft        = data['others'][0][0]['checkCanSPTDraft'];
				me.counterkwitansi         = data['others'][0][0]['counterkwitansi'];
				me.groupuser               = data['others'][0][0]['GROUPUSER'];
				me.paymentDendaFrom        = data['others'][0][0]['paymentDendaFrom'];
				me.fileprintmrt            = data['others'][0][0]['fileprintmrt'];
				me.show_revenuesharing     = data['others'][0][0]['show_revenuesharing']; // added by rico 16022023

				me.fillFormSearchComponents(data, me.getFormsearch());
				me.isSh1CitraRayFeatured(data, me.getFormsearch());

				var useKwTplEditor = data['others'][0][0]['KWITANSITPLEDITOR'];

				if (data['others'][0][0]['TEMPLATE_STIMULSOFT'] == '') {
					me.getGrid().down('[action=printtemplate]').setDisabled(true);
				}

				if (useKwTplEditor) {
					if (typeof ApliKwitansiEditorJs === "undefined") {
						Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliKwitansiEditorJs.js', function () {
							me.getGrid().down("button[action=tpleditor]").show();
						}, function () {
							// error load file
						});
					}
				}

				me.getGrid().down('#is_revenuesharing').setVisible(me.show_revenuesharing); // added by rico 16022023
				me.insPayDisableGridButton(false);

				if (me.checkCanSPTDraft) {
					search = me.getFormsearch();
					search.down('#btnCheckDraft').setVisible(true);
				}

				if (me.groupuser == 'NUP GROUP') {
					search = me.getFormsearch();
					search.down('#btnCheckDraft').setValue(true);
					search.down('#btnCheckDraft').setReadOnly(true);
				}
			}
		}).read('searchassets');
	},
	insPayDisableGridButton: function (mode) {
		var me = this;
		me.getGrid().down("button[action=create]").setDisabled(mode);
	},
	fillFormSearchComponents: function (data, f) {
		var me = this;
		me.tools.wesea(data.cluster, f.down("[name=cluster_id]")).comboBox(true);
		me.tools.wesea(data.paymentmethod, f.down("[name=paymentmethod_id]")).comboBox(true);
		me.tools.wesea(data.block, f.down("[name=block_id]")).comboBox(true);
	},
	mainDataSave: function () {
		var me  = this,
			sg  = me.getTagihangrid(),
			f   = me.getFormdata(),
			vs  = f.getValues(),
			cdn = vs["cdn"];

		var ok = 0;
		if (me.state == 'update') {
			ok = 1;
		}

		var payment = accounting.unformat(f.down("[name=payment]").getValue());
		var lebih   = payment - me.sumTagihan;
		if (me.state == 'create') {
			if (sg.getStore().getCount() < 0) {
				me.tools.alert.warning("Tidak ada schedule yang harus dibayar");
			} else if (me.sumTagihan === 0) { //
				me.tools.alert.warning("Tidak ada tagihan lagi yang harus dibayar");
			} else if (payment === 0) {
				me.tools.alert.warning("Silahkan isi payment terlebih dahulu");
			} else if (payment > me.sumTagihan) {
				if (cdn == '3') {
					me.tools.alert.warning("Kelebihan bayar " + accounting.formatMoney(lebih));
				} else {
					ok = 1;
				}
			} else {
				ok = 1;
			}
		}

		if (ok === 1) {
			me.insSave({
				form      : me.getFormdata(),
				grid      : me.getGrid(),
				store     : me.localStore.detail,
				finalData : function (data) {
					data["purchaseletter_purchaseletter_id"] = data["purchaseletter_id"];
					data["payment"]                          = accounting.unformat(data["payment"]);
					data["admin_fee"]                        = accounting.unformat(data["admin_fee"]);
					data["detail"]                           = me.tools.gridHelper(me.getTagihangrid()).getJson();
					data["paymentmethod_paymentmethod_id"]   = me.getFormdata().down("[name=paymentmethod_paymentmethod_id]").getValue();
					data["paymentmethod_paymentmethod"]      = me.tools.comboHelper(me.getFormdata().down("[name=paymentmethod_paymentmethod_id]")).getText({d: 'paymentmethod', v: 'paymentmethod_id'});
					return data;
				},
				sync     : true,
				callback : {
					create: function (store, form, grid) {
					}
				}
			});
		}
	},
	mainDataSaveDraft: function () {
		var me 	= this,
			sg  = me.getTagihangrid(), 
			f   = me.getFormdata(),
			vs  = f.getValues(),
			cdn = vs["cdn"];

		var ok = 0;
		if (me.state == 'update') {
			ok = 1;
		}

		var payment = accounting.unformat(f.down("[name=payment]").getValue());
		var lebih   = payment - me.sumTagihan;
		if (me.state == 'create') {

			if (sg.getStore().getCount() < 0) {
				me.tools.alert.warning("Tidak ada schedule yang harus dibayar");
			} else if (me.sumTagihan === 0) { //
				me.tools.alert.warning("Tidak ada tagihan lagi yang harus dibayar");
			} else if (payment === 0) {
				me.tools.alert.warning("Silahkan isi payment terlebih dahulu");
			} else if (payment > me.sumTagihan) {

				if (cdn == '3') {
					me.tools.alert.warning("Kelebihan bayar " + accounting.formatMoney(lebih));
				} else {
					ok = 1;
				}

			} else {
				ok = 1;
			}
		}

		if (ok === 1) {
			me.insSave({
				form      : me.getFormdata(),
				grid      : me.getGrid(),
				store     : me.localStore.detail,
				finalData : function (data) {
					data["purchaseletter_purchaseletter_id"] = data["purchaseletter_id"];
					data["payment"]                          = accounting.unformat(data["payment"]);
					data["admin_fee"]                        = accounting.unformat(data["admin_fee"]);
					data["detail"]                           = me.tools.gridHelper(me.getTagihangrid()).getJson();
					data["paymentmethod_paymentmethod_id"]   = me.getFormdata().down("[name=paymentmethod_paymentmethod_id]").getValue();
					data["paymentmethod_paymentmethod"]      = me.tools.comboHelper(me.getFormdata().down("[name=paymentmethod_paymentmethod_id]")).getText({d: 'paymentmethod', v: 'paymentmethod_id'});
					data["is_draft"]                         = 1;
					data["counterkwitansi"]                  = me.counterkwitansi;
					return data;
				},
				sync     : true,
				callback : {
					create: function (store, form, grid) {

					}
				}
			});
		}
	},
	hitungTotalPayment: function () {
		var me = this,
			f  = me.getFormdata();

		var adminFee = accounting.unformat(f.down("[name=admin_fee]").getValue());
		var totalPay = accounting.unformat(f.down("[name=payment]").getValue());
		var total    = adminFee + totalPay;
		f.down("[name=total_payment]").setValue(accounting.formatMoney(total));
	},
	fdar: function () {
		var me = this,
			f  = me.getFormdata();

		me.mt = new Erems.library.ModuleTools();

		var x = {
			init : function () {
				me.setActiveForm(f);
				var sg = me.getTagihangrid();
				sg.doInit();

				me.localStore.detail = me.instantStore({
					id          : me.controllerName + 'IPDetailStore',
					extraParams : { mode_read : 'maindetail' },
					idProperty  : 'payment_id'
				});

				if (me.groupuser == 'NUP GROUP') {
					f.down("#btnSave").setVisible(false);
				}
			},
			create : function () {
				me.state = 'create';

				me.tools.ajax({
					params  : {},
					success : function (data, model) {
						me.fillFormComponents(data, f);

						var showPayMethods = ["cash", "cek/giro", "transfer", "kredit", "debet", "pencairan", "voucher", "va bca", "mva", "debet bca", "debet mandiri"];
						f.down("[name=paymentmethod_paymentmethod_id]").getStore().filterBy(function (pmrec) {
							return showPayMethods.indexOf(pmrec.data.paymentmethod.toLowerCase()) >= 0;
						});

						me.globalParamsForm = data['others'][0][0]['GLOBALPARAMS'];

						me.myParams = {
							'cash'                : data['others'][0][0]['PAYMENTMETHOD_CASH'],
							'ptname'              : data['others'][0][0]['PT_NAME'],
							'paymentteks'         : data['others'][0][0]['PAYMENT_TEKS'],
							'sebagianpaymentteks' : data['others'][0][0]['SEBAGIAN_PAYMENT_TEKS'],
							'project_id'          : data['others'][0][0]['PROJECT_ID'],
							'hitungdenda_model'   : data['others'][0][0]['HITUNGDENDAMODEL']
						};

						me.stList = data.scheduletype.data;

						me.localStore.detail.load({
							params   : { payment_id : 0 },
							callback : function (rec, op) {
								me.attachModel(op, me.localStore.detail, false);
							}
						});

						f.setLoading(false);

						var rec = me.getGrid().getSelectedRecord();
						if (rec) {
							if(rec.data.is_blokir == 1){ // added by rico 27122022
								setTimeout(function () {
									Ext.Msg.show({
										title   : 'Info',
										msg     : 'Purchaseletter Terblokir. Tidak bisa melakukan pembayaran.',
										icon    : Ext.Msg.ERROR,
										buttons : Ext.Msg.OK,
										fn      : function () {}
									});
								}, 300);

								return;
							}else{
								f.setLoading("Sedang mengambil informasi unit..");

								me.tools.ajax({
									params: {
										unit_id  : rec.get("unit_unit_id"),
										is_draft : rec.get("purchaseletter_is_draft")
									},
									success: function (datax, model) {

										if (datax.length == 0) {
											me.tools.alert.warning("Informasi unit tidak valid.");
											me.getFormdata().up("window").close();
											return;
										}

										var plId = datax[0]['purchaseletter']['purchaseletter_id'];

										me.localStore.defaultUnit = me.instantStore({
											id          : me.controllerName + 'DUnitInsPayStore',
											extraParams : { mode_read : 'selectedsoldunit' },
											idProperty  : 'purchaseletter_id'
										});

										f.setLoading("Sedang mengambil informasi purchaseletter..");
										me.localStore.defaultUnit.load({
											params : {
												purchaseletter_id : plId,
												is_draft          : rec.get("purchaseletter_is_draft")
											},
											callback : function (rec, op) {
												me.attachModel(op, me.localStore.defaultUnit, true);
												var rec = me.localStore.defaultUnit.getAt(0);

												f.setLoading(false);
												me.inpayFillForm(rec.get('rescheduleid_aktif'), rec.get('changeprice_aktif'), me.localStore.defaultUnit);
											}
										});
									}
								}).read('soldunitlist');
								return;
							}
						}
					}
				}).read('detail');
			},
			update: function () {
				me.state = 'update';

				var paymentId = me.paymentId,
					isDraftpl = me.isDraft,
					isDraftpy = me.isDraftpy;

				if (me.getGrid()) {
					paymentId = me.getGrid().getSelectedRecord().get("payment_id");
					isDraftpl = me.getGrid().getSelectedRecord().get("purchaseletter_is_draft");
					isDraftpy = me.getGrid().getSelectedRecord().get("is_draft");
					f.editedRow = me.getGrid().getSelectedRow();
				} 

				var vs = f.getForm().getValues();
				for (var i in vs) {
					var el = f.down("[name=" + i + "]");
					if (el) {
						el.setReadOnly(true);
					}
				}
				f.down("[name=paymentmethod_paymentmethod_id]").setReadOnly(true);
				f.down("[name=is_referencerejected]").setReadOnly(true);
				f.down("[name=denda]").setReadOnly(true);
				f.down("[name=total_payment]").setReadOnly(true);
				f.down("#cdnID").setReadOnly(true);
				f.down("[name=note]").setReadOnly(false);
				f.down("[name=receipt_no]").setReadOnly(false);
				f.down("[name=duedate]").setReadOnly(false);
				f.down("[name=cair_date]").setReadOnly(false);
				f.down("[name=reference_no]").setReadOnly(false);

				if (isDraftpl == 1) {
					f.down("#btnSave").setVisible(false);
				}

				me.tools.ajax({
					params  : {},
					success : function (data, model) {
						me.myParams = {
							'cash'                : data['others'][0][0]['PAYMENTMETHOD_CASH'],
							'ptname'              : data['others'][0][0]['PT_NAME'],
							'paymentteks'         : data['others'][0][0]['PAYMENT_TEKS'],
							'sebagianpaymentteks' : data['others'][0][0]['SEBAGIAN_PAYMENT_TEKS'],
							'project_id'          : data['others'][0][0]['PROJECT_ID'],
							'hitungdenda_model'   : data['others'][0][0]['HITUNGDENDAMODEL']
						};

						me.globalParamsForm = data['others'][0][0]['GLOBALPARAMS'];

						me.fillFormComponents(data, f);
						me.stList = data.scheduletype.data;

						me.localStore.detail.load({
							params: {
								payment_id: paymentId,
								is_draft: isDraftpy
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

								f.setLoading("Loading schedule...");
								me.tools.ajax({
									params : {
										payment_id : paymentId,
										is_draft   : isDraftpl
									},
									success: function (data, model) {
										me.tools.wesea({
											data  : data,
											model : model
										}, me.getTagihangrid()).grid();

										f.down("[name=payment_id]").setValue(paymentId);
										f.setLoading(false);

									}
								}).read('tagihanpayment');

								f.down("[name=note]").setValue(rec.get("note"));

								var vs = me.getFormdata().getForm().getValues();
								for (var i in vs) {
									var elx = me.getFormdata().down("[name=" + i + "]");

									if (elx) {
										if (elx.getXType() === 'xmoneyfield') {
											elx.setRawValue(accounting.formatMoney(elx.getValue()));
										}
									}
								}

								var paymentMethodPencairan = me.tools.intval(data['others'][0][0]['PAYMENTMETHOD_PENCAIRAN']);
								if (rec.get("paymentmethod_paymentmethod_id") === paymentMethodPencairan) {
									if (apps.subholdingId != 1) {
										f.down("[name=cair_date]").setReadOnly(true);
										f.down("[name=duedate]").setReadOnly(true);
									}
									f.down("[action=fullpayment]").setDisabled(true);
								}

								var ied     = data['others'][0][0]['INSTALLMENT_EDIT_DATE'];
								var pmethod = f.down("[name=paymentmethod_paymentmethod_id]").getValue();

								if (ied == 1 && pmethod == 5) {
									f.down("[name=cair_date]").setReadOnly(false);
									f.down("[name=duedate]").setReadOnly(false);
									f.down("[action=fullpayment]").setDisabled(false);
								}
							}
						});
						f.setLoading(false);
					}
				}).read('detail');
			},
			view : function () {
				me.fdar().update('view');
				me.getFormdata().getForm().getFields().each(function (field) {
					field.setReadOnly(true);
				});
				Ext.Array.each(me.getFormdata().query("[xtype=button]"), function (field) {
					field.setVisible(false);
				});
				me.getFormdata().down('#btnCancel').show();
			}
		};
		return x;
	},
	fillFormComponents: function (data, form) {
		var me = this;
		me.tools.wesea(data.paymentmethod, form.down("[name=paymentmethod_paymentmethod_id]")).comboBox();
	},
	generateNote: function () {
		var me = this,
			f  = me.getFormdata(),
			s  = me.getTagihangrid().getStore();

		var stText  = '',
			pay     = 0,
			rb      = 0,
			rbNew   = 0,
			payBaru = 0,
			a       = 0; // amount

		for (var i in me.effectedSch) {
			var rec = s.getAt(me.effectedSch[i]);
			var addText = "";

			pay = 0;
			rb  = 0;
			if (rec) {
				payBaru = me.tools.floatval(rec.get("payment_payment"));
				rbNew   = me.tools.floatval(rec.get("remaining_balance"));
				a       = me.tools.floatval(rec.get("amount"));

				for (var j in me.tagihanDefaultValue) {
					if (me.tagihanDefaultValue[j]['id'] === rec.get("schedule_id")) {
						pay = me.tagihanDefaultValue[j]['pay'];
					}
				}

				if (rbNew === 0) {
					if (pay === 0) {
						addText = "";
					} else {
						addText = me.myParams.paymentteks.TAMBAHAN;
					}

				} else {
					if (pay === 0) {
						addText = me.myParams.paymentteks.SEBAGIAN;
					} else {
						addText = me.myParams.paymentteks.TAMBAHAN_SEBAGIAN;
					}

				}

				if (payBaru > me.myParams.sebagianpaymentteks) {
					stText += addText + " " + ((apps.subholdingId == 1 && rec.get("scheduletype_description") == 'INHOUSE') ? 'ANGSURAN' : rec.get("scheduletype_description")) + " " + rec.get("termin") + ", ";
				}
			}

		}

		var isAddReferenceToNote = me.tools.intval(me.globalParamsForm.PAYMENT_REFERENCENO_ADDTONOTES);
		var str = '';
		if (me.myParams.project_id == 30 || me.myParams.project_id == 5103) { /// Citraland Bagya City Medan , Gama City Medan
			str = ' ' + stText + ' ';
			str += ' ' + f.down("[name=type_name]").getValue();
			str += ' ' + f.down("[name=cluster_cluster]").getValue();
			str += ' ' + f.down("[name=unit_unit_number]").getValue();
			str += ' ' + me.tools.comboHelper(f.down("[name=paymentmethod_paymentmethod_id]")).getText(me.cbf.paymentmethod) + ' . ';
			if (isAddReferenceToNote > 0) {
				str += ' ' + f.down("[name=reference_no]").getValue() + ' ';
			}
			str += ' ' + me.getDateString(f.down("[name=payment_date]").getValue()) + ' ';
			str += ' Rp. ' + accounting.formatMoney(f.down("[name=payment]").getValue()) + ',- ';
			str += ' ' + me.selectedPurchaseletter.pt_name;
		}
		if (me.myParams.project_id == 5101) { // CitraLand Vittorio Wiyung Surabaya
			for (var i in me.effectedSch) {
				var rec = s.getAt(me.effectedSch[i]);
				str += ' ' + f.down("[name=cluster_cluster]").getValue() + ' ' + f.down("[name=unit_unit_number]").getValue() + '	' + rec.get("scheduletype_description") + ' ' + rec.get("termin") + '	Rp. ' + accounting.formatMoney(rec.get("payment_payment")) + ',- \n';
			}
		}
		if (me.plisdraft == 1) {
			if (me.myParams.project_id == 4033) { //4033 Citralakesuites
				str = 'Tanda Minat NUP No (' + f.down("[name=purchaseletter_no]").getValue() + ') ';
				str += ' ' + f.down("[name=type_name]").getValue();
				str += ' VA BCA ';
				str += ' ' + me.getDateString(f.down("[name=payment_date]").getValue()) + ' ';
				str += ' Rp. ' + accounting.formatMoney(f.down("[name=payment]").getValue()) + ',- ';
				str += ' ' + f.down("[name=cluster_cluster]").getValue();
				str += ' Unit ' + f.down("[name=unit_unit_number]").getValue();
			} else {
				str = ' ' + stText + ' ';
				str += ' ' + f.down("[name=type_name]").getValue();
				str += ' ' + me.tools.comboHelper(f.down("[name=paymentmethod_paymentmethod_id]")).getText(me.cbf.paymentmethod) + ' . ';
				if (isAddReferenceToNote > 0) {
					str += ' ' + f.down("[name=reference_no]").getValue() + ' ';
				}
				str += ' ' + me.getDateString(f.down("[name=payment_date]").getValue()) + ' ';
				str += ' Rp. ' + accounting.formatMoney(f.down("[name=payment]").getValue()) + ',- ';
				str += ' ' + f.down("[name=cluster_cluster]").getValue();
				str += ' ' + f.down("[name=unit_unit_number]").getValue();
				str += ' ' + me.selectedPurchaseletter.pt_name;
			}
		} else {
			str = ' ' + stText + ' ';
			str += ' ' + f.down("[name=type_name]").getValue();
			str += ' ' + me.tools.comboHelper(f.down("[name=paymentmethod_paymentmethod_id]")).getText(me.cbf.paymentmethod) + ' . ';
			if (isAddReferenceToNote > 0) {
				str += ' ' + f.down("[name=reference_no]").getValue() + ' ';
			}
			str += ' ' + me.getDateString(f.down("[name=payment_date]").getValue()) + ' ';
			str += ' Rp. ' + accounting.formatMoney(f.down("[name=payment]").getValue()) + ',- ';
			str += ' ' + f.down("[name=cluster_cluster]").getValue();
			str += ' ' + f.down("[name=unit_unit_number]").getValue();
			str += ' ' + me.selectedPurchaseletter.pt_name;
		}

		var is_nonppn        = f.down("[name=is_nonppn]").getValue();
		var pay              = accounting.unformat(f.down("[name=payment]").getValue());
		var price_harga_neto = f.down("[name=price_harga_neto]").getValue();
		if (is_nonppn == 1) {
			if (price_harga_neto <= 2000000000) {
				str += ', PPN DITANGGUNG PEMERINTAH EKS PMK 120 TAHUN 2023';
			} else if (price_harga_neto <= 5000000000) {
				str += ', PPN DITANGGUNG PEMERINTAH EKS PMK 120 TAHUN 2023';
			}
		}

		f.down("[name=note]").setValue(str);
	},
	getDateString: function (date) {
		var d = new Date(date);
		var str = '';
		str += d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
		return str;
	},
	selectUnitGridShow: function (el) {
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
		var w   = me.info.window;
		var win = desktop.getWindow(w.id);
		var f   = win.down("form");
		var ug  = me.getUnitgrid();

		if (me.checkCanSPTDraft) {
			f.down('#btnCheckDraft').setVisible(true)
		}
		if (me.groupuser == 'NUP GROUP') {
			ug.getStore().getProxy().setExtraParam('is_draft', 'true');
			f.down('#btnCheckDraft').setValue(true);
			f.down('#btnCheckDraft').setReadOnly(true);
			f.down('#btnReset').setVisible(false)
		}
	},
	paymentTextFieldOnBlur: function () {
		var me = this;
		var f = me.getFormdata();
		if (f.editedRow > -1) { // just for add new record
			return false;
		}
		var pay = toFloat(f.down("[name=payment]").getValue());
		var s = me.getTagihangrid().getStore();
		var jt = s.getCount(); // jumlah tagihan
		var sisa = 0;
		var payValue = 0; /// nilai payment di grid
		var flagTry = false;
		var lastRow = -1;
		me.effectedSch = []; // reset list schedule id yang dibayar
		var totalDenda = 0;
		var current_denda = 0;
		if (jt > 0) { /// jika ada nilai payment dan ada tagihan
			//tagihanDefaultValue
			if (!me.tagihanDefaultValue) {
				me.tagihanDefaultValue = [];
				for (var i = 0; i < jt; i++) {
					me.tagihanDefaultValue.push({
						rb: me.xFormatFloat(s.getAt(i).get("remaining_balance")),
						pay: me.xFormatFloat(s.getAt(i).get("payment_payment")),
						denda: me.xFormatFloat(s.getAt(i).get("denda")),
						remaining_denda: me.xFormatFloat(s.getAt(i).get("remaining_denda")),
						id: me.tools.intval(s.getAt(i).get("schedule_id")),
					});
				}
			} else {
				flagTry = true;
			}

			for (var i = 0; i < jt; i++) {
				var rec = s.getAt(i);
				var rb = flagTry ? me.tagihanDefaultValue[i]["rb"] : me.xFormatFloat(rec.get("remaining_balance"));
				payValue = 0;

				var payTagihan = 0;
				if (pay > 0) {
					if (rb > pay) {
						rb = rb - pay;
						payValue = pay;
						pay = 0;
					} else {
						payValue = rb;
						pay = pay - rb;
						rb = 0;
					}
					if (me.tools.floatval(me.tagihanDefaultValue[i]["rb"]) > 0) {
						me.effectedSch.push(i);
						lastRow = i;
					}
				}

				var finalPay = me.tagihanDefaultValue[i]["pay"];
				var finalRb = me.tagihanDefaultValue[i]["rb"];
				var denda = 0;

				payValue = me.xFormatFloat(payValue);
				if (payValue > 0 || (payValue == 0 && rb == 0)) {
					finalPay = payValue + me.tagihanDefaultValue[i]["pay"];
					finalRb = rb;
					if (me.paymentDendaFrom == 'PaymentDate') {
						dateDenda = f.down("[name=payment_date]").getValue()
					} else {
						dateDenda = f.down("[name=cair_date]").getValue()
					}

					denda = me.hitungDenda(payValue, rec, dateDenda, me.tagihanDefaultValue[i]["remaining_denda"]);

				} else {
					denda = me.tagihanDefaultValue[i]["remaining_denda"];
				}
				current_denda = current_denda + me.tagihanDefaultValue[i]["remaining_denda"];
				totalDenda += denda;

				rec.beginEdit();
				rec.set({
					payment_payment: finalPay,
					remaining_balance: finalRb,
					remaining_denda: denda
				});
				rec.endEdit();
				rec = null;
			}
		}
		s = null;
		me.hitungCdn(lastRow);
		me.hitungTotalPayment();
		me.generateNote();
		f.down("[name=current_denda]").setValue(accounting.formatMoney(totalDenda - current_denda));
		f.down("[name=denda]").setValue(accounting.formatMoney(totalDenda));
	},
	hitungTotalDenda: function () {
		var me = this;
	},
	hitungDenda: function (payment, rec, paymentDate, currentDenda) {
		var me = this;

		if (apps.subholdingId == 2) {
			var totalHariTerlambat = me.tools.diffDays(paymentDate, rec.get("payment_cair_date"));
		} else {
			var totalHariTerlambat = me.tools.diffDays(paymentDate, rec.get("duedate"));
		}

		var denda = 0;
		if (paymentDate > rec.get("duedate")) {
			var toleransi = me.tools.intval(me.globalParams['BATAS_TOLERANSI']);

			if (totalHariTerlambat > toleransi) {
				if (me.tools.intval(me.myParams.hitungdenda_model) === 2) {
					totalHariTerlambat = totalHariTerlambat;
				} else if (me.tools.intval(me.myParams.hitungdenda_model) === 3) {
					var totalHariTerlambat = me.tools.diffDays(paymentDate, rec.get("payment_cair_date"));
					totalHariTerlambat = totalHariTerlambat;
				} else {
					totalHariTerlambat = totalHariTerlambat - toleransi;
				}

				var dendaPermil = me.tools.floatval(me.globalParams['DENDA_PERMIL']);
				denda = Math.round((dendaPermil / 1000) * payment * (totalHariTerlambat));
				denda = currentDenda + denda;
			}
		} else {
			denda = currentDenda;
		}

		return me.tools.intval(denda);
	},
	hitungCdn: function (lastRow) {
		var me  = this;
		var f   = me.getFormdata();
		var vs  = f.getValues();
		var cdn = vs["cdn"];
		var s   = me.getTagihangrid().getStore();
		if (cdn < 3) {
			if (cdn === 1) { // kurang bayar diabaikan
				var rec = s.getAt(lastRow);
				f.down("[name=cdn_value]").setValue(rec.get("remaining_balance"));
				rec.beginEdit();
				rec.set({
					remaining_balance: 0
				});
				rec.endEdit();

			} else if (cdn === 2) { /// lebih bayar diabaikan
				if (me.effectedSch.length > 1) { // jika schedule yang terbayar lebih dari 1 row
					var rec = s.getAt(lastRow);
					f.down("[name=cdn_value]").setValue(rec.get("payment_payment"));
					rec.beginEdit();
					rec.set({
						payment_payment   : me.tagihanDefaultValue[lastRow]['pay'],
						remaining_balance : me.tagihanDefaultValue[lastRow]['rb']
					});
					rec.endEdit();
				} else if (me.effectedSch.length === 1) { // jika schedule yang terbayar : 1 row
					var rec = s.getAt(lastRow);
					f.down("[name=cdn_value]").setValue(accounting.unformat(f.down("[name=payment]").getValue()) - rec.get("payment_payment"));
				}
			}

		} else {
			f.down("[name=cdn_value]").setValue(0);
		}

		f.down("[name=cdn_value]").setValue(accounting.formatMoney(f.down("[name=cdn_value]").getValue()));
	},
	resetTagihan: function () {
		var me = this;
		var sg = me.getTagihangrid();

		sg.getStore().loadData([], false);
		me.tagihanDefaultValue = false;

		me.effectedSch = [];
	},
	loadTagihan: function (purchaseLetterId, isDraft) {
		var me = this;
		var sg = me.getTagihangrid();

		me.resetTagihan();
		me.sumTagihan = 0;
		me.tools.ajax({
			params : {
				purchaseletter_id : purchaseLetterId,
				is_draft          : isDraft
			},
			success : function (data, model) {
				me.tools.wesea({
					data  : data,
					model : model
				}, me.getTagihangrid()).grid();

				// added by rico 1506202
				sg.getStore().removeAt(sg.getStore().find('scheduletype_scheduletype_id', 2));
				sg.getStore().removeAt(sg.getStore().find('scheduletype_scheduletype_id', 25));

				var sum = 0;
				sg.getStore().data.each(function (record) {
					sum += parseFloat(record.get('remaining_balance'));
				});

				me.sumTagihan = sum;
			}
		}).read('tagihantagihan');
	},
	inpayFillForm: function (rescheduleidAktif, changepriceAktif, localStore) {
		var me = this;
		var f  = me.getFormdata();

		var rescheduleAktif = me.tools.intval(rescheduleidAktif);
		var changePriceAktif = me.tools.intval(changepriceAktif);

		// jika ada 
		if (rescheduleAktif > 0) {
			me.tools.alert.warning("Ada reschedule yang belum di approve. Silahkan approve terlebih dahulu.");
			me.getFormdata().up("window").close();
		} else if (changePriceAktif > 0) {
			me.tools.alert.warning("Ada permintaan perubahan harga yang belum di approve. Silahkan approve terlebih dahulu.");
			me.getFormdata().up("window").close();
		} else {
			var ps = localStore;
			var psRec = ps.getAt(0);

			if (psRec) {
				me.selectedPurchaseletter = psRec.data;
				me.getFormdata().loadRecord(psRec);
				me.loadTagihan(psRec.get("purchaseletter_id"), psRec.get("is_draft"));
				me.mt.customerPhoto(f.down("#photo_image"), psRec.get("customer_photo"), me.myConfig.IMG_FOLDER);
				me.generateNote();
				me.tempTagihan = null;

				if (psRec.get("is_draft") == 1) {
					f.down("#btnSave").setVisible(false);
					f.down('#btnSaveDraft').setVisible(true);
					f.down('#btnSaveDraft').setDisabled(false);
					if (me.counterkwitansi == 1) {
						f.down('[name=reference_no]').setReadOnly(true);
						f.down('[name=receipt_no]').setReadOnly(true);
					}
				}
			} else {
				console.log("[Error] Tidak ada data purchaseletter");
			}
		}
	},
	unitSelect: function () {
		var me = this;
		var f  = me.getFormdata();
		var unit = me.getUnitgrid(); // added by rico 26122022
		var selectedUnit = unit.getSelectionModel().getSelection(); // added by rico 26122022

		if(selectedUnit[0].data.is_blokir == 1){ // added by rico 26122022
			Ext.Msg.show({
				title: 'Info',
				msg: 'Purchaseletter Terblokir. Tidak bisa melakukan pembayaran.',
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK,
				fn: function () {}
			});

			return;
		}

		if (me.browseHandler) {
			me.browseHandler.selectItemFinalData = function (rec) {
				me.plisdraft = rec.get("is_draft");
				return { purchaseletter_id : rec.get("purchaseletter_id"), is_draft: rec.get("is_draft") };
			};
			me.selectedPurchaseletter = null;
			me.browseHandler.selectItem(function (rec) {
				me.inpayFillForm(rec.get("rescheduleid_aktif"), rec.get("changeprice_aktif"), me.localStore.selectedUnit);
			});
		}
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
	}
	,
	processReportBuktiPenerimaan: function () {
		var me = this;
		var rec = me.getGrid().getSelectedRecord();
		if (rec) {
			var winId = 'myReportWindow';
			me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
			var win = desktop.getWindow(winId);

			if (win) {
				var params = [];
				params["payment_id"] = rec.get("payment_id");
				var reportFile = me.buktiPenerimaanFilename;
				var html = me.generateFakeForm2(params, reportFile);
				win.down("#MyReportPanel").body.setHTML(html);
				$("#fakeReportFormID").submit();
			}
		}
	},
	processPrintTemplate: function () {
		var me = this;
		var rec = me.getGrid().getSelectedRecord();
		if (rec) {
			var winId = 'myReportWindow';
			me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
			var win = desktop.getWindow(winId);

			if (win) {
				var params = [];
				params["payment_id"] = rec.get("payment_id");
				var reportFile = me.templateStimulsoft;
				var html = me.generateFakeForm2(params, reportFile);
				win.down("#MyReportPanel").body.setHTML(html);
				$("#fakeReportFormID").submit();
			}
		}
	},
	dataReset2: function () {
		var me = this;

		me.getFormsearch().getForm().reset();

		if (me.groupuser == 'NUP GROUP') {
			me.getFormsearch().down('#btnCheckDraft').setValue(true);
		}

		me.dataSearch();
	},
	processReport2: function () {
		var me = this;
		var winId = 'myReportWindow';
		me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		var win = desktop.getWindow(winId);

		if (win) {
			var params = [];
			params["logo_url"] = window.location.protocol + "//" + window.location.host + '/webapps/Ciputra/public/app/erems/library/images/';

			var data = [];
			var row  = me.getGrid().getSelectionModel().getSelection();
			for (var i = 0; i < row.length; i++) {
				data[i] = row[i].data.payment_id;
			}

			params["payment_id"] = data.length > 0 ? data.join("~") : '';
			if (me.fileprintmrt == "") {
				setTimeout(function () {
					Ext.Msg.show({
						title   : 'Failure',
						cls     : 'msg-floating',
						msg     : 'Error: Create Report Failed.',
						icon    : Ext.Msg.ERROR,
						buttons : Ext.Msg.OK
					});
				}, 300);

			} else {
				var html = me.generateFakeForm2(params, me.fileprintmrt);
				win.down("#MyReportPanel").body.setHTML(html);
				$("#fakeReportFormID").submit();
			}
		}
	},
	checkboxChangePaymentDate: function (el) {
		var me = this;
		if (el.getValue()) {
			me.getFormsearch().down("[name=payment_startdate]").setValue("");
			me.getFormsearch().down("[name=payment_enddate]").setValue("");
			el.setValue(1);
		}
	},
	changePaymentDate: function () {
		var me = this;
		me.getFormsearch().down("[name=cbf_payment_date]").setValue("0");
	},
	checkboxChangeCairDate: function (el) {
		var me = this;
		if (el.getValue()) {
			me.getFormsearch().down("[name=cair_startdate]").setValue("");
			me.getFormsearch().down("[name=cair_enddate]").setValue("");
			el.setValue(1);
		}
	},
	changeCairDate: function () {
		var me = this;
		me.getFormsearch().down("[name=cbf_cair_date]").setValue("0");
	},
	gridAfterRender : function (configs) {
		this.callParent(arguments);

		var me   = this;
		var grid = me.getGrid();

		grid.up('window').body.mask('Loading configuration ...');
		grid.store.on('load', function (store, records, options) {
			me.jqueryBinding();
		});
	},
	// added by rico 16022023
	jqueryBinding : function () {
		var me = this;
		me.checkboxInlineEdit('is_revenuesharing'); // added by rico 19012023
	},
	checkboxInlineEdit : function (name) {
		var me = this;
		$("input[name='" + name + "']").change(function (event) {
			var val               = $(this).is(":checked") ? 1 : 0;
			var y                 = $(this);
			var purchaseletter_id = $(this).attr('data');
			var p                 = me.getPanel();

			var pesan = 'Revenue Sharing';

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
					} else {
						var chk = val > 0 ? false : true;
						y.prop("checked", chk);
					}
				}
			});
		});
	}, 
});