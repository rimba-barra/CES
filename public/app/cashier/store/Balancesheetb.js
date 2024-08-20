Ext.define('Cashier.store.Balancesheetb', {
    extend: 'Ext.data.Store',
    alias: 'store.balancesheetbstore',
    requires: [
        'Cashier.model.Balancesheetb'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BalancesheetbStore',
                model: 'Cashier.model.Balancesheetb',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/balancesheetb/read',
                        create: 'cashier/balancesheetb/create',
                        update: 'cashier/balancesheetb/update',
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