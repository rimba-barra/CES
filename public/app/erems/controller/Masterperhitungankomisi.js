Ext.define('Erems.controller.Masterperhitungankomisi', {
//	extend: 'Erems.library.template.controller.Controller',
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Masterperhitungankomisi',
	views: ['masterperhitungankomisi.Panel', 'masterperhitungankomisi.Grid', 'masterperhitungankomisi.GridDetail', 'masterperhitungankomisi.FormSearch', 'masterperhitungankomisi.FormData'],
	stores: ['Masterperhitungankomisi', 'Masterperhitungankomisidetail', 'Namapenerimakomisi', 'Masterparameterglobal'],
	models: ['Masterperhitungankomisi', 'Masterperhitungankomisidetail', 'Masterparameterglobal'],
	refs: [
		{
			ref: 'grid',
			selector: 'masterperhitungankomisigrid'
		},
		{
			ref: 'formsearch',
			selector: 'masterperhitungankomisiformsearch'
		},
		{
			ref: 'formdata',
			selector: 'masterperhitungankomisiformdata'
		},
		{
			ref: 'formdatadetail',
			selector: 'masterperhitungankomisiformdatadetail'
		},
		{
			ref: 'griddetail',
			selector: 'masterperhitungankomisigriddetail'
		}
	],
	controllerName: 'masterperhitungankomisi',
	fieldName: 'judul',
	bindPrefixName: 'Masterperhitungankomisi',
	formWidth: 600,
	m_pricetype: [],
	init: function (application) {
		var me = this;
		this.control({
			'masterperhitungankomisipanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'masterperhitungankomisigrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'masterperhitungankomisigrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'masterperhitungankomisigrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'masterperhitungankomisigrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'masterperhitungankomisigrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'masterperhitungankomisigrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'masterperhitungankomisiformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'masterperhitungankomisiformsearch button[action=search]': {
				click: this.dataSearch
			},
			'masterperhitungankomisiformsearch button[action=reset]': {
				click: this.dataReset
			},
			'masterperhitungankomisiformdata': {
//				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataAfterRender
			},
			'masterperhitungankomisiformdata button[action=save]': {
				click: me.dataSave
			},
			'masterperhitungankomisiformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'masterperhitungankomisigriddetail': {
//				afterrender: this.gridAfterRender,
//				itemdblclick: this.gridItemDblClick,
//				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridDetailSelectionChange
			},
			'masterperhitungankomisigriddetail toolbar button[action=create]': {
				click: function () {
					me.formDataPerhitunganKomisiDetailShow('create');
				}
			},
			'masterperhitungankomisigriddetail toolbar button[action=update]': {
				click: function () {
					me.formDataPerhitunganKomisiDetailShow('update');
				}
			},
			'masterperhitungankomisigriddetail toolbar button[action=destroy]': {
				click: this.dataDetailDestroy
			},
			'masterperhitungankomisiformdatadetail': {
//				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataDetailAfterRender
//				afterrender: this.formDataAfterRender
			},
			'masterperhitungankomisiformdatadetail button[action=save]': {
				click: me.detailData.save_data
			},
            'masterperhitungankomisiformdatadetail [name=pricetype_id]': {
                change: function(el) {
                    me.PriceTypeOnSelect(el);
                }
            },
		});
	},
    PriceTypeOnSelect: function(el) {
        var me = this;
        var val = el.getValue();
        var um_value = me.getFormdatadetail().down("#is_uangmuka_value");
        var um_label = me.getFormdatadetail().down("#is_uangmuka_label");
        var ak_value = me.getFormdatadetail().down("#is_akad_value");
        var ak_label = me.getFormdatadetail().down("#is_akad_label");
        if (val === 2) {
			// console.log("muncul");
            um_value.show();
            um_label.show();
            ak_value.show();
            ak_label.show();
        } else {
			// console.log("gagal");
            um_value.hide();
            um_label.hide();
            ak_value.hide();
            ak_label.hide();
        }
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
				me.getGriddetail().getStore().getProxy().setExtraParam('komisi_perhitungan_id', record.get('komisi_perhitungan_id'));
				me.getGriddetail().getStore().load();
				/// update here
			}
		};
		return x;
	},
	formDataDetailAfterRender: function (el) {
		var me = this;
		me.storeProcess = me.createSpProcessObj(me.storeProcess);
		me.fdar().init();
		me.loadComboBoxStore(el);
		var state = el.up('window').state;
		if (state == 'create') {
		} else if (state == 'update') {
			var griddetail = me.getGriddetail();
			var store = griddetail.getStore();
			var record = store.getAt(store.indexOf(griddetail.getSelectionModel().getSelection()[0]));
			me.getFormdatadetail().loadRecord(record);
		}
	},
	formDataPerhitunganKomisiDetailShow: function (state) {
		var me = this;
		//var state = 'create';//action == me.bindPrefixName + 'Create' ? 'create' : 'update';
		switch (state) {
			case 'create':
				formtitle = 'Add Detail';
				formicon = 'icon-form-add';
				break;
			case 'update':
				formtitle = 'Edit Detail';
				formicon = 'icon-form-edit';
				break;
//			case 'view':
//				formtitle = 'View Progress Air dan Listrik';
//				formicon = 'icon-form-edit';
//				break;
		}
		var winId = 'win-komisiperhitungandetailformdata';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: false,
				width: 350,
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
	},
	detailData: {
		save_data: function () {
			var me = this;
			var state = me.getFormdatadetail().up('window').state.toLowerCase();
			var form = this.getFormdatadetail().getForm();
			var fields = me.getFormdatadetail().getValues();
			var myStore = me.getGriddetail().getStore();
			if (form.isValid()) {
				if (state == "update") {
					storeGrid = me.getGriddetail().getStore().getAt(me.getGriddetail().getSelectedRow());
					storeGrid.set('pricetype_id', fields.pricetype_id);
					storeGrid.set('pricetype_display', me.getFormdatadetail().down('[name=pricetype_id]').getRawValue());
					storeGrid.set('collection_name', fields.collection_name);
					storeGrid.set('persen_uangmasuk_coll', fields.persen_uangmasuk_coll);
					storeGrid.set('persen_pencairan_komisi', fields.persen_pencairan_komisi);
					if(fields.pricetype_id === 2){
						storeGrid.set('is_uangmuka', fields.is_uangmuka);
						storeGrid.set('is_sppjb', fields.is_sppjb);
						storeGrid.set('is_akad', fields.is_akad);
					}else{
						storeGrid.set('is_uangmuka', 0);
						storeGrid.set('is_sppjb', fields.is_sppjb);
						storeGrid.set('is_akad', 0);
					}
				} else {
					if(fields.pricetype_id === 2){
						is_uangmuka_value = fields.is_uangmuka;
						is_akad_value = fields.is_akad;
					}else{
						is_uangmuka_value = 0;
						is_akad_value = 0;
					}
					myStore.add({
						komisi_perhitungan_detail_id: fields.komisi_perhitungan_detail_id,
						pricetype_id: fields.pricetype_id,
						pricetype_display: me.getFormdatadetail().down('[name=pricetype_id]').getRawValue(),
						collection_name: fields.collection_name,
						persen_uangmasuk_coll: fields.persen_uangmasuk_coll,
						persen_pencairan_komisi: fields.persen_pencairan_komisi,
						is_uangmuka: is_uangmuka_value,
						is_sppjb: fields.is_sppjb,
						is_akad: is_akad_value,
					});
				}
				me.getFormdatadetail().up('window').close();
			}
		}
	},
	dataSave: function () {
		var me = this;
		var form = me.getFormdata().getForm();
		if (form.isValid()) {
			var store = me.getGriddetail().getStore();
			me.dataSaveConfirm(store);
		}
	},
	dataSaveConfirm: function (store) {
		var me = this;
		var cash = 0;
		var kpr = 0;
		var inhouse = 0;
		store.clearFilter(true);
		var data = [];
		for (var i = 0; i < store.getCount(); i++)
		{
			store.each(function (record, idx) {
				if (i == idx) {
					data[i] = record.data;
					if (record.data.pricetype_display == 'CASH' && record.data.deleted == 0) {
						cash += parseFloat(record.data.persen_pencairan_komisi);
					} else if (record.data.pricetype_display == 'KPR' && record.data.deleted == 0) {
						kpr += parseFloat(record.data.persen_pencairan_komisi);
					} else if (record.data.pricetype_display == 'INHOUSE' && record.data.deleted == 0) {
						inhouse += parseFloat(record.data.persen_pencairan_komisi);
					}
				}
			});
		}

		if (cash != 100) {
			Ext.Msg.show({
				title: 'Failure',
				msg: 'Pricetype CASH harus 100%',
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK
			});
		} else if (kpr != 100) {
			Ext.Msg.show({
				title: 'Failure',
				msg: 'Pricetype KPR harus 100%',
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK
			});
		} else if (inhouse != 100) {
			Ext.Msg.show({
				title: 'Failure',
				msg: 'Pricetype INHOUSE harus 100%',
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK
			});
		} else {
			var fields = me.getFormdata().getValues();

			var myObj = {
				komisi_perhitungan_id: fields.komisi_perhitungan_id,
				judul: fields.judul,
				description: fields.description,
				data_detail: data
			}

			resetTimer();
			me.getFormdata().up('window').body.mask('Saving, please wait ...');
			Ext.Ajax.request({
				url: 'erems/masterperhitungankomisi/create',
				params: {
					data: Ext.encode(myObj)
				},
				success: function (response) {
					me.getFormdata().up('window').body.unmask();
					if (Ext.decode(response.responseText).success == true)
					{
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
	dataDetailDestroy: function () {
		var me = this;
		var rows = me.getGriddetail().getSelectionModel().getSelection();
		if (rows.length < 1) {
			Ext.Msg.alert('Info', 'No record selected !');
			return;
		} else {
			var confirmmsg, successmsg, failmsg;
			var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
			var store = me.getGriddetail().getStore();
			if (rows.length == 1) {
				var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('collection_name') + ']';
				confirmmsg = 'Delete ' + selectedRecord + ' ?';
				failmsg = 'Error: Unable to delete ' + selectedRecord + '.';
			} else {
				confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
				failmsg = 'Error: Unable to delete data.';
			}
			Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
				if (btn == 'yes') {
					resetTimer();
					var msg = function () {
						me.getGriddetail().up('window').mask('Deleting data, please wait ...');
					};
					for (var i = 0; i < rows.length; i++) {
						if (rows[i].get('komisi_perhitungan_detail_id') == 0) {
							store.remove(rows[i]);
						} else {
							rows[i].set("deleted", 1);
						}
					}
					me.getGriddetail().getStore().filterBy(function (recod) {
						return recod.data.deleted == 0;
					});
				}
			});
		}
	},
	gridDetailSelectionChange: function () {
		var me = this;
		var grid = me.getGriddetail(), row = grid.getSelectionModel().getSelection();
		var edit = grid.down('#btnEdit');
		var deleteb = grid.down('#btnDelete');
		if (edit !== null) {
			edit.setDisabled(row.length != 1);
		}
		if (deleteb !== null) {
			deleteb.setDisabled(row.length < 1);
		}
	},
});