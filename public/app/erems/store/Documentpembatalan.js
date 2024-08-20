Ext.define('Erems.store.Documentpembatalan', {
    extend: 'Ext.data.Store',
    alias: 'store.documentpembatalanstore',
    requires: [
        'Erems.model.Documentpembatalan'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'DocumentpembatalanStore',
                model: 'Erems.model.Documentpembatalan',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/documentpembatalan/read',
                        create: 'erems/documentpembatalan/create',
                        update: 'erems/documentpembatalan/update',
                        destroy: 'erems/documentpembatalan/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'cancellationdocument_id',
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