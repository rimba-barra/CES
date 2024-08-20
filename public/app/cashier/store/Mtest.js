Ext.define('Cashier.store.Mtest', {
    extend: 'Ext.data.Store',
    alias: 'store.mteststore',
    requires: [
        'Cashier.model.Mtest'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MtestStore',
                model: 'Cashier.model.Mtest',
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
                        read: 'cashier/mtest/read',
                        create: 'cashier/mtest/create',
                        update: 'cashier/mtest/update',
                        destroy: 'cashier/mtest/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'mtest_id',
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