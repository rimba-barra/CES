Ext.define('Cashier.model.Cashflowsetupcombobox', {
    extend: 'Ext.data.Model',
    alias: 'model.cashflowsetupcomboboxmodel',
    idProperty: 'setupcashflowdetail_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'setupcashflowdetail_id', type: 'int'},       
        {name: 'cashflowtype', type: 'string'},
        {name: 'cashflowtype_id', type: 'int'},
        {name: 'cashflowtype_id_real', type: 'int'},
    ]
});