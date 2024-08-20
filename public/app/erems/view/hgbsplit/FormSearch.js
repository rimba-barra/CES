Ext.define('Erems.view.hgbsplit.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.hgbsplitformsearch',
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
					xtype: 'checkboxfield',
					fieldLabel: 'Show Gabungan (Surabaya)',
					name: 'is_gabungan',
					checked: false,
					inputValue: '1',
					uncheckedValue: '0',
					margin: '0 5px 0 0',
					hidden: true,
					width: 20
				},
				{
					xtype: 'hiddenfield',
					itemId: 'view_grid_param',
					name: 'view_grid_param',
					value: 'all'
				}

			],
			dockedItems: me.generateDockedItems()
		});

		me.callParent(arguments);
	}
});