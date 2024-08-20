Ext.define('Erems.view.bagihasilproses.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.bagihasilprosesformsearch',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: me.generateDefaults(),
			items: [
				{
					xtype: 'textfield',
					fieldLabel: 'Unit Number',
					itemId: 'unit_number',
					name: 'unit_number'
				},
				{
					xtype      : 'xnamefieldEST',
					fieldLabel : 'Customer Name',
					itemId     : 'customer_name',
					name       : 'customer_name'
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
				}
			],
			dockedItems: me.generateDockedItems()
		});

		me.callParent(arguments);
	}
});
