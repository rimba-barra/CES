Ext.define('Erems.store.Resync', {
    extend: 'Ext.data.Store',
    alias: 'store.resyncstore',
    requires: [
        'Erems.model.Resync'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ResyncStore',
                model: 'Erems.model.Resync',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/resyncvabca/read',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'api_vabca_logs_id',
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'resync'
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