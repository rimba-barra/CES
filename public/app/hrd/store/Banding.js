Ext.define('Hrd.store.Banding', {
    extend: 'Ext.data.Store',
    alias: 'store.bandingstore',
    requires: [
        'Hrd.model.Banding'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BandingStore',
                model: 'Hrd.model.Banding',
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
                        idProperty: 'banding_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'getbanding'
                    }
                }
            }, cfg)]);
    }
});