Ext.define('Erems.store.Masterposisi', {
    extend: 'Ext.data.Store',
    alias: 'store.masterposisistore',
    requires: [
        'Erems.model.Masterposisi'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterposisiStore',
                model: 'Erems.model.Masterposisi',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterposisi/read',
                        create: 'erems/masterposisi/create',
                        update: 'erems/masterposisi/update',
                        destroy: 'erems/masterposisi/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'position_id',
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