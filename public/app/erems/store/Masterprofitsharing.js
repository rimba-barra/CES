Ext.define('Erems.store.Masterprofitsharing', {
    extend: 'Ext.data.Store',
    alias: 'store.masterprofitsharingstore',
    requires: [
        'Erems.model.Masterprofitsharing'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterprofitsharingStore',
                model: 'Erems.model.Masterprofitsharing',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterprofitsharing/read',
                        create: 'erems/masterprofitsharing/create',
                        update: 'erems/masterprofitsharing/update',
                        destroy: 'erems/masterprofitsharing/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'profitsharing_id',
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