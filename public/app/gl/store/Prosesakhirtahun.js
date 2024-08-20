Ext.define('Gl.store.Prosesakhirtahun', {
    extend: 'Ext.data.Store',
    alias: 'store.prosesakhirtahunstore',
    requires: [
        'Gl.model.Prosesakhirtahun'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ProsesakhirtahunStore',
                model: 'Gl.model.Prosesakhirtahun',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/prosesakhirtahun/read',
                        create: 'gl/prosesakhirtahun/create',
                        update: 'gl/prosesakhirtahun/update',
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