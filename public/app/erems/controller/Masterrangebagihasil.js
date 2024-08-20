Ext.define('Erems.controller.Masterrangebagihasil', {
//	extend: 'Erems.library.template.controller.Controller',
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Masterrangebagihasil',
	views: ['masterrangebagihasil.Panel', 'masterrangebagihasil.Grid', 'masterrangebagihasil.GridDetail', 'masterrangebagihasil.FormSearch', 'masterrangebagihasil.FormData'],
	stores: ['Masterrangebagihasil', 'Masterrangebagihasildetail', 'Namapenerimakomisi', 'Masterparameterglobal'],
	models: ['Masterrangebagihasil', 'Masterrangebagihasildetail', 'Masterparameterglobal'],
	refs: [
		{
			ref: 'grid',
			selector: 'masterrangebagihasilgrid'
		},
		{
			ref: 'formsearch',
			selector: 'masterrangebagihasilformsearch'
		},
		{
			ref: 'formdata',
			selector: 'masterrangebagihasilformdata'
		},
		{
			ref: 'formdatadetail',
			selector: 'masterrangebagihasilformdatadetail'
		},
		{
			ref: 'griddetail',
			selector: 'masterrangebagihasilgriddetail'
		}
	],
	controllerName: 'masterrangebagihasil',
	fieldName: 'code',
	bindPrefixName: 'Masterrangebagihasil',
	formWidth: 700,
	afterHargaTanahStart: 0,
	beforeHargaTanahEnd: 0,
	init: function (application) {
		var me = this;
		this.control({
			'masterrangebagihasilpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'masterrangebagihasilgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'masterrangebagihasilgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
					me.afterHargaTanahStart = 0;
					me.beforeHargaTanahEnd = 0;
				}
			},
			'masterrangebagihasilgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'masterrangebagihasilgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'masterrangebagihasilgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'masterrangebagihasilgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'masterrangebagihasilformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'masterrangebagihasilformsearch button[action=search]': {
				click: this.dataSearch
			},
			'masterrangebagihasilformsearch button[action=reset]': {
				click: this.dataReset
			},
			'masterrangebagihasilformdata': {
//				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataAfterRender
			},
			'masterrangebagihasilformdata button[action=save]': {
				click: me.dataSave
			},
			'masterrangebagihasilformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'masterrangebagihasilgriddetail': {
//				afterrender: this.gridAfterRender,
//				itemdblclick: this.gridItemDblClick,
//				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridDetailSelectionChange
			},
			'masterrangebagihasilgriddetail toolbar button[action=create]': {
				click: function () {
					me.formDataRangeBagiHasilDetailShow('create');
				}
			},
			'masterrangebagihasilgriddetail toolbar button[action=update]': {
				click: function () {
					me.formDataRangeBagiHasilDetailShow('update');
				}
			},
			'masterrangebagihasilgriddetail toolbar button[action=destroy]': {
				click: this.dataDetailDestroy
			},
			'masterrangebagihasilformdatadetail': {
//				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataDetailAfterRender
			},
			'masterrangebagihasilformdatadetail button[action=save]': {
				click: me.detailData.save_data
			},
		});
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
				me.getGriddetail().getStore().getProxy().setExtraParam('rangebagihasil_id', record.get('rangebagihasil_id'));
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

