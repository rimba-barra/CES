Ext.define('Erems.store.Eremsstock', {
    extend: 'Ext.data.Store',
    alias: 'store.eremsstockstore',
    requires: [
        'Erems.model.Eremsstock'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'EremsstockStore',
                model: 'Erems.model.Eremsstock',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/eremsstock/read',
                        create: 'erems/eremsstock/create',
                        update: 'erems/eremsstock/update',
                        destroy: 'erems/eremsstock/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'hgbajb_id',
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