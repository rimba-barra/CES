Ext.define('Cashier.store.Bankkpr', {
    extend: 'Ext.data.Store',
    alias: 'store.bankkprstore',
    requires: [
        'Cashier.model.Bankkpr'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BankkprStore',
                model: 'Cashier.model.Bankkpr',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/bankkpr/read',
                        create: 'cashier/bankkpr/create',
                        update: 'cashier/bankkpr/update',
                        destroy: 'cashier/bankkpr/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletter_bankkpr_id',
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