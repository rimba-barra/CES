Ext.define('Cashier.model.Generatefile', {
    extend: 'Ext.data.Model',
    alias: 'model.generatefilemodel',
    idProperty: 'generate_id',
    fields: [
        {name: 'generate_id', type: 'int'},
        {name: 'appsname', type: 'string'},
        {name: 'appsdb', type: 'string'},
        {name: 'appstable', type: 'string'},
        {name: 'appstablekey', type: 'string'},
        {name: 'module', type: 'string'},
        {name: 'store', type: 'string'},
        {name: 'grid', type: 'string'},
        {name: 'hideparam', type: 'string'},
    ]
});