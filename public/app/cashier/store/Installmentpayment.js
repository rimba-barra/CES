Ext.define('Cashier.store.Installmentpayment', {
    extend: 'Ext.data.Store',
    alias: 'store.installmentpaymentstore',
    requires: [
        'Cashier.model.Installmentpayment'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'InstallmentpaymentStore',
                model: 'Cashier.model.Installmentpayment',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST'
                    },
                    api: {
                        read: 'cashier/installmentpayment/read',
                        destroy: 'cashier/installmentpayment/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'payment_id',
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