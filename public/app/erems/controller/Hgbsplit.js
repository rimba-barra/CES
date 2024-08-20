Ext.define('Erems.controller.Hgbsplit', {
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Hgbsplit',
	views: ['hgbsplit.Panel', 'hgbsplit.Grid', 'hgbsplit.FormSearch', 'hgbsplit.FormData'],
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Notariscombobox',
		'Erems.library.template.component.Projectptcombobox',
	],
	stores: ['Masterdata.store.Projectpt', 'Masternotaris', 'Mastercluster', 'Masterblock', 'Hgbsplit', 'Unit', 'Purchaseletterdetail', 'Masterhgbinduk'],
	models: ['Hgbsplit', 'Unit', 'Purchaseletterdetail', 'Masterhgbinduk'],
	refs: [
		{
			ref: 'panel',
			selector: 'hgbsplitpanel'
		},
		{
			ref: 'grid',
			selector: 'hgbsplitgrid'
		},
		{
			ref: 'formsearch',
			selector: 'hgbsplitformsearch'
		},
		{
			ref: 'formdata',
			selector: 'hgbsplitformdata'
		}
	],
	controllerName: 'hgbsplit',
	fieldName: 'hgb_number',
	bindPrefixName: 'Hgbsplit',
	validationItems: [
		{name: 'unit_id', msg: 'You must select Kavling / Unit No. first'},
				//{name:'hgbinduk_id',msg:'You must select HGB Induk first'}
	],

	formWidth: 800,
	countLoadProcess: 0,
	init: function (application) {
		var me = this;

		this.control({
			test: me.eventMonthField,
			'hgbsplitpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'hgbsplitgrid': {
				beforerender: this.gridBeforeRender,
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange,
				listeners: {
					load: function () {
						me.jqueryBinding();
					}
				}
			},
			'hgbsplitgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'hgbsplitgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'hgbsplitgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'hgbsplitgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'hgbsplitgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'hgbsplitformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'hgbsplitformsearch button[action=search]': {
				click: this.dataSearch
			},
			'hgbsplitformsearch button[action=reset]': {
				click: this.dataReset
			},
			'hgbsplitformdata': {
				afterrender: this.formDataAfterRender
			},
			'hgbsplitformdata button[action=save]': {
				click: this.dataSave
			},
			'hgbsplitformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'hgbsplitformdata button[action=browse_unit]': {
				click: me.selectUnitGridShow
			},
			'hgbsplitformdata button[action=browse_hgbinduk]': {
				click: me.selectHgbindukGridShow
			},
			'hgbsplitgrid toolbar radiogroup': {
				change: me.changeGrid
			},
			'hgbsplitformdata [name=is_ijb]': {
				change: me.setijb
			}
		});
	},
	gridBeforeRender: function () {
		var me = this;
		me.filterGrid('keseluruhan');
	},
	setijb: function () {
		var me = this;
		var val_ijb = me.getFormdata().down('[name=is_ijb]').getValue();
		me.changeijb(val_ijb);
//        alert(val_ijb);
	},
	changeijb: function (param) {
		var me = this;
		if (param == 1) {
			me.getFormdata().down('[name=ajb_number]').labelEl.update('IJB Number');
			me.getFormdata().down('[name=ajb_date]').labelEl.update('IJB Date');
			me.getFormdata().down('[name=ajb_name]').labelEl.update('IJB Name');
			me.getFormdata().down('[name=ajb_sign_date]').labelEl.update('IJB Sign Date');
			me.getFormdata().down('[name=ajb_tocustomer_date]').labelEl.update('Tgl. Kirim IJB ke Customer/Bank');
			me.getFormdata().down('[name=ajb_legal_tonotaris_date]').labelEl.update('Tgl. Serah Terima IJB Legal - Notaris');
			me.getFormdata().down('[name=ajb_notaris_tolegal_date]').labelEl.update('Tgl. Terima IJB Notaris - Legal');
			me.getFormdata().down('[name=ajb_legal_toperijinan_date]').labelEl.update('Tgl. ST IJB Legal - Perijinan');
			me.getFormdata().down('[name=kelengkapan_berkas_ajb_date]').labelEl.update('Tgl. Kelengkapan Berkas IJB');
		} else {
			me.getFormdata().down('[name=ajb_number]').labelEl.update('AJB Number');
			me.getFormdata().down('[name=ajb_date]').labelEl.update('AJB Date');
			me.getFormdata().down('[name=ajb_name]').labelEl.update('AJB Name');
			me.getFormdata().down('[name=ajb_sign_date]').labelEl.update('AJB Sign Date');
			me.getFormdata().down('[name=ajb_tocustomer_date]').labelEl.update('Tgl. Kirim AJB ke Customer/Bank');
			me.getFormdata().down('[name=ajb_legal_tonotaris_date]').labelEl.update('Tgl. Serah Terima AJB Legal - Notaris');
			me.getFormdata().down('[name=ajb_notaris_tolegal_date]').labelEl.update('Tgl. Terima AJB Notaris - Legal');
			me.getFormdata().down('[name=ajb_legal_toperijinan_date]').labelEl.update('Tgl. ST AJB Legal - Perijinan');
			me.getFormdata().down('[name=kelengkapan_berkas_ajb_date]').labelEl.update('Tgl. Kelengkapan Berkas AJB');
		}
	},
	filterGrid: function (param) {
		var me = this;
//      var val_grid = me.getGrid().down('[name=radiogroup_view_grid]').getValue().view_grid; 
		var val_grid = param;
//        console.log(val_grid);
		var show_grid = me.getGrid();
		if (val_grid == 'atas_nama_pt') {
			me.gridVisible();
			show_grid.down('[itemId=colms_mhgbinduk]').setVisible(true);
			show_grid.down('[itemId=colms_pt_hgb_no]').setVisible(true);
			show_grid.down('[itemId=colms_pt_luas]').setVisible(true);
			show_grid.down('[itemId=colms_pt_hgb_date]').setVisible(true);
			show_grid.down('[itemId=colms_pt_name]').setVisible(true);
			me.getFormsearch().down('[itemId=view_grid_param]').setValue(val_grid);
			me.getFormsearch().down('[name=is_gabungan]').setValue(false);
			me.dataSearch();
		} else if (val_grid == 'atas_nama_user') {
			me.gridVisible();
			show_grid.down('[itemId=colms_mhgbinduk]').setVisible(true);
			show_grid.down('[itemId=colms_hgb_number]').setVisible(true);
			show_grid.down('[itemId=colms_hgb_gsgu_luas]').setVisible(true);
			show_grid.down('[itemId=colms_hgb_date]').setVisible(true);
			show_grid.down('[itemId=colms_customer_name]').setVisible(true);
			me.getFormsearch().down('[itemId=view_grid_param]').setValue(val_grid);
			me.getFormsearch().down('[name=is_gabungan]').setValue(false);
			me.dataSearch();
		} else if (val_grid == 'keseluruhan') {
			me.gridVisible();
			show_grid.down('[itemId=colms_mhgbinduk]').setVisible(true);
			show_grid.down('[itemId=colms_pt_hgb_no]').setVisible(true);
			show_grid.down('[itemId=colms_pt_luas]').setVisible(true);
			show_grid.down('[itemId=colms_pt_hgb_date]').setVisible(true);
			show_grid.down('[itemId=colms_pt_name]').setVisible(true);
			show_grid.down('[itemId=colms_hgb_number]').setVisible(true);
			show_grid.down('[itemId=colms_hgb_gsgu_luas]').setVisible(true);
			show_grid.down('[itemId=colms_hgb_date]').setVisible(true);
			show_grid.down('[itemId=colms_customer_name]').setVisible(true);
			me.getFormsearch().down('[itemId=view_grid_param]').setValue(val_grid);
			me.getFormsearch().down('[name=is_gabungan]').setValue(false);
			me.dataSearch();
		} else if (val_grid == 'hpl') {
			me.gridVisible();
			show_grid.down('[itemId=colms_no_hpl_induk]').setVisible(true);
			show_grid.down('[itemId=colms_hpl_no_gs]').setVisible(true);
			show_grid.down('[itemId=colms_hpl_luas]').setVisible(true);
			show_grid.down('[itemId=colms_hpl_date]').setVisible(true);
			show_grid.down('[itemId=colms_hpl_skpt_no]').setVisible(true);
			me.getFormsearch().down('[itemId=view_grid_param]').setValue(val_grid);
			me.getFormsearch().down('[name=is_gabungan]').setValue(false);
			me.dataSearch();
		} else if (val_grid == 'exs_gabungan') {
			show_grid.down('[itemId=colms_mhgbinduk]').setVisible(true);
			show_grid.down('[itemId=colms_pt_hgb_no]').setVisible(true);
			show_grid.down('[itemId=colms_pt_luas]').setVisible(true);
			show_grid.down('[itemId=colms_pt_hgb_date]').setVisible(true);
			show_grid.down('[itemId=colms_pt_name]').setVisible(true);
			show_grid.down('[itemId=colms_hgb_number]').setVisible(true);
			show_grid.down('[itemId=colms_hgb_gsgu_luas]').setVisible(true);
			show_grid.down('[itemId=colms_hgb_date]').setVisible(true);
			show_grid.down('[itemId=colms_customer_name]').setVisible(true);
			show_grid.down('[itemId=colms_mhgbinduk]').setVisible(true);
			show_grid.down('[itemId=colms_ajb_date]').setVisible(true);
			show_grid.down('[itemId=colms_ajb_no]').setVisible(true);
			show_grid.down('[itemId=colms_ajb_name]').setVisible(true);
			me.getFormsearch().down('[itemId=view_grid_param]').setValue(val_grid);
			me.getFormsearch().down('[name=is_gabungan]').setValue(true);
			me.dataSearch();
		} else if (val_grid == 'ajb') {
			me.gridVisible();
//            show_grid.down('[itemId=colms_mhgbinduk]').setVisible(true);
			show_grid.down('[itemId=colms_hgb_number]').setVisible(true);
			show_grid.down('[itemId=colms_ajb_date]').setVisible(true);
			show_grid.down('[itemId=colms_ajb_no]').setVisible(true);
			show_grid.down('[itemId=colms_ajb_name]').setVisible(true);
			show_grid.down('[itemId=colms_notaris]').setVisible(true);
			me.getFormsearch().down('[itemId=view_grid_param]').setValue(val_grid);
			me.getFormsearch().down('[name=is_gabungan]').setValue(false);
			me.dataSearch();
		} else if (val_grid == 'ijb') {
			me.gridVisible();
//            show_grid.down('[itemId=colms_mhgbinduk]').setVisible(true);
			show_grid.down('[itemId=colms_hgb_number]').setVisible(true);
			show_grid.down('[itemId=colms_ijb_date]').setVisible(true);
			show_grid.down('[itemId=colms_ijb_no]').setVisible(true);
			show_grid.down('[itemId=colms_ijb_name]').setVisible(true);
			show_grid.down('[itemId=colms_notaris]').setVisible(true);
			me.getFormsearch().down('[itemId=view_grid_param]').setValue(val_grid);
			me.getFormsearch().down('[name=is_gabungan]').setValue(false);
			me.dataSearch();
		}

//        var data = me.getGrid().down('[dataIndex=cluster]');
//        data.setVisible(false);
//        console.log(data);
//        alert(me.getGrid().down('[name=radiogroup_view_grid]').getValue().view_grid);

	},
	changeGrid: function () {
		var me = this;
		var val_grid = me.getGrid().down('[name=radiogroup_view_grid]').getValue().view_grid;
		me.filterGrid(val_grid);
	},

	gridVisible: function () {
		var me = this;
		var hide_grid = me.getGrid();
		hide_grid.down('[itemId=colms_mhgbinduk]').setVisible(false);
		hide_grid.down('[itemId=colms_pt_hgb_no]').setVisible(false);
		hide_grid.down('[itemId=colms_pt_luas]').setVisible(false);
		hide_grid.down('[itemId=colms_pt_hgb_date]').setVisible(false);
		hide_grid.down('[itemId=colms_pt_name]').setVisible(false);
		hide_grid.down('[itemId=colms_hgb_number]').setVisible(false);
		hide_grid.down('[itemId=colms_hgb_gsgu_luas]').setVisible(false);
		hide_grid.down('[itemId=colms_hgb_date]').setVisible(false);
		hide_grid.down('[itemId=colms_customer_name]').setVisible(false);
		hide_grid.down('[itemId=colms_no_hpl_induk]').setVisible(false);
		hide_grid.down('[itemId=colms_hpl_no_gs]').setVisible(false);
		hide_grid.down('[itemId=colms_hpl_luas]').setVisible(false);
		hide_grid.down('[itemId=colms_hpl_date]').setVisible(false);
		hide_grid.down('[itemId=colms_hpl_skpt_no]').setVisible(false);
		hide_grid.down('[itemId=colms_ajb_date]').setVisible(false);
		hide_grid.down('[itemId=colms_ajb_no]').setVisible(false);
		hide_grid.down('[itemId=colms_ajb_name]').setVisible(false);
		hide_grid.down('[itemId=colms_ijb_date]').setVisible(false);
		hide_grid.down('[itemId=colms_ijb_no]').setVisible(false);
		hide_grid.down('[itemId=colms_ijb_name]').setVisible(false);
		hide_grid.down('[itemId=colms_notaris]').setVisible(false);


	},
	specialRequest: function (store) {
		store.load({params: {param_spcreq: 'all_unit'}});
	},
	selectUnitGridShow: function () {
		var me = this;

		_myAppGlobal.getController('Sppjb').ctrler = 'Hgbsplit';
		_myAppGlobal.getController('Sppjb').spcreq = 'all_unit';
		_myAppGlobal.getController('Sppjb').instantWindow('browse.Panel', 800, 'Browse Item', 'read', 'myBrowseItemPanel');
	},
	selectHgbindukGridShow: function () {
		var me = this;
		_myAppGlobal.getController('Masterhgbinduk').browseItem('Hgbsplit');
	},

	processRowFromItemSelection: function (rows, modul) {
		var me = this;

		switch (modul) {
			case 'purchaseletter':
				me.fillPurchaseletter(rows);
				break;
			case 'masterhgbinduk':
				me.fillHgbinduk(rows);
				break;
		}
	},

	fillPurchaseletter: function (rows) {
		var me = this;
		//console.log(rows);

		if (rows[0].get('purchaseletter_id')) {
			var plDetailStore = me.getPurchaseletterdetailStore();
			//me.getFormdata().up('window').body.mask('Loading data...');
			plDetailStore.load({
				params: {mode_read: 'detail', purchaseletter_id: rows[0].get('purchaseletter_id')},
				callback: function (rec) {
					console.log('RECORDS PURCHASE LETTER...');
					console.log(rec[0]);
					me.getFormdata().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
					me.getFormdata().down('[name=unit_id]').setValue(rec[0].get('unit_id'));
					me.getFormdata().down('[name=customer_id]').setValue(rec[0].get('customer_id'));

					me.fillUnitDataToForm(rec[0]);
					//me.fillMasterCustomerData(rec[0], 'customer');
				}
			});
		} else {
			me.getFormdata().down('[name=purchaseletter_id]').setValue('');
			me.getFormdata().down('[name=unit_id]').setValue(rows[0].get('unit_id'));
			me.getFormdata().down('[name=customer_id]').setValue('');
			me.fillUnitDataToForm(rows[0]);
		}
	},

	fillHgbinduk: function (rows) {
		var me = this;

		var me = this;
		var masterhgbindukStore = me.getMasterhgbindukStore();
		//me.getFormdata().up('window').body.mask('Loading data...');
		masterhgbindukStore.load({
			params: {mode_read: 'detail', hgbinduk_id: rows[0].get('hgbinduk_id')},
			callback: function (rec) {
				console.log('RECORDS HGB INDUK...');
				console.log(rec[0]);
				me.getFormdata().down('[name=hgbinduk_id]').setValue(rec[0].get('hgbinduk_id'));
				me.fillHgbindukDataToForm(rec[0]);
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
	fillHgbindukDataToForm: function (data) {

		var me = this;
		var filledFields = ['code', 'hgbinduk', 'gs', 'desa', 'date', 'gs_date', 'luas'];

		for (var x in filledFields) {
			if (me.getFormdata().down('[name=hgbinduk_' + filledFields[x] + ']') != null) {
				me.getFormdata().down('[name=hgbinduk_' + filledFields[x] + ']').setValue(data.data[filledFields[x]]);
			}

		}
	},
	/*fillMasterCustomerData: function(records, prefix) {
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
	 },*/

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
		/*var ftStore = null;
		 ftStore = el.down('#fd_city').getStore();
		 ftStore.load({params:{start:0,limit:0,country_id:87}});*/

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
			if (record.data.purchaseletter_id) {
				var purchaseletterdetailStore = me.getPurchaseletterdetailStore();
				purchaseletterdetailStore.removeAll();
				purchaseletterdetailStore.load({params: {purchaseletter_id: record.data.purchaseletter_id, mode_read: 'detail'},
					callback: function (rec) {
						console.log('RECORDS PURCHASE LETTER...');
						//						console.log(rec[0]);
						me.getFormdata().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
						me.getFormdata().down('[name=unit_id]').setValue(rec[0].get('unit_id'));
						me.getFormdata().down('[name=customer_id]').setValue(rec[0].get('customer_id'));

						me.fillUnitDataToForm(rec[0]);
						//me.fillMasterCustomerData(rec[0], 'customer');
					}
				});
			}

			var hgbindukID = record.data.hgbinduk_id;//console.log(hgbindukID);
			if (hgbindukID && hgbindukID != 0) {
				var masterhgbindukStore = me.getMasterhgbindukStore();
				masterhgbindukStore.removeAll();
				masterhgbindukStore.load({params: {mode_read: 'detail', hgbinduk_id: hgbindukID},
					callback: function (hgbindukrec) {
						if (hgbindukrec[0]) {
							console.log('UPDATE HGBINDUK DATA...');
							console.log(hgbindukrec[0]);
							me.fillHgbindukDataToForm(hgbindukrec[0]);
							me.countLoadProcess += 1;
							//me.checkAllDetailLoadingProcess();
						}
					}});
			}

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

	gridAfterRender: function (configs) {
		var me = this;
		this.callParent(arguments);


		var grid = me.getGrid();
		grid.store.on('load', function (store, records, options) {
			me.jqueryBinding();
		});
	},

	jqueryBinding: function () {
		var me = this;
		//inlineEdit
		me.checkboxInlineEdit('is_gabungan');
	},

	checkboxInlineEdit: function (name) {
		var me = this;
		$("input[name='" + name + "']").change(function (event) {
			val = $(this).is(":checked") ? 1 : 0;
			var y = $(this);
			hgbajb_id = $(this).attr('data');
			var p = me.getPanel();
			var grid = me.getGrid();
			p.setLoading("Please wait");

			if (name == 'is_gabungan') {
				Ext.MessageBox.show({
					title: 'Gabungan',
					msg: 'Are you sure you want to proceed?',
					buttons: Ext.MessageBox.OKCANCEL,
					icon: Ext.MessageBox.WARNING,
					fn: function (btn) {
						if (btn == 'ok') {
							Ext.Ajax.request({
								url: 'erems/hgbsplit/read',
								params: {
									read_type_mode: 'update_is_gabungan',
									hgbajb_id: hgbajb_id,
									column: name,
									value: val
								},
								success: function (response) {
									try {
										var resp = response.responseText;

										if (resp) {
											var info = Ext.JSON.decode(resp);

											if (info.success == true) {
												p.setLoading(false);
												var store = grid.getStore();
												store.reload();
											} else {
												p.setLoading(false);
												Ext.Msg.show({
													title: 'Failure',
													msg: 'Fail: Update Gabungan Gagal',
													icon: Ext.Msg.WARNING,
													buttons: Ext.Msg.OK
												});
											}
										}
									} catch (e) {
										p.setLoading(false);
										Ext.Msg.show({
											title: 'Failure',
											msg: 'Fail: Update Gabungan Gagal',
											icon: Ext.Msg.WARNING,
											buttons: Ext.Msg.OK
										});
									}
								},
								failure: function (e) {
									p.setLoading(false);
									Ext.Msg.show({
										title: 'Failure',
										msg: 'Fail: Update Gabungan Gagal',
										icon: Ext.Msg.WARNING,
										buttons: Ext.Msg.OK
									});
								}
							});
						} else {
							if (val > 0) {
								y.prop("checked", false);
							} else {
								y.prop("checked", true);
							}

							p.setLoading(false);
							// return;
						}
					}
				});
			}
			p.setLoading(false);
		});
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
	dataReset: function () {
		var me = this;

		me.getFormsearch().getForm().reset();
		var val_grid = me.getGrid().down('[name=radiogroup_view_grid]').getValue().view_grid;
		me.getFormsearch().down('[itemId=view_grid_param]').setValue(val_grid);
		if (val_grid == 'exs_gabungan') {
			me.getFormsearch().down('[name=is_gabungan]').setValue(true);
		}
		me.dataSearch();
	},

});