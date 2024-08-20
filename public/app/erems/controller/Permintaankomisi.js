Ext.define('Erems.controller.Permintaankomisi', {
//	extend: 'Erems.library.template.controller.Controller',
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Permintaankomisi',
	views: ['permintaankomisi.Panel', 'permintaankomisi.Grid', 'permintaankomisi.GridDetail', 'permintaankomisi.GridUnitJual', 'permintaankomisi.GridUnitBatal', 'permintaankomisi.GridTargetJual', 'permintaankomisi.GridTargetBatal', 'permintaankomisi.FormSearch', 'permintaankomisi.FormData', 'permintaankomisi.FormDataSalesInfo', 'permintaankomisi.GridSalesInfo', 'permintaankomisi.FormDataDetailSalesInfo'],
	stores: ['Unit', 'Masterblock', 'Mastercluster', 'Permintaankomisi', 'Permintaankomisidetail', 'Permintaankomisilistunit', 'Permintaankomisilistunitbatal', 'Permintaankomisitargetbatal', 'Permintaankomisitargetjual', 'Namapenerimakomisi', 'Masterparameterglobal', 'Purchaseletterdetail', 'Purchaseletterpermintaankomisi', 'Masterdistchannel', 'Masterpenerimakomisi', 'Namapenerimakomisi', 'Masterpencairankomisi', 'Masterperhitungankomisi','Masterpencairankomisidetail'],
	models: ['Unit', 'Masterblock', 'Mastercluster', 'Permintaankomisi', 'Permintaankomisidetail', 'Masterkomisiprogresif', 'Masterparameterglobal', 'Purchaseletter', 'Purchaseletterdetail'],
	requires: [
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Unitcombobox',
		'Erems.library.template.component.Pricetypecombobox'
	],
	refs: [
		{
			ref: 'grid',
			selector: 'permintaankomisigrid'
		},
		{
			ref: 'formsearch',
			selector: 'permintaankomisiformsearch'
		},
		{
			ref: 'formdata',
			selector: 'permintaankomisiformdata'
		},
		{
			ref: 'formdatadetail',
			selector: 'permintaankomisiformdatadetail'
		},
		{
			ref: 'griddetail',
			selector: 'permintaankomisigriddetail'
		},
		{
			ref: 'gridunitjual',
			selector: 'permintaankomisigridunitjual'
		},
		{
			ref: 'gridunitbatal',
			selector: 'permintaankomisigridunitbatal'
		},
		{
			ref: 'gridtargetjual',
			selector: 'permintaankomisigridtargetjual'
		},
		{
			ref: 'gridtargetbatal',
			selector: 'permintaankomisigridtargetbatal'
		},
		{
			ref: 'formdatasalesinfo',
			selector: 'salesinfoformdata'
		},
		{
			ref: 'gridsalesinfo',
			selector: 'salesinfogrid'
		},
		{
			ref: 'formdatadetailsalesinfo',
			selector: 'salesinfoformdatadetail'
		}
	],
	controllerName: 'permintaankomisi',
	fieldName: 'unit_number',
	bindPrefixName: 'Permintaankomisi',
	validationItems: [{name: 'purchaseletter_id', msg: 'You must select Kavling / Unit No. first'}],
	formWidth: 700,
	tools: null,
	myConfig: null,
	generate_skema: 0,
	komisi_distributionchannel_id: 0,
	komisi_pencairan_id: 0,
	komisi_perhitungan_id: 0,
	total_komisi_progresif: 0,
	fiturKomisiProgresif: 0,
	dataListPL: [],
	dataListTarget: [],
	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});
	},
	init: function (application) {
		var me = this;
		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
		this.control({
			'permintaankomisipanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'permintaankomisigrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'permintaankomisigrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'permintaankomisigrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'permintaankomisigrid toolbar button[action=view]': {
				click: function () {
					this.formDataShow('view');
				}
			},
			'permintaankomisigrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'permintaankomisigrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'permintaankomisigrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'permintaankomisiformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'permintaankomisiformsearch button[action=search]': {
				click: this.dataSearch
			},
			'permintaankomisiformsearch button[action=reset]': {
				click: this.dataReset
			},
			'permintaankomisiformdata': {
//				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataAfterRender
//				afterrender: function () {
//					this.formDataAfterRender;
//					me.generate_skema = 0;
//					me.komisi_distributionchannel_id = 0;
//					me.komisi_pencairan_id = 0;
//					me.komisi_perhitungan_id = 0;
//				}
			},
			'permintaankomisiformdata button[action=browse_unit]': {
				click: me.selectUnitGridShow
			},

			/* BROWSE CONTROL */
			'permintaankomisibrowsepanel': {
				beforerender: me.browsepanelBeforeRender
			},
			'permintaankomisibrowsepanel button[action=select]': {
				click: me.browsegridSelection
			},
			'permintaankomisibrowsegrid': {
				afterrender: me.browsegridAfterRender
			},
			'permintaankomisibrowseformsearch': {
				afterrender: me.browseformSearchAfterRender
			},
			'permintaankomisibrowseformsearch button[action=search]': {
				click: me.browsedataSearch
			},
			'permintaankomisibrowseformsearch button[action=reset]': {
				click: me.browsedataReset
			},
			/* END BROWSE CONTROL */

			'permintaankomisiformdata button[action=save]': {
				click: me.dataSave
			},
			'permintaankomisiformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'permintaankomisigriddetail': {
//				afterrender: this.gridAfterRender,
				itemdblclick: function () {
					var me = this;
					me.formDataPermintaanKomisiDetailShow('view');
				},
//				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridDetailSelectionChange
			},
//			'permintaankomisigriddetail toolbar button[action=create]': {
//				click: function () {
//					me.formDataPermintaanKomisiDetailShow('create');
//				}
//			},
			'permintaankomisigriddetail toolbar button[action=update]': {
				click: function () {
					this.formDataPermintaanKomisiDetailShow('update');
				}
			},
			'permintaankomisigriddetail toolbar button[action=view]': {
				click: function () {
					this.formDataPermintaanKomisiDetailShow('view');
				}
			},
			'permintaankomisigriddetail actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
//				click: this.gridActionColumnClick,
				click: function (view, cell, row, col, e) {
					var me = this;
					var record = me.getGriddetail().getStore().getAt(row);
					var m = e.getTarget().className.match(/\bact-(\w+)\b/);
					me.getGriddetail().getSelectionModel().select(row);
					if (record.get('flag_delete') == 1){
						me.formDataPermintaanKomisiDetailShow('update');
					}
				},
				detailUpdate: function (view, rowIndex, colIndex, item, e, record, row) {
					me.formDataPermintaanKomisiDetailShow('update');
				},
				detailView: function () {
					var me = this;
					me.formDataPermintaanKomisiDetailShow('view');
				}
			},
			'permintaankomisiformdatadetail': {
//				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataDetailAfterRender
			},
			'permintaankomisiformdatadetail [name=rg_pph]': {
				change: function (el) {
					me.pphOptions(el.getValue().pph_pt_perorangan);
				}
			},
//			'permintaankomisiformdatadetail [name=komisi_permintaan_date]': {
//				change: function (el) {
//					me.loadPL(me.getFormdatadetail().down('[name=komisi_permintaan_date]').getValue());
//				}
//			},
			'permintaankomisiformdatadetail button[action=browse_unit_lama]': {
				click: function () {
					me.loadPLBatal()
				}
			},
			'permintaankomisiformdatadetail button[action=reset]': {
				click: function () {
					me.getFormdatadetail().down("[name=src_unit_lama]").setValue('')
					me.getFormdatadetail().down("[name=src_nama_customer]").setValue('')
					me.loadPLBatal();
				}
			},
			'permintaankomisiformdatadetail [name=is_changekavling]': {
				change: function (el) {
					if (el.getValue()) {
						me.getFormdatadetail().down('[name=fs_changekav_search]').show();
						me.getFormdatadetail().down('[name=grid_unit_batal]').show();
						me.getFormdatadetail().down('[name=grid_target_batal]').show();
						me.loadPLBatal();
					} else {
						me.getFormdatadetail().down('[name=fs_changekav_search]').hide();
						me.getFormdatadetail().down('[name=grid_unit_batal]').hide();
						me.getFormdatadetail().down('[name=grid_target_batal]').hide();
						me.getGridunitbatal().getStore().removeAll();
						me.getGridtargetbatal().getStore().removeAll();
						permintaandate = me.getFormdata().down('[name=purchase_date]').getRawValue();
						permintaandate = permintaandate.split("-");
						permintaandate = new Date(permintaandate[2] + '-' + permintaandate[1] + '-' + permintaandate[0]);
						me.loadTargetHitung(permintaandate, me.getFormdatadetail().down('[name=harga_netto_komisi]').getValuem());
					}
				}
			},
			'permintaankomisiformdatadetail [name=is_progresif]': {
				change: function (el) {
					permintaandate = me.getFormdata().down('[name=purchase_date]').getRawValue();
					permintaandate = permintaandate.split("-");
					permintaandate = new Date(permintaandate[2] + '-' + permintaandate[1] + '-' + permintaandate[0]);
					if (el.getValue()) {
						me.getFormdatadetail().down('[name=persentase_komisi]').setValue(0);
						me.getFormdatadetail().down('[name=persentase_komisi]').setReadOnly(true);
						me.getFormdatadetail().down('[name=fs_progresif]').show();
						me.getFormdatadetail().down('[name=nilai_komisi_aktual]').show();
						me.getFormdatadetail().down('[name=nilai_komisi_aktual]').setReadOnly(true);
						me.getFormdatadetail().down('[name=is_replace_komisi_label]').show();
						me.getFormdatadetail().down('[name=is_replace_komisi]').show();
						me.getFormdatadetail().down('[name=komisi_permintaan_date]').setValue(permintaandate);
						me.getFormdatadetail().down('[name=komisi_permintaan_date]').show();
//						me.getFormdatadetail().down('[name=nilai_komisi]').setValuem(me.total_komisi_progresif);
						me.getFormdatadetail().down('[name=is_grossup_pph_pt]').setValue(0)
						me.getFormdatadetail().down('[name=is_grossup_pph_pt]').hide();
						me.getFormdatadetail().down('[name=is_grossup_pph_pt_label]').hide();
						me.getFormdatadetail().down('[name=is_grossup_pph_perorangan]').setValue(0)
						me.getFormdatadetail().down('[name=is_grossup_pph_perorangan]').hide();
						me.getFormdatadetail().down('[name=is_grossup_pph_perorangan_label]').hide();
						me.loadPL(permintaandate);
					} else {
						me.getFormdatadetail().down('[name=persentase_komisi]').setReadOnly(false);
						me.getFormdatadetail().down('[name=fs_progresif]').hide();
						me.getFormdatadetail().down('[name=nilai_komisi_aktual]').hide();
						me.getFormdatadetail().down('[name=is_replace_komisi_label]').hide();
						me.getFormdatadetail().down('[name=komisi_permintaan_date]').setValue("");
						me.getFormdatadetail().down('[name=komisi_permintaan_date]').hide();
						me.getFormdatadetail().down('[name=is_replace_komisi]').hide();
						me.getFormdatadetail().down('[name=is_grossup_pph_pt]').show();
						me.getFormdatadetail().down('[name=is_grossup_pph_pt_label]').show();
						me.getFormdatadetail().down('[name=is_grossup_pph_perorangan]').show();
						me.getFormdatadetail().down('[name=is_grossup_pph_perorangan_label]').show();
					}
				}
			},
			'permintaankomisiformdatadetail [name=nilai_komisi], [name=nilai_ppn], [name=nilai_pph_pt], [name=nilai_pph_perorangan], [name=pengurang_komisi]': {
				change: function () {
					me.calculateKomisi()
				}
			},
			'permintaankomisiformdatadetail [name=persentase_komisi], [name=persentase_ppn], [name=persentase_pph_pt], [name=persentase_pph_perorangan]': {
				change: function (el) {
					me.calculateNilai(el.field);
				}
			},
			'permintaankomisiformdatadetail [name=is_grossup_pph_pt]': {
				change: function () {
					me.calculateNilaiKomisiPT();
				}
			},
			'permintaankomisiformdatadetail [name=is_grossup_pph_perorangan]': {
				change: function () {
					me.calculateNilaiKomisiPerorangan();
				}
			},
			'permintaankomisiformdatadetail [name=is_replace_komisi]': {
				change: function (el) {
					if (el.getValue()) {
						me.getFormdatadetail().down("[name=nilai_komisi]").setValuem(me.getFormdatadetail().down("[name=nilai_komisi_aktual]").getValuem());
					}
				}
			},
			'permintaankomisigridunitbatal': {
//				afterrender: this.gridAfterRender,
//				itemdblclick: this.gridItemDblClick,
//				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridUnitBatalSelectionChange
			},
			'permintaankomisiformdatadetail button[action=save]': {
				click: me.detailData.save_data
			},

			/* SALES INFORMATION */
			'salesinfoformdata': {
//				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataSalesInfoAfterRender
			},
			'salesinfoformdata [name=komisi_pencairan_id]': {
				change: function (el) {
					me.getGridsalesinfo().getStore().getProxy().setExtraParam('komisi_pencairan_id', el.getValue());
					// me.getGridsalesinfo().getStore().load();

					me.getGridsalesinfo().getStore().load({
						// params: { komisi_pencairan_id : el.getValue() },
						callback: function (rec) {
							me.getFormdata().setLoading("Loading data salesman...");

							var result = Ext.Ajax.request({
								url: 'erems/permintaankomisi/read',
								method: 'POST',
								timeout: 45000000,
								async: false,
								params: {
									purchaseletter_id: me.getFormdata().down('[name=purchaseletter_id]').getValue(),
									mode_read: 'salesmanpurchaselleter',
								}
							}).responseText;

							me.getFormdata().setLoading(false);

							result = Ext.JSON.decode(result);

							if (result.success) {
								me.getGridsalesinfo().getStore().add({
									code                       : result.data.code,
									deleted                    : 0,
									distributionchannel        : me.komisi_distributionchannel_id,
									komisi_pencairan_detail_id : 0,
									komisi_pencairan_id        : 0,
									komisi_penerima_id         : result.data.komisi_penerima_id,
									komisi_persen_nominal      : 'persen',
									komisi_value               : '0',
									npwp                       : result.data.npwp, // npwp sales
									penerima_komisi            : result.data.penerima_komisi,
									populated_data             : 'all',
									project_id                 : result.data.project_id,
									pt_id                      : result.data.pt_id,
									reff_id                    : result.data.reff_id, // sales_id
									salesman_id                : result.data.reff_id, // sales_id
									reff_name                  : result.data.reff_name, // sales_name
								});
							} else {
								Ext.Msg.show({
									title: 'Failure',
									msg: 'Salesman purchaseletter tidak ditemukan.',
									icon: Ext.Msg.ERROR,
									buttons: Ext.Msg.OK
								});
							}

						}
					});
				}
			},
			'salesinfoformdata button[action=save]': {
				click: me.detailData.save_data_sales_info
			},
			'salesinfogrid': {
				afterrender: this.gridAfterRender,
//				itemdblclick: this.gridItemDblClick,
//				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: function () {
					var grid = me.getGridsalesinfo(), row = grid.getSelectionModel().getSelection();
					grid.down('#btnEdit').setDisabled(row.length != 1);
					grid.down('#btnDelete').setDisabled(row.length < 1);
				}
			},
			'salesinfogrid toolbar button[action=create]': {
				click: function () {
					me.formDataSalesInfoDetailShow('create');
				}
			},
			'salesinfogrid toolbar button[action=update]': {
				click: function () {
					me.formDataSalesInfoDetailShow('update');
				}
			},
			'salesinfogrid toolbar button[action=destroy]': {
				click: this.dataSalesInfoDetailDestroy
			},
			'salesinfoformdatadetail': {
//				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataDetailSalesInfoAfterRender
			},
			'salesinfoformdatadetail [name=rg_populated_data]': {
				change: function (el) {
					if (el.getValue().populated_data == "freetext") {
						me.getFormdatadetailsalesinfo().down('[name=npwp]').setVisible(true);
						me.getFormdatadetailsalesinfo().down('[name=reff_name]').setVisible(true);
						me.getFormdatadetailsalesinfo().down("[name=reff_name]").allowBlank = false;
						me.getFormdatadetailsalesinfo().down('[name=reff_id]').setVisible(false);
						me.getFormdatadetailsalesinfo().down("[name=reff_id]").allowBlank = true;
					} else {
						me.getFormdatadetailsalesinfo().down('[name=npwp]').setVisible(false);
						me.getFormdatadetailsalesinfo().down('[name=reff_name]').setVisible(false);
						me.getFormdatadetailsalesinfo().down("[name=reff_name]").allowBlank = true;
						me.getFormdatadetailsalesinfo().down('[name=reff_id]').setVisible(true);
						me.getFormdatadetailsalesinfo().down("[name=reff_id]").allowBlank = false;

						me.getFormdatadetailsalesinfo().down('[name=reff_id]').getStore().proxy.extraParams = {mode: 'cbf', populated_data: el.getValue().populated_data};
						me.getFormdatadetailsalesinfo().down('[name=reff_id]').getStore().load();
					}
				}
			},
			'salesinfoformdatadetail button[action=save]': {
				click: me.detailData.save_data_sales_info_detail
			},
			/* END SALES INFORMATION */
		});
	},
	selectUnitGridShow: function () {
		var me = this;
		me.instantWindow('browse.Panel', 800, 'Browse Item', 'read', 'myBrowseItemPanel');
	},
	formDataAfterRender: function (el) {
		var me = this;
//        if (me.storeProcess.length > 0 && typeof me.storeProcess == 'string') {
//            var sp = 'me.get' + me.storeProcess + 'Store()';
//            me.storeProcess = eval(sp);
//        }
		me.storeProcess = me.createSpProcessObj(me.storeProcess);
		me.fdar().init();

		me.dataListPL = [];
		me.dataListTarget = [];

		me.loadComboBoxStore(el);
		var state = el.up('window').state;

		if (state == 'create') {
			me.fdar().create();
		} else if (state == 'update') {
			me.fdar().update();
			me.getFormdata().down('#fd_browse_unit_btn').setDisabled(true);
		} else if (state == 'read') {
			me.fdar().read();
		}
	},
	panelAfterRender: function (configs) {
		var me = this;
		var f = me.getFormdata();

		me.tools.ajax({
			params: {
			},
			success: function (data) {
				me.fiturKomisiProgresif = data.KOMISIPROGRESIF;
			}
		}).read('featureProgresif');
	},
	fdar: function () {
		var me = this;
		var x = {
			init: function () {
				/// init here
			},
			create: function () {
				me.getGriddetail().getStore().removeAll();
			},
			update: function () {
				var grid = me.getGrid();
				var store = grid.getStore();
				var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
				me.getFormdata().loadRecord(record);
				me.getGriddetail().getStore().getProxy().setExtraParam('komisi_permintaan_id', record.get('komisi_permintaan_id'));
				me.getGriddetail().getStore().load();

				me.processRowFromItemSelection(record.get('purchaseletter_id'), 'loadPageUpdate');
				/// update here
			},
			read: function () {
				var grid = me.getGrid();
				var store = grid.getStore();
				var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
				me.getFormdata().loadRecord(record);
				me.getGriddetail().getStore().getProxy().setExtraParam('komisi_permintaan_id', record.get('komisi_permintaan_id'));
				me.getGriddetail().getStore().load();

				me.processRowFromItemSelection(record.get('purchaseletter_id'), 'loadPageUpdate');
				me.getFormdata().down('#btnSave').setVisible(false);
				me.getFormdata().down('#fd_browse_unit_btn').setDisabled(true);
				me.getGriddetail().down('#actioncolumn').items[0].disabled = true;
			}
		};
		return x;
	},
	formDataSalesInfoAfterRender: function (el) {
		var me = this;
		me.storeProcess = me.createSpProcessObj(me.storeProcess);
		me.fdar().init();
		me.loadComboBoxStore(el);

		var state = el.up('window').state;
		if (state == 'create') {
			me.getGridsalesinfo().getStore().removeAll();
			me.getFormdatasalesinfo().down('[name=purchaseletter_no]').setValue(me.getFormdata().down('[name=purchaseletter_no]').getValue());
			me.getFormdatasalesinfo().down('[name=purchaseletter_date]').setValue(me.getFormdata().down('[name=purchase_date]').getValue());
			me.getFormdatasalesinfo().down('[name=customer_name]').setValue(me.getFormdata().down('[name=customer_name]').getValue());
			me.getFormdatasalesinfo().down('[name=pricetype]').setValue(me.getFormdata().down('[name=purchaseletter_pricetype]').getValue());
		} else if (state == 'update') {

		}
	},
	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

		grid.down('#btnView').setDisabled(row.length != 1);
