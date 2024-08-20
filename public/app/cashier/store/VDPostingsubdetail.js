Ext.define('Cashier.store.VDPostingsubdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.vdpostingsubdetailstore',
    requires: [
        'Cashier.model.VDPostingsubdetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VDPostingsubdetailStore',
                model: 'Cashier.model.VDPostingsubdetail',
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
                        read: 'cashier/vdposting/subdetailread',
                        create: 'cashier/vdposting/subdetailcreate',
                        update: 'cashier/vdposting/subdetailupdate',
                        destroy: 'cashier/vdposting/subdetaildelete'
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