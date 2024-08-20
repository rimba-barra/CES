Ext.define('Erems.template.ControllerForMaster', {
	extend: 'Erems.library.template.controller.Controller2',
	requires: ['Erems.library.Browse', 'Erems.library.box.Config', 'Erems.library.box.tools.DefaultConfig', 'Erems.library.box.tools.StoreProcessor', 'Erems.library.box.tools.EventSelector', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields'],
	views: [],
	comboBoxIdEl: [],
	fillForm: null,
	formWidth: 500,
	refs: [],
	browseHandler: null,
	loadProgressCount: 0,
	localStore: {
		selectedUnit: null
	},
	constructor: function (configs) {
		/* var me = this;
		 var config = new Erems.library.box.tools.DefaultConfig({
		 moduleName:me.controllerName
		 });
		 config.run(this);
		 this.callParent(arguments);*/
		var me = this;
		var config = new Erems.library.box.tools.DefaultConfig({
			moduleName: me.controllerName
		});
		config.run(this);
		this.callParent(arguments);

		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		me.cbf = new Erems.template.ComboBoxFields();

	},
	init: function () {
		var me = this;

		var events = new Erems.library.box.tools.EventSelector();
		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
		this.control(events.getEvents(me, me.controllerName));



	},
	mainDataSave: function () {
		var me = this;

		me.insSave({
			form: me.getFormdata(),
			grid: me.getGrid(),
			finalData: function (data) {

				return data;
			},
			sync: true,
			callback: {
				create: function (store, form, grid) {

				}
			}
		});
	},
	fdar: function () {



		var me = this;
		var f = me.getFormdata();
		var g = me.getGrid();
		me.setActiveForm(f);

		var x = {
			init: function () {
				me.fdarInit();
			},
			create: function () {
				me.unMask(1);
			},
			update: function () {

				var rec = g.getSelectedRecord();
				f.editedRow = g.getSelectedRow();
				f.getForm().loadRecord(rec);
				me.fdarUpdate(rec);
				me.unMask(1);


			}
		};
		return x;
	},
	fdarUpdate: function (rec) {

	},
	/*@return void */
	fdarInit: function () {
	},

	/*@params int progress*/
	unMask: function (progress) {
		var me = this;
		me.loadProgressCount = me.loadProgressCount - progress;
		if (me.loadProgressCount <= 0) {
			me.getFormdata().up('window').getEl().unmask();
		}

	},
});