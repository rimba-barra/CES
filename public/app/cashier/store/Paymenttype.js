    Ext.define('Cashier.store.Paymenttype', {
    extend: 'Ext.data.Store',
    alias: 'store.paymenttypestore',
    fields: [
        {name: 'paymenttype', type: 'string'},
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PaymenttypeStore',
                data: [
                    {"paymenttype": 'Payment'},
                    {"paymenttype": 'Amortization'},
                  
                ],
            }, cfg)]);
    }
});