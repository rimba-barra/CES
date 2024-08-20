Ext.define('Gl.store.KoreksiSubAccountJournal', {
    extend: 'Ext.data.Store',
    alias: 'store.koreksisubaccountjournalstore',
    requires: [
        'Gl.model.KoreksiSubAccountJournal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KoreksiSubAccountJournalStore',
                model: 'Gl.model.KoreksiSubAccountJournal',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/koreksisetelahposting/subaccountjournalread',
                        create: 'gl/koreksisetelahposting/subaccountjournalcreate',
                        update: 'gl/koreksisetelahposting/subaccountjournalupdate',
                        destroy: 'gl/koreksisetelahposting/subaccountjournaldelete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'k_journalsubdetail_id',
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