//		me.loadComboBoxStore(el);

		var state = el.up('window').state;

		if (state == 'create') {
			if (me.beforeHargaTanahEnd > 0) {
				me.getFormdatadetail().down('[name=hargatanah_permeter_start]').setValuem((me.beforeHargaTanahEnd + 1));
			}
		} else if (state == 'update') {
			var griddetail = me.getGriddetail();
			var store = griddetail.getStore();
			var record = store.getAt(store.indexOf(griddetail.getSelectionModel().getSelection()[0]));
			me.getFormdatadetail().loadRecord(record);
			me.getFormdatadetail().down('[name=hargatanah_permeter_start]').setValuem((record.get('hargatanah_permeter_start') > 0 ? record.get('hargatanah_permeter_start') : 0))

		}
	},
	formDataRangeBagiHasilDetailShow: function (state) {
		var me = this;
		//var state = 'create';//action == me.bindPrefixName + 'Create' ? 'create' : 'update';
		switch (state) {
			case 'create':
				formtitle = 'Create Detail Range Bagi Hasil';
				formicon = 'icon-form-add';
				var griddetail = me.getGriddetail();
				var store = griddetail.getStore();
				var lastRecord = store.getAt((store.getCount() - 1));
				if (typeof lastRecord != "undefined") {
					me.beforeHargaTanahEnd = lastRecord.get('hargatanah_permeter_end');
				}
				break;
			case 'update':
				formtitle = 'Edit Detail Range Bagi Hasil';
				formicon = 'icon-form-edit';

				var griddetail = me.getGriddetail();
				var store = griddetail.getStore();
				var indexOfData = store.indexOf(griddetail.getSelectionModel().getSelection()[0]);
				var prevRecord = store.getAt((indexOfData - 1));
				var nextRecord = store.getAt((indexOfData + 1));

				if (typeof prevRecord == "undefined") {
					me.beforeHargaTanahEnd = 0;
				} else {
					me.beforeHargaTanahEnd = prevRecord.get('hargatanah_permeter_end');
				}

				if (typeof nextRecord == "undefined") {
					me.afterHargaTanahStart = 0;
				} else {
					me.afterHargaTanahStart = nextRecord.get('hargatanah_permeter_start');
				}
				break;
		}
		var winId = 'win-rangebagihasildetailformdata';
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
				if (parseFloat(accounting.unformat(fields.hargatanah_permeter_start)) > parseFloat(accounting.unformat(fields.hargatanah_permeter_end))) {
					Ext.Msg.show({
						title: 'Warning',
						msg: 'Range harga tanah belum sesuai!',
						icon: Ext.Msg.WARNING,
						buttons: Ext.Msg.OK
					});
					me.getFormdatadetail().down('[name=hargatanah_permeter_start]').markInvalid('Range harga tanah belum sesuai!');
				} else if ((parseFloat(fields.komposisi_tanah_partner) + parseFloat(fields.komposisi_tanah_ciputra)) != 100) {
					Ext.Msg.show({
						title: 'Warning',
						msg: 'Komposisi tanah harus 100%!',
						icon: Ext.Msg.WARNING,
						buttons: Ext.Msg.OK
					});
					me.getFormdatadetail().down('[name=komposisi_tanah_partner]').markInvalid('Komposisi tanah harus 100%!');
					me.getFormdatadetail().down('[name=komposisi_tanah_ciputra]').markInvalid('Komposisi tanah harus 100%!');
				} else if ((parseFloat(fields.komposisi_bangunan_partner) + parseFloat(fields.komposisi_bangunan_ciputra)) != 100) {
					Ext.Msg.show({
						title: 'Warning',
						msg: 'Komposisi bangunan harus 100%!',
						icon: Ext.Msg.WARNING,
						buttons: Ext.Msg.OK
					});
					me.getFormdatadetail().down('[name=komposisi_bangunan_partner]').markInvalid('Komposisi bangunan harus 100%!');
					me.getFormdatadetail().down('[name=komposisi_bangunan_ciputra]').markInvalid('Komposisi bangunan harus 100%!');
				} else {
					if (state == "update") {
						storeGrid = me.getGriddetail().getStore().getAt(me.getGriddetail().getSelectedRow());
						storeGrid.set('hargatanah_permeter_start', fields.hargatanah_permeter_start);
						storeGrid.set('hargatanah_permeter_end', fields.hargatanah_permeter_end);
						storeGrid.set('komposisi_tanah_partner', fields.komposisi_tanah_partner);
						storeGrid.set('komposisi_tanah_ciputra', fields.komposisi_tanah_ciputra);
						storeGrid.set('komposisi_bangunan_partner', fields.komposisi_bangunan_partner);
						storeGrid.set('komposisi_bangunan_ciputra', fields.komposisi_bangunan_ciputra);
					} else {
						myStore.add({
							rangebagihasil_detail_id: fields.rangebagihasil_detail_id,
							hargatanah_permeter_start: fields.hargatanah_permeter_start,
							hargatanah_permeter_end: fields.hargatanah_permeter_end,
							komposisi_tanah_partner: fields.komposisi_tanah_partner,
							komposisi_tanah_ciputra: fields.komposisi_tanah_ciputra,
							komposisi_bangunan_partner: fields.komposisi_bangunan_partner,
							komposisi_bangunan_ciputra: fields.komposisi_bangunan_ciputra,
							deleted: 0});
					}
					me.getFormdatadetail().up('window').close();
				}
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

		store.clearFilter(true);
		var data = [];
		var rangeValid = true;

		for (var i = 0; i < store.getCount(); i++) {
			store.each(function (record, idx) {
				if (i == idx) {
					data[i] = record.data;

					/* CHECK RANGE HARGA TANAH */
					if (i > 0) {
						prevData = data[(i - 1)];
						if (record.data.hargatanah_permeter_start != (prevData.hargatanah_permeter_end + 1)) {
							rangeValid = false;
						}
					}
				}
			});
		}

		if (rangeValid) {
			var fields = me.getFormdata().getValues();

			var myObj = {
				rangebagihasil_id: fields.rangebagihasil_id,
				code: fields.code,
				name: fields.name,
				komisi_marketing: fields.komisi_marketing,
				pph: fields.pph,
				is_progresif: fields.is_progresif,
				data_detail: data
			}

			resetTimer();
			me.getFormdata().up('window').body.mask('Saving, please wait ...');
			Ext.Ajax.request({
				url: 'erems/masterrangebagihasil/create',
				params: {
					data: Ext.encode(myObj)
				},
				success: function (response) {
					me.getFormdata().up('window').body.unmask();
					var res = Ext.decode(response.responseText);

					console.log(res);
					console.log(Ext.decode(response.responseText));
					console.log(Ext.decode(response.responseText).success);
					// console.log(response.operations[0].response.responseText);

					if (res.total == 1) {
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
							msg: res.total[0].message,
							icon: Ext.Msg.ERROR,
							buttons: Ext.Msg.OK
						});
					}
				},
			});
		} else {
			Ext.Msg.show({
				title: 'Warning',
				msg: 'Range harga tanah belum sesuai!',
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK
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
				var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('reff_name') + ']';
				confirmmsg = 'Delete data ?';
				failmsg = 'Error: Unable to delete data.';
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
						if (rows[i].get('rangebagihasil_detail_id') == 0) {
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
    dataDestroy: function () {
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get(me.fieldName) + ']';
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
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {
                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function(s) {
                            var res = Ext.decode(s.operations[0].response.responseText).total[0] == undefined ? 1 : 0;
                            if(res == 0){
                                me.getGrid().up('window').unmask();
                                store.un('beforesync', msg);
                                store.reload();
                                Ext.Msg.show({
                                    title: 'Failure',
                                    msg: failmsg + ' <br/>The data may have been used.',
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }else{
                                me.getGrid().up('window').unmask();
                                var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                                var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                                store.un('beforesync', msg);
                                store.reload();

                                Ext.Msg.show({
                                    title: 'Success',
                                    msg: successmsg,
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        },
                        failure: function() {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: failmsg + ' <br/>The data may have been used.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
});