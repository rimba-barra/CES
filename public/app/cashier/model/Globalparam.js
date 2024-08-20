Ext.define('Cashier.model.Globalparam', {
    extend: 'Ext.data.Model',
    alias: 'model.globalparammodel',
    idProperty: 'param_id',
    fields: [
        {name: 'param_id', type: 'int'},
        {name: 'name', type: 'string'},
        {name: 'value', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});