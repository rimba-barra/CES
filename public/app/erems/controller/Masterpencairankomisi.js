Ext.define('Erems.controller.Masterpencairankomisi', {
//	extend: 'Erems.library.template.controller.Controller',
	extend: 'Erems.library.template.controller.Controlleralt',
	requires: ['Erems.library.template.component.Distchannelcombobox'],
	alias: 'controller.Masterpencairankomisi',
	requires:[
	'Erems.library.template.component.Distchannelcombobox',
	'Erems.library.template.component.Penerimakomisicombobox'
	],
	views: ['masterpencairankomisi.Panel', 'masterpencairankomisi.Grid', 'masterpencairankomisi.GridDetail', 'masterpencairankomisi.FormSearch', 'masterpencairankomisi.FormData'],
	stores: ['Masterpencairankomisi', 'Masterpencairankomisidetail', 'Namapenerimakomisi', 'Masterparameterglobal','Masterdistchannel','Masterpenerimakomisi'],
	models: ['Masterpencairankomisi', 'Masterpencairankomisidetail', 'Masterparameterglobal','Masterdistchannel','Masterpenerimakomisi'],
	refs: [
		{
			ref: 'grid',
			selector: 'masterpencairankomisigrid'
		},
		{
			ref: 'formsearch',
			selector: 'masterpencairankomisiformsearch'
		},
		{
			ref: 'formdata',
			selector: 'masterpencairankomisiformdata'
		},
		{
			ref: 'formdatadetail',
			selector: 'masterpencairankomisiformdatadetail'
		},
		{
			ref: 'griddetail',
			selector: 'masterpencairankomisigriddetail'
		}
	],
	controllerName: 'masterpencairankomisi',
	fieldName: 'code',
	bindPrefixName: 'Masterpencairankomisi',
	formWidth: 700,
	init: function (application) {
		var me = this;
		this.control({
			'masterpencairankomisipanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'masterpencairankomisigrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'masterpencairankomisigrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'masterpencairankomisigrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'masterpencairankomisigrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'masterpencairankomisigrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'masterpencairankomisigrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'masterpencairankomisiformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'masterpencairankomisiformsearch button[action=search]': {
				click: this.dataSearch
			},
			'masterpencairankomisiformsearch button[action=reset]': {
				click: this.dataReset
			},
			'masterpencairankomisiformdata': {
//				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataAfterRender
			},
			'masterpencairankomisiformdata button[action=save]': {
				click: me.dataSave
			},
			'masterpencairankomisiformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'masterpencairankomisigriddetail': {
//				afterrender: this.gridAfterRender,
//				itemdblclick: this.gridItemDblClick,
//				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridDetailSelectionChange
			},
			'masterpencairankomisigriddetail toolbar button[action=create]': {
				click: function () {
					me.formDataPencairanKomisiDetailShow('create');
				}
			},
			'masterpencairankomisigriddetail toolbar button[action=update]': {
				click: function () {
					me.formDataPencairanKomisiDetailShow('update');
				}
			},
			'masterpencairankomisigriddetail toolbar button[action=destroy]': {
				click: this.dataDetailDestroy
			},
			'masterpencairankomisiformdatadetail': {
//				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataDetailAfterRender
			},
			'masterpencairankomisiformdatadetail [name=rg_populated_data]': {
				change: function (el) {
					if (el.getValue().populated_data == "freetext") {
						me.getFormdatadetail().down('[name=npwp]').setVisible(true);
						me.getFormdatadetail().down('[name=reff_name]').setVisible(true);
						me.getFormdatadetail().down("[name=reff_name]").allowBlank = false;
						me.getFormdatadetail().down('[name=reff_id]').setVisible(false);
						me.getFormdatadetail().down("[name=reff_id]").allowBlank = true;
					} else {
						me.getFormdatadetail().down('[name=npwp]').setVisible(false);
						me.getFormdatadetail().down('[name=reff_name]').setVisible(false);
						me.getFormdatadetail().down("[name=reff_name]").allowBlank = true;
						me.getFormdatadetail().down('[name=reff_id]').setVisible(true);
						me.getFormdatadetail().down("[name=reff_id]").allowBlank = false;

						me.getFormdatadetail().down('[name=reff_id]').getStore().proxy.extraParams = {mode: 'cbf', populated_data: el.getValue().populated_data};
						me.getFormdatadetail().down('[name=reff_id]').getStore().load();
					}
				}
			},
			'masterpencairankomisiformdatadetail button[action=save]': {
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
				me.getGriddetail().getStore().getProxy().setExtraParam('komisi_pencairan_id', record.get('komisi_pencairan_id'));
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
		me.getFormdatadetail().down('[name=komisi_penerima_id]').getStore().proxy.extraParams = {start: 0, limit: 0};
		me.getFormdatadetail().down('[name=komisi_penerima_id]').getStore().load();

		var state = el.up('window').state;

		if (state == 'create') {
			me.getFormdatadetail().down("[name=reff_name]").allowBlank = false;
			me.getFormdatadetail().down("[name=reff_id]").allowBlank = true;
		} else if (state == 'update') {
			var griddetail = me.getGriddetail();
			var store = griddetail.getStore();

			var record = store.getAt(store.indexOf(griddetail.getSelectionModel().getSelection()[0]));
			npwp = record.data.npwp;
			npwp = npwp.split('.').join('');
			npwp = npwp.split('-').join('');
			record.data.npwp = npwp;
			me.getFormdatadetail().loadRecord(record);
			if (record.data.populated_data == "freetext") {
				me.getFormdatadetail().down('[name=reff_id]').setValue("");
				me.getFormdatadetail().down("[name=reff_name]").allowBlank = false;
				me.getFormdatadetail().down("[name=reff_id]").allowBlank = true;
			} else {
				me.getFormdatadetail().down('[name=reff_name]').setValue("")
				me.getFormdatadetail().down("[name=reff_name]").allowBlank = true;
				me.getFormdatadetail().down("[name=reff_id]").allowBlank = false;
			}
		}
	},
	formDataPencairanKomisiDetailShow: function (state) {
		var me = this;
		//var state = 'create';//action == me.bindPrefixName + 'Create' ? 'create' : 'update';
		switch (state) {
			case 'create':
				formtitle = 'Create Detail Komisi Pencairan';
				formicon = 'icon-form-add';
				break;
			case 'update':
				formtitle = 'Edit Detail Komisi Pencairan';
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
				var reff_name = "";
				var reff_id = "";
				var npwp = "";
				if (fields.populated_data == "freetext") {
					reff_name = fields.reff_name;
					npwp = fields.npwp;
				} else {
					reff_id = fields.reff_id;
					reff_name = me.getFormdatadetail().down('[name=reff_id]').getRawValue();
				}

				var komisi_penerima_id = fields.komisi_penerima_id;
				var penerima_komisi = me.getFormdatadetail().down('[name=komisi_penerima_id]').getRawValue();
				var komisi_persen_nominal = fields.komisi_persen_nominal;
				var komisi_value = accounting.unformat(fields.komisi_value);
				var populated_data = fields.populated_data;
				var keterangan = fields.keterangan;

				if (state == "update") {
					storeGrid = me.getGriddetail().getStore().getAt(me.getGriddetail().getSelectedRow());
					storeGrid.set('komisi_penerima_id', komisi_penerima_id);
					storeGrid.set('penerima_komisi', penerima_komisi);
					storeGrid.set('komisi_persen_nominal', komisi_persen_nominal);
					storeGrid.set('komisi_value', komisi_value);
					storeGrid.set('populated_data', populated_data);
					storeGrid.set('reff_id', reff_id);
					storeGrid.set('reff_name', reff_name);
					storeGrid.set('npwp', npwp);
					storeGrid.set('keterangan', keterangan);
				} else {
					myStore.add({
						komisi_pencairan_detail_id: fields.komisi_pencairan_detail_id,
						komisi_penerima_id: komisi_penerima_id,
						penerima_komisi: penerima_komisi,
						komisi_persen_nominal: komisi_persen_nominal,
						komisi_value: komisi_value,
						populated_data: populated_data,
						reff_id: reff_id,
						reff_name: reff_name,
						npwp: npwp,
						keterangan: keterangan,
						deleted: 0});
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
    dataDestroy: function() {
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
            Ext.Msg.confirm('Delete Data', confirmmsg, function(btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function() {
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
	dataSaveConfirm: function (store) {
		var me = this;

		store.clearFilter(true);
		var data = [];

		for (var i = 0; i < store.getCount(); i++)
		{
			store.each(function (record, idx) {
				if (i == idx) {
					data[i] = record.data;
				}
			});
		}

		var fields = me.getFormdata().getValues();

		var myObj = {
			komisi_pencairan_id: fields.komisi_pencairan_id,
			code: fields.code,
			komisi_distributionchannel_id: fields.komisi_distributionchannel_id,
			judul_komisi: fields.judul_komisi,
			description: fields.description,
			data_detail: data
		}

		resetTimer();
		me.getFormdata().up('window').body.mask('Saving, please wait ...');
		Ext.Ajax.request({
			url: 'erems/masterpencairankomisi/create',
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
//						msg: 'Error: Unable to save data.',
						msg: Ext.decode(response.responseText).message,
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			},
		});
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
						if (rows[i].get('komisi_pencairan_detail_id') == 0) {
							store.remove(rows[i]);
						} else {
							rows[i].set("deleted", 1);
						}
					}

                    store.on('beforesync', msg);
                    store.sync({
                        success: function(s) {
                            var res = Ext.decode(s.operations[0].response.responseText).total[0] == undefined ? 1 : 0;
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