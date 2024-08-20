Ext.define('Hrd.store.Alokasibiaya', {
    extend: 'Ext.data.Store',
    alias: 'store.alokasibiayastore',
    requires: [
        'Hrd.model.Alokasibiaya'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'AlokasibiayaStore',
                model: 'Hrd.model.Alokasibiaya',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/common/read',
                        create: 'hrd/common/create',
                        update: 'hrd/common/update',
                        destroy: 'hrd/common/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'alokasibiaya_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'getalokasibiaya'
                    }
                }
            }, cfg)]);
    }
});