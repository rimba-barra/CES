Ext.define('Erems.store.Buktipemilikpengalihanhak', {
    extend: 'Ext.data.Store',
    alias: 'store.buktipemilikpengalihanhakstore',
    requires: [
        'Erems.model.Buktipemilik'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BuktipemilikpengalihanhakStore',
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