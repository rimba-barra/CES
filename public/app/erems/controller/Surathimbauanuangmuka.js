Ext.define('Erems.controller.Surathimbauanuangmuka', {
	extend: 'Erems.library.template.controller.Controller',
	alias: 'controller.Surathimbauanuangmuka',
	views: ['surathimbauanuangmuka.Panel', 'surathimbauanuangmuka.Grid', 'surathimbauanuangmuka.FormSearch'],
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
	],
	stores: ['', 'Mastercluster', 'Masterblock', 'Surathimbauanuangmuka', 'Masterparameterglobal'],
	models: ['Surathimbauanuangmuka', 'Masterparameterglobal'],
	refs: [
		{
			ref: 'grid',
			selector: 'surathimbauanuangmukagrid'
		},
		{
			ref: 'formsearch',
			selector: 'surathimbauanuangmukaformsearch'
		}
	],
	controllerName: 'surathimbauanuangmuka',
	fieldName: 'surathimbauanuangmuka',
	bindPrefixName: 'Surathimbauanuangmuka',
	init: function (application) {
		var me = this;
		this.control({
			'surathimbauanuangmukapanel': {
				beforerender: me.mainPanelBeforeRender,
				afterrender: this.panelAfterRender

			},
			'surathimbauanuangmukagrid': {
				afterrender: this.gridAfterRender,
				itemdblclick: this.gridItemDblClick,
				itemcontextmenu: this.gridItemContextMenu,
				selectionchange: this.gridSelectionChange
			},
			'surathimbauanuangmukaformsearch': {
				afterrender: this.formSearchAfterRender,
			},
			'surathimbauanuangmukagrid toolbar button[action=print]': {
				click: this.dataPrintDoc
			},
			'surathimbauanuangmukaformsearch button[action=search]': {
				click: this.dataSearch
			},
			'surathimbauanuangmukaformsearch button[action=reset]': {
				click: this.dataReset
			},
			'surathimbauanuangmukaformsearch [xtype=textfield]': {
				'render': function (cmp) {
					cmp.getEl().on('keypress', function (e) {
						if (e.getKey() == e.ENTER) {
							me.dataSearch();
						}
					});
				}
			},
		});
	},
	gridSelectionChange: function () {
		var me = this;
		var grid = me.getGrid(), row = grid.getSelectionModel().getSelection();

		grid.down('#btnPrint').setDisabled(row.length != 1);
	},
	// added by rico 19112021
	dataReset: function () {
		resetTimer();
		var me = this;

		var form = me.getFormsearch().getForm();
		var store = me.getGrid().getStore();
		var fields = form.getValues();

		for (var x in fields) {
			fields[x] = '';
			store.getProxy().setExtraParam(x, fields[x]);
		}
		form.reset();
		me.loadPage(store);
	},

	/* added by rico 16122021 */
	/* report needed */
	dataPrintDoc: function () {
		var me = this;
		var grid = me.getGrid();
		var store = grid.getStore();
		var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
		var param_store = record.data;

		me.printOut(me, param_store['purchaseletter_id'], 'PRINTOUT_SURAT_HIMBAUAN_UANG_MUKA', 'erems/surathimbauanuangmuka/read');
	},
	printOut: function (me, id, parametername, urlAdd) {
		// var me = this;
		var id = id;

		var globalparameterStore = me.getMasterparameterglobalStore();
		globalparameterStore.removeAll();
		globalparameterStore.load({params: {parametername: parametername}});

		var combo = Ext.create('Ext.form.field.ComboBox', {
			editable: false,
			queryMode: 'local',
			valueField: 'value',
			displayField: 'value',
			width: '100%',
			store: globalparameterStore
		});

		Ext.create('Ext.window.Window', {
			title: 'Select Printout Document',
			height: 100,
			width: 400,
			layout: 'hbox',
			padding: '10px 10px 10px 10px',
			modal: true,
			items: {// Let's put an empty grid in just to illustrate fit layout
				xtype: combo,
				name: 'printout_cb'
			},
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					ui: 'footer',
					layout: {
						//padding: 6,
						type: 'hbox'
					},
					items: [
						{
							xtype: 'button',
							action: 'processprintout',
							padding: 5,
							width: 75,
							iconCls: 'icon-save',
							text: 'Process',
							handler: function () {
								var win = this.up('window');

								var printout_cb = win.items.items[0].value;

								if (!printout_cb) {
									Ext.Msg.show({
										title: 'Alert',
										msg: 'Please Select Printout Document First',
										icon: Ext.Msg.WARNING,
										buttons: Ext.Msg.OK
									});
									return false;
								}

								win.body.mask('Creating Document, Please Wait...');

								Ext.Ajax.request({
									url: urlAdd,
									params: {
										id: id,
										document_name: printout_cb,
										read_type: 'printout'
									},
									success: function (response) {
										try {
											var resp = response.responseText;

											if (resp) {
												var info = Ext.JSON.decode(resp);

												if (info.success == true) {
													var url = info.url;

													win.body.unmask();
													Ext.Msg.show({
														title: 'Info',
														//updated by anas 08092021
														msg: '<a href="' + info.url + '" target="blank">Click Here For Download Document</a>',
														icon: Ext.Msg.INFO,
														//buttons: [], //jika ingin tidak ada buttons
														buttons: Ext.Msg.CANCEL,
														buttonText: {
															cancel: 'Close',
														}
													});
												} else {
													win.body.unmask();
													Ext.Msg.show({
														title: 'Failure',
														msg: 'Error: Create Document Failed.',
														icon: Ext.Msg.ERROR,
														buttons: Ext.Msg.OK
													});
												}
											}
										} catch (e) {
											console.error(e);
											win.body.unmask();
											Ext.Msg.show({
												title: 'Failure',
												msg: 'Error: Create Document Failed.',
												icon: Ext.Msg.ERROR,
												buttons: Ext.Msg.OK
											});
										}
									},
									failure: function (e) {
										console.error(e);
										win.body.unmask();
										Ext.Msg.show({
											title: 'Failure',
											msg: 'Error: Create Document Failed.',
											icon: Ext.Msg.ERROR,
											buttons: Ext.Msg.OK
										});
									}
								});
							}
						},
						{
							xtype: 'button',
							action: 'cancel',
							itemId: 'btnCancel',
							padding: 5,
							width: 75,
							iconCls: 'icon-cancel',
							text: 'Cancel',
							handler: function () {
								this.up('window').close();
							}
						}
					]
				}
			]
		}).show();
	},
});