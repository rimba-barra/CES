Ext.define('Cashier.store.Consolidation', {
    extend: 'Ext.data.Store',
    alias: 'store.consolidationstore',
    requires: [
        'Cashier.model.Consolidation'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'ConsolidationStore',
                model: 'Cashier.model.Consolidation',
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
                        read: 'cashier/common/read'
                    },
                    reader: {
                        type: 'json',
                        idProperty: 'consolidation_id',
                        root: 'data'
                    },
                    writer: {
                        type: 'json',
                        encode: true,
                        root: 'data'
                    },
                    extraParams:{
                        hideparam :'consolidation',
                        start :0,
                        limit :1000,
                    }
                }
            }, cfg)]);
    }
});