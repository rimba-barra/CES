//INIT ini adalah library yang sering digunakan

Ext.define('Erems.controller.Init', {
	extend: 'Ext.app.Controller',
	requires: [
		'Erems.library.box.Config',
		'Erems.template.ComboBoxFields',
		'Erems.library.ModuleTools',
		'Erems.library.box.tools.Tools',
		'Erems.library.template.view.MoneyField',

        'Erems.library.CleanText',
        'Erems.library.MaskreHandler',
        
        'Erems.library.template.view.MoneyFieldEST',
        'Erems.library.template.view.AddressFieldEST',
        'Erems.library.template.view.NoteFieldEST',
        'Erems.library.template.view.NameFieldEST',
        'Erems.library.template.view.PhonenumberFieldEST',
        'Erems.library.template.view.NumericFieldEST',
        'Erems.library.template.view.GeneralFieldEST',
	],
	alias: 'controller.Init',
	stores: [],
	models: [],
	refs: [

	],
	controllerName: 'init',
	fieldName: 'init',
	bindPrefixName: 'Init',
	formxWinId: 'win-masterinitwinId',
	project_id: 0,
	pt_arr: [],
	pt_id: 0,
	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		if (typeof moment !== 'function') {
			Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/moment.min.js', function () {}, function () {});
		}

		if (typeof accounting === 'undefined') {
			Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/accounting.min.js', function () {
				/// loaded
				// Settings object that controls default parameters for library methods:
				accounting.settings = {
					currency: {
						symbol: "", // default currency symbol is '$'
						format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
						decimal: ".", // decimal point separator
						thousand: ",", // thousands separator
						precision: 2   // decimal places
					},
					number: {
						precision: 0, // default precision on numbers is 0
						thousand: ",",
						decimal: "."
					}
				}
				EREMS_GLOBAL_PRECISION = 2;
			}, function () {
				/// error
			});
		}
	},
	init: function () {

	},
});
