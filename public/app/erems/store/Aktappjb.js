Ext.define('Erems.store.Aktappjb', {
    extend: 'Ext.data.Store',
    alias: 'store.aktappjbstore',
    requires: [
        'Erems.model.Aktappjb'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'AktappjbStore',
                model: 'Erems.model.Aktappjb',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/aktappjb/read',
                        create: 'erems/aktappjb/create',
                        update: 'erems/aktappjb/update',
                        destroy: 'erems/aktappjb/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'aktappjb_id',
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