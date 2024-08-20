Ext.define('Erems.view.townplanning.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.townplanningformsearch',
    requires: ['Erems.template.ComboBoxFields'],
    initComponent: function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    fieldLabel: 'Unit Number',
                    xtype: 'textfield',
                    name: 'unit_number',
                    enableKeyEvents: true,
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'Cluster / Tower',
                    displayField: cbf.cluster.d,
                    valueField: cbf.cluster.v,
                    name: 'cluster_cluster_id',
                    typeAhead: true,
                    queryMode: 'local',
                    lastQuery: '',
                    anchor: '-5',
                    listeners: {
                        beforequery: function (record) {
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
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

                },
                {
                    fieldLabel: 'VA BCA',
                    xtype: 'textfield',
                    name: 'virtualaccount_bca',
                    enableKeyEvents: true,
                },
                {
                    fieldLabel: 'VA Mandiri',
                    xtype: 'textfield',
                    name: 'virtualaccount_mandiri',
                    enableKeyEvents: true,
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
