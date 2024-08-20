Ext.define('Erems.controller.Gantinama', {
	extend: 'Erems.library.template.controller.Controller2',
	alias: 'controller.Gantinama',
	requires: ['Erems.library.Browse', 'Erems.library.box.Config',
		'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields',
		'Erems.library.box.tools.EventSelector',
		'Erems.library.ModuleTools'],
	views: ['gantinama.Panel', 'gantinama.Grid', 'gantinama.FormSearch', 'gantinama.FormData'],
	// stores: ['Gantinama', 'Unit', 'Mastercustomer'],
	//   models: ['Gantinama','Gantinamadetail', 'Unit', 'Mastercustomer'],
	refs: [
		{
			ref: 'grid',
			selector: 'gantinamagrid'
		},
		{
			ref: 'formsearch',
			selector: 'gantinamaformsearch'
		},
		{
			ref: 'formdata',
			selector: 'gantinamaformdata'
		},
		{
			ref: 'unitgrid',
			selector: 'gantinamaunitgrid'
		},
		{
			ref: 'panel',
			selector: 'gantinamapanel'
		},
		{
			ref: 'gridcustomer',
			selector: 'gantinamacustomergrid'
		},
		{
			ref: 'formprintout',
			selector: 'gantinamaformprintout'
		},
		{
			ref: 'mastercustomerformdata',
			selector: 'mastercustomerformdata'
		},
        {
            ref: 'mastercustomerformdatadocument',
            selector: 'mastercustomerformdatadocument'
        },
        {
            ref: 'mastercustomergriddocument',
            selector: 'mastercustomergriddocument'
        },
	],
	//  comboBoxIdEl: ['reasonchgname_cb'],
	controllerName: 'gantinama',
	fieldName: 'changename_id',
	bindPrefixName: 'Gantinama',
	validationItems: [{name: 'purchaseletter_id', msg: 'You must select purchase letter first'},
		{name: 'reasonchgname_id', msg: 'Reason change name is empty'},
		{name: 'changename_note', msg: 'Notes change name is empty'},
		{name: 'admistration_fee', msg: 'Admistration Fee is zero', f: 'number'}
	],
	//admistration_fee
	formWidth: 800,
	localStore: {
		detail: null,
		selectedUnit: null,
		customer: null
	},
	browseHandler: null,
	cbf: null,
	mt: null,
	selectedParameterSPPJB: null,
	verification_approval: false,
	isUsedVerification: false,
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
		var events = new Erems.library.box.tools.EventSelector();

		if (typeof Mustache === "undefined") {
			Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () {

				if (typeof ApliJs === "undefined") {
					Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js', function () {
						// console.log("[INFO] ApliJs loaded.");
					}, function () {
						// error load file
					});
				}
			}, function () {
				//  me.tools.alert.warning("Error load Prolibs.js file.");
			});
		}

		this.control({
			//  test: me.eventMonthField,
			'gantinamapanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'gantinamagrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'gantinamagrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'gantinamagrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'gantinamagrid toolbar button[action=view]': {
				click: function () {
					this.formDataShow('read');
				}
			},
			'gantinamagrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'gantinamagrid toolbar button[action=printmsword]': {
				click: function () {
					this.printMsWord();
				}
			},
			'gantinamagrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'gantinamagrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'gantinamaformsearch button[action=search]': {
				click: this.dataSearch
			},
			'gantinamaformsearch button[action=reset]': {
				click: this.dataReset
			},
			'gantinamaformdata': {
				afterrender: this.formDataAfterRender
			},
			'gantinamaformdata button[action=save]': {
				click: function () {
					me.mainDataSave();
				}
			},
			'gantinamaformdata button[action=approve]': {
				click: function () {
					me.mainDataSave(1); // 1 = approve
				}
			},
			'gantinamaformdata button[action=approvecoll]': {
				click: function () {
					me.mainDataSave(3); // 1 = approvecoll
				}

			},
			'gantinamaformdata button[action=reject]': {
				click: function () {
					me.mainDataSave(2); // 2 = reject
				}

			},
			'gantinamaformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'gantinamaformdata [name=reasonchgname_id]': {
				select: function (el, val) {
					me.seFi.cb('reasonchgname_code', el, 'code', val);
				}
			},
			'gantinamaformdata [name=reasonchgname_code]': {
				keyup: function (el) {

					me.seFi.tf('reasonchgname_id', el, {name: 'code', tipe: 'string'}, 'reasonchgname_id');
				}
			},
			'gantinamaformdata button[action=browse_unit]': {
				click: this.browseSoldUnit
			},
			'gantinamaunitgrid button[action=select]': {
				//                click: this.unitSelect
				click: this.cekApproval
			},
			'gantinamaformdata button[action=browse_customer]': {
				click: this.browseCustomer
			},
			'gantinamacustomergrid button[action=select]': {
				click: this.customerSelect
			},
			'gantinamaformdata button[action=create_new_customer]': {
				click: this.addCustomer
			},
			'gantinamaformdata button[action=create_new_customer2]': {
				click: this.addCustomer
			},
			'gantinamaparametersppjbgrid button[action=select]': {
				click: this.paramsppjbSelect
			},
			'gantinamaformprintout button[action=print]': {
				click: function () {
					me.formTemplatePrint();
				}
			},
			//rizal 2 April 2019

			'gantinamaformdata [name=is_satukk]': {
				change: function (field, newValue, oldValue, desc) {
					me.isSatuKKChange(newValue);
				}
			},
			'gantinamaformdata [name=cara_pembayaran_pph]': {
				change: function (field, newValue, oldValue, desc) {
					me.CaraPembayaranPPH(newValue);
				}
			},
			//////////////////////////// Master customer ////////////////////
            'mastercustomerformdata button[action=save]': {
                click: function(){
                	_myAppGlobal.getController('Mastercustomer').mainDataSave();
                }
            },
            'mastercustomerformdata button[action=documents]': {
                click: function() {
                	_myAppGlobal.getController('Mastercustomer').showDocuments();
                }
            },
            'mastercustomerformdata button[action=multi_address]': {
                click: function() {
                	_myAppGlobal.getController('Mastercustomer').showAddress();
                }
            },
            'mastercustomergriddocument button[action=create]': {
                click: function() {
                	_myAppGlobal.getController('Mastercustomer').griddocumentButtonClick('create');
                }
            },
            'mastercustomergriddocument button[action=update]': {
                click: function() {
                	_myAppGlobal.getController('Mastercustomer').griddocumentButtonClick('update');
                }
            },
            'mastercustomergriddocument button[action=destroy]': {
                click: function() {
                	_myAppGlobal.getController('Mastercustomer').griddocumentButtonClick('destroy');
                }
            },
            'mastercustomergriddocument actioncolumn': {
                downloadaction : _myAppGlobal.getController('Mastercustomer').actionColumnDownload
            },
            'mastercustomerformdatadocument #fd_file': {
                change: function(fld, a) {
                    _myAppGlobal.getController('Mastercustomer').formDataUploadFileDoc(fld, a, 'mode');
                }
            },
            'mastercustomerformdatadocument button[action=save]': {
                click: function(fld, a) {
                    _myAppGlobal.getController('Mastercustomer').saveDocument();
                }
            },
		});
	},
	/*
	 formTemplatePrint: function () {
	 var me = this;
	 var f = me.getFormprintout();
	 var vs = f.getValues();
	 var tpl = vs.template;
	 if (!tpl) {
	 me.tools.alert.warning("Invalid template printout.");
	 return;
	 }
	 f.up("window").close();
	 // console.log(vs);
	 var me = this;
	 
	 //var p = me.getPanel();
	 // p.setLoading("Please wait...");
	 var selectedCN = me.getGrid().getSelectedRecord();
	 
	 me.tools.printMsWord({
	 changename_id: selectedCN.get('changename_id'),
	 parametersppjb_id: me.selectedParameterSPPJB.get("parametersppjb_id"),
	 template: tpl
	 }, me.getPanel()).grid(me.getGrid());
	 
	 
	 
	 },
	 */
	printoutdoc: function () {
		//purchaseletterformprintout

		var me = this;
		me.instantWindow('FormPrintout', 700, 'Adendum Settings', "mysuperstate", 'myPrintoutWindow');
		var f = me.getFormprintout();
		var el = f.down("[name=template_name]");
		// console.log(me.templatePrint);

		var selectedCN = me.getGrid().getSelectedRecord();

		me.tools.ajax({
			params: {
				changename_id: selectedCN.get('changename_id')

			},
			success: function (data, model) {

				var changeName = data.changename.data;



				$.get(document.URL + 'app/erems/viewms/gantinama/formprintout.html', function (datatpl) {
					var view = {
						radio_file_list: ""
					};

					var strChecked = "";
					var countChecked = 0;
					for (var i in me.templatePrint) {
						if (countChecked == 0) {
							strChecked = "checked";
						} else {
							strChecked = "";
						}

						view.radio_file_list += '<div class="form-check">' +
								'<label class="form-check-label">' +
								'<input class="form-check-input" type="radio" name="template" value="' + me.templatePrint[i].value + '" ' + strChecked + '>     ' +
								me.templatePrint[i].text +
								'</label>' +
								'</div>';
						countChecked++;
						// view.radio_file_list += '<input type="radio" name="template" value="' + me.templatePrint[i].value + '">' + me.templatePrint[i].text + '<br>';

					}

					var output = Mustache.render(datatpl, view);

					f.body.update(output);

					$("#gantiNamaFormPrintoutformID input[name='adendum_no']").on('keyup blur change input', function (event) {
						$(this).val($(this).val().replace(/[^A-Za-z0-9/.-]/gi, ''));
					});

					$("#gantiNamaFormPrintoutformID input[name='persetujuan_nama']").on('keyup blur change input', function (event) {
						$(this).val($(this).val().replace(/[^A-Za-z0-9\s]/gi, ''));
					});

					$("#gantiNamaFormPrintoutformID input[name='persetujuan_relasi']").on('keyup blur change input', function (event) {
						$(this).val($(this).val().replace(/[^A-Za-z0-9\s]/gi, ''));
					});

					$("#gantiNamaFormPrintoutformID input[name='adendum_no']").val(changeName.adendum_no);
					$("#gantiNamaFormPrintoutformID input[name='persetujuan_nama']").val(changeName.persetujuan_nama);
					$("#gantiNamaFormPrintoutformID input[name='persetujuan_relasi']").val(changeName.persetujuan_relasi);

					$("#gantiNamaFormPrintoutprintid").click(function (event) {
						event.preventDefault();
						// me.tools.alert.warning("Hello");


						var tpl = $("#gantiNamaFormPrintoutformID input[name=template]:checked").val();


						//f.setLoading("Please wait...");

						$("#gantiNamaFormPrintoutmsgID").html('<div class="loader_box">' +
								'<div class="loader" style="float:left;"></div>' +
								'<div class="loader_text">Please wait...</div>' +
								'<div style="">&nbsp;</div>' +
								'</div>');

						$("#gantiNamaFormPrintoutprintid").prop('disabled', true);

						me.tools.ajax({
							params: {
								changename_id: selectedCN.get('changename_id'),
								parametersppjb_id: me.selectedParameterSPPJB.get("parametersppjb_id"),
								template: tpl,
								adendum_no: $("#gantiNamaFormPrintoutformID input[name='adendum_no']").val(),
								persetujuan_nama: $("#gantiNamaFormPrintoutformID input[name='persetujuan_nama']").val(),
								persetujuan_relasi: $("#gantiNamaFormPrintoutformID input[name='persetujuan_relasi']").val()
							},
							success: function (data, model) {
								$("#gantiNamaFormPrintoutprintid").prop('disabled', false);

								var validInfo = data['others'][0][0]['STATUS_INFOPRINT'];

								if (!validInfo) {
									var htmlWarning = '<div class="alert alert-warning">' +
											'<strong>Warning!</strong> ' + data['others'][0][0]['MSG_INFOPRINT'] +
											'</div>';
									$("#gantiNamaFormPrintoutmsgID").html(htmlWarning);
								} else {
									var url = data['others'][0][0]['URL'];

									//added by anas 08092021
									var plwa = '';
									if (me.getPurcheletterSendWaActive == 1) {

										plwa = '<p>Silahkan klik link berikut , untuk send to wa: <br/><a href="https://api.whatsapp.com/send?phone=' + me.getPurcheletterSendWaPhone + '&text=' + me.getPurcheletterSendWaText + ' ' + window.location.href + url + '" target="blank">Send To WA</a></p>';
									}
									//end addded by anas 08092021

									if (url) {
										$("#gantiNamaFormPrintoutmsgID").html('<p>Silahkan klik link berikut , untuk download file: <br/><a href="' + url + '" target="blank">Download file</a></p>' + plwa);

									} else {
										$("#gantiNamaFormPrintoutmsgID").html('URL File tidak valid.');

									}
								}



							}
						}).read('printout');



					});

					// callback.hasilPrint(output);
					//me.PrintElem(output);
				});

			}
		}).read('printinfo');








		/*
		 for (var i in me.templatePrint) {
		 el.add({
		 xtype: 'radiofield',
		 boxLabel: me.templatePrint[i].text,
		 name: 'template',
		 inputValue: me.templatePrint[i].value,
		 checked: i == 0 ? true : false
		 });
		 }
		 */




	},
	addCustomer: function () {
		var me = this;
		this.tools.iNeedYou(this).showWindow('Mastercustomer', {title: 'Add New Customer'});
		var tm = setTimeout(function() {
			_myAppGlobal.getController('Mastercustomer').fdar().init();
			_myAppGlobal.getController('Mastercustomer').fdar().create();
			clearTimeout(tm);
        }, 2000);
	},
	afterAddNewFromOutside: function (controllerId, info) {
		var me = this;
		var f = me.getFormdata();

		/* get inserted id*/
		if (info) {

			if (info.others) { // check jika inserted id ada
				/// load customer information
				var insertedId = info.others;
				var f = me.getFormdata();
				f.setLoading("Loading customer information...");
				me.tools.ajax({
					params: {
						customer_id: insertedId
					},
					success: function (data, model) {
						var data = data[0];

						if (data) {
							var tempGroup = null;

							for (var group in data) {

								for (var field in data[group]) {
									tempGroup = group === "customer" ? "customernew" : group;

									if (tempGroup == 'customer') {
										var el = f.down("[name=" + tempGroup + "_" + field + "]");
										if (el) {
											el.setValue(""); ///reset
											el.setValue(data[group][field]);
										}
									}

								}
							}
							me.getFormdata().down("[name=customernew_city]").setValue(data.city.city_name);

							//added by anas 25062021
							//jadi kalo gk ada foto gk load image
							if (data.customer.photo != null)
							{
								me.mt.customerPhoto(me.getFormdata().down("#photonew_image"), data.customer.photo, me.myConfig.IMG_FOLDER);
							}
							//end added by anas 25062021


						}
						f.setLoading(false);

					}
				}).read('selectedcustomer');
			}
		}

		var win = Ext.getCmp(_Apps.getController(controllerId).formxWinId);
		if (win) {
			win.close();
		}


	},
	paramsppjbSelect: function () {
		var me = this;
		if (me.browseHandler) {
			me.browseHandler.selectItem(function (rec) {
				var f = me.getFormdata();
				me.selectedParameterSPPJB = null;

				me.printoutdoc();
				me.selectedParameterSPPJB = rec;

				/*
				 me.tools.printMsWord({
				 changename_id: selectedCN.get('changename_id'),
				 parametersppjb_id:rec.get("parametersppjb_id")
				 }, me.getPanel()).grid(me.getGrid());
				 */


			});
		}
	},
	printMsWord: function () {
		var me = this;
		var rec = me.getGrid().getSelectedRecord();
		if (rec) {

			me.browseParametersppjb();
			// me.printoutdoc();

			/*
			 me.tools.printMsWord({
			 changename_id: rec.get('changename_id')
			 }, me.getPanel()).grid(me.getGrid());
			 */


		} else {
			me.tools.alert.warning("Silahkan pilih satu record terlebih dahulu.");
		}

	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);
		var me = this;
		me.getGrid().getSelectionModel().setSelectionMode('SINGLE');

		me.tools.ajax({
			params: {},
			success: function (data, schmodel) {
				me.templatePrint = data['others'][0][0]['TEMPLATEPRINTOUT'];

				//added by anas 08092021
				me.getPurcheletterSendWaActive = data['others'][0][0]['getPurcheletterSendWa']['active'];
				me.getPurcheletterSendWaPhone = data['others'][0][0]['getPurcheletterSendWa']['phone'];
				me.getPurcheletterSendWaText = data['others'][0][0]['getPurcheletterSendWaText'];

				me.getValidasiGantiNamaSPPJB = data['others'][0][0]['getValidasiGantiNamaSPPJB']; // added by rico 07032023
			}
		}
		).read('init');

		Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () {

		}, function () {
		});


	},
	customerSelect: function () {
		var me = this;
		if (me.browseHandler) {
			me.browseHandler.selectItem(function (rec) {
				var f = me.getFormdata();
				//rizal 2 April 2019

				if (apps.subholdingId == 2) {
					Ext.Msg.confirm('Confirmation', 'Customer baru masih dalam 1 KK?', function (btn) {
						if (btn == 'yes') {
							me.isSatuKKChange(true);
						} else {
							me.isSatuKKChange(false);
						}
					});
				}

				//added by anas 25062021
				//set photo jadi kosong
				f.down("#photonew_image").el.setStyle({background: 'none'});

				//jadi kalo gk ada foto gk load image
				if (rec.get("photo").length > 0)
				{
					me.mt.customerPhoto(f.down("#photonew_image"), rec.get("photo"), me.myConfig.IMG_FOLDER);
				}
				//end added by anas 25062021

				f.down("[name=customernew_city]").setValue(rec.get("city_city_name"));
			});
		}
	},
	/*
	 unitSelect: function () {
	 var me = this;
	 if (me.browseHandler) {
	 me.browseHandler.selectItem(function (rec) {
	 var f = me.getFormdata();
	 f.setLoading("Check revision...");
	 me.tools.ajax({
	 params: {
	 purchaseletter_id: rec.get("purchaseletter_id")
	 },
	 success: function (schdata, schmodel) {
	 
	 if (!schdata['others'][0][0]['NONAPPROVEEXIST']) {
	 var unitId = f.down("[name=unit_id]").getValue();
	 f.down("[name=purchaseletter_purchaseletter_id]").setValue(rec.get("purchaseletter_id"));
	 f.down("[name=purchaseletter_purchaseletter_no]").setValue(rec.get("purchaseletter_no"));
	 f.down("[name=purchaseletter_purchase_date]").setValue(rec.get("purchase_date"));
	 me.mt.customerPhoto(f.down("#photo_image"), rec.get("customer_photo"), me.myConfig.IMG_FOLDER);
	 f.down("[name=customer_old_id]").setValue(rec.get("customer_id"));
	 
	 // set default customer baru sama dengan customer lama
	 
	 //
	 f.setLoading("Set default customer");
	 me.tools.ajax({
	 params: {
	 customer_id: rec.get("customer_id")
	 },
	 success: function (defcusdata, defcusmodel) {
	 
	 console.log(defcusdata);
	 var defcustomer = defcusdata[0]['customer'];
	 for(var i in defcustomer){
	 var el = f.down("[name=customernew_"+i+"]");
	 if(el){
	 el.setValue(defcustomer[i]);
	 }
	 
	 }
	 
	 f.setLoading(false);
	 
	 }
	 }).read('selectedcustomer');
	 
	 } else {
	 f.getForm().reset();
	 me.tools.alert.warning("Please reject all non approve change name request for this unit");
	 f.setLoading(false);
	 }
	 
	 }
	 }
	 ).read('checkrevisi');
	 ;
	 
	 
	 
	 
	 
	 });
	 }
	 },
	 */
	cekApproval: function () {
		var me = this;
		var g = me.getUnitgrid();
		var gs = g.getStore();
		var p = g.getSelectedRow();
		var d = gs.getAt(p)
		var f = me.getFormdata();
		
		if (me.verification_approval) {
			//        console.log(d.data.purchaseletter_purchaseletter_id)
			Ext.Ajax.request({
				url: 'erems/gantinama/read',
				params: {
					purchaseletter_id: d.data.purchaseletter_purchaseletter_id,
					verification_code: 'GN',
					mode_read: 'verificationapproval'
				},
				success: function (response) {
					var obj = JSON.parse(response.responseText)
					//                console.log(obj.totalRow)
					if (obj.totalRow > 0) {
						if (obj.data[0]['is_approve'] > 0) {
							me.unitSelect()
							me.isUsedVerification = true
						} else {
							me.tools.alert.warning("Verifikasi Belum Diapprove.");
							f.setLoading(false);
						}

					} else {
						me.tools.alert.warning("Verifikasi Persetujuan Belum Dibuat.");
						f.setLoading(false);
					}
				}
			})

		} else {
			if(d.data.purchaseletter_is_blokir == 1){ // added by rico 28112022
				Ext.Msg.show({
					title: 'Info',
					msg: "Purchaseletter Terblokir. Tidak Bisa di Ganti Nama ke yang lain",
					icon: Ext.Msg.INFO,
					buttons: Ext.Msg.OK
				});
				
				f.setLoading(false);
			}else if(me.getValidasiGantiNamaSPPJB == 1){ // added by rico 07032023
				Ext.Ajax.request({
					url: 'erems/gantinama/read',
					params: {
						purchaseletter_id: d.data.purchaseletter_purchaseletter_id,
						mode_read: 'validasisppjb'
					},
					success: function (response) {
						var obj = JSON.parse(response.responseText);

						if (obj.totalRow > 0) {
							Ext.Msg.show({
								title: 'Info',
								msg: "Sudah ada SPPJB, unit tidak bisa di Ganti Nama",
								icon: Ext.Msg.INFO,
								buttons: Ext.Msg.OK
							});
							
							f.setLoading(false);
						}else{
							me.unitSelect();
						}
					}
				})
			}else{
				me.unitSelect()
			}
		}
	},
	unitSelect: function () {
		var me = this;
		if (me.browseHandler) {
			me.browseHandler.selectItem(function (rec) {
				var f = me.getFormdata();
				f.setLoading("Check revision...");
				me.tools.ajax({
					params: {
						purchaseletter_id: rec.get("purchaseletter_id")
					},
					success: function (schdata, schmodel) {
						var tigaSekawanAnCancel = schdata['others'][0][0]['TIGASEKAWANANDCANCEL'];
						if (tigaSekawanAnCancel.length === 0) {
							var unitId = f.down("[name=unit_id]").getValue();
							f.down("[name=purchaseletter_purchaseletter_id]").setValue(rec.get("purchaseletter_id"));
							f.down("[name=purchaseletter_purchaseletter_no]").setValue(rec.get("purchaseletter_no"));
							f.down("[name=purchaseletter_purchase_date]").setValue(rec.get("purchase_date"));

							//added by anas 25062021
							//set photo jadi kosong
							f.down("#photo_image").el.setStyle({background: 'none'});

							//jadi kalo gk ada foto gk load image
							if (rec.get("customer_photo").length > 0)
							{
								me.mt.customerPhoto(f.down("#photo_image"), rec.get("customer_photo"), me.myConfig.IMG_FOLDER);
							}
							//end added by anas 25062021

							f.down("[name=customer_old_id]").setValue(rec.get("customer_id"));

							// set default customer baru sama dengan customer lama

							//
							f.setLoading("Set default customer");
							me.tools.ajax({
								params: {
									customer_id: rec.get("customer_id")
								},
								success: function (defcusdata, defcusmodel) {

									// console.log(defcusdata);
									// var defcustomer = defcusdata[0]['customer'];
									// for (var i in defcustomer) {
									//     var el = f.down("[name=customernew_" + i + "]");
									//     if (el) {
									//         el.setValue(defcustomer[i]);
									//     }

									// }

									f.setLoading(false);

								}
							}).read('selectedcustomer');

						} else {
							f.getForm().reset();
							var teksWarning = "";
							var count = 0;
							for (var i = 0; i < tigaSekawanAnCancel.length; i++) {
								//  console.log(tigaSekawanAnCancel[i]);
								teksWarning += "[" + (count + 1) + "] " + tigaSekawanAnCancel[i]["teks"] + " pada tanggal " + moment(tigaSekawanAnCancel[i]["change_date"]).format("DD-MM-YYYY") + " oleh " + tigaSekawanAnCancel[i]["user_fullname"]
								count++;
							}

							f.setLoading(false);
							setTimeout(function () {
								me.tools.alert.warning("Terdapat revisi sebagai berikut : " + teksWarning + " . Silahkan di approve terlebih dahulu.");
							}, 500);
						}

					}
				}).read('checkrevisi');
			});
		}
	},
	browseParametersppjb: function (el) {
		var me = this;
		var browse = new Erems.library.Browse();
		browse.init({
			controller: me,
			view: 'ParametersppjbGrid',
			el: el,
			localStore: "selectedParametersppjb",
			mode_read: "selectedparametersppjb"
		});
		browse.showWindow();
	},
	browseSoldUnit: function (el) {
		var me = this;
		var browse = new Erems.library.Browse();
		browse.init({
			controller: me,
			view: 'UnitGrid',
			el: el,
			localStore: "selectedUnit",
			mode_read: "selectedunit"
		});
		browse.showWindow();
	},
	browseCustomer: function (el) {
		var me = this;
		var browse = new Erems.library.Browse();
		browse.init({
			controller: me,
			view: 'CustomerGrid',
			el: el,
			localStore: "customer",
			mode_read: "selectedcustomer",
			loadRecordPrefix: "customernew"
		});

		browse.afterLoadFn = function (rec, store) {

			var cg = me.getGridcustomer();
			cg.down("pagingtoolbar").doRefresh();
			var oldCusId = me.tools.intval(me.getFormdata().down("[name=customer_old_id]").getValue());
			store.filterBy(function (rec, id) {

				if (rec.raw.customer.customer_id !== oldCusId) {
					return true;
				} else {
					return false;
				}
			});
		};
		browse.showWindow();

	},
	mainDataSave: function (mode) {
		var me = this;
		var m = typeof mode !== "undefined" ? mode : "";
		me.insSave({
			form: me.getFormdata(),
			grid: me.getGrid(),
			store: me.localStore.detail,
			finalData: function (data) {
				var f = me.getFormdata();

				data["changename_date"] = f.down("[name=changename_date]").getValue();
				data["customer02_id"] = f.down("[name=customernew_customer_id]").getValue();
				data["is_used_verification"] = me.isUsedVerification;
				if (m !== "") {
					data["approvemode"] = m;
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
	fdar: function () {

		var me = this;
		var f = me.getFormdata();

		me.mt = new Erems.library.ModuleTools();
		//
		var x = {
			init: function () {

				me.setActiveForm(f);




				me.localStore.detail = me.instantStore({
					id: me.controllerName + 'CNDetailStore',
					extraParams: {
						mode_read: 'maindetail'
					},
					idProperty: 'changename_id'
				});

			},
			create: function () {
				f.down("button[action=approve]").hide();
				f.down("button[action=reject]").hide();
				f.editedRow = -1;
				me.tools.ajax({
					params: {
						// purchaseletter_id: plId
					},
					success: function (data, model) {

						me.fillFormComponents(data, f);

						me.localStore.detail.load({
							params: {
								changename_id: 0
							},
							callback: function (rec, op) {
								me.attachModel(op, me.localStore.detail, false);

							}
						});

						f.down("[name=pt_name]").setValue(data['others'][0][0]['PT_NAME']);
						me.verification_approval = data['others'][0][0]['verification_approval']

						//rizal 2 April 2019
						if (apps.subholdingId == 1) {
							f.down("#is_satukk").setVisible(false);
							f.down("#nomor_dokumen_pengalihanhak").setVisible(false);
							f.down("#cara_pembayaran_pph").setVisible(false);
							f.down("#nomor_setor_pajak").setVisible(false);
							f.down("#nominal_pembayaran_pph").setVisible(false);
						}
						//




					}
				}).read('detail');

			},
			update: function (state) {
				f.down("button[action=save]").hide();
				f.down("button[action=reject]").hide();
				f.down("button[action=approve]").hide();
				var cnId = me.getGrid().getSelectedRecord().get("changename_id");
				var approve = me.getGrid().getSelectedRecord().get("purchaseletterrevision_is_approve");
				f.down("#btnSave").setDisabled(true);
				f.editedRow = me.getGrid().getSelectedRow();
				me.tools.ajax({
					params: {
						// purchaseletter_id: plId
					},
					success: function (data, model) {

						f.down("[name=pt_name]").setValue(data['others'][0][0]['PT_NAME']);

						//rizal 2 April 2019

						if (apps.subholdingId == 1) {
							f.down("#is_satukk").setVisible(false);
							f.down("#nomor_dokumen_pengalihanhak").setVisible(false);
							f.down("#cara_pembayaran_pph").setVisible(false);
							f.down("#nomor_setor_pajak").setVisible(false);
							f.down("#nominal_pembayaran_pph").setVisible(false);
						}
						//

						me.fillFormComponents(data, f);

						me.localStore.detail.load({
							params: {
								changename_id: cnId
							},
							callback: function (rec, op) {

								me.attachModel(op, me.localStore.detail, false);
								var oneRec = me.localStore.detail.getAt(0);

								f.loadRecord(oneRec);

								//added by anas 25062021
								//jadi kalo gk ada foto gk load image
								if (oneRec.get("customer_photo").length > 0)
								{
									me.mt.customerPhoto(f.down("#photo_image"), oneRec.get("customer_photo"), me.myConfig.IMG_FOLDER);
								}
								if (oneRec.get("customernew_photo").length > 0)
								{
									me.mt.customerPhoto(f.down("#photonew_image"), oneRec.get("customernew_photo"), me.myConfig.IMG_FOLDER);
								}
								//end added by anas 25062021

								f.down("[name=customernew_city]").setValue(oneRec.get("city2_city_name"));
								f.down("[name=reasonchgname_reasonchgname_id]").setReadOnly(true);
								//    f.down("[name=changename_date]").setReadOnly(true);
								f.down("[name=changename_note]").setReadOnly(true);
								f.down("[name=administration_fee]").setReadOnly(true);

								//rizal 2 April 2019
								f.down("[name=is_satukk]").setReadOnly(true);
								f.down("[name=nomor_dokumen_pengalihanhak]").setReadOnly(true);
								f.down("[name=nomor_setor_pajak]").setReadOnly(true);
								f.down("[name=cara_pembayaran_pph]").setReadOnly(true);
								f.down("[name=nominal_pembayaran_pph]").setReadOnly(true);
								//

								f.down("[name=administration_fee]").setValue(accounting.formatMoney(f.down("[name=administration_fee]").getValue()));

								me.citraGardenFeatured(data, f, oneRec);

							}
						});


						/// check approval
						if (data['others'][0][0]["APPROVALUSER"] && data['others'][0][0]["GLOBALPARAMSPARAMS"]["CHANGENAME_APPROVAL"] && state != 'view') {
							if (!approve) {
								f.down("button[action=approve]").show();

								f.down("button[action=reject]").show();
							} else {
								f.down("button[action=reject]").show();
							}

						}

						if (state == 'view') {
							Ext.Array.each(me.getFormdata().query("[xtype=button]"), function (field) {
								field.setVisible(false);
							});
							f.down('#btnCancel').show();
						}
					}
				}).read('detail');
			},
		};
		return x;
	},
	citraGardenFeatured: function (data, form, record) {
		var me = this;
		if (data['others'][0][0]["ISCOLLECTIONAPPROVE"]) {

			if (record.get("purchaseletterrevision_is_approvecollection")) {

				form.down("button[action=approvecoll]").setText("Approved By Collection");
				form.down("button[action=approvecoll]").disable();
				form.down("button[action=approvecoll]").show();

			}

			if (record.get("purchaseletterrevision_is_approvemanager")) {

				form.down("button[action=approve]").setText("Approved By Manager");
				form.down("button[action=approve]").disable();
				form.down("button[action=approve]").show();

			}

			if (data['others'][0][0]["ISCOLLECTIONUSER"]) {
				form.down("button[action=approvecoll]").show();
				form.down("button[action=reject]").show();

			}

		}
	},
	fillFormComponents: function (data, form) {
		var me = this;
		me.tools.wesea(data.reasonchgname, form.down("[name=reasonchgname_reasonchgname_id]")).comboBox();
		//citraclub_id

	},
	//rizal 2 April 2019
	isSatuKKChange: function (newValue) {
		var me = this;
		var f = me.getFormdata();
		if (newValue) {
			f.down("[name=is_satukk]").setValue(true);
			f.down("[name=nomor_dokumen_pengalihanhak]").setReadOnly(true);
		} else {
			f.down("[name=is_satukk]").setValue(false);
			f.down("[name=nomor_dokumen_pengalihanhak]").setReadOnly(false);
		}
	},
	CaraPembayaranPPH: function (newValue) {
		var me = this;
		var f = me.getFormdata();
		if (newValue == 'sendiri') {
			f.down("#nomor_setor_pajak").setVisible(true);
			f.down("#nominal_pembayaran_pph").setVisible(false);
		} else {
			f.down("#nomor_setor_pajak").setVisible(false);
			f.down("#nominal_pembayaran_pph").setVisible(true);
		}
	},

	formDataAfterRender: function (el) {
		var state = el.up('window').state;
		console.log("[WINDOW STATE] " + state);
		var me = this;
		me.fdar().init();


		if (state == 'create') {
			me.fdar().create();
		} else if (state == 'update') {
			me.fdar().update();
		} else if (state == 'read') {
			me.fdar().update('view');
		}
	},
	//
});