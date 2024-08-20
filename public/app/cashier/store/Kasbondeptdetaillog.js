Ext.define('Cashier.store.Kasbondeptdetaillog', {
    extend: 'Ext.data.Store',
    alias: 'store.kasbondeptdetaillogstore',
    requires: [
        'Cashier.model.Kasbondeptdetaillog'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KasbondeptdetaillogStore',
                model: 'Cashier.model.Kasbondeptdetaillog',
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
                        read: 'cashier/kasbondept/detaillogread',
                        create: 'cashier/kasbondept/detaillogcreate',
                        update: 'cashier/kasbondept/detaillogupdate',
                        destroy: 'cashier/kasbondept/detaillogdelete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'voucher_id',
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