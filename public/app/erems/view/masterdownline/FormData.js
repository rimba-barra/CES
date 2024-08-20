Ext.define('Erems.view.masterdownline.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.masterdownlineformdata',
	autoScroll: true,
	anchorSize: 100,
	//height: 600,
	bodyBorder: true,
	bodyPadding: 10,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: {
				//labelAlign: 'top',
				labelSeparator: ' ',
				labelClsExtra: 'small',
				fieldStyle: 'margin-bottom:3px;',
				anchor: '100%'
			},
			items: [
				{
					xtype: 'hiddenfield',
					itemId: 'downline_id',
					name: 'downline_id'
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Code',
					itemId: 'code',
					name: 'code',
					allowBlank: false
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Name',
					itemId: 'name',
					name: 'name',
					allowBlank: false
				},
				{
					xtype      : 'xaddressfieldEST',
					fieldLabel : 'Address',
					itemId     : 'address',
					name       : 'address'
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Rekening',
					itemId: 'rekening',
					name: 'rekening',
					maskRe: /[A-Za-z0-9\s.]/
				},
				{
					xtype      : 'xphonenumberfieldEST',
					fieldLabel : 'Phone Num.',
					itemId     : 'phone',
					name       : 'phone'
				},
				{
					xtype: 'dfdatefield',
					fieldLabel: 'Reg. Date',
					itemId: 'registration_date',
					name: 'registration_date'
				},
				{
					xtype: 'checkboxfield',
					fieldLabel: 'Broker ?',
					name: 'is_broker',
					inputValue: '1',
					uncheckedValue: '0'
				}
			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	}
});

