Ext.define('Cashier.store.Trialbalance', {
    extend: 'Ext.data.Store',
    alias: 'store.trialbalancestore',
    requires: [
        'Cashier.model.Trialbalance'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TrialbalanceStore',
                model: 'Cashier.model.Trialbalance',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/trialbalance/read',
                        create: 'cashier/trialbalance/create',
                        update: 'cashier/trialbalance/update',
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