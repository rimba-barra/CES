Ext.define('Erems.store.Purchaseletterreward', {
    extend: 'Ext.data.Store',
    alias: 'store.purchaseletterrewardstore',
    requires: [
        'Erems.model.Purchaseletterreward'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'PurchaseletterrewardStore',
            model: 'Erems.model.Purchaseletterreward',
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