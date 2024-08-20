Ext.define('Erems.controller.Verificationapproval', {
	extend   : 'Erems.library.template.controller.Controlleralt',
	alias    : 'controller.Verificationapproval',
	views    : ['verificationapproval.Panel', 'verificationapproval.Grid', 'verificationapproval.FormSearch', 'verificationapproval.FormData', 'verificationapproval.FormDataApprove'],
	requires : ['Erems.library.template.component.Clustercombobox','Erems.library.XyReportJs','Erems.library.template.component.Blockcombobox'],
	stores   : ['', 'Mastercluster', 'Verificationapproval', 'Purchaseletterdetail', 'Purchaseletterverificationapproval','Mastercluster','Masterblock'],
	models   : ['Verificationapproval', 'Purchaseletter', 'Purchaseletterdetail','Mastercluster','Masterblock'],
	refs     : [
		{
			ref      : 'grid',
			selector : 'verificationapprovalgrid'
		},
		{
			ref      : 'formsearch',
			selector : 'verificationapprovalformsearch'
		},
		{
			ref      : 'formdata',
			selector : 'verificationapprovalformdata'
		},
		{
			ref      : 'formdataapprove',
			selector : 'verificationapprovalformdataapprove'
		},
	],
	controllerName  : 'verificationapproval',
	fieldName       : 'unit_number',
	bindPrefixName  : 'Verificationapproval',
	validationItems : [{name: 'purchaseletter_id', msg: 'You must select Kavling / Unit No. first'}],
	formWidth       : 900,
	localStore      : {
		jenis_approval : null,
		type_approval  : null,
		request_by_1   : null,
		request_by_2   : null,
		approved_by    : null,
		approve_status : null,
		approve_date   : null,
		print_file     : null,
		print_type     : null,
	},
	init: function (application) {
		var me = this;
		this.control({
			'verificationapprovalpanel': {
				beforerender : me.mainPanelBeforeRender,
				afterrender  : me.panelAfterRender
			},
			'verificationapprovalgrid': {
				afterrender     : this.gridAfterRender,
				itemdblclick    : this.gridItemDblClick,
				itemcontextmenu : this.gridItemContextMenu,
				selectionchange : this.gridSelectionChange
			},
			'verificationapprovalgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'verificationapprovalgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'verificationapprovalgrid button[action=prinout]': {
				click: function () {
					me.formDataPrintout();
				}
			},
			'verificationapprovalgrid toolbar button[itemId=approve_2]': {
				click: function () {
					if (me.getGrid().down("[itemId=approve_2]").action != '') {
						me.ChangeStatus(me.getGrid().down("[itemId=approve_2]").action);
					}
				}
			},
			'verificationapprovalgrid toolbar button[itemId=approve_final]': {
				click: function () {
					if (me.getGrid().down("[itemId=approve_final]").action != '') {
						me.ChangeStatus(me.getGrid().down("[itemId=approve_final]").action);
					}
				}
			},
			'verificationapprovalgrid toolbar button[itemId=reject]': {
				click: function () {
					if (me.getGrid().down("[itemId=reject]").action != '') {
						me.ChangeStatus(me.getGrid().down("[itemId=reject]").action);
					}
				}
			},
			'verificationapprovalgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'verificationapprovalgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'verificationapprovalformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'verificationapprovalformsearch button[action=search]': {
				click: this.dataSearch
			},
			'verificationapprovalformsearch button[action=reset]': {
				click: this.dataReset
			},
			'verificationapprovalformdata': {
				afterrender: this.formDataAfterRender
			},
			'verificationapprovalformdata button[action=browse_unit]': {
				click: me.selectUnitGridShow
			},
			'verificationapprovalformdata [name=verification_approval_date]': {
				blur: function (el) {
					if (!el.isValid()) {
						alert('Format tanggal pengajuan salah!');
					}
				}
			},
			'verificationapprovalformdata [name=verification_id]': {
				change: function (el, er) {
					if (el.hasFocus == true) {
						me.changeVerification(el, er);
					}
				}
			},
			'verificationapprovalformdata [name=verification_detail_id]': {
				change: function (el, er) {
					if (el.hasFocus == true) {
						me.changeVerification(el, er);
					}
				}
			},
			'verificationapprovalformdata [name=request_by_1]': {
				change: function (el) {
					if (el.hasFocus == true) {
						me.getFormdata().down("[name=request_by_1_name]").setValue(el.rawValue);
					}
				}
			},
			'verificationapprovalformdata [name=request_by_2]': {
				change: function (el) {
					if (el.hasFocus == true) {
						me.getFormdata().down("[name=request_by_2_name]").setValue(el.rawValue);

						var dB = me.localStore.request_by_2;
						var position = '';

						if (dB.length) {
							dB.forEach(function (item, i) {
								if (item.request_by_2 == el.value) {
									position = item.request_by_2_position;
								}
							});
						}
						me.getFormdata().down("[name=request_by_2_position]").setValue(position);
					}
				}
			},
			'verificationapprovalformdata [name=approved_by]': {
				change: function (el) {
					if (el.hasFocus == true) {
						me.getFormdata().down("[name=approved_by_name]").setValue(el.rawValue);
					}
				}
			},
			'verificationapprovalformdata [name=purchaseletter_id]': {
				change: function (el, er) {
					if (me.getFormdata().down("[name=verification_detail_id]").getValue()) {
						me.changeVerification(me.getFormdata().down("[name=verification_detail_id]"), er);
					}
				}
			},
			/* BROWSE CONTROL */
			'verificationapprovalbrowsepanel': {
				beforerender: me.browsepanelBeforeRender
			},
			'verificationapprovalbrowsepanel button[action=select]': {
				click: me.browsegridSelection
			},
			'verificationapprovalbrowsegrid': {
				afterrender: me.browsegridAfterRender
			},
			'verificationapprovalbrowseformsearch': {
				afterrender: me.browseformSearchAfterRender
			},
			'verificationapprovalbrowseformsearch button[action=search]': {
				click: me.browsedataSearch
			},
			'verificationapprovalbrowseformsearch button[action=reset]': {
				click: me.browsedataReset
			},
			/* END BROWSE CONTROL */

			'verificationapprovalformdata button[action=save]': {
				click: me.dataSave
			},
			'verificationapprovalformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'verificationapprovalformdataapprove button[action=save]': {
				click: function () {
					var fields = me.getFormdataapprove().getValues();
					me.localStore.approve_date = Ext.Date.format(me.getFormdataapprove().down('[name=approve_date]').getValue(), 'Y-m-d') + ' ' + Ext.Date.format(new Date(new Date()), 'H:i:s.u');
					me.dataUpdateStatus();
				}
			},
		});
	},
	ChangeStatus: function (state) {
		var me = this;
		var formtitle, formicon;

		var timestamp = new Date(new Date());

		me.localStore.approve_date = Ext.Date.format(timestamp, 'Y-m-d H:i:s.u');
		me.localStore.approve_status = state;

		if (state == 'un_approve_2' || state == 'un_approve_final' || state == 'reject_2' || state == 'reject_final') {
			me.dataUpdateStatus();
		} else {
			switch (state) {
				case 'approve_2':
					formtitle = 'Approve (2)';
					formicon = 'icon-form-add';
					break;
				case 'approve_final':
					formtitle = 'Approve Final';
					formicon = 'icon-form-add';
					break;
			}

			var winId = 'win-' + me.bindPrefixName + 'formdataapprove';
			var win = desktop.getWindow(winId);
			if (!win) {
				win = desktop.createWindow({
					id: winId,
					title: formtitle,
					iconCls: formicon,
					resizable: false,
					minimizable: false,
					maximizable: false,
					width: 260,
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
								win.add(Ext.create('Erems.view.' + me.controllerName + '.FormDataApprove'));
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
	},
	panelAfterRender: function (configs) {
		var me = this;
		var formGrid = me.getGrid();
		var FormSearch = me.getFormsearch();

		formGrid.getSelectionModel().setSelectionMode('SINGLE');
		formGrid.down("[action=create]").setDisabled(true);
		formGrid.down("[action=prinout]").setDisabled(true);

		var result = Ext.JSON.decode(
				Ext.Ajax.request({
					url: 'erems/verificationapproval/read',
					method: 'POST',
					timeout: 45000000,
					async: false,
					params: {mode: 'asset'}
				}).responseText
				);

		var newStore = Ext.create('Ext.data.Store', {
			fields: ['verification_id', 'verification'],
			data: result.verification
		});
		FormSearch.down("[name=verification_id]").bindStore(newStore);

		var isApproval2 = result.isApproval2;
		var isApprovalFinal = result.isApprovalFinal;
		var isReject = isApproval2 || isApprovalFinal ? true : false;

		formGrid.down("[itemId=approve_2]").setVisible(isApproval2);
		formGrid.down("[itemId=approve_final]").setVisible(isApprovalFinal);
		formGrid.down("[itemId=reject]").setVisible(isReject);
		var action_reject = '';
		if (isApproval2 == true) {
			action_reject = 'reject_2';
		}
		if (isApprovalFinal == true) {
			action_reject = 'reject_final';
		}
		formGrid.down('[itemId=reject]').action = action_reject;

		formGrid.down("[action=create]").setDisabled(false);

		me.localStore.jenis_approval = result.verification;
		me.localStore.type_approval = result.verification_detail;
		me.localStore.request_by_1 = result.request_by_1;
		me.localStore.request_by_2 = result.request_by_2;
		me.localStore.approved_by = result.approved_by;
		me.localStore.print_file = result.print_file;
		me.localStore.print_type = result.print_type;
	},
	selectUnitGridShow: function () {
		var me = this;
		me.instantWindow('browse.Panel', 800, 'Browse Item', 'read', 'myBrowseItemPanel');
	},
	formDataAfterRender: function (el) {
		var me = this;
		me.fdar().init();

		var state = el.up('window').state;

		if (state == 'create') {
			me.fdar().create();
		} else if (state == 'update') {
			me.fdar().update();
		} else if (state == 'read') {
			me.fdar().read();
		}
	},
	fdar: function () {
		var me = this;
		var formData = me.getFormdata();

		var x = {
			init: function () {
				/// init here
				var newStore = Ext.create('Ext.data.Store', {
					fields: ['verification_id', 'verification'],
					data: me.localStore.jenis_approval
				});
				formData.down("[name=verification_id]").bindStore(newStore);

				var newStore = Ext.create('Ext.data.Store', {
					fields: ['verification_detail_id', 'verification_type'],
					data: me.localStore.type_approval
				});
				formData.down("[name=verification_detail_id]").bindStore(newStore);

				var newStore = Ext.create('Ext.data.Store', {
					fields: ['request_by_1', 'request_by_1_name'],
					data: me.localStore.request_by_1
				});
				formData.down("[name=request_by_1]").bindStore(newStore);

				var newStore = Ext.create('Ext.data.Store', {
					fields: ['request_by_2', 'request_by_2_name'],
					data: me.localStore.request_by_2
				});
				formData.down("[name=request_by_2]").bindStore(newStore);

				var newStore = Ext.create('Ext.data.Store', {
					fields: ['approved_by', 'approved_by_name'],
					data: me.localStore.approved_by
				});
				formData.down("[name=approved_by]").bindStore(newStore);

				me.validationForm();
			},
			create: function () {
				// me.getGriddetail().getStore().removeAll();
			},
			update: function () {
				var formGrid = me.getGrid();
				var store = formGrid.getStore();
				var record = store.getAt(store.indexOf(formGrid.getSelectionModel().getSelection()[0]));

				formData.loadRecord(record);
				formData.down('[name=verification_approval_date]').setValue(new Date(record.data.verification_approval_date));

				me.processRowFromItemSelection(record.get('purchaseletter_id'), 'loadPageUpdate');
			},
			read: function () {
				var formGrid = me.getGrid();
				var store = formGrid.getStore();
				var record = store.getAt(store.indexOf(formGrid.getSelectionModel().getSelection()[0]));

				formData.loadRecord(record);
				formData.down('[name=verification_approval_date]').setValue(new Date(record.data.verification_approval_date));

				me.processRowFromItemSelection(record.get('purchaseletter_id'), 'loadPageUpdate');
			}
		};
		return x;
	},
	gridSelectionChange: function () {
		var me = this;
		var formGrid = me.getGrid(), row = formGrid.getSelectionModel().getSelection();

		formGrid.down('#btnDelete').setDisabled(true);
		formGrid.down('#btnEdit').setDisabled(true);
		formGrid.down('[action=prinout]').setDisabled(true);

		if (row[0]) {
			var disabled_delete        = false;
			var disabled_edit          = false;
			var disabled_approve_2     = true;
			var disabled_approve_final = true;
			var disabled_reject        = true;
			var text_approve_2         = 'Approve / Un-Approve (2)';
			var action_approve_2       = 'approve_2';
			var text_approve_final     = 'Approve / Un-Approve Final';
			var action_approve_final   = 'approve_final';

			Ext.each(row, function (rec) {
				if (rec.data.is_used == 1) {
					disabled_delete = true;
				}
				// if (rec.data.is_used == 1 && (rec.data.is_approve_2 == 1 || rec.data.is_approve == 1)) {
				// 	disabled_edit   = true;
				// }

				if (rec.data.is_reject_2 == 0) {
					if (formGrid.down('[itemId=approve_2]').isVisible()) {
						if (rec.data.is_approve_2 == 0 && rec.data.is_reject_2 == 0 && rec.data.is_approve == 0 && rec.data.is_reject == 0) {
							disabled_approve_2 = false;
							disabled_reject = false;
							text_approve_2 = 'Approve (2)';
							action_approve_2 = 'approve_2';

						} else if (rec.data.is_approve_2 == 1 && rec.data.is_reject_2 == 0 && rec.data.is_approve == 0 && rec.data.is_reject == 0) {
							disabled_approve_2 = false;
							disabled_reject = true;
							text_approve_2 = 'Un-Approve (2)';
							action_approve_2 = 'un_approve_2';
						} else if (rec.data.is_approve_2 == 0 && rec.data.is_reject_2 == 1 && rec.data.is_approve == 0 && rec.data.is_reject == 0) {
							disabled_approve_2 = true;
							disabled_reject = true;
							text_approve_2 = 'Approve / Un-Approve (2)';
							action_approve_2 = 'approve_2';
						} else if (rec.data.is_approve_2 == 1 && rec.data.is_reject_2 == 0 && rec.data.is_approve == 1 && rec.data.is_reject == 0) {
							disabled_approve_2 = true;
							disabled_reject = true;
							text_approve_2 = 'Approve / Un-Approve (2)';
							action_approve_2 = 'approve_2';
						}
					}

					if (formGrid.down('[itemId=approve_final]').isVisible()) {
						if (rec.data.is_approve_2 == 1 && rec.data.is_reject_2 == 0 && rec.data.is_approve == 0 && rec.data.is_reject == 0) {
							disabled_approve_final = false;
							disabled_reject = false;
							text_approve_final = 'Approve Final';
							action_approve_final = 'approve_final';
						} else if (rec.data.is_approve_2 == 0 && rec.data.is_reject_2 == 1 && rec.data.is_approve == 0 && rec.data.is_reject == 0) {
							disabled_approve_final = true;
							disabled_reject = true;
							text_approve_final = 'Approve / Un-Approve Final';
							action_approve_final = 'approve_final';
						} else if (rec.data.is_approve_2 == 1 && rec.data.is_reject_2 == 0 && rec.data.is_approve == 0 && rec.data.is_reject == 1) {
							disabled_approve_final = true;
							disabled_reject = true;
							text_approve_final = 'Approve / Un-Approve Final';
							action_approve_final = 'approve_final';
						} else if (rec.data.is_approve_2 == 1 && rec.data.is_reject_2 == 0 && rec.data.is_approve == 1 && rec.data.is_reject == 0 && rec.data.is_used == 0) {
							disabled_approve_final = false;
							disabled_reject = true;
							text_approve_final = 'Un-Approve Final';
							action_approve_final = 'un_approve_final';
						} else if (rec.data.is_approve_2 == 1 && rec.data.is_reject_2 == 0 && rec.data.is_approve == 1 && rec.data.is_reject == 0 && rec.data.is_used == 1) {
							disabled_approve_final = true;
							disabled_reject = true;
							text_approve_final = 'Approve / Un-Approve Final';
							action_approve_final = 'approve_final';
						}
					}
				}
			});

			formGrid.down('#btnDelete').setDisabled(disabled_delete);
			formGrid.down('#actioncolumn').items[1].disabled = disabled_delete;

			formGrid.down('#btnEdit').setDisabled(disabled_edit);

			formGrid.down('[itemId=reject]').setDisabled(disabled_reject);

			formGrid.down('[itemId=approve_2]').setDisabled(disabled_approve_2);
			formGrid.down('[itemId=approve_2]').setText(text_approve_2);
			formGrid.down('[itemId=approve_2]').action = action_approve_2;

			formGrid.down('[itemId=approve_final]').setDisabled(disabled_approve_final);
			formGrid.down('[itemId=approve_final]').setText(text_approve_final);
			formGrid.down('[itemId=approve_final]').action = action_approve_final;

			var action_reject = '';
			if (disabled_reject == false && disabled_approve_2 == false && formGrid.down('[itemId=approve_2]').isVisible()) {
				action_reject = 'reject_2';
			} else if (disabled_reject == false && disabled_approve_final == false && formGrid.down('[itemId=approve_final]').isVisible()) {
				action_reject = 'reject_final';
			}
			formGrid.down('[itemId=reject]').action = action_reject;

			formGrid.down('[action=prinout]').setDisabled(false);
		}
	},
	processRowFromItemSelection: function (pl_id, inital) {
		var me = this;

		var plDetailStore = me.getPurchaseletterdetailStore();
		var formData = me.getFormdata();

		plDetailStore.load({
			params: {
				mode_read: 'detail',
				purchaseletter_id: pl_id
			},
			callback: function (rec) {
				/* UNIT INFOTMATION */
				formData.down('[name=code]').setValue(rec[0].get('cluster_code'));
				formData.down('[name=unit_cluster_id]').setValue(rec[0].get('unit_cluster_id'));
				formData.down('[name=block_code]').setValue(rec[0].get('block_code'));
				formData.down('[name=unit_block_id]').setValue(rec[0].get('unit_block_id'));
				formData.down('[name=unit_pt_name]').setValue(rec[0].get('unit_pt_name'));
				formData.down('[name=unit_unit_number]').setValue(rec[0].get('unit_unit_number'));
				formData.down('[name=unit_productcategory]').setValue(rec[0].get('unit_productcategory'));
				formData.down('[name=unit_type_name]').setValue(rec[0].get('unit_type_name'));
				formData.down('[name=unit_land_size]').setValue(rec[0].get('unit_land_size'));
				formData.down('[name=unit_long]').setValue(rec[0].get('unit_long'));
				formData.down('[name=unit_building_size]').setValue(rec[0].get('unit_building_size'));
				formData.down('[name=unit_width]').setValue(rec[0].get('unit_width'));
				formData.down('[name=unit_kelebihan]').setValue(rec[0].get('unit_kelebihan'));
				formData.down('[name=unit_floor]').setValue(rec[0].get('unit_floor'));
				/* END UNIT INFOTMATION */

				formData.down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
				formData.down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
				formData.down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));
				formData.down('[name=customer_name]').setValue(rec[0].get('customer_name'));
				formData.down('[name=customer_ktp]').setValue(rec[0].get('customer_ktp'));
				formData.down('[name=customer_npwp]').setValue(rec[0].get('customer_npwp'));
				formData.down('[name=customer_email]').setValue(rec[0].get('customer_email'));
				formData.down('[name=customer_address]').setValue(rec[0].get('customer_address'));
				formData.down('[name=customer_city]').setValue(rec[0].get('customer_city'));
				formData.down('[name=customer_phone]').setValue(rec[0].get('customer_homephone'));
				formData.down('[name=customer_mobile_phone]').setValue(rec[0].get('customer_mobilephone'));
				formData.down('[name=customer_office_phone]').setValue(rec[0].get('customer_officephone'));
				formData.down('[name=bank_bank_name]').setValue(rec[0].get('bank_bank_name'));
				formData.down('[name=notes]').setValue(rec[0].get('notes'));
				formData.down('[name=purchaseletter_salesman]').setValue(rec[0].get('salesman_name'));
				formData.down('[name=purchaseletter_harga_netto]').setValue(accounting.formatMoney(rec[0].get('harga_netto')));
				formData.down('[name=purchaseletter_harga_total_jual]').setValue(accounting.formatMoney(rec[0].get('harga_total_jual')));
				formData.down('[name=persen_pembayaran]').setValue(accounting.formatMoney((rec[0].get('total_payment') / rec[0].get('harga_total_jual') * 100)));
				formData.down('[name=purchaseletter_pricetype]').setValue(rec[0].get('customer_pendanaan'));

				me.validationForm();
			}
		});
	},
	changeVerification: function (el, er) {
		var me = this;

		var formData = me.getFormdata();
		var jenis_approval = me.localStore.jenis_approval;
		var type_approval = me.localStore.type_approval;

		var verification_id, verification_detail_id;
		if (el.name == 'verification_id') {
			var verification_id = el.value;
			var new_type_approval = new Array();

			if (type_approval.length) {
				type_approval.forEach(function (item, i) {
					if (item.verification_id == verification_id) {
						new_type_approval.push(item);
					}
				});
			}

			formData.down("[name=verification_detail_id]").setValue("");

			var newStore = Ext.create('Ext.data.Store', {
				fields: ['verification_detail_id', 'verification_type'],
				data: new_type_approval
			});
			formData.down("[name=verification_detail_id]").bindStore(newStore);

			if (jenis_approval.length) {
				jenis_approval.forEach(function (item, i) {
					if (item.verification_id == verification_id) {
						formData.down("[name=verification_code]").setValue(item.code);
					}
				});
			}

			formData.down('[name=ketentuan]').setValue('');
			formData.down('[name=alasan]').setValue('');
		} else if (el.name == 'verification_detail_id') {
			var verification_detail_id = el.value;
			var new_val_verification = '';
			var new_val_ketentuan = '';
			var new_val_alasan = '';

			if (type_approval.length) {
				type_approval.forEach(function (item, i) {
					if (item.verification_detail_id == verification_detail_id) {
						new_val_verification = item.verification_id;
						new_val_ketentuan = item.template_ketentuan;
						new_val_alasan = item.template_alasan;
					}
				});
			}

			if (jenis_approval.length) {
				jenis_approval.forEach(function (item, i) {
					if (item.verification_id == new_val_verification) {
						formData.down("[name=verification_code]").setValue(item.code);
					}
				});
			}

			formData.down("[name=verification_id]").setValue(new_val_verification);

			if (el.value != null) {
				me.getTemplate(new_val_ketentuan, new_val_alasan);
			}
		}
	},
	getTemplate: function (template_ketentuan, template_alasan) {
		var me = this;
		var formData = me.getFormdata();

		resetTimer();
		formData.up('window').body.mask('Load data template ...');

		var tm = setTimeout(function () {
			var result = Ext.Ajax.request({
				url: 'erems/verificationapproval/read',
				method: 'POST',
				timeout: 45000000,
				async: false,
				params: {
					purchaseletter_id: formData.down('[name=purchaseletter_id]').getValue(),
					verification_detail_id: formData.down('[name=verification_detail_id]').getValue(),
					template_ketentuan: template_ketentuan,
					template_alasan: template_alasan,
					mode: 'gettemplate'
				},
			}).responseText;

			result = Ext.JSON.decode(result);
			formData.down('[name=ketentuan]').setValue(result.ketentuan);
			formData.down('[name=alasan]').setValue(result.alasan);
			formData.up('window').body.unmask();

			clearTimeout(tm);
		}, 1000);
	},
	validationForm: function () {
		var me = this;
		var formData = me.getFormdata();
		var plid = formData.down("[name=purchaseletter_id]").getValue();
		var boolean = plid ? false : true;
		var bool_btn = boolean;
		var vsbl_btn = true;

		/// Validasi tombol save edit ///
		if (formData.ownerCt.state == 'update') {
			var formGrid = me.getGrid();
			var store = formGrid.getStore();
			var record = store.getAt(store.indexOf(formGrid.getSelectionModel().getSelection()[0]));

			if (record.data.is_used == 1 || (record.data.is_approve_2 == 1 || record.data.is_approve == 1)) {
				bool_btn = true;

				vsbl_btn = false;
				formData.down('#fd_browse_unit_btn').setVisible(false);

				$('#win-holidayformdata_header_hd-textEl').text('View');

				formData.down("[name=verification_approval_date]").setReadOnly(true);
				formData.down("[name=request_by_1]").setReadOnly(true);
				formData.down("[name=request_by_2]").setReadOnly(true);
				formData.down("[name=approved_by]").setReadOnly(true);
				formData.down("[name=verification_detail_id]").setReadOnly(true);
				formData.down("[name=ketentuan]").setReadOnly(true);
				formData.down("[name=alasan]").setReadOnly(true);
			}

			formData.down("[name=verification_id]").setReadOnly(true);
		} else if (formData.ownerCt.state == 'read') {
			vsbl_btn = false;
			formData.down('#fd_browse_unit_btn').setVisible(false);
		}

		formData.down("[name=request_by_1]").setDisabled(boolean);
		formData.down("[name=request_by_2]").setDisabled(boolean);
		formData.down("[name=approved_by]").setDisabled(boolean);
		formData.down("[name=verification_id]").setDisabled(boolean);
		formData.down("[name=verification_detail_id]").setDisabled(boolean);
		formData.down("[name=ketentuan]").setDisabled(boolean);
		formData.down("[name=alasan]").setDisabled(boolean);

		formData.down('#btnSave').setVisible(vsbl_btn);
		formData.down("#btnSave").setDisabled(bool_btn);
	},
	dataSave: function () {
		var me = this;
		var formData = me.getFormdata();

		if (!formData.down("[name=purchaseletter_id]").getValue()) {
			Ext.Msg.alert('Info', 'Silahkan browse data unit.');
			return;
		} else if (!formData.down("[name=verification_approval_date]").getValue()) {
			Ext.Msg.alert('Info', 'Silahkan pilih tanggal pengajuan.');
			return;
		} else if (Ext.Date.format(formData.down("[name=verification_approval_date]").getValue(), "d-m-Y") == '') {
			Ext.Msg.alert('Info', 'Tanggal pengajuan salah tidak sesuai dengan format [ d-m-Y ].');
			return;
		} else if (!formData.down("[name=request_by_1]").getValue()) {
			Ext.Msg.alert('Info', 'Silahkan pilih diajukan oleh 1.');
			return;
		} else if (formData.down("[name=request_by_1]").value == null) {
			Ext.Msg.alert('Info', formData.down("[name=request_by_1]").getValue() + ' tidak ada pada pilihan diajukan oleh 1.');
			return;
		} else if (!formData.down("[name=request_by_2]").getValue()) {
			Ext.Msg.alert('Info', 'Silahkan pilih diajukan oleh 2.');
			return;
		} else if (formData.down("[name=request_by_2]").value == null) {
			Ext.Msg.alert('Info', formData.down("[name=request_by_2]").getValue() + ' tidak ada pada pilihan diajukan oleh 2.');
			return;
		} else if (!formData.down("[name=approved_by]").getValue()) {
			Ext.Msg.alert('Info', 'Silahkan pilih disetujui oleh.');
			return;
		} else if (formData.down("[name=approved_by]").value == null) {
			Ext.Msg.alert('Info', formData.down("[name=approved_by]").getValue() + ' tidak ada pada pilihan disetujui oleh.');
			return;
		} else if (!formData.down("[name=verification_id]").getValue()) {
			Ext.Msg.alert('Info', 'Silahkan pilih jenis persetujuan.');
			return;
		} else if (formData.down("[name=verification_id]").value == null) {
			Ext.Msg.alert('Info', formData.down("[name=verification_id]").getValue() + ' tidak ada pada pilihan jenis persetujuan.');
			return;
		} else if (!formData.down("[name=verification_detail_id]").getValue()) {
			Ext.Msg.alert('Info', 'Silahkan pilih judul persetujuan.');
			return;
		} else if (formData.down("[name=verification_detail_id]").value == null) {
			Ext.Msg.alert('Info', formData.down("[name=verification_detail_id]").getValue() + ' tidak ada pada pilihan judul persetujuan.');
			return;
		} else {
			var fields = me.getFormdata().getValues();
			var myObj = {
				verification_approval_id: fields.verification_approval_id,
				purchaseletter_id: fields.purchaseletter_id,
				request_by_1: fields.request_by_1,
				request_by_1_name: fields.request_by_1_name,
				request_by_2: fields.request_by_2,
				request_by_2_name: fields.request_by_2_name,
				request_by_2_position: fields.request_by_2_position,
				approved_by: fields.approved_by,
				approved_by_name: fields.approved_by_name,
				verification_approval_date: fields.verification_approval_date,
				verification_approval_no: fields.verification_approval_no,
				verification_id: fields.verification_id,
				verification_code: fields.verification_code,
				verification_detail_id: fields.verification_detail_id,
				ketentuan: fields.ketentuan,
				alasan: fields.alasan,
			};

			resetTimer();
			me.getFormdata().up('window').body.mask('Saving, please wait ...');
			Ext.Ajax.request({
				url: 'erems/verificationapproval/create',
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
	dataUpdateStatus: function () {
		var me = this;
		var formGrid = me.getGrid(), row = formGrid.getSelectionModel().getSelection();

		if (row[0]) {
			var myObj = {
				verification_approval_id: row[0].data.verification_approval_id,
				approve_date: me.localStore.approve_date,
				status: me.localStore.approve_status,
			};

			var title = 'Approve';
			if (me.localStore.approve_status == 'un_approve_2' || me.localStore.approve_status == 'un_approve_final') {
				title = 'Un-' + title;
			} else if (me.localStore.approve_status == 'reject_2' || me.localStore.approve_status == 'reject_final') {
				title = 'Reject';
			}

			Ext.Msg.confirm(title + ' Data', title + ' [' + row[0].data.purchaseletter_no + '] ?', function (btn) {
				if (btn == 'yes') {
					if (me.localStore.approve_status == 'approve_2' || me.localStore.approve_status == 'approve_final') {
						var formX = me.getFormdataapprove();
					} else {
						var formX = me.getGrid();
					}

					resetTimer();
					formX.up('window').body.mask('Processing, please wait ...');

					var store = me.getGrid().getStore();

					Ext.Ajax.request({
						url: 'erems/verificationapproval/update',
						params: {
							data: Ext.encode(myObj)
						},
						success: function (response) {
							formX.up('window').body.unmask();

							if (Ext.decode(response.responseText).success == true) {
								Ext.Msg.show({
									title: 'Success',
									msg: 'Data [' + row[0].data.purchaseletter_no + '] ' + title + ' successfully.',
									icon: Ext.Msg.INFO,
									buttons: Ext.Msg.OK,
									fn: function () {
										if (me.localStore.approve_status == 'approve_2' || me.localStore.approve_status == 'approve_final') {
											formX.up('window').close();
										}
										store.reload();
									}
								});
							} else {
								Ext.Msg.show({
									title: 'Failure',
									msg: 'Error: Unable to ' + title + ' data [' + row[0].data.purchaseletter_no + '].',
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
	formDataPrintout: function (e) {
		var me = this;
		if (me.localStore.print_type == 'mrt') { /// MRT
			if (!me.xyReport) {
				me.xyReport = new Erems.library.XyReportJs(); //JS
				me.xyReport.init(me);
			}
			me.xyReport.processReport();
		} else {
			me.docxProcess();
		}
	},
	xyReportProcessParams: function (reportData) {
		var me = this;

		var grid = me.getGrid();
		var rec = grid.getSelectedRecord();

		reportData['file'] = me.localStore.print_file;
		reportData.params["verification_approval_id"] = rec.get("verification_approval_id");
		return reportData;
	},
	docxProcess: function () {
		var me = this;
		var grid = me.getGrid();
		var rec = grid.getSelectedRecord();

		grid.up('window').body.mask('Creating Document, Please Wait...');

		Ext.Ajax.request({
			url: 'erems/' + me.controllerName + '/print',
			params: {
				verification_approval_id: rec.get("verification_approval_id"),
				doc_name: me.localStore.print_file,
				doc_type: me.localStore.print_type,
			},
			success: function (response) {
				try {
					var resp = response.responseText;

					if (resp) {
						var info = Ext.JSON.decode(resp);

						if (info.success == true) {
							grid.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Info',
								msg: '<a href="' + info.url + '" target="blank">Click Here For Download Document</a>',
								icon: Ext.Msg.INFO,
								buttons: Ext.Msg.CANCEL,
								buttonText: {cancel: 'Close'}
							});
						} else {
							grid.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Failure',
								msg: 'Error: Create Document Failed.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					}
				} catch (e) {
					grid.up('window').body.unmask();
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Create Document Failed.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			},
			failure: function (e) {
				grid.up('window').body.unmask();
				Ext.Msg.show({
					title: 'Failure',
					msg: 'Error: Create Document Failed.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
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
	browsegridSelection: function (el) {
		var me = this;
		var unitGrid = el.up('grid');
		var unitStore = el.up('grid').getStore();
		var rows = unitGrid.getSelectionModel().getSelection();
		if (rows.length == 1) {
			el.up('window').destroy();
			_myAppGlobal.getController('Verificationapproval').processRowFromItemSelection(rows[0].get('purchaseletter_id'), 'loadGrid');

		} else {
			Ext.Msg.alert('Info', 'Require 1 unit!');
			return;

		}
	},
	browsegridAfterRender: function (el, a, b) {
		var me = this;
		me.browsedataReset(el.up('panel').up('panel').down('button[action=search]'));
		// resetTimer();
		// var store = el.getStore();
		// store.removeAll();
		// store.getProxy().setExtraParam('limit', 25);
		// store.loadPage(1);
	},
	browseformSearchAfterRender: function (el) {
		// var me = this;

		// var ftStore = null;
		// ftStore = el.form._fields.items[2].getStore();
		// ftStore.load({params: {start: 0, limit: 0}});
	},
	browsedataSearch: function (el) {
		resetTimer();
		var me = this;

		var form = el.up('form');
		var store = el.up('panel').up('panel').down('grid').getStore();

		var fields = form.getValues();
		for (var x in fields) {
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
});