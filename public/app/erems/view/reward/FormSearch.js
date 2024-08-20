Ext.define('Erems.view.reward.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.rewardformsearch',
	requires: [
		'Erems.library.template.component.Clustercombobox'
	],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'unit_number',
                    name: 'unit_number',
                    fieldLabel: 'Unit Number',
                    anchor:'-15'
                },
                {
                    xtype: 'clustercombobox',
                    itemId: 'fs_cluster_id',
                    name: 'cluster_id',
                    anchor:'-15'

                },
				{
                    xtype: 'textfield',
                    itemId: 'purchaseletter_no',
                    name: 'purchaseletter_no',
					fieldLabel: 'Purchaseletter No',
                    anchor:'-15'
                },
				{
					xtype      : 'xnamefieldEST',
					itemId     : 'customer_name',
					name       : 'customer_name',
					fieldLabel : 'Customer Name',
					anchor     :'-15'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});