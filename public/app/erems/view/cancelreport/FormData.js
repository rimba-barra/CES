Ext.define('Erems.view.cancelreport.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.cancelreportformdata',
	frame: true,
	autoScroll: true,
	bodyBorder: true,
	width: 650,
	height: 425,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			dockedItems: me.generateDockedItems(),
			items: [
				{
					xtype: 'hiddenfield',
					name: 'project_id'
				},
				// {
				// 	xtype: 'hiddenfield',
				// 	name: 'pt_id'
				// },
				{
					xtype: 'hiddenfield',
					name: 'Project'
				},
				{
					xtype: 'hiddenfield',
					name: 'Pt'
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
							fieldLabel: 'Cancellation Date',
							name: 'start_date',
							submitFormat: 'Y-m-d',
							flex: 1
						},
						{
							xtype: 'label',
							text: 'to',
							width: 20

						},
						{
							xtype: 'datefield',
							name: 'end_date',
							submitFormat: 'Y-m-d',
							fieldLabel: '',
							flex: 1
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
							xtype: 'buildingclasscombobox',
							name: 'buildingclass',
							fieldLabel: 'Group type',
							reportParams: true
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_buildingclass',
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
							xtype: 'clustercombobox',
							name: 'cluster_id',
							fieldLabel: 'Cluster',
							reportParams: true
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_cluster_id',
							inputValue: '1',
							uncheckedValue: '0',
							checked: true,
							margin: '0 5px 0 0',
							width: 20
						},
						{
							xtype: 'label',
							text: 'ALL'
						}
					]
				}

				, {
					xtype: 'container',
					layout: 'hbox',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype: 'typecombobox',
							name: 'type_id',
							// bindPrefixName: "Townplanningreport",
							// storeUrl: 'townplanningreport',
							reportParams: true
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_type_id',
							inputValue: '1',
							uncheckedValue: '0',
							checked: true,
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
							xtype: 'cancelreasoncombobox',
							name: 'cancelreason_id',
							reportParams: true
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_cancelreason_id',
							inputValue: '1',
							checked: true,
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
							xtype: 'productcategorycombobox',
							name: 'productcategory_id',
							reportParams: true
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_productcategory_id',
							inputValue: '1',
							checked: true,
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
							xtype: 'projectptcombobox',
							name: 'pt_id',
							fieldLabel: 'Unit PT Name',
							valueField: 'pt_id',
							reportParams: true,
							width: 475
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_pt_id',
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
							xtype: 'fieldset',
							height: 50,
							width: '100%',
							//title: 'My Fields',
							items: [
								{
									xtype: 'radiogroup',
									fieldLabel: 'Group by',
									name: 'groupBy',
									items: [
										{
											boxLabel: 'Cluster', 
											width: '150', 
											name: 'Groupby', 
											inputValue: "cluster", 
											checked: true
										},
										{
											boxLabel: 'Cancel Reason', 
											width: '150', 
											name: 'Groupby', 
											inputValue: "cancelreason"
										}
									]
								}
							]
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
							xtype: 'fieldset',
							height: 50,
							width: '100%',
							//title: 'My Fields',
							items: [
								{
									xtype: 'radiogroup',
									fieldLabel: 'Sort by',
									name: 'radiogroup_sort_by',
									items: [
										{
											xtype: 'radiofield',
											boxLabel: 'Cancellation Date',
											width: '150', 
											name: 'radio_sort_by',
											inputValue: 'cancellation_date',
											itemId: 'cancellation_date',
											checked: true
										},
										{
											xtype: 'radiofield',
											boxLabel: 'Unit Number',
											width: '150', 
											name: 'radio_sort_by',
											inputValue: 'unit_number', 
											itemId: 'unit_number'
										}
									]
								}
							]
						}
                    ]
                },
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
						//  disabled:true,
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

