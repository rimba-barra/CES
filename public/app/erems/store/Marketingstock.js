Ext.define('Erems.store.Marketingstock', {
    extend: 'Ext.data.Store',
    alias: 'store.marketingstockstore',
    requires: [
        'Erems.model.Marketingstock'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MarketingstockStore',
                model: 'Erems.model.Marketingstock',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/marketingstock/read',
                        create: 'erems/marketingstock/create',
                        update: 'erems/marketingstock/update',
                        destroy: 'erems/marketingstock/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'marketstock_id',
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