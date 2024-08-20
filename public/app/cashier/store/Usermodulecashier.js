Ext.define('Cashier.store.Usermodulecashier', {
    extend: 'Ext.data.Store',
    alias: 'store.usermodulecashierstore',
    requires: [
        'Cashier.model.Usermodulecashier'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'UsermodulecashierStore',
                model: 'Cashier.model.Usermodulecashier',
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
                        hideparam: 'usermodulecashier',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});