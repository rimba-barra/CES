Ext.define('Gl.store.Copyjournal', {
    extend: 'Ext.data.Store',
    alias: 'store.copyjournalstore',
    requires: [
        'Gl.model.Copyjournal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CopyjournalStore',
                model: 'Gl.model.Copyjournal',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'gl/copyjournal/read',
                        create: 'gl/copyjournal/create',
                        update: 'gl/copyjournal/update',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'copy_journal_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    }
                }
            }, cfg)]);
    }
});