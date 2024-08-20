Ext.define('Cashier.store.Tloan', {
    extend: 'Ext.data.Store',
    alias: 'store.tloanstore',
    requires: [
        'Cashier.model.Tloan'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TloanStore',
                model: 'Cashier.model.Tloan',
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
                        read: 'cashier/tloan/read',
                        create: 'cashier/tloan/create',
                        update: 'cashier/tloan/update',
                        destroy: 'cashier/tloan/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'loan_id',
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