Ext.define('Erems.store.Masterpricelistkoefisiengriddetail', {
    extend: 'Ext.data.Store',
    alias: 'store.masterpricelistkoefisiengriddetailstore',
    requires: [
        'Erems.model.Masterpricelistkoefisiengriddetail'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterpricelistkoefisiengriddetailStore',
                model: 'Erems.model.Masterpricelistkoefisiengriddetail',
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
                        idProperty: 'pricelist_koefisiengriddetail_id',
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