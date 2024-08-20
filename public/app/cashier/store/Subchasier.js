Ext.define('Cashier.store.Subchasier', {
    extend: 'Ext.data.Store',
    alias: 'store.subchasierstore',
    requires: [
        'Cashier.model.Subchasier'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'SubchasierStore',
                model: 'Cashier.model.Subchasier',
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
                        read: 'cashier/subchasier/read',
                        create: 'cashier/subchasier/create',
                        update: 'cashier/subchasier/update',
                        destroy: 'cashier/subchasier/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'subcashier_id',
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