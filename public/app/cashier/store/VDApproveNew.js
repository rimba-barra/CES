Ext.define('Cashier.store.VDApproveNew', {
    extend: 'Ext.data.Store',
    alias: 'store.vdapprovestorenew',
    requires: [
        'Cashier.model.VDApprovenew'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VDApproveStoreNew',
                model: 'Cashier.model.VDApprovenew',
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
                        read: 'cashier/vdapprove/read',
                        create: 'cashier/vdapprove/create',
                        update: 'cashier/vdapprove/update',
                        destroy: 'cashier/vdapprove/delete'
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
                        hideparam: 'approve_only',
                        desc:0,
                        project_id:apps.project,
                        pt_id:apps.pt,
                     
                      
                    }
                }
            }, cfg)]);
    }
});