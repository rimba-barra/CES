Ext.define('Erems.controller.Warningjatuhtempo', {
	extend: 'Erems.library.template.controller.Controllerwb_old',
	alias: 'controller.Warningjatuhtempo',
	views: ['warningjatuhtempo.Panel', 'warningjatuhtempo.Grid', 'warningjatuhtempo.FormSearch', 'warningjatuhtempo.FormData'],
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
				//'Erems.library.template.component.Customercombobox',
	],
	stores: ['Warningjatuhtempo', 'Unit', 'Mastercluster', 'Masterblock'],
	models: ['Warningjatuhtempo', 'Unit'],
	refs: [
		{
			ref: 'grid',
			selector: 'warningjatuhtempogrid'
		},
		{
			ref: 'formsearch',
			selector: 'warningjatuhtempoformsearch'
		},
		{
			ref: 'formdata',
			selector: 'warningjatuhtempoformdata'
		}
	],
	controllerName: 'warningjatuhtempo',
	fieldName: 'warningjatuhtempo_no',
	bindPrefixName: 'Warningjatuhtempo',
	validationItems: [
		{name: 'purchaseletter_id', msg: 'You must select Kavling / Unit No. first'},
	],

	formWidth: 800,
	countLoadProcess: 0,
	init: function (application) {
		var me = this;

		this.control({
			test: me.eventMonthField,
			'warningjatuhtempopanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'warningjatuhtempogrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'warningjatuhtempogrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'warningjatuhtempogrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'warningjatuhtempogrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'warningjatuhtempogrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'warningjatuhtempogrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'warningjatuhtempoformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'warningjatuhtempoformsearch button[action=search]': {
				click: this.dataSearch
			},
			'warningjatuhtempoformsearch button[action=reset]': {
				click: this.dataReset
			},
			'warningjatuhtempoformdata': {
				afterrender: this.formDataAfterRender
			},
			'warningjatuhtempoformdata button[action=save]': {
				click: this.dataSave
			},
			'warningjatuhtempoformdata button[action=cancel]': {
				click: this.formDataClose
			}
		});
	},

	//===== input feedback =========
	gridActionColumnClick: function (view, cell, row, col, e) {
		var me = this;
		var record = me.getGrid().getStore().getAt(row);
		var m = e.getTarget().className.match(/\bact-(\w+)\b/);
		me.getGrid().getSelectionModel().select(row);
		if (m) {
			switch (m[1]) {
				case 'update':
					me.formDataShow('update');
					break;
				case 'destroy':
					me.dataDestroy();
					break;
				case 'WarningjatuhtempoCreateFeedback':
					me.formDataShow('update');
					break;
			}
		}
	},
	//===== end input feedback =====


	/*checkAllDetailLoadingProcess: function() {
	 var me = this;
	 if (me.countLoadProcess === 4) {
	 me.getFormdata().up('window').body.unmask();
	 }
	 },*/

	formDataAfterRender: function (el) {

		var me = this;
		me.loadComboBoxStore(el);
		var state = el.up('window').state;


		if (state == 'create') {
			// el.down('#active').setValue(1);
			//me.getFormdata().down('#btnSave').setDisabled(false);
		} else if (state == 'update') {

			me.countLoadProcess = 0;
			me.getFormdata().up('window').body.mask('Loading data, please wait ...');

			var grid = me.getGrid();
			var store = grid.getStore();
			var form = me.getFormdata();

			var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
			el.loadRecord(record);

		}
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