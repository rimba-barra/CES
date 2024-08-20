Ext.define('Cashier.store.Kasbondeptextend', {
    extend: 'Ext.data.Store',
    alias: 'store.kasbondeptextendstore',
    requires: [
        'Cashier.model.Kasbondeptextend'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KasbondeptextendStore',
                model: 'Cashier.model.Kasbondeptextend',
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
                        read: 'cashier/kasbondeptextend/read',
                        create: 'cashier/kasbondeptextend/create',
                        update: 'cashier/kasbondeptextend/update',
                        destroy: 'cashier/kasbondeptextend/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'kasbon_extension_id',
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