Ext.define('Erems.view.bagihasilpilihdata.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.bagihasilpilihdataformsearch',
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
				},
				{
					xtype: 'typecombobox',
					itemId: 'fs_type_id',
					name: 'type_id',
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
                    xtype          : 'projectptcombobox',
                    store          : '',
                    itemId         : 'fs_pt_id',
                    name           : 'pt_id',
                    anchor         : '-15',
                    forceSelection : true,
                    listeners      : {
                        beforequery : function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
			],
			dockedItems: me.generateDockedItems()
		});

		me.callParent(arguments);
	}
});
