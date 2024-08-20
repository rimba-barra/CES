Ext.define('Erems.store.Purchaseletternewreschedulemaingrid', {
    extend: 'Ext.data.Store',
    alias: 'store.purchaseletternewreschedulemaingridstore',
    requires: [
        'Erems.model.Purchaseletternewreschedulemaingrid'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PurchaseletternewreschedulemaingridStore',
                model: 'Erems.model.Purchaseletternewreschedulemaingrid',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/purchaseletterNew/reschedulemain/read',
                        create: 'erems/purchaseletterNew/reschedulemain/create',
                        update: 'erems/purchaseletterNew/reschedulemain/update',
                        destroy: 'erems/purchaseletterNew/reschedulemain/delete'
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