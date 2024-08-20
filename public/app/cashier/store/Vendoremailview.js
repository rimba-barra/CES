Ext.define('Cashier.store.Vendoremailview', {
    extend: 'Ext.data.Store',
    alias: 'store.vendoremailviewstore',
    requires: [
        'Cashier.model.Vendoremail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VendoremailviewStore',
                model: 'Cashier.model.Vendoremail',
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
                        read: 'cashier/vendor/vendoremailread',
                        create: 'cashier/vendor/vendoremailcreate',
                        update: 'cashier/vendor/vendoremailupdate',
                        destroy: 'cashier/vendor/vendoremaildelete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'vendor_email_id'
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