Ext.define('Cashier.model.Kodeprefix', {
    extend: 'Ext.data.Model',
    alias: 'model.kodeprefixmodel',
    idProperty: 'prefix_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'prefix_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'prefix', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'is_cashflow', type: 'boolean'},
        {name: 'cashflow', type: 'string'},
        {name: 'is_cashier', type: 'boolean'},
        {name: 'cashier', type: 'string'},
        {name: 'openmonth', type: 'int'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
    ]
});