//		grid.down('#btnEdit').setDisabled(true);
		grid.down('#btnEdit').setDisabled(row.length != 1);
		grid.down('#btnDelete').setDisabled(true);

		if (row[0]) {
			var flag_delete = 1;
//			row.forEach(function (index, value) {
			Ext.each(row, function (rec) {
				if (rec.data.flag_delete == 0) {
					flag_delete = 0;
					return;
				}
			});

			if (flag_delete == 0) {
//				grid.down('#btnEdit').setDisabled(true);
				grid.down('#btnDelete').setDisabled(true);
			} else {
//				grid.down('#btnEdit').setDisabled(row.length != 1);
				grid.down('#btnDelete').setDisabled(row.length < 1);
			}
		} else {

		}
	},
	gridActionColumnClick: function (view, cell, row, col, e) {
		var me = this;
		var record = me.getGrid().getStore().getAt(row);
		if (record.get('flag_delete') == 1) {
			var m = e.getTarget().className.match(/\bact-(\w+)\b/);
			me.getGrid().getSelectionModel().select(row);
			if (m) {
				switch (m[1]) {
					case 'PermintaankomisiUpdate':
						me.formDataShow(null, null, 'PermintaankomisiUpdate');
						break;
					case 'PermintaankomisiRead':
						me.formDataShow('view');
						break;
					case 'PermintaankomisiDelete':
						me.dataDestroy();
						break;
				}
			}
		}
	},
	dataSalesInfoDetailDestroy: function () {
		var me = this;
		var rows = me.getGridsalesinfo().getSelectionModel().getSelection();
		if (rows.length < 1) {
			Ext.Msg.alert('Info', 'No record selected !');
			return;
		} else {
			var confirmmsg, successmsg, failmsg;
			var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
			var store = me.getGridsalesinfo().getStore();
			if (rows.length == 1) {
				var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('reff_name') + ']';
				confirmmsg = 'Delete ' + selectedRecord + ' ?';
				failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
			} else {
				confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
				failmsg = 'Error: Unable to delete data.';
			}
			Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
				if (btn == 'yes') {
					for (var i = 0; i < rows.length; i++) {
						store.remove(rows[i]);
					}
				}
			});
		}
	},
	formDataDetailAfterRender: function (el) {
		var me = this;
		me.storeProcess = me.createSpProcessObj(me.storeProcess);
		me.fdar().init();

		Ext.getCmp('unitJualPaging').down('#refresh').hide();
		Ext.getCmp('unitBatalPaging').down('#refresh').hide();
		Ext.getCmp('targetJualPaging').down('#refresh').hide();
		Ext.getCmp('targetBatalPaging').down('#refresh').hide();

		me.getFormdatadetail().down('[name=is_grossup_pph_pt]').show();
		me.getFormdatadetail().down('[name=is_grossup_pph_pt_label]').show();
		me.getFormdatadetail().down('[name=is_grossup_pph_perorangan]').show();
		me.getFormdatadetail().down('[name=is_grossup_pph_perorangan_label]').show();

		if (me.fiturKomisiProgresif == 1) {
			me.getFormdatadetail().down('[name=is_progresif]').show();
			me.getFormdatadetail().down('[name=is_progresif_label]').show();
		}

//		me.loadComboBoxStore(el);
//		me.getFormdatadetail().down('[name=komisi_penerima_id]').getStore().proxy.extraParams = {start: 0, limit: 0};
//		me.getFormdatadetail().down('[name=komisi_penerima_id]').getStore().load();

		var state = el.up('window').state;

		if (state == 'create') {

		} else if (state == 'update' || state == 'view') {
			var griddetail = me.getGriddetail();
			var store = griddetail.getStore();

			var record = store.getAt(store.indexOf(griddetail.getSelectionModel().getSelection()[0]));

			me.getFormdatadetail().loadRecord(record);
			me.getFormdatadetail().down("[name=harga_netto]").setValuem(record.get('harga_netto'));
			me.getFormdatadetail().down("[name=harga_netto_komisi]").setValuem(record.get('harga_netto_komisi'));
			me.getFormdatadetail().down("[name=nilai_komisi]").setValuem(record.get('nilai_komisi'));
			me.getFormdatadetail().down("[name=nilai_ppn]").setValuem(record.get('nilai_ppn'));
			me.getFormdatadetail().down("[name=nilai_pph_pt]").setValuem(record.get('nilai_pph_pt'));
			me.getFormdatadetail().down("[name=nilai_pph_perorangan]").setValuem(record.get('nilai_pph_perorangan'));
			me.getFormdatadetail().down("[name=total_komisi]").setValuem(record.get('total_komisi'));
			me.pphOptions(record.get('pph_pt_perorangan'));
			// added by rico 25112021
			me.getFormdatadetail().down("[name=pengurang_komisi]").setValuem(record.get('pengurang_komisi'));

			if (record.get('is_progresif') == 1) {
				me.getFormdatadetail().down('[name=is_grossup_pph_pt]').setValue(0)
				me.getFormdatadetail().down('[name=is_grossup_pph_pt]').hide();
				me.getFormdatadetail().down('[name=is_grossup_pph_pt_label]').hide();
				me.getFormdatadetail().down('[name=is_grossup_pph_perorangan]').setValue(0)
				me.getFormdatadetail().down('[name=is_grossup_pph_perorangan]').hide();
				me.getFormdatadetail().down('[name=is_grossup_pph_perorangan_label]').hide();
			}

			//function load PL& target
			permintaandate = me.getFormdata().down('[name=purchase_date]').getRawValue();
			permintaandate = permintaandate.split("-");
			permintaandate = new Date(permintaandate[2] + '-' + permintaandate[1] + '-' + permintaandate[0]);
			me.loadPL(permintaandate);
//			if (record.get('is_changekavling') == 1) {
//				me.getGridunitbatal().getSelectionModel().select(record.get('purchaseletter_id_old'));
//			}

//			if (record.data.populated_data == "freetext") {
//				me.getFormdatadetail().down('[name=reff_id]').setValue("");
//				me.getFormdatadetail().down("[name=reff_name]").allowBlank = false;
//				me.getFormdatadetail().down("[name=reff_id]").allowBlank = true;
//			} else {
//				me.getFormdatadetail().down('[name=reff_name]').setValue("")
//				me.getFormdatadetail().down("[name=reff_name]").allowBlank = true;
//				me.getFormdatadetail().down("[name=reff_id]").allowBlank = false;
//			}

			if (state == 'view') {
				me.getFormdatadetail().down('[name=is_progresif]').setReadOnly(true);
				me.getFormdatadetail().down('[name=is_changekavling]').setReadOnly(true);
				me.getFormdatadetail().down('[name=is_replace_komisi]').setReadOnly(true);
				me.getFormdatadetail().down('[name=nilai_komisi]').setReadOnly(true);
				me.getFormdatadetail().down('[name=persentase_komisi]').setReadOnly(true);
				me.getFormdatadetail().down('[name=persentase_ppn]').setReadOnly(true);
				me.getFormdatadetail().down('[name=nilai_ppn]').setReadOnly(true);
				me.getFormdatadetail().down('[name=rg_pph]').setReadOnly(true);
				me.getFormdatadetail().down('[name=persentase_pph_pt]').setReadOnly(true);
				me.getFormdatadetail().down('[name=is_grossup_pph_pt]').setReadOnly(true);
				me.getFormdatadetail().down('[name=nilai_pph_pt]').setReadOnly(true);
				me.getFormdatadetail().down('[name=persentase_pph_perorangan]').setReadOnly(true);
				me.getFormdatadetail().down('[name=is_grossup_pph_perorangan]').setReadOnly(true);
				me.getFormdatadetail().down('[name=nilai_pph_perorangan]').setReadOnly(true);
				me.getFormdatadetail().down('[name=pengurang_komisi]').setReadOnly(true);
				me.getFormdatadetail().down('[name=total_komisi]').setReadOnly(true);
				me.getGridunitjual().headerCt.items.getAt(0).hide();
				me.getGridunitbatal().headerCt.items.getAt(0).hide();
				me.getGridtargetjual().headerCt.items.getAt(0).hide();
				me.getFormdatadetail().down('#btnSave').hide();

			}
		}
	},
	pphOptions: function (pph) {
		var me = this;
		if (pph == "perorangan") {
			me.getFormdatadetail().down("[name=persentase_pph_pt]").setReadOnly(true);
			me.getFormdatadetail().down("[name=nilai_pph_pt]").setReadOnly(true);
			me.getFormdatadetail().down("[name=persentase_pph_pt]").setValue(0);
			me.getFormdatadetail().down("[name=nilai_pph_pt]").setValue(0);
			me.getFormdatadetail().down("[name=persentase_pph_perorangan]").setReadOnly(false);
			me.getFormdatadetail().down("[name=nilai_pph_perorangan]").setReadOnly(false);
			me.getFormdatadetail().down("[name=is_grossup_pph_perorangan]").setReadOnly(false);
			me.getFormdatadetail().down("[name=is_grossup_pph_pt]").setReadOnly(true);
			me.getFormdatadetail().down("[name=is_grossup_pph_pt]").setValue(0);
		} else {
			me.getFormdatadetail().down("[name=persentase_pph_pt]").setReadOnly(false);
			me.getFormdatadetail().down("[name=nilai_pph_pt]").setReadOnly(false);
			me.getFormdatadetail().down("[name=persentase_pph_perorangan]").setReadOnly(true);
			me.getFormdatadetail().down("[name=nilai_pph_perorangan]").setReadOnly(true);
			me.getFormdatadetail().down("[name=persentase_pph_perorangan]").setValue(0);
			me.getFormdatadetail().down("[name=nilai_pph_perorangan]").setValue(0);
			me.getFormdatadetail().down("[name=is_grossup_pph_pt]").setReadOnly(false);
			me.getFormdatadetail().down("[name=is_grossup_pph_perorangan]").setReadOnly(true);
			me.getFormdatadetail().down("[name=is_grossup_pph_perorangan]").setValue(0);
		}
	},
	loadPL: function (datePermintaan) {
		var me = this;
		if (me.fiturKomisiProgresif == 1 && me.getFormdatadetail().down("[name=is_progresif]").getValue()) {
			var griddetail = me.getGriddetail();
			var store = griddetail.getStore();
			var record = store.getAt(store.indexOf(griddetail.getSelectionModel().getSelection()[0]));

//			var harga_netto = record.get('harga_netto');
			var harga_netto = record.get('harga_netto_komisi');

			me.getGridunitjual().getStore().load({
				params: {salesman_id: record.get('salesman_id'), komisi_permintaan_id: record.get('komisi_permintaan_id'), komisi_permintaan_date: datePermintaan},
				callback: function (rec) {
					me.loadTargetHitung(datePermintaan, harga_netto)
				}
			});
		}
	},
	loadTargetHitung: function (datePermintaan, harga_netto, harga_netto_lama = 0, komisi_cair = 0) {
		var me = this;
		var storeUnitJual = me.getGridunitjual().getStore();
		var total_netto = 0;
		var state = me.getFormdata().up('window').state;
		storeUnitJual.each(function (record, idx) {
			total_netto += record.data.harga_netto_komisi;
		});
//		total_netto = 1500000000;
//		harga_netto = 7500000000;

		me.getFormdatadetail().down("[name=total_permintaan_komisi]").setValuem(total_netto);
//		me.getGridtargetjual().getStore().getProxy().setExtraParam('code', '');
		me.getGridtargetjual().getStore().load({
			params: {mode_read: 'targetJual', total_jual: total_netto, bulan: parseInt(Ext.Date.format(datePermintaan, 'm')), tahun: Ext.Date.format(datePermintaan, 'Y')},
			callback: function (rec) {
				var deleted = false;
				var total_komisi_progresif = 0 - komisi_cair;
				var bulan_target = 'bulan_ini';//parseInt(Ext.Date.format(datePermintaan, 'm'));
//				harga_netto = 700000000;
				var selisih_netto = 0;
//				if (me.getFormdatadetail().down('[name=is_changekavling]').getValue() == 1) {
//					selisih_netto = harga_netto - harga_netto_lama;
//					harga_netto = selisih_netto > 0 ? harga_netto_lama : harga_netto;
//					selisih_netto = selisih_netto > 0 ? selisih_netto : 0;
//				}

				for (var i = 0; i < this.getCount(); i++) {
					if (deleted == true) {
						rec[i].set("deleted", 1);
					}

					var target = rec[i].data['target_' + bulan_target];
					if (deleted == false && (target < 1 || isNaN(target))) {
						deleted = true;
					} else {//
						var perhitungan_komisi = 0;
						if (me.getFormdatadetail().down('[name=is_changekavling]').getValue() == 1) {
							var gridTargetBatal = me.getGridtargetbatal();
							var iBatal = gridTargetBatal.getStore().findExact('code', rec[i].data['code']);
							var recBatal = gridTargetBatal.getStore().getAt(iBatal);
							if (recBatal) {
								perhitungan_komisi = recBatal.get('sisa_target_bulan_ini');
							}
						} else {
							if (i == 0) { // kalau target pertama kurangin dari total yg udah di permintaan
								perhitungan_komisi = target - total_netto;
								total_netto = (total_netto - target) > 0 ? (total_netto - target) : 0;
							} else {
								var max_klaim = target - rec[(i - 1)].data['target_' + bulan_target];
								perhitungan_komisi = max_klaim - total_netto;
//										var max_klaim = target - rec[(i - 1)].data['target_' + bulan_target] - total_netto;
								total_netto = (total_netto - max_klaim) > 0 ? (total_netto - max_klaim) : 0;
							}
						}

						if (perhitungan_komisi > 0) {
							rec[i].set("sisa", perhitungan_komisi);
						} else {
							rec[i].set("sisa", 0);
						}
//									}
					}

					//untuk perhitungan komisi yang akan di proses
					var sisa = rec[i].get("sisa");
//					if(me.getFormdatadetail().down('[name=is_changekavling]').getValue())
//					if (me.getFormdatadetail().down('[name=is_changekavling]').getValue() == 1 && selisih_netto > 0) {
//						if (target <= 0 || isNaN(target)) {
//							rec[i].set("sisa", selisih_netto);
//							rec[i].set("komisi_progresif", (selisih_netto * rec[i].get("persentase") / 100));
//							selisih_netto = 0;
//							return;
//						} else {
//							rec[i].set("sisa", 0);
//						}
//					} else {
					if (target > 0) {
						if ((harga_netto - sisa) < 0) {
							rec[i].set("sisa", harga_netto);
							rec[i].set("komisi_progresif", (harga_netto * rec[i].get("persentase") / 100));
							harga_netto = 0;
						} else {
							harga_netto = harga_netto - sisa;
							rec[i].set("sisa", sisa);
							rec[i].set("komisi_progresif", (sisa * rec[i].get("persentase") / 100));
						}
					} else {
						rec[i].set("sisa", (harga_netto + selisih_netto));
						rec[i].set("komisi_progresif", ((harga_netto + selisih_netto) * rec[i].get("persentase") / 100));
						harga_netto = 0;
						selisih_netto = 0;
					}
//					}

					total_komisi_progresif += rec[i].get("komisi_progresif");
					me.total_komisi_progresif = total_komisi_progresif;
					me.getFormdatadetail().down('[name=nilai_komisi_aktual]').setValuem(me.total_komisi_progresif);
					if (state == "create") {
						me.getFormdatadetail().down('[name=nilai_komisi]').setValuem(me.total_komisi_progresif);
					}
				}

				me.getGridtargetjual().getStore().filterBy(function (record) {
					return record.data.deleted == 0;
				});
			}
		});
	},
	loadPLBatal: function () {
		var me = this;
		var griddetail = me.getGriddetail();
		var store = griddetail.getStore();
		var record = store.getAt(store.indexOf(griddetail.getSelectionModel().getSelection()[0]));

		me.getGridunitbatal().getStore().load({
			params: {salesman_id: record.get('salesman_id'), unit_number: me.getFormdatadetail().down("[name=src_unit_lama]").getValue(), customer_name: me.getFormdatadetail().down("[name=src_nama_customer]").getValue()},
			callback: function (rec) {
				var purchaseletter_id_old = me.getFormdatadetail().down("[name=purchaseletter_id_old]").getValue();
				if (purchaseletter_id_old > 0) {
					var rec = me.getGridunitbatal().getStore().findRecord('purchaseletter_id', purchaseletter_id_old)
					me.getGridunitbatal().getSelectionModel().select(me.getGridunitbatal().getStore().indexOf(rec));
					me.getFormdatadetail().down("[name=purchaseletter_id_old]").setValue(0);
				}
			}
		});
	}
	,
	gridUnitBatalSelectionChange: function () {
		var me = this;
		var gridUnitBatal = me.getGridunitbatal();
		me.getGridtargetbatal().getStore().removeAll();
		permintaandate = me.getFormdata().down('[name=purchase_date]').getRawValue();
		permintaandate = permintaandate.split("-");
		permintaandate = new Date(permintaandate[2] + '-' + permintaandate[1] + '-' + permintaandate[0]);
		if (gridUnitBatal.getSelectionModel().getSelection().length > 0) {
			var store = gridUnitBatal.getStore();
			var record = store.getAt(store.indexOf(gridUnitBatal.getSelectionModel().getSelection()[0]));
			me.getGridtargetbatal().getStore().load({
				params: {purchaseletter_id: record.get('purchaseletter_id'), salesman_id: record.get('salesman_id')},
				callback: function (rec) {
					me.loadTargetHitung(permintaandate, me.getFormdatadetail().down('[name=harga_netto_komisi]').getValuem(), record.get('harga_netto_komisi'), record.get('komisi_cair'));
				}
			});
		} else {
			me.loadTargetHitung(permintaandate, me.getFormdatadetail().down('[name=harga_netto_komisi]').getValuem());
		}
	}
	,
	formDataPermintaanKomisiDetailShow: function (state) {
		var me = this;
		//var state = 'create';//action == me.bindPrefixName + 'Create' ? 'create' : 'update';
		switch (state) {
			case 'create':
				formtitle = 'Create Detail Komisi Permintaan';
				formicon = 'icon-form-add';
				break;
			case 'update':
				formtitle = 'Edit Detail Komisi Permintaan';
				formicon = 'icon-form-edit';
				break;
			case 'view':
				formtitle = 'View';
				formicon = 'icon-search';
				break;
		}
		var winId = 'win-komisipermintaandetailformdata';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: false,
				width: 700,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: false,
				state: state,
				//items: Ext.create('Erems.view.' + me.controllerName + '.HgbajbFormData'),
				listeners: {
					boxready: function () {
						win.body.mask('Loading...');
						var tm = setTimeout(function () {
							win.add(Ext.create('Erems.view.' + me.controllerName + '.FormDataDetail'));
							win.center();
							win.body.unmask();
							clearTimeout(tm);
						}, 1000);
					},
				}
			});
		}
		win.show();
	}
	,
	formDataSalesInfoShow: function (state) {
		var me = this;
		//var state = 'create';//action == me.bindPrefixName + 'Create' ? 'create' : 'update';
		switch (state) {
			case 'create':
				formtitle = 'Sales Information';
				formicon = 'icon-form-add';
				break;
		}
		var winId = 'win-salesinformationformdata';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: false,
				width: 700,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: false,
				state: state,
				//items: Ext.create('Erems.view.' + me.controllerName + '.HgbajbFormData'),
				listeners: {
					boxready: function () {
						win.body.mask('Loading...');
						var tm = setTimeout(function () {
							win.add(Ext.create('Erems.view.' + me.controllerName + '.FormDataSalesInfo'));
							win.center();
							win.body.unmask();
							clearTimeout(tm);
						}, 1000);
					},
				}
			});
		}
		win.show();
	}
	,
	formDataSalesInfoDetailShow: function (state) {
		var me = this;
		//var state = 'create';//action == me.bindPrefixName + 'Create' ? 'create' : 'update';
		switch (state) {
			case 'create':
				formtitle = 'Create Detail Sales Information';
				formicon = 'icon-form-add';
				break;
			case 'update':
				formtitle = 'Edit Detail Sales Information';
				formicon = 'icon-form-edit';
				break;
//			case 'view':
//				formtitle = 'View Progress Air dan Listrik';
//				formicon = 'icon-form-edit';
//				break;
		}
		var winId = 'win-komisipencairandetailformdata';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: false,
				width: 600,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: false,
				state: state,
				//items: Ext.create('Erems.view.' + me.controllerName + '.HgbajbFormData'),
				listeners: {
					boxready: function () {
						win.body.mask('Loading...');
						var tm = setTimeout(function () {
							win.add(Ext.create('Erems.view.' + me.controllerName + '.FormDataDetailSalesInfo'));
							win.center();
							win.body.unmask();
							clearTimeout(tm);
						}, 1000);
					},
				}
			});
		}
		win.show();
	}
	,
	formDataDetailSalesInfoAfterRender: function (el) {
		var me = this;
		me.storeProcess = me.createSpProcessObj(me.storeProcess);
		me.fdar().init();

//		me.loadComboBoxStore(el);
		me.getFormdatadetailsalesinfo().down('[name=komisi_penerima_id]').getStore().proxy.extraParams = {start: 0, limit: 0};
		me.getFormdatadetailsalesinfo().down('[name=komisi_penerima_id]').getStore().load();

		var state = el.up('window').state;

		if (state == 'create') {
			me.getFormdatadetailsalesinfo().down("[name=reff_name]").allowBlank = false;
			me.getFormdatadetailsalesinfo().down("[name=reff_id]").allowBlank = true;
		} else if (state == 'update') {
			var gridSalesInfo = me.getGridsalesinfo();
			var store = gridSalesInfo.getStore();

			var record = store.getAt(store.indexOf(gridSalesInfo.getSelectionModel().getSelection()[0]));
			npwp = record.data.npwp;
			npwp = npwp.split('.').join('');
			npwp = npwp.split('-').join('');
			record.data.npwp = npwp;
			me.getFormdatadetailsalesinfo().loadRecord(record);
			if (record.data.populated_data == "freetext") {
				me.getFormdatadetailsalesinfo().down('[name=reff_id]').setValue("");
				me.getFormdatadetailsalesinfo().down("[name=reff_name]").allowBlank = false;
				me.getFormdatadetailsalesinfo().down("[name=reff_id]").allowBlank = true;
			} else {
				me.getFormdatadetailsalesinfo().down('[name=reff_name]').setValue("")
				me.getFormdatadetailsalesinfo().down("[name=reff_name]").allowBlank = true;
				me.getFormdatadetailsalesinfo().down("[name=reff_id]").allowBlank = false;
			}
		}
	}
	,
	detailData: {
		save_data: function () {
			var me = this;
			var state = me.getFormdatadetail().up('window').state.toLowerCase();
			var form = this.getFormdatadetail().getForm();
			var fields = me.getFormdatadetail().getValues();
//			var myStore = me.getGriddetail().getStore();

			if (form.isValid()) {
				if (state == "update") {
					storeGrid = me.getGriddetail().getStore().getAt(me.getGriddetail().getSelectedRow());
					me.dataListPL[me.getGriddetail().getSelectedRow()] = [];
					me.dataListTarget[me.getGriddetail().getSelectedRow()] = [];
					if (fields.is_progresif == 1) {
						var store = me.getGridunitjual().getStore();
						store.each(function (record, idx) {
							record.data.index_record = me.getGriddetail().getSelectedRow();
							record.data.komisi_permintaan_detail_id = storeGrid.get('komisi_permintaan_detail_id');
							record.data.komisi_permintaan_id = storeGrid.get('komisi_permintaan_id');
							me.dataListPL[me.getGriddetail().getSelectedRow()].push(record.data);
						});
						var store = me.getGridtargetjual().getStore();
						store.each(function (record, idx) {
							record.data.index_record = me.getGriddetail().getSelectedRow();
							record.data.komisi_permintaan_detail_id = storeGrid.get('komisi_permintaan_detail_id');
							record.data.komisi_permintaan_id = storeGrid.get('komisi_permintaan_id');
							me.dataListTarget[me.getGriddetail().getSelectedRow()].push(record.data);
						});
					}
//					console.log(JSON.stringify(listTarget));
//					console.log(me.dataListTarget);

//					}
					var store = me.getGridunitbatal().getStore();
					if (me.getFormdatadetail().down('[name=is_changekavling]').getValue() == 1) {
						var record = store.getAt(store.indexOf(me.getGridunitbatal().getSelectionModel().getSelection()[0]));
						storeGrid.set('purchaseletter_id_old', record.get('purchaseletter_id'));
					}
					storeGrid.set('persentase_komisi', fields.persentase_komisi);
					storeGrid.set('nilai_komisi', fields.nilai_komisi);
					storeGrid.set('persentase_ppn', fields.persentase_ppn);
					storeGrid.set('nilai_ppn', fields.nilai_ppn);
					storeGrid.set('pph_pt_perorangan', fields.pph_pt_perorangan);
					storeGrid.set('persentase_pph_pt', fields.persentase_pph_pt);
					storeGrid.set('nilai_pph_pt', fields.nilai_pph_pt);
					storeGrid.set('is_grossup_pph_pt', fields.is_grossup_pph_pt);
					storeGrid.set('persentase_pph_perorangan', fields.persentase_pph_perorangan);
					storeGrid.set('nilai_pph_perorangan', fields.nilai_pph_perorangan);
					storeGrid.set('is_grossup_pph_perorangan', fields.is_grossup_pph_perorangan);
					storeGrid.set('total_komisi', fields.total_komisi);
					storeGrid.set('harga_netto', fields.harga_netto);
					storeGrid.set('harga_netto_komisi', fields.harga_netto_komisi);
					storeGrid.set('is_progresif', fields.is_progresif);
					storeGrid.set('nilai_komisi_progresif_per_tglbuat', fields.total_permintaan_komisi);
					storeGrid.set('komisi_permintaan_date', fields.komisi_permintaan_date);
					storeGrid.set('is_changekavling', fields.is_changekavling);
					// added by rico 25112021
					storeGrid.set('pengurang_komisi', fields.pengurang_komisi);
				}
//				else {
//					myStore.add({
//						komisi_permintaan_detail_id: fields.komisi_permintaan_detail_id,
//						komisi_penerima_id: komisi_penerima_id,
//						penerima_komisi: penerima_komisi,
//						komisi_persen_nominal: komisi_persen_nominal,
//						komisi_value: komisi_value,
//						populated_data: populated_data,
//						reff_id: reff_id,
//						reff_name: reff_name,
//						npwp: npwp,
//						deleted: 0});
//				}
				me.getFormdatadetail().up('window').close();
			}
		},
		save_data_sales_info: function () {
			var me = this;
			var form = this.getFormdatasalesinfo().getForm();
			var fields = me.getFormdatasalesinfo().getValues();
			var storeGridDetail = me.getGriddetail().getStore();

			me.generate_skema = 1;
			me.komisi_distributionchannel_id = fields.komisi_distributionchannel_id;
			me.komisi_pencairan_id = fields.komisi_pencairan_id;
			me.komisi_perhitungan_id = fields.komisi_perhitungan_id;

			if (form.isValid()) {
				var hargaNetto = me.getFormdata().down('[name=purchaseletter_harga_netto]').getValuem();
				var pengaliKomisi = me.getFormdata().down('[name=purchaseletter_harga_netto_komisi]').getValuem();
				var storeSalesInfo = me.getGridsalesinfo().getStore();

				var cek_nilai_komisi = true;
//				storeSalesInfo.each(function (record, idx) {
//					if (record.data.komisi_value == 0 || record.data.komisi_value == '') {
//						Ext.Msg.show({
//							title: 'Failure',
//							msg: 'Nilai komisi tidak boleh 0 atau kosong.',
//							icon: Ext.Msg.ERROR,
//							buttons: Ext.Msg.OK
//						});
//						cek_nilai_komisi = false;
//						return
//					}
//				});

				if (cek_nilai_komisi) {
					for (var i = 0; i < storeSalesInfo.getCount(); i++) {
						storeSalesInfo.each(function (record, idx) {
							if (i == idx) {
								var persentase_komisi = record.data.komisi_persen_nominal == "persen" ? record.data.komisi_value : 0;
								var nilai_komisi = record.data.komisi_persen_nominal == "persen" ? (persentase_komisi * pengaliKomisi / 100) : record.data.komisi_value;

								storeGridDetail.add({
									komisi_penerima_id: record.data.komisi_penerima_id,
									komisi_persen_nominal: record.data.komisi_persen_nominal,
									komisi_value: record.data.komisi_value,
									keterangan: record.data.keterangan,
									populated_data: record.data.populated_data,
									reff_id: record.data.reff_id,
									salesman_id: record.data.salesman_id,
									reff_name: record.data.reff_name,
									npwp: record.data.npwp,
									purchaseletter_id: me.getFormdata().down('[name=purchaseletter_id]').getValue(),
									harga_netto: hargaNetto,
									harga_netto_komisi: pengaliKomisi,
									penerima_komisi: record.data.penerima_komisi,
									persentase_komisi: persentase_komisi,
									nilai_komisi: nilai_komisi,
									total_komisi: nilai_komisi,
									pph_pt_perorangan: 'pt',
									purchaseletter_komisi_id: 0,
									persentase_ppn: 0,
									nilai_ppn: 0,
									pph_pt_perorangan: 0,
									persentase_pph_pt: 0,
									nilai_pph_pt: 0,
									is_grossup_pph_pt: 0,
									persentase_pph_perorangan: 0,
									nilai_pph_perorangan: 0,
									is_grossup_pph_perorangan: 0,
									pengurang_komisi: 0,
									flag_delete: 1,
								});
							}
						});
					}

					me.getFormdatasalesinfo().up('window').close();
				}
			}
		}
		,
		save_data_sales_info_detail: function () {
			var me = this;
			var state = me.getFormdatadetailsalesinfo().up('window').state.toLowerCase();
			var form = this.getFormdatadetailsalesinfo().getForm();
			var fields = me.getFormdatadetailsalesinfo().getValues();
			var myStore = me.getGridsalesinfo().getStore();

			if (form.isValid()) {
				var reff_name = "";
				var reff_id = "";
				var npwp = "";
				if (fields.populated_data == "freetext") {
					reff_name = fields.reff_name;
					npwp = fields.npwp;
				} else {
					reff_id = fields.reff_id;
					reff_name = me.getFormdatadetailsalesinfo().down('[name=reff_id]').getRawValue();
				}

				var komisi_penerima_id = fields.komisi_penerima_id;
				var penerima_komisi = me.getFormdatadetailsalesinfo().down('[name=komisi_penerima_id]').getRawValue();
				var komisi_persen_nominal = fields.komisi_persen_nominal;
				var komisi_value = accounting.unformat(fields.komisi_value);
				var populated_data = fields.populated_data;

				if (state == "update") {
					storeGrid = me.getGridsalesinfo().getStore().getAt(me.getGridsalesinfo().getSelectedRow());
					storeGrid.set('komisi_penerima_id', komisi_penerima_id);
					storeGrid.set('penerima_komisi', penerima_komisi);
					storeGrid.set('komisi_persen_nominal', komisi_persen_nominal);
					storeGrid.set('komisi_value', komisi_value);
					storeGrid.set('keterangan', fields.keterangan);
					storeGrid.set('populated_data', populated_data);
					storeGrid.set('reff_id', reff_id);
					storeGrid.set('reff_name', reff_name);
					storeGrid.set('npwp', npwp);
				} else {
					myStore.add({
						komisi_pencairan_detail_id: fields.komisi_pencairan_detail_id,
						komisi_penerima_id: komisi_penerima_id,
						penerima_komisi: penerima_komisi,
						komisi_persen_nominal: komisi_persen_nominal,
						komisi_value: komisi_value,
						keterangan: fields.keterangan,
						populated_data: populated_data,
						reff_id: reff_id,
						reff_name: reff_name,
						npwp: npwp,
						deleted: 0});
				}
				me.getFormdatadetailsalesinfo().up('window').close();
			}
		}
	},
	dataSave: function () {
		var me = this;

		var form = me.getFormdata().getForm();
		if (form.isValid()) {
			Ext.Msg.confirm('Save Data', 'Save Permintaan Komisi?', function (btn) {
				if (btn == 'yes') {
					resetTimer();
					me.getFormdata().up('window').body.mask('Saving, please wait ...');
					var store = me.getGriddetail().getStore();
					me.dataSaveConfirm(store);
				}
			});
		}
	},
	dataSaveConfirm: function (store) {
		var me = this;

		store.clearFilter(true);
		var data = [];
		var cek_nilai_komisi = true;
		for (var i = 0; i < store.getCount(); i++) {
			store.each(function (record, idx) {
				if (i == idx) {
					data[i] = record.data;
					if (record.data.total_komisi <= 0 || record.data.total_komisi == "") {
						var messageBox = Ext.Msg.show({
							title: 'Failure',
							msg: 'Nilai komisi tidak boleh 0 atau kosong.',
							icon: Ext.Msg.ERROR,
							buttons: Ext.Msg.OK,
							fn: function (btn) {
								if (btn == 'ok') {
									me.getFormdata().up('window').body.unmask();
								}
							}
						});
						Ext.Function.defer(function () {
							messageBox.zIndexManager.bringToFront(messageBox);
						}, 100);
						cek_nilai_komisi = false;
						return
					}
				}
			});
		}

		if (cek_nilai_komisi) {
			var fields = me.getFormdata().getValues();

			var myObj = {
				komisi_permintaan_id: fields.komisi_permintaan_id,
				purchaseletter_id: fields.purchaseletter_id,
				pricetype_id: fields.pricetype_id,
				generate_skema: me.generate_skema,
				komisi_distributionchannel_id: me.komisi_distributionchannel_id,
				komisi_pencairan_id: me.komisi_pencairan_id,
				komisi_perhitungan_id: me.komisi_perhitungan_id,
				bulan: parseInt(Ext.Date.format(new Date(), 'm')),
				data_detail: data,
				data_unit_jual: me.dataListPL,
				data_target: me.dataListTarget
			}

			resetTimer();
			me.getFormdata().up('window').body.mask('Saving, please wait ...');
			Ext.Ajax.request({
				url: 'erems/permintaankomisi/create',
				params: {
					data: Ext.encode(myObj)
				},
				success: function (response) {
					me.getFormdata().up('window').body.unmask();
					if (Ext.decode(response.responseText).success == true) {
						Ext.Msg.show({
							title: 'Success',
							msg: 'Data saved successfully.',
							icon: Ext.Msg.INFO,
							buttons: Ext.Msg.OK,
							fn: function () {
								me.getFormdata().up('window').close();
								var gridDepan = me.getGrid();
								var storeDepan = gridDepan.getStore();
								storeDepan.reload();
							}
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
	calculateKomisi: function () {
		var me = this;
		var nilai_komisi = me.getFormdatadetail().down("[name=nilai_komisi]").getValuem();
		var nilai_ppn = me.getFormdatadetail().down("[name=nilai_ppn]").getValuem();
		var nilai_pph_pt = me.getFormdatadetail().down("[name=nilai_pph_pt]").getValuem();
		var nilai_pph_perorangan = me.getFormdatadetail().down("[name=nilai_pph_perorangan]").getValuem();
		var pengurang_komisi = me.getFormdatadetail().down("[name=pengurang_komisi]").getValuem();

		me.getFormdatadetail().down("[name=total_komisi]").setValuem((nilai_komisi + nilai_ppn - nilai_pph_pt - nilai_pph_perorangan) - pengurang_komisi);
	},
	calculateNilai: function (field) {
		var me = this;
		var persentase = me.getFormdatadetail().down("[name=persentase_" + field + "]").getValue();
		var persentase_ppn = me.getFormdatadetail().down("[name=persentase_ppn]").getValue();
		var is_grossup_pph_pt = me.getFormdatadetail().down("[name=is_grossup_pph_pt]").getValue();
		var is_grossup_pph_perorangan = me.getFormdatadetail().down("[name=is_grossup_pph_perorangan]").getValue();
		if (field == 'komisi') {
			var nilaiPengali = me.getFormdatadetail().down("[name=harga_netto_komisi]").getValuem();
		} else {
			if (persentase_ppn != 0 && (is_grossup_pph_pt === true || is_grossup_pph_perorangan === true)) {
				me.getFormdatadetail().down("[name=is_grossup_pph_pt]").setReadOnly(true);
				me.getFormdatadetail().down("[name=is_grossup_pph_pt]").setValue(0);
				me.getFormdatadetail().down("[name=is_grossup_pph_perorangan]").setReadOnly(true);
				me.getFormdatadetail().down("[name=is_grossup_pph_perorangan]").setValue(0);
			}
			if (field != "ppn") {
				if (persentase != 0) {
					me.getFormdatadetail().down("[name=is_grossup_" + field + "]").setReadOnly(false);
				} else {
					me.getFormdatadetail().down("[name=is_grossup_" + field + "]").setReadOnly(true);
					me.getFormdatadetail().down("[name=is_grossup_" + field + "]").setValue(0);
				}
			}
			var nilaiPengali = me.getFormdatadetail().down("[name=nilai_komisi]").getValuem();
		}
		me.getFormdatadetail().down("[name=nilai_" + field + "]").setValuem(Math.round(persentase * nilaiPengali / 100));
	},
	calculateNilaiKomisiPT: function () {
		var me = this;

		var griddetail = me.getGriddetail();
		var store = griddetail.getStore();
		var record = store.getAt(store.indexOf(griddetail.getSelectionModel().getSelection()[0]));
		// me.getFormdatadetail().loadRecord(record);
		var persentase_komisi = me.getFormdatadetail().down("[name=persentase_komisi]").getValue();
		var persentase_pph_pt = me.getFormdatadetail().down("[name=persentase_pph_pt]").getValue();
		var harga_netto = record.get('harga_netto_komisi');
		var is_grossup_pph_pt = me.getFormdatadetail().down("[name=is_grossup_pph_pt]").getValue();
		if (persentase_pph_pt != 0 && is_grossup_pph_pt === true) {
			me.getFormdatadetail().down("[name=persentase_ppn]").setValue(0);
			me.getFormdatadetail().down("[name=nilai_ppn]").setValue(0);
			// Nilai Komisi = (Persentase Komisi / (100%-Persentase PPH)) * Harga Netto
			// Contoh:
			// Persentase Komisi = 0.02%
			// Persentase PPH = 2.5%
			// Harga Netto = 383,400,000
			// Nilai Komisi = (0.02% / (100% - 2.5%)) * 383,400,000
			// Nilai Komisi =  78,646.15
			var nilai_komisi = (persentase_komisi / (100 - persentase_pph_pt)) * harga_netto;
			me.getFormdatadetail().down("[name=nilai_komisi]").setValuem(nilai_komisi);
		} else {
			me.calculateNilai("komisi");
		}
		me.calculateNilai("pph_pt");
	},
	calculateNilaiKomisiPerorangan: function () {
		var me = this;

		var griddetail = me.getGriddetail();
		var store = griddetail.getStore();
		var record = store.getAt(store.indexOf(griddetail.getSelectionModel().getSelection()[0]));
		// me.getFormdatadetail().loadRecord(record);
		var persentase_komisi = me.getFormdatadetail().down("[name=persentase_komisi]").getValue();
		var persentase_pph_perorangan = me.getFormdatadetail().down("[name=persentase_pph_perorangan]").getValue();
		var harga_netto = record.get('harga_netto_komisi');
		var is_grossup_pph_perorangan = me.getFormdatadetail().down("[name=is_grossup_pph_perorangan]").getValue();
		if (persentase_pph_perorangan != 0 && is_grossup_pph_perorangan === true) {
			me.getFormdatadetail().down("[name=persentase_ppn]").setValue(0);
			me.getFormdatadetail().down("[name=nilai_ppn]").setValue(0);
			// Nilai Komisi = (Persentase Komisi / (100%-Persentase PPH)) * Harga Netto
			// Contoh:
			// Persentase Komisi = 0.02%
			// Persentase PPH = 2.5%
			// Harga Netto = 383,400,000
			// Nilai Komisi = (0.02% / (100% - 2.5%)) * 383,400,000
			// Nilai Komisi =  78,646.15
			var nilai_komisi = (persentase_komisi / (100 - persentase_pph_perorangan)) * harga_netto;
			me.getFormdatadetail().down("[name=nilai_komisi]").setValuem(nilai_komisi);
		} else {
			me.calculateNilai("komisi");
		}
		me.calculateNilai("pph_perorangan");
	},
	gridDetailSelectionChange: function () {
		var me = this;
		var state = me.getFormdata().up('window').state;
		var grid = me.getGriddetail(), row = grid.getSelectionModel().getSelection();
		var edit = grid.down('#btnEdit');
		var view = grid.down('#btnView');
//		var deleteb = grid.down('#btnDelete');

		var flag_delete = 1;
		Ext.each(row, function (rec) {
			if (rec.data.flag_delete == 0) {
				flag_delete = 0;
				return;
			}
		});

		if (flag_delete == 0) {
//				grid.down('#btnEdit').setDisabled(true);
			edit.setDisabled(true);
//			deleteb.setDisabled(true);
		} else {
			if (edit !== null && state != 'read') {
				edit.setDisabled(row.length != 1);
			}
//			if (deleteb !== null) {
//				deleteb.setDisabled(row.length < 1);
//			}
		}

		if (view !== null) {
			view.setDisabled(row.length != 1);
		}
	},

	//================= BROWSE PANEL ================================
	instantWindow: function (panel, width, title, state, id) {
		var me = this;
		var formtitle, formicon;


		title = typeof title == 'undefined' ? 'My Window' : title;
		id = typeof id == 'undefined' ? 'myInstantWindow' : id;
		state = typeof state == 'undefined' ? 'create' : state;
		panel = typeof panel == 'undefined' ? 'Panel' : panel;
		width = typeof width == 'undefined' ? 600 : width;
		formtitle = title;
		formicon = 'icon-form-add';
		var winId = id;



		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: false,
				width: width,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: false,
				items: Ext.create('Erems.view.' + me.controllerName + '.' + panel),
				state: state
			});
		}
		win.show();
	},

	browsepanelBeforeRender: function (el, a, b) {
		var me = this;

		var gridView = Ext.create('Erems.view.permintaankomisi.browse.Grid', {
			region: 'center'
		});
		var searchView = Ext.create('Erems.view.permintaankomisi.browse.FormSearch', {
			region: 'west',
			split: true,
			maxWidth: 500,
			minWidth: 300,
			width: 300,
			collapsed: true,
			collapsible: true,
			iconCls: 'icon-search',
			title: 'Search'
		});
		el.removeAll();
		el.add(gridView);
		el.add(searchView);
	},
	browsegridSelection: function (el) {
		var me = this;
		var unitGrid = el.up('grid');
		var unitStore = el.up('grid').getStore();
		var rows = unitGrid.getSelectionModel().getSelection();
		if (rows.length == 1) {
			el.up('window').destroy();
			_myAppGlobal.getController('Permintaankomisi').processRowFromItemSelection(rows[0].get('purchaseletter_id'), 'loadGrid');

		} else {
			Ext.Msg.alert('Info', 'Require 1 unit!');
			return;

		}
	},
	browsegridAfterRender: function (el, a, b) {
		var me = this;
		me.browsedataReset(el.up('panel').up('panel').down('button[action=search]'));
//		resetTimer();
//		var store = el.getStore();
//		store.removeAll();
//		store.getProxy().setExtraParam('limit', 25);
//		store.loadPage(1);
	},
	browseformSearchAfterRender: function (el) {
//		var me = this;
//
//		var ftStore = null;
//		ftStore = el.form._fields.items[2].getStore();
//		ftStore.load({params: {start: 0, limit: 0}});
	},
	browsedataSearch: function (el) {
		resetTimer();
		var me = this;

		var form = el.up('form');
		var store = el.up('panel').up('panel').down('grid').getStore();

		var fields = form.getValues();
		for (var x in fields)
		{
			store.getProxy().setExtraParam(x, fields[x]);
		}
		store.loadPage(1);
	},
	browsedataReset: function (el) {
		var me = this;
		var form = el.up('form');
		form.getForm().reset();
		me.browsedataSearch(el.up('panel').up('panel').down('button[action=search]'));
	},
	//===================== END BROWSE PANEL ===============================

	processRowFromItemSelection: function (pl_id, inital) {
		var me = this;
		me.generate_skema = 0;
		me.komisi_distributionchannel_id = 0;
		me.komisi_pencairan_id = 0;
		me.komisi_perhitungan_id = 0;
		var plDetailStore = me.getPurchaseletterdetailStore();
		//me.getFormdata().up('window').body.mask('Loading data...');
		plDetailStore.load({
			params: {mode_read: 'detail', purchaseletter_id: pl_id},
			callback: function (rec) {
				/* UNIT INFOTMATION */
				me.getFormdata().down('[name=code]').setValue(rec[0].get('cluster_code'));
				me.getFormdata().down('[name=unit_cluster_id]').setValue(rec[0].get('unit_cluster_id'));
				me.getFormdata().down('[name=block_code]').setValue(rec[0].get('block_code'));
				me.getFormdata().down('[name=unit_block_id]').setValue(rec[0].get('unit_block_id'));
				me.getFormdata().down('[name=unit_pt_name]').setValue(rec[0].get('unit_pt_name'));
				me.getFormdata().down('[name=unit_unit_number]').setValue(rec[0].get('unit_unit_number'));
				me.getFormdata().down('[name=unit_productcategory]').setValue(rec[0].get('unit_productcategory'));
				me.getFormdata().down('[name=unit_type_name]').setValue(rec[0].get('unit_type_name'));
				me.getFormdata().down('[name=unit_land_size]').setValue(rec[0].get('unit_land_size'));
				me.getFormdata().down('[name=unit_long]').setValue(rec[0].get('unit_long'));
				me.getFormdata().down('[name=unit_building_size]').setValue(rec[0].get('unit_building_size'));
				me.getFormdata().down('[name=unit_width]').setValue(rec[0].get('unit_width'));
				me.getFormdata().down('[name=unit_kelebihan]').setValue(rec[0].get('unit_kelebihan'));
				me.getFormdata().down('[name=unit_floor]').setValue(rec[0].get('unit_floor'));
				/* END UNIT INFOTMATION */

				me.getFormdata().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
				me.getFormdata().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
				var purchase_date = rec[0].get('purchase_date');
				if (rec[0].get('firstpurchase_date_type_date') != "" || rec[0].get('firstpurchase_date_type_date') != null || !isNaN(rec[0].get('firstpurchase_date_type_date'))) {
					purchase_date = rec[0].get('firstpurchase_date_type_date');
				}
				me.getFormdata().down('[name=purchase_date]').setValue(purchase_date);
				me.getFormdata().down('[name=customer_name]').setValue(rec[0].get('customer_name'));
				me.getFormdata().down('[name=customer_ktp]').setValue(rec[0].get('customer_ktp'));
				me.getFormdata().down('[name=customer_npwp]').setValue(rec[0].get('customer_npwp'));
				me.getFormdata().down('[name=customer_email]').setValue(rec[0].get('customer_email'));
				me.getFormdata().down('[name=customer_address]').setValue(rec[0].get('customer_address'));
				me.getFormdata().down('[name=customer_city]').setValue(rec[0].get('customer_city_id'));
				me.getFormdata().down('[name=customer_phone]').setValue(rec[0].get('customer_homephone'));
				me.getFormdata().down('[name=customer_mobile_phone]').setValue(rec[0].get('customer_mobilephone'));
				me.getFormdata().down('[name=customer_office_phone]').setValue(rec[0].get('customer_officephone'));
				me.getFormdata().down('[name=purchaseletter_pricetype]').setValue(rec[0].get('customer_pendanaan'));
				me.getFormdata().down('[name=purchaseletter_salesman]').setValue(rec[0].get('salesman_name'));
				me.getFormdata().down('[name=purchaseletter_harga_netto]').setValue(accounting.formatMoney(rec[0].get('harga_netto')));
				me.getFormdata().down('[name=purchaseletter_harga_netto_komisi]').setValue(accounting.formatMoney(rec[0].get('harga_netto_komisi_per_kom')));
				me.getFormdata().down('[name=purchaseletter_harga_total_jual]').setValue(accounting.formatMoney(rec[0].get('harga_total_jual')));
				me.getFormdata().down('[name=permintaankomisi_persen_pembayaran]').setValue(accounting.formatMoney((rec[0].get('total_payment') / rec[0].get('harga_total_jual') * 100)));
				me.getFormdata().down('[name=payment_total_payment]').setValue(accounting.formatMoney(rec[0].get('total_payment')));
				me.getFormdata().down('[name=skema_sales]').setValue(rec[0].get('judul_komisi'));
				me.getFormdata().down('[name=distribution_channel]').setValue(rec[0].get('distributionchannel'));

				if (inital == 'loadGrid') {
					me.getGriddetail().getStore().getProxy().setExtraParam('komisi_permintaan_id', 0);
				}
				me.getGriddetail().getStore().getProxy().setExtraParam('purchaseletter_id', pl_id);
				me.getGriddetail().getStore().load({
					callback: function (rec) {
						if (me.getGriddetail().getStore().getCount() < 1) {
							Ext.Msg.confirm('Info', 'Purchaseletter yang dipilih belum memiliki skema pencairan komisi, generate sekarang?', function (btn) {
								if (btn == 'yes') {
									me.formDataSalesInfoShow('create');
								}
							});
						}
					}
				});
			}
		});
	},
});
