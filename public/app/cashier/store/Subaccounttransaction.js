Ext.define('Cashier.store.Subaccounttransaction', {
    extend: 'Ext.data.Store',
    alias: 'store.subaccounttransactionstore',
    requires: [
        'Cashier.model.Subaccounttransaction'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SubaccounttransactionStore',
                model: 'Cashier.model.Subaccounttransaction',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/subaccounttransaction/read',
                        create: 'cashier/subaccounttransaction/create',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'sub_coa_id',
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