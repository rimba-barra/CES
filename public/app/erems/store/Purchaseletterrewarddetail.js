Ext.define('Erems.store.Purchaseletterrewarddetail', {
    extend: 'Ext.data.Store',
    alias: 'store.purchaseletterrewarddetailstore',
    requires: [
        'Erems.model.Purchaseletterrewarddetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'PurchaseletterrewarddetailStore',
            model: 'Erems.model.Purchaseletterrewarddetail',
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
                    create: 'erems/purchaseletterreward/create',
                    update: 'erems/purchaseletterreward/update',
                    destroy: 'erems/purchaseletterreward/delete'
                },
                reader: {
                    type: 'json',
                    idProperty: 'purchaseletter_reward_id',
                    root: 'data'
                },
                extraParams: {
                    mode_read: 'detail_grid'
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