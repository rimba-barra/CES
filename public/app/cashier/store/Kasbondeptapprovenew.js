Ext.define('Cashier.store.Kasbondeptapprovenew', {
    extend: 'Ext.data.Store',
    alias: 'store.kasbondeptapprovestorenew',
    requires: [
        'Cashier.model.Kasbondeptapprovenew'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KasbondeptapproveStoreNew',
                model: 'Cashier.model.Kasbondeptapprovenew',
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
                        read: 'cashier/kasbondeptapprove/read',
                        create: 'cashier/kasbondeptapprove/create',
                        update: 'cashier/kasbondeptapprove/update',
                        destroy: 'cashier/kasbondeptapprove/delete'
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
                        statusrequest: 'approve_only',
//                        project_id: apps.project,

                    }
                }
            }, cfg)]);
    }
});