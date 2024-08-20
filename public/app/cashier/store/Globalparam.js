Ext.define('Cashier.store.Globalparam', {
    extend: 'Ext.data.Store',
    alias: 'store.globalparamstore',
    requires: [
        'Cashier.model.Globalparam'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'GlobalparamStore',
                model: 'Cashier.model.Globalparam',
                proxy: {
                    type: 'ajax',
                    timeout: 45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/globalparam/read',
                        create: 'cashier/globalparam/create',
                        update: 'cashier/globalparam/update',
                        destroy: 'cashier/globalparam/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'param_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },

                }
            }, cfg)]);
    }
});