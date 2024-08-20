Ext.define('Cashier.store.Grouptype', {
    extend: 'Ext.data.Store',
    alias: 'store.grouptypestore',
    requires: [
        'Cashier.model.Grouptype'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'GrouptypeStore',
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
                        read: 'cashier/grouptype/read',
                        create: 'cashier/grouptype/create',
                        update: 'cashier/grouptype/update',
                        destroy: 'cashier/grouptype/delete'
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
                        hideparam: 'default'
                    }
                }
            }, cfg)]);
    }
});