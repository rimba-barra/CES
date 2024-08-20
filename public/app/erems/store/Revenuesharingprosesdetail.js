Ext.define('Erems.store.Revenuesharingprosesdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.revenuesharingprosesdetailstore',
    requires: [
        'Erems.model.Revenuesharingprosesdetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'RevenuesharingprosesdetailStore',
                model: 'Erems.model.Revenuesharingprosesdetail',
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
                        idProperty: 'revenuesharing_detail_id',
                        root: 'data'
                    },
					extraParams: {
						read_type_mode: 'td_revenuesharing_detail'
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