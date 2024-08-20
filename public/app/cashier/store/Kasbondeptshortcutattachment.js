Ext.define('Cashier.store.Kasbondeptshortcutattachment', {
    extend: 'Ext.data.Store',
    alias: 'store.kasbondeptshortcutattachmentstore',
    requires: [
        'Cashier.model.Kasbondeptshortcutattachment'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KasbondeptshortcutattachmentStore',
                model: 'Cashier.model.Kasbondeptshortcutattachment',
                proxy: {
                    type: 'ajax',
                     timeout:45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/kasbondept/detailread',
                        create: 'cashier/kasbondept/detailcreate',
                        update: 'cashier/kasbondept/detailupdate',
                        destroy: 'cashier/kasbondept/detaildelete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'kasbondeptdetail_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default',
                    
                    }
                }
            }, cfg)]);
    }
});