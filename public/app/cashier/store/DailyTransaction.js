Ext.define('Cashier.store.Dailytransaction', {
    extend: 'Ext.data.Store',
    alias: 'store.dailytransactionstore',
    requires: [
        'Cashier.model.Dailytransaction'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'DailytransactionStore',
                model: 'Cashier.model.Dailytransaction',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/dailytransaction/read',
                        create: 'cashier/dailytransaction/create',
                        update: 'cashier/dailytransaction/update',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'from_coa_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    }
                }
            }, cfg)]);
    }
});