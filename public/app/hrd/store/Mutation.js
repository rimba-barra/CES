Ext.define('Hrd.store.Mutation', {
    extend: 'Ext.data.Store',
    alias: 'store.mutationstore',
    requires: [
        'Hrd.model.Changestatus'
    ],
    constructor: function (cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'MutationStore',
                model: 'Hrd.model.Changestatus',
                proxy: {
                    type: 'ajax',
                    actionMethods: {
                        read: 'POST',
                        create: 'POST',
                        update: 'POST',
                        destroy: 'POST'
                    },
                    api: {
                        read: 'hrd/mutation/read',
                        create: 'hrd/mutation/create',
                        update: 'hrd/mutation/update',
                        destroy: 'hrd/mutation/delete'
                    },
                    reader: {
                        type: 'json',
                        root: 'data',
                        idProperty: 'changestatus_id',
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