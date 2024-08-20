Ext.define('Cashier.store.Balancesheetconsolidation', {
    extend: 'Ext.data.Store',
    alias: 'store.balancesheetconsolidationstore',
    requires: [
        'Cashier.model.Balancesheetconsolidation'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'balancesheetconsolidationStore',
                model: 'Cashier.model.Balancesheetconsolidation',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/balancesheetconsolidation/read',
                        create: 'cashier/balancesheetconsolidation/create',
                        update: 'cashier/balancesheetconsolidation/update',
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