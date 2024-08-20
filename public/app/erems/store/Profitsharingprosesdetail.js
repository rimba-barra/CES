Ext.define('Erems.store.Profitsharingprosesdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.profitsharingprosesdetailstore',
    requires: [
        'Erems.model.Profitsharingprosesdetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ProfitsharingprosesdetailStore',
                model: 'Erems.model.Profitsharingprosesdetail',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/profitsharingproses/read',
                        create: 'erems/profitsharingproses/create',
                        update: 'erems/profitsharingproses/update',
                        destroy: 'erems/profitsharingproses/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'profitsharing_detail_id',
                        root: 'data'
                    },
					extraParams: {
						read_type_mode: 'td_profitsharing_detail'
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