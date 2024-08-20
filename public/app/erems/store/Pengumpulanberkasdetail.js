Ext.define('Erems.store.Pengumpulanberkasdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.pengumpulanberkasdetailstore',
    requires: [
        'Erems.model.Pengumpulanberkas'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PengumpulanberkasdetailStore',
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
                        idProperty: 'berkas_surat_detail_id',
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