Ext.define('Cashier.store.Kasbondeptpostingdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.kasbondeptpostingdetail',
    requires: [
        'Cashier.model.Kasbondeptpostingdetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KasbondeptpostingdetailStore',
                model: 'Cashier.model.Kasbondeptpostingdetail',
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
                        read: 'cashier/kasbondeptposting/detailread',
                        create: 'cashier/kasbondeptposting/detailcreate',
                        update: 'cashier/kasbondeptposting/detailupdate',
                        destroy: 'cashier/kasbondeptposting/detaildelete'
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