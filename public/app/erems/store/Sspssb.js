Ext.define('Erems.store.Sspssb', {
    extend: 'Ext.data.Store',
    alias: 'store.sspssbstore',
    requires: [
        'Erems.model.Sspssb'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SspssbStore',
                model: 'Erems.model.Sspssb',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/sspssb/read',
                        create: 'erems/sspssb/create',
                        update: 'erems/sspssb/update',
                        destroy: 'erems/sspssb/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'sspssb_id',
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