Ext.define('Erems.view.historysuratperingatan.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.historysuratperingatanformsearch',
    requires: [
        'Erems.library.template.component.Clustercombobox',
        'Erems.library.template.component.Blockcombobox'
    ],
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Unit Number',
                    itemId: 'fs_unit_number',
                    name: 'unit_number',
                    anchor: '-15'
                },
                {
                    xtype: 'clustercombobox',
                    itemId: 'fs_cluster_id',
                    name: 'cluster_id',
                    anchor: '-15',
                    enableKeyEvents: true,
                },
                {
                    xtype      : 'xnamefieldEST',
                    fieldLabel : 'Customer Name',
                    itemId     : 'fs_berkas',
                    name       : 'customer_name',
                    anchor     : '-15'
                },

            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
