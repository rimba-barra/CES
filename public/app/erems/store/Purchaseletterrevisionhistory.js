Ext.define('Erems.store.Purchaseletterrevisionhistory', {
    extend: 'Ext.data.Store',
    alias: 'store.purchaseletterrevisionhistorystore',
    requires: [
        'Erems.model.Purchaseletterrevisionhistory'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PurchaseletterrevisionhistoryStore',
                model: 'Erems.model.Purchaseletterrevisionhistory',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/purchaseletterrevision/readhistory',
                        create: 'erems/purchaseletterrevision/create',
                        update: 'erems/purchaseletterrevision/create',
                        destroy: 'erems/purchaseletterrevision/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletterrevision_id',
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