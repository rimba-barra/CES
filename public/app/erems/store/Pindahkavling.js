Ext.define('Erems.store.Pindahkavling', {
    extend: 'Ext.data.Store',
    alias: 'store.pindahkavlingstore',
    requires: [
        'Erems.model.Pindahkavling'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PindahkavlingStore',
                model: 'Erems.model.Pindahkavling',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST'
                    },
                    api: {
                        read: 'erems/pindahkavling/read'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'changekavling_id',
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