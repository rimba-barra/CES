Ext.define('Erems.store.Marketingstockprice', {
    extend: 'Ext.data.Store',
    alias: 'store.marketingstockpricestore',
    requires: [
        'Erems.model.Marketingstockprice'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MarketingstockpriceStore',
                model: 'Erems.model.Marketingstockprice',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST'
                    },
                    api: {
                        read: 'erems/marketingstock/read',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'price_id',
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
