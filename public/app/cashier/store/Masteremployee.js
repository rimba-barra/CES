Ext.define('Cashier.store.Masteremployee', {
    extend: 'Ext.data.Store',
    alias: 'store.masteremployeestore',
    requires: [
        'Cashier.model.Masteremployee'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MasteremployeeStore',
                model: 'Cashier.model.Masteremployee',
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
                        read: 'cashier/masteremployee/read',
                        create: 'cashier/masteremployee/create',
                        update: 'cashier/masteremployee/update',
                        destroy: 'cashier/masteremployee/delete'
                    },
                    reader: {
                        type: 'json',                       
                        root: 'data',
                        idProperty: 'employee_id',
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