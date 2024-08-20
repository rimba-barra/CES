Ext.define('Cashier.store.Groupcashbontype', {
    extend: 'Ext.data.Store',
    alias: 'store.groupcashbontypestore',
    requires: [
        'Cashier.model.Groupcashbontype'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'GroupcashbontypeStore',
                model: 'Cashier.model.Groupcashbontype',
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
                        idProperty: 'tipekasbondept_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getgroupcashbontype'
                    }
                }
            }, cfg)]);
    }
});