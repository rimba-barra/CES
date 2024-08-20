Ext.define('Erems.store.Suratperingatandetail', {
    extend: 'Ext.data.Store',
    alias: 'store.suratperingatandetailstore',
    requires: [
        'Erems.model.Suratperingatandetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SuratperingatandetailStore',
                model: 'Erems.model.Suratperingatandetail',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/suratperingatan/read',
                        create: 'erems/suratperingatan/create',
                        update: 'erems/suratperingatan/update',
                        destroy: 'erems/suratperingatan/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'schedule_id',
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