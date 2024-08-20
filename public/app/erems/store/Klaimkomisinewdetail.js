Ext.define('Erems.store.Klaimkomisinewdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.klaimkomisinewdetailstore',
    requires: [
        'Erems.model.Klaimkomisinewdetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KlaimkomisinewdetailStore',
                model: 'Erems.model.Klaimkomisinewdetail',
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
                        idProperty: 'komisi_klaim_id',
                        root: 'data'
                    },
                    extraParams: {
			mode_read: 'detail_grid'
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