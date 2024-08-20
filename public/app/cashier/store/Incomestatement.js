Ext.define('Cashier.store.Incomestatement', {
    extend: 'Ext.data.Store',
    alias: 'store.incomestatementstore',
    requires: [
        'Cashier.model.Incomestatement'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'IncomestatementStore',
                model: 'Cashier.model.Incomestatement',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/incomestatement/read',
                        create: 'cashier/incomestatement/create',
                        update: 'cashier/incomestatement/update',
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