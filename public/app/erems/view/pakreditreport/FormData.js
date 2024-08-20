Ext.define('Erems.view.pakreditreport.FormData', {
	extend        : 'Erems.library.template.view.FormData',
	alias         : 'widget.pakreditreportformdata',
	requires      : ['Erems.library.template.component.Bankcombobox'],
	frame         : true,
	autoScroll    : true,
	bodyBorder    : true,
	width         : 600,
	bodyStyle     : 'border-top:none;border-left:none;border-right:none;',
	initComponent : function () {
		var me = this;

		Ext.applyIf(me, {
			dockedItems: me.generateDockedItems(),
			items: [
				{
					xtype    : 'container',
					layout   : 'hbox',
					margin   : '0 0 5px 0',
					defaults : {
						margin : '0 20px 0 0'
					},
					items : [
						{
							xtype        : 'datefield',
							name         : 'bot_date',
							fieldLabel   : 'Periode',
							reportParams : true,
							flex         : 3
						},
						{
							xtype  : 'label',
							width  : 20,
							text   : 'to',
							margin : '0 5px'
						},
						{
							xtype        : 'datefield',
							name         : 'top_date',
							fieldLabel   : '',
							reportParams : true,
							flex         : 2
						}
					]
				},
				{
					xtype    : 'container',
					layout   : 'hbox',
					margin   : '0 0 5px 0',
					defaults : {
						margin : '0 20px 0 0'
					},
					items: [
						{
							xtype        : 'bankcombobox',
							name         : 'bank_id',
							reportParams : true
						},
						{
							xtype          : 'checkboxfield',
							fieldLabel     : '',
							name           : 'cbf_bank_id',
							checked        : true,
							inputValue     : '1',
							uncheckedValue : '0',
							margin         : '0 5px 0 0',
							width          : 20
						},
						{
							xtype: 'label',
							text: 'ALL'
						}
					]
				},
				{
					xtype      : 'radiogroup',
					fieldLabel : 'Status Akad',
					name       : 'status',
					itemId     : 'status',
					layout     : 'column',
					labelAlign : 'left',
					columns    : 3,
					width      : '100%',
					vertical   : true,
					defaults   : { padding : '0 25px 0 0' },
					items      : [
						{boxLabel: 'Sudah Akad Kredit', name: 'Status', inputValue: 1, checked: true},
						{boxLabel: 'Belum Akad Kredit', name: 'Status', inputValue: 2},
						{boxLabel: 'Rencana Akad Kredit', name: 'Status', inputValue: 3}
					]
				},
				{
					xtype      : 'radiogroup',
					fieldLabel : 'Status Lunas',
					name       : 'status_lunas',
					itemId     : 'status_lunas',
					layout     : 'column',
					labelAlign : 'left',
					columns    : 3,
					width      : '100%',
					vertical   : true,
					defaults   : { padding : '0 25px 0 0' },
					items      : [
						{boxLabel: 'ALL', name: 'Is_lunas', inputValue: 2, checked: true},
						{boxLabel: 'Sudah Lunas', name: 'Is_lunas', inputValue: 1},
						{boxLabel: 'Belum Lunas', name: 'Is_lunas', inputValue: 0}
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

