Ext.define('Cashier.model.Cluster', {
    extend: 'Ext.data.Model',
    alias: 'model.clustermodel',
    idProperty: 'cluster_id',
    fields: [
        {name: 'cluster_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'code', type: 'string'},
        {name: 'cluster', type: 'string'},
        {name: 'description', type: 'string'},
    ]
});