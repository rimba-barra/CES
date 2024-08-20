Ext.define('Erems.store.Marketingstockunit', {
    extend: 'Ext.data.Store',
    alias: 'store.marketingstockunitstore',
    requires: [
        'Erems.model.Marketingstockunit'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MarketingstockunitStore',
                model: 'Erems.model.Marketingstockunit',
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
                        idProperty: 'unit_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'unit_detail',
                    }
                }
            }, cfg)]);
    }
});

