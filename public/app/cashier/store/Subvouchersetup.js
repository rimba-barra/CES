Ext.define('Cashier.store.Subvouchersetup', {
    extend: 'Ext.data.Store',
    alias: 'store.subvouchersetupstore',
    requires: [
        'Cashier.model.Subvouchersetup'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SubvouchersetupStore',
                model: 'Cashier.model.Subvouchersetup',
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
                        read: 'cashier/subvouchersetup/read',
                        create: 'cashier/subvouchersetup/create',
                        update: 'cashier/subvouchersetup/update',
                        destroy: 'cashier/subvouchersetup/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'subvoucher_id',
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