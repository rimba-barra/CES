Ext.define('Erems.view.formundanganajb.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.formundanganajbformsearch',
    requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Blockcombobox'
	],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Unit Number',
                    itemId: 'unit_number',
                    name: 'unit_number',
                    anchor:'-15'
                },
                {
                    xtype: 'clustercombobox',
                    itemId: 'fs_cluster_id',
                    name: 'cluster_id',
                    anchor:'-15'

                },
		{
                    xtype: 'blockcombobox',
                    itemId: 'fs_block_id',
                    name: 'block_id',
                    anchor:'-15'

                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
