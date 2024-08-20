Ext.define('Hrd.store.Pt', {
    extend: 'Ext.data.Store',
    alias: 'store.ptstore',
    requires: [
        'Hrd.model.Pt'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PtStore',
                model: 'Hrd.model.Pt',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/personal/read'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'pt_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'getpt',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});