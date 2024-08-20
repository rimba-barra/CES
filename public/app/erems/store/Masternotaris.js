Ext.define('Erems.store.Masternotaris', {
    extend: 'Ext.data.Store',
    alias: 'store.masternotarisstore',
    requires: [
        'Erems.model.Masternotaris'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasternotarisStore',
                model: 'Erems.model.Masternotaris',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masternotaris/read',
                        create: 'erems/masternotaris/create',
                        update: 'erems/masternotaris/update',
                        destroy: 'erems/masternotaris/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'notaris_id',
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