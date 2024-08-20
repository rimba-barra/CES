Ext.define('Cashier.store.Purchaseletterdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.purchaseletterdetailstore',
    requires: [
        'Cashier.model.Purchaseletterdetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PurchaseletterdetailStore',
                model: 'Cashier.model.Purchaseletterdetail',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/purchaselettertb/read',
                        create: 'cashier/purchaseletter/create',
                        update: 'cashier/purchaseletter/update',
                        destroy: 'cashier/purchaseletter/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletter_id',
                        root: 'data'
                    },
					extraParams: {
						requestor_code: ''
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