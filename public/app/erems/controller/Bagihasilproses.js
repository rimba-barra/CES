Ext.define('Erems.controller.Bagihasilproses', {
	extend: 'Erems.library.template.controller.Controllerpopup',
	alias: 'controller.Bagihasilproses',
	views: ['bagihasilproses.Panel', 'bagihasilproses.Grid', 'bagihasilproses.FormSearch', 'bagihasilproses.FormData', 'bagihasilproses.FormDataSummary'],
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Projectptcombobox'
	],
	stores: ['Mastercluster', 'Bagihasilproses', 'Masterlandrepayment', 'Bagihasilprosesdate', 'Bagihasilprosesdetail', 'Masterparameterglobal', 'Masterdata.store.Projectpt'],
	models: ['Bagihasilproses', 'Masterlandrepayment', 'Bagihasilprosesdate', 'Bagihasilprosesdetail', 'Masterparameterglobal','Masterdata.model.Projectpt'],
	refs: [
		{
			ref: 'grid',
			selector: 'bagihasilprosesgrid'
		},
		{
			ref: 'formsearch',
			selector: 'bagihasilprosesformsearch'
		},
		{
			ref: 'formdata',
			selector: 'bagihasilprosesformdata'
		},
		{
			ref: 'detailgrid',
			selector: 'bagihasilprosesdetailgrid'
		},
		{
			ref: 'detailgridprosesdate',
			selector: 'bagihasilprosesdategrid'
		},
		// added by rico 21092022
		{
			ref: 'formdatasummary',
			selector: 'bagihasilprosesformdatasummary'
		},
	],
	controllerName: 'bagihasilproses',
	fieldName: 'code',
	bindPrefixName: 'Bagihasilproses',
	formWidth: 350,
	nomorValue: 1,
	splitLRP: 0,
	deleteLRP: 0,
	//project_name: null,
	//pt_name: null,
	init: function (application) {
		var me = this;
		this.control({
			'bagihasilprosespanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: me.panelAfterRender

			},
			'bagihasilprosesgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'#bagihasilprosesgrid_ctxMenu menuitem' : {
				click : function(el){
					if(el.action == 'update_bunga'){
						me.showBungaLRP();
					}
					else if(el.action == 'summary_report'){
						me.showSummaryReport();
					}
				}
			},
			'bagihasilprosesgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'bagihasilprosesgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'bagihasilprosesgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'bagihasilprosesgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'bagihasilprosesgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'bagihasilprosesformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'bagihasilprosesformsearch button[action=search]': {
				click: this.dataSearch
			},
			'bagihasilprosesformsearch button[action=reset]': {
				click: this.dataReset
			},
			'bagihasilprosesformdata': {
				afterrender: this.formDataAfterRender
			},
			'bagihasilprosesformdata button[action=save]': {
				click: this.dataSave
			},
			'bagihasilprosesformdata button[action=cancel]': {
				click: this.formDataClose
			},

			'bagihasilprosesdategrid': {
				afterrender: this.gridprosesdateAfterRender,
				/* itemdblclick: this.gridItemDblClick,
				 itemcontextmenu: this.gridItemContextMenu,*/
				selectionchange: this.gridprosesdateSelectionChange
			},
			'bagihasilprosesdetailgrid': {
				afterrender: this.gridprosesdetailAfterRender,
				/* itemdblclick: this.gridItemDblClick,
				 itemcontextmenu: this.gridItemContextMenu,
				 selectionchange: this.gridSelectionChange */
			},

			'bagihasilprosesdategrid toolbar button[action=print_lrp_stimulsoft]': {
				click: this.docPrint
			},
			'bagihasilprosesdategrid toolbar button[action=print_lrp_excel]': {
				click: function (el) {
					this.docPrintExcel(el)
				}
			},
			'bagihasilprosesdategrid toolbar button[action=print_lrp_pdf]': {
				click: function (el) {
					this.docPrintPdf(el)
				}
			},

			//=== bunga LRP ===//
			'bagihasilprosesgrid toolbar button[action=update_bunga]': {
				click: this.showBungaLRP
			},

			// added by rico 20092022
			'bagihasilprosesgrid toolbar button[action=summary_report]': {
				click: this.showSummaryReport
			},
			'bagihasilprosesformdatasummary': {
				afterrender: this.formDataSummaryAfterRender
			},
			'bagihasilprosesformdatasummary [name=cbf_cluster_id]': {
				change: function(el) {
					var form = me.getFormdatasummary();
					if (el.getValue()) {
						el.prev().setValue(0);
						form.down('[name=pt_id]').setValue('');
					}
				}
			},
			'bagihasilprosesformdatasummary [name=pt_id]': {
				change: function(el) {
					var form = me.getFormdatasummary();
					if(el.getValue()){
						form.down('[name=cbf_cluster_id]').setValue(0);	
					}
				}
			},
			'bagihasilprosesformdatasummary button[action=save]': {
				click: this.saveSummaryReport
			},

		});
	},

	panelAfterRender: function (configs) {
		var me = this;
		Ext.Ajax.request({
			url: 'erems/bagihasilproses/read',
			params: {read_type_mode: 'configLRP'},
			success: function (response) {
				response = Ext.decode(response.responseText);
				me.splitLRP = response.splitLRP;
				me.deleteLRP = response.deleteLRP;
			},
		});
	},

	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		// grid.down('#btnEdit').setDisabled(row.length != 1);
		// grid.down('#btnDelete').setDisabled(row.length < 1);

		if (row[0]) {
			var unit_id = row[0].data.unit_id;
			var store = me.getDetailgrid().getStore();
			//store.removeAll();
			store.getProxy().setExtraParam('unit_id', unit_id);
			store.getProxy().setExtraParam('lrp_id', 0);
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
		store.getProxy().setExtraParam('lrp_id', 0);
		store.loadPage(1);
	},

	gridprosesdateSelectionChange: function () {
		var me = this;
		var grid = me.getDetailgridprosesdate(), row = grid.getSelectionModel().getSelection();
		var indexOf = grid.getStore().indexOf(row[0]);

		grid.down('#btnDestroy').setDisabled(true);
		if (indexOf < 1 && me.deleteLRP > 0) {
			grid.down('#btnDestroy').setDisabled(false);
		}

		grid.down('#btnPrintLRPMRT').setDisabled(row.length != 1);
		grid.down('#btnPrintLRPXLS').setDisabled(row.length != 1);
		grid.down('#btnPrintLRPPDF').setDisabled(row.length != 1);

		if (row[0]) {
			var lrp_id = row[0].data.lrp_id;
			var store = me.getDetailgrid().getStore();
			//store.removeAll();
			store.getProxy().setExtraParam('unit_id', 0);
			store.getProxy().setExtraParam('purchaseletter_id', 0);
			store.getProxy().setExtraParam('lrp_id', lrp_id);
			store.loadPage(1);
		}
	},

	dataSave: function () {
		var me = this;
		var form = me.getFormdata().getForm();
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
			confirmmsg = 'Delete LRP ' + selectedRecord + ' ?';
			failmsg = 'Error: Unable to delete LRP ' + selectedRecord + '.';

			Ext.Msg.confirm('Delete LRP', confirmmsg, function (btn) {
				if (btn == 'yes') {
					resetTimer();
					var msg = function () {
						me.getGrid().up('panel').mask('Delete LRP, please wait ...');
					};
					for (var i = 0; i < rows.length; i++) {
						store.remove(rows[i]);
					}

					store.on('beforesync', msg);
					store.sync({
						success: function (s) {
							me.getGrid().up('panel').unmask();
							var successmsg = 'Delete LRP successfully.';
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

	docPrint: function () {
		var me = this;
		// console.log(me.project_name);

		var winId = 'myReportWindow';
		me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		var win = desktop.getWindow(winId);

		if (win) {
			var params = {};
			var reportFile = "Landrepayment";
			var dateNow = new Date();

			var grid = me.getDetailgridprosesdate(), row = grid.getSelectionModel().getSelection();

			if (row[0]) {

				var lrp_id = row[0].data.lrp_id;
				var doc_no = row[0].data.doc_no;

				params["lrp_id"] = lrp_id;
				params["doc_no"] = doc_no;
				params["project_id"] = apps.project;
				params["pt_id"] = apps.pt;
				params["tgl_sekarang"] = dateNow.getDate() + "-" + (dateNow.getMonth() + 1) + "-" + dateNow.getFullYear();
				params["time_sekarang"] = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();

				Ext.Ajax.request({
					url: 'erems/bagihasilproses/read',
					params: {
						read_type_mode: 'report'
					},
					success: function (response) {
						var info = Ext.JSON.decode(response.responseText);
						params["project_name"] = info.project_name;
						params["pt_name"] = info.pt_name;

						//params["project_name"] = me.project_name;
						//params["pt_name"] = me.pt_name;
						console.log(params);
						var html = me.generateFakeForm2(params, reportFile);
						win.down("#MyReportPanel").body.setHTML(html);
						$("#fakeReportFormID").submit();
					},
				});


			}
		}
	},

	docPrintExcel: function (el) {
		var me = this;

		var grid = me.getDetailgridprosesdate(), row = grid.getSelectionModel().getSelection();
		if (row[0]) {

			var lrp_id = row[0].data.lrp_id;
			var doc_no = row[0].data.doc_no;
			var proses_date = row[0].data.proses_date;

			el.up('window').body.mask('Creating Excel File, Please Wait...');

			Ext.Ajax.timeout = 60000 * 30;

			Ext.Ajax.request({
				url: 'erems/bagihasilproses/read/?action=schema',
				params: {
					read_type_mode: 'export_excel',
					lrp_id: lrp_id,
					doc_no: doc_no,
					proses_date: proses_date
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
		}
	},

	docPrintPdf: function (el) {
		var me = this;

		var grid = me.getDetailgridprosesdate(), row = grid.getSelectionModel().getSelection();
		if (row[0]) {
			var lrp_id = row[0].data.lrp_id;
			var doc_no = row[0].data.doc_no;
			var proses_date = row[0].data.proses_date;

			el.up('window').body.mask('Creating Pdf File, Please Wait...');

			Ext.Ajax.timeout = 60000 * 30;

			Ext.Ajax.request({
				url: 'erems/bagihasilproses/read/?action=schema',
				params: {
					read_type_mode: 'export_pdf',
					lrp_id: lrp_id,
					doc_no: doc_no,
					proses_date: proses_date
				},
				success: function (response) {
					try {
						var resp = Ext.JSON.decode(response.responseText);

						if (resp.success) {
							el.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Info',
								msg: '<a href="' + resp.url + '" target="blank">Click Here For Download Pdf File</a>',
								icon: Ext.Msg.INFO,
								//buttons: [], //jika ingin tidak ada buttons
								buttons: Ext.Msg.CANCEL,
								buttonText: {
									cancel: 'Close',
								}
							});
						} else {
							el.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Failure',
								msg: 'Error: Export to Pdf Failed.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					} catch (e) {
						el.up('window').body.unmask();
						Ext.Msg.show({
							title: 'Failure',
							msg: 'Error: Export to Pdf Failed.',
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
						msg: 'Error: Export to Pdf Failed.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			});
		}
	},

	//====================== show bunga LRP ==========================
	showBungaLRP: function () {
		var me = this;

		Ext.create('Ext.window.Window', {
			title: 'Bunga LRP',
			height: 135,
			width: 380,
			//layout: 'hbox',
			padding: '10px 10px 10px 10px',
			modal: true,
			items: {// Let's put an empty grid in just to illustrate fit layout
				padding: '10px 0 0 10px',
				xtype: 'datefield',
				fieldLabel: 'Tgl. Proses Bunga',
				labelWidth: '55%',
				name: 'prosesbunga_date',
				// editable: false,
				allowBlank: false,
				value: new Date(),
				format: 'd-m-Y',
				altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
				submitFormat: 'Y-m-d H:i:s.u',
				maskRe: /[0-9-]/,
				enforceMaxLength: true,
				maxLength: 10,
				listeners: {
					blur: function (field) {
						var today = new Date();
						if (!field.isValid()) {
							Ext.Msg.alert('Info', 'Date is invalid!');
							field.setValue(today);
						}
					}
				}
			},
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					ui: 'footer',
					layout: {
						padding: 6,
						type: 'hbox'
					},
					items: [
						{
							xtype: 'button',
							action: 'savebungalrp',
							padding: 5,
							width: 75,
							iconCls: 'icon-save',
							text: 'Save',
							handler: function () {

								var prosesbunga_date = this.up('window').items.items[0].value;
								if (!prosesbunga_date) {
									Ext.Msg.show({
										title: 'Alert',
										msg: 'Please Select Date First',
										icon: Ext.Msg.WARNING,
										buttons: Ext.Msg.OK
									});
									return false;
								}

								this.up('window').body.mask('Saving, Please Wait...');

								me.saveBungaLRP(prosesbunga_date, this.up('window'));
							}
						},
						{
							xtype: 'button',
							action: 'cancel',
							itemId: 'btnCancel',
							padding: 5,
							width: 75,
							iconCls: 'icon-cancel',
							text: 'Cancel',
							handler: function () {
								this.up('window').close();
							}
						}
					]
				}
			]
		}).show();
	},

	saveBungaLRP: function (text, win) {
		var me = this;

		Ext.Ajax.request({
			url: 'erems/bagihasilproses/read',
			params: {
				read_type_mode: 'update_bungalrp',
				prosesbunga_date: text
			},
			success: function (response) {
				win.body.unmask();
				if (Ext.decode(response.responseText).success == true)
				{
					Ext.Msg.show({
						title: 'Success',
						msg: 'Save successfully.',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {
							win.close();

							var storeDepan = me.getGrid().getStore();
							var storeDetailgrid = me.getDetailgrid().getStore();
							var storeDetailgridProsesdate = me.getDetailgridprosesdate().getStore();

							storeDepan.reload();
							storeDetailgrid.reload();
							storeDetailgridProsesdate.reload();
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
	//====================== end show bunga LRP ======================
	fdar: function () {
		var me = this;
		var x = {
			init: function () {
				if (me.splitLRP == 1) {
					var storepp = me.getFormdata().down('[name=pt_id]').getStore();
					me.getFormdata().down("[name=pt_id]").setVisible(true);
					storepp.clearFilter(true);
					storepp.filter({
						property: 'project_id',
						value: apps.project,
						exactMatch: true,
						caseSensitive: true
					});
				} else {
					me.getFormdata().down("[name=pt_id]").allowBlank = true;
				}
			},
			create: function () {
				/// create here  

			},
			update: function () {
				var grid = me.getGrid();
				var store = grid.getStore();

				var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
				me.getFormdata().loadRecord(record);
				/// update here
			}
		};
		return x;
	},
	//====================== show summary report ==========================
    formDataSummaryAfterRender: function (el) {
		var me = this;
		var form = me.getFormdatasummary();

		if (me.splitLRP == 1) {
			var storepp = form.down('[name=pt_id]').getStore();
			form.down("[name=pt_id]").setVisible(true);
			storepp.clearFilter(true);
			storepp.filter({
				property: 'project_id',
				value: apps.project,
				exactMatch: true,
				caseSensitive: true
			});
			// form.down("[name=pt_id]").setVisible(true);
			// form.down("[name=cbf_cluster_id]").setVisible(true);
			form.down("#pt_box").setVisible(true); // added by rico 10102022
		}else{
			// form.down("[name=pt_id]").setVisible(false);
			// form.down("[name=cbf_cluster_id]").setVisible(false);
			form.down("#pt_box").setVisible(false); // added by rico 10102022
		}
        var me = this;
        me.loadComboBoxStore(el);
    },
	showSummaryReport: function () {
		var me = this;

        win = desktop.createWindow({
            id: 'bagihasilprosesformdatasummary',
            title: 'Summary Report',
            iconCls: 'icon-form-add',
            resizable: false,
            minimizable: false,
            maximizable: false,
			height: 175,
            width: 400,
            renderTo: Ext.getBody(),
            constrain: true,
            constrainHeader: false,
            modal: true,
            layout: 'fit',
            shadow: 'frame',
            shadowOffset: 10,
            border: false,
            state: 'create',
            listeners: {
                boxready: function() {
                    win.body.mask('Loading...');
                    var tm = setTimeout(function() {
                        win.add(Ext.create('Erems.view.' + me.controllerName + '.FormDataSummary'));
                        win.center();
                        win.body.unmask();
                        clearTimeout(tm);
                    }, 1000);

                }
            }
        });

        win.show();
	},

	saveSummaryReport: function () {
		var me = this;
		var winId = 'myReportWindow';
		me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
		var win = desktop.getWindow(winId);

		if (win) {
			var params = {};
			var reportFile = "SummaryReportProses";
			var summary = me.getFormdatasummary().getForm();

			if(summary){
				var pt_id = (summary.getValues().cbf_cluster_id && (summary.getValues().pt_id == undefined || summary.getValues().pt_id == '')) ? '': summary.getValues().pt_id;
				var periode_cutoff_date = new Date(summary.getValues().periode_cutoff_date);

				Ext.Ajax.request({
					url: 'erems/bagihasilproses/read',
					params: {
						read_type_mode: 'summary_report',
						pt_id: pt_id
					},
					success: function (response) {
						var info = Ext.JSON.decode(response.responseText);

						params["pt_name"] 			  = info.pt_name;
						params["project_id"] 		  = apps.project;
						params["pt_id"] 			  = pt_id;
						params["pc_date"] 			  = periode_cutoff_date;
						params["periode_cutoff_date"] = periode_cutoff_date.getFullYear()+"-"+(periode_cutoff_date.getMonth()+1)+"-"+periode_cutoff_date.getDate();
						
						var html = me.generateFakeForm2(params, reportFile);
						win.down("#MyReportPanel").body.setHTML(html);
						$("#fakeReportFormID").submit();
					},
				});
			}
		}
	},
	//====================== end summary report ==========================
});