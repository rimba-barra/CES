Ext.define('Erems.store.Purchaseletterrevisionchangekavling', {
    extend: 'Ext.data.Store',
    alias: 'store.purchaseletterrevisionchangekavlingstore',
    requires: [
        'Erems.model.Purchaseletterrevisionchangekavling'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PurchaseletterrevisionchangekavlingStore',
                model: 'Erems.model.Purchaseletterrevisionchangekavling',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/purchaseletterrevision/readchangekavling',
                        //create: 'erems/purchaseletterrevision/create',
                        //update: 'erems/purchaseletterrevision/create',
                        //destroy: 'erems/purchaseletterrevision/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'changekavling_id',
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