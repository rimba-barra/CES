Ext.define('Cashier.store.Jenispinjaman', {
    extend: 'Ext.data.Store',
    alias: 'store.jenispinjamanstore',
    requires: [
        'Cashier.model.Jenispinjaman'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CurrencyStore',
                model: 'Cashier.model.Jenispinjaman',
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
                        idProperty: 'jenis_pinjaman_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getdatajenispinjaman'
                    }
                }
            }, cfg)]);
    }
});