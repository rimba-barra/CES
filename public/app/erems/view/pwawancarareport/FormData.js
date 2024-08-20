Ext.define('Erems.view.pwawancarareport.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.pwawancarareportformdata',
	requires: ['Erems.library.template.component.Bankcombobox'],
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
					xtype: 'hiddenfield',
					name: 'project_id'
				},
				{
					xtype: 'hiddenfield',
					name: 'pt_id'
				},
				{
					xtype: 'hiddenfield',
					name: 'Project'
				},
				{
					xtype: 'hiddenfield',
					name: 'Pt'
				},
				{
					xtype: 'hiddenfield',
					name: 'pricetype_id'
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
							name: 'bot_date',
							fieldLabel: 'Periode',
							reportParams: true,
							flex: 3
						},
						{
							xtype: 'label',
							width: 20,
							text: 'to',
							margin: '0 5px'
						},
						{
							xtype: 'datefield',
							name: 'top_date',
							fieldLabel: '',
							reportParams: true,
							flex: 2
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
							reportParams: true
						},
						{
							xtype: 'checkboxfield',
							fieldLabel: '',
							name: 'cbf_bank',
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
					fieldLabel: 'Status',
					// Arrange radio buttons into two columns, distributed vertically
					itemId: 'status',
					vertical: true,
					items: [
						{boxLabel: 'Rencana Wawancara', width: '150', name: 'Status', inputValue: 1, checked: true},
						{boxLabel: 'Belum Wawancara', name: 'Status', inputValue: 2}
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

