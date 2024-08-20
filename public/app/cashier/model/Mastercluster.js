Ext.define('Cashier.model.Mastercluster', {
    extend: 'Ext.data.Model',
    alias: 'model.masterclustermodel',
    idProperty: 'cluster_id',
    fields: [
        {name: 'cluster_id', type: 'int'},
        {name: 'cluster', type: 'string'},
    ]
});