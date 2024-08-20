Ext.define('Erems.view.legalpecahsudahhgbajbreport.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.legalpecahsudahhgbajbreportformdata',
	requires: [
		'Erems.library.template.component.Bankcombobox',
		'Erems.library.template.component.Buildingclasscombobox',
		'Erems.library.template.component.Productcategorycombobox'
	],
	frame: true,
	autoScroll: true,
	bodyBorder: true,
	width: 600,
	//height: 300,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;

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
							xtype: 'buildingclasscombobox',
							name: 'buildingclass',
							fieldLabel: 'Group Admin',
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
						//margin: '10px 20px 0 0'
					},
					items: [
						{
							xtype: 'fieldset',
							height: 40,
							width: '100%',
							border: false,
							//title: 'My Fields',
							items: [
								{
									xtype: 'radiogroup',
									fieldLabel: 'Tipe Bayar',
									name: 'radiogroup_pricetype',
									//labelWidth: 120,
									items: [
										{
											xtype: 'radiofield',
											boxLabel: 'Cash + Inhouse',
											name: 'radio_pricetype',
											inputValue: 'cash_inhouse',
											itemId: 'cash_inhouse',
											checked: true
										},
										{
											xtype: 'radiofield',
											boxLabel: 'Bank',
											name: 'radio_pricetype',
											inputValue: 'bank',
											itemId: 'bank'
										},
										{
											xtype: 'radiofield',
											boxLabel: 'ALL',
											name: 'radio_pricetype',
											inputValue: 'all',
											itemId: 'all'
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
							xtype: 'bankcombobox',
							name: 'bank_id',
							fieldLabel: 'Nama Bank',
							reportParams: true
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_bank_id',
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
							xtype: 'productcategorycombobox',
							name: 'productcategory_id',
							reportParams: true
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_productcategory_id',
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
							itemId: 'periode_startdate',
							name: 'periode_startdate',
							fieldLabel: 'Purchase Letter Date',
							labelWidth: 120,
							labelSeparator: '',
							//editable: false,
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
							itemId: 'periode_enddate',
							name: 'periode_enddate',
							//fieldLabel: 'to',
							//labelWidth: 20,
							labelSeparator: '',
							//editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							//disabled: true,
							//margin: '5px 0 0 0'
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
							xtype: 'checkboxfield',
							fieldLabel: 'Status Bayar',
							itemId: 'status_bayar',
							name: 'status_bayar',
							inputValue: '1',
							uncheckedValue: '0',
							boxLabel: 'Lunas 100%'
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

