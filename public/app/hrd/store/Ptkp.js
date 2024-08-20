Ext.define('Hrd.store.Ptkp', {
    extend: 'Ext.data.Store',
    alias: 'store.ptkpstore',
    requires: [
        'Hrd.model.Ptkp'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PtkpStore',
                model: 'Hrd.model.Ptkp',
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
                        idProperty: 'ptkp_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'getptkp'
                    }
                }
            }, cfg)]);
    }
});