Ext.define('Erems.store.Pengumpulanberkasspr', {
    extend: 'Ext.data.Store',
    alias: 'store.pengumpulanberkassprstore',
    requires: [
        'Erems.model.Pengumpulanberkas'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PengumpulanberkassprStore',
                model: 'Erems.model.Pengumpulanberkas',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/pengumpulanberkas/read',
                        create: 'erems/pengumpulanberkas/create',
                        update: 'erems/pengumpulanberkas/update',
                        destroy: 'erems/pengumpulanberkas/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'berkas_spr_id',
                        root: 'data'
                        
                    },
//                    extraParams: {
//			mode_read: 'load_spr'			
//                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    }
                }
            }, cfg)]);
    }
});