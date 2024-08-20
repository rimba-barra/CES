Ext.define('Cashier.store.Masterbankrate', {
    extend: 'Ext.data.Store',
    alias: 'store.masterbankratestore',
    requires: [
        'Cashier.model.Masterbankrate'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterbankrateStore',
                model: 'Cashier.model.Masterbankrate',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/masterbankrate/read',
                        create: 'cashier/masterbankrate/create',
                        update: 'cashier/masterbankrate/update',
                        destroy: 'cashier/masterbankrate/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'bank_rate_id',
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