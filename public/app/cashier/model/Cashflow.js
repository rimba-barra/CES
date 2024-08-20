Ext.define('Cashier.model.Cashflow', {
    extend: 'Ext.data.Model',
    alias: 'model.cashflowmodel',
    idProperty: 'setupcashflow_id',
    fields: [
        {name: 'setupcashflow_id', type: 'int'},
        {name: 'cashflowtype_id', type: 'int'},
        {name: 'cashflowtype', type: 'string'},
        {name: 'coa_id', type: 'int'}
    ]
});