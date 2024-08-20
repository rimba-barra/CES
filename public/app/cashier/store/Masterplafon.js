Ext.define('Cashier.store.Masterplafon', {
    extend: 'Ext.data.Store',
    alias: 'store.masterplafonstore',
    requires: [
        'Cashier.model.Masterplafon'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasterplafonStore',
                model: 'Cashier.model.Masterplafon',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/masterplafon/read',
                        create: 'cashier/masterplafon/create',
                        update: 'cashier/masterplafon/update',
                        destroy: 'cashier/masterplafon/delete'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'plafon_id',
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