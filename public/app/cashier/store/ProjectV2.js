Ext.define('Cashier.store.ProjectV2', {
    extend: 'Ext.data.Store',
    alias: 'store.projectstoreV2',
    requires: [
        'Cashier.model.Project'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ProjectStoreV2',
                model: 'Cashier.model.Project',
                sorters: [
                    {property: 'name', direction: 'ASC'}
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
                        idProperty: 'project_id',
                        root: 'data',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data',
                    },
                    extraParams: {
                        hideparam: 'projectV2',
                        start: 0,
                        limit: 1000,
                    }


                }
            }, cfg)]);
    }
});