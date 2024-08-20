Ext.define('Cashier.store.Balancesheetkp', {
    extend: 'Ext.data.Store',
    alias: 'store.balancesheetkpstore',
    requires: [
        'Cashier.model.Balancesheetkp'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'balancesheetkpStore',
                model: 'Cashier.model.Balancesheetkp',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/balancesheetkp/read',
                        create: 'cashier/balancesheetkp/create',
                        update: 'cashier/balancesheetkp/update',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'from_coa_id',
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