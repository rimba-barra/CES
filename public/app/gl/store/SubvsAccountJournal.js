Ext.define('Gl.store.SubvsAccountJournal', {
    extend: 'Ext.data.Store',
    alias: 'store.subvsaccountjournalstore',
    requires: [
        'Gl.model.SubvsAccountJournal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SubvsAccountJournalStore',
                model: 'Gl.model.SubvsAccountJournal',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/journal/read',
                        create: 'gl/journal/create',
                        update: 'gl/journal/update',
                        destroy: 'gl/journal/delete'
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