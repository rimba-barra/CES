Ext.define('Cashier.model.Automailtype', {
    extend: 'Ext.data.Model',
    alias: 'model.automailtypemodel',
    idProperty: 'type_id',
    fields: [
        {name: 'type_id', type: 'int'},
        {name: 'type_code', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
         {name: 'active', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});