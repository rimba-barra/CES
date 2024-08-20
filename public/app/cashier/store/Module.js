Ext.define('Cashier.store.Module', {
    extend: 'Ext.data.Store',
    alias: 'store.modulestore',
    requires: [
        'Cashier.model.Module'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ModuleStore',
                model: 'Cashier.model.Module',
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
                        read: 'cashier/module/read',
                        create: 'cashier/module/create',
                        update: 'cashier/module/update',
                        destroy: 'cashier/module/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'module_id',
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