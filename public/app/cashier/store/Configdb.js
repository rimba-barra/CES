Ext.define('Cashier.store.Configdb', {
    extend: 'Ext.data.Store',
    alias: 'store.configdbstore',
    requires: [
        'Cashier.model.Configdb'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ConfigdbStore',
                model: 'Cashier.model.Configdb',
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
                        read: 'cashier/configdb/read',
                        create: 'cashier/configdb/create',
                        update: 'cashier/configdb/update',
                        destroy: 'cashier/configdb/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'config_id',
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