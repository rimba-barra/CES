Ext.define('Cashier.store.Pengeluaranharianreport', {
    extend: 'Ext.data.Store',
    alias: 'store.pengeluaranharianreportstore',
    requires: [
        'Cashier.model.Pengeluaranharianreport'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PengeluaranharianreportStore',
                model: 'Cashier.model.Pengeluaranharianreport',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/pengeluaranharianreport/read',
                        create: 'cashier/pengeluaranharianreport/create',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'sub_coa_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    }
                }
            }, cfg)]);
    }
});