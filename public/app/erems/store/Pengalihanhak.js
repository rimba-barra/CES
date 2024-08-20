Ext.define('Erems.store.Pengalihanhak', {
    extend: 'Ext.data.Store',
    alias: 'store.pengalihanhakstore',
    requires: [
        'Erems.model.Pengalihanhak'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PengalihanhakStore',
                model: 'Erems.model.Pengalihanhak',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/pengalihanhak/read',
                        create: 'erems/pengalihanhak/create',
                        update: 'erems/pengalihanhak/update',
                        destroy: 'erems/pengalihanhak/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'changeownership_id',
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