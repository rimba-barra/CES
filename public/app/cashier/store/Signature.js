Ext.define('Cashier.store.Signature', {
    extend: 'Ext.data.Store',
    alias: 'store.signaturestore',
    requires: [
        'Cashier.model.Signature'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SignatureStore',
                model: 'Cashier.model.Signature',
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
                        read: 'cashier/msignature/read',
                        create: 'cashier/msignature/create',
                        update: 'cashier/msignature/update',
                        destroy: 'cashier/msignature/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'signature_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },

                }
            }, cfg)]);
    }
});