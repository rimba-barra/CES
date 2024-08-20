Ext.define('Erems.view.mastersiteplanlegend.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.mastersiteplanlegendformsearch',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: me.generateDefaults(),
			items: [
				{
					xtype: 'textfield',
					itemId: 'fsms_code',
					name: 'code',
					fieldLabel: 'Kode',
					enforceMaxLength: true,
					maskRe: /[^\`"\']/,
					maxLength: 50
				},
				{
					xtype: 'textfield',
					itemId: 'fsms_name',
					name: 'name',
					fieldLabel: 'Nama',
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
