Ext.define('Cashier.store.Cashflow', {
    extend: 'Ext.data.Store',
    alias: 'store.cashflowstore',
    requires: [
        'Cashier.model.Cashflow'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CashflowStore',
                model: 'Cashier.model.Cashflow',
                sorters: [
                            { property: 'cashflowtype',direction: 'ASC'}                       
                        ],
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
                        read: 'cashier/common/read',
                        create: 'cashier/common/create',
                        update: 'cashier/common/update',
                        destroy: 'cashier/common/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'setupcashflow_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getsetupcashflow'
                    }
                }
            }, cfg)]);
    }
});