Ext.define('Cashier.store.CopyAccountJournal', {
    extend: 'Ext.data.Store',
    alias: 'store.copyaccountjournalstore',
    requires: [
        'Cashier.model.CopyAccountJournal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CopyAccountJournalStore',
                model: 'Cashier.model.CopyAccountJournal',               
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/copyjournal/accountjournalread',
                        create: 'cashier/copyjournal/accountjournalcreate',
                        update: 'cashier/copyjournal/accountjournalupdate',
                        destroy: 'cashier/copyjournal/accountjournaldelete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'journaldetail_id_acc',
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