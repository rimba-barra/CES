Ext.define('Cashier.store.Bankvoucherprefixcombobox', {
    extend: 'Ext.data.Store',
    alias: 'store.bankvoucherprefixcomboboxstore',
    requires: [
        'Cashier.model.Bank'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'BankvoucherprefixcomboboxStore',
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
                        idProperty: 'bank_id'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getbankfromvoucherprefix',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});