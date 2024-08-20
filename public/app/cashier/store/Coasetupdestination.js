Ext.define('Cashier.store.Coasetupdestination', {
    extend: 'Ext.data.Store',
    alias: 'store.coasetupdestinationstore',
    requires: [
        'Cashier.model.Coa'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CoasetupdestinationStore',
                model: 'Cashier.model.Coa',
                pageSize: 1000,
                proxy: {
                    type: 'ajax',
                    timeout: 45000000,
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
                        idProperty: 'coa_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encoacombo: true,
                        root: 'data'
                    },

                }
            }, cfg)]);
    }
});