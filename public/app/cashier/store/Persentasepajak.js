Ext.define('Cashier.store.Persentasepajak', {
    extend: 'Ext.data.Store',
    alias: 'store.persentasepajakstore',
    requires: [
        'Cashier.model.Persentasepajak'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PersentasepajakStore',
                model: 'Cashier.model.Persentasepajak',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/persentasepajak/read',
                        create: 'cashier/persentasepajak/create',
                        update: 'cashier/persentasepajak/update',
                        destroy: 'cashier/persentasepajak/delete',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'persentasepajak_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        'parametersql': 'read',
                        'limit': 25
                    }
                }
            }, cfg)]);
    }
});