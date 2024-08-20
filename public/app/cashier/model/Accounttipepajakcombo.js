Ext.define('Cashier.model.Accounttipepajakcombo', {
    extend: 'Ext.data.Model',
    alias: 'model.accounttipepajakcombomodel',
    idProperty: 'coa_id',
    fields: [
        {name: 'coa_id', type: 'int'},
        {name: 'tipepajakdetail', type: 'string'},
        {name: 'coa', type: 'string'},
        {name: 'kelsub', type: 'string'},
        {name: 'persentase', type: 'string'}
    ]
});