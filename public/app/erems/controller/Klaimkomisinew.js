Ext.define('Erems.controller.Klaimkomisinew', {
	extend: 'Erems.library.template.controller.Controller',
	//    extend: 'Erems.library.template.controller.Controlleralt',
	requires: ['Erems.library.DetailtoolAll'],
	alias: 'controller.Klaimkomisinew',
	views: ['klaimkomisinew.Panel', 'klaimkomisinew.Grid', 'klaimkomisinew.FormSearch', 'klaimkomisinew.GridDetail', 'klaimkomisinew.FormData'],
	stores: ['Mastercluster', 'Masterblock', 'Klaimkomisinew', 'Klaimkomisinewdetail', 'Purchaseletterberkas', 'Purchaseletterdetail', 'Masterberkas', 'Masterparameterglobal'],
	models: ['Klaimkomisinew', 'Purchaseletter'],
	detailTool: null,
	detailTool2: null,
	datapl: [],
	dataprt: [],
	refs: [
		{
			ref: 'panel',
			selector: 'klaimkomisinewpanel'
		},
		{
			ref: 'grid',
			selector: 'klaimkomisinewgrid'
		},
		{
			ref: 'formsearch',
			selector: 'klaimkomisinewformsearch'
		},
		{
			ref: 'formdata',
			selector: 'klaimkomisinewformdata'
		},
		{
			ref: 'detailgrid',
			selector: 'klaimkomisinewgriddetail'
		},
	],
	//    comboBoxIdEl: ['fs_cluster_id','fs_block_id'],
	controllerName: 'klaimkomisinew',
	fieldName: 'berkas',
	bindPrefixName: 'Klaimkomisinew',
	formWidth: 800,
	ctrler: '', //for get controller on browse item
	spcreq: '', //for get param_spcreq on browse item
	mnuname: '',
	sprIndex: 0,
	init: function (application) {
		var me = this;

		this.control({
			'klaimkomisinewpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'klaimkomisinewgrid': {
				afterrender: this.gridAfterRender,
//				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},

			'klaimkomisinewgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			//            'klaimkomisinewgrid toolbar button[action=cetak_surat_berkas]': {
			//                click: this.docPrint
			//            },
			'klaimkomisinewgrid toolbar button[action=proses_klaim]': {
				click: this.prosesklaim
			},
			'klaimkomisinewgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'klaimkomisinewformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'klaimkomisinewformsearch button[action=search]': {
				click: this.dataSearch
			},
			'klaimkomisinewformsearch button[action=reset]': {
				click: this.dataReset
			},
			'klaimkomisinewformdata': {
				afterrender: this.formDataAfterRender
			},
			'klaimkomisinewformdata button[action=proseskomisi]': {
				click: this.dataSave
			},

		});
	},
	panelAfterRender: function () {
		var me = this;

		// me.getDetailgrid().body.mask('Loading Detail, please wait ...');
		// var klaimkomisinewdetailStore = me.getKlaimkomisinewdetailStore();
		// klaimkomisinewdetailStore.removeAll();
		// klaimkomisinewdetailStore.load({
		//         callback: function(pencairanrec) {
		//                 me.getDetailgrid().body.unmask();
		//         }
		// });

	},
	prosesklaim: function () {
		var me = this;
		me.detailTool = new Erems.library.DetailtoolAll();
		me.detailTool.setConfig({
			viewPanel: 'FormData',
			parentFDWindowId: me.getPanel().up('window').id,
			controllerName: me.controllerName
		});
		me.detailTool.parentGridAlias = 'klaimkomisinewgrid';

		me.detailTool.form().show('create', 500, 'Proses Klaim Komisi');

	},

	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		grid.down('#btnProses').setDisabled(row.length < 1);
		grid.down('#btnDelete').setDisabled(row.length != 1);

		var rec = grid.getSelectedRecord();
		if (!rec) {
			return false;
		}
		//        console.log(rec.get("purchaseletter_id"));
		me.getDetailgrid().body.mask('Loading Detail, please wait ...');
		var klaimkomisinewdetailStore = me.getKlaimkomisinewdetailStore();
		klaimkomisinewdetailStore.removeAll();
		klaimkomisinewdetailStore.load({
			params: {purchaseletter_id: rec.get("purchaseletter_id")},
			callback: function (pencairanrec) {
				me.getDetailgrid().body.unmask();
			}
		});

		Ext.Ajax.request({
			url: 'erems/klaimkomisinew/read',
			params: {
				mode_read: 'detail_grid_komisi_cair',
				purchaseletter_id: rec.get("purchaseletter_id")
			},
			success: function (response) {
				if (response.responseText == 0 /*|| response.responseText == "null"*/) {
					grid.down('#btnDelete').setDisabled(row.length != 1);
				} else {
					grid.down('#btnDelete').setDisabled(true);
				}
			}
		});

	},

	fdar: function () {
		var me = this;
		var x = {
			init: function () {
				//show form add pencarian 
				//                me.detailTool = new Erems.library.DetailtoolAll();
				//                me.detailTool.setConfig({
				//                    viewPanel: 'FormDataDetail',
				//                    parentFDWindowId: me.getFormdata().up('window').id,
				//                    controllerName: me.controllerName
				//                });
				//                me.detailTool.parentGridAlias = 'klaimkomisinewgriddetail';
			},
			create: function () {
				//                alert('woyyyy');
				var grid = me.getGrid();
				var rec = grid.getSelectedRecord();
				var rows = grid.getSelectionModel().getSelection();
				//                console.log(rows[0].data['purchaseletter_id']);
				for (var i = 0; i < rows.length; i++) {

					me.datapl[i] = rows[i].data['purchaseletter_id'];
					me.dataprt[i] = rows[i].data['pricetype_id'];
				}
				//                console.log(me.datapl)
				//                me.getFormdata().down('[name=purchaseletter_id]').setValue(rec.get('purchaseletter_id'));
				//                me.getFormdata().down('[name=pricetype_id]').setValue(rec.get('pricetype_id'));

			},
			update: function () {

			}
		};
		return x;
	},

	dataSave: function () {
		var me = this;
		var form = me.getFormdata().getForm();
		var addingRecord = false;
		if (!me.finalValidation()) {
			return false;
		}


		if (form.isValid()) {


			resetTimer();
			//var store = me.getGrid().getStore();
			var store = null;
			//                if (me.instantCreateMode) {
			//                    store = _Apps.getController(me.callerId).getInstanCreateStorex(me.controllerName);
			//                } else {
			store = me.getDetailgrid().getStore();
			//                }

			var msg = function () {
				me.getFormdata().up('window').body.mask('Saving data, please wait ...');
			};
			//                    console.log(form.getValues());
			var formdata = this.getFormdata();
			var formdata = this.getFormdata();
			var fida = me.getFinalData(form.getValues());
			//                    var fida=[];
			fida['data_purchaseletter_id'] = me.datapl;
			fida['data_pricetype_id'] = me.dataprt;



			switch (me.getFormdata().up('window').state.toLowerCase()) {
				case 'create':

					store.add(fida);
					addingRecord = true;
					break;
					//                    case 'update':
					//
					//                        var idProperty = store.getProxy().getReader().getIdProperty();
					//                        var rec = store.getById(parseInt(form.findField(idProperty).getValue(), 10));
					//                        rec.beginEdit();
					//                        rec.set(fida);
					//                        rec.endEdit();
					//                        break;
				default:
					return;
			}

			store.on('beforesync', msg);
			store.sync({
				success: function () {
					me.getFormdata().up('window').body.unmask();
					store.un('beforesync', msg);
					store.removeAll();
					store.reload();


					if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
						Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 0}});
					}
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

			//                }
		}

	},

	dataDestroy: function () {
		var me = this;
		var rows = me.getGrid().getSelectionModel().getSelection();
		var rec = me.getGrid().getSelectedRecord();
		var store = me.getGrid().getStore();
		var confirmmsg, successmsg, failmsg;
		if (rows.length == 1) {
			var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('cluster') + ']';
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
						me.getGrid().up('window').unmask();
						var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
						var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
						store.un('beforesync', msg);
						store.reload();
						if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
							Ext.StoreManager.lookup(me.stores[0]).load({params: {limit: 25}});
						}

						me.getDetailgrid().body.mask('Loading Detail, please wait ...');
						var klaimkomisinewdetailStore = me.getKlaimkomisinewdetailStore();
						klaimkomisinewdetailStore.removeAll();
						klaimkomisinewdetailStore.load({
							// params: { purchaseletter_id: rec.get("purchaseletter_id") },
							callback: function (pencairanrec) {
								me.getDetailgrid().body.unmask();
							}
						});

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
	},

	getFinalData: function (formGetValues) {
		var finalData = formGetValues;
		return finalData;
	},
	validationProcess: function () {
		return true;
	},

	///////////////////////////////// batas////////////////////////////




});