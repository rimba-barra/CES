Ext.define('Erems.controller.Klaimkomisi', {
	extend: 'Erems.library.template.controller.Controller2',
	alias: 'controller.Klaimkomisi',
	views: ['klaimkomisi.Panel', 'klaimkomisi.Grid', 'klaimkomisi.FormSearch', 'masterreport.Panel'],
	refs: [
		{
			ref: 'grid',
			selector: 'klaimkomisigrid'
		},
		{
			ref: 'panel',
			selector: 'klaimkomisipanel'
		},
		{
			ref: 'formsearch',
			selector: 'klaimkomisiformsearch'
		},
		{
			ref: 'griddetail',
			selector: 'klaimkomisigriddetail'
		}

	],
	controllerName: 'klaimkomisi',
	fieldName: 'komisi_id',
	formWidth: 800,
	fillForm: null,
	unitFormula: null,
	paymentFunc: null,
	browseHandler: null,
	dateNow: new Date(),
	flaggeneratevoucherno: 0,
	state: null,
	accept_date: null,
	pt_id: 0,
	stData: {},
	bindPrefixName: 'Klaimkomisi',
	localStore: {
		selectedUnit: null,
		customer: null,
		price: null,
		detail: null
	},
	tagihanDefaultValue: false,
	tools: null,
	myConfig: null,
	cbf: null,
	mt: null,
	stList: null, // list of schedule type
	effectedSch: [], // list schedule id yang dibayar
	formxWinId: 'win-instalpaymentwinId',
	paymentId: 0,
	klaimKomisiDataSalesman: null,
	klaimKomisiDataCitraClub: null,
	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});
		me.cbf = new Erems.template.ComboBoxFields();
	},
	xyReport: null,
	printOutData: null,
	globalParams: null,
	globalParamsForm: null,
	selectedPurchaseletter: null,
	klaimKomisiModalId: null,
	klaimKomisiPrintModalId: null,
	project_name: null,
	pt_name: null,
	myParams: {
		paymentteks: null,
		global: null
	},
	init: function (application) {
		var me = this;
		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
		if (typeof Mustache === "undefined") {
			Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () {

				if (typeof ApliJs === "undefined") {
					Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js?_=' + new Date().getTime(), function () {

						//  console.log("[INFO] ApliJs loaded.");

					}, function () {
						// error load file
					});
				}


			}, function () {
				//  me.tools.alert.warning("Error load Prolibs.js file.");
			});
		}

		if (typeof moment !== 'function') {


			Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/moment.min.js', function () {
			}, function () {
			});
		}

		this.control({
			'klaimkomisipanel': {
				//   beforerender: me.mainPanelBeforeRender,
				//  afterrender: this.panelAfterRender

			},
			'klaimkomisigrid': {
				afterrender: this.klaimkomisigridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'klaimkomisigrid toolbar button[action=create]': {
				click: function () {
					// me.showFormdata("create");
					//   ApliJs.modal("formdata_modal").show("create");
					var params = {};
					ApliJs.showHtml(me, "formdata_modal", params, 'create');
				}
			},
			'klaimkomisigrid toolbar button[action=update]': {
				click: function () {
					//me.showFormdata("update");
					var params = {};
					ApliJs.showHtml(me, "formdata_modal", params, 'update');
				}
			},
			'klaimkomisiformsearch button[action=search]': {
				click: this.dataSearch
			},
			'klaimkomisiformsearch button[action=reset]': {
				click: this.dataReset
			},
			'klaimkomisigrid toolbar button[action=destroy]': {
				click: function () {
					me.deleteData();
				}
			},
			'klaimkomisigrid button[action=print]': {
				click: this.klaimkomisishowPdf
			},
			'klaimkomisigriddetail button[action=create]': {
				click: function () {
					me.klaimKomisiaddNewDetail();
				}
			},
			'klaimkomisigriddetail button[action=delete]': {
				click: function () {
					me.klaimKomisiaddDeleteDetail();
				}
			},
		});
	},
	klaimkomisishowPdf: function () {
		var me = this;
//		me.klaimkomisiAftershowPdf();
		ApliJs.showHtml(me, "print", {}, 'print');
	},
	generateFakeForm2: function (paramList, reportFile) {
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
	},
	klaimkomisiAftershowPdf: function () {
		var me = this;
		var rec = me.getGrid().getSelectedRecord();
		var winId = 'myReportWindow';
		me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		var win = desktop.getWindow(winId);
		var params = [];
		if (win) {
			var note = rec.get("note").split("\n");
			params["klaimkomisi_id"] = rec.get("klaimkomisi_id");
			params["tipe_agent"] = $("#" + me.klaimKomisiPrintModalId + " input[name=tipe_agent]:checked").val();
			params["tipe_agent"] = $("#" + me.klaimKomisiPrintModalId + " input[name=tipe_agent]:checked").val();
			params["note_0"] = typeof note[0] === "undefined" ? "" : Ext.String.trim(note[0]);
			params["note_1"] = typeof note[1] === "undefined" ? "" : Ext.String.trim(note[1]);

			reportFile = 'BuktiPengeluaranUang';
			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#myReportWindow").css('z-index', '999999');
			$("#fakeReportFormID").submit();
		}
	},
