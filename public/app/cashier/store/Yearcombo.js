Ext.define('Cashier.store.Yearcombo', {
    extend: 'Ext.data.Store',
    alias: 'store.yearcombostore',
    requires: [
        'Cashier.model.Yearcombo'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'YearcomboStore',
                model: 'Cashier.model.Yearcombo',
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
                        read: 'cashier/reportparam/read',
                        create: 'cashier/reportparam/create',
                        update: 'cashier/reportparam/update',
                        destroy: 'cashier/reportparam/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'voucher_no',
                        root: 'data',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'yearlist'
                    }
                }
            }, cfg)]);
    }
});