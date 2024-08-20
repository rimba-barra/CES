Ext.define('Gl.store.Subcoalist', {
    extend: 'Ext.data.Store',
    alias: 'store.subcoaliststore',
    requires: [
        'Gl.model.Subcoalist'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SubcoalistStore',
                model: 'Gl.model.Subcoalist',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/subcoalist/read',
                        create: 'gl/subcoalist/create',
                        update: 'gl/subcoalist/update',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'from_coa_id',
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