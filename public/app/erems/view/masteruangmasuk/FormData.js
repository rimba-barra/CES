Ext.define('Erems.view.masteruangmasuk.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.masteruangmasukformdata',
	frame: true,
	autoScroll: true,
	anchorSize: 100,
	bodyBorder: true,
	bodyPadding: 10,
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: {
				labelAlign: 'top',
				labelSeparator: ' ',
				labelClsExtra: 'small',
				fieldStyle: 'margin-bottom:3px;',
				anchor: '100%'
			},
			items: [{
					xtype: 'hiddenfield',
					itemId: 'fdms_id',
					name: 'cashsources_id'
				},
				{
					xtype: 'textfield',
					itemId: 'fdms_code',
					name: 'code',
					fieldLabel: 'Code',
					allowBlank: false,
					enforceMaxLength: true,
					maskRe: /[A-Za-z0-9\s.]/,
					maxLength: 5,
					anchor: '-400'
				},
				{
					xtype: 'textfield',
					itemId: 'fdms_side',
					name: 'cashsources',
					fieldLabel: 'Cash Source',
					allowBlank: false,
					enforceMaxLength: true,
					maskRe: /[A-Za-z0-9\s.]/,
					minLength: 2,
					maxLength: 50,
					anchor: '-5'
				},
				{
					xtype      : 'xnotefieldEST',
					height     : 60,
					itemId     : 'fdms_description',
					name       : 'description',
					fieldLabel : 'Description',
					anchor     : '-5'
				}],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	}
});