Ext.define('Erems.controller.Pelunasan', {
	extend: 'Erems.library.template.controller.Controllerwb_old',
	alias: 'controller.Pelunasan',
	views: ['pelunasan.Panel', 'pelunasan.Grid', 'pelunasan.FormSearch'],
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox'
	],
	stores: ['Pelunasan', 'Mastercluster', 'Masterblock'],
	models: ['Pelunasan'],
	refs: [
		{
			ref: 'grid',
			selector: 'pelunasangrid'
		},
		{
			ref: 'formsearch',
			selector: 'pelunasanformsearch'
		},
		{
			ref: 'formdata',
			selector: 'pelunasanformdata'
		}
	],
	controllerName: 'pelunasan',
	fieldName: 'pelunasan_no',
	bindPrefixName: 'Pelunasan',
	validationItems: [

	],

	formWidth: 800,
	countLoadProcess: 0,
	flagLunas: 0,
	flagLunasAll: 0,
	init: function (application) {
		var me = this;

		this.control({
			test: me.eventMonthField,
			'pelunasanpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'pelunasangrid': {
				afterrender: this.gridAfterRender,
				//itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange,
				cellclick : function (el, td, cellIndex, record, tr, rowIndex, e, eOpts) {
					if(record.data.remaining_denda_total > 0){
						Ext.Msg.show({
							title   : 'Alert',
							msg     : 'Unit [' + record.data.unit_number.trim() + '] masih ada denda, tidak bisa di Set Lunas.',
							icon    : Ext.Msg.ERROR,
							buttons : Ext.Msg.OK,
						});
						return false;
					}
				}
			},
			'pelunasangrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'pelunasangrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'pelunasangrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'pelunasangrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'pelunasangrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'pelunasanformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'pelunasanformsearch button[action=search]': {
				click: this.dataSearch
			},
			'pelunasanformsearch button[action=reset]': {
				click: this.dataReset
			},
			'pelunasanformdata': {
				afterrender: this.formDataAfterRender
			},
			'pelunasanformdata button[action=save]': {
				click: this.dataSave
			},
			'pelunasanformdata button[action=cancel]': {
				click: this.formDataClose
			},

			//=== click set lunas all ====
			'pelunasangrid button[action=setLunasAll]': {
				click: me.setLunasAll
			},
			'pelunasangrid button[action=submitLunas]': {
				click: me.submitLunas
			},
			//=== end click set lunas all ====
		});
	},

	//=== click set lunas all ====
	setLunasAll: function () {
		var me = this;
		var grid = me.getGrid();
		var store = grid.getStore();
		var dateNow = new Date();

		//cek lunas date exist or not
		var lunas_date = 0, lunas_rd = 0, total_grid = 0;
		store.each(function (rec) {
			if (rec.data.lunas_date) {
				lunas_date = 1;
			}

			if(rec.data.remaining_denda_total > 0){
				lunas_rd++;
			}
			total_grid++;
		});

		if(lunas_rd == total_grid && me.flagLunas == 0){
			Ext.Msg.show({
				title   : 'Alert',
				msg     : 'Tidak bisa di set all lunas, karena masih ada denda.',
				icon    : Ext.Msg.ERROR,
				buttons : Ext.Msg.OK,
			});
			return false;
		}

		if (me.flagLunas == 0) {
			Ext.Msg.show({
				title      : "Information",
				msg        : "Set Lunas Semua?",
				buttonText : {
					//ok     : "Hanya Halaman Ini",
					yes    : "Hanya Halaman Ini",
					// no     : "Semua Transaksi",
					cancel : "Cancel"
				},
				// buttons : Ext.MessageBox.YESNOCANCEL,
				buttons : Ext.MessageBox.YESCANCEL,
				icon    : Ext.MessageBox.QUESTION,
				width   : 300,
				fn      : function (btn) {
					if (btn == 'yes') { //"Hanya Halaman Ini",
						//cek lunas date
						if (lunas_date == 1) { //jika ada lunas date yang sudah diinput
							Ext.Msg.show({
								title      : "Information",
								msg        : "Apakah tanggal lunas yang sudah diinput ingin diganti dengan tanggal hari ini?",
								buttonText : {
									//ok     : "Hanya Halaman Ini",
									yes    : "Ganti semua dengan tanggal hari ini",
									no     : "Ganti yang belum diinput saja",
									cancel : "Cancel"
								},
								buttons : Ext.MessageBox.YESNOCANCEL,
								icon    : Ext.MessageBox.QUESTION,
								width   : 300,
								fn      : function (btn) {
									if (btn == 'yes') { //"Ganti semua dengan tanggal hari ini",
										store.suspendEvents();
										store.each(function (rec) {
											if(rec.data.remaining_denda_total <= 0){
												rec.set('lunas_date', dateNow)
											}
										})
										store.resumeEvents();
										grid.getView().refresh();

										me.flagLunasAll = 0;
										me.flagLunas = 1;
										grid.getSelectionModel().selectAll();
										grid.down('#btnLunasAll').setText('UNSET ALL');
									} 
									else if (btn == 'no') { //"Ganti yang belum diinput saja",
										store.suspendEvents();
										store.each(function (rec) {
											if (!rec.data.lunas_date && rec.data.remaining_denda_total <= 0) {
												rec.set('lunas_date', dateNow);
											}
										})
										store.resumeEvents();
										grid.getView().refresh();

										me.flagLunasAll = 0;
										me.flagLunas = 1;
										grid.getSelectionModel().selectAll();
										grid.down('#btnLunasAll').setText('UNSET ALL');
									} 
									else if (btn == 'cancel') { //"Cancel"
										me.flagLunasAll = 0;
										me.flagLunas = 0;
									}
								}
							});
						} 
						else { //jika lunas date belum diinput semua
							store.suspendEvents();
							store.each(function (rec) {
								if(rec.data.remaining_denda_total <= 0){
									rec.set('lunas_date', dateNow)
								}
							})
							store.resumeEvents();
							grid.getView().refresh();

							me.flagLunasAll = 0;
							me.flagLunas = 1;
							grid.getSelectionModel().selectAll();
							grid.down('#btnLunasAll').setText('UNSET ALL');
						}
						//end cek lunas date

					} 
					else if (btn == 'no') { //"Semua Transaksi",
						//cek lunas date
						if (lunas_date == 1) { //jika ada lunas date yang sudah diinput
							Ext.Msg.show({
								title      : "Information",
								msg        : "Apakah tanggal lunas yang sudah diinput ingin diganti dengan tanggal hari ini?",
								buttonText : {
									//ok     : "Hanya Halaman Ini",
									yes    : "Ganti semua dengan tanggal hari ini",
									no     : "Ganti yang belum diinput saja",
									cancel : "Cancel"
								},
								buttons : Ext.MessageBox.YESNOCANCEL,
								icon    : Ext.MessageBox.QUESTION,
								width   : 300,
								fn      : function (btn) {
									if (btn == 'yes') { //"Ganti semua dengan tanggal hari ini",
										store.suspendEvents();
										store.each(function (rec) {
											if(rec.data.remaining_denda_total <= 0){
												rec.set('lunas_date', dateNow)
											}
										})
										store.resumeEvents();
										grid.getView().refresh();

										me.flagLunasAll = 1;
										me.flagLunas = 1;
										grid.getSelectionModel().selectAll();
										grid.down('#btnLunasAll').setText('UNSET ALL');
									} 
									else if (btn == 'no') { //"Ganti yang belum diinput saja",
										store.suspendEvents();
										store.each(function (rec) {
											if (!rec.data.lunas_date && rec.data.remaining_denda_total <= 0) {
												rec.set('lunas_date', dateNow);
											}
										})
										store.resumeEvents();
										grid.getView().refresh();

										me.flagLunasAll = 1;
										me.flagLunas = 1;
										grid.getSelectionModel().selectAll();
										grid.down('#btnLunasAll').setText('UNSET ALL');
									} 
									else if (btn == 'cancel') { //"Cancel"
										me.flagLunasAll = 0;
										me.flagLunas = 0;
									}
								}
							});
						} 
						else { //jika lunas date belum diinput semua
							store.suspendEvents();
							store.each(function (rec) {
								if(rec.data.remaining_denda_total <= 0){
									rec.set('lunas_date', dateNow)
								}
							})
							store.resumeEvents();
							grid.getView().refresh();

							me.flagLunasAll = 1;
							me.flagLunas = 1;
							grid.getSelectionModel().selectAll();
							grid.down('#btnLunasAll').setText('UNSET ALL');
						}
					} 
					else if (btn == 'cancel') { //"Cancel"
						me.flagLunasAll = 0;
						me.flagLunas = 0;
					}
				}
			});
		} 
		else {
			store.suspendEvents();
			store.each(function (rec) {
				rec.set('lunas_date', null)
			})
			store.resumeEvents();
			grid.getView().refresh();

			me.flagLunasAll = 0;
			me.flagLunas = 0;
			grid.getSelectionModel().deselectAll();
			grid.down('#btnLunasAll').setText('SET LUNAS ALL');
		}
	},
	//=== end click set lunas all ====

	//===  click apply ====
	submitLunas: function () {
		var me = this;
		var store = me.getGrid().getStore();

		var lunas_date = 0;
		var warn_remaining_denda = [];
		store.each(function (rec) {
			if (rec.data.lunas_date) {
				lunas_date = 1;
			}

			if(rec.data.lunas_date && rec.data.remaining_denda_total > 0){
				warn_remaining_denda.push(rec.data.unit_number.trim())
			}
		});

		var fields = me.getFormsearch().getValues();

		if (lunas_date == 0) {
			Ext.Msg.show({
				title   : 'Alert',
				msg     : 'Fill Lunas Date, at least 1',
				icon    : Ext.Msg.ERROR,
				buttons : Ext.Msg.OK,
			});
			return false;
		} 
		else if(warn_remaining_denda.length > 0){
			Ext.Msg.show({
				title   : 'Alert',
				msg     : 'Unit [' + warn_remaining_denda.join(', ') + '] masih ada denda, tidak bisa di Set Lunas.',
				icon    : Ext.Msg.ERROR,
				buttons : Ext.Msg.OK,
			});
			return false;
		}
		else {
			var data = [];
			for (var i = 0; i < store.getCount(); i++){
				store.each(function (record, idx) {
					if (i == idx) {
						data[i] = record.data;
					}
				});
			}

			var myObj = {
				lunas_all: me.flagLunasAll,
				cluster_id: fields.cluster_id,
				block_id: fields.block_id,
				data: data
			}

			Ext.Msg.confirm('Update Data', 'Set Pelunasan?', function (btn) {
				if (btn == 'yes') {
					resetTimer();
					me.getGrid().up('window').body.mask('Saving, please wait ...');

					Ext.Ajax.request({
						url: 'erems/pelunasan/setlunas',
						params: {
							data: Ext.encode(myObj)
						},
						success: function (response) {
							me.getGrid().up('window').body.unmask();
							if (Ext.decode(response.responseText).success == true)
							{
								Ext.Msg.show({
									title: 'Success',
									msg: 'Data saved successfully.',
									icon: Ext.Msg.INFO,
									buttons: Ext.Msg.OK,
									fn: function () {
										me.flagLunasAll = 0;
										me.flagLunas = 0;
										store.reload();
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
	//=== end click apply ====

	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();
		grid.down('#btnEdit').setDisabled(row.length != 1);
		grid.down('#btnDelete').setDisabled(row.length < 1);

		if (row.length == 0) {
			me.flagLunas = 0;
			grid.down('#btnLunasAll').setText('SET LUNAS ALL');
		}
	}
});