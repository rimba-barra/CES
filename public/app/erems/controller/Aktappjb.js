Ext.define('Erems.controller.Aktappjb', {
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Aktappjb',
	views: ['aktappjb.Panel', 'aktappjb.Grid', 'aktappjb.FormSearch', 'aktappjb.FormData'],
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Unitcombobox',
		'Erems.library.template.component.Notariscombobox'
	],
	stores: ['Mastercluster', 'Masterblock', 'Aktappjb', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masternotaris', 'Masterblock'],
	models: ['Aktappjb', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masternotaris', 'Masterblock'],
	refs: [
		{
			ref: 'grid',
			selector: 'aktappjbgrid'
		},
		{
			ref: 'formsearch',
			selector: 'aktappjbformsearch'
		},
		{
			ref: 'formdata',
			selector: 'aktappjbformdata'
		}
	],
	comboBoxIdEl: ['fs_cluster_id', 'fs_block_id', 'fs_unit_id', 'fd_notaris_id'],
	controllerName: 'aktappjb',
	fieldName: 'aktappjb_no',
	bindPrefixName: 'Aktappjb',
	validationItems: [
		{name: 'purchaseletter_id', msg: 'You must select Kavling / Unit No. first'},
	],

	formWidth: 800,
	countLoadProcess: 0,
	init: function (application) {
		var me = this;

		this.control({
			test: me.eventMonthField,
			'aktappjbpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'aktappjbgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'aktappjbgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'aktappjbgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'aktappjbgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'aktappjbgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'aktappjbgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'aktappjbformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'aktappjbformsearch button[action=search]': {
				click: this.dataSearch
			},
			'aktappjbformsearch button[action=reset]': {
				click: this.dataReset
			},
			'aktappjbformdata': {
				afterrender: this.formDataAfterRender
			},
			'aktappjbformdata button[action=save]': {
				click: this.dataSave
			},
			'aktappjbformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'aktappjbformdata button[action=browse_unit]': {
				click: me.selectUnitGridShow
			},
		});
	},
	dataSave: function () {
		var me = this;
		var form = me.getFormdata().getForm();
		var addingRecord = false;
		if (!me.finalValidation()) {
			return false;
		}

		// added 12 Nov 2013 
		var vp = me.validationProcess();
		var vps = false; // validation prosess status
		if (typeof vp === 'object') {
			vps = vp.status;
			if (!vps) {
				Ext.MessageBox.alert('Alert', vp.msg, function () {
					var x = me.getFormdata().down('[name=' + vp.field + ']');
					if (x !== null) {
						x.markInvalid(vp.msg);
						x.focus();
					}
				});
			}
		} else if (typeof vp === 'boolean') {
			vps = vp;
		}
		// end added 12 Nov 2013

		if (form.isValid() && vps) {
			resetTimer();
			var store = null;
			var fida = me.getFinalData(form.getValues());
			if (me.instantCreateMode) {
				store = _myAppGlobal.getController(me.callerId).getInstanCreateStorex(me.controllerName);
			} else {
				/* Mendefinisikan store sendiri pada saat proses simpan/edit 
				 * yang ada di me.storeProcess
				 * */
				if (!me.storeProcess) {
					store = me.getGrid().getStore();
				} else {
					store = me.storeProcess;
				}
			}

			var msg = function () {
				me.getFormdata().up('window').body.mask('Saving data, please wait ...');
			};
			switch (me.getFormdata().up('window').state.toLowerCase()) {
				case 'create':
					store.add(fida);
					addingRecord = true;
					break;
				case 'update':
					var idProperty = store.getProxy().getReader().getIdProperty();
					var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
					rec.beginEdit();
					rec.set(fida);
					rec.endEdit();
					break;
				default:
					return;
			}

			store.on('beforesync', msg);
			store.sync({
				success: function (s) {
					// var res = Ext.decode(s.operations[0].response.responseText)[0];
					// if(res.result == 0){
					//     me.getFormdata().up('window').body.unmask();
					//     store.un('beforesync', msg);
					//     store.reload();

					//     if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
					//         Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
					//     }
					//     Ext.Msg.show({
					//         title: 'Failure',
					//         msg: res.message,
					//         icon: Ext.Msg.ERROR,
					//         buttons: Ext.Msg.OK
					//     });
					// }else{
					me.getFormdata().up('window').body.unmask();
					store.un('beforesync', msg);
					store.reload();

					// if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
					//     Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
					// }
					Ext.Msg.show({
						title: 'Success',
						msg: 'Data saved successfully.',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							me.formDataClose();
						}
					});
					// }
				},
				failure: function () {
					me.getFormdata().up('window').body.unmask();
					store.un('beforesync', msg);
					if (store.getCount() > 0 && addingRecord) {
						store.removeAt(store.getCount() - 1);
					}
					store.reload();
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Unable to save data.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			});
		} else {
			Ext.Msg.show({
				title: 'Failure',
				msg: me.checkRequired(form) + ' is required.',
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK
			});
		}
	},
	// added by rico 21062021
	checkRequired: function (form) {
		var me = this;
		var items = form.getFields().items;
		var label = [];
		for (var i = 0; i < items.length; i++) {
			if (!items[i].allowBlank && (items[i].activeError != '' && typeof items[i].activeError !== 'undefined') && items[i].xtype != 'hiddenfield') {
				label.push(items[i].fieldLabel);
			}
		}
		return label.join();
	},
	specialRequest: function (store) {
		store.load({params: {param_spcreq: 'plAktappjb'}});
	},
	selectUnitGridShow: function () {
		var me = this;

		_myAppGlobal.getController('Sppjb').ctrler = 'Aktappjb';
		_myAppGlobal.getController('Sppjb').spcreq = 'plAktappjb';
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
				console.log('RECORDS PURCHASE LETTER...');
				console.log(rec[0]);
				me.getFormdata().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
				me.getFormdata().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
				me.getFormdata().down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));

				me.getFormdata().down('[name=aktappjb_name]').setValue(rec[0].get('customer_name'));
				me.getFormdata().down('[name=aktappjb_address]').setValue(rec[0].get('customer_address'));

				me.getFormdata().down('[name=unit_id]').setValue(rec[0].get('unit_id'));

				me.getFormdata().down('[name=unit_electricity]').setValue(rec[0].get('unit_electricity'));

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
			'name', 'ktp', 'npwp'
		];
		console.log('RECORDS CUSTOMER...');
		console.log(records);

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

		if (state == 'create') {
			// el.down('#active').setValue(1);
			//me.getFormdata().down('#btnSave').setDisabled(false);
			var form = me.getFormdata();
			var checked = form.down('#rencana_st_tgl').getValue();
			if (checked) {
				form.down('[name=serahterimaplan_month]').setDisabled(true);
				form.down('[name=serahterimaplan_date]').setDisabled(false);
			} else {
				form.down('[name=serahterimaplan_month]').setDisabled(false);
				form.down('[name=serahterimaplan_date]').setDisabled(true);
			}
		} else {

			me.countLoadProcess = 0;
			me.getFormdata().up('window').body.mask('Loading data, please wait ...');

			var grid = me.getGrid();
			var store = grid.getStore();
			var form = me.getFormdata();

			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);

			form.down('[name=unit_electricity]').setValue(record.data.electricity);
			form.down('[name=customer_ktp]').setValue(record.data.aktappjb_ktp);
			form.down('[name=customer_npwp]').setValue(record.data.aktappjb_npwp);

			// load purchase letter data
			var purchaseletterdetailStore = me.getPurchaseletterdetailStore();
			purchaseletterdetailStore.removeAll();
			purchaseletterdetailStore.load({params: {purchaseletter_id: record.data.purchaseletter_id, mode_read: 'detail'},
				callback: function (purchaselettedetailrec) {
					console.log('UPDATE UNIT PURCHASE LETTER DATA...');
					console.log(purchaselettedetailrec[0]);
					form.down('[name=purchase_date]').setValue(purchaselettedetailrec[0].get('purchase_date'));
					form.down('[name=customer_name]').setValue(purchaselettedetailrec[0].get('customer_name'));
					me.fillUnitDataToForm(purchaselettedetailrec[0]);
					me.countLoadProcess += 1;
					//me.checkAllDetailLoadingProcess();

				}});

			///// disable button
			//me.disableFieldForm();
			form.down('#fd_browse_unit_btn').setDisabled(true);
			//// end disable button

			var serahterimaplan_date,
					serahterimaplan_month;

			serahterimaplan_date = record.data.serahterimaplan_date;
			serahterimaplan_month = record.data.serahterimaplan_month
			if (serahterimaplan_month != 0) {
				form.down('#rencana_st_bln').setValue(true);
				form.down('#serahterimaplan_date').setValue(new Date());
				form.down('#serahterimaplan_date').setDisabled(true);
			} else {
				form.down('#rencana_st_tgl').setValue(true);
				form.down('#serahterimaplan_month').setValue(0);
				form.down('#serahterimaplan_month').setDisabled(true);
			}

			if (state == 'update') {

			} else if (state == 'read') {
				me.getFormdata().getForm().getFields().each(function (field) {
					field.setReadOnly(true);
				});
				me.getFormdata().down('#btnSave').setDisabled(true);
			}
		}
	},

	/*disableFieldForm: function() {
	 var me = this;
	 
	 var dF = ['pricetype_id', 'purchase_date', 'formula', 'j_tanda_jadi', 'j_uang_muka', 'j_sisa', 'n_tanda_jadi', 'n_uang_muka', 'n_sisa',
	 '_harga_tanah_a', '_harga_tanah_b', '_harga_kelebihan_a', '_harga_kelebihan_b', '_harga_bangunan', '_disc_harga_dasar',
	 '_tot_disc_harga_dasar', '_disc_harga_tanah', '_tot_disc_harga_tanah', '_disc_harga_bangunan', '_tot_disc_harga_bangunan',
	 '_ppn_tanah', '_tot_ppn_tanah', '_ppn_bangunan', '_tot_ppn_bangunan', '_harga_balik_nama', '_harga_bphtb', '_harga_bajtb',
	 '_biaya_administrasi', '_biaya_administrasi_subsidi', '_biaya_p_mutu', '_biaya_paket_tambahan', '_disc_sales', '_tot_disc_sales'];
	 var f = me.getFormdata();
	 for (var i = 0; i < dF.length; i++) {
	 f.down('[name=' + dF[i] + ']').setReadOnly(true);
	 }
	 
	 
	 },*/

	/*dataReset: function() {
	 var me = this;
	 me.getFormsearch().getForm().reset();
	 
	 var el = me.getFormsearch();
	 el.down('#fs_cluster_id').setValue('');
	 
	 me.dataSearch();
	 },*/


});