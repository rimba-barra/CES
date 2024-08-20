Ext.define('Erems.store.Masterpricelistdetail', {
    extend: 'Ext.data.Store',
    alias: 'store.masterpricelistdetailstore',
    requires: [
        'Erems.model.Masterpricelistdetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterpricelistdetailStore',
                model: 'Erems.model.Masterpricelistdetail',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterpricelist/read',
                        create: 'erems/masterpricelist/create',
                        update: 'erems/masterpricelist/update',
                        destroy: 'erems/masterpricelist/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'pricelist_id',
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