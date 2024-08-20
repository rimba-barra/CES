Ext.define('Cashier.store.Financepositionreport', {
    extend: 'Ext.data.Store',
    alias: 'store.financepositionreportstore',
    requires: [
        'Cashier.model.Financepositionreport'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'FinancepositionreportStore',
                model: 'Cashier.model.Financepositionreport',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/financepositionreport/read',
                        create: 'cashier/financepositionreport/create',
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