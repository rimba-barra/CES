Ext.define('Cashier.store.Mhsetupcashflow', {
    extend: 'Ext.data.Store',
    alias: 'store.mhsetupcashflowstore',
    requires: [
        'Cashier.model.Mhsetupcashflow'
    ],
    pageSize: 10000,
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MhsetupcashflowStore',
                model: 'Cashier.model.Mhsetupcashflow',
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
                        read: 'cashier/setupcashflow/read',
                        create: 'cashier/setupcashflow/create',
                        update: 'cashier/setupcashflow/update',
                        destroy: 'cashier/setupcashflow/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'setupcashflow_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default',
                        limit: 100000
                    }
                }
            }, cfg)]);
    }
});