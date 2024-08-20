Ext.define('Erems.store.Masterbankkpr', {
    extend: 'Ext.data.Store',
    alias: 'store.masterbankkprstore',
    requires: [
        'Erems.model.Masterbankkpr'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterbankkprStore',
                model: 'Erems.model.Masterbankkpr',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterbankkpr/read',
                        create: 'erems/masterbankkpr/create',
                        update: 'erems/masterbankkpr/update',
                        destroy: 'erems/masterbankkpr/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'bankkpr_id',
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