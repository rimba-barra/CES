Ext.define('Cashier.model.Kartupiutangacc', {
    extend: 'Ext.data.Model',
    alias: 'model.kartupiutangaccmodel',
    idProperty: 'subgl_id',
    fields: [
        {name: 'purchaseletter_id', type: 'int'},
        {name: 'cluster', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'customer_name', type: 'string'},
        {name: 'purchaseletter_no', type: 'string'},
        {name: 'purchase_date', type: 'string'},
        {name: 'project_name', type: 'string'},
        {name: 'pt_name', type: 'string'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'cluster_id', type: 'int'},
    ]
});