Ext.define('Cashier.store.Vendorbankview', {
    extend: 'Ext.data.Store',
    alias: 'store.vendorbankviewstore',
    requires: [
        'Cashier.model.Vendorbank'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VendorbankviewStore',
                model: 'Cashier.model.Vendorbank',
                sorters: [
                    {property: 'seq_no', direction: 'ASC'}
                ],
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
                        read: 'cashier/vendor/vendorbankread',
                        create: 'cashier/vendor/vendorbankcreate',
                        update: 'cashier/vendor/vendorbankupdate',
                        destroy: 'cashier/vendor/vendorbankdelete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'vendor_bankacc_id'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default'
                    }
                },
               
            }, cfg)]);
    }
});