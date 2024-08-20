Ext.define('Erems.store.Discountcollection', {
    extend: 'Ext.data.Store',
    alias: 'store.discountcollectionstore',
    requires: [
        'Erems.model.Discountcollection'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'DiscountcollectionStore',
                model: 'Erems.model.Discountcollection',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/discountcollection/read',
                        create: 'erems/discountcollection/create',
                        update: 'erems/discountcollection/update',
                        destroy: 'erems/discountcollection/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'purchaseletter_id',
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