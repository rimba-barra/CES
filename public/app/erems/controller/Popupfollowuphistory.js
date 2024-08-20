Ext.define('Erems.controller.Popupfollowuphistory', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Popupfollowuphistory',
	views: ['popupfollowuphistory.Panel', 'popupfollowuphistory.Grid', 'popupfollowuphistory.FormSearch'],
	requires: ['Erems.library.template.component.Blockcombobox', 'Erems.library.template.component.Clustercombobox'],
	stores: ['', 'Popupfollowuphistory', 'Mastercluster', 'Masterblock'],
	models: ['Popupmaster'],
	refs: [
		{
			ref: 'panel',
			selector: 'popupfollowuphistorypanel'
		},
		{
			ref: 'grid',
			selector: 'popupfollowuphistorygrid'
		},
		{
			ref: 'formsearch',
			selector: 'popupfollowuphistoryformsearch'
		},
		{
			ref: 'formdata',
			selector: 'popupfollowuphistoryformdata'
		}
	],
	controllerName: 'popupfollowuphistory',
	fieldName: '',
	bindPrefixName: 'Popupfollowuphistory',
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

		Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () {




		}, function () {
			//  me.tools.alert.warning("Error load Prolibs.js file.");
		});
		this.control({
			'popupfollowuphistorypanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'popupfollowuphistorygrid': {
				afterrender: this.gridAfterRender,
//				itemdblclick: this.gridItemDblClick,
//				itemcontextmenu: this.gridItemContextMenu,
//				selectionchange: this.gridSelectionChange
			},
			'popupfollowuphistoryformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'popupfollowuphistorygrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'popupfollowuphistorygrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'popupfollowuphistorygrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
//			'popupfollowuphistorygrid actioncolumn': {
//				afterrender: this.gridActionColumnAfterRender,
//				click: this.gridActionColumnClick
//			},
			'popupfollowuphistorygrid actioncolumn': {
				printsp: me.printSP,
				printsp2: me.printSP,
				printsp3: me.printSP,
				printsp4: me.printSP,
			},
			'popupfollowuphistoryformsearch button[action=search]': {
				click: this.dataSearch
			},
			'popupfollowuphistoryformsearch button[action=reset]': {
				click: this.dataReset
			},
			'popupfollowuphistoryformdata': {
				afterrender: this.formDataAfterRender
			},
			'popupfollowuphistoryformdata button[action=save]': {
				click: this.dataSave
			},
			'popupfollowuphistoryformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'popupfollowuphistorygrid toolbar button[action=export_excel]': {
				click: function (el) {
					this.dataExport(el, 'followuphistory', me.getFormsearch().getValues());
				}
			},
			'popupfollowuphistorygrid toolbar button[action=print]': {
				click: function (el) {
					me.processReport();
				}
			},
			'popupfollowuphistorygrid .sp1noprint': {
				click: function (el) {
					alert("AS");
				}
			}
		});
	},
	processReport: function () {
		var me = this;
		var winId = 'myReportWindow';
		me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		var win = desktop.getWindow(winId);

		if (win) {
			var params = [];

			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;

			var reportFile = 'Vida';

//			console.log(params);
			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},

	printSP: function (view, rowIndex, colIndex, item, e, record, row) {
		var me = this;
		var p = me.getPanel();

		var row = view[1];
		console.log(row);

//		p.setLoading("Please wait...");
		me.tools.ajax({
			params: {
				followup_history_id: me.getGrid().getStore().getAt(row).get(view[3].itemCls),
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
					me.tools.alert.warning('kampa');
//					me.tools.alert.warning(data['others'][0][0]['MSG']);
				}


			}
		}).read('printout');
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
	PrintElem: function (content)
	{





		var mywindow = window.open('', 'PRINT_FOLLOWUP_HISTORY', 'height=400,width=600');

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
			if (typeof Ext.ComponentQuery.query('#templatePopup')[0] != 'undefined') {
				Ext.ComponentQuery.query('#templatePopup')[0].destroy();
			}
		}
	},
});