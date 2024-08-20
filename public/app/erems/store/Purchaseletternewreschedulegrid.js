Ext.define('Erems.store.Purchaseletternewreschedulegrid', {
    extend: 'Ext.data.Store',
    alias: 'store.purchaseletternewreschedulegridstore',
    requires: [
        'Erems.model.Purchaseletternewreschedulegrid'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PurchaseletternewreschedulegridStore',
                model: 'Erems.model.Purchaseletternewreschedulegrid',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/purchaseletterNew/reschedule/read',
                        create: 'erems/purchaseletterNew/reschedule/create',
                        update: 'erems/purchaseletterNew/reschedule/update',
                        destroy: 'erems/purchaseletterNew/reschedule/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'reschedule_id',
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