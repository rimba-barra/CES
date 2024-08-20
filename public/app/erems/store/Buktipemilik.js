Ext.define('Erems.store.Buktipemilik', {
    extend: 'Ext.data.Store',
    alias: 'store.buktipemilikstore',
    requires: [
        'Erems.model.Buktipemilik'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BuktipemilikStore',
                model: 'Erems.model.Buktipemilik',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/buktipemilik/read',
                        create: 'erems/buktipemilik/create',
                        update: 'erems/buktipemilik/update',
                        destroy: 'erems/buktipemilik/delete'
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