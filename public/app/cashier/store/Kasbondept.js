Ext.define('Cashier.store.Kasbondept', {
    extend: 'Ext.data.Store',
   
    alias: 'store.kasbondeptstore',
    requires: [
        'Cashier.model.Kasbondept'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'KasbondeptStore',
                model: 'Cashier.model.Kasbondept',
                 sorters:
    {
        field: 'voucher_date',
        direction: 'DESC'
    },
                proxy: {
                    type: 'ajax',
                    timeout: 45000000,
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/kasbondept/read',
                        create: 'cashier/kasbondept/create',
                        update: 'cashier/kasbondept/update',
                        destroy: 'cashier/kasbondept/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'kasbondept_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'default',
                       statusrequest: 'byuser',
//                        project_id: apps.project,

                    }
                }
            }, cfg)]);
    }
});