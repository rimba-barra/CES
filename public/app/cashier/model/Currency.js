Ext.define('Cashier.model.Currency', {
    extend: 'Ext.data.Model',
    alias: 'model.currencymodel',
    idProperty: 'currency_id',
    fields: [
        {name: 'currency_id', type: 'int'},
        {name: 'currency_name', type: 'string'},
        {name: 'currency_country', type: 'string'},
        {name: 'currency_symbol', type: 'string'},
        {name: 'currency_symbol_1', type: 'string'},
        {name: 'currency_word', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});