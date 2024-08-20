Ext.define('Gl.store.Offset', {
    extend: 'Ext.data.Store',
    alias: 'store.offsetstore',
    requires: [
        'Gl.model.Offset'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'OffsetStore',
                model: 'Gl.model.Offset',
                // pageSize: 10,
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/offset/read',
                        create: 'gl/offset/create',
                        update: 'gl/offset/update',
                        destroy: 'gl/offset/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'coa_id_from',
                        root: 'data',
                        totalProperty: 'total'
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