Ext.define('Erems.view.masterdistchannel.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.masterdistchannelformsearch',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: me.generateDefaults(),
			items: [
				{
					xtype: 'textfield',
					itemId: 'fsms_code',
					name: 'code',
					fieldLabel: 'Code',
					enforceMaxLength: true,
					maskRe: /[^\`"\']/,
					maxLength: 50
				},
				{
					xtype: 'textfield',
					itemId: 'fsms_dist_channel',
					name: 'distributionchannel',
					fieldLabel: 'Distribution Channel',
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
