Ext.define('Cashier.store.Incomestatementconsolidation', {
    extend: 'Ext.data.Store',
    alias: 'store.incomestatementconsolidationstore',
    requires: [
        'Cashier.model.Incomestatementconsolidation'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'incomestatementconsolidationStore',
                model: 'Cashier.model.Incomestatementconsolidation',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/incomestatementconsolidation/read',
                        create: 'cashier/incomestatementconsolidation/create',
                        update: 'cashier/incomestatementconsolidation/update',
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