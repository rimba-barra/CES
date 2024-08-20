Ext.define('Cashier.model.Schemaescrow', {
    extend: 'Ext.data.Model',
    alias: 'model.schemaescrowmodel',
    idProperty: 'purchaseletter_id',
    fields: [
        {name: 'purchaseletter_id', type: 'int'},
        {name: 'projectpt_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'pt_name', type: 'string'},
        {name: 'project_name', type: 'string'},
        {name: 'unit_number', type: 'string'},
        {name: 'cluster_name', type: 'string'},
        {name: 'customer_name', type: 'string'},
        {name: 'kpr_value_approve', type: 'money'},
        {name: 'purchaseletter_no', type: 'string'},
        {name: 'unit_id', type: 'string'},
        {name: 'akad_realisasiondate', type: 'date',  dateFormat: 'Y-m-d H:i:s.u'},
    ]
});