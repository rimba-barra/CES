Ext.define('Cashier.store.Pencairankpr', {
    extend: 'Ext.data.Store',
    alias: 'store.pencairankprstore',
    requires: [
        'Cashier.model.Pencairankpr'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PencairankprStore',
                model: 'Cashier.model.Pencairankpr',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/pencairankpr/read',
                        create: 'cashier/pencairankpr/create',
                        update: 'cashier/pencairankpr/update',
                        destroy: 'cashier/pencairankpr/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletter_pencairankpr_id',
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