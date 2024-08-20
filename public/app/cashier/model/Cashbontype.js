Ext.define('Cashier.model.Cashbontype', {
    extend: 'Ext.data.Model',
    alias: 'model.cashbontypemodel',
    idProperty: 'tipekasbondept_id',
    fields: [
        {name: 'tipekasbondept_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'grouptipekasbondept_id', type: 'int'},
        {name: 'tipekasbondept', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});