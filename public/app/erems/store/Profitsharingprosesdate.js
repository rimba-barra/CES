Ext.define('Erems.store.Profitsharingprosesdate', {
    extend: 'Ext.data.Store',
    alias: 'store.profitsharingprosesdatestore',
    requires: [
        'Erems.model.Profitsharingprosesdate'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ProfitsharingprosesdateStore',
                model: 'Erems.model.Profitsharingprosesdate',
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
                        idProperty: 'profitsharing_id',
                        root: 'data'
                    },
					extraParams: {
						read_type_mode: 'th_profitsharing'
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