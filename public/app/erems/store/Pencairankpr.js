Ext.define('Erems.store.Pencairankpr', {
    extend: 'Ext.data.Store',
    alias: 'store.pencairankprstore',
    requires: [
        'Erems.model.Pencairankpr'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PencairankprStore',
                model: 'Erems.model.Pencairankpr',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/pencairankpr/read',
                        create: 'erems/pencairankpr/create',
                        update: 'erems/pencairankpr/update',
                        destroy: 'erems/pencairankpr/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletter_pencairankpr_id',
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