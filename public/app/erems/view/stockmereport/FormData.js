Ext.define('Erems.view.stockmereport.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.stockmereportformdata',
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
							xtype: 'label',
							styleHtmlContent: false,
							text: 'Collecting Marketing Stock Information'
						}
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					margin: '10px 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype: 'datefield',
							fieldLabel: 'First PurchaseDate',
							name: 'start_date',
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							labelWidth: 150,
//							flex: 1
						},
						{
							xtype: 'label',
							text: 'to',
							width: 20

						},
						{
							xtype: 'datefield',
							name: 'end_date',
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u',
							fieldLabel: '',
//							flex: 1
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
							labelWidth: 150,
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
					margin: '10px 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype: 'clustercombobox',
							name: 'cluster_id',
							fieldLabel: 'Cluster',
							//reportParams: true
							multiSelect: true,
							labelWidth: 150,
							width: 475
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
					margin: '20px 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_excel',
							checked: true,
							inputValue: '1',
							uncheckedValue: '0',
							margin: '0 5px 0 0',
							width: 20
						},
						{
							xtype: 'label',
							text: 'Export to Excel'
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

