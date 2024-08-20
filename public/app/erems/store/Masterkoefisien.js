Ext.define('Erems.store.Masterkoefisien', {
    extend: 'Ext.data.Store',
    alias: 'store.masterkoefisienstore',
    requires: [
        'Erems.model.Masterkoefisien'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterkoefisienStore',
                model: 'Erems.model.Masterkoefisien',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterkoefisien/read',
                        create: 'erems/masterkoefisien/create',
                        update: 'erems/masterkoefisien/update',
                        destroy: 'erems/masterkoefisien/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'koefisien_id',
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