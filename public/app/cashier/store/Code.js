Ext.define('Cashier.store.Code', {
    extend: 'Ext.data.Store',
    alias: 'store.codestore',
    requires: [
        'Cashier.model.Code'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CodeStore',
                model: 'Cashier.model.Code',
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
                        read: 'cashier/code/read',
                        create: 'cashier/code/create',
                        update: 'cashier/code/update',
                        destroy: 'cashier/code/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'code_id',
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