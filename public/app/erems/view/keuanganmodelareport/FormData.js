Ext.define('Erems.view.keuanganmodelareport.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.keuanganmodelareportformdata',
	requires: [
		'Erems.library.template.component.Projectptcombobox',
	],
	frame: true,
	autoScroll: true,
	bodyBorder: true,
	width: 600,
	height: 250,
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
							fieldLabel: 'Collection Date',
							labelSeparator: '',
							//editable: false,
							format: 'd-m-Y',
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
							xtype: 'radiogroup',
							width: 350,
							fieldLabel: 'Versi',
							name: 'radiogroup_version',
							items: [
								{
									xtype: 'radiofield',
									boxLabel: 'v1',
									name: 'version',
									inputValue: '1',
									itemId: 'version1',
									checked: true
								},
								{
									xtype: 'radiofield',
									boxLabel: 'v2',
									name: 'version',
									inputValue: '2',
									itemId: 'version2'
								},
							]
						}
					]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					itemId: 'conReportType',
					margin: '0 0 5px 0',
					defaults: {
						margin: '0 20px 0 0'
					},
					items: [
						{
							xtype: 'radiogroup',
							width: 350,
							fieldLabel: 'Report Type',
							name: 'radiogroup_grossnetto',
							items: [
								{
									xtype: 'radiofield',
									boxLabel: 'Gross (Default)',
									name: 'status',
									inputValue: '1',
									itemId: 'gross',
									checked: true
								},
								{
									xtype: 'radiofield',
									boxLabel: 'Netto',
									name: 'status',
									inputValue: '2',
									itemId: 'netto'
								},
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
							xtype: 'projectptcombobox',
							name: 'pt_id',
							fieldLabel: 'Unit PT Name',
							valueField: 'pt_id',
							reportParams: true,
							width: '80%'
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

