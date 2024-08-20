Ext.define('Cashier.store.Masterbankkpr', {
    extend: 'Ext.data.Store',
    alias: 'store.masterbankkprstore',
    requires: [
        'Cashier.model.Masterbankkpr'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterbankkprStore',
                model: 'Cashier.model.Masterbankkpr',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/masterbankkpr/read',
                        create: 'cashier/masterbankkpr/create',
                        update: 'cashier/masterbankkpr/update',
                        destroy: 'cashier/masterbankkpr/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'bankkpr_id',
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