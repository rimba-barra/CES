Ext.define('Cashier.store.Reportpenyusutan', {
    extend: 'Ext.data.Store',
    alias: 'store.reportpenyusutanstore',
    requires: [
        'Cashier.model.Reportpenyusutan'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ReportpenyusutanStore',
                model: 'Cashier.model.Reportpenyusutan',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/reportpenyusutan/read',
                        create: 'cashier/reportpenyusutan/create',
                        update: 'cashier/reportpenyusutan/update',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'from_coa_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    }
                }
            }, cfg)]);
    }
});