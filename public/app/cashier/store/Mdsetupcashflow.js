Ext.define('Cashier.store.Mdsetupcashflow', {
    extend: 'Ext.data.Store',
    alias: 'store.mdsetupcashflowstore',
    requires: [
        'Cashier.model.Mdsetupcashflow'
    ],
    pageSize: 10000,
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MdsetupcashflowStore',
                model: 'Cashier.model.Mdsetupcashflow',
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
                        idProperty: 'setupcashflowdetail_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getdatadetail',
                        limit: 1000000
                    }
                }
            }, cfg)]);
    }
});