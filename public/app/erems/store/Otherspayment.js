Ext.define('Erems.store.Otherspayment', {
    extend: 'Ext.data.Store',
    alias: 'store.otherspaymentstore',
    requires: [
        'Erems.model.Otherspayment'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'OtherspaymentStore',
                model: 'Erems.model.Otherspayment',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/otherspayment/read',
                        destroy: 'erems/installmentpayment/delete'
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
                    },
                    extraParams: {
                        paymentflag:2
                    }
                }
            }, cfg)]);
    }
});