Ext.define('Cashier.model.Signature', {
    extend: 'Ext.data.Model',
    alias: 'model.signaturemodel',
    idProperty: 'signature_id',
    fields: [
        {name: 'signature_id', type: 'int'},       
        {name: 'signature_name', type: 'string'},
        {name: 'position', type: 'string'}, 
        {name: 'max_range', type: 'number'},
        {name: 'signature_note', type: 'string'},    
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});