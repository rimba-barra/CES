Ext.define('Erems.store.Purchaseletterrevisionchangeprice', {
    extend: 'Ext.data.Store',
    alias: 'store.purchaseletterrevisionchangepricestore',
    requires: [
        'Erems.model.Purchaseletterrevisionchangeprice'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PurchaseletterrevisionchangepriceStore',
                model: 'Erems.model.Purchaseletterrevisionchangeprice',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/purchaseletterrevision/readchangeprice',
                        //create: 'erems/purchaseletterrevision/create',
                        //update: 'erems/purchaseletterrevision/create',
                        //destroy: 'erems/purchaseletterrevision/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'changeprice_id',
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