Ext.define('Erems.controller.Backlog', {
	extend: 'Erems.library.template.controller.Controller2',
	alias: 'controller.Backlog',
	requires: ['Erems.library.XyReport'],
	stores: ['Mastercluster'],
	views: ['backlog.Panel', 'backlog.Grid', 'backlog.FormSearch'],
	refs: [
		{
			ref: 'grid',
			selector: 'backloggrid'
		},

		{
			ref: 'panel',
			selector: 'backlogpanel'
		},
		{
			ref: 'formsearch',
			selector: 'backlogformsearch'
		}

	],
	controllerName: 'backlog',
	fieldName: 'payment_id',
	formWidth: 800,
	fillForm: null,
	unitFormula: null,
	paymentFunc: null,
	browseHandler: null,
	dateNow: new Date(),
	flaggeneratevoucherno: 0,
	state: null,
	accept_date: null,
	pt_id: 0,
	stData: {},
	bindPrefixName: 'Backlog',
	localStore: {
		selectedUnit: null,
		customer: null,
		price: null,
		detail: null
	},
	tagihanDefaultValue: false,
	tools: null,
	myConfig: null,
	cbf: null,
	mt: null,
	stList: null, // list of schedule type
	effectedSch: [], // list schedule id yang dibayar
	formxWinId: 'win-instalpaymentwinId',
	paymentId: 0,

	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		me.cbf = new Erems.template.ComboBoxFields();
	},
	xyReport: null,
	printOutData: null,
	globalParams: null,
	globalParamsForm: null,
	selectedPurchaseletter: null,
	myParams: {
		paymentteks: null,
		global: null
	},
	init: function (application) {
		var me = this;

		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});

		if (typeof Mustache === "undefined") {
			Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () {

				if (typeof ApliJs === "undefined") {
					Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js?_=' + new Date().getTime(), function () {

						console.log("[INFO] ApliJs loaded.");

					}, function () {
						// error load file
					});
				}


			}, function () {
				//  me.tools.alert.warning("Error load Prolibs.js file.");
			});

		}

		if (typeof moment !== 'function') {


			Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/moment.min.js', function () {
			}, function () {
			});
		}

		this.control({
			'backlogpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'backloggrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},

			'backlogformsearch': {
				afterrender: this.formSearchAfterRender
			},
			'backlogformsearch button[action=search]': {
				click: this.dataSearch
			},
			'backlogformsearch button[action=reset]': {
				click: this.dataReset
			},

		});
	},

	execAction: function (el, action, me) {
		/* KOSONG */
	},
	gridAfterRender: function (configs) {
		// this.callParent(arguments);
		var me = this;

		var fields = me.getFormsearch().getValues();

		me.getGrid().doInit();
		for (var x in fields)
		{
			me.getGrid().getStore().getProxy().setExtraParam(x, fields[x]);
		}
		me.getGrid().getStore().load({
			params: {},
			callback: function (rec, op) {
				me.getGrid().attachModel(op);

				var pg = me.getGrid().down("pagingtoolbar");
				if (pg) {
					pg.getStore().load();
				}

			}
		});
		// add loading Bar
		ApliJs.loadingbar().init();
	},
	showFormdata: function (action) {
		var me = this;
	},
});
