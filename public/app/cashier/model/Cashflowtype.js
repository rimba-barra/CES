Ext.define('Cashier.model.Cashflowtype', {
    extend: 'Ext.data.Model',
    alias: 'model.cashflowtypemodel',
    idProperty: 'cashflowtype_id',
    fields: [
        {name: 'cashflowtype_id', type: 'int'},
        {name: 'grouptype_id', type: 'int'},
        {name: 'cashflowtype_ids', type: 'string'},
        {name: 'grouptype', type: 'string'},
        {name: 'cashflowtype', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'dataflow', type: 'string'},
        {name: 'sort', type: 'int'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});