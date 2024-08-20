Ext.define('Cashier.store.Rcashcoadetail', {
    extend: 'Ext.data.Store',
    alias: 'store.rcashcoadetailstore',
    requires: [
        'Cashier.model.Rcashcoadetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'RcashcoadetailStore',
                model: 'Cashier.model.Rcashcoadetail',
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
                        read: 'cashier/tcash/coadetailread',
                        create: 'cashier/tcash/coadetailcreate',
                        update: 'cashier/tcash/coadetailupdate',
                        destroy: 'cashier/tcash/coadetaildelete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'kasbankdetail_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default'
                    }
                }
            }, cfg)]);
    }
});