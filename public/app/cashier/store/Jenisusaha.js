Ext.define('Cashier.store.Jenisusaha', {
    extend: 'Ext.data.Store',
    alias: 'store.jenisusahastore',
    requires: [
        'Cashier.model.Jenisusaha'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'JenisusahaStore',
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
                        read: 'cashier/jenisusaha/read',
                        create: 'cashier/jenisusaha/create',
                        update: 'cashier/jenisusaha/update',
                        destroy: 'cashier/jenisusaha/delete'
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
                        hideparam: 'default'
                    }
                }
            }, cfg)]);
    }
});