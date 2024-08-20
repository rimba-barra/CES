Ext.define('Erems.store.Skl', {
    extend: 'Ext.data.Store',
    alias: 'store.sklstore',
    requires: [
        'Erems.model.Skl'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SklStore',
                model: 'Erems.model.Skl',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/skl/read',
                        create: 'erems/skl/create',
                        update: 'erems/skl/update',
                        destroy: 'erems/skl/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'skl_id',
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