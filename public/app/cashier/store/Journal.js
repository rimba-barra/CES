Ext.define('Cashier.store.Journal', {
    extend: 'Ext.data.Store',
    alias: 'store.journalstore',
    requires: [
        'Cashier.model.Journal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'JournalStore',
                model: 'Cashier.model.Journal',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/journal/read',
                        create: 'cashier/journal/create',
                        update: 'cashier/journal/update',
                        destroy: 'cashier/journal/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'journal_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default'
                    }
                }
            }, cfg)]);
    }
});