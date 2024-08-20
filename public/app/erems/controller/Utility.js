Ext.define('Erems.controller.Utility', {
	extend: 'Erems.library.template.controller.Controller',
	alias: 'controller.Utility',
	views: ['utility.Panel', 'utility.Grid', 'utility.FormSearch', 'utility.FormData', 'utility.Utilitydetailgrid', 'utility.UtilitydetailFormData', 'utility.UtilityFormImport'],
	stores: ['Utility', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masterblock', 'Utilitydetail', 'Masterutilitytype', 'Masterutilitystatus', 'Mastercluster', 'Masterdata.store.City'],
	models: ['Utility', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masterblock', 'Utilitydetail', 'Masterutilitytype', 'Masterutilitystatus', 'Mastercluster', 'Masterdata.model.City'],
	refs: [
		{
			ref: 'grid',
			selector: 'utilitygrid'
		},
		{
			ref: 'formsearch',
			selector: 'utilityformsearch'
		},
		{
			ref: 'formdata',
			selector: 'utilityformdata'
		},
		{
			ref: 'detailgrid',
			selector: 'utilitydetailgrid'
		},
		{
			ref: 'formimport',
			selector: 'utilityformimport'
		},
		{
			ref: 'detailformdata',
			selector: 'utilitydetailformdata'
		}
	],
	comboBoxIdEl: ['fs_cluster_id', 'fs_block_id'/*,'fs_customer'*/],
	controllerName: 'utility',
	fieldName: 'utility_no',
	bindPrefixName: 'Utility',
	validationItems: [
		//{name:'purchaseletter_id',msg:'You must select Kavling / Unit No. first'}
	],
	validationItemsDetail: [
		//{name:'hgbinduk_id',msg:'You must select HGB Induk first'}
	],
	formWidth: 800,
	countLoadProcess: 0,
	init: function (application) {
		var me = this;
		this.control({
			test: me.eventMonthField,
			'utilitypanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender
			},
			'utilitygrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'utilitygrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'utilitygrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'utilitygrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'utilitygrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			//===== view
			'utilitygrid toolbar button[action=view]': {
				click: function () {
					this.formDataShow('view');
				}
			},
			'utilitygrid toolbar button[action=import]': {
				click: function () {
					var me = this;
					var formtitle, formicon;
					title = typeof title == 'undefined' ? 'Import Progress Utility' : title;
					id = typeof id == 'undefined' ? 'myInstantWindow' : id;
					state = typeof state == 'undefined' ? 'create' : state;
					panel = typeof panel == 'undefined' ? 'UtilityFormImport' : panel;
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
				}
			},
			//===== end view
			'utilitygrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'utilityformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'utilityformsearch button[action=search]': {
				click: this.dataSearch
			},
			'utilityformsearch button[action=reset]': {
				click: this.dataReset
			},
			'utilityformdata': {
				afterrender: this.formDataAfterRender,
				//removed: this.formDataClose
			},
			'utilityformdata button[action=save]': {
				click: this.dataSave
			},
			'utilityformdata button[action=cancel]': {
				click: this.formDataClose
			},
			// GRID HGB / AJB -- START --
			'utilitydetailgrid': {
				itemdblclick: me.detailgridItemDblClick,
				selectionchange: me.detailgridSelectionChange
			},
			'utilitydetailgrid button[action=add_utility]': {
				click: function () {
					me.formDataUtilitydetailShow('create');
				}
			},
			'utilitydetailgrid button[action=edit_utility]': {
				click: function () {
					me.formDataUtilitydetailShow('update');
				}
			},
			'utilitydetailgrid button[action=view_utility]': {
				click: function () {
					me.formDataUtilitydetailShow('view');
				}
			},
			'utilitydetailformdata': {
				afterrender: me.utilitydetailformDataAfterRender
			},
			'utilitydetailformdata button[action=save]': {
				click: me.dataSaveDetail
			},
			'utilitydetailgrid toolbar button[action=delete_utility]': {
				click: me.dataDestroyDetail
			},
			'utilityformimport button[action=process]': {
				click: function () {
					me.processUpload();
				}
			},
			// GRID HGB / AJB -- END --
		});
	},
	panelAfterRender: function (el) {
		var me = this;
		setObject(el, function () {
			me.getGrid().down('#btnNew').setVisible(false);
			me.getGrid().down('#btnDelete').setVisible(false);
		});
	},
	specialRequest: function (store) {
		store.load({params: {param_spcreq: 'plUtility'}});
	},
	formDataAfterRender: function (el) {

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
		 } else if (state == 'update') {*/

		me.countLoadProcess = 0;
		me.getFormdata().up('window').body.mask('Loading data, please wait ...');
		var detailStore = me.getPurchaseletterdetailStore();
		var grid = me.getGrid();
		var store = grid.getStore();
		var form = me.getFormdata();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
		el.loadRecord(record);
		var temp_utility_id = me.randomString(20);
		var unitId = record.data.unit_unit_id;
		var total_payment = record.data.total_payment;
		form.down('[name=temp_utility_id]').setValue(temp_utility_id);
		form.down('[name=unit_id]').setValue(unitId);
		form.down('[name=total_payment]').setValue(me.fmb(total_payment));
		//display detail Utility Grid on form data
		var utilitydetailStore = me.getUtilitydetailStore();
		utilitydetailStore.removeAll();
		utilitydetailStore.load({params: {is_detail: 'yes', unit_id: unitId}});
		//}

		if (state == 'view') {
			form.down('#btnSave').setDisabled(true);
			me.getDetailgrid().down('#btnNews').setVisible(false);
			me.getDetailgrid().down('#btnEdit').setVisible(false);
			me.getDetailgrid().down('#btnDelete').setVisible(false);
		} else {
			me.getDetailgrid().down('#btnNews').setVisible(true);
			me.getDetailgrid().down('#btnEdit').setVisible(true);
			me.getDetailgrid().down('#btnDelete').setVisible(true);
		}
	},
	detailgridItemDblClick: function () {
		var me = this;
		me.formDataUtilitydetailShow('view');
	},
	detailgridSelectionChange: function () {
		var me = this;
		var grid = me.getDetailgrid(), row = grid.getSelectionModel().getSelection();
		grid.down('#btnEdit').setDisabled(row.length != 1);
		grid.down('#btnDelete').setDisabled(row.length < 1);
		grid.down('#btnView').setDisabled(row.length != 1);
	},
	dataSave: function () {
		var me = this;
		Ext.Msg.show({
			title: 'Success',
			msg: 'Data saved successfully.',
			icon: Ext.Msg.INFO,
			buttons: Ext.Msg.OK,
			fn: function () {
				me.getFormdata().up('window').close();
			}
		});
	},
	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		grid.down('#btnEdit').setDisabled(row.length != 1);
		grid.down('#btnDelete').setDisabled(row.length < 1);
		grid.down('#btnView').setDisabled(row.length != 1);
	},
	formDataShow: function (el, act, action) {
		var me = this;
		var formtitle, formicon;
		//var state = action == me.bindPrefixName + 'Create' ? 'create' : 'update';
		var state;
		if (action == me.bindPrefixName + 'Create') {
			state = 'create';
		} else if (action == me.bindPrefixName + 'Update') {
			state = 'update';
		} else {
			state = 'view';
		}

		switch (state) {
			case 'create':
				formtitle = 'Add New';
				formicon = 'icon-form-add';
				break;
			case 'update':
				formtitle = 'Edit';
				formicon = 'icon-form-edit';
				break;
			case 'view':
				formtitle = 'View';
				formicon = 'icon-form-edit';
				break;
		}

		var winId = 'win-holidayformdata';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: false,
				closable: false,
				width: me.formWidth,
				renderTo: Ext.getBody(),
				constrain: true,
				constrainHeader: false,
				modal: true,
				layout: 'fit',
				shadow: 'frame',
				shadowOffset: 10,
				border: false,
				//items: Ext.create('Erems.view.' + me.controllerName + '.FormData'),
				state: state,
				listeners: {
					boxready: function () {
						win.body.mask('Loading...');
						var tm = setTimeout(function () {
							win.add(Ext.create('Erems.view.' + me.controllerName + '.FormData'));
							win.center();
							win.body.unmask();
							clearTimeout(tm);
						}, 1000);
					}
				}

			});
		}
		win.show();
	},
	gridItemDblClick: function (el) {
		var me = this;
		me.formDataShow('view');
	},
	formDataClose: function () {
		var me = this;
		//update th_utility set deleted = 1 by temp_utility_id
		var formdata = me.getFormdata();
		temp_utility_id = formdata.down('[name=temp_utility_id]').getValue();
		var utilitydetailStore = me.getUtilitydetailStore();
		utilitydetailStore.removeAll();
		utilitydetailStore.load({params: {is_detail: 'yes', temp_utility_id: temp_utility_id},
			callback: function (sppjbrec) {
				if (sppjbrec) {
					for (var i = 0; i < sppjbrec.length; i++) {
						utilitydetailStore.remove(sppjbrec[i]);
					}
					utilitydetailStore.sync();
				}
			}});
		me.getFormdata().up('window').close();
	},
