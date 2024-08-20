Ext.define('Erems.store.CancellationSchedule', {
    extend: 'Ext.data.Store',
    alias: 'store.cancellationschedulestore',
    requires: [
        'Erems.model.CancellationSchedule'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CancellationScheduleStore',
                model: 'Erems.model.CancellationSchedule',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/cancellation/read',
                        create: 'erems/cancellation/create',
                        update: 'erems/cancellation/update',
                        destroy: 'erems/cancellation/delete'
                    },
                    extraParams: {
                        read_type_mode: 'schedule'
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