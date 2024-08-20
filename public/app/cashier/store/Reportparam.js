Ext.define('Cashier.store.Reportparam', {
    extend: 'Ext.data.Store',
    alias: 'store.reportparamstore',
    requires: [
        'Cashier.model.Reportparam'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ReportparamStore',
                model: 'Cashier.model.Reportparam',
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
                        read: 'cashier/reportparam/read',
                        create: 'cashier/reportparam/create',
                        update: 'cashier/reportparam/update',
                        destroy: 'cashier/reportparam/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'reportparam_id',
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