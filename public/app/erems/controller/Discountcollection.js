Ext.define('Erems.controller.Discountcollection', {
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Discountcollection',
	requires: ['Erems.library.DetailtoolAll'],
	views: ['discountcollection.Panel', 'discountcollection.Grid', 'discountcollection.FormSearch', 'discountcollection.FormData', 'discountcollection.DetailGrid', 'discountcollection.FormDataDetail'],
	requires: [
		'Erems.library.DetailtoolAll',
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Unitcombobox',
		'Erems.library.template.component.Pricetypecombobox',
	],
	stores: ['Mastercluster', 'Discountcollection', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masterblock', 'Discountcollectionschedule', 'Masterparameterglobal'],
	models: ['Discountcollection', 'Unit', 'Mastercustomer', 'Purchaseletterdetail', 'Masterblock', 'Discountcollectionschedule', 'Masterparameterglobal'],
	detailTool: null,
	refs: [
		{
			ref: 'grid',
			selector: 'discountcollectiongrid'
		},
		{
			ref: 'formsearch',
			selector: 'discountcollectionformsearch'
		},
		{
			ref: 'formdata',
			selector: 'discountcollectionformdata'
		},

		//Detail Grid
		{
			ref: 'detailgrid',
			selector: 'discountcollectiondetailgrid'
		},
		{
			ref: 'formdatadetail',
			selector: 'discountcollectionformdatadetail'
		}
		//end Detail Grid
	],
	controllerName: 'discountcollection',
	fieldName: 'purchaseletter_no',
	bindPrefixName: 'Discountcollection',
	validationItems: [
		{name: 'purchaseletter_id', msg: 'You must select Kavling / Unit No. first'}
	],

	formWidth: 800,
	countLoadProcess: 0,
	verification_approval: 0,
	isUsedVerification: 0,
	init: function (application) {
		var me = this;

		this.control({
			test: me.eventMonthField,
			'discountcollectionpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'discountcollectiongrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},

			'discountcollectiongrid toolbar button[action=update]': {
				//                click: function() {
				//                    this.formDataShow('update');
				//                }
				click: this.cekApproval
			},
			'discountcollectiongrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'discountcollectiongrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'discountcollectiongrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'discountcollectionformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'discountcollectionformsearch button[action=search]': {
				click: this.dataSearch
			},
			'discountcollectionformsearch button[action=reset]': {
				click: this.dataReset
			},
			'discountcollectionformdata': {
				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataAfterRender
			},

			'discountcollectionformdata button[action=save]': {
				click: this.dataSave
			},
			'discountcollectionformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'discountcollectionformdata button[action=browse_paramdiscountcollection]': {
				click: me.selectParamdiscountcollectionGridShow
			},

			//Add Detail Grid
			/*'discountcollectiondetailgrid toolbar button[action=create]': {
			 click: function() {
			 me.detailTool.form().show('create', 700, 'New');
			 }
			 },*/
			'discountcollectionformdatadetail': {
				afterrender: this.formDataDetailAfterRender
			},
			'discountcollectionformdatadetail button[action=save]': {
				click: me.detailForm.save
			},
			'discountcollectiondetailgrid actioncolumn': {
				click: me.detailGrid.actionColumnClick
			},
			'discountcollectionformdatadetail [name=discount_persen]': {
				keyup: me.detailForm.fillDiscAmount
			},
			'discountcollectionformdatadetail [name=discount]': {
				//blur: me.detailForm.fillAmount
			},
			//End Add Detail Grid

		});
	},

	fillUnitDataToForm: function (data) {

		var me = this;
		var filledFields = ['productcategory', 'type_name', 'land_size', 'long', 'building_size', 'width', 'kelebihan', 'floor', 'block_id', 'cluster_id', 'unit_number', 'pt_name', 'electricity'];
		for (var x in filledFields) {
			if (me.getFormdata().down('[name=unit_' + filledFields[x] + ']') != null) {
				me.getFormdata().down('[name=unit_' + filledFields[x] + ']').setValue(data.data['unit_' + filledFields[x]]);
			}

		}
	},
	fillMasterCustomerData: function (records, prefix) {
		var pr = typeof prefix === 'undefined' ? 'customer' : prefix;
		var me = this;
		var filledFields = [
			'name', 'ktp', 'npwp', 'address', 'homephone', 'email', 'mobilephone'
		];

		for (var x in filledFields) {
			if (me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']') != null) {
				me.getFormdata().down('[name=' + pr + '_' + filledFields[x] + ']').setValue(records.data[pr + '_' + filledFields[x]]);
			}

		}
	},

	/*checkAllDetailLoadingProcess: function() {
	 var me = this;
	 if (me.countLoadProcess === 4) {
	 me.getFormdata().up('window').body.unmask();
	 }
	 },*/

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
		me.detailTool.parentGridAlias = 'discountcollectiondetailgrid';
		//en show form


		if (state == 'create') {
			// el.down('#active').setValue(1);
			//me.getFormdata().down('#btnSave').setDisabled(false);
		} else {
			me.countLoadProcess = 0;
			me.getFormdata().up('window').body.mask('Loading data, please wait ...');

			var grid = me.getGrid();
			var store = grid.getStore();
			var form = me.getFormdata();

			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);

			form.down('[name=total_payment]').setValue(me.fmb(record.data.total_payment));
			form.down('[name=disc_collection]').setValue(me.fmb(record.data.disc_collection));

			// load purchase letter data
			var purchaseletterdetailStore = me.getPurchaseletterdetailStore();
			purchaseletterdetailStore.removeAll();
			purchaseletterdetailStore.load({
				params: {purchaseletter_id: record.data.purchaseletter_id, mode_read: 'detail'},
				callback: function (purchaselettedetailrec) {
					form.down('[name=purchaseletter_id]').setValue(purchaselettedetailrec[0].get('purchaseletter_id'));
					form.down('[name=unit_id]').setValue(purchaselettedetailrec[0].get('unit_id'));
					form.down('[name=cluster_code]').setValue(purchaselettedetailrec[0].get('cluster_code'));
					form.down('[name=block_code]').setValue(purchaselettedetailrec[0].get('block_code'));
					form.down('[name=pricetype_id]').setValue(purchaselettedetailrec[0].get('pricetype_id'));
					form.down('[name=harga_jual]').setValue(me.fmb(purchaselettedetailrec[0].get('harga_jual')));
					form.down('[name=bank_bank_name]').setValue(purchaselettedetailrec[0].get('bank_bank_name'));
					form.down('[name=akad_realisasiondate]').setValue(purchaselettedetailrec[0].get('akad_realisasiondate'));
					//					var akad_realisasiondate;
					//					akad_realisasiondate = purchaselettedetailrec[0].get('akad_realisasiondate');
					//					if(akad_realisasiondate){
					//						akad_realisasiondate = akad_realisasiondate.replace(' 00:00:00.000','');
					//						akad_realisasiondate = akad_realisasiondate.split("-");
					//						akad_realisasiondate = akad_realisasiondate[2] + '-' + akad_realisasiondate[1] + '-' + akad_realisasiondate[0];
					//						form.down('[name=akad_realisasiondate]').setValue(akad_realisasiondate);
					//					}

					me.fillUnitDataToForm(purchaselettedetailrec[0]);
					me.fillMasterCustomerData(purchaselettedetailrec[0], 'customer');

					//load detail grid
					var discountcollectionscheduleStore = me.getDiscountcollectionscheduleStore();
					discountcollectionscheduleStore.removeAll();
					discountcollectionscheduleStore.load({params: {purchaseletter_id: record.data.purchaseletter_id}});


					me.countLoadProcess += 1;
					//me.checkAllDetailLoadingProcess();

				}
			});
			if (state == 'update') {

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

		var form = me.getFormdatadetail();
		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({
			params: {parametername: 'DISCCOLL_MAX_VALUE'},
			callback: function (rec) {
				if (rec.length > 0) {
					var value = rec[0].get('value');
					form.down('[name=max_discount_value]').setValue(value);
				} else {
					form.down('[name=max_discount_value]').setValue(0);
				}
			}
		});
	},

	detailForm: {
		that: this,
		editingIndexRow: 0,
		fillDiscAmount: function () {
			var me = this;
			var remainingBalance = toFloat(me.getFormdatadetail().down('[name=remaining_balance]').getValue());
			var discount = me.getFormdatadetail().down('[name=discount_persen]').getValue();
			var discAmount = (discount * remainingBalance) / 100;
			me.getFormdatadetail().down('[name=discount]').setValue(discAmount);
		},
		save: function () {
			var me = this;

			var form = me.getFormdatadetail().getForm();
			var formVal = me.getFormdatadetail().getForm().getValues();

			var msg = '';

			if (form.isValid()) {

				//if discount > max discout then alert
				var remainingBalance = toFloat(me.getFormdatadetail().down('[name=remaining_balance]').getValue());
				var maxDiscount = (toFloat(formVal.max_discount_value) > 0) ? toFloat(formVal.max_discount_value) : remainingBalance;

				if (toFloat(formVal.discount) > maxDiscount) {
					Ext.Msg.show({
						title: 'Info',
						msg: 'Discount Amount Tidak Boleh lebih besar dari ' + me.fmb(maxDiscount),
						icon: Ext.Msg.WARNING,
						buttons: Ext.Msg.OK
					});
					return false;
				}

				var dStore = null;
				var win = me.getFormdatadetail().up('window');

				dStore = me.getDetailgrid().getStore();

				var val = {
					schedule_id: formVal.schedule_id,
					purchaseletter_id: formVal.purchaseletter_id,
					discount_persen: toFloat(formVal.discount_persen),
					discount: toFloat(formVal.discount)
				};

				if (win.state == 'create') {
					dStore.add(val);
				} else {

					var rec = dStore.getAt(me.detailForm.editingIndexRow);
					rec.beginEdit();
					rec.set(val);
					rec.endEdit();
				}

				win.close();
			}
		}
	},
	detailGrid: {
		that: this,
		actionColumnClick: function (view, cell, row, col, e) {
			var me = this;
			var gr = me.getDetailgrid();
			var record = gr.getStore().getAt(row);
			var m = e.getTarget().className.match(/\bact-(\w+)\b/);
			gr.getSelectionModel().select(row);

			//get disabled button
			if (m) {
				var btnEdit = m.input.match(/x-item-disabled/gi);
			}

			if (m) {
				switch (m[1]) {
					case 'DiscountcollectionscheduleUpdate':
						if (!btnEdit) {
							me.detailTool.form().show('update', 500, 'Edit');
							me.detailForm.editingIndexRow = row;
							me.getFormdatadetail().getForm().setValues({
								purchaseletter_id: record.get('purchaseletter_id'),
								schedule_id: record.get('schedule_id'),
								purchaseletter_no: me.getFormdata().down('[name=purchaseletter_no]').getValue(),
								customer_name: me.getFormdata().down('[name=customer_name]').getValue(),
								harga_jual: me.getFormdata().down('[name=harga_jual]').getValue(),
								total_payment: me.getFormdata().down('[name=total_payment]').getValue(),
								disc_collection: me.getFormdata().down('[name=disc_collection]').getValue(),
								duedate: record.get('duedate'),
								scheduletype: record.get('scheduletype'),
								queue: record.get('queue'),
								amount: (record.get('amount')) ? me.fmb(record.get('amount')) : "",
								remaining_balance: (record.get('remaining_balance')) ? me.fmb(record.get('remaining_balance')) : "",
								discount_persen: (record.get('discount_persen')) ? toFloat(record.get('discount_persen')) : "",
								discount: (record.get('discount')) ? me.fmb(record.get('discount')) : ""
							});
							break;
						} else {
							break;
						}
				}
			}
		}
	},
	dataSave: function () {
		var me = this;
		var duedate_dc = me.getFormdata().down('[name=duedate_dc]').getValue();
		var store = me.getDetailgrid().getStore();

		store.clearFilter(true);

		//me.getFormdata().up('window').body.mask('Saving, please wait ...');
		var data = [];
		for (var i = 0; i < store.getCount(); i++) {
			store.each(function (record, idx) {
				if (i == idx) {
					if (record.dirty == true) {
						data[i] = record.data;
					}
				}
			});
		}
		var myObj = {
			data: data,
			isUsedVerification: me.isUsedVerification,
			duedate_dc: duedate_dc
		}

		
		console.log(Ext.encode(myObj));

		if (duedate_dc == '' || duedate_dc == null) {
			Ext.Msg.show({
				title: 'Info',
				msg: 'Discount Duedate Must be filled',
				icon: Ext.Msg.WARNING,
				buttons: Ext.Msg.OK
			});
			return false;
		}

		Ext.Msg.confirm('Update Data', 'Update discount schedule data?', function (btn) {
			if (btn == 'yes') {
				resetTimer();
				me.getFormdata().up('window').body.mask('Saving, please wait ...');
				Ext.Ajax.request({
					url: 'erems/discountcollection/updateschedule',
					//				  params:'data='+Ext.encode(data),
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
						} else if (Ext.decode(response.responseText).success == 'email_failed') {
							Ext.Msg.show({
								title: 'Information',
								msg: 'Data saved successfully but sending email notifications failed.',
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



	},
	//==== end Form Data Detail ======


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

	panelAfterRender: function () {
		var me = this;
		Ext.Ajax.request({
			url: 'erems/cancellation/read',
			params: {
				read_type_mode: 'verification_approval',
			},
			success: function (response) {
				me.verification_approval = Ext.decode(response.responseText)
				console.log(me.verification_approval)
			},
		});
	},

	cekApproval: function () {
		var me = this;
		console.log(me.verification_approval)
		if (me.verification_approval > 0) {
			var grid = me.getGrid();
			var store = grid.getStore();
			//            var form = me.getFormdata();

			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			//            var f = me.getFormdata();
			console.log(record);
			Ext.Ajax.request({
				url: 'erems/cancellation/read',
				params: {
					purchaseletter_id: record.data.purchaseletter_id,
					verification_code: 'DC',
					read_type_mode: 'verificationapproval'
				},
				success: function (response) {
					var obj = JSON.parse(response.responseText)
					console.log(response)
					if (obj.totalRow > 0) {
						if (obj.data[0]['is_approve'] > 0) {
							me.formDataShow('update');
							me.isUsedVerification = 1;
							//                                me.isUsedVerification = true
						} else {
							Ext.Msg.show({
								title: 'Info',
								msg: 'Verifikasi Belum Diapprove.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK,
								fn: function () {
									me.getFormdata().up('window').close();
								}
							});
						}

					} else {
						Ext.Msg.show({
							title: 'Info',
							msg: 'Verifikasi Persetujuan Belum Dibuat.',
							icon: Ext.Msg.ERROR,
							buttons: Ext.Msg.OK,
							fn: function () {
								me.getFormdata().up('window').close();
							}
						});
					}
				}
			})

		} else {
			me.formDataShow('update');
		}
	}

});