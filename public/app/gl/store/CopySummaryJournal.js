Ext.define('Gl.store.CopySummaryJournal', {
    extend: 'Ext.data.Store',
    alias: 'store.copysummaryjournalstore',
    requires: [
        'Gl.model.CopySummaryJournal'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CopySummaryJournalStore',
                model: 'Gl.model.Journal',
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