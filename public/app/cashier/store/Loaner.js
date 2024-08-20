Ext.define('Cashier.store.Loaner', {
    extend: 'Ext.data.Store',
    alias: 'store.loanerstore',
    requires: [
        'Cashier.model.Loaner'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'LoanerStore',
                model: 'Cashier.model.Loaner',
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
                        read: 'cashier/loaner/read',
                        create: 'cashier/loaner/create',
                        update: 'cashier/loaner/update',
                        destroy: 'cashier/loaner/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'loaner_id',
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