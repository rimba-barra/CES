Ext.define('Erems.store.Discountcollectionschedule', {
    extend: 'Ext.data.Store',
    alias: 'store.discountcollectionschedulestore',
    requires: [
        'Erems.model.Discountcollectionschedule'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'DiscountcollectionscheduleStore',
                model: 'Erems.model.Discountcollectionschedule',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/discountcollection/readschedule',
                        create: 'erems/discountcollection/createschedule',
                        update: 'erems/discountcollection/updateschedule',
                        destroy: 'erems/discountcollection/deleteschedule'
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