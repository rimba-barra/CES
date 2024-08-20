Ext.define('Cashier.store.VDRequestlistapproval', {
    extend: 'Ext.data.Store',
    alias: 'store.vdrequestlistapprovalstore',
    requires: [
        'Cashier.model.VDRequestlistapproval'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VDRequestlistapprovalStore',
                model: 'Cashier.model.VDRequestlistapproval',
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
                        idProperty: 'approval_by',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getlistapproval',
                    
                    }
                }
            }, cfg)]);
    }
});