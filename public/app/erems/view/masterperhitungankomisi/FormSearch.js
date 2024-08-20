Ext.define('Erems.view.masterperhitungankomisi.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.masterperhitungankomisiformsearch',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: me.generateDefaults(),
			items: [
				{
					xtype: 'textfield',
					itemId: 'fsms_pemerima_komisi',
					name: 'judul_perhitungan',
					fieldLabel: 'Judul Perhitungan',
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
