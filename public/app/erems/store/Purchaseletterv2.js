Ext.define('Erems.store.Purchaseletterv2', {
    extend: 'Ext.data.Store',
    alias: 'store.purchaseletterstorev2',
    requires: [
        'Erems.model.Purchaseletter'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'Purchaseletterv2Store',
                model: 'Erems.model.Purchaseletter',
                proxy: {
					timeout: 60000*5,
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
						requestor_code: 'pl__tb'
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