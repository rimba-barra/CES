    Ext.define('Cashier.store.Kasbondeptcomboapplylocal', {
    extend: 'Ext.data.Store',
    alias: 'store.kasbondeptcomboapplylocalstore',
    fields: [
        {name: 'kasbon_payment_id', type: 'int'},
        {name: 'kasbondept_id', type: 'int'},
        {name: 'voucher_date', type: 'string'},
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
        {name: 'made_by_name', type: 'string'}
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'InoutStore',
                data: [],
            }, cfg)]);
    }
});