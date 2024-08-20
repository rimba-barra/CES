Ext.define('Cashier.store.Vendor', {
    extend  : 'Ext.data.Store',
    alias   : 'store.vendorstore',
    requires: [
        'Cashier.model.Vendor'
    ],
    constructor: function (cfg) {
        var me  = this;
            cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VendorStore',
                model  : 'Cashier.model.Vendor',
                sorters: [
                    {property: 'vendorcode', direction: 'DESC'}
                ],
                proxy: {
                    type         : 'ajax',
                    timeout      : 45000000,
                    actionMethods: {
                        read   : 'POST',
                        create : 'POST',
                        update : 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read   : 'cashier/vendor/read',
                        create : 'cashier/vendor/create',
                        update : 'cashier/vendor/update',
                        destroy: 'cashier/vendor/delete'
                    },
                    reader: {
                        type         : 'json',
                        root         : 'data',
                        idProperty   : 'vendor_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type  : 'json',
                        encode: true,
                        root  : 'data'
                    },
                    extraParams: {
                        hideparam: 'default'
                    }
                },
               
            }, cfg)]);
    }
});