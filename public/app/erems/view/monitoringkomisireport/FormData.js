Ext.define('Erems.view.monitoringkomisireport.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.monitoringkomisireportformdata',
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Citraclubcombobox',
		'Erems.template.ComboBoxFields'
	],
	frame: true,
	autoScroll: true,
	bodyBorder: true,
	// width: 600,
	height: 400,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;

		var salesmanStore = Ext.create('Ext.data.Store', {
			fields: ['employee_name', 'employee_id'],
			data: []
		});

		var SimpleStore = Ext.create('Ext.data.ArrayStore', {
			fields: ['abbr', 'name'],
			data: [['1', 'Sudah'], ['0', 'Belum']]
		});

		Ext.applyIf(me, {
			dockedItems: me.generateDockedItems(),
			items: [
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype: 'clustercombobox',
							name: 'cluster_id',
							fieldLabel: 'Cluster',
							labelWidth: 120,
							reportParams: true
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_cluster_id',
							checked: true,
							inputValue: '1',
							uncheckedValue: '0',
							margin: '0 5px 0 0',
							width: 20
						},
						{
							xtype: 'label',
							text: 'ALL'
						}
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype: 'citraclubcombobox',
							name: 'citraclub_id',
							fieldLabel: 'Club Citra',
							labelWidth: 120,
							reportParams: true
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_citraclub_id',
							checked: true,
							inputValue: '1',
							uncheckedValue: '0',
							margin: '0 5px 0 0',
							width: 20
						},
						{
							xtype: 'label',
							text: 'ALL'
						}
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype: 'combobox',
							name: 'salesman_id',
							fieldLabel: 'Salesman',
							labelWidth: 120,
							displayField: 'employee_name',
							valueField: 'employee_id',
							store: salesmanStore,
							reportParams: true
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_salesman_id',
							checked: true,
							inputValue: '1',
							uncheckedValue: '0',
							margin: '0 5px 0 0',
							width: 20
						},
						{
							xtype: 'label',
							text: 'ALL'
						}
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype: 'datefield',
							itemId: 'sppjb_startdate',
							name: 'sppjb_startdate',
							fieldLabel: 'Tgl. Ttd SPPJB',
							labelWidth: 120,
							labelSeparator: '',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							//disabled: true
						},
						{
							xtype: 'label',
							styleHtmlContent: false,
							width: 5,
							text: 'to'
						},
						{
							xtype: 'datefield',
							itemId: 'sppjb_enddate',
							name: 'sppjb_enddate',
							//fieldLabel: 'to',
							//labelWidth: 20,
							labelSeparator: '',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							//disabled: true,
							//margin: '5px 0 0 0'
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_periodesppjb_id',
							checked: true,
							inputValue: '1',
							uncheckedValue: '0',
							margin: '0 5px 0 0',
							width: 20
						},
						{
							xtype: 'label',
							text: 'ALL'
						}
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype: 'datefield',
							itemId: 'akad_startdate',
							name: 'akad_startdate',
							fieldLabel: 'Tgl. Akad',
							labelWidth: 120,
							labelSeparator: '',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							//disabled: true
						},
						{
							xtype: 'label',
							styleHtmlContent: false,
							width: 5,
							text: 'to'
						},
						{
							xtype: 'datefield',
							itemId: 'akad_enddate',
							name: 'akad_enddate',
							//fieldLabel: 'to',
							//labelWidth: 20,
							labelSeparator: '',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							//disabled: true,
							//margin: '5px 0 0 0'
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_periodeakad_id',
							checked: true,
							inputValue: '1',
							uncheckedValue: '0',
							margin: '0 5px 0 0',
							width: 20
						},
						{
							xtype: 'label',
							text: 'ALL'
						}
					]
				},
				{
					xtype: 'fieldset',
					bodyPadding: 10, 
					width: '100%',
					title: 'Additional Filter for SH1',
					items: [
						{
							xtype: 'container',
							layout: 'hbox',
							margin: '0 0 5px 0',
							defaults: {
								margin: '0 20px 0 0'
							},
							items: [
								{
									xtype: 'datefield',
									itemId: 'input_sppjb_startdate',
									name: 'input_sppjb_startdate',
									fieldLabel: 'Tgl. Input Ttd SPPJB',
									labelWidth: 150,
									width:290,
									labelSeparator: '',
									editable: false,
									format: 'd-m-Y',
									altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
									submitFormat: 'Y-m-d H:i:s.u',
									//disabled: true
								},
								{
									xtype: 'label',
									styleHtmlContent: false,
									width: 5,
									text: 'to'
								},
								{
									xtype: 'datefield',
									itemId: 'input_sppjb_enddate',
									name: 'input_sppjb_enddate',
									//fieldLabel: 'to',
									//labelWidth: 20,
									labelSeparator: '',
									width:140,
									editable: false,
									format: 'd-m-Y',
									altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
									submitFormat: 'Y-m-d H:i:s.u',
									//disabled: true,
									//margin: '5px 0 0 0'
								},
								{
									xtype: 'checkboxfield',
									fieldLabel: '',
									name: 'cbf_input_periodesppjb',
									checked: true,
									inputValue: '1',
									uncheckedValue: '0',
									margin: '0 5px 0 0',
									width: 20
								},
								{
									xtype: 'label',
									text: 'ALL'
								}
							]
						},
						{
							xtype: 'container',
							layout: 'hbox',
							margin: '0 0 5px 0',
							defaults: {
								margin: '0 20px 0 0'
							},
							items: [
								{
									xtype: 'datefield',
									itemId: 'input_akad_startdate',
									name: 'input_akad_startdate',
									fieldLabel: 'Tgl. Input Real Akad Date',
									labelWidth: 150,
									width:290,
									labelSeparator: '',
									editable: false,
									format: 'd-m-Y',
									altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
									submitFormat: 'Y-m-d H:i:s.u',
									//disabled: true
								},
								{
									xtype: 'label',
									styleHtmlContent: false,
									width: 5,
									text: 'to'
								},
								{
									xtype: 'datefield',
									itemId: 'input_akad_enddate',
									name: 'input_akad_enddate',
									//fieldLabel: 'to',
									//labelWidth: 20,
									labelSeparator: '',
									width:140,
									editable: false,
									format: 'd-m-Y',
									altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
									submitFormat: 'Y-m-d H:i:s.u',
									//disabled: true,
									//margin: '5px 0 0 0'
								},
								{
									xtype: 'checkboxfield',
									fieldLabel: '',
									name: 'cbf_input_periodeakad',
									checked: true,
									inputValue: '1',
									uncheckedValue: '0',
									margin: '0 5px 0 0',
									width: 20
								},
								{
									xtype: 'label',
									text: 'ALL'
								}
							]
						},,
		                {
		                    xtype: 'container',
		                    layout: 'hbox',
		                    margin: '0 0 5px 0',
		                    defaults: {
		                        margin: '0 20px 0 0'
		                    },
		                    items: [
		                        {
							        xtype: 'combobox',
									itemId: 'sudah_komisi',
									name: 'sudah_komisi',
									labelWidth: 150,
									fieldLabel: 'Sudah Komisi',
							        displayField: 'name',
							        valueField: 'abbr',
							        store: SimpleStore
							    },
								{
									xtype: 'checkboxfield',
									fieldLabel: '',
									name: 'cbf_sudah_komisi',
									checked: true,
									inputValue: '1',
									uncheckedValue: '0',
									margin: '0 5px 0 0',
									width: 20
								},
								{
									xtype: 'label',
									text: 'ALL'
								}
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    layout: 'hbox',
		                    margin: '0 0 5px 0',
		                    defaults: {
		                        margin: '0 20px 0 0'
		                    },
		                    items: [
		                        {
							        xtype: 'combobox',
									itemId: 'sudah_reward_customer',
									name: 'sudah_reward_customer',
									labelWidth: 150,
									fieldLabel: 'Sudah Reward Customer',
							        displayField: 'name',
							        valueField: 'abbr',
							        store: SimpleStore
							    },
								{
									xtype: 'checkboxfield',
									fieldLabel: '',
									name: 'cbf_sudah_reward_customer',
									checked: true,
									inputValue: '1',
									uncheckedValue: '0',
									margin: '0 5px 0 0',
									width: 20
								},
								{
									xtype: 'label',
									text: 'ALL'
								}
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    layout: 'hbox',
		                    margin: '0 0 5px 0',
		                    defaults: {
		                        margin: '0 20px 0 0'
		                    },
		                    items: [
		                        {
							        xtype: 'combobox',
									itemId: 'sudah_reward_tambahan',
									name: 'sudah_reward_tambahan',
									labelWidth: 150,
									fieldLabel: 'Sudah Reward Tambahan',
							        displayField: 'name',
							        valueField: 'abbr',
							        store: SimpleStore
							    },
								{
									xtype: 'checkboxfield',
									fieldLabel: '',
									name: 'cbf_sudah_reward_tambahan',
									checked: true,
									inputValue: '1',
									uncheckedValue: '0',
									margin: '0 5px 0 0',
									width: 20
								},
								{
									xtype: 'label',
									text: 'ALL'
								}
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    layout: 'hbox',
		                    margin: '0 0 5px 0',
		                    defaults: {
		                        margin: '0 20px 0 0'
		                    },
		                    items: [
		                        {
							        xtype: 'combobox',
									itemId: 'sudah_reward_sales',
									name: 'sudah_reward_sales',
									labelWidth: 150,
									fieldLabel: 'Sudah Reward Sales',
							        displayField: 'name',
							        valueField: 'abbr',
							        store: SimpleStore
							    },
								{
									xtype: 'checkboxfield',
									fieldLabel: '',
									name: 'cbf_sudah_reward_sales',
									checked: true,
									inputValue: '1',
									uncheckedValue: '0',
									margin: '0 5px 0 0',
									width: 20
								},
								{
									xtype: 'label',
									text: 'ALL'
								}
		                    ]
		                },
		                {
		                    xtype: 'container',
		                    layout: 'hbox',
		                    margin: '0 0 5px 0',
		                    defaults: {
		                        margin: '0 20px 0 0'
		                    },
		                    items: [
		                        {
							        xtype: 'combobox',
									itemId: 'sudah_bgb',
									name: 'sudah_bgb',
									labelWidth: 150,
									fieldLabel: 'Sudah BGB (Buyer Get Buyer)',
							        displayField: 'name',
							        valueField: 'abbr',
							        store: SimpleStore
							    },
								{
									xtype: 'checkboxfield',
									fieldLabel: '',
									name: 'cbf_sudah_bgb',
									checked: true,
									inputValue: '1',
									uncheckedValue: '0',
									margin: '0 5px 0 0',
									width: 20
								},
								{
									xtype: 'label',
									text: 'ALL'
								}
		                    ]
		                }
					]
				}
			]

		});

		me.callParent(arguments);
	},
	generateDockedItems: function () {
		var dockedItems = [
			{
				xtype: 'toolbar',
				dock: 'bottom',
				ui: 'footer',
				layout: {
					padding: 6,
					type: 'hbox'
				},
				items: [
					{
						xtype: 'button',
						action: 'process',
						itemId: 'btnSearch',
						padding: 5,
						width: 75,
						iconCls: 'icon-search',
						text: 'Process'
					},
					{
						xtype: 'button',
						action: 'reset',
						itemId: 'btnReset',
						padding: 5,
						width: 75,
						iconCls: 'icon-reset',
						text: 'Reset'
					}
				]
			}
		];
		return dockedItems;
	}
});

