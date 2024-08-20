Ext.define('Erems.store.Complainthistory', {
    extend: 'Ext.data.Store',
    alias: 'store.complainthistorystore',
    requires: [
        'Erems.model.Complainthistory'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ComplainthistoryStore',
                model: 'Erems.model.Complainthistory',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/complaint/history'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'history_rencana_serahterima_id',
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