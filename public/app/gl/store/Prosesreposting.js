Ext.define('Gl.store.Prosesreposting', {
    extend: 'Ext.data.Store',
    alias: 'store.prosesrepostingstore',
    requires: [
        'Gl.model.Prosesreposting'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ProsesrepostingStore',
                model: 'Gl.model.Prosesreposting',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/prosesreposting/read',
                        create: 'gl/prosesreposting/create',
                        update: 'gl/prosesreposting/update',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'coalr_id',
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