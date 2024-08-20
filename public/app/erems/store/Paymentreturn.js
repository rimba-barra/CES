Ext.define('Erems.store.Paymentreturn', {
    extend: 'Ext.data.Store',
    alias: 'store.paymentreturnstore',
    requires: [
        'Erems.model.Paymentreturn'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PaymentreturnStore',
                model: 'Erems.model.Paymentreturn',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/paymentreturn/read',
                        create: 'erems/paymentreturn/create',
                        update: 'erems/paymentreturn/update',
                        destroy: 'erems/paymentreturn/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'paymentreturn_id',
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