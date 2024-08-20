Ext.define('Cashier.store.Usermodulecashierall', {
    extend: 'Ext.data.Store',
    alias: 'store.usermodulecashierstoreall',
    requires: [
        'Cashier.model.Usermodulecashierall'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'UsermodulecashierallStore',
                model: 'Cashier.model.Usermodulecashierall',
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
                        hideparam: 'usermodulecashierall',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});