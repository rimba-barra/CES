Ext.define('Gl.store.Prosestransaksi', {
    extend: 'Ext.data.Store',
    alias: 'store.prosestransaksistore',
    requires: [
        'Gl.model.Prosestransaksi'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ProsestransaksiStore',
                model: 'Gl.model.Prosestransaksi',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/prosestransaksi/read',
                        create: 'gl/prosestransaksi/create',
                        update: 'gl/prosestransaksi/update',
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