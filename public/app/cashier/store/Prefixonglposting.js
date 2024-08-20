Ext.define('Cashier.store.Prefixonglposting', {
    extend: 'Ext.data.Store',
    alias: 'store.prefixonglpostingstore',
    requires: [
        'Cashier.model.Prefixonglposting'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PrefixonglpostingStore',
                model: 'Cashier.model.Prefixonglposting',
                pageSize: 1000,
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
                        read: 'cashier/common/read',
                        create: 'cashier/common/create',
                        update: 'cashier/common/update',
                        destroy: 'cashier/common/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'prefix_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getprefixglbyprojectpt',
                        project_id: 0,
                        pt_id: 0,
                        start: 0,
                        limit: 1000,
                    },
                }
            }, cfg)]);
    }
});