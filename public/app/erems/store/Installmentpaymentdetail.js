Ext.define('Erems.store.Installmentpaymentdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.installmentpaymentdetailstore',
    requires: [
        'Erems.model.Installmentpaymentpost'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'InstallmentpaymentdetailStore',
                model: 'Erems.model.Installmentpaymentpost',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/installmentpayment/read',
                        create: 'erems/installmentpayment/create',
                        update: 'erems/installmentpayment/update'
                        
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