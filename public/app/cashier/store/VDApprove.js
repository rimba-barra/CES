Ext.define('Cashier.store.VDApprove', {
    extend: 'Ext.data.Store',
    alias: 'store.vdapprovestore',
    requires: [
        'Cashier.model.VDApprove'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VDApproveStore',
                model: 'Cashier.model.VDApprove',
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
                        hideparam: 'default',
                        project_id:apps.project,
                     
                      
                    }
                }
            }, cfg)]);
    }
});