//	klaimkomisiAftershowPdf: function () {
//		var me = this;
//		var rec = me.getGrid().getSelectedRecord();
//		ApliJs.loadingbar().show("Sedang membuat pdf...");
//		$.ajax({
//			method: "POST",
//			url: "erems/klaimkomisi/read/",
//			data: {mode_read: "printpdf", klaimkomisi_id: rec.get("klaimkomisi_id"), tipe_agent: $("#" + me.klaimKomisiPrintModalId + " input[name=tipe_agent]:checked").val()}
//		}).done(function (msg) {
//			ApliJs.loadingbar().hide();
//			if (msg.HASIL) {
//				var mywindow = window.open(msg.URL, '_blank');
//
//				mywindow.document.close(); // necessary for IE >= 10
//				mywindow.focus();
//			} else {
//				ApliJs.alert().warning("Terjadi kesalahan pada saat generate pdf.");
//			}
//			//  console.log(msg);
//		}).fail(function () {
//			ApliJs.loadingbar().hide();
//			ApliJs.alert().error("Terjadi kesalahan pada saat memproses permintaan Anda.");
//		});
//	},

	panelAfterRender: function () {
		// silent  
	},
	klaimKomisiaddDeleteDetail: function () {
		var me = this;
		var gd = me.getGriddetail();
		var recs = gd.getSelectionModel().getSelection();
		for (var i = recs.length - 1; i >= 0; i--) {
			var headerId = recs[i].get("klaimkomisidetail_id");
			if (me.tools.intval(headerId) > 0) {

				var el = "#" + me.klaimKomisiModalId + " input[name=deleted_rows]";
				$(el).val($(el).val() + "" + headerId + "~");
			}
			gd.getStore().removeAt(gd.getStore().indexOf(recs[i]));
			me.hitungTotal();
		}
	},
	klaimKomisiaddNewDetail: function () {
		var me = this;
		var params = {};
		ApliJs.showHtml(me, "browse_purchaseletter_modal", params, 'create');
	},
	deleteData: function () {
		var me = this;
		var rec = me.getGrid().getSelectedRecord();
		if (rec) {
			ApliJs.loadingbar().show("Menghapus Klaim Komisi...");
			$.ajax({
				method: "POST",
				url: "erems/klaimkomisi/delete/",
				data: {mode_read: "main", klaimkomisi_id: rec.get("klaimkomisi_id")}
			}).done(function (msg) {
				ApliJs.loadingbar().hide();
				if (msg.status > 0) {
					ApliJs.alert().success("Klaim Komisi :" + rec.get("nomor_pengajuan") + " telah di hapus.");
					me.getGrid().getStore().loadPage(1);
				} else {

					ApliJs.alert().warning("Terjadi kesalahan pada saat menghapus Klaim Komisi.");
				}
			});
		} else {
			ApliJs.alert().warning("Silahkan memilih Klaim Komisi yang ingin dihapus.");
		}


	},
	gridItemDblClick: function (foo, data) {
		var me = this;
		var params = {};
		ApliJs.showHtml(me, "formdata_modal", params, 'update');
	},
	execAction: function (el, action, me) {
		/* KOSONG */
	},
	klaimkomisigridAfterRender: function (configs) {
		//  this.callParent(arguments);
		var me = this;
		// aplijs config

        if(me.references.includes('formsearch')){
            var form = me.getFormsearch();
            me.textfield = Ext.ComponentQuery.query('[xtype=textfield]', form);
            
            for (var i=0;i<me.textfield.length;i++) {
                Ext.applyIf(me.textfield[i], {enableKeyEvents: true});
                
                me.textfield[i].on('keypress', function(e, el){
                    if (el.getCharCode() === 13) {
                        me.dataSearch();
                    }
                });
            }
        }

		ApliJs.gridSelect = {
			'browsePl': {
				'loadData': function (page, limit, start) {
					me.apliJsFuncbrowse_purchaseletter_modal('klaimkomisi_browse_purchaseletter_modal_ID').loadData(page, limit, start);
				}
			},
			'browseMaster': {
				'loadData': function (page, limit, start) {
					me.apliJsFuncbrowse_master_modal('klaimkomisi_browse_master_modal_ID').loadData(page, limit, start);
				}
			}
		};
		me.getGrid().doInit();
		var pg = me.getGrid().down("pagingtoolbar");
		if (pg) {
			//  console.log("Hellloxxxx");
			pg.getStore().load({
				params: {},
				callback: function (rec, op) {
					me.getGrid().attachModel(op);
				}
			});
		}

		/*
		 me.getGrid().getStore().load({
		 params: {},
		 callback: function (rec, op) {
		 me.getGrid().attachModel(op);
		 
		 var pg = me.getGrid().down("pagingtoolbar");
		 if (pg) {
		 pg.getStore().load();
		 }
		 }
		 });
		 */


//		me.tools.ajax({
//			params: {},
//			success: function (data, model) {
//
//				me.tools.wesea(data.paymentmethods, me.getFormsearch().down("[name=paymentmethod_id]")).comboBox(true);
//				me.tools.wesea(data.blocks, me.getFormsearch().down("[name=block_id]")).comboBox(true);
//				me.tools.wesea(data.clusters, me.getFormsearch().down("[name=cluster_id]")).comboBox(true);
//			}
//		}).read('init');
		// TEST MODAL BOOTSTRAP
		var viewParams = {
			test: 0,
		};
		// add loading Bar
		ApliJs.loadingbar().init();
	},
	apliJsFuncprint: function (modalId) {
		var me = this;
		var x = {
			init: function () {

			},
			formInit: function (callback) {
				ApliJs.form("#" + modalId + " form").resetValue();
			},
			afterRender: function () {
				me.klaimKomisiPrintModalId = modalId;
				$('#' + modalId + ' button[abc-action=print]').click(function () {

					me.klaimkomisiAftershowPdf();
				});
			}
		};
		return x;
	},
	apliJsFuncformdata_modal: function (modalId) {
		var me = this;
		var x = {
			init: function () {

			},
			formInit: function (callback) {
				ApliJs.form("#" + modalId + " form").resetValue();
				$.ajax({
					method: "POST",
					url: "erems/klaimkomisi/read/",
					data: {mode_read: 'loadforminit', tanggal: moment().format("YYYY-MM-DD")}
				}).done(function (msg) {

					//  console.log(msg);


					me.klaimKomisiDataSalesman = msg.salesmans[1];
					me.klaimKomisiDataCitraClub = msg.clubcitras[1];
					me.project_name = msg.project_name;
					me.pt_name = msg.pt_name;
					/*
					 var cc = msg.clubcitras[1];
					 var optionTextCC = "";
					 optionTextCC += "<option value='0'>---</option>";
					 for (var i in cc) {
					 optionTextCC += "<option value='" + cc[i]["citraclub_id"] + "'>" + cc[i]["clubname"] + "</option>";
					 }
					 $('#' + modalId + " form select[name=agent_id]").html(optionTextCC);
					 */

					callback(msg);
				});
			},
			afterRender: function () {

				me.klaimKomisiModalId = modalId;
				$('#' + modalId).on('shown.bs.modal', function () {



					var action = $('#' + modalId).attr("abc-action");
					//load extjs grid
					//console.log($("#kotak_table").html());
					if ($("#kotak_table").html() === "") {
						Ext.create('Erems.view.klaimkomisi.GridDetail', {
							height: 200,
							width: 863,
							renderTo: "kotak_table"
						});
					}

					var gd = me.getGriddetail();
					gd.doInit();
					me.getGriddetail().down("[action=create]").setDisabled(true);
					//gd.down("pagingtoolbar").getStore().loadPage(1);





					if (action === "create") {
						$('#' + modalId + ' h4.modal-title .teks').text("New Klaim Komisi");
						me.apliJsFuncformdata_modal(modalId).formInit(function (msg) {
							$('#' + modalId + ' input[name=nomor_pengajuan]').val(msg.nomor);
							me.generateNote();
						});
						$('#' + modalId + ' input[name=tgl_pengajuan]').val(moment(new Date()).format('DD-MM-YYYY'));
						gd.down("pagingtoolbar").getStore().getProxy().setExtraParam("klaimkomisi_id", 0);
						gd.down("pagingtoolbar").getStore().load({
							params: {},
							callback: function (rec, op) {
								gd.attachModel(op);
							}
						});
						//  me.apliJsFuncformdata_modal(modalId).loadFormInit();

					} else {

						var rec = me.getGrid().getSelectedRecord();
						//console.log(rec);
						if (rec) {
							$('#' + modalId + ' h4.modal-title .teks').text("Edit Klaim Komisi");
							me.apliJsFuncformdata_modal(modalId).formInit(function () {

								ApliJs.loadingbar().show("Mengambil Klaim Komisi...");
								$.ajax({
									method: "POST",
									url: "erems/klaimkomisi/read/",
									data: {mode_read: "oneklaimkomisi", klaimkomisi_id: rec.get("klaimkomisi_id")}
								}).done(function (msg) {
									// console.log(msg);
									var fa = msg.klaimkomisi[0][0];
									ApliJs.form("#" + modalId + " form").loadData(fa);
									/// set radio checked
									var $radios = $("#" + modalId + " input:radio[name=tipe_agent]");
									$radios.filter('[value=' + fa['tipe_agent'] + ']').prop('checked', true);
									me.apliJsFuncformdata_modal(modalId).refreshAgentSelect(fa['tipe_agent']);
									$("#" + modalId + " [name=agent_id]").val(fa['agent_id']);
									ApliJs.loadingbar().hide();
								}).fail(function (msg) {
									ApliJs.loadingbar().hide();
									ApliJs.alert().error("Something problem when processing your request.");
								});
								gd.down("pagingtoolbar").getStore().getProxy().setExtraParam("klaimkomisi_id", rec.get("klaimkomisi_id"));
								gd.down("pagingtoolbar").getStore().load({
									params: {},
									callback: function (rec, op) {
										gd.attachModel(op);
									}
								});
							});
						} else {
							ApliJs.alert().warning("Silahkan memilih Klaim Komisi terlebih dahulu.");
						}


					}



				});
				ApliJs.form('#' + modalId + ' form').initEvent();
				$('#' + modalId + ' button[abc-action=save]').click(function () {





					$('#' + modalId + ' button[abc-action=save]').prop('disabled', true);
					var dataForm = ApliJs.form("#" + modalId + " form").serialize();
					ApliJs.loadingbar().show("Sedang menyimpan...");
					var action = $('#' + modalId).attr("abc-action");
					// console.log($("#myModal form").serialize());
					$.ajax({
						method: "POST",
						// url: "erems/klaimkomisi/read/",
						//  data: {mode_read: action === "create" ? "save" : "update", data: JSON.stringify(dataForm), detail: JSON.stringify(me.getGriddetail().getJson())}
						url: action === "create" ? "erems/klaimkomisi/create/" : "erems/klaimkomisi/update/",
						data: {mode_read: "main", data: JSON.stringify(dataForm), detail: JSON.stringify(me.getGriddetail().getJson())}

					}).done(function (msg) {

						ApliJs.loadingbar().hide();
						$('#' + modalId + ' button[abc-action=save]').prop('disabled', false);
						if (!msg.STATUS) {
							ApliJs.alert().warning(msg.MSG);
							// alert(msg.MSG);
						} else {
							ApliJs.alert().success("Permintaan Komisi berhasil disimpan !");
							// alert("Sukses simpan payment !");
							$("#" + modalId).modal('hide');
							me.getGrid().getStore().loadPage(1);
						}

					});
				});
				$('#' + modalId + ' #ktBrowsePLID').click(function (event) {
					event.preventDefault();
					//alert("Browse PL");
					var params = {};
					ApliJs.showHtml(me, "browse_purchaseletter_modal", params, 'create');
				});
//				$(document).on('change','#agent_id_ID',function () {
				$('#' + modalId + " form select[name=agent_id]").change(function () {
					if (this.value > 0) {
						me.getGriddetail().down("[action=create]").setDisabled(false);
					} else {
						me.getGriddetail().down("[action=create]").setDisabled(true);
					}
				});
				$('#' + modalId + ' input[type=radio][name=tipe_agent]').change(function () {

					me.apliJsFuncformdata_modal(modalId).refreshAgentSelect(this.value);
					/// hapus detail
					//me.getGriddetail().getStore().loadData([], false);
					me.getGriddetail().getSelectionModel().selectAll();
					me.klaimKomisiaddDeleteDetail();
					;
				});
			},
			getNomor: function () {
				$.ajax({
					method: "POST",
					url: "erems/klaimkomisi/read/",
					data: {mode_read: 'getnomor', tanggal: $('#' + modalId + ' input[name=klaimkomisi_date]').val()}
				}).done(function (msg) {

					// console.log(msg);
					$('#' + modalId + ' input[name=klaimkomisi_no]').val(msg.DATA);
				});
			},
			refreshAgentSelect: function (tipeAgent) {
				if (tipeAgent == 1) {
					var cc = me.klaimKomisiDataSalesman;
					var optionTextCC = "";
					optionTextCC += "<option value='0'>---</option>";
					for (var i in cc) {
						optionTextCC += "<option value='" + cc[i]["employee_id"] + "'>" + cc[i]["employee_name"] + "</option>";
					}
					$('#' + modalId + " form select[name=agent_id]").html("");
					$('#' + modalId + " form select[name=agent_id]").html(optionTextCC);
				} else {
					var cc = me.klaimKomisiDataCitraClub;
					var optionTextCC = "";
					optionTextCC += "<option value='0'>---</option>";
					for (var i in cc) {
						optionTextCC += "<option value='" + cc[i]["citraclub_id"] + "'>" + cc[i]["clubname"] + "</option>";
					}
					$('#' + modalId + " form select[name=agent_id]").html("");
					$('#' + modalId + " form select[name=agent_id]").html(optionTextCC);
				}
			}

		};
		return x;
	},
	hitungTotal: function () {
		var me = this;
		var nilai = 0;
		var pph = 0;
		var pphpt = 0;
		var ppn = 0;
		var totalBayar = 0;
		var s = me.getGriddetail().getStore();
		for (var i = 0; i < s.getCount(); i++) {
			ppn += accounting.unformat(s.getAt(i).get("ppn"));
			pph += accounting.unformat(s.getAt(i).get("pph"));
			pphpt += accounting.unformat(s.getAt(i).get("pphpt"));
			totalBayar += accounting.unformat(s.getAt(i).get("nilai_bayar"));
			nilai += accounting.unformat(s.getAt(i).get("nilai_komisi"));
		}

		$("#" + me.klaimKomisiModalId + " input[name=nilai_komisi]").val(accounting.formatMoney(nilai));
		$("#" + me.klaimKomisiModalId + " input[name=pph]").val(accounting.formatMoney(pph));
		$("#" + me.klaimKomisiModalId + " input[name=pphpt]").val(accounting.formatMoney(pphpt));
		$("#" + me.klaimKomisiModalId + " input[name=ppn]").val(accounting.formatMoney(ppn));
		$("#" + me.klaimKomisiModalId + " input[name=total_bayar]").val(accounting.formatMoney(totalBayar));
	},
	apliJsFuncbrowse_purchaseletter_modal: function (modalId) {
		var me = this;
		var x = {
			init: function () {
				ApliJs.grid('#' + modalId).initEvent('browsePl');
			},
			afterRender: function () {
				$('#' + modalId).on('shown.bs.modal', function () {

					me.apliJsFuncbrowse_purchaseletter_modal(modalId).loadData(1, 25, 0);
				});
				$("#purchaseSubmitSelectedBtn").click(function (event) {
					event.preventDefault();
					/// cek jika ada yang di ceked
					//$("#ktPurchaseParamListId input.abccheckbox_row").each();

					var gd = me.getGriddetail();
					var adaDiCentang = false;
					var ids = [];
					$("#ktPurchaseParamListId input.abccheckbox_row").each(function () {



						if (this.checked) {
							adaDiCentang = true;
							ids.push($(this).attr("komisitran_id"));
						}

					});
					if (adaDiCentang) {

						ApliJs.loadingbar().show("Sedang mengambil informasi permintaan komisi terseleksi...");
						$.ajax({
							method: "POST",
							url: "erems/klaimkomisi/read/",
							data: {start: 0, page: 1, limit: 25, mode_read: "selectedkomisitran", ids: ids.join("~")}
						}).done(function (msg) {
							$('#' + modalId).modal('hide');
							ApliJs.loadingbar().hide();
							var pls = msg["DATA"][1];
							// all komisitran di tabel detail sebelumnya
							var oldKomisiTran = [];
							for (var i = 0; i < gd.getStore().getCount(); i++) {
								oldKomisiTran.push(me.tools.intval(gd.getStore().getAt(i).get("purchaseletter_purchaseletter_id")));
							}
							var count = 0;
							// console.log(oldKomisiTran);
							for (var i in pls) {
								if (oldKomisiTran.indexOf(me.tools.intval(pls[i]["purchaseletter_purchaseletter_id"])) < 0) {
									gd.getStore().add({
										purchaseletter_purchaseletter_id: pls[i]["purchaseletter_purchaseletter_id"],
										purchaseletter_purchaseletter_no: pls[i]["purchaseletter_purchaseletter_no"],
										purchaseletter_purchase_date: pls[i]["purchaseletter_purchase_date"],
										price_harga_neto: pls[i]["price_harga_neto"],
										customer_name: pls[i]["customer_name"],
										unit_unit_number: pls[i]["unit_unit_number"],
										cluster_code: pls[i]["cluster_code"],
										nilai_komisi: pls[i]["komisitran_komisinilai_ybs"],
										nilai_bayar: pls[i]["komisitran_komisibayar_ybs"],
										pph: pls[i]["komisitran_komisipph_ybs"],
										pphpt: pls[i]["komisitran_komisipphpt_ybs"],
										komisitran_komisitran_id: pls[i]["komisitran_id"],
										ppn: pls[i]["komisitran_komisippn_ybs"]
									});
									count++;
								}
							}

							if (count == 0) {
								ApliJs.alert().warning("Purchaseletter sudah diinput untuk sesi kali ini.");
							}
							me.hitungTotal();
							me.generateNote();
						});
					}
				});
			},
			loadData: function (page, limit, start) {
				//  var modalId = "myModalSPPJBParamID";
				var saya = this;
				ApliJs.loadingbar().show("Sedang mengambil daftar purchaseletter...");
				$.ajax({
					method: "POST",
					url: "erems/klaimkomisi/read/",
					data: {start: start, page: page, limit: limit, mode_read: "komisitranlist", unit_number: $("#" + modalId + " input[name=unit_number]").val(), agent_id: $("#" + me.klaimKomisiModalId + " select[name=agent_id]").val(), tipe_agent: $("#" + me.klaimKomisiModalId + " input[name=tipe_agent]:checked").val()}
				}).done(function (msg) {
					$("#" + modalId + " button[name=submit_search]").prop('disabled', false);
					ApliJs.loadingbar().hide();
					var plparams = msg["DATA"][1];
					var rows = "";
					var count = (page * limit) - limit + 1;
					for (var i in plparams) {
						rows += "<tr komisitran_id='" + plparams[i]["komisitran_id"] + "'>" +
								"<td class='general' style='width:30px;'>" + count + "</td>" +
								"<td class='general' style='width:30px;'><input type='checkbox' class='abccheckbox_row' komisitran_id='" + plparams[i]["komisitran_id"] + "' /></td>" +
								"<td style='width:70px;'>" + plparams[i]["unit_unit_number"] + "</td>" +
								"<td style='width:70px;'>" + plparams[i]["cluster_cluster"] + "</td>" +
								"<td style='width:70px;'>" + plparams[i]["type_name"] + "</td>" +
								"<td style='width:150px;'>" + plparams[i]["purchaseletter_no"] + "</td>" +
								"<td style='width:150px;'>" + plparams[i]["customer_name"] + "</td>" +
								"<td style='width:70px;' >&nbsp;</td>" +
								"</tr>";
						count++;
					}

					$("#ktPurchaseParamListId tbody").html(rows);
					/// update paging info
					ApliJs.grid('#' + modalId).updatePagingInfo({
						data: plparams,
						page: page,
						totalData: msg["DATA"][0][0]["totalRow"],
						limit: limit
					});
					// end update paging info



				}).fail(function () {
					ApliJs.loadingbar().hide();
					ApliJs.alert().error("Terjadi kesalahan pada saat memproses permintaan Anda.");
				});
			}
		};
		return x;
	},
	generateNote: function () {
		var me = this;
		var gd = me.getGriddetail();
		var recs = gd.getStore().data.items
		for (var i in recs) {
			unit = recs[i].data.unit_unit_number;
			custname = recs[i].data.customer_name;
		}
		var str = ""; //"KOMISI PENJUALAN " + me.project_name + " BLOK " + unit.trim() + " AN " + custname.trim() + "\n"
		str += "BANK \n"
		str += "FAX \n"
		$('#' + me.klaimKomisiModalId + ' textarea[name=note]').val(str);
	},
	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		var edit = grid.down('#btnEdit');
		var print = grid.down('#btnPrint');
		var deleteb = grid.down('#btnDelete');
		if (edit !== null) {
			edit.setDisabled(row.length != 1);
		}
		if (print !== null) {
			print.setDisabled(row.length != 1);
		}
		if (deleteb !== null) {
			deleteb.setDisabled(row.length < 1);
		}
	},
});
