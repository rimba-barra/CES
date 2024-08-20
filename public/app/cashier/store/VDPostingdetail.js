Ext.define('Cashier.store.VDPostingdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.vdpostingdetailstore',
    requires: [
        'Cashier.model.VDPostingdetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VDPostingdetailStore',
                model: 'Cashier.model.VDPostingdetail',
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
                        read: 'cashier/vdposting/detailread',
                        create: 'cashier/vdposting/detailcreate',
                        update: 'cashier/vdposting/detailupdate',
                        destroy: 'cashier/vdposting/detaildelete'
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