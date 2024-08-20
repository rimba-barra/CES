Ext.define('Cashier.store.Agingcashadvancereport', {
    extend: 'Ext.data.Store',
    alias: 'store.agingcashadvancereportstore',
    requires: [
        'Cashier.model.Agingcashadvancereport'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'AgingcashadvancereportStore',
                model: 'Cashier.model.Agingcashadvancereport',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/agingcashadvancereport/read',
                        create: 'cashier/agingcashadvancereport/create',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'sub_coa_id',
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