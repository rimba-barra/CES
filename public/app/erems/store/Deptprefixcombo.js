Ext.define('Erems.store.Deptprefixcombo', {
    extend: 'Ext.data.Store',
    alias: 'store.deptprefixcombostore',
    requires: [
        'Erems.model.Deptprefixcombo'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'DeptprefixcomboStore',
                model: 'Erems.model.Deptprefixcombo',
                sorters: [
                    {property: 'department', direction: 'ASC'}
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
                        read: 'erems/admincollectioncashier/read',
                        create: 'erems/admincollectioncashier/create',
                        update: 'erems/admincollectioncashier/update',
                        destroy: 'erems/admincollectioncashier/delete'
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
                        hideparam: 'getdepartmentprefix',
                        mode_read: 'getdepartmentprefix'
                    }
                }
            }, cfg)]);
    }
});