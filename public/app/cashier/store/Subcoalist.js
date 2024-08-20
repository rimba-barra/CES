Ext.define('Cashier.store.Subcoalist', {
    extend: 'Ext.data.Store',
    alias: 'store.subcoaliststore',
    requires: [
        'Cashier.model.Subcoalist'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SubcoalistStore',
                model: 'Cashier.model.Subcoalist',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/subcoalist/read',
                        create: 'cashier/subcoalist/create',
                        update: 'cashier/subcoalist/update',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'from_coa_id',
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