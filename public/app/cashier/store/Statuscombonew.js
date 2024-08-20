Ext.define('Cashier.store.Statuscombonew', {
    extend: 'Ext.data.Store',
    alias: 'store.statuscombostorenew',
    requires: [
        'Cashier.model.Status'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'StatuscomboStore',
                model: 'Cashier.model.Status',
                pageSize: 1000,
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
                        idProperty: 'status_id',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'getstatusbyprojectpt',
                        project_id: 0,
                        pt_id: 0,
                        start: 0,
                        limit: 1000,
                    },
                }
            }, cfg)]);
    }
});