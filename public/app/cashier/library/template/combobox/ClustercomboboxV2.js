Ext.define('Cashier.library.template.combobox.ClustercomboboxV2', {
    extend       : 'Cashier.library.component.Combobox',
    alias        : 'widget.clustercomboboxv2',
    store        : 'Clustercombo',
    dynamicdata  : 0,
    fieldLabel   : 'Cluster',
    displayField : 'cluster',
    valueField   : 'cluster_id',
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
})