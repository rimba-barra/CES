Ext.define('Erems.view.followup.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.followupformsearch',
	initComponent: function () {
		var me = this;

		var cbf = new Erems.template.ComboBoxFields();

		Ext.applyIf(me, {
			defaults: me.generateDefaults(),
			items: [
				{
					xtype: 'textfield',
					name: 'unit_number',
					fieldLabel: 'Unit Number'
				},
				{
					xtype: 'textfield',
					name: 'purchaseletter_no',
					fieldLabel: 'Purchaseletter Number'
				},
				{
					xtype      : 'xnamefieldEST',
					name       : 'customer_name',
					fieldLabel : 'Customer Name'
				},
				{
					xtype: 'clustercombobox',
					itemId: 'fs_cluster_id',
					name: 'cluster_id',
					anchor: '-15',
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
