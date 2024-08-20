Ext.define('Erems.store.Reward', {
    extend: 'Ext.data.Store',
    alias: 'store.rewardstore',
    requires: [
        'Erems.model.Reward'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'RewardStore',
                model: 'Erems.model.Reward',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/reward/read',
                        create: 'erems/reward/create',
                        update: 'erems/reward/update',
                        destroy: 'erems/reward/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletter_id',
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