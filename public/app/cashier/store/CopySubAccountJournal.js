Ext.define('Cashier.store.CopySubAccountJournal', {
    extend: 'Ext.data.Store',
    alias: 'store.copysubaccountjournalstore',
    requires: [
        'Cashier.model.CopySubAccountJournal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CopySubAccountJournalStore',
                model: 'Cashier.model.CopySubAccountJournal',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/journal/subaccountjournalread',
                        create: 'cashier/journal/subaccountjournalcreate',
                        update: 'cashier/journal/subaccountjournalupdate',
                        destroy: 'cashier/journal/subaccountjournaldelete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'journalsubdetail_id',
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