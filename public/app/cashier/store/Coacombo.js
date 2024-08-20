Ext.define('Cashier.store.Coacombo', {
    extend: 'Ext.data.Store',
    alias: 'store.coacombostore',
    requires: [
        'Cashier.model.Coa'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'CoacomboStore',
                model: 'Cashier.model.Coa',
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
                        read: 'cashier/common/read',
                        create: 'cashier/common/create',
                        update: 'cashier/common/update',
                        destroy: 'cashier/common/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'coa_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encoacombo: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getcoabyprojectpt',
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});