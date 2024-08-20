Ext.define('Cashier.view.revenuesharingprint.FormSearch', {
    extend       : 'Cashier.library.template.view.FormSearch',
    alias        : 'widget.revenuesharingprintformsearch',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items   : [
                {
                    xtype: 'hiddenfield',
                    name : 'hideparam',
                    value: 'default'
                },
                {
                    xtype     : 'textfield',
                    fieldLabel: 'Unit Number',
                    itemId    : 'unit_number',
                    name      : 'unit_number',
                    anchor    : '-15'
                },
                {
                    xtype : 'clustercombobox',
                    itemId: 'fs_cluster_id',
                    name  : 'cluster_id',
                    anchor: '-15'

                },
                {
                    xtype : 'blockcombobox',
                    itemId: 'fs_block_id',
                    name  : 'block_id',
                    anchor: '-15'

                },
                {
                    xtype     : 'textfield',
                    itemId    : 'customer_name',
                    name      : 'customer_name',
                    fieldLabel: 'Customer name',
                    anchor    : '-15'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});