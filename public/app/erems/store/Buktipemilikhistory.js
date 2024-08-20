Ext.define('Erems.store.Buktipemilikhistory', {
    extend: 'Ext.data.Store',
    alias: 'store.buktipemilikhistorystore',
    requires: [
        'Erems.model.Buktipemilikhistory'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BuktipemilikhistoryStore',
                model: 'Erems.model.Buktipemilikhistory',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/buktipemilikhistory/read',
                        create: 'erems/buktipemilikhistory/create',
                        update: 'erems/buktipemilikhistory/update',
                        destroy: 'erems/buktipemilikhistory/delete'
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