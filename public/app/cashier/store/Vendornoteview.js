Ext.define('Cashier.store.Vendornoteview', {
    extend: 'Ext.data.Store',
    alias: 'store.vendornoteviewstore',
    requires: [
        'Cashier.model.Vendornote'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VendornoteviewStore',
                model: 'Cashier.model.Vendornote',
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
