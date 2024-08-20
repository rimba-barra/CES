Ext.define('Erems.store.Sourcemoney', {
    extend: 'Ext.data.Store',
    alias: 'store.sourcemoneystore',
    requires: [
        'Erems.model.Sourcemoney'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SourcemoneyStore',
                model: 'Erems.model.Sourcemoney',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST'
                    },
                    api: {
                        read: 'erems/sourcemoney/read'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'sourcemoney_id',
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