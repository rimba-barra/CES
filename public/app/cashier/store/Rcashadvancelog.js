Ext.define('Cashier.store.Rcashadvancelog', {
    extend: 'Ext.data.Store',
    alias: 'store.rcashadvancelogstore',
    requires: [
        'Cashier.model.Rcashadvancelog'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'RcashadvancelogStore',
                model: 'Cashier.model.Rcashadvancelog',
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
                        read: 'cashier/rcashadvance/read',
                        create: 'cashier/rcashadvance/create',
                        update: 'cashier/rcashadvance/update',
                        destroy: 'cashier/rcashadvance/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'kasbonrevision_id',
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