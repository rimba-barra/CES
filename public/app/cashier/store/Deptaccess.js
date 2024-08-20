Ext.define('Cashier.store.Deptaccess', {
    extend: 'Ext.data.Store',
    alias: 'store.Deptaccessstore',
    requires: [
        'Cashier.model.Deptaccess'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'DeptaccessStore',
                model: 'Cashier.model.Deptaccess',
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
                        read: 'cashier/Deptaccess/read',
                        create: 'cashier/Deptaccess/create',
                        update: 'cashier/Deptaccess/update',
                        destroy: 'cashier/Deptaccess/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'deptaccess_id',
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