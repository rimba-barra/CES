Ext.define('Erems.store.Purchaseletterrevision', {
    extend: 'Ext.data.Store',
    alias: 'store.purchaseletterrevisionstore',
    requires: [
        'Erems.model.Purchaseletterrevision'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PurchaseletterrevisionStore',
                model: 'Erems.model.Purchaseletterrevision',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/purchaseletterrevision/read',
                        create: 'erems/purchaseletterrevision/create',
                        update: 'erems/purchaseletterrevision/create',
                        destroy: 'erems/purchaseletterrevision/delete'
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