Ext.define('Cashier.store.Copyjournal', {
    extend: 'Ext.data.Store',
    alias: 'store.copyjournalstore',
    requires: [
        'Cashier.model.Copyjournal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CopyjournalStore',
                model: 'Cashier.model.Copyjournal',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/copyjournal/read',
                        create: 'cashier/copyjournal/create',
                        update: 'cashier/copyjournal/update',
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