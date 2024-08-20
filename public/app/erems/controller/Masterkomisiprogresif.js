Ext.define('Erems.controller.Masterkomisiprogresif', {
	extend: 'Erems.library.template.controller.Controlleralt',
	alias: 'controller.Masterkomisiprogresif',
	views: ['masterkomisiprogresif.Panel', 'masterkomisiprogresif.Grid', 'masterkomisiprogresif.FormSearch', 'masterkomisiprogresif.FormData'],
	stores: ['Masterkomisiprogresif'],
	models: ['Masterkomisiprogresif'],
	refs: [
		{
			ref: 'grid',
			selector: 'masterkomisiprogresifgrid'
		},
		{
			ref: 'formsearch',
			selector: 'masterkomisiprogresifformsearch'
		},
		{
			ref: 'formdata',
			selector: 'masterkomisiprogresifformdata'
		}
	],
	controllerName: 'masterkomisiprogresif',
	fieldName: 'code',
	bindPrefixName: 'Masterkomisiprogresif',
	//formWidth: 550,
	constructor           : function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		me.cbf      = new Erems.template.ComboBoxFields();
		me.tools    = new Erems.library.box.tools.Tools({config: me.myConfig});
		//me.roundlib = new Erems.library.TypeRounding();
		
		/////// LOAD ACCOUNTING OBJECT
		if (typeof accounting === 'undefined') {

			Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/accounting.min.js', function () {
				/// loaded
				// Settings object that controls default parameters for library methods:
				accounting.settings = {
					currency: {
						symbol    : "", // default currency symbol is '$'
						format    : "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
						decimal   : ".", // decimal point separator
						thousand  : ",", // thousands separator
						precision : 2   // decimal places
					},
					number: {
						precision : 0, // default precision on numbers is 0
						thousand  : ",",
						decimal   : "."
					}
				}

				EREMS_GLOBAL_PRECISION = 2;
			}, function () {
				/// error
			});
		}
	},

	init: function (application) {
		var me = this;
		this.control({
			'masterkomisiprogresifpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'masterkomisiprogresifgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'masterkomisiprogresifgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'masterkomisiprogresifgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'masterkomisiprogresifgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'masterkomisiprogresifgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'masterkomisiprogresifformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'masterkomisiprogresifformsearch button[action=search]': {
				click: this.dataSearch
			},
			'masterkomisiprogresifformsearch button[action=reset]': {
				click: this.dataReset
			},
			'masterkomisiprogresifformdata': {
//				beforerender: this.formDataBeforeRender,
				afterrender: this.formDataAfterRender
			},
			'masterkomisiprogresifformdata button[action=save]': {
				click: me.dataSave
			},
			'masterkomisiprogresifformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'masterkomisiprogresifformdata [name=pricetype_id]': {
				select: me.comboboxPriceTypeChange
			},

		});
	},
	formDataAfterRender: function (el) {

		var me = this;
//        if (me.storeProcess.length > 0 && typeof me.storeProcess == 'string') {
//            var sp = 'me.get' + me.storeProcess + 'Store()';
//            me.storeProcess = eval(sp);
//        }
		me.storeProcess = me.createSpProcessObj(me.storeProcess);
		me.fdar().init();

		me.loadComboBoxStore(el);
		var state = el.up('window').state;

		if (state == 'create') {
			me.fdar().create();
		} else if (state == 'update') {
			me.fdar().update();
		}
		me.formatCurrencyFormdata(me, me.getFormdata());

	},
	formatCurrencyFormdata: function (controller, form) {
		var me, form, itemform, xtypeform, widget, itemname, oldvalue, newvalue, paramform;
		me = controller;
		itemform = form.getForm().getFields().items;
		for (var index in itemform) {
			xtypeform = form.getForm().getFields().items[index].xtype;
			if (xtypeform == 'xmoneyfield') {
				itemname = form.getForm().getFields().items[index].name;
				oldvalue = form.down("[name=" + itemname + "]").getValue();
				newvalue = accounting.formatMoney(oldvalue);
				form.down("[name=" + itemname + "]").setValue(newvalue);
			}
		}
	},
});