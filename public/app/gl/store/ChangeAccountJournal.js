Ext.define('Gl.store.ChangeAccountJournal', {
    extend: 'Ext.data.Store',
    alias: 'store.changeaccountjournalstore',
    requires: [
        'Gl.model.ChangeAccountJournal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ChangeAccountJournalStore',
                model: 'Gl.model.ChangeAccountJournal',               
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/journal/accountjournalread',
                        create: 'gl/journal/accountjournalcreate',
                        update: 'gl/journal/accountjournalupdate',
                        destroy: 'gl/journal/accountjournaldelete'
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