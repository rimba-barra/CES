Ext.define('Erems.store.Masterberkas', {
    extend: 'Ext.data.Store',
    alias: 'store.masterberkasstore',
    requires: [
        'Erems.model.Masterberkas'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterberkasStore',
                model: 'Erems.model.Masterberkas',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterberkas/read',
                        create: 'erems/masterberkas/create',
                        update: 'erems/masterberkas/update',
                        destroy: 'erems/masterberkas/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'berkas_id',
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