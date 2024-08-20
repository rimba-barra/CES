Ext.define('Cashier.store.Rcash', {
    extend: 'Ext.data.Store',
    alias: 'store.rcashstore',
    requires: [
        'Cashier.model.Rcash'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'RcashStore',
                model: 'Cashier.model.Rcash',
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
                        read: 'cashier/rcash/read',
                        create: 'cashier/rcash/create',
                        update: 'cashier/rcash/update',
                        destroy: 'cashier/rcash/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'kasbank_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default',
                        project_id:apps.project
                        
                    }
                }
            }, cfg)]);
    }
});