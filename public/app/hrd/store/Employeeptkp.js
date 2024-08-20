Ext.define('Hrd.store.Employeeptkp', {
    extend: 'Ext.data.Store',
    alias: 'store.employeeptkpstore',
    requires: [
        'Hrd.model.Employeeptkp'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'EmployeeptkpStore',
                model: 'Hrd.model.Employeeptkp',
                remoteSort: true,
                sortInfo: {
                    field: 'employee_name',
                    direction: 'ASC'
                },
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/employeeptkp/read',
                        create: 'hrd/employeeptkp/create',
                        update: 'hrd/employeeptkp/update',
                        destroy: 'hrd/employeeptkp/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'employeeptkp_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        mode_read: 'default'
                    }
                }
            }, cfg)]);
    }
});