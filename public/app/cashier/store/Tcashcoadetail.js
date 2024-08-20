Ext.define('Cashier.store.Tcashcoadetail', {
    extend: 'Ext.data.Store',
    alias: 'store.tcashcoadetailstore',
    requires: [
        'Cashier.model.Tcashcoadetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TcashcoadetailStore',
                model: 'Cashier.model.Tcashcoadetail',
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