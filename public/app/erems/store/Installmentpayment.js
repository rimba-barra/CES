Ext.define('Erems.store.Installmentpayment', {
    extend: 'Ext.data.Store',
    alias: 'store.installmentpaymentstore',
    requires: [
        'Erems.model.Installmentpayment'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'InstallmentpaymentStore',
                model: 'Erems.model.Installmentpayment',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST'
                    },
                    api: {
                        read: 'erems/installmentpayment/read',
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
                    }
                }
            }, cfg)]);
    }
});