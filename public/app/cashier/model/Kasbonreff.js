Ext.define('Cashier.model.Kasbonreff', {
    extend    : 'Ext.data.Model',
    alias     : 'model.kasbonreffmodel',
    idProperty: 'kasbondept_id',
    fields    : [
        {name: 'kasbondept_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'voucher_no', type: 'string'},
        {name: 'amount', type: 'string'},
        {name: 'remainingkasbon', type: 'string'},
    ]
});