Ext.define('Cashier.store.VDRequestsubdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.vdrequestsubdetailstore',
    requires: [
        'Cashier.model.VDRequestsubdetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VDRequestsubdetailStore',
                model: 'Cashier.model.VDRequestsubdetail',
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
                        read: 'cashier/vdrequest/subdetailread',
                        create: 'cashier/vdrequest/subdetailcreate',
                        update: 'cashier/vdrequest/subdetailupdate',
                        destroy: 'cashier/vdrequest/subdetaildelete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'vouchersubdetail_id',
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