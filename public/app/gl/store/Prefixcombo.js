Ext.define('Gl.store.Prefixcombo', {
    extend: 'Ext.data.Store',
    alias: 'store.prefixcombostore',
    requires: [
        'Gl.model.Kodeprefix'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PrefixcomboStore',
                model: 'Gl.model.Kodeprefix',               
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST'
                    },
                    api: {
                        read: 'gl/kodeprefix/read'
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
                    },
                    extraParams: {
                        hideparam: 'default'
                    }
                }
            }, cfg)]);
    }
});