Ext.define('Cashier.store.TPaymentvendor', {
    extend: 'Ext.data.Store',
    alias: 'store.tpaymentvendorstore',
    requires: [
        'Cashier.model.TPaymentvendor'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TPaymentvendorStore',
                model: 'Cashier.model.TPaymentvendor',
                proxy: {
                    type: 'ajax',
                    timeout:45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/tbank/vendorread',
                        create: 'cashier/payment/create',
                        update: 'cashier/payment/update',
                        destroy: 'cashier/payment/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'kasbank_vendor_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'vendor'
                    }
                }
            }, cfg)]);
    }
});