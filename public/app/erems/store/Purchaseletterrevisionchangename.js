Ext.define('Erems.store.Purchaseletterrevisionchangename', {
    extend: 'Ext.data.Store',
    alias: 'store.purchaseletterrevisionchangenamestore',
    requires: [
        'Erems.model.Purchaseletterrevisionchangename'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PurchaseletterrevisionchangenameStore',
                model: 'Erems.model.Purchaseletterrevisionchangename',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/purchaseletterrevision/readchangename',
                        //create: 'erems/purchaseletterrevision/create',
                        //update: 'erems/purchaseletterrevision/create',
                        //destroy: 'erems/purchaseletterrevision/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'changename_id',
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