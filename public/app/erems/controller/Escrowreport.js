Ext.define('Erems.controller.Escrowreport', {
	extend: 'Erems.library.template.controller.Controller2',
	alias: 'controller.Escrowreport',
	views: ['escrowreport.Panel', 'escrowreport.FormData', 'masterreport.Panel'],
	stores: ['Masterdata.store.Bank'],
	models: ['Masterdata.model.Bank'],
	required: [
		'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields'
	],
	refs: [
		{
			ref: 'panel',
			selector: 'escrowreportpanel'
		},
		{
			ref: 'formdata',
			selector: 'escrowreportformdata'
		}

	],
	controllerName: 'escrowreport',
	bindPrefixName: 'Escrowreport',
	xyReport: null,
	printOutData: null,
	myConfig: null,
	constructor: function (configs) {
		this.callParent(arguments);
		var me = this;
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

		me.cbf = new Erems.template.ComboBoxFields();
	},
	init: function (application) {
		var me = this;
		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
		this.control({
			'escrowreportpanel': {
				beforerender: me.mainPanelBeforeRender
			},
			'escrowreportformdata': {
				afterrender: this.formDataAfterRender
			},
			'escrowreportformdata button[action=save]': {
				click: this.mainDataSave
			},
			'escrowreportformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'escrowreportformdata button[action=processexcel]': {
				click: function () {
					me.printExcel();
				}
			},
			'escrowreportformdata button[action=reset]': {
				click: function () {
					me.getFormdata().getForm().reset();
				}
			},
			'escrowreportformdata [name=cbf_bank_id]': {
				change: me.checkboxChangeBank
			},
			'escrowreportformdata [name=bank_id]': {
				change: me.changeBank
			},
			'escrowreportformdata [name=cbf_periode_id]': {
				change: me.checkboxChangePeriode
			},
			'escrowreportformdata [name=periode_startdate]': {
				change: me.changeDate
			},
			'escrowreportformdata [name=periode_enddate]': {
				change: me.changeDate
			},
		});
	},
	formDataAfterRender: function (el) {
		var me = this;
		var f = me.getFormdata();
		var state = el.up('window').state;
		console.log("[WINDOW STATE] " + state);
		me.fdar().init();

		if (state == 'create') {
			me.fdar().create();
		} else if (state == 'update') {
			me.fdar().update();
		}

		var ftStore = null;
		ftStore = el.down("[name=bank_id]").getStore();
		ftStore.load({params: {start: 0, limit: 0}});
	},
	checkboxChangeBank: function (el) {
		var me = this;
		if (el.getValue()) {
			me.getFormdata().down("[name=bank_id]").setValue("");
			el.setValue(1);
		}
	},
	changeBank: function () {
		var me = this;
		me.getFormdata().down("[name=cbf_bank_id]").setValue("0");
	},
	checkboxChangePeriode: function (el) {
		var me = this;
		if (el.getValue()) {
			me.getFormdata().down("[name=periode_startdate]").setValue("");
			me.getFormdata().down("[name=periode_enddate]").setValue("");
			el.setValue(1);
		}
	},
	changeDate: function () {
		var me = this;
		me.getFormdata().down("[name=cbf_periode_id]").setValue("0");
	},
	printExcel: function () {

		var me = this;
		var p = me.getPanel();
		p.setLoading("Please wait");
		var f = me.getFormdata();
		var vs = f.getValues();

		Ext.Ajax.timeout = 60000 * 5;

		var tipeReport = "excel";

		me.tools.ajax({
			params: vs,
			success: function (data, model) {
				p.setLoading(false);
				var url = data['others'][0][0]['URL'];
				if (url) {
					Ext.Msg.show({
						title: 'Info',
						msg: '<a href="' + url + '" target="blank">Download file</a>',
						icon: Ext.Msg.INFO,
						buttons: Ext.Msg.OK,
						fn: function () {

						}
					});
				}
			}
		}).read(tipeReport);
	},
});