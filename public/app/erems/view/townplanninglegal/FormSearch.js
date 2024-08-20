Ext.define('Erems.view.townplanninglegal.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.townplanninglegalformsearch',
    requires: ['Erems.template.ComboBoxFields'],
    initComponent: function() {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    fieldLabel:'Unit Number',
                    xtype: 'textfield',
                    name: 'unit_number'
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Cluster / Tower',
                    displayField: cbf.cluster.d,
                    valueField: cbf.cluster.v,
                    name: 'cluster_cluster_id'

                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Block',
                    displayField: cbf.block.d,
                    valueField: cbf.block.v,
                    name: 'block_block_id'

                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Unit Status',
                    displayField: cbf.unitstatus.d,
                    valueField: cbf.unitstatus.v,
                    name: 'unitstatus_unitstatus_id'

                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
