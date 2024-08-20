Ext.define('Erems.controller.Komisitran', {
	extend: 'Erems.library.template.controller.Controller2',
	alias: 'controller.Komisitran',
	views: ['komisitran.Panel', 'komisitran.Grid', 'komisitran.FormSearch'],
	refs: [
		{
			ref: 'grid',
			selector: 'komisitrangrid'
		},

		{
			ref: 'panel',
			selector: 'komisitranpanel'
		},
		{
			ref: 'formsearch',
			selector: 'komisitranformsearch'
		}

	],
	controllerName: 'komisitran',
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
	bindPrefixName: 'Komisitran',
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
	modelKomisi: null,
	fieldKomisi: ['ybs', 'sales_co', 'head_sales', 'head_adm', 'team', 'kas', 'manager_marketing', 'manager_marketing2', 'gm_sales_marketing', 'assdir_sales_marketing', 'support_proyek', 'support1', 'gm_sales_marketing1'],
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

						console.log("[INFO] ApliJs loaded.");

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
			'komisitranpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'komisitrangrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'komisitrangrid toolbar button[action=create]': {
				click: function () {
					// me.showFormdata("create");
					//   ApliJs.modal("formdata_modal").show("create");
					var params = {};
					ApliJs.showHtml(me, "formdata_modal", params, 'create');
				}
			},
			'komisitrangrid toolbar button[action=update]': {
				click: function () {
					//me.showFormdata("update");
					var params = {};
					ApliJs.showHtml(me, "formdata_modal", params, 'update');
				}
			},
			'komisitranformsearch button[action=search]': {
				click: this.dataSearch
			},
			'komisitranformsearch button[action=reset]': {
				click: this.dataReset
			},
			'komisitrangrid toolbar button[action=destroy]': {
				click: function () {
					me.deleteData();
				}
			},
			'komisitrangrid button[action=print]': {
				click: this.showPdf
			},

		});
	},
	showPdf: function () {
		var me = this;
		var p = me.getPanel();



		var recs = me.getGrid().getSelectionModel().getSelection();



		if (recs.length == 0) {
			return;
		}

		p.setLoading("Please wait..");



		var id = recs[0].get("komisitran_id");
		me.tools.ajax({
			params: {
				komisitran_id: id
			},
			success: function (data, model) {
				p.setLoading(false);

				//  var url = data['others'][0][0]['URL'];
				//   var display = data['others'][0][0]['DISPLAY'];





				if (data['HASIL']) {
					//  window.open(data['FILE']);

					var mywindow = window.open('', 'PRINT', 'height=500,width=750');

					mywindow.document.write(data['KONTEN']);


					mywindow.document.close(); // necessary for IE >= 10
					mywindow.focus();
				} else {
					me.tools.alert.error("Terjadi kesalahan ketika membuat file cetakan.");
				}
			}
		}).read('printpdf');

	},
	deleteData: function () {
		var me = this;
		var rec = me.getGrid().getSelectedRecord();
		if (rec) {
			ApliJs.loadingbar().show("Menghapus Permintaan Komisi...");


			$.ajax({
				method: "POST",
				url: "erems/komisitran/read/",
				data: {mode_read: "hapus", komisitran_id: rec.get("komisitran_id")}
			}).done(function (msg) {
				ApliJs.loadingbar().hide();
				if (msg.status > 0) {
					ApliJs.alert().success("Permintaan Komisi :" + rec.get("komisitran_no") + " telah di hapus.");
					me.getGrid().getStore().loadPage(1);
				} else {

					ApliJs.alert().warning("Terjadi kesalahan pada saat menghapus Permintaan Komisi.");
				}
			});
		} else {
			ApliJs.alert().warning("Silahkan memilih Permintaan Komisi yang ingin dihapus.");

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
	gridAfterRender: function (configs) {
		this.callParent(arguments);
		var me = this;

		// aplijs config

		ApliJs.gridSelect = {
			'browsePl': {
				'loadData': function (page, limit, start) {
					me.apliJsFuncbrowse_purchaseletter_modal('komisitran_browse_purchaseletter_modal_ID').loadData(page, limit, start);
				}
			},
			'browseMaster': {
				'loadData': function (page, limit, start) {
					me.apliJsFuncbrowse_master_modal('komisitran_browse_master_modal_ID').loadData(page, limit, start);
				}
			}
		};



		me.getGrid().doInit();
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

//		me.tools.ajax({
//			params: {},
//			success: function (data, model) {
//
//				me.tools.wesea(data.paymentmethods, me.getFormsearch().down("[name=paymentmethod_id]")).comboBox(true);
//				me.tools.wesea(data.blocks, me.getFormsearch().down("[name=block_id]")).comboBox(true);
//				me.tools.wesea(data.clusters, me.getFormsearch().down("[name=cluster_id]")).comboBox(true);
//
//
//
//			}
//		}).read('init');

		// TEST MODAL BOOTSTRAP
		var viewParams = {
			test: 0,

		};

		// add loading Bar
		ApliJs.loadingbar().init();

	},

	apliJsFuncformdata_modal: function (modalId) {
		var me = this;
		var x = {
			init: function () {

			},
			formInit: function (callback) {
				ApliJs.form("#" + modalId + " form").resetValue();

				callback();
			},
			afterRender: function () {

				$('#' + modalId).on('shown.bs.modal', function () {



					var action = $('#' + modalId).attr("abc-action");


					if (action === "create") {
						$('#' + modalId + ' h4.modal-title .teks').text("New Permintaan Komisi");

						me.apliJsFuncformdata_modal(modalId).formInit(function () {

						});

						$('#' + modalId + ' input[name=komisitran_date]').val(moment(new Date()).format('DD-MM-YYYY'));
						me.apliJsFuncformdata_modal(modalId).getNomor();

					} else {

						var rec = me.getGrid().getSelectedRecord();
						//console.log(rec);
						if (rec) {
							$('#' + modalId + ' h4.modal-title .teks').text("Edit Permintaan Komisi");

							me.apliJsFuncformdata_modal(modalId).formInit(function () {

								ApliJs.loadingbar().show("Mengambil Permintaan Komisi...");


								$.ajax({
									method: "POST",
									url: "erems/komisitran/read/",
									data: {mode_read: "detail", komisitran_id: rec.get("komisitran_id")}
								}).done(function (msg) {
									// console.log(msg);
									var fa = msg.komisitran[0][0];
									ApliJs.form("#" + modalId + " form").loadData(fa);

									$("#komisitran_formdata_modal_ID form input[name='purchaseletter_purchaseletter_id']").val(fa['purchaseletter_id']);
									$("#komisitran_formdata_modal_ID form input[name='purchaseletter_purchaseletter_no']").val(fa['purchaseletter_no']);

									$("#komisitran_formdata_modal_ID form input[name='purchaseletter_purchase_date']").val(moment(fa['purchase_date']).format("DD-MM-YYYY"));
									$("#komisitran_formdata_modal_ID form input[name='harganetto_klaim']").val(accounting.formatMoney(fa['price_harga_neto']));
									$("#komisitran_formdata_modal_ID form textarea[name='customer_address']").text(fa['customer_address']);

									ApliJs.loadingbar().hide();





								}).fail(function (msg) {
									ApliJs.loadingbar().hide();
									ApliJs.alert().error("Something problem when processing your request.");
								});
							});

							// $('#myModal form').find("input[type=text], textarea").val("");

							// $('#formPaySaveId').prop('disabled', false);

							// $('#browseUnitBtnID').prop('disabled', false);




						} else {
							ApliJs.alert().warning("Silahkan memilih Permintaan Komisi terlebih dahulu.");
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
						url: "erems/komisitran/read/",
						data: {mode_read: action === "create" ? "save" : "update", data: JSON.stringify(dataForm)}
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

				$('#' + modalId + ' #ktBrowseMasterID').click(function (event) {
					event.preventDefault();
					//alert("Browse Master");
					var params = {};
					ApliJs.showHtml(me, "browse_master_modal", params, 'create');


				});


				$('#' + modalId + ' input[name=harganetto_klaim]').keyup(function () {

					me.apliJsFuncformdata_modal(modalId).hitungKomisi();

				});

				$('#' + modalId + ' .abcmoney').change(function (event) {
					me.apliJsFuncformdata_modal(modalId).hitungKomisiPerBaris($(this).attr('field'))
				});

				$('#' + modalId + ' input[name=komisitran_date]').change(function () {

					var action = $('#' + modalId).attr("abc-action");
					if (action === "create") {
						me.apliJsFuncformdata_modal(modalId).getNomor();

					}


				});


			},
			getNomor: function () {
				$.ajax({
					method: "POST",
					url: "erems/komisitran/read/",
					data: {mode_read: 'getnomor', tanggal: $('#' + modalId + ' input[name=komisitran_date]').val()}
				}).done(function (msg) {
					//Add by RH 21/11/2019
					me.modelKomisi = msg.MODELKOMISI;
					//END Add by RH 21/11/2019
					// console.log(msg);
					$('#' + modalId + ' input[name=komisitran_no]').val(msg.DATA);

				});
			},
			hitungTotal: function () {
				var totalPersen = 0;
				var totalNilai = 0;
				var totalDpp = 0;
				var totalBayar = 0;
				var totalPpn = 0;
				var totalPph = 0;
				var totalPphPT = 0;
				for (var i in me.fieldKomisi) {
					totalPersen += accounting.unformat($('#' + modalId + ' input[name=komisi_' + me.fieldKomisi[i] + ']').val());
					totalNilai += accounting.unformat($('#' + modalId + ' input[name=komisinilai_' + me.fieldKomisi[i] + ']').val());
					totalDpp += accounting.unformat($('#' + modalId + ' input[name=komisidpp_' + me.fieldKomisi[i] + ']').val());
					totalBayar += accounting.unformat($('#' + modalId + ' input[name=komisibayar_' + me.fieldKomisi[i] + ']').val());
					totalPpn += accounting.unformat($('#' + modalId + ' input[name=komisippn_' + me.fieldKomisi[i] + ']').val());
					totalPph += accounting.unformat($('#' + modalId + ' input[name=komisipph_' + me.fieldKomisi[i] + ']').val());
					totalPphPT += accounting.unformat($('#' + modalId + ' input[name=komisipphpt_' + me.fieldKomisi[i] + ']').val());
				}
				$('#' + modalId + ' input[name=total_komisipersen]').val(accounting.formatMoney(totalPersen));
				$('#' + modalId + ' input[name=total_komisinilai]').val(accounting.formatMoney(totalNilai));
				$('#' + modalId + ' input[name=total_komisippn]').val(accounting.formatMoney(totalPpn));
				$('#' + modalId + ' input[name=total_komisidpp]').val(accounting.formatMoney(totalDpp));
				$('#' + modalId + ' input[name=total_komisibayar]').val(accounting.formatMoney(totalBayar));
				$('#' + modalId + ' input[name=total_komisipph]').val(accounting.formatMoney(totalPph));
				$('#' + modalId + ' input[name=total_komisipphpt]').val(accounting.formatMoney(totalPphPT));
			},
			hitungKomisiPerBaris: function (field) {
				var hrgNetKlaim = accounting.unformat($('#' + modalId + ' input[name=harganetto_klaim]').val());
				var hrgNet = accounting.unformat($('#' + modalId + ' input[name=price_harga_neto]').val());

				if (hrgNetKlaim > hrgNet) {
					$('#' + modalId + ' input[name=harganetto_klaim]').val(hrgNet);
					ApliJs.alert().warning("Nilai klaim maksimal Rp. " + accounting.formatMoney(hrgNet));

					return;
				}

				var persen = accounting.unformat($('#' + modalId + ' input[name=komisi_' + field + ']').val());
				var nilai = (persen / 100) * hrgNetKlaim;
				var totalPpn = accounting.unformat($('#' + modalId + ' input[name=komisippn_' + field + ']').val());
				var dpp = 0;
				if (me.modelKomisi == 2) {
					dpp = nilai + totalPpn;
				} else {
					dpp = nilai - totalPpn;
				}
				var totalPph = accounting.unformat($('#' + modalId + ' input[name=komisipph_' + field + ']').val());
				var totalPphPT = accounting.unformat($('#' + modalId + ' input[name=komisipphpt_' + field + ']').val());
				var bayar = dpp - totalPph - totalPphPT;

				$('#' + modalId + ' input[name=komisidpp_' + field + ']').val(accounting.formatMoney(dpp));
				$('#' + modalId + ' input[name=komisibayar_' + field + ']').val(accounting.formatMoney(bayar));
				me.apliJsFuncformdata_modal(modalId).hitungTotal();
			},
			hitungKomisi: function () {
				var hrgNetKlaim = accounting.unformat($('#' + modalId + ' input[name=harganetto_klaim]').val());
				var hrgNet = accounting.unformat($('#' + modalId + ' input[name=price_harga_neto]').val());

				if (hrgNetKlaim > hrgNet) {
					$('#' + modalId + ' input[name=harganetto_klaim]').val(hrgNet);
					ApliJs.alert().warning("Nilai klaim maksimal Rp. " + accounting.formatMoney(hrgNet));
					me.apliJsFuncformdata_modal(modalId).hitungKomisi();
					return;
				}

				var totalPersen = 0;
				var totalNilai = 0;
				var totalDpp = 0;
				var totalBayar = 0;
				var grandTotalPpn = 0;
				var grandTotalPph = 0;
				var grandTotalPphPT = 0;
				var pph = accounting.unformat($('#' + modalId + ' input[name=pph]').val());
				var pphpt = accounting.unformat($('#' + modalId + ' input[name=pphpt]').val());
				var ppn = accounting.unformat($('#' + modalId + ' input[name=ppn]').val());
				for (var i in me.fieldKomisi) {
					var persen = accounting.unformat($('#' + modalId + ' input[name=komisi_' + me.fieldKomisi[i] + ']').val());
					var nilai = (persen / 100) * hrgNetKlaim;
					var totalPpn = (ppn / 100) * nilai;
					var dpp = 0;
					if (me.modelKomisi == 2) {
						dpp = nilai + totalPpn;
					} else {
						dpp = nilai - totalPpn;
					}
					var totalPph = (pph / 100) * dpp;
					var totalPphPT = (pphpt / 100) * dpp;

					// var `bayar = (persen / 100) * hrgNetKlaim;
					var bayar = dpp - totalPph - totalPphPT;
//					var bayar = 0;
//					if (me.modelKomisi == 2) {
//						bayar = dpp - totalPphPT;
//					} else {
//						bayar = dpp - totalPph;
//					}



					$('#' + modalId + ' input[name=komisipph_' + me.fieldKomisi[i] + ']').val(accounting.formatMoney(totalPph));
					$('#' + modalId + ' input[name=komisipphpt_' + me.fieldKomisi[i] + ']').val(accounting.formatMoney(totalPphPT));
					$('#' + modalId + ' input[name=komisippn_' + me.fieldKomisi[i] + ']').val(accounting.formatMoney(totalPpn));
					$('#' + modalId + ' input[name=komisinilai_' + me.fieldKomisi[i] + ']').val(accounting.formatMoney(nilai));
					$('#' + modalId + ' input[name=komisidpp_' + me.fieldKomisi[i] + ']').val(accounting.formatMoney(dpp));
					$('#' + modalId + ' input[name=komisibayar_' + me.fieldKomisi[i] + ']').val(accounting.formatMoney(bayar));
					totalPersen += persen;
					totalNilai += nilai;
					totalDpp += dpp;
					totalBayar += bayar;
					grandTotalPpn += totalPpn;
					grandTotalPph += totalPph;
					grandTotalPphPT += totalPphPT;
				}

				$('#' + modalId + ' input[name=total_komisipersen]').val(accounting.formatMoney(totalPersen));
				$('#' + modalId + ' input[name=total_komisinilai]').val(accounting.formatMoney(totalNilai));
				$('#' + modalId + ' input[name=total_komisippn]').val(accounting.formatMoney(grandTotalPpn));
				$('#' + modalId + ' input[name=total_komisidpp]').val(accounting.formatMoney(totalDpp));
				$('#' + modalId + ' input[name=total_komisibayar]').val(accounting.formatMoney(totalBayar));
				$('#' + modalId + ' input[name=total_komisipph]').val(accounting.formatMoney(grandTotalPph));
				$('#' + modalId + ' input[name=total_komisipphpt]').val(accounting.formatMoney(grandTotalPphPT));

			}

		};

		return x;

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

			},
			loadData: function (page, limit, start) {
				//  var modalId = "myModalSPPJBParamID";
				var saya = this;
				ApliJs.loadingbar().show("Sedang mengambil daftar purchaseletter...");

				$.ajax({
					method: "POST",
					url: "erems/komisitran/read/",
					data: {start: start, page: page, limit: limit, mode_read: "purchaseletterlist", unit_number: $("#" + modalId + " input[name=unit_number]").val(), customer_name: $("#" + modalId + " input[name=customer_name]").val()}
				}).done(function (msg) {
					$("#" + modalId + " button[name=submit_search]").prop('disabled', false);

					ApliJs.loadingbar().hide();


					var plparams = msg["DATA"][1];

					var rows = "";
					var count = (page * limit) - limit + 1;

					for (var i in plparams) {
						rows += "<tr purchaseletter_id='" + plparams[i]["purchaseletter_id"] + "'>" +
								"<td class='general' style='width:30px;'>" + count + "</td>" +
								"<td style='width:70px;'>" + plparams[i]["unit_unit_number"] + "</td>" +
								"<td style='width:70px;'>" + plparams[i]["cluster_cluster"] + "</td>" +
								"<td style='width:70px;'>" + plparams[i]["type_name"] + "</td>" +
								"<td style='width:150px;'>" + plparams[i]["purchaseletter_no"] + "</td>" +
								"<td style='width:150px;'>" + plparams[i]["customer_name"] + "</td>" +
								"<td style='width:70px;' ><button class='btn btn-primary btn-sm select_param' purchaseletter_id='" + plparams[i]["purchaseletter_id"] + "'>select</button></td>" +
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


					$("#ktPurchaseParamListId button.select_param").click(function (event) {
						event.preventDefault();
						var plId = $(this).attr("purchaseletter_id");
						// me.unitSelectviaApli(unitId);
						//$("#" + modalId).hide();
						$('#' + modalId).modal('hide');


						ApliJs.loadingbar().show("Sedang mengambil informasi purchaseletter...");

						$.ajax({
							method: "POST",
							url: "erems/komisitran/read/",
							data: {mode_read: "purchaseletterone", purchaseletter_id: plId, page: 1, limit: 1}
						}).done(function (msg) {
							ApliJs.loadingbar().hide();
							//   

							var pl = msg.DATA[1][0];

							console.log(pl);

							for (var x in pl) {
								$("#komisitran_formdata_modal_ID form input[name='" + x + "']").val(pl[x]);
							}

							$("#komisitran_formdata_modal_ID form input[name='purchaseletter_purchaseletter_id']").val(pl['purchaseletter_id']);
							$("#komisitran_formdata_modal_ID form input[name='purchaseletter_purchaseletter_no']").val(pl['purchaseletter_no']);

							$("#komisitran_formdata_modal_ID form input[name='purchaseletter_purchase_date']").val(moment(pl['purchase_date']).format("DD-MM-YYYY"));
							$("#komisitran_formdata_modal_ID form input[name='harganetto_klaim']").val(accounting.formatMoney(pl['price_harga_neto']));
							$("#komisitran_formdata_modal_ID form textarea[name='customer_address']").text(pl['customer_address']);

							$('#komisitran_formdata_modal_ID input.abcmoney').each(function () {
								$(this).val(accounting.formatMoney($(this).val()));
							});

							me.apliJsFuncformdata_modal("komisitran_formdata_modal_ID").hitungKomisi();


						});
					});
				});
			}
		};

		return x;

	},

	apliJsFuncbrowse_master_modal: function (modalId) {
		var me = this;
		var x = {
			init: function () {
				ApliJs.grid('#' + modalId).initEvent('browseMaster');
			},
			afterRender: function () {
				$('#' + modalId).on('shown.bs.modal', function () {

					me.apliJsFuncbrowse_master_modal(modalId).loadData(1, 25, 0);

				});

			},
			loadData: function (page, limit, start) {
				var saya = this;
				ApliJs.loadingbar().show("Sedang mengambil daftar master komisi...");

				$.ajax({
					method: "POST",
					url: "erems/komisitran/read/",
					data: {start: start, page: page, limit: limit, mode_read: "masterkomisilist", code: $("#" + modalId + " input[name=code]").val()}
				}).done(function (msg) {
					$("#" + modalId + " button[name=submit_search]").prop('disabled', false);

					ApliJs.loadingbar().hide();
					var mkparams = msg["DATA"][1];

					var rows = "";
					var count = (page * limit) - limit + 1;

					for (var i in mkparams) {
						rows += "<tr komisi_id='" + mkparams[i]["komisi_id"] + "'>" +
								"<td class='general' style='width:30px;' align='center'>" + count + "</td>" +
								"<td style='width:70px;' align='center'>" + mkparams[i]["code"] + "</td>" +
								"<td style='width:70px;' align='center'>" + mkparams[i]["komisihitung_code"] + "</td>" +
								"<td style='width:70px;' align='center'>" + accounting.toFixed(mkparams[i]["sales_co"], 2) + "</td>" +
								"<td style='width:70px;'><button class='btn btn-primary btn-sm select_param' komisi_id='" + mkparams[i]["komisi_id"] + "'>select</button></td>" +
								"</tr>";
						count++;
					}

					$("#ktMasterKomisiId tbody").html(rows);


					/// update paging info
					ApliJs.grid('#' + modalId).updatePagingInfo({
						data: mkparams,
						page: page,
						totalData: msg["DATA"][0][0]["totalRow"],
						limit: limit
					});



					// end update paging info


					$("#ktMasterKomisiId button.select_param").click(function (event) {
						event.preventDefault();
						var plId = $(this).attr("komisi_id");
						// me.unitSelectviaApli(unitId);
						//$("#" + modalId).hide();
						$('#' + modalId).modal('hide');


						ApliJs.loadingbar().show("Sedang mengambil informasi master komisi...");

						$.ajax({
							method: "POST",
							url: "erems/komisitran/read/",
							data: {mode_read: "masterkomisione", komisi_id: plId, page: 1, limit: 1}
						}).done(function (msg) {
							ApliJs.loadingbar().hide();
							//   

							var pl = msg.DATA[0][0];

//							console.log(pl);

							for (var x in pl) {
								$("#komisitran_formdata_modal_ID form input[name='komisi_" + x + "']").val(pl[x]);
							}

							$("#komisitran_formdata_modal_ID form input[name=pph]").val(pl["pph"]);
							$("#komisitran_formdata_modal_ID form input[name=pphpt]").val(pl["pph_pt"]);
							$("#komisitran_formdata_modal_ID form input[name=ppn]").val(pl["ppn"]);




							me.apliJsFuncformdata_modal("komisitran_formdata_modal_ID").hitungKomisi();

							// $("#sppjbsby_formdata_modal_ID form input[name='pihak1_parametersppjb_id']").val(pl['parametersppjb_id']);


						});
					});
				});
			}
		};

		return x;

	}



});
