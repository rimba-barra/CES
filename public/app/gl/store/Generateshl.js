Ext.define('Gl.store.Generateshl', {
    extend: 'Ext.data.Store',
    alias: 'store.generateshlstore',
    requires: [
        'Gl.model.Generateshl'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'GenerateshlStore',
                model: 'Gl.model.Generateshl',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/generateshl/read',
                        create: 'gl/generateshl/create',
                        update: 'gl/generateshl/update',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'processdate',
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