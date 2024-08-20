Ext.define('Cashier.store.Consolidationv2', {
    extend: 'Ext.data.Store',
    alias: 'store.consolidationv2store',
    requires: [
        'Cashier.model.Consolidationv2'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
                storeId: 'Consolidationv2Store',
                model: 'Cashier.model.Consolidationv2',
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
                        hideparam :'consolidationv2',
                        start :0,
                        limit :1000,
                    }
                }
            }, cfg)]);
    }
});