//============= GRID DETAIL =====================

	formDataUtilitydetailShow: function (state) {
		var me = this;
		//var state = 'create';//action == me.bindPrefixName + 'Create' ? 'create' : 'update';
		switch (state) {
			case 'create':
				formtitle = 'Create Progress Air dan Listrik';
				formicon = 'icon-form-add';
				break;
			case 'update':
				formtitle = 'Edit Progress Air dan Listrik';
				formicon = 'icon-form-edit';
				break;
			case 'view':
				formtitle = 'View Progress Air dan Listrik';
				formicon = 'icon-form-edit';
				break;
		}
		var winId = 'win-utilitydetailformdata';
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
							win.add(Ext.create('Erems.view.' + me.controllerName + '.UtilitydetailFormData'));
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
	utilitydetailformDataAfterRender: function (el) {
		var me = this;
		var state = el.up('window').state;
		var formdata = me.getFormdata();
		unitId = formdata.down('[name=unit_id]').getValue();
		temp_utility_id = formdata.down('[name=temp_utility_id]').getValue();
		purchaseletter_id = formdata.down('[name=purchaseletter_id]').getValue();
		var formdetail = me.getDetailformdata();
		formdetail.down('[name=unit_id]').setValue(unitId);
		formdetail.down('[name=temp_utility_id]').setValue(temp_utility_id);
		formdetail.down('[name=purchaseletter_id]').setValue(purchaseletter_id);
		var ftStore = null;
		ftStore = el.down('#fd_utilitytype_id').getStore();
		ftStore.load();
		ftStore = el.down('#fd_utilitystatus_id').getStore();
		ftStore.load();
		if (state == 'create') {
			// el.down('#active').setValue(1);
		} else if (state == 'update' || state == 'view') {

			var grid = me.getDetailgrid();
			var store = grid.getStore();
			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);
			formdetail.down('[name=is_detail]').setValue('yes');
			var utilityID = record.data.utility_id; //console.log(hgbindukID);

			if (state == 'view') {
				me.disableDetailForm();
				formdetail.down('#btnSave').setDisabled(true);
			}
		}
	},
	dataSaveDetail: function () {
		var me = this;
		var form = me.getDetailformdata().getForm();
		var addingRecord = false;
		if (!me.finalValidationDetail()) {
			return false;
		}
		if (form.isValid()) {

			resetTimer();
			var store = null;
			if (me.instantCreateMode) {

				store = _Apps.getController(me.callerId).getInstanCreateStorex(me.controllerName);
			} else {
				store = me.getDetailgrid().getStore();
			}
			var fida = me.getFinalData(form.getValues());
			var msg = function () {
				me.getDetailformdata().up('window').body.mask('Saving data, please wait ...');
			};
			switch (me.getDetailformdata().up('window').state.toLowerCase()) {
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
				success: function () {
					me.getDetailformdata().up('window').body.unmask();
					store.un('beforesync', msg);
					store.reload({params: {is_detail: 'yes', unit_id: fida.unit_id}});
					if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
						Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 25}});
					}
					Ext.Msg.show({
						title: 'Success',
						msg: 'Data saved successfully.',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							//me.formDataClose();
							me.getDetailformdata().up('window').close();
						}
					});
				},
				failure: function () {
					me.getDetailformdata().up('window').body.unmask();
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
		}
	},
	finalValidationDetail: function () {
		var me = this;
		if (me.validationItemsDetail.length == 0)
			return true;
		var erMsg = '[ER00] Unable to save data';
		erMsg = me.checkingValidationItemDetail();
		if (erMsg == 'OK')
			return true;
		Ext.Msg.show({
			title: 'Failure',
			msg: 'Error: ' + erMsg + '.',
			icon: Ext.Msg.ERROR,
			buttons: Ext.Msg.OK
		});
		return false;
	},
	checkingValidationItemDetail: function () {
		var me = this;
		var msg = 'OK';
		/* FORMAT ERROR = [ER_type_Error][field_no] message */
		/* [ER01] name undefined **/
		/* [ER02] message undefined **/
		/* [ER03] field form data not found **/

		var vi = me.validationItemsDetail;
		var elField = null;
		for (var i = 0; i < vi.length; i++) {
			if (vi[i].name == undefined) {
				return '[VI01][' + i + '] Unable to save data';
			}
			if (vi[i].msg == undefined) {
				return '[VI02][' + i + '] Unable to save data';
			}
			elField = me.getDetailformdata().down('[name=' + vi[i].name + ']');
			if (elField == undefined) {
				return '[VI03][' + i + '] Unable to save data';
			}

			if (elField.getValue() == null) {
				return vi[i].msg;
				// return '[VI04][' + i + '] Unable to save data';
			} else if (elField.getValue().length == 0) {
				return vi[i].msg;
			}
			if (vi[i].f != undefined) {
				if (vi[i].f == 'number') {
					if (toFloat(elField.getValue()) < 1) {
						return vi[i].msg;
					}
				}
			}
		}
		return msg;
	},
	dataDestroyDetail: function () {
		var me = this;
		var rows = me.getDetailgrid().getSelectionModel().getSelection();
		console.log(rows);
		if (rows.length < 1) {
			Ext.Msg.alert('Info', 'No record selected !');
			return;
		} else {
			var confirmmsg, successmsg, failmsg;
			var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
			var store = me.getDetailgrid().getStore();
			if (rows.length == 1) {
				var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('meter_no') + ']';
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
						me.getDetailgrid().up('window').mask('Deleting data, please wait ...');
					};
					for (var i = 0; i < rows.length; i++) {

						store.remove(rows[i]);
					}

					store.on('beforesync', msg);
					store.sync({
						success: function (s) {
							me.getDetailgrid().up('window').unmask();
							var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
							var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
							store.un('beforesync', msg);
							store.reload();
							if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
								Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 25}});
							}
							Ext.Msg.show({
								title: 'Success',
								msg: successmsg,
								icon: Ext.Msg.INFO,
								buttons: Ext.Msg.OK
							});
						},
						failure: function () {
							me.getDetailgrid().up('window').unmask();
							store.un('beforesync', msg);
							store.reload();
							Ext.Msg.show({
								title: 'Failure',
								msg: failmsg + ' The data may have been used.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					});
				}
			});
		}
	},
	randomString: function (string_length) {
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var randomstring = '';
		var charCount = 0;
		var numCount = 0;
		for (var i = 0; i < string_length; i++) {
			// If random bit is 0, there are less than 3 digits already saved, and there are not already 5 characters saved, generate a numeric value. 
			if ((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
				var rnum = Math.floor(Math.random() * 10);
				randomstring += rnum;
				numCount += 1;
			} else {
				// If any of the above criteria fail, go ahead and generate an alpha character from the chars string
				var rnum = Math.floor(Math.random() * chars.length);
				randomstring += chars.substring(rnum, rnum + 1);
				charCount += 1;
			}
		}
		return randomstring;
	},
	disableDetailForm: function () {
		var me = this;
		var dF = ['utilitytype_id', 'installment_no', 'meter_no', 'request_date', 'power', 'installment_date', 'utilitystatus_id', 'followup_date', 'note'];
		var f = me.getDetailformdata();
		for (var i = 0; i < dF.length; i++) {
			f.down('[name=' + dF[i] + ']').setReadOnly(true);
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

	processUpload: function () {
		var me = this;
		var form = me.getFormimport().getForm();
		var formVal = form.getValues();
		var msg = '';
//		form.down('[name=excel_filename]').getValue();
//			console.log(form.down('[name=excel_filename]').getValue());
//			console.log(form);
		if (form.isValid()) {
			console.log('erems/' + me.controllerName + '/uploadfiles');
			form.submit({
				url: 'erems/' + me.controllerName + '/uploadfiles',
//				waitMsg: 'Uploading file...',
				success: function (f, a) {
//					console.log(f);
					if (a.result.msg != "") {
						Ext.Msg.show({
							title: 'Success',
							msg: 'File Uploaded<br/><br/>Data pada baris ' + a.result.msg + ' tidak berhasil dimasukkan karena code tidak ditemukan dalam sistem.',
							icon: Ext.Msg.INFO,
							buttons: Ext.Msg.OK
						});
					} else {
						Ext.Msg.show({
							title: 'Success',
							msg: 'File Uploaded',
							icon: Ext.Msg.INFO,
							buttons: Ext.Msg.OK
						});
					}
				},
				failure: function (f, a) {
					Ext.Msg.show({
						title: 'Upload Failed',
						msg: a.result.msg,
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK
					});
				}
			});
		}
	},
	/*dataReset: function() {
	 var me = this;
	 me.getFormsearch().getForm().reset();
	 
	 var el = me.getFormsearch();
	 el.down('#fs_cluster_id').setValue('');
	 
	 me.dataSearch();
	 },*/


});