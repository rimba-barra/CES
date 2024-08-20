Ext.define('Cashier.store.Kasbondeptsubdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.kasbondeptsubdetailstore',
    requires: [
        'Cashier.model.Kasbondeptsubdetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KasbondeptsubdetailStore',
                model: 'Cashier.model.Kasbondeptsubdetail',
                proxy: {
                    type: 'ajax',
                    timeout: 45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/kasbondept/subdetailread',
                        create: 'cashier/kasbondept/subdetailcreate',
                        update: 'cashier/kasbondept/subdetailupdate',
                        destroy: 'cashier/kasbondept/subdetaildelete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'kasbondeptsubdetail_id',
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