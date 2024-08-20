Ext.define('Erems.store.Bankkprakad', {
    extend: 'Ext.data.Store',
    alias: 'store.bankkprakadstore',
    requires: [
        'Erems.model.Bankkprakad'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BankkprakadStore',
                model: 'Erems.model.Bankkprakad',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/bankkpr/readakad',
                        create: 'erems/bankkpr/createakad',
                        update: 'erems/bankkpr/updateakad',
                        destroy: 'erems/bankkpr/deleteakad'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'akadconfirmation_id',
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