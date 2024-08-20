Ext.define('Cashier.store.Departmentexpense', {
    extend: 'Ext.data.Store',
    alias: 'store.departmentexpensestore',
    requires: [
        'Cashier.model.Departmentexpense'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'departmentexpenseStore',
                model: 'Cashier.model.Departmentexpense',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'cashier/departmentexpense/read',
                        create: 'cashier/departmentexpense/create',
                        update: 'cashier/departmentexpense/update',
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'from_coa_id',
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