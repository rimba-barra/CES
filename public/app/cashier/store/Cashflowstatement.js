Ext.define('Cashier.store.Cashflowstatement', {
    extend: 'Ext.data.Store',
    alias: 'store.cashflowstatementstore',
    requires: [
        'Cashier.model.Cashflowstatement'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CashflowstatementStore',
                model: 'Cashier.model.Cashflowstatement',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/cashflowstatement/read',
                        create: 'cashier/cashflowstatement/create',
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