Ext.define('Cashier.store.Kategoriloans', {
    extend: 'Ext.data.Store',
    alias: 'store.kategoriloansstore',
    requires: [
        'Cashier.model.Kategoriloans'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CurrencyStore',
                model: 'Cashier.model.Kategoriloans',
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
                        idProperty: 'kategori_loans_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getdatakategoriloans'
                    }
                }
            }, cfg)]);
    }
});