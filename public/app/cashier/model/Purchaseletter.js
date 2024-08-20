Ext.define('Cashier.model.Purchaseletter', {
    extend: 'Ext.data.Model',
    alias: 'model.purchaselettermodel',
    idProperty: 'purchaseletter_id',
    fields: [
        {name: 'purchaseletter_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'unit_id', type: 'int'},
        {name: 'unit_no', type: 'string'},
        {name: 'purchaseletter_no', type: 'string'},
        {name: 'cluster', type: 'string'},
        {name: 'price', type: 'string'},
        {name: 'customer_name', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});