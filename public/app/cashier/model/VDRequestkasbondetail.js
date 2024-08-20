Ext.define('Cashier.model.VDRequestkasbondetail', {
    extend: 'Ext.data.Model',
    alias: 'model.vdrequestkasbondetailmodel',
    idProperty: 'kasbon_payment_id',
    fields: [
        {name: 'kasbon_payment_id', type: 'int'},
        {name: 'kasbondept_id', type: 'int'},
        {name: 'voucher_date', type: 'string'},
        {name: 'kasbon_date', type: 'string'},
        {name: 'cashbon_no', type: 'string'},
        {name: 'voucher_no', type: 'string'},
        {name: 'amount', type: 'string'},
        {name: 'remaining_amount', type: 'string'},
        {name: 'pay_amount', type: 'string'},
        {name: 'final_amount', type: 'string'},
        {name: 'remainingkasbon', type: 'string'},
        {name: 'remarks', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
        {name: 'statedata', type: 'string'},
        {name: 'is_multi_kasbon', type: 'boolean'},
        {name: 'made_by_name', type: 'string'}
    ]
});