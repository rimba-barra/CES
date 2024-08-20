Ext.define('Erems.store.Paymentmethod', {
    extend: 'Ext.data.Store',
    alias: 'store.paymentmethodstore',
    requires: [
        'Erems.model.Paymentmethod'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PaymentmethodStore',
                model: 'Erems.model.Paymentmethod',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/paymentmethod/read',
                        create: 'erems/paymentmethod/create',
                        update: 'erems/paymentmethod/update',
                        destroy: 'erems/paymentmethod/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'paymentmethod_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    }
                }
            }, cfg)]);
    }
});