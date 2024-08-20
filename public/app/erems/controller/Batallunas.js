Ext.define('Erems.controller.Batallunas', {
	extend: 'Erems.library.template.controller.Controllerwb_old',
	alias: 'controller.Batallunas',
	views: ['batallunas.Panel', 'batallunas.Grid', 'batallunas.FormSearch'],
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox'
	],
	stores: ['Batallunas', 'Mastercluster', 'Masterblock'],
	models: ['Batallunas'],
	refs: [
		{
			ref: 'grid',
			selector: 'batallunasgrid'
		},
		{
			ref: 'formsearch',
			selector: 'batallunasformsearch'
		},
		{
			ref: 'formdata',
			selector: 'batallunasformdata'
		}
	],
	controllerName: 'batallunas',
	fieldName: 'batallunas_no',
	bindPrefixName: 'Batallunas',
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
			'batallunaspanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'batallunasgrid': {
				afterrender: this.gridAfterRender,
				//itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'batallunasgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'batallunasgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'batallunasgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'batallunasgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'batallunasgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'batallunasformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'batallunasformsearch button[action=search]': {
				click: this.dataSearch
			},
			'batallunasformsearch button[action=reset]': {
				click: this.dataReset
			},
			'batallunasformdata': {
				afterrender: this.formDataAfterRender
			},
			'batallunasformdata button[action=save]': {
				click: this.dataSave
			},
			'batallunasformdata button[action=cancel]': {
				click: this.formDataClose
			},

			//=== click set lunas all ====
			'batallunasgrid button[action=setBatalLunasAll]': {
				click: me.setBatalLunasAll
			},
			'batallunasgrid button[action=submitBatalLunas]': {
				click: me.submitBatalLunas
			},
			//=== end click set lunas all ====
		});
	},

	//=== click set batal lunas all ====
	setBatalLunasAll: function () {
		var me = this;
		var grid = me.getGrid();
		var store = grid.getStore();

		if (me.flagLunas == 0) {
			Ext.Msg.show({
				title: "Information",
				msg: "Set Batal Lunas Semua?",
				buttonText: {
					//ok     : "Hanya Halaman Ini",
					yes: "Hanya Halaman Ini",
					no: "Semua Transaksi",
					cancel: "Cancel"
				},
				buttons: Ext.MessageBox.YESNOCANCEL,
				icon: Ext.MessageBox.QUESTION,
				width: 300,
				fn: function (btn) {
					if (btn == 'yes') { //"Hanya Halaman Ini",

						me.flagLunasAll = 0;
						me.flagLunas = 1;
						grid.getSelectionModel().selectAll();
						grid.down('#btnBatalLunasAll').setText('UNSET ALL');

					} else if (btn == 'no') { //"Semua Transaksi",
						//cek lunas date
						me.flagLunasAll = 1;
						me.flagLunas = 1;
						grid.getSelectionModel().selectAll();
						grid.down('#btnBatalLunasAll').setText('UNSET ALL');

					} else if (btn == 'cancel') { //"Cancel"
						me.flagLunasAll = 0;
						me.flagLunas = 0;
					}
				}
			});
		} else {
			me.flagLunasAll = 0;
			me.flagLunas = 0;
			grid.getSelectionModel().deselectAll();
			grid.down('#btnBatalLunasAll').setText('SET BATAL LUNAS ALL');
		}
	},
	//=== end click set batal lunas all ====

	//===  click apply ====
	submitBatalLunas: function () {
		var me = this;
		var store = me.getGrid().getStore();

		var fields = me.getFormsearch().getValues();

		var rows = me.getGrid().getSelectionModel().getSelection();
		if (rows.length < 1) {
			Ext.Msg.alert('Info', 'No record selected !');
			return;
		} else {
			var data = [];
			for (var i = 0; i < rows.length; i++) {
				data[i] = store.getAt(store.indexOf(rows[i])).get('purchaseletter_id');
			}

			var myObj = {
				batal_lunas_all: me.flagLunasAll,
				cluster_id: fields.cluster_id,
				block_id: fields.block_id,
				data: data
			}

			Ext.Msg.confirm('Update Data', 'Set Batal Lunas?', function (btn) {
				if (btn == 'yes') {
					resetTimer();
					me.getGrid().up('window').body.mask('Saving, please wait ...');

					Ext.Ajax.request({
						url: 'erems/batallunas/setbatal',
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

		grid.down('#btnBatalLunas').setDisabled(row.length < 1);

		if (row.length == 0) {
			me.flagLunasAll = 0;
			me.flagLunas = 0;
			grid.down('#btnBatalLunasAll').setText('SET BATAL LUNAS ALL');
		}
	}
});