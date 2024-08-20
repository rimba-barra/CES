Ext.define('Cashier.store.CopySummaryJournal', {
    extend: 'Ext.data.Store',
    alias: 'store.copysummaryjournalstore',
    requires: [
        'Cashier.model.CopySummaryJournal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CopySummaryJournalStore',
                model: 'Cashier.model.Journal',
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
                        destroy: 'cashier/copyjournal/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'summary_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'summaryjournal'
                    }
                }
            }, cfg)]);
    }
});