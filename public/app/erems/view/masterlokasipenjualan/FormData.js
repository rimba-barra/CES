Ext.define('Erems.view.masterlokasipenjualan.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.masterlokasipenjualanformdata',
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
					name: 'saleslocation_id'
				},
				{
					xtype: 'textfield',
					itemId: 'fdms_code',
					name: 'code',
					fieldLabel: 'Code',
					allowBlank: false,
					enforceMaxLength: true,
					maskRe: /[^\`\"\']/,
					maxLength: 5,
					anchor: '-400'
				},
				{
					xtype: 'textfield',
					itemId: 'fdms_side',
					name: 'saleslocation',
					fieldLabel: 'Sale location',
					allowBlank: false,
					enforceMaxLength: true,
					maskRe: /[^\`\"\']/,
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