Ext.define('Erems.store.Hgbajb', {
    extend: 'Ext.data.Store',
    alias: 'store.hgbajbstore',
    requires: [
        'Erems.model.Hgbajb'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'HgbajbStore',
                model: 'Erems.model.Hgbajb',
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