Ext.define('Cashier.store.Rewardcombo', {
    extend  : 'Ext.data.Store',
    alias   : 'store.rewardcombostore',
    requires: [
        'Cashier.model.Reward'
    ],
    constructor: function (cfg) {
        var me  = this;
            cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'RewardcomboStore',
                model  : 'Cashier.model.Reward',
                sorters: [
                    {property: 'purchaseletter_reward_id', direction: 'DESC'}
                ],
                proxy: {
                    type         : 'ajax',
                    timeout      : 45000000,
                    actionMethods: {
                        read   : 'POST',
                        create : 'POST',
                        update : 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read   : 'cashier/common/read',
                        create : 'cashier/common/create',
                        update : 'cashier/common/update',
                        destroy: 'cashier/common/delete'
                    },
                    reader: {
                        type         : 'json',
                        root         : 'data',
                        idProperty   : 'purchaseletter_reward_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type  : 'json',
                        encode: true,
                        root  : 'data'
                    },
                    extraParams: {
                        hideparam               : 'getreward',
                        project_id              : 0,
                        pt_id                   : 0,
                        purchaseletter_reward_id: 0
                    }
                }
            }, cfg)]);
    }
});