Ext.define('Cashier.store.Logautomail', {
    extend: 'Ext.data.Store',
    alias: 'store.logautomailstore',
    requires: [
        'Cashier.model.Logautomail'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'LogautomailStore',
                model: 'Cashier.model.Logautomail',
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
                        read: 'cashier/logautomail/read',
                        create: 'cashier/logautomail/create',
                        update: 'cashier/logautomail/update',
                        destroy: 'cashier/logautomail/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'automaillog_id',
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