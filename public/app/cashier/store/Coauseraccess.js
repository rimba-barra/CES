Ext.define('Cashier.store.Coauseraccess', {
    extend: 'Ext.data.Store',
    alias: 'store.Coauseraccessstore',
    requires: [
        'Cashier.model.Coauseraccess'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CoauseraccessStore',
                model: 'Cashier.model.Coauseraccess',
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
                        read: 'cashier/Coauseraccess/read',
                        create: 'cashier/Coauseraccess/create',
                        update: 'cashier/Coauseraccess/update',
                        destroy: 'cashier/Coauseraccess/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'coauseraccess_id',
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