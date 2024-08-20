Ext.define('Cashier.store.VDApproveapprovaldetail', {
    extend: 'Ext.data.Store',
    alias: 'store.vdapproveapprovaldetailstore',
    requires: [
        'Cashier.model.VDApproveapprovaldetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VDApproveapprovaldetailStore',
                model: 'Cashier.model.VDApproveapprovaldetail',
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