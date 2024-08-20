Ext.define('Gl.store.KoreksiJournal', {
    extend: 'Ext.data.Store',
    alias: 'store.koreksijournalstore',
    requires: [
        'Gl.model.KoreksiJournal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KoreksiJournalStore',
                model: 'Gl.model.KoreksiJournal',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/koreksisetelahposting/read',
                        create: 'gl/koreksisetelahposting/create',
                        update: 'gl/koreksisetelahposting/update',
                        destroy: 'gl/koreksisetelahposting/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'k_journal_id',
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