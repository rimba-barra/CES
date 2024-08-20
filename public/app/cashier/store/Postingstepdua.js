Ext.define('Cashier.store.Postingstepdua', {
    extend: 'Ext.data.Store',
    alias: 'store.postingstepduastore',
    requires: [
        'Cashier.model.Postingstepdua'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PostingstepduaStore',
                model: 'Cashier.model.Postingstepdua',
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
                        read: 'cashier/postingstepdua/read',
                        create: 'cashier/postingstepdua/create',
                        update: 'cashier/postingstepdua/update',
                        destroy: 'cashier/postingstepdua/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'journal_id',
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