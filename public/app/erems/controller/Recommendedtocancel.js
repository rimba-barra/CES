Ext.define('Erems.controller.Recommendedtocancel', {
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Recommendedtocancel',
	views: ['recommendedtocancel.Panel', 'recommendedtocancel.Grid', 'recommendedtocancel.FormSearch', 'recommendedtocancel.FormData', 'recommendedtocancel.CancellationFormData'],
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Pricetypecombobox',
		'Erems.library.template.component.Citycombobox',
	],
	stores: ['Mastercluster', 'Masterblock', 'Recommendedtocancel', 'Purchaseletterdetail', 'Masterdata.store.City', 'Mastercancelreason', 'Masterparameterglobal'],
	models: ['Recommendedtocancel', 'Purchaseletterdetail', 'Mastercancelreason','Masterparameterglobal'],
	refs: [
		{
			ref: 'grid',
			selector: 'recommendedtocancelgrid'
		},
		{
			ref: 'formsearch',
			selector: 'recommendedtocancelformsearch'
		},
		{
			ref: 'formdata',
			selector: 'recommendedtocancelformdata'
		},
		{
			ref: 'cancellationformdata',
			selector: 'recommendedtocancelcancellationformdata'
		},
	],
	controllerName: 'recommendedtocancel',
	fieldName: 'bank_name',
	bindPrefixName: 'Recommendedtocancel',
	ftStore2: null,
	init: function (application) {
		var me = this;
		this.control({
			'recommendedtocancelpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'recommendedtocancelgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'recommendedtocancelgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'recommendedtocancelgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'recommendedtocancelgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'recommendedtocancelgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'recommendedtocancelgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'recommendedtocancelformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'recommendedtocancelformsearch button[action=search]': {
				click: this.dataSearch
			},
			'recommendedtocancelformsearch button[action=reset]': {
				click: this.dataReset
			},
			'recommendedtocancelformdata': {
				afterrender: this.formDataAfterRender
			},
			'recommendedtocancelformdata button[action=save]': {
				click: me.klikSave//this.dataSave
			},
			'recommendedtocancelformdata button[action=cancel]': {
				click: this.formDataClose
			},

			'recommendedtocancelgrid toolbar button[action=viewnote]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'recommendedtocancelgrid toolbar button[action=createcancellation]': {
				click: function () {
					this.formDataCancellationShow('create');
				}
			},
			// added by rico 06042023
			'recommendedtocancelgrid toolbar button[action=printdocument]': {
				click: function () {
					this.printDocument();
				}
			},
			'recommendedtocancelcancellationformdata': {
				afterrender: this.formDataCancellationAfterRender
			},

			'recommendedtocancelcancellationformdata [name=lostpayment]': {
				keyup: me.fillReturnpayment
			},
			'recommendedtocancelcancellationformdata [name=buyback_installment]': {
				keyup: me.fillBuybackinterest
			},
			'recommendedtocancelcancellationformdata [name=buyback_interest_persen]': {
				keyup: me.fillBuybackinterest
			},
			/* end formdata keyup function */

			'recommendedtocancelcancellationformdata button[action=save]': {
				click: this.dataSave
			},
		});
	},

	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

		grid.down('#btnViewNote').setDisabled(row.length != 1);
		grid.down('#btnCreateCancellation').setDisabled(row.length != 1);

		grid.down('#btnPrintDocument').setDisabled(row.length != 1); // added by rico 06042023
	},

	formDataAfterRender: function (el) {
		var me = this;
		var state = el.up('window').state;
		console.log(state)
		if (state == 'create') {

		} else {
			me.getFormdata().up('window').body.mask('Loading data, please wait ...');

			var grid = me.getGrid();
			var store = grid.getStore();
			var form = me.getFormdata();

			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);
		}
	},

	formDataCancellationShow: function (state) {
		var me = this;

		switch (state) {
			case 'create':
				formtitle = 'Add New';
				formicon = 'icon-form-add';
				break;
			case 'update':
				formtitle = 'Edit';
				formicon = 'icon-form-edit';
				break;
		}
		var winId = 'win-cancellationformdata';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: false,
				width: 800,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: false,
				state: state,
				listeners: {
					boxready: function () {
						win.body.mask('Loading...');
						var tm = setTimeout(function () {
							win.add(Ext.create('Erems.view.recommendedtocancel.CancellationFormData'));
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

	formDataCancellationAfterRender: function (el) {
		var me = this;
		me.loadComboBoxStore(el);
		var state = el.up('window').state;

		//city combobox
		var ftStore = null;
		ftStore = el.down('#fd_city').getStore();
		ftStore.load({params: {start: 0, limit: 0, country_id: 87}});

		/*if (state == 'create') {
		 // el.down('#active').setValue(1);
		 //me.getFormdata().down('#btnSave').setDisabled(false);
		 } else {
		 */
		var form = me.getCancellationformdata();

		me.countLoadProcess = 0;
		form.up('window').body.mask('Loading data, please wait ...');

		var grid = me.getGrid();
		var store = grid.getStore();


		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
		el.loadRecord(record);

		//set value for money
		/*form.down('[name=totalpayment]').setValue(me.fmb(record.data.totalpayment));
		 form.down('[name=lostpayment]').setValue(me.fmb(record.data.lostpayment));
		 form.down('[name=returnpayment]').setValue(me.fmb(record.data.returnpayment));
		 
		 form.down('[name=buyback_installment]').setValue(me.fmb(record.data.buyback_installment));
		 form.down('[name=buyback_interest]').setValue(me.fmb(record.data.buyback_interest));
		 form.down('[name=buyback_denda]').setValue(me.fmb(record.data.buyback_denda));*/


		// load purchase letter data
		var purchaseletterdetailStore = me.getPurchaseletterdetailStore();
		purchaseletterdetailStore.removeAll();
		purchaseletterdetailStore.load({params: {purchaseletter_id: record.data.purchaseletter_id, mode_read: 'detail'},
			callback: function (rec) {
				/*console.log('RECORDS PURCHASE LETTER...');
				 console.log(rec[0]);*/
				form.down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
				form.down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
				form.down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));
				form.down('[name=unit_id]').setValue(rec[0].get('unit_id'));
				form.down('[name=customer_id]').setValue(rec[0].get('customer_id'));
				form.down('[name=firstpurchase_date]').setValue(rec[0].get('firstpurchase_date'));
				form.down('#fd_city').setValue(rec[0].get('customer_city_id'));
				form.down('[name=pricetype_id]').setValue(rec[0].get('pricetype_id'));
				form.down('[name=bank_bank_name]').setValue(rec[0].get('bank_bank_name'));
				form.down('[name=akad_realisasiondate]').setValue(rec[0].get('akad_realisasiondate'));

//						var akad_realisasiondate;
//						akad_realisasiondate = rec[0].get('akad_realisasiondate');	
//						if(akad_realisasiondate){
//							akad_realisasiondate = akad_realisasiondate.replace(' 00:00:00.000','');
//							akad_realisasiondate = akad_realisasiondate.split("-");
//							akad_realisasiondate = akad_realisasiondate[2] + '-' + akad_realisasiondate[1] + '-' + akad_realisasiondate[0];	
//							form.down('[name=akad_realisasiondate]').setValue(akad_realisasiondate);
//						}

				var harga_jual = rec[0].get('harga_jual');
				var total_payment = rec[0].get('total_payment');
				form.down('[name=harga_jual]').setValue(me.fmb(harga_jual));
				form.down('[name=total_payment]').setValue(me.fmb(total_payment));

				form.down('[name=totalpayment]').setValue(me.fmb(total_payment));

				if (harga_jual && total_payment) {
					var payment_percentage = (total_payment / harga_jual) * 100;
					form.down('[name=payment_percentage]').setValue(me.fmb(payment_percentage));
				} else {
					form.down('[name=payment_percentage]').setValue('');
				}

				me.tcb();

				me.fillUnitDataToForm(rec[0]);
				me.fillMasterCustomerData(rec[0], 'customer');
			}
		});

		// disable button
		//form.down('#fd_browse_unit_btn').setDisabled(true);
		// end disable button

		/*if (state == 'update') {
		 form.down('#btnPrintout').setDisabled(false);
		 } else if (state == 'read') {
		 form.getForm().getFields().each(function (field) { field.setReadOnly (true); });
		 form.down('#btnSave').setDisabled(true);
		 form.down('#btnPrintout').setDisabled(false);
		 
		 if(record.data.is_approve || record.data.is_reject){
		 form.down('#btnApproveReject').setDisabled(true);
		 } else {
		 var globalparameterStore = me.getMasterparameterglobalStore();
		 globalparameterStore.removeAll();
		 globalparameterStore.load({params: {parametername: 'APPROVAL_GROUP_ID_CANCELLATION'}, 
		 callback:function(rec){
		 if(rec.length > 0){
		 var global = rec[0].get('value');
		 if(global === apps.gid){
		 form.down('#btnApproveReject').setDisabled(false);
		 } else {
		 form.down('#btnApproveReject').setDisabled(true);
		 }
		 } else {
		 form.down('#btnApproveReject').setDisabled(true);
		 }
		 }
		 });
		 }
		 }*/
		//}
	},

	fillUnitDataToForm: function (data) {

		var me = this;
		var filledFields = ['productcategory', 'type_name', 'land_size', 'long', 'building_size', 'width', 'kelebihan', 'floor', 'block_id', 'cluster_id', 'unit_number', 'pt_name'];

		var form = me.getCancellationformdata();

		for (var x in filledFields) {
			if (form.down('[name=unit_' + filledFields[x] + ']') != null) {
				form.down('[name=unit_' + filledFields[x] + ']').setValue(data.data['unit_' + filledFields[x]]);
			}

		}
		form.down('[name=code]').setValue(data.data['cluster_code']);
		form.down('[name=block_code]').setValue(data.data['block_code']);
	},
	fillMasterCustomerData: function (records, prefix) {
		var pr = typeof prefix === 'undefined' ? 'customer' : prefix;

		var me = this;
		var filledFields = [
			'name', 'ktp', 'npwp', 'address', 'homephone', 'email', 'mobilephone'
		];

		var form = me.getCancellationformdata();

		for (var x in filledFields) {
			if (form.down('[name=' + pr + '_' + filledFields[x] + ']') != null) {
				form.down('[name=' + pr + '_' + filledFields[x] + ']').setValue(records.data[pr + '_' + filledFields[x]]);
			}

		}
	},

	tcb: function () {
		var me = this;
		me.fillReturnpayment();
		me.fillBuybackinterest();
	},

	fillReturnpayment: function () {
		var me = this;
		var form = me.getCancellationformdata();
		var totalpayment = toFloat(form.down('[name=totalpayment]').getValue());
		var lostpayment = toFloat(form.down('[name=lostpayment]').getValue());

		if (totalpayment) {
			if (!lostpayment) {
				lostpayment = 0
			}
			var returnpayment = totalpayment - lostpayment;
		}

		if (lostpayment > totalpayment) {
			Ext.Msg.show({
				title: 'Failure',
				msg: 'Nilai uang ditahan tidak boleh lebih besar dari total pembayaran',
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK,
				fn: function () {
					form.down('[name=lostpayment]').setValue(0.00);
					me.fillReturnpayment();
				}
			});
		}

		form.down('[name=returnpayment]').setValue(me.fmb(returnpayment));
	},

	fillBuybackinterest: function () {
		var me = this;
		var form = me.getCancellationformdata();
		var buyback_installment = toFloat(form.down('[name=buyback_installment]').getValue());
		var buyback_interest_persen = form.down('[name=buyback_interest_persen]').getValue();

		if (buyback_installment) {
			if (!buyback_interest_persen) {
				buyback_interest_persen = 0
			}
			var buyback_interest = (buyback_installment * buyback_interest_persen) / 100;
		}

		form.down('[name=buyback_interest]').setValue(me.fmb(buyback_interest));
	},

	getFinalData: function (formGetValues) {
		var finalData = formGetValues;
		return finalData;
	},

	dataSave: function () {
		var me = this;
		var form = me.getCancellationformdata().getForm();
		var formVal = form.getValues();

		if (formVal.purchaseletter_id == 0) {
			Ext.Msg.show({
				title: 'Info',
				msg: 'You must select Kavling / Unit No. first',
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK
			});
			return false;
		}

		if (form.isValid()) {

			me.getCancellationformdata().up('window').body.mask('Saving data, please wait ...');

			//var data = [];//me.getFinalData(form.getValues());
			var data = {purchaseletter_id: formVal.purchaseletter_id,
				unit_id: formVal.unit_id,
				customer_id: formVal.customer_id,
				cancelreason_id: formVal.cancelreason_id,
				cancellation_date: formVal.cancellation_date,
				totalpayment: formVal.totalpayment,
				lostpayment: formVal.lostpayment,
				returnpayment: formVal.returnpayment,
				is_buyback: formVal.is_buyback,
				buyback_installment: formVal.buyback_installment,
				buyback_interest_persen: formVal.buyback_interest_persen,
				buyback_interest: formVal.buyback_interest,
				buyback_denda: formVal.buyback_denda,
				note: formVal.note,
				firstpurchase_date: formVal.firstpurchase_date,
				is_recommended: 1};

			//console.log(data);
			Ext.Ajax.request({
				url: 'erems/cancellation/create',
				params: 'data=' + Ext.encode(data),
				success: function (response) {
					me.getCancellationformdata().up('window').body.unmask();
					if (Ext.decode(response.responseText).success == true)
					{
						Ext.Msg.show({
							title: 'Success',
							msg: 'Data saved successfully.',
							icon: Ext.Msg.INFO,
							buttons: Ext.Msg.OK,
							fn: function () {
								me.getCancellationformdata().up('window').close();
								var gridDepan = me.getGrid();
								var storeDepan = gridDepan.getStore();
								storeDepan.reload();
							}
						});

					} else if (Ext.decode(response.responseText).msg != '') {
						Ext.Msg.show({
							title: 'Info',
							msg: Ext.decode(response.responseText).msg,
							icon: Ext.Msg.WARNING,
							buttons: Ext.Msg.OK
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

	/* print data */
	dataPrint: function (el) {
		var me = this;
		me.loadReportt(el, 'erems/recommendedtocancel/print');
	},

	loadReportt: function (sender, url, param, onclose) {
		var me = this;
		var winId = 'win-print';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: 'Print',
				iconCls: 'icon-print',
				width: '75%',
				height: '70%',
				minWidth: 600,
				minHeight: 400,
				animCollapse: false,
				constrain: true,
				constrainHeader: false,
				taskbarButton: false,
				renderTo: Ext.getBody(),
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				listeners: {
					boxready: function () {
						win.body.mask('Loading...');
						var loadtm = setTimeout(function () {
							Ext.fly('front-content').load({
								url: url,
								autoAbort: true,
								scripts: true,
								autoLoad: true,
								success: function (request, response) {
									if (typeof response.responseText == 'undefined') {
										return;
									}
									var report_name = response.responseText;
									var printpage;
									if (report_name != 'ERROR') {
										if (param)
										{
											if (param["cluster_id"] == undefined || param["cluster_id"] == '') {
												param["cluster_id"] = 0;
											}
											if (param["block_id"] == undefined || param["block_id"] == '') {
												param["block_id"] = 0;
											}
											if (param["unit_number"] == undefined || param["unit_number"] == '') {
												param["unit_number"] = null;
											}
											if (param["customer_name"] == undefined || param["customer_name"] == '') {
												param["customer_name"] = null;
											}
											if (param["purchase_startdate"] == undefined || param["purchase_startdate"] == '') {
												param["purchase_startdate"] = '1753-01-01';
											}
											if (param["purchase_enddate"] == undefined || param["purchase_enddate"] == '') {
												param["purchase_enddate"] = '9999-12-31';
											}
											if (param["pricetype_id"] == undefined || param["pricetype_id"] == '') {
												param["pricetype_id"] = 0;
											}

											var params = {cluster_id: param["cluster_id"],
												block_id: param["block_id"],
												unit_number: param["unit_number"],
												customer_name: param["customer_name"],
												purchase_startdate: param["purchase_startdate"],
												purchase_enddate: param["purchase_enddate"],
												pricetype_id: param["pricetype_id"],
												project: apps.project,
												pt: apps.pt
											};

											// printpage = '<iframe id="frameprint" src="resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key='+report_name+param+'&projectpt='+apps.projectpt+'&project='+apps.project+'&pt='+apps.pt+'&uid='+apps.uid+'" frameborder=0 style="height:100%;width:100%;"></iframe>';										
											// printpage = '<iframe id="frameprint" src="resources/stimulsoftjsv2/viewer.php?reportfilelocation='+report_name+param+'&projectpt='+apps.projectpt+'&project='+apps.project+'&pt='+apps.pt+'&uid='+apps.uid+'" frameborder=0 style="height:100%;width:100%;"></iframe>';										

											if (win) {
												printpage = me.generateFakeForm2(params, report_name);
											}

										} else {
											var param_store;
											if (Ext.isObject(sender.up('gridpanel'))) {
												param_store = sender.up('gridpanel').getStore().proxy.extraParams;
											} else {
												param_store = sender.up('form').getForm().getValues();
											}

											var param_string = '';
											// console.log(param_store);
											for (var key in param_store) {
												if (param_store.hasOwnProperty(key)) {
													if (param_store[key] == undefined || param_store[key] == null) {
														param_store[key] = '';
													}
													//if (param_store[key].indexOf('{')!=-1) {
													//param_string += '&'+Ext.Object.toQueryString(Ext.decode(param_store[key], true));
													//} else {
													param_string += '&' + key + '=' + param_store[key];
													//}												

												}
											}

											if (param_store["cluster_id"] == undefined || param_store["cluster_id"] == '') {
												param_store["cluster_id"] = 0;
											}
											if (param_store["block_id"] == undefined || param_store["block_id"] == '') {
												param_store["block_id"] = 0;
											}
											if (param_store["unit_number"] == undefined || param_store["unit_number"] == '') {
												param_store["unit_number"] = null;
											}
											if (param_store["customer_name"] == undefined || param_store["customer_name"] == '') {
												param_store["customer_name"] = null;
											}
											if (param_store["purchase_startdate"] == undefined || param_store["purchase_startdate"] == '') {
												param_store["purchase_startdate"] = '1753-01-01';
											}
											if (param_store["purchase_enddate"] == undefined || param_store["purchase_enddate"] == '') {
												param_store["purchase_enddate"] = '9999-12-31';
											}
											if (param_store["pricetype_id"] == undefined || param_store["pricetype_id"] == '') {
												param_store["pricetype_id"] = 0;
											}

											var params = {cluster_id: param_store["cluster_id"],
												block_id: param_store["block_id"],
												unit_number: param_store["unit_number"],
												customer_name: param_store["customer_name"],
												purchase_startdate: param_store["purchase_startdate"],
												purchase_enddate: param_store["purchase_enddate"],
												pricetype_id: param_store["pricetype_id"],
												project: apps.project,
												pt: apps.pt
											};

											// console.log(params);
											// printpage = '<iframe id="frameprint" src="resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key='+report_name+param_string+'&projectpt='+apps.projectpt+'&project='+apps.project+'&pt='+apps.pt+'&uid='+apps.uid+'" frameborder=0 style="height:100%;width:100%;"></iframe>';										
											// printpage = '<iframe id="frameprint" src="resources/stimulsoftjsv2/viewer.php?reportfilelocation='+report_name+param_string+'&projectpt='+apps.projectpt+'&project='+apps.project+'&pt='+apps.pt+'&uid='+apps.uid+'" frameborder=0 style="height:100%;width:100%;"></iframe>';										

											if (win) {
												printpage = me.generateFakeForm2(params, report_name);
												// win.down("#MyReportPanel").body.setHTML(printpage);
											}
										}
										win.setBorder(false);
									} else {
										printpage = '<div style="padding:10px;color:#ff0000;font-weight:bold;">ERROR: Report file not found !</div>';
									}
									win.body.setHTML(printpage);
									$("#fakeReportFormID").submit();
									Ext.fly('front-content').update();
								},
								failure: function (request, response) {}
							});
							clearTimeout(loadtm);
							win.body.unmask();
						}, 750);
					}
				},
				close: function () {
					if (Ext.isFunction(onclose))
						onclose(sender);
					this.doClose();
				}
			});
		}
		win.show();
	},

	generateFakeForm2: function (paramList, reportFile) {
		//var form = '<form id="fakeReportFormID" action=resources/stimulsoftjs/viewer.php?reportfilelocation='+reportFile+'.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		var form = '<form id="fakeReportFormID" action=resources/stimulsoftjsv2/viewer.php?reportfilelocation=' + reportFile + ' target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
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
	printDocument: function(){ // added by rico 06042023
		var me = this;

		var grid = me.getGrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

		purchaseletter_bankkpr_id = record.data.purchaseletter_bankkpr_id;
		purchaseletter_id = record.data.purchaseletter_id;
		/* is_print_fee_kpr = record.data.is_print_fee_kpr; */

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'PRINTOUT_RECOMMENDED_CANCEL_DOCUMENT'}});

		var combo = Ext.create('Ext.form.field.ComboBox', {
			id: 'cbPrintoutID',
			editable: false,
			queryMode: 'local',
			valueField: 'value',
			displayField: 'value',
			width: '100%'
		});

		Ext.create('Ext.window.Window', {
			id: 'myCbDocWindow',
			title: 'Select Printout Type',
			height: 100,
			width: 400,
			layout: 'hbox',
			padding: '10px 10px 10px 10px',
			modal: true,
			items: {// Let's put an empty grid in just to illustrate fit layout
				xtype: combo,
				name: 'printout_combobox'
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
							action: 'processprintout',
							padding: 5,
							width: 75,
							iconCls: 'icon-save',
							text: 'Process',
							handler: function () {
								var me2 = this;

								var printout_cb = this.up('window').items.items[0].value;
								if (!printout_cb) {
									Ext.Msg.show({
										title: 'Alert',
										msg: 'Please Select Printout Type First',
										icon: Ext.Msg.WARNING,
										buttons: Ext.Msg.OK
									});
									return false;
								}

								// console.log(printout_cb);
								if (printout_cb == 'Stimulsoft') {

									var winId = me.detailTool.parentFDWindowId;
									var win = desktop.getWindow(winId);
									var formParent = win.down('form');

									var winId = 'myReportWindow';
									me.instantWindowReport('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
									var win = desktop.getWindow(winId);

									if (win) {
										var params = {};
										var reportFile = "FeeKPR";

										params["purchaseletter_id"] = purchaseletter_id;
										params["purchaseletter_bankkpr_id"] = purchaseletter_bankkpr_id;

										var html = me.generateFakeForm2(params, reportFile);
										win.down("#MyReportPanel").body.setHTML(html);
										$("#fakeReportFormID").submit();
									}

								} else {

									me2.up('window').body.mask('Creating Document, Please Wait...');

									Ext.Ajax.request({
										url: 'erems/recommendedtocancel/read',
										params: {
											document_name: printout_cb,
											read_type_mode: 'printout_document',
											purchaseletter_id: purchaseletter_id,
											purchaseletter_bankkpr_id: purchaseletter_bankkpr_id,
											// is_print_fee_kpr: is_print_fee_kpr
										},
										success: function (response) {
											try {
												var resp = response.responseText;

												if (resp) {
													var info = Ext.JSON.decode(resp);

													if (info.success == true) {
														me2.up('window').body.unmask();
														Ext.Msg.show({
															title: 'Info',
															msg: '<a href="' + info.url + '" target="blank">Click Here For Download Document</a>',
															icon: Ext.Msg.INFO,
															//buttons: [], //jika ingin tidak ada buttons
															buttons: Ext.Msg.CANCEL,
															buttonText: {
																cancel: 'Close',
															}
														});
													} else {
														me2.up('window').body.unmask();
														Ext.Msg.show({
															title: 'Failure',
															msg: 'Error: Create Document Failed.',
															icon: Ext.Msg.ERROR,
															buttons: Ext.Msg.OK
														});
													}
												}
											} catch (e) {
												//console.error(e);
												me2.up('window').body.unmask();
												Ext.Msg.show({
													title: 'Failure',
													msg: 'Error: Create Document Failed.',
													icon: Ext.Msg.ERROR,
													buttons: Ext.Msg.OK
												});
											}
										},
										failure: function (e) {
											//console.error(e);
											me2.up('window').body.unmask();
											Ext.Msg.show({
												title: 'Failure',
												msg: 'Error: Create Document Failed.',
												icon: Ext.Msg.ERROR,
												buttons: Ext.Msg.OK
											});
										}
									});

								}
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

		combo.bindStore(globalparameterStore);
	},

});