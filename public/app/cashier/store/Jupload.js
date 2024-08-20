Ext.define('Cashier.store.Jupload', {
    extend: 'Ext.data.Store',
    alias: 'store.juploadstore',
    requires: [
        'Cashier.model.Jupload'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'JuploadStore',
                model: 'Cashier.model.Jupload',
                proxy: {
                    type: 'ajax',
                    timeout:4500000,
                    actionMethods: {
                        create: 'POST',                       
                    },
                    api: {
                        create: 'cashier/jupload/create',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'summary_id',
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