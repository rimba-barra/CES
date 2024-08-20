Ext.define('Cashier.store.Tloanpayment', {
    extend: 'Ext.data.Store',
    alias: 'store.tloanpaymentstore',
    requires: [
        'Cashier.model.Tloanpayment'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TloanpaymentStore',
                model: 'Cashier.model.Tloanpayment',
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
                        read: 'cashier/tloan/detailread',
                        create: 'cashier/tloan/detailcreate',
                        update: 'cashier/tloan/detailupdate',
                        destroy: 'cashier/tloan/detaildelete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'loanpayment_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default'
                    }
                }
            }, cfg)]);
    }
});