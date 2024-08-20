Ext.define('Cashier.store.Mastermastergrouptype', {
    extend: 'Ext.data.Store',
    alias: 'store.mastergrouptypestore',
    requires: [
        'Cashier.model.Mastermastergrouptype'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MastermastergrouptypeStore',
                model: 'Cashier.model.Mastermastergrouptype',
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
                        read: 'cashier/mastergrouptype/read',
                        create: 'cashier/mastergrouptype/create',
                        update: 'cashier/mastergrouptype/update',
                        destroy: 'cashier/mastergrouptype/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'mastergrouptype_id',
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