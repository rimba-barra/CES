Ext.define('Erems.library.template.component.ClusterByUnitcombobox', {
    extend: 'Erems.library.component.Combobox',
    queryMode: 'local',
    alias: 'widget.clusterbyunitcombobox',
    store: 'MasterpricelistCluster',
    fieldLabel: 'Cluster',
    displayField: 'cluster',
    valueField: 'cluster_id',
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
    }
})