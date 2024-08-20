Ext.define('Erems.controller.Expenserequestview', {
	extend: 'Erems.library.template.controller.Controller2',
	alias: 'controller.Expenserequestview',
	stores: ['Paymentmethod'],
	views: ['expenserequestview.Panel', 'expenserequestview.Grid', 'expenserequestview.FormSearch', 'expenserequestview.FormData'],

	nomMaster: 'expense',
	refs: [
		{
			ref: 'grid',
			selector: 'expenserequestviewgrid'
		},
		{
			ref: 'formsearch',
			selector: 'expenserequestviewformsearch'
		},
		{
			ref: 'formdata',
			selector: 'expenserequestviewformdata'
		},
		{
			ref: 'formgrid',
			selector: 'expenserequestviewgriddetail'
		}
	],
	controllerName: 'expenserequestview',
	fieldName: 'expense_no',
	formWidth: 800,
	bindPrefixName: 'Expenserequestview',
	localStore: {
		selectedUnit: null,
		customer: null,
		price: null,
		detail: null
	},
	tools: null,
	myConfig: null,
	cbf: null,
	mt: null,
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
			'expenserequestviewpanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'expenserequestviewgrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'expenserequestviewgrid toolbar button[action=create]': {
				click: function () {
					this.formDataShow('create');
				}
			},
			'expenserequestviewgrid toolbar button[action=update]': {
				click: function () {
					this.formDataShow('update');
				}
			},
			'expenserequestviewgrid toolbar button[action=destroy]': {
				click: this.dataDestroy
			},
			'expenserequestviewgrid toolbar button[action=print]': {
				click: this.dataPrint
			},
			'expenserequestviewgrid actioncolumn': {
				afterrender: this.gridActionColumnAfterRender,
				click: this.gridActionColumnClick
			},
			'expenserequestviewformsearch': {
				afterrender: this.formsearch
			},
			'expenserequestviewformsearch button[action=search]': {
				click: this.dataSearch
			},
			'expenserequestviewformsearch button[action=reset]': {
				click: this.dataReset
			},
			'expenserequestviewformdata': {
				afterrender: this.formsearch
			},
			'expenserequestviewformdata button[action=save]': {
				click: this.dataSave
			},
			'expenserequestviewformdata button[action=cancel]': {
				click: this.formDataClose
			}

		});
	},
	gridItemDblClick: function (el) {
		var me = this;
		// btnEdit = el.up('panel').down('#btnEdit'),
		// state = (btnEdit.isVisible() && !btnEdit.isDisabled() ? btnEdit.bindAction : 'show');
		var state = me.bindPrefixName + 'View';
		me.execAction(el, state);
	},
	execAction: function (el, action, me) {
		if (!action) {
			action = '';
		}
		if (!me) {
			me = this;
		}

		switch (action) {

			case me.bindPrefixName + 'View':
				me.showFormView();
				//me.formDataShow(el, acts[action], action);
				break;

		}
	},
	data_loadDetail: function () {
		var me = this;
		var record = me.getGrid().getSelectedRecord();
		record = record.raw;

		var store = me.getFormgrid().getStore();
		me.nomGetRangeOfFields("expensedetail", store);


		store.model.setFields(me._tempnomGetRangeOfFields);

		store.load({
			params: {
				mode_read: 'detail',
				expenserequest_id: record.expense.expense_id
			},
			callback: function (record) {
				//console.log(rec);


			}
		});
		me.getActiveForm().loadRecord(me.getGrid().getSelectedRecord());
		// me.sete('total_amount').toMoney();

	},
	showFormView: function (state) {
		var s = typeof state === "undefined" ? "create" : state;
		var me = this;
		me.instantWindow('FormData', 800, 'View', s, 'myViewWindow');
		var f = me.getFormdata();
		var g = me.getGrid();
		var gd = me.getFormgrid();
		var rec = g.getSelectedRecord();

		f.editedRow = g.getSelectedRow();
		f.setLoading("Please wait...");
		me.tools.ajax({
			params: {
				// purchaseletter_id: plId
			},
			success: function (data, model) {

				me.fillFormComponents(data, f);
				me.expenseTypeList = data.expensetype;
				me.paymentTypeList = data.paymenttype;


				if (rec) {
					f.loadRecord(rec);
					var id = rec.get("expense_id");
					f.setLoading("Loading detail information...");
					me.tools.interAjax({
						params: {
							expense_id: id
						},
						success: function (datad, modeld) {


							me.tools.wesea({
								data: datad,
								model: modeld
							}, gd).grid();


							// console.log(rec); 
							/// disable components
							//f.down("[name=department_department_id]").setReadOnly(true);
							f.down("[name=expense_date]").setReadOnly(true);
							f.down("[name=department_code]").setReadOnly(true);
							f.down("[name=note]").setReadOnly(true);

							f.setLoading(false);
						}
					}).read('expenserequest', 'expensedetail');
				}
			}
		}).read('detail');


	},

	fillFormComponents: function (data, form) {
		var me = this;
		//me.tools.wesea(data.department, form.down("[name=department_department_id]")).comboBox();
		//me.tools.wesea(data.paymentmethod, form.down("[name=paymentmethod_paymentmethod_id]")).comboBox();
	},

	fdar: function () {
		var me = this;
		var x = {
			init: function () {
				me.setActiveForm(me.getFormdata());
				var store = me.getFormgrid().getStore();
				store.loadData([], false);

				me.setReadOnlyColor('total_amount', true, true);
				me.setReadOnlyColor('note', true, true);
				me.setReadOnlyColor('expense_date', true, true);
				me.setReadOnlyColor('department_id', true, true);
				me.setReadOnlyColor('department_code', true, true);
				me.setReadOnlyColor('expense_id', true, true);
			},
			create: function () {
				/// create here  
				// var store = me.getFormgrid().getStore();
				// me.nomGetRangeOfFields("expensedetail", store);


				// store.model.setFields(me._tempnomGetRangeOfFields);

			},
			update: function () {
				/// update here
				me.data_loadDetail();

			}
		};
		return x;
	},
	formsearch: function (configs) {
		// this.callParent(arguments);
		var me = this;
		var p = me.getFormsearch();
		p.setLoading("Please wait");

		me.tools.ajax({
			params: {},
			success: function (data, model) {
				me.fillFormSearchComponents(data, me.getFormsearch());
				p.setLoading(false);
			}
		}).read('detail');
	},
	fillFormSearchComponents: function (data, f) {
		var me = this;
		me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox(true);
		me.tools.wesea(data.paymentmethod, f.down("[name=paymentmethod_id]")).comboBox(true);
	},
});