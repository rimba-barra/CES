Ext.define('Gl.store.AccountvsSubSubAccountJournal', {
    extend: 'Ext.data.Store',
    alias: 'store.accountvssubsubaccountjournalstore',
    requires: [
        'Gl.model.AccountvsSubSubAccountJournal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'AccountvsSubSubAccountJournalStore',
                model: 'Gl.model.AccountvsSubSubAccountJournal',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/journal/subaccountjournalread',
                        create: 'gl/journal/subaccountjournalcreate',
                        update: 'gl/journal/subaccountjournalupdate',
                        destroy: 'gl/journal/subaccountjournaldelete'
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