Ext.define('Cashier.library.template.combobox.ClusterV2combobox', {
    extend: 'Cashier.library.component.Combobox', 
    alias: 'widget.clusterV2combobox',
    store: 'ClusterV2', //masuk dalam store
    dynamicdata: 0, //jika 1 maka store tidak akan di load otomatis sebaliknya jika 0 akan di load otomatis ketika from render
    fieldLabel: 'Cluster',
    displayField: 'cluster', //mengambil data dari store
    valueField: 'cluster_id', //mengambil data dari store  
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }
})


