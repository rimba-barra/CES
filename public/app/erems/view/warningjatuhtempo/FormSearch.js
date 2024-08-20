Ext.define('Erems.view.warningjatuhtempo.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.warningjatuhtempoformsearch',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: me.generateDefaults(),
			items: [
				{
					xtype: 'textfield',
					fieldLabel: 'Unit Number',
					itemId: 'unit_number',
					name: 'unit_number',
					anchor: '-15'
				},
				{
					xtype: 'clustercombobox',
					itemId: 'fs_cluster_id',
					name: 'cluster_id',
					anchor: '-15'

				},
				{
					xtype: 'blockcombobox',
					itemId: 'fs_block_id',
					name: 'block_id',
					anchor: '-15'

				},
				{
					xtype      : 'xnamefieldEST',
					itemId     : 'customer_name',
					name       : 'customer_name',
					fieldLabel : 'Customer name',
					anchor     : '-15'
				},
				{
					xtype: 'panel',
					height: 48,
					bodyStyle: 'background:none;border:0;',
					anchor: '-15',
					layout: {
						type: 'column'
					},
					items: [
						{
							xtype: 'datefield',
							itemId: 'purchase_startdate',
							name: 'purchase_startdate',
							fieldLabel: 'Purchase date',
							labelSeparator: '',
							width: 100,
							labelAlign: 'top',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
						{
							xtype: 'label',
							margin: '23px 5px 0 5px',
							styleHtmlContent: false,
							width: 10,
							text: 'to'
						},
						{
							xtype: 'datefield',
							itemId: 'purchase_enddate',
							name: 'purchase_enddate',
							fieldLabel: '&nbsp;',
							labelSeparator: '',
							width: 100,
							labelAlign: 'top',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
					]
				},
				// {
				//                 xtype: 'textfield',
				//                 itemId: 'today_plus',
				//                 name: 'today_plus',
				// 	fieldLabel: 'Due Date From Today +',
				//                 anchor:'-15',
				// 	maskRe: /[0-9\.]/
				//             },
				{
					xtype: 'checkboxfield',
					itemId: 'is_responnote',
					margin: '15 0 0 0',
					name: 'is_responnote',
					boxLabel: 'Not yet feedback',
					inputValue: '1',
					uncheckedValue: '0',
					checked: true
				}
			],
			dockedItems: me.generateDockedItems()
		});

		me.callParent(arguments);
	}
});