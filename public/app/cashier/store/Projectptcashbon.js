Ext.define('Cashier.store.Projectptcashbon', {
    extend: 'Ext.data.Store',
    alias: 'store.projectptcashbonstore',
    requires: [
        'Cashier.model.Projectptcashbon'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ProjectptcashbonStore',
                model: 'Cashier.model.Projectptcashbon',
                sorters: [{
                        property: 'projectcode',
                        direction: 'ASC'
                    }, {
                        property: 'ptcode',
                        direction: 'ASC'
                    }],
                proxy: {
                    type: 'ajax',
                    timeout: 45000000,
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
                        idProperty: 'pt_id_cashbon',
                        root: 'data',
                        totalProperty: 'total'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams: {
                        hideparam: 'projectptcashbon',
                        project_id: 0,
                        start: 0,
                        limit: 1000,
                    }
                }
            }, cfg)]);
    }
});