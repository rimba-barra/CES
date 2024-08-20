Ext.define('Cashier.store.VDRequestapprovaldetail', {
    extend: 'Ext.data.Store',
    alias: 'store.vdrequestapprovaldetailstore',
    requires: [
        'Cashier.model.VDRequestapprovaldetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VDRequestapprovaldetailStore',
                model: 'Cashier.model.VDRequestapprovaldetail',
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
                        idProperty: 'voucherdetail_id',
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