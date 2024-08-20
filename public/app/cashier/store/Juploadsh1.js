Ext.define('Cashier.store.Juploadsh1', {
    extend: 'Ext.data.Store',
    alias: 'store.juploadsh1store',
    requires: [
        'Cashier.model.Juploadsh1'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'Juploadsh1Store',
                model: 'Cashier.model.Juploadsh1',
                proxy: {
                    type: 'ajax',
                    timeout:4500000,
                    actionMethods: {
                        create: 'POST',                       
                    },
                    api: {
                        create: 'cashier/juploadsh1/create',
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