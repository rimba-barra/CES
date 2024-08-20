Ext.define('Cashier.store.Prosesposting', {
    extend: 'Ext.data.Store',
    alias: 'store.prosespostingstore',
    requires: [
        'Cashier.model.Prosesposting'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ProsespostingStore',
                model: 'Cashier.model.Prosesposting',
                proxy: {
                    type: 'ajax',
                    timeout:4500000,
                    actionMethods: {
                        create: 'POST',                       
                    },
                    api: {
                        create: 'cashier/prosesposting/create',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'summary_id',
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