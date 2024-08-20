Ext.define('Cashier.store.Prefixcombo', {
    extend: 'Ext.data.Store',
    alias: 'store.prefixcombostore',
    requires: [
        'Cashier.model.Prefix'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'PrefixcomboStore',
                model: 'Cashier.model.Prefix',
                pageSize: 1000,
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
                        idProperty: 'prefix_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getprefixbyprojectpt',
                        project_id: 0,
                        pt_id: 0,
                        start: 0,
                        limit: 1000,
                        is_cashier: 0,
                        is_active: 1
                    },
                },
                // filters: [
                //     {property: 'is_cashier', value: false}
                // ]
            }, cfg)]);
    }
});