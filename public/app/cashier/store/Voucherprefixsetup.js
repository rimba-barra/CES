Ext.define('Cashier.store.Voucherprefixsetup', {
    extend: 'Ext.data.Store',
    alias: 'store.voucherprefixsetupstore',
    requires: [
        'Cashier.model.Voucherprefixsetup'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'VoucherprefixsetupStore',
                model: 'Cashier.model.Voucherprefixsetup',
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
                        read: 'cashier/voucherprefixsetup/read',
                        create: 'cashier/voucherprefixsetup/create',
                        update: 'cashier/voucherprefixsetup/update',
                        destroy: 'cashier/voucherprefixsetup/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'voucherprefix_id',
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