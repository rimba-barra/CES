Ext.define('Erems.store.Revenuesharinglookup', {
    extend: 'Ext.data.Store',
    alias: 'store.revenuesharinglookupstore',
    requires: [
        'Erems.model.Revenuesharinglookup'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'RevenuesharinglookupStore',
                model: 'Erems.model.Revenuesharinglookup',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/revenuesharing/read',
                        create: 'erems/revenuesharing/create',
                        update: 'erems/revenuesharing/update',
                        destroy: 'erems/revenuesharing/delete'
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
