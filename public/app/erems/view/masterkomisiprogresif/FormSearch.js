Ext.define('Erems.view.masterkomisiprogresif.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.masterkomisiprogresifformsearch',
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
					itemId: 'fsms_tahun',
					name: 'tahun',
					fieldLabel: 'Tahun',
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
