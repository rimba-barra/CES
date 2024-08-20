Ext.define('Gl.store.Kodeprefix', {
    extend: 'Ext.data.Store',
    alias: 'store.kodeprefixstore',
    requires: [
        'Gl.model.Kodeprefix'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KodeprefixStore',
                model: 'Gl.model.Kodeprefix',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/kodeprefix/read',
                        create: 'gl/kodeprefix/create',
                        update: 'gl/kodeprefix/update',
                        destroy: 'gl/kodeprefix/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'prefix_id',
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