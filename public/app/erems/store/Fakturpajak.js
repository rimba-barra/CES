Ext.define('Erems.store.Fakturpajak', {
    extend: 'Ext.data.Store',
    alias: 'store.fakturpajakstore',
    requires: [
        'Erems.model.Fakturpajak'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'FakturpajakStore',
                model: 'Erems.model.Fakturpajak',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/fakturpajak/read',
                        create: 'erems/fakturpajak/create',
                        update: 'erems/fakturpajak/update',
                        destroy: 'erems/fakturpajak/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'payment_id',
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