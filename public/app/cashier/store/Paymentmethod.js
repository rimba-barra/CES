Ext.define('Cashier.store.Paymentmethod', {
    extend: 'Ext.data.Store',
    alias: 'store.paymentmethodstore',
    requires: [
        'Cashier.model.Paymentmethod'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PaymentmethodComboStore',
                model: 'Cashier.model.Paymentmethod',
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
                        read: 'cashier/common/read',
                        create: 'cashier/common/create',
                        update: 'cashier/common/update',
                        destroy: 'cashier/common/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'paymentmethod_id',
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getpaymentmethod',
                        start: 0,
                        limit: 1000,
                        dataflow: 'O'
                    }
                }
            }, cfg)]);
    }
});