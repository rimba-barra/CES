Ext.define('Erems.controller.Keuanganmodelb', {
	extend: 'Erems.library.template.controller.Controllerreporttb',
	requires: ['Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields'],
	alias: 'controller.Keuanganmodelb',
	requires:[
        'Erems.library.template.component.Projectptcombobox'
	],
	stores:['Masterdata.store.Projectpt'],
	models:['Masterdata.model.Projectpt'],
	views: ['keuanganmodelb.Panel', 'keuanganmodelb.FormData', 'masterreport.Panel'],
	refs: [
		{
			ref: 'panel',
			selector: 'keuanganmodelbpanel'
		},
		{
			ref: 'formdata',
			selector: 'keuanganmodelbformdata'
		}

	],
	controllerName: 'keuanganmodelb',
	bindPrefixName: 'Keuanganmodelb',
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
			'keuanganmodelbpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'keuanganmodelbformdata': {
				afterrender: this.formDataAfterRender
			},
			'keuanganmodelbformdata button[action=save]': {
				click: this.mainDataSave
			},
			'keuanganmodelbformdata button[action=cancel]': {
				click: this.formDataClose
			},
			'keuanganmodelbformdata button[action=process]': {
				click: function () {
					me.mainPrint();
				}
			},
			'keuanganmodelbformdata button[action=processexcel]': {
				click: function () {
					me.printExcel();
				}
			},
			'keuanganmodelbformdata button[action=processstockme]': {
				click: function () {
					me.printExcelStockMe();
				}
			},
			'keuanganmodelbformdata button[action=reportjs]': {
				click: function () {
					me.printReportJs();
				}
			},
			'keuanganmodelbformdata [name=cbf_pt_id]': {
				change: me.checkboxChange
			},
			'keuanganmodelbformdata [name=pt_id]': {
				select: me.comboboxChange
			},

			//
			//




		});
	},
	printReportJs: function () {

		var me = this;
		var p = me.getPanel();


	},

	printExcel: function () {
		var me = this;
		var p = me.getPanel();
		var f = me.getFormdata();
		var vs = f.getValues();

		p.setLoading("Please wait");

		Ext.Ajax.timeout = 60000 * 5;

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
		}).read('excel');

	},
	panelAfterRender: function (configs) {
		this.callParent(arguments);
		var me = this;
		var p = me.getPanel();
		
		var storepp = configs.down('[name=pt_id]').getStore();
		storepp.clearFilter(true);
		storepp.filter({
			property: 'project_id',
			value: apps.project,
			exactMatch: true,
			caseSensitive: true
		});

	},
	/*@implement this method for xyReport Class*/
	xyReportProcessParams: function (reportData) {
		var me = this;

		return reportData;
	},
	mainPrint: function () {
		var me = this;


	},
});
