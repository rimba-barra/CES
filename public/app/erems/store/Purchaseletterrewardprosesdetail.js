Ext.define('Erems.store.Purchaseletterrewardprosesdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.purchaseletterrewardprosesdetailstore',
    requires: [
        'Erems.model.Purchaseletterrewardprosesdetail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'PurchaseletterrewardprosesdetailStore',
            model: 'Erems.model.Purchaseletterrewardprosesdetail',
            proxy: {
                type: 'ajax',
                actionMethods: {
                    read: 'POST',
                    create: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                api: {
                    read: 'erems/purchaseletterrewardproses/read',
                    create: 'erems/purchaseletterrewardproses/create',
                    update: 'erems/purchaseletterrewardproses/update',
                    destroy: 'erems/purchaseletterrewardproses/delete'
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