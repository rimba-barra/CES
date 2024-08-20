Ext.define('Cashier.store.Masterformatreportlr', {
    extend: 'Ext.data.Store',
    alias: 'store.masterformatreportlrstore',
    requires: [
        'Cashier.model.Masterformatreportlr'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterformatreportlrStore',
                model: 'Cashier.model.Masterformatreportlr',
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
                        read: 'cashier/masterformatreportlr/read',
                        create: 'cashier/masterformatreportlr/create',
                        update: 'cashier/masterformatreportlr/update',
                        destroy: 'cashier/masterformatreportlr/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'formatrpt_id',
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