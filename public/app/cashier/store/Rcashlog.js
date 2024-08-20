Ext.define('Cashier.store.Rcashlog', {
    extend: 'Ext.data.Store',
    alias: 'store.rcashlogstore',
    requires: [
        'Cashier.model.Rcashlog'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'RcashlogStore',
                model: 'Cashier.model.Rcashlog',
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
                        idProperty: 'kasbankrevision_id',
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