Ext.define('Erems.store.Notifikasiuser', {
    extend: 'Ext.data.Store',
    alias: 'store.notifikasiuserstore',
    requires: [
        'Erems.model.Notifikasiuser'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'NotifikasiuserStore',
                model: 'Erems.model.Notifikasiuser',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/notifikasiuser/read',
                        create: 'erems/notifikasiuser/create',
                        update: 'erems/notifikasiuser/update',
                        destroy: 'erems/notifikasiuser/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'notifikasi_user_id',
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