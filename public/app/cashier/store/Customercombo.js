Ext.define('Cashier.store.Customercombo', {
    extend: 'Ext.data.Store',
    alias: 'store.customercombostore',
    requires: [
        'Cashier.model.Customer'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CustomercomboStore',
                model: 'Cashier.model.Customer',
                sorters: [
                    {property: 'customer_len', direction: 'ASC'}
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
                        idProperty: 'customer_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getcustomer',
                        project_id: 0,
                        pt_id: 0,
                    }
                }
            }, cfg)]);
    }
});