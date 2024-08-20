Ext.define('Erems.view.cashinpaymentreport.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.cashinpaymentreportformdata',
	requires: [

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
							xtype: 'datefield',
							itemId: 'purchase_startdate',
							name: 'purchase_startdate',
							fieldLabel: 'Purchase Date',
							labelSeparator: '',
							//editable: false,
							format: 'd M Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							value: new Date()
						},
						{
							xtype: 'label',
							styleHtmlContent: false,
							width: 5,
							text: 'to'
						},
						{
							xtype: 'datefield',
							itemId: 'purchase_enddate',
							name: 'purchase_enddate',
							labelSeparator: '',
							//editable: false,
							format: 'd M Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							value: new Date()
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
							fieldLabel: 'Due Date',
							labelSeparator: '',
							//editable: false,
							format: 'd M Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							value: new Date()
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
							labelSeparator: '',
							//editable: false,
							format: 'd M Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							value: new Date()
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
							name: 'pricetype_id',
							fieldLabel: 'Purchase Type',
							reportParams: true,
							displayField: 'pricetype',
							valueField: 'pricetype_id',
							store: new Ext.data.ArrayStore({
								storeId: 'ext-empty-store',
								fields: ['pricetype_id', 'pricetype'],
								data: [
									[1, 'KPR'],
									[2, 'CASH & INHOUSE']
								]
							})
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_pricetype_id',
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

