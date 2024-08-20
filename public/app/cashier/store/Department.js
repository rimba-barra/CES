Ext.define('Cashier.store.Department', {
    extend: 'Ext.data.Store',
    alias: 'store.departmentstore',
    requires: [
        'Cashier.model.Department'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'DepartmentStore',
                model: 'Cashier.model.Department',
                sorters: [
                            { property: 'department',direction: 'ASC'}                       
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
                        idProperty: 'department_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getdepartment'
                    }
                }
            }, cfg)]);
    }
});