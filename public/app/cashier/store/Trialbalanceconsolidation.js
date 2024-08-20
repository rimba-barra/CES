Ext.define('Cashier.store.Trialbalanceconsolidation', {
    extend: 'Ext.data.Store',
    alias: 'store.trialbalanceconsolidationstore',
    requires: [
        'Cashier.model.Trialbalanceconsolidation'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'trialbalanceconsolidationStore',
                model: 'Cashier.model.Trialbalanceconsolidation',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/trialbalanceconsolidation/read',
                        create: 'cashier/trialbalanceconsolidation/create',
                        update: 'cashier/trialbalanceconsolidation/update',
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