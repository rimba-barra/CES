Ext.define('Cashier.model.Masterbanktype', {
    extend: 'Ext.data.Model',
    alias: 'model.masterbanktypemodel',
    idProperty: 'banktype_id',
    fields: [
        {name: 'banktype_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'project_name', type: 'string'},
        {name: 'pt_id', type: 'int'},
        {name: 'pt_name', type: 'string'},
        {name: 'banktype', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'addon', type: 'date'},
        {name: 'modion', type: 'date'},
        {name: 'addbyname', type: 'string'},
        {name: 'modibyname', type: 'string'},
        {name: 'hideparam', type: 'string'},
    ]
});