Ext.define('Erems.store.Mastergaransi', {
    extend: 'Ext.data.Store',
    alias: 'store.mastergaransistore',
    requires: [
        'Erems.model.Mastergaransi'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MastergaransiStore',
                model: 'Erems.model.Mastergaransi',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/mastergaransi/read',
                        create: 'erems/mastergaransi/create',
                        update: 'erems/mastergaransi/update',
                        destroy: 'erems/mastergaransi/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'guaranteetype_id',
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