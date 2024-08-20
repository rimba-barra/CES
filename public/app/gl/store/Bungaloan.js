Ext.define('Gl.store.Bungaloan', {
    extend: 'Ext.data.Store',
    alias: 'store.bungaloanstore',
    requires: [
        'Gl.model.Bungaloan'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BungaloanStore',
                model: 'Gl.model.Bungaloan',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/bungaloan/read',
                        create: 'gl/bungaloan/create',
                        update: 'gl/bungaloan/update',
                        destroy: 'gl/bungaloan/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'bungaloan_id',
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