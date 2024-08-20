Ext.define('Erems.store.Revenuesharingprosesdate', {
    extend: 'Ext.data.Store',
    alias: 'store.revenuesharingprosesdatestore',
    requires: [
        'Erems.model.Revenuesharingprosesdate'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'RevenuesharingprosesdateStore',
                model: 'Erems.model.Revenuesharingprosesdate',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/revenuesharingproses/read',
                        create: 'erems/revenuesharingproses/create',
                        update: 'erems/revenuesharingproses/update',
                        destroy: 'erems/revenuesharingproses/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'revenuesharing_id',
                        root: 'data'
                    },
					extraParams: {
						read_type_mode: 'th_revenuesharing'
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