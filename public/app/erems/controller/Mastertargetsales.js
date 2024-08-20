Ext.define('Erems.controller.Mastertargetsales', {
	extend: 'Main.library.Controller',
	// extend: 'Erems.library.template.controller.Controller',

	alias: 'controller.Mastertargetsales',

	models: [
		'Mastertargetsales'
	],
	stores: [
		'',
		'Mastertargetsales'
	],
	views: [
		'mastertargetsales.Panel',
		'mastertargetsales.FormSearch',
		'mastertargetsales.Grid',
		'mastertargetsales.FormData'
	],
	listPurpose    : [],
	listProject    : [],
	bod_meeting    : [],
	toleransi_edit : [],

	constructor: function (application) {
		var me = this, meNameSplit = me.self.getName().split('.');

		me.appsName = meNameSplit[0];
		me.selfName = meNameSplit[(meNameSplit.length - 1)];
		me.formalName = me.formalName || me.selfName;
		me.initial = [];

		me.mainPanel = me.selfName + 'Panel';
		me.mainGrid = me.selfName + 'Grid';
		me.mainFormSearch = me.selfName + 'FormSearch';
		me.mainFormData = me.selfName + 'FormData';

		me.refs = (me.refs || []).concat([
			{ref: 'MainPanel', selector: me.mainPanel},
			{ref: 'MainGrid', selector: me.mainPanel + ' ' + me.mainGrid},
			{ref: 'MainFormSearch', selector: me.mainPanel + ' ' + me.mainFormSearch},
			{ref: 'MainFormData', selector: me.mainFormData}
		]);

		me.callParent(arguments);

		//custom
		this.myConfig = new Erems.library.box.Config({
			_controllerName: me.controllerName
		});

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

	init: function (application) {
		var me = this;

		me.control(me.mainPanel, {
			beforerender: me.mainPanelBeforeRender,
			afterrender: me.mainPanelAfterRender,
			removed: me.mainPanelRemoved
		});

		me.control(me.mainFormSearch, {
			beforerender: me.formSearchBeforeRender,
			afterrender: me.formSearchAfterRender
		});

		me.control(me.mainPanel + ' gridpanel', {
			beforerender: me.gridPanelBeforeRender,
			afterrender: me.gridPanelAfterRender,
			selectionchange: me.gridPanelSelectionChange,
			// itemdblclick: me.gridPanelItemDblClick
		});

		me.control(me.mainPanel + ' combobox', {
			beforerender: me.comboboxBeforeRender,
			afterrender: me.comboboxAfterRender,
			focus: me.comboboxFocus,
			change: me.comboboxChange,
		});

		me.control(me.mainFormData, {
			beforerender: me.formDataBeforeRender,
			afterrender: me.formDataAfterRender,
			removed: me.formDataRemoved
		});

		me.control(me.mainPanel + ' toolbar button[action=export_excel]', {
			click: function (el) {
				var tahun = me.getMainFormSearch().getForm().findField('tahun').getSubmitValue();
				var view_grid_param = me.getMainFormSearch().getForm().findField('view_grid_param').getSubmitValue();
				this.dataExport(el, tahun, view_grid_param);
			}
		});

		me.control(me.mainPanel + ' toolbar radiogroup', {
			change: me.changeGrid
		});
		//custom

		me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
		me.control({
			'#btnGenerateTargetSales': {
				click: function () {
					var projectName = '';
					if (me.listProject.length > 0)
						var projectName = '<b>' + me.getMainGrid().down('[name=radiogroup_view_grid]').getChecked()[0].boxLabel + '</b><br/>';
					Ext.MessageBox.prompt('Tahun', projectName + 'Generate untuk Tahun :', generateTargetSales);
				}
			},
		});

		function generateTargetSales(btn, text) {
			var postdata = new Object();
			if (btn == 'ok') {
				if (Math.floor(text) == text && $.isNumeric(text) && text > 1945 && text < 2100) {
					postdata.tahun = text;
					postdata.project_id = me.getMainFormSearch().getForm().findField('view_grid_param').getSubmitValue();
					Ext.Ajax.request({
						url: 'erems/mastertargetsales/read',
						params: {
							mode_read: 'generateTarget',
							data: JSON.stringify(postdata)
						},
						success: function (response) {
							var info = Ext.JSON.decode(response.responseText);
							if (info.success == true) {
								Ext.MessageBox.alert('Status', 'Changes saved successfully.');
								me.getMainFormSearch().down('[itemId=tahun]').setValue(postdata.tahun);
								me.dataSearch();
							} else {
								Ext.MessageBox.alert('Status', 'Generate Failed');
							}

						}
					});
				} else {
					Ext.MessageBox.alert('Status', 'Invalid Year');
				}
			}
		}
//		me.callParent(arguments);
	},
	mainPanelBeforeRender: function (o) {
		var me = this, btnSearch = o.down('#' + me.button.search.id), btnReset = o.down('#' + me.button.reset.id);
		me.loadDependData(o);
//		if (me.getMainGrid() && me.getMainFormSearch()) me.dataReset();
		if (btnSearch)
			btnSearch.on('click', me.dataSearch, me);
		if (btnReset)
			btnReset.on('click', me.dataReset, me);
	},
	camelize(str) {
		var splitStr = str.toLowerCase().split(' ');
		for (var i = 0; i < splitStr.length; i++) {
			splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
		}
		return splitStr.join(' ');
	},
	changeGrid: function () {
		var me = this;
		var val_grid = me.getMainGrid().down('[name=radiogroup_view_grid]').getValue().view_grid;
		me.getMainFormSearch().down('[itemId=view_grid_param]').setValue(val_grid);
		me.dataSearch();
	},

	gridPanelAfterRender: function (el) {
		var me = this;
		el.up('window').body.mask('Loading Component, Please Wait...');
		var form = me.getMainFormSearch();
		me.textfield = Ext.ComponentQuery.query('[xtype=textfield]', form);

		for (var i = 0; i < me.textfield.length; i++) {
			Ext.applyIf(me.textfield[i], {enableKeyEvents: true});

			me.textfield[i].on('keypress', function (e, el) {
				if (el.getCharCode() === 13) {
					me.dataSearch();
				}
			});
		}

		Ext.Ajax.request({
			url     : 'erems/mastertargetsales/read',
			params  : { mode_read : 'allParameter' },
			success : function (response) {
				try {
					var resp = response.responseText;
					if (resp) {
						var info = Ext.JSON.decode(resp);
						me.listPurpose    = info.listPurpose.data;
						me.listProject    = info.listProject.data;
						me.toleransi_edit = info.toleransi_edit.data;
						me.bod_meeting    = info.bod_meeting.data;

						if(me.toleransi_edit.length && me.bod_meeting.length){
							let [year, month, day] = me.bod_meeting[0].value.split('-');
							var tgl_bod_start = new Date(+year, +month - 1, +day - me.toleransi_edit[0].value);
							var tgl_bod_end   = new Date(+year, +month - 1, +day);
							var tgl_now       = new Date();

							if(tgl_now >= tgl_bod_start && tgl_now <= tgl_bod_end){
								me.getMainGrid().down('#btnEdit').setVisible(false);
							}
						}

						var eColumn = [];
						Ext.Array.each(info.listPurpose.data, function (field) {
							var purpose = field.purpose.toLowerCase();
							var purposeDb = field.purpose_target_fieldname;

							eColumn.push(Ext.create('Ext.grid.column.Column', {
								text: me.camelize(purpose),
								columns: [
									{xtype: 'numbercolumn', hideable: false, sortable: false, width: 80, align: 'right', cls: 'text-center', text: 'Target<br/>Tanah (m2)', dataIndex: purposeDb + '_target_tanah_m'},
									{xtype: 'numbercolumn', hideable: false, sortable: false, width: 80, align: 'right', cls: 'text-center', text: 'Target<br/>Bangunan (m2)', dataIndex: purposeDb + '_target_bangunan_m', },
									{xtype: 'numbercolumn', hideable: false, sortable: false, width: 80, align: 'right', cls: 'text-center', text: 'Target Unit', dataIndex: purposeDb + '_target_unit'},
									// {xtype: 'numbercolumn', hideable: false, sortable: false, width: 150, align: 'right', cls: 'text-center', text: 'Target Tanah (Rp)', dataIndex: purposeDb + '_target_tanah_v', },
									// {xtype: 'numbercolumn', hideable: false, sortable: false, width: 150, align: 'right', cls: 'text-center', text: 'Target Bangunan (Rp)', dataIndex: purposeDb + '_target_bangunan_v', },
									{xtype: 'numbercolumn', hideable: false, sortable: false, width: 150, align: 'right', cls: 'text-center', text: 'Target (Rp)', dataIndex: purposeDb + '_target_v', },
								]
							}));

						});
						eColumn.push(Ext.create('Ext.grid.column.Column', {
							text: 'Total',
							columns: [
								{xtype: 'numbercolumn', hideable: false, sortable: false, width: 100, align: 'right', cls: 'text-center', text: 'Target Tanah (m2)', dataIndex: 'total_target_tanah_m', },
								{xtype: 'numbercolumn', hideable: false, sortable: false, width: 100, align: 'right', cls: 'text-center', text: 'Target Bangunan (m2)', dataIndex: 'total_target_bangunan_m', },
								{xtype: 'numbercolumn', hideable: false, sortable: false, width: 100, align: 'right', cls: 'text-center', text: 'Target Unit', dataIndex: 'total_target_unit', },
								// {xtype: 'numbercolumn', hideable: false, sortable: false, width: 150, align: 'right', cls: 'text-center', text: 'Target Tanah (Rp)', dataIndex: 'total_target_tanah_v', },
								// {xtype: 'numbercolumn', hideable: false, sortable: false, width: 150, align: 'right', cls: 'text-center', text: 'Target Bangunan (Rp)', dataIndex: 'total_target_bangunan_v', },
								{xtype: 'numbercolumn', hideable: false, sortable: false, width: 150, align: 'right', cls: 'text-center', text: 'Target (Rp)', dataIndex: 'total_target_v', },
							]
						}));
						eColumn.push(Ext.create('Ext.grid.column.Column', {
							columns: [
								{xtype: 'numbercolumn', hideable: false, sortable: false, width: 150, align: 'right', cls: 'text-center', text: 'Collection<br/>Target (Rp)', dataIndex: 'collection_target_v'}
							]
						}));

						var grid = me.getMainGrid();
						grid.headerCt.insert(grid.columns.length, eColumn);
						grid.getView().refresh();

						/*PROJECT SPLIT*/
						var i = 1;
						Ext.Array.each(info.listProject.data, function (field) {
							var newItem = new Ext.form.field.Radio({
								boxLabel: field.project_name_new,
								inputValue: field.project_id_new,
								name: 'view_grid',
								padding: '0 20px 0 0',
								checked: (i == 1)
							});
							me.getMainGrid().down('[name=radiogroup_view_grid]').insert(newItem);
							if (i == 1)
								me.getMainFormSearch().down('[itemId=view_grid_param]').setValue(field.project_id_new);
							i++;
						});

						if (info.listPurpose.success != true) {
							el.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Failure',
								msg: 'Error: Failed to load data purpose.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					}
				} catch (e) {
					console.error(e);
					el.up('window').body.unmask();
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Failed to load data purpose/project split.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}

				me.dataSearch();
			},
			failure: function (e) {
				el.up('window').body.unmask();
				Ext.Msg.show({
					title: 'Failure',
					msg: 'Error: Failed to load data purpose.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});


	},

	gridPanelSelectionChange: function () {
		var me      = this;
		var grid    = me.getMainGrid();
		var row     = grid.getSelectionModel().getSelection();
		var edit    = grid.down('#btnEdit');
		var deleteb = grid.down('#btnDelete');
		var view    = grid.down('#btnView');

		if (edit !== null) {
			edit.setDisabled(row.length != 1);
		}
		if (deleteb !== null) {
			deleteb.setDisabled(row.length < 1);
		}
		if (view !== null) {
			view.setDisabled(row.length != 1);
		}
	},

	dataExport: function (el, tahun, view_grid_param) {
		var me = this;
		el.up('window').body.mask('Creating Excel File, Please Wait...');

		Ext.Ajax.timeout = 60000 * 30;

		Ext.Ajax.request({
			url: 'erems/mastertargetsales/export',
			params: {
				tahun: tahun,
				view_grid_param: view_grid_param
			},
			success: function (response) {
				try {
					var resp = response.responseText;

					if (resp) {
						var info = Ext.JSON.decode(resp);

						if (info.success == true) {
							el.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Info',
								msg: '<a href="' + info.url + '" target="blank">Click Here For Download Excel File</a>',
								icon: Ext.Msg.INFO,
								//buttons: [], //jika ingin tidak ada buttons
								buttons: Ext.Msg.CANCEL,
								buttonText:
										{
											cancel: 'Close',
										}
							});
						} else {
							el.up('window').body.unmask();
							Ext.Msg.show({
								title: 'Failure',
								msg: 'Error: Export to Excel Failed.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						}
					}
				} catch (e) {
					//console.error(e);
					el.up('window').body.unmask();
					Ext.Msg.show({
						title: 'Failure',
						msg: 'Error: Export to Excel Failed.',
						icon: Ext.Msg.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			},
			failure: function (e) {
				//console.error(e);
				el.up('window').body.unmask();
				Ext.Msg.show({
					title: 'Failure',
					msg: 'Error: Export to Excel Failed.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
	},
	dataSave: function (o) {
		var me = this, formData = o.up('form');
		var createStatus = true;

		if (formData.getForm().isValid()) {
			var data = formData.getValues(), fieldName = [], details = {}, detailsremoved = {};
			var storeData = me.getMainGrid().getStore();

			if (formData.state == me.actionName.destroy) {
				for (var i = 0; i < storeData.data.items.length; i++) {
					if (storeData.data.items[i].data.code == formData.getValues().code) {
						createStatus = false;
					}
				}
			}

			/*===================================================== added by TB 19 Juli 2016 */
			formData.store.extraParam[me.paramName.detailsData] = null;
			formData.store.extraParam[me.paramName.detailsremovedData] = null;
			/*===================================================== end added by TB 19 Juli 2016 */

			formData.store.model.getFields().forEach(function (f) {
				fieldName.push(f.name);
			});
			formData.query('combobox').forEach(function (c) {
				var itemDisplay = c.displayField;
				if (fieldName.indexOf(itemDisplay) != -1)
					data[itemDisplay] = c.getRawValue();
			});
			formData.query('gridpanel').forEach(function (g) {
				if (g.isVisible() && !g.isDisabled()) {
					var gstore = g.getStore(), keyId = g.getItemId().toLowerCase().replace('grid', '');
					var detailsdata = gstore.getModifiedRecords();
					if (detailsdata.length) {
						details[keyId] = Ext.pluck(detailsdata, 'data');
						data['detailschanged'] = 1;
					}
					var removeddata = gstore.getRemovedRecords();
					if (removeddata.length) {
						detailsremoved[keyId] = Ext.pluck(removeddata, 'data');
						data['detailschanged'] = 1;
					}
				}
			});
			if (Ext.Object.getSize(details))
				formData.store.extraParam[me.paramName.detailsData] = Ext.encode(details);
			if (Ext.Object.getSize(detailsremoved))
				formData.store.extraParam[me.paramName.detailsremovedData] = Ext.encode(detailsremoved);


			if (!Ext.isFunction(formData.store.processFn.callback)) {
				formData.store.processFn.callback = function (s) {

					var stor = this, sender = formData.sender.bindEl ? formData.sender.up('window').down('#' + formData.bindEl) : formData.sender;
					if (Ext.isObject(sender)) {
						Ext.Object.each(formData.refFields, function (k, v) {
							if (sender.getItemId() == v.getItemId()) {
								if (formData.state == me.actionName.create) {
									var newData = stor.getById(Math.max.apply(null, stor.data.keys));
									v.setValue(newData.get(v.getItemId()));
								}
							} else {
								v.setValue(formData.down('#' + k).getValue());
							}
						});
					}
				};
			}
			if (formData.store.syncStore) {
				if (!Ext.isFunction(formData.store.processFn.successMsgBoxClose))
					formData.store.processFn.successMsgBoxClose = function () {
						me.formDataClose(o);
					};
			} else {
				if (!Ext.isFunction(formData.store.processFn.postProcess))
					formData.store.processFn.postProcess = function () {
						me.formDataClose(o);
					};
			}

			if (createStatus) {
				me.dataProcess({sender: o, state: formData.state, store: formData.store, record: formData.record, data: data});
			} else {
				Ext.Msg.show({
					title: 'Failure',
					msg: '<br/>The data may have been used.',
					icon: Ext.Msg.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		}
	},
	formDataBeforeRender: function () {
		var me = this;
		me.initial = [];
		var p = me.getMainFormData();
		p.up("window").maximize();
	},
	formDataAfterRender: function () {
		var me = this;
		var listField = [];
		var container = [];
		var i = 1;
		Ext.Array.each(me.listPurpose, function (field) {
			var purpose = field.purpose.toLowerCase();
			var purposeDb = field.purpose_target_fieldname;

			listField.push({
				xtype  : 'fieldset',
				title  : me.camelize(purpose),
				margin : '10px 0 10px 0',
				layout : 'vbox',
				width  : '25%',
				items  : [
					{
						xtype            : 'xmoneyfield',
						name             : purposeDb + '_target_tanah_m',
						itemId           : purposeDb + '_target_tanah_m',
						enableKeyEvents  : true,
						fieldLabel       : 'Target Luas Tanah (m2)',
						labelWidth       : 120,
						width            : '100%',
						labelStyle       : 'font-size: 10.8',
						hideTrigger      : true,
						enforceMaxLength : true,
						maskRe           : /[0-9\.-]/,
						decimalPrecision : 2,
						fieldCls         : 'target_tanah',
						anchor           : '-5',
						listeners        : {
							change: function () {
								me.hitungTotal();
								if (typeof me.initial[purposeDb + '_target_tanah_m'] == 'undefined') {
									me.initialFormatting(purposeDb + '_target_tanah_m');
									me.initial[purposeDb + '_target_tanah_m'] = 1;
								}
							},
							blur: function (field) {
								field.setRawValue(accounting.formatMoney(field.getValue()));
							},
							focus: function (field) {
								if (field.getValue() != 0) {
									field.setRawValue(accounting.unformat(field.getValue()));
								} else {
									field.setRawValue('');
								}
							}
						}
					},
					{
						xtype            : 'xmoneyfield',
						name             : purposeDb + '_target_bangunan_m',
						itemId           : purposeDb + '_target_bangunan_m',
						enableKeyEvents  : true,
						fieldLabel       : 'Target Luas Bangunan',
						labelWidth       : 120,
						width            : '100%',
						labelStyle       : 'font-size: 10.8',
						hideTrigger      : true,
						enforceMaxLength : true,
						maskRe           : /[0-9\.-]/,
						decimalPrecision : 2,
						fieldCls         : 'target_bangunan',
						anchor           : '-5',
						listeners        : {
							change: function () {
								me.hitungTotal();
								if (typeof me.initial[purposeDb + '_target_bangunan_m'] == 'undefined') {
									me.initialFormatting(purposeDb + '_target_bangunan_m');
									me.initial[purposeDb + '_target_bangunan_m'] = 1;
								}
							},
							blur: function (field) {
								field.setRawValue(accounting.formatMoney(field.getValue()));
							},
							focus: function (field) {
								if (field.getValue() != 0) {
									field.setRawValue(accounting.unformat(field.getValue()));
								} else {
									field.setRawValue('');
								}
							}
						}
					},
					{
						xtype            : 'xmoneyfield',
						name             : purposeDb + '_target_unit',
						itemId           : purposeDb + '_target_unit',
						enableKeyEvents  : true,
						fieldLabel       : 'Target Unit',
						labelWidth       : 120,
						width            : '100%',
						labelStyle       : 'font-size: 10.8',
						hideTrigger      : true,
						enforceMaxLength : true,
						maskRe           : /[0-9\.-]/,
						decimalPrecision : 2,
						fieldCls         : 'target_unit',
						anchor           : '-5',
						listeners        : {
							change: function () {
								me.hitungTotal();
								if (typeof me.initial[purposeDb + '_target_unit'] == 'undefined') {
									me.initialFormatting(purposeDb + '_target_unit');
									me.initial[purposeDb + '_target_unit'] = 1;
								}
							},
							blur: function (field) {
								field.setRawValue(accounting.formatMoney(field.getValue()));
							},
							focus: function (field) {
								if (field.getValue() != 0) {
									field.setRawValue(accounting.unformat(field.getValue()));
								} else {
									field.setRawValue('');
								}
							}
						}
					},
					{
						xtype            : 'xmoneyfield',
						name             : purposeDb + '_target_tanah_v',
						itemId           : purposeDb + '_target_tanah_v',
						enableKeyEvents  : true,
						fieldLabel       : 'Target Tanah (Rp)',
						labelWidth       : 120,
						width            : '100%',
						labelStyle       : 'font-size: 10.8',
						hideTrigger      : true,
						enforceMaxLength : true,
						maskRe           : /[0-9\.-]/,
						decimalPrecision : 2,
						fieldCls         : 'target_tanah_v',
						anchor           : '-5',
						listeners        : {
							change: function () {
								// me.hitungTotal();
								if (typeof me.initial[purposeDb + '_target_tanah_v'] == 'undefined') {
									me.initialFormatting(purposeDb + '_target_tanah_v');
									me.initial[purposeDb + '_target_tanah_v'] = 1;
								}
							},
							blur: function (field) {
								field.setRawValue(accounting.formatMoney(field.getValue()));
							},
							focus: function (field) {
								if (field.getValue() != 0) {
									field.setRawValue(accounting.unformat(field.getValue()));
								} else {
									field.setRawValue('');
								}
							}
						}
					},
					{
						xtype            : 'xmoneyfield',
						name             : purposeDb + '_target_bangunan_v',
						itemId           : purposeDb + '_target_bangunan_v',
						enableKeyEvents  : true,
						fieldLabel       : 'Target Bangunan (Rp)',
						labelWidth       : 120,
						width            : '100%',
						labelStyle       : 'font-size: 10.8',
						hideTrigger      : true,
						enforceMaxLength : true,
						maskRe           : /[0-9\.-]/,
						decimalPrecision : 2,
						fieldCls         : 'target_bangunan_v',
						anchor           : '-5',
						listeners        : {
							change: function () {
								// me.hitungTotal();
								if (typeof me.initial[purposeDb + '_target_bangunan_v'] == 'undefined') {
									me.initialFormatting(purposeDb + '_target_bangunan_v');
									me.initial[purposeDb + '_target_bangunan_v'] = 1;
								}
							},
							blur: function (field) {
								field.setRawValue(accounting.formatMoney(field.getValue()));
							},
							focus: function (field) {
								if (field.getValue() != 0) {
									field.setRawValue(accounting.unformat(field.getValue()));
								} else {
									field.setRawValue('');
								}
							}
						}
					},
					{
						xtype            : 'xmoneyfield',
						name             : purposeDb + '_target_v',
						itemId           : purposeDb + '_target_v',
						enableKeyEvents  : true,
						fieldLabel       : 'Target (Rp)',
						labelWidth       : 120,
						width            : '100%',
						labelStyle       : 'font-size: 10.8',
						hideTrigger      : true,
						enforceMaxLength : true,
						maskRe           : /[0-9\.-]/,
						fieldCls         : 'target_v',
						anchor           : '-5',
						listeners        : {
							change: function () {
								me.hitungTotal();
								if (typeof me.initial[purposeDb + '_target_v'] == 'undefined') {
									me.initialFormatting(purposeDb + '_target_v');
									me.initial[purposeDb + '_target_v'] = 1;
								}
							},
							blur: function (field) {
								field.setRawValue(accounting.formatMoney(field.getValue()));
							},
							focus: function (field) {
								if (field.getValue() != 0) {
									field.setRawValue(accounting.unformat(field.getValue()));
								} else {
									field.setRawValue('');
								}
							}
						}
					}
				]
			});

			if (i % 4 == 0) {
				container.push({
					xtype    : 'container',
					layout   : 'hbox',
					defaults : { margin : '10px 20px 0 0' },
					items    : listField
				});
				listField = [];
			}
			i++;
		});

		if (listField.length > 0) {
			container.push({
				xtype    : 'container',
				layout   : 'hbox',
				defaults : { margin : '10px 20px 0 0' },
				items    : listField
			});
			listField = [];
		}
		me.getMainFormData().add(container);
		var total = [{
				xtype  : 'fieldset',
				title  : 'Total',
				margin : '10px 0 10px 0',
				layout : 'vbox',
				width  : '100%',
				items  : [
					{
						xtype            : 'xmoneyfield',
						name             : 'total_target_tanah_m',
						itemId           : 'total_target_tanah_m',
						enableKeyEvents  : true,
						fieldLabel       : 'Target Luas Tanah (m2)',
						labelWidth       : 120,
						width            : '100%',
						labelStyle       : 'font-size: 10.8',
						hideTrigger      : true,
						enforceMaxLength : true,
						maskRe           : /[0-9\.-]/,
						fieldStyle       : 'text-align:right;background:rgb(235, 235, 228)',
						readOnly         : true,
						itemId           : 'total_target_tanah_m',
						anchor           : '-5',
						listeners        : {
							change: function () {
								this.setValuem(this.getValue());
							},
							blur: function (field) {
								field.setRawValue(accounting.formatMoney(field.getValue()));
							},
							focus: function (field) {
								if (field.getValue() != 0) {
									field.setRawValue(accounting.unformat(field.getValue()));
								} else {
									field.setRawValue('');
								}
							}
						}
					},
					{
						xtype            : 'xmoneyfield',
						name             : 'total_target_bangunan_m',
						itemId           : 'total_target_bangunan_m',
						enableKeyEvents  : true,
						fieldLabel       : 'Target Luas Bangunan',
						labelWidth       : 120,
						width            : '100%',
						labelStyle       : 'font-size: 10.8',
						hideTrigger      : true,
						enforceMaxLength : true,
						maskRe           : /[0-9\.-]/,
						fieldStyle       : 'text-align:right;background:rgb(235, 235, 228)',
						readOnly         : true,
						anchor           : '-5',
						listeners        : {
							change: function () {
								this.setValuem(this.getValue());
							},
//							blur: function (field) {
//								field.setRawValue(accounting.formatMoney(field.getValue()));
//							},
//							focus: function (field) {
//								field.setRawValue(accounting.unformat(field.getValue()));
//							}
						}
					},
					{
						xtype            : 'xmoneyfield',
						name             : 'total_target_unit',
						itemId           : 'total_target_unit',
						enableKeyEvents  : true,
						fieldLabel       : 'Target Unit',
						labelWidth       : 120,
						width            : '100%',
						labelStyle       : 'font-size: 10.8',
						hideTrigger      : true,
						enforceMaxLength : true,
						maskRe           : /[0-9\.-]/,
						fieldStyle       : 'text-align:right;background:rgb(235, 235, 228)',
						readOnly         : true,
						anchor           : '-5',
						listeners        : {
							change: function () {
								this.setValuem(this.getValue());
							},
//							blur: function (field) {
//								field.setRawValue(accounting.formatMoney(field.getValue()));
//							},
//							focus: function (field) {
//								field.setRawValue(accounting.unformat(field.getValue()));
//							}
						}
					},
					{
						xtype            : 'xmoneyfield',
						name             : 'total_target_v',
						itemId           : 'total_target_v',
						keepRO           : true,
						enableKeyEvents  : true,
						fieldLabel       : 'Target (Rp)',
						labelWidth       : 120,
						width            : '100%',
						labelStyle       : 'font-size: 10.8',
						hideTrigger      : true,
						enforceMaxLength : true,
						maskRe           : /[0-9\.-]/,
						fieldStyle       : 'text-align:right;background:rgb(235, 235, 228)',
						readOnly         : true,
						decimalPrecision : 2,
						anchor           : '-5',
						listeners        : {
							change: function () {
								this.setValuem(this.getValue());
							},
//							blur: function (field) {
//								field.setRawValue(accounting.formatMoney(field.getValue()));
//							},
//							focus: function (field) {
//								field.setRawValue(accounting.unformat(field.getValue()));
//							}
						}
					}
				]
			},
			{
				xtype  : 'fieldset',
				title  : 'Collection',
				margin : '10px 0 10px 0',
				layout : 'vbox',
				width  : '100%',
				items  : [
					{
						xtype            : 'xmoneyfield',
						name             : 'collection_target_cash_v',
						fieldLabel       : 'Target CASH (Rp)',
						labelWidth       : 120,
						width            : '100%',
						labelStyle       : 'font-size: 10.8',
						hideTrigger      : true,
						enforceMaxLength : true,
						maskRe           : /[0-9\.-]/,
						anchor           : '-5',
						listeners        : {
							change : function () {
								if (typeof me.initial['collection_target_cash_v'] == 'undefined') {
									me.initialFormatting('collection_target_cash_v');
									me.initial['collection_target_cash_v'] = 1;
								}
							},
							blur: function (field) {
								field.setRawValue(accounting.formatMoney(field.getValue()));
							},
							focus: function (field) {
								if (field.getValue() != 0) {
									field.setRawValue(accounting.unformat(field.getValue()));
								} else {
									field.setRawValue('');
								}
							}
						}
					},
					{
						xtype            : 'xmoneyfield',
						name             : 'collection_target_inhouse_v',
						fieldLabel       : 'Target INHOUSE (Rp)',
						labelWidth       : 120,
						width            : '100%',
						labelStyle       : 'font-size: 10.8',
						hideTrigger      : true,
						enforceMaxLength : true,
						maskRe           : /[0-9\.-]/,
						anchor           : '-5',
						listeners        : {
							change : function () {
								if (typeof me.initial['collection_target_inhouse_v'] == 'undefined') {
									me.initialFormatting('collection_target_inhouse_v');
									me.initial['collection_target_inhouse_v'] = 1;
								}
							},
							blur: function (field) {
								field.setRawValue(accounting.formatMoney(field.getValue()));
							},
							focus: function (field) {
								if (field.getValue() != 0) {
									field.setRawValue(accounting.unformat(field.getValue()));
								} else {
									field.setRawValue('');
								}
							}
						}
					},
					{
						xtype            : 'xmoneyfield',
						name             : 'collection_target_kpr_v',
						fieldLabel       : 'Target KPR (Rp)',
						labelWidth       : 120,
						width            : '100%',
						labelStyle       : 'font-size: 10.8',
						hideTrigger      : true,
						enforceMaxLength : true,
						maskRe           : /[0-9\.-]/,
						anchor           : '-5',
						listeners        : {
							change : function () {
								if (typeof me.initial['collection_target_kpr_v'] == 'undefined') {
									me.initialFormatting('collection_target_kpr_v');
									me.initial['collection_target_kpr_v'] = 1;
								}
							},
							blur: function (field) {
								field.setRawValue(accounting.formatMoney(field.getValue()));
							},
							focus: function (field) {
								if (field.getValue() != 0) {
									field.setRawValue(accounting.unformat(field.getValue()));
								} else {
									field.setRawValue('');
								}
							}
						}
					},
					{
						xtype            : 'xmoneyfield',
						name             : 'collection_target_v',
						fieldLabel       : 'Target (Rp)',
						labelWidth       : 120,
						width            : '100%',
						labelStyle       : 'font-size: 10.8',
						hideTrigger      : true,
						enforceMaxLength : true,
						maskRe           : /[0-9\.-]/,
						anchor           : '-5',
						listeners        : {
							change : function () {
								if (typeof me.initial['collection_target_v'] == 'undefined') {
									me.initialFormatting('collection_target_v');
									me.initial['collection_target_v'] = 1;
								}
							},
							blur: function (field) {
								field.setRawValue(accounting.formatMoney(field.getValue()));
							},
							focus: function (field) {
								if (field.getValue() != 0) {
									field.setRawValue(accounting.unformat(field.getValue()));
								} else {
									field.setRawValue('');
								}
							}
						}
					},
				]
			}];
		me.getMainFormData().add(total);
	},

	dataProcess: function (args) {
		if (!args || !args.sender || !args.state || !args.store)
			return false;
		var me = this, recordLength = 0, processMsgLoading = 'Processing', processMsgSuccess = 'Success', processMsgFailure = 'Failure', deleteRecordInfo, senderParent = args.sender.up('panel');
		var syncStore = function () {
			// if (!args.store.syncStore) return false;            

			args.store.on({
				beforesync: {
					fn: function () {
						if (Ext.isFunction(args.store.processFn.beforeSync))
							if (args.store.processFn.beforeSync() === false)
								return false;
						Ext.Object.each(args.store.extraParam, function (k, v) {
							args.store.getProxy().setExtraParam(k, v);
						});
						senderParent.setLoading(processMsgLoading + ', please wait ...');
					}, scope: this, single: true
				}
			});

			args.store.sync({
				callback: function () {
					senderParent.setLoading(false);
					Ext.Object.each(args.store.extraParam, function (k, v) {
						delete args.store.getProxy().extraParams[k];
					});
					if (Ext.isFunction(args.store.processFn.afterSync))
						if (args.store.processFn.afterSync() === false)
							return false;
					args.store.processFn = {};
				},
				success: function (s) {
					if (args.state == me.actionName.destroy) {
						var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
						var res = Ext.decode(s.operations[0].response.responseText).total[0] == undefined ? 1 : 0;

						if (isNaN(successcount)) {
							Ext.Msg.show({
								title: 'Failure',
								msg: '<br/>The data may have been used.',
								icon: Ext.Msg.ERROR,
								buttons: Ext.Msg.OK
							});
						} else {
							processMsgSuccess = (recordLength == 1 ? deleteRecordInfo : (successcount != recordLength ? successcount + ' of ' : '') + deleteRecordInfo) + ' deleted successfully.';
							Ext.Msg.show({title: 'Success', msg: processMsgSuccess, icon: Ext.Msg.INFO, buttons: Ext.Msg.OK, fn: args.store.processFn.successMsgBoxClose});
						}
						var storeIdToFind = args.store.refStoreName || args.store.storeId;
						Ext.StoreManager.each(function (regstore) {
							if (regstore.storeId == storeIdToFind || regstore.storeId == storeIdToFind + 'Store' || regstore.storeId.indexOf('-' + storeIdToFind + '-') != -1 || regstore.storeId.indexOf('~' + storeIdToFind + '~') != -1) {
								var cfg = {};
								if (regstore.storeId == args.store.storeId) {
									cfg = {callback: args.store.processFn.callback};
								}
								regstore.reload(cfg);
							}
						});
					} else {
						if (Ext.decode(s.operations[0].response.responseText).total != 1) {
							Ext.Msg.show({title: 'Warning', msg: Ext.decode(s.operations[0].response.responseText).total[0].message, icon: Ext.Msg.WARNING, buttons: Ext.Msg.OK, fn: args.store});
						} else {
							if (Ext.isFunction(args.store.processFn.success))
								args.store.processFn.success();
							processMsgSuccess = "Success";
							Ext.Msg.show({title: 'Success', msg: processMsgSuccess, icon: Ext.Msg.INFO, buttons: Ext.Msg.OK, fn: args.store.processFn.successMsgBoxClose});
							var storeIdToFind = args.store.refStoreName || args.store.storeId;
							Ext.StoreManager.each(function (regstore) {
								if (regstore.storeId == storeIdToFind || regstore.storeId == storeIdToFind + 'Store' || regstore.storeId.indexOf('-' + storeIdToFind + '-') != -1 || regstore.storeId.indexOf('~' + storeIdToFind + '~') != -1) {
									var cfg = {};
									if (regstore.storeId == args.store.storeId) {
										cfg = {callback: args.store.processFn.callback};
									}
									regstore.reload(cfg);
								}
							});
						}
					}
				},
				failure: function () {
					args.store.rejectChanges();
					if (Ext.isFunction(args.store.processFn.failure))
						args.store.processFn.failure();
					Ext.Msg.show({title: 'Failure', msg: processMsgFailure, icon: Ext.Msg.ERROR, buttons: Ext.Msg.OK, fn: args.store.processFn.failureMsgBoxClose});
				}
			});
		};
		args.state = args.state.toUpperCase();
		if (!Ext.isObject(args.store.processFn))
			args.store.processFn = {};
		if ((args.state == me.actionName.update || args.state == me.actionName.destroy)) {
			recordLength = args.record.length;
			if (!args.record || recordLength < 1) {
				Ext.Msg.alert('Info', 'No record selected !');
				return false;
			}
		}
		if (Ext.isFunction(args.store.processFn.preProcess))
			if (args.store.processFn.preProcess() === false)
				return false;
		if (args.state != me.actionName.destroy) {
			if (!args.data)
				return false;
			switch (args.state) {
				case me.actionName.create:
					processMsgLoading = 'Creating new data';
					processMsgSuccess = 'Data created successfully.';
					processMsgFailure = 'ERROR: Unable to create data.';
					args.store.add(args.data);
					break;
				case me.actionName.update:
					processMsgLoading = 'Updating data';
					processMsgSuccess = 'Data updated successfully.';
					processMsgFailure = 'ERROR: Unable to update data.';
					args.record.beginEdit(); /*===================================================== added by TB 19 Juli 2016 */
					args.record.set(args.data);
					args.record.endEdit(); /*===================================================== added by TB 19 Juli 2016 */
					break;
			}
			syncStore();
		} else if (args.state == me.actionName.destroy) {
			var confirmMsg;
			processMsgLoading = 'Deleting data';
			if (recordLength == 1) {
				deleteRecordInfo = args.store.deleteRecordInfo || args.record[0].get(me.selfName.toLowerCase() + '_name') || 'data';
				processMsgFailure = 'ERROR: Unable to delete ' + deleteRecordInfo + '.';
				confirmMsg = 'Delete ' + deleteRecordInfo + ' ?';
			} else {
				deleteRecordInfo = recordLength + ' record' + (recordLength > 1 ? 's' : '');
				processMsgFailure = 'ERROR: Unable to delete data.';
				confirmMsg = 'This action will delete ' + deleteRecordInfo + '.<br />Continue ?';
			}
			processMsgFailure += '<br /><br />Data may have been used and cannot be deleted or data is already deleted.<br />Please refresh the data list or try to deactivate the data if no longer used.';
			args.store.confirmDestroy = args.store.confirmDestroy || true;
			if (args.store.confirmDestroy) {
				Ext.Msg.confirm('Delete Data', confirmMsg, function (btn) {
					if (btn == 'yes') {
						for (var i = 0; i < recordLength; i++) {
							args.store.remove(args.record[i]);
						}
						syncStore();
					}
				});
			} else {
				for (var i = 0; i < recordLength; i++) {
					args.store.remove(args.record[i]);
				}
				syncStore();
			}
		}
		if (Ext.isFunction(args.store.processFn.postProcess))
			args.store.processFn.postProcess();
		if (!args.store.syncStore)
			args.store.processFn = {};
	},
	hitungTotal: function () {
		var me = this;
		var total_tanah = 0;
		var total_bangunan = 0;
		var total_unit = 0;
		// var total_tanah_rp = 0;
		// var total_bangunan_rp = 0;
		var total_rp = 0;

		Ext.Array.each(me.listPurpose, function (field) {
			var purposeDb = field.purpose_target_fieldname;

			total_tanah += me.strToFloat(me.getMainFormData().down("[name=" + purposeDb + "_target_tanah_m]").getValuem());
			total_bangunan += me.strToFloat(me.getMainFormData().down("[name=" + purposeDb + "_target_bangunan_m]").getValuem());
			total_unit += me.strToFloat(me.getMainFormData().down("[name=" + purposeDb + "_target_unit]").getValuem());
			// total_tanah_rp += me.strToFloat(me.getMainFormData().down("[name=" + purposeDb + "_target_tanah_v]").getValuem());
			// total_bangunan_rp += me.strToFloat(me.getMainFormData().down("[name=" + purposeDb + "_target_bangunan_v]").getValuem());
			total_rp += me.strToFloat(me.getMainFormData().down("[name=" + purposeDb + "_target_v]").getValuem());
		});

		me.getMainFormData().down("[name=total_target_tanah_m]").setValue(total_tanah);
		me.getMainFormData().down("#total_target_bangunan_m").setValue(total_bangunan);
		me.getMainFormData().down("#total_target_unit").setValue(total_unit);
		// me.getMainFormData().down("#total_target_tanah_v").setValue(total_tanah_rp);
		// me.getMainFormData().down("#total_target_bangunan_v").setValue(total_bangunan_rp);
		me.getMainFormData().down("#total_target_v").setValue(total_rp);
		return false;
	},
	strToFloat: function (text) {
		if (text == null) {
			return 0;
		} else {
			return parseFloat(text);
		}
	},
	initialFormatting: function (element) {
		var me = this;
		el = me.getMainFormData().down("[name=" + element + "]");
		el.setRawValue(accounting.formatMoney(me.strToFloat(el.getValuem())));
	}
});