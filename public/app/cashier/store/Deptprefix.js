Ext.define('Cashier.store.Deptprefix', {
    extend: 'Ext.data.Store',
    alias: 'store.deptprefixstore',
    requires: [
        'Cashier.model.Deptprefix'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'DeptprefixStore',
                model: 'Cashier.model.Deptprefix',
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
                        read: 'cashier/deptprefix/read',
                        create: 'cashier/deptprefix/create',
                        update: 'cashier/deptprefix/update',
                        destroy: 'cashier/deptprefix/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'deptprefix_id',
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