Ext.define('Erems.store.Suratperingatanschedule', {
    extend: 'Ext.data.Store',
    alias: 'store.suratperingatanschedulestore',
    requires: [
        'Erems.model.Suratperingatanschedule'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SuratperingatanscheduleStore',
                model: 'Erems.model.Suratperingatanschedule',
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