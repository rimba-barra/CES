Ext.define('Cashier.store.VDApprovesubdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.vdapprovesubdetailstore',
    requires: [
        'Cashier.model.VDApprovesubdetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VDApprovesubdetailStore',
                model: 'Cashier.model.VDApprovesubdetail',
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
                        read: 'cashier/vdapprove/subdetailread',
                        create: 'cashier/vdapprove/subdetailcreate',
                        update: 'cashier/vdapprove/subdetailupdate',
                        destroy: 'cashier/vdapprove/subdetaildelete'
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