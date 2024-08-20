Ext.define('Cashier.store.Projectptall', {
    extend: 'Ext.data.Store',
    alias: 'store.projectptallstore',
    requires: [
        'Cashier.model.Projectptall'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ProjectptallStore',
                model: 'Cashier.model.Projectptall',
                sorters: [{
                    property: 'projectcode',
                    direction: 'ASC'
                }, {
                    property: 'ptcode',
                    direction: 'ASC'
                }],
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
                        idProperty: 'projectpt_id',
                        root: 'data',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'projectpt',
                        project_id: 0,
                        start: 0,
                        user_id: apps.uid,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});