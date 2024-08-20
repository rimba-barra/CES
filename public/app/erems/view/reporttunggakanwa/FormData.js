Ext.define('Erems.view.reporttunggakanwa.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.reporttunggakanwaformdata',
	frame: true,
	autoScroll: true,
	bodyBorder: true,
	width: 400,
	height: 125,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			dockedItems : me.generateDockedItems(),
			items       : [
				{
					xtype    : 'container',
					layout   : 'hbox',
					margin   : '0 0 5px 0',
					defaults : {margin : '0 20px 0 0'},
					items    : [
						{
							xtype          : 'datefield',
							itemId         : 'periode',
							name           : 'periode',
							fieldLabel     : 'Process Date',
							labelSeparator : '',
							value          : new Date(),
							editable       : false,
							format         : 'd-m-Y',
							altFormats     : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat   : 'Y-m-d H:i:s.u'
						},
					]
				},
				{
					xtype    : 'container',
					layout   : 'hbox',
					margin   : '0 0 5px 0',
					defaults : {margin : '0 20px 0 0'},
					items    : [
						{
							xtype      : 'radiogroup',
							width      : 300,
							fieldLabel : 'Format Type',
							name       : 'radiogroup_laporantype',
							items      : [
								{
									xtype      : 'radiofield',
									boxLabel   : 'Aging',
									name       : 'format_type',
									inputValue : '1',
									itemId     : 'aging',
									checked    : true
								},
								{
									xtype      : 'radiofield',
									boxLabel   : 'Non Aging',
									name       : 'format_type',
									inputValue : '2', 
									itemId     : 'nonaging'
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

