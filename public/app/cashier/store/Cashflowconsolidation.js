Ext.define('Cashier.store.Cashflowconsolidation', {
    extend: 'Ext.data.Store',
    alias: 'store.cashflowconsolidationstore',
    requires: [
        'Cashier.model.Cashflowconsolidation'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'cashflowconsolidationStore',
                model: 'Cashier.model.Cashflowconsolidation',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/cashflowconsolidation/read',
                        create: 'cashier/cashflowconsolidation/create',
                        update: 'cashier/cashflowconsolidation/update',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'consolidation_id',
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