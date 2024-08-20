Ext.define('Cashier.store.Jenisusahacombo', {
    extend: 'Ext.data.Store',
    alias: 'store.jenisusahastore',
    requires: [
        'Cashier.model.Jenisusaha'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'JenisusahacomboStore',
                model: 'Cashier.model.Jenisusaha',
                proxy: {
                    type: 'ajax',
                    timeout:45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/common/read',
                        create: 'cashier/common/create',
                        update: 'cashier/common/update',
                        destroy: 'cashier/common/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'jenisusaha_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'jenisusaha',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});