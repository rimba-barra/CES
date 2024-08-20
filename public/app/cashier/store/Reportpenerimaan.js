Ext.define('Cashier.store.Reportpenerimaan', {
    extend: 'Ext.data.Store',
    alias: 'store.reportpenerimaanstore',
    requires: [
        'Cashier.model.Reportpenerimaan'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ReportpenerimaanStore',
                model: 'Cashier.model.Reportpenerimaan',
                proxy: {
                    type: 'ajax',
                    timeout:4500000,
                    actionMethods: {
                        create: 'POST',                       
                    },
                    api: {
                        create: 'cashier/reportpenerimaan/create',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'summary_id',
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