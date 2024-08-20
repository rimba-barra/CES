Ext.define('Erems.view.masterpencairankomisi.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.masterpencairankomisiformsearch',
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
					itemId: 'fsms_pemerima_komisi',
					name: 'judul_komisi',
					fieldLabel: 'Judul Komisi',
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
