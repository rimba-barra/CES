Ext.define('Cashier.store.Trialbalanceb', {
    extend: 'Ext.data.Store',
    alias: 'store.trialbalancebstore',
    requires: [
        'Cashier.model.Trialbalanceb'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'trialbalancebStore',
                model: 'Cashier.model.Trialbalanceb',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/trialbalanceb/read',
                        create: 'cashier/trialbalanceb/create',
                        update: 'cashier/trialbalanceb/update',
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