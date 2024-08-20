Ext.define('Erems.store.Masterpbbinduk', {
    extend: 'Ext.data.Store',
    alias: 'store.masterpbbindukstore',
    requires: [
        'Erems.model.Masterpbbinduk'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterpbbindukStore',
                model: 'Erems.model.Masterpbbinduk',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterpbbinduk/read',
                        create: 'erems/masterpbbinduk/create',
                        update: 'erems/masterpbbinduk/update',
                        destroy: 'erems/masterpbbinduk/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'pbbinduk_id',
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