Ext.define('Cashier.store.Grouptypecombo', {
    extend: 'Ext.data.Store',
    alias: 'store.grouptypestore',
    requires: [
        'Cashier.model.Grouptype'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'GrouptypecomboStore',
                model: 'Cashier.model.Grouptype',
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
                        idProperty: 'grouptype_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'grouptype',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});