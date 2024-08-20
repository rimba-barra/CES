Ext.define('Erems.store.Masterblock', {
    extend: 'Ext.data.Store',
    alias: 'store.masterblockstore',
    requires: [
        'Erems.model.Masterblock'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterblockStore',
                model: 'Erems.model.Masterblock',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterblock/read',
                        create: 'erems/masterblock/create',
                        update: 'erems/masterblock/update',
                        destroy: 'erems/masterblock/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'block_id',
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