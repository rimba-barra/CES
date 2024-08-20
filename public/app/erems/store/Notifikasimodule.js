Ext.define('Erems.store.Notifikasimodule', {
    extend: 'Ext.data.Store',
    alias: 'store.notifikasimodulestore',
    requires: [
        'Erems.model.Notifikasimodule'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'EmailStore',
                model: 'Erems.model.Notifikasimodule',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST'
                    },
                    api: {
                        read: 'erems/notifikasimodule/read'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'notifikasi_module_id',
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