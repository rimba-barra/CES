Ext.define('Cashier.store.Schemaescrow', {
    extend: 'Ext.data.Store',
    alias: 'store.schemaescrowstore',
    requires: [
        'Cashier.model.Schemaescrow'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SchemaescrowStore',
                model: 'Cashier.model.Schemaescrow',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/schemaescrow/read',
                        create: 'cashier/schemaescrow/create',
                        update: 'cashier/schemaescrow/update',
                        destroy: 'cashier/schemaescrow/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletter_id',
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