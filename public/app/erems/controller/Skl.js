Ext.define('Erems.controller.Skl', {
	extend: 'Erems.library.template.controller.Controlleralt',
	//    extend: 'Erems.library.template.controller.Controllerreporttb',
	alias: 'controller.Skl',
	views: ['skl.Panel', 'skl.Grid', 'skl.FormSearch', 'skl.FormData'],
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Citycombobox',
		'Erems.library.template.component.Pricetypecombobox'
	],
	stores: ['Masterdata.store.City', 'Mastercluster', 'Masterblock', 'Skl', 'Unit', 'Purchaseletterdetail', 'Mastercustomer', 'Masterparameterglobal'],
	models: ['Skl', 'Unit', 'Purchaseletterdetail', 'Mastercustomer' ],
	refs: [
		{
			ref: 'grid',
			selector: 'sklgrid'
		},
		{
			ref: 'formsearch',
			selector: 'sklformsearch'
		},
		{
			ref: 'formdata',
			selector: 'sklformdata'
		}
	],
	controllerName: 'skl',
	fieldName: 'skl_no',
	bindPrefixName: 'Skl',
	validationItems: [
		{name: 'purchaseletter_id', msg: 'You must select Kavling / Unit No. first'},
	],

	formWidth: 800,
	countLoadProcess: 0,
	printdoc: false,
	//added by anas 20052021
	myConfig: null,
	REPORT_FILE: null,
	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});
	},
	//end added by anas

	init: function (application) {
		var me = this;

		//added by anas 20052021
		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
		//end added by anas

		this.control({
			test: me.eventMonthField,
			'sklpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'sklgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'sklgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'sklgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'sklgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'sklgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'sklgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'sklformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'sklformsearch button[action=search]': {
				click: this.dataSearch
			},
			'sklformsearch button[action=reset]': {
				click: this.dataReset
			},
			'sklformdata': {
				afterrender: this.formDataAfterRender
			},
			'sklformdata button[action=save]': {
				click: this.dataSave
			},
			'sklformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'sklformdata button[action=browse_unit]': {
				click: me.selectUnitGridShow
			},
			// add by fatkur
			'sklgrid toolbar button[action=print_doc]': {
				click: this.dataPrint
			},
		});
	},

	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		grid.down('#btnEdit').setDisabled(row.length != 1);
		grid.down('#btnDelete').setDisabled(row.length < 1);
		grid.down('#btnPrint').setDisabled(row.length != 1);
		grid.down('#btnPrintdoc').setDisabled(row.length != 1);
	},

	specialRequest: function (store) {
		store.load({params: {param_spcreq: 'plCancel'}});
	},
	selectUnitGridShow: function () {
		var me = this;

		_myAppGlobal.getController('Sppjb').ctrler = 'Skl';
		_myAppGlobal.getController('Sppjb').spcreq = 'plSkl';
		_myAppGlobal.getController('Sppjb').instantWindow('browse.Panel', 800, 'Browse Item', 'read', 'myBrowseItemPanel');
	},
	processRowFromItemSelection: function (rows, modul) {
		var me = this;

		switch (modul) {
			case 'purchaseletter':
				me.fillPurchaseletter(rows);
				break;
		}
	},

	fillPurchaseletter: function (rows) {
		var me = this;

		var me = this;
		var plDetailStore = me.getPurchaseletterdetailStore();
		//me.getFormdata().up('window').body.mask('Loading data...');
		plDetailStore.load({
			params: {mode_read: 'detail', purchaseletter_id: rows[0].get('purchaseletter_id')},
			callback: function (rec) {
				/*console.log('RECORDS PURCHASE LETTER...');
				 console.log(rec[0]);*/

				// added by rico 23122022
				if(rec[0].data.is_blokir == 1){
					Ext.Msg.show({
						title: 'Info',
						msg: 'Purchaseletter Terblokir. Tidak bisa menerbitkan SKL.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK,
						fn: function () {}
					});

					return;
				}

				//console.log(rec[0].data.remaining_denda);
				if(rec[0].data.remaining_denda > 0){
					Ext.Msg.show({
						title: 'Info',
						msg: 'Unit tidak bisa dipilih karena masih ada Remaining Denda',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK,
						fn: function () {}
					});

					return;
				}

				me.getFormdata().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
				me.getFormdata().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
				me.getFormdata().down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));
				me.getFormdata().down('[name=unit_id]').setValue(rec[0].get('unit_id'));
				me.getFormdata().down('[name=customer_id]').setValue(rec[0].get('customer_id'));
				me.getFormdata().down('#fd_city').setValue(rec[0].get('customer_city_id'));
				me.getFormdata().down('[name=pricetype_id]').setValue(rec[0].get('pricetype_id'));
				me.getFormdata().down('[name=bank_bank_name]').setValue(rec[0].get('bank_bank_name'));
				me.getFormdata().down('[name=akad_realisasiondate]').setValue(rec[0].get('akad_realisasiondate'));
				//					var akad_realisasiondate;
				//					akad_realisasiondate = rec[0].get('akad_realisasiondate');	
				//					if(akad_realisasiondate){
				//						akad_realisasiondate = akad_realisasiondate.replace(' 00:00:00.000','');
				//						akad_realisasiondate = akad_realisasiondate.split("-");
				//						akad_realisasiondate = akad_realisasiondate[2] + '-' + akad_realisasiondate[1] + '-' + akad_realisasiondate[0];	
				//						me.getFormdata().down('[name=akad_realisasiondate]').setValue(akad_realisasiondate);
				//					}

				var harga_jual = rec[0].get('harga_jual');
				var total_payment = rec[0].get('total_payment');
				me.getFormdata().down('[name=harga_jual]').setValue(me.fmb(harga_jual));
				me.getFormdata().down('[name=total_payment]').setValue(me.fmb(total_payment));

				if (harga_jual && total_payment) {
					var payment_percentage = (total_payment / harga_jual) * 100;
					me.getFormdata().down('[name=payment_percentage]').setValue(me.fmb(payment_percentage));
				} else {
					me.getFormdata().down('[name=payment_percentage]').setValue('');
				}

				me.fillUnitDataToForm(rec[0]);
				me.fillMasterCustomerData(rec[0], 'customer');
			}
		});
	},

	fillUnitDataToForm: function (data) {

		var me = this;
		var filledFields = ['productcategory', 'type_name', 'land_size', 'long', 'building_size', 'width', 'kelebihan', 'floor', 'block_id', 'cluster_id', 'unit_number', 'pt_name'];

		for (var x in filledFields) {
			if (me.getFormdata().down('[name=unit_' + filledFields[x] + ']') != null) {
				me.getFormdata().down('[name=unit_' + filledFields[x] + ']').setValue(data.data['unit_' + filledFields[x]]);
			}

		}
		me.getFormdata().down('[name=code]').setValue(data.data['cluster_code']);
		me.getFormdata().down('[name=block_code]').setValue(data.data['block_code']);
	},
	fillMasterCustomerData: function (records, prefix) {
		var pr = typeof prefix === 'undefined' ? 'customer' : prefix;

		var me = this;
		var filledFields = [
			'name', 'ktp', 'npwp', 'address', 'homephone', 'email', 'mobilephone'
		];

		for (var x in filledFields) {
			if (me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']') != null) {
				me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']').setValue(records.data[pr + '_' + filledFields[x]]);
			}

		}
	},

	/*checkAllDetailLoadingProcess: function() {
	 var me = this;
	 if (me.countLoadProcess === 4) {
	 me.getFormdata().up('window').body.unmask();
	 }
	 },*/

	formDataAfterRender: function (el) {

		var me = this;
		me.loadComboBoxStore(el);
		var state = el.up('window').state;

		//city combobox
		var ftStore = null;
		ftStore = el.down('#fd_city').getStore();
		ftStore.load({params: {start: 0, limit: 0, country_id: 87}});

		if (state == 'create') {
			// el.down('#active').setValue(1);
			//me.getFormdata().down('#btnSave').setDisabled(false);
		} else {

			me.countLoadProcess = 0;
			me.getFormdata().up('window').body.mask('Loading data, please wait ...');

			var grid = me.getGrid();
			var store = grid.getStore();
			var form = me.getFormdata();

			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);

			// load purchase letter data
			var purchaseletterdetailStore = me.getPurchaseletterdetailStore();
			purchaseletterdetailStore.removeAll();
			purchaseletterdetailStore.load({
				params: {purchaseletter_id: record.data.purchaseletter_id, mode_read: 'detail'},
				callback: function (rec) {
					/*console.log('RECORDS PURCHASE LETTER...');
					 console.log(rec[0]);*/
					me.getFormdata().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
					me.getFormdata().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
					me.getFormdata().down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));
					me.getFormdata().down('[name=unit_id]').setValue(rec[0].get('unit_id'));
					me.getFormdata().down('[name=customer_id]').setValue(rec[0].get('customer_id'));
					me.getFormdata().down('#fd_city').setValue(rec[0].get('customer_city_id'));
					me.getFormdata().down('[name=pricetype_id]').setValue(rec[0].get('pricetype_id'));
					me.getFormdata().down('[name=akad_realisasiondate]').setValue(rec[0].get('akad_realisasiondate'));

					//						var akad_realisasiondate;
					//						akad_realisasiondate = rec[0].get('akad_realisasiondate');	
					//						if(akad_realisasiondate){
					//							akad_realisasiondate = akad_realisasiondate.replace(' 00:00:00.000','');
					//							akad_realisasiondate = akad_realisasiondate.split("-");
					//							akad_realisasiondate = akad_realisasiondate[2] + '-' + akad_realisasiondate[1] + '-' + akad_realisasiondate[0];	
					//							me.getFormdata().down('[name=akad_realisasiondate]').setValue(akad_realisasiondate);
					//						}

					var harga_jual = rec[0].get('harga_jual');
					var total_payment = rec[0].get('total_payment');
					me.getFormdata().down('[name=harga_jual]').setValue(me.fmb(harga_jual));
					me.getFormdata().down('[name=total_payment]').setValue(me.fmb(total_payment));

					if (harga_jual && total_payment) {
						var payment_percentage = (total_payment / harga_jual) * 100;
						me.getFormdata().down('[name=payment_percentage]').setValue(me.fmb(payment_percentage));
					} else {
						me.getFormdata().down('[name=payment_percentage]').setValue('');
					}

					me.fillUnitDataToForm(rec[0]);
					me.fillMasterCustomerData(rec[0], 'customer');
				}
			});

			// disable button
			form.down('#fd_browse_unit_btn').setDisabled(true);
			// end disable button

			if (state == 'update') {

			} else if (state == 'read') {
				me.getFormdata().getForm().getFields().each(function (field) {
					field.setReadOnly(true);
				});
				me.getFormdata().down('#btnSave').setDisabled(true);
			}
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

	dataPrint: function (el) {
		var me = this;

		var grid = me.getGrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
		var param_store = record.data;
		var param_string = '';

		if(param_store['is_blokir'] == 1){ // added by rico 26122022
			Ext.Msg.show({
				title: 'Info',
				msg: 'Purchaseletter Terblokir. Tidak bisa mencetak SKL.',
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK,
				fn: function () {}
			});

			return;
		}

		for (var key in param_store) {
			if (param_store.hasOwnProperty(key)) {
				if (param_store[key] == undefined || param_store[key] == null) {
					param_store[key] = '';
				} else {
					param_string += '&' + key + '=' + param_store[key];
				}

			}
		}

		var param_data = {'purchaseletter_id': param_store['purchaseletter_id']};

		//                                console.log(param_data);

		if (param_store['remaining_denda_total'] > 0) {
			Ext.Msg.show({
				title: 'Failure',
				msg: 'Masih ada denda, tidak bisa print SKL.',
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK
			});
		} else {
			//                    loadReport(el, 'erems/skl/print', param_string);
			// me.processReport(param_data,'Skl');
			if (me.printdoc) {
				me.docPrint();
			} else {
				//added and updated by anas 20052021
				var reportFile = me.REPORT_FILE;
				me.processReport(param_data, reportFile);
			}

		}


	},
	processReport: function (data, report) {
		var me, winId, win, params, html;
		me = this;
		winId = 'myReportWindow';
		me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		win = desktop.getWindow(winId);
		if (win) {
			//            params = me.setData();
			html = me.generateFakeForm(data, report);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},

	generateFakeForm: function (paramList, reportFile) {
		var form, x;
		var form = '<form id="fakeReportFormID" action=' + document.URL + 'resources/stimulsoftjsv3/viewer.php?reportfilelocation=' + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		for (x in paramList) {
			if (paramList[x] === null) {
				paramList[x] = '';
			}
			form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
		}
		form += '<input type="submit" value="post"></form>';
		form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
		return form;
	},

	instantWindow: function (panel, width, title, state, id, controller) {
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

	//added by anas 200502021
	panelAfterRender: function (el) {
		var me = this;

		me.tools.ajax({
			params: {},
			success: function (data) {
				me.REPORT_FILE = data.REPORT_FILE;
			}
		}).read('detailGenco');

		// me.tools.ajax({
		//     params: {},
		//     success: function (data) {
		//         console.log(data)
		//     }
		// }).read('printdocGenco');

		Ext.Ajax.request({
			url: 'erems/skl/read',
			params: {
				mode_read: 'printdocGenco'
			},
			success: function (response) {
				console.log(response.responseText)
				if (response.responseText == 'true') {
					me.getGrid().down('#btnPrint').setVisible(false);
					me.getGrid().down('#btnPrintdoc').setVisible(true);
					me.printdoc = true;
				}
			}
		});
	},

	//added by fatkur 22072021
	//printout
	docPrint: function () {
		var me = this;

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'PRINTOUT_SKL_DOC'}});

		var grid = me.getGrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
		console.log(record);
		var id = record.data.purchaseletter_id;

		me.documentPrintout(id, 'erems/skl/read');

		var combo = Ext.getCmp('cbPrintoutID');
		combo.bindStore(globalparameterStore);
	},
});