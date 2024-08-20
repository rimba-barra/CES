Ext.define('Cashier.store.Tipepphcombo', {
    extend: 'Ext.data.Store',
    alias: 'store.tipepphstore',
    requires: [
        'Cashier.model.Tipepph'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'TipepphcomboStore',
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
                        read: 'cashier/common/read',
                        create: 'cashier/common/create',
                        update: 'cashier/common/update',
                        destroy: 'cashier/common/delete'
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
                        hideparam: 'tipepph',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});