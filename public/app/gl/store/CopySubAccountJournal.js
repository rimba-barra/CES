Ext.define('Gl.store.CopySubAccountJournal', {
    extend: 'Ext.data.Store',
    alias: 'store.copysubaccountjournalstore',
    requires: [
        'Gl.model.CopySubAccountJournal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CopySubAccountJournalStore',
                model: 'Gl.model.CopySubAccountJournal',
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