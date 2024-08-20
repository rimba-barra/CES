Ext.define('Gl.store.Kodeaccountrugilaba', {
    extend: 'Ext.data.Store',
    alias: 'store.kodeaccountrugilabastore',
    requires: [
        'Gl.model.Kodeaccountrugilaba'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KodeaccountrugilabaStore',
                model: 'Gl.model.Kodeaccountrugilaba',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/kodeaccountrugilaba/read',
                        create: 'gl/kodeaccountrugilaba/create',
                        update: 'gl/kodeaccountrugilaba/update',
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