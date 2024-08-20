Ext.define('Erems.view.stpembayaranreport.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.stpembayaranreportformdata',
	requires: [
		'Erems.library.template.component.Buildingclasscombobox',
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Productcategorycombobox'],
	frame: true,
	autoScroll: true,
	bodyBorder: true,
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
				}, {
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
					xtype: 'radiogroup',
					fieldLabel: 'Status pembayaran',
					// Arrange radio buttons into two columns, distributed vertically
					name: 'status_pembayaran',
					itemId: 'status_pembayaran',
					vertical: false,
					items: [
						{minWidth: 100, boxLabel: 'Lunas Total', name: 'Statuspembayaran', inputValue: 1, checked: true},
						{minWidth: 130, boxLabel: 'Lunas Uang Muka', name: 'Statuspembayaran', inputValue: 2},
						{minWidth: 100, boxLabel: 'Lunas KPR', name: 'Statuspembayaran', inputValue: 3}
					]
				},
				{
					xtype: 'radiogroup',
					fieldLabel: 'Status',
					// Arrange radio buttons into two columns, distributed vertically
					name: 'status_lunas',
					itemId: 'status_lunas',
					vertical: false,
					items: [
						{minWidth: 100, boxLabel: 'Lunas', name: 'Statuslunas', inputValue: 1, checked: true},
						{minWidth: 150, boxLabel: 'Belum lunas', name: 'Statuslunas', inputValue: 0},
						{minWidth: 150, boxLabel: 'All Unit', name: 'Statuslunas', inputValue: 2}
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
						disabled: false,
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

