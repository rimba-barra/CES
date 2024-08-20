Ext.define('Cashier.store.Employeehod', {
    extend: 'Ext.data.Store',
    alias: 'store.employeehodstore',
    requires: [
        'Cashier.model.Employee'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'EmployeehodStore',
                model: 'Cashier.model.Employee',
                sorters: [
                    {property: 'employee', direction: 'ASC'}
                ],
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
                        idProperty: 'employee_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getemployeehod'
                    }
                }
            }, cfg)]);
    }
});