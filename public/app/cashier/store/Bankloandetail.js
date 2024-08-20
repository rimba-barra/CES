Ext.define('Cashier.store.Bankloandetail', {
    extend: 'Ext.data.Store',
    alias: 'store.bankloandetailstore',
    requires: [
        'Cashier.model.Bankloandetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BankloandetailStore',
                model: 'Cashier.model.Bankloandetail',
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
                        read: 'cashier/bankloan/detailread',
                        create: 'cashier/bankloan/detailcreate',
                        update: 'cashier/bankloan/detailupdate',
                        destroy: 'cashier/bankloan/detaildelete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'bank_loan_detail_id',
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