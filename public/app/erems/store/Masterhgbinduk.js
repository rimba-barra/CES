Ext.define('Erems.store.Masterhgbinduk', {
    extend: 'Ext.data.Store',
    alias: 'store.masterhgbindukstore',
    requires: [
        'Erems.model.Masterhgbinduk'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterhgbindukStore',
                model: 'Erems.model.Masterhgbinduk',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterhgbinduk/read',
                        create: 'erems/masterhgbinduk/create',
                        update: 'erems/masterhgbinduk/update',
                        destroy: 'erems/masterhgbinduk/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'hgbinduk_id',
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