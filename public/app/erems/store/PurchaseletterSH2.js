Ext.define('Erems.store.PurchaseletterSH2', {
    extend: 'Ext.data.Store',
    alias: 'store.purchaseletterSH2store',
    requires: [
        'Erems.model.PurchaseletterSH2'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PurchaseletterSH2Store',
                model: 'Erems.model.PurchaseletterSH2',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/purchaseletterSH2/read',
                        create: 'erems/purchaseletterSH2/create',
                        update: 'erems/purchaseletterSH2/update',
                        destroy: 'erems/purchaseletterSH2/delete'
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