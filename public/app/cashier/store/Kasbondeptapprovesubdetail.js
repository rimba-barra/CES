Ext.define('Cashier.store.Kasbondeptapprovesubdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.kasbondeptapprovesubdetailstore',
    requires: [
        'Cashier.model.Kasbondeptapprovesubdetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KasbondeptapprovesubdetailStore',
                model: 'Cashier.model.Kasbondeptapprovesubdetail',
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
                        read: 'cashier/kasbondeptapprove/subdetailread',
                        create: 'cashier/kasbondeptapprove/subdetailcreate',
                        update: 'cashier/kasbondeptapprove/subdetailupdate',
                        destroy: 'cashier/kasbondeptapprove/subdetaildelete'
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