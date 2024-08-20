Ext.define('Erems.store.Bankkpr', {
    extend: 'Ext.data.Store',
    alias: 'store.bankkprstore',
    requires: [
        'Erems.model.Bankkpr'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BankkprStore',
                model: 'Erems.model.Bankkpr',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/bankkpr/read',
                        create: 'erems/bankkpr/create',
                        update: 'erems/bankkpr/update',
                        destroy: 'erems/bankkpr/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletter_bankkpr_id',
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