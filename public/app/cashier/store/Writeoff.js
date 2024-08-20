Ext.define('Cashier.store.Writeoff', {
    extend: 'Ext.data.Store',
    alias: 'store.writeoffstore',
    requires: [
        'Cashier.model.Writeoff'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'WriteoffStore',
                model: 'Cashier.model.Writeoff',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/writeoff/read',
                        create: 'cashier/writeoff/create',
                        update: 'cashier/writeoff/update',
                        destroy: 'cashier/writeoff/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'writeoffdetail_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    }
                }
            }, cfg)]);
    }
});