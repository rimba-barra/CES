Ext.define('Erems.view.masterim.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.masterimformsearch',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: me.generateDefaults(),
			items: [
				{
					xtype: 'textfield',
					itemId: 'fsms_nomor_im',
					name: 'nomor_im',
					fieldLabel: 'Nomor IM',
					enforceMaxLength: true,
					maskRe: /[^\`"\']/,
					maxLength: 50
				},
			],
			dockedItems: me.generateDockedItems()
		});

		me.callParent(arguments);
	}
});
