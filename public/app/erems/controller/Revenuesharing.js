Ext.define('Erems.controller.Revenuesharing', {
//	extend: 'Erems.library.template.controller.Controller',
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Revenuesharing',
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Rangebagihasilcombobox',
	],
	views: ['revenuesharing.Panel', 'revenuesharing.Grid', 'revenuesharing.GridDetail', 'revenuesharing.GridLookup', 'revenuesharing.FormSearch', 'revenuesharing.FormData', 'revenuesharing.FormDataView', 'revenuesharing.FormDataLegalitas'],
	stores: ['Revenuesharing', 'Masterparameterglobal', 'Mastercluster', 'Masterblock', 'Masterrangebagihasil', 'Masterrangebagihasildetail', 'Revenuesharingpurchaseletterdetail', 'Revenuesharinglookup'],
	models: ['Revenuesharing', 'Masterparameterglobal', 'Mastercluster', 'Masterblock', 'Masterrangebagihasil', 'Masterrangebagihasildetail', 'Revenuesharingpurchaseletterdetail', 'Revenuesharinglookup'],
	refs: [
		{
			ref: 'grid',
			selector: 'revenuesharinggrid'
		},
		{
			ref: 'formsearch',
			selector: 'revenuesharingformsearch'
		},
		{
			ref: 'formdata',
			selector: 'revenuesharingformdata'
		},
		{
			ref: 'formdataview',
			selector: 'revenuesharingformdataview'
		},
		{
			ref: 'formdatadetail',
			selector: 'revenuesharingformdatadetail'
		},
		{
			ref: 'griddetail',
			selector: 'revenuesharinggriddetail'
		},
		{
			ref: 'gridlookup',
			selector: 'revenuesharinggridlookup'
		},
		// added by rico 05122022
		{
			ref: 'formdatalegalitas',
			selector: 'revenuesharingformdatalegalitas'
		},
	],
	controllerName: 'revenuesharing',
	fieldName: 'unit_number',
	bindPrefixName: 'Revenuesharing',
	formWidth: 780,
	m_pricetype: [],
	init: function (application) {
		var me = this;
		this.control({
			'revenuesharingpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'revenuesharinggrid': {
				afterrender: this.gridAfterRender,
////				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'revenuesharinggrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'revenuesharinggrid toolbar button[action=viewLookup]': {
				click: function () {
					me.formDataShowView('view');
				}
			},
			// added by rico 05122022
			'revenuesharinggrid toolbar button[action=legalitas]': {
				click: function () {
					me.formDataShowLegalitas('view');
				}
			},
			'revenuesharinggrid toolbar [action=action0]': {
				click: function () {
					me.dataSearchFilterby('');
				}
			},
			'revenuesharinggrid toolbar [action=action1]': {
				click: function () {
					me.dataSearchFilterby('1');
				}
			},

			'revenuesharinggrid toolbar [action=action2]': {
				click: function () {
					me.dataSearchFilterby('2');
				}
			},
			'revenuesharingformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'revenuesharingformsearch button[action=search]': {
				click: this.dataSearch
			},
			'revenuesharingformsearch button[action=reset]': {
				click: this.dataReset
			},
			'revenuesharinggridlookup': {
//				afterrender: this.gridAfterRender,
////				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridLookupSelectionChange
			},
			'revenuesharingformdataview': {
//				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataViewAfterRender
			},
			'revenuesharingformdataview button[action=print]': {
				click: me.processPrint
			},
			'revenuesharingformdata': {
//				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataAfterRender
			},
			'revenuesharingformdata [name=cb_set_cluster]': {
				change: me.checkboxSetCluster
			},
			'revenuesharingformdata [name=rangebagihasil_id]': {
				change: me.rangeBagiHasil
			},
			'revenuesharingformdata button[action=save]': {
				click: me.dataSave
			},
			'revenuesharingformdata button[action=cancel]': {
				click: this.formDataClose
			},
			// added by rico 05122022
			'revenuesharingformdatalegalitas': {
				afterrender: this.formDataLegalitasAfterRender
			},
			// added by rico 05122022
			'revenuesharingformdatalegalitas [name=biaya_legalitas_netto]': {
				blur: this.calculateLegalitas
			},
			// added by rico 05122022
			'revenuesharingformdatalegalitas button[action=save]': {
				click: me.dataLegalitasSave
			},
		});
	},
	formDataViewAfterRender: function (el) {
		var me = this;
		me.loadComboBoxStore(el);

		var grid = me.getGrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

		me.getGridlookup().getStore().getProxy().setExtraParam('purchaseletter_id', record.get('purchaseletter_id'));
		me.getGridlookup().getStore().load();
		var plDetailStore = me.getRevenuesharingpurchaseletterdetailStore();
		//me.getFormdataview().up('window').body.mask('Loading data...');
		plDetailStore.load({
			params: {purchaseletter_id: record.get('purchaseletter_id')},
			callback: function (rec) {
				/* UNIT INFOTMATION */
//				alert(rec[0].get('harga_total_jual'));
				me.getFormdataview().down('[name=code]').setValue(rec[0].get('cluster_code'));
				me.getFormdataview().down('[name=cluster_id]').setValue(rec[0].get('cluster_id'));
				me.getFormdataview().down('[name=block_code]').setValue(rec[0].get('block_code'));
				me.getFormdataview().down('[name=block_id]').setValue(rec[0].get('block_id'));
				me.getFormdataview().down('[name=pt_name]').setValue(rec[0].get('pt_name'));
				me.getFormdataview().down('[name=unit_number]').setValue(rec[0].get('unit_number'));
				me.getFormdataview().down('[name=productcategory]').setValue(rec[0].get('productcategory'));
				me.getFormdataview().down('[name=type_name]').setValue(rec[0].get('type_name'));
				me.getFormdataview().down('[name=land_size]').setValue(rec[0].get('land_size'));
				me.getFormdataview().down('[name=long]').setValue(rec[0].get('long'));
				me.getFormdataview().down('[name=building_size]').setValue(rec[0].get('building_size'));
				me.getFormdataview().down('[name=width]').setValue(rec[0].get('width'));
				me.getFormdataview().down('[name=kelebihan]').setValue(rec[0].get('kelebihan'));
				me.getFormdataview().down('[name=floor]').setValue(rec[0].get('floor'));
				/* END UNIT INFOTMATION */

				me.getFormdataview().down('[name=purchaseletter_id]').setValue(rec[0].get('purchaseletter_id'));
				me.getFormdataview().down('[name=purchaseletter_no]').setValue(rec[0].get('purchaseletter_no'));
				me.getFormdataview().down('[name=purchase_date]').setValue(rec[0].get('purchase_date'));
				me.getFormdataview().down('[name=customer_name]').setValue(rec[0].get('customer_name'));
				me.getFormdataview().down('[name=customer_ktp]').setValue(rec[0].get('customer_ktp'));
				me.getFormdataview().down('[name=customer_npwp]').setValue(rec[0].get('customer_npwp'));
				me.getFormdataview().down('[name=customer_email]').setValue(rec[0].get('customer_email'));
				me.getFormdataview().down('[name=customer_address]').setValue(rec[0].get('customer_address'));
				me.getFormdataview().down('[name=customer_city]').setValue(rec[0].get('customer_city_name'));
				me.getFormdataview().down('[name=customer_phone]').setValue(rec[0].get('customer_homephone'));
				me.getFormdataview().down('[name=customer_mobile_phone]').setValue(rec[0].get('customer_mobilephone'));
				me.getFormdataview().down('[name=customer_office_phone]').setValue(rec[0].get('customer_officephone'));
				me.getFormdataview().down('[name=purchaseletter_pricetype]').setValue(rec[0].get('pricetype'));
				me.getFormdataview().down('[name=purchaseletter_salesman]').setValue(rec[0].get('salesman_name'));
				me.getFormdataview().down('[name=purchaseletter_harga_netto]').setValue(accounting.formatMoney(rec[0].get('harga_netto')));
				me.getFormdataview().down('[name=biaya_ppn]').setValue(accounting.formatMoney(rec[0].get('biaya_ppn')));
				me.getFormdataview().down('[name=harga_bbnsertifikat]').setValue(accounting.formatMoney(rec[0].get('harga_bbnsertifikat')));
				me.getFormdataview().down('[name=harga_bajb]').setValue(accounting.formatMoney(rec[0].get('harga_bajb')));
				me.getFormdataview().down('[name=harga_bphtb]').setValue(accounting.formatMoney(rec[0].get('harga_bphtb')));
				me.getFormdataview().down('[name=harga_administrasi]').setValue(accounting.formatMoney(rec[0].get('harga_administrasi')));
				me.getFormdataview().down('[name=harga_admsubsidi]').setValue(accounting.formatMoney(rec[0].get('harga_admsubsidi')));
				me.getFormdataview().down('[name=harga_paket_tambahan]').setValue(accounting.formatMoney(rec[0].get('harga_paket_tambahan')));
				me.getFormdataview().down('[name=pengakuan]').setValue(rec[0].get('pengakuan'));
				me.getFormdataview().down('[name=sppjb_date]').setValue(rec[0].get('sppjb_date'));
				me.getFormdataview().down('[name=legalitas]').setValue(rec[0].get('legalitas'));
				me.getFormdataview().down('[name=tandatangan_date]').setValue(rec[0].get('tandatangan_date'));
				me.getFormdataview().down('[name=harga_total_jual]').setValue(accounting.formatMoney(rec[0].get('harga_total_jual')));
				me.getFormdataview().down('[name=disc_collection]').setValue(accounting.formatMoney(rec[0].get('disc_collection')));
				me.getFormdataview().down('[name=harga_total]').setValue(accounting.formatMoney(rec[0].get('harga_total')));
			}
		});
	},
	// added by rico 05122022
	formDataLegalitasAfterRender: function (el) {
		var me = this;

		var grid 	= me.getGrid();
		var store 	= grid.getStore();
		var record 	= store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
		var form 	= me.getFormdatalegalitas();

		form.down('[name=biaya_legalitas_netto]').setValue(accounting.formatMoney(record.data.biaya_legalitas_netto));
		form.down('[name=harga_netto]').setValue(accounting.formatMoney(record.data.harga_netto));
		form.down('[name=purchaseletter_id]').setValue(record.data.purchaseletter_id);
		form.down('[name=unit_id]').setValue(record.data.unit_id);

		var harga_netto 	= form.down('[name=harga_netto]');
		var harga_netto_rs 	= form.down('[name=harga_netto_rs]');
		var biaya_legalitas = form.down('[name=biaya_legalitas_netto]');
		var biaya 			= parseFloat(harga_netto.getValue().replace(/,/g, '')) - parseFloat(biaya_legalitas.getValue().replace(/,/g, '')); 

		harga_netto_rs.setValue(accounting.formatMoney(biaya));
	},
	// added by rico 05122022
	calculateLegalitas: function (el) {
		var me 		= this;
		var form 	= me.getFormdatalegalitas();

		var harga_netto 	= form.down('[name=harga_netto]');
		var harga_netto_rs 	= form.down('[name=harga_netto_rs]');
		var biaya 			= parseFloat(harga_netto.getValue().replace(/,/g, '')) - parseFloat(el.getValue().replace(/,/g, '')); 

		harga_netto_rs.setValue(biaya);
	},
	gridLookupSelectionChange: function () {
		var me = this;
		var grid = me.getGridlookup();
		var store = grid.getStore();
		var indexRecord = store.indexOf(grid.getSelectionModel().getSelection()[0]);
		var penerimaan = 0;
		store.each(function (record, idx) {
			if (idx <= indexRecord) {
				penerimaan += parseFloat(record.data.payment);
				me.getFormdataview().down('[name=penerimaan]').setValue(accounting.formatMoney(penerimaan));
			}
		});
	},
	processPrint: function () {
		var me = this;
		var winId = 'myReportWindow';
		me.instantWindowReport('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		var win = desktop.getWindow(winId);

		if (win) {
			var params = [];

			params["project_name"] = me.project_name;
			params["pt_name"] = me.pt_name;
			params["project_id"] = apps.project;
			params["pt_id"] = apps.pt;
			params["purchaseletter_id"] = me.getFormdataview().down('[name=purchaseletter_id]').getValue();

			var reportFile = 'RevenueSharing';
			var html = me.generateFakeForm2(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
		}
	},
	generateFakeForm2: function (paramList, reportFile) {
		//var form = '<form id="fakeReportFormID" action=resources/stimulsoftjs/viewer.php?reportfilelocation='+reportFile+'.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		var form = '<form id="fakeReportFormID" action=resources/stimulsoftjsv2/viewer.php?reportfilelocation=' + reportFile + '.mrt target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
		for (var x in paramList) {
			if (paramList[x] === null) {
				paramList[x] = '';
			}
			form += '<input type="hidden" name="' + x + '" value="' + paramList[x] + '">';
		}
		form += '<input type="submit" value="post"></form>';
		form += '<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
		return form;
	},
	fdar: function () {
		var me = this;
		var x = {
			init: function () {
				/// init here
			},
			create: function () {
//				me.getGriddetail().getStore().removeAll();
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

		var fields = me.getFormdata().getValues();

		resetTimer();
		me.getFormdata().up('window').body.mask('Saving, please wait ...');
		Ext.Ajax.request({
			url: 'erems/revenuesharing/update',
			params: {
				data: Ext.encode(fields)
			},
			success: function (response) {
				me.getFormdata().up('window').body.unmask();
				if (Ext.decode(response.responseText).success == true){
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
	},
	// added by rico 05122022
	dataLegalitasSave: function () {
		var me = this;
		var form = me.getFormdatalegalitas();
		var fields = form.getValues();

		resetTimer();
		form.up('window').body.mask('Saving, please wait ...');

		Ext.Ajax.request({
			url: 'erems/revenuesharing/update',
			params: {
				data: Ext.encode(fields),
				mode_type: 'legalitas'
			},
			success: function (response) {
				form.up('window').body.unmask();
				if (Ext.decode(response.responseText).success == true){
					Ext.Msg.show({
						title: 'Success',
						msg: 'Data saved successfully.',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							form.up('window').close();
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
	},
	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		grid.down('#btnEdit').setDisabled(row.length != 1);
		grid.down('#btnDelete').setDisabled(row.length > 0 ? false : true);
		grid.down('#btnView').setDisabled(true);
		grid.down('#btnLegalitas').setDisabled(true); // added by rico 05122022
		if (row.length == 1) {
			grid.down('#btnLegalitas').setDisabled(false); // added by rico 05122022
			grid.down('#btnView').setDisabled(row[0].data.rangebagihasil_name == "");
		}
//        grid.down('#btnDelete').setDisabled(row.length < 1);
	},
	checkboxSetCluster: function (el) {
		var me = this;
		if (el.getValue()) {
			me.getFormdata().down("[name=cluster_id]").setReadOnly(false);
			me.getFormdata().down("[name=cluster_id]").allowBlank = false;
			el.setValue(1);
		} else {
			me.getFormdata().down("[name=cluster_id]").setReadOnly(true);
			me.getFormdata().down("[name=cluster_id]").allowBlank = true;
			el.setValue(0);
		}
	},
	rangeBagiHasil: function (el) {
		var me = this;
		me.getFormdata().down("[name=rangebagihasil_code]").setValue('');
		me.getGriddetail().getStore().removeAll();
		var i = el.getStore().findExact('rangebagihasil_id', el.getValue());
		if (i > -1) {
			var rec = el.store.getAt(i);
			me.getFormdata().down("[name=rangebagihasil_code]").setValue(rec.get('code'));

			me.getGriddetail().getStore().getProxy().setExtraParam('rangebagihasil_id', el.getValue());
			me.getGriddetail().getStore().load();
		}
	},
	formDataShowView: function (state) {
		var me = this;
		var formtitle = 'Lookup Sudah di Revenue Sharing';
		var formicon = 'icon-search';

		var winId = 'win-revenuesharingprosesformdataview';
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
							win.add(Ext.create('Erems.view.' + me.controllerName + '.FormDataView'));
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
	// added by rico 05122022
	formDataShowLegalitas: function (state) {
		var me = this;
		var formtitle = 'Biaya Legalitas';
		var formicon = 'icon-new';

		var winId = 'win-revenuesharingformdatalegalitas';
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
							win.add(Ext.create('Erems.view.' + me.controllerName + '.FormDataLegalitas'));
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
	dataSearchFilterby: function (val) {
		var me = this;

		var form = me.getFormsearch().getForm();
		var fields = me.getFormsearch().getValues();
		var store = me.getGrid().getStore();
		for (var x in fields) {
			store.getProxy().setExtraParam(x, fields[x]);
		}
		store.getProxy().setExtraParam('set_rs', val);

		me.loadPage(store);
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
				confirmmsg = 'Unset RS ' + selectedRecord + ' ?';
				failmsg = 'Error: Unable to Unset RS ' + selectedRecord + '.';
			} else {
				confirmmsg = 'This action will Unset RS ' + recordcounttext + '.<br />Continue ?';
				failmsg = 'Error: Unable to Unset RS.';
			}
			Ext.Msg.confirm('Unset RS ', confirmmsg, function (btn) {
				if (btn == 'yes') {
					resetTimer();
					var msg = function () {
						me.getGrid().up('window').mask('Unset RS, please wait ...');
					};
					for (var i = 0; i < rows.length; i++) {
						store.remove(rows[i]);
					}

					store.on('beforesync', msg);
					store.sync({
						success: function (s) {
							me.getGrid().up('window').unmask();
							var successmsg = 'Unset RS successfully.';
							store.un('beforesync', msg);
							store.reload();
//							if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
//								Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
//							}
							Ext.Msg.show({
								title: 'Success',
								msg: successmsg,
								icon: Ext.Msg.INFO,
								buttons: Ext.Msg.OK
							});
						},
						failure: function () {
							me.getGrid().up('window').unmask();
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
});
