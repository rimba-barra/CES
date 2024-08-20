Ext.define('Erems.controller.Writeoffdenda', {
	extend: 'Erems.library.template.controller.Controlleralt', //Controller
	alias: 'controller.Writeoffdenda',
	requires: ['Erems.library.DetailtoolAll'],
	views: ['writeoffdenda.Panel', 'writeoffdenda.Grid', 'writeoffdenda.FormSearch', 'writeoffdenda.FormData', 'writeoffdenda.DetailGrid', 'writeoffdenda.FormDataDetail', 'writeoffdenda.FormDataDetail2', 'writeoffdenda.DetailGrid2'],
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Unitcombobox',
		'Erems.library.DetailtoolAll'
	],
	stores: ['Unit', 'Mastercluster', 'Masterblock', 'Writeoffdenda', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masterblock', 'Writeoffdendadetail', 'Writeoffdendascheduledetail'],
	models: ['Writeoffdenda', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masterblock', 'Writeoffdendadetail', 'Writeoffdendascheduledetail'],
	detailTool: null,
	detailTool2: null,
	selected_pl_id: 0,
	refs: [
		{
			ref: 'grid',
			selector: 'writeoffdendagrid'
		},
		{
			ref: 'formsearch',
			selector: 'writeoffdendaformsearch'
		},
		{
			ref: 'formdata',
			selector: 'writeoffdendaformdata'
		},
		{
			ref: 'detailgrid',
			selector: 'writeoffdendadetailgrid'
		},
		{
			ref: 'formdatadetail',
			selector: 'writeoffdendaformdatadetail'
		},
		{
			ref: 'formdatadetail2',
			selector: 'writeoffdendaformdatadetail2'
		},
		{
			ref: 'detailgrid2',
			selector: 'writeoffdendadetailgrid2'
		}
	],
	controllerName: 'writeoffdenda',
	fieldName: 'writeoff_no',
	bindPrefixName: 'Writeoffdenda',
	validationItems: [
		{name: 'purchaseletter_id', msg: 'You must select Kavling / Unit No. first'}
	],
	formWidth: 800,
	countLoadProcess: 0,
	verification_approval: 0,
	isUsedVerification: 0,
	schedule_select: null,
	writeoff_approval: 0, // added by rico 15082023
	init: function (application) {
		var me = this;

		this.control({
			test: me.eventMonthField,
			'writeoffdendapanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender
			},
			'writeoffdendagrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'writeoffdendagrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'writeoffdendagrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'writeoffdendagrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'writeoffdendagrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'writeoffdendaformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'writeoffdendaformsearch button[action=search]': {
				click: this.dataSearch
			},
			'writeoffdendaformsearch button[action=reset]': {
				click: this.dataReset
			},
			'writeoffdendaformdata': {
				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataAfterRender
			},
			'writeoffdendaformdata button[action=save]': {
				click: this.dataSave
			},
			'writeoffdendaformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'writeoffdendaformdata button[action=browse_unit]': {
				click: me.selectUnitGridShow
			},
			'writeoffdendadetailgrid toolbar button[action=create]': {
				click: function () {
					me.detailTool.form().show('create', 600, 'Add Detail Write Off');
				}
			},
			'writeoffdendaformdatadetail': {
				afterrender: this.formDataDetailAfterRender
			},
			'writeoffdendaformdatadetail button[action=save]': {
				click: me.detailForm.save
			},
			'writeoffdendadetailgrid actioncolumn': {
				click: me.detailGrid.actionColumnClick
			},
			'writeoffdendaformdatadetail [name=writeoff]': {
				keyup: me.detailForm.fillAfterWriteOff
			},
			'writeoffdendaformdatadetail button[action=browse_schedule]': {
				click: function () {
					me.detailTool2.form().show('create', 700, 'Popup Schedule', 'FormDetail2');
				}
			},
			'writeoffdendaformdatadetail button[action=full_wo]': {
				click: function () {
					me.fullwo();
				}
			},
			'writeoffdendaformdatadetail2': {
				afterrender: this.formDataDetail2AfterRender
			},
			'writeoffdendadetailgrid2': {
				selectionchange: this.gridDetail2SelectionChange
			},
			'writeoffdendadetailgrid2 button[action=select]': {
				click: me.detailGrid2.selected
			},
		});
	},
	//=== browse purchase letter ====
	selectUnitGridShow: function () {
		var me = this;
		//_Apps.getController('Purchaseletter').browseItem('Writeoffdenda');
		_myAppGlobal.getController('Sppjb').ctrler = 'Writeoffdenda';
		_myAppGlobal.getController('Sppjb').spcreq = 'all';
		_myAppGlobal.getController('Sppjb').veriappr = me.verification_approval;
		_myAppGlobal.getController('Sppjb').writeoffappr = me.writeoff_approval; // added by rico 15082023
		_myAppGlobal.getController('Sppjb').vericode = 'WD';
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
		var plDetailStore = me.getPurchaseletterdetailStore();

		//inisial start form data awal biar pl nya default lg
		me.selected_pl_id = 0;

		//me.getFormdata().up('window').body.mask('Loading data...');
		plDetailStore.load({
			params: {mode_read: 'detail', purchaseletter_id: rows[0].get('purchaseletter_id')},
			callback: function (rec) {
				me.getFormdata().loadRecord(rec[0]);

				// load detail data
				var writeoffdendadetailStore = me.getWriteoffdendadetailStore();
				writeoffdendadetailStore.removeAll();
				//writeoffdendadetailStore.load({params: {writeoff_id: rec[0].get('writeoff_id')}});
			}
		});

		me.getDetailgrid().down('#btnNew').setDisabled(false);
	},
	//=== end browse purchase letter ===
	formDataBeforeRender: function (el) {
		var me = this;
		setupObject(el, me.execAction, me);
	},
	formDataAfterRender: function (el) {
		var me = this;
		me.loadComboBoxStore(el);
		var state = el.up('window').state;

		//show form add pencarian 
		me.detailTool = new Erems.library.DetailtoolAll();
		me.detailTool.setConfig({
			viewPanel: 'FormDataDetail',
			parentFDWindowId: me.getFormdata().up('window').id,
			controllerName: me.controllerName
		});
		me.detailTool.parentGridAlias = 'writeoffdendadetailgrid';
		//en show form
		Ext.Ajax.request({
			url: 'erems/cancellation/read',
			params: {read_type_mode: 'verification_approval'},
			success: function (response) {
				// start added by rico 15082023
				var resp = Ext.decode(response.responseText);

				me.verification_approval = resp[0].sh3b; 
				me.writeoff_approval = resp[0].writeoff;
				// end added by rico 15082023
			},
		});

		//inisial start form data awal biar pl nya default lg
		me.selected_pl_id = 0;
		if (state == 'create') {
			// el.down('#active').setValue(1);
			//me.getFormdata().down('#btnSave').setDisabled(false);

			var writeoffdendadetailStore = me.getWriteoffdendadetailStore();
			writeoffdendadetailStore.removeAll();
			//writeoffdendadetailStore.load({params: {writeoff_id: rec[0].get('writeoff_id')}});
		} else {
			me.countLoadProcess = 0;
			me.getFormdata().up('window').body.mask('Loading data, please wait ...');

			var grid = me.getGrid();
			var store = grid.getStore();
			var form = me.getFormdata();
			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

			el.loadRecord(record);

			// load purchase letter data
			var purchaseletterdetailStore = me.getPurchaseletterdetailStore();

			purchaseletterdetailStore.removeAll();
			purchaseletterdetailStore.load({
				params: {purchaseletter_id: record.data.purchaseletter_id, mode_read: 'detail'},
				callback: function (purchaselettedetailrec) {
					form.loadRecord(purchaselettedetailrec[0]);
					me.countLoadProcess += 1;
				}
			});
			//load detail grid
			var writeoffdendadetailStore = me.getWriteoffdendadetailStore();
			writeoffdendadetailStore.removeAll();
			writeoffdendadetailStore.load({params: {writeoff_id: record.data.writeoff_id}});

			form.down('#fd_browse_unit_btn').setDisabled(true);

			if (state == 'update') {
				me.getDetailgrid().down('#btnNew').setDisabled(false);
				form.down('#btnSave').setDisabled(true);
			} else if (state == 'read') {
				form.getForm().getFields().each(function (field) {
					field.setReadOnly(true);
				});
				me.getDetailgrid().getView().getHeaderCt().child('#actioncolumn').hide();
				form.down('#btnSave').setDisabled(true);
			}
		}
	},
	//==== Form Data Detail ==========
	formDataDetailAfterRender: function (el) {
		var me = this;
		var state = el.up('window').state;

		//show form add pencarian 
		me.detailTool2 = new Erems.library.DetailtoolAll();
		me.detailTool2.setConfig({
			viewPanel: 'FormDataDetail2',
			parentFDWindowId: me.getFormdatadetail().up('window').id,
			controllerName: me.controllerName
		});

		var purchaseLetterId = me.getFormdata().down('[name=purchaseletter_id]').getValue();
		me.getFormdatadetail().down('[name=purchaseletter_id]').setValue(purchaseLetterId);
	},
	detailForm: {
		editingIndexRow: 0,
		fillAfterWriteOff: function () {
			var me = this;
			var denda = accounting.unformat(me.getFormdatadetail().down('[name=denda]').getValue());
			var writeoff = accounting.unformat(me.getFormdatadetail().down('[name=writeoff]').getValue());

			if (writeoff) {
				var writeOffResult = denda - writeoff;
				me.getFormdatadetail().down('[name=after_writeoff]').setValue(me.fmb(writeOffResult));
			} else {
				me.getFormdatadetail().down('[name=after_writeoff]').setValue('');
			}

			if (writeoff > denda) {
				Ext.Msg.show({
					title: 'Failure',
					msg: 'Nilai Write Off tidak boleh lebih besar dari Nilai Denda',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK,
					fn: function () {
						me.getFormdatadetail().down('[name=writeoff]').setValue('');
						me.getFormdatadetail().down('[name=after_writeoff]').setValue('');
					}
				});
				return false;
			}
		},
		save: function () {
			var me = this;

			// console.log(me.schedule_select)

			var form = me.getFormdatadetail().getForm();
			var formVal = me.getFormdatadetail().getForm().getValues();

			var writeoffValue = formVal.writeoff;
			var after_writeoffValue = formVal.after_writeoff;

			var msg = '';
			if (!formVal.schedule_id) {
				Ext.Msg.show({
					title: 'Alert',
					msg: 'Schedule must be selected',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK,
					fn: function () {}
				});
				return false;
			} else if (writeoffValue == 0 || writeoffValue == '') {
				Ext.Msg.show({
					title: 'Alert',
					msg: 'Write Off should be filled',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK,
					fn: function () {}
				});
				return false;
			} else {
				if (form.isValid()) {
					var win = me.getFormdatadetail().up('window');
					var dStore = me.getDetailgrid().getStore();
					var total_wo = 0;

					for (var i = 0; i < me.schedule_select.length; i++) {
						var rec = me.schedule_select[i].data;

						total_wo += parseFloat(rec.remaining_denda);

						var sisa_wo = parseFloat(accounting.unformat(writeoffValue)) - parseFloat(total_wo);


						var nilai_wo = rec.remaining_denda;

						var after_writeoff = 0;
						if (sisa_wo < 0) {
							sisa_wo = sisa_wo * (-1);
							nilai_wo = nilai_wo - sisa_wo;
							after_writeoff = sisa_wo;
						}

						if (nilai_wo > 0) {
							if (win.state == 'create') {
								dStore.add({
									writeoffdetail_id: formVal.writeoffdetail_id,
									writeoff_id: formVal.writeoff_id,
									schedule_id: rec.schedule_id,
									description: rec.description,
									scheduletype: rec.scheduletype,
									denda: toFloat(rec.denda),
									remaining_denda: toFloat(rec.remaining_denda),
									writeoff: toFloat(nilai_wo),
									after_writeoff: toFloat(after_writeoff)
								});
							} else {

							}

							/// update remaining dendanya di grid select schedule
							var writeoffdendascheduledetailStore = me.getWriteoffdendascheduledetailStore();
							var recordIndex = writeoffdendascheduledetailStore.find('schedule_id', rec.schedule_id);
							var recEdit = writeoffdendascheduledetailStore.getAt(recordIndex);

							recEdit.set("remaining_denda", toFloat(after_writeoff));
						}
					}

					// var val = {
					// 	writeoffdetail_id : formVal.writeoffdetail_id,
					// 	writeoff_id       : formVal.writeoff_id,
					// 	schedule_id       : formVal.schedule_id,
					// 	description       : formVal.description,
					// 	scheduletype      : formVal.scheduletype,
					// 	denda             : toFloat(formVal.denda),
					// 	remaining_denda   : toFloat(formVal.remaining_denda),
					// 	writeoff          : toFloat(formVal.writeoff),
					// 	after_writeoff    : toFloat(formVal.after_writeoff)
					// };

					// if (win.state == 'create') {
					// 	dStore.add(val);
					// } 
					// else {
					// 	var rec = dStore.getAt(me.detailForm.editingIndexRow);
					// 	rec.beginEdit();
					// 	rec.set(val);
					// 	rec.endEdit();
					// }

					// var writeoffdendascheduledetailStore = me.getWriteoffdendascheduledetailStore();
					// var recordIndex                      = writeoffdendascheduledetailStore.find('schedule_id', formVal.schedule_id);
					// var recEdit                          = writeoffdendascheduledetailStore.getAt(recordIndex);

					// recEdit.set("remaining_denda", toFloat(formVal.after_writeoff));

					win.close();
				}
			}
		}
	},
	detailGrid: {
		actionColumnClick: function (view, cell, row, col, e) {
			var me = this;
			var gr = me.getDetailgrid();
			var record = gr.getStore().getAt(row);
			var m = e.getTarget().className.match(/\bact-(\w+)\b/);

			gr.getSelectionModel().select(row);

			if (m) {
				switch (m[1]) {
					case 'WriteoffdendadetailUpdate':
						me.detailTool.form().show('update', 600, 'Edit Detail Write Off');
						me.detailForm.editingIndexRow = row;

						var form = me.getFormdatadetail();

						form.loadRecord(record);

						form.down('[name=denda]').setValue(me.fmb(record.data.denda));
						form.down('[name=remaining_denda]').setValue(me.fmb(record.data.remaining_denda));
						form.down('[name=writeoff]').setValue(me.fmb(record.data.writeoff));
						form.down('[name=after_writeoff]').setValue(me.fmb(record.data.after_writeoff));
						form.down('#fd_browse_schedule_btn').setVisible(false);

						break;
					case 'WriteoffdendadetailDelete':
						var writeoffdendascheduledetailStore = me.getWriteoffdendascheduledetailStore();
						var recordIndex = writeoffdendascheduledetailStore.find('schedule_id', record.data.schedule_id);
						var recEdit = writeoffdendascheduledetailStore.getAt(recordIndex);

						if (recEdit.data == 'undefined') {
							Ext.Msg.show({
								title: 'Alert',
								msg: 'Schedule can\'t be deleted, please try again!',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK,
								fn: function () {}
							});
						} else {
							var writeOffDel = record.data.writeoff;
							var delWO = '';
							gr.getStore().each(function (recDetail, idx) {
								if (record.data.schedule_id == recDetail.get("schedule_id")) {
									if (idx == row) {
										delWO = recDetail.get("writeoff");
									} else if (idx > row) {
										var dendaDownNext = recDetail.get("denda");
										var writeoffDownNext = recDetail.get("writeoff");

										if (delWO) {
											var dendaAmountDown = dendaDownNext + delWO;
											var after_writeoffDown = dendaAmountDown - writeoffDownNext;
											recDetail.set("denda", toFloat(dendaAmountDown));
											recDetail.set("after_writeoff", toFloat(after_writeoffDown));
										}
									}
								}
							});

							record.set("deleted", true);
							gr.getStore().filterBy(function (recod) {
								return recod.data.deleted == false;
							});

							var remaining_dendaAdd = recEdit.data.remaining_denda;
							var remaining_dendaSum = remaining_dendaAdd + writeOffDel;

							/// update remaining dendanya di grid select schedule
							recEdit.set("remaining_denda", toFloat(remaining_dendaSum));
						}
						break;
				}
			}
		}
	},
	dataSave: function () {
		var me = this;
		var store = me.getDetailgrid().getStore();
		var fields = me.getFormdata().getValues();
		var pl_id = fields.purchaseletter_id;
		var countData = store.getCount();
		var msgErr;

		if (!pl_id) {
			msgErr = 'You must select Kavling / Unit No. first';
		} else if (countData <= 0) {
			msgErr = 'Please input Writeoff at least 1';
		}

		if (msgErr) {
			Ext.Msg.show({
				title: 'Failure',
				msg: 'Error: ' + msgErr,
				icon: Ext.Msg.ERROR,
				buttons: Ext.Msg.OK
			});
			return false;
		} else {
			store.clearFilter(true);
			//me.getFormdata().up('window').body.mask('Saving, please wait ...');
			var data = [];
			for (var i = 0; i < store.getCount(); i++) {
				store.each(function (record, idx) {
					if (i == idx) {
						data[i] = record.data;
					}
				});
			}

			//=== get remaining denda on schedule =====
			var writeoffdendascheduledetailStore = me.getWriteoffdendascheduledetailStore();
			writeoffdendascheduledetailStore.clearFilter(true);
			var data_schedule = [];
			for (var i = 0; i < writeoffdendascheduledetailStore.getCount(); i++) {
				writeoffdendascheduledetailStore.each(function (record, idx) {
					if (i == idx) {
						data_schedule[i] = record.data;
					}
				});
			}
			//=== end ====

			var myObj = {
				writeoff_id: fields.writeoff_id,
				purchaseletter_id: fields.purchaseletter_id,
				note: fields.note,
				data: data,
				data_schedule: data_schedule,
				isUsedVerification: me.isUsedVerification
			}

			Ext.Msg.confirm('Save Data', 'Save Write Off?', function (btn) {
				if (btn == 'yes') {
					resetTimer();
					me.getFormdata().up('window').body.mask('Saving, please wait ...');
					Ext.Ajax.request({
						url: 'erems/writeoffdenda/create',
						params: {data: Ext.encode(myObj)},
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
			});
		}
	},
	//==== end Form Data Detail ======
	//==== form data detail 2 ======
	formDataDetail2AfterRender: function (el) {
		var me = this;

		var state = el.up('window').state;
		var purchaseletterId = me.getFormdatadetail().down('[name=purchaseletter_id]').getValue();
		var writeoffdendascheduledetailStore = me.getWriteoffdendascheduledetailStore();

		// load detail data
		if (purchaseletterId != me.selected_pl_id) {
			writeoffdendascheduledetailStore.removeAll();
			writeoffdendascheduledetailStore.load({params: {purchaseletter_id: purchaseletterId}});
			//inisial start form data awal biar pl nya default lg
			me.selected_pl_id = purchaseletterId;
		} else {
			writeoffdendascheduledetailStore.filterBy(function (recod) {
				return recod.data.remaining_denda > 0;
			});
		}
	},
	gridDetail2SelectionChange: function () {
		var me = this;
		var grid = me.getDetailgrid2();
		var row = grid.getSelectionModel().getSelection();

		grid.down('#btnSelectSchedule').setDisabled(row.length == 0);
	},
	detailGrid2: {
		selected: function () {
			var me = this;
			var grid = me.getDetailgrid2();
			var store = grid.getStore();
			var form = me.getFormdatadetail();
			var record = grid.getSelectionModel().getSelection();

			me.schedule_select = record;

			var schedule_id = new Array;
			var scheduletype = new Array;
			var description = new Array;
			var remaining_denda = 0;
			for (var i = 0; i < record.length; i++) {
				schedule_id.push(record[i].data.schedule_id);
				scheduletype.push(record[i].data.scheduletype);
				if (record[i].data.description != '') {
					description.push(record[i].data.description);
				}
				remaining_denda += parseFloat(record[i].data.remaining_denda);
			}

			form.down('[name=schedule_id]').setValue(schedule_id.join(', '));
			form.down('[name=scheduletype]').setValue(scheduletype.join(', '));
			form.down('[name=description]').setValue(description.join(', '));
			form.down('[name=denda]').setValue(me.fmb(remaining_denda));
			form.down('[name=remaining_denda]').setValue(me.fmb(remaining_denda));


			// var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			// form.loadRecord(record);
			// form.down('[name=denda]').setValue(me.fmb(record.data.remaining_denda));
			// form.down('[name=remaining_denda]').setValue(me.fmb(record.data.remaining_denda));

			me.getFormdatadetail2().up('window').close();
		}
	},
	//==== end form data detail 2 ===
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
	//// add by erwin.st 16112021
	fullwo: function () {
		var me = this;
		var form = me.getFormdatadetail();

		form.down('[name=writeoff]').setValue(form.down('[name=remaining_denda]').getValue());
		form.down('[name=after_writeoff]').setValue(me.fmb(0));
	}
});