Ext.define('Cashier.store.Vdtransaction', {
    extend: 'Ext.data.Store',
    alias: 'store.vdtransactionstore',
    requires: [
        'Cashier.model.Vdtransaction'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VdtransactionStore',
                model: 'Cashier.model.Vdtransaction',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/vdtransaction/read',
                        create: 'cashier/vdtransaction/create',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'sub_coa_id',
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