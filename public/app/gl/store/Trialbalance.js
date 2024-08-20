Ext.define('Gl.store.Trialbalance', {
    extend: 'Ext.data.Store',
    alias: 'store.trialbalancestore',
    requires: [
        'Gl.model.Trialbalance'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TrialbalanceStore',
                model: 'Gl.model.Trialbalance',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/trialbalance/read',
                        create: 'gl/trialbalance/create',
                        update: 'gl/trialbalance/update',
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