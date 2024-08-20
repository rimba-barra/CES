Ext.define('Erems.store.PurchaseletterNew', {
    extend: 'Ext.data.Store',
    alias: 'store.PurchaseletterNewstore',
    requires: [
        'Erems.model.PurchaseletterNew'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PurchaseletterNewStore',
                model: 'Erems.model.PurchaseletterNew',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/purchaseletterNew/read',
                        create: 'erems/purchaseletterNew/create',
                        update: 'erems/purchaseletterNew/update',
                        destroy: 'erems/purchaseletterNew/delete'
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