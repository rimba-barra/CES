Ext.define('Erems.store.Nonlinkpayment', {
    extend: 'Ext.data.Store',
    alias: 'store.nonlinkpaymentstore',
    requires: [
        'Erems.model.Nonlinkpayment'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'NonlinkpaymentStore',
                model: 'Erems.model.Nonlinkpayment',
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
                        paymentflag:3
                    }
                }
            }, cfg)]);
    }
});