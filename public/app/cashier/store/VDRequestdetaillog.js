Ext.define('Cashier.store.VDRequestdetaillog', {
    extend: 'Ext.data.Store',
    alias: 'store.vdrequestdetaillogstore',
    requires: [
        'Cashier.model.VDRequestdetaillog'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VDRequestdetaillogStore',
                model: 'Cashier.model.VDRequestdetaillog',
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
                        read: 'cashier/vdrequest/detailread',
                        create: 'cashier/vdrequest/detailcreate',
                        update: 'cashier/vdrequest/detailupdate',
                        destroy: 'cashier/vdrequest/detaildelete'
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
                        hideparam: 'detaillog',
                    }
                }
            }, cfg)]);
    }
});