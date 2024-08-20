Ext.define('Cashier.model.Masterbankrate', {
    extend: 'Ext.data.Model',
    alias: 'model.masterbankratemodel',
    idProperty: 'bank_rate_id',
    fields: [
        {name: 'hideparam', type: 'string'},
        {name: 'bank_rate_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'pt_name', type: 'string'},
        {name: 'project_name', type: 'string'},
        {name: 'projectpt_name', type: 'string'},
        {name: 'voucherprefix_id', type: 'int'},
        {name: 'coaname', type: 'string'},
        {name: 'rate', type: 'string'},
        {name: 'deletefield', type: 'string'},
        {name: 'date_from', type: 'date', format: 'd M Y'},
        {name: 'date_until', type: 'date', format: 'd M Y'},
        {name: 'subgl_id', type: 'int'},
        {name: 'subgl_name', type: 'string'},
    ]
});