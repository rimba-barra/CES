Ext.define('Erems.controller.Mastersiteplanlegend', {
//	extend: 'Erems.library.template.controller.Controller',
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Mastersiteplanlegend',
	views: ['mastersiteplanlegend.Panel', 'mastersiteplanlegend.Grid', 'mastersiteplanlegend.GridDetail', 'mastersiteplanlegend.FormSearch', 'mastersiteplanlegend.FormData'],
	stores: ['Mastersiteplanlegend', 'Mastersiteplanlegenddetail', 'Namapenerimakomisi', 'Masterparameterglobal', 'Mastersiteplanparameter', 'Mastersiteplanparameterrelational'],
	models: ['Mastersiteplanlegend', 'Mastersiteplanlegenddetail', 'Masterparameterglobal'],
	refs: [
		{
			ref: 'grid',
			selector: 'mastersiteplanlegendgrid'
		},
		{
			ref: 'formsearch',
			selector: 'mastersiteplanlegendformsearch'
		},
		{
			ref: 'formdata',
			selector: 'mastersiteplanlegendformdata'
		},
		{
			ref: 'formdatadetail',
			selector: 'mastersiteplanlegendformdatadetail'
		},
		{
			ref: 'griddetail',
			selector: 'mastersiteplanlegendgriddetail'
		}
	],
	controllerName: 'mastersiteplanlegend',
	fieldName: 'prefixcode_svg',
	bindPrefixName: 'Mastersiteplanlegend',
	formWidth: 700,
	afterHargaTanahStart: 0,
	beforeHargaTanahEnd: 0,
	init: function (application) {
		var me = this;
		this.control({
			'mastersiteplanlegendpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'mastersiteplanlegendgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'mastersiteplanlegendgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
					me.afterHargaTanahStart = 0;
					me.beforeHargaTanahEnd = 0;
				}
			},
			'mastersiteplanlegendgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'mastersiteplanlegendgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'mastersiteplanlegendgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'mastersiteplanlegendgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'mastersiteplanlegendformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'mastersiteplanlegendformsearch button[action=search]': {
				click: this.dataSearch
			},
			'mastersiteplanlegendformsearch button[action=reset]': {
				click: this.dataReset
			},
			'mastersiteplanlegendformdata': {
//				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataAfterRender
			},
			'mastersiteplanlegendformdata button[action=save]': {
				click: me.dataSave
			},
			'mastersiteplanlegendformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'mastersiteplanlegendgriddetail': {
//				afterrender: this.gridAfterRender,
//				itemdblclick: this.gridItemDblClick,
//				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridDetailSelectionChange
			},
			'mastersiteplanlegendgriddetail toolbar button[action=create]': {
				click: function () {
					me.formDataSiteplanLegendDetailShow('create');
				}
			},
			'mastersiteplanlegendgriddetail toolbar button[action=update]': {
				click: function () {
					me.formDataSiteplanLegendDetailShow('update');
				}
			},
			'mastersiteplanlegendgriddetail toolbar button[action=destroy]': {
				click: this.dataDetailDestroy
			},
			'mastersiteplanlegendformdatadetail': {
//				beforerender: this.formDataBeforeRender,
//				afterrender: this.formDataAfterRender
				afterrender: this.formDataDetailAfterRender
			},
			'mastersiteplanlegendformdatadetail [name=siteplanparameter_id]': {
				change: function (el) {
					var store = el.getStore();
					var index = store.findExact('siteplanparameter_id', el.getValue());
					var record = store.getAt(index);
//					console.log(record);
					if (record.get('operator') == 'comparison') {
						me.getFormdatadetail().down('[name=operator]').setVisible(true);
						me.getFormdatadetail().down('[name=value]').setVisible(true);
						me.getFormdatadetail().down('[name=relational_id]').setVisible(false);
						me.getFormdatadetail().down('[name=radiogroup_boolean]').setVisible(false);
					} else if (record.get('operator') == 'relational') {
						me.getFormdatadetail().down('[name=operator]').setVisible(false);
						me.getFormdatadetail().down('[name=value]').setVisible(false);
						me.getFormdatadetail().down('[name=relational_id]').setVisible(true);
						me.getFormdatadetail().down('[name=radiogroup_boolean]').setVisible(false);

						var storeRelational = me.getFormdatadetail().down('[name=relational_id]').getStore();
						storeRelational.getProxy().setExtraParam('relational_table', record.get('relational_table'));
						storeRelational.getProxy().setExtraParam('relational_field_id', record.get('relational_field_id'));
						storeRelational.getProxy().setExtraParam('relational_field_value', record.get('relational_field_value'));
						storeRelational.load();
					} else {
						me.getFormdatadetail().down('[name=operator]').setVisible(false);
						me.getFormdatadetail().down('[name=value]').setVisible(false);
						me.getFormdatadetail().down('[name=relational_id]').setVisible(false);
						me.getFormdatadetail().down('[name=radiogroup_boolean]').setVisible(true);
					}
				}

			},
			'mastersiteplanlegendformdatadetail button[action=save]': {
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
				me.getGriddetail().getStore().getProxy().setExtraParam('siteplanlegend_id', record.get('siteplanlegend_id'));
				me.getGriddetail().getStore().load();
				me.getFormdata().down('[name=file_svg]').allowBlank = true;
				/// update here
			}
		};
		return x;
	},
	formDataDetailAfterRender: function (el) {
		var me = this;
		me.storeProcess = me.createSpProcessObj(me.storeProcess);
		me.fdar().init();
		me.getFormdatadetail().down('[name=siteplanparameter_id]').getStore().load();
		var state = el.up('window').state;
		if (state == 'create') {
		} else if (state == 'update') {
			var griddetail = me.getGriddetail();
			var store = griddetail.getStore();
			var record = store.getAt(store.indexOf(griddetail.getSelectionModel().getSelection()[0]));
			me.getFormdatadetail().loadRecord(record);
//			console.log(record);
//			me.getFormdatadetail().down('[name=hargatanah_permeter_start]').setValuem((record.get('hargatanah_permeter_start') > 0 ? record.get('hargatanah_permeter_start') : 0))

		}
	},
	formDataSiteplanLegendDetailShow: function (state) {
		var me = this;
		//var state = 'create';//action == me.bindPrefixName + 'Create' ? 'create' : 'update';
		switch (state) {
			case 'create':
				formtitle = 'Create Detail Siteplan Legend';
				formicon = 'icon-form-add';
				var griddetail = me.getGriddetail();
				var store = griddetail.getStore();
				var lastRecord = store.getAt((store.getCount() - 1));
				if (typeof lastRecord != "undefined") {
					me.beforeHargaTanahEnd = lastRecord.get('hargatanah_permeter_end');
				}
				break;
			case 'update':
				formtitle = 'Edit Detail Siteplan Legend';
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
				width: 450,
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
				var store = me.getFormdatadetail().down('[name=siteplanparameter_id]').getStore();
				var index = store.findExact('siteplanparameter_id', me.getFormdatadetail().down('[name=siteplanparameter_id]').getValue());
				var record = store.getAt(index);
				var operator, value, value_display;
				if (record.get('operator') == 'comparison') {
					operator = fields.operator;
					value = fields.value;
					value_display = '<b>' + value + '</b>';
				} else if (record.get('operator') == 'relational') {
					operator = '';
					value = fields.relational_id;
					value_display = '<b>' + me.getFormdatadetail().down('[name=relational_id]').getRawValue() + '</b>';
				} else {
					operator = '';
					value = fields.radio_boolean;
					value_display = value == 1 ? '<b>Yes</b>' : '<b>No</b>';
				}
				var display_rule = me.getFormdatadetail().down('[name=siteplanparameter_id]').getRawValue() + ' ' + operator + ' ' + value_display
				if (state == "update") {
					storeGrid = me.getGriddetail().getStore().getAt(me.getGriddetail().getSelectedRow());
					storeGrid.set('siteplanparameter_id', fields.siteplanparameter_id);
					storeGrid.set('operator', operator);
					storeGrid.set('value', value);
					storeGrid.set('value_display', value_display);
					storeGrid.set('display_rule', display_rule);
				} else {
					myStore.add({
						siteplanparameter_id: fields.siteplanparameter_id,
						operator: operator,
						value: value,
						value_display: value_display,
						display_rule: display_rule,
						deleted: 0
					});
				}
//				console.log(myStore);
//				return true;
				me.getFormdatadetail().up('window').close();
			}
		}
	},
	uploadFile: function (params) {
		var me = this;
		var form = me.getFormdata().getForm();
		var callback = params.callback;
//		alert('erems/' + me.controllerName + '/read');
//		return false;
		var filesize = 0;
		var filedoc = document.getElementsByName("file_svg")[0];
		if (filedoc != null)
			filesize = filedoc.files[0].size;
		if (filesize > 0 && filesize <= 5242880) //filesize max 5MB
		{

			form.submit({
				clientValidation: false,
				url: 'erems/' + me.controllerName + '/read',
				params: {mode: 'upload'},
				waitMsg: 'Uploading file...',
				success: function (f, a) {
					console.log(a);
					var icon = Ext.Msg.INFO;
					var msg = 'File Uploaded';
					if (!a.result.success) {
						icon = Ext.Msg.ERROR;
						msg = a.result.msg;
					} else {
						callback.success(a.result.msg);
					}
				},
				failure: function (f, a) {
					console.log(a);
					callback.failure();
					var msg = "...";
					if (typeof a.result !== "undefined") {
						msg = a.result.msg;
					} else {
						msg = "Please complete all the required field";
					}
					Ext.Msg.show({
						title: 'Fail',
						msg: msg,
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			});
		} else {
			var msg = "File upload maximum 5 MB";
			Ext.Msg.show({
				title: 'Fail',
				msg: msg,
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK
			});
		}
	},
	dataSave: function () {
		var me = this;
		var form = me.getFormdata().getForm();
		if (form.isValid()) {
			Ext.Msg.confirm('Save Data', 'Save Master Siteplan Legend?', function (btn) {
				if (btn == 'yes') {
					if (me.getFormdata().down('[name=file_svg]').getValue() == "") {
						var store = me.getGriddetail().getStore();
						me.dataSaveConfirm(store, "");
					} else {
						me.uploadFile({
							callback: {
								success: function (svgName) {
									var store = me.getGriddetail().getStore();
									me.dataSaveConfirm(store, svgName);
								},
								failure: function () {

								}
							}
						});
					}
				}
			});
		}

	},
	dataSaveConfirm: function (store, svgName) {
		var me = this;
		store.clearFilter(true);
		var data = [];
		var rangeValid = true;
		for (var i = 0; i < store.getCount(); i++) {
			store.each(function (record, idx) {
				if (i == idx) {
					data[i] = record.data;
				}
			});
		}

		if (rangeValid) {
			var fields = me.getFormdata().getValues();
			var myObj = {
				siteplanlegend_id: fields.siteplanlegend_id,
				file_svg: svgName,
				prefixcode_svg: fields.prefixcode_svg,
				legendid_svg: fields.legendid_svg,
				color: fields.color,
				description: fields.description,
				data_detail: data
			}

			resetTimer();
			me.getFormdata().up('window').body.mask('Saving, please wait ...');
			Ext.Ajax.request({
				url: 'erems/mastersiteplanlegend/create',
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
						if (rows[i].get('siteplanlegenddetail_id') == 0) {
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
						success: function (s) {
							var res = Ext.decode(s.operations[0].response.responseText).total[0] == undefined ? 1 : 0;
							if (res == 0) {
								me.getGrid().up('window').unmask();
								store.un('beforesync', msg);
								store.reload();
								Ext.Msg.show({
									title: 'Failure',
									msg: failmsg + ' <br/>The data may have been used.',
									icon: Ext.Msg.ERROR,
									buttons: Ext.Msg.OK
								});
							} else {
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
						failure: function () {
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