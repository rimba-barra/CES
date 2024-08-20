Ext.define('Cashier.store.Cashflowtype', {
    extend: 'Ext.data.Store',
    alias: 'store.cashflowtypestore',
    requires: [
        'Cashier.model.Cashflowtype'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CashflowtypeStore',
                model: 'Cashier.model.Cashflowtype',
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
                        read: 'cashier/cashflowtype/read',
                        create: 'cashier/cashflowtype/create',
                        update: 'cashier/cashflowtype/update',
                        destroy: 'cashier/cashflowtype/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'cashflowtype_id',
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