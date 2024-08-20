Ext.define('Erems.controller.Purchaseletterrevision', {
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Purchaseletterrevision',
	views: [
		'purchaseletterrevision.Panel',
		'purchaseletterrevision.Grid',
		'purchaseletterrevision.FormSearch',
		'purchaseletterrevision.FormData',
		'purchaseletterrevision.RevisionHistoryGrid',
		'purchaseletterrevision.ChangePriceGrid',
		'purchaseletterrevision.ChangeNameGrid',
		'purchaseletterrevision.ChangeKavlingGrid',
		'gantinama.FormData',
		'changeprice.FormData',
		'pindahkavling.FormData'
	],
	stores: ['Mastercluster', 'Masterblock', 'Purchaseletterrevision', 'Purchaseletterrevisionhistory', 'Purchaseletterrevisionchangeprice', 'Purchaseletterrevisionchangename', 'Purchaseletterrevisionchangekavling'],
	models: ['Purchaseletterrevision', 'Purchaseletterrevisionhistory', 'Purchaseletterrevisionchangeprice', 'Purchaseletterrevisionchangename', 'Purchaseletterrevisionchangekavling'],
	refs: [
		{
			ref: 'grid',
			selector: 'purchaseletterrevisiongrid'
		},
		{
			ref: 'formsearch',
			selector: 'purchaseletterrevisionformsearch'
		},
		{
			ref: 'formdata',
			selector: 'purchaseletterrevisionformdata'
		},
		//GRID HISTORY
		{
			ref: 'revisionhistorygrid',
			selector: 'purchaseletterrevisionhistorygrid'
		},
		{
			ref: 'changepricegrid',
			selector: 'purchaseletterrevisionchangepricegrid'
		},
		{
			ref: 'changenamegrid',
			selector: 'purchaseletterrevisionchangenamegrid'
		},
		{
			ref: 'changekavlinggrid',
			selector: 'purchaseletterrevisionchangekavlinggrid'
		},
		//FORM DATA HISTORY
		{
			ref: 'changenameformdata',
			selector: 'gantinamaformdata'
		},
		{
			ref: 'changepriceformdata',
			selector: 'changepriceformdata'
		},
		{//detail grid on changeprice form data
			ref: 'schedulegrid',
			selector: 'purchaseletterschedulegrid'
		},
		{
			ref: 'pindahkavlingformdata',
			selector: 'pindahkavlingformdata'
		},
	],
	controllerName: 'purchaseletterrevision',
	fieldName: 'purchaseletter_no',
	bindPrefixName: 'Purchaseletterrevision',
	validationItems: [

	],

	formWidth: 800,
	countLoadProcess: 0,
	localStore: {
		detail: null,
		selectedUnit: null,
		customer: null
	},
	init: function (application) {
		var me = this;

		this.control({
			test: me.eventMonthField,
			'purchaseletterrevisionpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'purchaseletterrevisiongrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'purchaseletterrevisiongrid toolbar button[action=view]': {
				click: function () {
					this.formDataShow('view');
				}
			},
			'purchaseletterrevisiongrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'purchaseletterrevisionformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'purchaseletterrevisionformsearch button[action=search]': {
				click: this.dataSearch
			},
			'purchaseletterrevisionformsearch button[action=reset]': {
				click: this.dataReset
			},
			'purchaseletterrevisionformdata': {
				afterrender: this.formDataAfterRender
			},
			'purchaseletterrevisionformdata button[action=save]': {
				click: this.dataSave
			},
			'purchaseletterrevisionformdata button[action=cancel]': {
				click: this.formDataClose
			},

			/* Purchaseletter Revision History */
			//GRID HISTORY
			'purchaseletterrevisionhistorygrid': {
				selectionchange: this.gridHistorySelectionChange
			},
			//GRID CHANGE PRICE
			'purchaseletterrevisionchangepricegrid': {
				selectionchange: this.gridChangePriceSelectionChange
			},
			//GRID CHANGE NAME
			'purchaseletterrevisionchangenamegrid': {
				selectionchange: this.gridChangeNameSelectionChange
			},
			//GRID CHANGE KAVLING
			'purchaseletterrevisionchangekavlinggrid': {
				selectionchange: this.gridChangeKavlingSelectionChange
			},

			//CHANGE NAME FORM DATA
			'purchaseletterrevisionchangenamegrid toolbar button[action=viewrevisionchangename]': {
				click: function () {
					this.formDataShowModify('view_purchaseletter_revision', 'win-gantinamaformdata', 'gantinama');
				}
			},
			'gantinamaformdata': {
				afterrender: this.formDataGantiNamaAfterRender
			},

			//CHANGE PRICE FORM DATA
			'purchaseletterrevisionchangepricegrid toolbar button[action=viewrevisionchangeprice]': {
				click: function () {
					this.formDataShowModify('view_purchaseletter_revision', 'win-gantihargaformdata', 'changeprice');
				}
			},
			'changepriceformdata': {
				afterrender: this.formDataGantiHargaAfterRender
			},

			//CHANGE KAVLING FORM DATA
			'purchaseletterrevisionchangekavlinggrid toolbar button[action=viewrevisionchangekavling]': {
				click: function () {
					this.formDataShowModify('view_purchaseletter_revision', 'win-gantikavlingformdata', 'pindahkavling');
				}
			},
			'pindahkavlingformdata': {
				afterrender: this.formDataGantiKavlingAfterRender
			},
			/* end Purchaseletter Revision History */
		});
	},

	/*checkAllDetailLoadingProcess: function() {
	 var me = this;
	 if (me.countLoadProcess === 4) {
	 me.getFormdata().up('window').body.unmask();
	 }
	 },*/

	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		grid.down('#btnView').setDisabled(row.length != 1);
	},

	//KLIK GRID HISTORY
	gridHistorySelectionChange: function () {
		var me = this;
		var grid = me.getRevisionhistorygrid(), row = grid.getSelectionModel().getSelection();
		grid.down('#btnView').setDisabled(row.length != 1);
	},
	//KLIK GRID CHANGE PRICE HISTORY 
	gridChangePriceSelectionChange: function () {
		var me = this;
		var grid = me.getChangepricegrid(), row = grid.getSelectionModel().getSelection();
		grid.down('#btnView').setDisabled(row.length != 1);
	},
	//KLIK GRID CHANGE NAME HISTORY
	gridChangeNameSelectionChange: function () {
		var me = this;
		var grid = me.getChangenamegrid(), row = grid.getSelectionModel().getSelection();
		grid.down('#btnView').setDisabled(row.length != 1);
	},
	//KLIK GRID CHANGE KAVLING HISTORY 
	gridChangeKavlingSelectionChange: function () {
		var me = this;
		var grid = me.getChangekavlinggrid(), row = grid.getSelectionModel().getSelection();
		grid.down('#btnView').setDisabled(row.length != 1);
	},

	gridActionColumnClick: function (view, cell, row, col, e) {
		var me = this;
		var record = me.getGrid().getStore().getAt(row);
		var m = e.getTarget().className.match(/\bact-(\w+)\b/);
		me.getGrid().getSelectionModel().select(row);

		if (m) {
			switch (m[1]) {
				case 'view':
					me.formDataShow('view');
					break;
			}
		}
	},

	formDataAfterRender: function (el) {

		var me = this;
		me.loadComboBoxStore(el);
		var state = el.up('window').state;


		if (state == 'create') {
			// el.down('#active').setValue(1);
			//me.getFormdata().down('#btnSave').setDisabled(false);
		} else if (state == 'update' || state == 'read') {

			me.countLoadProcess = 0;
			me.getFormdata().up('window').body.mask('Loading data, please wait ...');

			var grid = me.getGrid();
			var store = grid.getStore();
			var form = me.getFormdata();

			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);

			var purchaseletterrevisionhistoryStore = me.getPurchaseletterrevisionhistoryStore();
			purchaseletterrevisionhistoryStore.removeAll();
			purchaseletterrevisionhistoryStore.load({params: {purchaseletter_id: record.data.purchaseletter_id}});

			var purchaseletterrevisionchangepriceStore = me.getPurchaseletterrevisionchangepriceStore();
			purchaseletterrevisionchangepriceStore.removeAll();
			purchaseletterrevisionchangepriceStore.load({params: {purchaseletter_id: record.data.purchaseletter_id}});

			var purchaseletterrevisionchangenameStore = me.getPurchaseletterrevisionchangenameStore();
			purchaseletterrevisionchangenameStore.removeAll();
			purchaseletterrevisionchangenameStore.load({params: {purchaseletter_id: record.data.purchaseletter_id}});

			var purchaseletterrevisionchangekavlingStore = me.getPurchaseletterrevisionchangekavlingStore();
			purchaseletterrevisionchangekavlingStore.removeAll();
			purchaseletterrevisionchangekavlingStore.load({params: {purchaseletter_id: record.data.purchaseletter_id}});
		}
	},

	//FORM DATA HISTORY
	formDataShowModify: function (action, winID, controllerName) {
		var me = this;
		var formtitle, formicon;

		var gfp = me.getFormProperties(action);

		var state = gfp.state;
		formtitle = gfp.formtitle;
		formicon = gfp.formicon;

		var winId = winID;
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
				listeners: {
					boxready: function () {
						win.body.mask('Loading...');
						var tm = setTimeout(function () {
							win.add(Ext.create('Erems.view.' + controllerName + '.FormData'));
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

	//FORM DATA AFTER RENDER CHANGE NAME
	formDataGantiNamaAfterRender: function (el) {
		var me = this;
		var state = el.up('window').state;

		if (state == 'view_purchaseletter_revision') {
			var f = me.getChangenameformdata();

			f.getForm().getFields().each(function (field) {
				field.setReadOnly(true);
			});
			f.down("button[action=browse_unit]").hide();
			f.down("button[action=create_new_customer]").hide();
			f.down("button[action=browse_customer]").hide();
			f.down('#photonew_image').next().hide();
			f.down("button[action=save]").hide();
			f.down("button[action=reject]").hide();
			f.down("button[action=approve]").hide();

			var changenameId = me.getChangenamegrid().getSelectedRecord().get("changename_id");

			Ext.Ajax.request({
				url: 'erems/purchaseletterrevision/readchangenamedetail', ///?action=schema
				params: {
					changename_id: changenameId
				},
				success: function (response) {
					try {
						var resp = response.responseText;

						if (resp) {
							var data = Ext.JSON.decode(resp);
							var fields = data.data[0];

							for (var i in fields) {
								var el = f.down("[name=" + i + "]");
								if (el) {
									el.setValue(fields[i]);
									if (i == 'reasonchgname_reasonchgname_id') {
										el.setValue(fields['reasonchgname']);
									}

								}
							}

							if (fields['customer_photo']) {
								f.down('#photo_image').el.setStyle({backgroundImage: 'url(app/erems/uploads/customer/' + fields['customer_photo'] + ')', backgroundSize: '150px 200px'});
							}
							if (fields['customernew_photo']) {
								f.down('#photonew_image').el.setStyle({backgroundImage: 'url(app/erems/uploads/customer/' + fields['customernew_photo'] + ')', backgroundSize: '150px 200px'});
							}

							return;
						}
					} catch (e) {
						console.error(e);
					}
				},
				failure: function (e) {
					console.error(e);
				}
			});
		}
	},

	//FORM DATA AFTER RENDER CHANGE PRICE
	formDataGantiHargaAfterRender: function (el) {
		var me = this;
		var state = el.up('window').state;

		if (state == 'view_purchaseletter_revision') {
			var f = me.getChangepriceformdata();

			f.getForm().getFields().each(function (field) {
				field.setReadOnly(true);
			});
			f.down("button[action=browse_unit]").hide();
			f.down("button[action=genschedule]").hide();
			f.down("button[action=save]").hide();
			f.down("button[action=reject]").hide();
			f.down("button[action=approve]").hide();

			f.down('#MyScheduleGrid').dockedItems.items[2].hide()
			f.down('#MyScheduleGrid').down('button[action=create]').hide();
			f.down('#MyScheduleGrid').down('button[action=destroy]').hide();
			f.down('#MyScheduleGrid').down('button[action=reschedule]').hide();

			var changepriceId = me.getChangepricegrid().getSelectedRecord().get("changeprice_id");

			Ext.Ajax.request({
				url: 'erems/purchaseletterrevision/readchangepricedetail',
				params: {
					changeprice_id: changepriceId
				},
				success: function (response) {
					try {
						var resp = response.responseText;

						if (resp) {
							var data = Ext.JSON.decode(resp);
							var fields = data.data[0];

							for (var i in fields) {
								var el = f.down("[name=" + i + "]");
								if (el) {
									el.setValue(fields[i]);
									if (i == 'bank_bank_name') {
										el.setValue(fields['bank_bank_id']);
									}
									if (i == 'bank_bank_id') {
										el.setValue(fields['bank_bank_name']);
									}
									if (i == 'billingrules_billingrules_id') {
										el.setValue(fields['billingrules_description']);
									}
									if (i == 'collector_employee_id') {
										el.setValue(fields['collector_employee_name']);
									}
									//console.log(i);
									//console.log(fields);

									if (i.indexOf("billingrules") != -1 || i.indexOf("harga") != -1) {
										if (isNaN(fields[i]) == false) {
											el.setValue(me.fmb(fields[i]));
										}
									}
								}
							}
							f.down("#purchaseletter_no_current_price").setValue(fields['purchaseletter_purchaseletter_no']);
							if (fields['customer_photo']) {
								f.down('#photo_image').el.setStyle({backgroundImage: 'url(app/erems/uploads/customer/' + fields['customer_photo'] + ')', backgroundSize: '150px 200px'});
							}

							var purchaseletterId = me.getChangepricegrid().getSelectedRecord().get("purchaseletter_id");

							var sg = me.getSchedulegrid();
							sg.doInit();
							var sgStore = sg.getStore().load({
								params: {
									//state:"load_default_attribute"
									purchaseletter_id: purchaseletterId
								},
								callback: function (rec, op) {

								}
							});

							return;
						}
					} catch (e) {
						console.error(e);
					}
				},
				failure: function (e) {
					console.error(e);
				}
			});
		}
	},

	//FORM DATA AFTER RENDER CHANGE KAVLING
	formDataGantiKavlingAfterRender: function (el) {
		var me = this;
		var state = el.up('window').state;

		if (state == 'view_purchaseletter_revision') {
			var f = me.getPindahkavlingformdata();

			f.getForm().getFields().each(function (field) {
				field.setReadOnly(true);
			});
			f.down("button[action=browse_unit]").hide();
			f.down("button[action=browse_unit_baru]").hide();
			f.down("button[action=create_new_customer]").hide();
			f.down("button[action=genschedule]").hide();

			f.down("button[action=save]").hide();
			f.down("button[action=reject]").hide();
			f.down("button[action=approve]").hide();

			f.down('#MyScheduleGrid').dockedItems.items[2].hide()
			f.down('#MyScheduleGrid').down('button[action=create]').hide();
			f.down('#MyScheduleGrid').down('button[action=destroy]').hide();
			f.down('#MyScheduleGrid').down('button[action=reschedule]').hide();

			var changekavlingId = me.getChangekavlinggrid().getSelectedRecord().get("changekavling_id");
			//console.log(changekavlingId);return;

			Ext.Ajax.request({
				url: 'erems/purchaseletterrevision/changekavlingdetail',
				params: {
					changekavling_id: changekavlingId
				},
				success: function (response) {
					try {
						var resp = response.responseText;

						if (resp) {
							var data = Ext.JSON.decode(resp);
							var fields = data.data[0];

							for (var i in fields) {
								var el = f.down("[name=" + i + "]");
								if (el) {
									el.setValue(fields[i]);
									if (i == 'bank_bank_name') {
										el.setValue(fields['bank_bank_id']);
									}
									if (i == 'bank_bank_id') {
										el.setValue(fields['bank_bank_name']);
									}
									if (i == 'billingrules_billingrules_id') {
										el.setValue(fields['billingrules_description']);
									}
									if (i == 'collector_employee_id') {
										el.setValue(fields['collector_employee_name']);
									}
									if (i == 'reasonchgkavling_id') {
										el.setValue(fields['reasonchgkavling']);
									}
									//console.log(i);
									//console.log(fields);

									if (i.indexOf("billingrules") != -1 || i.indexOf("harga") != -1) {
										if (isNaN(fields[i]) == false) {
											el.setValue(me.fmb(fields[i]));
										}
									}
								}
							}

							if (fields['customer_photo']) {
								f.down('#photo_image').el.setStyle({backgroundImage: 'url(app/erems/uploads/customer/' + fields['customer_photo'] + ')', backgroundSize: '150px 200px'});
							}



							var purchaseletterId = me.getChangekavlinggrid().getSelectedRecord().get("purchaseletter_new_id");

							var sg = me.getSchedulegrid();
							var sgStore = sg.getStore().load({
								params: {
									purchaseletter_id: purchaseletterId
								},
								callback: function (rec, op) {
									sg.attachModel(op);
								}
							});

							return;
						}
					} catch (e) {
						console.error(e);
					}
				},
				failure: function (e) {
					console.error(e);
				}
			});
		}
	},

	isNumeric: function (n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
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
	}

});