Ext.define('Cashier.model.Coasubeditorcombobox', {
    extend: 'Ext.data.Model',
    alias: 'model.coasubeditorcomboboxmodel',
    idProperty: 'coa_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'coa_id', type: 'int'},       
        {name: 'coa', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'coacode', type: 'string'},
        {name: 'kelsub_id', type: 'int'},
    ]
});