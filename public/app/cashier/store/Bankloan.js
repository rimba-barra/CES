Ext.define('Cashier.store.Bankloan', {
    extend: 'Ext.data.Store',
    alias: 'store.bankloanstore',
    requires: [
        'Cashier.model.Bankloan'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BankloanStore',
                model: 'Cashier.model.Bankloan',
                proxy: {
                    type: 'ajax',
                    timeout: 45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/bankloan/read',
                        create: 'cashier/bankloan/create',
                        update: 'cashier/bankloan/update',
                        destroy: 'cashier/bankloan/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'bank_loan_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        hideparam: 'default',
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },

                }
            }, cfg)]);
    }
});