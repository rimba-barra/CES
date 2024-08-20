Ext.define('Erems.store.Klaimkomisinew', {
    extend: 'Ext.data.Store',
    alias: 'store.klaimkomisinewstore',
    requires: [
        'Erems.model.Klaimkomisinew'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KlaimkomisinewStore',
                model: 'Erems.model.Klaimkomisinew',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/klaimkomisinew/read',
                        create: 'erems/klaimkomisinew/create',
                        update: 'erems/klaimkomisinew/update',
                        destroy: 'erems/klaimkomisinew/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'komisi_permintaan_id',
                        root: 'data'
                    },
//                    extraParams: {
//			mode_read: ''
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