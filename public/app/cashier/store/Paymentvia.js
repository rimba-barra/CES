Ext.define('Cashier.store.Paymentvia', {
    extend: 'Ext.data.Store',
    alias: 'store.paymentviastore',
    requires: [
        'Cashier.model.Paymentvia'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PaymentviaComboStore',
                model: 'Cashier.model.Paymentvia',
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
                        idProperty: 'payment_via_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'paymentvia',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});