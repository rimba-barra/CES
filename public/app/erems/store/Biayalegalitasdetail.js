
Ext.define('Erems.store.Biayalegalitasdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.biayalegalitasdetailstore',
    requires: [
        'Erems.model.Biayalegalitas'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BiayalegalitasdetailStore',
                model: 'Erems.model.Biayalegalitas',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/biayalegalitas/read',
                        create: 'erems/biayalegalitas/create',
                        update: 'erems/biayalegalitas/update',
                        destroy: 'erems/biayalegalitas/delete'
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