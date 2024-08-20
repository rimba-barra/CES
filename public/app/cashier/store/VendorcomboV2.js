Ext.define('Cashier.store.VendorcomboV2', {
    extend: 'Ext.data.Store',
    alias: 'store.vendorcomboV2store',
    requires: [
        'Cashier.model.Vendor'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VendorcomboV2Store',
                model: 'Cashier.model.Vendor',
                sorters: [
                    {property: 'vendor_len', direction: 'ASC'}
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
                        read: 'cashier/common/read',
                        create: 'cashier/common/create',
                        update: 'cashier/common/update',
                        destroy: 'cashier/common/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'vendor_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getvendor',
                        project_id: 0,
                        pt_id: 0,
                    }
                }
            }, cfg)]);
    }
});