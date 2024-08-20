Ext.define('Cashier.store.VDApproveattachmentdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.vdapproveattachmentdetailstore',
    requires: [
        'Cashier.model.VDApproveattachmentdetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VDApproveattachmentdetailStore',
                model: 'Cashier.model.VDApproveattachmentdetail',
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
                        read: 'cashier/vdapprove/detailread',
                        create: 'cashier/vdapprove/detailcreate',
                        update: 'cashier/vdapprove/detailupdate',
                        destroy: 'cashier/vdapprove/detaildelete'
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