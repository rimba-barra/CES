Ext.define('Gl.store.KspJournal', {
    extend: 'Ext.data.Store',
    alias: 'store.kspjournalstore',
    requires: [
        'Gl.model.KspJournal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KspJournalStore',
                model: 'Gl.model.KspJournal',
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