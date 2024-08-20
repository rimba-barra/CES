Ext.define('Erems.store.Purchaseletterdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.purchaseletterdetailstore',
    requires: [
        'Erems.model.Purchaseletterdetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PurchaseletterdetailStore',
                model: 'Erems.model.Purchaseletterdetail',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/purchaselettertb/read',
                        create: 'erems/purchaseletter/create',
                        update: 'erems/purchaseletter/update',
                        destroy: 'erems/purchaseletter/delete'
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