Ext.define('Cashier.store.KasbondeptpostingNew', {
    extend: 'Ext.data.Store',
    alias: 'store.kasbondeptpostingstorenew',
    requires: [
        'Cashier.model.Kasbondeptpostingnew'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KasbondeptpostingStoreNew',
                model: 'Cashier.model.Kasbondeptpostingnew',
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
                        statusrequest: 'posting_only',
//                        project_id: apps.project,

                    }
                }
            }, cfg)]);
    }
});