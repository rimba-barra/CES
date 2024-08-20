Ext.define('Cashier.model.ClusterV2', {
    extend: 'Ext.data.Model',
    alias: 'model.clusterV2model',
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