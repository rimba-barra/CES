Ext.define('Cashier.model.Accountnumber', {
    extend: 'Ext.data.Model',
    alias: 'model.accountnumbermodel',
    idProperty: 'no_acc',
    fields: [
        {name: 'voucherprefix_id', type: 'int'},       
        {name: 'no_acc', type: 'string'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'hideparam', type: 'string'},
    ]
});