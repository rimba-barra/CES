Ext.define('Cashier.store.Vendorbank2', {
    extend: 'Ext.data.Store',
    alias: 'store.vendorbank2store',
    requires: [
        'Cashier.model.Vendorbank'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'Vendorbank2Store',
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