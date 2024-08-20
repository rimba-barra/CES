Ext.define('Cashier.store.Bank', {
    extend: 'Ext.data.Store',
    alias: 'store.bankstore',
    requires: [
        'Cashier.model.Bank'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BankComboStore',
                model: 'Cashier.model.Bank',
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
                        idProperty: 'bank_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getbank',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});