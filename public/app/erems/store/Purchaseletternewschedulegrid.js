Ext.define('Erems.store.Purchaseletternewschedulegrid', {
    extend: 'Ext.data.Store',
    alias: 'store.purchaseletternewschedulegridstore',
    requires: [
        'Erems.model.Purchaseletternewschedulegrid'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PurchaseletternewschedulegridStore',
                model: 'Erems.model.Purchaseletternewschedulegrid',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/purchaseletterNew/read',
                        create: 'erems/purchaseletterNew/create',
                        update: 'erems/purchaseletterNew/update',
                        destroy: 'erems/purchaseletterNew/delete'
                    },
                    extraParams: {
                        mode_read: 'detailScheduleOneRead'
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