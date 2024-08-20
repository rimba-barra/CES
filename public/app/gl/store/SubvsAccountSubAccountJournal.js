Ext.define('Gl.store.SubvsAccountSubAccountJournal', {
    extend: 'Ext.data.Store',
    alias: 'store.subvsaccountsubaccountjournalstore',
    requires: [
        'Gl.model.SubvsAccountSubAccountJournal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SubvsAccountSubAccountJournalStore',
                model: 'Gl.model.SubvsAccountSubAccountJournal',
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