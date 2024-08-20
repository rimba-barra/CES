Ext.define('Erems.view.permintaankomisi.browse.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.permintaankomisibrowseformsearch',
	requires: [
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Clustercombobox',
	],
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: me.generateDefaults(),
			items: [
				{
					xtype: 'textfield',
					itemId: 'fs_unit_number',
					name: 'unit_id',
					fieldLabel: 'Unit Number',
					enforceMaxLength: true,
					maskRe: /[^\`\"\']/,
					//maxLength: 5,
					anchor: '-100'
				},
				{
					xtype: 'hiddenfield',
					itemId: 'fs_param_spcreq',
					name: 'param_spcreq',
					fieldLabel: 'Spc Req',
					enforceMaxLength: true,
					maskRe: /[^\`\"\']/,
					maxLength: 5,
					anchor: '-170'
				},
				{
					xtype      : 'xnamefieldEST',
					itemId     : 'fs_customer_name',
					name       : 'customer_name',
					fieldLabel : 'Customer Name',
					anchor     : '-100'
				},
			],
			dockedItems: me.generateDockedItems()
		});

		me.callParent(arguments);
	}
});