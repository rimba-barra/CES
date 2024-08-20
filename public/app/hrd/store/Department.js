Ext.define('Hrd.store.Department', {
    extend: 'Ext.data.Store',
    alias: 'store.departmentstore',
    requires: [
        'Hrd.model.Department'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'DepartmentStore',
                model: 'Hrd.model.Department',
                sorters: [
                    {property: 'department', direction: 'ASC'}
                ],
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/personalselfservice/read',
                        create: 'hrd/personalselfservice/create',
                        update: 'hrd/personalselfservice/update',
                        destroy: 'hrd/personalselfservice/delete'
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
                        mode_read: 'getdefaultdepartment'
                    }
                }
            }, cfg)]);
    }
});