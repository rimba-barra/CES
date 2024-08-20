Ext.define('Erems.store.Mastercluster', {
    extend: 'Ext.data.Store',
    alias: 'store.masterclusterstore',
    requires: [
        'Erems.model.Mastercluster'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterclusterStore',
                model: 'Erems.model.Mastercluster',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/mastercluster/read',
                        create: 'erems/mastercluster/create',
                        update: 'erems/mastercluster/update',
                        destroy: 'erems/mastercluster/delete'
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