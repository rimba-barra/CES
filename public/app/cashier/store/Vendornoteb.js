Ext.define('Cashier.store.Vendornoteb', {
    extend: 'Ext.data.Store',
    alias: 'store.vendornotestore',
    requires: [
        'Cashier.model.Vendornoteb'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VendornotebStore',
                model: 'Cashier.model.Vendornoteb',
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
                        read: 'cashier/vendor/vendornoteread',
                        create: 'cashier/vendor/vendornotecreate',
                        update: 'cashier/vendor/vendornoteupdate',
                        destroy: 'cashier/vendor/vendornotedelete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'vendornote_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default',
                    },
                }
            }, cfg)]);
    }
});
