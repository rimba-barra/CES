Ext.define('Cashier.store.Revenuesharinglookup', {
    extend: 'Ext.data.Store',
    alias: 'store.revenuesharinglookupstore',
    requires: [
        'Cashier.model.Revenuesharinglookup'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'RevenuesharinglookupStore',
                model: 'Cashier.model.Revenuesharinglookup',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/revenuesharing/read',
                        create: 'cashier/revenuesharing/create',
                        update: 'cashier/revenuesharing/update',
                        destroy: 'cashier/revenuesharing/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'revenuesharing_detail_id',
                        root: 'data'
                    },
					extraParams: {
						mode: 'lookup'
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
