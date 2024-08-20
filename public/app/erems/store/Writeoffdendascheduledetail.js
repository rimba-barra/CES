Ext.define('Erems.store.Writeoffdendascheduledetail', {
    extend: 'Ext.data.Store',
    alias: 'store.writeoffdendascheduledetailstore',
    requires: [
        'Erems.model.Writeoffdendascheduledetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'WriteoffdendascheduledetailStore',
                model: 'Erems.model.Writeoffdendascheduledetail',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/writeoffdenda/readschedule',
                        create: 'erems/writeoffdenda/createschedule',
                        update: 'erems/writeoffdenda/updateschedule',
                        destroy: 'erems/writeoffdenda/deleteschedule'
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