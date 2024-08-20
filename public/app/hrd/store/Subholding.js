Ext.define('Hrd.store.Subholding', {
    extend: 'Ext.data.Store',
    alias: 'store.subholdingstore',
    requires: [
        'Hrd.model.Subholding'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SubholdingStore',
                model: 'Hrd.model.Subholding',
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
                        idProperty: 'subholding_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'getsubholding',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});