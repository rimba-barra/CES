Ext.define('Cashier.store.TPaymentcoadetail', {
    extend: 'Ext.data.Store',
    alias: 'store.tpaymentcoadetailstore',
    requires: [
        'Cashier.model.TPaymentcoadetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TPaymentcoadetailStore',
                model: 'Cashier.model.TPaymentcoadetail',
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
                        read: 'cashier/tbank/coadetailread',
                        create: 'cashier/tbank/coadetailcreate',
                        update: 'cashier/tbank/coadetailupdate',
                        destroy: 'cashier/tbank/coadetaildelete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'kasbankdetail_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'coadetail'
                    }
                }
            }, cfg)]);
    }
});