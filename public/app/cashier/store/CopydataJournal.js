Ext.define('Cashier.store.CopydataJournal', {
    extend: 'Ext.data.Store',
    alias: 'store.copyjournalstore',
    requires: [
        'Cashier.model.CopydataJournal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CopydataJournalStore',
                model: 'Cashier.model.CopydataJournal',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/copyjournal/read',
                        create: 'cashier/copyjournal/create',
                        update: 'cashier/copyjournal/update',
                        destroy: 'cashier/copyjournal/delete'
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