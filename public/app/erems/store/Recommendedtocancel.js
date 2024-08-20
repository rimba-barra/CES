Ext.define('Erems.store.Recommendedtocancel', {
    extend: 'Ext.data.Store',
    alias: 'store.recommendedtocancelstore',
    requires: [
        'Erems.model.Recommendedtocancel'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'RecommendedtocancelStore',
                model: 'Erems.model.Recommendedtocancel',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/recommendedtocancel/read',
                        create: 'erems/recommendedtocancel/create',
                        update: 'erems/recommendedtocancel/update',
                        destroy: 'erems/recommendedtocancel/delete'
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