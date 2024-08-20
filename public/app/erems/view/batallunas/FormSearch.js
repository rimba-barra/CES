Ext.define('Erems.view.batallunas.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.batallunasformsearch',
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
					anchor: '-15',
					forceSelection: true,
					listeners: {
						beforequery: function (record) {
							record.query = new RegExp(record.query, 'i');
							record.forceAll = true;
						}
					}
				},
				{
					xtype: 'blockcombobox',
					itemId: 'fs_block_id',
					name: 'block_id',
					anchor: '-15',
					forceSelection: true,
					listeners: {
						beforequery: function (record) {
							record.query = new RegExp(record.query, 'i');
							record.forceAll = true;
						}
					}
				}

			],
			dockedItems: me.generateDockedItems()
		});

		me.callParent(arguments);
	}
});