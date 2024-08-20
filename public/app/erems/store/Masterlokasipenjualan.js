Ext.define('Erems.store.Masterlokasipenjualan', {
    extend: 'Ext.data.Store',
    alias: 'store.masterlokasipenjualanstore',
    requires: [
        'Erems.model.Masterlokasipenjualan'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterlokasipenjualanStore',
                model: 'Erems.model.Masterlokasipenjualan',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'erems/masterlokasipenjualan/read',
                        create: 'erems/masterlokasipenjualan/create',
                        update: 'erems/masterlokasipenjualan/update',
                        destroy: 'erems/masterlokasipenjualan/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'saleslocation_id',
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