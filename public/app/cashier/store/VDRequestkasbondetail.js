Ext.define('Cashier.store.VDRequestkasbondetail', {
    extend: 'Ext.data.Store',
    alias: 'store.vdrequestkasbondetailstore',
    requires: [
        'Cashier.model.VDRequestkasbondetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VDRequestkasbondetailStore',
                model: 'Cashier.model.VDRequestkasbondetail',
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