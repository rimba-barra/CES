Ext.define('Cashier.store.Typeloan', {
    extend: 'Ext.data.Store',
    alias: 'store.typeloanstore',
    requires: [
        'Cashier.model.Typeloan'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TypeloanStore',
                model: 'Cashier.model.Typeloan',
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
                        read: 'cashier/typeloan/read',
                        create: 'cashier/typeloan/create',
                        update: 'cashier/typeloan/update',
                        destroy: 'cashier/typeloan/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'typeloan_id',
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