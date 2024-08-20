Ext.define('Gl.store.SubAccountJournal', {
    extend: 'Ext.data.Store',
    alias: 'store.subaccountjournalstore',
    requires: [
        'Gl.model.SubAccountJournal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SubAccountJournalStore',
                model: 'Gl.model.SubAccountJournal',
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