Ext.define('Cashier.store.Cashflowsetupcombobox', {
    extend: 'Ext.data.Store',
    alias: 'store.cashflowsetupcombobox',
    requires: [
        'Cashier.model.Cashflowsetupcombobox'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CashflowsetupcomboboxStore',
                model: 'Cashier.model.Cashflowsetupcombobox',
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
                        read: 'cashier/common/read'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'setupcashflowdetail_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams:{
                        hideparam :'cashflowsetupcombobox',
                        start :0,
                        limit :1000,
                    }
                }
            }, cfg)]);
    }
});