Ext.define('Erems.controller.Masterlrpsharingparameter', {
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Masterlrpsharingparameter',
	views: ['masterlrpsharingparameter.Panel', 'masterlrpsharingparameter.Grid', 'masterlrpsharingparameter.FormSearch', 'masterlrpsharingparameter.FormData'],
	stores: ['Masterlrpsharingparameter', 'Masterparameterglobal', 'Masterdata.store.Projectpt'],
	models: ['Masterlrpsharingparameter', 'Masterparameterglobal'],
	refs: [
		{
			ref: 'grid',
			selector: 'masterlrpsharingparametergrid'
		},
//        {
//            ref: 'formsearch',
//            selector: 'masterlrpsharingparameterformsearch'
//        },
		{
			ref: 'formdata',
			selector: 'masterlrpsharingparameterformdata'
		}
	],
	controllerName: 'masterlrpsharingparameter',
	fieldName: 'pricetype',
	bindPrefixName: 'Masterlrpsharingparameter',
	//formWidth: 550,
	nomorValue: 1,
	splitLRP: 0,
	enableSelectKPR: 0,
	init: function (application) {
		var me = this;
		this.control({
			'masterlrpsharingparameterpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'masterlrpsharingparametergrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'masterlrpsharingparametergrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'masterlrpsharingparametergrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'masterlrpsharingparametergrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'masterlrpsharingparametergrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'masterlrpsharingparametergrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
//			'masterlrpsharingparameterformsearch': {
//				afterrender: this.formSearchAfterRender
//			},
//            'masterlrpsharingparameterformsearch button[action=search]': {
//                click: this.dataSearch
//            },
//            'masterlrpsharingparameterformsearch button[action=reset]': {
//                click: this.dataReset
//            },
			'masterlrpsharingparameterformdata': {
				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataAfterRender
			},
			'masterlrpsharingparameterformdata button[action=save]': {
				click: me.dataSave
			},
			'masterlrpsharingparameterformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'masterlrpsharingparameterformdata [name=pricetype_id]': {
				select: me.comboboxPriceTypeChange
			},

		});
	},

	panelAfterRender: function (configs) {
		var me = this;
		Ext.Ajax.request({
			url: 'erems/masterlrpsharingparameter/read',
			params: {mode_read: 'splitLRP'},
			success: function (response) {
				response = Ext.decode(response.responseText);
				me.splitLRP = response.splitLRP;
				if (me.splitLRP == 1) {
					me.getGrid().down('[itemId=colms_ptname]').setVisible(true);
				}
			},
		});
	},

	formDataBeforeRender: function (el) {
		var me = this;

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: 'LRP_PROJECT_PRICETYPE_SETTING'},
			callback: function (rec) {
				if (rec.length > 0) {
					var global = rec[0].get('value');
					if (global === '1') {
						me.enableSelectKPR = 1;
					} else {
						me.enableSelectKPR = 0;
					}
				} else {
					me.enableSelectKPR = 0;
				}
			}
		});
	},
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
				if (me.getFormdata().down("[name=pricetype_id]").getRawValue() == 'KPR') {
					me.getFormdata().down("[name=is_akad]").setVisible(true);
				} else {
					me.getFormdata().down("[name=is_akad]").setVisible(false);
				}
			}
		};
		return x;
	},
	comboboxPriceTypeChange: function (el) {
		var me = this;
		var text = el.getRawValue();

		if (text == 'KPR' && me.enableSelectKPR == 0) {
			Ext.Msg.alert('Info', 'Yang bisa didaftarkan hanya CASH dan INHOUSE saja.');
			el.setValue();
		} else {
			me.getFormdata().down("[name=is_akad]").setValue(0);
			if (text == 'KPR') {
				me.getFormdata().down("[name=is_akad]").setVisible(true);
			} else {
				me.getFormdata().down("[name=is_akad]").setVisible(false);
			}
		}
	},
	dataReset: function () {
		resetTimer();
		var me = this;

		var store = me.getGrid().getStore();
		me.loadPage(store);
	},

});