Ext.define('Erems.store.Masterutilitystatus', {
    extend: 'Ext.data.Store',
    alias: 'store.masterutilitystatusstore',
    requires: [
        'Erems.model.Masterutilitystatus'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterutilitystatusStore',
                model: 'Erems.model.Masterutilitystatus',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterutilitystatus/read',
                        create: 'erems/masterutilitystatus/create',
                        update: 'erems/masterutilitystatus/update',
                        destroy: 'erems/masterutilitystatus/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'utilitystatus_id',
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