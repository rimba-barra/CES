Ext.define('Erems.controller.Proseswhatsapp', {
	extend: 'Erems.library.template.controller.Controller2',
	requires: ['Erems.library.Browse',
		'Erems.library.box.Config',
		'Erems.library.box.tools.Tools',
		'Erems.template.ComboBoxFields',
		'Erems.library.box.tools.EventSelector',
		'Erems.library.ModuleTools'],
	alias: 'controller.Proseswhatsapp',
	views: ['proseswhatsapp.Panel', 'proseswhatsapp.Grid', 'proseswhatsapp.FormSearch', 'proseswhatsapp.FormData'],
	refs: [
		{
			ref: 'panel',
			selector: 'proseswhatsapppanel'
		},
		{
			ref: 'grid',
			selector: 'proseswhatsappgrid'
		},
		{
			ref: 'formsearch',
			selector: 'proseswhatsappformsearch'
		},
		{
			ref: 'formdata',
			selector: 'proseswhatsappformdata'
		},
		{
			ref: 'formdataprocess',
			selector: 'proseswhatsappformdataprocess'
		},
		{
			ref: 'gridcustomer',
			selector: 'proseswhatsappcustomergrid'
		}

	],
	controllerName: 'proseswhatsapp',
	fieldName: 'whatsapp_id',
	bindPrefixName: 'Proseswhatsapp',
	localStore: {
		detail: null,
		selectedUnit: null,
		customer: null
	},
	browseHandler: null,
	cbf: null,
	mt: null,
	formWidth: 500,
	formxWinId: 'win-posisiwinId',
	saldo: 0,
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

		this.control({
			'proseswhatsapppanel': {
				afterrender: this.panelAfterRender,
				beforerender: me.mainPanelBeforeRender

			},
			'proseswhatsappgrid': {
				afterrender: this.gridAfterRender,
//				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'proseswhatsappgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'proseswhatsappgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'proseswhatsappgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'proseswhatsappgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'proseswhatsappgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'proseswhatsappformsearch button[action=search]': {
				click: this.dataSearch
			},
			'proseswhatsappformsearch button[action=reset]': {
				click: this.dataReset
			},
			'proseswhatsappformdata': {
				afterrender: this.formDataAfterRender
			},
			'proseswhatsappformdata button[action=save]': {
				click: this.mainDataSave
			},
			'proseswhatsappformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'proseswhatsappgrid toolbar button[action=process]': {
				click: function () {
					me.showFormProcessWA();
				}
			},
			'proseswhatsappformdataprocess button[action=process]': {
				click: function () {
					me.processClick();
				}
			},
			// 'proseswhatsappformdata button[action=browse]': {
			// 	click: function (el) {
			// 		me.browseCustomer(el);
			// 	}
			// },
			'proseswhatsappcustomergrid button[action=select]': {
				click: this.customerSelect
			},
			'proseswhatsappgrid toolbar button[action=excel]': {
				click: function () {
					me.saveExcel();
				}
			},
			'proseswhatsappgrid toolbar button[action=excel_selected]': {
				click: function () {
					me.saveExcelSelected();
				}
			},
			'proseswhatsappgrid toolbar button[action=excel_all]': {
				click: function () {
					me.saveExcelAll();
				}
			},
			'proseswhatsappgrid toolbar button[action=csv_all]': {
				click: function () {
					me.saveCsvAll();
				}
			},
			//ended
			'proseswhatsappgrid toolbar button[action=send_wa]': {
				click: function () {
					me.sendWA();
				}
			},
		});
	},
	gridAfterRender: function (el) {
		var me = this;

		me.getFormsearch().down('[name=wastatus]').setValue('0');
		me.dataSearch();
		
		if (me.references.includes('formsearch')) {
			var form = me.getFormsearch();
			me.textfield = Ext.ComponentQuery.query('[xtype=textfield]', form);

			for (var i = 0; i < me.textfield.length; i++) {
				Ext.applyIf(me.textfield[i], {enableKeyEvents: true});

				me.textfield[i].on('keypress', function (e, el) {
					if (el.getCharCode() === 13) {
						me.dataSearch();
					}
				});
			}
		}

	},
	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		var availSend = true;
		for (var i in row) {
			if (row[i].data['status'] == 1) {
				availSend = false;
				break;
			}
		}
		grid.down('#btnSendWA').setDisabled(row.length < 1 || availSend == false);
		grid.down('#btnEdit').setDisabled(row.length < 1);
		grid.down('#btnView').setDisabled(row.length < 1);
	},

	dataSearch: function () {
		var me = this;

		var form = me.getFormsearch().getForm();
		var fields = me.getFormsearch().getValues();
		me.getGrid().doInit();
		var store = me.getGrid().getStore();
		for (var x in fields) {

			store.getProxy().setExtraParam(x, fields[x]);
		}
		store.getProxy().setExtraParam("whatsappcategory_whatsappcategory_id", me.getFormsearch().down("[name=whatsappcategory_id]").getValue());
		me.loadPage(store);

	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);
		var me = this;
		var f = me.getFormsearch();

		me.tools.ajax({
			params: {},
			success: function (data, model) {
				//  f.setLoading(false);
				me.tools.wesea(data.whatsappcategory, f.down("[name=whatsappcategory_id]")).comboBox();
			}
		}).read('processinit');

		//get saldo
		this.getSaldo();

	},
	customerSelect: function () {
		var me = this;
		var f = me.getFormdata();
		if (me.browseHandler) {
			me.browseHandler.selectItem(function (rec) {

				/// cek jika nomor hpnya banyak
				var phoneNumber = rec.get("mobile_phone");
				phoneNumber = phoneNumber.split(",");

				f.down("[name=wa_phonenumber]").setValue(phoneNumber[0]);
				//   console.log(rec);
			});
		}

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
			loadRecordPrefix: "customer",
			browseId: 'unitpl'
		});
		browse.showWindow();

		/*
		 var state = "create";
		 me.instantWindow('CustomerGrid', 500, 'Customer', state, 'myCustomerWindow');
		 var g = me.getGridcustomer();
		 g.doInit();
		 //  g.getStore().loadPage(1);
		 g.getStore().load({
		 params: {
		 //state:"load_default_attribute"
		 },
		 callback: function(rec, op) {
		 g.attachModel(op);
		 }
		 });
		 // g.loadPage(1);
		 */
	},
	processClick: function () {
		var me = this;
		var f = me.getFormdataprocess();
		var vs = f.getValues();
		console.log(vs);
		/// validate
		if (vs.process_date.length == 0) {
			me.tools.alert.warning("Invalid process date");
			return;
		} else if (me.tools.intval(vs.whatsappcategory_whatsappcategory_id) == 0) {
			me.tools.alert.warning("Invalid category");
			return;
		}
		f.setLoading("Please wait...");
		me.tools.ajax({
			params: {
				whatsappcategory_whatsappcategory_id: me.tools.intval(vs.whatsappcategory_whatsappcategory_id),
				process_date: vs.process_date,
				start_date: vs.start_date,
				end_date: vs.end_date
			},
			success: function (data, model) {
				f.setLoading(false);

				console.log(data);
				var status = me.tools.intval(data['others'][0][0]['HASIL']);

				if (status) {
					me.tools.alert.info("Success!");
					me.getGrid().getStore().loadPage(1);
					f.up("window").close();
				} else {
					me.tools.alert.warning(data['others'][0][0]["MSG"]);
				}
			}
		}).read('proseswhatsapp');

	},
	showFormProcessWA: function () {
		var me = this;
		var state = 'create';
		me.instantWindow('FormDataProcess', 500, 'Process', state, 'myProcessWindow');
		var f = me.getFormdataprocess();
		me.tools.ajax({
			params: {},
			success: function (data, model) {
				f.setLoading(false);
				// me.tools.wesea(data.wacategory, f.down("[name=whatsappcategory_whatsappcategory_id]")).comboBox();
				//  me.tools.wesea(data.bank, f.down("[name=bank_bank_id]")).comboBox();

			}
		}).read('processinit');
	},
	// added by rico 04102022
	formDataAfterRender: function (el) {
		var state = el.up('window').state;

		var me = this;
		me.fdar().init();

		if (state == 'create') {
			me.fdar().create();
		} else if (state == 'update') {
			me.fdar().update();
		} else if (state == 'view') {
			me.fdar().view();
		} else if (state == 'read') {
			me.fdar().read();
		}
	},
	fdar: function () {
		var me = this;

		return me.altFdar(me);
	},
	mainDataSave: function () {
		var me = this;

		me.tools.iNeedYou(me).save();
	},
	altFdar: function (controller) {
		var me = this;
		var f = controller.getFormdata();

		var x = {
			init: function () {
				controller.setActiveForm(f);
			},
			create: function () {
				var that = this;
				f.editedRow = -1;
				/*
				 f.setLoading("Loading components...");
				 me.tools.ajax({
				 params: {},
				 success: function(data, model) {
				 
				 
				 f.setLoading(false);
				 me.tools.wesea(data.employee, f.down("[name=upline_id]")).comboBox();
				 me.tools.wesea(data.bank, f.down("[name=bank_bank_id]")).comboBox();
				 
				 }
				 }).read('detail');
				 */
				f.setLoading("Loading...");
				me.tools.ajax({
					params: {},
					success: function (data, model) {
						f.setLoading(false);
						me.tools.wesea(data.wacategory, f.down("[name=whatsappcategory_whatsappcategory_id]")).comboBox();

						f.down("[name=whatsappcategory_whatsappcategory_id]").setReadOnly(true);
						//  console.log(data);
						var waLangsungId = me.tools.intval(data.others[0][0]['WALANGSUNGID']);
						f.down("[name=whatsappcategory_whatsappcategory_id]").setValue(waLangsungId);
					}
				}).read('processinit');

			},
			// added by rico 04102022
			update: function () {
				var rec = me.getGrid().getSelectedRecord();
				f.editedRow = me.getGrid().getSelectedRow();
		
				f.down("[name=whatsapp_phonenumber]").setValue(rec.get("whatsapp_phonenumber"));

				f.down("[name=notes]").setVisible(false);
				f.down('#btnSave').setVisible(true);
			},
			// added by rico 04102022
			read: function () {
				var rec = me.getGrid().getSelectedRecord();
				f.editedRow = me.getGrid().getSelectedRow();
				
				f.down("[name=whatsapp_phonenumber]").setValue(rec.get("whatsapp_phonenumber"));
				f.down("[name=notes]").setValue(rec.get("notes"));

				f.down("[name=whatsapp_phonenumber]").setReadOnly(true);
				f.down("[name=notes]").setReadOnly(true);

				f.setHeight(300);

				f.down('#btnSave').setVisible(false);
				f.down("[name=notes]").setVisible(true);
			}

		};
		return x;
	},
	getSaldo: function () {
		var me = this;
		me.tools.ajax({
			params: {},
			success: function (data, model) {
				var hasil = data['others'][0][0]['HASIL'];
				var saldo = (hasil['saldo'] == null) ? 0 : hasil['saldo'];
				me.saldo = saldo;
				Ext.ComponentQuery.query('#textSaldoProses')[0].setValue('Saldo: '+accounting.formatMoney(saldo));
			}
		}).read('checksaldo');

	},
	sendWA: function () {
		var me = this;
		var p = me.getGrid();
		var selected = me.getGrid().getSelectionModel().getSelection();
		var params = me.getFormsearch().getValues();
		params["page"] = me.getGrid().getStore().currentPage;
		// params["whatsappcategory_whatsappcategory_id"] = me.getFormsearch().down("[name=whatsappcategory_whatsappcategory_id]").getValue();
		var t = 0;
		var n = 0;
		for (var i in selected) {
			t = t + 1;
		}
		
		if (t > me.saldo) {
			Ext.Msg.show({
				title: 'SORRY',
				msg: 'NO BALANCE',
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK,
			});
		} else {
			p.setLoading("Please wait, sending Whatsapp to " + n + "/" + t + " users...");

			for (var i in selected) {
				//do ajax
				me.tools.ajax({
					params: {
						data: Ext.encode([selected[i].data])
					},
					success: function (data, model) {
						n = n + 1;
						p.setLoading("Please wait, sending Whatsapp to " + n + "/" + t + " users...");
						if (n == t) {
							p.setLoading(false);
							var url = 1;
							if (data['others'][0] == 0) {
								Ext.Msg.show({
									title: 'SORRY',
									msg: 'NO ACCOUNT FOUND / NO BALANCE',
									icon: Ext.Msg.ERROR,
									buttons: Ext.Msg.OK,
									fn: function () {
										me.getGrid().getStore().loadPage(1);
										me.getSaldo();
									}
								});
//								throw Error;
							}
							if (url) {
								Ext.Msg.show({
									title: 'Info',
									msg: 'WA HAS BEEN SENT',
									icon: Ext.Msg.INFO,
									buttons: Ext.Msg.OK,
									fn: function () {
										Ext.ComponentQuery.query('#wastatus_id')[0].setValue('0');
										Ext.ComponentQuery.query('#btnSearch')[0].fireEvent('click');
										me.getGrid().getStore().loadPage(1);
										me.getSaldo();
									}
								});
							}
						}
					}
				}).read('sendproseswhatsapp');
			}
		}
	},

});
