Ext.define('Cashier.store.Kasbondeptposting', {
    extend: 'Ext.data.Store',
    alias: 'store.kasbondeptpostingstore',
    requires: [
        'Cashier.model.Kasbondeptposting'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KasbondeptpostingStore',
                model: 'Cashier.model.Kasbondeptposting',
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
                        read: 'cashier/kasbondeptposting/read',
                        create: 'cashier/kasbondeptposting/create',
                        update: 'cashier/kasbondeptposting/update',
                        destroy: 'cashier/kasbondeptposting/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'kasbondept_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default',
                        statusrequest: 'unposting_only',
//                        project_id: apps.project,

                    }
                }
            }, cfg)]);
    }
});