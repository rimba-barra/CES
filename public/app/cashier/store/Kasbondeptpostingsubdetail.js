Ext.define('Cashier.store.Kasbondeptpostingsubdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.kasbondeptpostingsubdetailstore',
    requires: [
        'Cashier.model.Kasbondeptpostingsubdetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KasbondeptpostingsubdetailStore',
                model: 'Cashier.model.Kasbondeptpostingsubdetail',
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
                        read: 'cashier/kasbondeptposting/subdetailread',
                        create: 'cashier/kasbondeptposting/subdetailcreate',
                        update: 'cashier/kasbondeptposting/subdetailupdate',
                        destroy: 'cashier/kasbondeptposting/subdetaildelete'
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