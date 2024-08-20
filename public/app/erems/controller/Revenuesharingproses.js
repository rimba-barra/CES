Ext.define('Erems.controller.Revenuesharingproses', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Revenuesharingproses',
	views: ['revenuesharingproses.Panel', 'revenuesharingproses.Grid', 'revenuesharingproses.FormSearch', 'revenuesharingproses.FormData', 'revenuesharingproses.FormPrintout'],
	requires: [
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Clustercombobox'
	],
	stores: ['Revenuesharingproses', 'Revenuesharingprosesdate', 'Revenuesharingprosesdetail', 'Masterparameterglobal', 'Mastercluster', 'Masterblock'],
	models: ['Revenuesharingproses', 'Revenuesharingprosesdate', 'Revenuesharingprosesdetail', 'Masterparameterglobal', 'Mastercluster', 'Masterblock'],
	refs: [
		{
			ref: 'grid',
			selector: 'revenuesharingprosesgrid'
		},
		{
			ref: 'formsearch',
			selector: 'revenuesharingprosesformsearch'
		},
		{
			ref: 'formdata',
			selector: 'revenuesharingprosesformdata'
		},
		{
			ref: 'formprintout',
			selector: 'revenuesharingprosesformprintout'
		},
		{
			ref: 'detailgrid',
			selector: 'revenuesharingprosesdetailgrid'
		},
		{
			ref: 'detailgridprosesdate',
			selector: 'revenuesharingprosesdategrid'
		},
	],
	controllerName: 'revenuesharingproses',
	fieldName: 'code',
	bindPrefixName: 'Revenuesharingproses',
	formWidth: 350,
	nomorValue: 1,
	deleteRS: 0,
	//project_name: null,
	//pt_name: null,
	init: function (application) {
		var me = this;
		this.control({
			'revenuesharingprosespanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'revenuesharingprosesgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'revenuesharingprosesgrid toolbar button[action=new_process]': {
				click: function () {
					me.formDataShowProcess('new_process');
				}
			},
			'revenuesharingprosesgrid toolbar button[action=pre_process]': {
				click: function () {
					me.formDataShowProcess('pre_process');
				}
			},
			'revenuesharingprosesgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'revenuesharingprosesgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'revenuesharingprosesgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'revenuesharingprosesformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'revenuesharingprosesformsearch button[action=search]': {
				click: this.dataSearch
			},
			'revenuesharingprosesformsearch button[action=reset]': {
				click: this.dataReset
			},
			'revenuesharingprosesformdata': {
				afterrender: this.formDataAfterRender
			},
			'revenuesharingprosesformdata button[action=save]': {
				click: function (el) {
					this.dataSave(el);
				}
			},
			'revenuesharingprosesformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'revenuesharingprosesdategrid': {
				afterrender: this.gridprosesdateAfterRender,
				/* itemdblclick: this.gridItemDblClick,
				 itemcontextmenu: this.gridItemContextMenu,*/
				selectionchange: this.gridprosesdateSelectionChange
			},
			'revenuesharingprosesdategrid toolbar button[action=print]': {
				click: function (el) {
					me.formDataPrintout();
//					this.docPrintExcel(el)
				}
			},
//			'revenuesharingprosesdategrid toolbar button[action=destroy]': {
//				click: function (el) {
//					alert("ASASA");
//					me.formDataPrintout();
//					this.docPrintExcel(el)
//				}
//			},
			'revenuesharingprosesdetailgrid': {
				afterrender: this.gridprosesdetailAfterRender,
				/* itemdblclick: this.gridItemDblClick,
				 itemcontextmenu: this.gridItemContextMenu,
				 selectionchange: this.gridSelectionChange */
			},
			'revenuesharingprosesformprintout button[action=print]': {
				click: function (el) {
					this.docPrintOut(el)
				}
			}
		});
	},

	panelAfterRender: function (configs) {
		var me = this;
		Ext.Ajax.request({
			url: 'erems/revenuesharingproses/read/?action=schema',
			params: {
				read_type_mode: 'deleteRS'
			},
			success: function (response) {
				var resp = Ext.JSON.decode(response.responseText);
				me.deleteRS = resp.deleteRS;
			}
		})
	},
	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		// grid.down('#btnEdit').setDisabled(row.length != 1);
		// grid.down('#btnDelete').setDisabled(row.length < 1);

		if (row[0]) {
			var store = me.getDetailgrid().getStore();
			//store.removeAll();
			store.getProxy().setExtraParam('unit_id', row[0].data.unit_id);
			store.getProxy().setExtraParam('purchaseletter_id', row[0].data.purchaseletter_id);
			store.getProxy().setExtraParam('revenuesharing_id', 0);
			store.loadPage(1);
		}
	},

	gridprosesdateAfterRender: function () {
		var me = this;

		var store = me.getDetailgridprosesdate().getStore();
		store.loadPage(1);
	},

	gridprosesdetailAfterRender: function () {
		var me = this;

		var store = me.getDetailgrid().getStore();
		store.getProxy().setExtraParam('unit_id', 0);
		store.getProxy().setExtraParam('purchaseletter_id', 0);
		store.getProxy().setExtraParam('revenuesharing_id', 0);
		store.loadPage(1);
	},

	gridprosesdateSelectionChange: function () {
		var me = this;
		var grid = me.getDetailgridprosesdate(), row = grid.getSelectionModel().getSelection();
		var indexOf = grid.getStore().indexOf(row[0]);

		grid.down('#btnDestroy').setDisabled(true);
		if (indexOf < 1 && me.deleteRS > 0) {
			grid.down('#btnDestroy').setDisabled(false);
		}
		grid.down('#btnPrint').setDisabled(row.length != 1);

		if (row[0]) {
			var revenuesharing_id = row[0].data.revenuesharing_id;
			var store = me.getDetailgrid().getStore();
			//store.removeAll();
			store.getProxy().setExtraParam('unit_id', 0);
			store.getProxy().setExtraParam('purchaseletter_id', 0);
			store.getProxy().setExtraParam('revenuesharing_id', revenuesharing_id);
			store.loadPage(1);
		}
	},

	formDataAfterRender: function (el) {
		var me = this;
		me.storeProcess = me.createSpProcessObj(me.storeProcess);
		me.fdar().init();

		me.loadComboBoxStore(el);
		var state = el.up('window').state;

		if (state == 'new_process') {
			me.getFormdata().down('[name=process_date]').labelEl.update('Process Date <sup style="color:rgb(255,0,0);font-size:0.8em;" class="x-required">*</sup>');
		} else if (state == 'pre_process') {
			me.getFormdata().down('[name=process_date]').labelEl.update('Pre Process Date <sup style="color:rgb(255,0,0);font-size:0.8em;" class="x-required">*</sup>');
		}
	},

	formDataShowProcess: function (state) {
		var me = this;
		var formtitle, formicon;

		switch (state) {
			case 'new_process':
				formtitle = 'New Process';
				formicon = 'icon-form-add';
				break;
			case 'pre_process':
				formtitle = 'Pre Process';
				formicon = 'icon-form-edit';
				break;
		}

		var winId = 'win-revenuesharingprosesformdata';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: false,
				width: me.formWidth,
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
							win.add(Ext.create('Erems.view.' + me.controllerName + '.FormData'));
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
	formDataPrintout: function (state) {
		var me = this;
		var formtitle, formicon;

		formtitle = 'Print Out';
		formicon = 'icon-form-info';

		var winId = 'win-revenuesharingprosesformprintout';
		var win = desktop.getWindow(winId);
		if (!win) {
			win = desktop.createWindow({
				id: winId,
				title: formtitle,
				iconCls: formicon,
				resizable: false,
				minimizable: false,
				maximizable: false,
				width: me.formWidth,
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
							win.add(Ext.create('Erems.view.' + me.controllerName + '.FormPrintout'));
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

	dataSave: function (el) {
		var me = this;
		var state = me.getFormdata().up('window').state.toLowerCase();
		var form = me.getFormdata().getForm();
		if (state == 'new_process') {
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
				//var store = me.getGrid().getStore();
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
						console.log(store);
					} else {
						store = me.storeProcess;
					}

				}

				var msg = function () {
					me.getFormdata().up('window').body.mask('Saving data, please wait ...');
				};
				switch (me.getFormdata().up('window').state.toLowerCase()) {
					case 'new_process':
						store.add(fida);
						addingRecord = true;
						break;
//					case 'update':
//						var idProperty = store.getProxy().getReader().getIdProperty();
//						var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
//						rec.beginEdit();
//						rec.set(fida);
//						rec.endEdit();
//						break;
					default:
						return;
				}

				var storeDetailgrid = me.getDetailgrid().getStore();
				var storeDetailgridProsesdate = me.getDetailgridprosesdate().getStore();

				store.on('beforesync', msg);
				store.sync({
					success: function () {
						me.getFormdata().up('window').body.unmask();
						store.un('beforesync', msg);
						store.reload();
						storeDetailgrid.reload();
						storeDetailgridProsesdate.reload();

						/*if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
						 Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
						 }*/
						Ext.Msg.show({
							title: 'Success',
							msg: 'Data saved successfully.',
							icon: Ext.Msg.INFO,
							buttons: Ext.Msg.OK,
							fn: function () {
								me.formDataClose();
							}
						});
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
			}
		} else {
			if (form.isValid()) {
				me.docPrintExcel(el);
			}
		}
	},

	docPrintExcel: function (el) {
		var me = this;
		var fields = me.getFormdata().getValues();
		el.up('window').body.mask('Creating Excel File, Please Wait...');
		Ext.Ajax.timeout = 60000 * 30;
		Ext.Ajax.request({
			url: 'erems/revenuesharingproses/read/?action=schema',
			params: {
				read_type_mode: 'export_excel',
				doc_no: fields.doc_no,
				process_date: fields.process_date
			},
			success: function (response) {
				try {
					var resp = response.responseText;

					if (resp) {
						var info = Ext.JSON.decode(resp);

						if (info.success == true) {
							el.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Info',
								msg: '<a href="' + info.url + '" target="blank">Click Here For Download Excel File</a>',
								icon: Ext.Msg.INFO,
								//buttons: [], //jika ingin tidak ada buttons
								buttons: Ext.Msg.CANCEL,
								buttonText:
										{
											cancel: 'Close',
										}
							});
						} else {
							el.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Failure',
								msg: 'Error: Export to Excel Failed.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					}
				} catch (e) {
					//console.error(e);
					el.up('window').body.unmask();
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Export to Excel Failed.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			},
			failure: function (e) {
				//console.error(e);
				el.up('window').body.unmask();
				Ext.Msg.show({
					title: 'Failure',
					msg: 'Error: Export to Excel Failed.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
	},

	docPrintOut: function (el) {
		var me = this;
		var fields = me.getFormprintout().getValues();
		var grid = me.getDetailgridprosesdate().getSelectionModel().getSelection()[0].data;

		el.up('window').body.mask('Creating Excel File, Please Wait...');
		Ext.Ajax.timeout = 60000 * 30;
		Ext.Ajax.request({
			url: 'erems/revenuesharingproses/read/?action=schema',
			params: {
				read_type_mode: 'print_out',
				revenuesharing_id: grid.revenuesharing_id,
				process_date: grid.process_date,
				rg_print: fields.rg_print
			},
			success: function (response) {
				try {
					var resp = response.responseText;

					if (resp) {
						var info = Ext.JSON.decode(resp);

						if (info.success == true) {
							el.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Info',
								msg: '<a href="' + info.url + '" target="blank">Click Here For Download Excel File</a>',
								icon: Ext.Msg.INFO,
								//buttons: [], //jika ingin tidak ada buttons
								buttons: Ext.Msg.CANCEL,
								buttonText: {cancel: 'Close'}
							});
						} else {
							el.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Failure',
								msg: 'Error: Export to Excel Failed.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					}
				} catch (e) {
					//console.error(e);
					el.up('window').body.unmask();
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Export to Excel Failed.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			},
			failure: function (e) {
				//console.error(e);
				el.up('window').body.unmask();
				Ext.Msg.show({
					title: 'Failure',
					msg: 'Error: Export to Excel Failed.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
	},
	dataDestroy: function (el) {
		var me = this;
		var grid = me.getDetailgridprosesdate(), rows = grid.getSelectionModel().getSelection();

		if (rows.length < 1) {
			Ext.Msg.alert('Info', 'No record selected !');
			return;
		} else {
			var confirmmsg, successmsg, failmsg;
			var store = grid.getStore();
			var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('doc_no') + ']';
			confirmmsg = 'Delete RS ' + selectedRecord + ' ?';
			failmsg = 'Error: Unable to delete RS ' + selectedRecord + '.';

			Ext.Msg.confirm('Delete RS', confirmmsg, function (btn) {
				if (btn == 'yes') {
					resetTimer();
					var msg = function () {
						me.getGrid().up('panel').mask('Delete RS, please wait ...');
					};
					for (var i = 0; i < rows.length; i++) {
						store.remove(rows[i]);
					}

					store.on('beforesync', msg);
					store.sync({
						success: function (s) {
							me.getGrid().up('panel').unmask();
							var successmsg = 'Delete RS successfully.';
							store.un('beforesync', msg);
							store.reload();
							grid.down('#btnDestroy').setDisabled(true);

							Ext.Msg.show({
								title: 'Success',
								msg: successmsg,
								icon: Ext.Msg.INFO,
								buttons: Ext.Msg.OK
							});
						},
						failure: function () {
							me.getGrid().up('panel').unmask();
							store.un('beforesync', msg);
							store.reload();
							Ext.Msg.show({
								title: 'Failure',
								msg: failmsg,
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