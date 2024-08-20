Ext.define('Gl.store.Bungashl', {
    extend: 'Ext.data.Store',
    alias: 'store.bungashlstore',
    requires: [
        'Gl.model.Bungashl'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BungashlStore',
                model: 'Gl.model.Bungashl',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/bungashl/read',
                        create: 'gl/bungashl/create',
                      
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'bungashl_id',
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