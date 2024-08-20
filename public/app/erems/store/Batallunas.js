Ext.define('Erems.store.Batallunas', {
    extend: 'Ext.data.Store',
    alias: 'store.batallunasstore',
    requires: [
        'Erems.model.Batallunas'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BatallunasStore',
                model: 'Erems.model.Batallunas',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/batallunas/read',
                        create: 'erems/batallunas/create',
                        update: 'erems/batallunas/update',
                        destroy: 'erems/batallunas/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletter_id',
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