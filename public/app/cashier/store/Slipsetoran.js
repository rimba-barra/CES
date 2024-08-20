Ext.define('Cashier.store.Slipsetoran', {
    extend: 'Ext.data.Store',
    alias: 'store.slipsetoranstore',
    requires: [
        'Cashier.model.Slipsetoran'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SlipsetoranStore',
                model: 'Cashier.model.Slipsetoran',
                proxy: {
                    type: 'ajax',
                    timeout:4500000,
                    actionMethods: {
                        create: 'POST',                       
                    },
                    api: {
                        read: 'cashier/slipsetoran/read',
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