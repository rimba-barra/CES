Ext.define('Cashier.store.Installmentpaymentdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.installmentpaymentdetailstore',
    requires: [
        'Cashier.model.Installmentpaymentpost'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'InstallmentpaymentdetailStore',
                model: 'Cashier.model.Installmentpaymentpost',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/installmentpayment/read',
                        create: 'cashier/installmentpayment/create',
                        update: 'cashier/installmentpayment/update'
                        
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