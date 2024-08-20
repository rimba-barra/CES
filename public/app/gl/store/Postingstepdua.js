Ext.define('Gl.store.Postingstepdua', {
    extend: 'Ext.data.Store',
    alias: 'store.postingstepduastore',
    requires: [
        'Gl.model.Postingstepdua'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PostingstepduaStore',
                model: 'Gl.model.Postingstepdua',
                proxy: {
                    type: 'ajax',
                    timeout:45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/postingstepdua/read',
                        create: 'gl/postingstepdua/create',
                        update: 'gl/postingstepdua/update',
                        destroy: 'gl/postingstepdua/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'journal_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default'
                    }
                }
            }, cfg)]);
    }
});