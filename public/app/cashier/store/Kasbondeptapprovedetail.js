Ext.define('Cashier.store.Kasbondeptapprovedetail', {
    extend: 'Ext.data.Store',
    alias: 'store.kasbondeptapprovedetail',
    requires: [
        'Cashier.model.Kasbondeptapprovedetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KasbondeptapprovedetailStore',
                model: 'Cashier.model.Kasbondeptapprovedetail',
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
                        read: 'cashier/kasbondeptapprove/detailread',
                        create: 'cashier/kasbondeptapprove/detailcreate',
                        update: 'cashier/kasbondeptapprove/detailupdate',
                        destroy: 'cashier/kasbondeptapprove/detaildelete'
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