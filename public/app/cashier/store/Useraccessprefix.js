Ext.define('Cashier.store.Useraccessprefix', {
    extend: 'Ext.data.Store',
    alias: 'store.useraccessprefixstore',
    requires: [
        'Cashier.model.Useraccessprefix'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'UseraccessprefixStore',
                model: 'Cashier.model.Useraccessprefix',
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
                        read: 'cashier/useraccessprefix/read',
                        create: 'cashier/useraccessprefix/create',
                        update: 'cashier/useraccessprefix/update',
                        destroy: 'cashier/useraccessprefix/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'user_prefix_id',
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