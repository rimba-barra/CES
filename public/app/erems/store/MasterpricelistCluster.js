Ext.define('Erems.store.MasterpricelistCluster', {
    extend: 'Ext.data.Store',
    alias: 'store.masterpricelistClusterstore',
    requires: [
        'Erems.model.MasterpricelistCluster'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterpricelistClusterStore',
                model: 'Erems.model.MasterpricelistCluster',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST'
                    },
                    api: {
                        read: 'erems/masterpricelist/read'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'cluster_id',
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