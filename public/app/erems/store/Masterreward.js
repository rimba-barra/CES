Ext.define('Erems.store.Masterreward', {
    extend: 'Ext.data.Store',
    alias: 'store.masterrewardstore',
    requires: [
        'Erems.model.Masterreward'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'MasterrewardStore',
            model: 'Erems.model.Masterreward',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/purchaseletterreward/read',
                    // create: 'erems/purchaseletterreward/create',
                    // update: 'erems/purchaseletterreward/update',
                    // destroy: 'erems/purchaseletterreward/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'reward_id',
                    root: 'data'
                },
                // extraParams: {
                //     mode_read: 'masterreward'
                // },
                writer: {
                    type: 'json',
                    encode: true,
                    root: 'data'
                }
            }
        }, cfg)]);
    }
});