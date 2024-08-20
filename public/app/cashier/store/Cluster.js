Ext.define('Cashier.store.Cluster', {
    extend: 'Ext.data.Store',
    alias: 'store.clusterstore',
    requires: [
        'Cashier.model.Cluster'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ClusterStore',
                model: 'Cashier.model.Cluster',
                sorters: [
                            { property: 'cluster',direction: 'ASC'}                       
                        ],
                proxy: {
                    type: 'ajax',
                    timeout:45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/common/read',
                        create: 'cashier/common/create',
                        update: 'cashier/common/update',
                        destroy: 'cashier/common/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'cluster_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getcluster'
                    }
                }
            }, cfg)]);
    }
});