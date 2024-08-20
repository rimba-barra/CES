Ext.define('Gl.store.Prosesakhirbulan', {
    extend: 'Ext.data.Store',
    alias: 'store.prosesakhirbulanstore',
    requires: [
        'Gl.model.Prosesakhirbulan'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ProsesakhirbulanStore',
                model: 'Gl.model.Prosesakhirbulan',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/prosesakhirbulan/read',
                        create: 'gl/prosesakhirbulan/create',
                        update: 'gl/prosesakhirbulan/update',
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