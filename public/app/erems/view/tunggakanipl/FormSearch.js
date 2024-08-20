Ext.define('Erems.view.tunggakanipl.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.tunggakaniplformsearch',
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Unitcombobox'
	],
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: me.generateDefaults(),
			items: [
				{
					xtype: 'textfield',
					fieldLabel: 'Unit Number',
					itemId: 'unit_number',
					name: 'unit_number',
					anchor: '-15'
				},
				{
					xtype: 'clustercombobox',
					itemId: 'fs_cluster_id',
					name: 'cluster_id',
					anchor: '-15'

				},
				{
					xtype: 'blockcombobox',
					itemId: 'fs_block_id',
					name: 'block_id',
					anchor: '-15'

				},
				{
					xtype: 'unitcombobox',
					itemId: 'fs_unit_id',
					name: 'unit_id',
					anchor: '-15',
					hidden: true

				},

				{
					xtype      : 'xnamefieldEST',
					fieldLabel : 'Customer Name',
					itemId     : 'customer_name',
					name       : 'customer_name',
					anchor     : '-15'
				},
			],
			dockedItems: me.generateDockedItems()
		});

		me.callParent(arguments);
	}
});
