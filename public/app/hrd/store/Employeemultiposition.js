Ext.define('Hrd.store.Employeemultiposition', {
    extend: 'Ext.data.Store',
    alias: 'store.employeemultipositionstore',
    requires: [
        'Hrd.model.Employeemultiposition'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'EmployeemultipositionStore',
                model: 'Hrd.model.Employeemultiposition',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/personal/read',
                        create: 'hrd/personal/create',
                        update: 'hrd/personal/update',
                        destroy: 'hrd/personal/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'employee_multiposition_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },

                }
            }, cfg)]);
    }
});