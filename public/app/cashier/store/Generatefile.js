Ext.define('Cashier.store.Generatefile', {
    extend: 'Ext.data.Store',
    alias: 'store.generatefilestore',
    requires: [
        'Cashier.model.Generatefile'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'GeneratefileStore',
                model: 'Cashier.model.Generatefile',
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
                        read: 'cashier/generatefile/read',
                        create: 'cashier/generatefile/create',
                        update: 'cashier/generatefile/update',
                        destroy: 'cashier/generatefile/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'generate_id',
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