Ext.define('Cashier.store.Coaconvert', {
    extend: 'Ext.data.Store',
    alias: 'store.coaconvertstore',
    requires: [
        'Cashier.model.Coaconvert'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CoaconvertStore',
                model: 'Cashier.model.Coaconvert',
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
                        read: 'cashier/coaconvert/read',
                        create: 'cashier/coaconvert/create',
                        update: 'cashier/coaconvert/update',
                        destroy: 'cashier/coaconvert/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'coaconvert_id',
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