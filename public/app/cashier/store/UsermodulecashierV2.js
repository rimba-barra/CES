Ext.define('Cashier.store.UsermodulecashierV2', {
    extend: 'Ext.data.Store',
    alias: 'store.usermodulecashierstoreV2',
    requires: [
        'Cashier.model.UsermodulecashierV2'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'UsermodulecashierStoreV2',
                model: 'Cashier.model.UsermodulecashierV2',
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
                        read: 'cashier/common/read',
                        create: 'cashier/common/create',
                        update: 'cashier/common/update',
                        destroy: 'cashier/common/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'user_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'usermodulecashierV2',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});