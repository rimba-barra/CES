Ext.define('Erems.store.Pelunasan', {
    extend: 'Ext.data.Store',
    alias: 'store.pelunasanstore',
    requires: [
        'Erems.model.Pelunasan'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PelunasanStore',
                model: 'Erems.model.Pelunasan',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/pelunasan/read',
                        create: 'erems/pelunasan/create',
                        update: 'erems/pelunasan/update',
                        destroy: 'erems/pelunasan/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletter_id',
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