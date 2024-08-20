Ext.define('Cashier.store.Tipepph', {
    extend: 'Ext.data.Store',
    alias: 'store.tipepphstore',
    requires: [
        'Cashier.model.Tipepph'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TipepphStore',
                model: 'Cashier.model.Tipepph',
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
                        read: 'cashier/tipepph/read',
                        create: 'cashier/tipepph/create',
                        update: 'cashier/tipepph/update',
                        destroy: 'cashier/tipepph/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'tipepph_id',
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